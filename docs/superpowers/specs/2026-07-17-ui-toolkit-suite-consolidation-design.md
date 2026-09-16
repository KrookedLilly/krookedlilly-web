# UI Toolkit Suite Consolidation — Design

**Date:** 2026-07-17
**Status:** Approved design, pending spec review → implementation plan

## Problem

The Unity Asset Store library has grown to 15+ assets, with more on the way. The
[catalog](../../../src/app/components/GamesPage.tsx) renders one large
`aspect-video` card per item in a single flat grid. That does not scale:

- 15+ near-identical "Unity Asset" cards make the catalog long and repetitive.
- The lookalike cards drown out the flagship games and apps.
- Each asset implies its own on-site detail page — 15+ pages to maintain.

Most of the library is a single related family (the `UI Toolkit: *` assets), and
the site's job for these is to **drive visitors to the Unity Asset Store**, not to
host rich per-asset marketing pages. That combination is what makes consolidation
the right move.

## Approach (chosen)

Collapse the UI Toolkit family into **one catalog card** backed by a **data-driven
suite hub page**. Adding a new asset becomes a single data entry — no new card, no
new page.

Rejected alternatives:
- *Flat grid + Unity sub-filter + denser cards* — manages the symptom; selecting
  "Unity" still shows 15+ repetitive cards and keeps per-asset upkeep.
- *Separate "Unity Assets" storefront page* — bigger IA change; splits tools
  across two homes (Unity assets vs. SnackTray/AutoHideHud).

## Design

### 1. Single source of data — `src/app/data/unityAssets.ts`

One array is the only place touched to add/remove an asset. Everything else derives
from it.

```ts
export interface UnityAsset {
  name: string;        // "Screen Manager"  (display drops the "UI Toolkit:" prefix)
  blurb: string;       // one line, shown in the hub row
  status: "Released" | "In Development" | "Coming Soon";
  storeUrl: string;    // Unity Asset Store listing (opens in new tab)
  logo?: string;       // optional imported image; falls back to a colored initial chip
}

export const PUBLISHER_URL = "https://assetstore.unity.com/publishers/XXXXX"; // TODO
export const unityToolkitAssets: UnityAsset[] = [ /* TODO: real 15+ list */ ];
```

**Suite membership:** every `UI Toolkit: *` asset. HE Keyboards is *not* part of the
suite (see §5).

**Input needed at build time:** full list of 15+ assets (name, blurb, status, store
URL each) + the publisher page URL. Until provided, scaffold with the five entries
already in the code plus clearly-marked TODO placeholders.

### 2. Catalog change — `GamesPage.tsx`

- Remove the five+ `UI Toolkit: *` entries from the `projects` array.
- Add **one** synthetic card, "UI Toolkit Suite":
  - Same card styling as siblings.
  - Thumbnail = logo-cluster treatment + an "N assets" count badge, where
    `N = unityToolkitAssets.length` (derived, never hardcoded).
  - Category `Tools & Mods`, kind `Tool`, platform `Unity`.
  - Links to `/tools/ui-toolkit` (internal, not the store).
- Non-suite items (HE Keyboards, SnackTray, AutoHideHud, Card Labeler) and all
  games/apps are unchanged.
- The existing category filter / sort logic continues to work — the suite card is
  just another `Tools & Mods` entry.

### 3. New suite hub page — `/tools/ui-toolkit`

New route + `UiToolkitSuitePage.tsx`, following existing page conventions
(`PageMeta`, motion, layout tokens).

- **Hero:** eyebrow ("Unity Asset Store · UI Toolkit"), display title, one-line
  intro, and a primary button **"Browse all on the Unity Asset Store →"**
  (→ `PUBLISHER_URL`, new tab).
- **Compact row list** (chosen over mini-cards for density/scannability). Each row,
  mapped from `unityToolkitAssets`:
  - logo (or colored initial chip) · name · one-line blurb · status pill (rendered
    **only** when `status !== "Released"`, matching the site's existing
    "hide Released" convention) · "View on Asset Store →" (new tab).
  - Whole row is the link. Rows stack on mobile.
- This list is what scales: asset #16 = one array entry → one more row, plus the
  count badge and cluster update automatically.

### 4. Homepage teaser — `HomePage.tsx`

In the `mods` array feeding the "Tools & Mods" section, replace the standalone
"UI Toolkit: Screen Manager" card with the "UI Toolkit Suite" card (links to
`/tools/ui-toolkit`). The teaser stays a curated four.

### 5. Retire the per-asset detail pages

- Remove the five UI Toolkit detail routes from
  [routes.ts](../../../src/app/routes.ts): `screen-manager`, `tween-engine`,
  `responsive-layout`, `modal-notifications`, `focus-navigation`.
- Delete the now-orphaned page components (ScreenManagerPage, TweenEnginePage,
  ResponsiveLayoutPage, ModalNotificationsPage, FocusNavigationPage) and their
  unique asset imports to avoid dead code.
- **Redirect** each retired path to `/tools/ui-toolkit` (via a small redirect route
  entry per path) so existing inbound links don't hit the `*` NotFound route.
- **HE Keyboards is left entirely as-is** — its card and its detail page stay. It's
  a standalone (non-UI-Toolkit) asset and out of scope here.

## Isolation / boundaries

- `unityAssets.ts` — pure data + one derived count. No UI. The single edit point for
  the library.
- `UiToolkitSuitePage.tsx` — reads the data, renders hero + rows. Knows nothing
  about the catalog.
- `GamesPage.tsx` / `HomePage.tsx` — each render one suite card that links to the
  hub; they consume only `unityToolkitAssets.length`.
- `routes.ts` — adds one route, removes five, adds five redirects.

## Testing / verification

- Build passes (`npm run build`) — SSG pre-renders `/tools/ui-toolkit`.
- Catalog shows exactly one "UI Toolkit Suite" card; count badge equals array
  length; the five old cards are gone.
- Hub renders one row per asset; Released rows show no status pill; every row and
  the hero button open the correct store URL in a new tab.
- Old paths (`/tools/screen-manager`, etc.) redirect to `/tools/ui-toolkit`.
- Homepage teaser shows the suite card, still four cards total.

## Out of scope

- Rich per-asset on-site pages (explicitly not the goal — drive to store).
- Restyling HE Keyboards / other non-suite tools.
- Per-asset pricing/version display (possible later; data model can extend).
- Any deploy (deploy only on explicit user request).
