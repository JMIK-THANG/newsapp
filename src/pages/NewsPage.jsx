import { useMemo, useState } from "react";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import MostReadList from "../components/news/MostReadList";
import NewsListCard from "../components/news/NewsListCard";
import Icon from "../components/ui/Icon";
import { newsPageStories } from "../data/news";
import useNews from "../hooks/useNews";
import { shortStoryPath } from "../utils/storyPath";

const filters = ["All News", "Chin News", "Myanmar News", "International News", "Sports", "Business"];

export default function NewsPage() {
  const { news: databaseNews, isLoading } = useNews();
  const { filter } = useParams();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const searchQuery = searchParams.get("search")?.trim() || "";
  const activeFilter = filters.find((item) => item.toLowerCase().startsWith(filter || "all")) || "All News";
  const [visibleCount, setVisibleCount] = useState(8);
  const allStories = databaseNews.length > 0 ? databaseNews : newsPageStories;
  const mostRead = useMemo(() => databaseNews.filter((story) => Number(story.views) > 0).sort((first, second) => Number(second.views) - Number(first.views)).slice(0, 5), [databaseNews]);
  const stories = useMemo(() => {
    const categoryStories = activeFilter === "All News" ? allStories : allStories.filter((story) => story.category === activeFilter);
    if (!searchQuery) return categoryStories;
    const normalizedQuery = searchQuery.toLocaleLowerCase();
    return categoryStories.filter((story) => [story.title, story.summary, story.category, story.author].filter(Boolean).some((value) => value.toLocaleLowerCase().includes(normalizedQuery)));
  }, [activeFilter, allStories, searchQuery]);

  const storyPath = (story) => /^\d+$/.test(String(story.id ?? "")) ? shortStoryPath(story) : story.slug ? `/news/story/${story.slug}` : `/news/story/article-${newsPageStories.indexOf(story) + 1}`;
  const selectFilter = (nextFilter) => {
    setVisibleCount(8);
    const path = nextFilter === "All News" ? "/news" : `/news/category/${nextFilter.replace(" News", "").toLowerCase()}`;
    navigate(searchQuery ? `${path}?search=${encodeURIComponent(searchQuery)}` : path);
  };
  const filterClass = (item, mobile = false) => `relative cursor-pointer border-0 bg-transparent py-3.5 font-semibold whitespace-nowrap transition focus-visible:outline-2 focus-visible:outline-offset-[-4px] focus-visible:outline-[#397d73] ${mobile ? "min-w-0 px-0.5 text-center text-[clamp(10px,2.8vw,13px)]" : "shrink-0 py-4 text-left text-[15px]"} ${activeFilter === item ? "text-[#182536] after:absolute after:right-[12%] after:bottom-[-1px] after:left-[12%] after:h-[3px] after:bg-[#397d73] sm:after:right-0 sm:after:left-0" : "text-[#69717a] hover:text-[#182536]"}`;

  return <main id="news-page" className="bg-white px-5 py-9 sm:px-6 md:py-12" aria-labelledby="news-page-title">
    <div className="mx-auto max-w-[1420px]">
      <header className={`border-b border-[#dcdde0] ${searchQuery || activeFilter === "All News" ? "pb-5 md:pb-8" : "pb-4 md:pb-7"}`}>
        <p className="mb-3 text-[10px] font-bold tracking-[.14em] text-[#397d73] uppercase">The newsroom</p>
        <div className="max-w-[820px]">
          <h1 id="news-page-title" className="article-display-font m-0 text-[clamp(40px,7vw,64px)] leading-[1] font-semibold tracking-[-.04em] text-[#182536]">{searchQuery ? "Search results" : activeFilter}</h1>
          {(searchQuery || activeFilter === "All News") && <p className="mt-2.5 mb-0 max-w-[760px] text-[16px] leading-6 text-[#4f5962] sm:mt-4 sm:text-[17px] sm:leading-7">{searchQuery ? `${stories.length} result${stories.length === 1 ? "" : "s"} for “${searchQuery}”` : "The latest reporting from Chin communities, Myanmar, and around the world."}</p>}
        </div>
      </header>

      <nav id="news-filters" className="-mx-5 border-b border-[#dcdde0] sm:mx-0" aria-label="News categories">
        <div className="sm:hidden">
          <div className="grid grid-cols-4 border-b border-[#dcdde0] px-2">
            {filters.slice(0, 4).map((item) => <button className={filterClass(item, true)} key={item} type="button" aria-pressed={activeFilter === item} onClick={() => selectFilter(item)}>{item}</button>)}
          </div>
          <div className="flex justify-center gap-8 px-2">
            {filters.slice(4).map((item) => <button className={`${filterClass(item, true)} w-[28%]`} key={item} type="button" aria-pressed={activeFilter === item} onClick={() => selectFilter(item)}>{item}</button>)}
          </div>
        </div>
        <div className="hidden min-w-max gap-7 sm:flex">
          {filters.map((item) => <button className={filterClass(item)} key={item} type="button" aria-pressed={activeFilter === item} onClick={() => selectFilter(item)}>{item}</button>)}
        </div>
      </nav>

      <div className="grid gap-12 pt-5 md:pt-7 xl:grid-cols-[minmax(0,1fr)_360px] xl:gap-14">
        <section id="news-feed" aria-label={`${activeFilter} stories`}>
          <div className="divide-y divide-[#dcdde0] border-b border-[#dcdde0]">
            {stories.slice(0, visibleCount).map((story) => <NewsListCard story={story} path={storyPath(story)} key={story.id || story.title} />)}
            {!isLoading && stories.length === 0 && <div className="px-4 py-16 text-center"><h2 className="article-display-font m-0 text-2xl text-[#182536]">No matching stories</h2><p className="mt-3 mb-0 text-sm text-[#5f6368]">Try a different headline, author, or category.</p></div>}
          </div>
          {visibleCount < stories.length && <div className="mt-8 flex justify-center"><button className="inline-flex min-h-11 cursor-pointer items-center gap-3 rounded-full border border-[#182536] bg-transparent px-6 py-3 text-xs font-semibold text-[#182536] transition hover:bg-[#182536] hover:text-white focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-[#397d73]" type="button" onClick={() => setVisibleCount((count) => count + 6)}>Load more stories <Icon name="arrow" /></button></div>}
        </section>
        <MostReadList stories={mostRead} storyPath={storyPath} />
      </div>
    </div>
  </main>;
}
