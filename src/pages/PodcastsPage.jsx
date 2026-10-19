import usePodcasts from "../hooks/usePodcasts";
import { youtubeThumbnail } from "../utils/youtube";

function EpisodeVideo({ episode }) {
  if (episode.youtube_id) return <div className="aspect-video w-full bg-[#111318]"><iframe className="h-full w-full" src={`https://www.youtube-nocookie.com/embed/${episode.youtube_id}`} title={episode.title} loading="lazy" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowFullScreen /></div>;
  return <video className="aspect-video w-full bg-[#111318] object-cover" controls preload="metadata" poster={episode.thumbnail_url || undefined}>
    <source src={episode.video_url} />
    Your browser does not support this video.
  </video>;
}

function EpisodeMeta({ episode }) {
  const date = episode.published_at ? new Intl.DateTimeFormat("en-US", { month: "long", day: "numeric", year: "numeric" }).format(new Date(episode.published_at)) : "";
  return <div className="mt-4 flex flex-wrap items-center gap-x-3 gap-y-3 text-[12px] leading-[1.5] text-[#69717a]"><p className="m-0"><time dateTime={episode.published_at || undefined}>{date}</time>{date && episode.presenter ? " · " : ""}{episode.presenter}</p>{episode.youtube_url && <a className="inline-flex min-h-9 items-center rounded-full border border-[#d7d4ce] px-3 py-2 text-[12px] font-semibold text-[#9b1c1f] transition hover:border-[#9b1c1f] hover:bg-white focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-[#397d73]" href={episode.youtube_url} target="_blank" rel="noreferrer">Watch on YouTube</a>}</div>;
}

export default function PodcastsPage() {
  const { episodes, isLoading, error } = usePodcasts();
  const [featured, ...moreEpisodes] = episodes;

  return <main className="podcast-page bg-white px-4 py-4 sm:px-6 sm:py-5">
    <div className="mx-auto max-w-[1280px]">
      <header className="flex flex-col gap-3 border-b border-[#dcdde0] pb-4 sm:flex-row sm:items-end sm:justify-between sm:gap-8">
        <div><p className="mt-0 mb-1.5 text-[10px] font-semibold tracking-[.08em] text-[#397d73] uppercase">Watch and listen</p>
        <h1 className="article-display-font m-0 text-[clamp(30px,4vw,40px)] leading-[1.1] font-semibold tracking-[-.025em] text-[#182536]">Podcasts</h1></div>
        <p className="m-0 max-w-[400px] text-[13px] leading-[1.6] text-[#4f5962]">Interviews, conversations, and deeper reporting from Chinlung Today.</p>
      </header>

      {isLoading && <p className="py-16 text-center text-sm text-[#69717a]">Loading podcast episodes…</p>}
      {!isLoading && error && <p className="py-16 text-center text-sm text-[#8a3030]">{error}</p>}
      {!isLoading && !error && !featured && <section className="py-16 text-center"><h2 className="article-display-font m-0 text-3xl font-semibold text-[#182536]">New episodes are coming soon</h2><p className="mx-auto mt-3 max-w-xl text-sm leading-6 text-[#5f6368]">Until then, follow Chinlung Today on YouTube for our latest video reporting.</p><a className="mt-6 inline-flex rounded-full bg-[#b72025] px-6 py-3 text-sm font-semibold text-white" href="https://www.youtube.com/@chinlungtoday" target="_blank" rel="noreferrer">Visit our YouTube channel</a></section>}

      {featured && <>
        <section className="mt-5 grid overflow-hidden rounded-[8px] border border-[#dcdde0] bg-[#f1eee8] lg:grid-cols-[minmax(0,1.15fr)_minmax(0,1fr)]" aria-labelledby="featured-podcast-title">
          <div className="min-w-0 self-center bg-[#111318]"><EpisodeVideo episode={featured} /></div>
          <div className="min-w-0 self-center p-5 sm:p-6 lg:p-7">
            <p className="m-0 text-[10px] font-semibold tracking-[.08em] text-[#397d73] uppercase">Latest episode</p>
            <h2 id="featured-podcast-title" className="mt-2 mb-0 text-[20px] leading-[1.35] font-semibold text-[#182536] sm:text-[24px]">{featured.title}</h2>
            {featured.description?.trim() !== featured.title?.trim() && <p className="mt-3 mb-0 whitespace-pre-line text-[14px] leading-[1.65] text-[#3f474f]">{featured.description}</p>}
            <EpisodeMeta episode={featured} />
          </div>
        </section>

        {moreEpisodes.length > 0 && <section className="pt-7 pb-4 sm:pt-8" aria-labelledby="more-podcasts-title">
          <div className="mb-5 flex items-center justify-between gap-3 border-b border-[#dcdde0] pb-3"><h2 id="more-podcasts-title" className="article-display-font m-0 text-[21px] font-semibold text-[#182536]">More episodes</h2><span className="text-[11px] text-[#69717a]">{moreEpisodes.length} episode{moreEpisodes.length === 1 ? "" : "s"}</span></div>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {moreEpisodes.map((episode) => <article className="min-w-0 overflow-hidden rounded-[7px] border border-[#dcdde0]" key={episode.id}><div className="bg-[#111318]" style={{ backgroundImage: `url(${episode.thumbnail_url || youtubeThumbnail(episode.youtube_id)})` }}><EpisodeVideo episode={episode} /></div><div className="p-4"><h3 className="m-0 line-clamp-3 text-[18px] leading-[1.35] font-semibold text-[#182536]">{episode.title}</h3><p className="mt-2 mb-0 line-clamp-2 text-[13px] leading-[1.65] text-[#4f5962]">{episode.description}</p><EpisodeMeta episode={episode} /></div></article>)}
          </div>
        </section>}
      </>}
    </div>
  </main>;
}
