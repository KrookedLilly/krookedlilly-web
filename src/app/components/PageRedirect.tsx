import { Helmet } from "react-helmet-async";
import { Link, Navigate, useLocation } from "react-router-dom";
import { pageUrl } from "./JsonLd";

/**
 * Permanent redirect from a retired path to the page that replaced it. Keeps
 * old inbound links (search results, store listings, payment providers)
 * working instead of falling through to the NotFound route.
 *
 * GitHub Pages can't send a real 301, so the pre-rendered HTML carries an
 * instant meta refresh plus a canonical to the target (search engines treat
 * that pair as a permanent redirect). <Navigate> handles in-app navigation
 * and carries any #fragment across.
 */
export function PageRedirect({ to, title }: { to: string; title: string }) {
  const { hash } = useLocation();
  return (
    <>
      <Helmet>
        <title>{`${title} | KrookedLilly`}</title>
        <meta httpEquiv="refresh" content={`0; url=${to}`} />
        <link rel="canonical" href={pageUrl(to)} />
        <meta name="robots" content="noindex, follow" />
      </Helmet>
      <p className="max-w-7xl mx-auto px-4 py-16 text-muted-foreground">
        This page moved to <Link to={to} className="text-teal-light underline">{title}</Link>.
      </p>
      <Navigate to={{ pathname: to, hash }} replace />
    </>
  );
}

export default PageRedirect;
