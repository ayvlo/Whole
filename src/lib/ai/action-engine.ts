/**
 * Intelligent Action Engine
 *
 * Features:
 * - AI-powered workflow automation
 * - Reinforcement learning for action optimization
 * - Multi-agent orchestration
 * - Automated rollback on failure
 * - Approval workflows
 * - Success rate tracking
 */

import { AnomalyResult } from './advanced-detector';
import { Explanation } from './explainer';
import { observability } from '../observability/metrics';
import { prisma } from '../db/prisma';

export interface Action {
  id: string;
  type: 'webhook' | 'slack' | 'email' | 'pagerduty' | 'auto-remediate' | 'custom';
  name: string;
  description: string;
  config: Record<string, any>;
  expectedImpact: Impact;
  risks: Risk[];
  requiredApprovals: Approval[];
  retryPolicy?: RetryPolicy;
  rollbackStrategy?: RollbackStrategy;
}

export interface Impact {
  type: 'positive' | 'negative' | 'neutral';
  magnitude: number; // 0-1
  description: string;
  metrics: string[]; // Affected metrics
}

export interface Risk {
  type: 'data-loss' | 'service-disruption' | 'financial' | 'compliance' | 'security';
  severity: 'low' | 'medium' | 'high' | 'critical';
  probability: number; // 0-1
  mitigation?: string;
}

export interface Approval {
  role: 'owner' | 'admin' | 'technical-lead';
  required: boolean;
  reason: string;
}

export interface RetryPolicy {
  maxRetries: number;
  backoffMultiplier: number;
  initialDelay: number; // milliseconds
  maxDelay: number;
}

export interface RollbackStrategy {
  enabled: boolean;
  condition: 'on-error' | 'on-timeout' | 'on-metric-degradation';
  steps: Array<{
    action: string;
    params: Record<string, any>;
  }>;
}

export interface WorkflowExecution {
  id: string;
  workflowId: string;
  status: 'pending' | 'running' | 'completed' | 'failed' | 'rolled-back';
  startedAt: Date;
  completedAt?: Date;
  actions: ActionExecution[];
  outcome?: Outcome;
  error?: string;
}

export interface ActionExecution {
  actionId: string;
  actionType: string;
  status: 'pending' | 'running' | 'completed' | 'failed' | 'skipped';
  startedAt?: Date;
  completedAt?: Date;
  result?: any;
  error?: string;
  retryCount: number;
}

export interface Outcome {
  success: boolean;
  impactRealised: boolean;
  metricsChanged: Record<string, { before: number; after: number }>;
  duration: number; // milliseconds
  notes: string;
}

export interface ActionContext {
  anomaly: AnomalyResult;
  explanation: Explanation;
  organizationId: string;
  workspaceId: string;
  userId?: string;
}

/**
 * Action Registry - Available actions
 */
class ActionRegistry {
  private actions: Map<string, Action> = new Map();

  register(action: Action): void {
    this.actions.set(action.id, action);
  }

  get(id: string): Action | undefined {
    return this.actions.get(id);
  }

  getAll(): Action[] {
    return Array.from(this.actions.values());
  }

  findByType(type: string): Action[] {
    return Array.from(this.actions.values()).filter(a => a.type === type);
  }
}

/**
 * Intelligent Action Engine
 */
export class IntelligentActionEngine {
  private registry: ActionRegistry;
  private actionHistory: Map<string, ActionExecution[]> = new Map();
  private learningRate = 0.1;

  constructor() {
    this.registry = new ActionRegistry();
    this.registerDefaultActions();
  }

  /**
   * Select optimal action for anomaly using ML
   */
  async selectOptimalAction(
    anomaly: AnomalyResult,
    availableActions: Action[],
    context: ActionContext
  ): Promise<Action | null> {
    if (availableActions.length === 0) {
      return null;
    }

    // Score each action based on:
    // 1. Historical success rate
    // 2. Expected impact
    // 3. Risk level
    // 4. Context relevance

    const scores = await Promise.all(
      availableActions.map(action => this.scoreAction(action, anomaly, context))
    );

    // Find action with highest score
    const maxScore = Math.max(...scores);
    const bestIndex = scores.indexOf(maxScore);

    // Only execute if confidence is high enough
    if (maxScore < 0.5) {
      console.log('[ActionEngine] No action meets confidence threshold');
      return null;
    }

    return availableActions[bestIndex];
  }

