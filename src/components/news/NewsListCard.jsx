import { Link } from "react-router-dom";

export default function NewsListCard({ story, path }) {
  return <article className="group grid gap-4 py-6 sm:grid-cols-[220px_minmax(0,1fr)] sm:gap-6 lg:grid-cols-[260px_minmax(0,1fr)] lg:py-7">
    <Link className="aspect-[16/10] overflow-hidden rounded-[6px] bg-[#e8edf2]" to={path} tabIndex="-1" aria-hidden="true">
      <img className="h-full w-full object-cover transition duration-300 group-hover:scale-[1.025]" src={story.image} alt="" loading="lazy" decoding="async" />
    </Link>
    <div className="min-w-0 self-center">
      <p className="m-0 text-[11px] font-bold tracking-[.07em] text-[#397d73] uppercase">{story.category}</p>
      <h2 className="article-display-font mt-3 mb-0 line-clamp-3 text-[clamp(25px,3vw,33px)] leading-[1.12] font-semibold tracking-[-.025em] text-[#182536]" title={story.title}>
        <Link className="transition hover:text-[#397d73] focus-visible:rounded-sm focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-[#397d73]" to={path}>{story.title}</Link>
      </h2>
      <p className="mt-3 mb-0 line-clamp-3 text-[16px] leading-7 text-[#3f474f]">{story.summary}</p>
      <div className="mt-4 flex flex-wrap items-center gap-x-3 gap-y-1 text-[12px] text-[#69717a]">
        <span>{story.date}</span>
        {story.author && <><span aria-hidden="true">•</span><span>By <strong className="font-semibold text-[#303940]">{story.author}</strong></span></>}
        {(story.readTime || story.time) && <><span aria-hidden="true">•</span><span>{story.readTime || story.time}</span></>}
      </div>
    </div>
  </article>;
}
