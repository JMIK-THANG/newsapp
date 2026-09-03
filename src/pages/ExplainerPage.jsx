import { Link, Navigate, useParams } from "react-router-dom";
import { featuredExplainer } from "../data/news";
import Icon from "../components/ui/Icon";

export default function ExplainerPage() {
  const { slug } = useParams();

  if (slug !== featuredExplainer.slug) {
    return <Navigate to="/" replace />;
  }

  return (
    <main className="bg-white px-3 py-10 md:px-6 md:py-14">
      <article className="mx-auto max-w-[1100px]">
        <nav className="mb-9 flex items-center gap-2 text-[11px] font-medium text-[#5f6368]" aria-label="Breadcrumb">
          <Link className="hover:text-[#111318]" to="/">Home</Link>
          <span>/</span>
          <span>The Story, Explained</span>
        </nav>

        <header className="grid gap-8 border-b-2 border-[#111318] pb-9 lg:grid-cols-[1.25fr_.75fr] lg:items-end">
          <div>
            <p className="mb-4 inline-flex items-center gap-2 text-[11px] font-bold tracking-[.05em] text-[#4f9488] uppercase after:h-px after:w-9 after:bg-[#4f9488]">
              The story, explained
            </p>
            <h1 className="m-0 max-w-4xl font-serif text-[clamp(40px,6vw,72px)] leading-[1.01] tracking-[-.045em] text-[#111318]">
              {featuredExplainer.question}
            </h1>
          </div>
          <div className="lg:border-l lg:border-[#dcdde0] lg:pl-7">
            <p className="m-0 text-[15px] leading-7 text-[#4f5359]">{featuredExplainer.introduction}</p>
            <p className="mt-5 mb-0 text-[11px] font-semibold text-[#5f6368] uppercase">
              {featuredExplainer.category} · {featuredExplainer.readTime}
            </p>
          </div>
        </header>

        <aside className="my-9 grid bg-[#f7f5ef] sm:grid-cols-[180px_1fr]" aria-label="Key takeaway">
          <p className="m-0 bg-[#182536] p-5 text-[11px] font-bold tracking-[.06em] text-white uppercase sm:p-7">The key takeaway</p>
          <p className="m-0 p-5 font-serif text-[clamp(21px,2.4vw,29px)] leading-[1.25] tracking-[-.02em] text-[#111318] sm:p-7">{featuredExplainer.takeaway}</p>
        </aside>

        <div className="mx-auto max-w-[850px]">
          {featuredExplainer.sections.map((section, index) => (
            <section className="grid gap-5 border-t border-[#dcdde0] py-9 md:grid-cols-[190px_1fr] md:gap-10" aria-labelledby={`explainer-section-${index}`} key={section.title}>
              <h2 id={`explainer-section-${index}`} className="m-0 font-serif text-[28px] leading-tight tracking-[-.025em] text-[#111318]">{section.title}</h2>
              <div className="text-[16px] leading-8 text-[#292c31]">
                {section.paragraphs.map((paragraph) => <p className="first:mt-0 last:mb-0" key={paragraph}>{paragraph}</p>)}
              </div>
            </section>
          ))}
        </div>

        <footer className="mt-3 flex flex-col gap-4 border-y border-[#dcdde0] py-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="m-0 text-sm text-[#4f5359]">Want the complete report and article context?</p>
          <Link className="flex w-fit items-center gap-2 bg-[#182536] px-5 py-3 text-xs font-semibold text-white" to={`/news/story/${featuredExplainer.slug}`}>
            Read the original report <Icon name="arrow" />
          </Link>
        </footer>
      </article>
    </main>
  );
}
