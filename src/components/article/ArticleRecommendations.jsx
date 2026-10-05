import { Link } from "react-router-dom";
import { useId } from "react";
import Icon from "../ui/Icon";
import NewsListCard from "../news/NewsListCard";

export default function ArticleRecommendations({ category, stories, seeAllPath, className = "" }) {
  const headingId = useId();
  if (!stories.length) return null;

  return <aside className={className} aria-labelledby={headingId}>
    <div className="flex items-center justify-between gap-4">
      <h2 id={headingId} className="article-display-font m-0 text-[19px] leading-tight font-semibold text-[#39424a]">More from {category}</h2>
      <Link className="flex shrink-0 items-center gap-1.5 text-xs font-semibold text-[#397d73]" to={seeAllPath}>See all <Icon name="arrow" /></Link>
    </div>
    <div className="mt-3 divide-y divide-[#dcdde0]">
      {stories.map((story) => <div className="most-read-preview" key={story.id || story.title}>
        <NewsListCard story={story} path={story.path} showCategory={false} />
      </div>)}
    </div>
  </aside>;
}
