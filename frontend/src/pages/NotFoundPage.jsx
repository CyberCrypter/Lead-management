import { Link } from "react-router-dom";

const NotFoundPage = () => {
  return (
    <div className="grid min-h-screen place-items-center bg-slate-950 px-4 text-center text-slate-100">
      <div>
        <p className="text-xs uppercase tracking-[0.35em] text-cyan-300">404</p>
        <h1 className="mt-2 text-4xl font-black">Page Not Found</h1>
        <Link
          to="/dashboard"
          className="mt-4 inline-flex rounded-full bg-cyan-300 px-4 py-2 font-bold text-slate-900"
        >
          Go Home
        </Link>
      </div>
    </div>
  );
};

export default NotFoundPage;
