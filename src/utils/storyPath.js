export function shortStoryPath(story) {
  const hasDatabaseId = /^\d+$/.test(String(story?.id ?? ""));
  if (hasDatabaseId) return story.content_type === "article" ? `/a/${story.id}` : `/n/${story.id}`;
  if (story?.content_type === "article") return `/articles/${story.slug}`;
  return `/news/story/${story?.slug}`;
}
