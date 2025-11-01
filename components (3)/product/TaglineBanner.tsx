import { motion, useInView } from "motion/react";
import { useRef } from "react";

const stages = ["Detect", "Explain", "Decide", "Act"];

export function TaglineBanner() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} className="py-32 bg-obsidian-black relative overflow-hidden">
      {/* Animated background gradient */}
      <div className="absolute inset-0 bg-gradient-to-r from-electric-taupe/5 via-signal-blue/5 to-electric-taupe/5 opacity-50" />

      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={isInView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.8 }}
          className="max-w-6xl mx-auto"
        >
          {/* Main tagline */}
          <div className="flex flex-wrap justify-center items-center gap-4 md:gap-8 mb-12">
            {stages.map((stage, index) => (
              <div key={stage} className="flex items-center gap-4 md:gap-8">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: index * 0.2 }}
                  className="relative"
                >
                  <h2 className="text-4xl md:text-6xl">
                    <span
                      className={
                        index === 0 || index === 3
                          ? "text-electric-taupe"
                          : index === 1
                          ? "text-signal-blue"
                          : "text-foreground"
                      }
                    >
                      {stage}
                    </span>
                  </h2>

                  {/* Animated underline */}
                  <motion.div
                    initial={{ width: 0 }}
                    animate={isInView ? { width: "100%" } : {}}
                    transition={{
                      duration: 0.8,
                      delay: 0.5 + index * 0.2,
                    }}
                    className="absolute -bottom-2 left-0 h-1 rounded-full"
                    style={{
                      background:
                        index === 0 || index === 3
                          ? "linear-gradient(90deg, #C6A678, transparent)"
                          : index === 1
                          ? "linear-gradient(90deg, #3F8EFC, transparent)"
                          : "linear-gradient(90deg, #565A66, transparent)",
                    }}
                  />

                  {/* Neon line animation */}
                  {isInView && (
                    <motion.div
                      initial={{ left: 0, opacity: 0 }}
                      animate={{ left: "100%", opacity: [0, 1, 0] }}
                      transition={{
                        duration: 2,
                        delay: 1 + index * 0.3,
                        repeat: Infinity,
                        repeatDelay: 3,
                      }}
                      className="absolute -bottom-2 w-8 h-1 rounded-full"
                      style={{
                        background:
                          index === 0 || index === 3 ? "#C6A678" : "#3F8EFC",
                        boxShadow:
                          index === 0 || index === 3
                            ? "0 0 20px #C6A678"
                            : "0 0 20px #3F8EFC",
                      }}
                    />
                  )}
                </motion.div>

                {/* Arrow separator */}
                {index < stages.length - 1 && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0 }}
                    animate={isInView ? { opacity: 1, scale: 1 } : {}}
                    transition={{ duration: 0.3, delay: 0.3 + index * 0.2 }}
                    className="text-3xl md:text-5xl text-cold-steel"
                  >
                    →
                  </motion.div>
                )}
              </div>
            ))}
          </div>

          {/* Subtext */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 1.5 }}
            className="text-center"
          >
            <p className="text-xl text-foreground/70 mb-8">
              The complete autonomous intelligence loop.
            </p>

            {/* Loop indicator */}
            <motion.div
              animate={{
                rotate: 360,
              }}
              transition={{
                duration: 20,
                repeat: Infinity,
                ease: "linear",
              }}
              className="inline-flex items-center justify-center w-16 h-16 rounded-full border-2 border-electric-taupe/30"
            >
              <motion.div
                animate={{
                  scale: [1, 1.2, 1],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                }}
                className="w-3 h-3 rounded-full bg-electric-taupe"
              />
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
