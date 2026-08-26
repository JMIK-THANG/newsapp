import { latestStories } from "../../data/news";
import Icon from "../ui/Icon";

const filters = ["All stories", "Community", "Culture", "Education", "Business"];

export default function LatestStories() {
  const [feature, ...stories] = latestStories;

  return (
    <section id="latest" className="bg-white px-3 py-16 md:px-6 md:py-24" aria-labelledby="latest-title">
      <div className="mx-auto max-w-[1440px]">
        <div className="flex flex-col gap-7 border-b border-[#dfe4de] pb-8 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="mb-3 text-[10px] font-bold tracking-[.16em] text-[#d95e35] uppercase">Fresh from the newsroom</p>
            <h2 id="latest-title" className="m-0 max-w-3xl font-serif text-[clamp(38px,5vw,64px)] leading-none tracking-[-.04em]">Stories shaping our world.</h2>
          </div>
          <div className="flex max-w-full gap-2 overflow-x-auto pb-1" aria-label="Story categories">
            {filters.map((filter, index) => <button key={filter} className={`shrink-0 cursor-pointer rounded-full border px-4 py-2 text-[11px] font-bold transition ${index === 0 ? "border-[#173b2d] bg-[#173b2d] text-white" : "border-[#dfe4de] bg-white text-[#68736d] hover:border-[#173b2d] hover:text-[#173b2d]"}`} type="button">{filter}</button>)}
          </div>
        </div>

        <div className="mt-8 grid gap-8 lg:grid-cols-[1.05fr_.95fr] xl:gap-14">
          <article className="group">
            <a href="#latest-feature" className="relative block aspect-[16/10] overflow-hidden rounded-[24px] bg-[#e8ebe6]">
              <img className="h-full w-full object-cover transition duration-700 group-hover:scale-[1.025]" src={feature.image} alt={feature.imageAlt} />
              <span className="absolute top-5 left-5 rounded-full bg-[#e9ff70] px-3 py-2 text-[9px] font-bold tracking-[.12em] text-[#173b2d] uppercase">Editor’s pick</span>
              <span className="absolute right-5 bottom-5 grid size-12 place-items-center rounded-full bg-white text-[#173b2d] shadow-lg transition group-hover:bg-[#173b2d] group-hover:text-white"><Icon name="arrow" /></span>
            </a>
            <div className="pt-6">
              <p className="mb-3 text-[10px] font-bold tracking-[.12em] text-[#d95e35] uppercase">{feature.category} <span className="text-[#9aa39e]">• {feature.readTime}</span></p>
              <h3 className="m-0 max-w-3xl font-serif text-[clamp(30px,3vw,44px)] leading-[1.08] tracking-[-.025em]"><a className="transition hover:text-[#d95e35]" href="#latest-feature">{feature.title}</a></h3>
              <p className="mb-0 max-w-2xl text-sm leading-6 text-[#68736d]">{feature.summary}</p>
              <p className="mt-5 text-[11px] font-semibold text-[#78827c]">By <span className="text-[#17211c]">{feature.author}</span> · {feature.date}</p>
            </div>
          </article>

          <div className="divide-y divide-[#dfe4de] border-y border-[#dfe4de]">
            {stories.map((story, index) => (
              <article className="group grid grid-cols-[1fr_112px] gap-5 py-6 sm:grid-cols-[1fr_170px] sm:py-7" key={story.title}>
                <div className="flex flex-col">
                  <p className="mb-3 text-[9px] font-bold tracking-[.12em] text-[#d95e35] uppercase"><span className="mr-3 font-serif text-[#a4aca7]">0{index + 2}</span>{story.category} <span className="text-[#9aa39e]">• {story.readTime}</span></p>
                  <h3 className="m-0 font-serif text-[clamp(21px,2.1vw,30px)] leading-[1.12] tracking-[-.02em]"><a className="transition hover:text-[#d95e35]" href={`#latest-${index + 2}`}>{story.title}</a></h3>
                  <p className="mt-auto mb-0 pt-4 text-[10px] font-semibold text-[#89928d]">{story.author} · {story.date}</p>
                </div>
                <a className="relative min-h-[130px] overflow-hidden rounded-[16px] bg-[#e8ebe6]" href={`#latest-${index + 2}`} tabIndex="-1">
                  <img className="h-full w-full object-cover transition duration-500 group-hover:scale-105" src={story.image} alt={story.imageAlt} />
                </a>
              </article>
            ))}
          </div>
        </div>

        <div className="mt-12 flex justify-center">
          <a href="#all-stories" className="flex items-center gap-3 rounded-[15px] border border-[#173b2d] px-6 py-3.5 text-xs font-bold text-[#173b2d] transition hover:bg-[#173b2d] hover:text-white">Explore all stories <Icon name="arrow" /></a>
        </div>
      </div>
    </section>
  );
}
