import { useEffect, useState } from "react";
import AdminHeader from "../../components/admin/AdminHeader";
import { getAdminNewsPage } from "../../hooks/useNews";
import { getAdminExplainers, saveAdminExplainer } from "../../hooks/useExplainer";

const categories = ["Chin News", "Myanmar News", "International News", "Sports", "Business"];
const emptyForm = { id: null, sourceArticleId: "", question: "", category: "Chin News", readTime: "5 min read", introduction: "", takeaway: "", whatHappened: "", whyItMatters: "", whatToWatch: "", sectionOne: "", sectionTwo: "", sectionThree: "", sourceOneLabel: "", sourceOneUrl: "", sourceTwoLabel: "", sourceTwoUrl: "", sourceThreeLabel: "", sourceThreeUrl: "", isFeatured: true };
const fieldClass = "mt-2 w-full rounded-lg border border-[#cfd2d4] bg-[#fcfbf8] px-4 py-3 font-normal outline-none focus:border-[#4f9488] focus:ring-2 focus:ring-[#4f9488]/15";

function toForm(item) {
  const sectionText = (index) => item.sections[index]?.paragraphs?.join("\n\n") || "";
  return { ...emptyForm, ...item, sectionOne: sectionText(0), sectionTwo: sectionText(1), sectionThree: sectionText(2), sourceOneLabel: item.sources[0]?.label || "", sourceOneUrl: item.sources[0]?.url || "", sourceTwoLabel: item.sources[1]?.label || "", sourceTwoUrl: item.sources[1]?.url || "", sourceThreeLabel: item.sources[2]?.label || "", sourceThreeUrl: item.sources[2]?.url || "" };
}

