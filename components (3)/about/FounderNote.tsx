import { motion, useInView } from "motion/react";
import { useRef } from "react";
import { Quote } from "lucide-react";

export function FounderNote() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} className="py-32 bg-obsidian-black relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-ash-graphite/30 to-transparent" />

      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={isInView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.8 }}
          className="max-w-4xl mx-auto"
        >
          <div
            className="bg-ash-graphite/80 backdrop-blur-xl border border-cold-steel/50 rounded-2xl p-12 md:p-16 relative"
            style={{
              boxShadow: "0 0 80px rgba(198, 166, 120, 0.15)",
            }}
          >
            {/* Quote icon */}
            <Quote
              size={80}
              className="absolute top-8 left-8 text-electric-taupe/20"
            />

            {/* Quote */}
            <blockquote className="relative z-10 text-center">
              <p className="text-3xl md:text-4xl italic mb-8 leading-relaxed text-foreground">
                "Ayvlo exists to close the gap between{" "}
                <span className="text-electric-taupe">data</span> and{" "}
                <span className="text-signal-blue">decisions</span>."
              </p>

              <footer className="text-lg text-foreground/70">
                <div className="h-px w-24 bg-electric-taupe/50 mx-auto mb-4" />
                <cite className="not-italic">
                  — Abdalla Adam, Founder & Builder
                </cite>
              </footer>
            </blockquote>

            {/* Decorative corner accents */}
            <div className="absolute top-0 right-0 w-32 h-32 border-t-2 border-r-2 border-electric-taupe/30 rounded-tr-2xl" />
            <div className="absolute bottom-0 left-0 w-32 h-32 border-b-2 border-l-2 border-signal-blue/30 rounded-bl-2xl" />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
