
import { motion } from "framer-motion";
import { School, MapPin, Users, Award, BookOpen, Layers } from "lucide-react";
import { schoolProfile } from "@/data/cbc-data";

export function SchoolProfile() {
    const stats = [
        { label: "Location", value: schoolProfile.location, icon: MapPin, color: "text-red-500" },
        { label: "Category", value: schoolProfile.category, icon: School, color: "text-blue-500" },
        { label: "Sex", value: schoolProfile.sex, icon: Users, color: "text-green-500" },
        { label: "Cluster", value: schoolProfile.cluster, icon: Layers, color: "text-purple-500" },
    ];

    return (
        <section className="py-12 bg-background relative overflow-hidden">
            {/* Background Decorative */}
            <div className="absolute top-0 right-0 p-12 opacity-5 pointer-events-none">
                <School className="w-96 h-96" />
            </div>

            <div className="container mx-auto px-4 relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="mb-12 text-center"
                >
                    <h2 className="font-display text-4xl font-bold mb-4">{schoolProfile.name}</h2>
                    <p className="text-xl text-muted-foreground">Complete overview of academic programs and school details</p>
                </motion.div>

                {/* Stats Grid */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
                    {stats.map((stat, index) => (
                        <motion.div
                            key={stat.label}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                            className="bg-card p-6 rounded-2xl shadow-sm border border-border/50 hover:shadow-md transition-shadow"
                        >
                            <div className={`p-3 rounded-xl bg-muted/50 w-fit mb-4 ${stat.color}`}>
                                <stat.icon className="w-6 h-6" />
                            </div>
                            <div className="font-display text-2xl font-bold mb-1">{stat.value}</div>
                            <div className="text-sm text-muted-foreground uppercase tracking-wide">{stat.label}</div>
                        </motion.div>
                    ))}
                </div>

                {/* Subject Breakdown */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    className="bg-muted/30 rounded-3xl p-8 border border-border/50"
                >
                    <div className="flex flex-col md:flex-row items-center justify-between gap-8">
                        <div className="text-center md:text-left">
                            <h3 className="text-2xl font-display font-bold mb-2">Subject Combinations Offered</h3>
                            <p className="text-muted-foreground">Detailed breakdown by curriculum area</p>
                        </div>

                        <div className="flex flex-wrap justify-center gap-4">
                            {schoolProfile.subjectBreakdown.map((item) => (
                                <div key={item.name} className="flex items-center gap-3 bg-background p-3 pl-4 pr-6 rounded-full shadow-sm border border-border/50">
                                    <div className={`w-3 h-3 rounded-full ${item.color}`} />
                                    <div>
                                        <span className="font-bold text-xl block leading-none">{item.count}</span>
                                        <span className="text-xs text-muted-foreground font-medium uppercase">{item.name}</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
