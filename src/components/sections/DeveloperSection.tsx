
import { motion } from "framer-motion";
import kandaImg from "@/assets/kanda2.png";
import { Link } from "lucide-react";

export function DeveloperSection() {
    return (
        <section className="py-12 md:py-20 lg:py-32 relative overflow-hidden bg-gradient-to-b from-transparent to-primary/5">
            {/* Background Decor */}
            <div className="absolute inset-0 z-0 pointer-events-none">
                <div className="absolute top-20 right-0 w-[300px] md:w-[500px] h-[300px] md:h-[500px] bg-secondary/5 rounded-full blur-3xl opacity-50" />
                <div className="absolute bottom-0 left-0 w-[300px] md:w-[500px] h-[300px] md:h-[500px] bg-primary/5 rounded-full blur-3xl opacity-50" />
            </div>

            <div className="container mx-auto px-4 relative z-10">
                {/* Main Card Wrapper */}
                <div className="bg-white/80 dark:bg-card/40 backdrop-blur-xl border border-white/20 dark:border-white/10 rounded-[2rem] md:rounded-[2.5rem] pt-8 md:pt-12 lg:pt-16 px-6 md:px-12 lg:px-16 pb-0 shadow-2xl overflow-hidden">
                    <div className="grid lg:grid-cols-2 gap-8 md:gap-12 lg:gap-20 items-end">

                        {/* Image Column (Left) - Top on Mobile, Bottom-Left on Desktop */}
                        <motion.div
                            initial={{ opacity: 0, y: 50 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8 }}
                            className="relative order-1 lg:order-1 flex justify-center lg:justify-start -mb-0 w-full"
                        >
                            <div className="relative w-full max-w-sm md:max-w-md lg:max-w-lg mx-auto lg:mx-0">
                                {/* Decorative Frame Elements */}
                                <div className="absolute inset-0 bg-primary/20 rounded-full blur-3xl scale-90 translate-y-10" />

                                <img
                                    src={kandaImg}
                                    alt="Oliver Kandagor - Developer"
                                    className="relative w-full h-auto drop-shadow-2xl z-10 hover:scale-[1.02] transition-transform duration-500 origin-bottom"
                                />

                                {/* Floating Name Tag - Adjusted to Right side of image */}
                                <div className="absolute bottom-4 md:bottom-10 right-0 md:-right-6 lg:-right-12 z-20 block">
                                    <div className="bg-background/90 backdrop-blur-md border border-border/50 p-3 md:p-4 rounded-xl shadow-lg max-w-[150px] md:max-w-none text-right md:text-left">
                                        <p className="font-display font-bold text-base md:text-lg text-primary leading-tight">Oliver Kandagor</p>
                                        <p className="text-xs md:text-sm text-muted-foreground">Class of 2024</p>
                                    </div>
                                </div>
                            </div>
                        </motion.div>

                        {/* Content Column (Right) - Bottom on Mobile, Right on Desktop */}
                        <motion.div
                            initial={{ opacity: 0, x: 50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8, delay: 0.2 }}
                            className="order-2 lg:order-2 space-y-6 md:space-y-8 pb-8 md:pb-12 lg:pb-16"
                        >
                            <div>
                                <span className="inline-block px-4 py-1.5 rounded-full bg-secondary/10 text-secondary text-xs md:text-sm font-bold tracking-widest uppercase mb-3 md:mb-4">
                                    The Developer
                                </span>
                                <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4 md:mb-6 leading-tight">
                                    Building the <span className="text-primary">Digital Legacy</span>
                                </h2>
                                <div className="h-1.5 w-20 md:w-24 bg-secondary rounded-full" />
                            </div>

                            <div className="space-y-4 md:space-y-6 text-base md:text-lg text-muted-foreground leading-relaxed">
                                <p>
                                    "My journey with technology at Kabarnet High School began in 2021. From the very beginning,
                                    I had a clear vision: to one day create an official website that would represent Kabarnet
                                    High School digitally and tell its story to the world."
                                </p>
                                <p className="hidden md:block">
                                    "With the support of the Principal, Mr. Julius Ndirangu, and our Computer Teacher, Mr. Chesire,
                                    I took my first step by developing a simple single-page website. This foundation grew into
                                    the ICT Club, where I taught fellow students like Marcus Njoroge, Nimrod, and Pedaih Kigen
                                    basics of web & mobile development."
                                </p>
                                <p>
                                    "Now pursuing Software Engineering, I launched Version 1 in July 2025 and this enhanced
                                    Version 2 in September 2025. This platform stands as a testament to the power of mentorship
                                    and a supportive school environment."
                                </p>
                            </div>

                            {/* Profile Data Box */}
                            <div className="bg-background/50 border border-border/50 rounded-2xl p-5 md:p-8 shadow-sm hover:shadow-md transition-shadow">
                                <h3 className="font-display text-lg md:text-xl font-bold text-foreground mb-3 md:mb-4 border-b border-border/50 pb-2">
                                    Developer Profile
                                </h3>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-y-3 md:gap-y-4 gap-x-8">
                                    <div>
                                        <p className="text-xs md:text-sm text-muted-foreground uppercase tracking-wide mb-1">Name</p>
                                        <p className="font-medium text-foreground text-sm md:text-base">Oliver Kandagor</p>
                                    </div>
                                    <div>
                                        <p className="text-xs md:text-sm text-muted-foreground uppercase tracking-wide mb-1">Alumni</p>
                                        <p className="font-medium text-foreground text-sm md:text-base">Kabarnet High School '24</p>
                                    </div>
                                    <div>
                                        <p className="text-xs md:text-sm text-muted-foreground uppercase tracking-wide mb-1">Profession</p>
                                        <p className="font-medium text-foreground text-sm md:text-base">Software Engineer</p>
                                    </div>
                                    <div>
                                        <p className="text-xs md:text-sm text-muted-foreground uppercase tracking-wide mb-1">Website</p>
                                        <a
                                            href="https://oliverkandagor.co.ke"
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="font-medium text-primary hover:text-secondary transition-colors inline-flex items-center gap-1 text-sm md:text-base"
                                        >
                                            oliverkandagor.co.ke
                                            <Link className="h-3 w-3 ml-1" />
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </div>
        </section>
    );
}
