import { useEffect, useState } from "react";
import { motion } from "motion/react";

const terminalCommands = [
  "$ ayvlo init",
  "  ✓ Creating project...",
  "  ✓ Setting up authentication...",
  "$ ayvlo connect --source stripe",
  "  ✓ Connected to Stripe",
  "  ✓ Syncing metrics...",
  "$ ayvlo alerts --channel slack",
  "  ✓ Slack integration enabled",
  "  ✓ Ayvlo is now monitoring your metrics",
  "",
  "🚀 Ready to detect anomalies!",
];

export function DocsHero() {
  const [displayedLines, setDisplayedLines] = useState<string[]>([]);
  const [currentLine, setCurrentLine] = useState(0);

  useEffect(() => {
    if (currentLine < terminalCommands.length) {
      const timeout = setTimeout(() => {
        setDisplayedLines((prev) => [...prev, terminalCommands[currentLine]]);
        setCurrentLine((prev) => prev + 1);
      }, 400);

      return () => clearTimeout(timeout);
    }
  }, [currentLine]);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
      <div className="absolute inset-0 bg-gradient-to-b from-obsidian-black via-ash-graphite/30 to-obsidian-black" />

      <div className="container mx-auto px-6 relative z-10">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          {/* Left: Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="inline-block bg-signal-blue/10 border border-signal-blue/30 rounded-lg px-4 py-2 mb-6">
              <span className="text-signal-blue mono text-sm">DEVELOPER DOCS</span>
            </div>

            <h1 className="text-6xl md:text-7xl mb-6">
              Plug Ayvlo into <br />
              <span className="text-electric-taupe">your stack.</span>
            </h1>

            <p className="text-xl md:text-2xl text-foreground/70 mb-8 leading-relaxed">
              Access real-time anomaly streams, natural-language analytics, and
              autonomous workflow triggers through our REST and GraphQL APIs.
            </p>

            <div className="space-y-3">
              {[
                "RESTful API & GraphQL endpoints",
                "Webhook-based event streaming",
                "Native integrations (Slack, HubSpot, Stripe)",
                "Python, Node.js, and Go SDKs",
              ].map((feature, index) => (
                <motion.div
                  key={feature}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 0.5 + index * 0.1 }}
                  className="flex items-center gap-3"
                >
                  <div className="w-2 h-2 rounded-full bg-electric-taupe" />
                  <span className="text-foreground/80">{feature}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Right: Animated Terminal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <div className="bg-obsidian-black border-2 border-cold-steel/50 rounded-xl overflow-hidden shadow-2xl">
              {/* Terminal header */}
              <div className="bg-ash-graphite border-b border-cold-steel/50 px-4 py-3 flex items-center gap-2">
                <div className="flex gap-2">
                  <div className="w-3 h-3 rounded-full bg-red-500/80" />
                  <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
                  <div className="w-3 h-3 rounded-full bg-green-500/80" />
                </div>
                <div className="text-xs text-foreground/60 ml-4 mono">
                  terminal — ayvlo-setup
                </div>
              </div>

              {/* Terminal content */}
              <div className="p-6 font-mono text-sm min-h-[400px]">
                {displayedLines.map((line, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.2 }}
                    className={`mb-2 ${
                      line.startsWith("$")
                        ? "text-electric-taupe"
                        : line.includes("✓")
                        ? "text-green-400"
                        : line.includes("🚀")
                        ? "text-signal-blue"
                        : "text-foreground/60"
                    }`}
                  >
                    {line}
                    {index === displayedLines.length - 1 &&
                      currentLine < terminalCommands.length && (
                        <motion.span
                          animate={{ opacity: [1, 0, 1] }}
                          transition={{
                            duration: 0.8,
                            repeat: Infinity,
                          }}
                          className="inline-block w-2 h-4 bg-electric-taupe ml-1"
                        />
                      )}
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
