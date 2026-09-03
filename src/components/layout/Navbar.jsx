import { useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import Icon from "../ui/Icon";

const navigation = [
  { label: "News", to: "/news", children: ["Chin News", "Myanmar News", "International News"] },
  { label: "Editorial", to: "/editorial" },
  { label: "Articles", to: "/articles", children: ["News Articles", "Cahram"] },
  { label: "Sports", to: "/sports" },
  { label: "Business", to: "/business" },
];

const childPath = (label) => label.endsWith("News") ? `/news/category/${label.replace(" News", "").toLowerCase()}` : "/articles";

function DesktopNavigation() {
  const navigate = useNavigate();
  return <nav className="ml-auto hidden items-center gap-[clamp(18px,2vw,30px)] xl:flex" aria-label="Main navigation">
    <NavLink className={({ isActive }) => `relative rounded-sm py-2.5 text-[13px] font-medium outline-none focus-visible:ring-2 focus-visible:ring-[#4f9488] focus-visible:ring-offset-2 ${isActive ? "text-[#111318] after:absolute after:right-0 after:bottom-[3px] after:left-0 after:h-px after:bg-[#111318]" : "text-[#4f5359] hover:text-[#111318]"}`} to="/">Home</NavLink>
    {navigation.map((item) => item.children ? <div className="group relative" key={item.label}>
      <button className="flex items-center gap-1.5 rounded-sm border-0 bg-transparent py-2.5 text-[13px] font-medium text-[#4f5359] outline-none transition hover:text-[#111318] focus-visible:ring-2 focus-visible:ring-[#4f9488] focus-visible:ring-offset-2 group-focus-within:text-[#111318]" type="button" aria-haspopup="true" onClick={() => navigate(item.to)}>{item.label}<span className="transition group-hover:rotate-180 group-focus-within:rotate-180 [&_svg]:size-3.5"><Icon name="chevron" /></span></button>
      <div className="invisible absolute top-full left-1/2 z-50 w-56 -translate-x-1/2 translate-y-2 rounded-[16px] border border-[#dcdde0] bg-white p-2 opacity-0 shadow-[0_18px_45px_rgba(32,41,56,.14)] transition duration-200 group-hover:visible group-hover:translate-y-0 group-hover:opacity-100 group-focus-within:visible group-focus-within:translate-y-0 group-focus-within:opacity-100">
        <Link className="block rounded-xl px-4 py-3 text-xs font-bold text-[#182536] hover:bg-[#f0f1f3]" to={item.to}>All {item.label}</Link>
        {item.children.map((child) => <Link className="block rounded-xl px-4 py-3 text-xs font-medium text-[#4f5359] transition hover:bg-[#e8edf2] hover:text-[#111318]" key={child} to={childPath(child)}>{child}</Link>)}
      </div>
    </div> : <NavLink className={({ isActive }) => `relative rounded-sm py-2.5 text-[13px] font-medium whitespace-nowrap outline-none transition focus-visible:ring-2 focus-visible:ring-[#4f9488] focus-visible:ring-offset-2 ${isActive ? "text-[#111318] after:absolute after:right-0 after:bottom-[3px] after:left-0 after:h-px after:bg-[#111318]" : "text-[#4f5359] hover:text-[#111318]"}`} key={item.label} to={item.to}>{item.label}</NavLink>)}
  </nav>;
}

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [expanded, setExpanded] = useState(null);
  const closeMenu = () => { setMenuOpen(false); setExpanded(null); };

  return <header className="relative z-40 bg-[#f7f5ef] px-3 pt-3 pb-5 md:px-6">
    <div className="mx-auto flex min-h-[64px] max-w-[1380px] items-center gap-3 rounded-[12px] border border-[#dcdde0] bg-white py-1.5 pr-2.5 pl-3.5 lg:gap-7">
      <Link className="flex shrink-0 items-center gap-[11px]" to="/" aria-label="Chinlung Today home"><span className="grid size-11 place-items-center rounded-[14px_14px_14px_5px] bg-[#182536] font-serif font-bold tracking-[-.05em] text-white">CT<span className="text-[#bac6d1]">.</span></span><span className="grid leading-[.9]"><strong className="font-serif text-xl">Chinlung</strong><small className="mt-[5px] text-[9px] font-bold tracking-[.23em] text-[#4f5359] uppercase">Today</small></span></Link>
      <DesktopNavigation />
      <div className="ml-auto flex items-center gap-2 xl:ml-2"><button className="hidden size-11 cursor-pointer place-items-center rounded-full border-0 bg-[#e8edf2] text-[#182536] sm:grid" type="button" aria-label="Open search" onClick={() => setSearchOpen(!searchOpen)}><Icon name={searchOpen ? "close" : "search"} /></button><button className="hidden h-10 cursor-pointer items-center gap-3 rounded-[9px] border-0 bg-[#182536] px-4 text-[11px] font-bold text-white transition hover:bg-[#304356] md:flex" type="button" onClick={() => document.getElementById("subscribe")?.scrollIntoView({ behavior: "smooth" })}>Join the brief <Icon name="arrow" /></button><button className="grid size-11 cursor-pointer place-items-center rounded-full border-0 bg-[#182536] text-white xl:hidden" type="button" aria-label={menuOpen ? "Close menu" : "Open menu"} aria-expanded={menuOpen} onClick={() => setMenuOpen(!menuOpen)}><Icon name={menuOpen ? "close" : "menu"} /></button></div>
    </div>

    {searchOpen && <form className="mx-auto mt-2.5 max-w-[720px] rounded-[18px] border border-[#dcdde0] bg-white p-[18px] shadow-[0_15px_40px_rgba(32,41,56,.1)]" onSubmit={(event) => event.preventDefault()}><label className="mb-2 block text-[11px] font-bold tracking-[.12em] uppercase" htmlFor="site-search">Search Chinlung Today</label><div className="flex gap-2"><input className="w-full rounded-[10px] border border-[#dcdde0] px-[15px] py-3 outline-none focus:border-[#4f9488]" id="site-search" autoFocus placeholder="Stories, people, places…"/><button className="rounded-[10px] border-0 bg-[#182536] px-[18px] font-bold text-white" type="submit">Search</button></div></form>}

    <div className={`mx-auto grid max-w-[1380px] transition-[grid-template-rows,opacity,margin] duration-300 ease-out xl:hidden ${menuOpen ? "mt-2 grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"}`} aria-hidden={!menuOpen}><div className="overflow-hidden"><div className="rounded-[12px] border border-[#dcdde0] bg-[#f7f5ef] px-4 pb-5 text-[#182536] sm:px-6">
      <form className="mt-5 flex rounded-[10px] border border-[#dcdde0] bg-white p-1.5" onSubmit={(event) => event.preventDefault()}><input className="min-w-0 flex-1 border-0 bg-transparent px-3 py-2.5 text-sm outline-none" aria-label="Search news" placeholder="Search stories, topics, people…" /><button className="grid size-10 place-items-center rounded-[8px] border-0 bg-[#182536] text-white" type="submit" aria-label="Search"><Icon name="search" /></button></form>
      <nav className="mt-3" aria-label="Mobile navigation"><Link className="flex min-h-[48px] items-center border-b border-[#dcdde0] text-base font-semibold" to="/" onClick={closeMenu}>Home</Link>{navigation.map((item) => item.children ? <div className="border-b border-[#dcdde0]" key={item.label}><button className="flex min-h-[48px] w-full items-center justify-between border-0 bg-transparent text-left text-base font-semibold" type="button" aria-expanded={expanded === item.label} onClick={() => setExpanded(expanded === item.label ? null : item.label)}>{item.label}<span className={`grid place-items-center text-[#111318] transition duration-200 [&_svg]:size-[18px] [&_svg]:stroke-[2.4] ${expanded === item.label ? "rotate-180" : ""}`}><Icon name="chevron" /></span></button><div className={`grid transition-[grid-template-rows,opacity] duration-300 ${expanded === item.label ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"}`}><div className="overflow-hidden"><div className="mb-3 rounded-[10px] bg-white p-2"><Link className="flex min-h-10 items-center rounded-[8px] px-3 text-sm font-semibold text-[#111318] hover:bg-[#e8edf2]" to={item.to} onClick={closeMenu}>All {item.label}</Link>{item.children.map((child) => <Link className="flex min-h-10 items-center rounded-[8px] px-3 text-sm font-medium text-[#4f5359] hover:bg-[#e8edf2] hover:text-[#111318]" key={child} to={childPath(child)} onClick={closeMenu}>{child}</Link>)}</div></div></div></div> : <Link className="flex min-h-[48px] items-center border-b border-[#dcdde0] text-base font-semibold" key={item.label} to={item.to} onClick={closeMenu}>{item.label}</Link>)}</nav>
      <div className="pt-5"><button className="flex w-full cursor-pointer items-center justify-between rounded-[9px] border-0 bg-[#182536] px-4 py-3 text-sm font-bold text-white" type="button" onClick={() => { closeMenu(); document.getElementById("subscribe")?.scrollIntoView({ behavior: "smooth" }); }}>Join the 5-minute brief <Icon name="arrow" /></button></div>
    </div></div></div>
  </header>;
}
