import Icon from "../components/ui/Icon";
import { mostReadStories, newsPageStories } from "../data/news";
import { articleStories, businessStories, editorialStories, sportsStories } from "../data/sectionPageData";

const sectionStories = { news: newsPageStories, editorial: editorialStories, articles: articleStories, sports: sportsStories, business: businessStories };
const sectionNames = { news: "News", editorial: "Editorial", articles: "Articles", sports: "Sports", business: "Business" };
const authors = { news: "Chinlung Today Newsroom", editorial: "Chinlung Today Editorial Board", articles: "Lian Hmung", sports: "Daniel Kima", business: "Sang Boih" };

function findStory(section, stories, storyKey) {
  if (section === "news" && storyKey.startsWith("article-")) return stories[Number(storyKey.replace("article-", "")) - 1] || stories[0];
  if (section === "news" && storyKey.startsWith("popular-")) return mostReadStories[Number(storyKey.replace("popular-", "")) - 1] || mostReadStories[0];
  if (storyKey === "featured") return stories[0];
  const index = Number(storyKey.replace("story-", ""));
  return stories[index] || stories[0];
}

const storyRouteKey = (stories, story) => {
  const index = stories.indexOf(story);
  return index === 0 ? "featured" : `story-${index}`;
};

export default function ArticleDetailPage({ section, storyKey }) {
  const stories = sectionStories[section];
  const story = findStory(section, stories, storyKey);
  const sectionName = sectionNames[section];
  const related = stories.filter((item) => item.title !== story.title).slice(0, 3);
  const summary = story.summary || `A closer look at ${story.title.toLowerCase()}, why readers are following it, and what may happen next.`;
  const publishedDate = story.date || "August 26, 2026";

  return (
    <main className="bg-white px-3 py-9 md:px-6 md:py-12">
      <article className="mx-auto max-w-[1100px]">
        <nav className="mb-8 flex items-center gap-2 text-[11px] font-medium text-[#5f6368]" aria-label="Breadcrumb"><a className="hover:text-[#111318]" href="#top">Home</a><span>/</span><a className="hover:text-[#111318]" href={`#/${section}`}>{sectionName}</a></nav>

        <header className="mx-auto max-w-[900px] text-center">
          <p className="mb-4 text-[11px] font-semibold tracking-[.06em] text-[#5f6368] uppercase">{story.category}</p>
          <h1 className="m-0 font-serif text-[clamp(38px,6vw,68px)] leading-[1.02] tracking-[-.045em] text-[#111318]">{story.title}</h1>
          <p className="mx-auto mt-5 mb-0 max-w-2xl text-[16px] leading-7 text-[#4f5359]">{summary}</p>
          <div className="mt-6 flex flex-wrap items-center justify-center gap-x-3 gap-y-1 text-[11px] text-[#5f6368]"><span>By <strong className="font-semibold text-[#111318]">{story.author || authors[section]}</strong></span><span>•</span><span>{publishedDate}</span><span>•</span><span>{story.time || "6 min read"}</span></div>
        </header>

        <figure className="my-9"><img className="aspect-[16/8.5] w-full object-cover" src={story.image} alt={story.imageAlt} /><figcaption className="mt-2 text-[10px] text-[#5f6368]">Reporting and photography for Chinlung Today.</figcaption></figure>

        <div className="mx-auto grid max-w-[900px] gap-8 lg:grid-cols-[120px_1fr]">
          <aside><p className="m-0 border-t border-[#111318] pt-3 text-[10px] font-semibold tracking-[.08em] uppercase">Share this story</p></aside>
          <div className="text-[17px] leading-8 text-[#292c31]">
            <p className="mt-0 first-letter:float-left first-letter:mr-2 first-letter:font-serif first-letter:text-6xl first-letter:leading-[.82]">{summary} The issue reaches beyond a single announcement or moment. It reflects broader changes already affecting institutions, families, and communities in visible and less visible ways.</p>
            <p>People closest to the story describe a situation that requires patience, reliable information, and careful attention to local experience. Their accounts add context that can be lost when events are reduced to a headline.</p>
            <h2 className="mt-10 mb-4 font-serif text-[30px] leading-tight tracking-[-.025em] text-[#111318]">What happens next</h2>
            <p>Questions remain about implementation, access, and long-term impact. Officials and community leaders say the next phase will depend on transparent decisions and meaningful public participation.</p>
            <p>Chinlung Today will continue following the story, verifying new information, and explaining what developments mean for readers locally and around the world.</p>
          </div>
        </div>
      </article>

      <section className="mx-auto mt-14 max-w-[1100px] border-t-2 border-[#111318] pt-6" aria-labelledby="related-title">
        <div className="mb-5 flex items-center justify-between"><h2 id="related-title" className="m-0 text-2xl font-bold">More from {sectionName}</h2><a className="flex items-center gap-2 text-xs font-semibold" href={`#/${section}`}>View section <Icon name="arrow" /></a></div>
        <div className="grid gap-6 sm:grid-cols-3">{related.map((item) => { const relatedKey = section === "news" ? `article-${stories.indexOf(item) + 1}` : storyRouteKey(stories, item); return <article key={item.title}><a className="mb-3 block aspect-[16/9] overflow-hidden bg-[#e8edf2]" href={`#/${section}/${relatedKey}`}><img className="h-full w-full object-cover" src={item.image} alt={item.imageAlt} /></a><h3 className="m-0 text-base leading-[1.3] font-semibold"><a href={`#/${section}/${relatedKey}`}>{item.title}</a></h3></article>; })}</div>
      </section>
    </main>
  );
}
