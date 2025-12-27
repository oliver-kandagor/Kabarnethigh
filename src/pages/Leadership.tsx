import { Helmet } from "react-helmet-async";
import { Layout } from "@/components/layout/Layout";
import { motion } from "framer-motion";
import { Quote, Award, Users, Building } from "lucide-react";
import presidentialVisit from "@/assets/presidential-visit.jpg";
import leadershipTeam from "@/assets/Principal-with-school-leaders.jpg";

const Leadership = () => {
  const leaders = [
    {
      name: "Mr. Julius N. Ndirangu",
      title: "Chief Principal",
      image: leadershipTeam,
      quote: "Today marks a watershed moment in the rich tapestry of Kabarnet High School's legacy. This magazine represents far more than printed pages bound together—it is the fertile ground where young minds plant their thoughts and watch them bloom into profound expression.",
      message: "In an age where digital noise often drowns authentic voices, this magazine stands as an oasis of thoughtful discourse and creative expression. This publication will carve new pathways for intellectual growth and artistic exploration within our school community."
    },
    {
      name: "Dr. Lawrence Kibet",
      title: "Board of Management Chairman",
      image: presidentialVisit,
      quote: "The physical transformation of our school reflects our philosophical commitment to excellence. Our perimeter wall stands not as a barrier but as a symbol of security and focus, creating a sanctuary where minds can explore without fear or distraction.",
      message: "At the heart of our mission lies an unwavering commitment to teacher motivation and professional development. We recognise that motivated teachers create motivated students. When educators feel valued, supported, and empowered, they transmit this energy to their students."
    },
    {
      name: "Mr. Koech Musa",
      title: "Deputy Principal - Administration",
      image: leadershipTeam,
      quote: "The physical environment of our school plays a vital role in the learning experience. The Deputy in Charge of Administration ensures that our facilities are well-maintained, safe, and conducive to learning.",
      message: "I serve as the linchpin of the school's administrative machinery, responsible for the day-to-day administrative functions, ranging from managing personnel to overseeing facility maintenance and ensuring compliance with school policies."
    },
    {
      name: "Mr. Cheserem David",
      title: "Deputy Principal - Academics",
      image: leadershipTeam,
      quote: "The Deputy Principal in Charge of Academics is not merely an administrator but a visionary leader. They are responsible for setting the academic direction of the school.",
      message: "Student success is at the heart of our academic mission. We oversee academic support systems, working closely with teachers, counselors, and support staff to identify students in need of extra help and implement interventions to ensure every student excels."
    },
    {
      name: "Mr. Elijah Sumukwo",
      title: "Deputy - Co-Curriculum",
      image: leadershipTeam,
      quote: "What sets Sumukwo apart is his embrace of data-driven teaching methods. He uses assessment data to improve lesson delivery, identify learner needs, and raise academic performance.",
      message: "Currently serving as the Deputy in charge of Co-Curriculum, I play a pivotal role in overseeing extracurricular activities and promoting holistic education. My leadership ensures that learners are not only academically competent but also equipped with life skills."
    }
  ];

  const boardMembers = [
    { name: "Dr. Lawrence Kibet", role: "Chairman - Director General, Ministry of Finance and Economic Planning" },
    { name: "Mr. Julius Ndirangu", role: "Chief Principal / Secretary" },
    { name: "Board Member", role: "Parent Representative" },
    { name: "Board Member", role: "Alumni Representative" },
    { name: "Board Member", role: "Community Representative" }
  ];

  return (
    <>
      <Helmet>
        <title>Leadership | Kabarnet High School - Meet Our Leaders</title>
        <meta
          name="description"
          content="Meet the dedicated leadership team of Kabarnet High School - Chief Principal, Board of Management, and Deputy Principals committed to academic excellence."
        />
      </Helmet>

      <Layout>

        {/* Hero Section */}
        <section className="relative pt-24 pb-16 lg:pt-32 lg:pb-24">
          <div
            className="absolute inset-0 z-0"
            style={{
              backgroundImage: `url(${presidentialVisit})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }}
          >
            <div className="absolute inset-0 bg-gradient-to-b from-primary/95 to-primary/80" />
          </div>

          <div className="container mx-auto px-4 relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center"
            >
              <h1 className="font-display text-4xl lg:text-6xl font-bold text-primary-foreground mb-4">
                Our Leadership
              </h1>
              <p className="text-xl text-primary-foreground/90 max-w-3xl mx-auto">
                Dedicated leaders shaping the future of education at Kabarnet High School
              </p>
            </motion.div>
          </div>
        </section>

        {/* Principal Section */}
        <section className="py-16 lg:py-24 bg-background">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <span className="text-secondary font-semibold text-sm uppercase tracking-wider">Office of the Principal</span>
              <h2 className="font-display text-3xl lg:text-4xl font-bold text-foreground mt-2">
                Chief Principal's Message
              </h2>
            </motion.div>

            <div className="max-w-4xl mx-auto">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="bg-card rounded-2xl shadow-card overflow-hidden"
              >
                <div className="grid md:grid-cols-3 gap-0">
                  <div className="md:col-span-1 bg-primary p-8 flex flex-col justify-center items-center text-center">
                    <div className="w-32 h-32 rounded-full bg-primary-foreground/20 flex items-center justify-center mb-4">
                      <Users className="w-16 h-16 text-primary-foreground" />
                    </div>
                    <h3 className="font-display text-xl font-bold text-primary-foreground">Mr. Julius N. Ndirangu</h3>
                    <p className="text-primary-foreground/80 text-sm mt-1">Chief Principal</p>
                  </div>
                  <div className="md:col-span-2 p-8">
                    <Quote className="w-10 h-10 text-secondary mb-4" />
                    <blockquote className="text-muted-foreground italic mb-6 text-lg leading-relaxed">
                      "Today marks a watershed moment in the rich tapestry of Kabarnet High School's legacy.
                      As I hold the inaugural issue of The Patriarch's School Magazine, I am reminded of a farmer who,
                      after months of careful cultivation, finally witnesses the first green shoots breaking through the earth."
                    </blockquote>
                    <p className="text-muted-foreground">
                      In an age where digital noise often drowns authentic voices, this magazine stands as an oasis of
                      thoughtful discourse and creative expression. Each page turned reveals not just words on paper,
                      but the depth of understanding, the breadth of imagination, and the height of aspiration that define our Patriarchs.
                    </p>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Deputy Principals */}
        <section className="py-16 lg:py-24 bg-muted">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <span className="text-secondary font-semibold text-sm uppercase tracking-wider">School Administration</span>
              <h2 className="font-display text-3xl lg:text-4xl font-bold text-foreground mt-2">
                Deputy Principals
              </h2>
            </motion.div>

            <div className="grid md:grid-cols-3 gap-8">
              {[
                {
                  name: "Mr. Koech Musa",
                  title: "Deputy Principal - Administration",
                  description: "Orchestrating Efficiency: Responsible for day-to-day administrative functions, managing personnel, overseeing facility maintenance, and ensuring compliance with school policies.",
                  icon: Building
                },
                {
                  name: "Mr. Cheserem David",
                  title: "Deputy Principal - Academics",
                  description: "Charting the Academic Course: Setting academic direction, curriculum development, professional development, and examination coordination for academic excellence.",
                  icon: Award
                },
                {
                  name: "Mr. Elijah Sumukwo",
                  title: "Deputy - Co-Curriculum",
                  description: "Champion of Education and Innovation: Overseeing extracurricular activities, promoting holistic education, and embracing data-driven teaching methods.",
                  icon: Users
                }
              ].map((deputy, index) => (
                <motion.div
                  key={deputy.name}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-card rounded-2xl p-8 shadow-soft hover:shadow-card transition-all"
                >
                  <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-6">
                    <deputy.icon className="w-8 h-8 text-primary" />
                  </div>
                  <h3 className="font-display text-xl font-bold text-foreground mb-1">{deputy.name}</h3>
                  <p className="text-secondary font-medium text-sm mb-4">{deputy.title}</p>
                  <p className="text-muted-foreground text-sm leading-relaxed">{deputy.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Board of Management */}
        <section className="py-16 lg:py-24 bg-primary">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <h2 className="font-display text-3xl lg:text-4xl font-bold text-primary-foreground mb-4">
                Board of Management
              </h2>
              <p className="text-primary-foreground/80 max-w-3xl mx-auto">
                The Architecture of Becoming: Stewarding Educational Excellence at Kabarnet High School
              </p>
            </motion.div>

            <div className="max-w-4xl mx-auto">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="bg-primary-foreground/10 backdrop-blur-sm rounded-2xl p-8 border border-primary-foreground/20"
              >
                <Quote className="w-10 h-10 text-secondary mb-6" />
                <blockquote className="text-primary-foreground text-lg italic mb-6 leading-relaxed">
                  "Community engagement is not merely a buzzword in our lexicon; it is the vital force that connects
                  our school to the broader human experience. We recognise that Kabarnet High School belongs not to
                  any single stakeholder but to all who invest their hopes, dreams, and resources in its success."
                </blockquote>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-secondary rounded-full flex items-center justify-center">
                    <Users className="w-6 h-6 text-secondary-foreground" />
                  </div>
                  <div>
                    <p className="font-display font-bold text-primary-foreground">Dr. Lawrence Kibet</p>
                    <p className="text-primary-foreground/70 text-sm">Board of Management Chairman</p>
                  </div>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
                className="mt-8 grid md:grid-cols-2 gap-4"
              >
                {[
                  "Infrastructure Development - Completion of water borehole, perimeter wall, science complex",
                  "Teacher Motivation - Investment in teacher welfare and professional development",
                  "Community Engagement - Building partnerships with parents, alumni, and community",
                  "Future Vision - Proposed chapel development and continued growth"
                ].map((item, index) => (
                  <div
                    key={index}
                    className="bg-primary-foreground/5 rounded-xl p-4 border border-primary-foreground/10"
                  >
                    <p className="text-primary-foreground/90 text-sm">{item}</p>
                  </div>
                ))}
              </motion.div>
            </div>
          </div>
        </section>

        {/* Academic Leadership */}
        <section className="py-16 lg:py-24 bg-background">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <span className="text-secondary font-semibold text-sm uppercase tracking-wider">Academic Excellence</span>
              <h2 className="font-display text-3xl lg:text-4xl font-bold text-foreground mt-2">
                Academic Leadership Team
              </h2>
            </motion.div>

            <div className="grid md:grid-cols-2 gap-8">
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="bg-card rounded-2xl p-8 shadow-card"
              >
                <h3 className="font-display text-xl font-bold text-foreground mb-4">Director of Studies</h3>
                <p className="text-muted-foreground mb-4">
                  <strong>Mr. Jacob Komen</strong> serves as Director of Studies, nurturing a culture of learning
                  and personal growth. He believes in a holistic approach to education that fosters essential life skills,
                  character development, and a sense of responsibility among students.
                </p>
                <blockquote className="border-l-4 border-secondary pl-4 italic text-muted-foreground">
                  "Every day, I wake up inspired by the knowledge that I have the privilege of contributing to
                  the intellectual growth of our students. My role is not just a job; it is a calling."
                </blockquote>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="bg-card rounded-2xl p-8 shadow-card"
              >
                <h3 className="font-display text-xl font-bold text-foreground mb-4">Quality Assurance</h3>
                <p className="text-muted-foreground mb-4">
                  Quality assurance is not just a process; it is a commitment to maintaining and enhancing the
                  high standards we have set for our school. We ensure students receive quality and value for their time,
                  adhering to both internal and external standards.
                </p>
                <blockquote className="border-l-4 border-secondary pl-4 italic text-muted-foreground">
                  "There is no compromising on quality at Kabarnet High School. We align with national and
                  international educational standards for a world-class education."
                </blockquote>
              </motion.div>
            </div>
          </div>
        </section>

      </Layout>
    </>
  );
};

export default Leadership;
