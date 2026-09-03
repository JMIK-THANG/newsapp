import { leadStory, mostReadStories, quickReads } from "../../data/news";
import Icon from "../ui/Icon";
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

export default function HeroSection() {
  return (
    <main id="top" className="bg-[#f7f5ef] px-3 pb-12 md:px-6">
      <section className="mx-auto max-w-[1380px]" aria-labelledby="lead-title">
        <div className="grid border-x border-b border-[#dcdde0] bg-white px-4 lg:grid-cols-[1.16fr_.84fr_.72fr] lg:px-0">
          <article className="group border-b border-[#dcdde0] py-6 lg:border-r lg:border-b-0 lg:px-7">
            <div className="mb-4 flex items-end justify-between">
              <div>
                <h2 className="m-0 inline-flex items-center gap-2 text-[20px] font-bold tracking-[-.02em] text-[#111318] after:h-px after:w-9 after:bg-[#4f9488]">
                  Top Story
                </h2>
              </div>
              <span className="text-[11px] font-semibold text-[#4f9488] uppercase">
                {leadStory.category}
              </span>
            </div>

            <Link
              className="relative block aspect-[16/7.4] overflow-hidden rounded-[6px] bg-[#e8edf2]"
              to={`/news/story/${leadStory.slug}`}
            >
              <img
                className="h-full w-full object-cover transition duration-700 group-hover:scale-[1.025]"
                src={leadStory.image}
                alt={leadStory.imageAlt}
              />
            </Link>

            <div className="pt-4">
              <p className="mb-2.5 text-[11px] font-medium text-[#5f6368] uppercase">
                {leadStory.date} · {leadStory.readTime}
              </p>
              <h1
                id="lead-title"
                className="m-0 max-w-[760px] font-serif text-[clamp(28px,2.25vw,35px)] leading-[1.1] tracking-[-.025em] text-[#111318]"
              >
                <Link className="transition hover:opacity-65" to={`/news/story/${leadStory.slug}`}>
                  {leadStory.title}
                </Link>
              </h1>
              <p className="mb-0 max-w-[690px] pt-2.5 text-[13px] leading-5 text-[#4f5359]">
                {leadStory.summary}
              </p>
              <div className="mt-3 flex items-center justify-between border-t border-[#dcdde0] pt-3">
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
          </article>

          <section
            className="flex flex-col border-b border-[#dcdde0] py-6 lg:border-r lg:border-b-0 lg:px-7"
            aria-labelledby="latest-news-title"
          >
            <SectionHeading
              title="Latest News"
            />
            <div className="divide-y divide-[#dcdde0]">
              {quickReads.map((story) => (
                <article className="py-3.5" key={story.title}>
                  <div className="mb-2.5 flex items-center gap-3">
                    <span className="text-[11px] font-semibold text-[#4f9488] uppercase">
                      {story.category}
                    </span>
                    <span className="text-[11px] text-[#5f6368]">
                      {story.time}
                    </span>
                  </div>
                  <h3 className="m-0 text-[18px] leading-[1.3] font-semibold tracking-[-.01em] text-[#111318]">
                    <Link
                      className="transition hover:opacity-65"
                      to={`/news/story/${story.slug}`}
                    >
                      {story.title}
                    </Link>
                  </h3>
                </article>
              ))}
            </div>
            <Link
              className="mt-auto flex items-center gap-2 border-t border-[#dcdde0] pt-4 text-[11px] font-semibold text-[#111318] transition hover:opacity-60"
              to="/news"
            >
              See all latest news <Icon name="arrow" />
            </Link>
          </section>

          <aside
            className="flex flex-col py-6 lg:px-7"
            aria-labelledby="most-read-title"
          >
            <SectionHeading
              title="Most Read"
            />
            <div className="mt-1 divide-y divide-[#dcdde0]">
              {mostReadStories.map((story, index) => (
                <article
                  className="group grid grid-cols-[1fr_88px] gap-3 py-3.5"
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
        </div>
      </section>
    </main>
  );
}
