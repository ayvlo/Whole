import { motion, useInView } from "motion/react";
import { useRef } from "react";
import { Eye, Lightbulb, Zap, ArrowRight } from "lucide-react";

const stages = [
  {
    title: "Detect",
    icon: Eye,
    description: "Real-time KPI anomaly detection with severity ranking.",
    details: [
      "24/7 monitoring of all critical metrics",
      "ML-powered anomaly detection",
      "Automated severity classification",
    ],
    color: "#C6A678",
  },
  {
    title: "Explain",
    icon: Lightbulb,
    description: "Root-cause insights powered by causal inference and natural-language analytics.",
    details: [
      "Natural language queries",
      "Causal relationship mapping",
      "Contextual business insights",
    ],
    color: "#3F8EFC",
  },
  {
    title: "Act",
    icon: Zap,
    description: "Trigger autonomous actions across your tools (Slack, HubSpot, Notion).",
    details: [
      "Automated workflow triggers",
      "Cross-platform integrations",
      "Closed-loop automation",
    ],
    color: "#C6A678",
  },
];

export function ApproachSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} className="py-32 bg-ash-graphite relative overflow-hidden">
      {/* Background accent */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-electric-taupe/10 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <h2 className="text-5xl md:text-6xl mb-6">
            Our Approach
          </h2>
          <p className="text-2xl text-electric-taupe tracking-widest mono">
            DETECT → EXPLAIN → ACT
          </p>
        </motion.div>

        {/* Desktop: Horizontal scroll effect */}
        <div className="hidden md:grid md:grid-cols-3 gap-8 relative">
          {/* Connection lines */}
          <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-gradient-to-r from-electric-taupe via-signal-blue to-electric-taupe opacity-30 -translate-y-1/2 z-0" />

          {stages.map((stage, index) => (
            <motion.div
              key={stage.title}
              initial={{ opacity: 0, y: 50 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: index * 0.2 }}
              className="relative z-10"
            >
              <div className="bg-obsidian-black border-2 border-cold-steel rounded-2xl p-8 h-full hover:border-signal-blue transition-all duration-300 group">
                {/* Icon */}
                <div
                  className="w-16 h-16 rounded-xl mb-6 flex items-center justify-center transition-all group-hover:scale-110"
                  style={{ backgroundColor: stage.color + "20" }}
                >
                  <stage.icon
                    size={32}
                    style={{ color: stage.color }}
                  />
                </div>

                {/* Title */}
                <h3 className="text-3xl mb-4">{stage.title}</h3>

                {/* Description */}
                <p className="text-foreground/70 mb-6 leading-relaxed">
                  {stage.description}
                </p>

                {/* Details */}
                <ul className="space-y-3">
                  {stage.details.map((detail, i) => (
                    <li key={i} className="flex items-start gap-3 text-foreground/60">
                      <ArrowRight size={16} className="mt-1 flex-shrink-0" style={{ color: stage.color }} />
                      <span>{detail}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Mobile: Stacked cards */}
        <div className="md:hidden space-y-6">
          {stages.map((stage, index) => (
            <motion.div
              key={stage.title}
              initial={{ opacity: 0, x: -50 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8, delay: index * 0.2 }}
            >
              <div className="bg-obsidian-black border-2 border-cold-steel rounded-2xl p-6">
                <div
                  className="w-14 h-14 rounded-xl mb-4 flex items-center justify-center"
                  style={{ backgroundColor: stage.color + "20" }}
                >
                  <stage.icon size={28} style={{ color: stage.color }} />
                </div>
                <h3 className="text-2xl mb-3">{stage.title}</h3>
                <p className="text-foreground/70 mb-4">{stage.description}</p>
                <ul className="space-y-2">
                  {stage.details.map((detail, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-foreground/60">
                      <ArrowRight size={14} className="mt-1 flex-shrink-0" style={{ color: stage.color }} />
                      <span>{detail}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
