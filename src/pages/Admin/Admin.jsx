import { useEffect, useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import AdminHeader from "../../components/admin/AdminHeader";
import ArticlePreviewModal from "../../components/admin/ArticlePreviewModal";
import useNews, { getAdminNewsArticle } from "../../hooks/useNews";

const categories = ["Chin News", "Myanmar News", "International News", "Sports", "Business"];
const emptyForm = { title: "", summary: "", content: "", category: "Chin News", author: "", imageUrl: "", imagePublicId: "", imageAlt: "", status: "published", isTopStory: false };
const fieldClass = "mt-2 w-full rounded-lg border border-[#cfd2d4] bg-white px-4 py-3 font-normal outline-none transition focus:border-[#4f9488] focus:ring-2 focus:ring-[#4f9488]/15";

export default function Admin() {
  const { articleId } = useParams();
  const navigate = useNavigate();
  const { news, addNews, updateNews, uploadNewsImage } = useNews({ admin: true });
  const [form, setForm] = useState(emptyForm);
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("success");
  const [isSaving, setIsSaving] = useState(false);
  const [isLoadingArticle, setIsLoadingArticle] = useState(Boolean(articleId));
  const [pendingImage, setPendingImage] = useState("");
  const [showPreview, setShowPreview] = useState(false);
  const isEditing = Boolean(articleId);
  const authorSuggestions = useMemo(() => [...new Set(news.map((article) => article.author).filter(Boolean))], [news]);

  useEffect(() => {
    if (!articleId) return;
    let cancelled = false;
    getAdminNewsArticle(articleId)
      .then((article) => {
        if (cancelled) return;
        setForm({ title: article.title, summary: article.summary, content: article.rawContent, category: article.category, author: article.author || "", imageUrl: article.image_url || "", imagePublicId: article.image_public_id || "", imageAlt: article.image_alt || "", status: "published", isTopStory: Boolean(article.is_top_story) });
      })
      .catch((error) => { if (!cancelled) { setMessageType("error"); setMessage(error.message); } })
      .finally(() => { if (!cancelled) setIsLoadingArticle(false); });
    return () => { cancelled = true; };
  }, [articleId]);

  const handleChange = (event) => {
    const { name, type, checked, value } = event.target;
    setForm((current) => ({ ...current, [name]: type === "checkbox" ? checked : value, ...(name === "imageUrl" ? { imagePublicId: "" } : {}) }));
    if (name === "imageUrl") setPendingImage("");
    setMessage("");
  };

  const handleImageFile = (event) => {
    const file = event.target.files?.[0];
    if (!file) return;
    if (!file.type.startsWith("image/")) { setMessageType("error"); setMessage("Please choose an image file."); return; }
    if (file.size > 2 * 1024 * 1024) { setMessageType("error"); setMessage("Please choose an image smaller than 2 MB."); return; }
    const reader = new FileReader();
    reader.onload = () => {
      setPendingImage(reader.result);
      setForm((current) => ({ ...current, imageAlt: current.imageAlt || file.name.replace(/\.[^.]+$/, "").replace(/[-_]/g, " ") }));
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsSaving(true);
    setMessage("");
    let articleData = { ...form, status: "published" };
    if (pendingImage) {
      const uploadResult = await uploadNewsImage(pendingImage);
      if (!uploadResult.success) { setMessageType("error"); setMessage(uploadResult.message); setIsSaving(false); return; }
      articleData = { ...articleData, imageUrl: uploadResult.imageUrl, imagePublicId: uploadResult.imagePublicId };
    }
    const result = isEditing ? await updateNews(Number(articleId), articleData) : await addNews(articleData);
    setMessageType(result.success ? "success" : "error");
    setMessage(result.success ? (isEditing ? "Article updated successfully." : "Article published successfully.") : result.message);
    if (result.success && !isEditing) { setForm(emptyForm); setPendingImage(""); event.currentTarget.reset(); }
    setIsSaving(false);
  };

  return (
    <main className="min-h-[70vh] bg-[#f7f5ef] px-3 py-8 md:px-6 md:py-10">
      <div className="mx-auto max-w-[1050px]">
        <AdminHeader title={isEditing ? "Edit News" : "Post News"} description={isEditing ? "Update the complete article while preserving its published URL." : "Create and publish a complete story for Chinlung Today."} />
        {isLoadingArticle ? <div className="rounded-xl border border-[#dcdde0] bg-white p-10 text-center text-sm text-[#5f6368]">Loading article…</div> : (
          <form className="space-y-6 rounded-xl border border-[#dcdde0] bg-white p-5 shadow-[0_14px_40px_rgba(24,37,54,.06)] md:p-8 lg:p-10" onSubmit={handleSubmit}>
            <label className="block text-sm font-semibold">Headline<input className={`${fieldClass} text-lg`} name="title" value={form.title} onChange={handleChange} required /></label>
            <div className="grid gap-5 sm:grid-cols-2">
              <label className="block text-sm font-semibold">Category<select className={fieldClass} name="category" value={form.category} onChange={handleChange}>{categories.map((category) => <option key={category}>{category}</option>)}</select></label>
              <label className="block text-sm font-semibold">Writer name<input className={fieldClass} name="author" list="saved-writers" maxLength="100" placeholder="Example: Lian Hmung" value={form.author} onChange={handleChange} required /><datalist id="saved-writers">{authorSuggestions.map((author) => <option value={author} key={author} />)}</datalist></label>
            </div>
            <label className="block text-sm font-semibold">Short summary<textarea className={`${fieldClass} min-h-24 resize-y`} name="summary" value={form.summary} onChange={handleChange} required /></label>
            <label className="block text-sm font-semibold">Full article<textarea className={`${fieldClass} min-h-[340px] resize-y leading-7`} name="content" value={form.content} onChange={handleChange} required /></label>
            <div className="grid gap-5 sm:grid-cols-2">
              <label className="block text-sm font-semibold">Image URL (optional)<input className={fieldClass} name="imageUrl" type="text" value={form.imageUrl} onChange={handleChange} /></label>
              <label className="block text-sm font-semibold">Image description<input className={fieldClass} name="imageAlt" value={form.imageAlt} onChange={handleChange} /></label>
            </div>
            <label className="block text-sm font-semibold">Or upload an image from your computer<input className={`${fieldClass} text-sm`} type="file" accept="image/*" onChange={handleImageFile} /><span className="mt-1 block text-[11px] font-normal text-[#5f6368]">Maximum 2 MB. A wide landscape image works best.</span></label>
            {(pendingImage || form.imageUrl) && <img className="max-h-80 w-full rounded-lg bg-[#eef1f3] object-contain" src={pendingImage || form.imageUrl} alt={form.imageAlt || "Article preview"} />}
            <label className="flex items-center gap-2 text-sm font-semibold"><input name="isTopStory" type="checkbox" checked={form.isTopStory} onChange={handleChange} />Make this the Top Story</label>
            {message && <div className={`rounded-lg border px-4 py-3 text-sm font-semibold ${messageType === "success" ? "border-[#b9d8ce] bg-[#eff8f5] text-[#286a5d]" : "border-[#e0bcbc] bg-[#fbf0f0] text-[#8a3030]"}`} role="status">{message}</div>}
            <div className="flex flex-wrap gap-3 border-t border-[#dcdde0] pt-6">
              <button className="rounded-lg border-0 bg-[#182536] px-7 py-3 text-sm font-bold text-white shadow-sm transition hover:bg-[#2b4052] disabled:opacity-50" disabled={isSaving} type="submit">{isSaving ? "Publishing…" : isEditing ? "Update article" : "Publish"}</button>
              <button className="rounded-lg border border-[#182536] bg-white px-7 py-3 text-sm font-bold text-[#182536] transition hover:bg-[#f1f4f5]" type="button" onClick={() => setShowPreview(true)}>Preview</button>
              {isEditing && <button className="rounded-lg border border-[#cfd2d4] bg-white px-7 py-3 text-sm font-semibold" type="button" onClick={() => navigate("/admin/manage")}>Cancel edit</button>}
            </div>
          </form>
        )}
        <p className="mt-6 text-xs text-[#5f6368]">Private newsroom dashboard · Your admin session expires after 8 hours.</p>
      </div>
      {showPreview && <ArticlePreviewModal article={form} image={pendingImage || form.imageUrl} onClose={() => setShowPreview(false)} />}
    </main>
  );
}
