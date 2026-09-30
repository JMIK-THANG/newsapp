import { useEffect, useState } from "react";

const backendUrl = import.meta.env.VITE_BACKEND_URL || "http://localhost:5000/api";

async function request(path = "", options = {}) {
  const response = await fetch(`${backendUrl}/podcasts${path}`, { cache: "no-store", ...options });
  const data = await response.json();
  if (!response.ok) throw new Error(data.message || "Unable to load podcasts.");
  return data;
}

export default function usePodcasts() {
  const [episodes, setEpisodes] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  useEffect(() => {
    let cancelled = false;
    request().then((data) => { if (!cancelled) setEpisodes(data); }).catch((requestError) => { if (!cancelled) setError(requestError.message); }).finally(() => { if (!cancelled) setIsLoading(false); });
    return () => { cancelled = true; };
  }, []);
  return { episodes, isLoading, error };
}

export async function getAdminPodcasts() {
  const token = localStorage.getItem("adminToken");
  return request("/admin/all", { headers: { Authorization: `Bearer ${token}` } });
}

export async function uploadPodcastVideo(videoData) {
  const token = localStorage.getItem("adminToken");
  const response = await fetch(`${backendUrl}/uploads/video`, { method: "POST", headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` }, body: JSON.stringify({ videoData }) });
  const data = await response.json();
  if (!response.ok) throw new Error(data.message || "Unable to upload the video.");
  return data;
}

export async function uploadPodcastImage(imageData) {
  const token = localStorage.getItem("adminToken");
  const response = await fetch(`${backendUrl}/uploads/image`, { method: "POST", headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` }, body: JSON.stringify({ imageData }) });
  const data = await response.json();
  if (!response.ok) throw new Error(data.message || "Unable to upload the thumbnail.");
  return data;
}

export async function createPodcast(payload) {
  const token = localStorage.getItem("adminToken");
  return request("", { method: "POST", headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` }, body: JSON.stringify(payload) });
}

export async function deletePodcast(id) {
  const token = localStorage.getItem("adminToken");
  return request(`/${id}`, { method: "DELETE", headers: { Authorization: `Bearer ${token}` } });
}
