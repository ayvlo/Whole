import { motion } from "motion/react";
import { ImageWithFallback } from "../figma/ImageWithFallback";

export function FounderHero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-obsidian-black pt-24">
      {/* Matrix-line animation background */}
      <div className="absolute inset-0 opacity-20">
        <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern
              id="matrix-lines"
              width="100"
              height="100"
              patternUnits="userSpaceOnUse"
            >
              <motion.line
                x1="0"
                y1="0"
                x2="100"
                y2="100"
                stroke="url(#gradient)"
                strokeWidth="0.5"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
              />
              <motion.line
                x1="100"
                y1="0"
                x2="0"
                y2="100"
                stroke="url(#gradient)"
                strokeWidth="0.5"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "linear",
                  delay: 1,
                }}
              />
            </pattern>
            <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#C6A678" stopOpacity="0.3" />
              <stop offset="50%" stopColor="#3F8EFC" stopOpacity="0.5" />
              <stop offset="100%" stopColor="#C6A678" stopOpacity="0.3" />
            </linearGradient>
          </defs>
          <rect width="100%" height="100%" fill="url(#matrix-lines)" />
        </svg>
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="grid md:grid-cols-2 gap-12 items-center max-w-7xl mx-auto">
          {/* Left: Text Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <motion.h1
              className="text-6xl md:text-7xl mb-6 tracking-tight"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              Vision is earned
              <br />
              <span className="text-electric-taupe">through clarity.</span>
            </motion.h1>

            <motion.p
              className="text-xl md:text-2xl text-foreground/70 leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              Ayvlo began as a simple question:{" "}
              <span className="text-signal-blue italic">
                What if data could explain itself?
              </span>
            </motion.p>
          </motion.div>

          {/* Right: Founder Portrait */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="relative"
          >
            <div className="relative rounded-3xl overflow-hidden aspect-[3/4] group">
              {/* Taupe gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-br from-electric-taupe/30 via-transparent to-signal-blue/20 z-10 group-hover:opacity-70 transition-opacity duration-500" />

              {/* Portrait Image */}
              <ImageWithFallback
                src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjBwb3J0cmFpdHxlbnwxfHx8fDE3NjE5ODYzNzV8MA&ixlib=rb-4.1.0&q=80&w=1080"
                alt="Abdalla Adam - Founder of Ayvlo"
                className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700"
              />

              {/* Border glow effect */}
              <div className="absolute inset-0 rounded-3xl border-2 border-electric-taupe/50 group-hover:border-signal-blue/50 transition-colors duration-500 z-20" />
            </div>

            {/* Floating name tag */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
              className="absolute -bottom-6 -right-6 bg-ash-graphite/90 backdrop-blur-xl border border-cold-steel/30 rounded-2xl px-6 py-4"
            >
              <div className="mono text-sm text-electric-taupe mb-1">
                FOUNDER & CEO
              </div>
              <div className="text-2xl">Abdalla Adam</div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
