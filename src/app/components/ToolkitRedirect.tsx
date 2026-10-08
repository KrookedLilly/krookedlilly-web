import { Helmet } from "react-helmet-async";
import { Link, Navigate } from "react-router-dom";
import { pageUrl } from "./JsonLd";

const TARGET = "/tools/ui-toolkit";

/**
 * Permanent redirect from a retired UI Toolkit detail path (e.g.
 * /tools/screen-manager) to the consolidated suite hub. Keeps old inbound
 * links working instead of falling through to the NotFound route.
 *
 * GitHub Pages can't send a real 301, so the pre-rendered HTML carries an
 * instant meta refresh plus a canonical to the hub (search engines treat that
 * pair as a permanent redirect). <Navigate> handles in-app navigation.
 */
export function ToolkitRedirect() {
  return (
    <>
      <Helmet>
        <title>UI Toolkit Suite | KrookedLilly</title>
        <meta httpEquiv="refresh" content={`0; url=${TARGET}`} />
        <link rel="canonical" href={pageUrl(TARGET)} />
        <meta name="robots" content="noindex, follow" />
      </Helmet>
      <p className="max-w-7xl mx-auto px-4 py-16 text-muted-foreground">
        This page moved to the <Link to={TARGET} className="text-teal-light underline">UI Toolkit Suite</Link>.
      </p>
      <Navigate to={TARGET} replace />
    </>
  );
}

export default ToolkitRedirect;
