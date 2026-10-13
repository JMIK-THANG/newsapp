import { useEffect, useState } from "react";
import CategoryStoriesList from "../news/CategoryStoriesList";
import { getRelatedNewsArticles } from "../../hooks/useNews";
import { shortStoryPath } from "../../utils/storyPath";

export default function RelatedStories({ story }) {
  const identifier = story.slug || story.id;
  const [result, setResult] = useState(null);

  useEffect(() => {
    let cancelled = false;
    if (!/^\d+$/.test(String(story.id ?? ""))) return;
    getRelatedNewsArticles(identifier).then((stories) => {
      if (!cancelled) setResult({ identifier, stories: stories.filter((item) => item.category === story.category && item.id !== story.id).slice(0, 5) });
    }).catch(() => {
      if (!cancelled) setResult({ identifier, stories: [] });
    });
    return () => { cancelled = true; };
  }, [identifier, story.category, story.id]);

  const stories = result?.identifier === identifier ? result.stories : [];
  return <CategoryStoriesList category={story.category || "Articles"} stories={stories} storyPath={shortStoryPath} />;
}
