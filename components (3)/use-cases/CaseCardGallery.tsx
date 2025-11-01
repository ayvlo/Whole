import { useState } from "react";
import { motion } from "motion/react";
import { TrendingDown, Users, CreditCard, AlertCircle, BarChart3, Bell } from "lucide-react";

const cases = [
  {
    id: 1,
    icon: TrendingDown,
    title: "Revenue Dip Detected",
    subtitle: "via Stripe Data",
    description: "MRR dropped 8% in 48 hours. Ayvlo flagged severity: HIGH.",
    action: "Slack alert sent instantly to #revenue-ops",
    preview: {
      type: "slack",
      content: "🚨 Revenue Alert: MRR down 8% ($12,400)\n📊 Severity: HIGH\n🔍 Investigating...",
    },
  },
  {
    id: 2,
    icon: Users,
    title: "Churn Spike Explained",
    subtitle: "Causal Analysis",
    description: "Churn increased from 3.2% to 7.1% in one week.",
    action: "Root cause: Enterprise plan + West Coast region",
    preview: {
      type: "sql",
      content: "SELECT region, plan_type, COUNT(*) as churned\nFROM users WHERE churned_at > '2025-10-24'\nGROUP BY region, plan_type;",
    },
  },
  {
    id: 3,
    icon: CreditCard,
    title: "Failed Payments Recovered",
    subtitle: "Automated Recovery",
    description: "22 failed transactions detected via Stripe webhooks.",
    action: "Re-engagement email sequence triggered automatically",
    preview: {
      type: "slack",
      content: "✅ Payment Recovery: 18/22 recovered\n💰 MRR saved: $4,200\n📧 Emails sent via HubSpot",
    },
  },
  {
    id: 4,
    icon: AlertCircle,
    title: "Conversion Rate Drop",
    subtitle: "Multi-channel Impact",
    description: "Trial-to-paid conversion dropped from 12% to 7%.",
    action: "Ayvlo identified broken checkout flow on mobile",
    preview: {
      type: "sql",
      content: "SELECT device, AVG(conversion_rate)\nFROM trials\nWHERE created_at > NOW() - INTERVAL 7 DAY\nGROUP BY device;",
    },
  },
  {
    id: 5,
    icon: BarChart3,
    title: "CAC Spike Diagnosed",
    subtitle: "Channel Breakdown",
    description: "Customer acquisition cost increased 35% week-over-week.",
    action: "Facebook ads CPM doubled; Google stable",
    preview: {
      type: "slack",
      content: "📈 CAC Alert: +35% ($142 → $192)\n🎯 Channel: Facebook Ads (CPM +98%)\n💡 Recommend: Pause FB / Increase Google",
    },
  },
  {
    id: 6,
    icon: Bell,
    title: "Product Usage Anomaly",
    subtitle: "Feature Engagement",
    description: "Core feature usage dropped 40% among enterprise users.",
    action: "Correlated with recent UI update; rollback recommended",
    preview: {
      type: "sql",
      content: "SELECT feature, user_tier, usage_count\nFROM events\nWHERE event_date > '2025-10-20'\nGROUP BY feature, user_tier;",
    },
  },
];

export function CaseCardGallery() {
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);

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
            Real Problems. <span className="text-electric-taupe">Real Solutions.</span>
          </h2>
          <p className="text-xl text-foreground/70">
            See Ayvlo in action across common business scenarios
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
          {cases.map((card, index) => (
            <motion.div
              key={card.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              onMouseEnter={() => setHoveredCard(card.id)}
              onMouseLeave={() => setHoveredCard(null)}
              className="group relative"
            >
              <motion.div
                animate={{
                  borderColor:
                    hoveredCard === card.id
                      ? "#C6A678"
                      : "rgba(86, 90, 102, 0.3)",
                  y: hoveredCard === card.id ? -8 : 0,
                }}
                className="bg-ash-graphite/50 backdrop-blur-xl border-2 rounded-2xl p-6 h-full transition-all duration-300 cursor-pointer"
                style={{
                  boxShadow:
                    hoveredCard === card.id
                      ? "0 0 40px rgba(198, 166, 120, 0.3)"
                      : "none",
                }}
              >
                {/* Icon */}
                <div className="w-14 h-14 rounded-xl bg-electric-taupe/20 border border-electric-taupe/30 flex items-center justify-center mb-4">
                  <card.icon size={24} className="text-electric-taupe" />
                </div>

                {/* Title */}
                <h3 className="text-xl mb-1">{card.title}</h3>
                <p className="text-sm text-signal-blue mono mb-4">
                  {card.subtitle}
                </p>

                {/* Description */}
                <p className="text-sm text-foreground/70 mb-3 leading-relaxed">
                  {card.description}
                </p>

                {/* Action */}
                <div className="flex items-start gap-2 mb-4">
                  <div className="w-1.5 h-1.5 rounded-full bg-electric-taupe mt-2 flex-shrink-0" />
                  <p className="text-sm text-foreground/80">{card.action}</p>
                </div>

                {/* Preview (shows on hover) */}
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{
                    opacity: hoveredCard === card.id ? 1 : 0,
                    height: hoveredCard === card.id ? "auto" : 0,
                  }}
                  transition={{ duration: 0.3 }}
                  className="overflow-hidden"
                >
                  <div
                    className={`rounded-lg p-4 mt-4 border ${
                      card.preview.type === "slack"
                        ? "bg-obsidian-black/50 border-signal-blue/30"
                        : "bg-obsidian-black border-cold-steel/30"
                    }`}
                  >
                    <div className="flex items-center gap-2 mb-2">
                      <div className="w-2 h-2 rounded-full bg-electric-taupe" />
                      <span className="text-xs text-foreground/60 mono">
                        {card.preview.type === "slack" ? "SLACK MESSAGE" : "SQL QUERY"}
                      </span>
                    </div>
                    <pre className="text-xs text-foreground/80 font-mono whitespace-pre-wrap">
                      {card.preview.content}
                    </pre>
                  </div>
                </motion.div>
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
