import { useState } from "react";
import { shortStoryPath } from "../../utils/storyPath";
import Icon from "./Icon";

const publicSiteUrl = "https://chinlungtoday.com";

export default function ShareStoryButton({ story, path }) {
  const [status, setStatus] = useState("idle");

  const shareStory = async () => {
    const hasDatabaseId = /^\d+$/.test(String(story?.id ?? ""));
    const relativePath = hasDatabaseId ? shortStoryPath(story) : path;
    const regularUrl = relativePath
      ? `${window.location.origin}${relativePath}`
      : window.location.href;
    const url = hasDatabaseId
      ? `${publicSiteUrl}${relativePath}`
      : regularUrl;

    try {
      if (navigator.share) {
        // A URL-only payload lets WhatsApp and Messenger generate their native
        // rich card from the page's Open Graph metadata. Including summary text
        // causes some clients to send a plain text message instead.
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

  const label = status === "copied" ? "Link copied" : status === "shared" ? "Shared" : status === "error" ? "Try again" : "Share story";

  return <div className="flex flex-wrap items-center gap-2" aria-label="Story and social links">
    <button className="inline-flex cursor-pointer items-center gap-1.5 rounded-full border border-[#182536] bg-transparent px-3 py-1.5 text-xs font-medium text-[#182536] transition hover:bg-[#182536] hover:text-white [&_svg]:size-4" type="button" onClick={shareStory}><Icon name="share" />{label}</button>
    <a className="grid size-8 place-items-center rounded-full border border-[#c7c9c8] text-[#4f5359] transition hover:border-[#1877f2] hover:bg-[#1877f2] hover:text-white [&_svg]:size-4" href="https://www.facebook.com/ChinlungTodayMedia" target="_blank" rel="noreferrer" aria-label="Visit Chinlung Today on Facebook" title="Facebook"><Icon name="facebook" /></a>
    <a className="grid size-8 place-items-center rounded-full border border-[#c7c9c8] text-[#4f5359] transition hover:border-[#b72025] hover:bg-[#b72025] hover:text-white [&_svg]:size-4" href="https://www.youtube.com/@chinlungtoday" target="_blank" rel="noreferrer" aria-label="Visit Chinlung Today on YouTube" title="YouTube"><Icon name="youtube" /></a>
  </div>;
}
