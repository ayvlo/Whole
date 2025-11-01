import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Seeding database...');

  // Create demo user
  const user = await prisma.user.upsert({
    where: { email: 'demo@ayvlo.com' },
    update: {},
    create: {
      email: 'demo@ayvlo.com',
      name: 'Demo User',
      emailVerified: new Date(),
    },
  });

  console.log('✅ Created demo user:', user.email);

  // Create demo organization
  const org = await prisma.organization.upsert({
    where: { slug: 'demo-org' },
    update: {},
    create: {
      name: 'Demo Organization',
      slug: 'demo-org',
    },
  });

  console.log('✅ Created demo organization:', org.name);

  // Add user as owner
  await prisma.orgMember.upsert({
    where: {
      userId_organizationId: {
        userId: user.id,
        organizationId: org.id,
      },
    },
    update: {},
    create: {
      userId: user.id,
      organizationId: org.id,
      role: 'OWNER',
    },
  });

  console.log('✅ Added user as organization owner');

  // Create demo workspace
  const workspace = await prisma.workspace.upsert({
    where: { id: 'demo-workspace-id' },
    update: {},
    create: {
      id: 'demo-workspace-id',
      name: 'Production Workspace',
      description: 'Main production environment monitoring',
      organizationId: org.id,
    },
  });

  console.log('✅ Created demo workspace:', workspace.name);

  // Create a data source
  await prisma.dataSource.create({
    data: {
      workspaceId: workspace.id,
      type: 'stripe',
      name: 'Stripe Production',
      config: {
        apiKey: 'sk_test_...',
        webhookSecret: 'whsec_...',
      },
      isActive: true,
    },
  });

  console.log('✅ Created Stripe data source');

  // Create sample anomalies
  const anomalies = await Promise.all([
    prisma.anomaly.create({
      data: {
        workspaceId: workspace.id,
        metric: 'stripe.mrr',
        severity: 85,
        payload: {
          current: 45000,
          expected: 52000,
          drop: -13.5,
        },
        explanation: 'MRR dropped 13.5% below expected trend. Likely caused by increased churn in enterprise segment.',
        status: 'OPEN',
        aiScore: 0.89,
      },
    }),
    prisma.anomaly.create({
      data: {
        workspaceId: workspace.id,
        metric: 'user.churn_rate',
        severity: 72,
        payload: {
          current: 8.2,
          expected: 5.5,
          increase: 49,
        },
        explanation: 'Churn rate spiked 49% above baseline. Correlation with recent pricing change detected.',
        status: 'INVESTIGATING',
        aiScore: 0.76,
      },
    }),
  ]);

  console.log(`✅ Created ${anomalies.length} sample anomalies`);

  // Create a workflow
  await prisma.workflow.create({
    data: {
      workspaceId: workspace.id,
      name: 'Critical Anomaly Alert',
      description: 'Notify team when critical anomalies are detected',
      trigger: {
        type: 'anomaly_detected',
        conditions: {
          severity: { gte: 80 },
        },
      },
      actions: [
        {
          type: 'slack',
          config: {
            channel: '#alerts',
            message: 'Critical anomaly detected: {{anomaly.metric}}',
          },
        },
        {
          type: 'webhook',
          config: {
            url: 'https://example.com/webhook',
            method: 'POST',
          },
        },
      ],
      isActive: true,
    },
  });

  console.log('✅ Created demo workflow');

  // Create feature flags
  await Promise.all([
    prisma.featureFlag.create({
      data: {
        organizationId: org.id,
        key: 'autonomous_workflows',
        enabled: true,
        config: {
          maxActionsPerDay: 10,
        },
      },
    }),
    prisma.featureFlag.create({
      data: {
        organizationId: org.id,
        key: 'ai_insights',
        enabled: true,
      },
    }),
  ]);

  console.log('✅ Created feature flags');

  // Create billing info
  await prisma.billingInfo.create({
    data: {
      organizationId: org.id,
      stripeCustomerId: 'cus_demo_12345',
      plan: 'pro',
      status: 'active',
      seats: 10,
      currentPeriodStart: new Date(),
      currentPeriodEnd: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30 days
    },
  });

  console.log('✅ Created billing info');

  // Create API key (demo key: ayvlo_test_1234567890abcdef)
  await prisma.apiKey.create({
    data: {
      organizationId: org.id,
      userId: user.id,
      name: 'Demo API Key',
      keyPrefix: 'ayvlo_te',
      keyHash: '$2a$10$demo.hash.placeholder', // In production, use bcrypt
      permissions: ['read', 'write'],
    },
  });

  console.log('✅ Created demo API key');

  console.log('\n🎉 Seeding completed successfully!\n');
  console.log('Demo credentials:');
  console.log('  Email: demo@ayvlo.com');
  console.log('  Organization: demo-org');
  console.log('  API Key: ayvlo_test_1234567890abcdef (for testing)');
}

main()
  .catch((e) => {
    console.error('❌ Seeding failed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
