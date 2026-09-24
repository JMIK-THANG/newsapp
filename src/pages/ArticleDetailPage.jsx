import Icon from "../components/ui/Icon";
import { explainerSourceStory, latestStories, leadStory, mostReadStories, newsPageStories, quickReads } from "../data/news";
import { articleStories, businessStories, editorialStories, sportsStories } from "../data/sectionPageData";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { getNewsArticle, getRelatedNewsArticles } from "../hooks/useNews";
import { shortStoryPath } from "../utils/storyPath";
import ShareStoryButton from "../components/ui/ShareStoryButton";

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
  if (storyKey.startsWith("story-")) {
    const index = Number(storyKey.replace("story-", ""));
    return stories[index] || stories[0];
  }
  return section === "news" || section === "articles" ? null : stories[0];
}

const storyRouteKey = (stories, story) => {
  const index = stories.indexOf(story);
  return index === 0 ? "featured" : `story-${index}`;
};

const cleanArticleParagraph = (paragraph, story) => paragraph
  .split(/\r?\n/)
  .map((line) => line.trim())
  .filter((line) => {
    if (!line) return false;
    const normalizedLine = line.toLocaleLowerCase().replace(/\s+/g, " ");
    const normalizedTitle = story.title.toLocaleLowerCase().replace(/\s+/g, " ");
    const publicationDateLine = /^(?:by\s+)?chinlung today(?:\s+newsroom)?(?:\s*[|/·•:—–-]\s*(?:january|february|march|april|may|june|july|august|september|october|november|december)\s+\d{1,2},?\s+\d{4})?\.?$/i;
    const standaloneDateLine = /^(?:published\s*:?[ ]*)?(?:january|february|march|april|may|june|july|august|september|october|november|december)\s+\d{1,2},?\s+\d{4}\.?$/i;
    if (normalizedLine === normalizedTitle) return false;
    if (publicationDateLine.test(line) || standaloneDateLine.test(line)) return false;
    if (story.date && normalizedLine === story.date.toLocaleLowerCase()) return false;
    return true;
  })
  .join("\n")
  .trim();

