/**
 * Event Ingestion API
 *
 * Core endpoint for ingesting metrics and detecting anomalies
 */

import { NextRequest, NextResponse } from 'next/server';
import { detector } from '@/lib/ai/advanced-detector';
import { explainer } from '@/lib/ai/explainer';
import { actionEngine } from '@/lib/ai/action-engine';
import { eventProcessor } from '@/lib/events/stream-processor';
import { billingEngine } from '@/lib/billing/usage-engine';
import { observability, tracer } from '@/lib/observability/metrics';
import { rateLimiter } from '@/lib/performance/resilience';
import { prisma } from '@/lib/db/prisma';

interface IngestRequest {
  metric: string;
  value: number;
  timestamp?: string;
  dimensions?: Record<string, any>;
}

export async function POST(request: NextRequest) {
  const span = tracer.startSpan('ingest_request');

  try {
    // Rate limiting
    const apiKey = request.headers.get('authorization')?.replace('Bearer ', '');
    if (!apiKey) {
      return NextResponse.json(
        { error: 'Missing API key' },
        { status: 401 }
      );
    }

    const rateLimitResult = await rateLimiter.isAllowed(
      `api_key:${apiKey}`,
      {
        maxRequests: 1000,
        windowMs: 60000,
        strategy: 'sliding-window',
      }
    );

    if (!rateLimitResult.allowed) {
      return NextResponse.json(
        {
          error: 'Rate limit exceeded',
          resetAt: new Date(rateLimitResult.resetAt).toISOString(),
        },
        { status: 429 }
      );
    }

    // Validate API key and get organization
    const apiKeyRecord = await prisma.apiKey.findUnique({
      where: { keyHash: apiKey }, // In production, hash the key
      include: {
        organization: {
          include: {
            workspaces: true,
          },
        },
      },
    });

    if (!apiKeyRecord) {
      return NextResponse.json(
        { error: 'Invalid API key' },
        { status: 401 }
      );
    }

    const organizationId = apiKeyRecord.organizationId;
    const workspaceId = apiKeyRecord.organization.workspaces[0]?.id;

    if (!workspaceId) {
      return NextResponse.json(
        { error: 'No workspace found' },
        { status: 400 }
      );
    }

    // Parse request body
    const body: IngestRequest[] = await request.json();

    if (!Array.isArray(body)) {
      return NextResponse.json(
        { error: 'Request must be an array of events' },
        { status: 400 }
      );
    }

    const results = [];

    for (const event of body) {
      try {
        // Validate event
        if (!event.metric || typeof event.value !== 'number') {
          results.push({
            metric: event.metric,
            status: 'error',
            error: 'Invalid event format',
          });
          continue;
        }

        const timestamp = event.timestamp
          ? new Date(event.timestamp)
          : new Date();

        // Create data point
        const dataPoint = {
          timestamp,
          value: event.value,
          metric: event.metric,
          dimensions: event.dimensions,
        };

        // Publish event to stream
        await eventProcessor.publish({
          id: '',
          type: 'metric.ingested',
          timestamp,
          organizationId,
          workspaceId,
          data: dataPoint,
        });

        // Get historical data for this metric
        const historicalData = await getHistoricalData(
          workspaceId,
          event.metric,
          30 // last 30 days
        );

        // Detect anomalies
        const anomalyResult = await detector.detect(dataPoint, historicalData);

        tracer.annotate(span.id, 'anomaly_detected', anomalyResult.isAnomaly);

        let explanation = null;
        let actionResult = null;

        // If anomaly detected, generate explanation and execute actions
        if (anomalyResult.isAnomaly) {
          // Generate explanation
          explanation = await explainer.explain({
            anomaly: anomalyResult,
            dataPoint,
            historicalData,
            businessContext: {
              metric: event.metric,
              metricType: getMetricType(event.metric),
            },
            userLevel: 'business',
          });

          // Store anomaly in database
          await prisma.anomaly.create({
            data: {
              workspaceId,
              metric: event.metric,
              severity: Math.round(anomalyResult.confidence * 100),
              payload: dataPoint as any,
              explanation: explanation.summary,
              aiScore: anomalyResult.score,
              status: 'OPEN',
            },
          });

          // Execute automated actions based on workflows
          const workflows = await prisma.workflow.findMany({
            where: {
              workspaceId,
              isActive: true,
            },
          });

          for (const workflow of workflows) {
            // Check if workflow trigger matches
            const trigger = workflow.trigger as any;
            if (trigger.type === 'anomaly_detected') {
              // Execute workflow actions
              const actions = workflow.actions as any[];

              for (const action of actions) {
                try {
                  const result = await actionEngine.executeAction(
                    {
                      id: action.id ?? `action_${Date.now()}`,
                      type: action.type,
                      name: action.name ?? action.type,
                      description: '',
                      config: action.config,
                      expectedImpact: {
                        type: 'positive',
                        magnitude: 0.5,
                        description: '',
                        metrics: [],
                      },
                      risks: [],
                      requiredApprovals: [],
                    },
                    {
                      anomaly: anomalyResult,
                      explanation,
                      organizationId,
                      workspaceId,
                    }
                  );

                  actionResult = result;
                } catch (error) {
                  console.error('[Ingest] Action execution failed:', error);
                }
              }
            }
          }
        }

        // Record usage for billing
        await billingEngine.recordUsage({
          customerId: organizationId,
          metric: 'api_calls',
          quantity: 1,
          timestamp,
        });

        if (anomalyResult.isAnomaly) {
          await billingEngine.recordUsage({
            customerId: organizationId,
            metric: 'anomalies_detected',
            quantity: 1,
            timestamp,
          });
        }

        // Track metrics
        await observability.histogram('ingest.processing_time', Date.now() - timestamp.getTime());
        await observability.increment('ingest.events_processed', {
          metric: event.metric,
          anomaly: anomalyResult.isAnomaly ? 'true' : 'false',
        });

        results.push({
          metric: event.metric,
          status: 'success',
          anomaly: anomalyResult.isAnomaly ? {
            detected: true,
            severity: anomalyResult.severity,
            confidence: anomalyResult.confidence,
            score: anomalyResult.score,
            explanation: explanation?.summary,
            actions: actionResult ? [actionResult.id] : [],
          } : {
            detected: false,
          },
        });
      } catch (error) {
        console.error('[Ingest] Error processing event:', error);

        results.push({
          metric: event.metric,
          status: 'error',
          error: error instanceof Error ? error.message : 'Unknown error',
        });
      }
    }

    tracer.endSpan(span.id);

    return NextResponse.json({
      success: true,
      processed: results.length,
      results,
    });
  } catch (error) {
    tracer.annotate(span.id, 'error', error);
    tracer.endSpan(span.id);

    console.error('[Ingest] Request error:', error);

    return NextResponse.json(
      {
        error: error instanceof Error ? error.message : 'Internal server error',
      },
      { status: 500 }
    );
  }
}

/**
 * Get historical data for metric
 */
async function getHistoricalData(
  workspaceId: string,
  metric: string,
  days: number
): Promise<any[]> {
  const since = new Date();
  since.setDate(since.getDate() - days);

  // In production, this would query from time-series database
  // For now, generate sample data
  const data = [];
  const now = Date.now();

  for (let i = days; i >= 0; i--) {
    const timestamp = new Date(now - i * 24 * 60 * 60 * 1000);
    const baseValue = 100;
    const variation = Math.random() * 20 - 10;

    data.push({
      timestamp,
      value: baseValue + variation,
      metric,
    });
  }

  return data;
}

/**
 * Determine metric type
 */
function getMetricType(metric: string): 'revenue' | 'usage' | 'performance' | 'custom' {
  if (metric.includes('revenue') || metric.includes('mrr') || metric.includes('payment')) {
    return 'revenue';
  }
  if (metric.includes('usage') || metric.includes('calls') || metric.includes('requests')) {
    return 'usage';
  }
  if (metric.includes('latency') || metric.includes('response') || metric.includes('cpu')) {
    return 'performance';
  }
  return 'custom';
}