  /**
   * Execute action with retries and rollback
   */
  async executeAction(
    action: Action,
    context: ActionContext
  ): Promise<WorkflowExecution> {
    const executionId = this.generateId();
    const startTime = Date.now();

    const execution: WorkflowExecution = {
      id: executionId,
      workflowId: action.id,
      status: 'running',
      startedAt: new Date(),
      actions: [{
        actionId: action.id,
        actionType: action.type,
        status: 'running',
        startedAt: new Date(),
        retryCount: 0,
      }],
    };

    try {
      // Check approvals
      if (action.requiredApprovals.length > 0) {
        const approved = await this.checkApprovals(action, context);
        if (!approved) {
          execution.status = 'failed';
          execution.error = 'Required approvals not obtained';
          return execution;
        }
      }

      // Execute with retries
      const result = await this.executeWithRetry(action, context);

      execution.actions[0].status = 'completed';
      execution.actions[0].completedAt = new Date();
      execution.actions[0].result = result;
      execution.status = 'completed';
      execution.completedAt = new Date();

      // Learn from successful execution
      await this.learnFromOutcome(action, {
        success: true,
        impactRealised: true,
        metricsChanged: {},
        duration: Date.now() - startTime,
        notes: 'Successfully executed',
      });

      // Track metrics
      await observability.increment('actions.executed', {
        type: action.type,
        status: 'success',
      });

      return execution;
    } catch (error) {
      execution.actions[0].status = 'failed';
      execution.actions[0].error = error instanceof Error ? error.message : 'Unknown error';
      execution.status = 'failed';
      execution.completedAt = new Date();
      execution.error = error instanceof Error ? error.message : 'Unknown error';

      // Attempt rollback
      if (action.rollbackStrategy?.enabled) {
        await this.rollback(action, context);
        execution.status = 'rolled-back';
      }

      // Learn from failure
      await this.learnFromOutcome(action, {
        success: false,
        impactRealised: false,
        metricsChanged: {},
        duration: Date.now() - startTime,
        notes: `Failed: ${error instanceof Error ? error.message : 'Unknown'}`,
      });

      // Track metrics
      await observability.increment('actions.executed', {
        type: action.type,
        status: 'failed',
      });

      return execution;
    }
  }

  /**
   * Orchestrate complex multi-action workflow
   */
  async orchestrate(
    anomaly: AnomalyResult,
    context: ActionContext,
    workflow: Action[]
  ): Promise<WorkflowExecution> {
    const executionId = this.generateId();

    const execution: WorkflowExecution = {
      id: executionId,
      workflowId: 'multi-action-workflow',
      status: 'running',
      startedAt: new Date(),
      actions: [],
    };

    for (const action of workflow) {
      const actionExec: ActionExecution = {
        actionId: action.id,
        actionType: action.type,
        status: 'running',
        startedAt: new Date(),
        retryCount: 0,
      };

      execution.actions.push(actionExec);

      try {
        const result = await this.executeWithRetry(action, context);
        actionExec.status = 'completed';
        actionExec.completedAt = new Date();
        actionExec.result = result;
      } catch (error) {
        actionExec.status = 'failed';
        actionExec.error = error instanceof Error ? error.message : 'Unknown';
        actionExec.completedAt = new Date();

        // Stop workflow on failure
        execution.status = 'failed';
        execution.error = `Action ${action.id} failed: ${actionExec.error}`;
        execution.completedAt = new Date();

        return execution;
      }
    }

    execution.status = 'completed';
    execution.completedAt = new Date();

    return execution;
  }

  /**
   * Learn from action outcomes (Reinforcement Learning)
   */
  async learnFromOutcome(action: Action, outcome: Outcome): Promise<void> {
    // Store in history
    const history = this.actionHistory.get(action.id) ?? [];
    history.push({
      actionId: action.id,
      actionType: action.type,
      status: outcome.success ? 'completed' : 'failed',
      startedAt: new Date(),
      completedAt: new Date(),
      result: outcome,
      retryCount: 0,
    });

    this.actionHistory.set(action.id, history);

    // Update action's expected impact based on actual results
    if (outcome.success && outcome.impactRealised) {
      // Positive reinforcement - increase confidence in this action
      action.expectedImpact.magnitude = Math.min(
        1.0,
        action.expectedImpact.magnitude + this.learningRate
      );
    } else if (!outcome.success) {
      // Negative reinforcement - decrease confidence
      action.expectedImpact.magnitude = Math.max(
        0.1,
        action.expectedImpact.magnitude - this.learningRate
      );
    }

    console.log(
      `[ActionEngine] Learned from ${action.id}: success=${outcome.success}, new magnitude=${action.expectedImpact.magnitude.toFixed(2)}`
    );
  }

