import { useState } from "react";
import { navigationItems } from "../../data/news";
import Icon from "../ui/Icon";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  return (
    <header className="relative z-10 bg-[#f4f1e9] px-3 pt-[18px] md:px-6">
      <div className="mx-auto flex min-h-[76px] max-w-[1440px] items-center gap-3 rounded-[22px] border border-[#193127]/[.08] bg-white/85 py-2.5 pr-3 pl-5 shadow-[0_12px_35px_rgba(47,56,41,.06)] backdrop-blur-[14px] lg:gap-8">
        <a className="flex shrink-0 items-center gap-[11px]" href="#top" aria-label="Chinlung Today home">
          <span className="grid size-[46px] place-items-center rounded-[15px_15px_15px_5px] bg-[#173b2d] font-serif font-bold tracking-[-.05em] text-white">CT<span className="text-[#e9ff70]">.</span></span>
          <span className="grid leading-[.9]"><strong className="font-serif text-xl">Chinlung</strong><small className="mt-[5px] text-[10px] font-bold tracking-[.23em] text-[#738078] uppercase">Today</small></span>
        </a>

        <nav className={`${menuOpen ? "flex" : "hidden"} absolute top-[104px] right-3 left-3 flex-wrap items-center justify-start gap-5 rounded-[18px] bg-white p-[22px] shadow-[0_20px_50px_rgba(23,59,45,.13)] xl:static xl:ml-auto xl:flex xl:bg-transparent xl:p-0 xl:shadow-none`} aria-label="Main navigation">
          <a className="relative py-2.5 text-[13px] font-semibold text-[#173b2d] after:absolute after:right-0 after:bottom-[3px] after:left-0 after:h-0.5 after:rounded-sm after:bg-[#173b2d]" href="#top">Home</a>
          {navigationItems.map((item) => <a className="py-2.5 text-[13px] font-semibold whitespace-nowrap text-[#5f6964] transition hover:text-[#173b2d]" key={item} href={`#${item.toLowerCase()}`}>{item}</a>)}
          <a className="py-2.5 text-[13px] font-semibold text-[#5f6964] transition hover:text-[#173b2d]" href="#opinion">Opinion</a>
        </nav>

        <div className="ml-auto flex items-center gap-2">
          <button className="grid size-[46px] cursor-pointer place-items-center rounded-full border-0 bg-[#f0f2ed] text-[#173b2d]" type="button" aria-label="Open search" onClick={() => setSearchOpen(!searchOpen)}><Icon name={searchOpen ? "close" : "search"} /></button>
          <a className="hidden h-12 items-center gap-3 rounded-[15px] bg-[#173b2d] px-5 text-[13px] font-bold text-white transition hover:-translate-y-0.5 hover:bg-[#225640] md:flex" href="#subscribe">Join the brief <Icon name="arrow" /></a>
          <button className="grid size-[46px] cursor-pointer place-items-center rounded-full border-0 bg-[#f0f2ed] text-[#173b2d] xl:hidden" type="button" aria-label="Toggle menu" aria-expanded={menuOpen} onClick={() => setMenuOpen(!menuOpen)}><Icon name={menuOpen ? "close" : "menu"} /></button>
        </div>
      </div>

      {searchOpen && <form className="mx-auto mt-2.5 max-w-[720px] rounded-[18px] border border-[#dfe3db] bg-white p-[18px] shadow-[0_15px_40px_rgba(23,59,45,.1)]" onSubmit={(event) => event.preventDefault()}><label className="mb-2 block text-[11px] font-bold tracking-[.12em] uppercase" htmlFor="site-search">Search Chinlung Today</label><div className="flex gap-2"><input className="w-full rounded-[10px] border border-[#d8ddd5] px-[15px] py-3 outline-none focus:border-[#173b2d]" id="site-search" autoFocus placeholder="Stories, people, places…"/><button className="cursor-pointer rounded-[10px] border-0 bg-[#173b2d] px-[18px] font-bold text-white" type="submit">Search</button></div></form>}
    </header>
  );
}
