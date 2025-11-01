import { useEffect, useRef } from "react";
import { motion } from "motion/react";

export function ValidationBanner() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    canvas.width = 800;
    canvas.height = 200;

    const dataPoints = [
      { x: 0, y: 150 },
      { x: 100, y: 140 },
      { x: 200, y: 120 },
      { x: 300, y: 90 },
      { x: 400, y: 70 },
      { x: 500, y: 50 },
      { x: 600, y: 40 },
      { x: 700, y: 30 },
      { x: 800, y: 25 },
    ];

    let progress = 0;

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Draw grid lines
      ctx.strokeStyle = "rgba(86, 90, 102, 0.1)";
      ctx.lineWidth = 1;
      for (let i = 0; i < 5; i++) {
        const y = (canvas.height / 4) * i;
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(canvas.width, y);
        ctx.stroke();
      }

      // Animate line drawing
      if (progress < dataPoints.length - 1) {
        progress += 0.05;
      }

      // Draw line
      const gradient = ctx.createLinearGradient(0, 0, canvas.width, 0);
      gradient.addColorStop(0, "rgba(198, 166, 120, 0.5)");
      gradient.addColorStop(1, "rgba(63, 142, 252, 0.8)");

      ctx.strokeStyle = gradient;
      ctx.lineWidth = 3;
      ctx.lineCap = "round";
      ctx.lineJoin = "round";

      ctx.beginPath();
      for (let i = 0; i <= Math.floor(progress); i++) {
        const point = dataPoints[i];
        if (i === 0) {
          ctx.moveTo(point.x, point.y);
        } else {
          ctx.lineTo(point.x, point.y);
        }
      }

      // Handle fractional progress
      if (progress < dataPoints.length - 1) {
        const currentIndex = Math.floor(progress);
        const nextIndex = currentIndex + 1;
        const fraction = progress - currentIndex;
        const current = dataPoints[currentIndex];
        const next = dataPoints[nextIndex];

        const interpolatedX = current.x + (next.x - current.x) * fraction;
        const interpolatedY = current.y + (next.y - current.y) * fraction;

        ctx.lineTo(interpolatedX, interpolatedY);
      }

      ctx.stroke();

      // Draw area under curve
      ctx.lineTo(dataPoints[Math.min(Math.floor(progress), dataPoints.length - 1)].x, canvas.height);
      ctx.lineTo(0, canvas.height);
      ctx.closePath();

      const areaGradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
      areaGradient.addColorStop(0, "rgba(198, 166, 120, 0.2)");
      areaGradient.addColorStop(1, "rgba(198, 166, 120, 0)");
      ctx.fillStyle = areaGradient;
      ctx.fill();

      // Draw points
      for (let i = 0; i <= Math.floor(progress); i++) {
        const point = dataPoints[i];
        ctx.fillStyle = "#C6A678";
        ctx.beginPath();
        ctx.arc(point.x, point.y, 4, 0, Math.PI * 2);
        ctx.fill();
      }

      requestAnimationFrame(animate);
    };

    animate();
  }, []);

  return (
    <section className="py-32 bg-ash-graphite relative overflow-hidden">
      {/* Background accent */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-electric-taupe/5 to-transparent" />

      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="max-w-5xl mx-auto"
        >
          {/* Headline */}
          <div className="text-center mb-12">
            <h2 className="text-5xl md:text-6xl mb-6">
              Validated by <span className="text-electric-taupe">Real Traction</span>
            </h2>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            {[
              { number: "15", label: "Founders Interviewed", color: "#C6A678" },
              { number: "50+", label: "Early Users", color: "#3F8EFC" },
              { number: "3", label: "Core Use Cases", color: "#C6A678" },
            ].map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="text-center"
              >
                <div className="bg-obsidian-black/50 backdrop-blur-xl border border-cold-steel/30 rounded-2xl p-8">
                  <div
                    className="text-6xl mono mb-3"
                    style={{ color: stat.color }}
                  >
                    {stat.number}
                  </div>
                  <div className="text-lg text-foreground/80">{stat.label}</div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Chart */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="bg-obsidian-black/80 backdrop-blur-xl border border-cold-steel/30 rounded-2xl p-8"
          >
            <div className="flex justify-between items-center mb-6">
              <div>
                <h4 className="text-xl mb-2">Time to First Value</h4>
                <p className="text-sm text-foreground/60 mono">
                  Continuous improvement toward &lt; 24hr TTFV
                </p>
              </div>
              <div className="text-right">
                <div className="text-3xl text-electric-taupe mono">
                  &lt; 24hrs
                </div>
                <div className="text-xs text-foreground/60">TARGET</div>
              </div>
            </div>

            <canvas
              ref={canvasRef}
              width={800}
              height={200}
              className="w-full"
            />

            <div className="flex justify-between mt-4 text-xs text-foreground/50 mono">
              <span>WEEK 1</span>
              <span>WEEK 8</span>
            </div>
          </motion.div>

          {/* Quote */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="text-center mt-12"
          >
            <p className="text-lg text-foreground/70 italic">
              "Every number tells a story of validation, not assumption."
            </p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
