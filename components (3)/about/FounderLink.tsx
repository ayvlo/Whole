import { motion, useInView } from "motion/react";
import { useRef } from "react";
import { Button } from "../ui/button";
import { ArrowRight, User } from "lucide-react";

interface FounderLinkProps {
  onNavigate?: (page: string) => void;
}

export function FounderLink({ onNavigate }: FounderLinkProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section
      ref={ref}
      className="py-24 bg-ash-graphite relative overflow-hidden"
    >
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="max-w-4xl mx-auto"
        >
          <div className="bg-gradient-to-br from-electric-taupe/10 via-transparent to-signal-blue/10 backdrop-blur-xl border border-electric-taupe/30 rounded-3xl p-12 text-center relative overflow-hidden">
            {/* Background accent */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(198,166,120,0.1)_0%,transparent_50%)]" />

            <motion.div
              initial={{ scale: 0 }}
              animate={isInView ? { scale: 1 } : {}}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="w-20 h-20 mx-auto mb-6 rounded-full bg-electric-taupe/20 border-2 border-electric-taupe/30 flex items-center justify-center"
            >
              <User size={36} className="text-electric-taupe" />
            </motion.div>

            <h3 className="text-4xl mb-4">
              Meet the <span className="text-electric-taupe">Founder</span>
            </h3>

            <p className="text-lg text-foreground/70 mb-8 max-w-2xl mx-auto leading-relaxed">
              Learn about the vision, principles, and journey behind Ayvlo
              from founder Abdalla Adam.
            </p>

            <Button
              onClick={() => {
                if (onNavigate) {
                  onNavigate("founder");
                  window.scrollTo({ top: 0, behavior: "smooth" });
                }
              }}
              className="bg-electric-taupe hover:bg-electric-taupe/90 text-obsidian-black px-8 py-6 text-lg group"
            >
              Read the Story
              <ArrowRight
                size={20}
                className="ml-2 group-hover:translate-x-1 transition-transform"
              />
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
