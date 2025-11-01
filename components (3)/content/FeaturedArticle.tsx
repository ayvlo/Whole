import { motion } from "motion/react";
import { Button } from "../ui/button";
import { ArrowRight, Clock } from "lucide-react";
import { ImageWithFallback } from "../figma/ImageWithFallback";

export function FeaturedArticle() {
  return (
    <section className="py-32 bg-ash-graphite">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="max-w-6xl mx-auto"
        >
          <div className="relative rounded-3xl overflow-hidden group cursor-pointer">
            {/* Image with gradient overlay */}
            <div className="relative h-[500px] md:h-[600px]">
              <ImageWithFallback
                src="https://images.unsplash.com/photo-1760978632014-f799595497af?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkYXRhJTIwdmlzdWFsaXphdGlvbiUyMGRhcmt8ZW58MXx8fHwxNzYyMDE2NzMyfDA&ixlib=rb-4.1.0&q=80&w=1080"
                alt="Featured article"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />

              {/* Gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-obsidian-black via-obsidian-black/70 to-transparent" />
            </div>

            {/* Content overlay */}
            <div className="absolute inset-0 flex items-end p-8 md:p-12">
              <div className="max-w-3xl">
                {/* Tag */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5 }}
                  className="inline-block mb-4"
                >
                  <span className="bg-electric-taupe/20 border border-electric-taupe/30 text-electric-taupe px-4 py-2 rounded-full text-sm mono">
                    FEATURED INSIGHT
                  </span>
                </motion.div>

                {/* Title */}
                <motion.h2
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.1 }}
                  className="text-4xl md:text-6xl mb-4"
                >
                  Why Dashboards Are Dead — <br />
                  The Rise of{" "}
                  <span className="text-electric-taupe">
                    Proactive Intelligence
                  </span>
                </motion.h2>

                {/* Meta info */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  className="flex items-center gap-6 mb-6 text-foreground/70"
                >
                  <div className="flex items-center gap-2">
                    <Clock size={16} />
                    <span className="text-sm">8 min read</span>
                  </div>
                  <div className="text-sm">
                    <span className="mono">Nov 1, 2025</span>
                  </div>
                  <div className="text-sm">
                    By <span className="text-signal-blue">Abdalla Adam</span>
                  </div>
                </motion.div>

                {/* Description */}
                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                  className="text-lg text-foreground/80 mb-8 max-w-2xl leading-relaxed"
                >
                  The era of reactive analytics is over. Discover why autonomous
                  intelligence systems are replacing traditional dashboards —
                  and what it means for the future of data-driven decision making.
                </motion.p>

                {/* CTA */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.4 }}
                >
                  <Button className="bg-electric-taupe hover:bg-electric-taupe/90 text-obsidian-black px-8 py-6 text-lg transition-all hover:glow-electric-taupe group">
                    Read Insight
                    <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" size={20} />
                  </Button>
                </motion.div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
