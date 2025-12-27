
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import frontNote from "@/assets/Logos/10ksh note.jpg";
import backNote from "@/assets/Logos/10shnote_back.jpg";
import { Sparkles } from "lucide-react";

export function HeritageCard() {
    const [isFlipped, setIsFlipped] = useState(false);

    return (
        <div
            className="perspective-1000 w-full cursor-pointer group"
            onClick={() => setIsFlipped(!isFlipped)}
        >
            <div className="relative w-full aspect-[2/1] transition-transform duration-700 transform-style-3d"
                style={{ transform: isFlipped ? "rotateY(180deg)" : "rotateY(0deg)" }}>

                {/* Front Side */}
                <div className="absolute inset-0 w-full h-full backface-hidden rounded-lg overflow-hidden border-2 border-yellow-400/50 shadow-[0_0_15px_rgba(250,204,21,0.3)] bg-white">
                    <img
                        src={frontNote}
                        alt="10 Ksh Note Front"
                        className="w-full h-full object-cover"
                    />
                    {/* Shine Effect */}
                    <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/40 to-transparent translate-x-[-100%] animate-shimmer" />
                </div>

                {/* Back Side */}
                <div className="absolute inset-0 w-full h-full backface-hidden rounded-lg overflow-hidden border-2 border-yellow-400/50 shadow-[0_0_15px_rgba(250,204,21,0.3)] bg-white"
                    style={{ transform: "rotateY(180deg)" }}>
                    <img
                        src={backNote}
                        alt="10 Ksh Note Back"
                        className="w-full h-full object-cover"
                    />
                    {/* Shine Effect */}
                    <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/40 to-transparent translate-x-[-100%] animate-shimmer" />
                </div>
            </div>

            <div className="mt-4 flex items-center justify-between">
                <div>
                    <p className="text-xs text-primary-foreground/60 mb-1">National Heritage</p>
                    <p className="text-sm text-primary-foreground/90 font-medium">
                        Feature on 10 Shilling Note
                    </p>
                </div>
                <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                >
                    <Sparkles className="w-5 h-5 text-yellow-400" />
                </motion.div>
            </div>
            <p className="text-xs text-yellow-400/80 mt-2 italic flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                Click to flip
            </p>
        </div>
    );
}
