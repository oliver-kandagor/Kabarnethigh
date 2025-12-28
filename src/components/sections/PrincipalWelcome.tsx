
import { motion, AnimatePresence } from "framer-motion";
import { Quote, X, BookOpen } from "lucide-react";
import principalImg from "@/assets/school_principal.png";
import { useState } from "react";
import { MoiHostelFeature } from "@/components/sections/boarding/MoiHostelFeature";
import { SamoeiHostelFeature } from "@/components/sections/boarding/SamoeiHostelFeature";
import { createPortal } from "react-dom";

export function PrincipalWelcome() {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <section className="py-24 bg-transparent relative overflow-hidden">
            <div className="container mx-auto px-4">
                <div className="grid lg:grid-cols-2 gap-12 items-center">
                    {/* Image Column */}
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="relative"
                    >
                        <div className="relative rounded-3xl overflow-hidden shadow-2xl border-8 border-white/50">
                            <img
                                src={principalImg}
                                alt="Chief Principal Mr. Julius N. Ndirangu"
                                className="w-full h-auto object-cover"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-primary/80 to-transparent flex items-end p-8">
                                <div>
                                    <h3 className="text-white font-display text-2xl font-bold">Mr. Julius N. Ndirangu</h3>
                                    <p className="text-white/90 font-medium">Chief Principal</p>
                                </div>
                            </div>
                        </div>
                        {/* Decorative Element */}
                        <div className="absolute -z-10 top-1/2 -left-12 w-64 h-64 bg-primary/10 rounded-full blur-3xl" />
                    </motion.div>

                    {/* Content Column */}
                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                    >
                        <span className="inline-block px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6">
                            From the Chief Principal's Desk
                        </span>
                        <h2 className="font-display text-4xl md:text-5xl font-bold text-foreground mb-8">
                            Welcoming <span className="text-primary">Remarks</span>
                        </h2>

                        <div className="space-y-6 text-muted-foreground text-lg leading-relaxed mb-8">
                            <p>
                                "Today marks a watershed moment in the rich tapestry of Kabarnet High School's legacy.
                                As I hold the inaugural issue of The Patriarch's School Magazine, I am reminded of a
                                farmer who, after months of careful cultivation, finally witnesses the first green
                                shoots breaking through the earth."
                            </p>
                            <p>
                                "This magazine represents far more than printed pages bound together—it is the fertile
                                ground where young minds plant their thoughts and watch them bloom into profound expression.
                                In an age where digital noise often drowns authentic voices, this magazine stands as an
                                oasis of thoughtful discourse and creative expression."
                            </p>
                            <p className="font-medium text-foreground">
                                "This publication will carve new pathways for intellectual growth and artistic exploration..."
                            </p>
                        </div>

                        <button
                            onClick={() => setIsOpen(true)}
                            className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-full hover:bg-primary/90 transition-all shadow-lg hover:shadow-primary/25 font-medium group"
                        >
                            <BookOpen className="w-4 h-4" />
                            Read Full Message
                        </button>

                        <div className="mt-8 p-6 bg-muted/50 rounded-xl border border-border">
                            <Quote className="w-8 h-8 text-primary/40 mb-4" />
                            <p className="italic text-foreground font-medium">
                                "Shakuntala Devi said, 'Education is not about going to school and getting a degree.
                                It is about widening your knowledge and absorbing the truth about life.' For this reason,
                                I am proud to be associated with the production of The Patriarchs."
                            </p>
                        </div>
                    </motion.div>
                </div>
            </div>

            {/* Glass Modal Popup */}
            {createPortal(
                <AnimatePresence>
                    {isOpen && (
                        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
                            {/* Backdrop */}
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                onClick={() => setIsOpen(false)}
                                className="absolute inset-0 bg-black/40 backdrop-blur-md"
                            />

                            {/* Modal Card */}
                            <motion.div
                                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                                animate={{ opacity: 1, scale: 1, y: 0 }}
                                exit={{ opacity: 0, scale: 0.9, y: 20 }}
                                transition={{ type: "spring", duration: 0.5 }}
                                className="relative w-full max-w-3xl max-h-[85vh] bg-background/80 backdrop-blur-xl rounded-3xl border border-white/20 shadow-2xl overflow-hidden flex flex-col"
                            >
                                {/* Header */}
                                <div className="p-6 border-b border-border/10 flex justify-between items-center bg-primary/5">
                                    <div>
                                        <h3 className="text-2xl font-display font-bold text-foreground">Chief Principal's Message</h3>
                                        <p className="text-muted-foreground text-sm">Full Address to the School Community</p>
                                    </div>
                                    <button
                                        onClick={() => setIsOpen(false)}
                                        className="p-2 hover:bg-black/5 rounded-full transition-colors"
                                    >
                                        <X className="w-6 h-6" />
                                    </button>
                                </div>

                                {/* Scrollable Content */}
                                <div className="p-6 sm:p-8 overflow-y-auto space-y-6 text-foreground/90 leading-relaxed text-lg">
                                    <p>
                                        "Today marks a watershed moment in the rich tapestry of Kabarnet High School's legacy.
                                        As I hold the inaugural issue of The Patriarch's School Magazine, I am reminded of a
                                        farmer who, after months of careful cultivation, finally witnesses the first green
                                        shoots breaking through the earth. This magazine represents far more than printed pages
                                        bound together—it is the fertile ground where young minds plant their thoughts and watch
                                        them bloom into profound expression."
                                    </p>
                                    <p>
                                        "In an age where digital noise often drowns authentic voices, this magazine stands as an
                                        oasis of thoughtful discourse and creative expression. This publication will carve new
                                        pathways for intellectual growth and artistic exploration within our school community.
                                        Each page turned reveals not just words on paper, but the depth of understanding, the
                                        breadth of imagination, and the height of aspiration that define our Patriarchs."
                                    </p>
                                    <p>
                                        "The importance of this magazine extends beyond its immediate literary value. It serves
                                        as a mirror reflecting the intellectual climate of our institution, a window offering
                                        glimpses into the minds of our students, and a bridge connecting generations of Patriarchs
                                        through shared stories and experiences. Like the baobab tree that stands as a repository
                                        of community memory, this magazine will become a living archive of our school's evolving narrative."
                                    </p>
                                    <p>
                                        "I have watched with profound admiration as our budding journalists have transformed from
                                        tentative writers into confident storytellers. Their pens have become instruments of
                                        exploration, their keyboards tools of discovery. Like young eagles learning to soar above
                                        hills, these student journalists have found their wings in the art of observation, analysis,
                                        and articulation."
                                    </p>
                                    <p>
                                        "The talent displayed within these pages is not accidental—it is the fruit of persistent
                                        cultivation. Our students have demonstrated that journalism is not merely about reporting
                                        events but about weaving the human experience into compelling narratives that inform,
                                        inspire, and ignite change. Their ability to capture the essence of school life, to probe
                                        deeper meanings behind everyday occurrences, and to present complex ideas with clarity
                                        and grace speaks to the quality of minds we are nurturing within these walls."
                                    </p>
                                    <div className="bg-primary/5 p-6 rounded-xl border-l-4 border-primary my-8">
                                        <p className="italic font-medium text-lg">
                                            "Most importantly, I salute our students who have contributed their thoughts, stories,
                                            poems, and insights to this maiden publication. Like streams converging to form a mighty
                                            river, your contributions have created something larger and more powerful than any single
                                            voice could achieve."
                                        </p>
                                    </div>
                                    <p>
                                        "This magazine would not exist without the collective effort of many hands working in
                                        harmony. I extend my heartfelt gratitude to our Board of Management, whose vision and
                                        support have provided the foundation upon which this literary endeavour stands. Their
                                        understanding that education extends beyond textbooks into the realm of creative
                                        expression has made this dream a tangible reality."
                                    </p>
                                    <p>
                                        "To Mr. Yahuma Martin, who heads our Journalism Club with dedication, we say thank you.
                                        Your mentorship has transformed raw talent into polished skill, curiosity into competence,
                                        and potential into performance."
                                    </p>
                                    <p>
                                        "Welcome to The Patriarch's School Magazine—may its pages continue to flourish providing
                                        shade for thought and shelter for expression for generations of Patriarchs to come."
                                    </p>
                                </div>
                            </motion.div>
                        </div>
                    )}
                </AnimatePresence>,
                document.body
            )}


            {/* Featured Presidential Hostels - Integrated at the bottom */}
            <div className="container mx-auto px-4 mt-24">
                <div className="text-center mb-12">
                    <h3 className="font-display text-2xl md:text-3xl font-bold">Presidential Infrastructure</h3>
                    <div className="h-1 w-20 bg-primary mx-auto mt-4 rounded-full" />
                </div>
                <div className="space-y-12">
                    <MoiHostelFeature />
                    <SamoeiHostelFeature />
                </div>
            </div>
        </section>
    );
}

