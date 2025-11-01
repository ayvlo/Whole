import { motion, useInView } from "motion/react";
import { useRef, useState } from "react";
import { ArrowRight, MapPin, Clock } from "lucide-react";
import { Button } from "../ui/button";

const roles = [
  {
    title: "Frontend Engineer",
    type: "Full-Time",
    location: "Remote",
    description:
      "Build the interface layer for autonomous intelligence. Work with React, TypeScript, and modern web technologies.",
    skills: ["React", "TypeScript", "Tailwind CSS", "Motion"],
  },
  {
    title: "AI Engineer",
    type: "Full-Time",
    location: "Remote / Hybrid",
    description:
      "Design and implement autonomous agents that detect patterns, explain insights, and take action.",
    skills: ["Python", "LLMs", "RAG", "Vector DBs"],
  },
  {
    title: "Backend Engineer",
    type: "Full-Time",
    location: "Remote",
    description:
      "Build scalable infrastructure for real-time data processing and autonomous decision-making systems.",
    skills: ["Node.js", "PostgreSQL", "Redis", "Kafka"],
  },
  {
    title: "Growth Ops Intern",
    type: "Internship",
    location: "Remote",
    description:
      "Help drive early growth through content, community, and customer development. Learn from zero to one.",
    skills: ["Writing", "Community", "Analytics", "Hustle"],
  },
  {
    title: "Product Designer",
    type: "Full-Time / Contract",
    location: "Remote",
    description:
      "Craft intuitive experiences for complex data systems. Make autonomous intelligence feel magical.",
    skills: ["Figma", "Prototyping", "Systems Thinking", "UX Research"],
  },
];

export function OpenRoles() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <section
      ref={ref}
      className="py-32 bg-ash-graphite relative overflow-hidden"
    >
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-5xl md:text-6xl mb-4">
            Open <span className="text-electric-taupe">Roles</span>
          </h2>
          <p className="text-xl text-foreground/60 mono tracking-wider">
            Build the future of autonomous analytics
          </p>
        </motion.div>

        <div className="max-w-6xl mx-auto space-y-6">
          {roles.map((role, index) => (
            <motion.div
              key={role.title}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              onHoverStart={() => setHoveredIndex(index)}
              onHoverEnd={() => setHoveredIndex(null)}
              className="group"
            >
              <div className="bg-obsidian-black/80 backdrop-blur-xl border border-cold-steel/30 rounded-3xl p-8 hover:border-electric-taupe/50 transition-all duration-300 relative overflow-hidden">
                {/* Glow effect on hover */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: hoveredIndex === index ? 1 : 0 }}
                  transition={{ duration: 0.3 }}
                  className="absolute inset-0 bg-gradient-to-r from-electric-taupe/5 via-signal-blue/5 to-electric-taupe/5 pointer-events-none"
                />

                <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
                  {/* Left: Role info */}
                  <div className="flex-1">
                    <div className="flex items-center gap-4 mb-3">
                      <h3 className="text-3xl group-hover:text-electric-taupe transition-colors">
                        {role.title}
                      </h3>
                      <div className="flex items-center gap-3 text-sm text-foreground/60">
                        <div className="flex items-center gap-1">
                          <Clock size={14} />
                          <span>{role.type}</span>
                        </div>
                        <span>•</span>
                        <div className="flex items-center gap-1">
                          <MapPin size={14} />
                          <span>{role.location}</span>
                        </div>
                      </div>
                    </div>

                    <p className="text-foreground/70 mb-4 leading-relaxed">
                      {role.description}
                    </p>

                    {/* Skills */}
                    <div className="flex flex-wrap gap-2">
                      {role.skills.map((skill) => (
                        <span
                          key={skill}
                          className="px-3 py-1 rounded-full bg-electric-taupe/10 border border-electric-taupe/20 text-xs text-foreground/70 mono"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Right: Apply button */}
                  <motion.div
                    initial={{ x: -20, opacity: 0 }}
                    animate={{
                      x: hoveredIndex === index ? 0 : -20,
                      opacity: hoveredIndex === index ? 1 : 0,
                    }}
                    transition={{ duration: 0.3 }}
                  >
                    <Button className="bg-electric-taupe hover:bg-electric-taupe/90 text-obsidian-black px-6 py-6 whitespace-nowrap group/btn">
                      Apply Now
                      <ArrowRight
                        size={18}
                        className="ml-2 group-hover/btn:translate-x-1 transition-transform"
                      />
                    </Button>
                  </motion.div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* No perfect fit CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="text-center mt-12"
        >
          <p className="text-foreground/60 mb-4">
            Don't see the perfect fit?{" "}
            <a
              href="mailto:careers@ayvlo.com"
              className="text-signal-blue hover:text-electric-taupe transition-colors underline"
            >
              Tell us what you'd bring to the table.
            </a>
          </p>
        </motion.div>
      </div>
    </section>
  );
}
