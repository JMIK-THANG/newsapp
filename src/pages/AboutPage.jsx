import { Link } from "react-router-dom";
import Icon from "../components/ui/Icon";

const values = [
  { title: "Accuracy", text: "We verify information, distinguish confirmed facts from developing reports, and correct mistakes transparently." },
  { title: "Context", text: "We explain why a story matters and connect major events with the communities and people affected by them." },
  { title: "Independence", text: "News reporting, analysis, and editorials are clearly labeled so readers can understand the purpose of each story." },
  { title: "Access", text: "We aim to make important reporting clear, useful, and welcoming to readers across locations and backgrounds." },
];

export default function AboutPage() {
  return (
    <main className="bg-white px-3 py-10 md:px-6 md:py-14" aria-labelledby="about-title">
      <div className="mx-auto max-w-[1180px]">
        <header className="border-b border-[#dcdde0] pb-8">
          <p className="mb-2 inline-flex items-center gap-2 text-[11px] font-bold tracking-[.04em] text-[#4f9488] uppercase after:h-px after:w-9 after:bg-[#4f9488]">About the publication</p>
          <h1 id="about-title" className="m-0 max-w-4xl font-serif text-[clamp(42px,6vw,72px)] leading-[1.02] tracking-[-.045em] text-[#111318]">Independent reporting. Clear perspectives.</h1>
          <p className="mt-5 mb-0 max-w-2xl text-[15px] leading-7 text-[#4f5359]">Chinlung Today is a modern general-news publication covering local communities, Myanmar, and the wider world. Chinlung is our name—not a limit on the stories or people we cover.</p>
        </header>

        <section className="grid gap-9 border-b border-[#dcdde0] py-9 lg:grid-cols-[.7fr_1.3fr]" aria-labelledby="mission-title">
          <div><p className="mb-2 text-[11px] font-semibold text-[#4f9488] uppercase">Our mission</p><h2 id="mission-title" className="m-0 font-serif text-[clamp(30px,4vw,46px)] leading-[1.08] tracking-[-.035em]">News that helps readers understand a changing world.</h2></div>
          <div className="text-[15px] leading-7 text-[#4f5359]"><p className="mt-0">We bring together timely reporting, deeper articles, business coverage, sports, and carefully labeled editorial perspectives. Our goal is to make complex events easier to follow without losing the people and communities at the center of them.</p><p className="mb-0">The homepage provides a curated briefing. Dedicated section pages help readers follow a subject, and article pages provide the context needed to go beyond a headline.</p></div>
        </section>

        <section className="py-9" aria-labelledby="values-title">
          <div className="mb-6 flex items-end justify-between border-b-2 border-[#111318] pb-4"><div><p className="mb-1 text-[11px] font-semibold text-[#4f9488] uppercase">How we work</p><h2 id="values-title" className="m-0 text-2xl font-semibold">Our editorial values</h2></div></div>
          <div className="grid border-l border-[#dcdde0] sm:grid-cols-2 lg:grid-cols-4">{values.map((value) => <article className="border-r border-b border-[#dcdde0] p-5" key={value.title}><h3 className="mt-0 mb-3 text-lg font-semibold">{value.title}</h3><p className="mb-0 text-[13px] leading-5 text-[#4f5359]">{value.text}</p></article>)}</div>
        </section>

        <div className="flex flex-col gap-4 border-b border-[#dcdde0] py-9 sm:flex-row sm:items-center sm:justify-between"><p className="m-0 text-sm text-[#4f5359]">Have a question, correction, or story suggestion?</p><Link className="flex w-fit items-center gap-2 bg-[#202938] px-5 py-3 text-sm font-semibold text-white" to="/contact">Contact Chinlung Today <Icon name="arrow" /></Link></div>
      </div>
    </main>
  );
}
