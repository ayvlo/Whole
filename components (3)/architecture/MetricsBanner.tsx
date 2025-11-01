import { motion, useInView } from "motion/react";
import { useRef } from "react";

const metrics = [
  { value: "<24hrs", label: "TTFV", description: "Time To First Value" },
  { value: "15", label: "Interviews", description: "Customer Discovery" },
  { value: "50+", label: "Signups", description: "Waitlist Members" },
  { value: "3", label: "Use Cases", description: "Core MVP Scenarios" },
];

export function MetricsBanner() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} className="py-32 bg-ash-graphite relative overflow-hidden">
      {/* Background accent */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-electric-taupe/5 to-transparent" />

      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl mb-4">
            Validated by <span className="text-electric-taupe">Real Numbers</span>
          </h2>
          <p className="text-foreground/60 mono tracking-wider">
            Every number here is earned through validation, not assumption.
          </p>
        </motion.div>

        {/* Metrics Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-6xl mx-auto">
          {metrics.map((metric, index) => (
            <motion.div
              key={metric.label}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="text-center"
            >
              <div
                className="bg-obsidian-black/50 backdrop-blur-xl border border-cold-steel/30 rounded-2xl p-8 group hover:border-electric-taupe/50 transition-all duration-300"
                style={{
                  boxShadow: "0 0 20px rgba(198, 166, 120, 0.1)",
                }}
              >
                {/* Value */}
                <motion.div
                  initial={{ scale: 1 }}
                  whileHover={{ scale: 1.05 }}
                  className="text-5xl md:text-6xl mb-3 text-electric-taupe mono"
                >
                  {metric.value}
                </motion.div>

                {/* Label */}
                <div className="text-lg mb-2 tracking-wider">{metric.label}</div>

                {/* Description */}
                <div className="text-sm text-foreground/60 mono">
                  {metric.description}
                </div>

                {/* Animated underline */}
                <motion.div
                  initial={{ width: "0%" }}
                  whileHover={{ width: "100%" }}
                  className="h-0.5 bg-electric-taupe mx-auto mt-4 transition-all duration-300"
                />
              </div>
            </motion.div>
          ))}
        </div>

        {/* Subtext */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="text-center mt-16"
        >
          <p className="text-lg text-foreground/70 italic">
            "We measure what matters. Every metric tells a story of validation."
          </p>
        </motion.div>
      </div>
    </section>
  );
}
