import { Link } from "react-router-dom";
import useNews from "../hooks/useNews";
import { articleStories } from "../data/sectionPageData";
import Icon from "../components/ui/Icon";

export default function ArticlesPage() {
  const { news: publishedArticles } = useNews({ contentType: "article" });
  const allArticles = publishedArticles.length ? publishedArticles : articleStories;
  const [feature, ...articles] = allArticles;
  const pathFor = (article, index = 0) => article.slug ? `/articles/${article.slug}` : index === 0 ? "/articles/featured" : `/articles/story-${index}`;

  return (
    <main className="bg-[#f1eee8] px-3 py-10 md:px-6 md:py-14">
      <div className="mx-auto max-w-[1320px]">
        <header className="grid gap-6 border-y border-[#182536] py-7 md:grid-cols-[1fr_1fr] md:items-end">
          <div><p className="mb-3 text-[11px] font-bold tracking-[.16em] text-[#4f9488] uppercase">The Chinlung Review</p><h1 className="m-0 font-serif text-[clamp(50px,8vw,96px)] leading-[.88] tracking-[-.055em] text-[#182536]">Articles</h1></div>
          <p className="m-0 max-w-xl text-[15px] leading-7 text-[#4f5359] md:justify-self-end">Features, profiles, essays, and analysis written for slower, deeper reading. Every published article is available on this page.</p>
        </header>

        {feature && <article className="group grid overflow-hidden border-b border-[#c8c6c0] bg-[#182536] text-white lg:grid-cols-[1.25fr_.75fr]">
          <Link className="min-h-[330px] overflow-hidden lg:min-h-[560px]" to={pathFor(feature)}><img className="h-full w-full object-cover transition duration-700 group-hover:scale-[1.02]" src={feature.image} alt={feature.imageAlt} /></Link>
          <div className="flex flex-col justify-between p-7 md:p-10 lg:p-12"><div><p className="mb-5 text-[10px] font-bold tracking-[.18em] text-[#8fc1b7] uppercase">Featured article</p><h2 className="m-0 line-clamp-3 font-serif text-[clamp(34px,4vw,58px)] leading-[1.02] tracking-[-.04em]" title={feature.title}><Link to={pathFor(feature)}>{feature.title}</Link></h2><p className="mt-6 mb-0 line-clamp-4 text-[15px] leading-7 text-[#d7dde2]">{feature.summary}</p></div><div className="mt-9 border-t border-white/25 pt-5"><p className="mb-5 text-xs text-[#c9d0d5]">By <strong className="text-white">{feature.author || "Chinlung Today"}</strong> · {feature.date}</p><Link className="inline-flex items-center gap-3 rounded-full bg-[#f8f6f1] px-5 py-3 text-xs font-bold text-[#182536]" to={pathFor(feature)}>Read article <Icon name="arrow" /></Link></div></div>
        </article>}

        {articles.length > 0 && <section className="pt-10" aria-labelledby="all-articles-title"><div className="mb-6 flex items-end justify-between border-b border-[#c8c6c0] pb-4"><h2 id="all-articles-title" className="m-0 font-serif text-3xl">All articles</h2><span className="text-xs text-[#5f6368]">{allArticles.length} published</span></div><div className="grid gap-x-7 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">{articles.map((article, index) => <article className="group" key={article.id || article.title}><Link className="block aspect-[4/3] overflow-hidden rounded-sm bg-[#ddd9d1]" to={pathFor(article, index + 1)}><img className="h-full w-full object-cover transition duration-500 group-hover:scale-[1.025]" src={article.image} alt={article.imageAlt} /></Link><div className="border-b border-[#c8c6c0] py-5"><p className="mb-2 text-[10px] font-bold tracking-[.14em] text-[#4f9488] uppercase">Article · {article.date}</p><h3 className="m-0 line-clamp-2 font-serif text-[clamp(23px,2.3vw,31px)] leading-[1.12] tracking-[-.025em]" title={article.title}><Link to={pathFor(article, index + 1)}>{article.title}</Link></h3><p className="mt-3 mb-0 line-clamp-3 text-[13px] leading-6 text-[#4f5359]">{article.summary}</p><p className="mt-4 mb-0 text-[11px] font-semibold">By {article.author || "Chinlung Today"}</p></div></article>)}</div></section>}
      </div>
    </main>
  );
}
