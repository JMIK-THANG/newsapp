import { latestStories, leadStory, mostReadStories } from "../../data/news";
import useNews from "../../hooks/useNews";
import Icon from "../ui/Icon";
import { useRef, useState } from "react";
import { Link } from "react-router-dom";
import { shortStoryPath } from "../../utils/storyPath";

function SectionHeading({ title }) {
  return (
    <div className="border-b border-[#dcdde0] pb-3">
      <h2 className="m-0 inline-flex items-center gap-2 text-[20px] xl:text-[21px] font-bold tracking-[-.02em] text-[#111318] after:h-px after:w-9 after:bg-[#4f9488]">
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
        <p className="mb-1 text-[12px] font-bold tracking-[.05em] uppercase text-[#4f9488]">
          {story.category}{" "}
          <span className="font-normal text-[#5f6368]">· {story.time}</span>
        </p>
        <h3 className="m-0 line-clamp-3 font-serif text-[20px] leading-[1.22] font-semibold tracking-[-.02em] text-[#111318] xl:text-[22px]" title={story.title}>
          <Link
            className="transition hover:opacity-65"
            to={storyPath}
          >
            {story.title}
          </Link>
        </h3>
      </div>
    </article>
  );
}

function LatestNewsCarousel({ stories }) {
  const carouselRef = useRef(null);
  const [activeStory, setActiveStory] = useState(0);

  const updateActiveStory = () => {
    const carousel = carouselRef.current;
    if (!carousel) return;

    const cards = Array.from(carousel.children).filter((card) => card.offsetParent !== null);
    const closestCard = cards.reduce((closest, card, index) => {
      const distance = Math.abs(card.offsetLeft - carousel.scrollLeft);
      return distance < closest.distance ? { distance, index } : closest;
    }, { distance: Number.POSITIVE_INFINITY, index: 0 });

    setActiveStory(closestCard.index);
  };

  const goToStory = (index) => {
    const carousel = carouselRef.current;
    const story = carousel?.children[index];
    if (!carousel || !story) return;
    carousel.scrollTo({ left: story.offsetLeft, behavior: "smooth" });
    setActiveStory(index);
  };

  const desktopPageCount = Math.ceil(stories.length / 10);
  const desktopPage = Math.min(Math.floor(activeStory / 10), desktopPageCount - 1);

  if (stories.length === 0) {
    return <p className="my-6 text-sm text-[#5f6368]">No latest news has been published yet.</p>;
  }

  return (
    <>
      <div
        ref={carouselRef}
        className="mt-4 grid w-full max-w-full min-w-0 snap-x snap-proximity auto-cols-[86%] grid-rows-1 scroll-smooth grid-flow-col gap-x-4 gap-y-7 overflow-x-auto overscroll-x-contain pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden sm:auto-cols-[47%] lg:auto-cols-[calc((100%_-_3rem)/4)] lg:grid-rows-2 xl:auto-cols-[calc((100%_-_4rem)/5)]"
        onScroll={updateActiveStory}
      >
        {stories.map((story, index) => <LatestNewsCard className={index >= 5 ? "hidden lg:block" : ""} key={story.slug} story={story} />)}
      </div>

      <div className={`mt-3 min-h-9 items-center justify-center gap-2 ${stories.length > 1 ? "flex" : "hidden"}`} aria-label="Latest News carousel controls">
        <div className="flex gap-2 lg:hidden">
          {stories.slice(0, 5).map((story, index) => (
            <button
              aria-label={`Show story ${index + 1}: ${story.title}`}
              aria-current={activeStory === index ? "true" : undefined}
              className={`h-2.5 cursor-pointer rounded-full border-0 p-0 transition-all duration-300 ${activeStory === index ? "w-7 bg-[#4f9488]" : "w-2.5 bg-[#b8c4c0] hover:bg-[#789d96]"}`}
              key={story.slug}
              onClick={() => goToStory(index)}
              type="button"
            />
          ))}
        </div>

        {desktopPageCount > 1 && <div className="ml-auto hidden items-center gap-3 lg:flex">
          <span className="text-[10px] font-bold tracking-[.12em] text-[#5f6368]" aria-live="polite">{desktopPage + 1} / {desktopPageCount}</span>
          <div className="flex items-center gap-1.5" aria-label="Latest News pages">
            {Array.from({ length: desktopPageCount }, (_, index) => (
              <button
                aria-label={`Show latest news page ${index + 1}`}
                aria-current={desktopPage === index ? "true" : undefined}
                className={`h-2 cursor-pointer rounded-full border-0 p-0 transition-all ${desktopPage === index ? "w-6 bg-[#9b1c1f]" : "w-2 bg-[#b8c4c0] hover:bg-[#789d96]"}`}
                key={index}
                onClick={() => goToStory(index * 10)}
                type="button"
              />
            ))}
          </div>
          <button className="grid size-9 cursor-pointer place-items-center border border-[#182536] bg-white text-[#182536] transition hover:bg-[#182536] hover:text-white disabled:cursor-default disabled:opacity-25" disabled={desktopPage === 0} onClick={() => goToStory((desktopPage - 1) * 10)} type="button" aria-label="Show previous latest news page"><span className="rotate-180"><Icon name="arrow" /></span></button>
          <button className="grid size-9 cursor-pointer place-items-center border border-[#182536] bg-[#182536] text-white transition hover:bg-[#9b1c1f] disabled:cursor-default disabled:opacity-25" disabled={desktopPage === desktopPageCount - 1} onClick={() => goToStory((desktopPage + 1) * 10)} type="button" aria-label="Show next latest news page"><Icon name="arrow" /></button>
        </div>}
      </div>
    </>
  );
}

