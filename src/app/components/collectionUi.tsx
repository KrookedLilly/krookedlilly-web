import { useEffect, useState, type ReactNode } from "react";
import { useLocation } from "react-router-dom";
import { motion } from "motion/react";
import { ChevronDown, Layers } from "lucide-react";
import { ImageWithFallback } from "./figma/ImageWithFallback";

/**
 * Shared UI bits for "collection" hubs (UI Toolkit suite, Minecraft mods, and
 * any future grouping): the logo-or-initial chip, the status pill, and the
 * accent palette used for fallback chips.
 */

export type CollectionStatus = "Released" | "In Development" | "Coming Soon";

/** Fallback chip colors, cycled by index. Teal/lime take dark text. */
export const chipAccents = [
  { bg: "var(--primary)", fg: "#ffffff" }, // primary
  { bg: "var(--teal)", fg: "#0c0c0c" }, // teal
  { bg: "var(--lime)", fg: "#0c0c0c" }, // lime
];

export function collectionInitials(name: string): string {
  return name
    .split(/\s+/)
    .filter((w) => /[a-z0-9]/i.test(w))
    .slice(0, 2)
    .map((w) => w[0]!.toUpperCase())
    .join("");
}

const chipSizes = {
  sm: { box: "w-9 h-9", text: "0.7rem" },
  md: { box: "w-11 h-11", text: "0.95rem" },
} as const;

/** A logo (if present) or a colored initial chip as a fallback. */
export function CollectionChip({
  name,
  logo,
  index = 0,
  size = "md",
}: {
  name: string;
  logo?: string;
  index?: number;
  size?: keyof typeof chipSizes;
}) {
  const s = chipSizes[size];
  if (logo) {
    return (
      <ImageWithFallback
        src={logo}
        alt={`${name} icon`}
        className={`${s.box} rounded-sm object-cover shrink-0 border border-white/[0.12]`}
      />
    );
  }
  const accent = chipAccents[index % chipAccents.length];
  return (
    <span
      className={`${s.box} rounded-sm shrink-0 flex items-center justify-center border border-white/[0.12]`}
      style={{
        backgroundColor: accent.bg,
        color: accent.fg,
        fontFamily: "var(--font-heading)",
        fontWeight: 700,
        fontSize: s.text,
      }}
    >
      {collectionInitials(name)}
    </span>
  );
}

/** Status pill, rendered only for non-Released items (matches the site convention). */
export function CollectionStatusPill({ status }: { status: CollectionStatus }) {
  if (status === "Released") return null;
  const cls =
    status === "Coming Soon"
      ? "text-teal-light border-teal-light/60"
      : "text-muted-foreground border-white/15";
  return (
    <span
      className={`inline-block px-2 py-0.5 text-[0.6rem] uppercase tracking-wider rounded-sm border ${cls}`}
      style={{ fontFamily: "var(--font-heading)", fontWeight: 600 }}
    >
      {status}
    </span>
  );
}

/**
 * "13 assets"-style count sticker for collections. Deliberately the inverse of
 * the solid lime status sticker ("In Development"): outlined, tilted the other
 * way, and with a stack icon, so the two never read as the same thing.
 */
export function CountBadge({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <span
      className={`inline-flex items-center gap-1.5 px-3 py-1 bg-black text-lime text-xs uppercase tracking-wider border-2 border-lime rotate-3 rounded-sm shadow-[2px_2px_0px_0px_rgba(132,204,22,0.45)] ${className}`}
      style={{ fontFamily: "var(--font-heading)", fontWeight: 700 }}
    >
      <Layers className="w-3.5 h-3.5" />
      {children}
    </span>
  );
}

const rowFadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: Math.min(i, 6) * 0.06, duration: 0.4, ease: "easeOut" as const },
  }),
};

/**
 * A hub row that expands to show cover art, features, and a meta line.
 * The details stay in the pre-rendered HTML (just `hidden`), so search engines
 * still read them, and linking to `#<id>` opens the row on arrival.
 */
export function ExpandableRow({
  id,
  index,
  header,
  aside,
  cover,
  coverAlt,
  features,
  meta,
  actions,
}: {
  id: string;
  index: number;
  /** Chip, name, and blurb. The whole header toggles the row. */
  header: ReactNode;
  /** Always-visible controls beside the header (price, store buttons). */
  aside?: ReactNode;
  cover?: string;
  coverAlt: string;
  features: string[];
  meta?: ReactNode;
  actions?: ReactNode;
}) {
  const { hash } = useLocation();
  const [open, setOpen] = useState(false);
  useEffect(() => {
    if (hash === `#${id}`) setOpen(true);
  }, [hash, id]);

  // Rotate teal/purple row to row
  const accent = index % 2 === 0 ? "text-teal-light" : "text-primary-light";
  const hoverAccent = index % 2 === 0 ? "group-hover:text-teal-light" : "group-hover:text-primary-light";
  const openBorder = index % 2 === 0 ? "border-teal-light/55" : "border-primary-light/55";

  return (
    <motion.div
      id={id}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-30px" }}
      variants={rowFadeUp}
      custom={index}
      className={`scroll-mt-24 rounded-sm border transition-[background-color,border-color] duration-200 ${
        open ? `${openBorder} bg-white/[0.04]` : "border-transparent hover:border-white/[0.12] hover:bg-white/[0.04]"
      }`}
    >
      <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4 px-4 sm:px-5 py-3.5">
        <button
          type="button"
          onClick={() => setOpen((o) => !o)}
          aria-expanded={open}
          aria-controls={`${id}-details`}
          className="group flex items-center gap-4 min-w-0 flex-1 text-left"
        >
          {header}
          <ChevronDown
            className={`w-4 h-4 shrink-0 text-muted-foreground transition-transform duration-200 ${hoverAccent} ${open ? `rotate-180 ${accent}` : ""}`}
          />
        </button>
        {aside && <div className="flex flex-wrap items-center gap-2 shrink-0 pl-[3.75rem] sm:pl-0">{aside}</div>}
      </div>

      <div id={`${id}-details`} hidden={!open} className="px-4 sm:px-5 pb-5">
        <div className="grid grid-cols-1 md:grid-cols-[minmax(0,20rem)_1fr] gap-5 md:gap-6 pt-1">
          {cover && (
            <ImageWithFallback
              src={cover}
              alt={coverAlt}
              loading="lazy"
              className="w-full rounded-sm border border-white/[0.12] object-cover aspect-[3/2]"
            />
          )}
          <div className="min-w-0">
            <ul className="space-y-1.5 text-sm text-muted-foreground">
              {features.map((f) => (
                <li key={f} className="flex gap-2">
                  <span className={accent}>+</span>
                  {f}
                </li>
              ))}
            </ul>
            {meta && (
              <p
                className="text-muted-foreground/70 text-[0.7rem] uppercase tracking-wider mt-4"
                style={{ fontFamily: "var(--font-heading)", fontWeight: 600 }}
              >
                {meta}
              </p>
            )}
            {actions && <div className="flex flex-wrap gap-2 mt-4">{actions}</div>}
          </div>
        </div>
      </div>
    </motion.div>
  );
}
