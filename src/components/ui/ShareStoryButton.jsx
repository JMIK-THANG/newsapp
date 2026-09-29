import { useState } from "react";
import { shortStoryPath } from "../../utils/storyPath";
import Icon from "./Icon";

const publicSiteUrl = "https://chinlungtoday.com";
const circleClass = "grid size-8 place-items-center rounded-full border bg-white shadow-[0_2px_8px_rgba(24,37,54,.06)] transition hover:-translate-y-0.5 hover:shadow-[0_5px_12px_rgba(24,37,54,.12)] sm:size-9 [&_svg]:size-[15px] sm:[&_svg]:size-[17px]";

export default function ShareStoryButton({ story, path }) {
  const [copyStatus, setCopyStatus] = useState("idle");
  const hasDatabaseId = /^\d+$/.test(String(story?.id ?? ""));
  const relativePath = hasDatabaseId ? shortStoryPath(story) : path;
  const regularUrl = typeof window === "undefined" ? publicSiteUrl : relativePath ? `${window.location.origin}${relativePath}` : window.location.href;
  const url = hasDatabaseId ? `${publicSiteUrl}${relativePath}` : regularUrl;

  const shareStory = async () => {
    try {
      if (navigator.share) {
        await navigator.share({ title: story?.title, url });
      } else {
        const subject = encodeURIComponent(story?.title || "Chinlung Today story");
        const body = encodeURIComponent(url);
        window.location.href = `mailto:?subject=${subject}&body=${body}`;
      }
    } catch (error) {
      if (error?.name !== "AbortError") setCopyStatus("error");
    }
  };

  const copyLink = async () => {
    try {
      await navigator.clipboard.writeText(url);
      setCopyStatus("copied");
      window.setTimeout(() => setCopyStatus("idle"), 1800);
    } catch {
      setCopyStatus("error");
    }
  };

  return <div className="flex flex-wrap items-center gap-1.5 sm:gap-2" aria-label="Story and social links">
    <button className="inline-flex min-h-8 cursor-pointer items-center gap-1.5 rounded-full border border-[#182536] bg-transparent px-3 py-1 text-[11px] font-semibold text-[#182536] transition hover:bg-[#182536] hover:text-white sm:min-h-9 sm:px-4 sm:py-1.5 sm:text-xs [&_svg]:size-3.5 sm:[&_svg]:size-4" type="button" onClick={shareStory}><Icon name="share" />Share this story</button>
    <a className={`${circleClass} border-[#c9d8ee] text-[#1877f2] hover:border-[#1877f2] hover:bg-[#1877f2] hover:text-white`} href="https://www.facebook.com/ChinlungTodayMedia" target="_blank" rel="noreferrer" aria-label="Visit Chinlung Today on Facebook" title="Facebook"><Icon name="facebook" /></a>
    <a className={`${circleClass} border-[#c9e8da] text-[#179b62] hover:border-[#179b62] hover:bg-[#179b62] hover:text-white`} href={`https://wa.me/?text=${encodeURIComponent(url)}`} target="_blank" rel="noreferrer" aria-label="Share this story on WhatsApp" title="WhatsApp"><Icon name="whatsapp" /></a>
    <span className="relative inline-flex">
      <button className={`${circleClass} cursor-pointer border-[#d7dadd] text-[#53606b] hover:border-[#182536] hover:bg-[#182536] hover:text-white`} type="button" onClick={copyLink} aria-label={copyStatus === "copied" ? "Copied!" : "Copy story link"} title={copyStatus === "copied" ? "Copied!" : "Copy link"}><Icon name="link" /></button>
      {copyStatus === "copied" && <span className="absolute bottom-[calc(100%+6px)] left-1/2 -translate-x-1/2 rounded bg-[#182536] px-2 py-1 text-[10px] font-semibold whitespace-nowrap text-white" role="status">Copied!</span>}
      {copyStatus === "error" && <span className="sr-only" role="status">Unable to copy link.</span>}
    </span>
  </div>;
}
