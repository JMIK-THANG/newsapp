import usePodcasts from "../hooks/usePodcasts";

function EpisodeVideo({ episode }) {
  return <video className="aspect-video w-full bg-[#111318] object-cover" controls preload="metadata" poster={episode.thumbnail_url || undefined}>
    <source src={episode.video_url} />
    Your browser does not support this video.
  </video>;
}

function EpisodeMeta({ episode }) {
  const date = episode.published_at ? new Intl.DateTimeFormat("en-US", { month: "long", day: "numeric", year: "numeric" }).format(new Date(episode.published_at)) : "";
  return <p className="mt-3 mb-0 text-[12px] font-medium tracking-[.02em] text-[#69717a]">{date}{date && episode.presenter ? " · " : ""}{episode.presenter}</p>;
}

export default function PodcastsPage() {
  const { episodes, isLoading, error } = usePodcasts();
  const [featured, ...moreEpisodes] = episodes;

  return <main className="bg-white px-4 py-7 sm:px-6 sm:py-10 lg:py-12">
    <div className="mx-auto max-w-[1380px]">
      <header className="border-b border-[#dcdde0] pb-6 sm:pb-8">
        <p className="mb-2 text-[11px] font-bold tracking-[.1em] text-[#4f9488] uppercase">Watch and listen</p>
        <h1 className="article-display-font m-0 text-[clamp(38px,6vw,64px)] leading-none font-semibold tracking-[-.035em] text-[#182536]">Podcasts</h1>
        <p className="mt-4 mb-0 max-w-2xl text-[17px] leading-7 text-[#4f5962]">Interviews, conversations, and deeper reporting from Chinlung Today.</p>
      </header>

      {isLoading && <p className="py-16 text-center text-sm text-[#69717a]">Loading podcast episodes…</p>}
      {!isLoading && error && <p className="py-16 text-center text-sm text-[#8a3030]">{error}</p>}
      {!isLoading && !error && !featured && <section className="py-16 text-center"><h2 className="article-display-font m-0 text-3xl font-semibold text-[#182536]">New episodes are coming soon</h2><p className="mx-auto mt-3 max-w-xl text-sm leading-6 text-[#5f6368]">Until then, follow Chinlung Today on YouTube for our latest video reporting.</p><a className="mt-6 inline-flex rounded-full bg-[#b72025] px-6 py-3 text-sm font-semibold text-white" href="https://www.youtube.com/@chinlungtoday" target="_blank" rel="noreferrer">Visit our YouTube channel</a></section>}

      {featured && <>
        <section className="grid gap-6 border-b border-[#dcdde0] py-8 lg:grid-cols-[minmax(0,1.5fr)_minmax(300px,.75fr)] lg:items-center lg:gap-10 lg:py-10" aria-labelledby="featured-podcast-title">
          <div className="overflow-hidden rounded-[6px]"><EpisodeVideo episode={featured} /></div>
          <div>
            <p className="m-0 text-[11px] font-bold tracking-[.1em] text-[#4f9488] uppercase">Latest episode</p>
            <h2 id="featured-podcast-title" className="article-display-font mt-3 mb-0 text-[clamp(30px,4vw,48px)] leading-[1.06] font-semibold tracking-[-.025em] text-[#182536]">{featured.title}</h2>
            <p className="mt-4 mb-0 text-[16px] leading-7 text-[#3f474f]">{featured.description}</p>
            <EpisodeMeta episode={featured} />
          </div>
        </section>

        {moreEpisodes.length > 0 && <section className="py-9" aria-labelledby="more-podcasts-title">
          <div className="mb-6 flex items-center gap-3"><h2 id="more-podcasts-title" className="article-display-font m-0 text-[24px] font-semibold text-[#182536]">More episodes</h2><span className="h-px flex-1 bg-[#4f9488]" /></div>
          <div className="grid gap-x-6 gap-y-9 sm:grid-cols-2 lg:grid-cols-3">
            {moreEpisodes.map((episode) => <article className="min-w-0" key={episode.id}><div className="overflow-hidden rounded-[5px]"><EpisodeVideo episode={episode} /></div><h3 className="article-display-font mt-4 mb-0 text-[24px] leading-[1.15] font-semibold text-[#182536]">{episode.title}</h3><p className="mt-2 mb-0 line-clamp-3 text-[14px] leading-6 text-[#4f5962]">{episode.description}</p><EpisodeMeta episode={episode} /></article>)}
          </div>
        </section>}
      </>}
    </div>
  </main>;
}
