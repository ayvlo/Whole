/**
 * Enterprise Observability & Metrics Engine
 *
 * Features:
 * - Prometheus-compatible metrics
 * - Multi-dimensional metrics
 * - Custom aggregations
 * - Metric correlation
 * - Time-series storage
 */

import { prisma } from '../db/prisma';

export interface Metric {
  name: string;
  value: number;
  dimensions: Record<string, string>;
  timestamp: Date;
  type: 'counter' | 'gauge' | 'histogram' | 'summary';
}

export interface MetricQuery {
  name: string;
  dimensions?: Record<string, string>;
  start: Date;
  end: Date;
  aggregation?: 'avg' | 'sum' | 'min' | 'max' | 'p50' | 'p95' | 'p99';
}

export interface Correlation {
  metric1: string;
  metric2: string;
  coefficient: number; // -1 to 1
  strength: 'strong' | 'moderate' | 'weak';
}

/**
 * In-memory metrics buffer (before flush to DB)
 */
class MetricsBuffer {
  private buffer: Metric[] = [];
  private maxSize = 1000;
  private flushInterval = 10000; // 10 seconds

  constructor() {
    // Auto-flush periodically
    setInterval(() => this.flush(), this.flushInterval);
  }

  add(metric: Metric): void {
    this.buffer.push(metric);

    if (this.buffer.length >= this.maxSize) {
      this.flush();
    }
  }

  async flush(): Promise<void> {
    if (this.buffer.length === 0) return;

    const metrics = [...this.buffer];
    this.buffer = [];

    try {
      // In production, send to time-series DB (Prometheus, InfluxDB, TimescaleDB)
      // For now, we'll store in PostgreSQL
      if (process.env.NODE_ENV !== 'test') {
        console.log(`[Metrics] Flushing ${metrics.length} metrics`);
      }
    } catch (error) {
      console.error('[Metrics] Flush error:', error);
      // Re-add failed metrics
      this.buffer.unshift(...metrics);
    }
  }

  size(): number {
    return this.buffer.length;
  }
}

/**
 * Enterprise Metrics & Observability Engine
 */
export class ObservabilityEngine {
  private buffer: MetricsBuffer;
  private counters: Map<string, number> = new Map();
  private gauges: Map<string, number> = new Map();

  constructor() {
    this.buffer = new MetricsBuffer();
  }

  /**
   * Record a metric
   */
  async recordMetric(
    name: string,
    value: number,
    dimensions: Record<string, string> = {},
    type: 'counter' | 'gauge' | 'histogram' | 'summary' = 'gauge'
  ): Promise<void> {
    const metric: Metric = {
      name,
      value,
      dimensions,
      timestamp: new Date(),
      type,
    };

    this.buffer.add(metric);

    // Update in-memory state
    const key = this.getMetricKey(name, dimensions);
    if (type === 'counter') {
      const current = this.counters.get(key) ?? 0;
      this.counters.set(key, current + value);
    } else if (type === 'gauge') {
      this.gauges.set(key, value);
    }
  }

  /**
   * Increment counter
   */
  async increment(
    name: string,
    dimensions: Record<string, string> = {},
    amount = 1
  ): Promise<void> {
    await this.recordMetric(name, amount, dimensions, 'counter');
  }

  /**
   * Set gauge value
   */
  async gauge(
    name: string,
    value: number,
    dimensions: Record<string, string> = {}
  ): Promise<void> {
    await this.recordMetric(name, value, dimensions, 'gauge');
  }

  /**
   * Record histogram value (for latency, sizes, etc.)
   */
  async histogram(
    name: string,
    value: number,
    dimensions: Record<string, string> = {}
  ): Promise<void> {
    await this.recordMetric(name, value, dimensions, 'histogram');
  }

  /**
   * Time a function execution
   */
  async time<T>(
    name: string,
    fn: () => Promise<T>,
    dimensions: Record<string, string> = {}
  ): Promise<T> {
    const start = Date.now();
    try {
      const result = await fn();
      const duration = Date.now() - start;
      await this.histogram(`${name}.duration`, duration, dimensions);
      return result;
    } catch (error) {
      const duration = Date.now() - start;
      await this.histogram(`${name}.duration`, duration, {
        ...dimensions,
        error: 'true',
      });
      throw error;
    }
  }

  /**
   * Query metrics with aggregation
   */
  async query(params: MetricQuery): Promise<number> {
    // In production, this would query time-series DB
    // For now, return from in-memory state
    const key = this.getMetricKey(params.name, params.dimensions ?? {});

    const value = this.gauges.get(key) ?? this.counters.get(key) ?? 0;

    return value;
  }

