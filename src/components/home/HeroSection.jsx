import { latestStories, leadStory, mostReadStories } from "../../data/news";
import useNews from "../../hooks/useNews";
import Icon from "../ui/Icon";
import { Link } from "react-router-dom";
import { shortStoryPath } from "../../utils/storyPath";

const MOST_READ_WINDOW_MS = 7 * 24 * 60 * 60 * 1000;

function isInMostReadWindow(story) {
  const publishedTime = new Date(story.publishedAt || story.published_at || story.date).getTime();
  return Number.isFinite(publishedTime) && publishedTime >= Date.now() - MOST_READ_WINDOW_MS;
}

function SectionHeading({ title }) {
  return (
    <div className="border-b border-[#dcdde0] pb-3">
      <h2 className="article-display-font m-0 inline-flex items-center gap-2 text-[24px] leading-tight font-semibold tracking-[-.02em] text-[#182536] after:h-px after:w-9 after:bg-[#4f9488]">
        {title}
      </h2>
    </div>
  );
}

function LatestNewsCard({ story, className = "" }) {
  const storyPath = shortStoryPath(story);

  return (
    <article className={`group min-w-0 snap-start border-t-[3px] border-[#182536] pt-2.5 ${className}`}>
      <Link
        className="block aspect-[16/9] overflow-hidden bg-[#e8edf2]"
        to={storyPath}
      >
        <img
          className="h-full w-full object-cover transition duration-500 group-hover:scale-[1.025]"
          src={story.image}
          alt={story.imageAlt}
        />
      </Link>
      <div className="pt-2.5">
        <p className="mb-1 text-[13px] font-bold tracking-[.05em] uppercase text-[#397d73]">
          {story.category}
        </p>
        <h3 className="article-display-font m-0 line-clamp-3 text-[20px] leading-[1.16] font-medium tracking-[-.005em] text-[#111318] xl:text-[21px]" title={story.title}>
          <Link
            className="transition hover:opacity-65"
            to={storyPath}
          >
            {story.title}
          </Link>
        </h3>
        <p className="mt-2 mb-0 text-[14px] font-normal text-[#69717a]">{story.date}</p>
      </div>
    </article>
  );
}

function LatestNewsGrid({ stories }) {
  if (stories.length === 0) {
    return <p className="my-6 text-sm text-[#5f6368]">No latest news has been published yet.</p>;
  }

  return (
    <div className="mt-4 grid gap-x-5 gap-y-8 sm:grid-cols-2 lg:grid-cols-4">
      {stories.map((story) => (
        <LatestNewsCard key={story.slug || story.id} story={story} />
      ))}
    </div>
  );
}

