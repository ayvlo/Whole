import { motion, useInView } from "motion/react";
import { useRef, useState } from "react";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "../ui/hover-card";

const terms = [
  {
    term: "AI Agent",
    definition:
      "An autonomous system that perceives its environment, makes decisions, and takes actions to achieve specific goals without human intervention.",
    category: "Core Concept",
  },
  {
    term: "ABIA",
    definition:
      "Autonomous Business Intelligence Agent — Ayvlo's proprietary system that monitors, analyzes, and acts on business data continuously.",
    category: "Ayvlo Technology",
  },
  {
    term: "TTFV",
    definition:
      "Time To First Value — The duration from user signup to receiving their first actionable insight. Ayvlo targets less than 24 hours.",
    category: "Metric",
  },
  {
    term: "Causal Inference",
    definition:
      "Statistical methods to determine cause-and-effect relationships in data, beyond correlation. Essential for understanding why metrics changed.",
    category: "Core Concept",
  },
  {
    term: "Anomaly Detection",
    definition:
      "Machine learning technique to identify patterns in data that deviate from expected behavior, flagging potential issues automatically.",
    category: "Core Concept",
  },
  {
    term: "Closed-Loop Automation",
    definition:
      "A system that detects issues, analyzes root causes, decides on actions, executes them, and monitors outcomes — all without human intervention.",
    category: "Ayvlo Technology",
  },
];

export function GlossaryHighlights() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [hoveredTerm, setHoveredTerm] = useState<string | null>(null);

  return (
    <section ref={ref} className="py-32 bg-obsidian-black">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-5xl md:text-6xl mb-6">
            Key <span className="text-signal-blue">Concepts</span>
          </h2>
          <p className="text-xl text-foreground/70">
            Hover over terms to learn more about Ayvlo's architecture
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {terms.map((item, index) => (
            <motion.div
              key={item.term}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <HoverCard openDelay={200}>
                <HoverCardTrigger asChild>
                  <motion.div
                    onMouseEnter={() => setHoveredTerm(item.term)}
                    onMouseLeave={() => setHoveredTerm(null)}
                    whileHover={{ y: -4 }}
                    className={`bg-ash-graphite/50 backdrop-blur-sm border-2 rounded-xl p-6 cursor-pointer transition-all duration-300 ${
                      hoveredTerm === item.term
                        ? "border-signal-blue glow-signal-blue"
                        : "border-cold-steel/30"
                    }`}
                  >
                    <div className="mb-3">
                      <span className="text-xs text-foreground/50 mono tracking-wider">
                        {item.category}
                      </span>
                    </div>
                    <h4 className="text-xl mb-2 text-signal-blue">
                      {item.term}
                    </h4>
                    <p className="text-sm text-foreground/60 line-clamp-2">
                      {item.definition}
                    </p>
                  </motion.div>
                </HoverCardTrigger>
                <HoverCardContent
                  className="w-80 bg-obsidian-black/95 backdrop-blur-xl border-signal-blue/50"
                  side="top"
                >
                  <div className="space-y-3">
                    <div>
                      <span className="text-xs text-signal-blue mono tracking-wider">
                        {item.category}
                      </span>
                    </div>
                    <h4 className="text-lg">{item.term}</h4>
                    <p className="text-sm text-foreground/80 leading-relaxed">
                      {item.definition}
                    </p>
                  </div>
                </HoverCardContent>
              </HoverCard>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
