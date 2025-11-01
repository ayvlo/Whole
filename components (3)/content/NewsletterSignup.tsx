import { useState } from "react";
import { motion } from "motion/react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Mail, Check } from "lucide-react";

export function NewsletterSignup() {
  const [email, setEmail] = useState("");
  const [isSubscribed, setIsSubscribed] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubscribed(true);
    setTimeout(() => {
      setEmail("");
      setIsSubscribed(false);
    }, 3000);
  };

  return (
    <section className="py-32 bg-obsidian-black relative overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 opacity-20">
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, 180, 0],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear",
          }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-r from-electric-taupe/30 to-signal-blue/30 rounded-full blur-3xl"
        />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="max-w-3xl mx-auto"
        >
          <div className="bg-gradient-to-br from-ash-graphite to-obsidian-black border-2 border-electric-taupe/30 rounded-3xl p-12 md:p-16 text-center">
            {/* Icon */}
            <motion.div
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, type: "spring" }}
              className="w-20 h-20 rounded-full bg-electric-taupe/20 border border-electric-taupe/30 flex items-center justify-center mx-auto mb-8"
            >
              <Mail size={36} className="text-electric-taupe" />
            </motion.div>

            {/* Heading */}
            <h2 className="text-4xl md:text-5xl mb-6">
              Stay in the <span className="text-electric-taupe">Signal</span>
            </h2>

            <p className="text-xl text-foreground/70 mb-8 max-w-2xl mx-auto leading-relaxed">
              Weekly insights on autonomous analytics, early access features, and
              the evolution of AI-driven business intelligence.
            </p>

            {/* Form */}
            <form onSubmit={handleSubmit} className="max-w-md mx-auto mb-6">
              <div className="flex flex-col sm:flex-row gap-3">
                <Input
                  type="email"
                  placeholder="your@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="flex-1 bg-obsidian-black border-cold-steel/50 focus:border-electric-taupe h-12 px-6 text-base"
                />
                <Button
                  type="submit"
                  disabled={isSubscribed}
                  className="bg-electric-taupe hover:bg-electric-taupe/90 text-obsidian-black px-8 h-12 transition-all hover:glow-electric-taupe"
                >
                  {isSubscribed ? (
                    <>
                      <Check size={20} className="mr-2" />
                      Subscribed!
                    </>
                  ) : (
                    "Subscribe"
                  )}
                </Button>
              </div>
            </form>

            {/* Subtext */}
            <p className="text-sm text-foreground/60 mono">
              No spam, just signal. Unsubscribe anytime.
            </p>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-8 mt-12 pt-12 border-t border-cold-steel/30">
              {[
                { value: "2K+", label: "Subscribers" },
                { value: "Weekly", label: "Frequency" },
                { value: "5 min", label: "Read Time" },
              ].map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="text-center"
                >
                  <div className="text-3xl mono text-signal-blue mb-2">
                    {stat.value}
                  </div>
                  <div className="text-xs text-foreground/60 mono">
                    {stat.label}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
