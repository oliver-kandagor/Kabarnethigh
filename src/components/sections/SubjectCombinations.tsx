
import { motion } from "framer-motion";
import { cbcSubjectCombinations } from "@/data/cbc-data";
import { useState } from "react";
import artsCover from "@/assets/arts-sports-cover.png";
import stemCover from "@/assets/stem-cover.png";
import socialCover from "@/assets/social-sciences-cover.png";
import { Search, BookOpen, Layers } from "lucide-react";

export function SubjectCombinations() {
    const [filter, setFilter] = useState("ALL");
    const [searchTerm, setSearchTerm] = useState("");

    const categories = ["ALL", "STEM", "SOCIAL SCIENCES", "ARTS & SPORTS SCIENCE"];

    const getCategoryImage = (category: string) => {
        if (category.includes("STEM")) return stemCover;
        if (category.includes("SOCIAL")) return socialCover;
        return artsCover;
    };

    const filteredCombinations = cbcSubjectCombinations.filter((combo) => {
        const matchesCategory = filter === "ALL" || combo.category === filter;
        const matchesSearch =
            combo.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
            combo.subjects.some(s => s.toLowerCase().includes(searchTerm.toLowerCase()));
        return matchesCategory && matchesSearch;
    });

    return (
        <section className="py-16 bg-muted/30">
            <div className="container mx-auto px-4">
                <div className="flex flex-col md:flex-row justify-between items-end gap-6 mb-12">
                    <div>
                        <h2 className="text-3xl font-display font-bold mb-4">Subject Combinations</h2>
                        <p className="text-muted-foreground max-w-xl">
                            Explore our comprehensive range of subject combinations tailored to nurture diverse talents and career paths.
                        </p>
                    </div>

                    {/* Search */}
                    <div className="relative w-full md:w-72">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                        <input
                            type="text"
                            placeholder="Search by code or subject..."
                            className="w-full pl-10 pr-4 py-2 rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary/20"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                </div>

                {/* Filter Tabs */}
                <div className="flex flex-wrap gap-2 mb-8 border-b border-border/50 pb-4">
                    {categories.map((cat) => (
                        <button
                            key={cat}
                            onClick={() => setFilter(cat)}
                            className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${filter === cat
                                    ? "bg-primary text-primary-foreground shadow-md"
                                    : "bg-background hover:bg-muted text-muted-foreground"
                                }`}
                        >
                            {cat}
                        </button>
                    ))}
                </div>

                {/* Grid */}
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredCombinations.map((combo, index) => (
                        <motion.div
                            key={combo.code}
                            layout
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.3 }}
                            className="group bg-card rounded-xl overflow-hidden shadow-sm hover:shadow-xl transition-all border border-border/50 flex flex-col h-full"
                        >
                            {/* Card Header Image */}
                            <div className="h-32 relative overflow-hidden">
                                <img
                                    src={getCategoryImage(combo.category)}
                                    alt={combo.category}
                                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex items-end p-4">
                                    <div>
                                        <span className="text-[10px] font-bold text-white/90 bg-primary/80 px-2 py-0.5 rounded backdrop-blur-sm mb-1 inline-block">
                                            {combo.code}
                                        </span>
                                        <h3 className="text-white font-bold text-sm leading-tight">{combo.subCategory}</h3>
                                    </div>
                                </div>
                            </div>

                            {/* Card Content */}
                            <div className="p-5 flex-1 flex flex-col">
                                <ul className="space-y-2 mb-4 flex-1">
                                    {combo.subjects.map((subject, idx) => (
                                        <li key={idx} className="flex items-start gap-2 text-sm text-foreground/80">
                                            <BookOpen className="w-4 h-4 text-primary/40 mt-0.5 shrink-0" />
                                            <span>{subject}</span>
                                        </li>
                                    ))}
                                </ul>

                                <div className="pt-4 border-t border-border/50 flex justify-between items-center text-xs text-muted-foreground">
                                    <span className="flex items-center gap-1">
                                        <Layers className="w-3 h-3" />
                                        {combo.count} Subjects
                                    </span>
                                    <span className="font-medium text-primary bg-primary/5 px-2 py-1 rounded">
                                        Cluster C1
                                    </span>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>

                {filteredCombinations.length === 0 && (
                    <div className="text-center py-20">
                        <p className="text-muted-foreground">No combinations found matching your search.</p>
                        <button
                            onClick={() => { setFilter("ALL"); setSearchTerm(""); }}
                            className="mt-4 text-primary font-medium hover:underline"
                        >
                            Clear Filters
                        </button>
                    </div>
                )}
            </div>
        </section>
    );
}
