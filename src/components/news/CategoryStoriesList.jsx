import { Link } from "react-router-dom";

export default function CategoryStoriesList({ category, stories, storyPath }) {
  if (!stories.length) return null;
  return <aside className="xl:sticky xl:top-[118px] xl:self-start" aria-label={`More from ${category}`}>
    <h2 className="article-display-font m-0 border-t-2 border-b border-[#dcdde0] border-t-[#182536] py-4 text-[24px] font-semibold text-[#182536]">More from {category}</h2>
    <ul className="m-0 list-none divide-y divide-[#dcdde0] p-0">
      {stories.map((story) => <li className="grid grid-cols-[minmax(0,1fr)_76px] gap-3 py-4" key={story.id || story.slug}>
        <div className="min-w-0">
          <h3 className="article-display-font m-0 line-clamp-3 text-[19px] leading-[1.16] font-semibold text-[#182536]"><Link className="hover:text-[#397d73]" to={storyPath(story)}>{story.title}</Link></h3>
          <p className="mt-2 mb-0 text-[14px] text-[#69717a]">{story.date}</p>
        </div>
        <Link className="aspect-square overflow-hidden rounded-[5px] bg-[#e8edf2]" to={storyPath(story)} tabIndex="-1" aria-hidden="true"><img className="h-full w-full object-cover" src={story.image} alt="" loading="lazy" decoding="async" /></Link>
      </li>)}
    </ul>
  </aside>;
}
