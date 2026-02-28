import imgAutoHideHudLogo from "@/assets/autohidehud-logo.png";
import imgCardLabelerLogo from "@/assets/cardlabeler-logo.png";
import imgStorePageBackground from "@/assets/gps-store-background.png";
import { useState } from "react";
import { Link } from "react-router";
import { motion } from "motion/react";
import { ExternalLink, Clock, CheckCircle, Zap } from "lucide-react";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { acrostixCardImage } from "../assets/acrostix-screenshots";
import { matchFivesCardImage } from "../assets/matchfives-screenshots";
import { ballDropCardImage } from "../assets/balldrop-screenshots";

type Category = "All" | "Games" | "Mods";

const projects = [
  {
    id: 1,
    title: "Galactic Parcel Service",
    category: "Games" as const,
    type: "Simulation",
    description:
      "Build a fleet of automated ships to deliver packages across randomly generated solar systems. Steal cargo, mine asteroids, terraform planets, and fend off space tentacles. Open-world and play your way",
    image: imgStorePageBackground,
    status: "Early Access",
    platforms: ["PC", "Mobile"],
    tilt: "rotate-1",
    accent: "primary" as const,
    imagePosition: "object-cover" as const,
    slug: "galactic-parcel-service" as string | null,
  },
  {
    id: 2,
    title: "Acrostix",
    category: "Games" as const,
    type: "Creative Word Game",
    description:
      "A creative word game where you build sentences from acrostic words and get scored on grammar, complexity, and creativity. Coming soon to mobile",
    image: acrostixCardImage,
    status: "Coming Soon",
    platforms: ["Mobile"],
    tilt: "-rotate-1",
    accent: "teal" as const,
    imagePosition: "object-cover object-top" as const,
    slug: "acrostix" as string | null,
  },
  {
    id: 3,
    title: "Match Fives",
    category: "Games" as const,
    type: "Puzzle",
    description:
      "Match numbers together and chase those high scores. Simple to pick up, surprisingly hard to put down. The kind of game that eats your bus ride",
    image: matchFivesCardImage,
    status: "Released",
    platforms: ["Mobile"],
    tilt: "rotate-2",
    accent: "primary" as const,
    imagePosition: "object-cover object-top" as const,
    slug: "match-fives" as string | null,
  },
  {
    id: 4,
    title: "50 Ball Drop",
    category: "Games" as const,
    type: "Arcade",
    description:
      "Drop balls, watch mayhem unfold, unlock a wild amount of cosmetics. It's an arcade game with way more drip than you'd expect",
    image: ballDropCardImage,
    status: "Released",
    platforms: ["Mobile"],
    tilt: "-rotate-2",
    accent: "teal" as const,
    imagePosition: "object-cover" as const,
    slug: "50-ball-drop" as string | null,
  },
  {
    id: 5,
    title: "AutoHideHud",
    category: "Mods" as const,
    type: "Minecraft Mod",
    description:
      "Automatically hides all HUD elements based on your custom parameters. See the world, not your hotbar. Krooked's solo creation for the clean-screen crowd",
    image: imgAutoHideHudLogo,
    status: "Released",
    platforms: ["Minecraft"],
    tilt: "rotate-1",
    accent: "primary" as const,
    imagePosition: "object-contain" as const,
    slug: null as string | null,
  },
  {
    id: 6,
    title: "Card Labeler",
    category: "Mods" as const,
    type: "Trello Extension",
    description:
      "Add labels and better sorting to your Trello boards. Because organizing cards shouldn't require a PhD. A small tool that just makes things tidier",
    image: imgCardLabelerLogo,
    status: "Released",
    platforms: ["Trello"],
    tilt: "rotate-2",
    accent: "primary" as const,
    imagePosition: "object-contain" as const,
    slug: null as string | null,
  },
];

const accentMap = {
  primary: {
    hoverBorder: "hover:border-primary/40",
    shadow: "hover:shadow-[6px_6px_0px_0px_rgba(160,92,246,0.15)]",
    typeColor: "text-primary",
    hoverLink: "hover:text-primary",
  },
  teal: {
    hoverBorder: "hover:border-teal/40",
    shadow: "hover:shadow-[6px_6px_0px_0px_rgba(34,211,238,0.15)]",
    typeColor: "text-teal",
    hoverLink: "hover:text-teal",
  },
};

const categories: Category[] = ["All", "Games", "Mods"];

const statusConfig: Record<string, { icon: typeof Clock; color: string; bg: string }> = {
  "Released": { icon: CheckCircle, color: "text-lime", bg: "bg-black/60 border border-lime/20 backdrop-blur-sm" },
  "Early Access": { icon: Zap, color: "text-primary", bg: "bg-black/60 border border-primary/20 backdrop-blur-sm" },
  "Coming Soon": { icon: Clock, color: "text-teal", bg: "bg-black/60 border border-teal/20 backdrop-blur-sm" },
  "In Development": { icon: Clock, color: "text-muted-foreground", bg: "bg-black/60 border border-white/10 backdrop-blur-sm" },
};

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.08, duration: 0.4, ease: "easeOut" as const },
  }),
};

