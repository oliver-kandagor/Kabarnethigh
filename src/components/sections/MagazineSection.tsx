import { useState } from "react";
import { motion } from "framer-motion";
import { BookOpen, Calendar, ArrowRight, Lock, History, Clock, ZoomIn } from "lucide-react";
import { DisclaimerModal } from "@/components/ui/DisclaimerModal";
import { PDFViewerModal } from "@/components/ui/PDFViewerModal";
import { ComingSoonModal } from "@/components/ui/ComingSoonModal";
import { ImageViewerModal } from "@/components/ui/ImageViewerModal";

// Magazine Assets
import magazinePdf2025 from "@/assets/Site Files/Magazine/kabarnet_magazine.pdf";
import coverImage2025 from "@/assets/About/image.png";

// 1997 Assets (Assuming these imports work based on user request)
import magazinePdf1997 from "@/assets/Magazine/old Kabarnet magazine 19.pdf";
import coverImage1997 from "@/assets/Magazine/image.png";

import schoolLogo from "@/assets/Logos/logo.png";
import { magazineData } from "@/data/magazine-data";
import { getMagazineImageByNumber } from "@/utils/magazine-loader";

interface MagazineInfo {
    year: string;
    title: string;
    subtitle: string;
    description?: string;
    cover?: string;
    pdf?: string;
    edition?: string;
    badge?: string;
    status: "active" | "coming-soon";
}

// Magazine Data Configuration
const magazines: Record<string, MagazineInfo> = {
    "2025": {
        year: "2025/2026",
        title: "The Patriarchs",
        subtitle: "2025/2026 School Magazine",
        description: "A Production of the Kabarnet High School Journalism Club. Featuring student voices, academic achievements, and the holistic development of the Boy Child.",
        cover: coverImage2025,
        pdf: magazinePdf2025,
        edition: "1st Edition",
        badge: "New Release",
        status: "active"
    },
    "1999": {
        year: "1999",
        title: "The Patriarchs",
        subtitle: "Millennium Edition",
        status: "coming-soon"
    },
    "1998": {
        year: "1998",
        title: "The Patriarchs",
        subtitle: "Classic Edition",
        status: "coming-soon"
    },
    "1997": {
        year: "1997",
        title: "The Patriarchs",
        subtitle: "1997 Heritage Edition",
        description: "A journey back in time. Explore the rich history and legacy of Kabarnet High School as captured in the 1997 edition of the school magazine.",
        cover: coverImage1997,
        pdf: magazinePdf1997,
        edition: "Heritage",
        badge: "Classic",
        status: "active"
    }
};

type YearKey = keyof typeof magazines;

