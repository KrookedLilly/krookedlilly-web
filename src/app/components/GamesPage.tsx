import { Link, useSearchParams } from "react-router-dom";
import { motion } from "motion/react";
import { ExternalLink, Clock, CheckCircle, Wrench, Calendar } from "lucide-react";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { PageMeta } from "./PageMeta";
import { CollectionChip, CountBadge } from "./collectionUi";
import {
  catalog,
  categories as catalogCategories,
  categoryFromSlug,
  categorySlug,
  type Category as CatalogCategory,
} from "../data/catalog";
import { useHydrated } from "../../hooks/useHydrated";

type Category = "All" | CatalogCategory;

const accentMap = {
  primary: {
    hoverBorder: "hover:border-primary-light/70",
    shadow: "hover:shadow-[6px_6px_0px_0px_rgb(var(--primary-rgb)/0.15)]",
    typeColor: "text-primary-light",
    hoverLink: "hover:text-primary-light",
  },
  teal: {
    hoverBorder: "hover:border-teal-light/70",
    shadow: "hover:shadow-[6px_6px_0px_0px_rgb(var(--teal-rgb)/0.15)]",
    typeColor: "text-teal-light",
    hoverLink: "hover:text-teal-light",
  },
};

const categories: Category[] = ["All", ...catalogCategories];

