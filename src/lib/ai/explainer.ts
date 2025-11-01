/**
 * Enterprise AI Explainability Engine
 *
 * Features:
 * - LLM-powered natural language explanations
 * - Causal inference
 * - Root cause analysis
 * - Impact prediction
 * - Business-context aware
 * - Multi-level explanations (technical/business/executive)
 */

import { AnomalyResult, DataPoint } from './advanced-detector';
import { observability } from '../observability/metrics';

export interface ExplanationContext {
  anomaly: AnomalyResult;
  dataPoint: DataPoint;
  historicalData: DataPoint[];
  businessContext: {
    metric: string;
    metricType: 'revenue' | 'usage' | 'performance' | 'custom';
    industry?: string;
    historicalPatterns?: Pattern[];
    relatedMetrics?: RelatedMetric[];
  };
  userLevel: 'technical' | 'business' | 'executive';
}

export interface Pattern {
  type: 'trend' | 'seasonality' | 'cycle' | 'event';
  description: string;
  strength: number; // 0-1
  period?: string; // e.g., "weekly", "monthly"
}

export interface RelatedMetric {
  name: string;
  correlation: number; // -1 to 1
  currentValue: number;
  trend: 'increasing' | 'decreasing' | 'stable';
}

export interface CausalFactor {
  factor: string;
  confidence: number; // 0-1
  impact: 'high' | 'medium' | 'low';
  evidence: string[];
  category: 'technical' | 'business' | 'external' | 'seasonal';
}

export interface Action {
  id: string;
  type: string;
  description: string;
  priority: 'immediate' | 'high' | 'medium' | 'low';
  estimatedEffort: string;
  expectedOutcome: string;
}

export interface Explanation {
  summary: string; // One-sentence summary
  detailed: string; // Full analysis
  rootCause: {
    identified: boolean;
    confidence: number;
    factors: CausalFactor[];
    primaryFactor?: CausalFactor;
  };
  impact: {
    businessImpact: string;
    affectedSystems: string[];
    estimatedCost: number | null;
    severity: 'critical' | 'high' | 'medium' | 'low';
    timeframe: string; // e.g., "immediate", "24 hours", "1 week"
  };
  recommendations: {
    immediate: Action[];
    shortTerm: Action[];
    longTerm: Action[];
  };
  visualizations: ChartSpec[];
  confidence: number; // Overall explanation confidence 0-1
}

export interface ChartSpec {
  type: 'line' | 'bar' | 'scatter' | 'heatmap';
  title: string;
  data: any[];
  config: Record<string, any>;
}

export interface ImpactForecast {
  metric: string;
  projections: Array<{
    timestamp: Date;
    value: number;
    confidence: number;
  }>;
  scenarios: Array<{
    name: string;
    description: string;
    probability: number;
    impact: 'positive' | 'negative' | 'neutral';
    magnitude: number;
  }>;
}

export interface CausalAnalysis {
  rootCauses: CausalFactor[];
  causalChain: Array<{
    cause: string;
    effect: string;
    strength: number;
  }>;
  confoundingFactors: string[];
  confidence: number;
}

/**
 * AI Explainability Engine
 */
export class AIExplainer {
  private openaiApiKey: string | null;
  private anthropicApiKey: string | null;

  constructor() {
    this.openaiApiKey = process.env.OPENAI_API_KEY ?? null;
    this.anthropicApiKey = process.env.ANTHROPIC_API_KEY ?? null;
  }

  /**
   * Generate comprehensive explanation for anomaly
   */
  async explain(context: ExplanationContext): Promise<Explanation> {
    const startTime = Date.now();

    try {
      // Generate different explanation levels
      const summary = await this.generateSummary(context);
      const detailed = await this.generateDetailedExplanation(context);

      // Perform causal analysis
      const rootCause = await this.identifyRootCause(context);

      // Assess business impact
      const impact = await this.assessImpact(context);

      // Generate recommendations
      const recommendations = await this.generateRecommendations(context, rootCause);

      // Create visualizations
      const visualizations = this.generateVisualizations(context);

      // Calculate overall confidence
      const confidence = this.calculateExplanationConfidence(context, rootCause);

      await observability.histogram(
        'ai.explainer.duration',
        Date.now() - startTime
      );

      return {
        summary,
        detailed,
        rootCause,
        impact,
        recommendations,
        visualizations,
        confidence,
      };
    } catch (error) {
      console.error('[AIExplainer] Error generating explanation:', error);

      // Fallback to rule-based explanation
      return this.generateFallbackExplanation(context);
    }
  }

