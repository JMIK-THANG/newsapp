import { useState } from "react";
import { shortStoryPath } from "../../utils/storyPath";
import Icon from "./Icon";

const publicSiteUrl = "https://chinlungtoday.com";
const circleClass = "grid size-9 place-items-center rounded-full border border-[#d7dadd] bg-[#fff] text-[#4f5962] transition hover:border-[#182536] hover:text-[#182536] [&_svg]:size-4";

export default function ShareStoryButton({ story, path }) {
  const [status, setStatus] = useState("idle");
  const hasDatabaseId = /^\d+$/.test(String(story?.id ?? ""));
  const relativePath = hasDatabaseId ? shortStoryPath(story) : path;
  const regularUrl = typeof window === "undefined" ? publicSiteUrl : relativePath ? `${window.location.origin}${relativePath}` : window.location.href;
  const url = hasDatabaseId ? `${publicSiteUrl}${relativePath}` : regularUrl;

  const shareStory = async () => {
    try {
      if (navigator.share) {
        await navigator.share({ url });
        setStatus("shared");
      } else {
        await navigator.clipboard.writeText(url);
        setStatus("copied");
      }
    } catch (error) {
      if (error?.name !== "AbortError") setStatus("error");
    }
  };

  const copyLink = async () => {
    try {
      await navigator.clipboard.writeText(url);
      setStatus("copied");
    } catch {
      setStatus("error");
    }
  };

  const label = status === "copied" ? "Link copied" : status === "shared" ? "Shared" : status === "error" ? "Try again" : "Share this story";

  return <div className="flex flex-wrap items-center gap-2" aria-label="Story and social links">
    <button className="inline-flex min-h-9 cursor-pointer items-center gap-1.5 rounded-full border border-[#182536] bg-transparent px-4 py-1.5 text-xs font-semibold text-[#182536] transition hover:bg-[#182536] hover:text-white [&_svg]:size-4" type="button" onClick={shareStory}><Icon name="share" />{label}</button>
    <a className={circleClass} href="https://www.facebook.com/ChinlungTodayMedia" target="_blank" rel="noreferrer" aria-label="Visit Chinlung Today on Facebook" title="Facebook"><Icon name="facebook" /></a>
    <a className={`${circleClass} text-[#278f69]`} href={`https://wa.me/?text=${encodeURIComponent(url)}`} target="_blank" rel="noreferrer" aria-label="Share this story on WhatsApp" title="WhatsApp"><Icon name="whatsapp" /></a>
    <button className={`${circleClass} cursor-pointer`} type="button" onClick={copyLink} aria-label="Copy story link" title="Copy link"><Icon name="link" /></button>
    <a className={circleClass} href="https://www.youtube.com/@chinlungtoday" target="_blank" rel="noreferrer" aria-label="Visit Chinlung Today on YouTube" title="YouTube"><Icon name="youtube" /></a>
  </div>;
}
