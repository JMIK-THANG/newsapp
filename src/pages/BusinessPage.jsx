import NewsSectionLayout from "../components/sections/NewsSectionLayout";
import useNews from "../hooks/useNews";

export default function BusinessPage() {
  const { news, isLoading, error } = useNews();
  const stories = news.filter((story) => story.category?.toLowerCase() === "business");

  return <NewsSectionLayout eyebrow="Markets and enterprise" title="Business" description="Reporting on entrepreneurs, markets, technology, and the economic decisions affecting communities everywhere." stories={stories} isLoading={isLoading} error={error} getStoryPath={(story) => `/news/story/${story.slug}`} />;
}
