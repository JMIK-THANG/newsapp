import CategoryEditorialLayout from "../components/sections/CategoryEditorialLayout";
import useNews from "../hooks/useNews";

export default function BusinessPage() {
  const { news: stories, isLoading, error } = useNews({ category: "Business" });

  return <CategoryEditorialLayout title="Business" stories={stories} isLoading={isLoading} error={error} />;
}
