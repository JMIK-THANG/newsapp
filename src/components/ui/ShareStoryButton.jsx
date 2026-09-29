import { useState } from "react";
import { shortStoryPath } from "../../utils/storyPath";
import Icon from "./Icon";

const publicSiteUrl = "https://chinlungtoday.com";
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

  return <div className="flex flex-wrap items-center gap-3" aria-label="Story sharing actions">
    <button className="inline-flex min-h-9 cursor-pointer items-center gap-2 rounded-full border border-[#182536] bg-[#182536] px-4 py-2 text-xs font-semibold text-white transition hover:bg-transparent hover:text-[#182536] [&_svg]:size-4" type="button" onClick={shareStory}><Icon name="share" />Share</button>
    <span className="relative inline-flex">
      <button className="inline-flex min-h-9 cursor-pointer items-center gap-1.5 border-0 bg-transparent px-1 py-2 text-xs font-medium text-[#53606b] transition hover:text-[#182536] [&_svg]:size-3.5" type="button" onClick={copyLink} aria-label={copyStatus === "copied" ? "Copied!" : "Copy story link"} title={copyStatus === "copied" ? "Copied!" : "Copy link"}><Icon name="link" />{copyStatus === "copied" ? "Copied!" : "Copy Link"}</button>
      {copyStatus === "error" && <span className="sr-only" role="status">Unable to copy link.</span>}
    </span>
  </div>;
}
