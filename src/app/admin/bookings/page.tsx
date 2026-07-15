"use client";
import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import {
  Search, RefreshCw, ChevronLeft, ChevronRight,
  Eye, CheckCircle2, XCircle, Clock, DollarSign,
  Loader2, Filter, Download, Calendar, User, Truck
} from "lucide-react";

type Booking = {
  id: string; bookingNumber: string; status: string; eventDate: string;
  startTime: string; city: string; guests: number;
  customer: { firstName: string; lastName: string; phone: string; email: string };
  package: { name: string } | null;
  quote: { totalAmount: number } | null;
  vehicle: { code: string } | null;
};

const STATUS_CONFIG: Record<string, { label: string; bg: string; text: string; border: string }> = {
  PENDING_REVIEW:  { label: "Pending Review",  bg: "#FFF7ED", text: "#C2410C", border: "#FED7AA" },
  PENDING_PAYMENT: { label: "Pending Payment", bg: "#EFF6FF", text: "#1D4ED8", border: "#BFDBFE" },
  CONFIRMED:       { label: "Confirmed",       bg: "#ECFDF5", text: "#059669", border: "#A7F3D0" },
  COMPLETED:       { label: "Completed",       bg: "#F8FAFC", text: "#475569", border: "#CBD5E1" },
  CANCELLED:       { label: "Cancelled",       bg: "#FEF2F2", text: "#DC2626", border: "#FECACA" },
  REJECTED:        { label: "Rejected",        bg: "#FFF1F2", text: "#BE123C", border: "#FECDD3" },
};

const ALL_STATUSES = Object.entries(STATUS_CONFIG);

