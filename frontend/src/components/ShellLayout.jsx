import { Link, NavLink, Outlet, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const navClass = ({ isActive }) =>
  `rounded-full px-4 py-2 text-sm font-semibold transition ${
    isActive
      ? "bg-white text-slate-900"
      : "text-slate-200 hover:bg-white/20 hover:text-white"
  }`;

const ShellLayout = () => {
  const { admin, logout } = useAuth();
  const navigate = useNavigate();

  const onLogout = () => {
    logout();
    navigate("/login", { replace: true });
  };

  return (
    <div className="relative min-h-screen overflow-hidden bg-(--surface)text-slate-100">
      <div className="pointer-events-none absolute -top-16 right-[-120px] h-72 w-72 rounded-full bg-cyan-400/20 blur-3xl" />
      <div className="pointer-events-none absolute bottom-0 left-[-120px] h-72 w-72 rounded-full bg-amber-300/20 blur-3xl" />

      <header className="relative border-b border-white/10 bg-white/5 backdrop-blur-md">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-3 px-4 py-4 sm:px-6 lg:px-8">
          <Link to="/dashboard" className="text-xl font-black tracking-tight text-white">
            Lead Orbit
          </Link>

          <nav className="flex items-center gap-2 rounded-full border border-white/10 bg-black/20 p-1">
            <NavLink to="/dashboard" className={navClass}>
              Dashboard
            </NavLink>
            <NavLink to="/leads" className={navClass}>
              Leads
            </NavLink>
          </nav>

          <div className="flex items-center gap-3">
            <p className="text-right text-xs text-slate-300 sm:text-sm">
              Signed in as
              <span className="block font-semibold text-white">{admin?.name}</span>
            </p>
            <button
              type="button"
              onClick={onLogout}
              className="rounded-full border border-white/25 bg-white/10 px-4 py-2 text-sm font-semibold text-white transition hover:bg-white hover:text-slate-900"
            >
              Logout
            </button>
          </div>
        </div>
      </header>

      <main className="relative mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:px-8">
        <Outlet />
      </main>
    </div>
  );
};

export default ShellLayout;
