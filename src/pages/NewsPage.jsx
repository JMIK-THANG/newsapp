import { useMemo, useState } from "react";
import { mostReadStories, newsPageStories } from "../data/news";
import Icon from "../components/ui/Icon";
import { Link, useNavigate, useParams } from "react-router-dom";

const filters = ["All News", "Chin News", "Myanmar News", "International News"];

export default function NewsPage() {
  const { filter } = useParams();
  const navigate = useNavigate();
  const activeFilter = filters.find((item) => item.toLowerCase().startsWith(filter || "all")) || "All News";
  const [visibleCount, setVisibleCount] = useState(6);
  const stories = useMemo(() => activeFilter === "All News" ? newsPageStories : newsPageStories.filter((story) => story.category === activeFilter), [activeFilter]);

  const selectFilter = (filter) => {
    setVisibleCount(6);
    navigate(filter === "All News" ? "/news" : `/news/category/${filter.replace(" News", "").toLowerCase()}`);
  };

  return (
    <main id="news-page" className="bg-white px-3 py-10 md:px-6 md:py-14" aria-labelledby="news-page-title">
      <div className="mx-auto max-w-[1380px]">
        <header className="border-b border-[#dcdde0] pb-7">
          <p className="mb-2 text-[11px] font-bold tracking-[.08em] text-[#111318] uppercase">The newsroom</p>
          <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <h1 id="news-page-title" className="m-0 font-serif text-[clamp(38px,5vw,64px)] leading-none tracking-[-.04em] text-[#111318]">Latest News</h1>
              <p className="mt-4 mb-0 max-w-2xl text-sm leading-6 text-[#4f5359]">The latest reporting from Chin communities, Myanmar, and around the world—updated throughout the day.</p>
            </div>
            <p className="m-0 text-[11px] font-medium text-[#5f6368]">Wednesday, August 26, 2026</p>
          </div>
        </header>

        <div id="news-filters" className="flex gap-6 overflow-x-auto border-b border-[#dcdde0] py-1" aria-label="News categories">
          {filters.map((filter) => <button className={`shrink-0 cursor-pointer border-0 border-b-2 bg-transparent py-4 text-[12px] font-semibold transition ${activeFilter === filter ? "border-[#111318] text-[#111318]" : "border-transparent text-[#5f6368] hover:text-[#111318]"}`} key={filter} type="button" onClick={() => selectFilter(filter)}>{filter}</button>)}
        </div>

        <div className="grid gap-12 pt-8 lg:grid-cols-[minmax(0,2fr)_minmax(270px,.8fr)] xl:gap-16">
          <section id="news-feed" aria-label={`${activeFilter} stories`}>
            <div className="divide-y divide-[#dcdde0] border-y border-[#dcdde0]">
              {stories.slice(0, visibleCount).map((story) => (
                <article className="group grid gap-5 py-6 sm:grid-cols-[210px_1fr]" key={story.title}>
                  <Link className="aspect-[16/10] overflow-hidden bg-[#e8edf2]" to={`/news/story/article-${newsPageStories.indexOf(story) + 1}`} tabIndex="-1"><img className="h-full w-full object-cover transition duration-500 group-hover:scale-[1.025]" src={story.image} alt={story.imageAlt} /></Link>
                  <div className="flex min-w-0 flex-col py-0.5">
                    <p className="mb-2 text-[11px] font-semibold text-[#4f9488] uppercase">{story.category} <span className="font-normal text-[#5f6368]">· {story.date}</span></p>
                    <h2 className="m-0 text-[clamp(20px,2vw,27px)] leading-[1.15] font-semibold tracking-[-.025em] text-[#111318]"><Link className="transition hover:opacity-60" to={`/news/story/article-${newsPageStories.indexOf(story) + 1}`}>{story.title}</Link></h2>
                    <p className="my-3 text-[13px] leading-5 text-[#4f5359]">{story.summary}</p>
                    <p className="mt-auto mb-0 text-[11px] font-medium text-[#5f6368]">By <span className="font-semibold text-[#111318]">{story.author}</span></p>
                  </div>
                </article>
              ))}
            </div>
            {visibleCount < stories.length && <div className="mt-8 flex justify-center"><button className="flex cursor-pointer items-center gap-3 border border-[#111318] bg-white px-6 py-3 text-xs font-semibold text-[#111318] transition hover:bg-[#111318] hover:text-white" type="button" onClick={() => setVisibleCount((count) => count + 4)}>Load more stories <Icon name="arrow" /></button></div>}
          </section>

          <aside id="news-most-read" className="lg:sticky lg:top-6 lg:self-start" aria-labelledby="news-most-read-title">
            <div className="border-t-2 border-[#111318]">
              <h2 id="news-most-read-title" className="m-0 border-b border-[#dcdde0] py-4 text-xl font-bold text-[#111318]">Most Read</h2>
              <div className="divide-y divide-[#dcdde0]">
                {mostReadStories.map((story, index) => (
                  <article className="grid grid-cols-[1fr_88px] gap-4 py-4" key={story.title}>
                    <div>
                      <p className="mb-2 text-[10px] font-semibold text-[#4f9488] uppercase">{story.category} <span className="font-normal text-[#5f6368]">· {story.time}</span></p>
                      <h3 className="m-0 text-[15px] leading-[1.35] font-semibold text-[#111318]"><Link className="transition hover:opacity-60" to={`/news/story/popular-${index + 1}`}>{story.title}</Link></h3>
                    </div>
                    <Link className="aspect-square overflow-hidden bg-[#e8edf2]" to={`/news/story/popular-${index + 1}`} tabIndex="-1"><img className="h-full w-full object-cover" src={story.image} alt={story.imageAlt} /></Link>
                  </article>
                ))}
              </div>
            </div>
          </aside>
        </div>
      </div>
    </main>
  );
}
