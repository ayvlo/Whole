import { motion } from "motion/react";
import { Clock, ArrowRight } from "lucide-react";
import { ImageWithFallback } from "../figma/ImageWithFallback";

const articles = [
  {
    id: 1,
    title: "The Anatomy of a Hidden Metric Failure",
    excerpt:
      "How a 2% churn increase went unnoticed for 3 weeks — and the cost of reactive analytics.",
    image: "https://images.unsplash.com/photo-1666875753105-c63a6f3bdc86?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhbmFseXRpY3MlMjBkYXNoYm9hcmR8ZW58MXx8fHwxNzYxOTI5MDA0fDA&ixlib=rb-4.1.0&q=80&w=1080",
    tag: "Insights",
    readTime: "6 min",
    date: "Oct 28, 2025",
    author: "Abdalla Adam",
  },
  {
    id: 2,
    title: "From Data to Decision in Real Time",
    excerpt:
      "Building causal inference systems that explain 'why' — not just 'what' changed.",
    image: "https://images.unsplash.com/photo-1591696205602-2f950c417cb9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxidXNpbmVzcyUyMGdyb3d0aCUyMGNoYXJ0fGVufDF8fHx8MTc2MjAwNDQ3NXww&ixlib=rb-4.1.0&q=80&w=1080",
    tag: "Engineering",
    readTime: "10 min",
    date: "Oct 25, 2025",
    author: "Engineering Team",
  },
  {
    id: 3,
    title: "Building Autonomous Workflows Without Code",
    excerpt:
      "How Ayvlo's natural language interface turns business logic into executable workflows.",
    image: "https://images.unsplash.com/photo-1565229284535-2cbbe3049123?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb2RlJTIwcHJvZ3JhbW1pbmd8ZW58MXx8fHwxNzYxOTcxMjMyfDA&ixlib=rb-4.1.0&q=80&w=1080",
    tag: "Engineering",
    readTime: "8 min",
    date: "Oct 22, 2025",
    author: "Abdalla Adam",
  },
  {
    id: 4,
    title: "Phase 1 Retrospective: 15 Interviews, 50 Users",
    excerpt:
      "Lessons from customer discovery and why validation beats assumption every time.",
    image: "https://images.unsplash.com/photo-1521737852567-6949f3f9f2b5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzdGFydHVwJTIwdGVhbXxlbnwxfHx8fDE3NjE5OTc2MjJ8MA&ixlib=rb-4.1.0&q=80&w=1080",
    tag: "Founder's Note",
    readTime: "7 min",
    date: "Oct 20, 2025",
    author: "Abdalla Adam",
  },
  {
    id: 5,
    title: "The $50K Hidden in Failed Payments",
    excerpt:
      "A case study on how automated payment recovery workflows increase MRR retention.",
    image: "https://images.unsplash.com/photo-1666875753105-c63a6f3bdc86?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhbmFseXRpY3MlMjBkYXNoYm9hcmR8ZW58MXx8fHwxNzYxOTI5MDA0fDA&ixlib=rb-4.1.0&q=80&w=1080",
    tag: "Insights",
    readTime: "5 min",
    date: "Oct 18, 2025",
    author: "Abdalla Adam",
  },
  {
    id: 6,
    title: "Why We Built Ayvlo: A Founder's Manifesto",
    excerpt:
      "The gap between data and decisions is killing startups. Here's how we're fixing it.",
    image: "https://images.unsplash.com/photo-1521737852567-6949f3f9f2b5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzdGFydHVwJTIwdGVhbXxlbnwxfHx8fDE3NjE5OTc2MjJ8MA&ixlib=rb-4.1.0&q=80&w=1080",
    tag: "Founder's Note",
    readTime: "12 min",
    date: "Oct 15, 2025",
    author: "Abdalla Adam",
  },
];

export function BlogGrid() {
  const getTagColor = (tag: string) => {
    switch (tag) {
      case "Insights":
        return "text-electric-taupe border-electric-taupe/30 bg-electric-taupe/10";
      case "Engineering":
        return "text-signal-blue border-signal-blue/30 bg-signal-blue/10";
      case "Founder's Note":
        return "text-green-400 border-green-400/30 bg-green-400/10";
      default:
        return "text-foreground/60 border-cold-steel/30";
    }
  };

  return (
    <section className="py-32 bg-obsidian-black">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-5xl md:text-6xl mb-6">
            Latest <span className="text-signal-blue">Insights</span>
          </h2>
          <p className="text-xl text-foreground/70">
            Deep dives on autonomous analytics and intelligent automation
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {articles.map((article, index) => (
            <motion.article
              key={article.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ y: -8 }}
              className="group cursor-pointer"
            >
              <div className="bg-ash-graphite/50 backdrop-blur-xl border border-cold-steel/30 rounded-2xl overflow-hidden transition-all duration-300 hover:border-signal-blue/50 hover:shadow-2xl h-full flex flex-col">
                {/* Image */}
                <div className="relative h-48 overflow-hidden">
                  <ImageWithFallback
                    src={article.image}
                    alt={article.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  
                  {/* Tag overlay */}
                  <div className="absolute top-4 left-4">
                    <span
                      className={`px-3 py-1 rounded-full text-xs mono border ${getTagColor(
                        article.tag
                      )}`}
                    >
                      {article.tag}
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6 flex-1 flex flex-col">
                  {/* Meta */}
                  <div className="flex items-center gap-4 mb-3 text-xs text-foreground/60 mono">
                    <div className="flex items-center gap-1">
                      <Clock size={14} />
                      <span>{article.readTime}</span>
                    </div>
                    <span>{article.date}</span>
                  </div>

                  {/* Title */}
                  <h3 className="text-xl mb-3 group-hover:text-signal-blue transition-colors">
                    {article.title}
                  </h3>

                  {/* Excerpt */}
                  <p className="text-sm text-foreground/70 mb-4 leading-relaxed flex-1">
                    {article.excerpt}
                  </p>

                  {/* Footer */}
                  <div className="flex items-center justify-between pt-4 border-t border-cold-steel/30">
                    <span className="text-xs text-foreground/60">
                      By {article.author}
                    </span>
                    <ArrowRight
                      size={16}
                      className="text-signal-blue group-hover:translate-x-1 transition-transform"
                    />
                  </div>
                </div>
              </div>
            </motion.article>
          ))}
        </div>

        {/* Load more */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="text-center mt-12"
        >
          <button className="text-signal-blue hover:text-electric-taupe transition-colors mono underline">
            View All Articles →
          </button>
        </motion.div>
      </div>
    </section>
  );
}
