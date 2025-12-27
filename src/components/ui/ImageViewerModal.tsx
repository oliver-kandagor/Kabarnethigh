import { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ZoomIn, Download, ExternalLink } from "lucide-react";

interface ImageViewerModalProps {
    isOpen: boolean;
    onClose: () => void;
    imageUrl: string;
    altText?: string;
    title?: string;
}

export function ImageViewerModal({ isOpen, onClose, imageUrl, altText, title }: ImageViewerModalProps) {
    // Prevent body scroll when modal is open
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "unset";
        }
        return () => {
            document.body.style.overflow = "unset";
        };
    }, [isOpen]);

    // Handle escape key
    useEffect(() => {
        const handleEsc = (e: KeyboardEvent) => {
            if (e.key === "Escape") onClose();
        };
        window.addEventListener("keydown", handleEsc);
        return () => window.removeEventListener("keydown", handleEsc);
    }, [onClose]);

    if (!isOpen) return null;

    return (
        <AnimatePresence>
            <div className="fixed inset-0 z-[100] flex items-center justify-center">
                {/* Backdrop */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onClick={onClose}
                    className="absolute inset-0 bg-black/80 backdrop-blur-md"
                />

                {/* Modal Content - Glass Effect */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.95, y: 20 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95, y: 20 }}
                    transition={{ type: "spring", damping: 25, stiffness: 300 }}
                    className="relative w-full h-full md:w-auto md:h-auto md:max-w-6xl md:max-h-[90vh] flex flex-col md:rounded-3xl overflow-hidden bg-white/10 backdrop-blur-2xl border border-white/10 shadow-2xl mx-0 md:mx-4"
                >

                    {/* Header */}
                    <div className="absolute top-0 left-0 right-0 z-20 flex items-center justify-between p-4 md:p-6 bg-gradient-to-b from-black/60 to-transparent">
                        <div className="flex items-center gap-3">
                            {title && <h3 className="text-white font-display font-bold text-lg hidden md:block">{title}</h3>}
                        </div>
                        <button
                            onClick={onClose}
                            className="p-2 rounded-full bg-black/20 hover:bg-white/20 text-white backdrop-blur-md transition-all border border-white/10 hover:rotate-90 duration-300"
                        >
                            <X className="w-6 h-6" />
                        </button>
                    </div>

                    {/* Image Container */}
                    <div className="flex-1 flex items-center justify-center p-0 md:p-2 bg-black/20 w-fit mx-auto h-full">
                        <img
                            src={imageUrl}
                            alt={altText || "Full screen view"}
                            className="w-full h-full md:w-auto md:h-auto md:max-h-[85vh] md:max-w-full object-contain md:rounded-xl shadow-2xl"
                        />
                    </div>

                    {/* Mobile Footer / Metadata (Optional) */}
                    {title && (
                        <div className="md:hidden absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 to-transparent z-10">
                            <p className="text-white font-medium">{title}</p>
                        </div>
                    )}

                </motion.div>
            </div>
        </AnimatePresence>
    );
}
