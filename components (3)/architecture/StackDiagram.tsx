import { motion, useInView } from "motion/react";
import { useRef } from "react";
import {
  Database,
  Activity,
  GitBranch,
  MessageSquare,
  Zap,
} from "lucide-react";

const layers = [
  {
    title: "Data Sources",
    description: "Connect to Stripe, HubSpot, GA4, and more",
    icon: Database,
    color: "#3F8EFC",
    examples: ["Stripe", "HubSpot", "Google Analytics", "Custom APIs"],
  },
  {
    title: "Anomaly Engine",
    description: "AI model detects deviations in real-time",
    icon: Activity,
    color: "#C6A678",
    examples: ["ML Detection", "Severity Ranking", "Pattern Recognition"],
  },
  {
    title: "Causal Layer",
    description: "Interprets root cause using causal inference",
    icon: GitBranch,
    color: "#3F8EFC",
    examples: ["Causal Analysis", "Impact Mapping", "Relationship Graphs"],
  },
  {
    title: "Natural Language Interface",
    description: "Ask in English → SQL → Response",
    icon: MessageSquare,
    color: "#C6A678",
    examples: [
      '"Why did revenue drop?"',
      "SQL Generation",
      "Plain English Answers",
    ],
  },
  {
    title: "Action Agent",
    description: "Executes tasks autonomously across platforms",
    icon: Zap,
    color: "#3F8EFC",
    examples: ["Slack Alerts", "CRM Updates", "Automated Recovery"],
  },
];

export function StackDiagram() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} className="py-32 bg-ash-graphite relative overflow-hidden">
      {/* Background grid pattern */}
      <div className="absolute inset-0 opacity-5">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              "linear-gradient(rgba(248, 248, 248, 0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(248, 248, 248, 0.1) 1px, transparent 1px)",
            backgroundSize: "50px 50px",
          }}
        />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <h2 className="text-5xl md:text-6xl mb-6">
            The <span className="text-electric-taupe">Architecture</span>
          </h2>
          <p className="text-xl text-foreground/70">
            A neural system designed for autonomous business intelligence
          </p>
        </motion.div>

        <div className="max-w-4xl mx-auto relative">
          {/* Connection lines */}
          <div className="absolute left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-signal-blue via-electric-taupe to-signal-blue opacity-30 hidden md:block" />

          {/* Layers */}
          <div className="space-y-8">
            {layers.map((layer, index) => (
              <motion.div
                key={layer.title}
                initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.8, delay: index * 0.2 }}
                className="relative"
              >
                <div className="grid md:grid-cols-2 gap-8 items-center">
                  {/* Left side (odd indices) */}
                  {index % 2 === 0 && (
                    <>
                      <div className="order-1 md:order-1 text-right">
                        <div
                          className="inline-block bg-obsidian-black/80 backdrop-blur-xl border-2 rounded-2xl p-8 w-full"
                          style={{
                            borderColor: `${layer.color}50`,
                            boxShadow: `0 0 30px ${layer.color}20`,
                          }}
                        >
                          <div className="flex items-center justify-end gap-4 mb-4">
                            <h3 className="text-2xl">{layer.title}</h3>
                            <div
                              className="w-14 h-14 rounded-xl flex items-center justify-center"
                              style={{ backgroundColor: `${layer.color}20` }}
                            >
                              <layer.icon size={28} style={{ color: layer.color }} />
                            </div>
                          </div>
                          <p className="text-foreground/70 mb-4">
                            {layer.description}
                          </p>
                          <div className="flex flex-wrap gap-2 justify-end">
                            {layer.examples.map((example) => (
                              <span
                                key={example}
                                className="text-xs px-3 py-1 rounded-full border mono"
                                style={{
                                  borderColor: `${layer.color}40`,
                                  color: layer.color,
                                }}
                              >
                                {example}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                      <div className="order-2 md:order-2" />
                    </>
                  )}

                  {/* Right side (even indices) */}
                  {index % 2 === 1 && (
                    <>
                      <div className="order-1 md:order-1" />
                      <div className="order-2 md:order-2">
                        <div
                          className="bg-obsidian-black/80 backdrop-blur-xl border-2 rounded-2xl p-8"
                          style={{
                            borderColor: `${layer.color}50`,
                            boxShadow: `0 0 30px ${layer.color}20`,
                          }}
                        >
                          <div className="flex items-center gap-4 mb-4">
                            <div
                              className="w-14 h-14 rounded-xl flex items-center justify-center"
                              style={{ backgroundColor: `${layer.color}20` }}
                            >
                              <layer.icon size={28} style={{ color: layer.color }} />
                            </div>
                            <h3 className="text-2xl">{layer.title}</h3>
                          </div>
                          <p className="text-foreground/70 mb-4">
                            {layer.description}
                          </p>
                          <div className="flex flex-wrap gap-2">
                            {layer.examples.map((example) => (
                              <span
                                key={example}
                                className="text-xs px-3 py-1 rounded-full border mono"
                                style={{
                                  borderColor: `${layer.color}40`,
                                  color: layer.color,
                                }}
                              >
                                {example}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                    </>
                  )}
                </div>

                {/* Node indicator on center line */}
                <div className="hidden md:block absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-10">
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={isInView ? { scale: 1 } : {}}
                    transition={{ duration: 0.5, delay: index * 0.2 + 0.3 }}
                    className="w-4 h-4 rounded-full"
                    style={{
                      backgroundColor: layer.color,
                      boxShadow: `0 0 20px ${layer.color}`,
                    }}
                  />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
