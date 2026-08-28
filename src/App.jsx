import { useEffect, useState } from "react";
import Navbar from "./components/layout/Navbar";
import HeroSection from "./components/home/HeroSection";
import LatestStories from "./components/home/LatestStories";
import Footer from "./components/layout/Footer";
import NewsPage from "./pages/NewsPage";
import EditorialPage from "./pages/EditorialPage";
import ArticlesPage from "./pages/ArticlesPage";
import SportsPage from "./pages/SportsPage";
import BusinessPage from "./pages/BusinessPage";
import ArticleDetailPage from "./pages/ArticleDetailPage";

export default function App() {
  const [route, setRoute] = useState(window.location.hash);

  useEffect(() => {
    const updateRoute = () => {
      setRoute(window.location.hash);
      window.scrollTo({ top: 0, behavior: "instant" });
    };
    window.addEventListener("hashchange", updateRoute);
    return () => window.removeEventListener("hashchange", updateRoute);
  }, []);

  const routeParts = route.replace(/^#\//, "").split("/");
  const detailSections = ["news", "editorial", "articles", "sports", "business"];
  const isDetailKey = /^(featured|story-\d+|article-\d+|popular-\d+)$/.test(routeParts[1] || "");
  const isArticleDetail = detailSections.includes(routeParts[0]) && isDetailKey;

  const page = isArticleDetail ? <ArticleDetailPage section={routeParts[0]} storyKey={routeParts[1]} />
    : route.startsWith("#/news") ? <NewsPage key={route} />
    : route.startsWith("#/editorial") ? <EditorialPage />
    : route.startsWith("#/articles") ? <ArticlesPage />
    : route.startsWith("#/sports") ? <SportsPage />
    : route.startsWith("#/business") ? <BusinessPage />
    : null;

  return <><Navbar />{page || <><HeroSection /><LatestStories /></>}<Footer /></>;
}
