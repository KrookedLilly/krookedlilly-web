import imgGpsCard from "@/assets/gps-store-background.webp";
import imgHomunculAiCard from "@/assets/homunculai-capsule-main.webp";
import imgExfilCraftCard from "@/assets/exfilcraft-portal.webp";
import imgSquamojisCard from "@/assets/squamojis-bundle.webp";
import imgSquamojisIcon from "@/assets/squamojis-icon.png";
import imgScreenManagerIcon from "@/assets/uitk-screen-manager-icon.png";
import { acrostixCardImage } from "../assets/acrostix-screenshots";
import { matchFivesCardImage } from "../assets/matchfives-screenshots";
import { ballDropCardImage } from "../assets/balldrop-screenshots";
import { heKeyboardsCardImage, heKeyboardsIcon } from "../assets/hekeyboards-screenshots";
import { snackTrayCardImage, snackTrayLogo } from "../assets/snacktray-screenshots";
import { unityToolkitAssets, unityToolkitCount } from "./unityAssets";
import { minecraftMods, modPath } from "./minecraftMods";

/**
 * Single source of truth for everything KrookedLilly makes.
 *
 * The home page rows and the /catalog grid both render from this list, grouped
 * by `category`. To add a product: add one entry here (and its route in
 * routes.ts if it gets a page). Also add it to public/llms.txt so AI
 * assistants can find it.
 */
export type Category = "Games" | "Apps" | "Mods" | "Game Dev Assets";
export type Kind = "Game" | "App" | "Mod" | "Asset";

export const categories: Category[] = ["Games", "Apps", "Mods", "Game Dev Assets"];

/** URL form of a category, used by /catalog?category=<slug>. */
export function categorySlug(category: Category): string {
  return category.toLowerCase().replace(/\s+/g, "-");
}

export function categoryFromSlug(slug: string | null): Category | undefined {
  return categories.find((c) => categorySlug(c) === slug);
}

export interface CatalogItem {
  id: string;
  title: string;
  category: Category;
  kind: Kind;
  /** Genre or product type, e.g. "Creative Word Game", "Unity Asset". */
  type: string;
  platforms: string[];
  /** One short line for catalog cards. */
  tagline: string;
  /** A sentence or two for home page cards. */
  description: string;
  /** Wide (16:9-ish) card image. */
  image?: string;
  /** Tailwind object-fit/position classes for `image`. */
  imagePosition: string;
  /** Square icon for compact cards. */
  logo?: string;
  status: "Released" | "In Development" | "Coming Soon" | "In Review";
  /** Internal page, or null if there isn't one yet. */
  path: string | null;
  /** Set on cards that stand in for a whole collection. */
  collection?: { members: { name: string; logo?: string; cover?: string }[]; badge: string };
}

const mods: CatalogItem[] = minecraftMods.map((mod) => ({
  id: mod.slug,
  title: mod.name,
  category: "Mods",
  kind: "Mod",
  type: "Minecraft Mod",
  platforms: mod.loaders,
  tagline: mod.blurb,
  description: mod.blurb,
  image: mod.slug === "exfilcraft" ? imgExfilCraftCard : mod.logo,
  imagePosition: mod.slug === "exfilcraft" ? "object-cover" : "object-contain",
  logo: mod.logo,
  status: mod.status,
  path: modPath(mod),
}));

