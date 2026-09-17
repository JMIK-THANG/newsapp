import { useEffect, useState } from "react";
import { featuredExplainer } from "../data/news";

const backendUrl = import.meta.env.VITE_BACKEND_URL || "http://localhost:5000/api";

export function normalizeExplainer(item) {
  return {
    ...item,
    readTime: item.read_time || item.readTime,
    whatHappened: item.what_happened || item.whatHappened,
    whyItMatters: item.why_it_matters || item.whyItMatters,
    whatToWatch: item.what_to_watch || item.whatToWatch,
    sourceArticleId: item.source_article_id || item.sourceArticleId || "",
    sourceArticleSlug: item.source_article_slug || item.sourceArticleSlug || item.slug,
    sourceArticleTitle: item.source_article_title || item.sourceArticleTitle || "Original report",
    isFeatured: item.is_featured ?? item.isFeatured ?? true,
    sections: Array.isArray(item.sections) ? item.sections : [],
    sources: Array.isArray(item.sources) ? item.sources : [],
  };
}

async function request(path, options) {
  const response = await fetch(`${backendUrl}/explainers${path}`, options);
  const data = await response.json();
  if (!response.ok) throw new Error(data.message || "Unable to load the explainer.");
  return data;
}

export async function getAdminExplainers() {
  const token = localStorage.getItem("adminToken");
  const data = await request("/admin/all", { headers: { Authorization: `Bearer ${token}` } });
  return data.map(normalizeExplainer);
}

export async function saveAdminExplainer(explainer) {
  const token = localStorage.getItem("adminToken");
  const path = explainer.id ? `/${explainer.id}` : "";
  const method = explainer.id ? "PUT" : "POST";
  const data = await request(path, { method, headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` }, body: JSON.stringify(explainer) });
  return normalizeExplainer(data);
}

export default function useExplainer(slug = "featured") {
  const [explainer, setExplainer] = useState(() => normalizeExplainer(featuredExplainer));
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    request(`/${slug}`).then((data) => { if (!cancelled) setExplainer(normalizeExplainer(data)); }).catch(() => {}).finally(() => { if (!cancelled) setIsLoading(false); });
    return () => { cancelled = true; };
  }, [slug]);

  return { explainer, isLoading };
}
