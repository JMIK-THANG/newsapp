import { leadStory, quickReads } from "../../data/news";
import Icon from "../ui/Icon";

export default function HeroSection() {
  return (
    <main id="top" className="px-3 pt-5 pb-[42px] md:px-6">
      <section className="mx-auto max-w-[1440px]" aria-labelledby="lead-title">
        <div className="flex min-h-[52px] items-center justify-between px-[5px] text-[11px] font-semibold tracking-[.03em] text-[#68736d]">
          <p className="flex items-center gap-2"><span className="size-[7px] rounded-full bg-[#d95e35] shadow-[0_0_0_5px_rgba(217,94,53,.12)]" /> Tuesday, August 25 <span>•</span> Morning edition</p>
          <p className="hidden items-center gap-2 tracking-[.13em] uppercase md:flex">Independent stories. A stronger community.</p>
        </div>

        <div className="grid gap-3.5 xl:grid-cols-[minmax(0,1.78fr)_minmax(340px,.72fr)]">
          <article className="grid min-h-[610px] overflow-hidden rounded-[28px] bg-white md:grid-cols-[minmax(330px,.88fr)_minmax(420px,1.12fr)]">
            <div className="group relative m-2.5 min-h-[390px] overflow-hidden rounded-[21px] after:absolute after:inset-0 after:bg-gradient-to-b after:from-transparent after:from-55% after:to-[rgba(9,29,20,.55)] md:min-h-[450px]">
              <img className="h-full w-full object-cover saturate-[.82] contrast-[.96] transition duration-700 group-hover:scale-[1.025]" src={leadStory.image} alt={leadStory.imageAlt} />
              <span className="absolute bottom-5 left-5 z-[1] text-[10px] font-bold tracking-[.12em] text-white uppercase">01 / 04</span>
              <span className="absolute right-5 bottom-5 z-[1] text-[10px] font-bold tracking-[.12em] text-white uppercase">Community in focus</span>
            </div>

            <div className="flex flex-col px-[22px] pt-7 pb-[30px] md:px-[clamp(32px,4.5vw,70px)] md:pt-[clamp(35px,5vw,76px)] md:pb-[42px]">
              <div className="flex items-center gap-[13px] text-[11px] font-semibold tracking-[.1em] text-[#7c867f] uppercase"><span className="rounded-full bg-[#e9ff70] px-[11px] py-[7px] font-bold text-[#173b2d]">{leadStory.category}</span><span>{leadStory.readTime}</span></div>
              <h1 className="my-6 max-w-[690px] font-serif text-[clamp(39px,10vw,54px)] leading-[1.02] tracking-[-.045em] md:my-[32px_22px] xl:text-[clamp(42px,4.3vw,70px)]" id="lead-title">{leadStory.title}</h1>
              <p className="m-0 max-w-[600px] text-[15px] leading-[1.7] text-[#68736d]">{leadStory.summary}</p>
              <div className="mt-[30px] flex items-center justify-between gap-5 border-t border-[#e9ece7] pt-[34px] md:mt-auto">
                <div className="flex items-center gap-[11px]"><span className="grid size-[39px] place-items-center rounded-full bg-[#d95e35] text-[10px] font-bold text-white">{leadStory.initials}</span><span className="grid gap-[3px]"><strong className="text-xs">By {leadStory.author}</strong><small className="text-[10px] text-[#8b948f]">{leadStory.date}</small></span></div>
                <a className="group flex items-center gap-2.5 text-[13px] font-bold text-[#173b2d]" href="#lead-story"><span className="hidden sm:inline">Read the story</span><span className="grid size-[42px] place-items-center rounded-full bg-[#e9ff70] sm:size-auto sm:bg-transparent"><Icon name="arrow" /></span></a>
              </div>
            </div>
          </article>

          <aside className="flex flex-col overflow-hidden rounded-[28px] bg-white p-[22px] md:p-7 lg:grid lg:grid-cols-2 lg:gap-x-[30px] xl:flex" aria-labelledby="quick-title">
            <div className="flex items-end justify-between border-b border-[#e7eae5] pb-[22px] lg:col-span-2"><div><span className="text-[10px] font-bold tracking-[.14em] text-[#d95e35] uppercase">Today’s edit</span><h2 className="mt-1.5 mb-0 font-serif text-[26px]" id="quick-title">Worth your time</h2></div><a className="border-b pb-[3px] text-[11px] font-bold" href="#latest">View all</a></div>
            <div className="mb-[22px]">
              {quickReads.map((story, index) => <article className="grid grid-cols-[30px_1fr_34px] items-center gap-2.5 border-b border-[#e7eae5] py-[22px]" key={story.title}><span className="self-start font-serif text-sm text-[#a5ada8]">0{index + 2}</span><div><p className="mb-[7px] text-[9px] font-bold tracking-[.1em] text-[#d95e35] uppercase">{story.category} <span className="text-[#a0a8a3]">• {story.time}</span></p><h3 className="m-0 font-serif text-[17px] leading-[1.32]"><a className="hover:text-[#d95e35]" href={`#story-${index + 2}`}>{story.title}</a></h3></div><a className="grid size-8 place-items-center rounded-full border border-[#dfe4de] transition hover:border-[#173b2d] hover:bg-[#173b2d] hover:text-white [&_svg]:w-3.5" href={`#story-${index + 2}`} aria-label={`Read ${story.title}`}><Icon name="arrow" /></a></article>)}
            </div>
            <div className="mt-auto rounded-[20px] bg-[#173b2d] p-6 text-white" id="subscribe"><span className="text-[9px] font-bold tracking-[.14em] text-[#e9ff70]">THE 5-MINUTE BRIEF</span><h3 className="my-[10px_6px] font-serif text-[22px]">News that brings home closer.</h3><p className="mt-0 mb-[18px] text-[11px] text-[#afc0b8]">A thoughtful roundup, delivered every weekday.</p><form className="flex rounded-xl bg-white p-1" onSubmit={(event) => event.preventDefault()}><input className="min-w-0 flex-1 border-0 px-2.5 py-[9px] text-[11px] text-[#17211c] outline-none" type="email" aria-label="Email address" placeholder="Your email address"/><button className="grid size-[38px] shrink-0 cursor-pointer place-items-center rounded-[9px] border-0 bg-[#e9ff70] text-[#173b2d] [&_svg]:w-[15px]" type="submit" aria-label="Subscribe"><Icon name="arrow" /></button></form></div>
          </aside>
        </div>
      </section>
    </main>
  );
}
