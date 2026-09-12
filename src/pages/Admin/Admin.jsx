import { useMemo, useState } from "react";
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
  author: "",
  imageUrl: "",
  imagePublicId: "",
  imageAlt: "",
  status: "published",
  isTopStory: false,
};

export default function Admin() {
  const navigate = useNavigate();
  const { news, isLoading, error, addNews, updateNews, deleteNews, uploadNewsImage } = useNews({ admin: true });
  const [form, setForm] = useState(emptyForm);
  const [editingId, setEditingId] = useState(null);
  const [message, setMessage] = useState("");
  const [isSaving, setIsSaving] = useState(false);
  const [pendingImage, setPendingImage] = useState("");
  const authorSuggestions = useMemo(
    () => [...new Set(news.map((article) => article.author).filter(Boolean))],
    [news],
  );

  const handleChange = (event) => {
    const { name, type, checked, value } = event.target;
    setForm((currentForm) => ({
      ...currentForm,
      [name]: type === "checkbox" ? checked : value,
      ...(name === "imageUrl" ? { imagePublicId: "" } : {}),
    }));
    if (name === "imageUrl") setPendingImage("");
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsSaving(true);
    setMessage("");

    let articleData = form;
    if (pendingImage) {
      const uploadResult = await uploadNewsImage(pendingImage);
      if (!uploadResult.success) {
        setMessage(uploadResult.message);
        setIsSaving(false);
        return;
      }
      articleData = { ...form, imageUrl: uploadResult.imageUrl, imagePublicId: uploadResult.imagePublicId };
    }

    const result = editingId ? await updateNews(editingId, articleData) : await addNews(articleData);
    setMessage(result.message);

    if (result.success) {
      setForm(emptyForm);
      setEditingId(null);
      setPendingImage("");
    }

    setIsSaving(false);
  };

  const startEditing = (article) => {
    setEditingId(article.id);
    setForm({
      title: article.title,
      summary: article.summary,
      content: article.rawContent,
      category: article.category,
      author: article.author || "",
      imageUrl: article.image_url || "",
      imagePublicId: article.image_public_id || "",
      imageAlt: article.image_alt || "",
      status: article.status,
      isTopStory: Boolean(article.is_top_story),
    });
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const cancelEditing = () => { setEditingId(null); setPendingImage(""); setForm(emptyForm); setMessage(""); };

  const handleDelete = async (article) => {
    if (!window.confirm(`Delete “${article.title}”? This cannot be undone.`)) return;
    const result = await deleteNews(article.id);
    setMessage(result.message);
    if (result.success && editingId === article.id) cancelEditing();
  };

  const handleImageFile = (event) => {
    const file = event.target.files?.[0];
    if (!file) return;
    if (!file.type.startsWith("image/")) { setMessage("Please choose an image file."); return; }
    if (file.size > 2 * 1024 * 1024) { setMessage("Please choose an image smaller than 2 MB."); return; }
    const reader = new FileReader();
    reader.onload = () => {
      setPendingImage(reader.result);
      setForm((current) => ({
        ...current,
        imageAlt: current.imageAlt || file.name.replace(/\.[^.]+$/, "").replace(/[-_]/g, " "),
      }));
    };
    reader.readAsDataURL(file);
  };

  return (
    <main className="bg-[#f7f5ef] px-3 py-10 md:px-6">
      <div className="mx-auto max-w-[1100px]">
        <header className="mb-8 flex flex-col gap-5 border-b border-[#dcdde0] pb-6 sm:flex-row sm:items-end sm:justify-between">
          <div><p className="mb-2 text-[11px] font-bold tracking-[.08em] text-[#4f9488] uppercase">
            Chinlung Today Admin
          </p>
          <h1 className="m-0 font-serif text-[clamp(36px,5vw,58px)] leading-none text-[#111318]">
            {editingId ? "Edit News" : "Post News"}
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
                Writer name
                <input className="mt-2 w-full rounded-lg border border-[#cfd2d4] px-4 py-3 font-normal outline-none focus:border-[#4f9488]" name="author" list="saved-writers" maxLength="100" placeholder="Example: Lian Hmung" value={form.author} onChange={handleChange} required />
                <datalist id="saved-writers">{authorSuggestions.map((author) => <option value={author} key={author} />)}</datalist>
                <span className="mt-1 block text-[11px] font-normal text-[#5f6368]">Enter the reporter or writer for this article.</span>
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
                Image URL (optional)
                <input className="mt-2 w-full rounded-lg border border-[#cfd2d4] px-4 py-3 font-normal outline-none focus:border-[#4f9488]" name="imageUrl" type="text" value={form.imageUrl} onChange={handleChange} />
              </label>
              <label className="block text-sm font-semibold">
                Image description
                <input className="mt-2 w-full rounded-lg border border-[#cfd2d4] px-4 py-3 font-normal outline-none focus:border-[#4f9488]" name="imageAlt" value={form.imageAlt} onChange={handleChange} />
              </label>
            </div>

            <label className="block text-sm font-semibold">
              Or upload an image from your computer
              <input className="mt-2 block w-full rounded-lg border border-[#cfd2d4] bg-white px-4 py-3 text-sm font-normal" type="file" accept="image/*" onChange={handleImageFile} />
              <span className="mt-1 block text-[11px] font-normal text-[#5f6368]">Maximum 2 MB. A wide landscape image works best.</span>
            </label>
            {(pendingImage || form.imageUrl) && <img className="max-h-56 w-full rounded-lg bg-[#eef1f3] object-contain" src={pendingImage || form.imageUrl} alt={form.imageAlt || "Article preview"} />}

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

            <div className="flex flex-wrap gap-3"><button className="rounded-lg border-0 bg-[#182536] px-6 py-3 text-sm font-bold text-white disabled:cursor-not-allowed disabled:opacity-50" disabled={isSaving} type="submit">
              {isSaving ? "Saving…" : editingId ? "Update news" : form.status === "draft" ? "Save draft" : "Publish news"}
            </button>{editingId && <button className="rounded-lg border border-[#cfd2d4] bg-white px-6 py-3 text-sm font-semibold" type="button" onClick={cancelEditing}>Cancel edit</button>}</div>
            {message && <p className="mb-0 text-sm font-medium">{message}</p>}
          </form>

          <aside className="self-start rounded-xl border border-[#dcdde0] bg-white p-5">
            <h2 className="mt-0 text-xl">Saved news</h2>
            {isLoading && <p className="text-sm text-[#5f6368]">Loading…</p>}
            {error && <p className="text-sm text-[#8a3d3d]">{error}</p>}
            {!isLoading && !error && news.length === 0 && <p className="text-sm text-[#5f6368]">No saved news yet.</p>}
            <div className="divide-y divide-[#dcdde0]">
              {news.map((article) => (
                <article className="py-4" key={article.id}>
                  <p className="mb-1 text-[10px] font-bold text-[#4f9488] uppercase">{article.category}</p>
                  <h3 className="m-0 text-sm leading-5">{article.title}</h3>
                  <p className="my-1 text-[11px] text-[#5f6368]">By {article.author} · {article.status}</p>
                  <div className="mt-3 flex gap-2"><button className="rounded border border-[#cfd2d4] bg-white px-3 py-1.5 text-xs font-semibold" type="button" onClick={() => startEditing(article)}>Edit</button><button className="rounded border border-[#cfd2d4] bg-white px-3 py-1.5 text-xs font-semibold text-[#7a3030]" type="button" onClick={() => handleDelete(article)}>Delete</button></div>
                </article>
              ))}
            </div>
          </aside>
        </div>

        <p className="mt-6 text-xs text-[#5f6368]">
          Private newsroom dashboard · Your admin session expires after 8 hours.
        </p>
      </div>
    </main>
  );
}
