"use client";
import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { Search, RefreshCw, ChevronRight, Mail, Phone, Calendar, Loader2, Users } from "lucide-react";

type Customer = {
  id: string; firstName: string; lastName: string;
  email: string; phone: string; createdAt: string;
  _count?: { bookings: number };
  bookings?: { totalAmount?: number }[];
};

export default function CustomersPage() {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [loading, setLoading]     = useState(true);
  const [search, setSearch]       = useState("");

  const load = useCallback(async () => {
    setLoading(true);
    try {
      const res  = await fetch("/api/admin/customers");
      const json = await res.json();
      if (!res.ok || json.success === false) {
        console.error("Failed to load customers:", json.error || res.statusText);
        setCustomers([]);
        return;
      }
      setCustomers(json.data || json || []);
    } catch (err) {
      console.error("Error fetching customers:", err);
      setCustomers([]);
    } finally { setLoading(false); }
  }, []);

  useEffect(() => { load(); }, [load]);

  const filtered = customers.filter(c => {
    const q = search.toLowerCase();
    return !q || `${c.firstName} ${c.lastName} ${c.email} ${c.phone}`.toLowerCase().includes(q);
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-black text-navy tracking-tight">Customers</h1>
          <p className="text-sm font-medium text-gray-400 mt-0.5">{customers.length} registered customers</p>
        </div>
        <button onClick={load} className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-xl text-sm font-bold text-gray-600 hover:border-gray-300 transition-all shadow-sm">
          <RefreshCw className={`w-4 h-4 ${loading ? "animate-spin" : ""}`} /> Refresh
        </button>
      </div>

      <div className="bg-white border border-gray-100 rounded-2xl shadow-sm p-4">
        <div className="relative max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
          <input value={search} onChange={e => setSearch(e.target.value)}
            placeholder="Search by name, email, phone…"
            className="w-full pl-9 pr-4 py-2.5 border border-gray-200 rounded-xl text-sm outline-none focus:border-coral focus:ring-2 focus:ring-coral/10 transition-all bg-gray-50 placeholder:text-gray-400" />
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        {loading ? (
          <div className="flex items-center justify-center py-20"><Loader2 className="w-7 h-7 animate-spin text-coral" /></div>
        ) : filtered.length === 0 ? (
          <div className="py-20 text-center">
            <Users className="w-12 h-12 text-gray-200 mx-auto mb-4" />
            <p className="font-bold text-gray-500">No customers found</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full min-w-[600px]">
              <thead>
                <tr className="border-b border-gray-100 bg-gray-50/60">
                  {["Customer", "Contact", "Bookings", "Joined", ""].map((h, i) => (
                    <th key={i} className={`px-5 py-3.5 text-[11px] font-black uppercase tracking-wider text-gray-400 ${i === 4 ? "text-right" : "text-left"}`}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {filtered.map(c => (
                  <tr key={c.id} className="hover:bg-gray-50/50 transition-colors group">
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-full bg-coral/10 border border-coral/20 flex items-center justify-center font-black text-coral text-xs flex-shrink-0">
                          {c.firstName?.[0]}{c.lastName?.[0]}
                        </div>
                        <div>
                          <div className="font-bold text-sm text-navy">{c.firstName} {c.lastName}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-1.5 text-xs text-gray-500 font-medium">
                        <Mail className="w-3.5 h-3.5 text-gray-400" /> {c.email}
                      </div>
                      <div className="flex items-center gap-1.5 text-xs text-gray-500 font-medium mt-1">
                        <Phone className="w-3.5 h-3.5 text-gray-400" /> {c.phone}
                      </div>
                    </td>
                    <td className="px-5 py-4">
                      <span className="text-sm font-black text-navy">{c._count?.bookings ?? 0}</span>
                      <span className="text-xs text-gray-400 ml-1 font-medium">bookings</span>
                    </td>
                    <td className="px-5 py-4">
                      <span className="text-sm font-medium text-gray-500">
                        {new Date(c.createdAt).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
                      </span>
                    </td>
                    <td className="px-5 py-4 text-right">
                      <Link href={`/admin/customers/${c.id}`}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold bg-gray-100 text-gray-600 hover:bg-coral hover:text-white transition-all">
                        View <ChevronRight className="w-3.5 h-3.5" />
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
