"use client";
import { useState, useEffect } from "react";
import { Shield, Mail, Loader2, Plus, Edit2, AlertCircle } from "lucide-react";
import { useSession } from "next-auth/react";

export default function UsersPage() {
  const [users, setUsers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const { data: session } = useSession();

  useEffect(() => {
    (async () => {
      try {
        const res = await fetch("/api/admin/users");
        const json = await res.json();
        setUsers(json.data || json || []);
      } catch {} finally { setLoading(false); }
    })();
  }, []);

  const ROLE_COLORS: Record<string, string> = {
    OWNER: "bg-purple-50 text-purple-600 border-purple-200",
    ADMIN: "bg-blue-50 text-blue-600 border-blue-200",
    DISPATCHER: "bg-amber-50 text-amber-600 border-amber-200",
    DRIVER: "bg-emerald-50 text-emerald-600 border-emerald-200",
    SUPPORT: "bg-gray-100 text-gray-600 border-gray-200",
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-black text-navy tracking-tight">Staff & Roles</h1>
          <p className="text-sm font-medium text-gray-400 mt-0.5">Manage team members and access permissions</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 bg-coral text-white rounded-xl text-sm font-bold hover:bg-coral-dark transition-colors shadow-sm">
          <Plus className="w-4 h-4" /> Invite Staff
        </button>
      </div>

      {loading ? (
        <div className="flex items-center justify-center py-20"><Loader2 className="w-8 h-8 animate-spin text-coral" /></div>
      ) : users.length === 0 ? (
        <div className="text-center py-20">
          <AlertCircle className="w-12 h-12 text-gray-300 mx-auto mb-3" />
          <p className="font-bold text-gray-500">No users found</p>
        </div>
      ) : (
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
          <table className="w-full min-w-[600px]">
            <thead>
              <tr className="border-b border-gray-100 bg-gray-50/60">
                <th className="px-6 py-4 text-left text-[11px] font-black uppercase tracking-wider text-gray-400">User</th>
                <th className="px-6 py-4 text-left text-[11px] font-black uppercase tracking-wider text-gray-400">Role</th>
                <th className="px-6 py-4 text-left text-[11px] font-black uppercase tracking-wider text-gray-400">Status</th>
                <th className="px-6 py-4 text-right text-[11px] font-black uppercase tracking-wider text-gray-400">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {users.map(u => (
                <tr key={u.id} className="hover:bg-gray-50/50 transition-colors group">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-navy text-white flex items-center justify-center font-black text-sm">
                        {u.name?.[0] || u.email?.[0]?.toUpperCase()}
                      </div>
                      <div>
                        <div className="font-bold text-sm text-navy">{u.name || "Unnamed"}</div>
                        <div className="flex items-center gap-1.5 text-xs text-gray-400 font-medium mt-0.5">
                          <Mail className="w-3.5 h-3.5" /> {u.email}
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
                    <span className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-600">
                      <div className="w-2 h-2 rounded-full bg-emerald-500" /> Active
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button className="p-2 rounded-lg text-gray-400 hover:bg-gray-100 hover:text-navy transition-all">
                      <Edit2 className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