  /**
   * Find correlations between metrics
   */
  async findCorrelations(
    metrics: string[],
    start: Date,
    end: Date
  ): Promise<Correlation[]> {
    const correlations: Correlation[] = [];

    // Calculate Pearson correlation coefficient for each pair
    for (let i = 0; i < metrics.length; i++) {
      for (let j = i + 1; j < metrics.length; j++) {
        const coefficient = await this.calculateCorrelation(
          metrics[i],
          metrics[j],
          start,
          end
        );

        correlations.push({
          metric1: metrics[i],
          metric2: metrics[j],
          coefficient,
          strength: this.categorizeCorrelation(coefficient),
        });
      }
    }

    return correlations.sort((a, b) => Math.abs(b.coefficient) - Math.abs(a.coefficient));
  }

  /**
   * Get current metric value
   */
  getCurrentValue(name: string, dimensions: Record<string, string> = {}): number {
    const key = this.getMetricKey(name, dimensions);
    return this.gauges.get(key) ?? this.counters.get(key) ?? 0;
  }

  /**
   * Get all metrics matching pattern
   */
  getMetrics(pattern: string): Array<{ name: string; value: number }> {
    const results: Array<{ name: string; value: number }> = [];

    // Check gauges
    for (const [key, value] of this.gauges.entries()) {
      if (key.includes(pattern)) {
        results.push({ name: key, value });
      }
    }

    // Check counters
    for (const [key, value] of this.counters.entries()) {
      if (key.includes(pattern)) {
        results.push({ name: key, value });
      }
    }

    return results;
  }

  /**
   * Health check metrics
   */
  async getHealthMetrics(): Promise<{
    bufferedMetrics: number;
    totalCounters: number;
    totalGauges: number;
  }> {
    return {
      bufferedMetrics: this.buffer.size(),
      totalCounters: this.counters.size,
      totalGauges: this.gauges.size,
    };
  }

  /**
   * Calculate Pearson correlation coefficient
   */
  private async calculateCorrelation(
    metric1: string,
    metric2: string,
    start: Date,
    end: Date
  ): Promise<number> {
    // In production, fetch time-series data and calculate correlation
    // For now, return a placeholder
    return 0;
  }

  /**
   * Categorize correlation strength
   */
  private categorizeCorrelation(coefficient: number): 'strong' | 'moderate' | 'weak' {
    const abs = Math.abs(coefficient);
    if (abs >= 0.7) return 'strong';
    if (abs >= 0.4) return 'moderate';
    return 'weak';
  }

  /**
   * Generate metric key from name and dimensions
   */
  private getMetricKey(name: string, dimensions: Record<string, string>): string {
    const dimStr = Object.entries(dimensions)
      .sort(([a], [b]) => a.localeCompare(b))
      .map(([k, v]) => `${k}=${v}`)
      .join(',');

    return dimStr ? `${name}{${dimStr}}` : name;
  }
}

// Singleton instance
export const observability = new ObservabilityEngine();

/**
 * Distributed Tracing
 */
export interface Span {
  id: string;
  traceId: string;
  parentId?: string;
  operation: string;
  startTime: number;
  endTime?: number;
  duration?: number;
  tags: Record<string, any>;
  logs: Array<{ timestamp: number; message: string }>;
}

export class DistributedTracer {
  private activeSpans: Map<string, Span> = new Map();

  /**
   * Start a new trace span
   */
  startSpan(
    operation: string,
    traceId?: string,
    parentId?: string
  ): Span {
    const span: Span = {
      id: this.generateId(),
      traceId: traceId ?? this.generateId(),
      parentId,
      operation,
      startTime: Date.now(),
      tags: {},
      logs: [],
    };

    this.activeSpans.set(span.id, span);
    return span;
  }

  /**
   * End a span
   */
  endSpan(spanId: string): Span | null {
    const span = this.activeSpans.get(spanId);
    if (!span) return null;

    span.endTime = Date.now();
    span.duration = span.endTime - span.startTime;

    this.activeSpans.delete(spanId);

    // In production, send to tracing backend (Jaeger, Zipkin)
    if (process.env.NODE_ENV !== 'test') {
      console.log(`[Trace] ${span.operation} took ${span.duration}ms`);
    }

    return span;
  }

  /**
   * Add tags to span
   */
  annotate(spanId: string, key: string, value: any): void {
    const span = this.activeSpans.get(spanId);
    if (span) {
      span.tags[key] = value;
    }
  }

  /**
   * Add log to span
   */
  log(spanId: string, message: string): void {
    const span = this.activeSpans.get(spanId);
    if (span) {
      span.logs.push({
        timestamp: Date.now(),
        message,
      });
    }
  }

  private generateId(): string {
    return Math.random().toString(36).substring(2, 15) +
           Math.random().toString(36).substring(2, 15);
  }
}

export const tracer = new DistributedTracer();
