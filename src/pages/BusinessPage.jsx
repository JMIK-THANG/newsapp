import NewsSectionLayout from "../components/sections/NewsSectionLayout";
import useNews from "../hooks/useNews";
import { shortStoryPath } from "../utils/storyPath";

export default function BusinessPage() {
  const { news: stories, isLoading, error } = useNews({ category: "Business" });

  return <NewsSectionLayout eyebrow="Markets and enterprise" title="Business" description="Reporting on entrepreneurs, markets, technology, and economic developments shaping Chin, Myanmar, and the world." stories={stories} isLoading={isLoading} error={error} getStoryPath={shortStoryPath} />;
}
