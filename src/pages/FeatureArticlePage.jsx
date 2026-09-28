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
  const normalizedTitle = article.title?.trim().toLocaleLowerCase().replace(/\s+/g, " ");
  const normalizedSummary = article.summary?.trim().toLocaleLowerCase().replace(/\s+/g, " ");
  const paragraphs = (article.content?.length ? article.content : [])
    .map((paragraph) => paragraph.trim())
    .filter((paragraph) => {
      if (!paragraph) return false;
      const normalizedParagraph = paragraph.toLocaleLowerCase().replace(/\s+/g, " ");
      return normalizedParagraph !== normalizedTitle && normalizedParagraph !== normalizedSummary;
    });

  return <main className="bg-[#fff] px-3 py-6 md:px-6 md:py-8"><article className="mx-auto max-w-[1540px]">
    <header className="border-b border-[#c8c6c0] pb-7">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <nav className="flex items-center gap-2 text-[12px] font-medium text-[#69717a]" aria-label="Breadcrumb"><Link className="hover:text-[#111318]" to="/">Home</Link><span className="text-[#a7aaad]">/</span><Link className="hover:text-[#111318]" to="/articles">Articles</Link></nav>
        <p className="m-0 text-[11px] font-bold tracking-[.08em] text-[#397d73] uppercase">{article.category || "Feature"}</p>
      </div>
      <div className="mt-5 grid gap-7 lg:grid-cols-[minmax(300px,.78fr)_minmax(0,1.22fr)] lg:items-center xl:gap-12">
        <div className="min-w-0 py-1">
          <h1 className="m-0 font-serif text-[clamp(30px,3.5vw,48px)] leading-[1.08] font-semibold tracking-[-.035em] text-[#0c0c0c]">{article.title}</h1>
          <p className="mt-5 mb-0 text-[clamp(17px,1.45vw,23px)] leading-[1.55] text-[#303940]">{article.summary}</p>
          <div className="mt-5 flex flex-wrap items-center gap-x-3 gap-y-1 text-[12px] leading-5 text-[#4f5359] md:text-[13px]"><span>By <strong className="font-semibold text-[#111318]">{article.author || "Chinlung Today"}</strong></span><span>•</span><span>{article.date}</span><span>•</span><span>{article.readTime || article.time || "5 min read"}</span></div>
          <div className="mt-4"><ShareStoryButton story={article} /></div>
        </div>
        <figure className="m-0 min-w-0"><img className="max-h-[560px] w-full bg-[#ddd9d1] object-contain" src={article.image} alt={article.imageAlt} /><figcaption className="mt-2 text-[10px] text-[#666b70]">{article.imageCredit || "Chinlung Today"}</figcaption></figure>
      </div>
    </header>
    <div className="article-reading-text mx-auto mt-8 max-w-[1100px]">{paragraphs.map((paragraph, index) => <p className={index === 0 ? "mt-0" : "mt-6"} key={`${index}-${paragraph.slice(0, 30)}`}>{paragraph}</p>)}</div>
    <footer className="mx-auto mt-12 flex max-w-[930px] justify-between border-t border-[#182536] pt-6"><Link className="rounded-full bg-[#182536] px-5 py-3 text-xs font-bold text-white" to="/articles">View all articles</Link></footer>
  </article></main>;
}
