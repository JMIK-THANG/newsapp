import { useEffect } from "react";

export const SITE_URL = "https://chinlungtoday.com";
export const SITE_NAME = "Chinlung Today";
export const DEFAULT_DESCRIPTION = "Chinlung Today is a news and information website serving the Chin community with reporting and Falam Chin content from Chin State, Myanmar, and around the world.";
export const DEFAULT_IMAGE = `${SITE_URL}/chinlung-today-logo.png`;

const setMeta = (selector, attributes) => {
  let element = document.head.querySelector(selector);
  if (!element) {
    element = document.createElement("meta");
    document.head.appendChild(element);
  }
  Object.entries(attributes).forEach(([name, value]) => element.setAttribute(name, value));
};

export default function Seo({
  title = SITE_NAME,
  description = DEFAULT_DESCRIPTION,
  canonicalPath = "/",
  image = DEFAULT_IMAGE,
  type = "website",
  robots = "index, follow",
  schema,
}) {
  useEffect(() => {
    const canonicalUrl = new URL(canonicalPath, SITE_URL).href;
    const fullTitle = title === SITE_NAME ? SITE_NAME : `${title} | ${SITE_NAME}`;
    document.title = fullTitle;
    setMeta('meta[name="description"]', { name: "description", content: description });
    setMeta('meta[name="robots"]', { name: "robots", content: robots });
    setMeta('meta[property="og:type"]', { property: "og:type", content: type });
    setMeta('meta[property="og:site_name"]', { property: "og:site_name", content: SITE_NAME });
    setMeta('meta[property="og:title"]', { property: "og:title", content: fullTitle });
    setMeta('meta[property="og:description"]', { property: "og:description", content: description });
    setMeta('meta[property="og:image"]', { property: "og:image", content: image });
    setMeta('meta[property="og:url"]', { property: "og:url", content: canonicalUrl });
    setMeta('meta[name="twitter:card"]', { name: "twitter:card", content: "summary_large_image" });
    setMeta('meta[name="twitter:title"]', { name: "twitter:title", content: fullTitle });
    setMeta('meta[name="twitter:description"]', { name: "twitter:description", content: description });
    setMeta('meta[name="twitter:image"]', { name: "twitter:image", content: image });

    let canonical = document.head.querySelector('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement("link");
      canonical.rel = "canonical";
      document.head.appendChild(canonical);
    }
    canonical.href = canonicalUrl;

    const existingSchema = document.getElementById("page-jsonld");
    if (schema) {
      const script = existingSchema || document.createElement("script");
      script.id = "page-jsonld";
      script.type = "application/ld+json";
      script.textContent = JSON.stringify(schema).replace(/</g, "\\u003c");
      if (!existingSchema) document.head.appendChild(script);
    } else {
      existingSchema?.remove();
    }
  }, [canonicalPath, description, image, robots, schema, title, type]);

  return null;
}
