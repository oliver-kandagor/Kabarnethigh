
import { motion } from "framer-motion";
import identityImage from "@/assets/1.jpg";
import { GlassCard } from "@/components/effects/GlassCard";

export function SchoolIdentity() {
  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.1,
        duration: 0.6,
        ease: "easeOut",
      },
    }),
  };

  return (
    <section className="py-12 sm:py-20 md:py-32 relative z-20 -mt-8 sm:-mt-12 mb-8 sm:mb-12 bg-background">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 items-center"
        >
          {/* Image Column (70% width desktop, full mobile) */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="order-2 lg:order-1 relative"
          >
            {/* Base Image Layer with Dark Green Border */}
            <div className="relative rounded-3xl overflow-hidden border-4 border-[#1B4332] shadow-2xl">
              <img
                src={identityImage}
                alt="Kabarnet High School Identity"
                className="w-full h-auto object-cover aspect-square sm:aspect-video md:aspect-auto hover:scale-105 transition-transform duration-700"
              />
            </div>

            {/* Gold accent line (top-right corner) */}
            <div className="absolute -top-2 -right-2 w-16 h-16 border-t-4 border-r-4 border-[#D4A574] rounded-tr-3xl hidden sm:block" />
          </motion.div>

          {/* Content Column with Glass Cards */}
          <div className="order-1 lg:order-2 space-y-6">
            {/* Main Quote Card - Glassmorphic */}
            <motion.div
              custom={0}
              variants={cardVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="lg:absolute lg:right-0 lg:bottom-0 lg:w-1/2"
            >
              <GlassCard blurLevel="heavy" className="border-l-4 border-[#D4A574]">
                <h2 className="text-white font-display text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
                  Strong to
                  <span className="block text-[#D4A574]">Excel</span>
                </h2>
                <p className="text-white/90 text-base sm:text-lg leading-relaxed">
                  "Wearing our badge is not just a uniform; it's a commitment to a legacy of excellence, integrity, and the relentless pursuit of knowledge."
                </p>
              </GlassCard>
            </motion.div>

            {/* Mission Statement - Accent Card */}
            <motion.div
              custom={1}
              variants={cardVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="max-w-xs"
            >
              <div className="bg-[#1B4332]/80 backdrop-blur-sm p-4 sm:p-6 rounded-xl border-l-4 border-[#D4A574]">
                <h3 className="text-[#D4A574] font-display text-sm sm:text-base font-bold mb-2 uppercase tracking-wider">
                  Our Mission
                </h3>
                <p className="text-white/90 text-xs sm:text-sm leading-relaxed">
                  Nurturing excellence through academic rigor, moral integrity, and holistic development.
                </p>
              </div>
            </motion.div>

            {/* Values highlight */}
            <motion.div
              custom={2}
              variants={cardVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="grid grid-cols-3 gap-2 sm:gap-4 max-w-xs"
            >
              {['Excellence', 'Integrity', 'Leadership'].map((value, idx) => (
                <div
                  key={value}
                  className="bg-[#D4A574]/20 backdrop-blur-sm p-3 sm:p-4 rounded-lg border border-[#D4A574]/40 text-center"
                >
                  <p className="text-[#D4A574] text-xs sm:text-sm font-semibold">{value}</p>
                </div>
              ))}
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
