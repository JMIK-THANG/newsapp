export default function ArticleImage({ story }) {
  if (!story.image) return null;
  return <figure className="m-0">
    <img className="block h-auto w-full rounded-[6px] object-contain" src={story.image} alt={story.imageAlt || story.title} />
    <figcaption className="mt-1.5 text-[11px] leading-4 font-medium text-[#424b54] sm:mt-2 sm:text-[12px] sm:leading-5">{story.imageCredit || "Reporting and photography for Chinlung Today."}</figcaption>
  </figure>;
}
