import { Link, useLocation } from "react-router-dom";
import { Home, Info, BookOpen, Users, Newspaper, Image, Phone } from "lucide-react";
import { motion } from "framer-motion";

const navItems = [
  { name: "Home", href: "/", icon: Home },
  { name: "About", href: "/about", icon: Info },
  { name: "Academics", href: "/academics", icon: BookOpen },
  { name: "Life", href: "/student-life", icon: Users },
  { name: "News", href: "/news", icon: Newspaper },
  { name: "Gallery", href: "/gallery", icon: Image },
  { name: "Contact", href: "/contact", icon: Phone },
];

import { useState, useEffect } from "react";

export function MobileBottomNav() {
  const location = useLocation();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Show bottom nav only after scrolling down 50px
      setIsVisible(window.scrollY > 50);
    };

    // Check initial state
    handleScroll();

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav className={`fixed bottom-0 left-0 right-0 z-50 bg-card/95 backdrop-blur-md border-t border-border shadow-lg lg:hidden transition-transform duration-500 ${isVisible ? 'translate-y-0' : 'translate-y-full'}`}>
      <div className="flex items-center justify-around py-2 px-1">
        {navItems.map((item) => {
          const isActive = location.pathname === item.href;
          const Icon = item.icon;

          return (
            <Link
              key={item.name}
              to={item.href}
              className="flex flex-col items-center justify-center min-w-0 flex-1 py-1"
            >
              <motion.div
                className={`flex flex-col items-center gap-0.5 px-2 py-1.5 rounded-lg transition-colors ${isActive
                  ? "bg-primary text-primary-foreground"
                  : "text-muted-foreground hover:text-foreground"
                  }`}
                whileTap={{ scale: 0.95 }}
              >
                <Icon size={20} strokeWidth={isActive ? 2.5 : 2} />
                <span className="text-[10px] font-medium truncate">
                  {item.name}
                </span>
              </motion.div>
            </Link>
          );
        })}
      </div>
      {/* Safe area padding for iOS */}
      <div className="h-safe-area-inset-bottom bg-card" />
    </nav>
  );
}
