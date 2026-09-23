export default function PodcastsPage() {
  return (
    <main className="bg-white px-3 py-10 md:px-6 md:py-14">
      <div className="mx-auto max-w-[1380px]">
        <header className="border-b border-[#dcdde0] pb-8">
          <p className="mb-2 text-[11px] font-semibold tracking-[.08em] text-[#4f9488] uppercase">Listen to Chinlung Today</p>
          <h1 className="m-0 font-serif text-[clamp(38px,5vw,64px)] leading-none tracking-[-.035em] text-[#111318]">Podcasts</h1>
          <p className="home-story-summary mt-5 mb-0 max-w-3xl">Interviews, conversations, and deeper reporting from Chinlung Today. New podcast episodes will appear here.</p>
        </header>
        <section className="flex flex-col items-center py-14 text-center" aria-label="Podcast availability">
          <p className="m-0 text-[13px] font-semibold tracking-[.08em] text-[#69717a] uppercase">Watch and listen</p>
          <a className="mt-5 inline-flex items-center rounded-full bg-[#b72025] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#8f181d]" href="https://www.youtube.com/@chinlungtoday" target="_blank" rel="noreferrer">Visit Chinlung Today on YouTube</a>
        </section>
      </div>
    </main>
  );
}
