/**
 * Pages that moved to a new address. Each `from` path stays alive as a
 * pre-rendered redirect page (see PageMoved.tsx), so ads, store listings and
 * old posts that link to it keep working.
 *
 * Paths have no trailing slash, like every URL on the site.
 */
export interface MovedPage {
  from: string;
  to: string;
  /** Title for the redirect page's <title>. */
  title: string;
}

export const movedPages: MovedPage[] = [
  // Apps live under /apps (owner, 2026-11-17). SnackTray ads link to the old address.
  { from: "/tools/snacktray", to: "/apps/snacktray", title: "SnackTray" },
];
