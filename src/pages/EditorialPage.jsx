import { editorialStories } from "../data/sectionPageData";
import Icon from "../components/ui/Icon";
import { Link } from "react-router-dom";
import useNews from "../hooks/useNews";
import { shortStoryPath } from "../utils/storyPath";

export default function EditorialPage() {
  const { news } = useNews();
  const publishedEditorials = news.filter((story) => story.category === "Editorial");
  const usingPublishedEditorials = publishedEditorials.length > 0;
  const [lead, ...stories] = usingPublishedEditorials ? publishedEditorials : editorialStories;
  const storyPath = (story, fallbackPath) => usingPublishedEditorials ? shortStoryPath(story) : fallbackPath;

  return (
    <main className="bg-white px-3 py-10 md:px-6 md:py-14">
      <div className="mx-auto max-w-[1380px]">
        <header className="border-b border-[#dcdde0] pb-7">
          <p className="mb-2 inline-flex items-center gap-2 text-[11px] font-bold tracking-[.04em] text-[#4f9488] uppercase after:h-px after:w-9 after:bg-[#4f9488]">Our perspective</p>
          <h1 className="m-0 font-serif text-[clamp(38px,5vw,64px)] leading-none tracking-[-.04em] text-[#111318]">Editorial</h1>
          <p className="mt-4 mb-0 max-w-2xl text-sm leading-6 text-[#4f5359]">Independent analysis and informed opinion from the Chinlung Today editorial team, grounded in evidence, public interest, and respect for our readers.</p>
        </header>

        <article className="grid gap-8 border-b border-[#dcdde0] py-8 lg:grid-cols-[1.25fr_.75fr] lg:items-center">
          <Link className="group block aspect-[16/9] overflow-hidden bg-[#e8edf2]" to={storyPath(lead, "/editorial/featured")}><img className="h-full w-full object-contain transition duration-700 group-hover:scale-[1.015]" src={lead.image} alt={lead.imageAlt} /></Link>
          <div className="flex flex-col justify-center">
            <p className="mb-3 inline-flex items-center gap-2 text-[11px] font-bold tracking-[.04em] text-[#4f9488] uppercase after:h-px after:w-9 after:bg-[#4f9488]">The editorial board</p>
            <h2 className="m-0 line-clamp-2 font-serif text-[clamp(28px,3vw,42px)] leading-[1.08] font-semibold tracking-[-.035em]" title={lead.title}><Link to={storyPath(lead, "/editorial/featured")}>{lead.title}</Link></h2>
            <p className="mt-2 mb-0 text-[13px] font-normal text-[#69717a]">{lead.date}</p>
            <p className="home-story-summary my-4">{lead.summary}</p>
            <Link className="flex w-fit items-center gap-2 text-sm font-semibold text-[#111318]" to={storyPath(lead, "/editorial/featured")}>Read editorial <Icon name="arrow" /></Link>
          </div>
        </article>

        <section className="grid gap-10 py-8 lg:grid-cols-[1fr_280px]" aria-label="More editorials">
          <div className="divide-y divide-[#dcdde0] border-y border-[#dcdde0]">
            {stories.map((story, index) => {
              const path = storyPath(story, `/editorial/story-${index + 1}`);
              return <article className="grid gap-5 py-6 sm:grid-cols-[minmax(0,1fr)_180px] sm:items-center" key={story.id || story.title}>
                <div className="min-w-0">
                  <p className="mb-2 text-[12px] font-medium text-[#4f9488] uppercase">Editorial</p>
                  <h2 className="m-0 line-clamp-2 text-[clamp(22px,2.5vw,30px)] leading-[1.18] font-semibold tracking-[-.025em]" title={story.title}><Link className="hover:opacity-60" to={path}>{story.title}</Link></h2>
                  <p className="mt-2 mb-0 text-[13px] font-normal text-[#69717a]">{story.date}</p>
                  <p className="home-story-summary mt-3 mb-0 line-clamp-2 max-w-3xl">{story.summary}</p>
                </div>
                {story.image && <Link className="order-first aspect-[16/10] overflow-hidden bg-[#e8edf2] sm:order-none" to={path} tabIndex="-1"><img className="h-full w-full object-contain transition duration-500 hover:scale-[1.015]" src={story.image} alt={story.imageAlt || story.title} /></Link>}
              </article>;
            })}
          </div>
          <aside className="h-fit border-t-2 border-[#111318] bg-[#f7f5ef] p-5"><h2 className="m-0 text-base font-bold">About our editorials</h2><p className="mb-0 text-[13px] leading-5 text-[#4f5359]">Editorials represent the collective view of the publication, not an individual writer. News reporting remains separate and independent.</p></aside>
        </section>
      </div>
    </main>
  );
}
