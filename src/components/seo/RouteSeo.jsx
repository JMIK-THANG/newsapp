import { useLocation } from "react-router-dom";
import Seo, { DEFAULT_DESCRIPTION, DEFAULT_IMAGE, SITE_NAME, SITE_URL } from "./Seo";

const routeMetadata = {
  "/": { title: SITE_NAME, description: DEFAULT_DESCRIPTION },
  "/news": { title: "All News", description: "Read the latest news from Chin communities, Myanmar, and around the world from Chinlung Today." },
  "/editorial": { title: "Editorial", description: "Editorials and perspectives from Chinlung Today." },
  "/articles": { title: "Articles", description: "Long-form articles and analysis from Chinlung Today." },
  "/sports": { title: "Sports", description: "Sports news and stories from Chin, Myanmar, and around the world." },
  "/business": { title: "Business", description: "Business, markets, technology, and economic reporting from Chinlung Today." },
  "/podcasts": { title: "Podcasts", description: "Listen to podcasts from Chinlung Today." },
  "/about": { title: "About", description: "Learn about Chinlung Today and its independent reporting for Chin communities." },
  "/contact": { title: "Contact", description: "Contact Chinlung Today." },
  "/privacy": { title: "Privacy Policy", description: "Read the Chinlung Today privacy policy." },
};

const isStoryPath = (pathname) => /^\/(news(?:\/story)?|n|editorial|articles|cahram|a|sports|business)\/[^/]+$/.test(pathname) || pathname.startsWith("/explainers/");

export default function RouteSeo() {
  const { pathname } = useLocation();
  if (isStoryPath(pathname)) return null;
  if (pathname.startsWith("/admin")) return <Seo title="Private Newsroom" description="Chinlung Today administration." canonicalPath={pathname} robots="noindex, nofollow" />;
  if (pathname.startsWith("/news/category/")) {
    const category = pathname.split("/").pop().replaceAll("-", " ").replace(/\b\w/g, (letter) => letter.toUpperCase());
    return <Seo title={`${category} News`} description={`Read the latest ${category} news from Chinlung Today.`} canonicalPath={pathname} />;
  }
  if (pathname.startsWith("/articles/category/")) {
    const category = pathname.split("/").pop().replaceAll("-", " ").replace(/\b\w/g, (letter) => letter.toUpperCase());
    return <Seo title={category} description={`Read ${category} from Chinlung Today.`} canonicalPath={pathname} />;
  }
  const metadata = routeMetadata[pathname];
  if (!metadata) return <Seo title="Page Not Found" description="The requested page could not be found." canonicalPath={pathname} robots="noindex, follow" />;
  const schema = pathname === "/" ? [{
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: SITE_NAME,
    url: `${SITE_URL}/`,
  }, {
    "@context": "https://schema.org",
    "@type": "NewsMediaOrganization",
    name: SITE_NAME,
    url: `${SITE_URL}/`,
    logo: { "@type": "ImageObject", url: DEFAULT_IMAGE },
  }] : undefined;
  return <Seo {...metadata} canonicalPath={pathname} schema={schema} />;
}
