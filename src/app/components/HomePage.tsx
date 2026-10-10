import imgExfilCraftHero from "@/assets/exfilcraft-portal.webp";
import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "motion/react";
import {
  ArrowRight,
  Gamepad2,
  AppWindow,
  Blocks,
  Package,
  Sparkles,
  ChevronLeft,
  ChevronRight,
  type LucideIcon,
} from "lucide-react";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { PageMeta } from "./PageMeta";
import { SocialIcon, type SocialIconName } from "./SocialIcon";
import { CountBadge } from "./collectionUi";
import { categorySlug, itemsIn, type Category, type CatalogItem } from "../data/catalog";
import { DISCORD_URL } from "../data/socials";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.15, duration: 0.5, ease: "easeOut" as const },
  }),
};

type Accent = "primary" | "teal";

const accentMap = {
  primary: {
    hoverBorder: "hover:border-primary-light/70",
    shadow: "hover:shadow-[6px_6px_0px_0px_rgb(var(--primary-rgb)/0.15)]",
    categoryColor: "text-primary-light",
    iconBg: "bg-primary",
  },
  teal: {
    hoverBorder: "hover:border-teal-light/70",
    shadow: "hover:shadow-[6px_6px_0px_0px_rgb(var(--teal-rgb)/0.15)]",
    categoryColor: "text-teal-light",
    iconBg: "bg-teal",
  },
};

/**
 * One home page row per catalog category. Games and Apps get screenshot cards;
 * Mods and Game Dev Assets get compact logo cards. Section accents alternate so
 * no stretch of the page goes all one color.
 */
const sections: {
  category: Category;
  icon: LucideIcon;
  accent: Accent;
  variant: "image" | "logo";
  iconTilt: string;
}[] = [
  { category: "Games", icon: Gamepad2, accent: "teal", variant: "image", iconTilt: "-rotate-6" },
  { category: "Apps", icon: AppWindow, accent: "primary", variant: "image", iconTilt: "rotate-6" },
  { category: "Mods", icon: Blocks, accent: "teal", variant: "logo", iconTilt: "-rotate-6" },
  { category: "Game Dev Assets", icon: Package, accent: "primary", variant: "logo", iconTilt: "rotate-6" },
];

/** Platform icons shown in the socials strip under the hero. */
const socialStripIcons: SocialIconName[] = ["twitch", "youtube", "discord", "tiktok", "instagram"];

/** Rows with more than this many items scroll sideways on desktop too. */
const MAX_GRID_ITEMS = 4;

// Literal class strings so Tailwind can see them. From md up, rows that fit
// become a grid that fills evenly at 3 or 4 columns.
const gridAtMd: Record<number, string> = {
  1: "md:grid md:grid-cols-3",
  2: "md:grid md:grid-cols-2",
  3: "md:grid md:grid-cols-3",
  4: "md:grid md:grid-cols-2 lg:grid-cols-4",
};

/** Gap between cards in a row (Tailwind gap-6), in px. */
const CARD_GAP = 24;

/**
 * A category's cards. On phones it's a swipeable strip that snaps card to card
 * with the next card peeking in. From md up it's a grid, unless the category
 * has more than MAX_GRID_ITEMS, in which case it stays a strip. Whenever the
 * strip overflows (any screen size), arrow buttons page through it.
 */
// Arrow highlight follows the row's icon color (hover on desktop, tap on phones).
const arrowAccent: Record<Accent, string> = {
  teal: "hover:border-teal-light/90 hover:text-teal-light active:border-teal-light active:text-teal-light focus-visible:border-teal-light focus-visible:text-teal-light",
  primary:
    "hover:border-primary-light/90 hover:text-primary-light active:border-primary-light active:text-primary-light focus-visible:border-primary-light focus-visible:text-primary-light",
};

