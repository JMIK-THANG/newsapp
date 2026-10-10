import CategoryEditorialLayout from "../components/sections/CategoryEditorialLayout";
import useNews from "../hooks/useNews";

export default function SportsPage() {
  const { news: stories, isLoading, error } = useNews({ category: "Sports" });

  return <CategoryEditorialLayout title="Sports" stories={stories} isLoading={isLoading} error={error} />;
}
