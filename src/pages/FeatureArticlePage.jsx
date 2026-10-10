import { useEffect, useState } from "react";
import { Link, useLocation, useParams } from "react-router-dom";
import ArticleImage from "../components/article/ArticleImage";
import ArticleMeta from "../components/article/ArticleMeta";
import Icon from "../components/ui/Icon";
import ShareStoryButton from "../components/ui/ShareStoryButton";
import Seo, { SITE_NAME, SITE_URL } from "../components/seo/Seo";
import { articleStories } from "../data/sectionPageData";
import { getNewsArticle } from "../hooks/useNews";
import { categoryPath } from "../utils/categoryPath";
import { shortStoryPath } from "../utils/storyPath";

function staticArticle(key) {
  if (key === "featured") return articleStories[0];
  if (key.startsWith("story-")) return articleStories[Number(key.replace("story-", ""))] || null;
  return null;
}

export default function FeatureArticlePage() {
  const { storyKey } = useParams();
  const location = useLocation();
  const fallback = staticArticle(storyKey);
  const [article, setArticle] = useState(fallback);
  const [error, setError] = useState("");

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

  return <main className="bg-white px-5 py-5 sm:px-6 sm:py-8 lg:py-9">
    <Seo title={article.title} description={article.summary || article.title} canonicalPath={canonicalPath} image={article.image} type="article" schema={articleSchema} />
    <article className="mx-auto max-w-[1280px]">
      <nav className="mb-3 flex flex-wrap items-center gap-2 text-[12px] font-medium text-[#69717a] sm:mb-5 sm:text-[13px]" aria-label="Breadcrumb">
        <Link className="text-[#182536] hover:text-[#397d73]" to="/">Home</Link><span className="-rotate-90 [&_svg]:size-3" aria-hidden="true"><Icon name="chevron" /></span>
        <Link className="text-[#182536] hover:text-[#397d73]" to="/articles">Articles</Link><span className="-rotate-90 [&_svg]:size-3" aria-hidden="true"><Icon name="chevron" /></span>
        <Link className="text-[#182536] hover:text-[#397d73]" to={categoryPath(article.category, "articles")}>{article.category}</Link>
      </nav>
      <div className="w-full">
        <div className="min-w-0">
          <header className="max-w-[860px]">
            <h1 className="story-headline article-display-font story-detail-headline">{article.title}</h1>
            {article.summary && <p className="mt-4 mb-0 max-w-[820px] text-[17px] leading-[1.6] text-[#39424a] sm:mt-5 sm:text-[18px] lg:text-[20px]">{article.summary}</p>}
            <div className="mt-5"><ArticleMeta author={article.author || "Chinlung Today"} date={article.date} readTime={article.readTime || article.time || "5 min read"} /></div>
            <div className="mt-5"><ShareStoryButton story={article} /></div>
          </header>
          <div className="mt-7 sm:mt-9"><ArticleImage story={article} /></div>
          <div className="article-reading-text story-reading-text mt-8 max-w-[760px] text-[#111318] sm:mt-10">{paragraphs.map((paragraph, index) => <p className={index === 0 ? "mt-0" : "mt-6"} key={`${index}-${paragraph.slice(0, 30)}`}>{paragraph}</p>)}</div>
          <footer className="mt-12 max-w-[760px] pt-2"><Link className="inline-flex rounded-full bg-[#182536] px-5 py-3 text-xs font-bold text-white" to="/articles">View all articles</Link></footer>
        </div>
      </div>
    </article>
  </main>;
}
