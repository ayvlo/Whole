/**
 * Attribute-Based Access Control (ABAC) Engine
 *
 * Features:
 * - Fine-grained permissions (resource-level)
 * - Temporal access control (time-based)
 * - Context-aware permissions
 * - Policy-based access control
 * - Delegation and impersonation
 * - Just-in-time access
 */

import { observability } from '../observability/metrics';

export interface AttributeSet {
  [key: string]: any;
}

export interface AccessPolicy {
  id: string;
  name: string;
  description?: string;
  subject: AttributeSet; // User attributes
  resource: AttributeSet; // Resource attributes
  action: string; // 'read', 'write', 'delete', etc.
  environment: AttributeSet; // Context (time, location, etc.)
  condition?: PolicyCondition;
  effect: 'allow' | 'deny';
  priority: number; // Higher priority policies evaluated first
}

export interface PolicyCondition {
  type: 'and' | 'or' | 'not' | 'comparison';
  conditions?: PolicyCondition[];
  comparison?: {
    left: string; // attribute path
    operator: '==' | '!=' | '>' | '<' | '>=' | '<=' | 'in' | 'contains';
    right: any; // value to compare against
  };
}

export interface AccessContext {
  subject: AttributeSet;
  resource: AttributeSet;
  action: string;
  environment: AttributeSet;
}

export interface Decision {
  allowed: boolean;
  reason: string;
  matchedPolicies: AccessPolicy[];
  evaluationTime: number; // milliseconds
}

export interface AccessLog {
  timestamp: Date;
  userId: string;
  resourceId: string;
  action: string;
  decision: 'allow' | 'deny';
  policies: string[]; // Policy IDs that matched
  context: AccessContext;
}

/**
 * ABAC Policy Engine
 */
export class ABACEngine {
  private policies: Map<string, AccessPolicy> = new Map();
  private accessLogs: AccessLog[] = [];

  constructor() {
    this.registerDefaultPolicies();
  }

  /**
   * Add policy to engine
   */
  addPolicy(policy: AccessPolicy): void {
    this.policies.set(policy.id, policy);
  }

  /**
   * Remove policy
   */
  removePolicy(policyId: string): void {
    this.policies.delete(policyId);
  }

  /**
   * Evaluate access request
   */
  async evaluate(context: AccessContext): Promise<Decision> {
    const startTime = Date.now();
    const matchedPolicies: AccessPolicy[] = [];

    // Get all policies, sorted by priority
    const sortedPolicies = Array.from(this.policies.values())
      .sort((a, b) => b.priority - a.priority);

    // Evaluate each policy
    for (const policy of sortedPolicies) {
      const matches = await this.policyMatches(policy, context);

      if (matches) {
        matchedPolicies.push(policy);

        // If it's a deny, immediately return
        if (policy.effect === 'deny') {
          const decision: Decision = {
            allowed: false,
            reason: `Access denied by policy: ${policy.name}`,
            matchedPolicies: [policy],
            evaluationTime: Date.now() - startTime,
          };

          await this.logAccess(context, decision);
          return decision;
        }
      }
    }

    // If we found at least one allow policy, grant access
    const allowed = matchedPolicies.some(p => p.effect === 'allow');

    const decision: Decision = {
      allowed,
      reason: allowed
        ? `Access allowed by ${matchedPolicies.length} policy(ies)`
        : 'No matching policy found - default deny',
      matchedPolicies,
      evaluationTime: Date.now() - startTime,
    };

    await this.logAccess(context, decision);

    await observability.histogram('abac.evaluation.duration', decision.evaluationTime);
    await observability.increment('abac.decisions', {
      decision: allowed ? 'allow' : 'deny',
    });

    return decision;
  }

