import NewsSectionLayout from "../components/sections/NewsSectionLayout";
import { businessStories } from "../data/sectionPageData";

export default function BusinessPage() {
  return <NewsSectionLayout eyebrow="Markets and enterprise" title="Business" description="Reporting on entrepreneurs, markets, technology, and the economic decisions affecting communities everywhere." stories={businessStories} />;
}
