import { Helmet } from "react-helmet-async";
import { SITE_URL, pageUrl } from "./JsonLd";

const SITE_NAME = "KrookedLilly";
/** Fallback share card for pages without their own image. */
const DEFAULT_IMAGE = "/og-image.png";

type Props = {
  title: string;
  description: string;
  /** Route path, e.g. "/catalog". Canonical URLs never end in a slash (see pageUrl). */
  path: string;
  image?: string;
  noIndex?: boolean;
};

export function PageMeta({ title, description, path, image, noIndex }: Props) {
  const fullTitle = title.includes(SITE_NAME) ? title : `${title} | ${SITE_NAME}`;
  const url = pageUrl(path);
  const img = image ?? DEFAULT_IMAGE;
  const ogImage = img.startsWith("http") ? img : `${SITE_URL}${img}`;

  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={url} />
      {noIndex && <meta name="robots" content="noindex, follow" />}

      <meta property="og:type" content="website" />
      <meta property="og:site_name" content={SITE_NAME} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={url} />
      <meta property="og:image" content={ogImage} />

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:site" content="@krookedLilly" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={ogImage} />
    </Helmet>
  );
}
