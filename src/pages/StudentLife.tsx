import { Helmet } from "react-helmet-async";
import { Layout } from "@/components/layout/Layout";
import { motion } from "framer-motion";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Church, Users, Compass, Home, Utensils, Heart,
  Music, Theater, Newspaper, Trophy, BookOpen,
  Gamepad2, Mic2, Crown, Shield, Star, Target, ArrowRight
} from "lucide-react";
import campusPanoramic from "@/assets/campus-panoramic.jpg";
import sportsField from "@/assets/sports-field.jpg";
// Fallback for others
import dormView from "@/assets/Site Files/Dorm_views.JPG";
import samoeiHostel from "@/assets/Site Files/samoei-hostel.jpg";
import { getMagazineImage } from "@/utils/magazine-loader";

// New Components
import { DormCard } from "@/components/sections/boarding/DormCard";
import { MoiHostelFeature } from "@/components/sections/boarding/MoiHostelFeature";
import { SamoeiHostelFeature } from "@/components/sections/boarding/SamoeiHostelFeature";

// Dorm Images (Specific)
import chelagatImg from "@/assets/Site Files/Chelagat_Dorm.JPG";
import chepngoremImg from "@/assets/Site Files/Chepngorem_dorm.JPG";
import chesireImg from "@/assets/Site Files/Chesire_dorm.JPG";
import mandelaImg from "@/assets/Site Files/Mandela_dorm.JPG";
import nyayoImg from "@/assets/Site Files/Nyayo_dorm.JPG";
import chepsoleiImg from "@/assets/Site Files/Chepsolei_dorm.JPG";
import harambeImg from "@/assets/Site Files/Harambe_Hostel.JPG";

