"use client";
import { useState, useEffect } from "react";
import { Plus, X, Loader2, Check, ChevronDown } from "lucide-react";

type Task = {
  id: string; title: string; description: string | null;
  status: "TODO" | "IN_PROGRESS" | "REVIEW" | "DONE";
  priority: "LOW" | "MEDIUM" | "HIGH" | "URGENT";
  dueDate: string | null;
  assignedTo?: { name: string } | null;
  createdAt: string;
};

const COLUMNS: { key: Task["status"]; label: string; color: string; bg: string }[] = [
  { key: "TODO",        label: "To Do",      color: "#6B7280", bg: "#F9FAFB" },
  { key: "IN_PROGRESS", label: "In Progress", color: "#2563EB", bg: "#EFF6FF" },
  { key: "REVIEW",      label: "In Review",   color: "#D97706", bg: "#FFFBEB" },
  { key: "DONE",        label: "Done",        color: "#059669", bg: "#ECFDF5" },
];

const PRIORITY_CONFIG: Record<string, { label: string; color: string; bg: string }> = {
  LOW:    { label: "Low",    color: "#64748B", bg: "#F1F5F9" },
  MEDIUM: { label: "Medium", color: "#2563EB", bg: "#EFF6FF" },
  HIGH:   { label: "High",   color: "#D97706", bg: "#FFFBEB" },
  URGENT: { label: "Urgent", color: "#DC2626", bg: "#FEF2F2" },
};

