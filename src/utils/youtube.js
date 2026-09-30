export function getYouTubeVideoId(value = "") {
  try {
    const url = new URL(value.trim());
    const host = url.hostname.replace(/^www\./, "");
    if (host === "youtu.be") return url.pathname.split("/").filter(Boolean)[0] || "";
    if (host === "youtube.com" || host === "m.youtube.com") {
      if (url.pathname === "/watch") return url.searchParams.get("v") || "";
      const [, type, id] = url.pathname.split("/");
      if (["embed", "shorts", "live"].includes(type)) return id || "";
    }
  } catch {
    return "";
  }
  return "";
}

export const youtubeThumbnail = (id) => id ? `https://i.ytimg.com/vi/${id}/hqdefault.jpg` : "";
