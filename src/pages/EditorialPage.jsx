import { Link } from "react-router-dom";
import NewsListCard from "../components/news/NewsListCard";
import Icon from "../components/ui/Icon";
import { editorialStories } from "../data/sectionPageData";
import useNews from "../hooks/useNews";
import { shortStoryPath } from "../utils/storyPath";

export default function EditorialPage() {
  const { news, isLoading } = useNews();
  const publishedEditorials = news.filter((story) => story.category === "Editorial");
  const usingPublishedEditorials = publishedEditorials.length > 0;
  const [lead, ...stories] = usingPublishedEditorials ? publishedEditorials : editorialStories;
  const storyPath = (story, fallbackPath) => usingPublishedEditorials ? shortStoryPath(story) : fallbackPath;

  if (isLoading && !lead) return <main className="min-h-[60vh] bg-white px-6 py-16 text-center text-sm text-[#69717a]">Loading editorials…</main>;

  return <main className="bg-white px-5 py-5 sm:px-6 sm:py-8 lg:py-9">
    <div className="mx-auto max-w-[1480px]">
      <header className="border-b border-[#dcdde0] pb-4 md:pb-6">
        <h1 className="article-display-font m-0 text-[clamp(34px,5.5vw,54px)] leading-[1] font-semibold tracking-[-.035em] text-[#182536]">Editorial</h1>
        <p className="mt-2 mb-0 max-w-[760px] text-[15px] leading-6 text-[#4f5962] sm:mt-4 sm:text-[17px] sm:leading-7">Independent analysis and informed opinion from the Chinlung Today editorial team.</p>
      </header>

      {lead && <article className="grid gap-6 border-b border-[#dcdde0] py-6 sm:py-8 lg:grid-cols-[minmax(0,1.35fr)_minmax(320px,.65fr)] lg:items-center lg:gap-10">
        <Link className="group block aspect-[16/9] overflow-hidden rounded-[6px] bg-[#e8edf2]" to={storyPath(lead, "/editorial/featured")}><img className="h-full w-full object-cover transition duration-700 group-hover:scale-[1.015]" src={lead.image} alt={lead.imageAlt || lead.title} /></Link>
        <div className="flex min-w-0 flex-col justify-center">
          <p className="m-0 text-[11px] font-bold tracking-[.07em] text-[#397d73] uppercase">Featured editorial</p>
          <h2 className="article-display-font mt-3 mb-0 line-clamp-3 text-[clamp(26px,2.7vw,36px)] leading-[1.12] font-semibold tracking-[-.015em] text-[#182536]" title={lead.title}><Link className="transition hover:text-[#397d73]" to={storyPath(lead, "/editorial/featured")}>{lead.title}</Link></h2>
          <p className="mt-3 mb-0 text-[16px] leading-7 text-[#3f474f]">{lead.summary}</p>
          <p className="mt-3 mb-0 text-[14px] text-[#69717a]">{lead.date}{lead.author ? <> · By <strong className="font-semibold text-[#303940]">{lead.author}</strong></> : null}</p>
          <Link className="mt-5 inline-flex w-fit items-center gap-2 text-[13px] font-bold text-[#182536] transition hover:text-[#397d73]" to={storyPath(lead, "/editorial/featured")}>Read editorial <Icon name="arrow" /></Link>
        </div>
      </article>}

      <div className="grid gap-10 pt-3 sm:pt-5 xl:grid-cols-[minmax(0,1fr)_320px] xl:gap-14">
        <section className="divide-y divide-[#dcdde0] border-b border-[#dcdde0]" aria-label="More editorials">
          {stories.map((story, index) => <NewsListCard story={story} path={storyPath(story, `/editorial/story-${index + 1}`)} key={story.id || story.title} />)}
          {stories.length === 0 && <p className="py-12 text-center text-sm text-[#69717a]">More editorials will appear here.</p>}
        </section>
        <aside className="h-fit border-t-2 border-[#182536] bg-[#f1eee8] p-5 sm:p-6 xl:sticky xl:top-[118px]">
          <h2 className="article-display-font m-0 text-[22px] font-semibold text-[#182536]">About our editorials</h2>
          <p className="mt-3 mb-0 text-[14px] leading-6 text-[#4f5962]">Editorials represent the collective view of the publication, not an individual writer. News reporting remains separate and independent.</p>
        </aside>
      </div>
    </div>
  </main>;
}