  /**
   * Generate concise summary using LLM
   */
  private async generateSummary(context: ExplanationContext): Promise<string> {
    const { anomaly, dataPoint, businessContext, userLevel } = context;

    // Build prompt for LLM
    const prompt = this.buildSummaryPrompt(context);

    // Try OpenAI first, fallback to Anthropic
    if (this.openaiApiKey) {
      try {
        const response = await this.callOpenAI(prompt, 100);
        return response;
      } catch (error) {
        console.error('[AIExplainer] OpenAI error:', error);
      }
    }

    if (this.anthropicApiKey) {
      try {
        const response = await this.callAnthropic(prompt, 100);
        return response;
      } catch (error) {
        console.error('[AIExplainer] Anthropic error:', error);
      }
    }

    // Fallback to template-based summary
    return this.generateTemplateSummary(context);
  }

  /**
   * Generate detailed explanation using LLM
   */
  private async generateDetailedExplanation(
    context: ExplanationContext
  ): Promise<string> {
    const prompt = this.buildDetailedPrompt(context);

    if (this.openaiApiKey) {
      try {
        return await this.callOpenAI(prompt, 500);
      } catch (error) {
        console.error('[AIExplainer] OpenAI error:', error);
      }
    }

    if (this.anthropicApiKey) {
      try {
        return await this.callAnthropic(prompt, 500);
      } catch (error) {
        console.error('[AIExplainer] Anthropic error:', error);
      }
    }

    return this.generateTemplateDetailed(context);
  }

  /**
   * Identify root cause using causal inference
   */
  async identifyRootCause(
    context: ExplanationContext
  ): Promise<Explanation['rootCause']> {
    const factors = await this.identifyPotentialFactors(context);

    // Rank factors by confidence
    const rankedFactors = factors.sort((a, b) => b.confidence - a.confidence);

    const identified = rankedFactors.length > 0 && rankedFactors[0].confidence > 0.6;
    const primaryFactor = identified ? rankedFactors[0] : undefined;

    const confidence = identified ? rankedFactors[0].confidence : 0;

    return {
      identified,
      confidence,
      factors: rankedFactors.slice(0, 5), // Top 5 factors
      primaryFactor,
    };
  }

  /**
   * Identify potential causal factors
   */
  private async identifyPotentialFactors(
    context: ExplanationContext
  ): Promise<CausalFactor[]> {
    const factors: CausalFactor[] = [];
    const { anomaly, dataPoint, businessContext, historicalData } = context;

    // Technical factors
    if (anomaly.score > 0.8) {
      factors.push({
        factor: 'Significant deviation from baseline',
        confidence: anomaly.confidence,
        impact: 'high',
        evidence: [
          `Anomaly score: ${(anomaly.score * 100).toFixed(1)}%`,
          `Confidence: ${(anomaly.confidence * 100).toFixed(1)}%`,
          `Severity: ${anomaly.severity}`,
        ],
        category: 'technical',
      });
    }

    // Trend analysis
    const recentTrend = this.analyzeTrend(
      historicalData.slice(-10).map(d => d.value)
    );

    if (recentTrend.direction !== 'stable') {
      factors.push({
        factor: `${recentTrend.direction === 'increasing' ? 'Upward' : 'Downward'} trend detected`,
        confidence: recentTrend.strength,
        impact: recentTrend.strength > 0.7 ? 'high' : 'medium',
        evidence: [
          `Trend strength: ${(recentTrend.strength * 100).toFixed(1)}%`,
          `Direction: ${recentTrend.direction}`,
        ],
        category: 'technical',
      });
    }

    // Seasonality
    if (businessContext.historicalPatterns) {
      const seasonalPattern = businessContext.historicalPatterns.find(
        p => p.type === 'seasonality'
      );
      if (seasonalPattern && seasonalPattern.strength > 0.5) {
        factors.push({
          factor: `Seasonal pattern violation`,
          confidence: seasonalPattern.strength,
          impact: 'medium',
          evidence: [
            `Pattern: ${seasonalPattern.description}`,
            `Strength: ${(seasonalPattern.strength * 100).toFixed(1)}%`,
          ],
          category: 'seasonal',
        });
      }
    }

    // Correlated metrics
    if (businessContext.relatedMetrics) {
      for (const metric of businessContext.relatedMetrics) {
        if (Math.abs(metric.correlation) > 0.7) {
          factors.push({
            factor: `Correlated metric change: ${metric.name}`,
            confidence: Math.abs(metric.correlation),
            impact: Math.abs(metric.correlation) > 0.85 ? 'high' : 'medium',
            evidence: [
              `Correlation: ${(metric.correlation * 100).toFixed(1)}%`,
              `Current value: ${metric.currentValue}`,
              `Trend: ${metric.trend}`,
            ],
            category: 'business',
          });
        }
      }
    }

    // Business context factors
    if (businessContext.metricType === 'revenue' && dataPoint.value < 0) {
      factors.push({
        factor: 'Revenue decline',
        confidence: 0.9,
        impact: 'high',
        evidence: ['Negative revenue value detected'],
        category: 'business',
      });
    }

    return factors;
  }

