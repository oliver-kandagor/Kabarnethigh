import { motion } from "framer-motion";
import { BookOpen, Trophy, Users, Target } from "lucide-react";
import schoolAssembly from "@/assets/school-assembly.jpg";

const values = [
  {
    icon: BookOpen,
    title: "Academic Excellence",
    description: "Consistently ranking among Kenya's top national schools with outstanding KCSE performance.",
  },
  {
    icon: Trophy,
    title: "Sports & Co-curricular",
    description: "Champions in athletics, rugby, football, and various artistic competitions.",
  },
  {
    icon: Users,
    title: "Strong Alumni Network",
    description: "A community of successful professionals, leaders, and change-makers across the globe.",
  },
  {
    icon: Target,
    title: "Holistic Development",
    description: "Nurturing mind, body, and character to produce well-rounded individuals.",
  },
];

export function AboutSection() {
  return (
    <section className="py-24 bg-transparent relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23166534' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }} />
      </div>

      <div className="container mx-auto px-4 relative">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <span className="inline-block px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
            About Our School
          </span>
          <h2 className="font-display text-4xl md:text-5xl font-bold text-foreground mb-6">
            A Legacy of{" "}
            <span className="text-primary">Excellence</span>
          </h2>
          <p className="text-muted-foreground text-lg leading-relaxed">
            Founded in 1925, Kabarnet High School has been a beacon of academic excellence
            and character formation for nearly a century. Our commitment to nurturing
            leaders has earned us a place on the Kenyan currency — a testament to our
            national significance.
          </p>
        </motion.div>

        {/* Assembly Image */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="mb-16 rounded-2xl overflow-hidden shadow-card"
        >
          <img
            src={schoolAssembly}
            alt="Kabarnet High School Morning Assembly - 1,800+ Patriarchs"
            className="w-full h-auto object-cover"
          />
          <div className="bg-primary p-4 text-center">
            <p className="text-primary-foreground font-display font-bold">
              Morning Assembly: 1,800+ Patriarchs Strong
            </p>
          </div>
        </motion.div>

        {/* Vision & Mission Cards */}
        <div className="grid md:grid-cols-2 gap-8 mb-16">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="group p-8 rounded-2xl bg-card shadow-card border border-border hover:border-primary/30 transition-all duration-300"
          >
            <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mb-6 group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
              <Target className="w-7 h-7 text-primary group-hover:text-primary-foreground" />
            </div>
            <h3 className="font-display text-2xl font-bold text-foreground mb-4">Our Vision</h3>
            <p className="text-muted-foreground leading-relaxed">
              To Nature Students Through Holistic Excellence in Development — producing
              morally upright, intellectually competent, and socially responsible citizens
              who contribute positively to national and global development.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="group p-8 rounded-2xl bg-primary text-primary-foreground shadow-card"
          >
            <div className="w-14 h-14 rounded-xl bg-secondary/20 flex items-center justify-center mb-6">
              <BookOpen className="w-7 h-7 text-secondary" />
            </div>
            <h3 className="font-display text-2xl font-bold mb-4">Our Mission</h3>
            <p className="text-primary-foreground/80 leading-relaxed">
              A Center of Excellence in Holistic Development of the Boy Child — providing
              quality education that develops the full potential of every student through
              innovative teaching, strong moral values, and a nurturing environment.
            </p>
          </motion.div>
        </div>

        {/* Values Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {values.map((value, index) => (
            <motion.div
              key={value.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group p-6 rounded-xl bg-card border border-border hover:shadow-card hover:border-secondary/50 transition-all duration-300"
            >
              <div className="w-12 h-12 rounded-lg bg-secondary/10 flex items-center justify-center mb-4 group-hover:bg-secondary transition-colors">
                <value.icon className="w-6 h-6 text-secondary group-hover:text-secondary-foreground transition-colors" />
              </div>
              <h4 className="font-display text-lg font-semibold text-foreground mb-2">
                {value.title}
              </h4>
              <p className="text-muted-foreground text-sm leading-relaxed">
                {value.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