export default function ExplainerAdmin() {
  const [form, setForm] = useState(emptyForm);
  const [articles, setArticles] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [showPreview, setShowPreview] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    Promise.all([getAdminExplainers(), getAdminNewsPage({ limit: 50, sort: "newest" })])
      .then(([explainers, news]) => { if (explainers[0]) setForm(toForm(explainers[0])); setArticles(news.articles.filter((article) => (article.content_type || "news") === "news")); })
      .catch((requestError) => setError(requestError.message))
      .finally(() => setIsLoading(false));
  }, []);

  const change = (event) => { const { name, value } = event.target; setForm((current) => ({ ...current, [name]: value })); setMessage(""); setError(""); };
  const payload = () => ({ ...form, sourceArticleId: form.sourceArticleId ? Number(form.sourceArticleId) : null, sections: [{ title: "What happened", paragraphs: form.sectionOne.split(/\n\s*\n/).filter(Boolean) }, { title: "Why it matters", paragraphs: form.sectionTwo.split(/\n\s*\n/).filter(Boolean) }, { title: "What to watch next", paragraphs: form.sectionThree.split(/\n\s*\n/).filter(Boolean) }], sources: [[form.sourceOneLabel, form.sourceOneUrl], [form.sourceTwoLabel, form.sourceTwoUrl], [form.sourceThreeLabel, form.sourceThreeUrl]].filter(([label, url]) => label && url).map(([label, url]) => ({ label, url })) });

  const submit = async (event) => {
    event.preventDefault(); setIsSaving(true); setMessage(""); setError("");
    try { const saved = await saveAdminExplainer(payload()); setForm(toForm(saved)); setMessage("Explainer published successfully."); }
    catch (requestError) { setError(requestError.message); }
    finally { setIsSaving(false); }
  };

  const preview = payload();
  return <main className="min-h-[70vh] bg-[#f1eee8] px-3 py-8 md:px-6 md:py-10"><div className="mx-auto max-w-[1100px]"><AdminHeader title="Story, Explained" description="Create or update the featured explainer and connect it to an original Chinlung Today report." />
    {isLoading ? <div className="rounded-xl border border-[#d8d6cf] bg-[#fcfbf8] p-10 text-center text-sm">Loading explainer…</div> : <form className="space-y-6 rounded-xl border border-[#d8d6cf] bg-[#fcfbf8] p-5 shadow-[0_14px_40px_rgba(24,37,54,.05)] md:p-8 lg:p-10" onSubmit={submit}>
      <label className="block text-sm font-semibold">Original news report<select className={fieldClass} name="sourceArticleId" value={form.sourceArticleId} onChange={change} required><option value="">Select the article this explainer is based on</option>{articles.map((article) => <option value={article.id} key={article.id}>{article.title}</option>)}</select></label>
      <label className="block text-sm font-semibold">Explainer question<input className={`${fieldClass} text-lg`} name="question" value={form.question} onChange={change} placeholder="Why did…?" required /></label>
      <div className="grid gap-5 sm:grid-cols-2"><label className="block text-sm font-semibold">Category<select className={fieldClass} name="category" value={form.category} onChange={change}>{categories.map((item) => <option key={item}>{item}</option>)}</select></label><label className="block text-sm font-semibold">Reading time<input className={fieldClass} name="readTime" value={form.readTime} onChange={change} required /></label></div>
      <label className="block text-sm font-semibold">Introduction<textarea className={`${fieldClass} min-h-28`} name="introduction" value={form.introduction} onChange={change} required /></label>
      <label className="block text-sm font-semibold">Key takeaway<textarea className={`${fieldClass} min-h-24`} name="takeaway" value={form.takeaway} onChange={change} required /></label>
      <div className="grid gap-5 lg:grid-cols-3"><label className="block text-sm font-semibold">Homepage: What happened<textarea className={`${fieldClass} min-h-32`} name="whatHappened" value={form.whatHappened} onChange={change} required /></label><label className="block text-sm font-semibold">Homepage: Why it matters<textarea className={`${fieldClass} min-h-32`} name="whyItMatters" value={form.whyItMatters} onChange={change} required /></label><label className="block text-sm font-semibold">Homepage: What to watch<textarea className={`${fieldClass} min-h-32`} name="whatToWatch" value={form.whatToWatch} onChange={change} required /></label></div>
      {[['sectionOne','Full section: What happened'],['sectionTwo','Full section: Why it matters'],['sectionThree','Full section: What to watch next']].map(([name,label]) => <label className="block text-sm font-semibold" key={name}>{label}<textarea className={`${fieldClass} min-h-40 leading-6`} name={name} value={form[name]} onChange={change} required /><span className="mt-1 block text-[11px] font-normal text-[#5f6368]">Leave a blank line between paragraphs.</span></label>)}
      <fieldset className="rounded-lg border border-[#d8d6cf] p-4"><legend className="px-2 text-sm font-bold">Sources and further reading</legend>{[1,2,3].map((number) => <div className="mt-3 grid gap-3 sm:grid-cols-2" key={number}><input className={fieldClass} aria-label={`Source ${number} label`} name={`source${['','One','Two','Three'][number]}Label`} value={form[`source${['','One','Two','Three'][number]}Label`]} onChange={change} placeholder={`Source ${number} label`} /><input className={fieldClass} aria-label={`Source ${number} URL`} name={`source${['','One','Two','Three'][number]}Url`} value={form[`source${['','One','Two','Three'][number]}Url`]} onChange={change} placeholder="https://…" type="url" /></div>)}</fieldset>
      {message && <p className="rounded-lg border border-[#b9d8ce] bg-[#eff8f5] px-4 py-3 text-sm font-semibold text-[#286a5d]">{message}</p>}{error && <p className="rounded-lg border border-[#e0bcbc] bg-[#fbf0f0] px-4 py-3 text-sm font-semibold text-[#8a3030]">{error}</p>}
      <div className="flex flex-wrap gap-3 border-t border-[#d8d6cf] pt-6"><button className="rounded-lg bg-[#182536] px-7 py-3 text-sm font-bold text-white disabled:opacity-50" disabled={isSaving} type="submit">{isSaving ? "Publishing…" : form.id ? "Update explainer" : "Publish explainer"}</button><button className="rounded-lg border border-[#182536] bg-transparent px-7 py-3 text-sm font-bold" type="button" onClick={() => setShowPreview(true)}>Preview</button></div>
    </form>}</div>
    {showPreview && <div className="fixed inset-0 z-[100] overflow-y-auto bg-[#111318]/65 p-4" onMouseDown={(event) => event.target === event.currentTarget && setShowPreview(false)}><article className="mx-auto max-w-[900px] rounded-xl bg-[#fcfbf8] p-6 shadow-2xl md:p-10"><button className="float-right rounded-lg border border-[#cfd2d4] px-4 py-2 text-xs font-bold" type="button" onClick={() => setShowPreview(false)}>Close</button><p className="text-[11px] font-bold text-[#4f9488] uppercase">The story, explained</p><h2 className="clear-both font-serif text-[clamp(34px,5vw,56px)] leading-tight">{preview.question || "Explainer question"}</h2><p className="text-base leading-7 text-[#4f5359]">{preview.introduction}</p><div className="my-7 bg-[#f1eee8] p-6 font-serif text-2xl">{preview.takeaway}</div>{preview.sections.map((section) => <section className="border-t border-[#d8d6cf] py-6" key={section.title}><h3 className="font-serif text-2xl">{section.title}</h3>{section.paragraphs.map((text) => <p className="leading-7" key={text}>{text}</p>)}</section>)}</article></div>}
  </main>;
}
