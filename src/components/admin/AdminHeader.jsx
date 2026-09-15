import { NavLink, useNavigate } from "react-router-dom";

const linkClass = ({ isActive }) =>
  `rounded-lg px-4 py-2 text-sm font-semibold transition ${isActive ? "bg-[#182536] text-white" : "text-[#30343a] hover:bg-[#edf1ef]"}`;

export default function AdminHeader({ eyebrow = "Private newsroom", title, description }) {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("adminToken");
    localStorage.removeItem("adminUser");
    navigate("/admin/login", { replace: true });
  };

  return (
    <header className="mb-8 border-b border-[#dcdde0] pb-6">
      <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <p className="mb-2 text-[11px] font-bold tracking-[.1em] text-[#4f9488] uppercase">{eyebrow}</p>
          <h1 className="m-0 font-serif text-[clamp(36px,5vw,56px)] leading-none text-[#111318]">{title}</h1>
          <p className="mt-3 mb-0 max-w-2xl text-sm leading-6 text-[#5f6368]">{description}</p>
        </div>
        <button className="w-fit rounded-lg border border-[#cfd2d4] bg-white px-4 py-2 text-xs font-semibold hover:border-[#182536]" type="button" onClick={logout}>Log out</button>
      </div>
      <nav className="mt-6 flex flex-wrap gap-2" aria-label="Admin navigation">
        <NavLink className={linkClass} to="/admin" end>Post News</NavLink>
        <NavLink className={linkClass} to="/admin/manage">Manage News</NavLink>
      </nav>
    </header>
  );
}
