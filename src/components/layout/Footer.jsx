import { useState } from "react";
import { navigationItems } from "../../data/news";
import Icon from "../ui/Icon";
import { Link } from "react-router-dom";

export default function Footer() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState("idle");

  const handleSubscribe = async (event) => {
    event.preventDefault();
    const endpoint = import.meta.env.VITE_NEWSLETTER_ENDPOINT;

    if (!endpoint) {
      setStatus("demo");
      return;
    }

    setStatus("loading");
    try {
      const response = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      if (!response.ok) throw new Error("Subscription failed");
      setEmail("");
      setStatus("success");
    } catch {
      setStatus("error");
    }
  };

  return (
    <footer id="subscribe" className="border-t border-[#cfd2d3] bg-[#efede7] px-3 pt-10 pb-5 text-[#182536] md:px-6 md:pt-12">
      <div className="mx-auto max-w-[1380px]">
        <div className="grid gap-10 border-b border-[#cfd2d3] pb-10 lg:grid-cols-[1.1fr_.9fr] lg:items-end">
          <div>
            <Link className="flex w-fit items-center gap-3" to="/" aria-label="Chinlung Today home">
              <span className="grid size-12 place-items-center rounded-[15px_15px_15px_5px] bg-[#4f9488] text-base font-semibold text-white">CT.</span>
              <span className="grid leading-none"><strong className="text-xl font-semibold">Chinlung Today</strong><small className="mt-2 text-[9px] font-medium tracking-[.18em] text-[#6b7075] uppercase">Local · National · Global</small></span>
            </Link>
            <p className="mt-5 mb-0 max-w-[570px] text-[clamp(18px,1.8vw,24px)] leading-[1.4] font-normal text-[#303940]">Independent reporting and clear perspectives from our communities and around the world.</p>
          </div>

          <div className="lg:justify-self-end">
            <p className="mb-4 text-[10px] font-semibold tracking-[.14em] text-[#4f9488] uppercase">The 5-minute brief</p>
            <p className="mt-0 mb-3 max-w-[430px] text-xs leading-5 text-[#5f6368]">Get the day’s most important stories and updates delivered to your inbox.</p>
            <form id="newsletter-form" className="flex max-w-[430px] flex-col gap-2 sm:flex-row" onSubmit={handleSubscribe}>
              <label className="sr-only" htmlFor="newsletter-email">Email address</label>
              <input className="min-w-0 flex-1 rounded-[8px] border border-[#c8c9c7] bg-white px-4 py-3 text-sm text-[#182536] outline-none placeholder:text-[#7a828d] focus:border-[#4f9488]" id="newsletter-email" type="email" value={email} onChange={(event) => { setEmail(event.target.value); setStatus("idle"); }} placeholder="Email address" autoComplete="email" required />
              <button className="flex cursor-pointer items-center justify-center gap-2 rounded-[8px] border border-[#182536] bg-[#182536] px-4 py-3 text-sm font-medium text-white transition hover:bg-[#2b4052] disabled:cursor-wait disabled:opacity-60" type="submit" disabled={status === "loading"}>{status === "loading" ? "Joining…" : "Subscribe"} <Icon name="arrow" /></button>
            </form>
            <div className="mt-2 min-h-4 text-[11px]" aria-live="polite">
              {status === "demo" && <p className="m-0 text-[#5f6368]">Email validated. Connect a newsletter service to activate delivery.</p>}
              {status === "success" && <p className="m-0 text-[#3f7f75]">You’re subscribed. Please check your inbox.</p>}
              {status === "error" && <p className="m-0 text-[#182536]">We couldn’t subscribe you. Please try again.</p>}
            </div>
          </div>
        </div>

        <div className="grid gap-7 py-7 md:grid-cols-[1fr_auto] md:items-center">
          <nav className="flex flex-wrap gap-x-6 gap-y-3" aria-label="Footer navigation">
            <Link className="text-xs font-medium text-[#5f6368] transition hover:text-[#182536]" to="/">Home</Link>
            {navigationItems.map((item) => <Link className="text-xs font-medium text-[#5f6368] transition hover:text-[#182536]" key={item} to={`/${item.toLowerCase()}`}>{item}</Link>)}
          </nav>
          <div className="flex gap-5 text-xs font-medium text-[#5f6368]"><Link className="hover:text-[#182536]" to="/about">About</Link><Link className="hover:text-[#182536]" to="/contact">Contact</Link><Link className="hover:text-[#182536]" to="/privacy">Privacy</Link></div>
        </div>

        <div className="flex flex-col gap-3 border-t border-[#cfd2d3] pt-5 text-[11px] text-[#74797d] sm:flex-row sm:items-center sm:justify-between">
          <p className="m-0">© 2026 Chinlung Today. All rights reserved.</p>
          <p className="m-0">Designed and built by <a className="font-medium text-[#182536] underline decoration-[#4f9488]/60 underline-offset-4 transition hover:decoration-[#4f9488]" href="https://portfolio-website-sx94.onrender.com/" target="_blank" rel="noreferrer">JMIK Thang</a></p>
        </div>
      </div>
    </footer>
  );
}