  /**
   * Assess business impact
   */
  private async assessImpact(
    context: ExplanationContext
  ): Promise<Explanation['impact']> {
    const { anomaly, businessContext, dataPoint } = context;

    let severity: 'critical' | 'high' | 'medium' | 'low' = 'medium';
    let estimatedCost: number | null = null;
    let timeframe = 'immediate';

    // Determine severity
    if (anomaly.severity === 'critical' || anomaly.confidence > 0.9) {
      severity = 'critical';
      timeframe = 'immediate';
    } else if (anomaly.severity === 'warning' || anomaly.confidence > 0.7) {
      severity = 'high';
      timeframe = '24 hours';
    } else {
      severity = anomaly.severity === 'critical' ? 'high' : 'medium';
      timeframe = '1 week';
    }

    // Estimate cost for revenue metrics
    if (businessContext.metricType === 'revenue') {
      const historicalAvg =
        context.historicalData.reduce((sum, d) => sum + d.value, 0) /
        context.historicalData.length;
      const deviation = dataPoint.value - historicalAvg;
      estimatedCost = Math.abs(deviation);
    }

    // Identify affected systems
    const affectedSystems = this.identifyAffectedSystems(context);

    // Generate business impact description
    const businessImpact = this.generateBusinessImpactDescription(
      context,
      severity,
      estimatedCost
    );

    return {
      businessImpact,
      affectedSystems,
      estimatedCost,
      severity,
      timeframe,
    };
  }

  /**
   * Generate recommendations
   */
  private async generateRecommendations(
    context: ExplanationContext,
    rootCause: Explanation['rootCause']
  ): Promise<Explanation['recommendations']> {
    const immediate: Action[] = [];
    const shortTerm: Action[] = [];
    const longTerm: Action[] = [];

    // Immediate actions
    if (context.anomaly.severity === 'critical') {
      immediate.push({
        id: 'investigate-immediately',
        type: 'investigation',
        description: 'Investigate the anomaly immediately to understand its scope and impact',
        priority: 'immediate',
        estimatedEffort: '15-30 minutes',
        expectedOutcome: 'Understanding of the anomaly scope and immediate risks',
      });

      immediate.push({
        id: 'notify-stakeholders',
        type: 'notification',
        description: 'Notify relevant stakeholders about the critical anomaly',
        priority: 'immediate',
        estimatedEffort: '5 minutes',
        expectedOutcome: 'Stakeholders are aware and can take appropriate action',
      });
    }

    // Short-term actions
    if (rootCause.identified && rootCause.primaryFactor) {
      shortTerm.push({
        id: 'address-root-cause',
        type: 'remediation',
        description: `Address root cause: ${rootCause.primaryFactor.factor}`,
        priority: 'high',
        estimatedEffort: '2-4 hours',
        expectedOutcome: 'Root cause resolved, metric returns to normal',
      });
    }

    shortTerm.push({
      id: 'monitor-closely',
      type: 'monitoring',
      description: 'Monitor the metric closely for the next 24-48 hours',
      priority: 'high',
      estimatedEffort: 'Ongoing',
      expectedOutcome: 'Early detection of recurring issues',
    });

    // Long-term actions
    longTerm.push({
      id: 'improve-alerting',
      type: 'prevention',
      description: 'Review and improve alerting thresholds to catch similar issues earlier',
      priority: 'medium',
      estimatedEffort: '2-3 hours',
      expectedOutcome: 'Better early warning system for future anomalies',
    });

    longTerm.push({
      id: 'post-mortem',
      type: 'documentation',
      description: 'Conduct a post-mortem analysis to prevent recurrence',
      priority: 'medium',
      estimatedEffort: '1-2 hours',
      expectedOutcome: 'Documented learnings and prevention strategies',
    });

    return {
      immediate,
      shortTerm,
      longTerm,
    };
  }

