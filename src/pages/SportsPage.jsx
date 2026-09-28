import NewsSectionLayout from "../components/sections/NewsSectionLayout";
import useNews from "../hooks/useNews";
import { shortStoryPath } from "../utils/storyPath";

export default function SportsPage() {
  const { news, isLoading, error } = useNews();
  const stories = news.filter((story) => story.category?.toLowerCase() === "sports");

  return <NewsSectionLayout eyebrow="Competition and community" title="Sports" description="The latest stories from Chin, Myanmar, and the world of sports, covering major events, competitions, and the people shaping the game." stories={stories} isLoading={isLoading} error={error} getStoryPath={shortStoryPath} />;
}
