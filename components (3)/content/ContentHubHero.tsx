import { useEffect, useRef } from "react";
import { motion } from "motion/react";

export function ContentHubHero() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    canvas.width = 800;
    canvas.height = 100;

    let amplitude = 20;
    let frequency = 0.02;
    let phase = 0;

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      phase += 0.05;

      // Draw soundwave
      ctx.beginPath();
      ctx.strokeStyle = "rgba(198, 166, 120, 0.6)";
      ctx.lineWidth = 2;

      for (let x = 0; x < canvas.width; x++) {
        const y =
          canvas.height / 2 +
          Math.sin(x * frequency + phase) * amplitude +
          Math.sin(x * frequency * 2 + phase * 1.5) * (amplitude / 2);

        if (x === 0) {
          ctx.moveTo(x, y);
        } else {
          ctx.lineTo(x, y);
        }
      }

      ctx.stroke();

      // Draw second wave (harmony)
      ctx.beginPath();
      ctx.strokeStyle = "rgba(63, 142, 252, 0.4)";
      ctx.lineWidth = 1.5;

      for (let x = 0; x < canvas.width; x++) {
        const y =
          canvas.height / 2 +
          Math.sin(x * frequency * 1.5 + phase * 0.8) * (amplitude * 0.7);

        if (x === 0) {
          ctx.moveTo(x, y);
        } else {
          ctx.lineTo(x, y);
        }
      }

      ctx.stroke();

      requestAnimationFrame(animate);
    };

    animate();
  }, []);

  return (
    <section className="relative min-h-[80vh] flex items-center justify-center overflow-hidden pt-20">
      <div className="absolute inset-0 bg-gradient-to-b from-obsidian-black via-ash-graphite/30 to-obsidian-black" />

      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-4xl mx-auto text-center"
        >
          <h1 className="text-6xl md:text-7xl mb-6">
            Less Noise. More Vision — <br />
            <span className="text-electric-taupe">The Ayvlo Journal.</span>
          </h1>

          <p className="text-xl md:text-2xl text-foreground/70 mb-12 leading-relaxed">
            Insights on autonomous analytics, growth ops, and the future of
            data-driven teams.
          </p>

          {/* Animated soundwave */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="mb-8"
          >
            <canvas
              ref={canvasRef}
              width={800}
              height={100}
              className="w-full max-w-2xl mx-auto"
            />
          </motion.div>

          {/* Topic filters */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="flex flex-wrap justify-center gap-3"
          >
            {["All", "Insights", "Engineering", "Founder's Notes", "Podcast"].map(
              (topic) => (
                <button
                  key={topic}
                  className={`px-4 py-2 rounded-full border transition-all mono text-sm ${
                    topic === "All"
                      ? "bg-electric-taupe text-obsidian-black border-electric-taupe"
                      : "border-cold-steel/30 text-foreground/70 hover:border-signal-blue/50 hover:text-signal-blue"
                  }`}
                >
                  {topic}
                </button>
              )
            )}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