  /**
   * Predict future impact
   */
  async predictImpact(
    context: ExplanationContext
  ): Promise<ImpactForecast> {
    // Simplified impact forecasting
    // In production, use time-series forecasting models

    const projections: ImpactForecast['projections'] = [];
    const currentValue = context.dataPoint.value;
    const trend = this.analyzeTrend(
      context.historicalData.slice(-10).map(d => d.value)
    );

    // Generate 24-hour forecast
    for (let i = 1; i <= 24; i++) {
      const timestamp = new Date(context.dataPoint.timestamp.getTime() + i * 3600000);
      let value = currentValue;

      if (trend.direction === 'increasing') {
        value = currentValue * (1 + 0.01 * i * trend.strength);
      } else if (trend.direction === 'decreasing') {
        value = currentValue * (1 - 0.01 * i * trend.strength);
      }

      projections.push({
        timestamp,
        value,
        confidence: Math.max(0.3, 0.9 - i * 0.02), // Decreasing confidence over time
      });
    }

    const scenarios: ImpactForecast['scenarios'] = [
      {
        name: 'Best Case',
        description: 'Issue resolves itself within 6 hours',
        probability: 0.2,
        impact: 'positive',
        magnitude: 0.8,
      },
      {
        name: 'Most Likely',
        description: 'Issue requires intervention and resolves within 24 hours',
        probability: 0.6,
        impact: 'neutral',
        magnitude: 0.5,
      },
      {
        name: 'Worst Case',
        description: 'Issue persists and escalates, requiring major intervention',
        probability: 0.2,
        impact: 'negative',
        magnitude: 0.9,
      },
    ];

    return {
      metric: context.businessContext.metric,
      projections,
      scenarios,
    };
  }

  /**
   * Generate visualizations
   */
  private generateVisualizations(context: ExplanationContext): ChartSpec[] {
    const charts: ChartSpec[] = [];

    // Time series chart
    charts.push({
      type: 'line',
      title: `${context.businessContext.metric} Over Time`,
      data: context.historicalData.map(d => ({
        timestamp: d.timestamp,
        value: d.value,
        isAnomaly: false,
      })).concat([{
        timestamp: context.dataPoint.timestamp,
        value: context.dataPoint.value,
        isAnomaly: true,
      }]),
      config: {
        xAxis: 'timestamp',
        yAxis: 'value',
        highlightAnomaly: true,
      },
    });

    // Algorithm contribution chart
    if (context.anomaly.algorithms.length > 0) {
      charts.push({
        type: 'bar',
        title: 'Detection Algorithm Contributions',
        data: context.anomaly.algorithms.map(a => ({
          algorithm: a.name,
          contribution: a.contribution * 100,
          score: a.score * 100,
        })),
        config: {
          xAxis: 'algorithm',
          yAxis: 'contribution',
        },
      });
    }

    return charts;
  }

  /**
   * Helper methods
   */
  private analyzeTrend(
    values: number[]
  ): { direction: 'increasing' | 'decreasing' | 'stable'; strength: number } {
    if (values.length < 3) {
      return { direction: 'stable', strength: 0 };
    }

    // Simple linear regression
    const n = values.length;
    const sumX = (n * (n - 1)) / 2;
    const sumY = values.reduce((a, b) => a + b, 0);
    const sumXY = values.reduce((sum, y, x) => sum + x * y, 0);
    const sumX2 = (n * (n - 1) * (2 * n - 1)) / 6;

    const slope = (n * sumXY - sumX * sumY) / (n * sumX2 - sumX * sumX);
    const strength = Math.min(Math.abs(slope) / 10, 1); // Normalize

    if (Math.abs(slope) < 0.01) {
      return { direction: 'stable', strength: 0 };
    }

    return {
      direction: slope > 0 ? 'increasing' : 'decreasing',
      strength,
    };
  }

  private identifyAffectedSystems(context: ExplanationContext): string[] {
    const systems: string[] = [];

    // Based on metric type
    switch (context.businessContext.metricType) {
      case 'revenue':
        systems.push('Billing System', 'Payment Processing', 'Revenue Analytics');
        break;
      case 'usage':
        systems.push('API Gateway', 'Usage Tracking', 'Rate Limiting');
        break;
      case 'performance':
        systems.push('Application Servers', 'Database', 'Load Balancer');
        break;
      default:
        systems.push('Monitoring System');
    }

    return systems;
  }