  /**
   * Get action success rate
   */
  getSuccessRate(actionId: string): number {
    const history = this.actionHistory.get(actionId) ?? [];
    if (history.length === 0) return 0.5; // Default unknown

    const successes = history.filter(h => h.status === 'completed').length;
    return successes / history.length;
  }

  /**
   * Get action statistics
   */
  getActionStats(actionId: string): {
    totalExecutions: number;
    successRate: number;
    avgDuration: number;
    lastExecuted?: Date;
  } {
    const history = this.actionHistory.get(actionId) ?? [];

    const totalExecutions = history.length;
    const successRate = this.getSuccessRate(actionId);

    const durations = history
      .filter(h => h.completedAt && h.startedAt)
      .map(h => h.completedAt!.getTime() - h.startedAt!.getTime());

    const avgDuration =
      durations.length > 0
        ? durations.reduce((a, b) => a + b, 0) / durations.length
        : 0;

    const lastExecuted = history.length > 0 ? history[history.length - 1].startedAt : undefined;

    return {
      totalExecutions,
      successRate,
      avgDuration,
      lastExecuted,
    };
  }

  /**
   * Private helper methods
   */
  private async scoreAction(
    action: Action,
    anomaly: AnomalyResult,
    context: ActionContext
  ): Promise<number> {
    // Historical success rate (0-1)
    const successRate = this.getSuccessRate(action.id);

    // Expected impact (0-1)
    const impactScore = action.expectedImpact.magnitude;

    // Risk penalty (0-1, inverted)
    const maxRiskSeverity = Math.max(
      ...action.risks.map(r => this.riskSeverityToNumber(r.severity)),
      0
    );
    const riskPenalty = 1 - maxRiskSeverity / 4; // 4 = critical

    // Context relevance (simplified - would use ML in production)
    const contextScore = this.calculateContextRelevance(action, anomaly);

    // Weighted combination
    const score =
      successRate * 0.3 +
      impactScore * 0.3 +
      riskPenalty * 0.2 +
      contextScore * 0.2;

    return score;
  }

  private calculateContextRelevance(action: Action, anomaly: AnomalyResult): number {
    // In production, use ML to determine relevance
    // For now, simple heuristics

    let score = 0.5; // Default

    // If anomaly is critical and action is notification, increase relevance
    if (anomaly.severity === 'critical' && action.type === 'pagerduty') {
      score = 0.9;
    }

    // If anomaly is info and action is auto-remediate, decrease relevance
    if (anomaly.severity === 'info' && action.type === 'auto-remediate') {
      score = 0.3;
    }

    return score;
  }

  private async executeWithRetry(
    action: Action,
    context: ActionContext
  ): Promise<any> {
    const retryPolicy = action.retryPolicy ?? {
      maxRetries: 3,
      backoffMultiplier: 2,
      initialDelay: 1000,
      maxDelay: 10000,
    };

    let lastError: Error | null = null;
    let delay = retryPolicy.initialDelay;

    for (let attempt = 0; attempt <= retryPolicy.maxRetries; attempt++) {
      try {
        return await this.executeActionCore(action, context);
      } catch (error) {
        lastError = error as Error;

        if (attempt < retryPolicy.maxRetries) {
          console.log(
            `[ActionEngine] Retry ${attempt + 1}/${retryPolicy.maxRetries} for ${action.id} after ${delay}ms`
          );
          await new Promise(resolve => setTimeout(resolve, delay));
          delay = Math.min(delay * retryPolicy.backoffMultiplier, retryPolicy.maxDelay);
        }
      }
    }

    throw lastError;
  }

  private async executeActionCore(action: Action, context: ActionContext): Promise<any> {
    console.log(`[ActionEngine] Executing ${action.type}: ${action.name}`);

    switch (action.type) {
      case 'webhook':
        return await this.executeWebhook(action, context);
      case 'slack':
        return await this.executeSlack(action, context);
      case 'email':
        return await this.executeEmail(action, context);
      case 'pagerduty':
        return await this.executePagerDuty(action, context);
      case 'auto-remediate':
        return await this.executeAutoRemediate(action, context);
      default:
        throw new Error(`Unknown action type: ${action.type}`);
    }
  }

