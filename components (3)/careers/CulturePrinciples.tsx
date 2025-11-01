import { motion, useInView } from "motion/react";
import { useRef, useState } from "react";
import { ChevronDown } from "lucide-react";

const principles = [
  {
    title: "Focus Deeply.",
    preview: "We do fewer things, better.",
    expanded:
      "In a world of infinite distractions, we choose depth over breadth. Every feature, every line of code, every customer conversation gets our full attention. We build systems that matter, not feature lists that impress.",
  },
  {
    title: "Move Deliberately.",
    preview: "Speed matters, but direction matters more.",
    expanded:
      "We're not chasing hockey-stick growth at the expense of clarity. Phase 1 taught us that validation beats velocity. We ship fast, but only after understanding the problem deeply. Deliberate speed compounds; reckless speed crashes.",
  },
  {
    title: "Build Responsibly.",
    preview: "Autonomous systems require ethical foundations.",
    expanded:
      "We're building intelligence that makes decisions on behalf of humans. That comes with responsibility. We prioritize privacy, transparency, and user control. Our systems should empower, not replace. Amplify, not automate away.",
  },
];

export function CulturePrinciples() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

  return (
    <section
      ref={ref}
      className="py-32 bg-obsidian-black relative overflow-hidden"
    >
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-5xl md:text-6xl mb-4">
            Culture <span className="text-electric-taupe">Principles</span>
          </h2>
          <p className="text-xl text-foreground/60">
            How we work, think, and build together
          </p>
        </motion.div>

        <div className="max-w-5xl mx-auto space-y-6">
          {principles.map((principle, index) => (
            <motion.div
              key={principle.title}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.15 }}
            >
              <div
                onClick={() =>
                  setExpandedIndex(expandedIndex === index ? null : index)
                }
                className="bg-ash-graphite/50 backdrop-blur-xl border border-cold-steel/30 rounded-3xl p-8 cursor-pointer hover:border-electric-taupe/50 transition-all duration-300"
              >
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <h3 className="text-3xl mb-2">{principle.title}</h3>
                    <p className="text-foreground/60 italic">
                      {principle.preview}
                    </p>
                  </div>

                  <motion.div
                    animate={{
                      rotate: expandedIndex === index ? 180 : 0,
                    }}
                    transition={{ duration: 0.3 }}
                    className="text-electric-taupe"
                  >
                    <ChevronDown size={28} />
                  </motion.div>
                </div>

                <motion.div
                  initial={false}
                  animate={{
                    height: expandedIndex === index ? "auto" : 0,
                    opacity: expandedIndex === index ? 1 : 0,
                  }}
                  transition={{ duration: 0.3 }}
                  className="overflow-hidden"
                >
                  <div className="pt-6 mt-6 border-t border-cold-steel/30">
                    <p className="text-lg text-foreground/80 leading-relaxed">
                      {principle.expanded}
                    </p>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
