import { useEffect, useState } from "react";
import Icon from "../ui/Icon";

const navigation = [
  { label: "News", href: "#news", children: ["Chin News", "Myanmar News", "International News"] },
  { label: "Editorial", href: "#editorial" },
  { label: "Articles", href: "#articles", children: ["News Articles"] },
  { label: "Sports", href: "#sports" },
  { label: "Business", href: "#business" },
  { label: "Opinion", href: "#opinion" },
];

const toId = (label) => `#${label.toLowerCase().replaceAll(" ", "-")}`;

function DesktopNavigation() {
  return (
    <nav className="ml-auto hidden items-center gap-[clamp(18px,2vw,30px)] xl:flex" aria-label="Main navigation">
      <a className="relative py-2.5 text-[13px] font-semibold text-[#1d2a44] after:absolute after:right-0 after:bottom-[3px] after:left-0 after:h-0.5 after:bg-[#1d2a44]" href="#top">Home</a>
      {navigation.map((item) => item.children ? (
        <div className="group relative" key={item.label}>
          <button className="flex items-center gap-1.5 border-0 bg-transparent py-2.5 text-[13px] font-semibold text-[#667085] transition hover:text-[#1d2a44] group-focus-within:text-[#1d2a44]" type="button" aria-haspopup="true">
            {item.label}<span className="transition group-hover:rotate-180 group-focus-within:rotate-180 [&_svg]:size-3.5"><Icon name="chevron" /></span>
          </button>
          <div className="invisible absolute top-full left-1/2 z-50 w-56 -translate-x-1/2 translate-y-2 rounded-[16px] border border-[#e1e5ef] bg-white p-2 opacity-0 shadow-[0_18px_45px_rgba(29,42,68,.14)] transition duration-200 group-hover:visible group-hover:translate-y-0 group-hover:opacity-100 group-focus-within:visible group-focus-within:translate-y-0 group-focus-within:opacity-100">
            <a className="block rounded-xl px-4 py-3 text-xs font-bold text-[#1d2a44] hover:bg-[#f0f2f8]" href={item.href}>All {item.label}</a>
            {item.children.map((child) => <a className="block rounded-xl px-4 py-3 text-xs font-semibold text-[#667085] transition hover:bg-[#eef1fa] hover:text-[#4f6fd8]" key={child} href={toId(child)}>{child}</a>)}
          </div>
        </div>
      ) : <a className="py-2.5 text-[13px] font-semibold whitespace-nowrap text-[#667085] transition hover:text-[#1d2a44]" key={item.label} href={item.href}>{item.label}</a>)}
    </nav>
  );
}

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [expanded, setExpanded] = useState(null);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  const closeMenu = () => { setMenuOpen(false); setExpanded(null); };

  return (
    <header className="relative z-40 bg-[#f6f7fb] px-3 pt-[18px] md:px-6">
      <div className="mx-auto flex min-h-[70px] max-w-[1380px] items-center gap-3 rounded-[20px] border border-[#1d2a44]/[.08] bg-white/90 py-2 pr-3 pl-4 shadow-[0_12px_35px_rgba(29,42,68,.06)] backdrop-blur-[14px] lg:gap-7">
        <a className="flex shrink-0 items-center gap-[11px]" href="#top" aria-label="Chinlung Today home">
          <span className="grid size-11 place-items-center rounded-[14px_14px_14px_5px] bg-[#1d2a44] font-serif font-bold tracking-[-.05em] text-white">CT<span className="text-[#b9c7f5]">.</span></span>
          <span className="grid leading-[.9]"><strong className="font-serif text-xl">Chinlung</strong><small className="mt-[5px] text-[9px] font-bold tracking-[.23em] text-[#6b7280] uppercase">Today</small></span>
        </a>

        <DesktopNavigation />

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
            <div className="flex items-center justify-between border-b border-[#dfe3ee] pb-5">
              <a className="flex items-center gap-3" href="#top" onClick={closeMenu}><span className="grid size-11 place-items-center rounded-[14px_14px_14px_5px] bg-[#1d2a44] font-serif font-bold text-white">CT<span className="text-[#b9c7f5]">.</span></span><span className="font-serif text-xl font-bold">Chinlung Today</span></a>
              <button className="grid size-11 cursor-pointer place-items-center rounded-full border border-[#d8ddea] bg-white text-[#1d2a44]" type="button" aria-label="Close menu" onClick={closeMenu}><Icon name="close" /></button>
            </div>

            <form className="mt-7 flex rounded-[16px] border border-[#d8ddea] bg-white p-1.5 shadow-sm" onSubmit={(event) => event.preventDefault()}>
              <input className="min-w-0 flex-1 border-0 bg-transparent px-3 py-2.5 text-sm outline-none" aria-label="Search news" placeholder="Search stories, topics, people…" />
              <button className="grid size-11 place-items-center rounded-xl border-0 bg-[#1d2a44] text-white" type="submit" aria-label="Search"><Icon name="search" /></button>
            </form>

            <nav className="mt-6" aria-label="Mobile navigation">
              <a className="flex min-h-[56px] items-center border-b border-[#dfe3ee] text-[19px] font-semibold" href="#top" onClick={closeMenu}>Home</a>
              {navigation.map((item) => item.children ? (
                <div className="border-b border-[#dfe3ee]" key={item.label}>
                  <button className="flex min-h-[56px] w-full items-center justify-between border-0 bg-transparent text-left text-[19px] font-semibold" type="button" aria-expanded={expanded === item.label} onClick={() => setExpanded(expanded === item.label ? null : item.label)}>
                    {item.label}<span className={`grid place-items-center text-[#4f6fd8] transition duration-200 [&_svg]:size-[18px] [&_svg]:stroke-[2.4] ${expanded === item.label ? "rotate-180" : ""}`}><Icon name="chevron" /></span>
                  </button>
                  {expanded === item.label && <div className="mb-3 rounded-[14px] bg-white p-2">{item.children.map((child) => <a className="flex min-h-11 items-center rounded-[10px] px-3 text-sm font-semibold text-[#667085] hover:bg-[#eef1fa] hover:text-[#4f6fd8]" key={child} href={toId(child)} onClick={closeMenu}>{child}</a>)}</div>}
                </div>
              ) : <a className="flex min-h-[56px] items-center border-b border-[#dfe3ee] text-[19px] font-semibold" key={item.label} href={item.href} onClick={closeMenu}>{item.label}</a>)}
            </nav>

            <div className="mt-auto pt-10">
              <a className="flex items-center justify-between rounded-[16px] bg-[#1d2a44] px-5 py-4 text-sm font-bold text-white" href="#subscribe" onClick={closeMenu}>Join the 5-minute brief <Icon name="arrow" /></a>
              <div className="mt-6 flex flex-wrap gap-x-5 gap-y-2 border-t border-[#dfe3ee] pt-5 text-xs font-semibold text-[#6b7280]"><a href="#about">About</a><a href="#contact">Contact</a><a href="#privacy">Privacy</a><a href="#top">English</a></div>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
