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
            {/* Main Feature Card - Static Background, Overlay Content */}
            <div className="relative w-full h-[600px] rounded-3xl overflow-hidden shadow-2xl border border-primary/10 group">
                {/* Static Background Image (No Slide) */}
                <img
                    src={samoeiHostel}
                    alt="Samoei Hostel"
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
                />

                {/* Stronger Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent opacity-90" />

                {/* Content Overlay - Bottom */}
                <div className="absolute bottom-0 left-0 w-full h-full flex flex-col justify-end p-0">
                    <div className="flex flex-col-reverse md:flex-row items-end justify-between w-full px-6 md:px-12 pb-0">
                        {/* Text Content - Left Side */}
                        <div className="relative z-10 pb-8 md:pb-16 text-white max-w-xl md:mr-8 w-full md:w-auto">
                            <div className="flex items-center gap-2 mb-2 text-primary font-bold uppercase tracking-widest text-xs drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">
                                <Calendar className="w-4 h-4" />
                                <span>Official Opening Ceremony</span>
                            </div>
                            <h2 className="font-display text-3xl md:text-5xl font-bold mb-4 leading-tight drop-shadow-[0_4px_4px_rgba(0,0,0,0.8)]">
                                Samoei Hostel
                            </h2>
                            <p className="text-base md:text-lg text-white/95 leading-relaxed mb-6 font-normal drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">
                                "Inaugurated by H.E. President Dr. William Samoei Ruto."
                            </p>

                            {/* High Visibility Name */}
                            <p className="text-lg md:text-xl text-yellow-400 uppercase tracking-wide font-extrabold drop-shadow-[0_4px_4px_rgba(0,0,0,1)] mb-6 leading-snug">
                                H.E. President Dr. William Samoei Ruto, C.G.H.
                            </p>

                            <div className="flex gap-4">
                                <div className="px-4 py-2 bg-primary/20 backdrop-blur-md rounded-lg border border-primary/30 shadow-lg">
                                    <p className="text-primary font-bold text-lg drop-shadow-sm">Capacity</p>
                                    <p className="text-sm text-white/90 font-medium">800+ Students</p>
                                </div>
                                <div className="px-4 py-2 bg-white/5 backdrop-blur-md rounded-lg border border-white/10 shadow-lg">
                                    <p className="text-white font-bold text-lg drop-shadow-sm">Modern</p>
                                    <p className="text-sm text-white/90 font-medium">Amenities</p>
                                </div>
                            </div>
                        </div>

                        {/* President Ruto Transparent Image - Right Side */}
                        <div className="relative z-20 -mb-4 -mr-4 md:mr-0 w-[200px] md:w-[320px] lg:w-[400px] flex-shrink-0 transition-transform duration-500 group-hover:scale-105 origin-bottom-right self-end md:self-end">
                            <img
                                src={presidentRuto}
                                alt="H.E. President Dr. William Samoei Ruto"
                                className="w-full h-auto drop-shadow-2xl brightness-110"
                            />
                        </div>
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
