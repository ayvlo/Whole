import { motion, useInView } from "motion/react";
import { useRef, useState } from "react";
import { Check, Circle } from "lucide-react";

const milestones = [
  {
    title: "Idea Formation",
    date: "June 2025",
    status: "completed",
  },
  {
    title: "Problem Validation",
    date: "15 Interviews",
    status: "completed",
  },
  {
    title: "Waitlist Launch",
    date: "50+ Signups",
    status: "completed",
  },
  {
    title: "MVP Blueprint",
    date: "In Progress",
    status: "active",
  },
];

export function TimelineStrip() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <section ref={ref} className="py-32 bg-ash-graphite">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl mb-4">
            Our <span className="text-electric-taupe">Journey</span>
          </h2>
          <p className="text-foreground/60 mono tracking-wider">
            PHASE 1 — FOUNDATION & VALIDATION
          </p>
        </motion.div>

        {/* Desktop Timeline */}
        <div className="hidden md:block relative max-w-6xl mx-auto">
          {/* Timeline line */}
          <div className="absolute top-24 left-0 right-0 h-0.5 bg-cold-steel/30" />
          <motion.div
            initial={{ width: 0 }}
            animate={isInView ? { width: "75%" } : {}}
            transition={{ duration: 2, delay: 0.5 }}
            className="absolute top-24 left-0 h-0.5 bg-gradient-to-r from-electric-taupe to-signal-blue"
          />

          {/* Milestones */}
          <div className="grid grid-cols-4 gap-4 relative">
            {milestones.map((milestone, index) => (
              <motion.div
                key={milestone.title}
                initial={{ opacity: 0, y: 50 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.2 + index * 0.2 }}
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
                className="relative"
              >
                {/* Node */}
                <div className="flex justify-center mb-12">
                  <motion.div
                    animate={{
                      scale: hoveredIndex === index ? 1.2 : 1,
                      boxShadow:
                        hoveredIndex === index || milestone.status === "active"
                          ? "0 0 30px rgba(198, 166, 120, 0.6)"
                          : "0 0 0px rgba(198, 166, 120, 0)",
                    }}
                    className={`w-16 h-16 rounded-full border-4 flex items-center justify-center transition-all ${
                      milestone.status === "completed"
                        ? "bg-electric-taupe border-electric-taupe"
                        : milestone.status === "active"
                        ? "bg-obsidian-black border-electric-taupe animate-pulse"
                        : "bg-obsidian-black border-cold-steel"
                    }`}
                  >
                    {milestone.status === "completed" ? (
                      <Check className="text-obsidian-black" size={28} />
                    ) : (
                      <Circle className="text-electric-taupe" size={24} />
                    )}
                  </motion.div>
                </div>

                {/* Content card */}
                <motion.div
                  animate={{
                    y: hoveredIndex === index ? -8 : 0,
                  }}
                  className="bg-obsidian-black/50 backdrop-blur-sm border border-cold-steel/30 rounded-xl p-6 text-center"
                >
                  <h4 className="mb-2">{milestone.title}</h4>
                  <p className="text-sm text-foreground/60 mono">
                    {milestone.date}
                  </p>
                </motion.div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Mobile Timeline */}
        <div className="md:hidden space-y-8 max-w-md mx-auto">
          {milestones.map((milestone, index) => (
            <motion.div
              key={milestone.title}
              initial={{ opacity: 0, x: -50 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.5, delay: index * 0.2 }}
              className="flex gap-4"
            >
              {/* Node */}
              <div className="flex flex-col items-center">
                <div
                  className={`w-12 h-12 rounded-full border-4 flex items-center justify-center flex-shrink-0 ${
                    milestone.status === "completed"
                      ? "bg-electric-taupe border-electric-taupe"
                      : milestone.status === "active"
                      ? "bg-obsidian-black border-electric-taupe animate-pulse glow-electric-taupe"
                      : "bg-obsidian-black border-cold-steel"
                  }`}
                >
                  {milestone.status === "completed" ? (
                    <Check className="text-obsidian-black" size={20} />
                  ) : (
                    <Circle className="text-electric-taupe" size={16} />
                  )}
                </div>
                {index < milestones.length - 1 && (
                  <div className="w-0.5 h-16 bg-cold-steel/30 mt-2" />
                )}
              </div>

              {/* Content */}
              <div className="bg-obsidian-black/50 backdrop-blur-sm border border-cold-steel/30 rounded-xl p-4 flex-1">
                <h4 className="mb-1">{milestone.title}</h4>
                <p className="text-sm text-foreground/60 mono">
                  {milestone.date}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