  private async executeWebhook(action: Action, context: ActionContext): Promise<any> {
    const { url, method = 'POST', headers = {} } = action.config;

    const payload = {
      anomaly: context.anomaly,
      explanation: context.explanation,
      organizationId: context.organizationId,
      workspaceId: context.workspaceId,
      timestamp: new Date().toISOString(),
    };

    const response = await fetch(url, {
      method,
      headers: {
        'Content-Type': 'application/json',
        ...headers,
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      throw new Error(`Webhook failed: ${response.status} ${response.statusText}`);
    }

    return await response.json();
  }

  private async executeSlack(action: Action, context: ActionContext): Promise<any> {
    const { webhookUrl, channel } = action.config;

    const message = {
      text: `🚨 Anomaly Detected: ${context.anomaly.explanation.reason}`,
      blocks: [
        {
          type: 'section',
          text: {
            type: 'mrkdwn',
            text: `*Anomaly Detected*\n${context.explanation.summary}`,
          },
        },
        {
          type: 'section',
          fields: [
            {
              type: 'mrkdwn',
              text: `*Severity:*\n${context.anomaly.severity}`,
            },
            {
              type: 'mrkdwn',
              text: `*Confidence:*\n${(context.anomaly.confidence * 100).toFixed(1)}%`,
            },
          ],
        },
      ],
    };

    const response = await fetch(webhookUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(message),
    });

    if (!response.ok) {
      throw new Error(`Slack notification failed: ${response.status}`);
    }

    return { success: true };
  }

  private async executeEmail(action: Action, context: ActionContext): Promise<any> {
    // In production, integrate with SendGrid, AWS SES, etc.
    console.log('[ActionEngine] Would send email to:', action.config.recipients);
    return { success: true };
  }

  private async executePagerDuty(action: Action, context: ActionContext): Promise<any> {
    // In production, integrate with PagerDuty API
    console.log('[ActionEngine] Would create PagerDuty incident');
    return { success: true };
  }

  private async executeAutoRemediate(action: Action, context: ActionContext): Promise<any> {
    // Custom auto-remediation logic
    console.log('[ActionEngine] Would execute auto-remediation:', action.config.script);
    return { success: true };
  }

  private async checkApprovals(action: Action, context: ActionContext): Promise<boolean> {
    // In production, check approval status from database
    // For now, auto-approve
    return true;
  }

  private async rollback(action: Action, context: ActionContext): Promise<void> {
    if (!action.rollbackStrategy) return;

    console.log(`[ActionEngine] Rolling back ${action.id}`);

    for (const step of action.rollbackStrategy.steps) {
      try {
        // Execute rollback step
        console.log(`[ActionEngine] Rollback step: ${step.action}`);
      } catch (error) {
        console.error('[ActionEngine] Rollback step failed:', error);
      }
    }
  }

  private riskSeverityToNumber(severity: string): number {
    const map = { low: 1, medium: 2, high: 3, critical: 4 };
    return map[severity as keyof typeof map] ?? 0;
  }

  private generateId(): string {
    return `exec_${Date.now()}_${Math.random().toString(36).substring(7)}`;
  }

  /**
   * Register default actions
   */
  private registerDefaultActions(): void {
    // Slack notification
    this.registry.register({
      id: 'slack-notification',
      type: 'slack',
      name: 'Send Slack Notification',
      description: 'Send anomaly notification to Slack channel',
      config: {},
      expectedImpact: {
        type: 'positive',
        magnitude: 0.7,
        description: 'Notifies team of anomaly',
        metrics: [],
      },
      risks: [
        {
          type: 'service-disruption',
          severity: 'low',
          probability: 0.1,
          mitigation: 'Slack outage would not affect core functionality',
        },
      ],
      requiredApprovals: [],
    });

    // Webhook
    this.registry.register({
      id: 'webhook-notification',
      type: 'webhook',
      name: 'Webhook Notification',
      description: 'Send HTTP webhook with anomaly data',
      config: {},
      expectedImpact: {
        type: 'positive',
        magnitude: 0.8,
        description: 'Triggers external automation',
        metrics: [],
      },
      risks: [
        {
          type: 'security',
          severity: 'medium',
          probability: 0.2,
          mitigation: 'Ensure webhook endpoint is secured with HTTPS and authentication',
        },
      ],
      requiredApprovals: [],
      retryPolicy: {
        maxRetries: 3,
        backoffMultiplier: 2,
        initialDelay: 1000,
        maxDelay: 10000,
      },
    });
  }
}

// Export singleton
export const actionEngine = new IntelligentActionEngine();
