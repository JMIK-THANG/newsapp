import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { articleStories } from "../data/sectionPageData";
import { getNewsArticle } from "../hooks/useNews";

function staticArticle(key) {
  if (key === "featured") return articleStories[0];
  if (key.startsWith("story-")) return articleStories[Number(key.replace("story-", ""))] || null;
  return null;
}

export default function FeatureArticlePage() {
  const { storyKey } = useParams();
  const fallback = staticArticle(storyKey);
  const [article, setArticle] = useState(fallback);
  const [error, setError] = useState("");

  useEffect(() => {
    if (fallback) return;
    getNewsArticle(storyKey).then(setArticle).catch((requestError) => setError(requestError.message));
  }, [fallback, storyKey]);

  if (!article) return <main className="min-h-[60vh] bg-[#f1eee8] px-6 py-20 text-center"><h1 className="font-serif text-4xl">{error || "Loading article…"}</h1><Link className="underline" to="/articles">Return to Articles</Link></main>;
  const paragraphs = article.content?.length ? article.content : [article.summary];

  return <main className="bg-[#f1eee8] px-3 py-8 md:px-6 md:py-12"><article className="mx-auto max-w-[1280px]">
    <nav className="mb-8 text-[11px] font-semibold tracking-[.08em] uppercase"><Link className="text-[#4f9488]" to="/articles">Articles</Link><span className="mx-2 text-[#969995]">/</span><span>Feature</span></nav>
    <header className="grid gap-8 border-y border-[#182536] py-8 lg:grid-cols-[1fr_320px] lg:items-end"><div><p className="mb-4 text-[10px] font-bold tracking-[.18em] text-[#4f9488] uppercase">The Chinlung Review</p><h1 className="m-0 max-w-[950px] font-serif text-[clamp(44px,7vw,88px)] leading-[.98] tracking-[-.05em]">{article.title}</h1></div><div className="border-t border-[#c8c6c0] pt-5 lg:border-t-0 lg:border-l lg:pl-7"><p className="m-0 text-[16px] leading-7 text-[#4f5359]">{article.summary}</p><p className="mt-5 mb-0 text-xs">By <strong>{article.author || "Chinlung Today"}</strong><br />{article.date} · {article.readTime || article.time || "5 min read"}</p></div></header>
    <figure className="my-8 md:my-12"><img className="max-h-[760px] w-full bg-[#ddd9d1] object-contain" src={article.image} alt={article.imageAlt} /><figcaption className="mt-2 text-[10px] text-[#666b70]">{article.imageCredit || "Chinlung Today"}</figcaption></figure>
    <div className="mx-auto grid max-w-[930px] gap-8 md:grid-cols-[150px_1fr]"><aside className="border-t border-[#182536] pt-3 text-[10px] font-bold tracking-[.12em] uppercase">Long-form article</aside><div className="font-serif text-[19px] leading-9 text-[#292c31]">{paragraphs.map((paragraph, index) => <p className={index === 0 ? "mt-0 first-letter:float-left first-letter:mr-2 first-letter:text-7xl first-letter:leading-[.8]" : undefined} key={`${index}-${paragraph.slice(0, 30)}`}>{paragraph}</p>)}</div></div>
    <footer className="mx-auto mt-12 flex max-w-[930px] justify-between border-t border-[#182536] pt-6"><Link className="rounded-full bg-[#182536] px-5 py-3 text-xs font-bold text-white" to="/articles">View all articles</Link></footer>
  </article></main>;
}
