import { Link } from "react-router-dom";
import Icon from "../ui/Icon";
import useExplainer from "../../hooks/useExplainer";

export default function StoryExplained() {
  const { explainer } = useExplainer();
  const explanations = [
    { label: "What happened", text: explainer.whatHappened },
    { label: "Why it matters", text: explainer.whyItMatters },
    { label: "What to watch", text: explainer.whatToWatch },
  ];
  return (
    <section className="bg-[#f1eee8] px-3 py-12 md:px-6 md:py-16" aria-labelledby="explainer-title">
      <div className="mx-auto max-w-[1380px] overflow-hidden border border-[#cbd8d4] bg-[#eaf0ed] text-[#182536] shadow-[0_18px_50px_rgba(24,37,54,.07)]">
        <div className="grid lg:grid-cols-[.72fr_1.28fr]">
          <header className="border-b border-[#cbd8d4] p-6 sm:p-9 lg:border-r lg:border-b-0 lg:p-11">
            <p className="mb-4 inline-flex items-center gap-2 text-[11px] font-bold tracking-[.05em] text-[#4f9488] uppercase after:h-px after:w-9 after:bg-[#4f9488]">
              The story, explained
            </p>
            <p className="mb-3 text-[10px] font-semibold tracking-[.06em] text-[#5f6368] uppercase">
              {explainer.category} · {explainer.readTime}
            </p>
            <h2 id="explainer-title" className="m-0 max-w-lg font-serif text-[clamp(30px,3.3vw,46px)] leading-[1.06] tracking-[-.035em]">
              {explainer.question}
            </h2>
            <Link className="mt-7 flex w-fit items-center gap-3 rounded-lg bg-[#182536] px-5 py-3 text-xs font-bold text-white shadow-[0_8px_20px_rgba(24,37,54,.14)] transition hover:-translate-y-0.5 hover:bg-[#2b4052]" to={`/explainers/${explainer.slug}`}>
              Read the full explainer <Icon name="arrow" />
            </Link>
          </header>

          <div className="grid sm:grid-cols-3">
            {explanations.map((item) => (
              <article className="border-b border-[#cbd8d4] p-6 last:border-b-0 sm:border-r sm:border-b-0 sm:p-8 sm:last:border-r-0 lg:py-11" key={item.label}>
                <h3 className="mt-0 mb-5 text-[11px] font-bold tracking-[.06em] text-[#4f9488] uppercase">
                  {item.label}
                </h3>
                <p className="m-0 text-[14px] leading-6 text-[#3f494f]">
                  {item.text}
                </p>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
