import { ORGANIZATION_SAME_AS } from "../data/socials";

export const SITE_URL = "https://www.krookedlilly.com";
/** Stable id for the studio node, so product pages can reference it. */
export const ORG_ID = `${SITE_URL}/#organization`;
export const ORG_REF = { "@id": ORG_ID };

/**
 * Absolute canonical URL, without a trailing slash. The build writes a flat
 * `<path>.html` next to each `<path>/index.html` (see vite.config.ts), and
 * GitHub Pages serves `/foo` straight from `foo.html` with a 200, so the
 * slashless form is the one that resolves without a redirect.
 */
export function pageUrl(path: string): string {
  return path === "/" ? `${SITE_URL}/` : `${SITE_URL}${path.replace(/\/$/, "")}`;
}

/**
 * Renders schema.org structured data. Inline in the page body (Google reads it
 * anywhere in the document), which keeps it in the pre-rendered HTML.
 */
export function JsonLd({ data }: { data: object }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify({ "@context": "https://schema.org", ...data }) }}
    />
  );
}

/** Studio-wide Organization + WebSite nodes, rendered once by Layout on every page. */
export function SiteJsonLd() {
  return (
    <JsonLd
      data={{
        "@graph": [
          {
            "@type": "Organization",
            "@id": ORG_ID,
            name: "KrookedLilly",
            legalName: "KrookedLilly LLC",
            url: `${SITE_URL}/`,
            logo: `${SITE_URL}/krookedlilly-logo.png`,
            description:
              "KrookedLilly is a husband-and-wife indie studio that makes games, apps, Minecraft mods, and game dev assets.",
            email: "support@krookedlilly.com",
            sameAs: ORGANIZATION_SAME_AS,
          },
          {
            "@type": "WebSite",
            "@id": `${SITE_URL}/#website`,
            name: "KrookedLilly",
            url: `${SITE_URL}/`,
            publisher: ORG_REF,
          },
        ],
      }}
    />
  );
}
