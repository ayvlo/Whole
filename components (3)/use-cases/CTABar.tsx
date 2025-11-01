import { motion } from "motion/react";
import { Button } from "../ui/button";
import { Calendar, Mail } from "lucide-react";

export function CTABar() {
  return (
    <section className="py-32 bg-obsidian-black relative overflow-hidden">
      {/* Animated background */}
      <div className="absolute inset-0 opacity-30">
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, 90, 0],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear",
          }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-gradient-to-r from-electric-taupe/20 to-signal-blue/20 rounded-full blur-3xl"
        />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="max-w-4xl mx-auto text-center"
        >
          <h2 className="text-5xl md:text-6xl mb-6">
            See how Ayvlo <br />
            <span className="text-electric-taupe">fits your stack.</span>
          </h2>

          <p className="text-xl text-foreground/70 mb-12">
            Get a personalized walkthrough of how Ayvlo detects, explains, and
            acts on your business metrics.
          </p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="flex flex-col sm:flex-row gap-4 justify-center mb-8"
          >
            <Button className="bg-electric-taupe hover:bg-electric-taupe/90 text-obsidian-black px-8 py-6 text-lg transition-all hover:glow-electric-taupe group">
              <Calendar className="mr-2" size={20} />
              Request Demo
            </Button>

            <Button
              variant="outline"
              className="border-2 border-signal-blue text-signal-blue hover:bg-signal-blue/10 px-8 py-6 text-lg transition-all"
            >
              <Mail className="mr-2" size={20} />
              Join Waitlist
            </Button>
          </motion.div>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="text-sm text-foreground/60"
          >
            Or{" "}
            <a
              href="#"
              className="text-signal-blue hover:text-electric-taupe transition-colors underline"
            >
              explore the architecture
            </a>{" "}
            to see how it works under the hood.
          </motion.p>

          {/* Decorative metrics */}
          <div className="flex justify-center gap-12 mt-16">
            {[
              { label: "<24hr", sublabel: "Time to Value" },
              { label: "3 min", sublabel: "Setup Time" },
              { label: "∞", sublabel: "Scale" },
            ].map((metric, index) => (
              <motion.div
                key={metric.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.6 + index * 0.1 }}
                className="text-center"
              >
                <div className="text-3xl mono text-electric-taupe mb-1">
                  {metric.label}
                </div>
                <div className="text-xs text-foreground/60 mono">
                  {metric.sublabel}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
