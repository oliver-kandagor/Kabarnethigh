import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight, Users, GraduationCap, Star, Calendar, Award } from "lucide-react";
import { ComingSoonModal } from "@/components/ui/ComingSoonModal";
import { Link } from "react-router-dom";

// Images
import imgMain from "@/assets/Site Files/Alumni/IMG_3727.JPG";
// Using a few other images from the folder for the grid/collage
import imgGrid1 from "@/assets/Site Files/Alumni/IMG_3728.JPG";
// Wait, I saw IMG_3728.JPG in the list.
import imgGrid2 from "@/assets/Site Files/Alumni/DSC_0012.JPG";

export function AlumniSection() {
  const [showComingSoon, setShowComingSoon] = useState(false);

  return (
    <section className="py-24 bg-white relative overflow-hidden">
      {/* Background Decor */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-3xl translate-x-1/2 -translate-y-1/2" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-yellow-400/5 rounded-full blur-3xl -translate-x-1/2 translate-y-1/2" />

      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Left Col - Images */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            {/* Main Hero Image */}
            <div className="relative z-10 rounded-2xl overflow-hidden shadow-2xl border-4 border-white rotate-2 hover:rotate-0 transition-transform duration-500">
              <img src={imgMain} alt="Alumni Gathering" className="w-full h-[400px] lg:h-[500px] object-cover" />
              {/* Overlay Gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-90" />

              {/* Glass Overlay Card */}
              <div className="absolute bottom-6 left-6 right-6 md:right-auto md:w-80">
                <div className="relative overflow-hidden rounded-xl bg-white/10 backdrop-blur-md border border-white/20 p-4 shadow-lg before:absolute before:inset-0 before:bg-gradient-to-br before:from-white/10 before:to-transparent before:opacity-50">
                  <div className="flex items-start gap-4 relative z-10">
                    <div className="flex-shrink-0 w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center border border-white/10">
                      <Users className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <p className="font-display font-bold text-lg text-white mb-1">2022 Alumni Gathering</p>
                      <p className="text-xs text-white/80 leading-relaxed line-clamp-2">
                        Celebrate the memories and milestones of our vibrant alumni community.
                      </p>
                    </div>
                  </div>
                  {/* Decorative Shine */}
                  <div className="absolute -top-10 -right-10 w-20 h-20 bg-white/20 blur-xl rounded-full" />
                </div>
              </div>
            </div>

            {/* Floating Secondary Images */}
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="absolute -bottom-10 -right-10 w-48 h-32 rounded-lg overflow-hidden shadow-xl border-4 border-white z-20 hidden md:block"
            >
              <img src={imgGrid1} alt="Alumni" className="w-full h-full object-cover" />
            </motion.div>
            <div className="absolute -top-10 -left-10 w-40 h-40 rounded-full overflow-hidden shadow-xl border-4 border-white z-0 opacity-60">
              <img src={imgGrid2} alt="Alumni" className="w-full h-full object-cover" />
            </div>
          </motion.div>

          {/* Right Col - Content */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6">
              <GraduationCap className="w-4 h-4" />
              Alumni Community
            </div>
            <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6 leading-tight">
              Start Your Journey <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-green-700">Beyond KHS</span>
            </h2>
            <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
              Join a vibrant network of former students who are making waves globally. Whether you graduated recently or decades ago, your story is part of our legacy. Connect, network, and give back to the school that made you.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button
                size="xl"
                onClick={() => setShowComingSoon(true)}
                className="bg-primary hover:bg-primary/90 text-white shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all"
              >
                <Users className="w-5 h-5 mr-2" />
                Register as Alumni
              </Button>
              <Button variant="outline" size="xl">
                View Gallery
              </Button>
            </div>

            <div className="mt-12 flex items-center gap-8 border-t border-border pt-8">
              <div>
                <p className="text-3xl font-bold text-foreground">15k+</p>
                <p className="text-sm text-muted-foreground">Active Alumni</p>
              </div>
              <div>
                <p className="text-3xl font-bold text-foreground">50+</p>
                <p className="text-sm text-muted-foreground">Chapters Globally</p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      <ComingSoonModal
        isOpen={showComingSoon}
        onClose={() => setShowComingSoon(false)}
        title="Alumni Registration"
        message="The Alumni Registration Portal is currently under development. Stay tuned!"
      />
    </section>
  );
}