export default function HeroSection() {
  const { news, isLoading } = useNews();
  const [briefEmail, setBriefEmail] = useState("");
  const [briefStatus, setBriefStatus] = useState("idle");
  const databaseTopStory = news.find((story) => story.isTopStory);
  const currentLeadStory = databaseTopStory || leadStory;
  const databaseLatest = news
    .filter((story) => story.slug !== databaseTopStory?.slug)
    .slice(0, 30);
  const latestNews = databaseLatest.length ? databaseLatest : latestStories;
  const databaseMostRead = [...news]
    .filter((story) => story.slug !== databaseTopStory?.slug)
    .sort((first, second) => second.views - first.views)
    .slice(0, 3);
  const currentMostRead = databaseMostRead.length >= 3
    ? databaseMostRead
    : mostReadStories.slice(0, 3);

  if (isLoading) {
    return (
      <main className="bg-[#f1eee8] px-3 pt-3 pb-6 md:px-6 md:pt-4 md:pb-8" aria-label="Loading homepage stories">
        <div className="mx-auto max-w-[1380px] border-x border-b border-[#dcdde0] bg-white p-4 xl:p-6">
          <div className="h-6 w-32 animate-pulse rounded bg-[#dedbd4]" />
          <div className="mt-4 h-[clamp(300px,52vw,560px)] animate-pulse rounded-[6px] bg-[#e8e4dc]" />
        </div>
      </main>
    );
  }

  return (
    <main id="top" className="bg-[#f1eee8] px-3 pt-3 pb-6 md:px-6 md:pt-4 md:pb-8">
      <section className="mx-auto max-w-[1380px]" aria-labelledby="lead-title">
        <div className="grid min-w-0 overflow-hidden border-x border-b border-[#dcdde0] bg-white px-4 xl:grid-cols-[minmax(0,1.65fr)_minmax(300px,.75fr)] xl:px-0">
          <article className="group order-1 min-w-0 border-b border-[#dcdde0] py-4 xl:border-r xl:border-b-0 xl:px-6">
            <div className="mb-2.5 flex items-end justify-between">
              <div>
                <h2 className="m-0 inline-flex items-center gap-2 text-[20px] xl:text-[21px] font-bold tracking-[-.02em] text-[#111318] after:h-px after:w-9 after:bg-[#4f9488]">
                  Top Story
                </h2>
              </div>
              <span className="text-[12px] font-semibold text-[#4f9488] uppercase">
                {currentLeadStory.category}
              </span>
            </div>

            <div>
              <Link
                className="relative block h-[clamp(250px,62vw,380px)] overflow-hidden rounded-[6px] bg-[#e8edf2] xl:h-[clamp(430px,48svh,540px)]"
                to={shortStoryPath(currentLeadStory)}
              >
                <img
                  className="h-full w-full object-cover object-center transition duration-700 group-hover:scale-[1.015]"
                  src={currentLeadStory.image}
                  alt={currentLeadStory.imageAlt}
                />
              </Link>

              <div className="flex min-w-0 flex-col pt-3">
                <p className="mb-2 text-[12px] font-medium text-[#5f6368] uppercase">
                  {currentLeadStory.date} · {currentLeadStory.readTime}
                </p>
                <h1
                  id="lead-title"
                  className="m-0 line-clamp-2 max-w-[900px] font-serif text-[clamp(23px,1.95vw,32px)] leading-[1.12] tracking-[-.02em] text-[#111318]"
                  title={currentLeadStory.title}
                >
                  <Link className="transition hover:opacity-65" to={shortStoryPath(currentLeadStory)}>
                    {currentLeadStory.title}
                  </Link>
                </h1>
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
                    <p className="mb-2 text-[12px] font-semibold text-[#4f9488] uppercase">
                      {story.category}{" "}
                      <span className="font-normal text-[#5f6368]">
                        · {story.time}
                      </span>
                    </p>
                    <h3 className="m-0 line-clamp-3 font-serif text-[20px] leading-[1.22] font-semibold tracking-[-.02em] text-[#111318] xl:text-[22px]" title={story.title}>
                      <Link
                        className="transition hover:opacity-65"
                        to={story.id ? shortStoryPath(story) : `/news/story/popular-${index + 1}`}
                      >
                        {story.title}
                      </Link>
                    </h3>
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
            <form
              className="mt-4 border border-[#cfd3d5] bg-[#f1eee8] p-4"
              onSubmit={(event) => {
                event.preventDefault();
                setBriefStatus("demo");
              }}
            >
              <p className="mb-2 text-[10px] font-bold tracking-[.12em] text-[#9b1c1f] uppercase">Get daily email updates</p>
              <p className="mt-0 mb-3 text-[12px] leading-5 text-[#4f5359]">A concise briefing of the day’s most important stories.</p>
              <label className="sr-only" htmlFor="hero-brief-email">Email address</label>
              <div className="flex">
                <input
                  className="min-w-0 flex-1 border border-[#bfc4c5] bg-white px-3 py-2.5 text-[12px] outline-none focus:border-[#4f9488]"
                  id="hero-brief-email"
                  onChange={(event) => {
                    setBriefEmail(event.target.value);
                    setBriefStatus("idle");
                  }}
                  placeholder="Email address"
                  required
                  type="email"
                  value={briefEmail}
                />
                <button className="cursor-pointer border-0 bg-[#182536] px-3 text-[10px] font-bold tracking-[.06em] text-white uppercase transition hover:bg-[#9b1c1f]" type="submit">Subscribe</button>
              </div>
              <p className={`mb-0 text-[10px] leading-4 text-[#5f6368] ${briefStatus === "demo" ? "mt-2" : "sr-only"}`} aria-live="polite">
                Email delivery is coming soon. No address has been saved yet.
              </p>
            </form>
            <Link
              className="mt-auto flex items-center gap-2 border-t border-[#dcdde0] pt-6 pb-2 text-[14px] font-semibold text-[#111318] transition hover:opacity-60"
              to="/news"
            >
              See all most read <Icon name="arrow" />
            </Link>
          </aside>

          <section
            className="order-2 min-w-0 pt-8 pb-6 xl:order-3 xl:col-span-2 xl:border-t xl:border-[#dcdde0] xl:px-7 xl:pt-8 xl:pb-7"
            aria-labelledby="latest-news-title"
          >
            <div className="mb-6 flex items-center justify-end border-y border-[#d7d4ce] py-4">
              <h2 id="latest-news-title" className="sr-only">Latest News</h2>
              <Link
                className="flex items-center gap-2 rounded-full border border-[#182536] bg-transparent px-4 py-2 text-[11px] font-semibold tracking-[.05em] text-[#182536] uppercase transition hover:bg-[#182536] hover:text-white"
                to="/news"
              >
                View all news <Icon name="arrow" />
              </Link>
            </div>

            <LatestNewsCarousel stories={latestNews} />
          </section>
        </div>
      </section>
    </main>
  );
}
