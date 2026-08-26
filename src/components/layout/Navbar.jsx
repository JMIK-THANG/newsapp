import { useEffect, useState } from "react";
import { navigationItems } from "../../data/news";
import Icon from "../ui/Icon";

const mobileSections = ["World", "Politics", "Business", "Technology", "Science", "Sports", "Culture", "Opinion"];

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  return (
    <header className="relative z-40 bg-[#f6f7fb] px-3 pt-[18px] md:px-6">
      <div className="mx-auto flex min-h-[70px] max-w-[1380px] items-center gap-3 rounded-[20px] border border-[#1d2a44]/[.08] bg-white/90 py-2 pr-3 pl-4 shadow-[0_12px_35px_rgba(29,42,68,.06)] backdrop-blur-[14px] lg:gap-7">
        <a className="flex shrink-0 items-center gap-[11px]" href="#top" aria-label="Chinlung Today home">
          <span className="grid size-11 place-items-center rounded-[14px_14px_14px_5px] bg-[#1d2a44] font-serif font-bold tracking-[-.05em] text-white">CT<span className="text-[#b9c7f5]">.</span></span>
          <span className="grid leading-[.9]"><strong className="font-serif text-xl">Chinlung</strong><small className="mt-[5px] text-[9px] font-bold tracking-[.23em] text-[#738078] uppercase">Today</small></span>
        </a>

        <nav className="ml-auto hidden items-center gap-[clamp(14px,1.7vw,28px)] xl:flex" aria-label="Main navigation">
          <a className="relative py-2.5 text-[13px] font-semibold text-[#1d2a44] after:absolute after:right-0 after:bottom-[3px] after:left-0 after:h-0.5 after:bg-[#1d2a44]" href="#top">Home</a>
          {navigationItems.map((item) => <a className="py-2.5 text-[13px] font-semibold whitespace-nowrap text-[#667085] transition hover:text-[#1d2a44]" key={item} href={`#${item.toLowerCase()}`}>{item}</a>)}
          <a className="py-2.5 text-[13px] font-semibold text-[#667085] hover:text-[#1d2a44]" href="#opinion">Opinion</a>
        </nav>

        <div className="ml-auto flex items-center gap-2 xl:ml-2">
          <button className="hidden size-11 cursor-pointer place-items-center rounded-full border-0 bg-[#f0f2f7] text-[#1d2a44] sm:grid" type="button" aria-label="Open search" onClick={() => setSearchOpen(!searchOpen)}><Icon name={searchOpen ? "close" : "search"} /></button>
          <a className="hidden h-11 items-center gap-3 rounded-[14px] bg-[#1d2a44] px-[18px] text-xs font-bold text-white transition hover:-translate-y-0.5 hover:bg-[#2d3f66] md:flex" href="#subscribe">Join the brief <Icon name="arrow" /></a>
          <button className="grid size-11 cursor-pointer place-items-center rounded-full border-0 bg-[#1d2a44] text-white xl:hidden" type="button" aria-label="Open menu" aria-expanded={menuOpen} onClick={() => setMenuOpen(true)}><Icon name="menu" /></button>
        </div>
      </div>

      {searchOpen && <form className="mx-auto mt-2.5 max-w-[720px] rounded-[18px] border border-[#dfe3ee] bg-white p-[18px] shadow-[0_15px_40px_rgba(29,42,68,.1)]" onSubmit={(event) => event.preventDefault()}><label className="mb-2 block text-[11px] font-bold tracking-[.12em] uppercase" htmlFor="site-search">Search Chinlung Today</label><div className="flex gap-2"><input className="w-full rounded-[10px] border border-[#d8ddea] px-[15px] py-3 outline-none focus:border-[#4f6fd8]" id="site-search" autoFocus placeholder="Stories, people, places…"/><button className="rounded-[10px] border-0 bg-[#1d2a44] px-[18px] font-bold text-white" type="submit">Search</button></div></form>}

      {menuOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-[#f6f7fb] text-[#182033] xl:hidden" role="dialog" aria-modal="true" aria-label="Mobile navigation">
          <div className="mx-auto flex min-h-full max-w-2xl flex-col px-5 py-5 sm:px-8">
            <div className="flex items-center justify-between border-b border-[#d9ded7] pb-5">
              <a className="flex items-center gap-3" href="#top" onClick={() => setMenuOpen(false)}><span className="grid size-11 place-items-center rounded-[14px_14px_14px_5px] bg-[#1d2a44] font-serif font-bold text-white">CT<span className="text-[#b9c7f5]">.</span></span><span className="font-serif text-xl font-bold">Chinlung Today</span></a>
              <button className="grid size-11 cursor-pointer place-items-center rounded-full border border-[#d8ddea] bg-white text-[#1d2a44]" type="button" aria-label="Close menu" onClick={() => setMenuOpen(false)}><Icon name="close" /></button>
            </div>

            <form className="mt-7 flex rounded-[16px] border border-[#d5dbd4] bg-white p-1.5 shadow-sm" onSubmit={(event) => event.preventDefault()}>
              <input className="min-w-0 flex-1 border-0 bg-transparent px-3 py-2.5 text-sm outline-none" aria-label="Search news" placeholder="Search stories, topics, people…" />
              <button className="grid size-11 place-items-center rounded-xl border-0 bg-[#1d2a44] text-white" type="submit" aria-label="Search"><Icon name="search" /></button>
            </form>

            <nav className="mt-6" aria-label="Mobile navigation">
              {mobileSections.map((item) => <a className="group flex min-h-[56px] items-center justify-between border-b border-[#dfe3ee] text-[19px] font-semibold transition hover:text-[#4f6fd8]" key={item} href={`#${item.toLowerCase()}`} onClick={() => setMenuOpen(false)}><span>{item}</span><span className="grid size-8 place-items-center rounded-full bg-white text-[#1d2a44] transition group-hover:bg-[#e4e9fa]"><Icon name="arrow" /></span></a>)}
            </nav>

            <div className="mt-auto pt-10">
              <a className="flex items-center justify-between rounded-[16px] bg-[#1d2a44] px-5 py-4 text-sm font-bold text-white" href="#subscribe" onClick={() => setMenuOpen(false)}>Join the 5-minute brief <Icon name="arrow" /></a>
              <div className="mt-6 flex flex-wrap gap-x-5 gap-y-2 border-t border-[#d9ded7] pt-5 text-xs font-semibold text-[#6e7872]"><a href="#about">About</a><a href="#contact">Contact</a><a href="#privacy">Privacy</a><a href="#top">English</a></div>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
