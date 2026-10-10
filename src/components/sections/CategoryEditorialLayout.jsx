import { Link } from "react-router-dom";
import NewsListCard from "../news/NewsListCard";
import StoryLoading from "../news/StoryLoading";
import Icon from "../ui/Icon";
import { shortStoryPath } from "../../utils/storyPath";

export default function CategoryEditorialLayout({ title, stories, isLoading, error }) {
  const [lead, ...rest] = stories;
  return <main className="bg-white px-5 py-5 sm:px-6 sm:py-8 lg:py-9">
    <div className="mx-auto max-w-[1280px]">
      <header className="border-b border-[#dcdde0] pb-4 md:pb-6">
        <h1 className="article-display-font m-0 text-[clamp(34px,5.5vw,54px)] leading-[1] font-semibold tracking-[-.035em] text-[#182536]">{title}</h1>
      </header>
      {isLoading ? <StoryLoading /> : error ? <p className="py-10 text-sm text-[#9b1c1f]" role="alert">{error}</p> : <>
        {lead && <article className="grid gap-6 border-b border-[#dcdde0] py-6 sm:py-8 lg:grid-cols-[minmax(0,1.35fr)_minmax(320px,.65fr)] lg:items-center lg:gap-10">
          <Link className="group block aspect-[16/9] overflow-hidden rounded-[6px] bg-[#e8edf2]" to={shortStoryPath(lead)}><img className="h-full w-full object-cover transition duration-700 group-hover:scale-[1.015]" src={lead.image} alt={lead.imageAlt || lead.title} /></Link>
          <div className="flex min-w-0 flex-col justify-center">
            <h2 className="story-headline article-display-font mt-3 mb-0 line-clamp-3 text-[clamp(26px,2.7vw,36px)] leading-[1.12] tracking-[-.015em] text-[#182536]" title={lead.title}><Link className="transition hover:text-[#397d73]" to={shortStoryPath(lead)}>{lead.title}</Link></h2>
            <p className="mt-3 mb-0 text-[16px] leading-7 tracking-[.01em] text-[#3f474f]">{lead.summary}</p>
            <p className="mt-3 mb-0 text-[14px] text-[#69717a]">{lead.date}{lead.author ? <> · By <strong className="font-semibold text-[#303940]">{lead.author}</strong></> : null}</p>
            <Link className="mt-5 inline-flex w-fit items-center gap-2 text-[13px] font-bold text-[#182536] transition hover:text-[#397d73]" to={shortStoryPath(lead)}>Read story <Icon name="arrow" /></Link>
          </div>
        </article>}
        <section className="divide-y divide-[#dcdde0] border-b border-[#dcdde0] pt-3 sm:pt-5" aria-label={`More ${title} stories`}>
          {rest.map(story => <NewsListCard story={story} path={shortStoryPath(story)} showCategory={false} key={story.id || story.title} />)}
          {!lead && <p className="py-12 text-center text-sm text-[#69717a]">Published {title.toLowerCase()} stories will appear here.</p>}
        </section>
      </>}
    </div>
  </main>;
}