function CategoryRow({
  label,
  accent,
  children,
}: {
  label: string;
  accent: Accent;
  children: React.ReactNode[];
}) {
  const scroller = useRef<HTMLDivElement>(null);
  // Start with both arrows hidden; the effect measures real overflow after mount.
  const [edges, setEdges] = useState({ atStart: true, atEnd: true });
  const scrolls = children.length > MAX_GRID_ITEMS;

  const updateEdges = () => {
    const el = scroller.current;
    // 8px slack so tilted cards in a grid that fits never count as overflow.
    if (el) setEdges({ atStart: el.scrollLeft <= 8, atEnd: el.scrollLeft + el.clientWidth >= el.scrollWidth - 8 });
  };

  // One card per click on phones, a full view of cards on desktop.
  const page = (dir: 1 | -1) => {
    const el = scroller.current;
    const card = el?.firstElementChild as HTMLElement | null;
    if (!el || !card) return;
    const step = card.offsetWidth + CARD_GAP;
    el.scrollBy({ left: dir * Math.max(1, Math.floor(el.clientWidth / step)) * step, behavior: "smooth" });
  };

  useEffect(() => {
    updateEdges();
    window.addEventListener("resize", updateEdges);
    return () => window.removeEventListener("resize", updateEdges);
  }, []);

  // Below md each card fills the scroller's content box and the side padding
  // sets its width, so every card (first and last included) can snap to the
  // center between the arrows. Padding percentages resolve against the parent,
  // which is the bleed (2rem / 3rem) narrower than the scroller, hence the px
  // terms: 10% each side leaves an 80% card on phones, 22.5% a 55% card on sm.
  const itemWidth = scrolls
    ? "w-full md:w-[calc((100%-1.5rem)/2)] lg:w-[calc((100%-4.5rem)/4)]"
    : "w-full md:w-auto";

  return (
    <div className="relative">
      <div
        ref={scroller}
        onScroll={updateEdges}
        role="region"
        aria-label={label}
        className={`flex gap-6 overflow-x-auto overflow-y-hidden overscroll-x-contain touch-pan-x touch-pan-y snap-x snap-mandatory scroll-px-0 -mx-4 sm:-mx-6 px-[calc(10%+3.2px)] sm:px-[calc(22.5%+10.8px)] py-4 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden ${
          scrolls ? "md:mx-0 md:px-1 md:scroll-px-1" : `${gridAtMd[children.length] ?? ""} md:overflow-visible md:mx-0 md:px-0 md:py-0`
        }`}
      >
        {children.map((child, i) => (
          <div key={i} className={`snap-center md:snap-start shrink-0 ${itemWidth}`}>
            {child}
          </div>
        ))}
      </div>
      {(["prev", "next"] as const).map((dir) => {
        const disabled = dir === "prev" ? edges.atStart : edges.atEnd;
        const Icon = dir === "prev" ? ChevronLeft : ChevronRight;
        return (
          <button
            key={dir}
            onClick={() => page(dir === "prev" ? -1 : 1)}
            disabled={disabled}
            aria-label={dir === "prev" ? `Previous ${label}` : `More ${label}`}
            className={`flex absolute top-1/2 -translate-y-1/2 ${
              dir === "prev" ? "left-1 md:-left-5" : "right-1 md:-right-5"
            } ${arrowAccent[accent]} z-20 w-9 h-9 md:w-10 md:h-10 items-center justify-center rounded-full bg-background/90 border-2 border-white/20 text-foreground backdrop-blur-sm shadow-[0_2px_12px_rgba(0,0,0,0.5)] transition-[opacity,color,border-color] disabled:opacity-0 disabled:pointer-events-none`}
          >
            <Icon className="w-5 h-5" />
          </button>
        );
      })}
    </div>
  );
}

function StatusBadge({ status }: { status: CatalogItem["status"] }) {
  // Released status hidden: only surface non-Released states
  if (status === "Released") return null;
  return (
    <span
      className="px-3 py-1 bg-lime text-black text-xs uppercase tracking-wider border-2 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,0.8)] -rotate-3 inline-block rounded-sm"
      style={{ fontFamily: "var(--font-heading)", fontWeight: 700 }}
    >
      {status}
    </span>
  );
}

