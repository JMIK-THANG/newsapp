import { leadStory, mostReadStories, quickReads } from "../../data/news";
import Icon from "../ui/Icon";

function SectionHeading({ eyebrow, title, href }) {
  return (
    <div className="flex items-end justify-between border-b border-[#dfe4de] pb-4">
      <div>
        <p className="mb-1.5 text-[9px] font-bold tracking-[.14em] text-[#d95e35] uppercase">{eyebrow}</p>
        <h2 className="m-0 font-serif text-[26px] leading-none">{title}</h2>
      </div>
      <a className="grid size-9 place-items-center rounded-full border border-[#dce1da] text-[#173b2d] transition hover:bg-[#173b2d] hover:text-white" href={href} aria-label={`View ${title}`}><Icon name="arrow" /></a>
    </div>
  );
}

export default function HeroSection() {
  return (
    <main id="top" className="px-3 pt-5 pb-12 md:px-6">
      <section className="mx-auto max-w-[1440px]" aria-labelledby="lead-title">
        <div className="flex min-h-[52px] items-center justify-between px-1 text-[11px] font-semibold tracking-[.03em] text-[#68736d]">
          <p className="flex items-center gap-2"><span className="size-[7px] rounded-full bg-[#d95e35] shadow-[0_0_0_5px_rgba(217,94,53,.12)]" /> Wednesday, August 26 <span>•</span> Morning edition</p>
          <p className="hidden tracking-[.13em] uppercase md:block">Independent reporting. Clear perspectives.</p>
        </div>

        <div className="grid overflow-hidden rounded-[28px] border border-[#e3e6e1] bg-white xl:grid-cols-[1.16fr_.84fr_.72fr]">
          <article className="group border-b border-[#e3e6e1] p-3 md:p-5 xl:border-r xl:border-b-0">
            <div className="mb-5 flex items-center justify-between px-1 pt-1">
              <div><p className="mb-1 text-[9px] font-bold tracking-[.14em] text-[#d95e35] uppercase">Front page</p><h2 className="m-0 font-serif text-[26px] leading-none">Top Story</h2></div>
              <span className="rounded-full bg-[#e9ff70] px-3 py-1.5 text-[9px] font-bold tracking-[.1em] text-[#173b2d] uppercase">{leadStory.category}</span>
            </div>

            <a className="relative block aspect-[16/10] overflow-hidden rounded-[20px] bg-[#e7eae5]" href="#lead-story">
              <img className="h-full w-full object-cover transition duration-700 group-hover:scale-[1.025]" src={leadStory.image} alt={leadStory.imageAlt} />
              <span className="absolute right-4 bottom-4 grid size-11 place-items-center rounded-full bg-white text-[#173b2d] shadow-lg transition group-hover:bg-[#173b2d] group-hover:text-white"><Icon name="arrow" /></span>
            </a>

            <div className="px-1 pt-6 pb-2">
              <p className="mb-3 text-[10px] font-bold tracking-[.1em] text-[#8a948e] uppercase">{leadStory.date} · {leadStory.readTime}</p>
              <h1 id="lead-title" className="m-0 max-w-[760px] font-serif text-[clamp(34px,3.4vw,52px)] leading-[1.04] tracking-[-.035em]"><a className="transition hover:text-[#d95e35]" href="#lead-story">A changing world demands a new kind of global leadership.</a></h1>
              <p className="mb-0 max-w-[690px] pt-4 text-sm leading-6 text-[#68736d]">Governments, businesses, and communities are navigating a period of rapid change—and redefining what progress looks like.</p>
              <div className="mt-6 flex items-center justify-between border-t border-[#e7eae5] pt-5">
                <p className="m-0 text-[11px] font-semibold text-[#7b8580]">By <span className="text-[#17211c]">{leadStory.author}</span></p>
                <a className="flex items-center gap-2 text-xs font-bold text-[#173b2d]" href="#lead-story">Read full story <Icon name="arrow" /></a>
              </div>
            </div>
          </article>

          <section className="border-b border-[#e3e6e1] p-6 md:p-8 xl:border-r xl:border-b-0" aria-labelledby="latest-news-title">
            <SectionHeading eyebrow="Live desk" title="Latest News" href="#latest" />
            <div className="divide-y divide-[#e3e6e1]">
              {quickReads.map((story, index) => (
                <article className="py-7" key={story.title}>
                  <div className="mb-3 flex items-center gap-3"><span className="font-serif text-xs text-[#a0a8a3]">0{index + 1}</span><span className="rounded-full bg-[#eef1ec] px-2.5 py-1 text-[8px] font-bold tracking-[.1em] text-[#68736d] uppercase">{story.category}</span><span className="text-[9px] font-semibold text-[#9aa29e]">{story.time}</span></div>
                  <h3 className="m-0 font-serif text-[clamp(23px,2.1vw,31px)] leading-[1.12] tracking-[-.02em]"><a className="transition hover:text-[#d95e35]" href={`#latest-news-${index + 1}`}>{story.title}</a></h3>
                  <p className="mt-4 mb-0 text-xs leading-5 text-[#7a847f]">The essential details and context behind one of today’s developing stories.</p>
                </article>
              ))}
            </div>
            <a className="mt-2 flex items-center justify-center gap-2 rounded-[13px] bg-[#f0f2ed] px-4 py-3 text-[11px] font-bold text-[#173b2d] transition hover:bg-[#e9ff70]" href="#latest">See all latest news <Icon name="arrow" /></a>
          </section>

          <aside className="p-6 md:p-8" aria-labelledby="most-read-title">
            <SectionHeading eyebrow="Trending now" title="Most Read" href="#popular" />
            <div className="divide-y divide-[#e3e6e1]">
              {mostReadStories.map((story, index) => (
                <article className="group py-6" key={story.title}>
                  <a className="mb-4 block aspect-[16/8] overflow-hidden rounded-[14px] bg-[#e7eae5]" href={`#most-read-${index + 1}`} tabIndex="-1"><img className="h-full w-full object-cover transition duration-500 group-hover:scale-105" src={story.image} alt={story.imageAlt} /></a>
                  <p className="mb-2 text-[8px] font-bold tracking-[.11em] text-[#d95e35] uppercase">{story.category} <span className="text-[#9aa29e]">· {story.time}</span></p>
                  <h3 className="m-0 font-serif text-[19px] leading-[1.2]"><a className="transition hover:text-[#d95e35]" href={`#most-read-${index + 1}`}>{story.title}</a></h3>
                </article>
              ))}
            </div>
          </aside>
        </div>
      </section>
    </main>
  );
}
