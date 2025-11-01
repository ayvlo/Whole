import { useEffect, useRef, useState } from "react";
import { motion } from "motion/react";
import { Play, Music, Video } from "lucide-react";
import { Button } from "../ui/button";
import { ImageWithFallback } from "../figma/ImageWithFallback";

export function PodcastSpotlight() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    canvas.width = 600;
    canvas.height = 100;

    let phase = 0;
    const bars = 60;

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      phase += isHovered ? 0.15 : 0.05;

      const barWidth = canvas.width / bars;
      const centerY = canvas.height / 2;

      for (let i = 0; i < bars; i++) {
        const amplitude = isHovered ? 40 : 20;
        const height =
          Math.abs(Math.sin(i * 0.2 + phase)) * amplitude +
          Math.abs(Math.sin(i * 0.1 + phase * 0.7)) * (amplitude / 2);

        const gradient = ctx.createLinearGradient(
          0,
          centerY - height / 2,
          0,
          centerY + height / 2
        );
        gradient.addColorStop(0, "rgba(198, 166, 120, 0.8)");
        gradient.addColorStop(0.5, "rgba(63, 142, 252, 0.6)");
        gradient.addColorStop(1, "rgba(198, 166, 120, 0.8)");

        ctx.fillStyle = gradient;
        ctx.fillRect(
          i * barWidth,
          centerY - height / 2,
          barWidth - 2,
          height
        );
      }

      requestAnimationFrame(animate);
    };

    animate();
  }, [isHovered]);

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
            The Ayvlo <span className="text-electric-taupe">Sessions</span>
          </h2>
          <p className="text-xl text-foreground/70">
            In-depth conversations on building the future of business intelligence
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="max-w-5xl mx-auto"
        >
          <div className="grid md:grid-cols-2 gap-8 items-center bg-obsidian-black/80 backdrop-blur-xl border border-cold-steel/30 rounded-3xl p-8 md:p-12">
            {/* Left: Cover Image */}
            <div
              className="relative group cursor-pointer"
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
            >
              <div className="relative rounded-2xl overflow-hidden aspect-square">
                <ImageWithFallback
                  src="https://images.unsplash.com/photo-1485579149621-3123dd979885?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwb2RjYXN0JTIwbWljcm9waG9uZXxlbnwxfHx8fDE3NjE5ODYzNzV8MA&ixlib=rb-4.1.0&q=80&w=1080"
                  alt="Podcast cover"
                  className="w-full h-full object-cover"
                />

                {/* Play button overlay */}
                <motion.div
                  initial={{ opacity: 0 }}
                  whileHover={{ opacity: 1 }}
                  className="absolute inset-0 bg-obsidian-black/60 flex items-center justify-center transition-opacity"
                >
                  <motion.div
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    className="w-20 h-20 rounded-full bg-electric-taupe flex items-center justify-center cursor-pointer"
                  >
                    <Play size={32} className="text-obsidian-black ml-1" />
                  </motion.div>
                </motion.div>
              </div>

              {/* Waveform animation */}
              <div className="mt-6">
                <canvas
                  ref={canvasRef}
                  width={600}
                  height={100}
                  className="w-full"
                />
              </div>
            </div>

            {/* Right: Episode Info */}
            <div>
              <div className="inline-block bg-electric-taupe/20 border border-electric-taupe/30 rounded-full px-4 py-2 mb-6">
                <span className="text-electric-taupe mono text-sm">
                  EPISODE 01
                </span>
              </div>

              <h3 className="text-4xl mb-4">
                Inside Phase 1 — <br />
                <span className="text-signal-blue">
                  Building Autonomous Intelligence
                </span>
              </h3>

              <p className="text-lg text-foreground/70 mb-6 leading-relaxed">
                Join founder Abdalla Adam as he shares the journey from idea to
                validation: 15 customer interviews, 50+ early users, and the
                lessons learned building Ayvlo's autonomous intelligence layer.
              </p>

              {/* Meta info */}
              <div className="flex items-center gap-6 mb-8 text-sm text-foreground/60 mono">
                <span>42 min</span>
                <span>•</span>
                <span>Nov 1, 2025</span>
              </div>

              {/* Topics */}
              <div className="flex flex-wrap gap-2 mb-8">
                {[
                  "Customer Discovery",
                  "MVP Strategy",
                  "AI Agents",
                  "Phase 1 Validation",
                ].map((topic) => (
                  <span
                    key={topic}
                    className="px-3 py-1 rounded-full border border-cold-steel/30 text-xs text-foreground/70"
                  >
                    {topic}
                  </span>
                ))}
              </div>

              {/* Listen buttons */}
              <div className="flex flex-col sm:flex-row gap-4">
                <Button className="bg-green-500 hover:bg-green-600 text-white px-6 py-6 transition-all group">
                  <Music className="mr-2" size={20} />
                  Listen on Spotify
                </Button>

                <Button
                  variant="outline"
                  className="border-2 border-red-500 text-red-500 hover:bg-red-500/10 px-6 py-6 transition-all"
                >
                  <Video className="mr-2" size={20} />
                  Watch on YouTube
                </Button>
              </div>
            </div>
          </div>

          {/* Episode list preview */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="mt-8 text-center"
          >
            <a
              href="#"
              className="text-signal-blue hover:text-electric-taupe transition-colors mono underline"
            >
              Browse All Episodes →
            </a>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
