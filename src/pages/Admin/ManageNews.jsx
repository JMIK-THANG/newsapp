import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import AdminHeader from "../../components/admin/AdminHeader";
import ConfirmDeleteModal from "../../components/admin/ConfirmDeleteModal";
import useNews, { getAdminNewsPage } from "../../hooks/useNews";

const sortOptions = [
  ["newest", "Newest"], ["oldest", "Oldest"], ["az", "A–Z"], ["za", "Z–A"],
];

export default function ManageNews() {
  const { deleteNews } = useNews();
  const [articles, setArticles] = useState([]);
  const [searchInput, setSearchInput] = useState("");
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("newest");
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const timeout = setTimeout(() => { setIsLoading(true); setError(""); setPage(1); setSearch(searchInput.trim()); }, 350);
    return () => clearTimeout(timeout);
  }, [searchInput]);

  useEffect(() => {
    let cancelled = false;
    getAdminNewsPage({ page, limit: 12, search, sort })
      .then((data) => {
        if (cancelled) return;
        setArticles(data.articles);
        setTotal(data.total);
        setTotalPages(data.totalPages);
      })
      .catch((requestError) => { if (!cancelled) setError(requestError.message); })
      .finally(() => { if (!cancelled) setIsLoading(false); });
    return () => { cancelled = true; };
  }, [page, search, sort]);

  const confirmDelete = async () => {
    if (!deleteTarget) return;
    setIsDeleting(true);
    const result = await deleteNews(deleteTarget.id);
    setIsDeleting(false);
    if (!result.success) { setError(result.message); setDeleteTarget(null); return; }
    setArticles((items) => items.filter((item) => item.id !== deleteTarget.id));
    setTotal((current) => Math.max(0, current - 1));
    setMessage("Article deleted successfully.");
    setDeleteTarget(null);
    if (articles.length === 1 && page > 1) setPage((current) => current - 1);
  };

  return (
    <main className="min-h-[70vh] bg-[#f7f5ef] px-3 py-8 md:px-6 md:py-10">
      <div className="mx-auto max-w-[1200px]">
        <AdminHeader title="Manage News" description="Search, organize, edit, and remove published articles from one scalable newsroom view." />

        <section className="rounded-xl border border-[#dcdde0] bg-white p-4 shadow-[0_14px_40px_rgba(24,37,54,.05)] md:p-6" aria-labelledby="manage-list-title">
          <div className="flex flex-col gap-4 border-b border-[#dcdde0] pb-5 md:flex-row md:items-end md:justify-between">
            <div><h2 id="manage-list-title" className="m-0 text-xl">All articles</h2><p className="mt-1 mb-0 text-xs text-[#5f6368]">{total} {total === 1 ? "article" : "articles"}</p></div>
            <div className="grid gap-3 sm:grid-cols-[minmax(240px,1fr)_150px]">
              <label className="text-xs font-semibold text-[#4f5359]">Search by headline<input className="mt-1.5 w-full rounded-lg border border-[#cfd2d4] px-3 py-2.5 text-sm font-normal outline-none focus:border-[#4f9488]" type="search" value={searchInput} onChange={(event) => setSearchInput(event.target.value)} placeholder="Search articles…" /></label>
              <label className="text-xs font-semibold text-[#4f5359]">Sort<select className="mt-1.5 w-full rounded-lg border border-[#cfd2d4] bg-white px-3 py-2.5 text-sm font-normal outline-none focus:border-[#4f9488]" value={sort} onChange={(event) => { setIsLoading(true); setError(""); setSort(event.target.value); setPage(1); }}>{sortOptions.map(([value, label]) => <option value={value} key={value}>{label}</option>)}</select></label>
            </div>
          </div>

          {message && <div className="mt-5 rounded-lg border border-[#b9d8ce] bg-[#eff8f5] px-4 py-3 text-sm font-semibold text-[#286a5d]" role="status">{message}</div>}
          {error && <div className="mt-5 rounded-lg border border-[#e0bcbc] bg-[#fbf0f0] px-4 py-3 text-sm font-semibold text-[#8a3030]" role="alert">{error}</div>}
          {isLoading && <p className="py-12 text-center text-sm text-[#5f6368]">Loading articles…</p>}
          {!isLoading && !error && articles.length === 0 && <div className="py-14 text-center"><p className="text-sm text-[#5f6368]">No articles match your search.</p><Link className="mt-3 inline-block text-sm font-bold text-[#182536] underline" to="/admin">Post a new article</Link></div>}

          {!isLoading && articles.length > 0 && <div className="divide-y divide-[#e2e3e4]">
            {articles.map((article) => (
              <article className="grid gap-4 py-5 sm:grid-cols-[96px_minmax(0,1fr)_auto] sm:items-center" key={article.id}>
                <img className="h-20 w-24 rounded-md bg-[#e8edf2] object-cover" src={article.image} alt="" />
                <div className="min-w-0">
                  <div className="mb-1.5 flex flex-wrap items-center gap-2 text-[10px] font-bold uppercase tracking-[.04em]">
                    <span className="text-[#4f9488]">{article.category}</span>
                    {article.isTopStory && <span className="rounded-full bg-[#182536] px-2 py-0.5 text-white">Top Story</span>}
                  </div>
                  <h3 className="m-0 overflow-hidden text-ellipsis whitespace-nowrap text-base font-semibold text-[#111318]" title={article.title}>{article.title}</h3>
                  <p className="mt-1 mb-0 line-clamp-1 text-ellipsis text-xs leading-5 text-[#5f6368]" title={article.summary}>{article.summary}</p>
                  <p className="mt-1 mb-0 text-[11px] text-[#70747a]">By {article.author} · {article.date}</p>
                </div>
                <div className="flex gap-2 sm:justify-end">
                  <Link className="rounded-lg border border-[#cfd2d4] bg-white px-4 py-2 text-xs font-bold text-[#182536] hover:border-[#182536]" to={`/admin/manage/${article.id}/edit`}>Edit</Link>
                  <button className="rounded-lg border border-[#dfc3c3] bg-white px-4 py-2 text-xs font-bold text-[#8a3030] hover:bg-[#fbf0f0]" type="button" onClick={() => { setMessage(""); setDeleteTarget(article); }}>Delete</button>
                </div>
              </article>
            ))}
          </div>}

          {totalPages > 1 && <nav className="flex items-center justify-between border-t border-[#dcdde0] pt-5" aria-label="Article pages">
            <button className="rounded-lg border border-[#cfd2d4] bg-white px-4 py-2 text-xs font-bold disabled:cursor-not-allowed disabled:opacity-40" type="button" disabled={page === 1} onClick={() => { setIsLoading(true); setError(""); setPage((current) => current - 1); }}>Previous</button>
            <span className="text-xs font-semibold text-[#5f6368]">Page {page} of {totalPages}</span>
            <button className="rounded-lg border border-[#cfd2d4] bg-white px-4 py-2 text-xs font-bold disabled:cursor-not-allowed disabled:opacity-40" type="button" disabled={page === totalPages} onClick={() => { setIsLoading(true); setError(""); setPage((current) => current + 1); }}>Next</button>
          </nav>}
        </section>
      </div>
      <ConfirmDeleteModal article={deleteTarget} isDeleting={isDeleting} onCancel={() => setDeleteTarget(null)} onConfirm={confirmDelete} />
    </main>
  );
}