function ImageCard({ item, index, accent }: { item: CatalogItem; index: number; accent: Accent }) {
  const a = accentMap[accent];
  const rotate = index % 2 === 0 ? "-rotate-1" : "rotate-1";
  const contain = item.imagePosition === "object-contain";
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-50px" }}
      variants={fadeUp}
      custom={index}
      className={`group relative h-full overflow-hidden bg-white/[0.06] border-2 border-white/[0.12] ${a.hoverBorder} transition-[border-color,box-shadow] duration-300 hover:-translate-y-2 ${a.shadow} ${rotate} hover:rotate-0 rounded-sm will-change-transform ${item.path ? "cursor-pointer" : ""}`}
    >
      {item.path && (
        <Link to={item.path} className="absolute inset-0 z-10" aria-label={`View ${item.title} details`} />
      )}
      <div className="relative aspect-video overflow-hidden">
        {item.image && (
          <ImageWithFallback
            src={item.image}
            alt={item.title}
            className={`w-full h-full transition-transform duration-500 group-hover:scale-110 ${item.imagePosition} ${contain ? "p-6 bg-black/40" : ""}`}
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-card/90 to-transparent" />
        <div className="absolute top-3 right-3">
          <StatusBadge status={item.status} />
        </div>
      </div>
      <div className="p-6">
        <span
          className={`${a.categoryColor} text-xs uppercase tracking-wider`}
          style={{ fontFamily: "var(--font-heading)", fontWeight: 600 }}
        >
          {item.type} · {item.platforms.join(" & ")}
        </span>
        <h3
          className="text-foreground mt-1 mb-2"
          style={{ fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: "1.25rem" }}
        >
          {item.title}
        </h3>
        <p className="text-muted-foreground text-sm">{item.description}</p>
      </div>
    </motion.div>
  );
}

function LogoCard({ item, index, accent }: { item: CatalogItem; index: number; accent: Accent }) {
  const a = accentMap[accent];
  const rotate = index % 2 === 0 ? "rotate-1" : "-rotate-1";
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-50px" }}
      variants={fadeUp}
      custom={index}
      className={`relative h-full p-6 bg-white/[0.06] border-2 border-white/[0.12] ${a.hoverBorder} transition-[border-color,box-shadow] duration-300 hover:-translate-y-2 ${a.shadow} ${rotate} hover:rotate-0 rounded-sm will-change-transform ${item.path ? "cursor-pointer" : ""}`}
    >
      {item.path && (
        <Link to={item.path} className="absolute inset-0 z-10" aria-label={`View ${item.title} details`} />
      )}
      <div className="flex items-start justify-between mb-4">
        {item.logo && (
          <ImageWithFallback
            src={item.logo}
            alt={`${item.title} logo`}
            className="w-16 h-16 rounded-sm object-cover"
          />
        )}
        <div className="flex flex-col items-end gap-2">
          <StatusBadge status={item.status} />
          {item.collection && <CountBadge>{item.collection.badge}</CountBadge>}
        </div>
      </div>
      <span
        className={`${a.categoryColor} text-xs uppercase tracking-wider`}
        style={{ fontFamily: "var(--font-heading)", fontWeight: 600 }}
      >
        {item.type} · {item.platforms.join(" · ")}
      </span>
      <h3
        className="text-foreground mt-1 mb-2"
        style={{ fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: "1.25rem" }}
      >
        {item.title}
      </h3>
      <p className="text-muted-foreground text-sm">{item.description}</p>
    </motion.div>
  );
}

