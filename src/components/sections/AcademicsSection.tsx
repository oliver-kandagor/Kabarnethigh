import { motion } from "framer-motion";
import { GraduationCap, FlaskConical, Calculator, Globe, Palette, Dumbbell } from "lucide-react";
import { Button } from "@/components/ui/button";

const departments = [
  { icon: GraduationCap, name: "Languages", subjects: "English, Kiswahili, French" },
  { icon: FlaskConical, name: "Sciences", subjects: "Biology, Chemistry, Physics" },
  { icon: Calculator, name: "Mathematics", subjects: "Pure Maths, Applied Maths" },
  { icon: Globe, name: "Humanities", subjects: "History, Geography, CRE" },
  { icon: Palette, name: "Creative Arts", subjects: "Art, Music, Drama" },
  { icon: Dumbbell, name: "Physical Education", subjects: "Sports, Athletics, Games" },
];

export function AcademicsSection() {
  return (
    <section className="py-24 bg-background relative">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-block px-4 py-1.5 rounded-full bg-secondary/20 text-secondary-foreground text-sm font-medium mb-4">
              Academics
            </span>
            <h2 className="font-display text-4xl md:text-5xl font-bold text-foreground mb-6">
              Excellence in{" "}
              <span className="text-primary">Education</span>
            </h2>
            <p className="text-muted-foreground text-lg leading-relaxed mb-8">
              Our comprehensive curriculum prepares students for national examinations 
              and beyond. With experienced teachers and modern facilities, we ensure 
              every student reaches their full academic potential.
            </p>

            {/* Highlights */}
            <div className="space-y-4 mb-8">
              {[
                "Top 100 National School in KCSE Performance",
                "Modern Science Laboratories & ICT Facilities",
                "Qualified & Dedicated Teaching Staff",
                "Individual Student Support Programs",
              ].map((highlight, index) => (
                <motion.div
                  key={highlight}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="flex items-center gap-3"
                >
                  <div className="w-6 h-6 rounded-full bg-primary flex items-center justify-center shrink-0">
                    <svg className="w-4 h-4 text-primary-foreground" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <span className="text-foreground">{highlight}</span>
                </motion.div>
              ))}
            </div>

            <Button variant="default" size="lg">
              Explore Academic Programs
            </Button>
          </motion.div>

          {/* Right - Departments Grid */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="grid grid-cols-2 gap-4"
          >
            {departments.map((dept, index) => (
              <motion.div
                key={dept.name}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className={`group p-6 rounded-2xl border transition-all duration-300 hover:shadow-card cursor-pointer ${
                  index === 0 
                    ? "bg-primary text-primary-foreground border-primary col-span-2" 
                    : "bg-card border-border hover:border-primary/30"
                }`}
              >
                <dept.icon className={`w-8 h-8 mb-4 ${
                  index === 0 ? "text-secondary" : "text-primary group-hover:text-secondary"
                } transition-colors`} />
                <h4 className={`font-display text-lg font-semibold mb-1 ${
                  index === 0 ? "" : "text-foreground"
                }`}>
                  {dept.name}
                </h4>
                <p className={`text-sm ${
                  index === 0 ? "text-primary-foreground/80" : "text-muted-foreground"
                }`}>
                  {dept.subjects}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
