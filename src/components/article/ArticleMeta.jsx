export default function ArticleMeta({ author, date, readTime }) {
  return <div className="grid gap-1.5 text-[13px] leading-5 text-[#69717a] sm:text-[14px]">
    <span className="inline-flex items-center gap-1.5"><svg className="size-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" aria-hidden="true"><circle cx="12" cy="8" r="4"/><path d="M4.5 21a7.5 7.5 0 0 1 15 0"/></svg>By <strong className="font-semibold text-[#39424a]">{author}</strong></span>
    <div className="row-start-1 flex flex-wrap items-center gap-x-3 gap-y-1"><time>{date}</time><span aria-hidden="true">·</span><span>{readTime}</span></div>
  </div>;
}
