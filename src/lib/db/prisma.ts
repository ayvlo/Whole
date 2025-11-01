/**
 * Enterprise-Grade Prisma Client
 *
 * Features:
 * - Connection pooling optimization
 * - Query performance monitoring
 * - Automatic retry logic
 * - Error handling and logging
 */

import { PrismaClient } from '@prisma/client';
import { observability } from '../observability/metrics';

// Prisma Client singleton with performance extensions
const prismaClientSingleton = () => {
  const prisma = new PrismaClient({
    log: [
      { level: 'query', emit: 'event' },
      { level: 'error', emit: 'event' },
      { level: 'warn', emit: 'event' },
    ],
    // Connection pool optimization
    datasources: {
      db: {
        url: process.env.DATABASE_URL,
      },
    },
  });

  // Query performance monitoring
  prisma.$on('query' as never, async (e: any) => {
    const duration = e.duration;

    // Record query metrics
    await observability.recordMetric('db.query.duration', duration, {
      query: e.query.substring(0, 100), // Truncate for cardinality
      target: e.target,
    });

    // Warn on slow queries
    if (duration > 1000) {
      console.warn(`[SLOW QUERY] ${duration}ms:`, e.query.substring(0, 200));
      await observability.recordMetric('db.query.slow', 1, {
        query: e.query.substring(0, 100),
      });
    }
  });

  // Error logging
  prisma.$on('error' as never, async (e: any) => {
    console.error('[Prisma Error]:', e);
    await observability.recordMetric('db.error', 1, {
      message: e.message,
    });
  });

  return prisma;
};

declare global {
  var prisma: undefined | ReturnType<typeof prismaClientSingleton>;
}

export const prisma = globalThis.prisma ?? prismaClientSingleton();

if (process.env.NODE_ENV !== 'production') {
  globalThis.prisma = prisma;
}

/**
 * Execute query with automatic retry logic
 */
export async function withRetry<T>(
  operation: () => Promise<T>,
  maxRetries = 3,
  delay = 1000
): Promise<T> {
  let lastError: Error | null = null;

  for (let i = 0; i < maxRetries; i++) {
    try {
      return await operation();
    } catch (error) {
      lastError = error as Error;

      // Don't retry on validation errors
      if (error instanceof Error && error.message.includes('Unique constraint')) {
        throw error;
      }

      if (i < maxRetries - 1) {
        await new Promise(resolve => setTimeout(resolve, delay * Math.pow(2, i)));
      }
    }
  }

  throw lastError;
}

/**
 * Health check for database connection
 */
export async function checkDatabaseHealth(): Promise<{
  healthy: boolean;
  latency: number;
  error?: string;
}> {
  const start = Date.now();

  try {
    await prisma.$queryRaw`SELECT 1`;
    const latency = Date.now() - start;

    return {
      healthy: true,
      latency,
    };
  } catch (error) {
    return {
      healthy: false,
      latency: Date.now() - start,
      error: error instanceof Error ? error.message : 'Unknown error',
    };
  }
}
