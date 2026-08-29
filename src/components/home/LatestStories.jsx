import { latestStories } from "../../data/news";
import Icon from "../ui/Icon";
import { Link } from "react-router-dom";

export default function LatestStories() {
  const [feature, ...stories] = latestStories;

  return (
    <section id="latest" className="border-t border-[#dcdde0] bg-white px-3 py-12 md:px-6 md:py-16" aria-labelledby="latest-title">
      <div className="mx-auto max-w-[1380px]">
        <div className="border-b border-[#dcdde0] pb-6">
          <div>
            <p className="mb-3 inline-flex items-center gap-2 text-[11px] font-bold tracking-[.04em] text-[#4f9488] uppercase after:h-px after:w-9 after:bg-[#4f9488]">Editor’s Picks</p>
            <h2 id="latest-title" className="m-0 max-w-3xl font-serif text-[clamp(30px,3.3vw,44px)] leading-[1.05] tracking-[-.035em]">Stories shaping our world.</h2>
          </div>
        </div>

        <div className="mt-7 grid gap-8 lg:grid-cols-[1.05fr_.95fr] xl:gap-12">
          <article className="group">
            <Link to={`/news/story/${feature.slug}`} className="relative block aspect-[16/8.5] overflow-hidden rounded-[6px] bg-[#e8edf2]">
              <img className="h-full w-full object-cover transition duration-700 group-hover:scale-[1.025]" src={feature.image} alt={feature.imageAlt} />
              <span className="absolute top-4 left-4 bg-white px-2.5 py-1.5 text-[9px] font-bold tracking-[.12em] text-[#202938] uppercase">Editor’s pick</span>
            </Link>
            <div className="pt-6">
              <p className="mb-3 text-[11px] font-semibold text-[#4f9488] uppercase">{feature.category} <span className="font-normal text-[#5f6368]">• {feature.readTime}</span></p>
              <h3 className="m-0 max-w-3xl font-serif text-[clamp(27px,2.5vw,38px)] leading-[1.08] tracking-[-.025em] text-[#111318]"><Link className="transition hover:opacity-65" to={`/news/story/${feature.slug}`}>{feature.title}</Link></h3>
              <p className="mb-0 max-w-2xl text-[13px] leading-5 text-[#4f5359]">{feature.summary}</p>
              <p className="mt-5 text-[11px] font-medium text-[#5f6368]">By <span className="font-semibold text-[#111318]">{feature.author}</span> · {feature.date}</p>
            </div>
          </article>

          <div className="divide-y divide-[#dcdde0] border-y border-[#dcdde0]">
            {stories.map((story) => (
              <article className="group grid grid-cols-[1fr_104px] gap-4 py-5 sm:grid-cols-[1fr_140px]" key={story.title}>
                <div className="flex flex-col">
                  <p className="mb-3 text-[11px] font-semibold text-[#4f9488] uppercase">{story.category} <span className="font-normal text-[#5f6368]">• {story.readTime}</span></p>
                  <h3 className="m-0 text-[clamp(17px,1.5vw,22px)] leading-[1.3] font-semibold tracking-[-.015em] text-[#111318]"><Link className="transition hover:opacity-65" to={`/news/story/${story.slug}`}>{story.title}</Link></h3>
                  <p className="mt-auto mb-0 pt-4 text-[11px] font-medium text-[#5f6368]">{story.author} · {story.date}</p>
                </div>
                <Link className="relative min-h-[130px] overflow-hidden rounded-[4px] bg-[#e8edf2]" to={`/news/story/${story.slug}`} tabIndex="-1">
                  <img className="h-full w-full object-cover transition duration-500 group-hover:scale-105" src={story.image} alt={story.imageAlt} />
                </Link>
              </article>
            ))}
          </div>
        </div>

        <div className="mt-9 flex justify-center">
          <Link to="/news" className="flex items-center gap-3 border-b border-[#111318] pb-1 text-xs font-semibold text-[#111318] transition hover:opacity-60">Explore all stories <Icon name="arrow" /></Link>
        </div>
      </div>
    </section>
  );
}
