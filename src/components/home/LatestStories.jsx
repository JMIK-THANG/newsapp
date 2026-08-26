import { latestStories } from "../../data/news";
import Icon from "../ui/Icon";

const filters = ["All stories", "Community", "Culture", "Education", "Business"];

export default function LatestStories() {
  const [feature, ...stories] = latestStories;

  return (
    <section id="latest" className="bg-white px-3 py-14 md:px-6 md:py-[72px]" aria-labelledby="latest-title">
      <div className="mx-auto max-w-[1380px]">
        <div className="flex flex-col gap-7 border-b border-[#dfe4de] pb-8 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="mb-3 text-[10px] font-bold tracking-[.16em] text-[#667085] uppercase">Fresh from the newsroom</p>
            <h2 id="latest-title" className="m-0 max-w-3xl font-serif text-[clamp(34px,4vw,52px)] leading-none tracking-[-.04em]">Stories shaping our world.</h2>
          </div>
          <div className="flex max-w-full gap-2 overflow-x-auto pb-1" aria-label="Story categories">
            {filters.map((filter, index) => <button key={filter} className={`shrink-0 cursor-pointer rounded-full border px-4 py-2 text-[11px] font-bold transition ${index === 0 ? "border-[#1d2a44] bg-[#1d2a44] text-white" : "border-[#dfe3ee] bg-white text-[#667085] hover:border-[#4f6fd8] hover:text-[#4f6fd8]"}`} type="button">{filter}</button>)}
          </div>
        </div>

        <div className="mt-8 grid gap-8 lg:grid-cols-[1.05fr_.95fr] xl:gap-14">
          <article className="group">
            <a href="#latest-feature" className="relative block aspect-[16/8.5] overflow-hidden rounded-[22px] bg-[#e8ebe6]">
              <img className="h-full w-full object-cover transition duration-700 group-hover:scale-[1.025]" src={feature.image} alt={feature.imageAlt} />
              <span className="absolute top-5 left-5 rounded-full bg-[#e4e9fa] px-3 py-2 text-[9px] font-bold tracking-[.12em] text-[#1d2a44] uppercase">Editor’s pick</span>
              <span className="absolute right-5 bottom-5 grid size-12 place-items-center rounded-full bg-white text-[#1d2a44] shadow-lg transition group-hover:bg-[#1d2a44] group-hover:text-white"><Icon name="arrow" /></span>
            </a>
            <div className="pt-6">
              <p className="mb-3 text-[10px] font-bold tracking-[.12em] text-[#4f6fd8] uppercase">{feature.category} <span className="text-[#9aa3b2]">• {feature.readTime}</span></p>
              <h3 className="m-0 max-w-3xl font-serif text-[clamp(27px,2.5vw,38px)] leading-[1.08] tracking-[-.025em]"><a className="transition hover:text-[#4f6fd8]" href="#latest-feature">{feature.title}</a></h3>
              <p className="mb-0 max-w-2xl text-[13px] leading-5 text-[#68736d]">{feature.summary}</p>
              <p className="mt-5 text-[11px] font-semibold text-[#78827c]">By <span className="text-[#17211c]">{feature.author}</span> · {feature.date}</p>
            </div>
          </article>

          <div className="divide-y divide-[#dfe4de] border-y border-[#dfe4de]">
            {stories.map((story, index) => (
              <article className="group grid grid-cols-[1fr_104px] gap-4 py-5 sm:grid-cols-[1fr_140px]" key={story.title}>
                <div className="flex flex-col">
                  <p className="mb-3 text-[9px] font-bold tracking-[.12em] text-[#4f6fd8] uppercase"><span className="mr-3 font-serif text-[#a4aab7]">0{index + 2}</span>{story.category} <span className="text-[#9aa3b2]">• {story.readTime}</span></p>
                  <h3 className="m-0 text-[clamp(17px,1.5vw,22px)] leading-[1.3] font-semibold tracking-[-.015em]"><a className="transition hover:text-[#4f6fd8]" href={`#latest-${index + 2}`}>{story.title}</a></h3>
                  <p className="mt-auto mb-0 pt-4 text-[10px] font-semibold text-[#89928d]">{story.author} · {story.date}</p>
                </div>
                <a className="relative min-h-[130px] overflow-hidden rounded-[16px] bg-[#e8ebe6]" href={`#latest-${index + 2}`} tabIndex="-1">
                  <img className="h-full w-full object-cover transition duration-500 group-hover:scale-105" src={story.image} alt={story.imageAlt} />
                </a>
              </article>
            ))}
          </div>
        </div>

        <div className="mt-9 flex justify-center">
          <a href="#all-stories" className="flex items-center gap-3 rounded-[15px] border border-[#1d2a44] px-6 py-3.5 text-xs font-bold text-[#1d2a44] transition hover:bg-[#1d2a44] hover:text-white">Explore all stories <Icon name="arrow" /></a>
        </div>
      </div>
    </section>
  );
}
