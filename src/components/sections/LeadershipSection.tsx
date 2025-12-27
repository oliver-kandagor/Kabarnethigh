import { motion } from "framer-motion";
import leadershipTeam from "@/assets/Principal-with-school-leaders.jpg";

const leaders = [
  {
    name: "Julius N. Ndirangu",
    title: "Chief Principal",
    message: "Our commitment to excellence remains unwavering as we guide the next generation of leaders.",
  },
];

export function LeadershipSection() {
  return (
    <section className="py-24 bg-muted relative overflow-hidden">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <span className="inline-block px-4 py-1.5 rounded-full bg-school-maroon/10 text-school-maroon text-sm font-medium mb-4">
            School Leadership
          </span>
          <h2 className="font-display text-4xl md:text-5xl font-bold text-foreground mb-6">
            Guided by{" "}
            <span className="text-school-maroon">Experience</span>
          </h2>
          <p className="text-muted-foreground text-lg leading-relaxed">
            Our dedicated leadership team ensures the highest standards of education
            and character development for every student.
          </p>
        </motion.div>

        {/* Leadership Card */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-5xl mx-auto"
        >
          <div className="relative rounded-3xl overflow-hidden shadow-card">
            {/* Image */}
            <img
              src={leadershipTeam}
              alt="Kabarnet High School Leadership Team"
              className="w-full h-80 md:h-[500px] object-cover object-top"
            />

            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-primary via-primary/40 to-transparent" />

            {/* Content */}
            <div className="absolute bottom-0 left-0 right-0 p-8 md:p-12">
              <div className="max-w-2xl">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3 }}
                >
                  <p className="text-secondary font-medium mb-2">Chief Principal</p>
                  <h3 className="font-display text-3xl md:text-4xl font-bold text-primary-foreground mb-4">
                    {leaders[0].name}
                  </h3>
                  <p className="text-primary-foreground/80 text-lg leading-relaxed mb-6">
                    "{leaders[0].message}"
                  </p>
                  <div className="flex items-center gap-4">
                    <div className="h-1 w-16 bg-secondary rounded-full" />
                    <span className="text-primary-foreground/60 text-sm">Leadership Team 2024-2025</span>
                  </div>
                </motion.div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-12 max-w-4xl mx-auto"
        >
          {[
            { number: "100+", label: "Years of Excellence" },
            { number: "50+", label: "Qualified Teachers" },
            { number: "1,200+", label: "Students" },
            { number: "95%", label: "University Admission" },
          ].map((stat, index) => (
            <div key={stat.label} className="text-center p-6 rounded-xl bg-card shadow-soft">
              <p className="font-display text-3xl md:text-4xl font-bold text-primary mb-2">
                {stat.number}
              </p>
              <p className="text-muted-foreground text-sm">{stat.label}</p>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
