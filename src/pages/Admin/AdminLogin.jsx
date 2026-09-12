import { useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";

const backendUrl =
  import.meta.env.VITE_BACKEND_URL || "http://localhost:5000/api";

export default function AdminLogin() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  if (localStorage.getItem("adminToken")) {
    return <Navigate to="/admin" replace />;
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      const response = await fetch(`${backendUrl}/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Admin login failed.");
      }

      localStorage.setItem("adminToken", data.token);
      localStorage.setItem("adminUser", JSON.stringify(data.admin));
      navigate("/admin", { replace: true });
    } catch (requestError) {
      setError(requestError.message === "Failed to fetch"
        ? "Cannot reach the news server. Please try again shortly or check the backend deployment."
        : requestError.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="grid min-h-[70vh] place-items-center bg-[#f7f5ef] px-4 py-12">
      <section className="w-full max-w-md rounded-2xl border border-[#dcdde0] bg-white p-6 shadow-[0_18px_50px_rgba(24,37,54,.08)] md:p-8">
        <p className="mb-2 text-[11px] font-bold tracking-[.1em] text-[#4f9488] uppercase">Private newsroom</p>
        <h1 className="m-0 font-serif text-4xl text-[#111318]">Admin login</h1>
        <p className="mt-3 text-sm leading-6 text-[#5f6368]">Sign in to create and manage Chinlung Today news.</p>

        <form className="mt-7 space-y-5" onSubmit={handleSubmit}>
          <label className="block text-sm font-semibold">
            Email
            <input className="mt-2 w-full rounded-lg border border-[#cfd2d4] px-4 py-3 font-normal outline-none focus:border-[#4f9488]" name="email" type="email" autoComplete="username" value={form.email} onChange={(event) => setForm({ ...form, email: event.target.value })} required />
          </label>
          <label className="block text-sm font-semibold">
            Password
            <input className="mt-2 w-full rounded-lg border border-[#cfd2d4] px-4 py-3 font-normal outline-none focus:border-[#4f9488]" name="password" type="password" autoComplete="current-password" value={form.password} onChange={(event) => setForm({ ...form, password: event.target.value })} required />
          </label>
          {error && <p className="rounded-lg bg-[#f3eee8] p-3 text-sm text-[#693e32]">{error}</p>}
          <button className="w-full rounded-lg border-0 bg-[#182536] px-5 py-3 text-sm font-bold text-white disabled:opacity-50" disabled={isLoading} type="submit">
            {isLoading ? "Signing in…" : "Sign in as admin"}
          </button>
        </form>
      </section>
    </main>
  );
}
