import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import campusImage from "@/assets/0.png";
import { LiquidWave } from "@/components/effects/LiquidWave";
import { GlassCard } from "@/components/effects/GlassCard";
import { useState, useEffect } from "react";

export function HeroSection() {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20 sm:pt-32 bg-background">
      {/* Full-Bleed Background Image (85% hero) */}
      <div className="absolute inset-0 w-full h-full">
        <img
          src={campusImage}
          alt="Kabarnet High School Campus"
          className="parallax-image w-full h-full object-cover"
          style={{
            transform: `translate3d(0, ${scrollY * 0.5}px, 0)`,
          }}
        />
        {/* Dark overlay for text readability */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/40 to-black/60" />
      </div>

      {/* Glassmorphic Content Card (Bottom Center) */}
      <div className="relative z-10 w-full h-full flex items-end justify-center pb-8 sm:pb-12 md:pb-16 px-4">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="w-full max-w-2xl"
        >
          <GlassCard blurLevel="heavy" className="text-center sm:text-left relative">
            {/* Liquid Wave Behind Glass */}
            <div className="absolute -top-24 -left-4 -right-4 hidden sm:block">
              <LiquidWave color="both" height={80} hideOnMobile={true} />
            </div>

            <div className="relative z-10">
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.6 }}
                className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-3 leading-tight"
              >
                Kabarnet
                <span className="block text-amber-300">High School</span>
              </motion.h1>

              {/* Motto */}
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4, duration: 0.6 }}
                className="text-lg sm:text-xl md:text-2xl text-white/90 font-display italic mb-3"
              >
                "Strong to Excel"
              </motion.p>

              {/* Description */}
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5, duration: 0.6 }}
                className="text-sm sm:text-base md:text-lg text-white/80 max-w-xl leading-relaxed mb-4"
              >
                Nurturing leaders of tomorrow through academic excellence, moral integrity, and holistic development.
              </motion.p>

              {/* Badge */}
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.6, duration: 0.5 }}
                className="inline-flex items-center gap-2 px-3 py-2 rounded-full bg-amber-300/20 border border-amber-300/50 backdrop-blur-sm"
              >
                <span className="w-2 h-2 rounded-full bg-amber-300 animate-pulse" />
                <span className="text-amber-200 text-xs sm:text-sm font-medium">Est. 1925 • Century of Excellence</span>
              </motion.div>
            </div>
          </GlassCard>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 0.6 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="flex flex-col items-center gap-2 cursor-pointer"
          onClick={() => window.scrollTo({ top: window.innerHeight, behavior: 'smooth' })}
        >
          <span className="text-white/60 text-xs sm:text-sm">Scroll to explore</span>
          <ChevronDown className="w-5 h-5 sm:w-6 sm:h-6 text-amber-300" />
        </motion.div>
      </motion.div>
    </section>
  );
}
