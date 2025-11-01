import { useEffect, useRef } from "react";
import { motion } from "motion/react";
import { Button } from "../ui/button";

export function AboutHero() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    canvas.width = 400;
    canvas.height = 400;

    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;
    const radius = 120;
    const numPoints = 60;
    let rotation = 0;

    const points: Array<{ angle: number; distance: number; size: number }> = [];

    // Create data points in orbital pattern
    for (let i = 0; i < numPoints; i++) {
      points.push({
        angle: (i / numPoints) * Math.PI * 2,
        distance: radius + Math.random() * 40 - 20,
        size: Math.random() * 3 + 1,
      });
    }

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      rotation += 0.005;

      // Draw connecting lines
      ctx.strokeStyle = "rgba(63, 142, 252, 0.15)";
      ctx.lineWidth = 1;
      points.forEach((point, i) => {
        const x1 = centerX + Math.cos(point.angle + rotation) * point.distance;
        const y1 = centerY + Math.sin(point.angle + rotation) * point.distance;

        const nextPoint = points[(i + 1) % points.length];
        const x2 = centerX + Math.cos(nextPoint.angle + rotation) * nextPoint.distance;
        const y2 = centerY + Math.sin(nextPoint.angle + rotation) * nextPoint.distance;

        ctx.beginPath();
        ctx.moveTo(x1, y1);
        ctx.lineTo(x2, y2);
        ctx.stroke();
      });

      // Draw data points
      points.forEach((point) => {
        const x = centerX + Math.cos(point.angle + rotation) * point.distance;
        const y = centerY + Math.sin(point.angle + rotation) * point.distance;

        ctx.fillStyle = "rgba(198, 166, 120, 0.8)";
        ctx.beginPath();
        ctx.arc(x, y, point.size, 0, Math.PI * 2);
        ctx.fill();
      });

      // Draw Ayvlo "A" in center as data forms
      ctx.fillStyle = `rgba(198, 166, 120, ${Math.min(rotation * 2, 1)})`;
      ctx.font = "bold 72px Inter";
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillText("A", centerX, centerY);

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
              Turning assumptions <br />
              into <span className="text-electric-taupe">evidence.</span>
            </h1>

            <p className="text-xl text-foreground/70 mb-8 leading-relaxed">
              Phase 1 — Foundation & Validation begins with clarity, not code.
            </p>

            <Button className="bg-electric-taupe hover:bg-electric-taupe/90 text-obsidian-black px-8 py-6 text-lg transition-all hover:glow-electric-taupe">
              Read the Founder Manual
            </Button>
          </motion.div>

          {/* Right: Animated Orb */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.3 }}
            className="flex justify-center"
          >
            <div className="relative">
              <canvas
                ref={canvasRef}
                width={400}
                height={400}
                className="w-full max-w-md"
              />
              
              {/* Glow effect */}
              <div className="absolute inset-0 bg-gradient-to-br from-electric-taupe/20 to-signal-blue/20 rounded-full blur-3xl -z-10" />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
