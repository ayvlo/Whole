import { motion, useInView } from "motion/react";
import { useRef } from "react";
import { Check, X } from "lucide-react";

const features = [
  {
    name: "Causal Explanation",
    ayvlo: true,
    zapier: false,
    dust: false,
    n8n: false,
    anodot: false,
  },
  {
    name: "Proactive Insights",
    ayvlo: true,
    zapier: false,
    dust: true,
    n8n: false,
    anodot: true,
  },
  {
    name: "Autonomous Actions",
    ayvlo: true,
    zapier: true,
    dust: false,
    n8n: true,
    anodot: false,
  },
  {
    name: "Natural Language Analytics",
    ayvlo: true,
    zapier: false,
    dust: true,
    n8n: false,
    anodot: false,
  },
  {
    name: "Real-time Anomaly Detection",
    ayvlo: true,
    zapier: false,
    dust: false,
    n8n: false,
    anodot: true,
  },
  {
    name: "Closed-Loop Automation",
    ayvlo: true,
    zapier: false,
    dust: false,
    n8n: false,
    anodot: false,
  },
];

const companies = [
  { name: "Ayvlo", key: "ayvlo" },
  { name: "Zapier", key: "zapier" },
  { name: "Dust", key: "dust" },
  { name: "n8n", key: "n8n" },
  { name: "Anodot", key: "anodot" },
];

export function FeatureMatrix() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} className="py-32 bg-ash-graphite">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-5xl md:text-6xl mb-6">
            One Tool to <span className="text-electric-taupe">Connect the Dots</span>
          </h2>
          <p className="text-xl text-foreground/70">
            See how Ayvlo compares to alternatives in the market.
          </p>
        </motion.div>

        {/* Desktop Table */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="hidden md:block overflow-x-auto"
        >
          <div className="bg-obsidian-black/50 backdrop-blur-xl border border-cold-steel rounded-2xl overflow-hidden">
            <table className="w-full">
              <thead>
                <tr className="border-b border-cold-steel">
                  <th className="text-left p-6 text-foreground/70 w-1/3">
                    Capabilities
                  </th>
                  {companies.map((company) => (
                    <th
                      key={company.key}
                      className={`p-6 text-center ${
                        company.key === "ayvlo"
                          ? "bg-electric-taupe/10 border-x-2 border-electric-taupe/30"
                          : ""
                      }`}
                    >
                      <div
                        className={
                          company.key === "ayvlo"
                            ? "text-electric-taupe"
                            : "text-foreground/70"
                        }
                      >
                        {company.name}
                      </div>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {features.map((feature, index) => (
                  <motion.tr
                    key={feature.name}
                    initial={{ opacity: 0, x: -20 }}
                    animate={isInView ? { opacity: 1, x: 0 } : {}}
                    transition={{ duration: 0.5, delay: 0.4 + index * 0.1 }}
                    className="border-b border-cold-steel/30 hover:bg-ash-graphite/30 transition-colors"
                  >
                    <td className="p-6 text-foreground/90">{feature.name}</td>
                    {companies.map((company) => (
                      <td
                        key={company.key}
                        className={`p-6 text-center ${
                          company.key === "ayvlo"
                            ? "bg-electric-taupe/5 border-x-2 border-electric-taupe/10"
                            : ""
                        }`}
                      >
                        {feature[company.key as keyof typeof feature] ? (
                          <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ delay: 0.6 + index * 0.1 }}
                          >
                            <Check
                              className={
                                company.key === "ayvlo"
                                  ? "inline-block text-electric-taupe"
                                  : "inline-block text-signal-blue"
                              }
                              size={24}
                            />
                          </motion.div>
                        ) : (
                          <X
                            className="inline-block text-foreground/20"
                            size={24}
                          />
                        )}
                      </td>
                    ))}
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>

        {/* Mobile Cards */}
        <div className="md:hidden space-y-6">
          {features.map((feature, index) => (
            <motion.div
              key={feature.name}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
              className="bg-obsidian-black/50 backdrop-blur-sm border border-cold-steel rounded-xl p-5"
            >
              <h4 className="mb-4 text-lg">{feature.name}</h4>
              <div className="grid grid-cols-2 gap-3 text-sm">
                {companies.map((company) => (
                  <div
                    key={company.key}
                    className={`flex items-center gap-2 ${
                      feature[company.key as keyof typeof feature]
                        ? company.key === "ayvlo"
                          ? "text-electric-taupe"
                          : "text-signal-blue"
                        : "text-foreground/30"
                    }`}
                  >
                    {feature[company.key as keyof typeof feature] ? (
                      <Check size={16} />
                    ) : (
                      <X size={16} />
                    )}
                    <span>{company.name}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Highlight Box */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 1 }}
          className="mt-16 text-center"
        >
          <div className="inline-block bg-electric-taupe/10 border border-electric-taupe/30 rounded-2xl px-8 py-4">
            <p className="text-electric-taupe mono tracking-wider">
              Only Ayvlo delivers the complete loop
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
