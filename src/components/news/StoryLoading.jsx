export default function StoryLoading() {
  return <div role="status" aria-label="Loading stories" className="py-6">
    <div className="h-6 w-32 animate-pulse rounded bg-[#dedbd4]" />
    <div className="mt-4 aspect-[16/9] max-h-[420px] animate-pulse rounded-[6px] bg-[#e8e4dc]" />
    <div className="mt-4 h-5 w-3/4 animate-pulse rounded bg-[#dedbd4]" />
    <span className="sr-only">Loading stories…</span>
  </div>;
}
