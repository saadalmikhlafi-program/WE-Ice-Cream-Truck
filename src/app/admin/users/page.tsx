"use client";
import { useState, useEffect, useCallback } from "react";
import {
  Shield, Mail, Loader2, Plus, Edit2, AlertCircle, Trash2,
  CheckCircle, XCircle, Search, RefreshCw, X, Save, ChevronDown
} from "lucide-react";
import { useSession } from "next-auth/react";
import { ROLE_PERMISSIONS, Permission } from "@/lib/permissions";

type User = {
  id: string; name: string; email: string;
  role: string; permissions: string[];
  active: boolean; createdAt: string;
};

const ROLE_COLORS: Record<string, string> = {
  OWNER:      "bg-purple-50 text-purple-700 border-purple-200",
  ADMIN:      "bg-blue-50 text-blue-700 border-blue-200",
  DISPATCHER: "bg-amber-50 text-amber-700 border-amber-200",
  DRIVER:     "bg-emerald-50 text-emerald-700 border-emerald-200",
  SUPPORT:    "bg-slate-100 text-slate-600 border-slate-200",
  VIEWER:     "bg-gray-100 text-gray-500 border-gray-200",
};

const ALL_ROLES = ["OWNER", "ADMIN", "DISPATCHER", "DRIVER", "SUPPORT", "VIEWER"] as const;
const ALL_PERMISSIONS = Object.keys(ROLE_PERMISSIONS.OWNER) as unknown as string[];

