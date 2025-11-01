import { motion, useInView } from "motion/react";
import { useRef } from "react";
import { ArrowRight, AlertCircle, CheckCircle2 } from "lucide-react";

const cases = [
  {
    title: "Revenue Anomaly Detection",
    before: {
      title: "Before Ayvlo",
      description: "Revenue drops 15% overnight. Team discovers it 3 days later in weekly meeting.",
      icon: AlertCircle,
      color: "text-red-400",
    },
    after: {
      title: "After Ayvlo",
      description: "Anomaly detected in real-time. Slack alert sent immediately with root cause analysis.",
      icon: CheckCircle2,
      color: "text-electric-taupe",
    },
  },
  {
    title: "Churn Spike Investigation",
    before: {
      title: "Before Ayvlo",
      description: "Churn jumps to 8%. Analyst spends 6 hours running queries to find the cause.",
      icon: AlertCircle,
      color: "text-red-400",
    },
    after: {
      title: "After Ayvlo",
      description: "Ask 'Why did churn spike yesterday?' Get causal explanation in 2 seconds.",
      icon: CheckCircle2,
      color: "text-electric-taupe",
    },
  },
  {
    title: "Failed Payment Recovery",
    before: {
      title: "Before Ayvlo",
      description: "12 failed payments go unnoticed. Manual follow-up takes days. Lost MRR.",
      icon: AlertCircle,
      color: "text-red-400",
    },
    after: {
      title: "After Ayvlo",
      description: "Failed payments detected and recovered automatically. CRM updated. Zero manual work.",
      icon: CheckCircle2,
      color: "text-electric-taupe",
    },
  },
];

export function BeforeAfterScroller() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} className="py-32 bg-obsidian-black relative overflow-hidden">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <h2 className="text-5xl md:text-6xl mb-6">
            See the <span className="text-signal-blue">Difference</span>
          </h2>
          <p className="text-xl text-foreground/70">
            Real problems. Real solutions. Real impact.
          </p>
        </motion.div>

        <div className="space-y-16 max-w-6xl mx-auto">
          {cases.map((useCase, index) => (
            <motion.div
              key={useCase.title}
              initial={{ opacity: 0, y: 50 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: index * 0.2 }}
            >
              {/* Title */}
              <h3 className="text-2xl md:text-3xl mb-8 text-center text-electric-taupe mono tracking-wider">
                {useCase.title}
              </h3>

              {/* Before/After Cards */}
              <div className="grid md:grid-cols-2 gap-8">
                {/* Before */}
                <div className="bg-ash-graphite/30 backdrop-blur-sm border-2 border-red-500/30 rounded-2xl p-8 relative">
                  <div className="flex items-center gap-3 mb-4">
                    <useCase.before.icon
                      className={useCase.before.color}
                      size={28}
                    />
                    <h4 className="text-xl">{useCase.before.title}</h4>
                  </div>
                  <p className="text-foreground/70 leading-relaxed">
                    {useCase.before.description}
                  </p>
                  
                  {/* Corner accent */}
                  <div className="absolute top-0 left-0 w-16 h-16 border-t-2 border-l-2 border-red-500/50 rounded-tl-2xl" />
                </div>

                {/* Arrow */}
                <div className="hidden md:flex absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-10">
                  <div className="w-12 h-12 rounded-full bg-signal-blue flex items-center justify-center">
                    <ArrowRight className="text-obsidian-black" size={24} />
                  </div>
                </div>

                {/* After */}
                <div className="bg-ash-graphite/30 backdrop-blur-sm border-2 border-electric-taupe/30 rounded-2xl p-8 relative glow-electric-taupe">
                  <div className="flex items-center gap-3 mb-4">
                    <useCase.after.icon
                      className={useCase.after.color}
                      size={28}
                    />
                    <h4 className="text-xl">{useCase.after.title}</h4>
                  </div>
                  <p className="text-foreground/70 leading-relaxed">
                    {useCase.after.description}
                  </p>
                  
                  {/* Corner accent */}
                  <div className="absolute bottom-0 right-0 w-16 h-16 border-b-2 border-r-2 border-electric-taupe/50 rounded-br-2xl" />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
