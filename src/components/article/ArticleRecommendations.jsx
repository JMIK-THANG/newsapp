import { Link } from "react-router-dom";
import { useId } from "react";
import Icon from "../ui/Icon";

export default function ArticleRecommendations({ category, stories, seeAllPath, className = "" }) {
  const headingId = useId();
  if (!stories.length) return null;

  return <aside className={className} aria-labelledby={headingId}>
    <div className="flex items-center justify-between gap-4">
      <h2 id={headingId} className="article-display-font m-0 text-[19px] leading-tight font-semibold text-[#39424a]">More from {category}</h2>
      <Link className="flex shrink-0 items-center gap-1.5 text-xs font-semibold text-[#397d73]" to={seeAllPath}>See all <Icon name="arrow" /></Link>
    </div>
    <div className="mt-3 grid gap-4 sm:grid-cols-2 sm:gap-6 xl:block">
      {stories.map((story) => <article className="mobile-story-preview grid grid-cols-[96px_minmax(0,1fr)] gap-3 py-1 xl:mt-4" key={story.id || story.title}>
        <Link className="aspect-[4/3] overflow-hidden rounded-[5px] bg-[#e8edf2]" to={story.path} tabIndex="-1"><img className="h-full w-full object-cover transition duration-300 hover:scale-[1.03]" src={story.image} alt={story.imageAlt || story.title} /></Link>
        <div className="min-w-0 self-center">
          <h3 className="article-display-font m-0 line-clamp-3 text-[18px] leading-[1.16] font-semibold text-[#111318]" title={story.title}><Link className="hover:text-[#397d73]" to={story.path}>{story.title}</Link></h3>
          <p className="mt-2 mb-0 text-[14px] text-[#69717a]">{story.date}</p>
        </div>
      </article>)}
    </div>
  </aside>;
}
