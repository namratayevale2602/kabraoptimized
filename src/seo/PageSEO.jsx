import { Helmet } from "react-helmet-async";

/**
 * Drop-in SEO head component. Pass a config object from seoConfig.js.
 *
 * <PageSEO {...seoConfig.about} />
 * <PageSEO {...categoryPageSEO(name, slug)} />
 */
export default function PageSEO({ title, description, url, ogImage, noindex = false }) {
  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      {url && <link rel="canonical" href={url} />}
      {noindex && <meta name="robots" content="noindex,nofollow" />}

      {/* Open Graph */}
      <meta property="og:title"       content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:type"        content="website" />
      {url      && <meta property="og:url"   content={url} />}
      {ogImage  && <meta property="og:image" content={ogImage} />}

      {/* Twitter Card */}
      <meta name="twitter:card"        content="summary_large_image" />
      <meta name="twitter:title"       content={title} />
      <meta name="twitter:description" content={description} />
      {ogImage && <meta name="twitter:image" content={ogImage} />}
    </Helmet>
  );
}
