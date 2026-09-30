import { Link } from "react-router-dom";

export default function NewsListCard({ story, path }) {
  return <article className="group grid gap-4 py-4 sm:grid-cols-[220px_minmax(0,1fr)] sm:gap-6 sm:py-6 lg:grid-cols-[260px_minmax(0,1fr)] lg:py-7">
    <Link className="aspect-[16/10] overflow-hidden rounded-[6px] bg-[#e8edf2]" to={path} tabIndex="-1" aria-hidden="true">
      <img className="h-full w-full object-cover transition duration-300 group-hover:scale-[1.025]" src={story.image} alt="" loading="lazy" decoding="async" />
    </Link>
    <div className="min-w-0 self-center">
      <p className="m-0 text-[11px] font-bold tracking-[.07em] text-[#397d73] uppercase">{story.category}</p>
      <h2 className="article-display-font mt-2.5 mb-0 line-clamp-3 text-[21px] leading-[1.18] font-semibold tracking-[-.01em] text-[#182536] lg:text-[26px]" title={story.title}>
        <Link className="transition hover:text-[#397d73] focus-visible:rounded-sm focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-[#397d73]" to={path}>{story.title}</Link>
      </h2>
      <p className="mt-3 mb-0 line-clamp-3 text-[16px] leading-7 text-[#3f474f]">{story.summary}</p>
      <div className="mt-4 flex flex-wrap items-center gap-x-2.5 gap-y-2 text-[12px] text-[#69717a] sm:gap-x-3 sm:gap-y-1">
        <span className="inline-flex items-center gap-1.5"><svg className="size-3.5 sm:hidden" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true"><path d="M7 3v3M17 3v3M4 9h16M5 5h14a1 1 0 0 1 1 1v14H4V6a1 1 0 0 1 1-1Z"/></svg>{story.date}</span>
        {story.author && <><span aria-hidden="true">•</span><span className="inline-flex items-center gap-1.5"><svg className="size-3.5 sm:hidden" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true"><circle cx="12" cy="8" r="4"/><path d="M4.5 21a7.5 7.5 0 0 1 15 0"/></svg>By <strong className="font-semibold text-[#303940]">{story.author}</strong></span></>}
        {(story.readTime || story.time) && <><span aria-hidden="true">•</span><span className="inline-flex items-center gap-1.5"><svg className="size-3.5 sm:hidden" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true"><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/></svg>{story.readTime || story.time}</span></>}
      </div>
    </div>
  </article>;
}
