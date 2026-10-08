import imgAutoHideHudLogo from "@/assets/autohidehud-logo.png";
import imgExfilCraftIcon from "@/assets/exfilcraft-icon.png";
import imgHallEffectIcon from "@/assets/halleffect-mod-icon.png";
import imgSnailMobIcon from "@/assets/snailmob-icon.png";
import imgExfilCraftCover from "@/assets/exfilcraft-portal.webp";
import imgAutoHideHudCover from "@/assets/autohidehud-cover.webp";
import imgHallEffectCover from "@/assets/halleffect-cover.webp";
import imgSnailMobCover from "@/assets/snailmob-cover.webp";
import { CURSEFORGE_AUTHOR_URL, MODRINTH_AUTHOR_URL } from "./socials";

export { CURSEFORGE_AUTHOR_URL, MODRINTH_AUTHOR_URL };

/**
 * Single source of truth for the Minecraft mods collection.
 *
 * To add a mod: append one entry below. The catalog cards, the home page
 * Mods row, the count badge, and every row on /tools/minecraft-mods all derive
 * from this array.
 *
 * Each mod links out to both CurseForge (primary) and Modrinth. The slug is
 * the same on both hosts, so the URLs are built from it. A mod with its own
 * page on this site sets `detailPath`; the rest link to their row on the hub
 * (`/tools/minecraft-mods#<slug>`).
 */
export interface MinecraftMod {
  name: string;
  /** Project slug on CurseForge and Modrinth (they match for every mod). */
  slug: string;
  blurb: string;
  status: "Released" | "In Development" | "Coming Soon";
  /** Mod loaders, e.g. ["Fabric", "NeoForge"]. */
  loaders: string[];
  /** Human-readable supported Minecraft versions. */
  versions: string;
  /** Where it needs installing. */
  side: "Client only" | "Client & server";
  /** CurseForge project URL (primary). */
  curseForgeUrl?: string;
  /** Modrinth project URL. */
  modrinthUrl?: string;
  /** Square logo import; falls back to a colored initial chip. */
  logo?: string;
  /** Screenshot shown when the row is expanded. */
  cover?: string;
  /** Key features, shown when the row is expanded. */
  features: string[];
  /** Internal page with the full write-up, if the mod has one. */
  detailPath?: string;
}

const curseForge = (slug: string) => `https://www.curseforge.com/minecraft/mc-mods/${slug}`;
const modrinth = (slug: string) => `https://modrinth.com/mod/${slug}`;

export const minecraftMods: MinecraftMod[] = [
  {
    name: "ExfilCraft",
    slug: "exfilcraft",
    blurb: "Extraction survival: raid hostile worlds for loot, then reach the portal or drop it all.",
    status: "Released",
    loaders: ["NeoForge"],
    versions: "26.2",
    side: "Client & server",
    curseForgeUrl: curseForge("exfilcraft"),
    modrinthUrl: modrinth("exfilcraft"),
    logo: imgExfilCraftIcon,
    cover: imgExfilCraftCover,
    features: [
      "Timed raids in Overworld, Nether, End, and Deep Dark maps",
      "Extract through the portal or drop everything you carried in",
      "A safe home plot with residents who work jobs for you",
      "The Market, squads, and optional proximity voice chat",
      "About 20 new mobs, plus a public server at play.exfilcraft.com",
    ],
    detailPath: "/games/exfilcraft",
  },
  {
    name: "Auto Hide HUD",
    slug: "auto-hide-hud",
    blurb: "Hides your HUD when you're idle and brings it back on your triggers, like low health or hunger.",
    status: "Released",
    loaders: ["Fabric", "NeoForge"],
    versions: "1.21 to 26.3",
    side: "Client only",
    curseForgeUrl: curseForge("auto-hide-hud"),
    modrinthUrl: modrinth("auto-hide-hud"),
    logo: imgAutoHideHudLogo,
    cover: imgAutoHideHudCover,
    features: [
      "Hides the HUD after a period of inactivity",
      "Choose exactly which HUD elements hide",
      "Brings it back when health, hunger, or air drop below your thresholds",
      "Optional companion app shows position, health, and more on a second monitor",
    ],
  },
  {
    name: "Hall Effect: Analog Keyboard Movement",
    slug: "hall-effect-analog-keyboard-movement",
    blurb: "Real analog WASD for Hall Effect Keyboards (HE keyboards). Press partway to walk slow, all the way for full speed.",
    status: "Released",
    loaders: ["Fabric", "NeoForge"],
    versions: "1.21 to 26.3",
    side: "Client only",
    curseForgeUrl: curseForge("hall-effect-analog-keyboard-movement"),
    modrinthUrl: modrinth("hall-effect-analog-keyboard-movement"),
    logo: imgHallEffectIcon,
    cover: imgHallEffectCover,
    features: [
      "Analog WASD movement through the Wooting Analog SDK",
      "Press partway to walk slowly, fully for full speed",
      "On-screen pressure readout and SDK status panel",
      "Wooting keyboards, plus other brands through the Universal Analog Plugin",
    ],
  },
  {
    name: "Snail Mob",
    slug: "snail-mob",
    blurb: "Jeffery the snail wants revenge. He's slow, he never stops, and one touch kills you.",
    status: "Released",
    loaders: ["NeoForge"],
    versions: "1.21 to 26.2",
    side: "Client & server",
    curseForgeUrl: curseForge("snail-mob"),
    modrinthUrl: modrinth("snail-mob"),
    logo: imgSnailMobIcon,
    cover: imgSnailMobCover,
    features: [
      "Jeffery hunts you from the moment you spawn",
      "Slow, relentless, and his touch kills",
      "Track him with the Snail Locator, Sensor, Tracking Map, and Beacon",
      "Config hot-reloads",
    ],
  },
];

/** Where a mod card should link: its own page, or its row on the hub. */
export function modPath(mod: MinecraftMod): string {
  return mod.detailPath ?? `/tools/minecraft-mods#${mod.slug}`;
}

/** Count used by the catalog collection card badge and the hub header. */
export const minecraftModCount = minecraftMods.length;
