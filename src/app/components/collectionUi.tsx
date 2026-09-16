import { ImageWithFallback } from "./figma/ImageWithFallback";

/**
 * Shared UI bits for "collection" hubs (UI Toolkit suite, Minecraft mods, and
 * any future grouping): the logo-or-initial chip, the status pill, and the
 * accent palette used for fallback chips.
 */

export type CollectionStatus = "Released" | "In Development" | "Coming Soon";

/** Fallback chip colors, cycled by index. Teal/lime take dark text. */
export const chipAccents = [
  { bg: "#a05cf6", fg: "#ffffff" }, // primary
  { bg: "#22d3ee", fg: "#0c0c0c" }, // teal
  { bg: "#84cc16", fg: "#0c0c0c" }, // lime
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
      ? "text-teal border-teal/35"
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
