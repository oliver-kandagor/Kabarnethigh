import { motion } from "framer-motion";
import { User, Home } from "lucide-react";

interface DormCardProps {
    name: string;
    master: string;
    image?: string;
    capacity?: string;
}

export function DormCard({ name, master, image, capacity }: DormCardProps) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="group bg-card rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all border border-border/50 flex flex-col h-full"
        >
            <div className="relative h-48 overflow-hidden bg-muted">
                {image ? (
                    <img
                        src={image}
                        alt={`${name} Dormitory`}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                ) : (
                    <div className="flex items-center justify-center h-full text-muted-foreground bg-secondary/5">
                        <Home className="w-10 h-10 opacity-20" />
                    </div>
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-60" />
                <div className="absolute bottom-3 left-3 text-white">
                    <h3 className="font-display font-bold text-lg">{name}</h3>
                </div>
            </div>

            <div className="p-4 flex-1 flex flex-col gap-2">
                <div className="flex items-center gap-2 text-sm text-foreground/80">
                    <User className="w-4 h-4 text-primary" />
                    <span className="font-medium text-xs text-muted-foreground uppercase tracking-wide">House Master</span>
                </div>
                <p className="pl-6 font-medium text-foreground">{master}</p>

                {capacity && (
                    <div className="mt-auto pt-3 border-t border-border/50 flex justify-between text-xs text-muted-foreground">
                        <span>Capacity</span>
                        <span>{capacity} Students</span>
                    </div>
                )}
            </div>
        </motion.div>
    );
}
