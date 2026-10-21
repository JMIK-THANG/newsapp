import { Link } from "react-router-dom";
import useNews from "../../hooks/useNews";
import Icon from "../ui/Icon";
import { shortStoryPath } from "../../utils/storyPath";
import HomeStoryMeta from "./HomeStoryMeta";

export default function LatestArticles() {
  const { news: articles, isLoading } = useNews({ contentType: "article" });
  const latestArticles = articles.slice(0, 4);

  if (isLoading) return null;
  if (latestArticles.length === 0) return null;

  return (
    <section className="border-t border-[#d5d1c9] bg-[#f1eee8] px-3 py-10 md:px-6 md:py-14" aria-labelledby="latest-articles-title">
      <div className="mx-auto max-w-[1200px]">
        <header className="mb-4 flex items-center gap-4">
          <h2 id="latest-articles-title" className="home-section-title article-display-font m-0 text-[21px] leading-tight text-[#182536]">Articles</h2>
          <span className="h-px min-w-4 flex-1 bg-[#182536]" aria-hidden="true" />
          <Link className="inline-flex min-h-10 shrink-0 items-center gap-2 text-[12px] font-semibold text-[#397d73] underline-offset-4 hover:underline focus-visible:outline-2 focus-visible:outline-offset-3" to="/articles">View all articles <Icon name="arrow" /></Link>
        </header>

        <div className="grid gap-x-5 gap-y-8 sm:grid-cols-2 xl:grid-cols-4">
          {latestArticles.map((article) => (
            <article className="mobile-story-preview group min-w-0" key={article.id || article.slug}>
              <Link className="block aspect-[16/10] overflow-hidden bg-[#ddd9d1]" to={shortStoryPath(article)}>
                <img className="h-full w-full object-cover transition duration-500 group-hover:scale-[1.025]" src={article.image} alt={article.imageAlt} />
              </Link>
              <div className="border-b border-[#c8c3ba] py-4">
                <p className="story-category-label mb-2  leading-[1.4]   text-[#397d73]  ">{article.category}</p>
                <h3 className="home-card-title story-headline article-display-font m-0 line-clamp-3" title={article.title}>
                  <Link to={shortStoryPath(article)}>{article.title}</Link>
                </h3>
                <p className="home-card-preview home-story-summary mt-3 mb-0 line-clamp-2">{article.summary}</p>
                <HomeStoryMeta story={article} className="mt-4 mb-0" />
              </div>
            </article>
          ))}
        </div>

      </div>
    </section>
  );
}