const statusConfig: Record<string, { icon: typeof Clock; color: string; bg: string }> = {
  "Released": { icon: CheckCircle, color: "text-lime", bg: "bg-black/60 border border-lime/20 backdrop-blur-sm" },
  "In Review": { icon: Clock, color: "text-primary-light", bg: "bg-black/60 border border-primary-light/40 backdrop-blur-sm" },
  "Coming Soon": { icon: Clock, color: "text-teal-light", bg: "bg-black/60 border border-teal-light/40 backdrop-blur-sm" },
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
const categoryOrder: CatalogCategory[] = catalogCategories;

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

function sortProjects<T extends { category: CatalogCategory; status: string }>(items: T[]): T[] {
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

/**
 * A collection card's thumbnail. With enough cover art it's a tilted mosaic of
 * member covers that fills the card like its neighbors' screenshots, built from
 * the data so new members show up automatically. Otherwise a cluster of logo chips.
 */
function CollectionThumb({ members }: { members: { name: string; logo?: string; cover?: string }[] }) {
  const covers = members.filter((m) => m.cover).slice(0, 12);
  if (covers.length >= 8) {
    return (
      <div className="relative w-full h-full overflow-hidden bg-black">
        <div className="absolute -inset-[22%] grid grid-cols-4 content-center gap-2 -rotate-[8deg] transition-transform duration-500 group-hover:-rotate-[5deg] group-hover:scale-105">
          {covers.map((m) => (
            <img
              key={m.name}
              src={m.cover}
              alt=""
              loading="lazy"
              className="w-full aspect-[3/2] object-cover rounded-sm border border-white/10"
            />
          ))}
        </div>
      </div>
    );
  }
  const chips = members.slice(0, 8);
  return (
    <div className="w-full h-full flex items-center justify-center bg-[radial-gradient(circle_at_50%_38%,_rgb(var(--primary-rgb)/0.18)_0%,_rgba(0,0,0,0.35)_75%)]">
      <div className="grid grid-cols-4 gap-2 -rotate-[4deg] transition-transform duration-500 group-hover:rotate-0 group-hover:scale-105">
        {chips.map((m, i) => (
          <CollectionChip key={m.name} name={m.name} logo={m.logo} index={i} size="sm" />
        ))}
      </div>
    </div>
  );
}

export function GamesPage() {
  // The filter lives in the URL (/catalog?category=mods) so home page rows can
  // deep-link into it. The pre-rendered HTML always shows "All"; the requested
  // filter applies once hydrated.
  const [searchParams, setSearchParams] = useSearchParams();
  const hydrated = useHydrated();
  const activeCategory: Category = (hydrated && categoryFromSlug(searchParams.get("category"))) || "All";
  const setActiveCategory = (cat: Category) =>
    setSearchParams(cat === "All" ? {} : { category: categorySlug(cat) }, { replace: true });

  const filtered = sortProjects(
    activeCategory === "All"
      ? catalog
      : catalog.filter((p) => p.category === activeCategory)
  );

  return (
    <div className="min-h-screen">
      <PageMeta
        title="Catalog"
        description="Every KrookedLilly game, app, Minecraft mod, and game dev asset: ExfilCraft, Acrostix, HomunculAi, the Unity UI Toolkit Suite, Squamojis, and more."
        path="/catalog"
      />
      {/* Header */}
      <section className="pt-16 pb-8 relative">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-0 left-1/3 w-72 h-72 bg-[radial-gradient(circle,_rgb(var(--primary-rgb)/0.15)_0%,_transparent_70%)]" />
          <div className="absolute top-12 right-1/3 w-56 h-56 bg-[radial-gradient(circle,_rgb(var(--teal-rgb)/0.10)_0%,_transparent_70%)]" />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl sm:text-6xl text-foreground mb-4"
            style={{ fontFamily: "var(--font-display)" }}
          >
            Everything We Make
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-muted-foreground max-w-lg mx-auto"
          >
            Games, apps, mods, and the tools we've made along the way. Everything we've shipped
            and everything we're building.
          </motion.p>
        </div>
      </section>

      {/* Filter */}
      <section className="pb-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-center">
          <div className="inline-flex flex-wrap justify-center gap-2 p-1.5 bg-white/[0.04] backdrop-blur-xl border-2 border-white/[0.12] rounded-sm">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 sm:px-5 py-2 rounded-sm transition-all text-xs uppercase tracking-wider ${
                  activeCategory === cat
                    ? "bg-primary text-black shadow-[2px_2px_0px_0px_rgb(var(--primary-rgb)/0.4)]"
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
              const collection = project.collection;
              // Compute tilt + accent from render position so alternation stays clean after sort
              const accentKey = i % 2 === 0 ? ("teal" as const) : ("primary" as const);
              const accent = accentMap[accentKey];
              const tilt = i % 2 === 0 ? "-rotate-1" : "rotate-1";
              const contain = project.imagePosition === "object-contain";
              return (
                <motion.div
                  key={project.id}
                  initial="hidden"
                  animate="visible"
                  variants={fadeUp}
                  custom={i}
                  className={`group relative overflow-hidden bg-white/[0.06] border-2 border-white/[0.12] ${accent.hoverBorder} transition-[border-color,box-shadow] duration-300 hover:-translate-y-2 ${accent.shadow} ${tilt} hover:rotate-0 rounded-sm will-change-transform ${project.path ? "cursor-pointer" : ""}`}
                >
                  {/* Make the whole card clickable if it has a detail page */}
                  {project.path && (
                    <Link
                      to={project.path}
                      className="absolute inset-0 z-10"
                      aria-label={`View ${project.title} details`}
                    />
                  )}
                  <div className="relative aspect-video overflow-hidden">
                    {collection ? (
                      <CollectionThumb members={collection.members} />
                    ) : project.image ? (
                      <ImageWithFallback
                        src={project.image}
                        alt={project.title}
                        className={`w-full h-full ${project.imagePosition} transition-transform duration-500 group-hover:scale-110 ${contain ? "p-6 bg-black/40" : ""}`}
                      />
                    ) : (
                      <div className="w-full h-full bg-white/[0.02] flex items-center justify-center">
                        <Wrench className="w-12 h-12 text-white/10" />
                      </div>
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-card via-transparent to-transparent" />
                    {collection && (
                      <div className="absolute top-3 right-3 z-[5]">
                        <CountBadge>{collection.badge}</CountBadge>
                      </div>
                    )}
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
                      {project.tagline}
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
