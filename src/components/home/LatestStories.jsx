import Icon from "../ui/Icon";
import { Link } from "react-router-dom";
import useNews from "../../hooks/useNews";
import { shortStoryPath } from "../../utils/storyPath";
import HomeStoryMeta from "./HomeStoryMeta";

export default function LatestStories() {
  const { news } = useNews({ category: "Editorial", editorPicks: true });
  const selectedEditorPicks = news.filter((story) => story.isEditorPick);
  const editorPicks = [
    ...selectedEditorPicks,
    ...news.filter((story) => !selectedEditorPicks.some((pick) => String(pick.id) === String(story.id))),
  ].slice(0, 4);
  if (editorPicks.length === 0) return null;
  const [feature, ...sidebarStories] = editorPicks;

  return (
    <section id="latest" className="border-t border-[#dcdde0] bg-white px-3 pt-10 pb-12 md:px-6 md:pt-12 md:pb-16" aria-label="Editor’s Picks">
      <div className="mx-auto max-w-[1380px]">
        <div className="border-b border-[#dcdde0] pb-6">
          <div>
            <h2 className="home-section-title article-display-font m-0 inline-flex items-center gap-2 text-[21px] text-[#182536] after:h-px after:w-9 after:bg-[#4f9488]">Editor’s Picks</h2>
          </div>
        </div>

        <div className={`mt-7 grid gap-8 ${sidebarStories.length ? "lg:grid-cols-[1.05fr_.95fr]" : ""} xl:gap-12`}>
          <article className="group min-w-0">
              <Link to={shortStoryPath(feature)} className="relative block aspect-[16/8.5] overflow-hidden rounded-[6px] bg-[#e8edf2]">
                <img className="h-full w-full object-cover transition duration-700 group-hover:scale-[1.025]" src={feature.image} alt={feature.imageAlt} />
                <span className="absolute top-4 left-4 bg-white px-2.5 py-1.5 text-[11px] font-bold tracking-[.1em] text-[#182536] uppercase">Editor’s pick</span>
              </Link>
              <div className="pt-6">
                <p className="story-category-label mb-3   text-[#4f9488] ">{feature.topic || feature.category} <span className="font-normal text-[#5f6368]">• {feature.readTime}</span></p>
                <h3 className="home-card-title story-headline article-display-font m-0 line-clamp-2 max-w-3xl" title={feature.title}><Link className="transition hover:opacity-65" to={shortStoryPath(feature)}>{feature.title}</Link></h3>
                <p className="home-card-preview home-story-summary mt-3 mb-0 line-clamp-3 max-w-2xl">{feature.summary}</p>
                <HomeStoryMeta story={feature} className="mt-5 mb-0" />
              </div>
            </article>
          {sidebarStories.length > 0 && <div className="divide-y divide-[#dcdde0] border-y border-[#dcdde0]">
            {sidebarStories.map((story) => <article className="mobile-story-preview mobile-image-first group grid grid-cols-[1fr_104px] gap-4 py-5 sm:grid-cols-[1fr_140px]" key={story.id || story.slug || story.title}>
              <div className="flex min-w-0 flex-col">
                <p className="story-category-label mb-3   text-[#4f9488] ">{story.topic || story.category} <span className="font-normal text-[#5f6368]">• {story.readTime}</span></p>
                <h3 className="home-card-title story-headline article-display-font m-0 line-clamp-2" title={story.title}><Link className="transition hover:opacity-65" to={shortStoryPath(story)}>{story.title}</Link></h3>
                <p className="home-card-preview mt-2 mb-0 line-clamp-3">{story.rawContent?.replace(/<[^>]*>/g, " ") || story.summary}</p>
                <HomeStoryMeta story={story} className="mt-auto mb-0 pt-4" />
              </div>
              <Link className="editor-pick-image relative self-start overflow-hidden rounded-[4px] bg-transparent" to={shortStoryPath(story)} tabIndex="-1"><img className="block h-auto w-full object-contain" src={story.image} alt={story.imageAlt} /></Link>
            </article>)}
          </div>}
        </div>

        <div className="mt-10 flex justify-center border-t border-[#dcdde0] pt-8">
          <Link to="/editorial" className="group flex items-center gap-4 rounded-full bg-[#182536] px-6 py-3.5 text-xs font-semibold text-white shadow-[0_10px_24px_rgba(24,37,54,.14)] transition duration-300 hover:-translate-y-0.5 hover:bg-[#2b4052] hover:shadow-[0_14px_30px_rgba(24,37,54,.2)]">
            Explore all stories
            <span className="grid size-7 place-items-center rounded-full bg-white/12 transition-transform duration-300 group-hover:translate-x-1"><Icon name="arrow" /></span>
          </Link>
        </div>
      </div>
    </section>
  );
}
