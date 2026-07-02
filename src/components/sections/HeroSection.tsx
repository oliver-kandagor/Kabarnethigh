import { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

import { ChevronDown } from "lucide-react";
import schoolBuilding from "@/assets/school-building.jpg";
import campusAerial from "@/assets/campus-aerial.jpg";
import fieldAssembly from "@/assets/field-assembly.jpg";
import schoolGate from "@/assets/school-gate.jpg";
import { HeritageCard } from "@/components/ui/HeritageCard";

const slides = [
  { src: schoolBuilding, alt: "Kabarnet High School Main Building" },
  { src: campusAerial, alt: "Aerial view of the Kabarnet High School campus" },
  { src: fieldAssembly, alt: "Students gathered on the school field" },
  { src: schoolGate, alt: "The main gate of Kabarnet High School" },
];

export function HeroSection() {
  const [current, setCurrent] = useState(0);
  const timerRef = useRef<ReturnType<typeof window.setInterval> | null>(null);

  const resetTimer = useCallback(() => {
    if (timerRef.current) {
      window.clearInterval(timerRef.current);
    }

    timerRef.current = window.setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 7000);
  }, []);

  useEffect(() => {
    resetTimer();
    return () => {
      if (timerRef.current) {
        window.clearInterval(timerRef.current);
      }
    };
  }, [resetTimer]);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-32">
      {/* Rotating Background Photography */}
      <div className="absolute inset-0">
        <AnimatePresence>
          <motion.img
            key={current}
            src={slides[current].src}
            alt={slides[current].alt}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.5, ease: "easeInOut" }}
            className="absolute inset-0 w-full h-full object-cover animate-kenburns"
          />
        </AnimatePresence>
        <div className="absolute inset-0 bg-gradient-to-b from-primary/70 via-primary/50 to-primary/85" />
      </div>

      {/* Decorative Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute top-1/4 -left-20 w-96 h-96 bg-secondary/10 rounded-full blur-3xl"
          animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
          transition={{ duration: 8, repeat: Infinity }}
        />
        <motion.div
          className="absolute bottom-1/4 -right-20 w-80 h-80 bg-secondary/10 rounded-full blur-3xl"
          animate={{ scale: [1.2, 1, 1.2], opacity: [0.5, 0.3, 0.5] }}
          transition={{ duration: 8, repeat: Infinity }}
        />
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-4xl mx-auto"
        >
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 }}
            className="font-hand text-2xl md:text-3xl text-secondary mb-2 -rotate-1"
          >
            Karibu — welcome home, Patriarch.
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="font-display text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-bold text-primary-foreground mb-6 leading-tight"
          >
            Kabarnet
            <span className="block text-secondary">High School</span>
          </motion.h1>

          {/* Motto */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="text-2xl md:text-3xl text-primary-foreground/90 font-display italic mb-4"
          >
            "Strong to Excel"
          </motion.p>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="text-lg md:text-xl text-primary-foreground/80 max-w-2xl mx-auto mb-10 leading-relaxed"
          >
            Nurturing leaders of tomorrow through academic excellence,
            moral integrity, and holistic development in the heart of Kenya's Rift Valley.
          </motion.p>

          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.8 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-secondary/20 backdrop-blur-sm border border-secondary/30 mb-8"
          >
            <span className="w-2 h-2 rounded-full bg-secondary animate-pulse" />
            <span className="text-secondary text-sm font-medium">Est. 1925 • A Century of Excellence</span>
          </motion.div>

          {/* Heritage Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1 }}
            className="mt-16 mx-auto w-full max-w-sm"
          >
            <HeritageCard />
          </motion.div>
        </motion.div>
      </div>

      {/* Slide Indicators */}
      <div className="absolute bottom-24 left-1/2 -translate-x-1/2 z-10 flex gap-2">
        {slides.map((slide, index) => (
          <button
            key={slide.alt}
            onClick={() => {
              setCurrent(index);
              resetTimer();
            }}
            aria-label={`Show photo: ${slide.alt}`}
            className={`h-1.5 rounded-full transition-all duration-500 ${
              index === current ? "w-8 bg-secondary" : "w-3 bg-primary-foreground/40 hover:bg-primary-foreground/70"
            }`}
          />
        ))}
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="flex flex-col items-center gap-2 cursor-pointer"
          onClick={() => window.scrollTo({ top: window.innerHeight, behavior: 'smooth' })}
        >
          <span className="text-primary-foreground/60 text-sm">Scroll to explore</span>
          <ChevronDown className="w-6 h-6 text-secondary" />
        </motion.div>
      </motion.div>
    </section>
  );
}
