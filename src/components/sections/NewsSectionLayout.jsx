import Icon from "../ui/Icon";
import { Link } from "react-router-dom";

export default function NewsSectionLayout({ eyebrow, title, description, stories }) {
  const [feature, ...rest] = stories;

  return (
    <main className="bg-white px-3 py-10 md:px-6 md:py-14">
      <div className="mx-auto max-w-[1380px]">
        <header className="border-b border-[#dcdde0] pb-7">
          <p className="mb-2 inline-flex items-center gap-2 text-[11px] font-bold tracking-[.04em] text-[#4f9488] uppercase after:h-px after:w-9 after:bg-[#4f9488]">{eyebrow}</p>
          <h1 className="m-0 font-serif text-[clamp(38px,5vw,64px)] leading-none tracking-[-.04em] text-[#111318]">{title}</h1>
          <p className="mt-4 mb-0 max-w-2xl text-sm leading-6 text-[#4f5359]">{description}</p>
        </header>

        <section className="grid gap-8 border-b border-[#dcdde0] py-8 lg:grid-cols-[1.25fr_.75fr]" aria-label={`Featured ${title}`}>
          <Link className="group block aspect-[16/9] overflow-hidden bg-[#e8edf2]" to={`/${title.toLowerCase()}/featured`}><img className="h-full w-full object-cover transition duration-700 group-hover:scale-[1.025]" src={feature.image} alt={feature.imageAlt} /></Link>
          <div className="flex flex-col justify-center">
            <p className="mb-3 text-[11px] font-semibold text-[#4f9488] uppercase">{feature.category} <span className="font-normal text-[#5f6368]">· {feature.date}</span></p>
            <h2 className="m-0 line-clamp-2 font-serif text-[clamp(28px,3vw,42px)] leading-[1.08] tracking-[-.035em] text-[#111318]" title={feature.title}>{feature.title}</h2>
            <p className="my-4 text-sm leading-6 text-[#4f5359]">{feature.summary}</p>
            <Link className="flex w-fit items-center gap-2 text-xs font-semibold text-[#111318]" to={`/${title.toLowerCase()}/featured`}>Read story <Icon name="arrow" /></Link>
          </div>
        </section>

        <section className="grid gap-x-7 gap-y-0 sm:grid-cols-2 lg:grid-cols-3" aria-label={`Latest ${title}`}>
          {rest.map((story, index) => (
            <article className="group border-b border-[#dcdde0] py-7" key={story.title}>
              <Link className="mb-4 block aspect-[16/9] overflow-hidden bg-[#e8edf2]" to={`/${title.toLowerCase()}/story-${index + 1}`}><img className="h-full w-full object-cover transition duration-500 group-hover:scale-[1.025]" src={story.image} alt={story.imageAlt} /></Link>
              <p className="mb-2 text-[10px] font-semibold text-[#4f9488] uppercase">{story.category} <span className="font-normal text-[#5f6368]">· {story.date}</span></p>
              <h2 className="m-0 line-clamp-2 text-xl leading-[1.25] font-semibold tracking-[-.02em] text-[#111318]" title={story.title}><Link className="transition hover:opacity-60" to={`/${title.toLowerCase()}/story-${index + 1}`}>{story.title}</Link></h2>
              <p className="mt-3 mb-0 text-[13px] leading-5 text-[#4f5359]">{story.summary}</p>
            </article>
          ))}
        </section>
      </div>
    </main>
  );
}
