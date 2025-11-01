import { motion, useInView } from "motion/react";
import { useRef } from "react";

const timelineEvents = [
  { date: "June 2025", event: "The Question", detail: "What changed and why?" },
  { date: "July 2025", event: "15 Interviews", detail: "Deep customer discovery" },
  { date: "Aug 2025", event: "Phase 1 Manual", detail: "Validation framework built" },
  { date: "Oct 2025", event: "50+ Signups", detail: "Waitlist momentum" },
  { date: "Nov 2025", event: "Phase 2 Begin", detail: "Building the autonomous layer" },
];

export function OriginStory() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section
      ref={ref}
      className="py-32 bg-ash-graphite relative overflow-hidden"
    >
      {/* Background accent */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-electric-taupe/5 to-transparent" />

      <div className="container mx-auto px-6 relative z-10">
        <div className="grid md:grid-cols-2 gap-16 max-w-7xl mx-auto">
          {/* Left: Narrative Text */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-5xl mb-8">
              The <span className="text-electric-taupe">Origin Story</span>
            </h2>

            <div className="space-y-6 text-lg text-foreground/80 leading-relaxed">
              <p>
                In June 2025, Ayvlo started as a{" "}
                <span className="text-signal-blue">personal problem</span> —
                spending hours digging through dashboards to answer the simple
                question: <em>"What changed and why?"</em>
              </p>

              <p>
                After 15 customer interviews with operators, analysts, and
                founders, the pattern became clear: everyone was doing the same
                manual detective work, every single day.
              </p>

              <p>
                Phase 1 wasn't about building a product. It became a{" "}
                <span className="text-electric-taupe">manual of validation</span>,
                not just a product plan. Every conversation, every insight,
                every pain point was documented and tested.
              </p>

              <p>
                The result? A clear vision for an{" "}
                <span className="text-signal-blue">
                  autonomous intelligence layer
                </span>{" "}
                that doesn't just report data — it explains it, contextualizes
                it, and acts on it.
              </p>

              <p className="text-foreground/60 italic border-l-2 border-electric-taupe pl-4">
                "We're not building another analytics tool. We're building the
                system that makes analytics obsolete."
              </p>
            </div>
          </motion.div>

          {/* Right: Timeline Illustration */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative"
          >
            <div className="bg-obsidian-black/50 backdrop-blur-xl border border-cold-steel/30 rounded-3xl p-8">
              <h3 className="text-2xl mb-8 text-electric-taupe mono">
                THE JOURNEY
              </h3>

              <div className="space-y-8">
                {timelineEvents.map((item, index) => (
                  <motion.div
                    key={item.date}
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
                    className="relative pl-8 border-l-2 border-electric-taupe/30 hover:border-signal-blue transition-colors"
                  >
                    {/* Timeline dot */}
                    <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-electric-taupe border-2 border-obsidian-black" />

                    <div className="mono text-xs text-foreground/60 mb-1">
                      {item.date}
                    </div>
                    <div className="text-xl mb-1">{item.event}</div>
                    <div className="text-sm text-foreground/70">
                      {item.detail}
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Connecting line animation */}
              <motion.div
                className="absolute left-8 top-16 bottom-16 w-0.5 bg-gradient-to-b from-electric-taupe via-signal-blue to-electric-taupe"
                initial={{ scaleY: 0 }}
                animate={isInView ? { scaleY: 1 } : {}}
                transition={{ duration: 1.5, delay: 0.5 }}
                style={{ transformOrigin: "top" }}
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
