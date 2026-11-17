import { Helmet } from "react-helmet-async";
import { Link, Navigate, useLocation } from "react-router-dom";
import { pageUrl } from "./JsonLd";

/**
 * HomunculAi moved from /games/homunculai to /apps/homunculai (owner, 2026-11-17).
 * Every old path (the page and its legal sub-pages) stays alive as a redirect to the
 * same page under the new path: installed copies of the app, the Terms, press and
 * old posts link to the old addresses.
 *
 * Same technique as ToolkitRedirect: GitHub Pages can't send a real 301, so the
 * pre-rendered HTML carries an instant meta refresh plus a canonical to the new
 * address (search engines treat that pair as a permanent redirect), and <Navigate>
 * handles in-app navigation.
 */
export function HomunculAiMoved() {
  const { pathname, hash } = useLocation();
  const target = pathname.replace(/^\/games\/homunculai/, "/apps/homunculai").replace(/\/$/, "") || "/apps/homunculai";
  return (
    <>
      <Helmet>
        <title>HomunculAi | KrookedLilly</title>
        <meta httpEquiv="refresh" content={`0; url=${target}${hash}`} />
        <link rel="canonical" href={pageUrl(target)} />
        <meta name="robots" content="noindex, follow" />
      </Helmet>
      <p className="max-w-7xl mx-auto px-4 py-16 text-muted-foreground">
        This page moved to <Link to={target} className="text-teal-light underline">krookedlilly.com{target}</Link>.
      </p>
      <Navigate to={`${target}${hash}`} replace />
    </>
  );
}

export default HomunculAiMoved;
