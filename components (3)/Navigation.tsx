import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Button } from "./ui/button";
import { Menu, X } from "lucide-react";

interface NavigationProps {
  onNavigate: (page: string) => void;
  currentPage: string;
}

export function Navigation({ onNavigate, currentPage }: NavigationProps) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems = [
    { label: "Product", page: "product" },
    { label: "Use Cases", page: "use-cases" },
    { label: "Docs", page: "docs" },
    { label: "Content", page: "content" },
    { label: "About", page: "about" },
    { label: "Careers", page: "careers" },
  ];

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled ? "bg-ash-graphite/95 backdrop-blur-lg shadow-lg" : "bg-transparent"
        }`}
      >
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="flex items-center gap-3 cursor-pointer"
              onClick={() => {
                onNavigate("home");
                window.scrollTo({ top: 0, behavior: "smooth" });
              }}
            >
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-electric-taupe to-signal-blue flex items-center justify-center">
                <span className="text-obsidian-black font-bold">A</span>
              </div>
              <span className="text-2xl tracking-wider">Ayvlo</span>
            </motion.div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-8">
              {navItems.map((item) => (
                <motion.button
                  key={item.page}
                  onClick={() => {
                    onNavigate(item.page);
                    window.scrollTo({ top: 0, behavior: "smooth" });
                  }}
                  className={`transition-colors cursor-pointer ${
                    currentPage === item.page
                      ? "text-electric-taupe"
                      : "text-foreground/80 hover:text-signal-blue"
                  }`}
                  whileHover={{ y: -2 }}
                >
                  {item.label}
                </motion.button>
              ))}
            </div>

            {/* Desktop CTA */}
            <div className="hidden md:block">
              <Button
                onClick={() => {
                  onNavigate("waitlist");
                  window.scrollTo({ top: 0, behavior: "smooth" });
                }}
                className="bg-electric-taupe hover:bg-electric-taupe/90 text-obsidian-black transition-all hover:glow-electric-taupe"
              >
                Join Waitlist
              </Button>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden text-foreground"
            >
              {mobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, x: "100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "100%" }}
            transition={{ type: "spring", damping: 25 }}
            className="fixed inset-0 z-40 bg-ash-graphite md:hidden"
          >
            <div className="flex flex-col items-center justify-center h-full gap-8 px-6">
              {navItems.map((item, index) => (
                <motion.button
                  key={item.page}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  onClick={() => {
                    onNavigate(item.page);
                    setMobileMenuOpen(false);
                    window.scrollTo({ top: 0, behavior: "smooth" });
                  }}
                  className={`text-3xl transition-colors cursor-pointer ${
                    currentPage === item.page
                      ? "text-electric-taupe"
                      : "text-foreground hover:text-signal-blue"
                  }`}
                >
                  {item.label}
                </motion.button>
              ))}
              <Button
                onClick={() => {
                  onNavigate("waitlist");
                  setMobileMenuOpen(false);
                  window.scrollTo({ top: 0, behavior: "smooth" });
                }}
                className="bg-electric-taupe hover:bg-electric-taupe/90 text-obsidian-black text-xl px-8 py-6 mt-8"
              >
                Join Waitlist
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
