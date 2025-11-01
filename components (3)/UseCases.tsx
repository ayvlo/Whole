import { motion, useInView } from "motion/react";
import { useRef } from "react";
import { Bell, MessageSquare, Workflow } from "lucide-react";

const useCases = [
  {
    icon: Bell,
    title: "Slack Alerts",
    description: "Detect KPI anomalies in real time and get instant notifications where your team already works.",
    features: [
      "Instant anomaly notifications",
      "Customizable alert thresholds",
      "Team-wide visibility",
    ],
    color: "#C6A678",
  },
  {
    icon: MessageSquare,
    title: "Natural Language Analytics",
    description: "Ask \"Why did churn spike yesterday?\" and get answers backed by causal analysis.",
    features: [
      "Conversational interface",
      "Root cause analysis",
      "Data-driven explanations",
    ],
    color: "#3F8EFC",
  },
  {
    icon: Workflow,
    title: "Autonomous Workflow Agent",
    description: "Recover failed payments automatically, update CRM records, and execute business logic without human intervention.",
    features: [
      "Automated recovery processes",
      "Multi-tool orchestration",
      "Self-healing workflows",
    ],
    color: "#C6A678",
  },
];

export function UseCases() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} className="py-32 bg-ash-graphite">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <h2 className="text-5xl md:text-6xl mb-6">
            Built for <span className="text-electric-taupe">Real Work</span>
          </h2>
          <p className="text-xl text-foreground/70 max-w-3xl mx-auto">
            From detection to action, Ayvlo integrates seamlessly into your existing workflow.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {useCases.map((useCase, index) => (
            <motion.div
              key={useCase.title}
              initial={{ opacity: 0, y: 50 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: index * 0.2 }}
              whileHover={{ y: -8 }}
              className="group"
            >
              <div className="bg-obsidian-black border-2 border-cold-steel rounded-2xl p-8 h-full transition-all duration-300 hover:border-signal-blue hover:shadow-2xl">
                {/* Icon */}
                <motion.div
                  whileHover={{ rotate: [0, -10, 10, 0] }}
                  transition={{ duration: 0.5 }}
                  className="w-16 h-16 rounded-xl mb-6 flex items-center justify-center"
                  style={{
                    backgroundColor: useCase.color + "20",
                  }}
                >
                  <useCase.icon
                    size={32}
                    style={{ color: useCase.color }}
                  />
                </motion.div>

                {/* Title */}
                <h3 className="text-2xl mb-4 group-hover:text-electric-taupe transition-colors">
                  {useCase.title}
                </h3>

                {/* Description */}
                <p className="text-foreground/70 mb-6 leading-relaxed">
                  {useCase.description}
                </p>

                {/* Features */}
                <ul className="space-y-2">
                  {useCase.features.map((feature, i) => (
                    <li
                      key={i}
                      className="flex items-start gap-2 text-sm text-foreground/60"
                    >
                      <div
                        className="w-1.5 h-1.5 rounded-full mt-2 flex-shrink-0"
                        style={{ backgroundColor: useCase.color }}
                      />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>

                {/* Hover line accent */}
                <motion.div
                  initial={{ width: 0 }}
                  whileHover={{ width: "100%" }}
                  className="h-0.5 mt-6 transition-all duration-300"
                  style={{ backgroundColor: useCase.color }}
                />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
