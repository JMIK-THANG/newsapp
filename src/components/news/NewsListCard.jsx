import { Link } from "react-router-dom";

export default function NewsListCard({ story, path, showCategory = true }) {
  return <article className="mobile-story-preview group grid grid-cols-[28%_minmax(0,1fr)] items-start gap-3.5 py-5 sm:grid-cols-[180px_minmax(0,1fr)] sm:gap-5 sm:py-6 lg:grid-cols-[200px_minmax(0,1fr)] lg:py-5">
    <Link className="aspect-[4/3] overflow-hidden rounded-[6px] bg-[#e8edf2] sm:aspect-[16/10]" to={path} tabIndex="-1" aria-hidden="true">
      <img className="h-full w-full object-cover transition duration-300 group-hover:scale-[1.025]" src={story.image} alt="" loading="lazy" decoding="async" />
    </Link>
    <div className="min-w-0 self-center">
      {showCategory && <p className="m-0 text-[10px] leading-[1.4] font-medium tracking-[.05em] text-[#397d73] uppercase sm:text-[11px]">{story.category}</p>}
      <h2 className="story-headline article-display-font mt-1.5 mb-0 line-clamp-3 text-[19px] leading-[1.17] tracking-[-.01em] text-[#182536] sm:mt-2.5 sm:text-[20px] lg:text-[22px]" title={story.title}>
        <Link className="transition hover:text-[#397d73] focus-visible:rounded-sm focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-[#397d73]" to={path}>{story.title}</Link>
      </h2>
      <p className="mt-3 mb-0 hidden line-clamp-3 text-[14px] leading-[1.65] tracking-[.01em] text-[#3f474f] sm:block">{story.summary}</p>
      <div className="mt-2.5 flex flex-wrap items-center gap-x-2.5 gap-y-2 text-[14px] text-[#69717a] sm:mt-3 sm:gap-x-3 sm:gap-y-1 sm:text-[13px]">
        <span>{story.date}</span>
        {story.author && <><span aria-hidden="true">•</span><span className="inline-flex items-center gap-1.5">By <strong className="font-semibold text-[#303940]">{story.author}</strong></span></>}
        {(story.readTime || story.time) && <><span className="hidden sm:inline" aria-hidden="true">•</span><span className="hidden sm:inline-flex sm:items-center sm:gap-1.5">{story.readTime || story.time}</span></>}
      </div>
    </div>
  </article>;
}
