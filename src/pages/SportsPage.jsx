import NewsSectionLayout from "../components/sections/NewsSectionLayout";
import { sportsStories } from "../data/sectionPageData";

export default function SportsPage() {
  return <NewsSectionLayout eyebrow="Competition and community" title="Sports" description="The latest stories from local teams, global competitions, and the people transforming sport on and off the field." stories={sportsStories} />;
}
