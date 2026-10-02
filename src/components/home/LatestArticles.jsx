import { Link } from "react-router-dom";
import useNews from "../../hooks/useNews";
import Icon from "../ui/Icon";
import { shortStoryPath } from "../../utils/storyPath";

export default function LatestArticles() {
  const { news: articles, isLoading } = useNews({ contentType: "article" });
  const latestArticles = articles.slice(0, 4);

  if (isLoading) return null;
  if (latestArticles.length === 0) return null;

  return (
    <section className="border-t border-[#d5d1c9] bg-[#f1eee8] px-3 py-10 md:px-6 md:py-14" aria-labelledby="latest-articles-title">
      <div className="mx-auto max-w-[1480px]">
        <header className="mb-6 flex items-end justify-between gap-5 border-b border-[#182536] pb-4">
          <h2 id="latest-articles-title" className="article-display-font m-0 inline-flex items-center gap-2 text-[24px] leading-tight font-semibold tracking-[-.02em] text-[#182536] after:h-px after:w-9 after:bg-[#4f9488]">Articles</h2>
          <Link className="hidden items-center gap-2 text-[11px] font-bold tracking-[.05em] uppercase sm:flex" to="/articles">View all articles <Icon name="arrow" /></Link>
        </header>

        <div className="grid gap-x-5 gap-y-8 sm:grid-cols-2 xl:grid-cols-4">
          {latestArticles.map((article) => (
            <article className="group min-w-0" key={article.id || article.slug}>
              <Link className="block aspect-[16/10] overflow-hidden bg-[#ddd9d1]" to={shortStoryPath(article)}>
                <img className="h-full w-full object-cover transition duration-500 group-hover:scale-[1.025]" src={article.image} alt={article.imageAlt} />
              </Link>
              <div className="border-b border-[#c8c3ba] py-4">
                <p className="mb-2 text-[13px] font-bold tracking-[.06em] text-[#397d73] uppercase">{article.category}</p>
                <h3 className="article-display-font m-0 line-clamp-3 text-[20px] leading-[1.16] font-semibold tracking-[-.005em] text-[#111318] xl:text-[21px]" title={article.title}>
                  <Link to={shortStoryPath(article)}>{article.title}</Link>
                </h3>
                <p className="mt-2 mb-0 text-[14px] font-normal text-[#69717a]">{article.date}</p>
                <p className="home-story-summary mt-3 line-clamp-2">{article.summary}</p>
              </div>
            </article>
          ))}
        </div>

        <Link className="mt-7 flex w-full items-center justify-center gap-2 bg-[#182536] px-4 py-3 text-xs font-bold text-white sm:hidden" to="/articles">View all articles <Icon name="arrow" /></Link>
      </div>
    </section>
  );
}
