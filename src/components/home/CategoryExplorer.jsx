import { categories } from "../../data/news";
import Icon from "../ui/Icon";

export default function CategoryExplorer() {
  return (
    <section id="categories" className="bg-[#f4f1e9] px-3 py-16 md:px-6 md:py-24" aria-labelledby="categories-title">
      <div className="mx-auto max-w-[1440px]">
        <div className="mb-10 flex flex-col gap-6 md:mb-12 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="mb-3 text-[10px] font-bold tracking-[.16em] text-[#d95e35] uppercase">Explore by category</p>
            <h2 id="categories-title" className="m-0 max-w-[760px] font-serif text-[clamp(40px,5vw,64px)] leading-[1.02] tracking-[-.04em]">Find the stories you care about.</h2>
          </div>
          <a className="flex w-fit items-center gap-3 rounded-[14px] bg-[#173b2d] px-5 py-3 text-xs font-bold text-white transition hover:-translate-y-0.5 hover:bg-[#225640]" href="#all-categories">Browse all categories <Icon name="arrow" /></a>
        </div>

        <div className="grid gap-3.5 md:grid-cols-2 lg:grid-cols-3">
          {categories.map((category, index) => (
            <article key={category.name} className={`group overflow-hidden rounded-[26px] border border-[#e3e6e1] bg-white ${index === 0 ? "md:col-span-2 md:grid md:grid-cols-[1.15fr_.85fr] lg:col-span-2" : ""}`}>
              <a className={`block overflow-hidden bg-[#e5e9e3] ${index === 0 ? "aspect-[16/10] md:aspect-auto md:min-h-[390px]" : "aspect-[16/10]"}`} href={`#${category.name.toLowerCase()}`} tabIndex="-1">
                <img className="h-full w-full object-cover transition duration-700 group-hover:scale-[1.035]" src={category.image} alt={category.imageAlt} />
              </a>

              <div className={`flex flex-col p-6 md:p-7 ${index === 0 ? "md:justify-between md:p-9 lg:p-10" : ""}`}>
                <div className="flex items-center justify-between">
                  <span className="rounded-full border border-[#d6ed65] bg-[#e9ff70] px-4 py-2 text-[11px] font-bold tracking-[.1em] text-[#173b2d] uppercase shadow-[0_4px_12px_rgba(108,130,40,.12)]">{category.name}</span>
                  <a className="grid size-10 place-items-center rounded-full border border-[#dce1da] text-[#173b2d] transition group-hover:border-[#173b2d] group-hover:bg-[#173b2d] group-hover:text-white" href={`#${category.name.toLowerCase()}`} aria-label={`Explore ${category.name}`}><Icon name="arrow" /></a>
                </div>

                <div className={index === 0 ? "mt-12" : "mt-9"}>
                  <h3 className={`m-0 font-serif leading-[1.06] tracking-[-.03em] ${index === 0 ? "text-[clamp(34px,3.5vw,52px)]" : "text-[30px]"}`}><a className="transition hover:text-[#d95e35]" href={`#${category.name.toLowerCase()}`}>{category.headline}</a></h3>
                  <p className="mt-5 mb-0 flex items-center gap-2 text-[11px] font-bold text-[#6f7973]">Read {category.name.toLowerCase()} stories <span aria-hidden="true">→</span></p>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
