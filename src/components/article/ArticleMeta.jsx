export default function ArticleMeta({ author, date, readTime }) {
  return <div className="flex flex-wrap items-center gap-x-5 gap-y-3 text-[13px] text-[#555f68]">
    <span className="inline-flex items-center gap-2"><span className="grid size-8 place-items-center rounded-full bg-[#e6e8e6] text-[#66717a]" aria-hidden="true"><svg className="size-5" viewBox="0 0 24 24" fill="currentColor"><circle cx="12" cy="8" r="4"/><path d="M4.5 21a7.5 7.5 0 0 1 15 0Z"/></svg></span>By <strong className="font-semibold text-[#111318]">{author}</strong></span>
    <time className="inline-flex items-center gap-2"><svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true"><path d="M7 3v3M17 3v3M4 9h16M5 5h14a1 1 0 0 1 1 1v14H4V6a1 1 0 0 1 1-1Z"/></svg>{date}</time>
    <span className="inline-flex items-center gap-2"><svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true"><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/></svg>{readTime}</span>
  </div>;
}
