import { useEffect } from "react";
import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import Navbar from "./components/layout/Navbar";
import HeroSection from "./components/home/HeroSection";
import LatestStories from "./components/home/LatestStories";
import StoryExplained from "./components/home/StoryExplained";
import LatestNewsTicker from "./components/home/LatestNewsTicker";
import LatestArticles from "./components/home/LatestArticles";
import Footer from "./components/layout/Footer";
import NewsPage from "./pages/NewsPage";
import EditorialPage from "./pages/EditorialPage";
import ArticlesPage from "./pages/ArticlesPage";
import FeatureArticlePage from "./pages/FeatureArticlePage";
import SportsPage from "./pages/SportsPage";
import BusinessPage from "./pages/BusinessPage";
import ArticleDetailPage from "./pages/ArticleDetailPage";
import ContactPage from "./pages/ContactPage";
import PrivacyPage from "./pages/PrivacyPage";
import AboutPage from "./pages/AboutPage";
import ExplainerPage from "./pages/ExplainerPage";
import PodcastsPage from "./pages/PodcastsPage";
import Admin from "./pages/Admin/Admin";
import AdminLogin from "./pages/Admin/AdminLogin";
import ManageNews from "./pages/Admin/ManageNews";
import ExplainerAdmin from "./pages/Admin/ExplainerAdmin";
import ProtectedAdminRoute from "./components/admin/ProtectedAdminRoute";

function ScrollToTop() {
  const location = useLocation();
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
  }, [location.pathname]);
  return null;
}

function HomePage() {
  return <><LatestNewsTicker /><HeroSection /><LatestArticles /><LatestStories /><StoryExplained /></>;
}

export default function App() {
  return <><ScrollToTop /><Navbar /><Routes>
    <Route path="/" element={<HomePage />} />
    <Route path="/news" element={<NewsPage />} />
    <Route path="/news/category/:filter" element={<NewsPage />} />
    <Route path="/news/story/:storyKey" element={<ArticleDetailPage section="news" />} />
    <Route path="/news/:storyKey" element={<ArticleDetailPage section="news" />} />
    <Route path="/n/:storyKey" element={<ArticleDetailPage section="news" />} />
    <Route path="/editorial" element={<EditorialPage />} />
    <Route path="/editorial/:storyKey" element={<ArticleDetailPage section="editorial" />} />
    <Route path="/articles" element={<ArticlesPage />} />
    <Route path="/articles/category/:categorySlug" element={<ArticlesPage />} />
    <Route path="/articles/:storyKey" element={<FeatureArticlePage />} />
    <Route path="/a/:storyKey" element={<FeatureArticlePage />} />
    <Route path="/sports" element={<SportsPage />} />
    <Route path="/sports/:storyKey" element={<ArticleDetailPage section="sports" />} />
    <Route path="/business" element={<BusinessPage />} />
    <Route path="/business/:storyKey" element={<ArticleDetailPage section="business" />} />
    <Route path="/podcasts" element={<PodcastsPage />} />
    <Route path="/contact" element={<ContactPage />} />
    <Route path="/privacy" element={<PrivacyPage />} />
    <Route path="/about" element={<AboutPage />} />
    <Route path="/explainers/:slug" element={<ExplainerPage />} />
    <Route path="/admin/login" element={<AdminLogin />} />
    <Route path="/admin" element={<ProtectedAdminRoute><Admin /></ProtectedAdminRoute>} />
    <Route path="/admin/articles/new" element={<ProtectedAdminRoute><Admin defaultContentType="article" /></ProtectedAdminRoute>} />
    <Route path="/admin/manage" element={<ProtectedAdminRoute><ManageNews /></ProtectedAdminRoute>} />
    <Route path="/admin/manage/:articleId/edit" element={<ProtectedAdminRoute><Admin /></ProtectedAdminRoute>} />
    <Route path="/admin/explainers" element={<ProtectedAdminRoute><ExplainerAdmin /></ProtectedAdminRoute>} />
    <Route path="*" element={<Navigate to="/" replace />} />
  </Routes><Footer /></>;
}
