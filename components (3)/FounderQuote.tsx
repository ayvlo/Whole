import { motion, useInView } from "motion/react";
import { useRef } from "react";
import { Quote } from "lucide-react";

export function FounderQuote() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const milestones = [
    { number: "15", label: "Customer Interviews" },
    { number: "50+", label: "Waitlist Sign-ups" },
    { number: "3", label: "Core MVP Use Cases" },
  ];

  return (
    <section ref={ref} className="py-32 bg-obsidian-black relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute inset-0 flex items-center justify-center opacity-20">
        <div className="w-[600px] h-[600px] bg-signal-blue rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="max-w-4xl mx-auto text-center"
        >
          {/* Quote icon */}
          <motion.div
            initial={{ scale: 0 }}
            animate={isInView ? { scale: 1 } : {}}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="inline-block mb-8"
          >
            <Quote size={64} className="text-electric-taupe opacity-50" />
          </motion.div>

          {/* Quote */}
          <motion.blockquote
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-4xl md:text-5xl italic mb-12 leading-relaxed"
            style={{ fontStyle: 'italic' }}
          >
            "Ayvlo exists to close the gap between{" "}
            <span className="text-electric-taupe">data</span> and{" "}
            <span className="text-signal-blue">decisions</span>."
          </motion.blockquote>

          {/* Milestones */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="mt-16 pt-16 border-t border-cold-steel/30"
          >
            <h4 className="text-xl text-foreground/60 mb-8 tracking-wider">
              PHASE 1 VALIDATION
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {milestones.map((milestone, index) => (
                <motion.div
                  key={milestone.label}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={isInView ? { opacity: 1, scale: 1 } : {}}
                  transition={{ duration: 0.5, delay: 0.8 + index * 0.1 }}
                  className="text-center"
                >
                  <div className="text-5xl md:text-6xl mb-3 text-electric-taupe mono">
                    {milestone.number}
                  </div>
                  <div className="text-foreground/70 tracking-wide">
                    {milestone.label}
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
