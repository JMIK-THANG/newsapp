import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import ArticleImage from "../components/article/ArticleImage";
import ArticleMeta from "../components/article/ArticleMeta";
import ArticleRecommendations from "../components/article/ArticleRecommendations";
import CategoryBadge from "../components/article/CategoryBadge";
import ShareStoryButton from "../components/ui/ShareStoryButton";
import { articleStories } from "../data/sectionPageData";
import useNews, { getNewsArticle } from "../hooks/useNews";
import { categoryPath } from "../utils/categoryPath";
import { shortStoryPath } from "../utils/storyPath";

function staticArticle(key) {
  if (key === "featured") return articleStories[0];
  if (key.startsWith("story-")) return articleStories[Number(key.replace("story-", ""))] || null;
  return null;
}

function fallbackPath(story) {
  const index = articleStories.indexOf(story);
  return `/articles/${index === 0 ? "featured" : `story-${index}`}`;
}

export default function FeatureArticlePage() {
  const { storyKey } = useParams();
  const fallback = staticArticle(storyKey);
  const [article, setArticle] = useState(fallback);
  const [error, setError] = useState("");
  const { news: publishedArticles } = useNews({ contentType: "article" });

  useEffect(() => {
    if (fallback) return;
    getNewsArticle(storyKey).then(setArticle).catch((requestError) => setError(requestError.message));
  }, [fallback, storyKey]);

  if (!article) return <main className="min-h-[60vh] bg-white px-6 py-20 text-center"><h1 className="font-serif text-4xl">{error || "Loading article…"}</h1><Link className="underline" to="/articles">Return to Articles</Link></main>;

  const normalizedTitle = article.title?.trim().toLocaleLowerCase().replace(/\s+/g, " ");
  const normalizedSummary = article.summary?.trim().toLocaleLowerCase().replace(/\s+/g, " ");
  const paragraphs = (article.content?.length ? article.content : []).map((paragraph) => paragraph.trim()).filter((paragraph) => {
    if (!paragraph) return false;
    const normalizedParagraph = paragraph.toLocaleLowerCase().replace(/\s+/g, " ");
    return normalizedParagraph !== normalizedTitle && normalizedParagraph !== normalizedSummary;
  });
  const source = publishedArticles.length ? publishedArticles : articleStories;
  const related = source.filter((item) => item.category === article.category).filter((item) => String(item.id) !== String(article.id) && item.title !== article.title).slice(0, 4).map((item) => ({ ...item, path: publishedArticles.length ? shortStoryPath(item) : fallbackPath(item) }));
  const recommendations = (className) => <ArticleRecommendations className={className} category={article.category} stories={related} seeAllPath={categoryPath(article.category, "articles")} />;

  return <main className="bg-white px-4 py-7 sm:px-6 lg:py-10">
    <article className="mx-auto max-w-[1420px]">
      <nav className="mb-5 flex items-center gap-2 text-[13px] font-medium text-[#69717a]" aria-label="Breadcrumb"><Link className="hover:text-[#111318]" to="/">Home</Link><span>/</span><Link className="hover:text-[#111318]" to="/articles">Articles</Link></nav>
      <div className="grid gap-10 xl:grid-cols-[minmax(0,1fr)_360px] xl:items-start xl:gap-12">
        <div className="min-w-0">
          <header className="max-w-[1050px]">
            <CategoryBadge category={article.category || "Feature"} />
            <h1 className="article-display-font mt-5 mb-0 max-w-[940px] text-[clamp(34px,4.2vw,58px)] leading-[1.06] font-bold tracking-[-.035em] text-[#182536]">{article.title}</h1>
            {article.summary && <p className="mt-5 mb-0 max-w-[920px] text-[clamp(18px,1.7vw,24px)] leading-[1.55] text-[#39424a]">{article.summary}</p>}
            <div className="mt-6"><ArticleMeta author={article.author || "Chinlung Today"} date={article.date} readTime={article.readTime || article.time || "5 min read"} /></div>
            <div className="mt-5"><ShareStoryButton story={article} /></div>
          </header>
          <div className="mt-8"><ArticleImage story={article} /></div>
          <div className="article-reading-text mt-9 max-w-[980px] text-[#111318]">{paragraphs.map((paragraph, index) => <p className={index === 0 ? "mt-0" : "mt-6"} key={`${index}-${paragraph.slice(0, 30)}`}>{paragraph}</p>)}</div>
          {recommendations("mt-12 xl:hidden")}
          <footer className="mt-12 max-w-[980px] border-t border-[#dcdde0] pt-6"><Link className="inline-flex rounded-full bg-[#182536] px-5 py-3 text-xs font-bold text-white" to="/articles">View all articles</Link></footer>
        </div>
        {recommendations("hidden xl:sticky xl:top-[118px] xl:block")}
      </div>
    </article>
  </main>;
}
