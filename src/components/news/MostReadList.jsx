import NewsListCard from "./NewsListCard";
export default function MostReadList({ stories, storyPath }) {
  return <div aria-label="Most Read">
    <h2 className="article-display-font m-0 py-4 text-[21px] font-semibold text-[#182536]">Most Read</h2>
    {stories.map(story => <div className="most-read-preview" key={story.id || story.title}><NewsListCard story={story} path={storyPath(story)} /></div>)}
    {!stories.length && <p className="text-sm text-[#69717a]">Most-read stories will appear as readers open published news.</p>}
  </div>;
}