export function GamesPage() {
  const [activeCategory, setActiveCategory] = useState<Category>("All");

  const filtered =
    activeCategory === "All"
      ? projects
      : projects.filter((p) => p.category === activeCategory);

  return (
    <div className="min-h-screen">
      {/* Header */}
      <section className="pt-16 pb-8 relative">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-0 left-1/3 w-72 h-72 bg-primary/15 rounded-full blur-[100px]" />
          <div className="absolute top-12 right-1/3 w-56 h-56 bg-teal/10 rounded-full blur-[100px]" />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl sm:text-6xl text-foreground mb-4"
            style={{ fontFamily: "var(--font-display)" }}
          >
            Games & Mods
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-muted-foreground max-w-lg mx-auto"
          >
            Everything we've shipped, everything we're building, and the mods Krooked couldn't stop himself from making.
          </motion.p>
        </div>
      </section>

      {/* Filter */}
      <section className="pb-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-center">
          <div className="inline-flex gap-2 p-1.5 bg-white/[0.04] backdrop-blur-xl border-2 border-white/[0.12] rounded-sm">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-5 py-2 rounded-sm transition-all text-xs uppercase tracking-wider ${
                  activeCategory === cat
                    ? "bg-primary text-white shadow-[2px_2px_0px_0px_rgba(160,92,246,0.4)]"
                    : "text-muted-foreground hover:text-foreground hover:bg-white/5"
                }`}
                style={{ fontFamily: "var(--font-heading)", fontWeight: 700 }}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Projects Grid */}
      <section className="pb-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filtered.map((project, i) => {
              const statusInfo = statusConfig[project.status];
              const StatusIcon = statusInfo.icon;
              const accent = accentMap[project.accent];
              return (
                <motion.div
                  key={project.id}
                  initial="hidden"
                  animate="visible"
                  variants={fadeUp}
                  custom={i}
                  className={`group relative overflow-hidden bg-white/[0.04] backdrop-blur-xl border-2 border-white/[0.12] ${accent.hoverBorder} transition-[border-color,box-shadow] duration-300 hover:-translate-y-2 ${accent.shadow} ${project.tilt} hover:rotate-0 rounded-sm will-change-transform ${project.slug ? "cursor-pointer" : ""}`}
                >
                  {/* Make the whole card clickable if it has a detail page */}
                  {project.slug && (
                    <Link
                      to={`/games/${project.slug}`}
                      className="absolute inset-0 z-10"
                      aria-label={`View ${project.title} details`}
                    />
                  )}
                  <div className="relative aspect-video overflow-hidden">
                    <ImageWithFallback
                      src={project.image}
                      alt={project.title}
                      className={`w-full h-full ${project.imagePosition} transition-transform duration-500 group-hover:scale-110 grayscale-[20%] group-hover:grayscale-0 ${project.imagePosition === ("object-contain" as string) ? "p-4 bg-black/40" : ""}`}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-card via-transparent to-transparent" />
                    <div className="absolute top-3 left-3">
                      <span
                        className={`inline-flex items-center gap-1.5 px-3 py-1 text-xs uppercase tracking-wider rounded-sm ${statusInfo.bg} ${statusInfo.color}`}
                        style={{ fontFamily: "var(--font-heading)", fontWeight: 600 }}
                      >
                        <StatusIcon className="w-3 h-3" />
                        {project.status}
                      </span>
                    </div>
                  </div>
                  <div className="p-6">
                    <div className="flex items-center justify-between mb-2">
                      <span
                        className={`${accent.typeColor} text-xs uppercase tracking-wider`}
                        style={{ fontFamily: "var(--font-heading)", fontWeight: 600 }}
                      >
                        {project.type}
                      </span>
                      <span className="text-muted-foreground text-xs">{project.category === "Games" ? "Game" : "Mod"}</span>
                    </div>
                    <h3
                      className="text-foreground mb-3"
                      style={{ fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: "1.375rem" }}
                    >
                      {project.title}
                    </h3>
                    <p className="text-muted-foreground text-sm mb-4 line-clamp-2">
                      {project.description}
                    </p>
                    <div className="flex items-center justify-between">
                      <div className="flex gap-2 flex-wrap">
                        {project.platforms.map((p) => (
                          <span
                            key={p}
                            className="px-2 py-0.5 text-xs rounded-sm bg-white/5 text-muted-foreground border border-white/10 uppercase tracking-wider"
                            style={{ fontFamily: "var(--font-heading)", fontWeight: 500 }}
                          >
                            {p}
                          </span>
                        ))}
                      </div>
                      <button className={`p-2 text-muted-foreground ${accent.hoverLink} transition-colors rounded-sm hover:bg-white/5`}>
                        <ExternalLink className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
}