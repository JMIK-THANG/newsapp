import { useCallback, useEffect, useState } from "react";

const backendUrl =
  import.meta.env.VITE_BACKEND_URL || "http://localhost:5000/api";

export function normalizeNewsArticle(article) {
  const publishedDate = article.published_at || article.created_at;
  const wordCount = article.content?.trim().split(/\s+/).length || 0;
  const readTime = `${Math.max(1, Math.ceil(wordCount / 220))} min read`;

  return {
    ...article,
    rawContent: article.content || "",
    image:
      article.image_url ||
      "https://images.unsplash.com/photo-1504711434969-e33886168f5c?auto=format&fit=crop&w=1400&q=85",
    imageAlt: article.image_alt || article.title,
    isTopStory: article.is_top_story,
    publishedAt: publishedDate,
    date: publishedDate
      ? new Intl.DateTimeFormat("en-US", {
          month: "long",
          day: "numeric",
          year: "numeric",
        }).format(new Date(publishedDate))
      : "Draft",
    readTime,
    time: readTime.replace(" read", ""),
    content: article.content
      ? article.content.split(/\n\s*\n/).filter(Boolean)
      : [],
  };
}

export async function getNewsArticle(slug) {
  const response = await fetch(`${backendUrl}/news/${slug}`);
  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Unable to load this article.");
  }

  return normalizeNewsArticle(data);
}

export async function getRelatedNewsArticles(slug) {
  const response = await fetch(`${backendUrl}/news/${slug}/related`);
  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Unable to load related news.");
  }

  return data.map(normalizeNewsArticle);
}

export default function useNews({ admin = false } = {}) {
  const [news, setNews] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  const getNews = useCallback(async () => {
    try {
      setError("");
      const response = await fetch(`${backendUrl}/news?limit=100`);
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Unable to load news.");
      }

      setNews(data.map(normalizeNewsArticle));
    } catch (requestError) {
      setError(requestError.message);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const addNews = async (newArticle) => {
    try {
      const token = localStorage.getItem("adminToken");

      if (!token) {
        return { success: false, message: "Please log in as admin again." };
      }

      const response = await fetch(`${backendUrl}/news`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(newArticle),
      });
      const data = await response.json();

      if (!response.ok) {
        return { success: false, message: data.message || "Unable to publish news." };
      }

      if (data.status === "published") {
        setNews((currentNews) => [normalizeNewsArticle(data), ...currentNews]);
      }

      return { success: true, message: "News saved successfully." };
    } catch {
      return { success: false, message: "Could not connect to the backend." };
    }
  };

  const getAdminNews = useCallback(async () => {
    try {
      setIsLoading(true);
      setError("");
      const token = localStorage.getItem("adminToken");
      const response = await fetch(`${backendUrl}/news/admin/all`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.message || "Unable to load admin news.");
      setNews(data.map(normalizeNewsArticle));
    } catch (requestError) {
      setError(requestError.message);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const updateNews = async (id, article) => {
    try {
      const token = localStorage.getItem("adminToken");
      const response = await fetch(`${backendUrl}/news/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
        body: JSON.stringify(article),
      });
      const data = await response.json();
      if (!response.ok) return { success: false, message: data.message || "Unable to update news." };
      setNews((items) => items.map((item) => item.id === id ? normalizeNewsArticle(data) : item));
      return { success: true, message: "News updated successfully." };
    } catch {
      return { success: false, message: "Could not connect to the backend." };
    }
  };

  const deleteNews = async (id) => {
    try {
      const token = localStorage.getItem("adminToken");
      const response = await fetch(`${backendUrl}/news/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await response.json();
      if (!response.ok) return { success: false, message: data.message || "Unable to delete news." };
      setNews((items) => items.filter((item) => item.id !== id));
      return { success: true, message: data.message };
    } catch {
      return { success: false, message: "Could not connect to the backend." };
    }
  };

  const uploadNewsImage = async (imageData) => {
    try {
      const token = localStorage.getItem("adminToken");
      const response = await fetch(`${backendUrl}/uploads/image`, {
        method: "POST",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
        body: JSON.stringify({ imageData }),
      });
      const data = await response.json();
      if (!response.ok) return { success: false, message: data.message || "Unable to upload image." };
      return { success: true, ...data };
    } catch {
      return { success: false, message: "Could not upload the image." };
    }
  };

  useEffect(() => {
    let cancelled = false;

    const token = localStorage.getItem("adminToken");
    fetch(admin ? `${backendUrl}/news/admin/all` : `${backendUrl}/news?limit=100`, {
      headers: admin ? { Authorization: `Bearer ${token}` } : undefined,
    })
      .then(async (response) => {
        const data = await response.json();
        if (!response.ok) {
          throw new Error(data.message || "Unable to load news.");
        }
        if (!cancelled) {
          setNews(data.map(normalizeNewsArticle));
        }
      })
      .catch((requestError) => {
        if (!cancelled) setError(requestError.message);
      })
      .finally(() => {
        if (!cancelled) setIsLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, [admin]);

  return { news, isLoading, error, addNews, updateNews, deleteNews, uploadNewsImage, getNews, getAdminNews };
}
