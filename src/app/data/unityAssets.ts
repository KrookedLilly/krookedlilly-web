import imgScreenManagerIcon from "@/assets/screenmanager-icon.png";

/**
 * Single source of truth for the Unity "UI Toolkit" asset suite.
 *
 * To add an asset: append one entry below. The catalog card's "N assets"
 * count, the suite-card logo cluster, and every row on /tools/ui-toolkit all
 * derive from this array, so nothing else needs to change.
 */
export interface UnityAsset {
  /** Display name; drop the "UI Toolkit:" prefix (it's implied by the suite). */
  name: string;
  /** One line, shown as the row subtitle on the hub. */
  blurb: string;
  status: "Released" | "In Development" | "Coming Soon";
  /** Unity Asset Store listing URL. Opens in a new tab. */
  storeUrl: string;
  /** Optional square logo import. Falls back to a colored initial chip. */
  logo?: string;
}

/** Publisher storefront for the "Browse all on the Unity Asset Store" button. */
// TODO: replace with the real KrookedLilly Unity publisher URL.
export const PUBLISHER_URL = "https://assetstore.unity.com/publishers/00000";

// TODO: fill in real storeUrl for each asset, correct statuses, and add the
// remaining published assets (target 15+). The first five mirror what the site
// already described; entries marked PLACEHOLDER are scaffolding to prove the
// list scales and should be replaced/removed once the real catalog is handed in.
export const unityToolkitAssets: UnityAsset[] = [
  {
    name: "Screen Manager",
    blurb: "Transitions, nav stacks, and lifecycle events out of the box.",
    status: "In Development",
    storeUrl: PUBLISHER_URL, // TODO: real listing URL
    logo: imgScreenManagerIcon,
  },
  {
    name: "Tween Engine",
    blurb: "Chainable tweens: easing curves, sequences, zero-GC playback.",
    status: "In Development",
    storeUrl: PUBLISHER_URL, // TODO: real listing URL
  },
  {
    name: "Responsive Layout",
    blurb: "Breakpoints, adaptive grids, and safe areas. One UI, every aspect ratio.",
    status: "In Development",
    storeUrl: PUBLISHER_URL, // TODO: real listing URL
  },
  {
    name: "Modal & Notifications",
    blurb: "Stackable modals and toast queues: focus traps, dismissal, theming.",
    status: "In Development",
    storeUrl: PUBLISHER_URL, // TODO: real listing URL
  },
  {
    name: "Focus & Navigation",
    blurb: "Keyboard and gamepad navigation with auto-focus maps and mixed input.",
    status: "In Development",
    storeUrl: PUBLISHER_URL, // TODO: real listing URL
  },
  // --- PLACEHOLDER entries below (replace with real assets) ---
  {
    name: "Data Binding",
    blurb: "Two-way bindings between UI Toolkit and your view models.",
    status: "Released",
    storeUrl: PUBLISHER_URL, // TODO
  },
  {
    name: "Virtualized List",
    blurb: "Millions of rows at 60fps with pooled, recycled elements.",
    status: "Released",
    storeUrl: PUBLISHER_URL, // TODO
  },
];

/** Count used by the catalog suite card badge and the hub header. */
export const unityToolkitCount = unityToolkitAssets.length;
