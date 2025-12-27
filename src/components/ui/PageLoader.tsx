
import { motion } from "framer-motion";
import schoolLogo from "@/assets/Logos/logo.png";

export function PageLoader() {
    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/20 backdrop-blur-xl">
            <div className="relative flex flex-col items-center gap-8">
                {/* Glow Effect */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-school-green/20 blur-3xl rounded-full w-48 h-48 pointer-events-none" />

                {/* Logo - No Background */}
                <div className="relative">
                    <motion.img
                        src={schoolLogo}
                        alt="Loading..."
                        className="w-24 h-24 object-contain"
                        animate={{ scale: [1, 1.05, 1], opacity: [0.9, 1, 0.9] }}
                        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                    />
                </div>

                {/* Custom CSS Loader */}
                <div className="loader"></div>
            </div>
        </div>
    );
}
