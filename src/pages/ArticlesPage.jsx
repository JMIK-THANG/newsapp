import { Link, useParams } from "react-router-dom";
import useNews from "../hooks/useNews";
import StoryLoading from "../components/news/StoryLoading";
import { shortStoryPath } from "../utils/storyPath";

export default function ArticlesPage() {
  const { categorySlug } = useParams();
  const { news: publishedArticles, isLoading, error } = useNews({ contentType: "article" });
  const categoryName = categorySlug === "news-articles" ? "News Article" : categorySlug === "cahram" ? "Cahram" : "";
  const availableArticles = publishedArticles;
  const allArticles = categoryName
    ? availableArticles.filter((article) => article.category === categoryName)
    : availableArticles;
  const pathFor = (article, index) => /^\d+$/.test(String(article.id ?? ""))
    ? shortStoryPath(article)
    : article.slug ? `/articles/${article.slug}` : index === 0 ? "/articles/featured" : `/articles/story-${index}`;

  return (
    <main className="bg-[#f1eee8] px-3 py-4 md:px-6 md:py-5">
      <div className="mx-auto max-w-[1280px]">
        <header className="grid gap-3 border-b border-[#c8c6c0] pt-1 pb-4 md:grid-cols-[1fr_1fr] md:items-end">
          <h1 className="article-display-font m-0 text-[clamp(28px,3.5vw,38px)] leading-[1.1] font-medium tracking-[-.025em] text-[#182536]">{categoryName === "News Article" ? "News Articles" : categoryName || "Articles"}</h1>
          <p className="m-0 max-w-xl text-[14px] leading-6 text-[#4f5359] md:justify-self-end">
            {categoryName === "Cahram" ? "Cahram writing published for thoughtful, deeper reading." : categoryName === "News Article" ? "News features and analysis that go beyond the daily headline." : "Features, profiles, essays, and analysis written for slower, deeper reading."}
          </p>
        </header>

        <section className="pt-4" aria-labelledby="all-articles-title">
          <div className="mb-4 flex items-end justify-between border-b border-[#c8c6c0] pb-2">
            <h2 id="all-articles-title" className="article-display-font m-0 text-[19px] font-medium">{categoryName === "News Article" ? "All News Articles" : categoryName ? `All ${categoryName}` : "All articles"}</h2>
            {!isLoading && !error && <span className="text-xs text-[#5f6368]">{allArticles.length} published</span>}
          </div>

          {isLoading && <StoryLoading />}
          {!isLoading && error && <p className="py-10 text-center text-sm text-[#8a3030]" role="alert">{error}</p>}
          <div className="grid gap-x-6 gap-y-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {!isLoading && !error && allArticles.map((article, index) => (
              <article className="mobile-story-preview group grid min-w-0 grid-cols-[116px_minmax(0,1fr)] gap-4 border-b border-[#c8c6c0] py-4 sm:block sm:border-0 sm:py-0" key={article.id || article.title}>
                <Link className="block aspect-[4/3] overflow-hidden rounded-sm bg-[#ddd9d1] sm:aspect-[16/10]" to={pathFor(article, index)}>
                  <img
                    className="h-full w-full object-cover transition duration-500 group-hover:scale-[1.025]"
                    src={article.image}
                    alt={article.imageAlt}
                  />
                </Link>
                <div className="min-w-0 sm:border-b sm:border-[#c8c6c0] sm:py-4">
                  <p className="story-category-label mb-1.5  leading-[1.4]   text-[#397d73]  sm:mb-2 ">{article.category || "Article"}</p>
                  <h3 className="story-headline article-display-font m-0 text-[18px] leading-[1.25] tracking-[-.01em] lg:text-[20px]">
                    <Link to={pathFor(article, index)}>{article.title}</Link>
                  </h3>
                  <p className="mt-2 mb-0 text-[12px] font-normal text-[#69717a]">{article.date}</p>
                  <p className="mt-2 hidden line-clamp-3 text-[14px] leading-[1.6] text-[#303940] sm:block">{article.summary}</p>
                  <p className="mt-2 text-[12px] text-[#69717a] sm:mt-3 sm:font-semibold">By {article.author || "Chinlung Today"}</p>
                </div>
              </article>
            ))}
          </div>
          {!isLoading && !error && allArticles.length === 0 && <div className="border-b border-[#c8c6c0] py-16 text-center"><h3 className="m-0 font-serif text-2xl">No {categoryName.toLowerCase() || "articles"} published yet</h3><p className="mt-3 mb-0 text-sm text-[#5f6368]">New articles selected for this section will appear here.</p></div>}
        </section>
      </div>
    </main>
  );
}
