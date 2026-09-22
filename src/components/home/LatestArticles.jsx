import { Link } from "react-router-dom";
import useNews from "../../hooks/useNews";
import Icon from "../ui/Icon";

export default function LatestArticles() {
  const { news: articles, isLoading } = useNews({ contentType: "article" });
  const latestArticles = articles.slice(0, 4);

  if (isLoading) return null;
  if (latestArticles.length === 0) return null;

  return (
    <section className="border-t border-[#d5d1c9] bg-[#f1eee8] px-3 py-10 md:px-6 md:py-14" aria-labelledby="latest-articles-title">
      <div className="mx-auto max-w-[1380px]">
        <header className="mb-6 flex items-end justify-between gap-5 border-b border-[#182536] pb-4">
          <div>
            <p className="mb-2 text-[10px] font-bold tracking-[.16em] text-[#8f2427] uppercase">The Chinlung Review</p>
            <h2 id="latest-articles-title" className="m-0 font-serif text-[clamp(28px,3vw,40px)] leading-none tracking-[-.035em] text-[#182536]"> Articles</h2>
          </div>
          <Link className="hidden items-center gap-2 text-[11px] font-bold tracking-[.05em] uppercase sm:flex" to="/articles">View all articles <Icon name="arrow" /></Link>
        </header>

        <div className="grid gap-x-5 gap-y-8 sm:grid-cols-2 xl:grid-cols-4">
          {latestArticles.map((article) => (
            <article className="group min-w-0" key={article.id || article.slug}>
              <Link className="block aspect-[16/10] overflow-hidden bg-[#ddd9d1]" to={`/articles/${article.slug}`}>
                <img className="h-full w-full object-cover transition duration-500 group-hover:scale-[1.025]" src={article.image} alt={article.imageAlt} />
              </Link>
              <div className="border-b border-[#c8c3ba] py-4">
                <p className="mb-2 text-[11px] font-bold tracking-[.08em] text-[#4f9488] uppercase">{article.category} · {article.readTime}</p>
                <h3 className="m-0 line-clamp-2 font-serif text-[clamp(21px,2vw,27px)] leading-[1.14] tracking-[-.025em]" title={article.title}>
                  <Link to={`/articles/${article.slug}`}>{article.title}</Link>
                </h3>
                <p className="mt-3 line-clamp-2 text-[16px] leading-7 text-[#303940]">{article.summary}</p>
              </div>
            </article>
          ))}
        </div>

        <Link className="mt-7 flex w-full items-center justify-center gap-2 bg-[#182536] px-4 py-3 text-xs font-bold text-white sm:hidden" to="/articles">View all articles <Icon name="arrow" /></Link>
      </div>
    </section>
  );
}
