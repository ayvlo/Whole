import { motion } from "motion/react";
import { useState } from "react";
import { Lock, Database, MessageSquare, Webhook } from "lucide-react";

const tiles = [
  {
    icon: Lock,
    title: "Authentication & OAuth",
    description: "Secure access with OAuth 2.0 for Slack, HubSpot, and Stripe integrations.",
    color: "#C6A678",
    codeSnippet: "curl -X POST https://api.ayvlo.com/auth/oauth",
  },
  {
    icon: Database,
    title: "Data Streams",
    description: "Connect your metrics via API keys and start streaming real-time data.",
    color: "#3F8EFC",
    codeSnippet: "ayvlo connect --source stripe --api-key YOUR_KEY",
  },
  {
    icon: MessageSquare,
    title: "AI Queries",
    description: "Ask questions in natural language and get SQL-powered insights instantly.",
    color: "#C6A678",
    codeSnippet: 'POST /api/v1/query { "question": "Why did MRR drop?" }',
  },
  {
    icon: Webhook,
    title: "Webhook Triggers",
    description: "Set up autonomous action hooks to respond to anomalies automatically.",
    color: "#3F8EFC",
    codeSnippet: "POST /api/v1/webhooks { \"event\": \"anomaly.detected\" }",
  },
];

export function QuickStartTiles() {
  const [hoveredTile, setHoveredTile] = useState<number | null>(null);

  return (
    <section className="py-32 bg-ash-graphite">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-5xl md:text-6xl mb-6">
            Quick <span className="text-signal-blue">Start</span>
          </h2>
          <p className="text-xl text-foreground/70">
            Get up and running with Ayvlo in minutes
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
          {tiles.map((tile, index) => (
            <motion.div
              key={tile.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              onMouseEnter={() => setHoveredTile(index)}
              onMouseLeave={() => setHoveredTile(null)}
              className="group"
            >
              <motion.div
                animate={{
                  y: hoveredTile === index ? -8 : 0,
                  boxShadow:
                    hoveredTile === index
                      ? `0 12px 40px ${tile.color}40`
                      : "0 0 0 transparent",
                }}
                transition={{ duration: 0.3 }}
                className="bg-obsidian-black/80 backdrop-blur-xl border-2 border-cold-steel/30 rounded-2xl p-6 h-full cursor-pointer"
                style={{
                  borderColor:
                    hoveredTile === index ? `${tile.color}80` : undefined,
                }}
              >
                {/* Icon */}
                <div
                  className="w-16 h-16 rounded-xl mb-6 flex items-center justify-center transition-all duration-300"
                  style={{
                    backgroundColor: `${tile.color}20`,
                    transform:
                      hoveredTile === index ? "rotate(-5deg) scale(1.1)" : "none",
                  }}
                >
                  <tile.icon size={32} style={{ color: tile.color }} />
                </div>

                {/* Content */}
                <h3 className="text-xl mb-3">{tile.title}</h3>
                <p className="text-sm text-foreground/70 mb-4 leading-relaxed">
                  {tile.description}
                </p>

                {/* Code snippet preview */}
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{
                    opacity: hoveredTile === index ? 1 : 0,
                    height: hoveredTile === index ? "auto" : 0,
                  }}
                  transition={{ duration: 0.3 }}
                  className="overflow-hidden"
                >
                  <div className="bg-ash-graphite/50 border border-cold-steel/30 rounded-lg p-3 mt-2">
                    <code className="text-xs text-electric-taupe font-mono">
                      {tile.codeSnippet}
                    </code>
                  </div>
                </motion.div>

                {/* Arrow indicator */}
                <motion.div
                  animate={{
                    x: hoveredTile === index ? 4 : 0,
                    opacity: hoveredTile === index ? 1 : 0.5,
                  }}
                  className="flex items-center gap-2 mt-4 text-sm"
                  style={{ color: tile.color }}
                >
                  <span className="mono">Learn more</span>
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 16 16"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M6 3L11 8L6 13"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </motion.div>
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