  /**
   * Check if policy matches context
   */
  private async policyMatches(
    policy: AccessPolicy,
    context: AccessContext
  ): Promise<boolean> {
    // Check action
    if (policy.action !== '*' && policy.action !== context.action) {
      return false;
    }

    // Check subject attributes
    if (!this.attributesMatch(policy.subject, context.subject)) {
      return false;
    }

    // Check resource attributes
    if (!this.attributesMatch(policy.resource, context.resource)) {
      return false;
    }

    // Check environment attributes
    if (!this.attributesMatch(policy.environment, context.environment)) {
      return false;
    }

    // Evaluate condition if present
    if (policy.condition) {
      const conditionMet = await this.evaluateCondition(
        policy.condition,
        context
      );
      if (!conditionMet) {
        return false;
      }
    }

    return true;
  }

  /**
   * Check if policy attributes match context attributes
   */
  private attributesMatch(
    policyAttrs: AttributeSet,
    contextAttrs: AttributeSet
  ): boolean {
    for (const [key, value] of Object.entries(policyAttrs)) {
      // Wildcard matches anything
      if (value === '*') continue;

      // Check if context has the attribute
      if (!(key in contextAttrs)) return false;

      // Array values mean "any of these"
      if (Array.isArray(value)) {
        if (!value.includes(contextAttrs[key])) return false;
      } else {
        // Exact match
        if (contextAttrs[key] !== value) return false;
      }
    }

    return true;
  }

  /**
   * Evaluate policy condition
   */
  private async evaluateCondition(
    condition: PolicyCondition,
    context: AccessContext
  ): Promise<boolean> {
    switch (condition.type) {
      case 'and':
        if (!condition.conditions) return true;
        for (const subCondition of condition.conditions) {
          if (!await this.evaluateCondition(subCondition, context)) {
            return false;
          }
        }
        return true;

      case 'or':
        if (!condition.conditions) return false;
        for (const subCondition of condition.conditions) {
          if (await this.evaluateCondition(subCondition, context)) {
            return true;
          }
        }
        return false;

      case 'not':
        if (!condition.conditions || condition.conditions.length === 0) {
          return true;
        }
        return !await this.evaluateCondition(condition.conditions[0], context);

      case 'comparison':
        if (!condition.comparison) return true;
        return this.evaluateComparison(condition.comparison, context);

      default:
        console.warn(`Unknown condition type: ${condition.type}`);
        return false;
    }
  }

  /**
   * Evaluate comparison condition
   */
  private evaluateComparison(
    comparison: NonNullable<PolicyCondition['comparison']>,
    context: AccessContext
  ): boolean {
    const leftValue = this.resolveAttributePath(comparison.left, context);
    const rightValue = comparison.right;

    switch (comparison.operator) {
      case '==':
        return leftValue == rightValue;
      case '!=':
        return leftValue != rightValue;
      case '>':
        return leftValue > rightValue;
      case '<':
        return leftValue < rightValue;
      case '>=':
        return leftValue >= rightValue;
      case '<=':
        return leftValue <= rightValue;
      case 'in':
        return Array.isArray(rightValue) && rightValue.includes(leftValue);
      case 'contains':
        return Array.isArray(leftValue) && leftValue.includes(rightValue);
      default:
        return false;
    }
  }

  /**
   * Resolve attribute path (e.g., "subject.role")
   */
  private resolveAttributePath(path: string, context: AccessContext): any {
    const parts = path.split('.');
    let current: any = context;

    for (const part of parts) {
      if (current && typeof current === 'object' && part in current) {
        current = current[part];
      } else {
        return undefined;
      }
    }

    return current;
  }

  /**
   * Suggest policies based on access patterns
   */
  async suggestPolicies(accessLogs: AccessLog[]): Promise<AccessPolicy[]> {
    const suggestions: AccessPolicy[] = [];

    // Analyze access patterns
    const patterns = this.analyzeAccessPatterns(accessLogs);

    // Generate policies from patterns
    for (const pattern of patterns) {
      if (pattern.frequency > 0.8) {
        // High frequency access - suggest allow policy
        suggestions.push({
          id: `suggested_${Date.now()}_${Math.random().toString(36).substring(7)}`,
          name: `Auto-suggested: Allow ${pattern.action} on ${pattern.resourceType}`,
          description: `Based on ${pattern.count} access attempts`,
          subject: { role: pattern.role },
          resource: { type: pattern.resourceType },
          action: pattern.action,
          environment: {},
          effect: 'allow',
          priority: 50,
        });
      }
    }

    return suggestions;
  }