const StudentLife = () => {
  const societies = [
    {
      name: "Christian Union",
      icon: Church,
      members: "1000+",
      theme: "Proverbs 2:3-4",
      mission: "Knowing God and Making Him Known",
      vision: "To Spread the Gospel of Christ and Secure The Souls of Many",
      description: "The Christian Union is the largest and oldest society at Kabarnet High School. It comprises over a thousand members whose main aim is to serve God. The C.U is an outstanding society where most offices are run by students themselves, mentoring spiritual leaders for the future.",
      activities: [
        "Morning devotions every Sunday",
        "Daily evening prayers",
        "Society service on Thursdays",
        "Saturday service",
        "Friday evening kesha (night vigil)"
      ],
      departments: ["Prayers", "Praise & Worship", "Welfare", "Ushers", "Choir", "Evangelism", "Treasury", "Bible Study", "Instrumental"],
      color: "bg-primary"
    },
    {
      name: "SDA Society",
      icon: BookOpen,
      members: "70+",
      theme: "I Will Go",
      patron: "Madam Clara Ayabei",
      chairperson: "Aristacus Kigen",
      description: "The Seventh-day Adventist Society brings students closer to God through prayers held every evening and observance of the Sabbath as commanded in Exodus 20:8. The society benefits from Kabarnet Central SDA Church.",
      activities: [
        "Mass every Sunday morning",
        "Thursday evening mass",
        "Prayers after preps daily",
        "Sabbath observance on Saturdays"
      ],
      leaders: [
        { name: "Mrs. Clara Ayabei", role: "Patron" },
        { name: "Wilfred Kiprop", role: "Director" },
        { name: "Arutarchus Kigen", role: "Chairperson" },
        { name: "Kelvin Chelal", role: "Deputy Chairperson" },
        { name: "Lawrence Bussenei", role: "Treasurer" }
      ],
      color: "bg-secondary"
    },
    {
      name: "Young Christian Students (YCS)",
      icon: Heart,
      members: "Active",
      patron: "Mr. Nyukuri Wanjala",
      description: "The YCS movement is a global organization that focuses on empowering young Christians to live out their faith in their daily lives. The Chaplaincy supports YCS students with guidance, mentorship, and a platform to express and share their beliefs.",
      activities: [
        "Community service visits",
        "Charity work",
        "Faith sharing sessions",
        "Outreach programs"
      ],
      highlight: "Organized memorable visit to DEAFBLIND school, providing supplies and building connections with students with special needs.",
      color: "bg-destructive"
    }
  ];

  const clubs = [
    {
      name: "Scout Department",
      icon: Compass,
      patron: "Mr. Wakhungu Butali",
      members: "60+ registered scouts",
      umbrella: "Mwamba Umbrella",
      description: "For one to qualify as a scout, they must be in the top 100 in exams - grades are key. The scouts have achieved remarkable success in competitions.",
      achievements: [
        "2022: Reached regionals in Eldoret - Position 22 in Mwamba overall, Position 7 in Mwamba boys",
        "2023: Position 3 at regionals - qualified for Nationals",
        "2023 Nationals: Position 20 among 90 schools at Rowalan grounds, Ngong"
      ],
      requirement: "Must be in top 100 academically",
      color: "bg-amber-600"
    },
    {
      name: "Journalism Club",
      icon: Newspaper,
      description: "Unveiling Truths, Telling Stories - The Journalism Club is a beacon of truth in our school community. Committed to honest reporting and storytelling, this club empowers students to develop writing, investigative, and communication skills.",
      activities: ["Article writing", "Interviews", "News broadcasts", "Magazine production"],
      highlight: "Produced the inaugural Patriarch's School Magazine",
      color: "bg-blue-600"
    },
    {
      name: "Drama Club",
      icon: Theater,
      patron: "Ms. Edna Rotich",
      description: "Unleashing Creativity and Emotion - The Drama Club is where imagination takes centre stage. Students explore the world of thespian art, bringing characters and stories to life through plays, skits, and improvisational acts.",
      skills: ["Empathy", "Teamwork", "Expression", "Creativity"],
      color: "bg-purple-600"
    },
    {
      name: "Music Club",
      icon: Music,
      patron: "Mr. Albert Kagali",
      description: "Harmonizing Hearts and Minds - A place where melodies, rhythms, and harmonies come together to create soul-stirring compositions. From choir performances to instrumental ensembles, this club showcases extraordinary talent.",
      activities: ["Choir performances", "Instrumental ensembles", "Music competitions"],
      color: "bg-pink-600"
    },
    {
      name: "Chess Club",
      icon: Gamepad2,
      patron: "Mr. Boaz Kirui",
      founded: "January 17th, 2023",
      founders: ["Fidel Cherutich", "Agape Kipchanga", "Humphrey Kigen", "Ramsey Ehyahya", "Cedric Changekechir"],
      description: "The Chess Club aims to promote chess and enhance students' intellectual and strategic skills through tournaments, strategy workshops, and simultaneous exhibitions.",
      achievement: "Agape Kapchanga emerged position 25 overall at the African Chess Championship in Mombasa 2025",
      aspiration: "To meet and engage with chess grandmasters on an international level",
      color: "bg-slate-700"
    }
  ];

  const dormitories = [
    { name: "Nkuruma", master: "Mr. Chepkoit Antony", image: dormView },
    { name: "Perkera", master: "Mr. Kevin Kipchiris", image: dormView },
    { name: "Lake Baringo", master: "Mr. Solomon Tanui", image: samoeiHostel }, // Part of Samoei Complex
    { name: "Baringo", master: "Mr. Philip Lagat", image: dormView },
    { name: "Kennedy", master: "Mr. James Chelimo", image: dormView },
    { name: "Omusugu", master: "Mr. Boaz Kipkemei", image: dormView },
    { name: "Chepngorem", master: "Mr. Augustino Yatich", image: chepngoremImg },
    { name: "Saimo", master: "Mr. Brandon Toroitich", image: dormView },
    { name: "Nyayo", master: "Mr. Reuben Sengech", image: nyayoImg },
    { name: "Mandela", master: "Mr. Festus Kipng'ok", image: mandelaImg },
    { name: "Chepsolei", master: "Mr. Kipkorir Kabutiei", image: chepsoleiImg },
    { name: "Chesire", master: "Mr. Wanjala Nyukuri Caleb", image: chesireImg },
    { name: "Chelagat", master: "Mr. Martin Kulei", image: chelagatImg },
    { name: "Lumumba", master: "Mr. Titus Kendele", image: dormView },
    { name: "Nyerere", master: "Mr. Bornface Chebii", image: dormView },
    { name: "Kenyatta", master: "Mr. Denis Kemuge", image: dormView },
    { name: "Kerio", master: "Mr. Duncan Kiptui", image: dormView },
    { name: "Morop", master: "Mr. Kevin Songol", image: dormView },
    { name: "Lake Bogoria", master: "Mr. Brian Limo", image: samoeiHostel }, // Part of Samoei Complex
    { name: "Chesang", master: "Mr. Dennis Butali Wakhungu", image: dormView },
    // Adding Samoei Complex specific dorms explicitly if needed or ensuring they are covered
    { name: "Harambe", master: "Unknown", image: harambeImg }
  ];

  const sports = [
    { name: "Football", icon: Trophy, description: "Crown jewel of Kabarnet sports. 2022: National Championships - 3rd place nationally", highlight: true },
    { name: "Rugby", icon: Shield, description: "Tackles opponents with resilience and grit" },
    { name: "Basketball", icon: Target, description: "Dribbles through challenges with finesse" },
    { name: "Hockey", icon: Star, description: "Precision and teamwork on the field" },
    { name: "Volleyball", icon: Trophy, description: "Competitive at county and regional levels" },
    { name: "Chess", icon: Gamepad2, description: "Represented at African Chess Championship 2025" },
    { name: "Handball", icon: Trophy, description: "Agility and precision" },
    { name: "Lawn Tennis", icon: Target, description: "Strategic thinking and physical conditioning" },
    { name: "Table Tennis", icon: Star, description: "Fast-paced reflexes and skill" }
  ];

  const studentLeadership = [
    { role: "School Captain / Student Council Chairman", message: "Our focus is on unity, inclusivity, and positive change. We believe in celebrating our diversity and ensuring every student feels heard, respected, and valued." },
    { role: "Student Welfare Captain", message: "Your welfare is a top priority at Kabarnet High School. We've seen significant enhancements in meals, facilities, and learning environment." },
    { role: "Entertainment Captain", message: "All work and no play makes Jack a dull boy. Entertainment contributes to students' overall well-being and helps them remain motivated." }
  ];

  return (
    <>
      <Helmet>
        <title>Student Life | Kabarnet High School - Clubs, Societies & Activities</title>
        <meta
          name="description"
          content="Explore vibrant student life at Kabarnet High School - Christian Union, SDA Society, Scouts, Drama Club, Sports, and 22 dormitories housing 1800+ students."
        />
      </Helmet>

      <Layout>

        {/* Hero Section */}
        <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-32">
          <div className="absolute inset-0 z-0">
            <img
              src={sportsField}
              alt="Student Life"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-primary/80 via-primary/70 to-primary/90" />
          </div>

          <div className="container mx-auto px-4 relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center"
            >
              <Badge className="bg-secondary text-secondary-foreground mb-6 text-sm px-4 py-1.5">Beyond The Classroom</Badge>
              <h1 className="font-display text-4xl lg:text-7xl font-bold text-primary-foreground mb-6">
                Student Life at KHS
              </h1>
              <p className="text-xl text-primary-foreground/90 max-w-3xl mx-auto leading-relaxed">
                Where talents are discovered, passions are ignited, and lifelong friendships are forged among 1,800 Patriarchs
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-12 max-w-3xl mx-auto"
            >
              {[
                { label: "Patriarchs", value: "1,800+" },
                { label: "Dormitories", value: "22" },
                { label: "Societies", value: "4" },
                { label: "Sports", value: "9+" }
              ].map((stat, index) => (
                <div key={index} className="bg-primary-foreground/10 backdrop-blur-sm rounded-xl p-4 text-center border border-primary-foreground/20">
                  <p className="font-display text-2xl lg:text-3xl font-bold text-secondary">{stat.value}</p>
                  <p className="text-primary-foreground/80 text-sm">{stat.label}</p>
                </div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* Main Content Tabs */}
        <section className="py-16 lg:py-24 bg-background">
          <div className="container mx-auto px-4">
            <Tabs defaultValue="societies" className="w-full">
              <TabsList className="grid w-full grid-cols-2 md:grid-cols-5 mb-8 h-auto gap-2 bg-transparent">
                {[
                  { value: "societies", label: "Societies", icon: Church },
                  { value: "clubs", label: "Clubs", icon: Compass },
                  { value: "boarding", label: "Boarding", icon: Home },
                  { value: "sports", label: "Sports", icon: Trophy },
                  { value: "leadership", label: "Leadership", icon: Crown }
                ].map((tab) => (
                  <TabsTrigger
                    key={tab.value}
                    value={tab.value}
                    className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground py-3 gap-2"
                  >
                    <tab.icon className="w-4 h-4" />
                    <span className="hidden sm:inline">{tab.label}</span>
                  </TabsTrigger>
                ))}
              </TabsList>

              {/* Societies Tab */}
              <TabsContent value="societies">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="space-y-8"
                >
                  <div className="text-center mb-8">
                    <h2 className="font-display text-3xl font-bold text-foreground mb-2">Religious Societies</h2>
                    <p className="text-muted-foreground max-w-2xl mx-auto">
                      The Chaplaincy plays a pivotal role in fostering unity, understanding, and appreciation among students
                      from diverse religious backgrounds. Led by Rev. Japheth Kangwony.
                    </p>
                  </div>

                  <div className="grid gap-8">
                    {societies.map((society, index) => (
                      <motion.div
                        key={society.name}
                        initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: index * 0.1 }}
                      >
                        <Card className="overflow-hidden border-0 shadow-card">
                          <div className={`h-2 ${society.color}`} />
                          <CardHeader>
                            <div className="flex items-start justify-between">
                              <div className="flex items-center gap-4">
                                <div className={`w-14 h-14 rounded-xl ${society.color} flex items-center justify-center`}>
                                  <society.icon className="w-7 h-7 text-white" />
                                </div>
                                <div>
                                  <CardTitle className="text-2xl">{society.name}</CardTitle>
                                  <CardDescription className="flex items-center gap-2 mt-1">
                                    <Users className="w-4 h-4" />
                                    {society.members} members
                                    {society.theme && (
                                      <>
                                        <span className="text-muted-foreground">•</span>
                                        <span>Theme: {society.theme}</span>
                                      </>
                                    )}
                                  </CardDescription>
                                </div>
                              </div>
                            </div>
                          </CardHeader>
                          <CardContent className="space-y-4">
                            {society.mission && (
                              <div className="grid md:grid-cols-2 gap-4">
                                <div className="bg-muted rounded-lg p-4">
                                  <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">Mission</p>
                                  <p className="font-medium text-foreground">{society.mission}</p>
                                </div>
                                <div className="bg-muted rounded-lg p-4">
                                  <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">Vision</p>
                                  <p className="font-medium text-foreground">{society.vision}</p>
                                </div>
                              </div>
                            )}

                            <p className="text-muted-foreground leading-relaxed">{society.description}</p>

                            {society.activities && (
                              <div>
                                <p className="font-semibold text-foreground mb-2">Regular Activities:</p>
                                <div className="flex flex-wrap gap-2">
                                  {society.activities.map((activity, i) => (
                                    <Badge key={i} variant="secondary" className="font-normal">
                                      {activity}
                                    </Badge>
                                  ))}
                                </div>
                              </div>
                            )}

                            {society.departments && (
                              <div>
                                <p className="font-semibold text-foreground mb-2">Departments:</p>
                                <div className="flex flex-wrap gap-2">
                                  {society.departments.map((dept, i) => (
                                    <Badge key={i} variant="outline">
                                      {dept}
                                    </Badge>
                                  ))}
                                </div>
                              </div>
                            )}

                            {society.leaders && (
                              <div>
                                <p className="font-semibold text-foreground mb-2">Leadership Team:</p>
                                <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                                  {society.leaders.map((leader, i) => (
                                    <div key={i} className="bg-muted/50 rounded-lg px-3 py-2">
                                      <p className="font-medium text-sm text-foreground">{leader.name}</p>
                                      <p className="text-xs text-muted-foreground">{leader.role}</p>
                                    </div>
                                  ))}
                                </div>
                              </div>
                            )}

                            {society.highlight && (
                              <div className="bg-secondary/10 border border-secondary/20 rounded-lg p-4">
                                <p className="text-sm text-foreground">
                                  <span className="font-semibold">Highlight:</span> {society.highlight}
                                </p>
                              </div>
                            )}
                          </CardContent>
                        </Card>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              </TabsContent>

              {/* Clubs Tab */}
              <TabsContent value="clubs">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="space-y-8"
                >
                  <div className="text-center mb-8">
                    <h2 className="font-display text-3xl font-bold text-foreground mb-2">Clubs & Activities</h2>
                    <p className="text-muted-foreground max-w-2xl mx-auto">
                      Nurturing Talent and Passion - These clubs are the crucibles where talents are discovered,
                      passions are ignited, and lifelong friendships are forged.
                    </p>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    {clubs.map((club, index) => (
                      <motion.div
                        key={club.name}
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: index * 0.1 }}
                      >
                        <Card className="h-full hover:shadow-lg transition-shadow">
                          <CardHeader>
                            <div className="flex items-center gap-3">
                              <div className={`w-12 h-12 rounded-lg ${club.color} flex items-center justify-center`}>
                                <club.icon className="w-6 h-6 text-white" />
                              </div>
                              <div>
                                <CardTitle className="text-lg">{club.name}</CardTitle>
                                {club.patron && (
                                  <CardDescription>Patron: {club.patron}</CardDescription>
                                )}
                              </div>
                            </div>
                          </CardHeader>
                          <CardContent className="space-y-3">
                            <p className="text-muted-foreground text-sm">{club.description}</p>

                            {club.members && (
                              <Badge variant="secondary">{club.members}</Badge>
                            )}

                            {club.requirement && (
                              <div className="bg-secondary/10 rounded-lg px-3 py-2">
                                <p className="text-xs text-secondary-foreground font-medium">
                                  Requirement: {club.requirement}
                                </p>
                              </div>
                            )}

                            {club.achievements && (
                              <div className="space-y-1">
                                <p className="text-sm font-semibold text-foreground">Achievements:</p>
                                <ul className="text-xs text-muted-foreground space-y-1">
                                  {club.achievements.map((achievement, i) => (
                                    <li key={i} className="flex items-start gap-2">
                                      <Trophy className="w-3 h-3 text-secondary mt-0.5 flex-shrink-0" />
                                      {achievement}
                                    </li>
                                  ))}
                                </ul>
                              </div>
                            )}

                            {club.achievement && (
                              <div className="bg-primary/5 rounded-lg px-3 py-2">
                                <p className="text-xs text-foreground">
                                  <Star className="w-3 h-3 inline text-secondary mr-1" />
                                  {club.achievement}
                                </p>
                              </div>
                            )}

                            {club.highlight && (
                              <p className="text-xs text-muted-foreground italic">{club.highlight}</p>
                            )}
                          </CardContent>
                        </Card>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              </TabsContent>

              {/* Boarding Tab */}
              <TabsContent value="boarding">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="space-y-8"
                >
                  <div className="text-center mb-8">
                    <h2 className="font-display text-3xl font-bold text-foreground mb-2">Boarding Department</h2>
                    <p className="text-muted-foreground max-w-2xl mx-auto">
                      The Engine of the School - Accommodating over 1,800 students in 22 dormitories with
                      comprehensive care for welfare, hygiene, and well-being.
                    </p>
                  </div>

                  {/* Moi Hostel Feature */}
                  <MoiHostelFeature />

                  {/* Samoei Hostel Feature */}
                  <SamoeiHostelFeature />

                  {/* Dormitories Grid */}
                  <div className="mt-16">
                    <h3 className="font-display text-2xl font-bold mb-6 text-center">Student Dormitories</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                      {dormitories.map((dorm, index) => (
                        <DormCard
                          key={dorm.name}
                          name={dorm.name}
                          master={dorm.master}
                          image={dorm.image}
                        />
                      ))}
                    </div>
                  </div>

                  {/* Boarding Features */}
                  <div className="grid md:grid-cols-3 gap-6 my-12">
                    {[
                      { icon: Home, title: "22 Dormitories", description: "Modern accommodation for 1,800+ students across well-maintained houses" },
                      { icon: Utensils, title: "Quality Meals", description: "High quality, balanced diet with fruits, eggs, meat, and bread daily" },
                      { icon: Heart, title: "Health Services", description: "Full-time school nurse hired by BOM for 24/7 healthcare" }
                    ].map((feature, index) => (
                      <motion.div
                        key={feature.title}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: index * 0.1 }}
                        className="bg-card rounded-xl p-6 shadow-soft text-center"
                      >
                        <div className="w-14 h-14 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                          <feature.icon className="w-7 h-7 text-primary" />
                        </div>
                        <h3 className="font-display text-lg font-bold text-foreground mb-2">{feature.title}</h3>
                        <p className="text-muted-foreground text-sm">{feature.description}</p>
                      </motion.div>
                    ))}
                  </div>

                  {/* Dormitory Leadership */}
                  <Card>
                    <CardHeader>
                      <CardTitle>Deputy Boarding Masters</CardTitle>
                      <CardDescription>Leadership team overseeing boarding operations</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="grid md:grid-cols-4 gap-4 mb-6">
                        {[
                          { name: "Mr. Martin Yahuma", role: "Accommodation" },
                          { name: "Mr. Butali Wakhungu", role: "Dining Hall" },
                          { name: "Mr. Brandon Kimosop", role: "Sanitation" },
                          { name: "Mr. Boaz Kipkemei", role: "Deputy Master" }
                        ].map((deputy, index) => (
                          <div key={index} className="bg-muted rounded-lg p-4 text-center">
                            <p className="font-semibold text-foreground">{deputy.name}</p>
                            <p className="text-sm text-muted-foreground">{deputy.role}</p>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>

                  {/* Facilities Highlight */}
                  <div className="bg-primary rounded-2xl p-8 text-primary-foreground">
                    <h3 className="font-display text-2xl font-bold mb-4">World-Class Facilities</h3>
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <p className="text-primary-foreground/90 leading-relaxed">
                          Kabarnet High School prides itself in an appealing aura and conducive environment achieved through
                          the Boarding department. This includes pavements, planted and maintained flower beds, lush manicured
                          lawns, and well-maintained classrooms and houses.
                        </p>
                      </div>
                      <div className="space-y-2">
                        {[
                          "Reliable piped water supplemented by drilled water",
                          "Standby generator for 24/7 operations",
                          "KHS is a 24/7 academic center",
                          "Full-time school nurse for healthcare"
                        ].map((item, i) => (
                          <div key={i} className="flex items-center gap-2">
                            <div className="w-2 h-2 bg-secondary rounded-full" />
                            <p className="text-sm text-primary-foreground/80">{item}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </motion.div>
              </TabsContent>

              {/* Sports Tab */}
              <TabsContent value="sports">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="space-y-8"
                >
                  <div className="text-center mb-8">
                    <h2 className="font-display text-3xl font-bold text-foreground mb-2">Sports & Games</h2>
                    <p className="text-muted-foreground max-w-2xl mx-auto">
                      Champions in Every Arena - KBT has established itself as a powerhouse in multiple sporting disciplines,
                      consistently demonstrating prowess and sportsmanship. Head of Department: Mr. Bett Cosmas.
                    </p>
                  </div>

                  {/* Featured Achievement */}
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    className="bg-gradient-to-r from-primary to-primary/80 rounded-2xl p-8 text-primary-foreground text-center"
                  >
                    <Trophy className="w-16 h-16 mx-auto mb-4 text-secondary" />
                    <h3 className="font-display text-3xl font-bold mb-2">National Champions</h3>
                    <p className="text-xl text-primary-foreground/90 mb-4">
                      2022 National Football Championships
                    </p>
                    <Badge className="bg-secondary text-secondary-foreground text-lg px-6 py-2">
                      3rd Place Nationally
                    </Badge>
                  </motion.div>

                  {/* Sports Grid */}
                  <div className="grid md:grid-cols-3 gap-4">
                    {sports.map((sport, index) => (
                      <motion.div
                        key={sport.name}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: index * 0.05 }}
                        className={`bg-card rounded-xl p-5 shadow-soft hover:shadow-card transition-all ${sport.highlight ? "ring-2 ring-secondary" : ""
                          }`}
                      >
                        <div className="flex items-center gap-3 mb-3">
                          <sport.icon className={`w-6 h-6 ${sport.highlight ? "text-secondary" : "text-primary"}`} />
                          <h3 className="font-display text-lg font-bold text-foreground">{sport.name}</h3>
                        </div>
                        <p className="text-muted-foreground text-sm">{sport.description}</p>
                      </motion.div>
                    ))}
                  </div>

                  {/* Sports Quote */}
                  <div className="bg-muted rounded-xl p-6 text-center">
                    <p className="text-lg italic text-muted-foreground">
                      "We don't just participate; we compete to win. These sports instill values of discipline,
                      leadership, and camaraderie, forging bonds that last a lifetime."
                    </p>
                  </div>
                </motion.div>
              </TabsContent>

              {/* Student Leadership Tab */}
              <TabsContent value="leadership">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="space-y-8"
                >
                  <div className="text-center mb-8">
                    <h2 className="font-display text-3xl font-bold text-foreground mb-2">Student Leadership</h2>
                    <p className="text-muted-foreground max-w-2xl mx-auto">
                      Building a Better Kabarnet High School - Student leaders working for unity, inclusivity, and positive change.
                    </p>
                  </div>

                  <div className="grid md:grid-cols-3 gap-6">
                    {studentLeadership.map((leader, index) => (
                      <motion.div
                        key={leader.role}
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: index * 0.1 }}
                      >
                        <Card className="h-full">
                          <CardHeader>
                            <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-3">
                              <Crown className="w-6 h-6 text-primary" />
                            </div>
                            <CardTitle className="text-lg">{leader.role}</CardTitle>
                          </CardHeader>
                          <CardContent>
                            <p className="text-muted-foreground text-sm italic">"{leader.message}"</p>
                          </CardContent>
                        </Card>
                      </motion.div>
                    ))}
                  </div>

                  {/* Key Initiatives */}
                  <Card>
                    <CardHeader>
                      <CardTitle>Student Council Initiatives</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="grid md:grid-cols-2 gap-4">
                        {[
                          { title: "Diversity & Inclusion", description: "Ensuring every student, regardless of background, feels heard and valued" },
                          { title: "School Spirit Events", description: "Pep rallies, themed dress-up days to showcase Kabarnet pride" },
                          { title: "Community Service", description: "Charity events and collaboration with local organizations" },
                          { title: "Personal Development", description: "Speakers, workshops, and activities for essential life skills" }
                        ].map((initiative, i) => (
                          <div key={i} className="flex items-start gap-3 bg-muted/50 rounded-lg p-4">
                            <Star className="w-5 h-5 text-secondary flex-shrink-0 mt-0.5" />
                            <div>
                              <p className="font-semibold text-foreground">{initiative.title}</p>
                              <p className="text-sm text-muted-foreground">{initiative.description}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>

                  {/* Prefect Body Quote */}
                  <div className="bg-secondary rounded-xl p-8 text-center">
                    <p className="text-lg font-medium text-secondary-foreground">
                      "High school isn't just about academics; it's about personal growth. This is your school,
                      and your input is invaluable. We're excited to work together to make Kabarnet High School
                      a place where we can all thrive and cherish the memories we create."
                    </p>
                    <p className="text-secondary-foreground/70 mt-4">— Student Council Chairman</p>
                  </div>
                </motion.div>
              </TabsContent>
            </Tabs>
          </div>
        </section>

        {/* --- NEW: Clubs & Societies Section (Magazine Content) --- */}
        <section className="py-24 bg-secondary/5 relative overflow-hidden">
          {/* Decorative Background */}
          <div className="absolute top-0 left-0 w-full h-full pointer-events-none opacity-30">
            <div className="absolute top-[10%] left-[-5%] w-[30vw] h-[30vw] rounded-full bg-primary/10 blur-[100px]" />
            <div className="absolute bottom-[10%] right-[-5%] w-[30vw] h-[30vw] rounded-full bg-secondary/10 blur-[100px]" />
          </div>

          <div className="container mx-auto px-4 relative z-10">
            <div className="text-center mb-16">
              <span className="text-secondary font-bold tracking-widest uppercase text-sm mb-4 block">Co-Curricular Excellence</span>
              <h2 className="text-4xl md:text-5xl font-display font-bold text-primary mb-6">Clubs & Societies</h2>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                Nurturing talents and building character beyond the classroom. From state-level Debate championships to national Science Fair innovations.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {/* Scouting Club */}
              <ClubCard
                name="The Scouting Club"
                category="Leadership & Service"
                imageName="Scouts"
                description="Under the leadership of Mr. Wakhungu Butali, our Mwamba Scouts consistently rank among the top in the nation, securing 3rd place regionally and competing at the Rowalan National Grounds."
                stats={["Regional Winners", "National Finalists", "60+ Members"]}
              />

              {/* Christian Union */}
              <ClubCard
                name="Christian Union (CU)"
                category="Spiritual Growth"
                imageName="CUsociety"
                description="The largest society on campus with over 1000 members. Led by Rev. Japheth Kangwony, the CU shapes spiritual leaders through worship, bible study, and the famous Friday 'Kesha'."
                stats={["1000+ Members", "Weekly Devotions", "Student Led"]}
              />

              {/* ICT Club */}
              <ClubCard
                name="ICT & Innovation Club"
                category="Technology"
                imageName="ICT-Club"
                description="Pioneering the digital frontier. Our members engage in coding, digital literacy, and maintenance, ensuring Kabarnet High remains a technological hub in the region."
                stats={["Coding Projects", "Digital Literacy", "Tech Support"]}
              />

              {/* Journalism Club */}
              <ClubCard
                name="Journalism Club"
                category="Media & Arts"
                imageName="Jornalist-club"
                description="The voice of the Patriarchs. Creators of the school magazine, this club hones skills in photography, reporting, and editing under the mentorship of Mr. Yahuma Martin."
                stats={["Magazine Publication", "Photography", "Reporting"]}
              />

              {/* Science & Engineering */}
              <ClubCard
                name="Science & Engineering Fair"
                category="Innovation"
                imageName="ScinceFairWinigs"
                description="Where theory meets practice. Our students consistently excel in regional and national science fairs, presenting innovative solutions to real-world problems."
                stats={["National Awards", "Innovation", "Research"]}
              />

              {/* Drama & Music */}
              <ClubCard
                name="Music & Drama Club"
                category="Performing Arts"
                imageName="Music-club"
                description="Expressing culture and creativity through song and dance. A vibrant community that competes at the highest levels of the Kenya Music Festivals."
                stats={["Music Festivals", "Cultural Dance", "Creative Arts"]}
              />
            </div>

            <div className="mt-16 text-center">
              <a href="/gallery" className="inline-flex items-center gap-2 text-primary font-medium hover:text-secondary transition-colors group">
                <span>View All Student Activities</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </a>
            </div>
          </div>
        </section>

      </Layout>
    </>
  );
};

export default StudentLife;

// Helper Component for Content Injection

function ClubCard({ name, category, imageName, description, stats }: { name: string, category: string, imageName: string, description: string, stats: string[] }) {
  const imageSrc = getMagazineImage(imageName);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="group bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all border border-border/50 flex flex-col h-full"
    >
      <div className="relative h-64 overflow-hidden bg-muted">
        {imageSrc ? (
          <img src={imageSrc} alt={name} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
        ) : (
          <div className="flex items-center justify-center h-full text-muted-foreground">Image not found: {imageName}</div>
        )}
        <div className="absolute top-4 left-4 bg-black/50 backdrop-blur-md text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
          {category}
        </div>
      </div>

      <div className="p-6 flex-1 flex flex-col">
        <h3 className="text-2xl font-display font-bold text-primary mb-3 group-hover:text-secondary transition-colors">{name}</h3>
        <p className="text-muted-foreground mb-6 line-clamp-4 flex-1">
          {description}
        </p>

        <div className="flex flex-wrap gap-2 mt-auto">
          {stats.map((stat, i) => (
            <span key={i} className="inline-flex items-center gap-1.5 text-xs font-medium bg-primary/5 text-primary px-2.5 py-1 rounded-md">
              <Star className="w-3 h-3 text-secondary" />
              {stat}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  );
}
