import { motion, useInView } from "motion/react";
import { useRef } from "react";

const pressItems = [
  { name: "TechCrunch", status: "Coming Soon" },
  { name: "Product Hunt", status: "Coming Soon" },
  { name: "Y Combinator", status: "Coming Soon" },
  { name: "Forbes", status: "Coming Soon" },
  { name: "The Information", status: "Coming Soon" },
];

export function PressRecognition() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section
      ref={ref}
      className="py-24 bg-obsidian-black relative overflow-hidden"
    >
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl mb-4">
            Press & <span className="text-electric-taupe">Recognition</span>
          </h2>
          <p className="text-foreground/60 mono text-sm tracking-wider">
            Building in public, earning validation through results
          </p>
        </motion.div>

        {/* Horizontal press strip */}
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-5 gap-6">
            {pressItems.map((item, index) => (
              <motion.div
                key={item.name}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ y: -5, scale: 1.05 }}
                className="group"
              >
                <div className="bg-ash-graphite/30 backdrop-blur-xl border border-cold-steel/20 rounded-2xl p-8 text-center hover:border-electric-taupe/40 transition-all duration-300">
                  {/* Placeholder logo */}
                  <div className="text-4xl mb-3 grayscale opacity-40 group-hover:opacity-70 transition-opacity mono">
                    {item.name.charAt(0)}
                  </div>

                  <div className="text-sm text-foreground/50 group-hover:text-electric-taupe/70 transition-colors">
                    {item.name}
                  </div>

                  <div className="text-xs text-foreground/30 mono mt-2">
                    {item.status}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Featured podcast or media */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="max-w-4xl mx-auto mt-16 text-center"
        >
          <div className="bg-gradient-to-r from-transparent via-electric-taupe/10 to-transparent py-8 px-6 rounded-2xl">
            <div className="mono text-xs text-electric-taupe mb-2 tracking-wider">
              FEATURED
            </div>
            <p className="text-lg text-foreground/70">
              Listen to the <span className="text-signal-blue">Ayvlo Sessions</span> podcast
              for in-depth conversations on building the future of business intelligence.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
