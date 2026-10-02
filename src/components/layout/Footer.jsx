import { useState } from "react";
import { Link } from "react-router-dom";
import Icon from "../ui/Icon";

const newsroomLinks = [
  ["Latest News", "/news"],
  ["Chin News", "/news/category/chin"],
  ["Myanmar News", "/news/category/myanmar"],
  ["International", "/news/category/international"],
  ["Sports", "/sports"],
  ["Business", "/business"],
];

const featureLinks = [
  ["Editorial", "/editorial"],
  ["Articles", "/articles"],
  ["News Articles", "/articles/category/news-articles"],
  ["Cahram", "/articles/category/cahram"],
  ["Podcasts", "/podcasts"],
];

const companyLinks = [["About", "/about"], ["Contact", "/contact"], ["Privacy", "/privacy"]];

function FooterLinks({ title, links }) {
  return <nav aria-label={`${title} links`}>
    <h2 className="m-0 text-[11px] font-bold tracking-[.12em] text-[#76afa5] uppercase">{title}</h2>
    <ul className="mt-4 mb-0 grid list-none gap-3 p-0">
      {links.map(([label, path]) => <li key={label}><Link className="text-[14px] font-medium text-[#e3e7e8] transition hover:text-white" to={path}>{label}</Link></li>)}
    </ul>
  </nav>;
}

export default function Footer() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState("idle");

  const handleSubscribe = async (event) => {
    event.preventDefault();
    const endpoint = import.meta.env.VITE_NEWSLETTER_ENDPOINT;
    if (!endpoint) { setStatus("demo"); return; }
    setStatus("loading");
    try {
      const response = await fetch(endpoint, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ email }) });
      if (!response.ok) throw new Error("Subscription failed");
      setEmail(""); setStatus("success");
    } catch { setStatus("error"); }
  };

  return <footer id="subscribe" className="border-t-4 border-[#9b1c1f] bg-[#182536] px-4 text-white sm:px-6">
    <div className="mx-auto max-w-[1280px]">
      <div className="grid gap-9 border-b border-white/15 py-10 lg:grid-cols-[minmax(0,1fr)_minmax(380px,.72fr)] lg:items-center lg:gap-16 lg:py-14">
        <div>
          <Link className="flex w-fit items-center gap-3.5" to="/" aria-label="Chinlung Today home">
            <span className="grid size-[62px] shrink-0 place-items-center rounded-[6px] bg-[#f7f5f0] p-1.5" aria-hidden="true"><img className="h-full w-full object-contain" src="/chinlung-today-logo-transparent.png" alt="" /></span>
            <span><strong className="article-display-font block text-[27px] leading-none font-bold text-white sm:text-[30px]">Chinlung Today</strong><small className="mt-2 block text-[9px] font-bold tracking-[.19em] text-[#aebac0] uppercase">News · People · Our Community</small></span>
          </Link>
          <p className="mt-6 mb-0 max-w-[620px] text-[18px] leading-8 text-[#d8dee1]">Independent and fact-based reporting from Chin, Myanmar, and around the world.</p>
          <div className="mt-7 flex flex-wrap gap-3">
            <a className="inline-flex items-center gap-2 rounded-full border border-white/25 px-4 py-2.5 text-[13px] font-semibold text-white transition hover:border-[#76afa5] hover:bg-white/5 [&_svg]:size-4" href="https://www.facebook.com/ChinlungTodayMedia" target="_blank" rel="noreferrer"><Icon name="facebook" />Facebook</a>
            <a className="inline-flex items-center gap-2 rounded-full border border-white/25 px-4 py-2.5 text-[13px] font-semibold text-white transition hover:border-[#d45558] hover:bg-white/5 [&_svg]:size-4" href="https://www.youtube.com/@chinlungtoday" target="_blank" rel="noreferrer"><Icon name="youtube" />YouTube</a>
          </div>
        </div>

        <section className="rounded-[8px] bg-[#f1eee8] p-5 text-[#182536] shadow-[0_20px_55px_rgba(0,0,0,.18)] sm:p-7" aria-labelledby="footer-newsletter-title">
          <p className="m-0 text-[10px] font-bold tracking-[.14em] text-[#397d73] uppercase">The 5-minute brief</p>
          <h2 id="footer-newsletter-title" className="article-display-font mt-3 mb-0 text-[28px] leading-tight font-semibold tracking-[-.02em]">Essential news, directly to you.</h2>
          <p className="mt-3 mb-0 text-[14px] leading-6 text-[#4f5962]">Receive a concise briefing of the day’s most important stories and updates.</p>
          <form className="mt-5 flex flex-col gap-2 sm:flex-row" onSubmit={handleSubscribe}>
            <label className="sr-only" htmlFor="newsletter-email">Email address</label>
            <input className="min-w-0 flex-1 rounded-[6px] border border-[#bfc4c5] bg-white px-4 py-3 text-[14px] outline-none placeholder:text-[#7a828d] focus:border-[#397d73]" id="newsletter-email" type="email" value={email} onChange={(event) => { setEmail(event.target.value); setStatus("idle"); }} placeholder="Your email address" autoComplete="email" required />
            <button className="inline-flex cursor-pointer items-center justify-center gap-2 rounded-[6px] border-0 bg-[#182536] px-5 py-3 text-[13px] font-bold text-white transition hover:bg-[#9b1c1f] disabled:cursor-wait disabled:opacity-60" type="submit" disabled={status === "loading"}>{status === "loading" ? "Joining…" : "Subscribe"}<Icon name="arrow" /></button>
          </form>
          <div className="mt-2 min-h-5 text-[12px] leading-5" aria-live="polite">
            {status === "demo" && <p className="m-0 text-[#5f6368]">Email validated. Newsletter delivery will be available soon.</p>}
            {status === "success" && <p className="m-0 text-[#397d73]">You’re subscribed. Please check your inbox.</p>}
            {status === "error" && <p className="m-0 text-[#9b1c1f]">We couldn’t subscribe you. Please try again.</p>}
          </div>
        </section>
      </div>

      <div className="grid grid-cols-2 gap-x-8 gap-y-10 border-b border-white/15 py-9 sm:grid-cols-3 lg:grid-cols-[1fr_1fr_.8fr_1.3fr] lg:py-11">
        <FooterLinks title="Newsroom" links={newsroomLinks} />
        <FooterLinks title="Features" links={featureLinks} />
        <FooterLinks title="Company" links={companyLinks} />
        <div className="col-span-2 sm:col-span-3 lg:col-span-1">
          <h2 className="m-0 text-[11px] font-bold tracking-[.12em] text-[#76afa5] uppercase">Our purpose</h2>
          <p className="mt-4 mb-0 max-w-sm text-[14px] leading-6 text-[#bdc7cb]">We serve readers with independent journalism centered on Chin communities, public interest, and verified information.</p>
          <Link className="mt-5 inline-flex items-center gap-2 text-[13px] font-bold text-white transition hover:text-[#76afa5]" to="/about">Learn about Chinlung Today <Icon name="arrow" /></Link>
        </div>
      </div>

      <div className="flex flex-col gap-2 py-5 text-[12px] leading-5 text-[#aebac0] sm:flex-row sm:items-center sm:justify-between">
        <p className="m-0">© 2026 Chinlung Today. All rights reserved.</p>
        <p className="m-0">Designed and built by <a className="font-semibold text-white underline decoration-[#76afa5] underline-offset-4" href="https://portfolio-website-sx94.onrender.com/" target="_blank" rel="noreferrer">JMIK Thang</a></p>
      </div>
    </div>
  </footer>;
}
