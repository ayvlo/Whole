/**
 * Enterprise Query Optimizer
 *
 * Features:
 * - Automatic index suggestions
 * - Query result caching
 * - Query planning and analysis
 * - N+1 detection
 */

import { prisma } from './prisma';
import { cache } from '../cache/intelligent-cache';

export interface QueryAnalysis {
  query: string;
  executionTime: number;
  rowsReturned: number;
  suggestedIndexes: string[];
  canBeCached: boolean;
  nPlusOneDetected: boolean;
}

export interface OptimizedQuery {
  original: string;
  optimized: string;
  estimatedImprovement: number; // percentage
  suggestions: string[];
}

export class QueryOptimizer {
  private queryStats: Map<string, {
    count: number;
    totalTime: number;
    avgTime: number;
  }> = new Map();

  /**
   * Analyze query performance
   */
  async analyzeQuery(query: string): Promise<QueryAnalysis> {
    const start = Date.now();

    // Execute EXPLAIN ANALYZE
    const plan = await prisma.$queryRawUnsafe<any[]>(
      `EXPLAIN ANALYZE ${query}`
    );

    const executionTime = Date.now() - start;

    // Parse execution plan
    const planText = plan.map(row => row['QUERY PLAN']).join('\n');
    const rowsReturned = this.extractRowCount(planText);

    // Detect missing indexes
    const suggestedIndexes = this.detectMissingIndexes(planText, query);

    // Check if query is cacheable
    const canBeCached = !query.toLowerCase().includes('now()') &&
                        !query.toLowerCase().includes('random()');

    // Detect N+1 pattern
    const nPlusOneDetected = this.detectNPlusOne(query);

    return {
      query,
      executionTime,
      rowsReturned,
      suggestedIndexes,
      canBeCached,
      nPlusOneDetected,
    };
  }

  /**
   * Suggest query optimizations
   */
  async suggestOptimizations(query: string): Promise<OptimizedQuery> {
    const suggestions: string[] = [];
    let optimized = query;

    // Suggest SELECT specific columns instead of SELECT *
    if (query.includes('SELECT *')) {
      suggestions.push('Replace SELECT * with specific columns to reduce data transfer');
    }

    // Suggest LIMIT for large result sets
    if (!query.toLowerCase().includes('limit') &&
        !query.toLowerCase().includes('count(')) {
      suggestions.push('Add LIMIT clause to prevent fetching too many rows');
      optimized = optimized.replace(/;?\s*$/, ' LIMIT 1000;');
    }

    // Suggest indexes
    const analysis = await this.analyzeQuery(query);
    if (analysis.suggestedIndexes.length > 0) {
      suggestions.push(...analysis.suggestedIndexes.map(idx =>
        `Consider adding index: ${idx}`
      ));
    }

    // Suggest using covering indexes
    if (query.toLowerCase().includes('order by')) {
      suggestions.push('Consider creating a covering index for ORDER BY columns');
    }

    const estimatedImprovement = suggestions.length > 0 ?
      Math.min(suggestions.length * 15, 80) : 0;

    return {
      original: query,
      optimized,
      estimatedImprovement,
      suggestions,
    };
  }

  /**
   * Cache query results with intelligent TTL
   */
  async cachedQuery<T>(
    key: string,
    query: () => Promise<T>,
    options?: {
      ttl?: number;
      tags?: string[];
    }
  ): Promise<T> {
    const cacheKey = `query:${key}`;

    // Try to get from cache
    const cached = await cache.get<T>(cacheKey);
    if (cached !== null) {
      return cached;
    }

    // Execute query
    const start = Date.now();
    const result = await query();
    const executionTime = Date.now() - start;

    // Calculate adaptive TTL based on query time
    const adaptiveTTL = options?.ttl ?? this.calculateAdaptiveTTL(executionTime);

    // Store in cache
    await cache.set(cacheKey, result, {
      ttl: adaptiveTTL,
      tags: options?.tags
    });

    return result;
  }

  /**
   * Track query statistics
   */
  trackQuery(query: string, executionTime: number): void {
    const stats = this.queryStats.get(query) ?? {
      count: 0,
      totalTime: 0,
      avgTime: 0,
    };

    stats.count++;
    stats.totalTime += executionTime;
    stats.avgTime = stats.totalTime / stats.count;

    this.queryStats.set(query, stats);
  }

  /**
   * Get slowest queries
   */
  getSlowestQueries(limit = 10): Array<{
    query: string;
    avgTime: number;
    count: number;
  }> {
    return Array.from(this.queryStats.entries())
      .map(([query, stats]) => ({
        query: query.substring(0, 100),
        avgTime: stats.avgTime,
        count: stats.count,
      }))
      .sort((a, b) => b.avgTime - a.avgTime)
      .slice(0, limit);
  }

  /**
   * Calculate adaptive TTL based on query execution time
   */
  private calculateAdaptiveTTL(executionTime: number): number {
    // Slower queries get longer TTL to reduce load
    if (executionTime > 5000) return 3600; // 1 hour
    if (executionTime > 1000) return 1800; // 30 minutes
    if (executionTime > 500) return 600;   // 10 minutes
    return 300; // 5 minutes
  }

  /**
   * Detect missing indexes from execution plan
   */
  private detectMissingIndexes(plan: string, query: string): string[] {
    const suggestions: string[] = [];

    // Check for sequential scans
    if (plan.includes('Seq Scan')) {
      const tableMatch = plan.match(/Seq Scan on (\w+)/);
      if (tableMatch) {
        const table = tableMatch[1];

        // Extract WHERE conditions
        const whereMatch = query.match(/WHERE\s+(.+?)(?:ORDER|GROUP|LIMIT|$)/i);
        if (whereMatch) {
          const conditions = whereMatch[1];
          const columnMatch = conditions.match(/(\w+)\s*=/);
          if (columnMatch) {
            suggestions.push(`CREATE INDEX idx_${table}_${columnMatch[1]} ON "${table}" ("${columnMatch[1]}")`);
          }
        }
      }
    }

    return suggestions;
  }

  /**
   * Detect N+1 query pattern
   */
  private detectNPlusOne(query: string): boolean {
    const stats = this.queryStats.get(query);

    // If this query is being called frequently in a short time, it might be N+1
    if (stats && stats.count > 10) {
      return true;
    }

    return false;
  }

  /**
   * Extract row count from execution plan
   */
  private extractRowCount(plan: string): number {
    const match = plan.match(/rows=(\d+)/);
    return match ? parseInt(match[1], 10) : 0;
  }
}

// Singleton instance
export const queryOptimizer = new QueryOptimizer();
