import Icon from "../ui/Icon";
import { Link } from "react-router-dom";

export default function NewsSectionLayout({ eyebrow, title, description, stories, isLoading = false, error = "", getStoryPath }) {
  const [feature, ...rest] = stories;
  const storyPath = (story, index, featured = false) => getStoryPath
    ? getStoryPath(story, index)
    : `/${title.toLowerCase()}/${featured ? "featured" : `story-${index + 1}`}`;

  return (
    <main className="bg-white px-3 py-10 md:px-6 md:py-14">
      <div className="mx-auto max-w-[1480px]">
        <header className="border-b border-[#dcdde0] pb-7">
          <p className="mb-2 inline-flex items-center gap-2 text-[12px] font-bold tracking-[.04em] text-[#397d73] uppercase after:h-px after:w-9 after:bg-[#397d73]">{eyebrow}</p>
          <h1 className="m-0 font-serif text-[clamp(38px,5vw,64px)] leading-none tracking-[-.04em] text-[#111318]">{title}</h1>
          <p className="mt-4 mb-0 max-w-2xl text-sm leading-6 text-[#4f5359]">{description}</p>
        </header>

        {isLoading && <div className="border-b border-[#dcdde0] py-16 text-center text-[#5f6368]">Loading {title.toLowerCase()} stories…</div>}
        {!isLoading && error && <div className="border-b border-[#dcdde0] py-16 text-center text-[#8f2427]">{error}</div>}
        {!isLoading && !error && !feature && <div className="border-b border-[#dcdde0] py-16 text-center"><h2 className="m-0 font-serif text-2xl text-[#111318]">No {title.toLowerCase()} stories yet</h2><p className="mt-3 mb-0 text-sm text-[#5f6368]">Published stories in the {title} category will appear here.</p></div>}

        {!isLoading && !error && feature && <>
        <section className="grid gap-8 border-b border-[#dcdde0] py-8 lg:grid-cols-[1.25fr_.75fr]" aria-label={`Featured ${title}`}>
          <Link className="group block aspect-[16/9] overflow-hidden bg-[#e8edf2]" to={storyPath(feature, 0, true)}><img className="h-full w-full object-contain transition duration-700 group-hover:scale-[1.015]" src={feature.image} alt={feature.imageAlt} /></Link>
          <div className="flex flex-col justify-center">
            <p className="mb-3 text-[13px] font-semibold text-[#397d73] uppercase">{feature.category}</p>
            <h2 className="m-0 line-clamp-2 font-serif text-[clamp(28px,3vw,42px)] leading-[1.08] font-semibold tracking-[-.035em] text-[#111318]" title={feature.title}>{feature.title}</h2>
            <p className="mt-2 mb-0 text-[14px] font-normal text-[#69717a]">{feature.date}</p>
            <p className="home-story-summary my-4">{feature.summary}</p>
            <Link className="flex w-fit items-center gap-2 text-sm font-semibold text-[#111318]" to={storyPath(feature, 0, true)}>Read story <Icon name="arrow" /></Link>
          </div>
        </section>

        <section className="grid gap-x-7 gap-y-0 sm:grid-cols-2 lg:grid-cols-3" aria-label={`Latest ${title}`}>
          {rest.map((story, index) => (
            <article className="group grid grid-cols-[116px_minmax(0,1fr)] gap-4 border-b border-[#dcdde0] py-5 sm:block sm:py-7" key={story.title}>
              <Link className="block aspect-[4/3] overflow-hidden bg-[#e8edf2] sm:mb-4 sm:aspect-[16/9]" to={storyPath(story, index + 1)}><img className="h-full w-full object-cover transition duration-500 group-hover:scale-[1.015]" src={story.image} alt={story.imageAlt} /></Link>
              <div className="min-w-0">
                <p className="mb-1.5 text-[12px] font-semibold text-[#397d73] uppercase sm:mb-2 sm:text-[13px]">{story.category}</p>
                <h2 className="article-display-font m-0 line-clamp-3 text-[20px] leading-[1.16] font-semibold tracking-[-.01em] text-[#111318] md:text-[21px]" title={story.title}><Link className="transition hover:opacity-60" to={storyPath(story, index + 1)}>{story.title}</Link></h2>
                <p className="mt-2 mb-0 text-[14px] font-normal text-[#69717a]">{story.date}</p>
                <p className="home-story-summary mt-3 mb-0 hidden sm:block">{story.summary}</p>
              </div>
            </article>
          ))}
        </section>
        </>}
      </div>
    </main>
  );
}
