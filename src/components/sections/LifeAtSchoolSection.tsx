import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import classroom from "@/assets/studenstInClass.jpg";
import rugbyTeam from "@/assets/rugby-team.jpg";
import kitchenStaff from "@/assets/kitchen-staff.jpg";
import presidentialVisit from "@/assets/presidential-visit.jpg";
import schoolBus from "@/assets/school-bus.jpg";
import fieldAssembly from "@/assets/field-assembly.jpg";

const moments = [
  {
    src: classroom,
    title: "Focused mornings",
    caption: "Quiet desks, handwritten notes, and boys building confidence subject by subject.",
  },
  {
    src: rugbyTeam,
    title: "Team pride",
    caption: "Sport brings the same discipline from class into the field.",
  },
  {
    src: kitchenStaff,
    title: "People behind the day",
    caption: "The school runs because every department shows up with care.",
  },
  {
    src: presidentialVisit,
    title: "National moments",
    caption: "A campus with stories that reach far beyond its gates.",
  },
  {
    src: schoolBus,
    title: "On the move",
    caption: "Journeys, fixtures, trips, and memories in school colours.",
  },
  {
    src: fieldAssembly,
    title: "One voice",
    caption: "Assembly keeps the rhythm of accountability and belonging.",
  },
];

export function LifeAtSchoolSection() {
  return (
    <section className="py-24 bg-primary text-primary-foreground overflow-hidden relative">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_hsl(var(--secondary)_/_0.22),_transparent_34rem)]" />
      <div className="container mx-auto px-4 relative">
        <div className="grid lg:grid-cols-[0.75fr_1.25fr] gap-12 items-start">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="lg:sticky lg:top-28"
          >
            <p className="font-hand text-3xl text-secondary mb-3 -rotate-1">Seen around campus</p>
            <h2 className="font-display text-4xl md:text-6xl font-bold leading-tight mb-6">
              Life at Kabarnet,
              <span className="block text-secondary">frame by frame.</span>
            </h2>
            <p className="text-primary-foreground/75 text-lg leading-relaxed mb-8">
              Every photograph carries a small piece of the school day: study, teamwork,
              service, ceremony, travel, and the friendships formed between them.
            </p>
            <div className="inline-flex items-center gap-2 rounded-full border border-secondary/30 bg-secondary/10 px-5 py-3 text-secondary font-medium">
              Explore the campus story
              <ArrowUpRight className="w-4 h-4" />
            </div>
          </motion.div>

          <div className="grid sm:grid-cols-2 gap-5">
            {moments.map((moment, index) => (
              <motion.article
                key={moment.title}
                initial={{ opacity: 0, y: 40, rotate: index % 2 === 0 ? -1.5 : 1.5 }}
                whileInView={{ opacity: 1, y: 0, rotate: index % 2 === 0 ? -0.5 : 0.5 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.55, delay: index * 0.06 }}
                className={`group relative rounded-[1.75rem] overflow-hidden bg-white/10 border border-white/10 shadow-2xl ${
                  index % 3 === 0 ? "sm:translate-y-10" : ""
                }`}
              >
                <div className="aspect-[4/5] overflow-hidden">
                  <img
                    src={moment.src}
                    alt={moment.title}
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                </div>
                <div className="absolute inset-x-0 bottom-0 p-5 bg-gradient-to-t from-black/85 via-black/40 to-transparent">
                  <p className="font-hand text-3xl text-secondary mb-1">{moment.title}</p>
                  <p className="text-white/85 text-sm leading-relaxed">{moment.caption}</p>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
