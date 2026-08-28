import { categories } from "../../data/news";
import Icon from "../ui/Icon";

export default function CategoryExplorer() {
  return (
    <section id="categories" className="border-t border-[#dcdde0] bg-[#f4f2ed] px-3 py-12 md:px-6 md:py-16" aria-labelledby="categories-title">
      <div className="mx-auto max-w-[1380px]">
        <div className="mb-7 flex items-end justify-between gap-6 border-b border-[#dcdde0] pb-6">
          <div>
            <p className="mb-2 text-[11px] font-bold tracking-[.08em] text-[#111318] uppercase">Explore by category</p>
            <h2 id="categories-title" className="m-0 max-w-[760px] font-serif text-[clamp(30px,3.3vw,44px)] leading-[1.05] tracking-[-.035em]">Find the stories you care about.</h2>
          </div>
          <a className="flex shrink-0 items-center gap-2 text-[11px] font-semibold text-[#111318] transition hover:opacity-60" href="#all-categories" aria-label="Browse all categories">View all <Icon name="arrow" /></a>
        </div>

        <div className="grid gap-x-6 gap-y-8 sm:grid-cols-2 lg:grid-cols-3">
          {categories.map((category) => (
            <article key={category.name} className="group border-b border-[#dcdde0] pb-4">
              <a className="block aspect-[16/8] overflow-hidden bg-[#e8edf2]" href={`#${category.name.toLowerCase()}`} tabIndex="-1">
                <img className="h-full w-full object-cover transition duration-700 group-hover:scale-[1.04]" src={category.image} alt={category.imageAlt} />
              </a>
              <div className="flex items-center justify-between gap-4 pt-3">
                <h3 className="m-0 text-[18px] font-semibold tracking-[-.01em] text-[#111318]"><a className="transition hover:opacity-65" href={`#${category.name.toLowerCase()}`}>{category.name}</a></h3>
                <a className="shrink-0 text-[#111318] transition group-hover:translate-x-1" href={`#${category.name.toLowerCase()}`} aria-label={`Explore ${category.name}`}><Icon name="arrow" /></a>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
