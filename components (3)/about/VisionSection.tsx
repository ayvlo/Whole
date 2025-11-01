import { motion, useInView } from "motion/react";
import { useRef } from "react";
import { Slack, Database, BellRing, Workflow, MessageSquare, Zap } from "lucide-react";

const tools = [
  { name: "Slack", icon: Slack, position: { top: "20%", left: "15%" } },
  { name: "HubSpot", icon: Database, position: { top: "40%", left: "5%" } },
  { name: "Notion", icon: BellRing, position: { top: "70%", left: "20%" } },
  { name: "Workflows", icon: Workflow, position: { top: "30%", left: "75%" } },
  { name: "Analytics", icon: MessageSquare, position: { top: "60%", left: "80%" } },
  { name: "Actions", icon: Zap, position: { top: "15%", left: "85%" } },
];

export function VisionSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} className="py-32 bg-ash-graphite relative overflow-hidden">
      {/* Constellation background */}
      <div className="absolute inset-0 opacity-20">
        {tools.map((tool, index) => (
          <motion.div
            key={tool.name}
            initial={{ opacity: 0, scale: 0 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="absolute"
            style={tool.position}
          >
            <motion.div
              animate={{
                y: [0, -10, 0],
                rotate: [0, 5, -5, 0],
              }}
              transition={{
                duration: 4 + index,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="relative"
            >
              <div className="w-16 h-16 rounded-xl bg-ash-graphite/50 border border-cold-steel/30 flex items-center justify-center backdrop-blur-sm">
                <tool.icon size={24} className="text-signal-blue" />
              </div>
              
              {/* Connection lines to center */}
              <svg
                className="absolute top-1/2 left-1/2 -z-10"
                width="200"
                height="200"
                style={{
                  transform: "translate(-50%, -50%)",
                }}
              >
                <motion.line
                  x1="100"
                  y1="100"
                  x2="100"
                  y2="0"
                  stroke="rgba(63, 142, 252, 0.2)"
                  strokeWidth="1"
                  initial={{ pathLength: 0 }}
                  animate={isInView ? { pathLength: 1 } : {}}
                  transition={{ duration: 2, delay: index * 0.2 }}
                />
              </svg>
            </motion.div>
          </motion.div>
        ))}
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="max-w-5xl mx-auto text-center"
        >
          <h2 className="text-5xl md:text-6xl mb-12">
            Our <span className="text-signal-blue">Vision</span>
          </h2>

          <div
            className="bg-obsidian-black/50 backdrop-blur-xl border border-cold-steel/30 rounded-2xl p-12"
            style={{
              boxShadow: "0 0 60px rgba(63, 142, 252, 0.15)",
            }}
          >
            <p className="text-2xl md:text-3xl leading-relaxed text-foreground/90 mb-8">
              A future where every company operates with an{" "}
              <span className="text-signal-blue font-semibold">
                always-on intelligence layer
              </span>
              : data speaks, workflows self-assemble, insights arrive
              proactively, and growth is unconstrained by bandwidth.
            </p>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-12 pt-12 border-t border-cold-steel/30">
              {[
                "Data Speaks",
                "Workflows Self-Assemble",
                "Proactive Insights",
                "Unconstrained Growth",
              ].map((item, index) => (
                <motion.div
                  key={item}
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: 1 + index * 0.1 }}
                  className="text-center"
                >
                  <div className="text-sm text-electric-taupe mono tracking-wider">
                    {item}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
