import { Link } from "react-router-dom";

export default function MostReadList({ stories, storyPath }) {
  return <aside id="news-most-read" className="xl:sticky xl:top-[118px] xl:self-start" aria-labelledby="news-most-read-title">
    <div className="border-t-2 border-[#182536]">
      <div className="border-b border-[#dcdde0] py-4">
        <h2 id="news-most-read-title" className="article-display-font m-0 text-[24px] font-semibold text-[#182536]">Most Read</h2>
      </div>
      <ol className="m-0 list-none divide-y divide-[#dcdde0] p-0">
        {stories.map((story, index) => <li className="grid grid-cols-[28px_minmax(0,1fr)_76px] gap-3 py-4" key={story.id || story.title}>
          <span className="article-display-font text-[22px] leading-none font-bold text-[#182536]" aria-hidden="true">{index + 1}</span>
          <div className="min-w-0">
            <p className="mt-0 mb-1.5 text-[10px] font-bold tracking-[.06em] text-[#397d73] uppercase">{story.category}</p>
            <h3 className="article-display-font m-0 line-clamp-3 text-[16px] leading-[1.3] font-semibold text-[#182536]" title={story.title}><Link className="hover:text-[#397d73]" to={storyPath(story)}>{story.title}</Link></h3>
            <p className="mt-2 mb-0 text-[11px] text-[#69717a]">{story.date}</p>
          </div>
          <Link className="aspect-square overflow-hidden rounded-[5px] bg-[#e8edf2]" to={storyPath(story)} tabIndex="-1" aria-hidden="true"><img className="h-full w-full object-cover" src={story.image} alt="" loading="lazy" decoding="async" /></Link>
        </li>)}
      </ol>
      {stories.length === 0 && <p className="m-0 py-5 text-sm leading-6 text-[#5f6368]">Most-read stories will appear here as readers open published news.</p>}
    </div>
  </aside>;
}
