import { Link } from "react-router-dom";
import Icon from "../ui/Icon";
import useExplainer from "../../hooks/useExplainer";

export default function StoryExplained() {
  const { explainer, isLoading } = useExplainer();
  const explanations = [
    { number: "01", label: "What happened", text: explainer.whatHappened },
    { number: "02", label: "Why it matters", text: explainer.whyItMatters },
    { number: "03", label: "What to watch", text: explainer.whatToWatch },
  ];

  if (isLoading) {
    return <section className="bg-white px-3 py-12 md:px-6 md:py-16"><div className="mx-auto h-72 max-w-[1380px] animate-pulse bg-[#e8e4dc]" /></section>;
  }

  return (
    <section className="border-t border-[#d5d1c9] bg-white px-3 py-12 md:px-6 md:py-16" aria-labelledby="explainer-title">
      <div className="mx-auto max-w-[1380px] border-y border-[#182536] py-7 md:py-10">
        <div className="grid gap-8 lg:grid-cols-[minmax(0,.9fr)_minmax(0,1.1fr)] lg:gap-12">
          <header className="flex flex-col">
            <div className="mb-6 flex items-center justify-between gap-4">
              <p className="m-0 text-[11px] font-bold tracking-[.14em] text-[#8f2427] uppercase">The story, explained</p>
              <span className="text-[10px] font-semibold tracking-[.07em] text-[#5f6368] uppercase">{explainer.category} · {explainer.readTime}</span>
            </div>
            <h2 id="explainer-title" className="m-0 max-w-2xl font-serif text-[clamp(32px,4vw,54px)] leading-[1.02] tracking-[-.04em] text-[#182536]">{explainer.question}</h2>
            {explainer.introduction && <p className="mt-5 mb-0 max-w-2xl text-[15px] leading-7 text-[#4f5359]">{explainer.introduction}</p>}
            <div className="mt-7 border-l-[3px] border-[#8f2427] bg-[#f1eee8] px-5 py-4">
              <p className="mb-2 text-[10px] font-bold tracking-[.12em] text-[#8f2427] uppercase">In brief</p>
              <p className="m-0 font-serif text-[20px] leading-7 text-[#182536]">{explainer.takeaway}</p>
            </div>
          </header>

          <div className="divide-y divide-[#d5d1c9] border-y border-[#d5d1c9]">
            {explanations.map((item) => (
              <article className="grid gap-3 py-5 sm:grid-cols-[48px_145px_1fr] sm:items-start" key={item.label}>
                <span className="font-serif text-2xl text-[#b7b1a7]" aria-hidden="true">{item.number}</span>
                <h3 className="m-0 text-[11px] font-bold tracking-[.07em] text-[#4f9488] uppercase">{item.label}</h3>
                <p className="m-0 line-clamp-3 text-[14px] leading-6 text-[#3f494f]">{item.text}</p>
              </article>
            ))}
            <div className="py-5 sm:flex sm:justify-end">
              <Link className="flex w-fit items-center gap-3 bg-[#182536] px-5 py-3 text-xs font-bold text-white transition hover:bg-[#8f2427]" to={`/explainers/${explainer.slug}`}>Read the full explainer <Icon name="arrow" /></Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
