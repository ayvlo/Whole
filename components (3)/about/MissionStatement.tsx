import { motion, useInView } from "motion/react";
import { useRef } from "react";
import { ArrowRight } from "lucide-react";

export function MissionStatement() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} className="py-32 bg-obsidian-black relative overflow-hidden">
      <div className="container mx-auto px-6">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-5xl md:text-6xl mb-8">
              Our <span className="text-electric-taupe">Mission</span>
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-16 items-center">
            {/* Left: Mission Text */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="bg-ash-graphite/50 backdrop-blur-xl border border-cold-steel/30 rounded-2xl p-10"
              style={{
                boxShadow: "0 0 40px rgba(198, 166, 120, 0.1)",
              }}
            >
              <p className="text-2xl leading-relaxed text-foreground/90">
                Become the{" "}
                <span className="text-electric-taupe font-semibold">
                  autonomous intelligence layer
                </span>{" "}
                for modern businesses — continuously monitoring key metrics,
                explaining changes in plain language, and automating what
                happens next.
              </p>
            </motion.div>

            {/* Right: Flow Diagram */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="relative"
            >
              <div className="flex flex-col gap-8">
                {/* Noise */}
                <motion.div
                  initial={{ opacity: 0.3 }}
                  animate={{ opacity: [0.3, 1, 0.3] }}
                  transition={{ duration: 3, repeat: Infinity }}
                  className="relative"
                >
                  <div className="bg-foreground/5 border border-cold-steel/50 rounded-xl p-6 text-center">
                    <div className="text-sm text-foreground/50 mb-2 mono">INPUT</div>
                    <div className="text-2xl">Noise</div>
                    <div className="absolute inset-0 grid grid-cols-6 grid-rows-3 gap-1 p-3 opacity-30">
                      {Array.from({ length: 18 }).map((_, i) => (
                        <div
                          key={i}
                          className="bg-foreground/20 rounded-sm"
                          style={{
                            height: `${Math.random() * 100}%`,
                          }}
                        />
                      ))}
                    </div>
                  </div>
                  <ArrowRight className="absolute -right-6 top-1/2 -translate-y-1/2 text-electric-taupe" />
                </motion.div>

                {/* Insight */}
                <motion.div
                  initial={{ opacity: 0.3 }}
                  animate={{ opacity: [0.3, 1, 0.3] }}
                  transition={{ duration: 3, repeat: Infinity, delay: 1 }}
                  className="relative ml-12"
                >
                  <div className="bg-signal-blue/10 border border-signal-blue/50 rounded-xl p-6 text-center">
                    <div className="text-sm text-signal-blue mb-2 mono">PROCESS</div>
                    <div className="text-2xl">Insight</div>
                  </div>
                  <ArrowRight className="absolute -right-6 top-1/2 -translate-y-1/2 text-signal-blue" />
                </motion.div>

                {/* Action */}
                <motion.div
                  initial={{ opacity: 0.3 }}
                  animate={{ opacity: [0.3, 1, 0.3] }}
                  transition={{ duration: 3, repeat: Infinity, delay: 2 }}
                  className="ml-24"
                >
                  <div className="bg-electric-taupe/10 border border-electric-taupe/50 rounded-xl p-6 text-center">
                    <div className="text-sm text-electric-taupe mb-2 mono">OUTPUT</div>
                    <div className="text-2xl">Action</div>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
