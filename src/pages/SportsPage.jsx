import NewsSectionLayout from "../components/sections/NewsSectionLayout";
import useNews from "../hooks/useNews";

export default function SportsPage() {
  const { news, isLoading, error } = useNews();
  const stories = news.filter((story) => story.category?.toLowerCase() === "sports");

  return <NewsSectionLayout eyebrow="Competition and community" title="Sports" description="The latest stories from local teams, global competitions, and the people transforming sport on and off the field." stories={stories} isLoading={isLoading} error={error} getStoryPath={(story) => `/news/story/${story.slug}`} />;
}
