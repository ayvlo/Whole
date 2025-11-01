import { getCurrentUser } from '@/lib/current-user';
import { prisma } from '@/lib/prisma';
import { redirect } from 'next/navigation';
import AppShell from '@/components/layout/app-shell';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import Link from 'next/link';
import { AlertTriangle } from 'lucide-react';
import { formatDateTime } from '@/lib/utils';

export default async function AnomaliesPage({ params }: { params: { orgId: string } }) {
  const user = await getCurrentUser();

  if (!user) {
    redirect('/auth/signin');
  }

  // Verify access
  const membership = await prisma.orgMember.findFirst({
    where: {
      userId: user.id,
      organizationId: params.orgId,
    },
  });

  if (!membership) {
    redirect('/org');
  }

  // Get all anomalies for this org
  const anomalies = await prisma.anomaly.findMany({
    where: {
      workspace: {
        organizationId: params.orgId,
      },
    },
    include: {
      workspace: {
        select: {
          name: true,
        },
      },
    },
    orderBy: {
      detectedAt: 'desc',
    },
  });

  const getSeverityColor = (severity: number) => {
    if (severity >= 80) return 'text-red-500';
    if (severity >= 60) return 'text-orange-500';
    return 'text-yellow-500';
  };

  const getSeverityBg = (severity: number) => {
    if (severity >= 80) return 'bg-red-500/10 border-red-500/20';
    if (severity >= 60) return 'bg-orange-500/10 border-orange-500/20';
    return 'bg-yellow-500/10 border-yellow-500/20';
  };

  return (
    <AppShell orgId={params.orgId}>
      <div className="p-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Anomalies</h1>
          <p className="text-ayvlo-text/70">All detected anomalies across your workspaces</p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>All Anomalies ({anomalies.length})</CardTitle>
          </CardHeader>
          <CardContent>
            {anomalies.length === 0 ? (
              <div className="text-center py-12 text-ayvlo-text/50">
                <AlertTriangle className="h-12 w-12 mx-auto mb-4 opacity-50" />
                <p>No anomalies detected</p>
              </div>
            ) : (
              <div className="space-y-3">
                {anomalies.map((anomaly) => (
                  <div
                    key={anomaly.id}
                    className={`p-4 rounded-lg border ${getSeverityBg(anomaly.severity)}`}
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <AlertTriangle
                            className={`h-4 w-4 ${getSeverityColor(anomaly.severity)}`}
                          />
                          <span className="font-medium">{anomaly.metric}</span>
                          <span
                            className={`text-xs font-semibold px-2 py-0.5 rounded ${getSeverityColor(
                              anomaly.severity
                            )}`}
                          >
                            {anomaly.severity}
                          </span>
                          <span className="text-xs text-ayvlo-text/50">
                            {anomaly.workspace.name}
                          </span>
                        </div>
                        {anomaly.explanation && (
                          <p className="text-sm text-ayvlo-text/70">{anomaly.explanation}</p>
                        )}
                        <div className="flex items-center gap-4 mt-2 text-xs text-ayvlo-text/50">
                          <span>{formatDateTime(anomaly.detectedAt)}</span>
                          <span className="capitalize">{anomaly.status.toLowerCase()}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </AppShell>
  );
}
