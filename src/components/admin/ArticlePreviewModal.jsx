import { useEffect } from "react";

export default function ArticlePreviewModal({ article, image, onClose }) {
  useEffect(() => {
    const closeOnEscape = (event) => event.key === "Escape" && onClose();
    document.addEventListener("keydown", closeOnEscape);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", closeOnEscape);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  return (
    <div className="fixed inset-0 z-[100] overflow-y-auto bg-[#111318]/65 p-3 backdrop-blur-sm md:p-8" role="dialog" aria-modal="true" aria-labelledby="article-preview-title" onMouseDown={(event) => event.target === event.currentTarget && onClose()}>
      <div className="mx-auto max-w-[1000px] rounded-xl bg-white shadow-2xl">
        <div className="sticky top-0 z-10 flex items-center justify-between rounded-t-xl border-b border-[#dcdde0] bg-white/95 px-5 py-4 backdrop-blur">
          <div><p className="m-0 text-[10px] font-bold tracking-[.1em] text-[#4f9488] uppercase">Article preview</p><p className="mt-1 mb-0 text-xs text-[#5f6368]">Nothing has been saved.</p></div>
          <button className="rounded-lg border border-[#cfd2d4] bg-white px-4 py-2 text-xs font-bold" type="button" onClick={onClose}>Close preview</button>
        </div>
        <article className="px-5 py-10 md:px-12 md:py-14">
          <header className="mx-auto max-w-[800px] text-center">
            <p className="mb-3 text-[11px] font-bold tracking-[.08em] text-[#4f9488] uppercase">{article.category} · {new Intl.DateTimeFormat("en-US", { month: "long", day: "numeric", year: "numeric" }).format(new Date())}</p>
            <h2 id="article-preview-title" className="m-0 font-serif text-[clamp(36px,6vw,64px)] leading-[1.02] tracking-[-.035em] text-[#111318]">{article.title || "Untitled article"}</h2>
            {article.summary && <p className="mx-auto mt-5 mb-0 max-w-[680px] text-base leading-7 text-[#4f5359]">{article.summary}</p>}
            <p className="mt-5 mb-0 text-sm">By <strong>{article.author || "Chinlung Today Newsroom"}</strong></p>
          </header>
          {image && <img className="mt-9 max-h-[620px] w-full rounded-md bg-[#eef1f3] object-contain" src={image} alt={article.imageAlt || article.title || "Article"} />}
          <div className="mx-auto mt-10 max-w-[720px] font-serif text-[19px] leading-8 text-[#25282d]">
            {(article.content || "Your article content will appear here.").split(/\n\s*\n/).map((paragraph, index) => <p key={`${index}-${paragraph.slice(0, 20)}`}>{paragraph}</p>)}
          </div>
        </article>
      </div>
    </div>
  );
}
