import imgAutoHideHudLogo from "@/assets/autohidehud-logo.png";

/**
 * Single source of truth for the Minecraft mods collection.
 *
 * To add a mod: append one entry below. The catalog card's count badge, the
 * collection-card cluster, and every row on /tools/minecraft-mods all derive
 * from this array.
 *
 * Each mod links out to both CurseForge (primary) and Modrinth. A row renders a
 * button per platform it has a URL for.
 */
export interface MinecraftMod {
  name: string;
  blurb: string;
  status: "Released" | "In Development" | "Coming Soon";
  /** CurseForge project URL (primary). */
  curseForgeUrl?: string;
  /** Modrinth project URL. */
  modrinthUrl?: string;
  /** Optional square logo import; falls back to a colored initial chip. */
  logo?: string;
}

// TODO: replace with the real author/org pages for the "Browse all" buttons.
export const CURSEFORGE_AUTHOR_URL = "https://www.curseforge.com/members/krookedlilly/projects";
export const MODRINTH_AUTHOR_URL = "https://modrinth.com/user/krookedlilly";

// TODO: confirm each blurb and status, and fill in the real per-mod CurseForge
// and Modrinth URLs. Blurbs below are first-pass guesses from the mod names and
// should be corrected. Statuses default to "Released" (these are described as an
// existing set) — flag any that are still in development.
export const minecraftMods: MinecraftMod[] = [
  {
    name: "Snail Mob",
    blurb: "Adds a slow, shy snail mob with its own drops and behaviors.", // TODO confirm
    status: "Released",
    curseForgeUrl: CURSEFORGE_AUTHOR_URL, // TODO: real project URL
    modrinthUrl: MODRINTH_AUTHOR_URL, // TODO: real project URL
  },
  {
    name: "Exfilcraft",
    blurb: "Extraction-shooter tension for Minecraft: raid, loot, and exfil before the timer.", // TODO confirm
    status: "Released",
    curseForgeUrl: CURSEFORGE_AUTHOR_URL, // TODO
    modrinthUrl: MODRINTH_AUTHOR_URL, // TODO
  },
  {
    name: "Crafter Tweaks",
    blurb: "Quality-of-life crafting tweaks: recipe search, bulk craft, and smarter output.", // TODO confirm
    status: "Released",
    curseForgeUrl: CURSEFORGE_AUTHOR_URL, // TODO
    modrinthUrl: MODRINTH_AUTHOR_URL, // TODO
  },
  {
    name: "Hall Effect: Analog Movement",
    blurb: "Analog walk speed from Hall Effect controllers, mapped to Minecraft movement.", // TODO confirm
    status: "Released",
    curseForgeUrl: CURSEFORGE_AUTHOR_URL, // TODO
    modrinthUrl: MODRINTH_AUTHOR_URL, // TODO
  },
  {
    name: "AutoHideHUD",
    blurb: "Auto-hides your HUD to your parameters. See the world, not your hotbar.",
    status: "Released",
    curseForgeUrl: CURSEFORGE_AUTHOR_URL, // TODO
    modrinthUrl: MODRINTH_AUTHOR_URL, // TODO
    logo: imgAutoHideHudLogo,
  },
];

/** Count used by the catalog collection card badge and the hub header. */
export const minecraftModCount = minecraftMods.length;
