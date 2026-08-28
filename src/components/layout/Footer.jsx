import { navigationItems } from "../../data/news";
import Icon from "../ui/Icon";

export default function Footer() {
  return (
    <footer className="bg-[#202938] px-3 pt-12 pb-6 text-white md:px-6 md:pt-16">
      <div className="mx-auto max-w-[1380px]">
        <div className="grid gap-12 border-b border-white/15 pb-14 lg:grid-cols-[1.1fr_.9fr] lg:items-end">
          <div>
            <a className="flex w-fit items-center gap-3" href="#top" aria-label="Chinlung Today home">
              <span className="grid size-12 place-items-center rounded-[15px_15px_15px_5px] bg-[#60758a] font-serif font-bold text-white">CT.</span>
              <span className="grid leading-none"><strong className="font-serif text-2xl">Chinlung Today</strong><small className="mt-2 text-[9px] font-bold tracking-[.2em] text-white/55 uppercase">News · Community · Culture</small></span>
            </a>
            <p className="mt-6 mb-0 max-w-[520px] font-serif text-[clamp(24px,2.5vw,34px)] leading-[1.14] text-white/95">Independent stories for a stronger, more connected community.</p>
          </div>

          <div className="lg:justify-self-end">
            <p className="mb-4 text-[10px] font-bold tracking-[.14em] text-[#bac6d1] uppercase">The 5-minute brief</p>
            <a className="flex max-w-[430px] items-center justify-between gap-8 rounded-[18px] bg-white px-5 py-4 text-sm font-bold text-[#202938] transition hover:bg-[#e8edf2]" href="#subscribe">Get thoughtful news in your inbox <Icon name="arrow" /></a>
          </div>
        </div>

        <div className="grid gap-8 py-9 md:grid-cols-[1fr_auto] md:items-center">
          <nav className="flex flex-wrap gap-x-6 gap-y-3" aria-label="Footer navigation">
            <a className="text-xs font-semibold text-white/65 transition hover:text-white" href="#top">Home</a>
            {navigationItems.map((item) => <a className="text-xs font-semibold text-white/65 transition hover:text-white" key={item} href={`#${item.toLowerCase()}`}>{item}</a>)}
          </nav>
          <div className="flex gap-5 text-xs font-semibold text-white/65"><a className="hover:text-white" href="#about">About</a><a className="hover:text-white" href="#contact">Contact</a><a className="hover:text-white" href="#privacy">Privacy</a></div>
        </div>

        <div className="flex flex-col gap-2 border-t border-white/10 pt-5 text-[10px] text-white/40 sm:flex-row sm:items-center sm:justify-between">
          <p className="m-0">© 2026 Chinlung Today. All rights reserved.</p>
          <p className="m-0">Made for the Chin community, everywhere.</p>
        </div>
      </div>
    </footer>
  );
}
