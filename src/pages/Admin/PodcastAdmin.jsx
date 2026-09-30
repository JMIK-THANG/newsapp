import { useEffect, useState } from "react";
import AdminHeader from "../../components/admin/AdminHeader";
import { createPodcast, deletePodcast, getAdminPodcasts, uploadPodcastImage, uploadPodcastVideo } from "../../hooks/usePodcasts";
import { getYouTubeVideoId, youtubeThumbnail } from "../../utils/youtube";

const fieldClass = "mt-2 w-full rounded-lg border border-[#cfd2d4] bg-white px-4 py-3 font-normal outline-none focus:border-[#4f9488] focus:ring-2 focus:ring-[#4f9488]/15";
const emptyForm = { title: "", description: "", presenter: "Chinlung Today", status: "published", sourceType: "youtube", youtubeUrl: "" };
const readFile = (file) => new Promise((resolve, reject) => { const reader = new FileReader(); reader.onload = () => resolve(reader.result); reader.onerror = () => reject(new Error("The selected file could not be read.")); reader.readAsDataURL(file); });

export default function PodcastAdmin() {
  const [form, setForm] = useState(emptyForm);
  const [episodes, setEpisodes] = useState([]);
  const [videoFile, setVideoFile] = useState(null);
  const [imageFile, setImageFile] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const loadEpisodes = () => getAdminPodcasts().then(setEpisodes).catch((requestError) => setError(requestError.message)).finally(() => setIsLoading(false));
  useEffect(() => { loadEpisodes(); }, []);

  const change = (event) => { const { name, value } = event.target; setForm((current) => ({ ...current, [name]: value })); setMessage(""); setError(""); };
  const submit = async (event) => {
    event.preventDefault(); setIsSaving(true); setMessage(""); setError("");
    try {
      const youtubeId = form.sourceType === "youtube" ? getYouTubeVideoId(form.youtubeUrl) : "";
      if (form.sourceType === "youtube" && !youtubeId) throw new Error("Please enter a valid YouTube video link.");
      if (form.sourceType === "upload" && !videoFile) throw new Error("Please select a podcast video.");
      if (form.sourceType === "upload" && !imageFile) throw new Error("Please select a thumbnail for the uploaded video.");
      if (videoFile?.size > 45 * 1024 * 1024) throw new Error("Please use a video smaller than 45 MB.");
      const video = form.sourceType === "upload" ? await uploadPodcastVideo(await readFile(videoFile)) : {};
      let thumbnail = {};
      if (imageFile) thumbnail = await uploadPodcastImage(await readFile(imageFile));
      await createPodcast({ ...form, videoUrl: video.videoUrl || "", videoPublicId: video.videoPublicId || "", youtubeUrl: youtubeId ? form.youtubeUrl : "", youtubeId, thumbnailUrl: thumbnail.imageUrl || (youtubeId ? youtubeThumbnail(youtubeId) : ""), thumbnailPublicId: thumbnail.imagePublicId || "" });
      setForm(emptyForm); setVideoFile(null); setImageFile(null); setMessage("Podcast episode published successfully."); setIsLoading(true); await loadEpisodes();
    } catch (requestError) { setError(requestError.message); }
    finally { setIsSaving(false); }
  };

  const remove = async (episode) => {
    if (!window.confirm(`Delete “${episode.title}”? This also removes its uploaded files.`)) return;
    try { await deletePodcast(episode.id); setEpisodes((items) => items.filter((item) => item.id !== episode.id)); }
    catch (requestError) { setError(requestError.message); }
  };

  return <main className="min-h-[70vh] bg-[#f1eee8] px-3 py-8 md:px-6 md:py-10"><div className="mx-auto max-w-[1100px]">
    <AdminHeader title="Podcasts" description="Publish from YouTube or upload a video for the public Podcasts page." />
    <form className="grid gap-6 rounded-xl border border-[#d8d6cf] bg-[#fcfbf8] p-5 shadow-[0_14px_40px_rgba(24,37,54,.05)] md:p-8" onSubmit={submit}>
      <div className="grid gap-5 md:grid-cols-2"><label className="text-sm font-semibold">Episode title<input className={fieldClass} name="title" value={form.title} onChange={change} required /></label><label className="text-sm font-semibold">Presenter or host<input className={fieldClass} name="presenter" value={form.presenter} onChange={change} required /></label></div>
      <label className="text-sm font-semibold">Description<textarea className={`${fieldClass} min-h-32 leading-6`} name="description" value={form.description} onChange={change} required /></label>
      <fieldset className="rounded-lg border border-[#d8d6cf] p-4"><legend className="px-2 text-sm font-bold">Video source</legend><div className="flex flex-wrap gap-5"><label className="flex items-center gap-2 text-sm font-semibold"><input type="radio" name="sourceType" value="youtube" checked={form.sourceType === "youtube"} onChange={change} />YouTube link <span className="rounded-full bg-[#e5efec] px-2 py-0.5 text-[10px] text-[#397d73] uppercase">Recommended</span></label><label className="flex items-center gap-2 text-sm font-semibold"><input type="radio" name="sourceType" value="upload" checked={form.sourceType === "upload"} onChange={change} />Upload video</label></div>
        {form.sourceType === "youtube" ? <div className="mt-4 grid gap-4 sm:grid-cols-[1fr_180px] sm:items-end"><label className="text-sm font-semibold">YouTube video link<input className={fieldClass} name="youtubeUrl" type="url" value={form.youtubeUrl} onChange={change} placeholder="https://www.youtube.com/watch?v=…" required /></label>{getYouTubeVideoId(form.youtubeUrl) && <img className="aspect-video w-full rounded object-cover" src={youtubeThumbnail(getYouTubeVideoId(form.youtubeUrl))} alt="Automatic YouTube thumbnail preview" />}</div> : <label className="mt-4 block text-sm font-semibold">Video file <span className="font-normal text-[#69717a]">(MP4, WebM, or MOV; maximum 45 MB)</span><input className={`${fieldClass} file:mr-3 file:rounded file:border-0 file:bg-[#182536] file:px-3 file:py-2 file:text-xs file:font-semibold file:text-white`} type="file" accept="video/mp4,video/webm,video/quicktime" onChange={(event) => setVideoFile(event.target.files?.[0] || null)} required /></label>}
      </fieldset>
      <label className="text-sm font-semibold">Thumbnail image <span className="font-normal text-[#69717a]">{form.sourceType === "youtube" ? "(optional—YouTube thumbnail is automatic)" : "(required for uploaded videos)"}</span><input className={`${fieldClass} file:mr-3 file:rounded file:border-0 file:bg-[#182536] file:px-3 file:py-2 file:text-xs file:font-semibold file:text-white`} type="file" accept="image/jpeg,image/png,image/webp" onChange={(event) => setImageFile(event.target.files?.[0] || null)} required={form.sourceType === "upload"} /></label>
      <label className="max-w-xs text-sm font-semibold">Publishing status<select className={fieldClass} name="status" value={form.status} onChange={change}><option value="published">Published</option><option value="draft">Draft</option></select></label>
      {message && <p className="m-0 rounded-lg border border-[#b9d8ce] bg-[#eff8f5] px-4 py-3 text-sm font-semibold text-[#286a5d]">{message}</p>}{error && <p className="m-0 rounded-lg border border-[#e0bcbc] bg-[#fbf0f0] px-4 py-3 text-sm font-semibold text-[#8a3030]">{error}</p>}
      <div className="border-t border-[#d8d6cf] pt-5"><button className="rounded-lg bg-[#182536] px-7 py-3 text-sm font-bold text-white disabled:opacity-50" disabled={isSaving} type="submit">{isSaving ? "Uploading and publishing…" : "Publish podcast"}</button>{isSaving && <p className="mt-2 mb-0 text-xs text-[#69717a]">Keep this page open while the video uploads.</p>}</div>
    </form>

    <section className="mt-8" aria-labelledby="published-podcasts-title"><h2 id="published-podcasts-title" className="article-display-font text-2xl font-semibold">Published episodes</h2>{isLoading ? <p className="text-sm">Loading…</p> : <div className="grid gap-4">{episodes.map((episode) => <article className="grid gap-4 rounded-lg border border-[#d8d6cf] bg-white p-4 sm:grid-cols-[150px_1fr_auto] sm:items-center" key={episode.id}>{episode.youtube_id ? <img className="aspect-video w-full rounded bg-black object-cover" src={episode.thumbnail_url || youtubeThumbnail(episode.youtube_id)} alt="" /> : <video className="aspect-video w-full rounded bg-black object-cover" src={episode.video_url} poster={episode.thumbnail_url || undefined} preload="metadata" />}<div><p className="m-0 text-[10px] font-bold tracking-[.08em] text-[#4f9488] uppercase">{episode.status} · {episode.youtube_id ? "YouTube" : "Uploaded video"}</p><h3 className="article-display-font mt-1 mb-0 text-xl font-semibold">{episode.title}</h3><p className="mt-1 mb-0 line-clamp-2 text-xs leading-5 text-[#69717a]">{episode.description}</p></div><button className="w-fit rounded border border-[#b72025] px-4 py-2 text-xs font-bold text-[#9b1c1f]" type="button" onClick={() => remove(episode)}>Delete</button></article>)}{episodes.length === 0 && <p className="rounded-lg border border-[#d8d6cf] bg-white p-6 text-sm text-[#69717a]">No podcast episodes have been published.</p>}</div>}</section>
  </div></main>;
}
