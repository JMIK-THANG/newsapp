export default function ArticleMeta({ author, date, readTime }) {
  return <div className="flex flex-wrap items-center gap-x-3 gap-y-2 text-[13px] text-[#5f6368]">
    <span>By <strong className="font-semibold text-[#111318]">{author}</strong></span>
    <span aria-hidden="true">•</span>
    <time>{date}</time>
    <span aria-hidden="true">•</span>
    <span>{readTime}</span>
  </div>;
}
