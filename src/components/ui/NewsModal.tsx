
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";

interface NewsModalProps {
    isOpen: boolean;
    onClose: () => void;
    embedCode: string;
}

export function NewsModal({ isOpen, onClose, embedCode }: NewsModalProps) {
    if (!isOpen) return null;

    // Extract src from iframe string safely if possible, or render as is. 
    // Since the input is trusted (hardcoded config), dangerouslySetInnerHTML is acceptable here for the iframe.

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
                    initial={{ scale: 0.9, y: 20, opacity: 0 }}
                    animate={{ scale: 1, y: 0, opacity: 1 }}
                    exit={{ scale: 0.9, y: 20, opacity: 0 }}
                    className="relative w-full max-w-lg bg-card/95 backdrop-blur-xl border border-white/10 rounded-2xl overflow-hidden shadow-2xl"
                    onClick={(e) => e.stopPropagation()}
                >
                    {/* Header */}
                    <div className="flex items-center justify-between p-4 border-b border-foreground/5">
                        <h3 className="font-display text-lg font-bold">Latest Update</h3>
                        <button
                            onClick={onClose}
                            className="p-2 rounded-full hover:bg-foreground/5 transition-colors"
                        >
                            <X className="w-5 h-5" />
                        </button>
                    </div>

                    {/* Content Container */}
                    <div className="p-4 flex justify-center bg-white/5 min-h-[400px]">
                        <div
                            className="facebook-embed-container overflow-hidden rounded-lg shadow-inner bg-white"
                            dangerouslySetInnerHTML={{ __html: embedCode }}
                        />
                    </div>
                </motion.div>
            </motion.div>
        </AnimatePresence>
    );
}
