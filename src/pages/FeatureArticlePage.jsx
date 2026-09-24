import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { articleStories } from "../data/sectionPageData";
import { getNewsArticle } from "../hooks/useNews";
import ShareStoryButton from "../components/ui/ShareStoryButton";

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

  return <main className="bg-[#f1eee8] px-3 py-8 md:px-6 md:py-12"><article className="mx-auto max-w-[1380px]">
    <div className="mx-auto mb-5 flex w-full max-w-[900px] items-center justify-between gap-4 border-b border-[#c8c6c0] pb-3">
      <nav className="flex items-center gap-2.5 text-[14px] font-normal text-[#5f6368]" aria-label="Breadcrumb"><Link className="hover:text-[#111318]" to="/">Home</Link><span className="text-[#9aa0a6]">/</span><Link className="hover:text-[#111318]" to="/articles">Articles</Link></nav>
      <p className="m-0 rounded-full bg-[#e7efec] px-3 py-1.5 text-right text-[11px] font-semibold tracking-[.05em] text-[#397d73] uppercase">{article.category || "Feature"}</p>
    </div>
    <header className="mx-auto max-w-[900px] text-center">
      <h1 className="m-0 font-serif text-[clamp(25px,3vw,35px)] leading-[1.18] tracking-[-.018em] text-[#0c0c0c]">{article.title}</h1>
      <div className="mt-6 flex flex-wrap items-center justify-center gap-x-3 gap-y-2 text-[14px] leading-6 text-[#4f5359] md:text-[15px]"><span>By <strong className="font-semibold text-[#111318]">{article.author || "Chinlung Today"}</strong></span><span>•</span><span>{article.date}</span><span>•</span><span>{article.readTime || article.time || "5 min read"}</span></div>
      <div className="mt-8"><ShareStoryButton story={article} /></div>
    </header>
    <figure className="my-8 md:my-12"><img className="max-h-[760px] w-full bg-[#ddd9d1] object-contain" src={article.image} alt={article.imageAlt} /><figcaption className="mt-2 text-[10px] text-[#666b70]">{article.imageCredit || "Chinlung Today"}</figcaption></figure>
    <div className="mx-auto grid max-w-[930px] gap-8 md:grid-cols-[150px_1fr]"><aside className="border-t border-[#182536] pt-3 text-[10px] font-semibold tracking-[.12em] uppercase">Long-form article</aside><div className="article-reading-text article-indented">{paragraphs.map((paragraph, index) => <p className={index === 0 ? "mt-0 first-letter:float-left first-letter:mr-2 first-letter:font-serif first-letter:text-7xl first-letter:leading-[.8]" : undefined} key={`${index}-${paragraph.slice(0, 30)}`}>{paragraph}</p>)}</div></div>
    <footer className="mx-auto mt-12 flex max-w-[930px] justify-between border-t border-[#182536] pt-6"><Link className="rounded-full bg-[#182536] px-5 py-3 text-xs font-bold text-white" to="/articles">View all articles</Link></footer>
  </article></main>;
}
