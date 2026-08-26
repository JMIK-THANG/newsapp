import { leadStory, mostReadStories, quickReads } from "../../data/news";
import Icon from "../ui/Icon";

function SectionHeading({ eyebrow, title, href }) {
  return (
    <div className="flex items-end justify-between border-b border-[#dfe4de] pb-4">
      <div>
        <p className="mb-1.5 text-[9px] font-bold tracking-[.14em] text-[#738078] uppercase">{eyebrow}</p>
        <h2 className="m-0 text-xl font-bold tracking-[-.025em]">{title}</h2>
      </div>
      <a className="grid size-9 place-items-center rounded-full border border-[#dce2f2] text-[#1d2a44] transition hover:bg-[#1d2a44] hover:text-white" href={href} aria-label={`View ${title}`}><Icon name="arrow" /></a>
    </div>
  );
}

export default function HeroSection() {
  return (
    <main id="top" className="px-3 pt-3 pb-10 md:px-6">
      <section className="mx-auto max-w-[1380px]" aria-labelledby="lead-title">
        <div className="flex min-h-[44px] items-center justify-between px-1 text-[10px] font-semibold tracking-[.03em] text-[#68736d]">
          <p className="flex items-center gap-2"><span className="size-[7px] rounded-full bg-[#4f6fd8] shadow-[0_0_0_5px_rgba(79,111,216,.12)]" /> Wednesday, August 26 <span>•</span> Morning edition</p>
          <p className="hidden tracking-[.13em] uppercase md:block">Independent reporting. Clear perspectives.</p>
        </div>

        <div className="grid overflow-hidden rounded-[26px] border border-[#e3e6e1] bg-white lg:grid-cols-[1.16fr_.84fr_.72fr]">
          <article className="group border-b border-[#e3e6e1] p-3 md:p-4 lg:border-r lg:border-b-0">
            <div className="mb-4 flex items-center justify-between px-1 pt-1">
              <div><p className="mb-1 text-[9px] font-bold tracking-[.14em] text-[#738078] uppercase">Front page</p><h2 className="m-0 text-xl font-bold tracking-[-.025em]">Top Story</h2></div>
              <span className="rounded-full bg-[#e4e9fa] px-3 py-1.5 text-[9px] font-bold tracking-[.1em] text-[#1d2a44] uppercase">{leadStory.category}</span>
            </div>

            <a className="relative block aspect-[16/7.2] overflow-hidden rounded-[18px] bg-[#e7eae5]" href="#lead-story">
              <img className="h-full w-full object-cover transition duration-700 group-hover:scale-[1.025]" src={leadStory.image} alt={leadStory.imageAlt} />
              <span className="absolute right-4 bottom-4 grid size-11 place-items-center rounded-full bg-white text-[#1d2a44] shadow-lg transition group-hover:bg-[#1d2a44] group-hover:text-white"><Icon name="arrow" /></span>
            </a>

            <div className="px-1 pt-4 pb-1">
              <p className="mb-2.5 text-[9px] font-bold tracking-[.1em] text-[#8a948e] uppercase">{leadStory.date} · {leadStory.readTime}</p>
              <h1 id="lead-title" className="m-0 max-w-[760px] font-serif text-[clamp(29px,2.6vw,39px)] leading-[1.03] tracking-[-.035em]"><a className="transition hover:text-[#4f6fd8]" href="#lead-story">A changing world demands a new kind of global leadership.</a></h1>
              <p className="mb-0 max-w-[690px] pt-2.5 text-xs leading-[1.55] text-[#68736d]">Governments and communities are navigating rapid change—and redefining progress.</p>
              <div className="mt-3 flex items-center justify-between border-t border-[#e7eae5] pt-3">
                <p className="m-0 text-[11px] font-semibold text-[#7b8580]">By <span className="text-[#17211c]">{leadStory.author}</span></p>
                <a className="flex items-center gap-2 text-xs font-bold text-[#1d2a44]" href="#lead-story">Read full story <Icon name="arrow" /></a>
              </div>
            </div>
          </article>

          <section className="border-b border-[#e3e6e1] p-5 md:p-6 lg:border-r lg:border-b-0" aria-labelledby="latest-news-title">
            <SectionHeading eyebrow="Live desk" title="Latest News" href="#latest" />
            <div className="divide-y divide-[#e3e6e1]">
              {quickReads.map((story, index) => (
                <article className="py-[18px]" key={story.title}>
                  <div className="mb-3 flex items-center gap-3"><span className="text-[10px] font-bold text-[#a0a8a3]">0{index + 1}</span><span className="rounded-full bg-[#eef1ec] px-2.5 py-1 text-[8px] font-bold tracking-[.1em] text-[#526159] uppercase">{story.category}</span><span className="text-[9px] font-semibold text-[#9aa29e]">{story.time}</span></div>
                  <h3 className="m-0 text-[clamp(16px,1.35vw,20px)] leading-[1.32] font-semibold tracking-[-.015em]"><a className="transition hover:text-[#4f6fd8]" href={`#latest-news-${index + 1}`}>{story.title}</a></h3>
                </article>
              ))}
            </div>
            <a className="mt-2 flex items-center justify-center gap-2 rounded-[13px] bg-[#f0f2f7] px-4 py-3 text-[11px] font-bold text-[#1d2a44] transition hover:bg-[#e4e9fa]" href="#latest">See all latest news <Icon name="arrow" /></a>
          </section>

          <aside className="p-5 md:p-6" aria-labelledby="most-read-title">
            <SectionHeading eyebrow="Trending now" title="Most Read" href="#popular" />
            <div className="mt-1 divide-y divide-[#e3e6e1]">
              {mostReadStories.map((story, index) => (
                <article className="group grid grid-cols-[1fr_104px] gap-4 py-[18px]" key={story.title}>
                  <div className="flex flex-col justify-center">
                    <p className="mb-2 text-[8px] font-bold tracking-[.11em] text-[#667085] uppercase">{story.category} <span className="text-[#9aa3b2]">· {story.time}</span></p>
                    <h3 className="m-0 text-sm leading-[1.32] font-semibold tracking-[-.01em]"><a className="transition hover:text-[#4f6fd8]" href={`#most-read-${index + 1}`}>{story.title}</a></h3>
                  </div>
                  <a className="aspect-[4/3] overflow-hidden rounded-[12px] bg-[#e7eae5]" href={`#most-read-${index + 1}`} tabIndex="-1"><img className="h-full w-full object-cover transition duration-500 group-hover:scale-105" src={story.image} alt={story.imageAlt} /></a>
                </article>
              ))}
            </div>
          </aside>
        </div>
      </section>
    </main>
  );
}
