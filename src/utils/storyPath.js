export function shortStoryPath(story) {
  const hasDatabaseId = /^\d+$/.test(String(story?.id ?? ""));
  if (hasDatabaseId) {
    const identifier = story.slug || story.id;
    if (story.content_type === "article") {
      return story.category === "Cahram" ? `/cahram/${identifier}` : `/articles/${identifier}`;
    }
    if (["Sports", "Business", "Editorial"].includes(story.category)) {
      return `/${story.category.toLowerCase()}/${identifier}`;
    }
    return `/news/${identifier}`;
  }
  if (story?.content_type === "article") return `/articles/${story.slug}`;
  return `/news/story/${story?.slug}`;
}
