import { motion } from "framer-motion";
import { BookOpen, MapPin, Sparkles, Target, Trophy, Users } from "lucide-react";
import schoolAssembly from "@/assets/school-assembly.jpg";
import schoolGate from "@/assets/school-gate.jpg";
import teachingStaff from "@/assets/teaching-staff.jpg";

const values = [
  {
    icon: BookOpen,
    title: "Serious classrooms",
    description: "Lessons are built around discipline, curiosity, and steady academic growth.",
  },
  {
    icon: Trophy,
    title: "Competition spirit",
    description: "Students learn courage on the field, on stage, and in national contests.",
  },
  {
    icon: Users,
    title: "A living brotherhood",
    description: "Generations of Patriarchs stay connected through mentorship and service.",
  },
  {
    icon: Target,
    title: "Character first",
    description: "Every routine is shaped to grow responsible, confident, grounded young men.",
  },
];

const snapshots = [
  { src: schoolGate, label: "The gate", note: "Where every school day begins" },
  { src: teachingStaff, label: "The team", note: "Teachers and staff behind the work" },
];

export function AboutSection() {
  return (
    <section className="py-24 bg-transparent relative overflow-hidden">
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23166534' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }} />
      </div>

      <div className="container mx-auto px-4 relative">
        <div className="grid lg:grid-cols-[0.9fr_1.1fr] gap-10 lg:gap-16 items-center mb-20">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium mb-5">
              <MapPin className="w-4 h-4" />
              Kabarnet, Baringo County
            </span>
            <h2 className="font-display text-4xl md:text-6xl font-bold text-foreground mb-6 leading-tight">
              Built by real people,
              <span className="block text-primary">shaped by place.</span>
            </h2>
            <p className="text-muted-foreground text-lg leading-relaxed mb-6">
              Founded in 1925, Kabarnet High School carries a century of memory in
              its classrooms, fields, chapel, hostels, staff rooms, and morning assemblies.
              That story lives in the real faces, spaces, and rituals that make the
              school feel unmistakably human.
            </p>
            <div className="grid grid-cols-3 gap-3 max-w-lg">
              {["1925", "1,800+", "Strong"].map((stat, index) => (
                <motion.div
                  key={stat}
                  initial={{ opacity: 0, y: 18 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.08 }}
                  className="rounded-2xl border border-primary/10 bg-card/80 p-4 shadow-soft"
                >
                  <p className="font-display text-2xl md:text-3xl font-bold text-primary">{stat}</p>
                  <p className="text-xs uppercase tracking-[0.18em] text-muted-foreground">
                    {index === 0 ? "Founded" : index === 1 ? "Patriarchs" : "To Excel"}
                  </p>
                </motion.div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="relative"
          >
            <div className="absolute -inset-4 rounded-[2rem] bg-gradient-to-br from-secondary/30 via-primary/10 to-transparent blur-2xl" />
            <div className="relative rounded-[2rem] overflow-hidden shadow-2xl border border-white/50">
              <img
                src={schoolAssembly}
                alt="Kabarnet High School morning assembly"
                className="w-full aspect-[4/3] object-cover"
              />
              <div className="absolute inset-x-0 bottom-0 p-6 bg-gradient-to-t from-black/80 to-transparent">
                <p className="font-hand text-3xl text-secondary mb-1">Morning assembly</p>
                <p className="text-white/90 font-medium">A school culture you can actually see.</p>
              </div>
            </div>
          </motion.div>
        </div>

        <div className="grid md:grid-cols-2 gap-6 mb-16">
          {snapshots.map((snapshot, index) => (
            <motion.article
              key={snapshot.label}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.12 }}
              className="group relative rounded-3xl overflow-hidden shadow-card min-h-[280px]"
            >
              <img
                src={snapshot.src}
                alt={`${snapshot.label} at Kabarnet High School`}
                className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-primary/85 via-primary/25 to-transparent" />
              <div className="absolute bottom-0 p-6 text-white">
                <p className="font-hand text-3xl text-secondary">{snapshot.label}</p>
                <h3 className="font-display text-2xl font-bold">{snapshot.note}</h3>
              </div>
            </motion.article>
          ))}
        </div>

        <div className="grid md:grid-cols-2 gap-8 mb-16">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="group p-8 rounded-3xl bg-card shadow-card border border-border hover:border-primary/30 transition-all duration-300"
          >
            <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center mb-6 group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
              <Target className="w-7 h-7 text-primary group-hover:text-primary-foreground" />
            </div>
            <h3 className="font-display text-2xl font-bold text-foreground mb-4">Our Vision</h3>
            <p className="text-muted-foreground leading-relaxed">
              To nurture students through holistic excellence in development — producing
              morally upright, intellectually competent, and socially responsible citizens
              who contribute positively to national and global development.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="group p-8 rounded-3xl bg-primary text-primary-foreground shadow-card relative overflow-hidden"
          >
            <Sparkles className="absolute right-8 top-8 w-24 h-24 text-secondary/10" />
            <div className="w-14 h-14 rounded-2xl bg-secondary/20 flex items-center justify-center mb-6">
              <BookOpen className="w-7 h-7 text-secondary" />
            </div>
            <h3 className="font-display text-2xl font-bold mb-4">Our Mission</h3>
            <p className="text-primary-foreground/80 leading-relaxed">
              A centre of excellence in holistic development of the boy child — providing
              quality education that develops every student's full potential through
              innovative teaching, strong moral values, and a nurturing environment.
            </p>
          </motion.div>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {values.map((value, index) => (
            <motion.div
              key={value.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group p-6 rounded-2xl bg-card border border-border hover:-translate-y-1 hover:shadow-card hover:border-secondary/50 transition-all duration-300"
            >
              <div className="w-12 h-12 rounded-xl bg-secondary/10 flex items-center justify-center mb-4 group-hover:bg-secondary transition-colors">
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
