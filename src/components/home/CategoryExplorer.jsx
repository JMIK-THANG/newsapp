import { categories } from "../../data/news";
import Icon from "../ui/Icon";

export default function CategoryExplorer() {
  return (
    <section id="categories" className="bg-[#f6f7fb] px-3 py-14 md:px-6 md:py-[72px]" aria-labelledby="categories-title">
      <div className="mx-auto max-w-[1380px]">
        <div className="mb-9 flex items-end justify-between gap-6">
          <div>
            <p className="mb-3 text-[10px] font-bold tracking-[.16em] text-[#667085] uppercase">Explore by category</p>
            <h2 id="categories-title" className="m-0 max-w-[760px] font-serif text-[clamp(34px,4vw,52px)] leading-[1.02] tracking-[-.04em]">Find the stories you care about.</h2>
          </div>
          <a className="grid size-11 shrink-0 place-items-center rounded-full border border-[#dce2f2] bg-white text-[#1d2a44] transition hover:border-[#4f6fd8] hover:bg-[#4f6fd8] hover:text-white" href="#all-categories" aria-label="Browse all categories"><Icon name="arrow" /></a>
        </div>

        <div className="grid gap-3.5 sm:grid-cols-2 lg:grid-cols-3">
          {categories.map((category) => (
            <article key={category.name} className="group overflow-hidden rounded-[22px] border border-[#e1e5ef] bg-white">
              <a className="block aspect-[16/8] overflow-hidden bg-[#e8eaf0]" href={`#${category.name.toLowerCase()}`} tabIndex="-1">
                <img className="h-full w-full object-cover transition duration-700 group-hover:scale-[1.04]" src={category.image} alt={category.imageAlt} />
              </a>
              <div className="flex items-center justify-between gap-4 p-5">
                <h3 className="m-0 text-lg font-bold tracking-[-.02em]"><a className="transition hover:text-[#4f6fd8]" href={`#${category.name.toLowerCase()}`}>{category.name}</a></h3>
                <a className="grid size-9 shrink-0 place-items-center rounded-full bg-[#eef1fa] text-[#1d2a44] transition group-hover:bg-[#1d2a44] group-hover:text-white" href={`#${category.name.toLowerCase()}`} aria-label={`Explore ${category.name}`}><Icon name="arrow" /></a>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
