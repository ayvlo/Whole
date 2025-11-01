import { motion, useInView } from "motion/react";
import { useRef, useState } from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { CheckCircle2, Share2, Copy } from "lucide-react";
import { toast } from "sonner@2.0.3";

export function BetaSignupForm() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [step, setStep] = useState<"form" | "confirmation" | "referral">("form");
  const [formData, setFormData] = useState({
    name: "",
    company: "",
    role: "",
    email: "",
    primaryTool: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate form submission
    setTimeout(() => {
      setStep("confirmation");
      toast.success("You're on the waitlist!");
    }, 500);
  };

  const handleCopyReferralLink = () => {
    navigator.clipboard.writeText("https://ayvlo.com/waitlist?ref=user123");
    toast.success("Referral link copied!");
  };

  return (
    <section
      ref={ref}
      className="py-24 bg-ash-graphite relative overflow-hidden"
    >
      <div className="container mx-auto px-6">
        <div className="max-w-3xl mx-auto">
          {step === "form" && (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8 }}
            >
              <div className="bg-obsidian-black/80 backdrop-blur-xl border border-cold-steel/30 rounded-3xl p-8 md:p-12">
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Name */}
                  <div>
                    <Label htmlFor="name" className="text-foreground/80 mb-2 block">
                      Full Name
                    </Label>
                    <Input
                      id="name"
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) =>
                        setFormData({ ...formData, name: e.target.value })
                      }
                      className="bg-ash-graphite/50 border-cold-steel/30 focus:border-electric-taupe transition-colors"
                      placeholder="Abdalla Adam"
                    />
                  </div>

                  {/* Company */}
                  <div>
                    <Label htmlFor="company" className="text-foreground/80 mb-2 block">
                      Company
                    </Label>
                    <Input
                      id="company"
                      type="text"
                      required
                      value={formData.company}
                      onChange={(e) =>
                        setFormData({ ...formData, company: e.target.value })
                      }
                      className="bg-ash-graphite/50 border-cold-steel/30 focus:border-electric-taupe transition-colors"
                      placeholder="Acme Inc."
                    />
                  </div>

                  {/* Role */}
                  <div>
                    <Label htmlFor="role" className="text-foreground/80 mb-2 block">
                      Role
                    </Label>
                    <Input
                      id="role"
                      type="text"
                      required
                      value={formData.role}
                      onChange={(e) =>
                        setFormData({ ...formData, role: e.target.value })
                      }
                      className="bg-ash-graphite/50 border-cold-steel/30 focus:border-electric-taupe transition-colors"
                      placeholder="Product Manager"
                    />
                  </div>

                  {/* Email */}
                  <div>
                    <Label htmlFor="email" className="text-foreground/80 mb-2 block">
                      Work Email
                    </Label>
                    <Input
                      id="email"
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) =>
                        setFormData({ ...formData, email: e.target.value })
                      }
                      className="bg-ash-graphite/50 border-cold-steel/30 focus:border-electric-taupe transition-colors"
                      placeholder="you@company.com"
                    />
                  </div>

                  {/* Primary Tool */}
                  <div>
                    <Label className="text-foreground/80 mb-2 block">
                      Primary Analytics Tool
                    </Label>
                    <Select
                      value={formData.primaryTool}
                      onValueChange={(value) =>
                        setFormData({ ...formData, primaryTool: value })
                      }
                    >
                      <SelectTrigger className="bg-ash-graphite/50 border-cold-steel/30 focus:border-electric-taupe">
                        <SelectValue placeholder="Select your tool" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="stripe">Stripe</SelectItem>
                        <SelectItem value="hubspot">HubSpot</SelectItem>
                        <SelectItem value="salesforce">Salesforce</SelectItem>
                        <SelectItem value="mixpanel">Mixpanel</SelectItem>
                        <SelectItem value="amplitude">Amplitude</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Submit Button */}
                  <Button
                    type="submit"
                    className="w-full bg-electric-taupe hover:bg-electric-taupe/90 text-obsidian-black py-6 text-lg"
                  >
                    Join Waitlist
                  </Button>

                  <p className="text-xs text-foreground/50 text-center mono">
                    By joining, you agree to receive updates about Ayvlo. No spam, ever.
                  </p>
                </form>
              </div>
            </motion.div>
          )}

          {step === "confirmation" && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
            >
              <div className="bg-obsidian-black/80 backdrop-blur-xl border-2 border-electric-taupe/50 rounded-3xl p-12 text-center">
                {/* Checkmark animation */}
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  className="mb-8"
                >
                  <div className="w-24 h-24 mx-auto rounded-full bg-gradient-to-br from-electric-taupe to-signal-blue flex items-center justify-center">
                    <CheckCircle2 size={48} className="text-obsidian-black" />
                  </div>
                </motion.div>

                <h2 className="text-4xl mb-4">
                  You're on the <span className="text-electric-taupe">list</span>!
                </h2>

                <p className="text-lg text-foreground/70 mb-8">
                  We'll notify you as soon as Phase 2 Beta opens.
                  <br />
                  Check your inbox for a confirmation email.
                </p>

                <Button
                  onClick={() => setStep("referral")}
                  variant="outline"
                  className="border-2 border-signal-blue text-signal-blue hover:bg-signal-blue/10 px-6 py-6"
                >
                  Get Priority Access
                </Button>

                <div className="mt-8 pt-8 border-t border-cold-steel/30">
                  <p className="text-sm text-foreground/60">
                    Want to stay updated?{" "}
                    <a
                      href="#"
                      className="text-signal-blue hover:text-electric-taupe transition-colors underline"
                    >
                      Follow @Ayvlo
                    </a>
                  </p>
                </div>
              </div>
            </motion.div>
          )}

          {step === "referral" && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
            >
              <div className="bg-obsidian-black/80 backdrop-blur-xl border border-cold-steel/30 rounded-3xl p-12">
                <h2 className="text-4xl mb-4 text-center">
                  Earn <span className="text-electric-taupe">Priority Access</span>
                </h2>

                <p className="text-lg text-foreground/70 mb-8 text-center">
                  Invite colleagues to move up the waitlist. Each referral gets you
                  closer to beta access.
                </p>

                {/* Referral link */}
                <div className="bg-ash-graphite/50 border border-cold-steel/30 rounded-2xl p-4 flex items-center gap-4 mb-6">
                  <code className="flex-1 text-sm text-electric-taupe mono overflow-x-auto">
                    https://ayvlo.com/waitlist?ref=user123
                  </code>
                  <Button
                    onClick={handleCopyReferralLink}
                    variant="outline"
                    size="sm"
                    className="border-electric-taupe/30 hover:bg-electric-taupe/10"
                  >
                    <Copy size={16} className="mr-2" />
                    Copy
                  </Button>
                </div>

                {/* Share buttons */}
                <div className="flex gap-4">
                  <Button
                    variant="outline"
                    className="flex-1 border-signal-blue/30 hover:bg-signal-blue/10"
                  >
                    <Share2 size={16} className="mr-2" />
                    Share on X
                  </Button>
                  <Button
                    variant="outline"
                    className="flex-1 border-signal-blue/30 hover:bg-signal-blue/10"
                  >
                    <Share2 size={16} className="mr-2" />
                    Share on LinkedIn
                  </Button>
                </div>

                {/* Stats */}
                <div className="mt-8 pt-8 border-t border-cold-steel/30 text-center">
                  <div className="text-3xl text-electric-taupe mono mb-2">0 / 3</div>
                  <div className="text-sm text-foreground/60">
                    Referrals needed for priority access
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </section>
  );
}
