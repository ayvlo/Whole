import { useEffect, useRef } from "react";
import { motion } from "motion/react";
import { Slack, Database, BarChart3, ArrowRight } from "lucide-react";

const tools = [
  { icon: Slack, position: { x: 100, y: 150 }, color: "#C6A678" },
  { icon: Database, position: { x: 300, y: 100 }, color: "#3F8EFC" },
  { icon: BarChart3, position: { x: 500, y: 150 }, color: "#C6A678" },
];

export function UseCasesHero() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    canvas.width = 600;
    canvas.height = 300;

    let pulsePhase = 0;

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      pulsePhase += 0.02;

      // Draw data points
      const points = 30;
      for (let i = 0; i < points; i++) {
        const x = (canvas.width / points) * i;
        const y = 150 + Math.sin(i * 0.5 + pulsePhase) * 20;
        
        ctx.fillStyle = `rgba(198, 166, 120, ${0.3 + Math.sin(i * 0.3 + pulsePhase) * 0.3})`;
        ctx.beginPath();
        ctx.arc(x, y, 3, 0, Math.PI * 2);
        ctx.fill();

        // Connect to next point
        if (i < points - 1) {
          const nextX = (canvas.width / points) * (i + 1);
          const nextY = 150 + Math.sin((i + 1) * 0.5 + pulsePhase) * 20;
          
          ctx.strokeStyle = "rgba(63, 142, 252, 0.2)";
          ctx.lineWidth = 1;
          ctx.beginPath();
          ctx.moveTo(x, y);
          ctx.lineTo(nextX, nextY);
          ctx.stroke();
        }
      }

      requestAnimationFrame(animate);
    };

    animate();
  }, []);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
      <div className="absolute inset-0 bg-gradient-to-b from-obsidian-black via-ash-graphite/30 to-obsidian-black" />

      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-5xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-6xl md:text-7xl mb-6">
              From anomalies to action — <br />
              <span className="text-electric-taupe">instantly.</span>
            </h1>

            <p className="text-xl md:text-2xl text-foreground/70 mb-12 max-w-3xl mx-auto leading-relaxed">
              Explore how Ayvlo detects what changed, explains why, and
              automates what comes next for your team.
            </p>
          </motion.div>

          {/* Animated data flow */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="mb-16"
          >
            <canvas
              ref={canvasRef}
              width={600}
              height={300}
              className="w-full max-w-3xl mx-auto"
            />
          </motion.div>

          {/* Tool icons */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="flex justify-center items-center gap-8"
          >
            {[
              { icon: Slack, label: "Slack" },
              { icon: Database, label: "HubSpot" },
              { icon: BarChart3, label: "Analytics" },
            ].map((tool, index) => (
              <div key={tool.label} className="flex items-center gap-8">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 0.5, delay: 0.7 + index * 0.1 }}
                  className="w-16 h-16 rounded-xl bg-ash-graphite/50 border border-cold-steel/30 flex items-center justify-center backdrop-blur-sm hover:border-electric-taupe/50 transition-all duration-300"
                >
                  <tool.icon size={28} className="text-signal-blue" />
                </motion.div>
                {index < 2 && (
                  <ArrowRight className="text-cold-steel" size={20} />
                )}
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
