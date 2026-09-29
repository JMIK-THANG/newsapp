import { useState } from "react";
import { shortStoryPath } from "../../utils/storyPath";
import Icon from "./Icon";

const publicSiteUrl = "https://chinlungtoday.com";
const circleClass = "grid size-9 place-items-center rounded-full border bg-white shadow-[0_2px_8px_rgba(24,37,54,.06)] transition hover:-translate-y-0.5 hover:shadow-[0_5px_12px_rgba(24,37,54,.12)] [&_svg]:size-[17px]";

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

  const label = status === "copied" ? "Link copied" : status === "shared" ? "Shared" : status === "error" ? "Try again" : "Share this story";

  return <div className="flex flex-wrap items-center gap-2" aria-label="Story and social links">
    <button className="inline-flex min-h-9 cursor-pointer items-center gap-1.5 rounded-full border border-[#182536] bg-transparent px-4 py-1.5 text-xs font-semibold text-[#182536] transition hover:bg-[#182536] hover:text-white [&_svg]:size-4" type="button" onClick={shareStory}><Icon name="share" />{label}</button>
    <a className={`${circleClass} border-[#c9d8ee] text-[#1877f2] hover:border-[#1877f2] hover:bg-[#1877f2] hover:text-white`} href="https://www.facebook.com/ChinlungTodayMedia" target="_blank" rel="noreferrer" aria-label="Visit Chinlung Today on Facebook" title="Facebook"><Icon name="facebook" /></a>
    <a className={`${circleClass} border-[#c9e8da] text-[#179b62] hover:border-[#179b62] hover:bg-[#179b62] hover:text-white`} href={`https://wa.me/?text=${encodeURIComponent(url)}`} target="_blank" rel="noreferrer" aria-label="Share this story on WhatsApp" title="WhatsApp"><Icon name="whatsapp" /></a>
    <a className={`${circleClass} border-[#f0cdd0] text-[#d1242f] hover:border-[#d1242f] hover:bg-[#d1242f] hover:text-white`} href="https://www.youtube.com/@chinlungtoday" target="_blank" rel="noreferrer" aria-label="Visit Chinlung Today on YouTube" title="YouTube"><Icon name="youtube" /></a>
  </div>;
}
