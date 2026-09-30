import { useEffect, useState } from "react";
import { Link, useLocation, useParams } from "react-router-dom";
import ArticleImage from "../components/article/ArticleImage";
import ArticleMeta from "../components/article/ArticleMeta";
import ArticleRecommendations from "../components/article/ArticleRecommendations";
import Icon from "../components/ui/Icon";
import ShareStoryButton from "../components/ui/ShareStoryButton";
import Seo, { SITE_NAME, SITE_URL } from "../components/seo/Seo";
import { explainerSourceStory, latestStories, leadStory, mostReadStories, newsPageStories, quickReads } from "../data/news";
import { articleStories, businessStories, editorialStories, sportsStories } from "../data/sectionPageData";
import { getNewsArticle, getRelatedNewsArticles } from "../hooks/useNews";
import { categoryPath } from "../utils/categoryPath";
import { shortStoryPath } from "../utils/storyPath";

const sectionStories = { news: newsPageStories, editorial: editorialStories, articles: articleStories, sports: sportsStories, business: businessStories };
const sectionNames = { news: "News", editorial: "Editorial", articles: "Articles", sports: "Sports", business: "Business" };
const authors = { news: "Chinlung Today Newsroom", editorial: "Chinlung Today Editorial Board", articles: "Lian Hmung", sports: "Daniel Kima", business: "Sang Boih" };

function findStory(section, stories, storyKey) {
  if (section === "news" && storyKey === leadStory.slug) return leadStory;
  if (section === "news" && storyKey === explainerSourceStory.slug) return explainerSourceStory;
  if (section === "news") {
    const quickRead = quickReads.find((story) => story.slug === storyKey);
    if (quickRead) return quickRead;
    const editorsPick = latestStories.find((story) => story.slug === storyKey);
    if (editorsPick) return editorsPick;
  }
  if (section === "news" && storyKey.startsWith("article-")) return stories[Number(storyKey.replace("article-", "")) - 1] || stories[0];
  if (section === "news" && storyKey.startsWith("popular-")) return mostReadStories[Number(storyKey.replace("popular-", "")) - 1] || mostReadStories[0];
  if (storyKey === "featured") return stories[0];
  if (storyKey.startsWith("story-")) return stories[Number(storyKey.replace("story-", ""))] || stories[0];
  return null;
}

const cleanArticleParagraph = (paragraph, story) => paragraph.split(/\r?\n/).map((line) => line.trim()).filter((line) => {
  if (!line) return false;
  const normalizedLine = line.toLocaleLowerCase().replace(/\s+/g, " ");
  const normalizedTitle = story.title.toLocaleLowerCase().replace(/\s+/g, " ");
  const normalizedSummary = story.summary?.toLocaleLowerCase().replace(/\s+/g, " ");
  const publicationDateLine = /^(?:by\s+)?chinlung today(?:\s+newsroom)?(?:\s*[|/·•:—–-]\s*(?:january|february|march|april|may|june|july|august|september|october|november|december)\s+\d{1,2},?\s+\d{4})?\.?$/i;
  const standaloneDateLine = /^(?:published\s*:?[ ]*)?(?:january|february|march|april|may|june|july|august|september|october|november|december)\s+\d{1,2},?\s+\d{4}\.?$/i;
  return normalizedLine !== normalizedTitle && (!normalizedSummary || normalizedLine !== normalizedSummary) && !publicationDateLine.test(line) && !standaloneDateLine.test(line) && (!story.date || normalizedLine !== story.date.toLocaleLowerCase());
}).join("\n").trim();

function staticStoryPath(section, stories, item) {
  if (item.slug) return shortStoryPath(item);
  const index = stories.indexOf(item);
  if (section === "news") return `/news/story/article-${index + 1}`;
  return `/${section}/${index === 0 ? "featured" : `story-${index}`}`;
}

