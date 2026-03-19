import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const RegisterPage = () => {
  const { register } = useAuth();
  const navigate = useNavigate();

  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const onChange = (event) => {
    const { name, value } = event.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const onSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    setError("");

    try {
      await register(form);
      navigate("/dashboard", { replace: true });
    } catch (err) {
      setError(err.response?.data?.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="grid min-h-screen place-items-center bg-[radial-gradient(circle_at_80%_20%,#7c2d12_0%,#020617_45%,#0f172a_100%)] px-4">
      <div className="w-full max-w-md rounded-3xl border border-white/15 bg-slate-950/60 p-8 backdrop-blur-md">
        <p className="text-xs font-semibold uppercase tracking-[0.3em] text-amber-300">Admin Setup</p>
        <h1 className="mt-2 text-3xl font-black text-white">Create Account</h1>
        <p className="mt-2 text-sm text-slate-300">Register an admin user to access the CRM dashboard.</p>

        <form onSubmit={onSubmit} className="mt-6 grid gap-4">
          <label className="grid gap-2 text-sm text-slate-200">
            <span>Name</span>
            <input
              required
              name="name"
              value={form.name}
              onChange={onChange}
              className="rounded-xl border border-white/20 bg-slate-900 px-3 py-2 outline-none ring-amber-300 focus:ring"
            />
          </label>

          <label className="grid gap-2 text-sm text-slate-200">
            <span>Email</span>
            <input
              required
              type="email"
              name="email"
              value={form.email}
              onChange={onChange}
              className="rounded-xl border border-white/20 bg-slate-900 px-3 py-2 outline-none ring-amber-300 focus:ring"
            />
          </label>

          <label className="grid gap-2 text-sm text-slate-200">
            <span>Password</span>
            <input
              required
              type="password"
              name="password"
              value={form.password}
              onChange={onChange}
              className="rounded-xl border border-white/20 bg-slate-900 px-3 py-2 outline-none ring-amber-300 focus:ring"
            />
          </label>

          {error ? <p className="text-sm text-rose-300">{error}</p> : null}

          <button
            type="submit"
            disabled={loading}
            className="mt-2 rounded-full bg-amber-300 px-4 py-2 font-bold text-slate-900 transition hover:bg-amber-200 disabled:opacity-70"
          >
            {loading ? "Creating..." : "Register"}
          </button>
        </form>

        <p className="mt-5 text-sm text-slate-300">
          Already registered?{" "}
          <Link to="/login" className="font-semibold text-amber-300 underline">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default RegisterPage;