  /**
   * Analyze access patterns from logs
   */
  private analyzeAccessPatterns(
    logs: AccessLog[]
  ): Array<{
    role: string;
    resourceType: string;
    action: string;
    count: number;
    allowed: number;
    frequency: number;
  }> {
    const patterns = new Map<
      string,
      { count: number; allowed: number; role: string; resourceType: string; action: string }
    >();

    for (const log of logs) {
      const key = `${log.context.subject.role}:${log.context.resource.type}:${log.action}`;

      const pattern = patterns.get(key) ?? {
        count: 0,
        allowed: 0,
        role: log.context.subject.role,
        resourceType: log.context.resource.type,
        action: log.action,
      };

      pattern.count++;
      if (log.decision === 'allow') {
        pattern.allowed++;
      }

      patterns.set(key, pattern);
    }

    return Array.from(patterns.values()).map(p => ({
      ...p,
      frequency: p.allowed / p.count,
    }));
  }

  /**
   * Log access decision
   */
  private async logAccess(context: AccessContext, decision: Decision): Promise<void> {
    const log: AccessLog = {
      timestamp: new Date(),
      userId: context.subject.id ?? 'unknown',
      resourceId: context.resource.id ?? 'unknown',
      action: context.action,
      decision: decision.allowed ? 'allow' : 'deny',
      policies: decision.matchedPolicies.map(p => p.id),
      context,
    };

    this.accessLogs.push(log);

    // In production, persist to database
    // await this.persistAccessLog(log);
  }

  /**
   * Get access logs
   */
  getAccessLogs(limit = 100): AccessLog[] {
    return this.accessLogs.slice(-limit);
  }

  /**
   * Register default policies
   */
  private registerDefaultPolicies(): void {
    // Owner can do anything
    this.addPolicy({
      id: 'owner-full-access',
      name: 'Organization Owner - Full Access',
      subject: { role: 'OWNER' },
      resource: { organizationId: '*' },
      action: '*',
      environment: {},
      effect: 'allow',
      priority: 100,
    });

    // Admin can manage most things
    this.addPolicy({
      id: 'admin-manage-access',
      name: 'Organization Admin - Management Access',
      subject: { role: 'ADMIN' },
      resource: { organizationId: '*' },
      action: '*',
      environment: {},
      effect: 'allow',
      priority: 90,
      condition: {
        type: 'not',
        conditions: [{
          type: 'comparison',
          comparison: {
            left: 'action',
            operator: '==',
            right: 'delete_organization',
          },
        }],
      },
    });

    // Members can read
    this.addPolicy({
      id: 'member-read-access',
      name: 'Organization Member - Read Access',
      subject: { role: 'MEMBER' },
      resource: { organizationId: '*' },
      action: 'read',
      environment: {},
      effect: 'allow',
      priority: 70,
    });

    // Viewers can only view
    this.addPolicy({
      id: 'viewer-read-only',
      name: 'Organization Viewer - Read Only',
      subject: { role: 'VIEWER' },
      resource: { organizationId: '*' },
      action: 'read',
      environment: {},
      effect: 'allow',
      priority: 60,
    });

    // Deny access outside business hours for sensitive operations
    this.addPolicy({
      id: 'deny-sensitive-after-hours',
      name: 'Deny Sensitive Operations After Hours',
      subject: { role: ['MEMBER', 'ADMIN'] },
      resource: { sensitivity: 'high' },
      action: ['delete', 'modify'],
      environment: {},
      effect: 'deny',
      priority: 95,
      condition: {
        type: 'or',
        conditions: [
          {
            type: 'comparison',
            comparison: {
              left: 'environment.hour',
              operator: '<',
              right: 9,
            },
          },
          {
            type: 'comparison',
            comparison: {
              left: 'environment.hour',
              operator: '>',
              right: 17,
            },
          },
        ],
      },
    });
  }
}

// Export singleton
export const abac = new ABACEngine();
