import { useState } from "react";
import { motion, useInView } from "motion/react";
import { useRef } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { ArrowRight } from "lucide-react";
import { toast } from "sonner@2.0.3";

export function WaitlistCTA() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [email, setEmail] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      toast.success("Thanks for joining! We'll be in touch soon.", {
        description: `Confirmation sent to ${email}`,
      });
      setEmail("");
    }
  };

  return (
    <section ref={ref} className="py-32 relative overflow-hidden">
      {/* Animated gradient background */}
      <div className="absolute inset-0 animated-gradient" />
      
      {/* Motion blur lines */}
      <div className="absolute inset-0 opacity-20">
        {[...Array(5)].map((_, i) => (
          <motion.div
            key={i}
            animate={{
              x: ["-100%", "100%"],
            }}
            transition={{
              duration: 8 + i * 2,
              repeat: Infinity,
              ease: "linear",
              delay: i * 0.5,
            }}
            className="absolute h-px bg-gradient-to-r from-transparent via-electric-taupe to-transparent"
            style={{
              top: `${20 + i * 15}%`,
              width: "200%",
            }}
          />
        ))}
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="max-w-4xl mx-auto text-center"
        >
          <h2 className="text-5xl md:text-7xl mb-6">
            Help Shape the Future of <br />
            <span className="text-electric-taupe">Autonomous Business Intelligence</span>
          </h2>

          <p className="text-xl text-foreground/70 mb-12 max-w-2xl mx-auto">
            Join early adopters who are redefining how businesses detect, understand, 
            and act on critical changes.
          </p>

          {/* Waitlist form */}
          <motion.form
            onSubmit={handleSubmit}
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="flex flex-col sm:flex-row gap-4 max-w-2xl mx-auto"
          >
            <Input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="flex-1 bg-ash-graphite border-cold-steel text-foreground px-6 py-6 text-lg rounded-lg focus:ring-2 focus:ring-signal-blue"
            />
            <Button
              type="submit"
              className="bg-electric-taupe hover:bg-electric-taupe/90 text-obsidian-black px-8 py-6 text-lg transition-all hover:glow-electric-taupe group"
            >
              Join Early Access
              <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" size={20} />
            </Button>
          </motion.form>

          {/* Trust indicators */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="mt-8 flex flex-wrap justify-center gap-6 text-sm text-foreground/50"
          >
            <span>✓ Early access pricing</span>
            <span>✓ Founding member benefits</span>
            <span>✓ Direct founder support</span>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