export const catalog: CatalogItem[] = [
  /* ─── Games ─── */
  {
    id: "acrostix",
    title: "Acrostix",
    category: "Games",
    kind: "Game",
    type: "Creative Word Game",
    platforms: ["iOS", "Android"],
    tagline: "One word. Infinite sentences.",
    description:
      "Build sentences from acrostic words and get scored on grammar, complexity, and creativity. Campaign mode with themed islands, endless replayability",
    image: acrostixCardImage,
    imagePosition: "object-cover object-[center_12%]",
    status: "Released",
    path: "/games/acrostix",
  },
  {
    id: "50-ball-drop",
    title: "50 Ball Drop",
    category: "Games",
    kind: "Game",
    type: "Arcade",
    platforms: ["iOS"],
    tagline: "Drop balls, watch mayhem unfold, unlock a pile of cosmetics.",
    description:
      "Drop balls, watch mayhem unfold, unlock a wild amount of cosmetics. Way more drip than you'd expect",
    image: ballDropCardImage,
    imagePosition: "object-cover",
    status: "Released",
    path: "/games/50-ball-drop",
  },
  {
    id: "match-fives",
    title: "Match Fives",
    category: "Games",
    kind: "Game",
    type: "Puzzle",
    platforms: ["iOS"],
    tagline: "Match numbers, chase high scores. Simple to pick up, hard to put down.",
    description:
      "Match numbers together and chase high scores. Simple to pick up, surprisingly hard to put down",
    image: matchFivesCardImage,
    imagePosition: "object-cover object-center",
    status: "Released",
    path: "/games/match-fives",
  },
  {
    id: "galactic-parcel-service",
    title: "Galactic Parcel Service",
    category: "Games",
    kind: "Game",
    type: "Simulation",
    platforms: ["PC", "Mobile"],
    tagline: "Build a fleet, deliver packages, terraform planets. Open-world, play your way.",
    description:
      "Build a fleet, deliver packages, and terraform planets in an open-world space delivery sim",
    image: imgGpsCard,
    imagePosition: "object-cover",
    status: "In Development",
    path: "/games/galactic-parcel-service",
  },

  /* ─── Apps ─── */
  {
    id: "homunculai",
    title: "HomunculAi",
    category: "Apps",
    kind: "App",
    type: "Desktop App",
    platforms: ["Windows"],
    tagline: "What body will your AI make?",
    description:
      "A little transparent window where your AI gets a body it controls itself. 45 bodies, custom SVG, two-way chat. Works with any MCP client",
    image: imgHomunculAiCard,
    imagePosition: "object-cover",
    status: "Released",
    path: "/games/homunculai",
  },
  {
    id: "snacktray",
    title: "SnackTray",
    category: "Apps",
    kind: "App",
    type: "macOS App",
    platforms: ["macOS"],
    tagline: "Menu bar window snapping for multi-monitor macOS setups.",
    description: "Menu bar app for custom window snapping layouts on multiple monitors",
    image: snackTrayCardImage,
    imagePosition: "object-cover",
    logo: snackTrayLogo,
    status: "Released",
    path: "/tools/snacktray",
  },

  /* ─── Mods ─── */
  ...mods,

  /* ─── Game Dev Assets ─── */
  {
    id: "ui-toolkit",
    title: "UI Toolkit Suite",
    category: "Game Dev Assets",
    kind: "Asset",
    type: "Unity Asset Suite",
    platforms: ["Unity"],
    tagline: `${unityToolkitCount} drop-in packages for Unity's UI Toolkit, from navigation and theming to ECS bindings.`,
    description: `${unityToolkitCount} drop-in packages for Unity's UI Toolkit: screens, tweens, theming, forms, data binding, a 35+ control library, and more`,
    imagePosition: "object-cover",
    logo: imgScreenManagerIcon,
    status: "Released",
    path: "/tools/ui-toolkit",
    collection: { members: unityToolkitAssets, badge: `${unityToolkitCount} assets` },
  },
  {
    id: "he-keyboards",
    title: "HE Keyboard",
    category: "Game Dev Assets",
    kind: "Asset",
    type: "Unity Asset",
    platforms: ["Unity"],
    tagline: "Hall Effect Keyboards support for Unity. Analog pressure from every key.",
    description: "Hall Effect Keyboards support for Unity games. Analog pressure values from every key",
    image: heKeyboardsCardImage,
    imagePosition: "object-cover",
    logo: heKeyboardsIcon,
    status: "Released",
    path: "/tools/he-keyboards",
  },
  {
    id: "squamojis",
    title: "Squamojis",
    category: "Game Dev Assets",
    kind: "Asset",
    type: "2D Icon Pack",
    platforms: ["itch.io", "GameDevMarket"],
    tagline: "240 square emoji in 3 styles, still or animated. SVG, PSD, PNG, Lottie.",
    description: "80 square emoji in 3 styles, still or animated, with SVG, PSD, PNG, sprite sheets, and Lottie",
    image: imgSquamojisCard,
    imagePosition: "object-cover",
    logo: imgSquamojisIcon,
    status: "Released",
    path: "/tools/squamojis",
  },
];

export function itemsIn(category: Category): CatalogItem[] {
  return catalog.filter((item) => item.category === category);
}