export default function HeroSection() {
  const { news, isLoading } = useNews();
  const databaseTopStory = news.find((story) => story.isTopStory);
  const currentLeadStory = databaseTopStory || leadStory;
  const databaseLatest = news
    .filter((story) => story.slug !== databaseTopStory?.slug)
    .slice(0, 8);
  const latestNews = (databaseLatest.length ? databaseLatest : latestStories).slice(0, 8);
  const databaseMostRead = [...news]
    .filter(isInMostReadWindow)
    .sort((first, second) => Number(second.views || 0) - Number(first.views || 0))
    .slice(0, 3);
  const currentMostRead = databaseMostRead.length >= 3
    ? databaseMostRead
    : mostReadStories.slice(0, 3);

  if (isLoading) {
    return (
      <main className="bg-[#f1eee8] px-3 pt-3 pb-6 md:px-6 md:pt-4 md:pb-8" aria-label="Loading homepage stories">
        <div className="mx-auto max-w-[1280px] border-x border-b border-[#dcdde0] bg-white p-4 xl:p-6">
          <div className="h-6 w-32 animate-pulse rounded bg-[#dedbd4]" />
          <div className="mt-4 h-[clamp(300px,52vw,560px)] animate-pulse rounded-[6px] bg-[#e8e4dc]" />
        </div>
      </main>
    );
  }

  return (
    <main id="top" className="bg-[#f1eee8] px-3 pt-6 pb-6 md:px-6 md:pt-8 md:pb-8">
      <section className="mx-auto max-w-[1280px]" aria-labelledby="lead-title">
        <div className="grid min-w-0 overflow-hidden border-x border-b border-[#dcdde0] bg-white px-4 xl:grid-cols-[minmax(0,1.65fr)_minmax(300px,.75fr)] xl:px-0">
          <article className="group order-1 min-w-0 border-b border-[#dcdde0] py-4 xl:border-r xl:border-b-0 xl:px-6">
            <div className="mb-2.5 flex items-end justify-between">
              <div>
                <h2 className="article-display-font m-0 inline-flex items-center gap-2 text-[24px] leading-tight font-semibold tracking-[-.02em] text-[#182536] after:h-px after:w-9 after:bg-[#4f9488]">
                  Top Story
                </h2>
              </div>
              <span className="text-[13px] font-semibold text-[#397d73] uppercase">
                {currentLeadStory.category}
              </span>
            </div>

            <div>
              <Link
                className="relative block h-[clamp(270px,64vw,400px)] overflow-hidden rounded-[6px] bg-[#e8edf2] xl:h-[clamp(420px,46svh,520px)]"
                to={shortStoryPath(currentLeadStory)}
              >
                <img
                  className="h-full w-full object-cover object-center transition duration-700 group-hover:scale-[1.015]"
                  src={currentLeadStory.image}
                  alt={currentLeadStory.imageAlt}
                />
              </Link>

              <div className="flex min-w-0 flex-col pt-3">
                <h1
                  id="lead-title"
                  className="article-display-font m-0 line-clamp-3 max-w-[980px] text-[clamp(30px,3vw,44px)] leading-[1.08] font-semibold tracking-[-.025em] text-[#111318]"
                  title={currentLeadStory.title}
                >
                  <Link className="transition hover:opacity-65" to={shortStoryPath(currentLeadStory)}>
                    {currentLeadStory.title}
                  </Link>
                </h1>
                <p className="mt-2 mb-0 text-[14px] font-normal text-[#69717a]">{currentLeadStory.date}</p>
                <p className="home-story-summary mb-0 line-clamp-2 max-w-[850px] pt-2" title={currentLeadStory.summary}>
                  {currentLeadStory.summary}
                </p>
                <div className="mt-5 flex items-center justify-between gap-3 rounded-[6px] border border-[#d7d4ce] bg-[#f1eee8] px-3 py-3 sm:px-4">
                  <p className="m-0 min-w-0 truncate text-[13px] font-medium text-[#5f6368]">
                    By{" "}
                    <span className="font-semibold text-[#111318]">
                      {currentLeadStory.author}
                    </span>
                  </p>
                  <Link
                    className="flex shrink-0 items-center gap-2 rounded-full bg-[#182536] px-3.5 py-2 text-[11px] font-semibold tracking-[.02em] text-white transition hover:bg-[#8f2427] sm:px-4 sm:text-[12px]"
                    to={shortStoryPath(currentLeadStory)}
                  >
                    Read full story <Icon name="arrow" />
                  </Link>
                </div>
              </div>
            </div>
          </article>

          <aside
            className="order-3 flex min-w-0 flex-col border-t border-[#dcdde0] py-4 xl:order-2 xl:border-t-0 xl:border-l xl:px-6"
            aria-labelledby="most-read-title"
          >
            <SectionHeading
              title="Most Read"
            />
            <div className="mt-1 divide-y divide-[#dcdde0]">
              {currentMostRead.map((story, index) => (
                <article
                  className="group grid grid-cols-[1fr_78px] gap-3 py-3"
                  key={story.title}
                >
                  <div className="flex flex-col justify-center">
                    <p className="mb-2 text-[13px] font-semibold text-[#397d73] uppercase">{story.category}</p>
                    <h3 className="article-display-font m-0 line-clamp-3 text-[19px] leading-[1.16] font-semibold tracking-[-.015em] text-[#111318] xl:text-[21px]" title={story.title}>
                      <Link
                        className="transition hover:opacity-65"
                        to={story.id ? shortStoryPath(story) : `/news/story/popular-${index + 1}`}
                      >
                        {story.title}
                      </Link>
                    </h3>
                    <p className="mt-2 mb-0 text-[14px] font-normal text-[#69717a]">{story.date}</p>
                  </div>
                  <Link
                    className="aspect-[4/3] overflow-hidden rounded-[4px] bg-[#e8edf2]"
                    to={story.id ? shortStoryPath(story) : `/news/story/popular-${index + 1}`}
                    tabIndex="-1"
                  >
                    <img
                      className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                      src={story.image}
                      alt={story.imageAlt}
                    />
                  </Link>
                </article>
              ))}
            </div>
            <Link
              className="mt-auto flex items-center gap-2 border-t border-[#dcdde0] pt-6 pb-2 text-[14px] font-semibold text-[#111318] transition hover:opacity-60"
              to="/news?sort=most-read"
            >
              See all most read <Icon name="arrow" />
            </Link>
          </aside>

          <section
            className="order-2 min-w-0 pt-8 pb-6 xl:order-3 xl:col-span-2 xl:border-t xl:border-[#dcdde0] xl:px-7 xl:pt-8 xl:pb-7"
            aria-labelledby="latest-news-title"
          >
            <div className="mb-6 flex items-center gap-3">
              <h2 id="latest-news-title" className="m-0 bg-[#182536] px-4 py-2 text-[15px] font-medium tracking-[.04em] text-white uppercase sm:text-[16px]">News</h2>
              <span className="h-px min-w-4 flex-1 bg-[#182536]" aria-hidden="true" />
              <Link
                className="flex items-center gap-2 rounded-full border border-[#182536] bg-transparent px-4 py-2 text-[11px] font-semibold tracking-[.05em] text-[#182536] uppercase transition hover:bg-[#182536] hover:text-white"
                to="/news"
              >
                View all news <Icon name="arrow" />
              </Link>
            </div>

            <LatestNewsGrid stories={latestNews} />
          </section>
        </div>
      </section>
    </main>
  );
}
