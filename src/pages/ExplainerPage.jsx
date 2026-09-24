import { Link, useParams } from "react-router-dom";
import Icon from "../components/ui/Icon";
import ShareStoryButton from "../components/ui/ShareStoryButton";
import useExplainer from "../hooks/useExplainer";

export default function ExplainerPage() {
  const { slug } = useParams();
  const { explainer, isLoading } = useExplainer(slug);
  if (isLoading) return <main className="min-h-[60vh] bg-[#fcfbf8] px-6 py-20 text-center text-sm text-[#5f6368]">Loading explainer…</main>;

  return (
    <main className="bg-[#fcfbf8] px-3 py-10 md:px-6 md:py-14">
      <article className="mx-auto max-w-[1380px]">
        <div className="mx-auto mb-5 flex w-full max-w-[980px] items-center justify-between gap-4 border-b border-[#dcdde0] pb-3"><nav className="flex items-center gap-2.5 text-[14px] font-normal text-[#5f6368]" aria-label="Breadcrumb"><Link className="hover:text-[#111318]" to="/">Home</Link><span className="text-[#9aa0a6]">/</span><span>Explainers</span></nav><p className="m-0 rounded-full bg-[#e7efec] px-3 py-1.5 text-[11px] font-semibold tracking-[.05em] text-[#397d73] uppercase">{explainer.category}</p></div>
        <header className="grid gap-8 border-b-2 border-[#111318] pb-9 lg:grid-cols-[1.25fr_.75fr] lg:items-end">
          <div><p className="mb-4 inline-flex items-center gap-2 text-[11px] font-bold tracking-[.05em] text-[#4f9488] uppercase after:h-px after:w-9 after:bg-[#4f9488]">The story, explained</p><h1 className="m-0 max-w-4xl font-serif text-[clamp(29px,4vw,46px)] leading-[1.12] tracking-[-.025em] text-[#111318]">{explainer.question}</h1></div>
          <div className="lg:border-l lg:border-[#dcdde0] lg:pl-7"><p className="home-story-summary m-0">{explainer.introduction}</p><p className="mt-5 mb-0 text-[11px] font-semibold text-[#5f6368] uppercase">{explainer.readTime}</p></div>
        </header>
        <aside className="my-9 grid bg-[#f1eee8] sm:grid-cols-[180px_1fr]" aria-label="Key takeaway"><p className="m-0 bg-[#182536] p-5 text-[11px] font-bold tracking-[.06em] text-white uppercase sm:p-7">The key takeaway</p><p className="m-0 p-5 font-serif text-[clamp(21px,2.4vw,29px)] leading-[1.25] tracking-[-.02em] text-[#111318] sm:p-7">{explainer.takeaway}</p></aside>
        <div className="mx-auto max-w-[900px]">{explainer.sections.map((section, index) => <section className="grid gap-5 border-t border-[#dcdde0] py-9 md:grid-cols-[190px_1fr] md:gap-10" aria-labelledby={`explainer-section-${index}`} key={`${section.title}-${index}`}><h2 id={`explainer-section-${index}`} className="m-0 font-serif text-[28px] leading-tight tracking-[-.025em] text-[#111318] lg:text-[34px]">{section.title}</h2><div className="article-reading-text">{section.paragraphs.map((paragraph) => <p className="first:mt-0 last:mb-0" key={paragraph}>{paragraph}</p>)}</div></section>)}</div>
        {explainer.sources.length > 0 && <aside className="mx-auto mt-6 max-w-[850px] border-t border-[#dcdde0] pt-6"><h2 className="text-base">Sources and further reading</h2><ul className="space-y-2 pl-5 text-sm">{explainer.sources.map((source) => <li key={source.url}><a className="text-[#397d73] underline" href={source.url} target="_blank" rel="noreferrer">{source.label}</a></li>)}</ul></aside>}
        <footer className="mt-9 flex flex-col gap-4 border-y border-[#dcdde0] py-6 sm:flex-row sm:items-center sm:justify-between"><div><p className="mt-0 mb-3 text-sm text-[#4f5359]">Want the complete report and article context?</p><ShareStoryButton path={`/explainers/${explainer.slug}`} /></div><Link className="flex w-fit items-center gap-2 bg-[#182536] px-5 py-3 text-xs font-semibold text-white" to={`/news/story/${explainer.sourceArticleSlug}`}>Read the original report <Icon name="arrow" /></Link></footer>
      </article>
    </main>
  );
}
