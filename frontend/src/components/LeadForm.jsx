import { useEffect, useState } from "react";

const statusOptions = ["New", "Contacted", "Converted"];

const initialForm = {
  name: "",
  email: "",
  phone: "",
  status: "New",
  notes: "",
  responseMessage: "",
};

const LeadForm = ({ onSubmit, loading, lead, onCancel }) => {
  const [form, setForm] = useState(initialForm);
  const [file, setFile] = useState(null);

  useEffect(() => {
    if (lead) {
      setForm({
        name: lead.name || "",
        email: lead.email || "",
        phone: lead.phone || "",
        status: lead.status || "New",
        notes: lead.notes || "",
        responseMessage: lead.responseMessage || "",
      });
      setFile(null);
    } else {
      setForm(initialForm);
      setFile(null);
    }
  }, [lead]);

  const updateField = (event) => {
    const { name, value } = event.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const submit = (event) => {
    event.preventDefault();
    onSubmit({ ...form, file });
  };

  return (
    <form onSubmit={submit} className="grid gap-4 rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur-sm">
      <div className="grid gap-4 md:grid-cols-2">
        <label className="grid gap-2 text-sm">
          <span className="text-slate-200">Name</span>
          <input
            required
            name="name"
            value={form.name}
            onChange={updateField}
            className="rounded-xl border border-white/20 bg-slate-950/70 px-3 py-2 outline-none ring-cyan-300 transition focus:ring"
            placeholder="e.g. Alicia Turner"
          />
        </label>

        <label className="grid gap-2 text-sm">
          <span className="text-slate-200">Email</span>
          <input
            required
            type="email"
            name="email"
            value={form.email}
            onChange={updateField}
            className="rounded-xl border border-white/20 bg-slate-950/70 px-3 py-2 outline-none ring-cyan-300 transition focus:ring"
            placeholder="lead@example.com"
          />
        </label>

        <label className="grid gap-2 text-sm">
          <span className="text-slate-200">Phone</span>
          <input
            required
            name="phone"
            value={form.phone}
            onChange={updateField}
            className="rounded-xl border border-white/20 bg-slate-950/70 px-3 py-2 outline-none ring-cyan-300 transition focus:ring"
            placeholder="+91 90000 00000"
          />
        </label>

        <label className="grid gap-2 text-sm">
          <span className="text-slate-200">Status</span>
          <select
            name="status"
            value={form.status}
            onChange={updateField}
            className="rounded-xl border border-white/20 bg-slate-950/70 px-3 py-2 outline-none ring-cyan-300 transition focus:ring"
          >
            {statusOptions.map((status) => (
              <option key={status} value={status}>
                {status}
              </option>
            ))}
          </select>
        </label>
      </div>

      <label className="grid gap-2 text-sm">
        <span className="text-slate-200">Response Message</span>
        <textarea
          name="responseMessage"
          value={form.responseMessage}
          onChange={updateField}
          rows={2}
          className="rounded-xl border border-white/20 bg-slate-950/70 px-3 py-2 outline-none ring-cyan-300 transition focus:ring"
          placeholder="Any response sent to lead"
        />
      </label>

      <label className="grid gap-2 text-sm">
        <span className="text-slate-200">Notes</span>
        <textarea
          name="notes"
          value={form.notes}
          onChange={updateField}
          rows={3}
          className="rounded-xl border border-white/20 bg-slate-950/70 px-3 py-2 outline-none ring-cyan-300 transition focus:ring"
          placeholder="Add context for follow-up"
        />
      </label>

      <label className="grid gap-2 text-sm">
        <span className="text-slate-200">Attachment (optional)</span>
        <input
          type="file"
          onChange={(event) => setFile(event.target.files?.[0] || null)}
          className="rounded-xl border border-dashed border-white/20 bg-slate-950/70 p-2 text-sm file:mr-3 file:rounded-full file:border-0 file:bg-cyan-300 file:px-3 file:py-1 file:font-semibold file:text-slate-900"
        />
      </label>

      <div className="flex flex-wrap gap-3 pt-2">
        <button
          type="submit"
          disabled={loading}
          className="rounded-full bg-cyan-300 px-5 py-2 text-sm font-bold text-slate-900 transition hover:bg-cyan-200 disabled:cursor-not-allowed disabled:opacity-70"
        >
          {loading ? "Saving..." : lead ? "Update Lead" : "Add Lead"}
        </button>

        {lead ? (
          <button
            type="button"
            onClick={onCancel}
            className="rounded-full border border-white/30 px-5 py-2 text-sm font-semibold text-slate-100 hover:bg-white/10"
          >
            Cancel Edit
          </button>
        ) : null}
      </div>
    </form>
  );
};

export default LeadForm;
