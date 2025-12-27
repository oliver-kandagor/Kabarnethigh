
import { motion, AnimatePresence } from "framer-motion";
import { AlertTriangle, X, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import schoolLogo from "@/assets/Logos/logo.png";

interface DisclaimerModalProps {
    isOpen: boolean;
    onClose: () => void;
    onConfirm: () => void;
}

export function DisclaimerModal({ isOpen, onClose, onConfirm }: DisclaimerModalProps) {
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
                    initial={{ scale: 0.9, y: 20, opacity: 0 }}
                    animate={{ scale: 1, y: 0, opacity: 1 }}
                    exit={{ scale: 0.9, y: 20, opacity: 0 }}
                    className="relative w-full max-w-md bg-card gradient-border p-px rounded-2xl overflow-hidden shadow-2xl"
                    onClick={(e) => e.stopPropagation()}
                >
                    <div className="bg-background/95 backdrop-blur-3xl p-6 md:p-8 rounded-2xl h-full flex flex-col items-center text-center relative">
                        <button
                            onClick={onClose}
                            className="absolute top-4 right-4 p-2 text-muted-foreground hover:text-foreground transition-colors"
                        >
                            <X className="w-5 h-5" />
                        </button>

                        <div className="w-20 h-20 rounded-full bg-white flex items-center justify-center mb-6 shadow-lg border-2 border-yellow-500/20">
                            <img src={schoolLogo} alt="KHS Logo" className="w-12 h-12 object-contain" />
                        </div>

                        <h3 className="font-display text-2xl font-bold mb-3 text-foreground">Content Preview Warning</h3>

                        <div className="space-y-4 text-muted-foreground mb-8 text-sm leading-relaxed">
                            <p>
                                This is a digital magazine preview for <span className="text-foreground font-semibold">Kabarnet High School</span>.
                            </p>
                            <div className="bg-secondary/10 p-4 rounded-lg border border-secondary/20 text-secondary text-xs text-left space-y-2">
                                <p className="font-semibold flex items-center gap-2">
                                    <AlertTriangle className="w-4 h-4" /> Reading Guidelines:
                                </p>
                                <ul className="list-disc pl-4 space-y-1 opacity-90">
                                    <li>This digital copy is for online reading.</li>
                                    <li>School policy restricts downloading or printing.</li>
                                    <li>Enjoy the content directly in our secure viewer.</li>
                                </ul>
                            </div>
                            <p className="text-xs">
                                Need a physical copy? Contact <a href="mailto:info@kabarnethigh.sc.ke" className="text-primary hover:underline">info@kabarnethigh.sc.ke</a>
                            </p>
                        </div>

                        <div className="flex gap-3 w-full">
                            <Button variant="outline" className="flex-1" onClick={onClose}>
                                Cancel
                            </Button>
                            <Button className="flex-1 bg-yellow-500 hover:bg-yellow-600 text-black font-medium" onClick={onConfirm}>
                                Continue to Preview
                            </Button>
                        </div>
                    </div>
                    {/* Golden Border Effect */}
                    <div className="absolute inset-0 border border-yellow-500/30 rounded-2xl pointer-events-none" />
                </motion.div>
            </motion.div>
        </AnimatePresence>
    );
}
