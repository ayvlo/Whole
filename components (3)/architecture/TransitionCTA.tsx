import { motion, useInView } from "motion/react";
import { useRef } from "react";
import { Button } from "../ui/button";
import { ArrowRight, BookOpen } from "lucide-react";

export function TransitionCTA() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} className="py-32 bg-obsidian-black relative overflow-hidden">
      {/* Animated background gradient */}
      <div className="absolute inset-0 opacity-30">
        <motion.div
          animate={{
            rotate: 360,
          }}
          transition={{
            duration: 30,
            repeat: Infinity,
            ease: "linear",
          }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-r from-electric-taupe/30 to-signal-blue/30 rounded-full blur-3xl"
        />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="max-w-4xl mx-auto text-center"
        >
          <h2 className="text-5xl md:text-6xl mb-8">
            Ready to see <br />
            <span className="text-electric-taupe">Ayvlo in Action?</span>
          </h2>

          <p className="text-xl text-foreground/70 mb-12 max-w-2xl mx-auto leading-relaxed">
            Explore real-world use cases and dive deeper into how Ayvlo
            transforms business intelligence from reactive to autonomous.
          </p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <Button
              className="bg-electric-taupe hover:bg-electric-taupe/90 text-obsidian-black px-8 py-6 text-lg transition-all hover:glow-electric-taupe group"
            >
              Explore Use Cases
              <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" size={20} />
            </Button>

            <Button
              variant="outline"
              className="border-2 border-signal-blue text-signal-blue hover:bg-signal-blue/10 px-8 py-6 text-lg transition-all group"
            >
              <BookOpen className="mr-2" size={20} />
              Read Documentation
            </Button>
          </motion.div>

          {/* Decorative elements */}
          <div className="mt-16 flex justify-center gap-12">
            {["Detect", "Explain", "Act"].map((stage, index) => (
              <motion.div
                key={stage}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.5 + index * 0.1 }}
                className="text-center"
              >
                <div className="w-16 h-16 rounded-full border-2 border-cold-steel/30 flex items-center justify-center mx-auto mb-3">
                  <span className="text-2xl">{index + 1}</span>
                </div>
                <span className="text-sm text-foreground/60 mono">{stage}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
