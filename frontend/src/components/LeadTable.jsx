const colorByStatus = {
  New: "bg-slate-500/20 text-slate-200 ring-slate-300/20",
  Contacted: "bg-amber-400/20 text-amber-100 ring-amber-200/30",
  Converted: "bg-emerald-400/20 text-emerald-100 ring-emerald-200/30",
};

const LeadTable = ({ leads, onEdit, onDelete, onStatusChange }) => {
  if (!leads.length) {
    return (
      <div className="rounded-2xl border border-dashed border-white/20 bg-white/5 p-8 text-center text-slate-300">
        No leads yet. Add your first lead to begin tracking.
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-2xl border border-white/10 bg-white/5">
      <div className="overflow-x-auto">
        <table className="min-w-full text-sm">
          <thead className="bg-white/5 text-left text-slate-200">
            <tr>
              <th className="px-4 py-3 font-semibold">Lead</th>
              <th className="px-4 py-3 font-semibold">Phone</th>
              <th className="px-4 py-3 font-semibold">Status</th>
              <th className="px-4 py-3 font-semibold">Response</th>
              <th className="px-4 py-3 font-semibold">Attachment</th>
              <th className="px-4 py-3 font-semibold">Actions</th>
            </tr>
          </thead>
          <tbody>
            {leads.map((lead) => (
              <tr key={lead.id} className="border-t border-white/10 text-slate-100">
                <td className="px-4 py-3">
                  <p className="font-semibold">{lead.name}</p>
                  <p className="text-xs text-slate-300">{lead.email}</p>
                </td>
                <td className="px-4 py-3">{lead.phone}</td>
                <td className="px-4 py-3">
                  <select
                    value={lead.status}
                    onChange={(event) => onStatusChange(lead, event.target.value)}
                    className={`rounded-full px-3 py-1 text-xs text-black bg-yellow-300 font-semibold ring-1`}
                  >
                    <option className="text-black" value="New">New</option>
                    <option value="Contacted">Contacted</option>
                    <option value="Converted">Converted</option>
                  </select>
                </td>
                <td className="px-4 py-3 text-xs text-slate-300">
                  {lead.responseMessage || "-"}
                </td>
                <td className="px-4 py-3 text-xs">
                  {lead.attachment ? (
                    <a
                      href={`${import.meta.env.VITE_API_BASE_URL?.replace("/api", "") || "http://localhost:5000"}${lead.attachment}`}
                      target="_blank"
                      rel="noreferrer"
                      className="text-cyan-300 underline"
                    >
                      View
                    </a>
                  ) : (
                    <span className="text-slate-400">-</span>
                  )}
                </td>
                <td className="px-4 py-3">
                  <div className="flex gap-2">
                    <button
                      type="button"
                      onClick={() => onEdit(lead)}
                      className="rounded-full border border-white/20 px-3 py-1 text-xs font-semibold text-slate-100 hover:bg-white/10"
                    >
                      Edit
                    </button>
                    <button
                      type="button"
                      onClick={() => onDelete(lead.id)}
                      className="rounded-full border border-rose-200/30 bg-rose-400/10 px-3 py-1 text-xs font-semibold text-rose-100 hover:bg-rose-400/20"
                    >
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default LeadTable;
