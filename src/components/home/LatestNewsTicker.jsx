import { Link } from "react-router-dom";
import useNews from "../../hooks/useNews";

function HeadlineSet({ stories, duplicate = false }) {
  return (
    <div
      className={`latest-ticker__set${duplicate ? " latest-ticker__set--duplicate" : ""}`}
      aria-hidden={duplicate || undefined}
    >
      {stories.map((story) => (
        <span className="latest-ticker__item" key={`${duplicate ? "duplicate-" : ""}${story.id || story.slug}`}>
          <Link
            className="latest-ticker__link"
            to={`/news/story/${story.slug}`}
            tabIndex={duplicate ? -1 : undefined}
          >
            {story.title}
          </Link>
          <span className="latest-ticker__separator" aria-hidden="true" />
        </span>
      ))}
    </div>
  );
}

export default function LatestNewsTicker() {
  const { news } = useNews();
  const stories = news.slice(0, 6);

  if (stories.length === 0) return null;

  return (
    <aside className="latest-ticker" aria-label="Latest news headlines">
      <div className="latest-ticker__label">
        <span className="latest-ticker__pulse" aria-hidden="true" />
        Latest
      </div>
      <div className="latest-ticker__viewport">
        <div className="latest-ticker__track">
          <HeadlineSet stories={stories} />
          <HeadlineSet stories={stories} duplicate />
        </div>
      </div>
    </aside>
  );
}
