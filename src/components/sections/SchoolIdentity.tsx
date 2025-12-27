
import { motion } from "framer-motion";
import identityImage from "@/assets/Gemini_Generated_Image_c87ayxc87ayxc87a.png";

export function SchoolIdentity() {
    return (
        <section className="py-0 relative z-20 -mt-12 mb-12">
            <div className="container mx-auto px-4">
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, type: "spring", bounce: 0.3 }}
                    className="relative rounded-[2rem] md:rounded-[2.5rem] overflow-hidden shadow-2xl group transform-gpu"
                >
                    {/* Background Image Container */}
                    <div className="relative aspect-[4/5] sm:aspect-video md:aspect-[24/9] w-full bg-black">
                        <img
                            src={identityImage}
                            alt="Kabarnet High School Identity - Strong to Excel"
                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                        />

                        {/* Gradient Overlay */}
                        <div className="absolute inset-0 bg-gradient-to-t md:bg-gradient-to-r from-black/90 via-black/60 to-transparent flex items-end md:items-center z-10">
                            <div className="p-6 sm:p-10 md:p-16 w-full max-w-2xl">
                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.3, duration: 0.6 }}
                                >
                                    <h2 className="text-white font-display text-3xl sm:text-4xl md:text-6xl font-bold mb-3 md:mb-4 drop-shadow-lg leading-tight">
                                        Strong to <span className="text-primary-foreground text-yellow-400">Excel</span>
                                    </h2>
                                    <p className="text-white/90 text-sm sm:text-lg md:text-xl font-medium leading-relaxed drop-shadow-md max-w-xl border-l-4 border-yellow-400 pl-4 md:pl-6">
                                        "Wearing our badge is not just a uniform; it's a commitment to a legacy of excellence, integrity, and the relentless pursuit of knowledge."
                                    </p>
                                </motion.div>
                            </div>
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
