import { Quote } from "lucide-react";

// Asset imports
import danielMoi from "@/assets/About/Daniel_moi.png";
import moiFront from "@/assets/Site Files/Moi_hostel_Front_view.JPG";

export function MoiHostelFeature() {
    return (
        <section className="relative w-full h-[600px] rounded-3xl overflow-hidden shadow-2xl border border-border/50 my-16 group">
            {/* Static Background Image */}
            <img
                src={moiFront}
                alt="Moi Hostel View"
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
            />

            {/* Stronger Gradient for Readability */}
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent opacity-90" />

            {/* Content Overlay - Bottom */}
            <div className="absolute bottom-0 left-0 w-full h-full flex flex-col justify-end p-0">
                {/* Mobile: Stacked, Desktop: Side-by-Side */}
                <div className="flex flex-col md:flex-row items-end justify-between w-full px-6 md:px-12 pb-0">

                    {/* Text Content */}
                    <div className="relative z-10 pb-4 md:pb-12 text-white max-w-xl md:mr-6 w-full md:w-auto text-left">
                        <div className="flex items-center gap-2 mb-2 text-yellow-400 font-display font-medium uppercase tracking-widest text-sm drop-shadow-md">
                            <Quote className="w-4 h-4" />
                            <span>A Presidential Legacy</span>
                        </div>
                        <h3 className="font-display text-3xl md:text-5xl font-bold mb-2 md:mb-4 leading-tight drop-shadow-lg text-white">
                            Moi Hostel
                        </h3>
                        <p className="text-sm md:text-xl text-white/95 leading-relaxed font-normal shadow-black drop-shadow-md mb-3 hidden md:block">
                            "Gifted by H.E. President Daniel Toroitich arap Moi to show his unwavering love for Kabarnet High School."
                        </p>
                        {/* Mobile optimized text */}
                        <p className="text-sm text-white/95 leading-relaxed font-normal shadow-black drop-shadow-md mb-2 md:hidden">
                            "Gifted by H.E. President Daniel Toroitich arap Moi."
                        </p>

                        <div className="space-y-1">
                            <p className="text-sm md:text-base text-yellow-200/90 uppercase tracking-widest font-semibold drop-shadow-md">
                                H.E. President Daniel Toroitich arap Moi, C.G.H.
                            </p>
                            <p className="text-[10px] md:text-xs text-white/80 uppercase tracking-widest font-medium drop-shadow-md">
                                Second President of the Republic of Kenya
                            </p>
                        </div>
                    </div>

                    {/* President Moi Overlay Image */}
                    <div className="relative z-20 -mb-0 -mr-4 md:mr-0 w-[240px] md:w-[340px] flex-shrink-0 transition-transform duration-500 group-hover:scale-105 origin-bottom-right self-end md:self-end">
                        <img
                            src={danielMoi}
                            alt="H.E. President Daniel Toroitich arap Moi"
                            className="w-full h-auto drop-shadow-2xl brightness-110 contrast-110"
                        />
                    </div>
                </div>
            </div>
        </section>
    );
}
