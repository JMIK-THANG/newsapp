import Icon from "../ui/Icon";
import { Link } from "react-router-dom";
import useNews from "../../hooks/useNews";
import { shortStoryPath } from "../../utils/storyPath";

export default function LatestStories() {
  const { news } = useNews();
  const editorPicks = news.filter((story) => story.isEditorPick).slice(0, 2);
  if (editorPicks.length === 0) return null;

  return (
    <section id="latest" className="border-t border-[#dcdde0] bg-white px-3 pt-10 pb-12 md:px-6 md:pt-12 md:pb-16" aria-label="Editor’s Picks">
      <div className="mx-auto max-w-[1480px]">
        <div className="border-b border-[#dcdde0] pb-6">
          <div>
            <h2 className="article-display-font m-0 inline-flex items-center gap-2 text-[24px] leading-tight font-semibold tracking-[-.02em] text-[#182536] after:h-px after:w-9 after:bg-[#4f9488]">Editor’s Picks</h2>
          </div>
        </div>

        <div className={`mt-7 grid gap-8 ${editorPicks.length > 1 ? "lg:grid-cols-2" : ""} xl:gap-10`}>
          {editorPicks.map((story) => (
            <article className="group min-w-0" key={story.id || story.slug || story.title}>
              <Link to={shortStoryPath(story)} className="relative block aspect-[16/9] overflow-hidden rounded-[6px] bg-[#e8edf2]">
                <img className="h-full w-full object-cover transition duration-700 group-hover:scale-[1.025]" src={story.image} alt={story.imageAlt} />
                <span className="absolute top-4 left-4 bg-white px-2.5 py-1.5 text-[11px] font-bold tracking-[.1em] text-[#182536] uppercase">Editor’s pick</span>
              </Link>
              <div className="pt-5">
                <p className="mb-2 text-[13px] font-semibold text-[#397d73] uppercase">{story.topic || story.category}</p>
                <h3 className="article-display-font m-0 line-clamp-3 text-[22px] leading-[1.16] font-semibold tracking-[-.01em] text-[#111318] md:text-[24px]" title={story.title}><Link className="transition hover:opacity-65" to={shortStoryPath(story)}>{story.title}</Link></h3>
                <p className="mt-2 mb-0 text-[14px] font-normal text-[#69717a]">{story.date}</p>
                <p className="home-story-summary mt-3 mb-0 line-clamp-3">{story.summary}</p>
                <p className="mt-4 text-[13px] font-medium text-[#5f6368]">By <span className="font-semibold text-[#111318]">{story.author}</span></p>
              </div>
            </article>
          ))}
        </div>

        <div className="mt-10 flex justify-center border-t border-[#dcdde0] pt-8">
          <Link to="/news" className="group flex items-center gap-4 rounded-full bg-[#182536] px-6 py-3.5 text-xs font-semibold text-white shadow-[0_10px_24px_rgba(24,37,54,.14)] transition duration-300 hover:-translate-y-0.5 hover:bg-[#2b4052] hover:shadow-[0_14px_30px_rgba(24,37,54,.2)]">
            Explore all stories
            <span className="grid size-7 place-items-center rounded-full bg-white/12 transition-transform duration-300 group-hover:translate-x-1"><Icon name="arrow" /></span>
          </Link>
        </div>
      </div>
    </section>
  );
}
