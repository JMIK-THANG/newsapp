import { navigationItems } from "../../data/news";
import Icon from "../ui/Icon";

export default function Footer() {
  return (
    <footer className="bg-[#202938] px-3 pt-10 pb-5 text-white md:px-6 md:pt-12">
      <div className="mx-auto max-w-[1380px]">
        <div className="grid gap-10 border-b border-white/15 pb-10 lg:grid-cols-[1.1fr_.9fr] lg:items-end">
          <div>
            <a className="flex w-fit items-center gap-3" href="#top" aria-label="Chinlung Today home">
              <span className="grid size-12 place-items-center rounded-[15px_15px_15px_5px] bg-[#60758a] text-base font-semibold text-white">CT.</span>
              <span className="grid leading-none"><strong className="text-xl font-semibold">Chinlung Today</strong><small className="mt-2 text-[9px] font-medium tracking-[.18em] text-white/55 uppercase">Local · National · Global</small></span>
            </a>
            <p className="mt-5 mb-0 max-w-[570px] text-[clamp(18px,1.8vw,24px)] leading-[1.4] font-normal text-white/85">Independent reporting and clear perspectives from our communities and around the world.</p>
          </div>

          <div className="lg:justify-self-end">
            <p className="mb-4 text-[10px] font-medium tracking-[.14em] text-[#bac6d1] uppercase">The 5-minute brief</p>
            <a className="flex max-w-[430px] items-center justify-between gap-8 rounded-[10px] bg-white px-5 py-3.5 text-sm font-medium text-[#202938] transition hover:bg-[#e8edf2]" href="#subscribe">Get thoughtful news in your inbox <Icon name="arrow" /></a>
          </div>
        </div>

        <div className="grid gap-7 py-7 md:grid-cols-[1fr_auto] md:items-center">
          <nav className="flex flex-wrap gap-x-6 gap-y-3" aria-label="Footer navigation">
            <a className="text-xs font-medium text-white/65 transition hover:text-white" href="#top">Home</a>
            {navigationItems.map((item) => <a className="text-xs font-medium text-white/65 transition hover:text-white" key={item} href={`#/${item.toLowerCase()}`}>{item}</a>)}
          </nav>
          <div className="flex gap-5 text-xs font-medium text-white/65"><a className="hover:text-white" href="#about">About</a><a className="hover:text-white" href="#contact">Contact</a><a className="hover:text-white" href="#privacy">Privacy</a></div>
        </div>

        <div className="flex flex-col gap-3 border-t border-white/10 pt-5 text-[11px] text-white/50 sm:flex-row sm:items-center sm:justify-between">
          <p className="m-0">© 2026 Chinlung Today. All rights reserved.</p>
          <p className="m-0">Designed and built by <a className="font-medium text-white underline decoration-white/35 underline-offset-4 transition hover:decoration-white" href="https://portfolio-website-sx94.onrender.com/" target="_blank" rel="noreferrer">JMIK Thang</a></p>
        </div>
      </div>
    </footer>
  );
}
