
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Document, Page, pdfjs } from "react-pdf";
import { X, ChevronLeft, ChevronRight, Maximize2, Minimize2, ZoomIn, ZoomOut } from "lucide-react";
import schoolLogo from "@/assets/Logos/logo.png";
import "react-pdf/dist/Page/AnnotationLayer.css";
import "react-pdf/dist/Page/TextLayer.css";

// Configure PDF worker
pdfjs.GlobalWorkerOptions.workerSrc = new URL(
    'pdfjs-dist/build/pdf.worker.min.mjs',
    import.meta.url,
).toString();

interface PDFViewerModalProps {
    isOpen: boolean;
    onClose: () => void;
    pdfUrl: string;
    title?: string;
    subtitle?: string;
}

export function PDFViewerModal({ isOpen, onClose, pdfUrl, title = "The Patriarchs", subtitle = "Digital Library" }: PDFViewerModalProps) {
    const [numPages, setNumPages] = useState<number>(0);
    const [pageNumber, setPageNumber] = useState<number>(1);
    const [scale, setScale] = useState<number>(1.0);
    const [direction, setDirection] = useState<number>(0); // -1 for left, 1 for right
    const [isFullscreen, setIsFullscreen] = useState<boolean>(false);
    const [isReadingMode, setIsReadingMode] = useState<boolean>(false);

    // Security: Block context menu
    useEffect(() => {
        const handleContextMenu = (e: MouseEvent) => {
            e.preventDefault();
        };
        if (isOpen) {
            document.addEventListener("contextmenu", handleContextMenu);
        }
        return () => {
            document.removeEventListener("contextmenu", handleContextMenu);
        };
    }, [isOpen]);

    // Handle document load success
    function onDocumentLoadSuccess({ numPages }: { numPages: number }) {
        setNumPages(numPages);
    }

    // Navigation
    const goToPrevPage = () => {
        setDirection(-1);
        setPageNumber((prev) => Math.max(prev - 1, 1));
    };
    const goToNextPage = () => {
        setDirection(1);
        setPageNumber((prev) => Math.min(prev + 1, numPages));
    };

    // Fullscreen toggle
    const toggleFullscreen = () => {
        if (!document.fullscreenElement) {
            document.documentElement.requestFullscreen();
            setIsFullscreen(true);
        } else {
            if (document.exitFullscreen) {
                document.exitFullscreen();
                setIsFullscreen(false);
            }
        }
    };

    if (!isOpen) return null;

    return (
        <AnimatePresence>
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-md p-4"
            >
                <motion.div
                    initial={{ scale: 0.95, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0.95, opacity: 0 }}
                    className={`relative w-full ${isFullscreen ? 'h-full max-w-none' : 'max-w-6xl h-[90vh]'} bg-white/10 backdrop-blur-xl border border-yellow-400/30 rounded-2xl shadow-2xl flex flex-col overflow-hidden transition-all duration-300`}
                >
                    {/* Header */}
                    <div className="flex items-center justify-between p-4 border-b border-white/10 bg-black/20">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center border border-white/20 p-1">
                                <img src={schoolLogo} alt="KHS" className="w-full h-full object-contain" />
                            </div>
                            <div>
                                <h3 className="text-white font-display font-medium text-sm md:text-base">{title}</h3>
                                <p className="text-white/50 text-xs">{subtitle}</p>
                            </div>
                        </div>

                        <div className="flex items-center gap-2">
                            <button onClick={toggleFullscreen} className="p-2 rounded-full hover:bg-white/10 text-white/80 transition-colors hidden md:block" title="Toggle Fullscreen">
                                {isFullscreen ? <Minimize2 className="w-5 h-5" /> : <Maximize2 className="w-5 h-5" />}
                            </button>
                            <button onClick={onClose} className="p-2 rounded-full hover:bg-red-500/20 text-white hover:text-red-400 transition-colors" title="Close">
                                <X className="w-6 h-6" />
                            </button>
                        </div>
                    </div>

                    {/* Toolbar */}
                    <div className="flex items-center justify-center gap-4 p-2 bg-black/10 border-b border-white/5">
                        <div className="flex items-center gap-2 bg-black/20 rounded-lg p-1">
                            <button onClick={() => setScale(s => Math.max(0.5, s - 0.1))} className="p-1.5 rounded-md hover:bg-white/10 text-white/80"><ZoomOut className="w-4 h-4" /></button>
                            <span className="text-xs text-white/60 min-w-[3rem] text-center">{Math.round(scale * 100)}%</span>
                            <button onClick={() => setScale(s => Math.min(2.0, s + 0.1))} className="p-1.5 rounded-md hover:bg-white/10 text-white/80"><ZoomIn className="w-4 h-4" /></button>
                        </div>
                        <div className="h-6 w-px bg-white/10" />
                        <div className="flex items-center gap-2">
                            <button onClick={goToPrevPage} disabled={pageNumber <= 1} className="p-1.5 rounded-full hover:bg-white/10 text-white disabled:opacity-30"><ChevronLeft className="w-5 h-5" /></button>
                            <span className="text-sm text-white font-medium">Page {pageNumber} of {numPages || '--'}</span>
                            <button onClick={goToNextPage} disabled={pageNumber >= numPages} className="p-1.5 rounded-full hover:bg-white/10 text-white disabled:opacity-30"><ChevronRight className="w-5 h-5" /></button>
                        </div>
                    </div>

                    {/* Main Viewer Area */}
                    <div className={`flex-1 overflow-auto flex items-center justify-center p-4 md:p-8 relative ${isReadingMode ? 'bg-[#1a1a1a]' : 'bg-transparent'}`}
                        onContextMenu={(e) => e.preventDefault()}
                    >
                        {/* PDF Document */}
                        <div className="relative shadow-2xl rounded-sm overflow-hidden select-none touch-none perspective-1000">
                            <Document
                                file={pdfUrl}
                                onLoadSuccess={onDocumentLoadSuccess}
                                loading={
                                    <div className="flex flex-col items-center gap-4">
                                        <div className="w-12 h-12 border-4 border-yellow-400 border-t-transparent rounded-full animate-spin" />
                                        <p className="text-white/60 text-sm animate-pulse">Loading Secure Document...</p>
                                    </div>
                                }
                                error={
                                    <div className="text-red-400 text-sm bg-red-400/10 p-4 rounded-lg border border-red-400/20">
                                        Failed to load document. Please try again.
                                    </div>
                                }
                            >
                                <AnimatePresence mode="popLayout" initial={false} custom={direction}>
                                    <motion.div
                                        key={pageNumber}
                                        custom={direction}
                                        variants={{
                                            enter: (direction: number) => ({
                                                rotateY: direction > 0 ? 90 : -90,
                                                opacity: 0,
                                                transformOrigin: direction > 0 ? "right center" : "left center",
                                            }),
                                            center: {
                                                rotateY: 0,
                                                opacity: 1,
                                                transformOrigin: "center center",
                                                transition: {
                                                    duration: 0.4,
                                                    ease: "easeOut"
                                                }
                                            },
                                            exit: (direction: number) => ({
                                                rotateY: direction > 0 ? -90 : 90,
                                                opacity: 0,
                                                transformOrigin: direction > 0 ? "left center" : "right center",
                                                transition: {
                                                    duration: 0.4,
                                                    ease: "easeIn"
                                                }
                                            })
                                        }}
                                        initial="enter"
                                        animate="center"
                                        exit="exit"
                                        className="backface-hidden bg-white"
                                    >
                                        <Page
                                            pageNumber={pageNumber}
                                            scale={scale}
                                            renderTextLayer={false}
                                            renderAnnotationLayer={false}
                                            className="shadow-[0_0_50px_rgba(0,0,0,0.5)]"
                                        />
                                    </motion.div>
                                </AnimatePresence>
                            </Document>

                            {/* Security Overlay (Blocks interactions like save/drag) */}
                            <div className="absolute inset-0 z-10 bg-transparent" />

                            {/* Watermark */}

                        </div>
                    </div>

                    {/* Footer */}
                    <div className="p-3 border-t border-white/10 bg-black/20 flex justify-between items-center text-xs text-white/40">
                        <span>Digital Edition</span>
                        <span>Kabarnet High School © {new Date().getFullYear()}</span>
                    </div>

                </motion.div>
            </motion.div>
        </AnimatePresence>
    );
}