export default function TasksPage() {
  const [tasks, setTasks]         = useState<Task[]>([]);
  const [loading, setLoading]     = useState(true);
  const [showCreate, setShowCreate] = useState(false);
  const [form, setForm]           = useState({ title: "", description: "", priority: "MEDIUM", dueDate: "", status: "TODO" as Task["status"] });
  const [saving, setSaving]       = useState(false);

  const loadTasks = async () => {
    try {
      const res  = await fetch("/api/admin/tasks");
      const json = await res.json();
      setTasks(Array.isArray(json.data) ? json.data : Array.isArray(json) ? json : []);
    } catch {} finally { setLoading(false); }
  };

  useEffect(() => { loadTasks(); }, []);

  const createTask = async () => {
    if (!form.title.trim()) return;
    setSaving(true);
    try {
      const res = await fetch("/api/admin/tasks", {
        method: "POST", headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (res.ok) { setShowCreate(false); setForm({ title: "", description: "", priority: "MEDIUM", dueDate: "", status: "TODO" }); await loadTasks(); }
    } catch {} finally { setSaving(false); }
  };

  const moveTask = async (id: string, status: Task["status"]) => {
    try {
      await fetch(`/api/admin/tasks/${id}`, {
        method: "PATCH", headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status }),
      });
      await loadTasks();
    } catch {}
  };

  const deleteTask = async (id: string) => {
    try {
      await fetch(`/api/admin/tasks/${id}`, { method: "DELETE" });
      await loadTasks();
    } catch {}
  };

  const colTasks = (col: Task["status"]) => tasks.filter(t => t.status === col);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-black text-navy tracking-tight">Tasks</h1>
          <p className="text-sm font-medium text-gray-400 mt-0.5">{tasks.length} total tasks</p>
        </div>
        <button onClick={() => setShowCreate(true)}
          className="flex items-center gap-2 px-4 py-2 bg-coral text-white rounded-xl text-sm font-bold hover:bg-coral-dark transition-colors shadow-sm">
          <Plus className="w-4 h-4" /> New Task
        </button>
      </div>

      {loading ? (
        <div className="flex items-center justify-center py-20"><Loader2 className="w-7 h-7 animate-spin text-coral" /></div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-5">
          {COLUMNS.map(col => (
            <div key={col.key} className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
              <div className="px-4 py-3.5 border-b border-gray-100 flex items-center justify-between" style={{ background: col.bg }}>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full" style={{ background: col.color }} />
                  <span className="text-xs font-black uppercase tracking-wider" style={{ color: col.color }}>{col.label}</span>
                </div>
                <span className="text-[11px] font-black text-gray-400 bg-white/60 px-2 py-0.5 rounded-full">{colTasks(col.key).length}</span>
              </div>
              <div className="p-3 space-y-2.5 min-h-[200px]">
                {colTasks(col.key).length === 0 ? (
                  <div className="py-8 text-center text-xs font-medium text-gray-300">No tasks</div>
                ) : (
                  colTasks(col.key).map(task => {
                    const pc = PRIORITY_CONFIG[task.priority] ?? PRIORITY_CONFIG.MEDIUM;
                    return (
                      <div key={task.id} className="bg-gray-50 rounded-xl p-3.5 border border-gray-100 hover:border-gray-200 transition-all group">
                        <div className="flex items-start justify-between gap-2 mb-2">
                          <p className="text-sm font-bold text-navy leading-snug">{task.title}</p>
                          <button onClick={() => deleteTask(task.id)} className="opacity-0 group-hover:opacity-100 w-5 h-5 rounded flex items-center justify-center text-gray-300 hover:text-red-400 transition-all flex-shrink-0">
                            <X className="w-3.5 h-3.5" />
                          </button>
                        </div>
                        {task.description && <p className="text-[11px] text-gray-400 mb-2 leading-relaxed">{task.description}</p>}
                        <div className="flex items-center justify-between gap-2">
                          <span className="text-[10px] font-bold px-1.5 py-0.5 rounded-full" style={{ background: pc.bg, color: pc.color }}>{pc.label}</span>
                          {task.dueDate && <span className="text-[10px] text-gray-400 font-medium">{new Date(task.dueDate).toLocaleDateString("en-US", { month: "short", day: "numeric" })}</span>}
                        </div>
                        <div className="mt-2.5 flex flex-wrap gap-1">
                          {COLUMNS.filter(c => c.key !== col.key).map(c => (
                            <button key={c.key} onClick={() => moveTask(task.id, c.key)}
                              className="text-[10px] font-bold px-2 py-0.5 rounded-full border border-gray-200 text-gray-500 hover:border-coral hover:text-coral transition-all">
                              → {c.label}
                            </button>
                          ))}
                        </div>
                      </div>
                    );
                  })
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Create Modal */}
      {showCreate && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4 backdrop-blur-sm">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md border border-gray-100">
            <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
              <h2 className="font-black text-navy">New Task</h2>
              <button onClick={() => setShowCreate(false)} className="text-gray-400 hover:text-gray-600"><X className="w-4 h-4" /></button>
            </div>
            <div className="p-6 space-y-4">
              <div>
                <label className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-1.5 block">Title *</label>
                <input value={form.title} onChange={e => setForm(f => ({ ...f, title: e.target.value }))}
                  placeholder="Task title…" className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm outline-none focus:border-coral transition-colors" />
              </div>
              <div>
                <label className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-1.5 block">Description</label>
                <textarea value={form.description} onChange={e => setForm(f => ({ ...f, description: e.target.value }))} rows={3}
                  className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm outline-none focus:border-coral resize-none transition-colors" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-1.5 block">Priority</label>
                  <select value={form.priority} onChange={e => setForm(f => ({ ...f, priority: e.target.value }))}
                    className="w-full px-3 py-2.5 border border-gray-200 rounded-xl text-sm outline-none focus:border-coral bg-white">
                    {Object.keys(PRIORITY_CONFIG).map(k => <option key={k} value={k}>{PRIORITY_CONFIG[k].label}</option>)}
                  </select>
                </div>
                <div>
                  <label className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-1.5 block">Due Date</label>
                  <input type="date" value={form.dueDate} onChange={e => setForm(f => ({ ...f, dueDate: e.target.value }))}
                    className="w-full px-3 py-2.5 border border-gray-200 rounded-xl text-sm outline-none focus:border-coral" />
                </div>
              </div>
            </div>
            <div className="px-6 py-4 border-t border-gray-100 flex justify-end gap-3">
              <button onClick={() => setShowCreate(false)} className="px-4 py-2 border border-gray-200 rounded-xl text-sm font-bold text-gray-600 hover:bg-gray-50">Cancel</button>
              <button onClick={createTask} disabled={saving || !form.title.trim()}
                className="px-4 py-2 bg-coral text-white rounded-xl text-sm font-bold hover:bg-coral-dark disabled:opacity-60 transition-colors">
                {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : "Create Task"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
