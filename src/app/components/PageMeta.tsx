import { Helmet } from "react-helmet-async";

const SITE = "https://www.krookedlilly.com";
const SITE_NAME = "KrookedLilly";

type Props = {
  title: string;
  description: string;
  path: string;
  image?: string;
  noIndex?: boolean;
};

export function PageMeta({ title, description, path, image, noIndex }: Props) {
  const fullTitle = title.includes(SITE_NAME) ? title : `${title} — ${SITE_NAME}`;
  const url = `${SITE}${path}`;
  const ogImage = image ? (image.startsWith("http") ? image : `${SITE}${image}`) : undefined;

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
      {ogImage && <meta property="og:image" content={ogImage} />}

      <meta name="twitter:card" content={ogImage ? "summary_large_image" : "summary"} />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      {ogImage && <meta name="twitter:image" content={ogImage} />}
    </Helmet>
  );
}
