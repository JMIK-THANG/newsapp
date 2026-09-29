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

  return <main id="news-page" className="bg-white px-5 py-9 sm:px-6 md:py-12" aria-labelledby="news-page-title">
    <div className="mx-auto max-w-[1420px]">
      <header className={`border-b border-[#dcdde0] ${searchQuery || activeFilter === "All News" ? "pb-7 md:pb-9" : "pb-5 md:pb-7"}`}>
        <p className="mb-3 text-[10px] font-bold tracking-[.14em] text-[#397d73] uppercase">The newsroom</p>
        <div className="max-w-[820px]">
          <h1 id="news-page-title" className="article-display-font m-0 text-[clamp(40px,7vw,64px)] leading-[1] font-semibold tracking-[-.04em] text-[#182536]">{searchQuery ? "Search results" : activeFilter}</h1>
          {(searchQuery || activeFilter === "All News") && <p className="mt-4 mb-0 max-w-[760px] text-[17px] leading-7 text-[#4f5962]">{searchQuery ? `${stories.length} result${stories.length === 1 ? "" : "s"} for “${searchQuery}”` : "The latest reporting from Chin communities, Myanmar, and around the world."}</p>}
        </div>
      </header>

      <nav id="news-filters" className="-mx-5 border-b border-[#dcdde0] sm:mx-0" aria-label="News categories">
        <div className="grid grid-cols-2 sm:flex sm:min-w-max sm:gap-7">
          {filters.map((item) => <button className={`relative min-w-0 cursor-pointer border-0 border-b border-[#dcdde0] bg-transparent px-2 py-4 text-center text-[14px] font-semibold whitespace-nowrap transition even:border-l sm:shrink-0 sm:border-0 sm:px-0 sm:text-left sm:text-[15px] focus-visible:outline-2 focus-visible:outline-offset-[-4px] focus-visible:outline-[#397d73] ${activeFilter === item ? "text-[#182536] after:absolute after:right-[18%] after:bottom-[-1px] after:left-[18%] after:h-[3px] after:bg-[#397d73] sm:after:right-0 sm:after:left-0" : "text-[#69717a] hover:text-[#182536]"}`} key={item} type="button" aria-pressed={activeFilter === item} onClick={() => selectFilter(item)}>{item}</button>)}
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
