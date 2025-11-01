import { motion } from "motion/react";
import { Button } from "../ui/button";
import { Key, Github, BookOpen } from "lucide-react";

export function DeveloperCTA() {
  return (
    <section className="py-32 bg-ash-graphite relative overflow-hidden">
      {/* Background grid */}
      <div className="absolute inset-0 opacity-5">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              "linear-gradient(rgba(248, 248, 248, 0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(248, 248, 248, 0.1) 1px, transparent 1px)",
            backgroundSize: "40px 40px",
          }}
        />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="max-w-5xl mx-auto"
        >
          {/* Main CTA */}
          <div className="bg-gradient-to-br from-obsidian-black to-ash-graphite border-2 border-electric-taupe/30 rounded-3xl p-12 md:p-16 text-center relative overflow-hidden">
            {/* Decorative glow */}
            <div className="absolute inset-0 bg-gradient-to-br from-electric-taupe/10 to-signal-blue/10 rounded-3xl blur-xl" />

            <div className="relative z-10">
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
              >
                <h2 className="text-5xl md:text-6xl mb-6">
                  Ready to build <br />
                  <span className="text-electric-taupe">
                    autonomous workflows?
                  </span>
                </h2>

                <p className="text-xl text-foreground/70 mb-12 max-w-2xl mx-auto">
                  Get API access and start integrating Ayvlo's intelligence layer
                  into your stack today.
                </p>

                <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
                  <Button className="bg-electric-taupe hover:bg-electric-taupe/90 text-obsidian-black px-8 py-6 text-lg transition-all hover:glow-electric-taupe group">
                    <Key className="mr-2" size={20} />
                    Get API Key
                  </Button>

                  <Button
                    variant="outline"
                    className="border-2 border-signal-blue text-signal-blue hover:bg-signal-blue/10 px-8 py-6 text-lg transition-all group"
                  >
                    <Github className="mr-2" size={20} />
                    View on GitHub
                  </Button>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-8 border-t border-cold-steel/30">
                  {[
                    { value: "99.9%", label: "API Uptime" },
                    { value: "< 100ms", label: "Avg Response" },
                    { value: "24/7", label: "Support" },
                  ].map((stat, index) => (
                    <motion.div
                      key={stat.label}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
                      className="text-center"
                    >
                      <div className="text-4xl mono text-signal-blue mb-2">
                        {stat.value}
                      </div>
                      <div className="text-sm text-foreground/60 mono">
                        {stat.label}
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </div>
          </div>

          {/* Additional resources */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8"
          >
            {[
              {
                icon: BookOpen,
                title: "Full Documentation",
                description: "Comprehensive guides and API reference",
                link: "#",
              },
              {
                icon: Github,
                title: "Sample Projects",
                description: "Real-world implementation examples",
                link: "#",
              },
              {
                icon: Key,
                title: "SDK Libraries",
                description: "Python, Node.js, and Go clients",
                link: "#",
              },
            ].map((resource, index) => (
              <motion.a
                key={resource.title}
                href={resource.link}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.5 + index * 0.1 }}
                whileHover={{ y: -4 }}
                className="bg-obsidian-black/50 border border-cold-steel/30 rounded-xl p-6 hover:border-signal-blue/50 transition-all group cursor-pointer"
              >
                <resource.icon
                  size={28}
                  className="text-signal-blue mb-4 group-hover:scale-110 transition-transform"
                />
                <h4 className="text-lg mb-2">{resource.title}</h4>
                <p className="text-sm text-foreground/60">
                  {resource.description}
                </p>
              </motion.a>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
