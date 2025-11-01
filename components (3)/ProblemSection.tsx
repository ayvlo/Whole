import { motion, useInView } from "motion/react";
import { useRef } from "react";
import { TrendingDown, AlertTriangle, Clock } from "lucide-react";

export function ProblemSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} className="py-32 bg-obsidian-black relative overflow-hidden">
      {/* Background accent */}
      <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-ash-graphite/30 to-transparent" />

      <div className="container mx-auto px-6 relative z-10">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          {/* Left: Text */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-5xl md:text-6xl mb-6">
              Teams waste hours <br />
              <span className="text-electric-taupe">finding what changed.</span>
            </h2>
            <p className="text-xl text-foreground/70 leading-relaxed mb-8">
              Most companies see revenue drop before they know why. Ayvlo monitors 
              key metrics 24/7 and detects anomalies before they spiral into costly problems.
            </p>
            <div className="space-y-4">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-lg bg-ash-graphite flex items-center justify-center flex-shrink-0">
                  <TrendingDown className="text-electric-taupe" size={24} />
                </div>
                <div>
                  <h4 className="mb-2">Late Detection</h4>
                  <p className="text-foreground/60">
                    By the time dashboards show a problem, the damage is done.
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-lg bg-ash-graphite flex items-center justify-center flex-shrink-0">
                  <AlertTriangle className="text-signal-blue" size={24} />
                </div>
                <div>
                  <h4 className="mb-2">No Context</h4>
                  <p className="text-foreground/60">
                    Alerts fire, but no one knows the root cause or what to do next.
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-lg bg-ash-graphite flex items-center justify-center flex-shrink-0">
                  <Clock className="text-electric-taupe" size={24} />
                </div>
                <div>
                  <h4 className="mb-2">Manual Triage</h4>
                  <p className="text-foreground/60">
                    Hours spent investigating instead of acting on solutions.
                  </p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right: Animation/Graphic */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative"
          >
            <div className="relative w-full aspect-square">
              {/* Fragmented dashboard visualization */}
              <motion.div
                animate={{
                  rotate: [0, 5, -5, 0],
                  scale: [1, 1.02, 0.98, 1],
                }}
                transition={{
                  duration: 6,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="absolute inset-0 border-2 border-cold-steel/30 rounded-2xl overflow-hidden"
              >
                {/* Grid pattern */}
                <div className="absolute inset-0 grid grid-cols-4 grid-rows-4 gap-2 p-4">
                  {Array.from({ length: 16 }).map((_, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0.3 }}
                      animate={{
                        opacity: [0.3, 0.7, 0.3],
                        backgroundColor: i % 3 === 0 ? "#C6A678" : "#565A66",
                      }}
                      transition={{
                        duration: 2,
                        delay: i * 0.1,
                        repeat: Infinity,
                        repeatType: "reverse",
                      }}
                      className="rounded bg-cold-steel"
                    />
                  ))}
                </div>

                {/* Central orb */}
                <motion.div
                  animate={{
                    scale: [1, 1.2, 1],
                    opacity: [0.5, 1, 0.5],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                  className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 rounded-full bg-gradient-to-br from-electric-taupe to-signal-blue blur-xl"
                />
              </motion.div>

              {/* Floating data points */}
              {[...Array(8)].map((_, i) => (
                <motion.div
                  key={i}
                  animate={{
                    y: [0, -20, 0],
                    x: [0, Math.sin(i) * 10, 0],
                  }}
                  transition={{
                    duration: 3 + i * 0.2,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                  className="absolute w-3 h-3 rounded-full bg-signal-blue"
                  style={{
                    top: `${20 + (i * 10) % 60}%`,
                    left: `${10 + (i * 15) % 80}%`,
                  }}
                />
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
