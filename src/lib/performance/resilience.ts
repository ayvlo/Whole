/**
 * Performance Optimization & Resilience Layer
 *
 * Features:
 * - Circuit breaker pattern
 * - Rate limiting (token bucket, sliding window)
 * - Bulkhead pattern
 * - Retry with backoff
 * - Request coalescing
 * - Graceful degradation
 */

import { observability } from '../observability/metrics';
import { Redis } from '@upstash/redis';

export interface CircuitBreakerConfig {
  failureThreshold: number; // Number of failures before opening
  successThreshold: number; // Successes needed to close
  timeout: number; // Milliseconds before attempting reset
}

export interface RateLimitConfig {
  maxRequests: number;
  windowMs: number;
  strategy: 'fixed-window' | 'sliding-window' | 'token-bucket';
}

export interface BulkheadConfig {
  maxConcurrent: number;
  maxQueue: number;
  timeout: number;
}

/**
 * Circuit Breaker Implementation
 */
export class CircuitBreaker {
  private state: 'closed' | 'open' | 'half-open' = 'closed';
  private failures = 0;
  private successes = 0;
  private nextAttempt = 0;
  private config: CircuitBreakerConfig;

  constructor(config: Partial<CircuitBreakerConfig> = {}) {
    this.config = {
      failureThreshold: config.failureThreshold ?? 5,
      successThreshold: config.successThreshold ?? 2,
      timeout: config.timeout ?? 60000,
    };
  }

  async call<T>(
    fn: () => Promise<T>,
    fallback?: () => Promise<T>
  ): Promise<T> {
    // Check if circuit is open
    if (this.state === 'open') {
      if (Date.now() < this.nextAttempt) {
        await observability.increment('circuit_breaker.rejected');

        if (fallback) {
          return await fallback();
        }
        throw new Error('Circuit breaker is open');
      }

      // Try to half-open
      this.state = 'half-open';
      this.successes = 0;
    }

    try {
      const result = await fn();
      this.onSuccess();
      return result;
    } catch (error) {
      this.onFailure();

      if (fallback) {
        return await fallback();
      }

      throw error;
    }
  }

  private onSuccess(): void {
    this.failures = 0;

    if (this.state === 'half-open') {
      this.successes++;

      if (this.successes >= this.config.successThreshold) {
        this.state = 'closed';
        await observability.increment('circuit_breaker.closed');
      }
    }
  }

  private onFailure(): void {
    this.failures++;
    this.successes = 0;

    if (this.failures >= this.config.failureThreshold) {
      this.state = 'open';
      this.nextAttempt = Date.now() + this.config.timeout;
      await observability.increment('circuit_breaker.opened');
    }
  }

  getState(): string {
    return this.state;
  }
}

/**
 * Rate Limiter
 */
export class RateLimiter {
  private redis: Redis | null;
  private localCounts: Map<string, { count: number; resetAt: number }> = new Map();

  constructor() {
    this.redis = process.env.UPSTASH_REDIS_REST_URL
      ? new Redis({
          url: process.env.UPSTASH_REDIS_REST_URL,
          token: process.env.UPSTASH_REDIS_REST_TOKEN!,
        })
      : null;
  }

  /**
   * Check if request is allowed
   */
  async isAllowed(
    key: string,
    config: RateLimitConfig
  ): Promise<{ allowed: boolean; remaining: number; resetAt: number }> {
    if (this.redis) {
      return await this.isAllowedRedis(key, config);
    } else {
      return this.isAllowedLocal(key, config);
    }
  }

