
import { motion, useScroll, useTransform } from "framer-motion";
import img from "@/assets/optimized/DJI_0028.jpg";

export function BackgroundSlideshow() {
    const { scrollY } = useScroll();
    const y = useTransform(scrollY, [0, 1000], [0, 200]); // Parallax effect
    const opacity = useTransform(scrollY, [0, 500], [1, 0.5]); // Gentle fade on scroll

    return (
        <div className="fixed inset-0 z-[-1] overflow-hidden pointer-events-none bg-white">
            <motion.div
                initial={{ opacity: 0, scale: 1.1 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1.5, ease: "easeOut" }}
                style={{ y, opacity }} // Apply scroll animations
                className="absolute inset-0"
            >
                <img
                    src={img}
                    alt="School Background"
                    className="w-full h-full object-cover opacity-40 blur-[4px] scale-105"
                />
                {/* Reduced overlay to make images more visible */}
                <div className="absolute inset-0 bg-white/40" />
            </motion.div>
        </div>
    );
}
