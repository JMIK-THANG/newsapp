export default function ArticleImage({ story }) {
  if (!story.image) return null;
  return <figure className="m-0">
    <img className="h-auto max-h-[720px] w-full rounded-[6px] bg-[#e8e4dc] object-contain" src={story.image} alt={story.imageAlt || story.title} />
    <figcaption className="mt-2 text-[11px] leading-5 text-[#69717a]">{story.imageCredit || "Reporting and photography for Chinlung Today."}</figcaption>
  </figure>;
}
