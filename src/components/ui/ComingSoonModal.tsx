
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import schoolLogo from "@/assets/Logos/logo.png";

interface ComingSoonModalProps {
    isOpen: boolean;
    onClose: () => void;
    title?: string;
    message?: string;
}

export function ComingSoonModal({ isOpen, onClose, title = "Coming Soon", message = "This feature is currently under development. Stay tuned!" }: ComingSoonModalProps) {
    if (!isOpen) return null;

    return (
        <AnimatePresence>
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 z-[60] flex items-center justify-center bg-black/80 backdrop-blur-sm p-4"
                onClick={onClose}
            >
                <motion.div
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0.9, opacity: 0 }}
                    className="relative w-full max-w-sm bg-card border border-border rounded-2xl p-8 text-center shadow-2xl"
                    onClick={(e) => e.stopPropagation()}
                >
                    <button
                        onClick={onClose}
                        className="absolute top-4 right-4 p-2 rounded-full hover:bg-muted transition-colors"
                    >
                        <X className="w-5 h-5 text-muted-foreground" />
                    </button>

                    <div className="flex flex-col items-center gap-6">
                        <div className="w-24 h-24 relative">
                            <div className="absolute inset-0 bg-primary/20 rounded-full blur-xl animate-pulse" />
                            <img src={schoolLogo} alt="KHS Logo" className="relative w-full h-full object-contain" />
                        </div>

                        <div className="space-y-2">
                            <h3 className="font-display text-2xl font-bold">{title}</h3>
                            <p className="text-muted-foreground text-sm">
                                {message}
                            </p>
                        </div>

                        <button
                            onClick={onClose}
                            className="w-full py-2.5 bg-primary text-primary-foreground rounded-lg font-medium hover:bg-primary/90 transition-colors"
                        >
                            Got it
                        </button>
                    </div>
                </motion.div>
            </motion.div>
        </AnimatePresence>
    );
}
