import { getCurrentUser } from '@/lib/current-user';
import { prisma } from '@/lib/prisma';
import { redirect } from 'next/navigation';
import AppShell from '@/components/layout/app-shell';
import StatsCard from '@/components/dashboard/stats-card';
import AnomalyList from '@/components/dashboard/anomaly-list';
import { AlertTriangle, Workflow, Database, TrendingUp } from 'lucide-react';

export default async function OrgDashboard({ params }: { params: { orgId: string } }) {
  const user = await getCurrentUser();

  if (!user) {
    redirect('/auth/signin');
  }

  // Verify user has access to this org
  const membership = await prisma.orgMember.findFirst({
    where: {
      userId: user.id,
      organizationId: params.orgId,
    },
    include: {
      organization: true,
    },
  });

  if (!membership) {
    redirect('/org');
  }

  // Get stats
  const [anomalyCount, workflowCount, dataSourceCount, recentAnomalies] = await Promise.all([
    prisma.anomaly.count({
      where: {
        workspace: {
          organizationId: params.orgId,
        },
        status: 'OPEN',
      },
    }),
    prisma.workflow.count({
      where: {
        workspace: {
          organizationId: params.orgId,
        },
        isActive: true,
      },
    }),
    prisma.dataSource.count({
      where: {
        workspace: {
          organizationId: params.orgId,
        },
        isActive: true,
      },
    }),
    prisma.anomaly.findMany({
      where: {
        workspace: {
          organizationId: params.orgId,
        },
      },
      orderBy: {
        detectedAt: 'desc',
      },
      take: 5,
    }),
  ]);

  return (
    <AppShell orgId={params.orgId}>
      <div className="p-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">{membership.organization.name}</h1>
          <p className="text-ayvlo-text/70">Welcome back, {user.name || user.email}</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatsCard
            title="Open Anomalies"
            value={anomalyCount}
            icon={AlertTriangle}
            description={anomalyCount > 0 ? 'Requires attention' : 'All clear'}
          />
          <StatsCard
            title="Active Workflows"
            value={workflowCount}
            icon={Workflow}
            description="Automated processes"
          />
          <StatsCard
            title="Data Sources"
            value={dataSourceCount}
            icon={Database}
            description="Connected integrations"
          />
          <StatsCard
            title="Detection Rate"
            value="99.8%"
            icon={TrendingUp}
            description="Last 30 days"
          />
        </div>

        {/* Recent Anomalies */}
        <AnomalyList anomalies={recentAnomalies} orgId={params.orgId} />
      </div>
    </AppShell>
  );
}
