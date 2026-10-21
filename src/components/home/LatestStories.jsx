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
      <div className="mx-auto max-w-[1200px]">
        <div className="flex items-center justify-between gap-4 border-b border-[#dcdde0] pb-4">
          <div>
            <h2 className="home-section-title article-display-font m-0 inline-flex items-center gap-2 text-[21px] text-[#182536] after:h-px after:w-9 after:bg-[#4f9488]">Editor’s Picks</h2>
          </div>
          <Link className="inline-flex min-h-10 shrink-0 items-center gap-2 text-[12px] font-semibold text-[#397d73] hover:underline" to="/editorial">View all editorials <Icon name="arrow" /></Link>
        </div>

        <div className={`mt-7 grid gap-8 ${sidebarStories.length ? "lg:grid-cols-[1.05fr_.95fr]" : ""} xl:gap-12`}>
          <article className="group min-w-0">
              <Link to={shortStoryPath(feature)} className="relative block aspect-[16/8.5] overflow-hidden rounded-[6px] bg-[#e8edf2]">
                <img className="h-full w-full object-cover transition duration-700 group-hover:scale-[1.025]" src={feature.image} alt={feature.imageAlt} />
              </Link>
              <div className="pt-6">
                <p className="story-category-label mb-2 text-[#4f9488]">{feature.topic || feature.category}</p>
                <h3 className="home-card-title story-headline article-display-font m-0 line-clamp-2 max-w-3xl" title={feature.title}><Link className="transition hover:opacity-65" to={shortStoryPath(feature)}>{feature.title}</Link></h3>
                <p className="home-card-preview home-story-summary mt-3 mb-0 line-clamp-2 max-w-2xl">{feature.summary}</p>
                <HomeStoryMeta story={feature} className="mt-5 mb-0" />
                <Link className="mt-4 inline-flex min-h-10 items-center text-[13px] font-semibold text-[#397d73] underline underline-offset-4 hover:text-[#182536] focus-visible:rounded-sm focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-[#397d73]" to={shortStoryPath(feature)} aria-label={`Read full editorial: ${feature.title}`}>Read full editorial</Link>
              </div>
            </article>
          {sidebarStories.length > 0 && <div className="divide-y divide-[#dcdde0] border-y border-[#dcdde0]">
            {sidebarStories.map((story) => <article className="mobile-story-preview mobile-image-first group grid grid-cols-[1fr_104px] gap-4 py-5 sm:grid-cols-[1fr_140px]" key={story.id || story.slug || story.title}>
              <div className="flex min-w-0 flex-col">
                <p className="story-category-label mb-2 text-[#4f9488]">{story.topic || story.category}</p>
                <h3 className="home-card-title story-headline article-display-font m-0 line-clamp-2" title={story.title}><Link className="transition hover:opacity-65" to={shortStoryPath(story)}>{story.title}</Link></h3>
                <p className="home-card-preview mt-2 mb-0 line-clamp-2">{story.summary}</p>
                <HomeStoryMeta story={story} className="mt-auto mb-0 pt-4" />
              </div>
              <Link className="editor-pick-image relative self-start overflow-hidden rounded-[4px] bg-transparent" to={shortStoryPath(story)} tabIndex="-1"><img className="block h-auto w-full object-contain" src={story.image} alt={story.imageAlt} /></Link>
            </article>)}
          </div>}
        </div>

      </div>
    </section>
  );
}
