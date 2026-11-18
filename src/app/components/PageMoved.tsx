import { Helmet } from "react-helmet-async";
import { Link, Navigate, useLocation } from "react-router-dom";
import { pageUrl } from "./JsonLd";
import { movedPages } from "../data/movedPages";

/**
 * Permanent redirect for a page listed in movedPages.ts.
 *
 * GitHub Pages can't send a real 301, so the pre-rendered HTML carries an
 * instant meta refresh plus a canonical to the new address (search engines
 * treat that pair as a permanent redirect). <Navigate> handles in-app
 * navigation and keeps any query string and hash.
 */
export function PageMoved() {
  const { pathname, search, hash } = useLocation();
  const path = pathname.replace(/\/$/, "");
  const move = movedPages.find((m) => m.from === path);
  const target = move?.to ?? "/";
  return (
    <>
      <Helmet>
        <title>{`${move?.title ?? "Page moved"} | KrookedLilly`}</title>
        <meta httpEquiv="refresh" content={`0; url=${target}`} />
        <link rel="canonical" href={pageUrl(target)} />
        <meta name="robots" content="noindex, follow" />
      </Helmet>
      <p className="max-w-7xl mx-auto px-4 py-16 text-muted-foreground">
        This page moved to{" "}
        <Link to={target} className="text-teal-light underline">
          krookedlilly.com{target}
        </Link>
        .
      </p>
      <Navigate to={`${target}${search}${hash}`} replace />
    </>
  );
}

export default PageMoved;
