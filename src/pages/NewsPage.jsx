import { useMemo, useState } from "react";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import MostReadList from "../components/news/MostReadList";
import CategoryStoriesList from "../components/news/CategoryStoriesList";
import NewsListCard from "../components/news/NewsListCard";
import Icon from "../components/ui/Icon";
import StoryLoading from "../components/news/StoryLoading";
import useNews from "../hooks/useNews";
import { shortStoryPath } from "../utils/storyPath";

const filters = ["All News", "Chin News", "Myanmar News", "International News", "Sports", "Business"];
const MOST_READ_WINDOW_MS = 7 * 24 * 60 * 60 * 1000;

function isInMostReadWindow(story) {
  const publishedTime = new Date(story.publishedAt || story.published_at || story.date).getTime();
  return Number.isFinite(publishedTime) && publishedTime >= Date.now() - MOST_READ_WINDOW_MS;
}

export default function NewsPage() {
  const { filter } = useParams();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const searchQuery = searchParams.get("search")?.trim() || "";
  const mostReadMode = searchParams.get("sort") === "most-read";
  const activeFilter = filters.find((item) => item.toLowerCase().startsWith(filter || "all")) || "All News";
  const { news: databaseNews, isLoading } = useNews({ category: activeFilter === "All News" ? "" : activeFilter });
  const [visibleCount, setVisibleCount] = useState(8);
  const allStories = databaseNews;
  const mostRead = useMemo(() => databaseNews.filter(isInMostReadWindow).filter((story) => Number(story.views) > 0).sort((first, second) => Number(second.views) - Number(first.views)).slice(0, 5), [databaseNews]);
  const stories = useMemo(() => {
    const categoryStories = activeFilter === "All News" ? allStories : allStories.filter((story) => story.category === activeFilter);
    const orderedStories = mostReadMode ? categoryStories.filter(isInMostReadWindow).sort((first, second) => Number(second.views || 0) - Number(first.views || 0)) : categoryStories;
    if (!searchQuery) return orderedStories;
    const normalizedQuery = searchQuery.toLocaleLowerCase();
    return orderedStories.filter((story) => [story.title, story.summary, story.category, story.author].filter(Boolean).some((value) => value.toLocaleLowerCase().includes(normalizedQuery)));
  }, [activeFilter, allStories, mostReadMode, searchQuery]);

  const storyPath = shortStoryPath;
  const selectFilter = (nextFilter) => {
    setVisibleCount(8);
    const path = nextFilter === "All News" ? "/news" : `/news/category/${nextFilter.replace(" News", "").toLowerCase()}`;
    const nextParams = new URLSearchParams();
    if (searchQuery) nextParams.set("search", searchQuery);
    if (mostReadMode) nextParams.set("sort", "most-read");
    navigate(`${path}${nextParams.size ? `?${nextParams}` : ""}`);
  };
  const filterClass = (item) => `min-h-10 cursor-pointer rounded-full border px-3 py-2 text-[12px] font-semibold whitespace-nowrap transition sm:px-5 sm:text-[15px] focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-[#397d73] ${activeFilter === item ? "border-[#182536] bg-[#182536] text-white" : "border-[#d7d4ce] bg-transparent text-[#182536] hover:border-[#397d73] hover:text-[#397d73]"}`;

  return <main id="news-page" className="bg-white px-5 py-5 sm:px-6 sm:py-8 md:py-8 lg:py-9" aria-labelledby="news-page-title">
    <div className="mx-auto max-w-[1480px]">
      <header className={`border-b border-[#dcdde0] ${searchQuery || activeFilter === "All News" ? "pb-4 md:pb-6" : "pb-3 md:pb-5"}`}>
        <div className="max-w-[820px]">
          <h1 id="news-page-title" className="article-display-font m-0 text-[clamp(34px,5.5vw,54px)] leading-[1] font-semibold tracking-[-.035em] text-[#182536]">{searchQuery ? "Search results" : mostReadMode && activeFilter === "All News" ? "Most Read" : activeFilter}</h1>
          {(searchQuery || activeFilter === "All News") && <p className="mt-2 mb-0 max-w-[760px] text-[15px] leading-6 text-[#4f5962] sm:mt-4 sm:text-[17px] sm:leading-7">{searchQuery ? `${stories.length} result${stories.length === 1 ? "" : "s"} for “${searchQuery}”` : "The latest reporting from Chin, Myanmar, and around the world."}</p>}
        </div>
      </header>

      <nav id="news-filters" className="border-b border-[#dcdde0] py-4" aria-label="News categories">
        <div className="-mx-3 sm:hidden">
          <div className="grid grid-cols-[.8fr_1fr_1.2fr_1.5fr] gap-1">
            {filters.slice(0, 4).map((item) => <button className={`${filterClass(item)} min-w-0 !px-1 !text-[clamp(9px,2.65vw,12px)] tracking-[-.02em]`} key={item} type="button" aria-pressed={activeFilter === item} onClick={() => selectFilter(item)}>{item}</button>)}
          </div>
          <div className="mt-2 flex justify-center gap-2">
            {filters.slice(4).map((item) => <button className={filterClass(item)} key={item} type="button" aria-pressed={activeFilter === item} onClick={() => selectFilter(item)}>{item}</button>)}
          </div>
        </div>
        <div className="hidden flex-wrap gap-3 sm:flex">
          {filters.map((item) => <button className={filterClass(item)} key={item} type="button" aria-pressed={activeFilter === item} onClick={() => selectFilter(item)}>{item}</button>)}
        </div>
      </nav>

      <div className="grid gap-12 pt-3 sm:pt-5 md:pt-5 xl:grid-cols-[minmax(0,1fr)_360px] xl:gap-14">
        <section id="news-feed" aria-label={`${activeFilter} stories`}>
          <div className="divide-y divide-[#dcdde0] border-b border-[#dcdde0]">
            {isLoading ? <StoryLoading /> : stories.slice(0, visibleCount).map((story) => <NewsListCard story={story} path={storyPath(story)} showCategory={activeFilter === "All News"} key={story.id || story.title} />)}
            {!isLoading && stories.length === 0 && <div className="px-4 py-16 text-center"><h2 className="article-display-font m-0 text-2xl text-[#182536]">No matching stories</h2><p className="mt-3 mb-0 text-sm text-[#5f6368]">Try a different headline, author, or category.</p></div>}
          </div>
          {visibleCount < stories.length && <div className="mt-8 flex justify-center"><button className="inline-flex min-h-11 cursor-pointer items-center gap-3 rounded-full border border-[#182536] bg-transparent px-6 py-3 text-xs font-semibold text-[#182536] transition hover:bg-[#182536] hover:text-white focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-[#397d73]" type="button" onClick={() => setVisibleCount((count) => count + 6)}>Load more stories <Icon name="arrow" /></button></div>}
        </section>
        {activeFilter === "All News" ? <MostReadList stories={mostRead} storyPath={storyPath} /> : !isLoading && <CategoryStoriesList category={activeFilter} stories={databaseNews.filter((story) => story.category === activeFilter).slice(0, 5)} storyPath={storyPath} />}
      </div>
    </div>
  </main>;
}
