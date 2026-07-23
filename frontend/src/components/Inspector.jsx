import { useState, useEffect } from "react";
import { useProjectStore } from "../store/mapstore";
import { X, Trash2 } from "lucide-react";

export default function Inspector({ projectId, selected, onClose, onLocalUpdate, onLocalDelete }) {
  const { editNode, editEdge, deleteNode, deleteEdge } = useProjectStore();
  const [form, setForm] = useState(null);

  useEffect(() => {
    if (!selected) return;
    if (selected.kind === "node") {
      setForm({
        id: selected.el.id,
        label: selected.el.data.label || "",
        description: selected.el.data.description || "",
        icon: selected.el.data.icon || "",
      });
    } else {
      setForm({
        id: selected.el.id,
        label: selected.el.label || "",
      });
    }
  }, [selected]);

  if (!selected || !form) return null;
  const isNode = selected.kind === "node";
  const set = (k, v) => setForm((f) => ({ ...f, [k]: v }));

  const save = async () => {
  if (isNode) await editNode(projectId, { id: form.id, label: form.label, description: form.description, icon: form.icon });
  else await editEdge(projectId, { id: form.id, label: form.label });
};

const remove = async () => {
  if (isNode) await deleteNode(projectId, form.id);
  else await deleteEdge(projectId, form.id);
  onClose();
};

  return (
    <div className="absolute top-0 right-0 h-full w-80 bg-slate-900 border-l border-slate-800 p-4 overflow-y-auto z-10">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-slate-100 font-semibold text-sm">
          {isNode ? "Edit Node" : "Edit Edge"}
        </h3>
        <button onClick={onClose} className="text-slate-500 hover:text-slate-300">
          <X size={16} />
        </button>
      </div>

      <div className="space-y-3 text-sm">
        <Field label="Label">
          <input value={form.label} onChange={(e) => set("label", e.target.value)} className="input" />
        </Field>

        {isNode && (
          <>
            <Field label="Description">
              <textarea
                value={form.description}
                onChange={(e) => set("description", e.target.value)}
                rows={3}
                className="input resize-none"
              />
            </Field>
            <Field label="Icon (emoji)">
              <input
                value={form.icon}
                onChange={(e) => set("icon", e.target.value)}
                maxLength={4}
                className="input"
                placeholder="💡"
              />
            </Field>
          </>
        )}
      </div>

      <div className="flex gap-2 mt-5">
        <button onClick={save} className="flex-1 bg-blue-600 hover:bg-blue-500 text-white text-sm py-2 rounded-lg transition-colors">
          Save
        </button>
        <button onClick={remove} className="px-3 bg-red-600/20 hover:bg-red-600/30 text-red-400 rounded-lg transition-colors">
          <Trash2 size={16} />
        </button>
      </div>
    </div>
  );
}

function Field({ label, children }) {
  return (
    <div>
      <label className="block text-slate-400 text-xs mb-1">{label}</label>
      {children}
    </div>
  );
}