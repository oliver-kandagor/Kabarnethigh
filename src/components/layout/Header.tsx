import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import khsLogo from "@/assets/Logos/logo.png";

const navLinks = [
  { name: "Home", href: "/" },
  { name: "About", href: "/about" },
  { name: "Academics", href: "/academics" },
  { name: "Student Life", href: "/student-life" },
  { name: "News", href: "/news" },
  { name: "Gallery", href: "/gallery" },
  { name: "Contact", href: "/contact" },
];

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${isScrolled
        ? "bg-card/95 backdrop-blur-md shadow-card py-2"
        : "bg-transparent py-4"
        }`}
    >
      <div className="container mx-auto px-4">
        <nav className="flex items-center justify-between">
          {/* Mobile Logo - Centered with school name */}
          <Link to="/" className="flex items-center gap-3 group lg:hidden w-full justify-center">
            <motion.img
              src={khsLogo}
              alt="Kabarnet High School Logo"
              className="h-10 w-auto"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4 }}
            />
            <div className="text-center">
              <motion.p
                className={`font-display text-base font-bold leading-tight transition-colors ${isScrolled ? "text-primary" : "text-primary-foreground"
                  }`}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.1 }}
              >
                Kabarnet High School
              </motion.p>
              <motion.p
                className={`text-[10px] italic transition-colors ${isScrolled ? "text-school-maroon" : "text-secondary"
                  }`}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
              >
                Strong to Excel
              </motion.p>
            </div>
            <motion.img
              src={khsLogo}
              alt="Kabarnet High School Logo"
              className="h-10 w-auto"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4 }}
            />
          </Link>

          {/* Desktop Logo */}
          <Link to="/" className="hidden lg:flex items-center gap-3 group">
            <motion.img
              src={khsLogo}
              alt="Kabarnet High School Logo"
              className="h-12 w-auto transition-transform group-hover:scale-105"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            />
            <div>
              <motion.p
                className={`font-display text-lg font-bold leading-tight transition-colors ${isScrolled ? "text-primary" : "text-primary-foreground"
                  }`}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
              >
                Kabarnet High School
              </motion.p>
              <motion.p
                className={`text-xs italic transition-colors ${isScrolled ? "text-school-maroon" : "text-secondary"
                  }`}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
              >
                Strong to Excel
              </motion.p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-1">
            {navLinks.map((link, index) => (
              <motion.div
                key={link.name}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * index }}
              >
                <Link
                  to={link.href}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${location.pathname === link.href
                    ? isScrolled
                      ? "bg-primary text-primary-foreground"
                      : "bg-secondary text-secondary-foreground"
                    : isScrolled
                      ? "text-foreground hover:bg-muted"
                      : "text-primary-foreground hover:bg-primary-foreground/10"
                    }`}
                >
                  {link.name}
                </Link>
              </motion.div>
            ))}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.6 }}
            >
              <Button variant={isScrolled ? "gold" : "hero"} size="lg" className="ml-4">
                Admissions
              </Button>
            </motion.div>
          </div>
        </nav>
      </div>
    </header>
  );
}
