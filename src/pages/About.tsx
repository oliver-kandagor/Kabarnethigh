import { useState } from "react";
import { Helmet } from "react-helmet-async";
import { Layout } from "@/components/layout/Layout";
import { motion } from "framer-motion";
import { Target, Eye, Award, BookOpen, Users, Shield, Lightbulb, Heart, ArrowRight } from "lucide-react";
import schoolGate from "@/assets/school-gate.jpg";
import campusPanoramic from "@/assets/campus-panoramic.jpg";
import banknoteHeritage from "@/assets/banknote-heritage.png";
import { MoiHeritageModal } from "@/components/ui/MoiHeritageModal";
import moiImage from "@/assets/About/Daniel_moi.png";

const About = () => {
  const [showMoiModal, setShowMoiModal] = useState(false);
  const mandates = [
    {
      icon: BookOpen,
      title: "Quality Education",
      description: "To offer quality education and sustain set standards."
    },
    {
      icon: Users,
      title: "Learner-Friendly Environment",
      description: "To inspire and provide quality secondary education in a learner friendly environment."
    },
    {
      icon: Shield,
      title: "Discipline & Character",
      description: "To inculcate discipline and decent upbringing of youth for nation building."
    },
    {
      icon: Lightbulb,
      title: "Innovation & Creativity",
      description: "To develop innovation and creativity to suit the dynamic world."
    }
  ];

  const coreValues = [
    { name: "Excellence", description: "Striving for the highest standards in all endeavors" },
    { name: "Integrity", description: "Upholding honesty and moral principles" },
    { name: "Discipline", description: "Self-control and commitment to rules" },
    { name: "Respect", description: "Valuing every individual in our community" },
    { name: "Innovation", description: "Embracing creativity and new ideas" },
    { name: "Unity", description: "Working together as one Patriarch family" }
  ];

  return (
    <>
      <MoiHeritageModal isOpen={showMoiModal} onClose={() => setShowMoiModal(false)} />
      <Helmet>
        <title>About Us | Kabarnet High School - A Century of Excellence</title>
        <meta
          name="description"
          content="Learn about Kabarnet High School's rich history since 1925, our mission, vision, and commitment to nurturing future leaders. Featured on Kenya's 10 Shilling note."
        />
      </Helmet>

      <Layout>
        {/* Hero Section */}
        <section className="relative min-h-screen flex flex-col justify-start pt-32 lg:pt-40 overflow-hidden">
          {/* Background Image */}
          <div className="absolute inset-0 z-0">
            <img
              src={campusPanoramic}
              alt="Kabarnet High School Campus"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-primary/80 via-primary/70 to-primary/90" />
          </div>

          <div className="container mx-auto px-4 relative z-10 h-full flex flex-col pointer-events-none">
            {/* Top Content: Main Title */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-left pt-8 lg:pt-0 pointer-events-auto self-start mt-12 lg:mt-24"
            >
              <h1 className="font-display text-4xl lg:text-6xl font-bold text-primary-foreground mb-4">
                About Kabarnet High School
              </h1>
              <p className="text-xl text-primary-foreground/90 max-w-3xl lg:mx-0">
                A century of academic excellence, shaping future leaders since 1925
              </p>
            </motion.div>

            {/* Scroll Indicator - Bottom Left */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.2 }}
              className="absolute bottom-32 left-8 hidden md:block"
            >
              <div className="flex flex-col items-center gap-2">
                <span className="text-primary-foreground/40 text-xs uppercase tracking-widest writing-vertical-rl rotate-180">Scroll to explore</span>
              </div>
            </motion.div>
          </div>

          {/* Moi Heritage Feature - Responsive & Modern (Moved Outside Container for True Bottom Positioning) */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.8 }}
            className="absolute bottom-0 left-0 right-0 w-full flex flex-col md:flex-row items-end justify-end z-20 pointer-events-none overflow-hidden"
          >
            {/* Text Content */}
            <div className="w-full md:w-auto text-left md:text-right pb-8 md:pb-12 pointer-events-auto px-4 md:pr-8 lg:pr-16 relative z-30 max-w-xl md:mx-0 mb-[35vh] md:mb-0">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 1, duration: 0.6 }}
                className="inline-flex items-center justify-start md:justify-end gap-3 mb-4 bg-secondary/10 backdrop-blur-sm px-4 py-1.5 rounded-full border border-secondary/20"
              >
                <span className="text-secondary text-xs sm:text-sm font-bold uppercase tracking-widest">Our Heritage</span>
                <div className="h-1.5 w-1.5 rounded-full bg-secondary animate-pulse"></div>
              </motion.div>

              <h2 className="text-white font-display font-bold text-3xl sm:text-4xl lg:text-5xl leading-snug mb-4 drop-shadow-xl tracking-normal">
                H.E. Daniel arap Moi
              </h2>

              <div className="flex flex-col items-start md:items-end gap-1.5 mb-6">
                <p className="text-white/95 text-xl sm:text-2xl font-medium drop-shadow-lg leading-relaxed">
                  Former Second President of Kenya
                </p>
                <p className="text-secondary/90 text-lg sm:text-xl font-medium tracking-wide">
                  Teacher & Board Chairman
                </p>
              </div>

              <p className="text-white/80 text-base leading-loose mb-8 max-w-md mx-auto md:mx-0 drop-shadow-md hidden md:block font-light">
                A visionary leader whose dedication as a Head Teacher and Board Chairman laid the unshakeable foundation for our academic excellence.
              </p>

              <button
                onClick={() => setShowMoiModal(true)}
                className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/20 text-white px-8 py-3 rounded-xl font-medium transition-all group shadow-lg hover:shadow-secondary/20 hover:border-secondary/50"
              >
                <span>Read Full Biography</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform text-secondary" />
              </button>
            </div>

            {/* Moi Image - Large & Responsive - Flush to Corner */}
            <div className="absolute right-0 bottom-0 md:relative w-[90%] sm:w-[50%] md:w-[45%] lg:w-[40%] max-w-[700px] pointer-events-auto self-end flex justify-end">
              {/* Premium Glow effect */}
              <div className="absolute bottom-0 right-0 w-full h-full bg-secondary/20 blur-[80px] rounded-full translate-y-1/4 translate-x-1/4"></div>

              <img
                src={moiImage}
                alt="H.E. Daniel arap Moi"
                className="w-full h-auto object-contain drop-shadow-2xl relative z-10 origin-bottom-right"
              />
            </div>
          </motion.div>
        </section>

        {/* History Section */}
        <section className="py-16 lg:py-24 bg-background">
          <div className="container mx-auto px-4">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <span className="text-secondary font-semibold text-sm uppercase tracking-wider">Our Heritage</span>
                <h2 className="font-display text-3xl lg:text-4xl font-bold text-foreground mt-2 mb-6">
                  Kabarnet High School in a Nutshell
                </h2>
                <div className="space-y-4 text-muted-foreground">
                  <p>
                    Kabarnet High School stands as a beacon of educational excellence in Baringo County, Kenya.
                    Established as one of the premier national schools, KHS has continuously produced outstanding
                    scholars who have gone on to become leaders in various fields across the nation and beyond.
                  </p>
                  <p>
                    Our rich history is immortalized on Kenya's 10 Shilling banknote, a testament to the school's
                    significant contribution to the nation's educational landscape. This recognition speaks to our
                    enduring legacy of academic excellence and nation-building.
                  </p>
                  <p>
                    Today, Kabarnet High School continues to uphold its tradition of excellence, combining
                    modern educational approaches with timeless values to prepare students for the challenges
                    of the 21st century.
                  </p>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="relative"
              >
                <img
                  src={schoolGate}
                  alt="Kabarnet High School Main Gate"
                  className="rounded-2xl shadow-card w-full"
                />
                <div className="absolute -bottom-6 -left-6 bg-card rounded-xl p-4 shadow-card">
                  <img
                    src={banknoteHeritage}
                    alt="KHS on Kenya 10 Shilling Note"
                    className="w-32 h-auto"
                  />
                  <p className="text-xs text-muted-foreground mt-2 text-center">Featured on Kenya's Currency</p>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Mission, Vision, Motto */}
        <section className="py-16 lg:py-24 bg-muted">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <h2 className="font-display text-3xl lg:text-4xl font-bold text-foreground mb-4">
                Our Guiding Principles
              </h2>
            </motion.div>

            <div className="grid md:grid-cols-3 gap-8">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
                className="bg-card rounded-2xl p-8 shadow-card text-center"
              >
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Target className="w-8 h-8 text-primary" />
                </div>
                <h3 className="font-display text-2xl font-bold text-foreground mb-4">Mission</h3>
                <p className="text-muted-foreground">
                  A Center of Excellence in Holistic Development of the Boy Child.
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
                className="bg-primary rounded-2xl p-8 shadow-card text-center"
              >
                <div className="w-16 h-16 bg-primary-foreground/20 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Eye className="w-8 h-8 text-primary-foreground" />
                </div>
                <h3 className="font-display text-2xl font-bold text-primary-foreground mb-4">Vision</h3>
                <p className="text-primary-foreground/90">
                  To Nature Students Through Holistic Excellence in Development.
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 }}
                className="bg-secondary rounded-2xl p-8 shadow-card text-center"
              >
                <div className="w-16 h-16 bg-secondary-foreground/10 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Award className="w-8 h-8 text-secondary-foreground" />
                </div>
                <h3 className="font-display text-2xl font-bold text-secondary-foreground mb-4">Motto</h3>
                <p className="text-secondary-foreground/90 text-xl font-display italic">
                  "Strong to Excel"
                </p>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Our Mandate */}
        <section className="py-16 lg:py-24 bg-background">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <span className="text-secondary font-semibold text-sm uppercase tracking-wider">Our Mandate</span>
              <h2 className="font-display text-3xl lg:text-4xl font-bold text-foreground mt-2">
                What We Stand For
              </h2>
            </motion.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {mandates.map((mandate, index) => (
                <motion.div
                  key={mandate.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-card rounded-xl p-6 shadow-soft hover:shadow-card transition-shadow group"
                >
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                    <mandate.icon className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="font-display text-lg font-bold text-foreground mb-2">{mandate.title}</h3>
                  <p className="text-muted-foreground text-sm">{mandate.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Core Values */}
        <section className="py-16 lg:py-24 bg-primary">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <h2 className="font-display text-3xl lg:text-4xl font-bold text-primary-foreground mb-4">
                Our Core Values
              </h2>
              <p className="text-primary-foreground/80 max-w-2xl mx-auto">
                The principles that guide every aspect of life at Kabarnet High School
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {coreValues.map((value, index) => (
                <motion.div
                  key={value.name}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-primary-foreground/10 backdrop-blur-sm rounded-xl p-6 border border-primary-foreground/20"
                >
                  <Heart className="w-6 h-6 text-secondary mb-3" />
                  <h3 className="font-display text-xl font-bold text-primary-foreground mb-2">{value.name}</h3>
                  <p className="text-primary-foreground/80 text-sm">{value.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      </Layout>
    </>
  );
};

export default About;
