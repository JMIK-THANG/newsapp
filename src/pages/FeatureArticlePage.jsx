import { useEffect, useState } from "react";
import { Link, useLocation, useParams } from "react-router-dom";
import ArticleImage from "../components/article/ArticleImage";
import ArticleMeta from "../components/article/ArticleMeta";
import ArticleRecommendations from "../components/article/ArticleRecommendations";
import CategoryBadge from "../components/article/CategoryBadge";
import Icon from "../components/ui/Icon";
import ShareStoryButton from "../components/ui/ShareStoryButton";
import Seo, { SITE_NAME, SITE_URL } from "../components/seo/Seo";
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
  const location = useLocation();
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
  const canonicalPath = /^\d+$/.test(String(article.id ?? "")) ? shortStoryPath(article) : location.pathname;
  const canonicalUrl = `${SITE_URL}${canonicalPath}`;
  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: article.title,
    ...(article.summary ? { description: article.summary } : {}),
    ...(article.image ? { image: [article.image] } : {}),
    ...(article.publishedAt || article.published_at ? { datePublished: article.publishedAt || article.published_at } : {}),
    ...(article.updated_at ? { dateModified: article.updated_at } : {}),
    ...(article.author ? { author: { "@type": "Person", name: article.author } } : {}),
    publisher: { "@type": "NewsMediaOrganization", name: SITE_NAME, logo: { "@type": "ImageObject", url: `${SITE_URL}/chinlung-today-logo.png` } },
    mainEntityOfPage: { "@type": "WebPage", "@id": canonicalUrl },
  };

  return <main className="bg-white px-5 py-5 sm:px-6 sm:py-7 lg:py-10">
    <Seo title={article.title} description={article.summary || article.title} canonicalPath={canonicalPath} image={article.image} type="article" schema={articleSchema} />
    <article className="mx-auto max-w-[1420px]">
      <nav className="mb-3 flex flex-wrap items-center gap-2 text-[12px] font-medium text-[#69717a] sm:mb-5 sm:text-[13px]" aria-label="Breadcrumb">
        <Link className="text-[#182536] hover:text-[#397d73]" to="/">Home</Link><span className="-rotate-90 [&_svg]:size-3" aria-hidden="true"><Icon name="chevron" /></span>
        <Link className="text-[#182536] hover:text-[#397d73]" to="/articles">Articles</Link><span className="-rotate-90 [&_svg]:size-3" aria-hidden="true"><Icon name="chevron" /></span>
        <Link className="text-[#182536] hover:text-[#397d73]" to={categoryPath(article.category, "articles")}>{article.category}</Link>
      </nav>
      <div className="grid gap-10 xl:grid-cols-[minmax(0,1fr)_360px] xl:items-start xl:gap-12">
        <div className="min-w-0">
          <header className="max-w-[1050px]">
            <CategoryBadge category={article.category || "Feature"} />
            <h1 className="article-display-font mt-2.5 mb-0 max-w-[940px] text-[clamp(32px,8.5vw,38px)] leading-[1.04] font-bold tracking-[-.03em] text-[#182536] sm:mt-4 sm:text-[40px] lg:mt-5 lg:text-[clamp(42px,4.2vw,58px)] lg:leading-[1.06] lg:tracking-[-.035em]">{article.title}</h1>
            {article.summary && <p className="mt-3.5 mb-0 max-w-[920px] text-[17px] leading-[1.55] text-[#39424a] sm:mt-5 sm:text-[19px] sm:leading-[1.58] lg:text-[clamp(18px,1.7vw,24px)] lg:leading-[1.55]">{article.summary}</p>}
            <div className="mt-4 sm:mt-6"><ArticleMeta author={article.author || "Chinlung Today"} date={article.date} readTime={article.readTime || article.time || "5 min read"} /></div>
            <div className="mt-4 sm:mt-5"><ShareStoryButton story={article} /></div>
          </header>
          <div className="mt-5 sm:mt-8"><ArticleImage story={article} /></div>
          <div className="article-reading-text mt-7 max-w-[980px] text-[#111318] sm:mt-9">{paragraphs.map((paragraph, index) => <p className={index === 0 ? "mt-0" : "mt-6"} key={`${index}-${paragraph.slice(0, 30)}`}>{paragraph}</p>)}</div>
          {recommendations("mt-12 xl:hidden")}
          <footer className="mt-12 max-w-[980px] border-t border-[#dcdde0] pt-6"><Link className="inline-flex rounded-full bg-[#182536] px-5 py-3 text-xs font-bold text-white" to="/articles">View all articles</Link></footer>
        </div>
        {recommendations("hidden xl:sticky xl:top-[118px] xl:block")}
      </div>
    </article>
  </main>;
}
