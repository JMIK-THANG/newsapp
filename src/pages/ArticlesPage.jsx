import { Link, useParams } from "react-router-dom";
import useNews from "../hooks/useNews";
import { articleStories } from "../data/sectionPageData";

export default function ArticlesPage() {
  const { categorySlug } = useParams();
  const { news: publishedArticles } = useNews({ contentType: "article" });
  const categoryName = categorySlug === "news-articles" ? "News Article" : categorySlug === "cahram" ? "Cahram" : "";
  const availableArticles = publishedArticles.length ? publishedArticles : categoryName ? [] : articleStories;
  const allArticles = categoryName
    ? availableArticles.filter((article) => article.category === categoryName)
    : availableArticles;
  const pathFor = (article, index) =>
    article.slug ? `/articles/${article.slug}` : index === 0 ? "/articles/featured" : `/articles/story-${index}`;

  return (
    <main className="bg-[#f1eee8] px-3 py-7 md:px-6 md:py-10">
      <div className="mx-auto max-w-[1320px]">
        <header className="grid gap-4 border-y border-[#182536] py-5 md:grid-cols-[1fr_1fr] md:items-end">
          <div>
            <p className="mb-2 text-[10px] font-bold tracking-[.16em] text-[#4f9488] uppercase">The Chinlung Review</p>
            <h1 className="m-0 font-serif text-[clamp(42px,6vw,72px)] leading-[.9] tracking-[-.05em] text-[#182536]">{categoryName === "News Article" ? "News Articles" : categoryName || "Articles"}</h1>
          </div>
          <p className="m-0 max-w-xl text-[14px] leading-6 text-[#4f5359] md:justify-self-end">
            {categoryName === "Cahram" ? "Cahram writing published for thoughtful, deeper reading." : categoryName === "News Article" ? "News features and analysis that go beyond the daily headline." : "Features, profiles, essays, and analysis written for slower, deeper reading."}
          </p>
        </header>

        <section className="pt-7" aria-labelledby="all-articles-title">
          <div className="mb-5 flex items-end justify-between border-b border-[#c8c6c0] pb-3">
            <h2 id="all-articles-title" className="m-0 font-serif text-2xl">{categoryName === "News Article" ? "All News Articles" : categoryName ? `All ${categoryName}` : "All articles"}</h2>
            <span className="text-xs text-[#5f6368]">{allArticles.length} published</span>
          </div>

          <div className="grid gap-x-6 gap-y-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {allArticles.map((article, index) => (
              <article className="group min-w-0" key={article.id || article.title}>
                <Link className="block aspect-[16/10] overflow-hidden rounded-sm bg-[#ddd9d1]" to={pathFor(article, index)}>
                  <img
                    className="h-full w-full object-cover transition duration-500 group-hover:scale-[1.025]"
                    src={article.image}
                    alt={article.imageAlt}
                  />
                </Link>
                <div className="border-b border-[#c8c6c0] py-4">
                  <p className="mb-2 text-[12px] font-bold tracking-[.1em] text-[#4f9488] uppercase">
                    {article.category || "Article"} · {article.date}
                  </p>
                  <h3 className="m-0 font-serif text-[clamp(21px,2vw,27px)] leading-[1.12] tracking-[-.025em]">
                    <Link to={pathFor(article, index)}>{article.title}</Link>
                  </h3>
                  <p className="mt-3 line-clamp-3 text-[15px] leading-6 text-[#4f5359]">{article.summary}</p>
                  <p className="mt-3 text-[12px] font-semibold">By {article.author || "Chinlung Today"}</p>
                </div>
              </article>
            ))}
          </div>
          {allArticles.length === 0 && <div className="border-b border-[#c8c6c0] py-16 text-center"><h3 className="m-0 font-serif text-2xl">No {categoryName.toLowerCase()} published yet</h3><p className="mt-3 mb-0 text-sm text-[#5f6368]">New articles selected for this section will appear here.</p></div>}
        </section>
      </div>
    </main>
  );
}
