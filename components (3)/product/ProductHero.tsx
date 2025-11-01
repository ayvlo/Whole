import { useEffect, useState } from "react";
import { motion } from "motion/react";
import { TrendingUp, TrendingDown, Activity } from "lucide-react";

interface MetricTile {
  id: number;
  label: string;
  value: number;
  trend: "up" | "down" | "stable";
  status: "normal" | "anomaly" | "corrected";
}

export function ProductHero() {
  const [metrics, setMetrics] = useState<MetricTile[]>([
    { id: 1, label: "Revenue", value: 42500, trend: "down", status: "anomaly" },
    { id: 2, label: "Users", value: 1250, trend: "up", status: "normal" },
    { id: 3, label: "Churn", value: 5.2, trend: "up", status: "anomaly" },
    { id: 4, label: "Conversion", value: 3.8, trend: "stable", status: "normal" },
    { id: 5, label: "MRR", value: 98000, trend: "down", status: "anomaly" },
    { id: 6, label: "NPS", value: 72, trend: "up", status: "normal" },
  ]);

  useEffect(() => {
    const timer = setTimeout(() => {
      // Ayvlo "corrects" anomalies
      setMetrics((prev) =>
        prev.map((metric) =>
          metric.status === "anomaly"
            ? { ...metric, status: "corrected", trend: "up" as const }
            : metric
        )
      );
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  const getStatusColor = (status: string) => {
    switch (status) {
      case "anomaly":
        return "border-red-500/50 bg-red-500/10";
      case "corrected":
        return "border-electric-taupe/50 bg-electric-taupe/10";
      default:
        return "border-cold-steel/30 bg-ash-graphite/30";
    }
  };

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case "up":
        return <TrendingUp size={20} className="text-green-400" />;
      case "down":
        return <TrendingDown size={20} className="text-red-400" />;
      default:
        return <Activity size={20} className="text-signal-blue" />;
    }
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
      <div className="absolute inset-0 bg-gradient-to-b from-obsidian-black via-ash-graphite/50 to-obsidian-black" />

      <div className="container mx-auto px-6 relative z-10">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          {/* Left: Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-6xl md:text-7xl mb-6">
              Beyond Dashboards. <br />
              <span className="text-electric-taupe">Beyond Rules.</span>
            </h1>

            <p className="text-xl md:text-2xl text-foreground/70 mb-8 leading-relaxed">
              Ayvlo continuously monitors your business metrics and acts before
              you ask.
            </p>

            <div className="inline-block bg-signal-blue/10 border border-signal-blue/30 rounded-lg px-6 py-3">
              <p className="text-signal-blue mono text-sm">
                AUTONOMOUS INTELLIGENCE LAYER
              </p>
            </div>
          </motion.div>

          {/* Right: Metric Tiles Animation */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="relative"
          >
            <div className="grid grid-cols-2 gap-4">
              {metrics.map((metric, index) => (
                <motion.div
                  key={metric.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className={`border-2 rounded-xl p-6 backdrop-blur-sm transition-all duration-700 ${getStatusColor(
                    metric.status
                  )}`}
                >
                  <div className="flex items-start justify-between mb-3">
                    <div className="text-sm text-foreground/60 mono">
                      {metric.label}
                    </div>
                    {getTrendIcon(metric.trend)}
                  </div>

                  <div className="text-2xl mb-2">
                    {metric.label === "Churn" || metric.label === "Conversion"
                      ? `${metric.value}%`
                      : metric.value.toLocaleString()}
                  </div>

                  {metric.status === "corrected" && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      className="text-xs text-electric-taupe mono mt-2"
                    >
                      ✓ Corrected by Ayvlo
                    </motion.div>
                  )}

                  {metric.status === "anomaly" && (
                    <motion.div
                      animate={{ opacity: [1, 0.5, 1] }}
                      transition={{ duration: 1, repeat: Infinity }}
                      className="text-xs text-red-400 mono mt-2"
                    >
                      ⚠ Anomaly detected
                    </motion.div>
                  )}
                </motion.div>
              ))}
            </div>

            {/* Ayvlo indicator */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 1.5 }}
              className="mt-6 text-center"
            >
              <div className="inline-flex items-center gap-2 bg-electric-taupe/10 border border-electric-taupe/30 rounded-full px-6 py-3">
                <div className="w-2 h-2 rounded-full bg-electric-taupe animate-pulse" />
                <span className="text-sm mono text-electric-taupe">
                  Ayvlo is monitoring
                </span>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
