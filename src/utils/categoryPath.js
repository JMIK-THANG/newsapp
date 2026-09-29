export function categoryPath(category, section = "news") {
  const paths = {
    "Chin News": "/news/category/chin",
    "Myanmar News": "/news/category/myanmar",
    "International News": "/news/category/international",
    Sports: "/sports",
    Business: "/business",
    Editorial: "/editorial",
    Cahram: "/articles/category/cahram",
    "News Article": "/articles/category/news-articles",
  };
  return paths[category] || `/${section}`;
}
