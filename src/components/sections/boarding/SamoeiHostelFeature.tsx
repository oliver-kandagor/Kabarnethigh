import { ArrowRight, Calendar, ZoomIn } from "lucide-react";
import samoeiHostel from "@/assets/Site Files/samoei-hostel.jpg";
import presidentRuto from "@/assets/PresidentRuto.png";
import { useState } from "react";
import { createPortal } from "react-dom";
import { ImageViewerModal } from "@/components/ui/ImageViewerModal";

// Load Kipla Photos dynamically
const kiplaPhotos = import.meta.glob('/src/assets/Site Files/Kipla/*.{jpg,jpeg,png,JPG}', { eager: true, import: 'default' });
const openingCeremonyImages = Object.values(kiplaPhotos) as string[];

export function SamoeiHostelFeature() {
    const [selectedImage, setSelectedImage] = useState<string | null>(null);
    const [isViewerOpen, setIsViewerOpen] = useState(false);

    return (
        <section className="my-16 space-y-8">
            {/* Main Feature Card - Responsive Layout */}
            <div className="relative w-full h-[450px] md:h-[600px] rounded-3xl overflow-hidden shadow-2xl border border-primary/10 group flex flex-col justify-end">
                {/* Static Background Image */}
                <img
                    src={samoeiHostel}
                    alt="Samoei Hostel"
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
                />

                {/* Stronger Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent opacity-90" />

                {/* Content Container */}
                <div className="relative z-10 w-full p-5 md:p-12 flex flex-col md:flex-row md:items-end justify-between gap-4 md:gap-8">

                    {/* Text Content */}
                    <div className="w-full md:max-w-xl text-white pb-2 md:pb-8">
                        <div className="flex items-center gap-2 mb-2 md:mb-3 text-primary font-bold uppercase tracking-widest text-[10px] md:text-sm drop-shadow-md">
                            <Calendar className="w-3 h-3 md:w-4 md:h-4" />
                            <span>Official Opening Ceremony</span>
                        </div>

                        <h2 className="font-display text-2xl md:text-5xl font-bold mb-2 md:mb-3 leading-tight drop-shadow-lg">
                            Samoei Hostel
                        </h2>

                        <p className="text-sm md:text-lg text-white/90 leading-relaxed mb-3 md:mb-6 font-medium drop-shadow-md line-clamp-2 md:line-clamp-none">
                            "Inaugurated by H.E. President Dr. William Samoei Ruto."
                        </p>

                        {/* High Visibility Name */}
                        <div className="bg-black/20 backdrop-blur-sm rounded-xl p-3 md:p-4 border-l-4 border-yellow-400 mb-4 md:mb-6 w-fit">
                            <p className="text-xs md:text-xl text-yellow-400 uppercase tracking-wide font-extrabold drop-shadow-lg leading-snug">
                                H.E. President Dr. William Samoei Ruto, C.G.H.
                            </p>
                        </div>

                        <div className="flex flex-wrap gap-2 md:gap-3">
                            <div className="px-2 md:px-3 py-1.5 md:py-2 bg-primary/20 backdrop-blur-md rounded-lg border border-primary/30 shadow-lg flex-1 md:flex-none text-center md:text-left min-w-[80px]">
                                <p className="text-primary font-bold text-sm md:text-lg drop-shadow-sm">800+</p>
                                <p className="text-[9px] md:text-xs text-white/80 font-medium uppercase">Students</p>
                            </div>
                            <div className="px-2 md:px-3 py-1.5 md:py-2 bg-white/5 backdrop-blur-md rounded-lg border border-white/10 shadow-lg flex-1 md:flex-none text-center md:text-left min-w-[80px]">
                                <p className="text-white font-bold text-sm md:text-lg drop-shadow-sm">Modern</p>
                                <p className="text-[9px] md:text-xs text-white/80 font-medium uppercase">Amenities</p>
                            </div>
                        </div>
                    </div>

                    {/* President Ruto Image - Bottom Right on Mobile */}
                    <div className="relative w-32 md:w-[320px] lg:w-[400px] flex-shrink-0 self-end -mb-0 md:-mb-12 md:-mr-4 transition-transform duration-500 group-hover:scale-105">
                        <img
                            src={presidentRuto}
                            alt="H.E. President Dr. William Samoei Ruto"
                            className="w-full h-auto drop-shadow-2xl brightness-110 object-contain"
                        />
                    </div>
                </div>
            </div>

            {/* Scrolling Marquee (Retained as requested) */}
            <div className="relative">
                <div className="flex items-center justify-between mb-4 px-2">
                    <h3 className="font-display text-xl font-bold">Grand Opening Highlights</h3>
                    <a href="/gallery?collection=samoei" className="flex items-center gap-1 text-sm font-medium text-primary hover:text-secondary transition-colors">
                        View Full Gallery <ArrowRight className="w-4 h-4" />
                    </a>
                </div>

                <div className="flex overflow-hidden gap-4 mask-linear-fade py-2">
                    <div
                        className="flex gap-4 animate-marquee hover:pause"
                        style={{ animationDirection: 'reverse' }}
                    >
                        {openingCeremonyImages.slice(0, 15).map((img, idx) => (
                            <div
                                key={idx}
                                className="w-64 h-40 flex-shrink-0 rounded-lg overflow-hidden shadow-md cursor-pointer group relative"
                                onClick={() => { setSelectedImage(img); setIsViewerOpen(true); }}
                            >
                                <img src={img} alt="Opening Ceremony" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" loading="lazy" />
                                <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center backdrop-blur-sm">
                                    <ZoomIn className="w-8 h-8 text-white drop-shadow-lg" />
                                </div>
                            </div>
                        ))}
                    </div>
                    {/* Duplicated for seamless loop */}
                    <div
                        className="flex gap-4 animate-marquee hover:pause"
                        aria-hidden="true"
                        style={{ animationDirection: 'reverse' }}
                    >
                        {openingCeremonyImages.slice(0, 15).map((img, idx) => (
                            <div
                                key={`dup-${idx}`}
                                className="w-64 h-40 flex-shrink-0 rounded-lg overflow-hidden shadow-md cursor-pointer group relative"
                                onClick={() => { setSelectedImage(img); setIsViewerOpen(true); }}
                            >
                                <img src={img} alt="Opening Ceremony" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" loading="lazy" />
                                <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center backdrop-blur-sm">
                                    <ZoomIn className="w-8 h-8 text-white drop-shadow-lg" />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Image Viewer Portal */}
            {createPortal(
                <ImageViewerModal
                    isOpen={isViewerOpen}
                    onClose={() => setIsViewerOpen(false)}
                    imageUrl={selectedImage || ""}
                    title="Samoei Hostel Opening Ceremony"
                    altText="Opening Ceremony Highlight"
                />,
                document.body
            )}
        </section>
    );
}
