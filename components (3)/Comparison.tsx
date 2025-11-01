import { motion, useInView } from "motion/react";
import { useRef } from "react";
import { Check, X } from "lucide-react";

const comparisons = [
  {
    feature: "Real-time Anomaly Detection",
    ayvlo: true,
    zapier: false,
    dust: false,
    thoughtspot: true,
    anodot: true,
  },
  {
    feature: "Natural Language Root Cause Analysis",
    ayvlo: true,
    zapier: false,
    dust: true,
    thoughtspot: true,
    anodot: false,
  },
  {
    feature: "Autonomous Action Execution",
    ayvlo: true,
    zapier: true,
    dust: false,
    thoughtspot: false,
    anodot: false,
  },
  {
    feature: "Causal Inference Engine",
    ayvlo: true,
    zapier: false,
    dust: false,
    thoughtspot: false,
    anodot: false,
  },
  {
    feature: "Closed-Loop Automation (Detect → Explain → Act)",
    ayvlo: true,
    zapier: false,
    dust: false,
    thoughtspot: false,
    anodot: false,
  },
];

export function Comparison() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} className="py-32 bg-obsidian-black relative overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-ash-graphite/20 to-transparent" />

      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-5xl md:text-6xl mb-6">
            We Don't Hand Off Insights —<br />
            <span className="text-electric-taupe">We Close the Loop</span>
          </h2>
          <p className="text-xl text-foreground/70 max-w-3xl mx-auto mono">
            DETECT → EXPLAIN → DECIDE → ACT
          </p>
        </motion.div>

        {/* Desktop Table */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="hidden md:block overflow-x-auto"
        >
          <div className="bg-ash-graphite border border-cold-steel rounded-2xl overflow-hidden">
            <table className="w-full">
              <thead>
                <tr className="border-b border-cold-steel">
                  <th className="text-left p-6 text-foreground/70">Feature</th>
                  <th className="p-6 bg-electric-taupe/10">
                    <div className="text-electric-taupe">Ayvlo</div>
                  </th>
                  <th className="p-6 text-foreground/70">Zapier</th>
                  <th className="p-6 text-foreground/70">Dust</th>
                  <th className="p-6 text-foreground/70">ThoughtSpot</th>
                  <th className="p-6 text-foreground/70">Anodot</th>
                </tr>
              </thead>
              <tbody>
                {comparisons.map((row, index) => (
                  <motion.tr
                    key={row.feature}
                    initial={{ opacity: 0, x: -20 }}
                    animate={isInView ? { opacity: 1, x: 0 } : {}}
                    transition={{ duration: 0.5, delay: 0.4 + index * 0.1 }}
                    className="border-b border-cold-steel/30 hover:bg-ash-graphite/50 transition-colors"
                  >
                    <td className="p-6 text-foreground/80">{row.feature}</td>
                    <td className="p-6 text-center bg-electric-taupe/5">
                      {row.ayvlo ? (
                        <Check className="inline-block text-electric-taupe" size={24} />
                      ) : (
                        <X className="inline-block text-foreground/30" size={24} />
                      )}
                    </td>
                    <td className="p-6 text-center">
                      {row.zapier ? (
                        <Check className="inline-block text-signal-blue" size={24} />
                      ) : (
                        <X className="inline-block text-foreground/30" size={24} />
                      )}
                    </td>
                    <td className="p-6 text-center">
                      {row.dust ? (
                        <Check className="inline-block text-signal-blue" size={24} />
                      ) : (
                        <X className="inline-block text-foreground/30" size={24} />
                      )}
                    </td>
                    <td className="p-6 text-center">
                      {row.thoughtspot ? (
                        <Check className="inline-block text-signal-blue" size={24} />
                      ) : (
                        <X className="inline-block text-foreground/30" size={24} />
                      )}
                    </td>
                    <td className="p-6 text-center">
                      {row.anodot ? (
                        <Check className="inline-block text-signal-blue" size={24} />
                      ) : (
                        <X className="inline-block text-foreground/30" size={24} />
                      )}
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>

        {/* Mobile Cards */}
        <div className="md:hidden space-y-4">
          {comparisons.map((row, index) => (
            <motion.div
              key={row.feature}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
              className="bg-ash-graphite border border-cold-steel rounded-xl p-4"
            >
              <h4 className="mb-3">{row.feature}</h4>
              <div className="grid grid-cols-2 gap-2 text-sm">
                <div className={row.ayvlo ? "text-electric-taupe" : "text-foreground/30"}>
                  {row.ayvlo ? "✓" : "✗"} Ayvlo
                </div>
                <div className={row.zapier ? "text-signal-blue" : "text-foreground/30"}>
                  {row.zapier ? "✓" : "✗"} Zapier
                </div>
                <div className={row.dust ? "text-signal-blue" : "text-foreground/30"}>
                  {row.dust ? "✓" : "✗"} Dust
                </div>
                <div className={row.thoughtspot ? "text-signal-blue" : "text-foreground/30"}>
                  {row.thoughtspot ? "✓" : "✗"} ThoughtSpot
                </div>
                <div className={row.anodot ? "text-signal-blue" : "text-foreground/30"}>
                  {row.anodot ? "✓" : "✗"} Anodot
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
