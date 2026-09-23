export function shortStoryPath(story) {
  const hasDatabaseId = /^\d+$/.test(String(story?.id ?? ""));
  if (hasDatabaseId) {
    const readablePart = String(story.slug || story.title || "story")
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-|-$/g, "")
      .split("-")
      .filter(Boolean)
      .slice(0, 4)
      .join("-") || "story";
    return story.content_type === "article" ? `/a/${readablePart}-p${story.id}` : `/n/${readablePart}-p${story.id}`;
  }
  if (story?.content_type === "article") return `/articles/${story.slug}`;
  return `/news/story/${story?.slug}`;
}
