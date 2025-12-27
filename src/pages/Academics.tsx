import { Helmet } from "react-helmet-async";
import { Layout } from "@/components/layout/Layout";
import { motion } from "framer-motion";
import { FlaskConical, Calculator, BookOpen, Globe, Users, Music, Award } from "lucide-react";
import teachingStaff from "@/assets/teaching-staff.jpg";
import { getMagazineImage } from "@/utils/magazine-loader";

import { SchoolProfile } from "@/components/sections/SchoolProfile";
import { SubjectCombinations } from "@/components/sections/SubjectCombinations";
import schoolBuilding from "@/assets/school-building.jpg";

const Academics = () => {
  return (
    <>
      <Helmet>
        <title>Academics | Kabarnet High School - Excellence in Education</title>
        <meta name="description" content="Explore academic departments, curriculum, and 80+ dedicated teaching staff at Kabarnet High School. Quality education with no compromise." />
      </Helmet>

      <Layout>
        <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-32">
          {/* Background Image */}
          <div className="absolute inset-0 z-0">
            <img src={schoolBuilding} alt="Academics at KHS" className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-b from-primary/80 via-primary/70 to-primary/90" />
          </div>

          <div className="container mx-auto px-4 relative z-10">
            <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} className="text-center">
              <h1 className="font-display text-4xl lg:text-7xl font-bold text-primary-foreground mb-6">Academics</h1>
              <p className="text-xl text-primary-foreground/90 max-w-2xl mx-auto leading-relaxed">
                Excellence through dedicated teaching and holistic education
              </p>

              {/* Scroll Indicator */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.2 }}
                className="absolute bottom-8 left-1/2 -translate-x-1/2 transform translate-y-full"
              >
                <div className="flex flex-col items-center gap-2">
                  <span className="text-primary-foreground/60 text-sm">Scroll to explore</span>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </section>

        <SchoolProfile />
        <SubjectCombinations />

        {/* Teaching Staff Photo Section */}
        <section className="py-12 bg-background">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="relative rounded-2xl overflow-hidden shadow-card"
            >
              <img
                src={teachingStaff}
                alt="Kabarnet High School Teaching Staff 2023"
                className="w-full h-auto object-cover"
              />
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6">
                <p className="text-white font-display text-xl font-bold">Teaching Staff 2023</p>
                <p className="text-white/80 text-sm">Over 80 dedicated educators shaping the future of Kenya</p>
              </div>
            </motion.div>
          </div>
        </section>

        <section className="py-16 bg-background">
          <div className="container mx-auto px-4">
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-12">
              <h2 className="font-display text-3xl font-bold text-foreground">Academic Departments</h2>
              <p className="text-muted-foreground mt-2">Over 80 dedicated teachers across all disciplines</p>
            </motion.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {/* Mathematics */}
              <DepartmentCard
                name="Mathematics"
                hod="Mr. Joseph Chesang"
                imageName="headofmathematics"
                description="One of the biggest departments, ensuring mathematical mastery through constant practice and revision."
                stats="13 Teachers"
              />

              {/* Sciences */}
              <DepartmentCard
                name="Sciences"
                hod="Ms. Beatrice Cherogony"
                imageName="HEOScinces"
                description="Physics, Chemistry, Biology & Agriculture. Fostering a scientific mindset and practical skills."
                stats="25 Teachers"
              />

              {/* Humanities */}
              <DepartmentCard
                name="Humanities"
                hod="Mr. Augustino Yatich"
                imageName="KiswailiDepartment"
                description="History, Geography, CRE. Producing energetic, self-driven, and disciplined students."
                stats="14 Teachers"
              />

              {/* Languages (Kiswahili) */}
              <DepartmentCard
                name="Kiswahili"
                hod="Bi. Kokwon Judith"
                imageName="KiswailiDepartment"
                description="'Kiswahili kitukuzwe'. Our department ensures excellence in national examinations."
                stats="11 Teachers"
              />

              {/* Technical & Creative */}
              <DepartmentCard
                name="Technical & Creative"
                hod="Various HODs"
                imageName="ICT-Club"
                description="Music, Art, Computer Studies, German. Nurturing diverse talents and skills."
                stats="8 Teachers"
              />

              {/* Boarding/Welfare */}
              <DepartmentCard
                name="Student Welfare"
                hod="Mr. Jacob Komen"
                imageName="DOS-jacob-komen"
                description="Director of Studies office ensuring academic programs align with student needs."
                stats="DOS Office"
              />
            </div>
          </div>
        </section>

        {/* Director of Studies */}
        <section className="py-16 bg-muted">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="bg-card rounded-2xl p-8 shadow-card"
              >
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center">
                    <Award className="w-8 h-8 text-primary-foreground" />
                  </div>
                  <div>
                    <h3 className="font-display text-xl font-bold text-foreground">Mr. Jacob Komen</h3>
                    <p className="text-secondary font-medium">Director of Studies</p>
                  </div>
                </div>
                <blockquote className="border-l-4 border-secondary pl-4 mb-4 italic text-muted-foreground">
                  "Every day, I wake up inspired by the knowledge that I have the privilege of contributing to
                  the intellectual growth of our students. My role as the Director of Studies is not just a job;
                  it is a calling that allows me to nurture a culture of learning and personal growth."
                </blockquote>
                <p className="text-muted-foreground text-sm">
                  Academic success is not limited to textbooks and exams. We firmly believe in a holistic approach
                  to education that fosters essential life skills, character development, and a sense of responsibility
                  among our students.
                </p>
              </motion.div>
            </div>
          </div>
        </section>

        <section className="py-16 bg-primary">
          <div className="container mx-auto px-4 text-center">
            <h2 className="font-display text-3xl font-bold text-primary-foreground mb-6">Quality Assurance</h2>
            <p className="text-primary-foreground/90 max-w-3xl mx-auto text-lg">
              "There is no compromising on quality at Kabarnet High School. We adhere to both internal and external
              standards of quality, aligning with national and international educational standards to ensure our
              students receive a world-class education that is recognized and respected globally."
            </p>
          </div>
        </section>
      </Layout>
    </>
  );
};

export default Academics;

/* Helper Component for Depts */
function DepartmentCard({ name, hod, imageName, description, stats }: { name: string, hod: string, imageName: string, description: string, stats: string }) {
  const imageSrc = getMagazineImage(imageName);
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="bg-card rounded-xl overflow-hidden shadow-soft hover:shadow-card transition-all group"
    >
      <div className="h-48 overflow-hidden bg-muted relative">
        {imageSrc ? (
          <img src={imageSrc} alt={name} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
        ) : (
          <div className="flex items-center justify-center h-full text-muted-foreground bg-primary/5">
            <FlaskConical className="w-12 h-12 opacity-20" />
          </div>
        )}
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4">
          <span className="text-white text-xs font-bold uppercase tracking-wider">{stats}</span>
        </div>
      </div>
      <div className="p-6">
        <h3 className="font-display text-xl font-bold text-foreground mb-1">{name}</h3>
        <p className="text-secondary text-sm font-medium mb-3">HOD: {hod}</p>
        <p className="text-muted-foreground text-sm leading-relaxed">{description}</p>
      </div>
    </motion.div>
  );
}
