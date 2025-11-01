import { useEffect, useRef } from "react";
import { motion } from "motion/react";

export function ArchitectureHero() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    canvas.width = 600;
    canvas.height = 600;

    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;

    const nodes = [
      { label: "Metrics", x: centerX, y: 100, connections: [1] },
      { label: "AI Engine", x: centerX - 150, y: 250, connections: [2] },
      { label: "Causal", x: centerX + 150, y: 250, connections: [3] },
      { label: "NL Interface", x: centerX, y: 400, connections: [4] },
      { label: "Workflows", x: centerX, y: 550, connections: [] },
    ];

    let rotation = 0;

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      rotation += 0.002;

      // Draw connections
      nodes.forEach((node, i) => {
        node.connections.forEach((targetIdx) => {
          const target = nodes[targetIdx];
          
          // Animated gradient line
          const gradient = ctx.createLinearGradient(
            node.x,
            node.y,
            target.x,
            target.y
          );
          gradient.addColorStop(0, "rgba(63, 142, 252, 0.5)");
          gradient.addColorStop(0.5, "rgba(198, 166, 120, 0.8)");
          gradient.addColorStop(1, "rgba(63, 142, 252, 0.5)");

          ctx.strokeStyle = gradient;
          ctx.lineWidth = 2;
          ctx.beginPath();
          ctx.moveTo(node.x, node.y);
          ctx.lineTo(target.x, target.y);
          ctx.stroke();

          // Animated pulse along line
          const pulseProgress = (Math.sin(rotation * 5 + i) + 1) / 2;
          const pulseX = node.x + (target.x - node.x) * pulseProgress;
          const pulseY = node.y + (target.y - node.y) * pulseProgress;

          ctx.fillStyle = "rgba(198, 166, 120, 0.8)";
          ctx.beginPath();
          ctx.arc(pulseX, pulseY, 4, 0, Math.PI * 2);
          ctx.fill();
        });
      });

      // Draw nodes
      nodes.forEach((node, i) => {
        const scale = 1 + Math.sin(rotation * 3 + i) * 0.05;

        // Node circle
        ctx.fillStyle = "rgba(30, 31, 35, 0.9)";
        ctx.strokeStyle = "rgba(198, 166, 120, 0.8)";
        ctx.lineWidth = 3;
        ctx.beginPath();
        ctx.arc(node.x, node.y, 40 * scale, 0, Math.PI * 2);
        ctx.fill();
        ctx.stroke();

        // Inner glow
        const gradient = ctx.createRadialGradient(
          node.x,
          node.y,
          0,
          node.x,
          node.y,
          40 * scale
        );
        gradient.addColorStop(0, "rgba(198, 166, 120, 0.3)");
        gradient.addColorStop(1, "transparent");
        ctx.fillStyle = gradient;
        ctx.fill();

        // Label
        ctx.fillStyle = "#F8F8F8";
        ctx.font = "12px Inter";
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillText(node.label, node.x, node.y);
      });

      requestAnimationFrame(animate);
    };

    animate();
  }, []);

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
            <h1 className="text-6xl md:text-7xl mb-6">
              Intelligence that <br />
              runs <span className="text-electric-taupe">autonomously.</span>
            </h1>

            <p className="text-xl md:text-2xl text-foreground/70 mb-8 leading-relaxed">
              Ayvlo integrates with your stack, listens to signals, and acts
              in context.
            </p>

            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 rounded-full bg-signal-blue" />
                <span className="text-foreground/80">
                  Connects to your data sources
                </span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 rounded-full bg-electric-taupe" />
                <span className="text-foreground/80">
                  Detects and explains anomalies
                </span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 rounded-full bg-signal-blue" />
                <span className="text-foreground/80">
                  Takes autonomous action
                </span>
              </div>
            </div>
          </motion.div>

          {/* Right: 3D Network Diagram */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.3 }}
            className="flex justify-center"
          >
            <div className="relative">
              <canvas
                ref={canvasRef}
                width={600}
                height={600}
                className="w-full max-w-lg"
              />

              {/* Glow effect */}
              <div className="absolute inset-0 bg-gradient-to-br from-signal-blue/20 to-electric-taupe/20 rounded-full blur-3xl -z-10" />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