function EditModal({ user, currentUserRole, onClose, onSaved }: {
  user: User; currentUserRole: string; onClose: () => void; onSaved: (u: User) => void;
}) {
  const [form, setForm] = useState({ name: user.name, role: user.role, active: user.active, permissions: user.permissions || [] });
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  const save = async () => {
    setSaving(true); setError("");
    try {
      const res = await fetch(`/api/admin/users/${user.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const json = await res.json();
      if (!res.ok || !json.success) throw new Error(json.error || "Failed to save");
      onSaved(json.data);
    } catch (e: any) {
      setError(e.message);
    } finally { setSaving(false); }
  };

  const togglePerm = (p: string) => {
    setForm(prev => ({
      ...prev,
      permissions: prev.permissions.includes(p)
        ? prev.permissions.filter(x => x !== p)
        : [...prev.permissions, p],
    }));
  };

  const rolePerms = ROLE_PERMISSIONS[form.role] || [];

  return (
    <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm flex items-center justify-center p-4" onClick={onClose}>
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-xl max-h-[90vh] overflow-y-auto" onClick={e => e.stopPropagation()}>
        <div className="flex items-center justify-between p-6 border-b border-gray-100">
          <div>
            <h2 className="text-lg font-black text-navy">Edit User</h2>
            <p className="text-sm text-gray-400 mt-0.5">{user.email}</p>
          </div>
          <button onClick={onClose} className="p-2 rounded-xl hover:bg-gray-100 transition-colors">
            <X className="w-5 h-5 text-gray-400" />
          </button>
        </div>
        <div className="p-6 space-y-5">
          {error && (
            <div className="p-3 rounded-xl bg-red-50 border border-red-100 text-sm text-red-700 font-medium">{error}</div>
          )}
          <div>
            <label className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-2 block">Display Name</label>
            <input value={form.name} onChange={e => setForm(p => ({ ...p, name: e.target.value }))}
              className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm outline-none focus:border-coral transition-colors" />
          </div>
          <div>
            <label className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-2 block">Role</label>
            <select value={form.role}
              disabled={currentUserRole !== "OWNER"}
              onChange={e => setForm(p => ({ ...p, role: e.target.value }))}
              className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm outline-none focus:border-coral bg-white disabled:opacity-60">
              {ALL_ROLES.map(r => <option key={r} value={r}>{r}</option>)}
            </select>
            <p className="text-xs text-gray-400 mt-1">Role provides base permissions. Custom permissions below extend the role.</p>
          </div>
          <div>
            <label className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-2 block">Status</label>
            <select value={form.active ? "1" : "0"} onChange={e => setForm(p => ({ ...p, active: e.target.value === "1" }))}
              className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm outline-none focus:border-coral bg-white">
              <option value="1">Active</option>
              <option value="0">Deactivated</option>
            </select>
          </div>
          <div>
            <label className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-2 block">
              Custom Extra Permissions
            </label>
            <div className="space-y-1.5 max-h-48 overflow-y-auto pr-1">
              {(ROLE_PERMISSIONS.OWNER as string[]).map((p) => {
                const isBase = (rolePerms as string[]).includes(p);
                const isChecked = form.permissions.includes(p) || isBase;
                return (
                  <label key={p} className={`flex items-center gap-3 px-3 py-2 rounded-lg cursor-pointer ${isBase ? "bg-gray-50 opacity-60" : "hover:bg-blue-50/60"}`}>
                    <input type="checkbox" checked={isChecked} disabled={isBase}
                      onChange={() => !isBase && togglePerm(p)}
                      className="rounded accent-coral" />
                    <span className="text-xs font-medium text-gray-700 font-mono">{p}</span>
                    {isBase && <span className="ml-auto text-[10px] bg-gray-200 text-gray-500 px-1.5 py-0.5 rounded font-bold">ROLE</span>}
                  </label>
                );
              })}
            </div>
          </div>
        </div>
        <div className="p-6 border-t border-gray-100 flex justify-end gap-3">
          <button onClick={onClose} className="px-5 py-2.5 rounded-xl text-sm font-bold text-gray-600 hover:bg-gray-100 transition-colors">Cancel</button>
          <button onClick={save} disabled={saving}
            className="flex items-center gap-2 px-5 py-2.5 bg-coral text-white rounded-xl text-sm font-bold hover:bg-coral-dark transition-colors disabled:opacity-60">
            {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
}

function CreateModal({ currentUserRole, onClose, onCreated }: {
  currentUserRole: string; onClose: () => void; onCreated: (u: User) => void;
}) {
  const [form, setForm] = useState({ name: "", email: "", password: "", role: "SUPPORT" });
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  const save = async () => {
    if (!form.name || !form.email || !form.password) { setError("Name, email and password are required."); return; }
    setSaving(true); setError("");
    try {
      const res = await fetch("/api/admin/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const json = await res.json();
      if (!res.ok || !json.success) throw new Error(json.error || "Failed to create user");
      onCreated(json.data);
    } catch (e: any) {
      setError(e.message);
    } finally { setSaving(false); }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm flex items-center justify-center p-4" onClick={onClose}>
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md" onClick={e => e.stopPropagation()}>
        <div className="flex items-center justify-between p-6 border-b border-gray-100">
          <h2 className="text-lg font-black text-navy">Create Staff Member</h2>
          <button onClick={onClose} className="p-2 rounded-xl hover:bg-gray-100 transition-colors"><X className="w-5 h-5 text-gray-400" /></button>
        </div>
        <div className="p-6 space-y-4">
          {error && <div className="p-3 rounded-xl bg-red-50 border border-red-100 text-sm text-red-700 font-medium">{error}</div>}
          <div>
            <label className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-2 block">Full Name</label>
            <input value={form.name} onChange={e => setForm(p => ({ ...p, name: e.target.value }))}
              className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm outline-none focus:border-coral" />
          </div>
          <div>
            <label className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-2 block">Email Address</label>
            <input type="email" value={form.email} onChange={e => setForm(p => ({ ...p, email: e.target.value }))}
              className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm outline-none focus:border-coral" />
          </div>
          <div>
            <label className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-2 block">Initial Password</label>
            <input type="password" value={form.password} onChange={e => setForm(p => ({ ...p, password: e.target.value }))}
              className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm outline-none focus:border-coral" />
          </div>
          <div>
            <label className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-2 block">Role</label>
            <select value={form.role} onChange={e => setForm(p => ({ ...p, role: e.target.value }))}
              className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm outline-none focus:border-coral bg-white">
              {ALL_ROLES.filter(r => currentUserRole === "OWNER" || r !== "OWNER").map(r => (
                <option key={r} value={r}>{r}</option>
              ))}
            </select>
          </div>
        </div>
        <div className="p-6 border-t border-gray-100 flex justify-end gap-3">
          <button onClick={onClose} className="px-5 py-2.5 rounded-xl text-sm font-bold text-gray-600 hover:bg-gray-100 transition-colors">Cancel</button>
          <button onClick={save} disabled={saving}
            className="flex items-center gap-2 px-5 py-2.5 bg-coral text-white rounded-xl text-sm font-bold hover:bg-coral-dark transition-colors disabled:opacity-60">
            {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Plus className="w-4 h-4" />}
            Create User
          </button>
        </div>
      </div>
    </div>
  );
}

export default function UsersPage() {
  const [users, setUsers]       = useState<User[]>([]);
  const [loading, setLoading]   = useState(true);
  const [search, setSearch]     = useState("");
  const [editingUser, setEditingUser] = useState<User | null>(null);
  const [showCreate, setShowCreate]   = useState(false);
  const [toast, setToast]       = useState("");
  const { data: session } = useSession();
  const currentRole = (session?.user as any)?.role || "VIEWER";

  const load = useCallback(async () => {
    setLoading(true);
    try {
      const res  = await fetch("/api/admin/users");
      const json = await res.json();
      setUsers(json.data || []);
    } catch {} finally { setLoading(false); }
  }, []);

  useEffect(() => { load(); }, [load]);

  const showToast = (msg: string) => { setToast(msg); setTimeout(() => setToast(""), 3000); };

  const handleDelete = async (u: User) => {
    if (!confirm(`Are you sure you want to deactivate ${u.name}? They will lose access immediately.`)) return;
    const res = await fetch(`/api/admin/users/${u.id}`, { method: "DELETE" });
    const json = await res.json();
    if (json.success) {
      setUsers(prev => prev.filter(x => x.id !== u.id));
      showToast(`${u.name} has been deactivated.`);
    } else {
      alert(json.error || "Failed to delete user");
    }
  };

  const handleToggleActive = async (u: User) => {
    const res = await fetch(`/api/admin/users/${u.id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ active: !u.active }),
    });
    const json = await res.json();
    if (json.success) {
      setUsers(prev => prev.map(x => x.id === u.id ? json.data : x));
      showToast(`${u.name} ${json.data.active ? "activated" : "deactivated"}.`);
    }
  };

  const filtered = users.filter(u => {
    const q = search.toLowerCase();
    return !q || `${u.name} ${u.email} ${u.role}`.toLowerCase().includes(q);
  });

  return (
    <div className="space-y-6">
      {toast && (
        <div className="fixed top-6 right-6 z-[200] px-5 py-3 rounded-2xl shadow-xl bg-navy text-white text-sm font-bold">{toast}</div>
      )}
      {editingUser && (
        <EditModal
          user={editingUser}
          currentUserRole={currentRole}
          onClose={() => setEditingUser(null)}
          onSaved={updated => {
            setUsers(prev => prev.map(u => u.id === updated.id ? { ...u, ...updated } : u));
            setEditingUser(null);
            showToast("User updated successfully.");
          }}
        />
      )}
      {showCreate && (
        <CreateModal
          currentUserRole={currentRole}
          onClose={() => setShowCreate(false)}
          onCreated={newUser => {
            setUsers(prev => [newUser as User, ...prev]);
            setShowCreate(false);
            showToast("Staff member created.");
          }}
        />
      )}

      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-navy tracking-tight">Staff & Access Control</h1>
          <p className="text-sm font-medium text-gray-400 mt-0.5">{users.length} team members</p>
        </div>
        <div className="flex items-center gap-3">
          <button onClick={load} className="p-2.5 bg-white border border-gray-200 rounded-xl text-gray-500 hover:border-gray-300 transition-all shadow-sm">
            <RefreshCw className={`w-4 h-4 ${loading ? "animate-spin" : ""}`} />
          </button>
          <button onClick={() => setShowCreate(true)}
            className="flex items-center gap-2 px-4 py-2.5 bg-coral text-white rounded-xl text-sm font-bold hover:bg-coral-dark transition-colors shadow-sm">
            <Plus className="w-4 h-4" /> Add Staff
          </button>
        </div>
      </div>

      <div className="bg-white border border-gray-100 rounded-2xl shadow-sm p-4">
        <div className="relative max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
          <input value={search} onChange={e => setSearch(e.target.value)}
            placeholder="Search by name, email or role…"
            className="w-full pl-9 pr-4 py-2.5 border border-gray-200 rounded-xl text-sm outline-none focus:border-coral bg-gray-50 placeholder:text-gray-400" />
        </div>
      </div>

      {loading ? (
        <div className="flex items-center justify-center py-20"><Loader2 className="w-8 h-8 animate-spin text-coral" /></div>
      ) : filtered.length === 0 ? (
        <div className="text-center py-20">
          <AlertCircle className="w-12 h-12 text-gray-300 mx-auto mb-3" />
          <p className="font-bold text-gray-500">No users found</p>
        </div>
      ) : (
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[640px]">
              <thead>
                <tr className="border-b border-gray-100 bg-gray-50/60">
                  <th className="px-6 py-4 text-left text-[11px] font-black uppercase tracking-wider text-gray-400">User</th>
                  <th className="px-6 py-4 text-left text-[11px] font-black uppercase tracking-wider text-gray-400">Role</th>
                  <th className="px-6 py-4 text-left text-[11px] font-black uppercase tracking-wider text-gray-400">Status</th>
                  <th className="px-6 py-4 text-left text-[11px] font-black uppercase tracking-wider text-gray-400">Joined</th>
                  <th className="px-6 py-4 text-right text-[11px] font-black uppercase tracking-wider text-gray-400">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {filtered.map(u => (
                  <tr key={u.id} className="hover:bg-gray-50/50 transition-colors group">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-navy to-blue-600 text-white flex items-center justify-center font-black text-sm shadow-sm">
                          {u.name?.[0]?.toUpperCase() || u.email?.[0]?.toUpperCase()}
                        </div>
                        <div>
                          <div className="font-bold text-sm text-navy">{u.name || "Unnamed"}</div>
                          <div className="flex items-center gap-1.5 text-xs text-gray-400 font-medium mt-0.5">
                            <Mail className="w-3 h-3" /> {u.email}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex px-2.5 py-1 rounded-full text-[10px] font-black tracking-wider border ${ROLE_COLORS[u.role] ?? ROLE_COLORS.SUPPORT}`}>
                        {u.role}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      {u.active ? (
                        <span className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-600">
                          <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" /> Active
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1.5 text-xs font-bold text-gray-400">
                          <div className="w-2 h-2 rounded-full bg-gray-300" /> Inactive
                        </span>
                      )}
                    </td>
                    <td className="px-6 py-4 text-xs text-gray-400 font-medium">
                      {new Date(u.createdAt).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button onClick={() => handleToggleActive(u)}
                          title={u.active ? "Deactivate" : "Activate"}
                          className={`p-2 rounded-lg transition-all ${u.active ? "text-amber-500 hover:bg-amber-50" : "text-emerald-500 hover:bg-emerald-50"}`}>
                          {u.active ? <XCircle className="w-4 h-4" /> : <CheckCircle className="w-4 h-4" />}
                        </button>
                        <button onClick={() => setEditingUser(u)}
                          className="p-2 rounded-lg text-blue-500 hover:bg-blue-50 transition-all">
                          <Edit2 className="w-4 h-4" />
                        </button>
                        {u.role !== "OWNER" && (
                          <button onClick={() => handleDelete(u)}
                            className="p-2 rounded-lg text-red-400 hover:bg-red-50 transition-all">
                            <Trash2 className="w-4 h-4" />
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
