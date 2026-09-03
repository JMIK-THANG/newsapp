import { editorialStories } from "../data/sectionPageData";
import Icon from "../components/ui/Icon";
import { Link } from "react-router-dom";

export default function EditorialPage() {
  const [lead, ...stories] = editorialStories;

  return (
    <main className="bg-white px-3 py-10 md:px-6 md:py-14">
      <div className="mx-auto max-w-[1180px]">
        <header className="grid gap-6 border-b-2 border-[#111318] pb-7 md:grid-cols-[1fr_320px] md:items-end">
          <div><p className="mb-2 text-[11px] font-bold tracking-[.08em] uppercase">Our perspective</p><h1 className="m-0 font-serif text-[clamp(42px,6vw,72px)] leading-none tracking-[-.045em]">Editorial</h1></div>
          <p className="m-0 text-sm leading-6 text-[#4f5359]">The official position of the Chinlung Today editorial team—grounded in evidence, public interest, and respect for our readers.</p>
        </header>

        <article className="grid gap-8 border-b border-[#dcdde0] py-9 lg:grid-cols-[1fr_420px] lg:items-center">
          <div>
            <p className="mb-3 inline-flex items-center gap-2 text-[11px] font-bold tracking-[.04em] text-[#4f9488] uppercase after:h-px after:w-9 after:bg-[#4f9488]">The editorial board</p>
            <h2 className="m-0 max-w-3xl font-serif text-[clamp(32px,4vw,52px)] leading-[1.05] tracking-[-.04em]"><Link to="/editorial/featured">{lead.title}</Link></h2>
            <p className="my-5 max-w-2xl text-[15px] leading-7 text-[#4f5359]">{lead.summary}</p>
            <div className="flex items-center gap-5 text-[11px] font-medium text-[#5f6368]"><span>{lead.date}</span><Link className="flex items-center gap-2 font-semibold text-[#111318]" to="/editorial/featured">Read editorial <Icon name="arrow" /></Link></div>
          </div>
          <Link className="order-first aspect-[4/3] overflow-hidden bg-[#e8edf2] lg:order-none" to="/editorial/featured"><img className="h-full w-full object-cover" src={lead.image} alt={lead.imageAlt} /></Link>
        </article>

        <section className="grid gap-10 py-8 lg:grid-cols-[1fr_280px]" aria-label="More editorials">
          <div className="divide-y divide-[#dcdde0] border-y border-[#dcdde0]">
            {stories.map((story, index) => <article className="py-6" key={story.title}><p className="mb-2 text-[10px] font-medium text-[#5f6368] uppercase">Editorial · {story.date}</p><h2 className="m-0 text-[clamp(22px,2.5vw,30px)] leading-[1.18] font-semibold tracking-[-.025em]"><Link className="hover:opacity-60" to={`/editorial/story-${index + 1}`}>{story.title}</Link></h2><p className="mt-3 mb-0 max-w-3xl text-sm leading-6 text-[#4f5359]">{story.summary}</p></article>)}
          </div>
          <aside className="h-fit border-t-2 border-[#111318] bg-[#f7f5ef] p-5"><h2 className="m-0 text-base font-bold">About our editorials</h2><p className="mb-0 text-[13px] leading-5 text-[#4f5359]">Editorials represent the collective view of the publication, not an individual writer. News reporting remains separate and independent.</p></aside>
        </section>
      </div>
    </main>
  );
}
