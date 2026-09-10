import { useState } from "react";
import useNews from "../../hooks/useNews";
import { useNavigate } from "react-router-dom";

const categories = [
  "Chin News",
  "Myanmar News",
  "International News",
  "Sports",
  "Business",
];

const emptyForm = {
  title: "",
  summary: "",
  content: "",
  category: "Chin News",
  author: "Chinlung Today Newsroom",
  imageUrl: "",
  imageAlt: "",
  status: "published",
  isTopStory: false,
};

export default function Admin() {
  const navigate = useNavigate();
  const { news, isLoading, error, addNews } = useNews();
  const [form, setForm] = useState(emptyForm);
  const [message, setMessage] = useState("");
  const [isSaving, setIsSaving] = useState(false);

  const handleChange = (event) => {
    const { name, type, checked, value } = event.target;
    setForm((currentForm) => ({
      ...currentForm,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsSaving(true);
    setMessage("");

    const result = await addNews(form);
    setMessage(result.message);

    if (result.success) {
      setForm(emptyForm);
    }

    setIsSaving(false);
  };

  return (
    <main className="bg-[#f7f5ef] px-3 py-10 md:px-6">
      <div className="mx-auto max-w-[1100px]">
        <header className="mb-8 flex flex-col gap-5 border-b border-[#dcdde0] pb-6 sm:flex-row sm:items-end sm:justify-between">
          <div><p className="mb-2 text-[11px] font-bold tracking-[.08em] text-[#4f9488] uppercase">
            Chinlung Today Admin
          </p>
          <h1 className="m-0 font-serif text-[clamp(36px,5vw,58px)] leading-none text-[#111318]">
            Post News
          </h1>
          <p className="mb-0 mt-3 text-sm text-[#4f5359]">
            Development version: create an article and save it in PostgreSQL.
          </p></div>
          <button className="self-start rounded-lg border border-[#cfd2d4] bg-white px-4 py-2 text-xs font-semibold" type="button" onClick={() => { localStorage.removeItem("adminToken"); localStorage.removeItem("adminUser"); navigate("/admin/login", { replace: true }); }}>Log out</button>
        </header>

        <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_360px]">
          <form className="space-y-5 rounded-xl border border-[#dcdde0] bg-white p-5 md:p-7" onSubmit={handleSubmit}>
            <label className="block text-sm font-semibold">
              Headline
              <input className="mt-2 w-full rounded-lg border border-[#cfd2d4] px-4 py-3 font-normal outline-none focus:border-[#4f9488]" name="title" value={form.title} onChange={handleChange} required />
            </label>

            <div className="grid gap-5 sm:grid-cols-2">
              <label className="block text-sm font-semibold">
                Category
                <select className="mt-2 w-full rounded-lg border border-[#cfd2d4] bg-white px-4 py-3 font-normal outline-none focus:border-[#4f9488]" name="category" value={form.category} onChange={handleChange}>
                  {categories.map((category) => <option key={category}>{category}</option>)}
                </select>
              </label>
              <label className="block text-sm font-semibold">
                Author
                <input className="mt-2 w-full rounded-lg border border-[#cfd2d4] px-4 py-3 font-normal outline-none focus:border-[#4f9488]" name="author" value={form.author} onChange={handleChange} required />
              </label>
            </div>

            <label className="block text-sm font-semibold">
              Short summary
              <textarea className="mt-2 min-h-24 w-full rounded-lg border border-[#cfd2d4] px-4 py-3 font-normal outline-none focus:border-[#4f9488]" name="summary" value={form.summary} onChange={handleChange} required />
            </label>

            <label className="block text-sm font-semibold">
              Full article
              <textarea className="mt-2 min-h-56 w-full rounded-lg border border-[#cfd2d4] px-4 py-3 font-normal leading-6 outline-none focus:border-[#4f9488]" name="content" value={form.content} onChange={handleChange} required />
            </label>

            <div className="grid gap-5 sm:grid-cols-2">
              <label className="block text-sm font-semibold">
                Image URL
                <input className="mt-2 w-full rounded-lg border border-[#cfd2d4] px-4 py-3 font-normal outline-none focus:border-[#4f9488]" name="imageUrl" type="url" value={form.imageUrl} onChange={handleChange} />
              </label>
              <label className="block text-sm font-semibold">
                Image description
                <input className="mt-2 w-full rounded-lg border border-[#cfd2d4] px-4 py-3 font-normal outline-none focus:border-[#4f9488]" name="imageAlt" value={form.imageAlt} onChange={handleChange} />
              </label>
            </div>

            <div className="flex flex-wrap items-center gap-6">
              <label className="text-sm font-semibold">
                Status
                <select className="ml-3 rounded-lg border border-[#cfd2d4] bg-white px-3 py-2 font-normal" name="status" value={form.status} onChange={handleChange}>
                  <option value="published">Published</option>
                  <option value="draft">Draft</option>
                </select>
              </label>
              <label className="flex items-center gap-2 text-sm font-semibold">
                <input name="isTopStory" type="checkbox" checked={form.isTopStory} onChange={handleChange} />
                Make this the Top Story
              </label>
            </div>

            <button className="rounded-lg border-0 bg-[#182536] px-6 py-3 text-sm font-bold text-white disabled:cursor-not-allowed disabled:opacity-50" disabled={isSaving} type="submit">
              {isSaving ? "Saving…" : form.status === "draft" ? "Save draft" : "Publish news"}
            </button>
            {message && <p className="mb-0 text-sm font-medium">{message}</p>}
          </form>

          <aside className="self-start rounded-xl border border-[#dcdde0] bg-white p-5">
            <h2 className="mt-0 text-xl">Saved news</h2>
            {isLoading && <p className="text-sm text-[#5f6368]">Loading…</p>}
            {error && <p className="text-sm text-[#8a3d3d]">{error}</p>}
            {!isLoading && !error && news.length === 0 && <p className="text-sm text-[#5f6368]">No published news yet.</p>}
            <div className="divide-y divide-[#dcdde0]">
              {news.map((article) => (
                <article className="py-4" key={article.id}>
                  <p className="mb-1 text-[10px] font-bold text-[#4f9488] uppercase">{article.category}</p>
                  <h3 className="m-0 text-sm leading-5">{article.title}</h3>
                </article>
              ))}
            </div>
          </aside>
        </div>

        <p className="mt-6 text-xs text-[#5f6368]">
          This page is for local development only. Admin login protection is the next backend step.
        </p>
      </div>
    </main>
  );
}
