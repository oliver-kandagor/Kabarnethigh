
import { motion, AnimatePresence } from "framer-motion";
import { Quote, X, BookOpen } from "lucide-react";
import principalImg from "@/assets/2.jpg";
import { useState } from "react";
import { MoiHostelFeature } from "@/components/sections/boarding/MoiHostelFeature";
import { SamoeiHostelFeature } from "@/components/sections/boarding/SamoeiHostelFeature";
import { createPortal } from "react-dom";
import { GlassCard } from "@/components/effects/GlassCard";
import { LiquidWave } from "@/components/effects/LiquidWave";

export function PrincipalWelcome() {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <section className="py-16 sm:py-24 md:py-32 bg-background relative overflow-hidden">
            <div className="container mx-auto px-4">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 lg:gap-16 items-center">
                    {/* Image Column - Image Reveal (80% focus) */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.7, ease: "easeOut" }}
                        className="order-2 lg:order-1 relative"
                    >
                        {/* Principal Image with Green Border */}
                        <div className="relative rounded-3xl overflow-hidden shadow-2xl border-4 border-[#1B4332] aspect-square sm:aspect-auto">
                            <img
                                src={principalImg}
                                alt="Chief Principal Mr. Julius N. Ndirangu"
                                className="w-full h-full object-cover"
                            />
                            {/* Overlay with title at bottom */}
                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex items-end p-6 sm:p-8">
                                <div>
                                    <h3 className="text-white font-display text-xl sm:text-2xl font-bold">Mr. Julius N. Ndirangu</h3>
                                    <p className="text-white/90 text-sm sm:text-base font-medium">Chief Principal</p>
                                </div>
                            </div>
                        </div>
                    </motion.div>

                    {/* Content Column - Glassmorphic Message */}
                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="order-1 lg:order-2 relative"
                    >
                        {/* Liquid Wave Background (hidden on mobile) */}
                        <div className="absolute -top-16 -left-8 -right-8 hidden lg:block opacity-50">
                            <LiquidWave color="both" height={100} hideOnMobile={true} />
                        </div>

                        {/* Glass Card with Message */}
                        <GlassCard blurLevel="heavy" className="relative z-10 border-l-4 border-[#D4A574]">
                            <span className="inline-block px-3 py-1 rounded-full bg-[#D4A574]/20 text-[#D4A574] text-xs sm:text-sm font-medium mb-4 uppercase tracking-wider">
                                From the Chief Principal's Desk
                            </span>
                            <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-6">
                                Welcoming <span className="text-[#D4A574]">Remarks</span>
                            </h2>

                            <div className="space-y-4 text-white/90 text-sm sm:text-base leading-relaxed mb-6">
                                <p>
                                    "Today marks a watershed moment in Kabarnet High School's legacy. As I hold this inaugural magazine, I am reminded of a farmer witnessing the first green shoots breaking through earth after months of careful cultivation."
                                </p>
                                <p>
                                    "This magazine represents far more than printed pages—it is fertile ground where young minds plant their thoughts and watch them bloom into profound expression."
                                </p>
                                <p className="font-medium text-white">
                                    "This publication will carve pathways for intellectual growth and artistic exploration..."
                                </p>
                            </div>

                            <button
                                onClick={() => setIsOpen(true)}
                                className="inline-flex items-center gap-2 px-4 sm:px-6 py-2 sm:py-3 bg-[#D4A574] text-[#1B4332] rounded-full hover:bg-[#D4A574]/90 transition-all shadow-lg font-semibold text-sm sm:text-base group"
                            >
                                <BookOpen className="w-4 h-4" />
                                Read Full Message
                            </button>

                            <div className="mt-6 p-4 bg-white/10 rounded-lg border border-[#D4A574]/30">
                                <Quote className="w-6 h-6 text-[#D4A574]/60 mb-2" />
                                <p className="italic text-white/80 text-sm leading-relaxed">
                                    "Education is not about going to school and getting a degree. It's about widening your knowledge and absorbing the truth about life." - Shakuntala Devi
                                </p>
                            </div>
                        </GlassCard>
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

                            {/* Modal Card - Glassmorphic */}
                            <motion.div
                                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                                animate={{ opacity: 1, scale: 1, y: 0 }}
                                exit={{ opacity: 0, scale: 0.9, y: 20 }}
                                transition={{ type: "spring", duration: 0.5 }}
                                className="relative w-full max-w-3xl max-h-[85vh] rounded-3xl shadow-2xl overflow-hidden flex flex-col glass-blur-16"
                            >
                                {/* Header */}
                                <div className="p-6 border-b border-[#D4A574]/30 flex justify-between items-center bg-[#1B4332]/40">
                                    <div>
                                        <h3 className="text-2xl font-display font-bold text-white">Chief Principal's Message</h3>
                                        <p className="text-white/70 text-sm">Full Address to the School Community</p>
                                    </div>
                                    <button
                                        onClick={() => setIsOpen(false)}
                                        className="p-2 hover:bg-white/10 rounded-full transition-colors"
                                    >
                                        <X className="w-6 h-6 text-white" />
                                    </button>
                                </div>

                                {/* Scrollable Content */}
                                <div className="p-6 sm:p-8 overflow-y-auto space-y-6 text-white/90 leading-relaxed text-base sm:text-lg">
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
                                    <div className="bg-[#1B4332]/40 p-6 rounded-xl border-l-4 border-[#D4A574] my-8">
                                        <p className="italic font-medium text-white/90">
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

