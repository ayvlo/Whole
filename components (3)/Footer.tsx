import { motion } from "motion/react";
import { Twitter, Linkedin, Youtube } from "lucide-react";

interface FooterProps {
  onNavigate?: (page: string) => void;
}

export function Footer({ onNavigate }: FooterProps) {
  const currentYear = new Date().getFullYear();

  const handleNavClick = (page: string) => {
    if (onNavigate) {
      onNavigate(page);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <footer className="bg-obsidian-black border-t border-cold-steel/30 py-20">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-12 mb-12">
          {/* Logo and Description */}
          <div className="md:col-span-1">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-electric-taupe to-signal-blue flex items-center justify-center">
                <span className="text-obsidian-black font-bold">A</span>
              </div>
              <span className="text-2xl tracking-wider">Ayvlo</span>
            </div>
            <p className="text-foreground/60 leading-relaxed text-sm">
              The autonomous intelligence layer for modern businesses.
            </p>
          </div>

          {/* Product */}
          <div>
            <h4 className="mb-4 text-electric-taupe tracking-wider text-sm">PRODUCT</h4>
            <ul className="space-y-3">
              {[
                { label: "Overview", page: "product" },
                { label: "Use Cases", page: "use-cases" },
                { label: "Docs", page: "docs" },
                { label: "API", page: "docs" },
              ].map((item) => (
                <li key={item.label}>
                  <button
                    onClick={() => handleNavClick(item.page)}
                    className="text-foreground/60 hover:text-signal-blue transition-colors text-sm cursor-pointer"
                  >
                    {item.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="mb-4 text-electric-taupe tracking-wider text-sm">COMPANY</h4>
            <ul className="space-y-3">
              {[
                { label: "About", page: "about" },
                { label: "Careers", page: "careers" },
                { label: "Story", page: "founder" },
              ].map((item) => (
                <li key={item.label}>
                  <button
                    onClick={() => handleNavClick(item.page)}
                    className="text-foreground/60 hover:text-signal-blue transition-colors text-sm cursor-pointer"
                  >
                    {item.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h4 className="mb-4 text-electric-taupe tracking-wider text-sm">RESOURCES</h4>
            <ul className="space-y-3">
              {[
                { label: "Blog", page: "content" },
                { label: "Podcast", page: "content" },
                { label: "Newsletter", page: "content" },
              ].map((item) => (
                <li key={item.label}>
                  <button
                    onClick={() => handleNavClick(item.page)}
                    className="text-foreground/60 hover:text-signal-blue transition-colors text-sm cursor-pointer"
                  >
                    {item.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="mb-4 text-electric-taupe tracking-wider text-sm">LEGAL</h4>
            <ul className="space-y-3">
              {["Privacy Policy", "Terms of Use"].map((item) => (
                <li key={item}>
                  <a
                    href="#"
                    className="text-foreground/60 hover:text-signal-blue transition-colors text-sm cursor-pointer"
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-cold-steel/30 flex flex-col md:flex-row justify-between items-center gap-6">
          {/* Copyright */}
          <div className="text-foreground/50 text-sm mono">
            © {currentYear} Ayvlo. Less Noise. More Vision.
          </div>

          {/* Social Links */}
          <div className="flex items-center gap-6">
            <motion.a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.15, y: -3 }}
              className="text-foreground/60 hover:text-signal-blue transition-colors"
              aria-label="Follow us on X"
            >
              <Twitter size={20} />
            </motion.a>
            <motion.a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.15, y: -3 }}
              className="text-foreground/60 hover:text-signal-blue transition-colors"
              aria-label="Connect on LinkedIn"
            >
              <Linkedin size={20} />
            </motion.a>
            <motion.a
              href="https://youtube.com"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.15, y: -3 }}
              className="text-foreground/60 hover:text-signal-blue transition-colors"
              aria-label="Watch on YouTube"
            >
              <Youtube size={20} />
            </motion.a>
          </div>
        </div>
      </div>
    </footer>
  );
}