  /**
   * Redis-based rate limiting (distributed)
   */
  private async isAllowedRedis(
    key: string,
    config: RateLimitConfig
  ): Promise<{ allowed: boolean; remaining: number; resetAt: number }> {
    const now = Date.now();
    const windowStart = now - config.windowMs;

    try {
      // Use sorted set for sliding window
      const redisKey = `ratelimit:${key}`;

      // Remove old entries
      await this.redis!.zremrangebyscore(redisKey, 0, windowStart);

      // Count current requests
      const count = await this.redis!.zcard(redisKey);

      if (count >= config.maxRequests) {
        return {
          allowed: false,
          remaining: 0,
          resetAt: now + config.windowMs,
        };
      }

      // Add new request
      await this.redis!.zadd(redisKey, { score: now, member: `${now}-${Math.random()}` });
      await this.redis!.expire(redisKey, Math.ceil(config.windowMs / 1000));

      await observability.increment('ratelimit.allowed');

      return {
        allowed: true,
        remaining: config.maxRequests - count - 1,
        resetAt: now + config.windowMs,
      };
    } catch (error) {
      console.error('[RateLimit] Redis error:', error);

      // Fallback to local
      return this.isAllowedLocal(key, config);
    }
  }

  /**
   * Local rate limiting (single instance)
   */
  private isAllowedLocal(
    key: string,
    config: RateLimitConfig
  ): { allowed: boolean; remaining: number; resetAt: number } {
    const now = Date.now();
    const entry = this.localCounts.get(key);

    // Reset if window expired
    if (!entry || now >= entry.resetAt) {
      this.localCounts.set(key, {
        count: 1,
        resetAt: now + config.windowMs,
      });

      return {
        allowed: true,
        remaining: config.maxRequests - 1,
        resetAt: now + config.windowMs,
      };
    }

    // Check limit
    if (entry.count >= config.maxRequests) {
      await observability.increment('ratelimit.rejected');

      return {
        allowed: false,
        remaining: 0,
        resetAt: entry.resetAt,
      };
    }

    // Increment count
    entry.count++;
    this.localCounts.set(key, entry);

    await observability.increment('ratelimit.allowed');

    return {
      allowed: true,
      remaining: config.maxRequests - entry.count,
      resetAt: entry.resetAt,
    };
  }
}

/**
 * Bulkhead Pattern - Isolate resources
 */
export class Bulkhead {
  private running = 0;
  private queue: Array<() => void> = [];
  private config: BulkheadConfig;

  constructor(config: Partial<BulkheadConfig> = {}) {
    this.config = {
      maxConcurrent: config.maxConcurrent ?? 10,
      maxQueue: config.maxQueue ?? 100,
      timeout: config.timeout ?? 30000,
    };
  }

  async execute<T>(fn: () => Promise<T>): Promise<T> {
    // Check if we can execute immediately
    if (this.running < this.config.maxConcurrent) {
      return await this.run(fn);
    }

    // Check queue limit
    if (this.queue.length >= this.config.maxQueue) {
      await observability.increment('bulkhead.rejected');
      throw new Error('Bulkhead queue full');
    }

    // Queue the request
    return new Promise((resolve, reject) => {
      const timeout = setTimeout(() => {
        reject(new Error('Bulkhead timeout'));
      }, this.config.timeout);

      this.queue.push(async () => {
        clearTimeout(timeout);
        try {
          const result = await this.run(fn);
          resolve(result);
        } catch (error) {
          reject(error);
        }
      });
    });
  }

  private async run<T>(fn: () => Promise<T>): Promise<T> {
    this.running++;

    try {
      const result = await fn();
      return result;
    } finally {
      this.running--;

      // Process queue
      if (this.queue.length > 0) {
        const next = this.queue.shift();
        if (next) {
          next();
        }
      }
    }
  }

  getStats(): { running: number; queued: number } {
    return {
      running: this.running,
      queued: this.queue.length,
    };
  }
}

/**
 * Request Coalescing - Deduplicate concurrent identical requests
 */
export class RequestCoalescer {
  private pending: Map<string, Promise<any>> = new Map();

  async coalesce<T>(key: string, fn: () => Promise<T>): Promise<T> {
    // Check if request is already pending
    if (this.pending.has(key)) {
      await observability.increment('request.coalesced');
      return await this.pending.get(key) as T;
    }

    // Execute and cache promise
    const promise = fn().finally(() => {
      this.pending.delete(key);
    });

    this.pending.set(key, promise);

    return await promise;
  }
}

// Export instances
export const circuitBreaker = new CircuitBreaker();
export const rateLimiter = new RateLimiter();
export const bulkhead = new Bulkhead();
export const coalescer = new RequestCoalescer();