export function HomePage() {
  return (
    <div className="overflow-hidden">
      <PageMeta
        title="KrookedLilly"
        description="KrookedLilly is a husband-and-wife indie studio making games, apps, Minecraft mods, and game dev assets, including ExfilCraft, Acrostix, and HomunculAi."
        path="/"
        image="/og-image.png"
      />
      <h1 className="sr-only">
        KrookedLilly: indie games, apps, Minecraft mods, and game dev assets
      </h1>

      {/* Hero - ExfilCraft Featured */}
      <section className="relative pt-12 pb-20 lg:pt-16 lg:pb-28">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[radial-gradient(circle,_rgb(var(--primary-rgb)/0.15)_0%,_transparent_70%)]" />
          <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-[radial-gradient(circle,_rgb(var(--teal-rgb)/0.10)_0%,_transparent_70%)]" />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" as const }}
          >
            <Link
              to="/games/exfilcraft"
              className="group block bg-white/[0.06] border-2 border-white/[0.12] hover:border-primary-light/70 rounded-sm overflow-hidden transition-all hover:-translate-y-1 hover:shadow-[8px_8px_0px_0px_rgb(var(--primary-rgb)/0.12)] rotate-[0.5deg] hover:rotate-0"
            >
              <div className="grid grid-cols-1 lg:grid-cols-5">
                <div className="relative lg:col-span-3 aspect-video lg:aspect-auto lg:min-h-[22rem] overflow-hidden bg-black/20">
                  <ImageWithFallback
                    src={imgExfilCraftHero}
                    alt="ExfilCraft: an extraction portal beam rising over a Minecraft valley at dusk"
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                </div>

                <div className="lg:col-span-2 p-8 lg:p-12 flex flex-col justify-center">
                  <span
                    className="text-primary-light text-xs uppercase tracking-[0.2em] mb-2"
                    style={{ fontFamily: "var(--font-heading)", fontWeight: 600 }}
                  >
                    Minecraft Mod · NeoForge
                  </span>
                  <h2
                    className="text-3xl sm:text-4xl lg:text-5xl text-foreground mb-4"
                    style={{ fontFamily: "var(--font-display)" }}
                  >
                    ExfilCraft
                  </h2>
                  <p className="text-muted-foreground mb-2" style={{ fontSize: "1.05rem" }}>
                    Extraction survival for Minecraft. Carry your kit into hostile raid worlds, fight
                    for loot, and make it back through the portal, or drop it all.
                  </p>
                  <p className="text-teal-light/80 italic mb-6" style={{ fontSize: "0.95rem" }}>
                    "Infil. Loot. Exfil."
                  </p>
                  <div className="flex items-center gap-2 text-lime group-hover:gap-3 transition-all">
                    <span
                      className="uppercase tracking-wider text-sm"
                      style={{ fontFamily: "var(--font-heading)", fontWeight: 700 }}
                    >
                      Check it out
                    </span>
                    <ArrowRight className="w-4 h-4" />
                  </div>
                </div>
              </div>
            </Link>
          </motion.div>

          {/* Socials strip: slim call to action under the hero */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.25, duration: 0.5, ease: "easeOut" as const }}
            className="mt-8"
          >
            <Link
              to="/socials"
              className="group flex flex-col sm:flex-row items-center justify-between gap-3 sm:gap-6 px-5 py-4 sm:py-3.5 bg-[linear-gradient(90deg,rgb(var(--primary-rgb)/0.14),rgb(var(--teal-rgb)/0.14))] border-2 border-white/[0.12] hover:border-teal-light/70 rounded-sm transition-all hover:-translate-y-0.5 hover:shadow-[6px_6px_0px_0px_rgb(var(--teal-rgb)/0.15)] -rotate-[0.3deg] hover:rotate-0"
            >
              <div className="flex flex-col sm:flex-row items-center gap-3 sm:gap-5 text-center sm:text-left min-w-0">
                <div className="flex shrink-0" aria-hidden="true">
                  {socialStripIcons.map((icon, i) => (
                    <span
                      key={icon}
                      className={`w-8 h-8 -ml-1 first:ml-0 rounded-sm border-2 border-background flex items-center justify-center text-black transition-transform duration-300 ${
                        i % 2 === 0 ? "bg-primary -rotate-6 group-hover:-rotate-12" : "bg-teal rotate-6 group-hover:rotate-12"
                      }`}
                    >
                      <SocialIcon name={icon} className="w-4 h-4" />
                    </span>
                  ))}
                </div>
                <p className="text-sm sm:text-base">
                  <span className="text-foreground" style={{ fontFamily: "var(--font-heading)", fontWeight: 700 }}>
                    Come hang out.
                  </span>{" "}
                  <span className="text-muted-foreground">
                    Live dev streams on Twitch, clips on YouTube, and our Discord crew.
                  </span>
                </p>
              </div>
              <span
                className="flex items-center gap-2 text-lime shrink-0 uppercase tracking-wider text-sm group-hover:gap-3 transition-all"
                style={{ fontFamily: "var(--font-heading)", fontWeight: 700 }}
              >
                Follow along
                <ArrowRight className="w-4 h-4" />
              </span>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* One row per category */}
      {sections.map((section, sectionIndex) => {
        const items = itemsIn(section.category);
        const Icon = section.icon;
        const banded = sectionIndex % 2 === 0;
        // Alternate the first card's accent row to row so columns don't stack one color
        const firstAccent: Accent = section.accent === "teal" ? "primary" : "teal";
        const otherAccent: Accent = section.accent;
        return (
          <section
            key={section.category}
            className={`py-20 ${banded ? "bg-white/[0.02] backdrop-blur-sm border-y-2 border-white/[0.08]" : ""}`}
          >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-100px" }}
                className="flex flex-col sm:flex-row items-start sm:items-end justify-between mb-12 gap-4"
              >
                <div className="flex items-center gap-4">
                  <div
                    className={`w-10 h-10 ${accentMap[section.accent].iconBg} flex items-center justify-center ${section.iconTilt} rounded-sm`}
                  >
                    <Icon className="w-5 h-5 text-white" />
                  </div>
                  <motion.h2
                    variants={fadeUp}
                    custom={0}
                    className="text-3xl sm:text-4xl text-foreground"
                    style={{ fontFamily: "var(--font-display)" }}
                  >
                    {section.category}
                  </motion.h2>
                </div>
                <motion.div variants={fadeUp} custom={1}>
                  <Link
                    to={`/catalog?category=${categorySlug(section.category)}`}
                    className="inline-flex items-center gap-2 text-lime hover:text-lime/80 transition-colors uppercase tracking-wider text-sm"
                    style={{ fontFamily: "var(--font-heading)", fontWeight: 700 }}
                  >
                    See all {section.category}
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </motion.div>
              </motion.div>

              <CategoryRow label={section.category} accent={section.accent}>
                {items.map((item, i) => {
                  const accent = i % 2 === 0 ? firstAccent : otherAccent;
                  return section.variant === "image" ? (
                    <ImageCard key={item.id} item={item} index={i} accent={accent} />
                  ) : (
                    <LogoCard key={item.id} item={item} index={i} accent={accent} />
                  );
                })}
              </CategoryRow>
            </div>
          </section>
        );
      })}

      {/* Bottom CTA */}
      <section className="py-16 bg-white/[0.02] backdrop-blur-sm border-y-2 border-white/[0.08]">
        <div className="relative max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <motion.div variants={fadeUp} custom={0} className="flex items-center justify-center gap-3 mb-5">
              <Sparkles className="w-5 h-5 text-primary-light -rotate-12" />
              <Sparkles className="w-5 h-5 text-teal-light rotate-6" />
            </motion.div>
            <motion.h2
              variants={fadeUp}
              custom={1}
              className="text-2xl sm:text-4xl text-foreground mb-3"
              style={{ fontFamily: "var(--font-display)" }}
            >
              More on the way
            </motion.h2>
            <motion.p variants={fadeUp} custom={2} className="text-muted-foreground mb-6 max-w-md mx-auto">
              We've always got something cooking. Come hang out in the Discord, or send us a message
              if you want to suggest something or just say hey
            </motion.p>
            <motion.div variants={fadeUp} custom={3} className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/catalog"
                className="inline-flex items-center justify-center gap-2 px-8 py-3.5 bg-primary hover:bg-primary/90 text-black rounded-md border-2 border-primary-light transition-all hover:-translate-y-1 hover:shadow-[4px_4px_0px_0px_rgb(var(--primary-rgb)/0.4)] uppercase tracking-wider text-sm"
                style={{ fontFamily: "var(--font-heading)", fontWeight: 700 }}
              >
                Browse everything
                <ArrowRight className="w-4 h-4" />
              </Link>
              <a
                href={DISCORD_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-8 py-3.5 bg-transparent hover:bg-teal/10 text-teal-light border-2 border-teal-light/80 hover:border-teal-light rounded-md transition-all hover:-translate-y-1 hover:shadow-[4px_4px_0px_0px_rgb(var(--teal-rgb)/0.25)] uppercase tracking-wider text-sm"
                style={{ fontFamily: "var(--font-heading)", fontWeight: 700 }}
              >
                <SocialIcon name="discord" className="w-4 h-4" />
                Join the Discord
              </a>
              <Link
                to="/contact"
                className="inline-flex items-center justify-center gap-2 px-8 py-3.5 bg-transparent hover:bg-white/5 text-foreground border-2 border-white/20 hover:border-white/40 rounded-md transition-all hover:-translate-y-1 hover:shadow-[4px_4px_0px_0px_rgba(255,255,255,0.1)] uppercase tracking-wider text-sm"
                style={{ fontFamily: "var(--font-heading)", fontWeight: 700 }}
              >
                Say hi
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}

export default HomePage;
