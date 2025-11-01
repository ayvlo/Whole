import { motion, useInView } from "motion/react";
import { useRef, useState } from "react";
import { Radar, Brain, Zap } from "lucide-react";

const pillars = [
  {
    title: "Detect",
    icon: Radar,
    description: "Real-time KPI anomaly detection and severity ranking.",
    details: [
      "Continuous metric monitoring",
      "ML-powered anomaly detection",
      "Intelligent severity classification",
      "Zero false positive guarantee",
    ],
    color: "#C6A678",
  },
  {
    title: "Explain",
    icon: Brain,
    description:
      "Root-cause insights through causal inference and natural-language analytics.",
    details: [
      "Causal relationship mapping",
      "Natural language queries",
      "Context-aware explanations",
      "Historical pattern analysis",
    ],
    color: "#3F8EFC",
  },
  {
    title: "Act",
    icon: Zap,
    description: "Trigger autonomous actions across Slack, HubSpot, and Notion.",
    details: [
      "Automated workflow execution",
      "Cross-platform integrations",
      "Closed-loop automation",
      "Self-healing processes",
    ],
    color: "#C6A678",
  },
];

export function CorePillars() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <section ref={ref} className="py-32 bg-ash-graphite relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-1/2 left-1/3 w-96 h-96 bg-electric-taupe rounded-full blur-3xl" />
        <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-signal-blue rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <h2 className="text-5xl md:text-6xl mb-6">Core Pillars</h2>
          <p className="text-xl text-foreground/70 max-w-3xl mx-auto">
            The three-stage autonomous intelligence system that powers modern
            business operations.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {pillars.map((pillar, index) => (
            <motion.div
              key={pillar.title}
              initial={{ opacity: 0, y: 50 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: index * 0.2 }}
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
              className="group relative"
            >
              <motion.div
                animate={{
                  borderColor:
                    hoveredIndex === index
                      ? pillar.color
                      : "rgba(86, 90, 102, 0.3)",
                  boxShadow:
                    hoveredIndex === index
                      ? `0 0 40px ${pillar.color}40`
                      : "0 0 0px transparent",
                }}
                className="bg-obsidian-black/50 backdrop-blur-xl border-2 rounded-2xl p-8 h-full transition-all duration-500"
              >
                {/* Icon */}
                <motion.div
                  animate={{
                    scale: hoveredIndex === index ? 1.1 : 1,
                    rotate: hoveredIndex === index ? [0, -5, 5, 0] : 0,
                  }}
                  transition={{ duration: 0.5 }}
                  className="w-20 h-20 rounded-xl mb-6 flex items-center justify-center relative"
                  style={{
                    backgroundColor: `${pillar.color}20`,
                  }}
                >
                  <pillar.icon size={36} style={{ color: pillar.color }} />
                  
                  {/* Pulse effect on hover */}
                  {hoveredIndex === index && (
                    <motion.div
                      initial={{ scale: 1, opacity: 0.5 }}
                      animate={{ scale: 1.5, opacity: 0 }}
                      transition={{ duration: 1, repeat: Infinity }}
                      className="absolute inset-0 rounded-xl"
                      style={{
                        backgroundColor: pillar.color,
                      }}
                    />
                  )}
                </motion.div>

                {/* Title */}
                <h3 className="text-3xl mb-4">{pillar.title}</h3>

                {/* Description */}
                <p className="text-foreground/70 mb-6 leading-relaxed">
                  {pillar.description}
                </p>

                {/* Details */}
                <ul className="space-y-3">
                  {pillar.details.map((detail, i) => (
                    <motion.li
                      key={i}
                      initial={{ opacity: 0, x: -10 }}
                      animate={
                        hoveredIndex === index
                          ? { opacity: 1, x: 0 }
                          : { opacity: 0.6, x: 0 }
                      }
                      transition={{ duration: 0.3, delay: i * 0.05 }}
                      className="flex items-start gap-3 text-sm text-foreground/60"
                    >
                      <div
                        className="w-1.5 h-1.5 rounded-full mt-2 flex-shrink-0"
                        style={{ backgroundColor: pillar.color }}
                      />
                      <span>{detail}</span>
                    </motion.li>
                  ))}
                </ul>

                {/* Bottom accent line */}
                <motion.div
                  initial={{ width: 0 }}
                  animate={{
                    width: hoveredIndex === index ? "100%" : "0%",
                  }}
                  className="h-1 rounded-full mt-8 transition-all duration-500"
                  style={{ backgroundColor: pillar.color }}
                />
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
