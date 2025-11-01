import { motion, useInView } from "motion/react";
import { useRef } from "react";
import { Code, Zap, Radio } from "lucide-react";

const principles = [
  {
    icon: Code,
    title: "Clarity before code.",
    description:
      "Validate problems deeply before building. Every line of code should solve a proven need, not an assumed one.",
  },
  {
    icon: Zap,
    title: "Autonomy over automation.",
    description:
      "Systems that adapt, not repeat. True intelligence means learning context and making decisions, not just following scripts.",
  },
  {
    icon: Radio,
    title: "Signal over noise.",
    description:
      "Focus on what matters and ignore the static. The best systems filter complexity, not amplify it.",
  },
];

export function PrinciplesGrid() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

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
            Our <span className="text-electric-taupe">Principles</span>
          </h2>
          <p className="text-xl text-foreground/60 mono tracking-wider">
            The foundations that guide every decision
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {principles.map((principle, index) => (
            <motion.div
              key={principle.title}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.15 }}
              whileHover={{ y: -8 }}
              className="group"
            >
              <div className="bg-ash-graphite/50 backdrop-blur-xl border border-cold-steel/30 rounded-3xl p-8 h-full hover:border-electric-taupe/50 transition-all duration-300 relative overflow-hidden">
                {/* Hover glow effect */}
                <div className="absolute inset-0 bg-gradient-to-br from-electric-taupe/0 via-signal-blue/0 to-electric-taupe/0 group-hover:from-electric-taupe/10 group-hover:via-signal-blue/5 group-hover:to-electric-taupe/10 transition-all duration-500 rounded-3xl" />

                {/* Icon */}
                <div className="relative mb-6">
                  <div className="w-16 h-16 rounded-2xl bg-electric-taupe/20 border border-electric-taupe/30 flex items-center justify-center group-hover:bg-signal-blue/20 group-hover:border-signal-blue/30 transition-all duration-300">
                    <principle.icon
                      size={32}
                      className="text-electric-taupe group-hover:text-signal-blue transition-colors duration-300"
                    />
                  </div>
                </div>

                {/* Content */}
                <div className="relative">
                  <h3 className="text-2xl mb-4 group-hover:text-electric-taupe transition-colors">
                    {principle.title}
                  </h3>
                  <p className="text-foreground/70 leading-relaxed">
                    {principle.description}
                  </p>

                  {/* Animated underline */}
                  <motion.div
                    initial={{ width: "0%" }}
                    whileHover={{ width: "100%" }}
                    className="h-0.5 bg-gradient-to-r from-electric-taupe to-signal-blue mt-6 transition-all duration-300"
                  />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