export function MagazineSection() {
    const [selectedYear, setSelectedYear] = useState<YearKey>("2025");
    const [showDisclaimer, setShowDisclaimer] = useState(false);
    const [showPDF, setShowPDF] = useState(false);
    const [showComingSoon, setShowComingSoon] = useState(false);
    const [viewAllPages, setViewAllPages] = useState(false);
    const [selectedImage, setSelectedImage] = useState<{ url: string, alt: string, title?: string } | null>(null);

    const currentMagazine = magazines[selectedYear];

    const handleReadClick = () => {
        if (currentMagazine.status === "active") {
            setShowDisclaimer(true);
        } else {
            setShowComingSoon(true);
        }
    };

    const handleYearChange = (year: YearKey) => {
        if (magazines[year].status === "coming-soon") {
            setSelectedYear(year);
        } else {
            setSelectedYear(year);
        }
    };

    const handleConfirm = () => {
        setShowDisclaimer(false);
        setTimeout(() => setShowPDF(true), 300);
    };

    return (
        <section className="py-24 relative overflow-hidden bg-primary/5">
            {/* Background Decor */}
            <div className="absolute top-0 right-0 w-96 h-96 bg-yellow-400/5 rounded-full blur-3xl translate-x-1/2 -translate-y-1/2" />
            <div className="absolute bottom-0 left-0 w-80 h-80 bg-primary/5 rounded-full blur-3xl -translate-x-1/2 translate-y-1/2" />

            <div className="container mx-auto px-4 relative z-10">
                <motion.div
                    key={selectedYear} // Animate on year change
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="flex flex-col md:flex-row items-center gap-12 lg:gap-20"
                >
                    {/* Content */}
                    <div className="flex-1 text-center md:text-left">
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-yellow-500/10 text-yellow-600 text-xs font-semibold uppercase tracking-wider mb-6">
                            <img src={schoolLogo} alt="KHS" className="w-4 h-4 object-contain" />
                            Official School Magazine
                        </div>

                        {/* Year Selector */}
                        <div className="flex flex-wrap justify-center md:justify-start gap-2 mb-6">
                            {(Object.keys(magazines) as YearKey[]).reverse().map((year) => (
                                <button
                                    key={year}
                                    onClick={() => handleYearChange(year)}
                                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${selectedYear === year
                                        ? "bg-primary text-primary-foreground shadow-md"
                                        : "bg-white/50 hover:bg-white text-muted-foreground"
                                        }`}
                                >
                                    {year === "2025" ? "2025/26" : year}
                                </button>
                            ))}
                        </div>

                        <h2 className="font-display text-4xl md:text-5xl font-bold text-foreground mb-6">
                            {currentMagazine.title} <span className="text-primary">{selectedYear === '2025' ? 'Patriarchs' : selectedYear}</span>
                        </h2>

                        <p className="text-muted-foreground text-lg leading-relaxed mb-8 max-w-xl mx-auto md:mx-0 min-h-[5rem]">
                            {currentMagazine.status === 'active'
                                ? currentMagazine.description
                                : `The ${currentMagazine.year} edition is currently being digitized. Check back soon for this archival release.`}
                        </p>

                        <div className="flex flex-wrap gap-6 justify-center md:justify-start text-sm text-foreground/80 mb-10">
                            <div className="flex items-center gap-2">
                                <Calendar className="w-4 h-4 text-primary" />
                                <span>{currentMagazine.year} Edition</span>
                            </div>
                            <div className="flex items-center gap-2">
                                {currentMagazine.status === 'active' ? (
                                    <>
                                        <Lock className="w-4 h-4 text-primary" />
                                        <span>Secure Digital Preview</span>
                                    </>
                                ) : (
                                    <>
                                        <Clock className="w-4 h-4 text-yellow-600" />
                                        <span>Coming Soon</span>
                                    </>
                                )}
                            </div>
                        </div>

                        <button
                            onClick={handleReadClick}
                            className={`inline-flex items-center gap-2 px-8 py-4 rounded-xl font-medium shadow-lg transition-all duration-300 group ${currentMagazine.status === 'active'
                                ? "bg-primary text-primary-foreground hover:bg-primary/90 hover:shadow-xl hover:-translate-y-1"
                                : "bg-muted text-muted-foreground cursor-not-allowed"
                                }`}
                        >
                            <span>{currentMagazine.status === 'active' ? 'Read Magazine' : 'Coming Soon'}</span>
                            {currentMagazine.status === 'active' && <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />}
                        </button>
                    </div>

                    {/* Preview Card */}
                    {currentMagazine.status === 'active' && currentMagazine.cover ? (
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9, rotate: 2 }}
                            animate={{ opacity: 1, scale: 1, rotate: 0 }}
                            key={`active-${selectedYear}`}
                            transition={{ duration: 0.5 }}
                            className="flex-1 w-full max-w-md relative group cursor-pointer"
                            onClick={handleReadClick}
                        >
                            {/* Glow Effect */}
                            <div className="absolute -inset-4 bg-yellow-400/20 blur-xl rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                            <div className="relative aspect-[3/4] rounded-2xl overflow-hidden shadow-2xl border-4 border-white transform transition-transform duration-500 group-hover:-translate-y-2 group-hover:rotate-1">
                                {/* Cover Image */}
                                <img
                                    src={currentMagazine.cover}
                                    alt="Magazine Cover"
                                    className="w-full h-full object-cover"
                                />

                                {/* Overlay Gradient */}
                                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-80" />

                                {/* Card Content */}
                                <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
                                    <p className="text-yellow-400 font-display font-bold text-xl mb-1">{currentMagazine.edition}</p>
                                    <h3 className="text-3xl font-bold mb-2">{currentMagazine.title}</h3>
                                    <p className="text-white/80 text-sm line-clamp-2">{currentMagazine.subtitle}</p>
                                </div>

                                {/* Shine Effect */}
                                <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/20 to-transparent translate-x-[-200%] group-hover:animate-shimmer" />
                            </div>

                            {/* Floating Badge */}
                            <div className="absolute -top-6 -right-6 bg-yellow-500 text-white w-20 h-20 rounded-full flex items-center justify-center font-bold shadow-lg transform rotate-12 group-hover:scale-110 transition-transform">
                                <div className="text-center text-xs leading-tight">
                                    <span className="block text-lg">{selectedYear === '1997' ? 'Old' : 'New'}</span>
                                    {selectedYear === '1997' ? 'Heritage' : 'Release'}
                                </div>
                            </div>
                        </motion.div>
                    ) : (
                        // Placeholder for 'Coming Soon'
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            key={`inactive-${selectedYear}`}
                            className="flex-1 w-full max-w-md aspect-[3/4] bg-muted/30 rounded-2xl border-2 border-dashed border-muted-foreground/20 flex flex-col items-center justify-center text-muted-foreground gap-4"
                        >
                            <History className="w-16 h-16 opacity-50" />
                            <p className="font-medium">Digitizing {selectedYear} Archive...</p>
                        </motion.div>
                    )}
                </motion.div>
            </div >

            {/* Modals */}
            <DisclaimerModal
                isOpen={showDisclaimer}
                onClose={() => setShowDisclaimer(false)}
                onConfirm={handleConfirm}
            />

            <PDFViewerModal
                isOpen={showPDF}
                onClose={() => setShowPDF(false)}
                pdfUrl={currentMagazine.status === 'active' ? (currentMagazine.pdf || "") : ""}
                title={currentMagazine.status === 'active' ? currentMagazine.subtitle : ""}
            />

            <ComingSoonModal
                isOpen={showComingSoon}
                onClose={() => setShowComingSoon(false)}
                title={`${selectedYear} Edition`}
                message={`The ${selectedYear} edition of The Patriarchs is currently being digitized and will be available soon in our secure archive.`}
            />

            {/* --- NEW: Digital Archive Preview --- */}


            {/* Image Viewer Modal */}
            <ImageViewerModal
                isOpen={!!selectedImage}
                onClose={() => setSelectedImage(null)}
                imageUrl={selectedImage?.url || ""}
                altText={selectedImage?.alt}
                title={selectedImage?.title}
            />

        </section >
    );
}

