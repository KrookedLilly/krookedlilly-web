import type { SocialIconName } from "../components/SocialIcon";

/**
 * Single source of truth for KrookedLilly's social profiles and storefronts.
 *
 * `socials` drives the footer icon row and the Contact page. Every URL in
 * `ORGANIZATION_SAME_AS` is published in the site-wide Organization JSON-LD
 * (see SiteJsonLd.tsx), which is how search engines and AI assistants learn
 * these profiles all belong to KrookedLilly. Only list profiles the studio
 * itself owns there; personal accounts belong on a Person, not the
 * Organization.
 */
export interface SocialLink {
  label: string;
  handle: string;
  url: string;
  icon: SocialIconName;
}

export const socials: SocialLink[] = [
  { label: "YouTube", handle: "@KrookedLilly", url: "https://www.youtube.com/@KrookedLilly", icon: "youtube" },
  { label: "Twitch", handle: "krookedlilly", url: "https://www.twitch.tv/krookedlilly", icon: "twitch" },
  { label: "TikTok", handle: "@krookedlilly", url: "https://www.tiktok.com/@krookedlilly", icon: "tiktok" },
  { label: "Instagram", handle: "krookedlilly", url: "https://www.instagram.com/krookedlilly/", icon: "instagram" },
  { label: "Bluesky", handle: "krookedlilly.bsky.social", url: "https://bsky.app/profile/krookedlilly.bsky.social", icon: "bluesky" },
  { label: "X", handle: "@krookedLilly", url: "https://x.com/krookedLilly", icon: "x" },
  { label: "Reddit", handle: "u/KrookedLilly", url: "https://www.reddit.com/user/KrookedLilly/", icon: "reddit" },
  { label: "Ko-fi", handle: "krookedlilly", url: "https://ko-fi.com/krookedlilly", icon: "kofi" },
];

/** Community Discord, also the ExfilCraft server community. Linked on pages, not a sameAs profile. */
export const DISCORD_URL = "https://discord.gg/aad7aYPRfs";

/** Jenn's personal channel. She streams KrookedLilly work alongside her own. */
export const JENN_TWITCH_URL = "https://www.twitch.tv/deathlilly522";

/** Storefront and mod-host profiles. */
export const UNITY_PUBLISHER_URL = "https://assetstore.unity.com/publishers/36914";
export const ITCH_URL = "https://krookedlilly.itch.io/";
export const GAMEDEVMARKET_URL = "https://www.gamedevmarket.net/member/krookedlilly";
export const CURSEFORGE_AUTHOR_URL = "https://www.curseforge.com/members/krookedlilly/projects";
export const MODRINTH_AUTHOR_URL = "https://modrinth.com/user/krookedlilly";

export const ORGANIZATION_SAME_AS: string[] = [
  ...socials.map((s) => s.url),
  UNITY_PUBLISHER_URL,
  ITCH_URL,
  GAMEDEVMARKET_URL,
  CURSEFORGE_AUTHOR_URL,
  MODRINTH_AUTHOR_URL,
];