export default function ArticleDetailPage({ section }) {
  const { storyKey } = useParams();
  const location = useLocation();
  const stories = sectionStories[section];
  const staticStory = findStory(section, stories, storyKey);
  const [databaseStory, setDatabaseStory] = useState(null);
  const [databaseRelated, setDatabaseRelated] = useState([]);
  const [loadError, setLoadError] = useState("");
  const story = databaseStory || staticStory;

  useEffect(() => {
    if (staticStory) return;
    getNewsArticle(storyKey).then(setDatabaseStory).catch((error) => setLoadError(error.message));
  }, [staticStory, storyKey]);

  useEffect(() => {
    if (!databaseStory) return;
    getRelatedNewsArticles(databaseStory.slug).then(setDatabaseRelated).catch(() => setDatabaseRelated([]));
  }, [databaseStory]);

  if (!story) return <main className="min-h-[60vh] bg-white px-6 py-16 text-center"><h1 className="font-serif text-4xl">{loadError || "Loading article…"}</h1><Link className="mt-5 inline-block underline" to="/news">Return to Latest News</Link></main>;

  const relatedSource = databaseStory ? databaseRelated : stories;
  const related = relatedSource.filter((item) => item.category === story.category).filter((item) => String(item.id) !== String(story.id) && item.title !== story.title).slice(0, 4).map((item) => ({ ...item, path: databaseStory ? shortStoryPath(item) : staticStoryPath(section, stories, item) }));
  const summary = story.summary || `A closer look at ${story.title.toLowerCase()}, why readers are following it, and what may happen next.`;
  const articleParagraphs = story.content?.length ? story.content.map((paragraph) => cleanArticleParagraph(paragraph, story)).filter(Boolean) : [summary];

  const recommendations = (className) => <ArticleRecommendations className={className} category={story.category} stories={related} seeAllPath={categoryPath(story.category, section)} />;
  const canonicalPath = databaseStory ? shortStoryPath(story) : location.pathname;
  const canonicalUrl = `${SITE_URL}${canonicalPath}`;
  const articleSchema = {
    "@context": "https://schema.org",
    "@type": story.content_type === "article" ? "Article" : "NewsArticle",
    headline: story.title,
    description: summary,
    ...(story.image ? { image: [story.image] } : {}),
    ...(story.publishedAt || story.published_at ? { datePublished: story.publishedAt || story.published_at } : {}),
    ...(story.updated_at ? { dateModified: story.updated_at } : {}),
    ...(story.author ? { author: { "@type": "Person", name: story.author } } : {}),
    publisher: { "@type": "NewsMediaOrganization", name: SITE_NAME, logo: { "@type": "ImageObject", url: `${SITE_URL}/chinlung-today-logo.png` } },
    mainEntityOfPage: { "@type": "WebPage", "@id": canonicalUrl },
  };

  return <main className="bg-white px-4 py-5 sm:px-5 sm:py-8 lg:px-6 lg:py-10">
    <Seo title={story.title} description={summary} canonicalPath={canonicalPath} image={story.image} type="article" schema={articleSchema} />
    <article className="mx-auto max-w-[1380px]">
      <nav className="mb-3 flex flex-wrap items-center gap-2 text-[12px] font-medium text-[#69717a] sm:mb-5 sm:text-[13px]" aria-label="Breadcrumb">
        <Link className="text-[#182536] hover:text-[#397d73]" to="/">Home</Link><span className="-rotate-90 [&_svg]:size-3" aria-hidden="true"><Icon name="chevron" /></span>
        <Link className="text-[#182536] hover:text-[#397d73]" to={`/${section}`}>{sectionNames[section]}</Link><span className="-rotate-90 [&_svg]:size-3" aria-hidden="true"><Icon name="chevron" /></span>
        <Link className="text-[#182536] hover:text-[#397d73]" to={categoryPath(story.category, section)}>{story.category}</Link>
      </nav>
      <div className="grid gap-12 xl:grid-cols-[minmax(0,1fr)_320px] xl:items-start xl:gap-14">
        <div className="min-w-0">
          <header className="max-w-[860px]">
            <h1 className="article-display-font story-detail-headline">{story.title}</h1>
            <p className="mt-4 mb-0 max-w-[820px] text-[17px] leading-[1.6] text-[#39424a] sm:mt-5 sm:text-[18px] lg:text-[20px]">{summary}</p>
            <div className="mt-5"><ArticleMeta author={story.author || authors[section]} date={story.date || "August 26, 2026"} readTime={story.readTime || story.time || "6 min read"} /></div>
            <div className="mt-5"><ShareStoryButton story={story} /></div>
          </header>
          <div className="mt-7 sm:mt-9"><ArticleImage story={story} /></div>
          <div className="article-reading-text story-reading-text mt-8 max-w-[760px] text-[#111318] sm:mt-10">
            {articleParagraphs.map((paragraph, index) => {
              const isNumberedItem = /^\d+[.)]\s/.test(paragraph);
              const isColorKey = /^[🔴🟢🔵]/u.test(paragraph);
              const isShortHeading = paragraph.length < 90 && !/[.!?]$/.test(paragraph) && index > 0;
              if (isShortHeading) return <h2 className="mt-10 mb-4 text-[28px] leading-tight font-bold tracking-[-.02em] lg:text-[36px]" key={`${index}-${paragraph}`}>{paragraph}</h2>;
              if (isNumberedItem) return <p className="my-3 border-l-2 border-[#4f9488] py-1 pl-4" key={`${index}-${paragraph}`}>{paragraph}</p>;
              if (isColorKey) return <p className="my-4 bg-[#f1eee8] px-4 py-3" key={`${index}-${paragraph}`}>{paragraph}</p>;
              return <p className={`${index === 0 ? "mt-0" : "mt-6"} mb-0 whitespace-pre-line`} key={`${index}-${paragraph}`}>{paragraph}</p>;
            })}
            {story.sources && <aside className="mt-10 border-t border-[#dcdde0] pt-5"><h2 className="mt-0 mb-3 text-sm font-semibold">Sources and further reading</h2><ul className="m-0 space-y-2 pl-5 text-sm leading-6">{story.sources.map((source) => <li key={source.url}><a className="text-[#397d73] underline underline-offset-3" href={source.url} target="_blank" rel="noreferrer">{source.label}</a></li>)}</ul></aside>}
          </div>
          {recommendations("mt-14 xl:hidden")}
        </div>
        {recommendations("hidden xl:sticky xl:top-[118px] xl:block xl:pt-1")}
      </div>
    </article>
  </main>;
}
