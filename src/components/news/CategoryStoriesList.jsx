import NewsListCard from "./NewsListCard";

export default function CategoryStoriesList({ category, stories, storyPath }) {
  if (!stories.length) return null;
  return <aside className="xl:sticky xl:top-[118px] xl:self-start" aria-label={`More from ${category}`}>
    <h2 className="article-display-font m-0 border-t-2 border-b border-[#dcdde0] border-t-[#182536] py-4 text-[24px] font-semibold text-[#182536]">More from {category}</h2>
    <ul className="m-0 list-none divide-y divide-[#dcdde0] p-0">
      {stories.map((story) => <li className="most-read-preview" key={story.id || story.slug}>
        <NewsListCard story={story} path={storyPath(story)} showCategory={false} />
      </li>)}
    </ul>
  </aside>;
}
