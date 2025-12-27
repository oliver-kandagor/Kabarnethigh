import { Helmet } from "react-helmet-async";
import { Layout } from "@/components/layout/Layout";
import { motion } from "framer-motion";
import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
// Existing images
import schoolBus from "@/assets/school-bus.jpg";
import schoolGate from "@/assets/school-gate.jpg";
import campusPanoramic from "@/assets/campus-panoramic.jpg";
import schoolClassrooms from "@/assets/school-classrooms.jpg";
import presidentialVisit from "@/assets/presidential-visit.jpg";
import constructionAerial from "@/assets/construction-aerial.jpg";
import sportsField from "@/assets/sports-field.jpg";
import kabarnetTown from "@/assets/kabarnet-town.png";
// New images from magazine
import ycsCatholicSociety from "@/assets/ycs-catholic-society.jpg";
import teachingStaff from "@/assets/teaching-staff.jpg";
import schoolSecurity from "@/assets/school-security.jpg";
import schoolBusScania from "@/assets/school-bus-scania.jpg";
import schoolBursar from "@/assets/school-bursar.jpg";
import schoolAssembly from "@/assets/school-assembly.jpg";
import rugbyTeam from "@/assets/rugby-team.jpg";
import fieldAssembly from "@/assets/field-assembly.jpg";
import kitchenStaff from "@/assets/kitchen-staff.jpg";

const Gallery = () => {
  const [activeCategory, setActiveCategory] = useState("all");

  const images = [
    // Campus & Facilities
    { src: campusPanoramic, title: "Campus Aerial View", category: "campus" },
    { src: schoolGate, title: "Main Entrance Gate", category: "campus" },
    { src: schoolClassrooms, title: "Modern Classrooms", category: "campus" },
    { src: constructionAerial, title: "Development Projects", category: "campus" },
    { src: kabarnetTown, title: "Kabarnet Town View", category: "campus" },

    // Transport
    { src: schoolBus, title: "School Transport", category: "transport" },
    { src: schoolBusScania, title: "KHS Scania Bus", category: "transport" },

    // Student Life & Events
    { src: schoolAssembly, title: "Morning Assembly", category: "student-life" },
    { src: fieldAssembly, title: "Field Assembly", category: "student-life" },
    { src: presidentialVisit, title: "Presidential Visit", category: "events" },
    { src: ycsCatholicSociety, title: "YCS Catholic Society", category: "student-life" },

    // Sports
    { src: sportsField, title: "Sports Field", category: "sports" },
    { src: rugbyTeam, title: "Rugby Team", category: "sports" },

    // Staff
    { src: teachingStaff, title: "Teaching Staff 2023", category: "staff" },
    { src: kitchenStaff, title: "Kitchen Staff", category: "staff" },
    { src: schoolSecurity, title: "Security Personnel", category: "staff" },
    { src: schoolBursar, title: "School Bursar", category: "staff" },
  ];

  const categories = [
    { value: "all", label: "All Photos" },
    { value: "campus", label: "Campus" },
    { value: "student-life", label: "Student Life" },
    { value: "sports", label: "Sports" },
    { value: "staff", label: "Staff" },
    { value: "transport", label: "Transport" },
    { value: "events", label: "Events" },
  ];

  const filteredImages = activeCategory === "all"
    ? images
    : images.filter(img => img.category === activeCategory);

  return (
    <>
      <Helmet>
        <title>Photo Gallery | Kabarnet High School - Campus Life & Events</title>
        <meta name="description" content="Explore photos of Kabarnet High School campus, facilities, student life, sports teams, staff, and special events. See the vibrant life of 1,800+ Patriarchs." />
      </Helmet>

      <Layout>
        <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-32">
          {/* Background Image */}
          <div className="absolute inset-0 z-0">
            <img src={campusPanoramic} alt="KHS Gallery" className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-b from-primary/80 via-primary/70 to-primary/90" />
          </div>

          <div className="container mx-auto px-4 relative z-10">
            <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} className="text-center">
              <h1 className="font-display text-4xl lg:text-7xl font-bold text-primary-foreground mb-6">Photo Gallery</h1>
              <p className="text-xl text-primary-foreground/90 max-w-2xl mx-auto leading-relaxed">
                A visual journey through the life and times at Kabarnet High School - from morning assemblies to sports victories
              </p>
            </motion.div>
          </div>
        </section>

        <section className="py-8 bg-muted sticky top-16 z-40">
          <div className="container mx-auto px-4">
            <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
              {categories.map((cat) => (
                <button
                  key={cat.value}
                  onClick={() => setActiveCategory(cat.value)}
                  className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${activeCategory === cat.value
                      ? "bg-primary text-primary-foreground"
                      : "bg-card text-foreground hover:bg-muted-foreground/10"
                    }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>
          </div>
        </section>

        <section className="py-12 bg-background">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {filteredImages.map((image, index) => (
                <motion.div
                  key={`${image.title}-${index}`}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.03 }}
                  className="relative group aspect-square overflow-hidden rounded-xl cursor-pointer shadow-soft hover:shadow-card transition-shadow"
                >
                  <img
                    src={image.src}
                    alt={image.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
                    <div className="absolute bottom-4 left-4 right-4">
                      <p className="text-white font-semibold text-sm">{image.title}</p>
                      <p className="text-white/70 text-xs capitalize">{image.category.replace("-", " ")}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {filteredImages.length === 0 && (
              <div className="text-center py-16">
                <p className="text-muted-foreground">No photos in this category yet.</p>
              </div>
            )}
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-12 bg-primary">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
              {[
                { value: "1,800+", label: "Patriarchs" },
                { value: "80+", label: "Teaching Staff" },
                { value: "22", label: "Dormitories" },
                { value: "45+", label: "Support Staff" },
              ].map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                >
                  <p className="font-display text-3xl lg:text-4xl font-bold text-secondary">{stat.value}</p>
                  <p className="text-primary-foreground/80 text-sm">{stat.label}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      </Layout>
    </>
  );
};

export default Gallery;
