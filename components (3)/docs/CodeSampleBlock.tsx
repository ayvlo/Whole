import { useState } from "react";
import { motion } from "motion/react";
import { Copy, Check } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";

const codeSamples = {
  rest: {
    title: "REST API",
    language: "bash",
    code: `# Detect anomalies in your MRR
POST https://api.ayvlo.com/v1/anomalies
Content-Type: application/json
Authorization: Bearer YOUR_API_KEY

{
  "metric": "MRR",
  "threshold": "dynamic",
  "action": "slack_alert",
  "severity": ["high", "critical"]
}

# Response
{
  "anomaly_id": "ano_1a2b3c4d",
  "detected_at": "2025-11-01T14:23:00Z",
  "severity": "high",
  "impact": {
    "metric": "MRR",
    "change": -8.4,
    "affected_value": 42100
  },
  "root_cause": {
    "primary_factor": "churn_spike",
    "segments": ["enterprise", "west_coast"]
  }
}`,
  },
  graphql: {
    title: "GraphQL",
    language: "graphql",
    code: `# Query anomalies with filters
query GetAnomalies {
  anomalies(
    filter: {
      metric: "MRR"
      severity: [HIGH, CRITICAL]
      dateRange: {
        from: "2025-10-01"
        to: "2025-11-01"
      }
    }
  ) {
    edges {
      node {
        id
        detectedAt
        severity
        impact {
          metric
          change
          affectedValue
        }
        rootCause {
          primaryFactor
          segments
          confidence
        }
      }
    }
  }
}`,
  },
  nlQuery: {
    title: "Natural Language Query",
    language: "javascript",
    code: `// Ask questions in plain English
const response = await ayvlo.query({
  question: "Why did revenue drop yesterday?",
  context: {
    metrics: ["MRR", "ARR", "churn"],
    timeframe: "last_7_days"
  }
});

// Response includes SQL and explanation
{
  "answer": "Revenue dropped 8.4% due to 3 enterprise customers churning, all from the West Coast region.",
  "sql_generated": "SELECT region, plan_type, SUM(mrr_change) FROM users WHERE churned_at > '2025-10-31' GROUP BY region, plan_type",
  "confidence": 0.94,
  "supporting_data": {
    "churned_customers": 3,
    "affected_mrr": -3540,
    "primary_segment": "enterprise_west_coast"
  }
}`,
  },
  webhook: {
    title: "Webhook Setup",
    language: "javascript",
    code: `// Set up a webhook to receive anomaly alerts
const webhook = await ayvlo.webhooks.create({
  url: "https://your-app.com/webhooks/ayvlo",
  events: [
    "anomaly.detected",
    "anomaly.resolved",
    "workflow.completed"
  ],
  filters: {
    severity: ["high", "critical"],
    metrics: ["MRR", "churn", "CAC"]
  }
});

// Webhook payload example
{
  "event": "anomaly.detected",
  "timestamp": "2025-11-01T14:23:00Z",
  "data": {
    "anomaly_id": "ano_1a2b3c4d",
    "metric": "MRR",
    "severity": "high",
    "change": -8.4,
    "root_cause": "churn_spike",
    "recommended_actions": [
      "notify_ceo",
      "trigger_retention_workflow"
    ]
  }
}`,
  },
};

export function CodeSampleBlock() {
  const [copiedTab, setCopiedTab] = useState<string | null>(null);

  const copyToClipboard = (code: string, tab: string) => {
    navigator.clipboard.writeText(code);
    setCopiedTab(tab);
    setTimeout(() => setCopiedTab(null), 2000);
  };

  return (
    <section className="py-32 bg-obsidian-black">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-5xl md:text-6xl mb-6">
            Code <span className="text-electric-taupe">Examples</span>
          </h2>
          <p className="text-xl text-foreground/70">
            Choose your preferred integration method
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="max-w-5xl mx-auto"
        >
          <Tabs defaultValue="rest" className="w-full">
            <TabsList className="grid w-full grid-cols-2 md:grid-cols-4 mb-8 bg-ash-graphite/50 p-2">
              {Object.entries(codeSamples).map(([key, sample]) => (
                <TabsTrigger
                  key={key}
                  value={key}
                  className="data-[state=active]:bg-electric-taupe data-[state=active]:text-obsidian-black mono text-sm"
                >
                  {sample.title}
                </TabsTrigger>
              ))}
            </TabsList>

            {Object.entries(codeSamples).map(([key, sample]) => (
              <TabsContent key={key} value={key}>
                <div className="bg-ash-graphite/30 border-2 border-cold-steel/50 rounded-xl overflow-hidden">
                  {/* Code header */}
                  <div className="bg-obsidian-black/50 border-b border-cold-steel/50 px-6 py-4 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="flex gap-2">
                        <div className="w-3 h-3 rounded-full bg-red-500/60" />
                        <div className="w-3 h-3 rounded-full bg-yellow-500/60" />
                        <div className="w-3 h-3 rounded-full bg-green-500/60" />
                      </div>
                      <span className="text-sm text-foreground/60 mono">
                        {sample.language}
                      </span>
                    </div>

                    <button
                      onClick={() => copyToClipboard(sample.code, key)}
                      className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-cold-steel/20 hover:bg-cold-steel/30 transition-colors text-sm mono"
                    >
                      {copiedTab === key ? (
                        <>
                          <Check size={16} className="text-green-400" />
                          <span className="text-green-400">Copied!</span>
                        </>
                      ) : (
                        <>
                          <Copy size={16} />
                          <span>Copy</span>
                        </>
                      )}
                    </button>
                  </div>

                  {/* Code content */}
                  <div className="p-6 overflow-x-auto">
                    <pre className="font-mono text-sm leading-relaxed">
                      <code className="text-foreground/90">{sample.code}</code>
                    </pre>
                  </div>
                </div>
              </TabsContent>
            ))}
          </Tabs>

          {/* Additional info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="mt-8 text-center"
          >
            <p className="text-foreground/60">
              Need more examples?{" "}
              <a
                href="#"
                className="text-signal-blue hover:text-electric-taupe transition-colors underline"
              >
                View full API documentation
              </a>
            </p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
