import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import api from "../api/client";

const cardTheme = [
  "from-cyan-300/20 to-cyan-500/20 border-cyan-200/30",
  "from-amber-300/20 to-amber-500/20 border-amber-200/30",
  "from-emerald-300/20 to-emerald-500/20 border-emerald-200/30",
];

const DashboardPage = () => {
  const [leads, setLeads] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLeads = async () => {
      try {
        const { data } = await api.get("/leads");
        setLeads(data.leads || []);
      } catch (_error) {
        setLeads([]);
      } finally {
        setLoading(false);
      }
    };

    fetchLeads();
  }, []);

  const stats = useMemo(() => {
    const total = leads.length;
    const contacted = leads.filter((lead) => lead.status === "Contacted").length;
    const converted = leads.filter((lead) => lead.status === "Converted").length;

    return [
      { label: "Total Leads", value: total },
      { label: "Contacted", value: contacted },
      { label: "Converted", value: converted },
    ];
  }, [leads]);

  return (
    <section className="grid gap-6 animate-fade-in-up">
      <div className="rounded-3xl border border-white/10 bg-linear-to-r from-slate-950 via-slate-900 to-slate-950 p-6">
        <p className="text-xs uppercase tracking-[0.35em] text-cyan-200">Overview</p>
        <h1 className="mt-2 text-3xl font-black text-white">Lead Command Center</h1>
        <p className="mt-2 max-w-2xl text-slate-300">
          Track pipeline movement from first contact to conversion, and keep every conversation anchored in one place.
        </p>
        <Link
          to="/leads"
          className="mt-4 inline-flex rounded-full bg-cyan-300 px-4 py-2 text-sm font-bold text-slate-900 transition hover:bg-cyan-200"
        >
          Manage Leads
        </Link>
      </div>

      {loading ? (
        <p className="text-slate-300">Loading dashboard metrics...</p>
      ) : (
        <div className="grid gap-4 sm:grid-cols-3">
          {stats.map((item, index) => (
            <article
              key={item.label}
              className={`rounded-2xl border bg-linear-to-br p-5 ${cardTheme[index]}`}
            >
              <p className="text-sm text-slate-300">{item.label}</p>
              <p className="mt-2 text-4xl font-black text-white">{item.value}</p>
            </article>
          ))}
        </div>
      )}
    </section>
  );
};

export default DashboardPage;
