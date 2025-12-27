
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import img1 from "@/assets/optimized/DJI_0026.jpg";
import img2 from "@/assets/optimized/DJI_0035.jpg";
import img3 from "@/assets/optimized/DJI_0079.jpg";
import img4 from "@/assets/optimized/DJI_0067.jpg";

const slides = [
    {
        image: img1,
        title: "Modern Infrastructure",
        description: "State-of-the-art facilities designed to inspire learning and foster creativity among our students.",
        highlight: "Infrastructure"
    },
    {
        image: img2,
        title: "Serene Campus",
        description: "A tranquil environment nestled in nature, providing the perfect atmosphere for focused academic pursuits.",
        highlight: "Campus"
    },
    {
        image: img3,
        title: "Holistic Growth",
        description: "Beyond the classroom, we nurture character, leadership, and physical well-being through diverse activities.",
        highlight: "Growth"
    },
    {
        image: img4,
        title: "Community & Spirit",
        description: "A vibrant community where every student belongs, supported by a tradition of unity and excellence.",
        highlight: "Community"
    }
];

export function FeatureSlideshow() {
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentIndex((prev) => (prev + 1) % slides.length);
        }, 6000);
        return () => clearInterval(timer);
    }, []);

    return (
        <section className="py-12 relative z-20">
            <div className="container mx-auto px-4">
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, type: "spring", bounce: 0.3 }}
                    className="relative rounded-[2rem] md:rounded-[3rem] overflow-hidden shadow-2xl group transform-gpu bg-black"
                >
                    {/* Background Image Container */}
                    <div className="relative h-[28rem] sm:h-[32rem] md:h-auto md:aspect-[24/9] w-full">
                        <AnimatePresence mode="wait">
                            <motion.img
                                key={currentIndex}
                                src={slides[currentIndex].image}
                                alt={slides[currentIndex].title}
                                initial={{ opacity: 0, scale: 1.1 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0 }}
                                transition={{ duration: 1.2 }}
                                className="absolute inset-0 w-full h-full object-cover"
                            />
                        </AnimatePresence>

                        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent md:bg-gradient-to-r md:from-black/90 md:via-black/50 md:to-transparent flex items-end md:items-center z-10">
                            <div className="p-6 sm:p-10 md:p-16 w-full max-w-3xl">
                                <AnimatePresence mode="wait">
                                    <motion.div
                                        key={currentIndex}
                                        initial={{ opacity: 0, x: -20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        exit={{ opacity: 0, x: 20 }}
                                        transition={{ duration: 0.5 }}
                                    >
                                        <h2 className="text-white font-display text-3xl sm:text-4xl md:text-6xl font-bold mb-4 drop-shadow-lg leading-tight">
                                            {slides[currentIndex].title.split(" ")[0]} <span className="text-primary-foreground text-yellow-400">{slides[currentIndex].highlight}</span>
                                        </h2>
                                        <p className="text-white/90 text-sm sm:text-lg md:text-xl font-medium leading-relaxed drop-shadow-md max-w-xl border-l-4 border-yellow-400 pl-4 md:pl-6 bg-black/20 backdrop-blur-sm py-2 pr-4 rounded-r-xl">
                                            "{slides[currentIndex].description}"
                                        </p>
                                    </motion.div>
                                </AnimatePresence>
                            </div>
                        </div>

                        {/* Slide Indicators */}
                        <div className="absolute bottom-6 right-6 md:bottom-10 md:right-10 flex gap-2 z-20">
                            {slides.map((_, idx) => (
                                <button
                                    key={idx}
                                    onClick={() => setCurrentIndex(idx)}
                                    className={`h-2 rounded-full transition-all duration-300 ${idx === currentIndex ? 'w-8 bg-yellow-400' : 'w-2 bg-white/50 hover:bg-white'}`}
                                />
                            ))}
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
