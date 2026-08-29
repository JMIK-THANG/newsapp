import { articleStories } from "../data/sectionPageData";
import Icon from "../components/ui/Icon";
import { Link } from "react-router-dom";

export default function ArticlesPage() {
  const [feature, ...stories] = articleStories;

  return (
    <main className="bg-white px-3 py-10 md:px-6 md:py-14">
      <div className="mx-auto max-w-[1380px]">
        <header className="border-b border-[#dcdde0] pb-7">
          <p className="mb-2 text-[11px] font-bold tracking-[.08em] uppercase">
            Features and analysis
          </p>
          <h1 className="m-0 font-serif text-[clamp(42px,6vw,72px)] leading-none tracking-[-.045em]">
            Articles
          </h1>
          <p className="mt-4 mb-0 max-w-2xl text-sm leading-6 text-[#4f5359]">
            Explanations, profiles, and deeply reported features that take
            readers beyond the daily headline.
          </p>
        </header>

        <article className="group grid gap-7 border-b border-[#dcdde0] py-8 lg:grid-cols-[1.35fr_.65fr]">
          <Link
            className="aspect-[16/9] overflow-hidden bg-[#e8edf2]"
            to="/articles/featured"
          >
            <img
              className="h-full w-full object-cover transition duration-700 group-hover:scale-[1.02]"
              src={feature.image}
              alt={feature.imageAlt}
            />
          </Link>
          <div className="flex flex-col justify-center">
            <p className="mb-3 text-[11px] font-semibold text-[#4f9488] uppercase">
              {feature.category}{" "}
              <span className="font-normal text-[#5f6368]">
                · {feature.date}
              </span>
            </p>
            <h2 className="m-0 font-serif text-[clamp(30px,3.4vw,46px)] leading-[1.07] tracking-[-.04em]">
              <Link to="/articles/featured">{feature.title}</Link>
            </h2>
            <p className="my-4 text-sm leading-6 text-[#4f5359]">
              {feature.summary}
            </p>
            <Link
              className="flex w-fit items-center gap-2 text-xs font-semibold"
              to="/articles/featured"
            >
              Read the full article <Icon name="arrow" />
            </Link>
          </div>
        </article>

        <section
          className="grid gap-x-7 sm:grid-cols-2 lg:grid-cols-3"
          aria-label="More articles"
        >
          {stories.map((story, index) => (
            <article
              className="group border-b border-[#dcdde0] py-7"
              key={story.title}
            >
              <Link
                className="mb-4 block aspect-[16/10] overflow-hidden bg-[#e8edf2]"
                to={`/articles/story-${index + 1}`}
              >
                <img
                  className="h-full w-full object-cover transition duration-500 group-hover:scale-[1.025]"
                  src={story.image}
                  alt={story.imageAlt}
                />
              </Link>
              <p className="mb-2 text-[10px] font-semibold text-[#4f9488] uppercase">
                {story.category} <span className="font-normal text-[#5f6368]">· {story.date}</span>
              </p>
              <h2 className="m-0 text-[22px] leading-[1.2] font-semibold tracking-[-.025em]">
                <Link
                  className="hover:opacity-60"
                  to={`/articles/story-${index + 1}`}
                >
                  {story.title}
                </Link>
              </h2>
              <p className="mt-3 mb-0 text-[13px] leading-5 text-[#4f5359]">
                {story.summary}
              </p>
            </article>
          ))}
        </section>
      </div>
    </main>
  );
}
