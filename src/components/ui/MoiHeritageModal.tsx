import { motion, AnimatePresence } from "framer-motion";
import { X, Quote, History, Award } from "lucide-react";
import schoolLogo from "@/assets/Logos/logo.png";
import moiImage from "@/assets/About/Daniel_moi.png";

interface MoiHeritageModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export function MoiHeritageModal({ isOpen, onClose }: MoiHeritageModalProps) {
    if (!isOpen) return null;

    return (
        <AnimatePresence>
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                {/* Backdrop */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onClick={onClose}
                    className="absolute inset-0 bg-black/80 backdrop-blur-sm"
                />

                {/* Modal Content */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.95, y: 20 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95, y: 20 }}
                    className="relative w-full max-w-2xl bg-card rounded-2xl overflow-hidden shadow-2xl border border-primary/20"
                >
                    {/* Close Button */}
                    <button
                        onClick={onClose}
                        className="absolute top-4 right-4 z-10 p-2 rounded-full bg-black/20 hover:bg-black/40 text-white transition-colors"
                    >
                        <X className="w-5 h-5" />
                    </button>

                    {/* Header Image Section */}
                    <div className="relative h-48 bg-primary overflow-hidden">
                        <div className="absolute inset-0 bg-gradient-to-r from-primary via-primary/80 to-secondary/30" />

                        {/* Decorative Patterns */}
                        <div className="absolute inset-0 opacity-10"
                            style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)', backgroundSize: '20px 20px' }}>
                        </div>

                        <div className="absolute bottom-0 left-0 right-0 p-8 flex items-end justify-between">
                            <div className="flex items-center gap-4">
                                <img src={schoolLogo} alt="School Logo" className="w-16 h-16 object-contain bg-white/10 rounded-full p-2 backdrop-blur-md" />
                                <div>
                                    <p className="text-secondary font-display font-medium text-sm tracking-wider uppercase mb-1">Our Heritage</p>
                                    <h2 className="text-3xl font-bold text-white font-display">H.E. Daniel arap Moi</h2>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Scrollable Content */}
                    <div className="p-8 max-h-[60vh] overflow-y-auto">
                        <div className="flex flex-col md:flex-row gap-8">
                            {/* Left Column: Image & Quick Facts */}
                            <div className="w-full md:w-1/3 flex flex-col gap-4">
                                <div className="aspect-[3/4] rounded-xl overflow-hidden shadow-lg border-2 border-primary/10">
                                    <img src={moiImage} alt="Daniel arap Moi" className="w-full h-full object-cover" />
                                </div>

                                <div className="bg-muted/50 rounded-lg p-4 space-y-3">
                                    <div className="flex items-start gap-3">
                                        <History className="w-5 h-5 text-secondary flex-shrink-0 mt-0.5" />
                                        <div>
                                            <p className="text-xs text-muted-foreground uppercase font-semibold">Role</p>
                                            <p className="text-sm font-medium text-foreground">Head Teacher & Board Chairman</p>
                                        </div>
                                    </div>
                                    <div className="flex items-start gap-3">
                                        <Award className="w-5 h-5 text-secondary flex-shrink-0 mt-0.5" />
                                        <div>
                                            <p className="text-xs text-muted-foreground uppercase font-semibold">Service</p>
                                            <p className="text-sm font-medium text-foreground">Second President of Kenya</p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Right Column: Detailed Text */}
                            <div className="w-full md:w-2/3 space-y-6 text-foreground/80 leading-relaxed">
                                <p className="text-lg font-medium text-foreground">
                                    "Education is the key to success."
                                </p>

                                <p>
                                    His Excellency Daniel Toroitich arap Moi, the second President of the Republic of Kenya, holds a special place in the history of Kabarnet High School. Before ascending to the highest office in the land, he served with distinction as a teacher and later as the <strong>Head Teacher</strong> of the Kabarnet African Government School, the precursor to our modern institution.
                                </p>

                                <p>
                                    His passion for education and development did not stop at the classroom door. He served as the <strong>Chairman of the Board of Management</strong>, where his visionary leadership laid the foundation for the school's expansion and academic excellence.
                                </p>

                                <p>
                                    As a statesman, he continued to support the school, ensuring it became a center of excellence that would mold future leaders. His legacy lives on in the values of discipline, hard work, and service that Kabarnet High School continues to uphold today.
                                </p>

                                <div className="flex items-center gap-2 text-primary/80 italic text-sm mt-4 pt-4 border-t border-border">
                                    <Quote className="w-4 h-4" />
                                    <span>A giant on whose shoulders we stand.</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </motion.div>
            </div>
        </AnimatePresence>
    );
}