export default function BookingsPage() {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading]   = useState(true);
  const [search, setSearch]     = useState("");
  const [status, setStatus]     = useState("ALL");
  const [page, setPage]         = useState(1);
  const PER_PAGE = 20;

  const fetchBookings = useCallback(async () => {
    setLoading(true);
    try {
      const res  = await fetch("/api/admin/bookings");
      const json = await res.json();
      setBookings(json.data || []);
    } catch {} finally { setLoading(false); }
  }, []);

  useEffect(() => { fetchBookings(); }, [fetchBookings]);

  const filtered = bookings.filter(b => {
    const q = search.toLowerCase();
    const matchSearch = !search ||
      `${b.customer?.firstName || ""} ${b.customer?.lastName || ""} ${b.bookingNumber} ${b.city || ""} ${b.customer?.email || ""}`
        .toLowerCase().includes(q);
    const matchStatus = status === "ALL" || b.status === status;
    return matchSearch && matchStatus;
  });

  const totalPages = Math.ceil(filtered.length / PER_PAGE);
  const paginated  = filtered.slice((page - 1) * PER_PAGE, page * PER_PAGE);

  const counts: Record<string, number> = { ALL: bookings.length };
  ALL_STATUSES.forEach(([k]) => { counts[k] = bookings.filter(b => b.status === k).length; });

  const statusTabs = [
    { key: "ALL",            label: "All" },
    { key: "PENDING_REVIEW", label: "Pending Review" },
    { key: "CONFIRMED",      label: "Confirmed" },
    { key: "COMPLETED",      label: "Completed" },
    { key: "CANCELLED",      label: "Cancelled" },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-navy tracking-tight">Bookings</h1>
          <p className="text-sm font-medium text-gray-400 mt-0.5">
            {bookings.length} total · {counts["PENDING_REVIEW"] ?? 0} needs review
          </p>
        </div>
        <div className="flex items-center gap-2">
          <a href="/api/admin/export?type=bookings" download
            className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-xl text-sm font-bold text-gray-600 hover:border-gray-300 transition-all shadow-sm">
            <Download className="w-4 h-4" /> Export
          </a>
          <button onClick={fetchBookings}
            className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-xl text-sm font-bold text-gray-600 hover:border-gray-300 transition-all shadow-sm">
            <RefreshCw className={`w-4 h-4 ${loading ? "animate-spin" : ""}`} /> Refresh
          </button>
        </div>
      </div>

      {/* Status Tabs */}
      <div className="flex gap-1 bg-white border border-gray-100 rounded-2xl p-1 shadow-sm overflow-x-auto">
        {statusTabs.map(t => (
          <button key={t.key} onClick={() => { setStatus(t.key); setPage(1); }}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-bold whitespace-nowrap transition-all ${
              status === t.key ? "bg-navy text-white shadow-sm" : "text-gray-500 hover:text-gray-700 hover:bg-gray-50"
            }`}>
            {t.label}
            <span className={`text-[11px] px-1.5 py-0.5 rounded-full font-black ${
              status === t.key ? "bg-white/20 text-white" : "bg-gray-100 text-gray-500"
            }`}>
              {counts[t.key] ?? 0}
            </span>
          </button>
        ))}
      </div>

      {/* Search */}
      <div className="bg-white border border-gray-100 rounded-2xl shadow-sm p-4">
        <div className="relative max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
          <input value={search} onChange={e => { setSearch(e.target.value); setPage(1); }}
            placeholder="Search by name, booking #, city, email…"
            className="w-full pl-9 pr-4 py-2.5 border border-gray-200 rounded-xl text-sm font-medium outline-none focus:border-coral focus:ring-2 focus:ring-coral/10 transition-all bg-gray-50 placeholder:text-gray-400" />
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        {loading ? (
          <div className="flex items-center justify-center py-20">
            <Loader2 className="w-7 h-7 animate-spin text-coral" />
          </div>
        ) : paginated.length === 0 ? (
          <div className="py-20 text-center">
            <div className="text-4xl mb-4">📋</div>
            <p className="font-bold text-gray-500">No bookings found</p>
            <p className="text-sm text-gray-400 mt-1">{search ? "Try a different search" : "Bookings will appear here"}</p>
          </div>
        ) : (
          <>
            <div className="overflow-x-auto">
              <table className="w-full min-w-[800px]">
                <thead>
                  <tr className="border-b border-gray-100 bg-gray-50/60">
                    {["Booking", "Customer", "Date & Time", "Package", "Total", "Status", "Actions"].map(h => (
                      <th key={h} className={`px-5 py-3.5 text-[11px] font-black uppercase tracking-wider text-gray-400 ${h === "Actions" ? "text-right" : "text-left"}`}>
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  {paginated.map(b => {
                    const sc = STATUS_CONFIG[b.status] ?? STATUS_CONFIG.CONFIRMED;
                    const dateStr = new Date(b.eventDate + "T12:00:00").toLocaleDateString("en-US", {
                      month: "short", day: "numeric", year: "numeric"
                    });
                    return (
                      <tr key={b.id} className="hover:bg-gray-50/50 transition-colors group">
                        <td className="px-5 py-4">
                          <div className="font-black text-sm text-navy">#{b.bookingNumber}</div>
                          <div className="text-[11px] text-gray-400 font-medium mt-0.5">{b.guests} guests</div>
                        </td>
                        <td className="px-5 py-4">
                          <div className="font-bold text-sm text-navy">{b.customer?.firstName || "Unknown"} {b.customer?.lastName || ""}</div>
                          <div className="text-[11px] text-gray-400 font-medium mt-0.5">{b.customer?.phone || "No phone"}</div>
                        </td>
                        <td className="px-5 py-4">
                          <div className="font-bold text-sm text-navy">{dateStr}</div>
                          <div className="text-[11px] text-gray-400 font-medium mt-0.5">{b.startTime} · {b.city}</div>
                        </td>
                        <td className="px-5 py-4">
                          <div className="font-bold text-sm text-navy">{b.package?.name ?? "—"}</div>
                          <div className="text-[11px] text-gray-400 font-medium mt-0.5">{b.vehicle?.code ?? "Unassigned"}</div>
                        </td>
                        <td className="px-5 py-4">
                          <div className="font-black text-sm text-navy">
                            ${b.quote?.totalAmount?.toFixed(0) ?? "—"}
                          </div>
                        </td>
                        <td className="px-5 py-4">
                          <span className="inline-flex items-center px-2.5 py-1 rounded-full text-[11px] font-bold border"
                            style={{ background: sc.bg, color: sc.text, borderColor: sc.border }}>
                            {sc.label}
                          </span>
                        </td>
                        <td className="px-5 py-4 text-right">
                          <Link href={`/admin/bookings/${b.id}`}
                            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold bg-gray-100 text-gray-600 hover:bg-coral hover:text-white transition-all">
                            <Eye className="w-3.5 h-3.5" /> View
                          </Link>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="px-5 py-4 border-t border-gray-100 flex items-center justify-between">
                <p className="text-sm font-medium text-gray-500">
                  Showing {(page - 1) * PER_PAGE + 1}–{Math.min(page * PER_PAGE, filtered.length)} of {filtered.length}
                </p>
                <div className="flex items-center gap-2">
                  <button onClick={() => setPage(p => Math.max(1, p - 1))} disabled={page === 1}
                    className="w-8 h-8 flex items-center justify-center rounded-lg border border-gray-200 text-gray-500 hover:border-coral hover:text-coral disabled:opacity-40 disabled:cursor-not-allowed transition-all">
                    <ChevronLeft className="w-4 h-4" />
                  </button>
                  {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                    const p = totalPages <= 5 ? i + 1 : Math.max(1, Math.min(page - 2, totalPages - 4)) + i;
                    return (
                      <button key={p} onClick={() => setPage(p)}
                        className={`w-8 h-8 rounded-lg text-xs font-bold transition-all ${page === p ? "bg-coral text-white" : "border border-gray-200 text-gray-500 hover:border-coral hover:text-coral"}`}>
                        {p}
                      </button>
                    );
                  })}
                  <button onClick={() => setPage(p => Math.min(totalPages, p + 1))} disabled={page === totalPages}
                    className="w-8 h-8 flex items-center justify-center rounded-lg border border-gray-200 text-gray-500 hover:border-coral hover:text-coral disabled:opacity-40 disabled:cursor-not-allowed transition-all">
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
