import imgAutoHideHudLogo from "@/assets/autohidehud-logo.png";
import imgCardLabelerLogo from "@/assets/cardlabeler-logo.png";
import imgStorePageBackground from "@/assets/gps-store-background.png";
import { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "motion/react";
import { ExternalLink, Clock, CheckCircle, Wrench, Calendar } from "lucide-react";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { PageMeta } from "./PageMeta";
import { acrostixCardImage } from "../assets/acrostix-screenshots";
import { matchFivesCardImage } from "../assets/matchfives-screenshots";
import { ballDropCardImage } from "../assets/balldrop-screenshots";
import { heKeyboardsCardImage } from "../assets/hekeyboards-screenshots";
import { lunchBoxCardImage } from "../assets/lunchbox-screenshots";
import imgHomunculAICard from "@/assets/homunculai-capsule-main.png";

type Category = "All" | "Games & Apps" | "Tools & Mods";
type Kind = "Game" | "App" | "Tool" | "Mod";

const projects = [
  {
    id: 1,
    title: "Galactic Parcel Service",
    category: "Games & Apps" as const,
    kind: "Game" as Kind,
    type: "Simulation",
    description: "Build a fleet, deliver packages, terraform planets. Open-world, play your way.",
    image: imgStorePageBackground,
    status: "In Development",
    platforms: ["PC", "Mobile"],
    tilt: "rotate-1",
    accent: "primary" as const,
    imagePosition: "object-cover" as const,
    slug: "galactic-parcel-service" as string | null,
  },
  {
    id: 2,
    title: "Acrostix",
    category: "Games & Apps" as const,
    kind: "Game" as Kind,
    type: "Creative Word Game",
    description: "One word. Infinite sentences.",
    image: acrostixCardImage,
    status: "Released",
    platforms: ["Mobile"],
    tilt: "-rotate-1",
    accent: "teal" as const,
    imagePosition: "object-cover object-[center_12%]" as const,
    slug: "acrostix" as string | null,
  },
  {
    id: 3,
    title: "HomunculAI",
    category: "Games & Apps" as const,
    kind: "App" as Kind,
    type: "Desktop App",
    description: "What body will your AI make?",
    image: imgHomunculAICard,
    status: "Released",
    platforms: ["Windows"],
    tilt: "rotate-1",
    accent: "primary" as const,
    imagePosition: "object-cover" as const,
    slug: "homunculai" as string | null,
  },
  {
    id: 4,
    title: "Match Fives",
    category: "Games & Apps" as const,
    kind: "Game" as Kind,
    type: "Puzzle",
    description: "Match numbers, chase high scores. Simple to pick up, hard to put down.",
    image: matchFivesCardImage,
    status: "Released",
    platforms: ["Mobile"],
    tilt: "-rotate-1",
    accent: "teal" as const,
    imagePosition: "object-cover object-center" as const,
    slug: "match-fives" as string | null,
  },
  {
    id: 5,
    title: "50 Ball Drop",
    category: "Games & Apps" as const,
    kind: "Game" as Kind,
    type: "Arcade",
    description: "Drop balls, watch mayhem unfold, unlock a pile of cosmetics.",
    image: ballDropCardImage,
    status: "Released",
    platforms: ["Mobile"],
    tilt: "rotate-1",
    accent: "primary" as const,
    imagePosition: "object-cover" as const,
    slug: "50-ball-drop" as string | null,
  },
  {
    id: 6,
    title: "HE Keyboards",
    category: "Tools & Mods" as const,
    kind: "Tool" as Kind,
    type: "Unity Asset",
    description: "Hall Effect keyboard support for Unity. Analog pressure from every key.",
    image: heKeyboardsCardImage,
    status: "Released",
    platforms: ["Unity"],
    tilt: "-rotate-1",
    accent: "teal" as const,
    imagePosition: "object-cover" as const,
    slug: "he-keyboards" as string | null,
  },
  {
    id: 7,
    title: "UI Toolkit: Screen Manager",
    category: "Tools & Mods" as const,
    kind: "Tool" as Kind,
    type: "Unity Asset",
    description: "UI Toolkit screen management for Unity — transitions, navigation, lifecycle.",
    image: null as string | null,
    status: "In Development",
    platforms: ["Unity"],
    tilt: "rotate-1",
    accent: "primary" as const,
    imagePosition: "object-cover" as const,
    slug: "screen-manager" as string | null,
  },
  {
    id: 11,
    title: "UI Toolkit: Tween Engine",
    category: "Tools & Mods" as const,
    kind: "Tool" as Kind,
    type: "Unity Asset",
    description: "Chainable tweens for UI Toolkit — easing curves, sequences, zero-GC playback.",
    image: null as string | null,
    status: "In Development",
    platforms: ["Unity"],
    tilt: "-rotate-1",
    accent: "teal" as const,
    imagePosition: "object-cover" as const,
    slug: "tween-engine" as string | null,
  },
  {
    id: 12,
    title: "UI Toolkit: Responsive Layout",
    category: "Tools & Mods" as const,
    kind: "Tool" as Kind,
    type: "Unity Asset",
    description: "Breakpoints, adaptive grids, and safe areas for UI Toolkit. One UI, every aspect ratio.",
    image: null as string | null,
    status: "In Development",
    platforms: ["Unity"],
    tilt: "rotate-1",
    accent: "primary" as const,
    imagePosition: "object-cover" as const,
    slug: "responsive-layout" as string | null,
  },
  {
    id: 13,
    title: "UI Toolkit: Modal & Notifications",
    category: "Tools & Mods" as const,
    kind: "Tool" as Kind,
    type: "Unity Asset",
    description: "Stackable modals and toast queues for UI Toolkit — focus traps, dismissal, theming.",
    image: null as string | null,
    status: "In Development",
    platforms: ["Unity"],
    tilt: "-rotate-1",
    accent: "teal" as const,
    imagePosition: "object-cover" as const,
    slug: "modal-notifications" as string | null,
  },
  {
    id: 14,
    title: "UI Toolkit: Focus & Navigation",
    category: "Tools & Mods" as const,
    kind: "Tool" as Kind,
    type: "Unity Asset",
    description: "Keyboard and gamepad navigation for UI Toolkit. Auto-focus maps, visual indicators, mixed input.",
    image: null as string | null,
    status: "In Development",
    platforms: ["Unity"],
    tilt: "rotate-1",
    accent: "primary" as const,
    imagePosition: "object-cover" as const,
    slug: "focus-navigation" as string | null,
  },
  {
    id: 8,
    title: "LunchBox",
    category: "Tools & Mods" as const,
    kind: "Tool" as Kind,
    type: "macOS App",
    description: "Menu bar window snapping for multi-monitor macOS setups.",
    image: lunchBoxCardImage,
    status: "Released",
    platforms: ["macOS"],
    tilt: "-rotate-1",
    accent: "teal" as const,
    imagePosition: "object-cover" as const,
    slug: "lunchbox" as string | null,
  },
  {
    id: 9,
    title: "AutoHideHud",
    category: "Tools & Mods" as const,
    kind: "Mod" as Kind,
    type: "Minecraft Mod",
    description: "Auto-hides Minecraft HUD to your parameters. See the world, not your hotbar.",
    image: imgAutoHideHudLogo,
    status: "Released",
    platforms: ["Minecraft"],
    tilt: "rotate-1",
    accent: "primary" as const,
    imagePosition: "object-contain" as const,
    slug: null as string | null,
  },
  {
    id: 10,
    title: "Card Labeler",
    category: "Tools & Mods" as const,
    kind: "Mod" as Kind,
    type: "Trello Extension",
    description: "Better labels and sorting for Trello boards.",
    image: imgCardLabelerLogo,
    status: "In Development",
    platforms: ["Trello"],
    tilt: "-rotate-1",
    accent: "teal" as const,
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

const categories: Category[] = ["All", "Games & Apps", "Tools & Mods"];

const statusConfig: Record<string, { icon: typeof Clock; color: string; bg: string }> = {
  "Released": { icon: CheckCircle, color: "text-lime", bg: "bg-black/60 border border-lime/20 backdrop-blur-sm" },
  "In Review": { icon: Clock, color: "text-primary", bg: "bg-black/60 border border-primary/20 backdrop-blur-sm" },
  "Coming Soon": { icon: Clock, color: "text-teal", bg: "bg-black/60 border border-teal/20 backdrop-blur-sm" },
  "Coming May 7": { icon: Calendar, color: "text-lime", bg: "bg-black/60 border border-lime/20 backdrop-blur-sm" },
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

/* ─── sort helpers ─── */
const categoryOrder: Category[] = ["Games & Apps", "Tools & Mods"];

// Lower number = higher priority (renders first). Coming items lead (dated
// first, sorted by date asc, then generic "Coming Soon"), then Released,
// then In Dev last.
function statusRank(status: string): number {
  if (status === "Coming Soon") return 2;
  if (status === "Released") return 3;
  if (status === "In Review") return 4;
  if (status === "In Development") return 5;
  if (status.startsWith("Coming ")) return 1; // has a specific date
  return 6; // unknown
}

function comingDate(status: string): number {
  // Parse "Coming May 7" → epoch ms, or Infinity if no date
  const match = status.match(/^Coming (\w+)\s+(\d+)/);
  if (!match) return Infinity;
  const [, monthName, day] = match;
  const year = new Date().getFullYear();
  const d = new Date(`${monthName} ${day}, ${year}`);
  return isNaN(d.getTime()) ? Infinity : d.getTime();
}

function sortProjects<T extends { category: Category; status: string }>(items: T[]): T[] {
  return [...items].sort((a, b) => {
    const catA = categoryOrder.indexOf(a.category);
    const catB = categoryOrder.indexOf(b.category);
    if (catA !== catB) return catA - catB;
    const rankA = statusRank(a.status);
    const rankB = statusRank(b.status);
    if (rankA !== rankB) return rankA - rankB;
    if (rankA === 1) return comingDate(a.status) - comingDate(b.status);
    return 0;
  });
}

export function GamesPage() {
  const [activeCategory, setActiveCategory] = useState<Category>("All");

  const filtered = sortProjects(
    activeCategory === "All"
      ? projects
      : projects.filter((p) => p.category === activeCategory)
  );

  return (
    <div className="min-h-screen">
      <PageMeta
        title="Catalog"
        description="Browse every KrookedLilly game, app, tool, and mod — from Acrostix to HomunculAI to Galactic Parcel Service."
        path="/catalog"
      />
      {/* Header */}
      <section className="pt-16 pb-8 relative">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-0 left-1/3 w-72 h-72 bg-[radial-gradient(circle,_rgba(160,92,246,0.15)_0%,_transparent_70%)]" />
          <div className="absolute top-12 right-1/3 w-56 h-56 bg-[radial-gradient(circle,_rgba(34,211,238,0.10)_0%,_transparent_70%)]" />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl sm:text-6xl text-foreground mb-4"
            style={{ fontFamily: "var(--font-display)" }}
          >
            Games, Apps & Tools
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-muted-foreground max-w-lg mx-auto"
          >
            Everything we've shipped, everything we're building, and the tools we've made along the way.
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
              // Compute tilt + accent from render position so alternation stays clean after sort
              const accentKey = i % 2 === 0 ? ("teal" as const) : ("primary" as const);
              const accent = accentMap[accentKey];
              const tilt = i % 2 === 0 ? "-rotate-1" : "rotate-1";
              return (
                <motion.div
                  key={project.id}
                  initial="hidden"
                  animate="visible"
                  variants={fadeUp}
                  custom={i}
                  className={`group relative overflow-hidden bg-white/[0.06] border-2 border-white/[0.12] ${accent.hoverBorder} transition-[border-color,box-shadow] duration-300 hover:-translate-y-2 ${accent.shadow} ${tilt} hover:rotate-0 rounded-sm will-change-transform ${project.slug ? "cursor-pointer" : ""}`}
                >
                  {/* Make the whole card clickable if it has a detail page */}
                  {project.slug && (
                    <Link
                      to={`/${project.category === "Tools & Mods" ? "tools" : "games"}/${project.slug}`}
                      className="absolute inset-0 z-10"
                      aria-label={`View ${project.title} details`}
                    />
                  )}
                  <div className="relative aspect-video overflow-hidden">
                    {project.image ? (
                      <ImageWithFallback
                        src={project.image}
                        alt={project.title}
                        className={`w-full h-full ${project.imagePosition} transition-transform duration-500 group-hover:scale-110 ${project.imagePosition === ("object-contain" as string) ? "p-4 bg-black/40" : ""}`}
                      />
                    ) : (
                      <div className="w-full h-full bg-white/[0.02] flex items-center justify-center">
                        <Wrench className="w-12 h-12 text-white/10" />
                      </div>
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-card via-transparent to-transparent" />
                    {/* Released status hidden — only surface non-Released states */}
                    {project.status !== "Released" && (
                      <div className="absolute top-3 left-3">
                        <span
                          className={`inline-flex items-center gap-1.5 px-3 py-1 text-xs uppercase tracking-wider rounded-sm ${statusInfo.bg} ${statusInfo.color}`}
                          style={{ fontFamily: "var(--font-heading)", fontWeight: 600 }}
                        >
                          <StatusIcon className="w-3 h-3" />
                          {project.status}
                        </span>
                      </div>
                    )}
                  </div>
                  <div className="p-6">
                    <div className="flex items-center justify-between mb-2">
                      <span
                        className={`${accent.typeColor} text-xs uppercase tracking-wider`}
                        style={{ fontFamily: "var(--font-heading)", fontWeight: 600 }}
                      >
                        {project.type}
                      </span>
                      <span className="text-muted-foreground text-xs">{project.kind}</span>
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