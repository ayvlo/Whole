/**
 * Health Check API
 *
 * Returns system health status
 */

import { NextResponse } from 'next/server';
import { checkDatabaseHealth } from '@/lib/db/prisma';
import { observability } from '@/lib/observability/metrics';

export async function GET() {
  try {
    const startTime = Date.now();

    // Check database
    const dbHealth = await checkDatabaseHealth();

    // Check observability
    const metricsHealth = await observability.getHealthMetrics();

    // Overall health
    const healthy = dbHealth.healthy;
    const status = healthy ? 'healthy' : 'unhealthy';

    const response = {
      status,
      timestamp: new Date().toISOString(),
      uptime: process.uptime(),
      version: '1.0.0',
      checks: {
        database: {
          status: dbHealth.healthy ? 'up' : 'down',
          latency: dbHealth.latency,
          error: dbHealth.error,
        },
        metrics: {
          status: 'up',
          buffered: metricsHealth.bufferedMetrics,
          counters: metricsHealth.totalCounters,
          gauges: metricsHealth.totalGauges,
        },
      },
      performance: {
        responseTime: Date.now() - startTime,
      },
    };

    await observability.increment('health_check.total', {
      status,
    });

    return NextResponse.json(response, {
      status: healthy ? 200 : 503,
    });
  } catch (error) {
    return NextResponse.json(
      {
        status: 'error',
        error: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}
