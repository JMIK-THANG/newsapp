import { Link, useParams } from "react-router-dom";
import Icon from "../components/ui/Icon";
import ShareStoryButton from "../components/ui/ShareStoryButton";
import useExplainer from "../hooks/useExplainer";
import Seo, { SITE_NAME, SITE_URL } from "../components/seo/Seo";

export default function ExplainerPage() {
  const { slug } = useParams();
  const { explainer, isLoading } = useExplainer(slug);
  if (isLoading) return <main className="min-h-[60vh] bg-[#fcfbf8] px-6 py-20 text-center text-sm text-[#5f6368]">Loading explainer…</main>;

  return (
    <main className="bg-[#fff] px-4 py-5 sm:px-5 md:px-6 md:py-10">
      <Seo title={explainer.question} description={explainer.introduction} canonicalPath={`/explainers/${explainer.slug}`} type="article" schema={{
        "@context": "https://schema.org",
        "@type": "Article",
        headline: explainer.question,
        description: explainer.introduction,
        ...(explainer.created_at ? { datePublished: explainer.created_at } : {}),
        ...(explainer.updated_at ? { dateModified: explainer.updated_at } : {}),
        publisher: { "@type": "NewsMediaOrganization", name: SITE_NAME, logo: { "@type": "ImageObject", url: `${SITE_URL}/chinlung-today-logo.png` } },
        mainEntityOfPage: { "@type": "WebPage", "@id": `${SITE_URL}/explainers/${explainer.slug}` },
      }} />
      <article className="mx-auto max-w-[1380px]">
        <div className="mx-auto mb-3 flex w-full max-w-[1380px] flex-nowrap items-center justify-between gap-3 border-b border-[#dcdde0] pb-3 md:mb-4"><nav className="flex items-center gap-2 text-[12px] font-normal text-[#5f6368] md:gap-2.5 md:text-[14px]" aria-label="Breadcrumb"><Link className="hover:text-[#111318]" to="/">Home</Link><span className="text-[#9aa0a6]">/</span><span>Explainers</span></nav><p className="m-0 rounded-full bg-[#e7efec] px-2.5 py-1.5 text-[10px] font-semibold tracking-[.05em] text-[#397d73] uppercase md:px-3 md:text-[11px]">{explainer.category}</p></div>
        <header className="grid gap-4 border-b-2 border-[#111318] pb-6 md:gap-8 md:pb-9 lg:grid-cols-[1.25fr_.75fr] lg:items-end">
          <div><p className="mb-2.5 inline-flex items-center gap-2 text-[10px] font-bold tracking-[.05em] text-[#4f9488] uppercase after:h-px after:w-9 after:bg-[#4f9488] md:mb-4 md:text-[11px]">The story, explained</p><h1 className="m-0 max-w-4xl font-serif text-[clamp(28px,7.2vw,30px)] leading-[1.16] font-bold tracking-[-.02em] text-[#111318] md:text-[clamp(36px,4vw,46px)] md:leading-[1.12]">{explainer.question}</h1></div>
          <div className="lg:border-l lg:border-[#dcdde0] lg:pl-7"><p className="m-0 text-[17px] leading-[1.55] text-[#303940] md:text-[20px] md:leading-[1.65]">{explainer.introduction}</p><p className="mt-3 mb-0 text-[10px] font-semibold text-[#5f6368] uppercase md:mt-5 md:text-[11px]">{explainer.readTime}</p></div>
        </header>
        <aside className="my-7 grid bg-[#f1eee8] sm:my-9 sm:grid-cols-[180px_1fr]" aria-label="Key takeaway"><p className="m-0 bg-[#182536] p-4 text-[10px] font-bold tracking-[.06em] text-white uppercase sm:p-7 sm:text-[11px]">The key takeaway</p><p className="m-0 p-4 font-serif text-[20px] leading-[1.28] tracking-[-.02em] text-[#111318] sm:p-7 sm:text-[clamp(21px,2.4vw,29px)] sm:leading-[1.25]">{explainer.takeaway}</p></aside>
        <div className="mx-auto max-w-[760px]">{explainer.sections.map((section, index) => <section className="py-8" aria-labelledby={`explainer-section-${index}`} key={`${section.title}-${index}`}><h2 id={`explainer-section-${index}`} className="mt-0 mb-5 text-[26px] leading-tight font-bold tracking-[-.02em] text-[#111318] lg:text-[32px]">{section.title}</h2><div className="article-reading-text story-reading-text">{section.paragraphs.map((paragraph, paragraphIndex) => <p className={paragraphIndex === 0 ? "mt-0" : "mt-6"} key={paragraph}>{paragraph}</p>)}</div></section>)}</div>
        {explainer.sources.length > 0 && <aside className="mx-auto mt-6 max-w-[850px] border-t border-[#dcdde0] pt-6"><h2 className="text-base">Sources and further reading</h2><ul className="space-y-2 pl-5 text-sm">{explainer.sources.map((source) => <li key={source.url}><a className="text-[#397d73] underline" href={source.url} target="_blank" rel="noreferrer">{source.label}</a></li>)}</ul></aside>}
        <footer className="mt-9 flex flex-col gap-5 py-4 sm:flex-row sm:items-center sm:justify-between"><div><p className="mt-0 mb-3 text-sm text-[#4f5359]">Want the complete report and article context?</p><ShareStoryButton path={`/explainers/${explainer.slug}`} /></div><Link className="flex w-fit items-center gap-2 bg-[#182536] px-5 py-3 text-xs font-semibold text-white" to={`/news/story/${explainer.sourceArticleSlug}`}>Read the original report <Icon name="arrow" /></Link></footer>
      </article>
    </main>
  );
}
