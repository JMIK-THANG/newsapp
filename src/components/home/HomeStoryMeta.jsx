export default function HomeStoryMeta({ story, className = "" }) {
  return <p className={`home-card-meta ${className}`}>
    {story.author && <><span className="home-card-author">By <span>{story.author}</span></span><span aria-hidden="true"> · </span></>}
    <time dateTime={story.publishedAt || story.published_at || undefined}>{story.date}</time>
  </p>;
}
