import { motion, useInView } from "motion/react";
import { useRef } from "react";
import { Quote } from "lucide-react";

export function FounderQuoteSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section
      ref={ref}
      className="py-32 bg-ash-graphite relative overflow-hidden"
    >
      {/* Background accent */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-radial from-electric-taupe/10 via-transparent to-transparent" />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={isInView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.8 }}
          className="max-w-5xl mx-auto"
        >
          <div className="bg-obsidian-black/80 backdrop-blur-xl border-2 border-electric-taupe/30 rounded-3xl p-12 md:p-16 relative">
            {/* Quote icon */}
            <motion.div
              initial={{ opacity: 0, rotate: -10 }}
              animate={isInView ? { opacity: 0.2, rotate: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="absolute top-8 left-8 text-electric-taupe"
            >
              <Quote size={64} strokeWidth={1} />
            </motion.div>

            {/* Quote text */}
            <motion.blockquote
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-3xl md:text-5xl leading-tight text-center mb-12 relative z-10"
            >
              Every company deserves an{" "}
              <span className="text-electric-taupe">always-on intelligence layer</span>{" "}
              that <span className="text-signal-blue italic">thinks ahead</span> for them.
            </motion.blockquote>

            {/* Signature */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="text-center"
            >
              <div className="inline-block">
                <div className="text-xl mb-2">Abdalla Adam</div>
                <div className="text-sm text-foreground/60 mono tracking-wider border-t border-electric-taupe/30 pt-2">
                  FOUNDER OF AYVLO
                </div>
              </div>
            </motion.div>

            {/* Decorative elements */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-signal-blue/20 to-transparent rounded-bl-full blur-2xl" />
            <div className="absolute bottom-0 left-0 w-32 h-32 bg-gradient-to-tr from-electric-taupe/20 to-transparent rounded-tr-full blur-2xl" />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
