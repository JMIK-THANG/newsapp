import { useState } from "react";
import { shortStoryPath } from "../../utils/storyPath";
import Icon from "./Icon";

export default function ShareStoryButton({ story, path }) {
  const [status, setStatus] = useState("idle");

  const shareStory = async () => {
    const relativePath = story?.id ? shortStoryPath(story) : path;
    const url = relativePath
      ? `${window.location.origin}${window.location.pathname}#${relativePath}`
      : window.location.href;

    try {
      if (navigator.share) {
        await navigator.share({ title: story?.title || document.title, url });
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

  return <button className="inline-flex cursor-pointer items-center gap-2 rounded-full border border-[#182536] bg-transparent px-4 py-2 text-sm font-medium text-[#182536] transition hover:bg-[#182536] hover:text-white" type="button" onClick={shareStory}><Icon name="share" />{label}</button>;
}
