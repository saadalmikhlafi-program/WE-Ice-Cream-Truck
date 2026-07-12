"use client";
import { useState, useEffect, useCallback } from "react";
import { Search, Mail, Phone, Loader2, RefreshCw, MessageSquare, AlertCircle } from "lucide-react";
import Link from "next/link";

export default function InquiriesPage() {
  const [inquiries, setInquiries] = useState<any[]>([]);
  const [loading, setLoading]     = useState(true);
  const [search, setSearch]       = useState("");

  const load = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/admin/inquiries");
      const json = await res.json();
      setInquiries(Array.isArray(json.data) ? json.data : Array.isArray(json) ? json : []);
    } catch {} finally { setLoading(false); }
  }, []);

  useEffect(() => { load(); }, [load]);

  const filtered = inquiries.filter(i => 
    !search || `${i.name} ${i.email} ${i.phone} ${i.message}`.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-black text-navy tracking-tight">Contact Inquiries</h1>
          <p className="text-sm font-medium text-gray-400 mt-0.5">{inquiries.length} total messages</p>
        </div>
        <button onClick={load} className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-xl text-sm font-bold text-gray-600 hover:border-gray-300 transition-all shadow-sm">
          <RefreshCw className={`w-4 h-4 ${loading ? "animate-spin" : ""}`} /> Refresh
        </button>
      </div>

      <div className="bg-white border border-gray-100 rounded-2xl shadow-sm p-4">
        <div className="relative max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
          <input value={search} onChange={e => setSearch(e.target.value)}
            placeholder="Search by name, email, or message…"
            className="w-full pl-9 pr-4 py-2.5 border border-gray-200 rounded-xl text-sm outline-none focus:border-coral focus:ring-2 focus:ring-coral/10 transition-all bg-gray-50 placeholder:text-gray-400" />
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        {loading ? (
          <div className="flex items-center justify-center py-20"><Loader2 className="w-7 h-7 animate-spin text-coral" /></div>
        ) : filtered.length === 0 ? (
          <div className="py-20 text-center">
            <MessageSquare className="w-12 h-12 text-gray-200 mx-auto mb-4" />
            <p className="font-bold text-gray-500">No inquiries found</p>
          </div>
        ) : (
          <div className="divide-y divide-gray-50">
            {filtered.map(i => (
              <div key={i.id} className="p-6 hover:bg-gray-50 transition-colors">
                <div className="flex justify-between items-start mb-3">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-coral/10 border border-coral/20 flex items-center justify-center font-black text-coral text-sm">
                      {i.name?.[0]}
                    </div>
                    <div>
                      <div className="font-bold text-sm text-navy">{i.name}</div>
                      <div className="text-[11px] font-medium text-gray-400">{new Date(i.createdAt).toLocaleString("en-US", { dateStyle: "medium", timeStyle: "short" })}</div>
                    </div>
                  </div>
                  <span className={`inline-flex px-2 py-0.5 rounded-full text-[10px] font-bold border ${i.status === "READ" ? "bg-gray-50 text-gray-500 border-gray-200" : "bg-emerald-50 text-emerald-600 border-emerald-200"}`}>
                    {i.status}
                  </span>
                </div>
                <p className="text-sm text-gray-600 mb-4 bg-white border border-gray-100 p-4 rounded-xl leading-relaxed">{i.message}</p>
                <div className="flex items-center gap-4">
                  <a href={`mailto:${i.email}`} className="flex items-center gap-2 text-xs font-bold text-gray-500 hover:text-coral transition-colors">
                    <Mail className="w-3.5 h-3.5" /> {i.email}
                  </a>
                  {i.phone && (
                    <a href={`tel:${i.phone}`} className="flex items-center gap-2 text-xs font-bold text-gray-500 hover:text-coral transition-colors">
                      <Phone className="w-3.5 h-3.5" /> {i.phone}
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