  private generateBusinessImpactDescription(
    context: ExplanationContext,
    severity: string,
    estimatedCost: number | null
  ): string {
    let impact = `${severity.charAt(0).toUpperCase() + severity.slice(1)} severity anomaly detected in ${context.businessContext.metric}.`;

    if (estimatedCost !== null && context.businessContext.metricType === 'revenue') {
      impact += ` Estimated revenue impact: $${Math.abs(estimatedCost).toFixed(2)}.`;
    }

    if (context.anomaly.confidence > 0.8) {
      impact += ' High confidence detection indicates this requires immediate attention.';
    }

    return impact;
  }

  private calculateExplanationConfidence(
    context: ExplanationContext,
    rootCause: Explanation['rootCause']
  ): number {
    // Combine various confidence factors
    const factors = [
      context.anomaly.confidence,
      rootCause.confidence,
      context.historicalData.length > 100 ? 0.9 : 0.7,
    ];

    return factors.reduce((a, b) => a + b, 0) / factors.length;
  }

  /**
   * LLM API calls (stubbed - implement with actual API calls)
   */
  private async callOpenAI(prompt: string, maxTokens: number): Promise<string> {
    // In production, call OpenAI API
    // For now, return template
    console.log('[AIExplainer] Would call OpenAI with prompt:', prompt.substring(0, 100));
    throw new Error('OpenAI not configured');
  }

  private async callAnthropic(prompt: string, maxTokens: number): Promise<string> {
    // In production, call Anthropic API
    console.log('[AIExplainer] Would call Anthropic with prompt:', prompt.substring(0, 100));
    throw new Error('Anthropic not configured');
  }

  /**
   * Prompt builders
   */
  private buildSummaryPrompt(context: ExplanationContext): string {
    return `You are an AI explaining an anomaly detection to a ${context.userLevel} user.

Anomaly Details:
- Metric: ${context.businessContext.metric}
- Value: ${context.dataPoint.value}
- Severity: ${context.anomaly.severity}
- Confidence: ${(context.anomaly.confidence * 100).toFixed(1)}%
- Explanation: ${context.anomaly.explanation.reason}

Provide a one-sentence summary of this anomaly that a ${context.userLevel} person would understand.`;
  }

  private buildDetailedPrompt(context: ExplanationContext): string {
    return `Provide a detailed explanation of this anomaly:

${this.buildSummaryPrompt(context)}

Include:
1. What happened
2. Why it's significant
3. Potential causes
4. Recommended next steps`;
  }

  /**
   * Template fallbacks
   */
  private generateTemplateSummary(context: ExplanationContext): string {
    const { anomaly, dataPoint, businessContext } = context;

    return `${businessContext.metric} showed ${anomaly.severity} anomaly with value ${dataPoint.value.toFixed(2)}, ` +
      `which is ${anomaly.explanation.deviation.toFixed(1)}σ from the expected range.`;
  }

  private generateTemplateDetailed(context: ExplanationContext): string {
    const { anomaly, dataPoint, businessContext } = context;

    return `Detailed Analysis of ${businessContext.metric}:

Current Value: ${dataPoint.value.toFixed(2)}
Expected Range: [${anomaly.explanation.expectedRange[0].toFixed(2)}, ${anomaly.explanation.expectedRange[1].toFixed(2)}]
Deviation: ${anomaly.explanation.deviation.toFixed(1)} standard deviations
Severity: ${anomaly.severity}
Confidence: ${(anomaly.confidence * 100).toFixed(1)}%

${anomaly.explanation.reason}

This anomaly was detected using ${anomaly.algorithms.length} different algorithms, with ${anomaly.algorithms.filter(a => a.isAnomaly).length} agreeing on the anomaly.

${anomaly.explanation.historicalContext}`;
  }

  private generateFallbackExplanation(context: ExplanationContext): Explanation {
    return {
      summary: this.generateTemplateSummary(context),
      detailed: this.generateTemplateDetailed(context),
      rootCause: {
        identified: false,
        confidence: 0.5,
        factors: [],
      },
      impact: {
        businessImpact: 'Unable to assess impact automatically',
        affectedSystems: [],
        estimatedCost: null,
        severity: context.anomaly.severity as any,
        timeframe: 'unknown',
      },
      recommendations: {
        immediate: [],
        shortTerm: [],
        longTerm: [],
      },
      visualizations: this.generateVisualizations(context),
      confidence: 0.5,
    };
  }
}

// Export singleton
export const explainer = new AIExplainer();
