import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { TrendingUp, Users, DollarSign, Activity, MessageSquare, Zap } from "lucide-react";

const personas = [
  {
    id: "founder",
    label: "SaaS Founder / COO",
    icon: TrendingUp,
    problem: "Revenue visibility + churn alerts",
    steps: [
      {
        stage: "Detect",
        icon: Activity,
        title: "MRR drops 12% overnight",
        description: "Ayvlo's anomaly engine flags the deviation instantly",
        color: "#C6A678",
      },
      {
        stage: "Explain",
        icon: MessageSquare,
        title: "Root cause identified",
        description: "Causal analysis reveals 3 enterprise customers churned",
        color: "#3F8EFC",
      },
      {
        stage: "Act",
        icon: Zap,
        title: "Automated response launched",
        description: "Slack alert sent to CEO + Account managers notified",
        color: "#C6A678",
      },
    ],
  },
  {
    id: "growth",
    label: "Growth Lead",
    icon: Users,
    problem: "Campaign ROI + channel diagnosis",
    steps: [
      {
        stage: "Detect",
        icon: Activity,
        title: "Paid ads CAC spikes 40%",
        description: "Real-time monitoring catches cost increase",
        color: "#C6A678",
      },
      {
        stage: "Explain",
        icon: MessageSquare,
        title: "Channel breakdown surfaced",
        description: "Facebook ads CPM doubled; Google stable",
        color: "#3F8EFC",
      },
      {
        stage: "Act",
        icon: Zap,
        title: "Budget reallocation triggered",
        description: "Automated pause on FB + increase Google spend",
        color: "#C6A678",
      },
    ],
  },
  {
    id: "revops",
    label: "RevOps",
    icon: DollarSign,
    problem: "Payment failures + pipeline automation",
    steps: [
      {
        stage: "Detect",
        icon: Activity,
        title: "18 failed payments in 24hrs",
        description: "Payment anomaly detected via Stripe integration",
        color: "#C6A678",
      },
      {
        stage: "Explain",
        icon: MessageSquare,
        title: "Pattern analysis complete",
        description: "All failures from expired cards on annual plans",
        color: "#3F8EFC",
      },
      {
        stage: "Act",
        icon: Zap,
        title: "Recovery workflow activated",
        description: "Email sequence sent + CRM updated + Slack alert",
        color: "#C6A678",
      },
    ],
  },
];

export function PersonaTabs() {
  const [activeTab, setActiveTab] = useState("founder");

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
            Built for <span className="text-signal-blue">Your Role</span>
          </h2>
          <p className="text-xl text-foreground/70">
            See how Ayvlo solves problems specific to your team
          </p>
        </motion.div>

        <Tabs
          value={activeTab}
          onValueChange={setActiveTab}
          className="max-w-6xl mx-auto"
        >
          <TabsList className="grid w-full grid-cols-1 md:grid-cols-3 mb-12 bg-obsidian-black/50 p-2">
            {personas.map((persona) => (
              <TabsTrigger
                key={persona.id}
                value={persona.id}
                className="data-[state=active]:bg-electric-taupe data-[state=active]:text-obsidian-black transition-all duration-300"
              >
                <persona.icon size={20} className="mr-2" />
                {persona.label}
              </TabsTrigger>
            ))}
          </TabsList>

          <AnimatePresence mode="wait">
            {personas.map((persona) => (
              <TabsContent key={persona.id} value={persona.id}>
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.4 }}
                >
                  {/* Problem statement */}
                  <div className="text-center mb-12">
                    <div className="inline-block bg-obsidian-black/50 border border-cold-steel/30 rounded-xl px-6 py-3">
                      <p className="text-lg text-foreground/80">
                        <span className="text-electric-taupe mono text-sm mr-2">
                          CHALLENGE:
                        </span>
                        {persona.problem}
                      </p>
                    </div>
                  </div>

                  {/* 3-step workflow */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {persona.steps.map((step, index) => (
                      <motion.div
                        key={step.stage}
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: index * 0.2 }}
                        className="relative"
                      >
                        <div
                          className="bg-obsidian-black/80 backdrop-blur-xl border-2 rounded-2xl p-8 h-full"
                          style={{
                            borderColor: `${step.color}50`,
                            boxShadow: `0 0 30px ${step.color}20`,
                          }}
                        >
                          {/* Stage indicator */}
                          <div className="flex items-center gap-3 mb-6">
                            <div
                              className="w-12 h-12 rounded-lg flex items-center justify-center"
                              style={{ backgroundColor: `${step.color}20` }}
                            >
                              <step.icon size={24} style={{ color: step.color }} />
                            </div>
                            <div>
                              <div
                                className="text-xs mono tracking-wider mb-1"
                                style={{ color: step.color }}
                              >
                                STEP {index + 1}
                              </div>
                              <div className="text-sm">{step.stage}</div>
                            </div>
                          </div>

                          {/* Content */}
                          <h4 className="text-xl mb-3">{step.title}</h4>
                          <p className="text-foreground/70 leading-relaxed">
                            {step.description}
                          </p>
                        </div>

                        {/* Arrow connector (desktop only) */}
                        {index < persona.steps.length - 1 && (
                          <div className="hidden md:block absolute top-1/2 -right-4 transform -translate-y-1/2 z-10">
                            <div className="w-8 h-8 rounded-full bg-signal-blue flex items-center justify-center">
                              <svg
                                width="16"
                                height="16"
                                viewBox="0 0 16 16"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  d="M6 3L11 8L6 13"
                                  stroke="#0E0E11"
                                  strokeWidth="2"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                />
                              </svg>
                            </div>
                          </div>
                        )}
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              </TabsContent>
            ))}
          </AnimatePresence>
        </Tabs>
      </div>
    </section>
  );
}
