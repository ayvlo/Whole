import { motion, useInView } from "motion/react";
import { useRef } from "react";
import { Laptop, BookOpen, Users, TrendingUp } from "lucide-react";

const benefits = [
  {
    icon: Laptop,
    title: "Remote Work",
    description: "Work from anywhere. We care about output, not location.",
  },
  {
    icon: BookOpen,
    title: "Learning Stipends",
    description: "Books, courses, conferences — invest in your growth.",
  },
  {
    icon: Users,
    title: "Founder Mentorship",
    description: "Direct access to leadership and hands-on learning.",
  },
  {
    icon: TrendingUp,
    title: "Equity Options",
    description: "Own a piece of what we're building together.",
  },
];

export function BenefitsBar() {
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
          className="text-center mb-12"
        >
          <h2 className="text-4xl mb-4">
            What We <span className="text-electric-taupe">Offer</span>
          </h2>
        </motion.div>

        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-6">
          {benefits.map((benefit, index) => (
            <motion.div
              key={benefit.title}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ y: -5 }}
              className="group"
            >
              <div className="bg-obsidian-black/50 backdrop-blur-xl border border-cold-steel/30 rounded-2xl p-6 h-full hover:border-electric-taupe/50 transition-all duration-300 text-center">
                {/* Icon */}
                <div className="w-16 h-16 rounded-2xl bg-electric-taupe/20 border border-electric-taupe/30 flex items-center justify-center mx-auto mb-4 group-hover:bg-signal-blue/20 group-hover:border-signal-blue/30 transition-all duration-300">
                  <benefit.icon
                    size={28}
                    className="text-electric-taupe group-hover:text-signal-blue transition-colors duration-300"
                  />
                </div>

                {/* Title */}
                <h3 className="text-xl mb-2 group-hover:text-electric-taupe transition-colors">
                  {benefit.title}
                </h3>

                {/* Description */}
                <p className="text-sm text-foreground/60 leading-relaxed">
                  {benefit.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
