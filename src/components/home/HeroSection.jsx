import { leadStory, mostReadStories } from "../../data/news";
import useNews from "../../hooks/useNews";
import Icon from "../ui/Icon";
import { useRef, useState } from "react";
import { Link } from "react-router-dom";

function SectionHeading({ title }) {
  return (
    <div className="border-b border-[#dcdde0] pb-3">
      <h2 className="m-0 inline-flex items-center gap-2 text-[20px] font-bold tracking-[-.02em] text-[#111318] after:h-px after:w-9 after:bg-[#4f9488]">
        {title}
      </h2>
    </div>
  );
}

function LatestNewsCard({ story, className = "" }) {
  return (
    <article className={`group min-w-0 snap-start ${className}`}>
      <Link
        className="block aspect-[16/8.5] overflow-hidden rounded-[6px] bg-[#e8edf2]"
        to={`/news/story/${story.slug}`}
      >
        <img
          className="h-full w-full object-cover transition duration-500 group-hover:scale-[1.025]"
          src={story.image}
          alt={story.imageAlt}
        />
      </Link>
      <div className="pt-2.5">
        <p className="mb-1.5 text-[10px] font-semibold uppercase text-[#4f9488]">
          {story.category}{" "}
          <span className="font-normal text-[#5f6368]">· {story.time}</span>
        </p>
        <h3 className="m-0 text-[16px] leading-[1.28] font-semibold tracking-[-.01em] text-[#111318]">
          <Link
            className="transition hover:opacity-65"
            to={`/news/story/${story.slug}`}
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
  const pageSize = 4;
  const pageCount = Math.max(1, Math.ceil(stories.length / pageSize));

  const updateActiveStory = () => {
    const carousel = carouselRef.current;
    if (!carousel) return;

    const cards = Array.from(carousel.children);
    const closestCard = cards.reduce((closest, card, index) => {
      const distance = Math.abs(card.offsetLeft - carousel.scrollLeft);
      return distance < closest.distance ? { distance, index } : closest;
    }, { distance: Number.POSITIVE_INFINITY, index: 0 });

    setActiveStory(closestCard.index);
  };

  const goToStory = (index) => {
    carouselRef.current?.children[index]?.scrollIntoView({
      behavior: "smooth",
      block: "nearest",
      inline: "start",
    });
    setActiveStory(index);
  };

  const currentPage = Math.min(pageCount, Math.floor(activeStory / pageSize) + 1);

  const goToPage = (page) => {
    goToStory((page - 1) * pageSize);
  };

  if (stories.length === 0) {
    return <p className="my-6 text-sm text-[#5f6368]">No latest news has been published yet.</p>;
  }

  return (
    <>
      <div
        ref={carouselRef}
        className="mt-4 grid w-full max-w-full min-w-0 snap-x snap-mandatory auto-cols-[84%] grid-flow-col gap-5 overflow-x-auto overscroll-x-contain pb-3 [scrollbar-color:#aeb9b5_transparent] [scrollbar-width:thin] sm:auto-cols-[47%] lg:auto-cols-[calc((100%_-_3.75rem)/4)] lg:overflow-hidden"
        onScroll={updateActiveStory}
      >
        {stories.map((story) => <LatestNewsCard key={story.slug} story={story} />)}
      </div>

      <div className="mt-2 flex min-h-9 items-center justify-center gap-2" aria-label="Latest News carousel controls">
        <div className="flex gap-2 lg:hidden">
          {stories.map((story, index) => (
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

        <div className="ml-auto hidden items-center gap-3 lg:flex">
          <span className="text-[10px] font-bold tracking-[.12em] text-[#5f6368]" aria-live="polite">{currentPage} / {pageCount}</span>
          <button className="grid size-9 cursor-pointer place-items-center rounded-full border border-[#cfd3d5] bg-white text-[#182536] transition hover:border-[#4f9488] hover:bg-[#eef3f1] disabled:cursor-default disabled:opacity-30" disabled={currentPage === 1} onClick={() => goToPage(currentPage - 1)} type="button" aria-label="Show previous latest stories"><span className="rotate-180"><Icon name="arrow" /></span></button>
          <button className="grid size-9 cursor-pointer place-items-center rounded-full border border-[#cfd3d5] bg-white text-[#182536] transition hover:border-[#4f9488] hover:bg-[#eef3f1] disabled:cursor-default disabled:opacity-30" disabled={currentPage === pageCount} onClick={() => goToPage(currentPage + 1)} type="button" aria-label="Show next latest stories"><Icon name="arrow" /></button>
        </div>
      </div>
    </>
  );
}

export default function HeroSection() {
  const { news } = useNews();
  const databaseTopStory = news.find((story) => story.isTopStory);
  const currentLeadStory = databaseTopStory || leadStory;
  const databaseLatest = news
    .filter((story) => story.slug !== databaseTopStory?.slug)
    .slice(0, 8);
  const latestNews = databaseLatest;
  const databaseMostRead = [...news]
    .filter((story) => story.slug !== databaseTopStory?.slug)
    .sort((first, second) => second.views - first.views)
    .slice(0, 3);
  const currentMostRead = databaseMostRead.length >= 3
    ? databaseMostRead
    : mostReadStories.slice(0, 3);

  return (
    <main id="top" className="bg-[#f7f5ef] px-3 pb-6 md:px-6 md:pb-8">
      <section className="mx-auto max-w-[1380px]" aria-labelledby="lead-title">
        <div className="grid min-w-0 overflow-hidden border-x border-b border-[#dcdde0] bg-white px-4 xl:grid-cols-[minmax(0,1.65fr)_minmax(300px,.75fr)] xl:px-0">
          <article className="group order-1 min-w-0 border-b border-[#dcdde0] py-4 xl:min-h-[clamp(580px,calc(100svh-185px),720px)] xl:border-r xl:border-b-0 xl:px-6">
            <div className="mb-2.5 flex items-end justify-between">
              <div>
                <h2 className="m-0 inline-flex items-center gap-2 text-[20px] font-bold tracking-[-.02em] text-[#111318] after:h-px after:w-9 after:bg-[#4f9488]">
                  Top Story
                </h2>
              </div>
              <span className="text-[11px] font-semibold text-[#4f9488] uppercase">
                {currentLeadStory.category}
              </span>
            </div>

            <div>
              <Link
                className="relative block h-[clamp(230px,58vw,340px)] overflow-hidden rounded-[6px] bg-[#e8edf2] xl:h-[clamp(340px,38svh,420px)]"
                to={`/news/story/${currentLeadStory.slug}`}
              >
                <img
                  className="h-full w-full object-cover transition duration-700 group-hover:scale-[1.025]"
                  src={currentLeadStory.image}
                  alt={currentLeadStory.imageAlt}
                />
              </Link>

              <div className="flex min-w-0 flex-col pt-3">
                <p className="mb-2 text-[11px] font-medium text-[#5f6368] uppercase">
                  {currentLeadStory.date} · {currentLeadStory.readTime}
                </p>
                <h1
                  id="lead-title"
                  className="m-0 max-w-[900px] font-serif text-[clamp(27px,2.5vw,38px)] leading-[1.06] tracking-[-.025em] text-[#111318]"
                >
                  <Link className="transition hover:opacity-65" to={`/news/story/${currentLeadStory.slug}`}>
                    {currentLeadStory.title}
                  </Link>
                </h1>
                <p className="mb-0 line-clamp-2 max-w-[850px] pt-2 text-[12px] leading-[1.55] text-[#4f5359]" title={currentLeadStory.summary}>
                  {currentLeadStory.summary}
                </p>
                <div className="mt-3 flex flex-col items-start gap-2 border-t border-[#dcdde0] pt-2.5 sm:flex-row sm:items-center sm:justify-between">
                  <p className="m-0 text-[11px] font-medium text-[#5f6368]">
                    By{" "}
                    <span className="font-semibold text-[#111318]">
                      {currentLeadStory.author}
                    </span>
                  </p>
                  <Link
                    className="flex items-center gap-2 text-xs font-bold text-[#182536]"
                    to={`/news/story/${currentLeadStory.slug}`}
                  >
                    Read full story <Icon name="arrow" />
                  </Link>
                </div>
              </div>
            </div>
          </article>

          <aside
            className="order-3 flex min-w-0 flex-col border-t border-[#dcdde0] py-4 xl:order-2 xl:min-h-[clamp(580px,calc(100svh-185px),720px)] xl:border-t-0 xl:border-l xl:px-6"
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
                    <p className="mb-2 text-[11px] font-semibold text-[#4f9488] uppercase">
                      {story.category}{" "}
                      <span className="font-normal text-[#5f6368]">
                        · {story.time}
                      </span>
                    </p>
                    <h3 className="m-0 text-[15px] leading-[1.35] font-semibold tracking-[-.01em] text-[#111318]">
                      <Link
                        className="transition hover:opacity-65"
                        to={story.slug ? `/news/story/${story.slug}` : `/news/story/popular-${index + 1}`}
                      >
                        {story.title}
                      </Link>
                    </h3>
                  </div>
                  <Link
                    className="aspect-[4/3] overflow-hidden rounded-[4px] bg-[#e8edf2]"
                    to={story.slug ? `/news/story/${story.slug}` : `/news/story/popular-${index + 1}`}
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
              className="mt-auto flex items-center gap-2 border-t border-[#dcdde0] pt-4 text-[11px] font-semibold text-[#111318] transition hover:opacity-60"
              to="/news"
            >
              See all most read <Icon name="arrow" />
            </Link>
          </aside>

          <section
            className="order-2 min-w-0 py-5 xl:order-3 xl:col-span-2 xl:border-t xl:border-[#dcdde0] xl:px-7"
            aria-labelledby="latest-news-title"
          >
            <div className="flex items-end justify-between border-b border-[#dcdde0] pb-3">
              <h2
                id="latest-news-title"
                className="m-0 inline-flex items-center gap-2 text-[20px] font-bold tracking-[-.02em] text-[#111318] after:h-px after:w-9 after:bg-[#4f9488]"
              >
                Latest News
              </h2>
              <Link
                className="flex items-center gap-2 text-[11px] font-semibold text-[#111318] transition hover:opacity-60"
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
