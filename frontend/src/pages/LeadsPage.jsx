import { useEffect, useMemo, useState } from "react";
import api from "../api/client";
import LeadForm from "../components/LeadForm";
import LeadTable from "../components/LeadTable";

const LeadsPage = () => {
  const [leads, setLeads] = useState([]);
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("");
  const [saving, setSaving] = useState(false);
  const [loadingList, setLoadingList] = useState(true);
  const [editingLead, setEditingLead] = useState(null);
  const [error, setError] = useState("");

  const fetchLeads = async () => {
    setLoadingList(true);
    setError("");

    try {
      const { data } = await api.get("/leads", {
        params: {
          search: search || undefined,
          status: status || undefined,
        },
      });
      setLeads(data.leads || []);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to fetch leads");
    } finally {
      setLoadingList(false);
    }
  };

  useEffect(() => {
    fetchLeads();
  }, []);

  const visibleLeads = useMemo(() => leads, [leads]);

  const toFormData = (payload) => {
    const body = new FormData();
    body.append("name", payload.name);
    body.append("email", payload.email);
    body.append("phone", payload.phone);
    body.append("status", payload.status);
    body.append("notes", payload.notes || "");
    body.append("responseMessage", payload.responseMessage || "");

    if (payload.file) {
      body.append("attachment", payload.file);
    }

    return body;
  };

  const onSave = async (payload) => {
    setSaving(true);
    setError("");

    try {
      if (editingLead) {
        await api.put(`/leads/${editingLead.id}`, toFormData(payload));
      } else {
        await api.post("/leads", toFormData(payload));
      }

      setEditingLead(null);
      await fetchLeads();
    } catch (err) {
      setError(err.response?.data?.message || "Failed to save lead");
    } finally {
      setSaving(false);
    }
  };

  const onDelete = async (id) => {
    const confirmDelete = window.confirm("Delete this lead?");
    if (!confirmDelete) {
      return;
    }

    try {
      await api.delete(`/leads/${id}`);
      await fetchLeads();
    } catch (err) {
      setError(err.response?.data?.message || "Failed to delete lead");
    }
  };

  const onStatusChange = async (lead, nextStatus) => {
    try {
      await api.patch(`/leads/${lead.id}/status`, {
        status: nextStatus,
        responseMessage: lead.responseMessage || "",
      });
      await fetchLeads();
    } catch (err) {
      setError(err.response?.data?.message || "Failed to update status");
    }
  };

  const applyFilters = async (event) => {
    event.preventDefault();
    await fetchLeads();
  };

  return (
    <section className="grid gap-6 animate-fade-in-up">
      <div className="rounded-3xl border border-white/10 bg-white/5 p-6">
        <h1 className="text-3xl font-black text-white">Lead Management</h1>
        <p className="mt-2 text-sm text-slate-300">
          Create, edit, delete, and move leads through New, Contacted, and Converted stages.
        </p>
      </div>

      <LeadForm
        onSubmit={onSave}
        loading={saving}
        lead={editingLead}
        onCancel={() => setEditingLead(null)}
      />

      <form
        onSubmit={applyFilters}
        className="grid gap-3 rounded-2xl border text-white border-white/10 bg-white/5 p-4 md:grid-cols-[1fr_220px_auto]"
      >
        <input
          value={search}
          onChange={(event) => setSearch(event.target.value)}
          placeholder="Search by name, email, or phone"
          className="rounded-xl border border-white/20 bg-slate-950/70 px-3 py-2 outline-none ring-cyan-300 transition focus:ring"
        />

        <select
          value={status}
          onChange={(event) => setStatus(event.target.value)}
          className="rounded-xl border border-white/20 bg-slate-950/70 px-3  py-2 outline-none ring-cyan-300 transition focus:ring"
        >
          <option value="">All Status</option>
          <option value="New">New</option>
          <option value="Contacted">Contacted</option>
          <option value="Converted">Converted</option>
        </select>

        <button
          type="submit"
          className="rounded-full bg-cyan-300 px-4 py-2 font-bold text-slate-900 transition hover:bg-cyan-200"
        >
          Apply Filters
        </button>
      </form>

      {error ? <p className="text-sm text-rose-300">{error}</p> : null}

      {loadingList ? (
        <p className="text-slate-300">Loading leads...</p>
      ) : (
        <LeadTable
          leads={visibleLeads}
          onEdit={setEditingLead}
          onDelete={onDelete}
          onStatusChange={onStatusChange}
        />
      )}
    </section>
  );
};

export default LeadsPage;
