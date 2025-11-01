import { motion, useInView } from "motion/react";
import { useRef } from "react";
import { Button } from "../ui/button";
import { ArrowRight, Mail } from "lucide-react";

export function CareersCTA() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section
      ref={ref}
      className="py-32 bg-obsidian-black relative overflow-hidden"
    >
      {/* Background gradient */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-electric-taupe/10 via-transparent to-signal-blue/10" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(198,166,120,0.1)_0%,transparent_50%)]" />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={isInView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.8 }}
          className="max-w-5xl mx-auto"
        >
          <div className="bg-ash-graphite/50 backdrop-blur-xl border-2 border-electric-taupe/30 rounded-3xl p-12 md:p-16 text-center">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-4xl md:text-6xl mb-6"
            >
              Ready to build the next layer of{" "}
              <span className="text-electric-taupe">
                business intelligence?
              </span>
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-xl text-foreground/70 mb-12 max-w-3xl mx-auto"
            >
              Join a team that's building autonomous systems that detect,
              explain, and act — transforming how modern businesses understand
              their data.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="flex flex-col sm:flex-row gap-4 justify-center items-center"
            >
              <Button className="bg-electric-taupe hover:bg-electric-taupe/90 text-obsidian-black px-8 py-6 text-lg group">
                Apply Now
                <ArrowRight
                  size={20}
                  className="ml-2 group-hover:translate-x-1 transition-transform"
                />
              </Button>

              <Button
                variant="outline"
                className="border-2 border-signal-blue text-signal-blue hover:bg-signal-blue/10 px-8 py-6 text-lg group"
              >
                <Mail size={20} className="mr-2" />
                careers@ayvlo.com
              </Button>
            </motion.div>

            {/* Stats bar */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.8 }}
              className="grid grid-cols-3 gap-8 mt-16 pt-12 border-t border-cold-steel/30"
            >
              {[
                { label: "Early-Stage", value: "Phase 2" },
                { label: "Team Size", value: "5-10" },
                { label: "Funding", value: "Pre-Seed" },
              ].map((stat, index) => (
                <div key={stat.label} className="text-center">
                  <div className="text-2xl text-electric-taupe mono mb-2">
                    {stat.value}
                  </div>
                  <div className="text-sm text-foreground/60">{stat.label}</div>
                </div>
              ))}
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
