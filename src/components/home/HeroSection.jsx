import { leadStory, mostReadStories, quickReads } from "../../data/news";
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

function LatestNewsCarousel() {
  const carouselRef = useRef(null);
  const [activeStory, setActiveStory] = useState(0);
  const stories = quickReads.slice(0, 5);

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

  return (
    <>
      <div
        ref={carouselRef}
        className="mt-4 grid w-full max-w-full min-w-0 snap-x snap-mandatory auto-cols-[84%] grid-flow-col gap-5 overflow-x-auto overscroll-x-contain pb-3 [scrollbar-color:#aeb9b5_transparent] [scrollbar-width:thin] sm:auto-cols-[47%] lg:grid-flow-row lg:grid-cols-4 lg:auto-cols-auto lg:overflow-visible"
        onScroll={updateActiveStory}
      >
        {stories.map((story, index) => (
          <LatestNewsCard
            className={index === 4 ? "lg:hidden" : ""}
            key={story.slug}
            story={story}
          />
        ))}
      </div>

      <div className="mt-2 flex justify-center gap-2 lg:hidden" aria-label="Latest News slides">
        {stories.map((story, index) => (
          <button
            aria-label={`Show story ${index + 1}: ${story.title}`}
            aria-current={activeStory === index ? "true" : undefined}
            className={`h-2 cursor-pointer rounded-full border-0 p-0 transition-all duration-300 ${
              activeStory === index
                ? "w-6 bg-[#4f9488]"
                : "w-2 bg-[#c8cfcc] hover:bg-[#8eaaa4]"
            }`}
            key={story.slug}
            onClick={() => goToStory(index)}
            type="button"
          />
        ))}
      </div>
    </>
  );
}

export default function HeroSection() {
  return (
    <main id="top" className="bg-[#f7f5ef] px-3 pb-6 md:px-6 md:pb-8">
      <section className="mx-auto max-w-[1380px]" aria-labelledby="lead-title">
        <div className="grid min-w-0 overflow-hidden border-x border-b border-[#dcdde0] bg-white px-4 xl:grid-cols-[minmax(0,1.65fr)_minmax(300px,.75fr)] xl:px-0">
          <article className="group order-1 min-w-0 border-b border-[#dcdde0] py-4 xl:border-r xl:border-b-0 xl:px-6">
            <div className="mb-2.5 flex items-end justify-between">
              <div>
                <h2 className="m-0 inline-flex items-center gap-2 text-[20px] font-bold tracking-[-.02em] text-[#111318] after:h-px after:w-9 after:bg-[#4f9488]">
                  Top Story
                </h2>
              </div>
              <span className="text-[11px] font-semibold text-[#4f9488] uppercase">
                {leadStory.category}
              </span>
            </div>

            <div className="xl:grid xl:grid-cols-[minmax(0,1.5fr)_minmax(240px,.7fr)] xl:gap-5">
              <Link
                className="relative block h-[clamp(230px,58vw,340px)] overflow-hidden rounded-[6px] bg-[#e8edf2] xl:h-full xl:min-h-[270px]"
                to={`/news/story/${leadStory.slug}`}
              >
                <img
                  className="h-full w-full object-cover transition duration-700 group-hover:scale-[1.025]"
                  src={leadStory.image}
                  alt={leadStory.imageAlt}
                />
              </Link>

              <div className="flex min-w-0 flex-col pt-3 xl:pt-1">
                <p className="mb-2 text-[11px] font-medium text-[#5f6368] uppercase">
                  {leadStory.date} · {leadStory.readTime}
                </p>
                <h1
                  id="lead-title"
                  className="m-0 font-serif text-[clamp(25px,1.75vw,30px)] leading-[1.06] tracking-[-.025em] text-[#111318]"
                >
                  <Link className="transition hover:opacity-65" to={`/news/story/${leadStory.slug}`}>
                    {leadStory.title}
                  </Link>
                </h1>
                <p className="mb-0 pt-2.5 text-[12px] leading-[1.55] text-[#4f5359]">
                  {leadStory.summary}
                </p>
                <div className="mt-3 flex flex-col items-start gap-2 border-t border-[#dcdde0] pt-2.5 xl:mt-auto 2xl:flex-row 2xl:items-center 2xl:justify-between">
                  <p className="m-0 text-[11px] font-medium text-[#5f6368]">
                    By{" "}
                    <span className="font-semibold text-[#111318]">
                      {leadStory.author}
                    </span>
                  </p>
                  <Link
                    className="flex items-center gap-2 text-xs font-bold text-[#182536]"
                    to={`/news/story/${leadStory.slug}`}
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
              {mostReadStories.slice(0, 3).map((story, index) => (
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
                        to={`/news/story/popular-${index + 1}`}
                      >
                        {story.title}
                      </Link>
                    </h3>
                  </div>
                  <Link
                    className="aspect-[4/3] overflow-hidden rounded-[4px] bg-[#e8edf2]"
                    to={`/news/story/popular-${index + 1}`}
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

            <LatestNewsCarousel />
          </section>
        </div>
      </section>
    </main>
  );
}