export default function ArticleDetailPage({ section }) {
  const { storyKey } = useParams();
  const stories = sectionStories[section];
  const staticStory = findStory(section, stories, storyKey);
  const [databaseStory, setDatabaseStory] = useState(null);
  const [databaseRelated, setDatabaseRelated] = useState([]);
  const [loadError, setLoadError] = useState("");
  const story = databaseStory || staticStory;
  const sectionName = sectionNames[section];
  useEffect(() => {
    if (!["news", "articles"].includes(section) || staticStory) return;

    getNewsArticle(storyKey)
      .then(setDatabaseStory)
      .catch((error) => setLoadError(error.message));
  }, [section, staticStory, storyKey]);

  useEffect(() => {
    if (!databaseStory) return;
    getRelatedNewsArticles(databaseStory.slug)
      .then(setDatabaseRelated)
      .catch(() => setDatabaseRelated([]));
  }, [databaseStory]);

  if (!story) {
    return <main className="min-h-[60vh] bg-white px-6 py-16 text-center"><h1 className="font-serif text-4xl">{loadError || "Loading article…"}</h1><Link className="mt-5 inline-block underline" to="/news">Return to Latest News</Link></main>;
  }

  const related = databaseStory
    ? databaseRelated
    : stories.filter((item) => item.title !== story.title).slice(0, 3);
  const summary = story.summary || `A closer look at ${story.title.toLowerCase()}, why readers are following it, and what may happen next.`;
  const publishedDate = story.date || "August 26, 2026";
  const articleParagraphs = story.content?.length
    ? story.content.map((paragraph) => cleanArticleParagraph(paragraph, story)).filter(Boolean)
    : [summary];

  return (
    <main className="bg-white px-3 py-9 md:px-6 md:py-12">
      <article className="mx-auto max-w-[1380px]">
        <div className="mx-auto mb-4 flex w-fit max-w-full flex-nowrap items-center justify-center gap-4 border-b border-[#dcdde0] px-2 pb-3">
          <nav className="flex items-center gap-2.5 text-[14px] font-normal text-[#5f6368]" aria-label="Breadcrumb"><Link className="transition hover:text-[#111318]" to="/">Home</Link><span className="text-[#9aa0a6]">/</span><Link className="transition hover:text-[#111318]" to={`/${section}`}>{sectionName}</Link></nav>
          <p className="m-0 rounded-full bg-[#e7efec] px-3 py-1.5 text-right text-[11px] font-semibold tracking-[.05em] text-[#397d73] uppercase">{story.category}</p>
        </div>

        <header className="mx-auto max-w-[800px] text-center">
          <h1 className="m-0 font-serif text-[clamp(28px,3.6vw,42px)] leading-[1.14] tracking-[-.025em] text-[#0c0c0c]">{story.title}</h1>
          <div className="mt-4 flex flex-wrap items-center justify-center gap-x-3 gap-y-1 text-[11px] text-[#5f6368]"><span>By <strong className="font-semibold text-[#111318]">{story.author || authors[section]}</strong></span><span>•</span><span>{publishedDate}</span><span>•</span><span>{story.time || "6 min read"}</span></div>
          <div className="mt-5"><ShareStoryButton story={story} /></div>
        </header>

        <figure className="my-7 md:my-8"><img className="max-h-[820px] w-full bg-[#e8e4dc] object-contain" src={story.image} alt={story.imageAlt} /><figcaption className="mt-2 text-[10px] text-[#5f6368]">{story.imageCredit || "Reporting and photography for Chinlung Today."}</figcaption></figure>

        <div className="mx-auto max-w-[760px]">
          <div className="article-reading-text border-t border-[#dcdde0] pt-7 text-[#0c0c0c]">
            {articleParagraphs.map((paragraph, index) => {
              const isNumberedItem = /^\d+[.)]\s/.test(paragraph);
              const isColorKey = /^[🔴🟢🔵]/u.test(paragraph);
              const isShortHeading = paragraph.length < 90 && !/[.!?]$/.test(paragraph) && index > 0;

              if (isShortHeading) return <h2 className="mt-10 mb-3 font-serif text-[28px] leading-tight tracking-[-.02em] text-[#111318] lg:text-[34px]" key={`${index}-${paragraph}`}>{paragraph}</h2>;
              if (isNumberedItem) return <p className="my-3 border-l-2 border-[#4f9488] py-1 pl-4" key={`${index}-${paragraph}`}>{paragraph}</p>;
              if (isColorKey) return <p className="my-4 bg-[#f1eee8] px-4 py-3 text-[16px] leading-7 lg:text-[19px] lg:leading-8" key={`${index}-${paragraph}`}>{paragraph}</p>;
              return <p className={`${index === 0 ? "mt-0" : "mt-5"} mb-0 whitespace-pre-line`} key={`${index}-${paragraph}`}>{paragraph}</p>;
            })}
            {story.sources && <aside className="mt-10 border-t border-[#dcdde0] pt-5"><h2 className="mt-0 mb-3 text-sm font-semibold text-[#111318]">Sources and further reading</h2><ul className="m-0 space-y-2 pl-5 text-sm leading-6">{story.sources.map((source) => <li key={source.url}><a className="text-[#397d73] underline underline-offset-3" href={source.url} target="_blank" rel="noreferrer">{source.label}</a></li>)}</ul></aside>}
          </div>
        </div>
      </article>

      {(!databaseStory || related.length > 0) && <section className="mx-auto mt-14 max-w-[1380px] border-t-2 border-[#111318] pt-6" aria-labelledby="related-title">
        <div className="mb-5 flex items-end justify-between gap-4"><div><h2 id="related-title" className="m-0 text-[28px] font-semibold">Related News</h2><p className="mt-1 mb-0 text-sm text-[#5f6368]">Stories connected to this report</p></div><Link className="flex items-center gap-2 text-sm font-medium" to={`/${section}`}>View section <Icon name="arrow" /></Link></div>
        {related.length > 0 && <div className="grid gap-6 sm:grid-cols-3">{related.map((item) => { const relatedKey = section === "news" ? `article-${stories.indexOf(item) + 1}` : storyRouteKey(stories, item); const relatedPath = databaseStory ? shortStoryPath(item) : section === "news" ? `/news/story/${relatedKey}` : `/${section}/${relatedKey}`; return <article key={item.id || item.title}><Link className="mb-3 block aspect-[16/9] overflow-hidden bg-[#e8edf2]" to={relatedPath}><img className="h-full w-full object-cover" src={item.image} alt={item.imageAlt} /></Link><p className="mb-2 text-[13px] font-semibold text-[#4f9488] uppercase">{item.category}</p><h3 className="m-0 line-clamp-3 font-serif text-[21px] leading-[1.25] font-semibold text-[#111318] md:text-[24px]" title={item.title}><Link to={relatedPath}>{item.title}</Link></h3><p className="mt-2 mb-0 text-[13px] font-normal text-[#69717a]">{item.date}</p></article>; })}</div>}
      </section>}
    </main>
  );
}
