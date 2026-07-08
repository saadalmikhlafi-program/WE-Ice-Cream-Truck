"use client";
import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import {
  ArrowLeft, CheckCircle2, XCircle, MapPin, Users,
  Phone, Mail, DollarSign, Calendar, Loader2, ChevronRight, AlertCircle, MessageSquare
} from "lucide-react";

const STATUS_CONFIG: Record<string, { label: string; bg: string; text: string; border: string }> = {
  PENDING_REVIEW:  { label: "Pending Review",  bg: "#FFF7ED", text: "#C2410C", border: "#FED7AA" },
  PENDING_PAYMENT: { label: "Pending Payment", bg: "#EFF6FF", text: "#1D4ED8", border: "#BFDBFE" },
  CONFIRMED:       { label: "Confirmed",       bg: "#ECFDF5", text: "#059669", border: "#A7F3D0" },
  COMPLETED:       { label: "Completed",       bg: "#F8FAFC", text: "#475569", border: "#CBD5E1" },
  CANCELLED:       { label: "Cancelled",       bg: "#FEF2F2", text: "#DC2626", border: "#FECACA" },
  REJECTED:        { label: "Rejected",        bg: "#FFF1F2", text: "#BE123C", border: "#FECDD3" },
};

function InfoRow({ label, value }: { label: string; value: React.ReactNode }) {
  return (
    <div className="flex items-start justify-between py-3 border-b border-gray-50 last:border-0">
      <span className="text-xs font-bold text-gray-400 uppercase tracking-wider w-36 flex-shrink-0">{label}</span>
      <span className="text-sm font-semibold text-navy text-right flex-1">{value || "—"}</span>
    </div>
  );
}

export default function BookingDetailPage() {
  const { id } = useParams<{ id: string }>();
  const [booking, setBooking] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState(false);
  const [internalNote, setInternalNote] = useState("");
  const [showNoteBox, setShowNoteBox] = useState(false);
  const [toast, setToast] = useState<{ msg: string; type: "success" | "error" } | null>(null);

  const showToast = (msg: string, type: "success" | "error" = "success") => {
    setToast({ msg, type });
    setTimeout(() => setToast(null), 3000);
  };

  const loadBooking = async () => {
    setLoading(true);
    try {
      const res  = await fetch(`/api/admin/bookings/${id}`);
      const json = await res.json();
      setBooking(json.data || json);
    } catch { showToast("Failed to load booking", "error"); }
    finally { setLoading(false); }
  };

  useEffect(() => { loadBooking(); }, [id]);

  const updateStatus = async (status: string) => {
    setActionLoading(true);
    try {
      const res = await fetch(`/api/admin/bookings/${id}/status`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status, internalNote }),
      });
      if (res.ok) { showToast(`Status updated to ${status}`); setShowNoteBox(false); await loadBooking(); }
      else { showToast("Failed to update status", "error"); }
    } catch { showToast("Network error", "error"); }
    finally { setActionLoading(false); }
  };

  if (loading) return (
    <div className="flex items-center justify-center min-h-[400px]">
      <Loader2 className="w-8 h-8 animate-spin text-coral" />
    </div>
  );
  if (!booking) return (
    <div className="text-center py-20">
      <AlertCircle className="w-12 h-12 text-gray-300 mx-auto mb-4" />
      <p className="font-bold text-gray-500">Booking not found</p>
    </div>
  );

  const sc = STATUS_CONFIG[booking.status] ?? STATUS_CONFIG.CONFIRMED;
  const dateStr = booking.eventDate
    ? new Date(booking.eventDate + "T12:00:00").toLocaleDateString("en-US", { weekday: "long", year: "numeric", month: "long", day: "numeric" })
    : "—";

  return (
    <div className="space-y-6">
      {toast && (
        <div className={`fixed top-6 right-6 z-[200] px-5 py-3 rounded-2xl shadow-xl text-white text-sm font-bold flex items-center gap-2 transition-all ${toast.type === "success" ? "bg-emerald-500" : "bg-red-500"}`}>
          {toast.type === "success" ? <CheckCircle2 className="w-4 h-4" /> : <XCircle className="w-4 h-4" />}
          {toast.msg}
        </div>
      )}

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <Link href="/admin/bookings" className="w-9 h-9 rounded-xl border border-gray-200 flex items-center justify-center text-gray-500 hover:border-coral hover:text-coral transition-all">
            <ArrowLeft className="w-4 h-4" />
          </Link>
          <div>
            <h1 className="text-xl font-black text-navy">#{booking.bookingNumber}</h1>
            <div className="flex items-center gap-2 mt-1">
              <span className="inline-flex items-center px-2.5 py-1 rounded-full text-[11px] font-bold border"
                style={{ background: sc.bg, color: sc.text, borderColor: sc.border }}>
                {sc.label}
              </span>
              <span className="text-xs text-gray-400 font-medium">{dateStr}</span>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-2 flex-wrap">
          {booking.status === "PENDING_REVIEW" && (
            <>
              <button onClick={() => updateStatus("CONFIRMED")} disabled={actionLoading}
                className="flex items-center gap-2 px-4 py-2 bg-emerald-500 text-white rounded-xl text-sm font-bold hover:bg-emerald-600 disabled:opacity-60 transition-all shadow-sm">
                {actionLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : <CheckCircle2 className="w-4 h-4" />}
                Confirm Booking
              </button>
              <button onClick={() => updateStatus("REJECTED")} disabled={actionLoading}
                className="flex items-center gap-2 px-4 py-2 bg-red-50 border border-red-200 text-red-600 rounded-xl text-sm font-bold hover:bg-red-100 transition-all">
                <XCircle className="w-4 h-4" /> Reject
              </button>
            </>
          )}
          {booking.status === "CONFIRMED" && (
            <button onClick={() => updateStatus("COMPLETED")} disabled={actionLoading}
              className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-xl text-sm font-bold hover:bg-blue-600 disabled:opacity-60 transition-all shadow-sm">
              {actionLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : <CheckCircle2 className="w-4 h-4" />}
              Mark Completed
            </button>
          )}
          {!["CANCELLED","REJECTED","COMPLETED"].includes(booking.status) && (
            <button onClick={() => updateStatus("CANCELLED")} disabled={actionLoading}
              className="px-4 py-2 bg-white border border-gray-200 text-gray-500 rounded-xl text-sm font-bold hover:border-red-300 hover:text-red-500 transition-all">
              Cancel
            </button>
          )}
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-5">
          {/* Event Details */}
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
            <h2 className="text-xs font-black text-navy uppercase tracking-wider mb-4 flex items-center gap-2">
              <Calendar className="w-3.5 h-3.5 text-coral" /> Event Details
            </h2>
            <InfoRow label="Event Type"   value={booking.eventType} />
            <InfoRow label="Date"         value={dateStr} />
            <InfoRow label="Start Time"   value={booking.startTime} />
            <InfoRow label="Duration"     value={booking.durationMins ? `${booking.durationMins} min` : null} />
            <InfoRow label="Guests"       value={booking.guests} />
            <InfoRow label="Address"      value={`${booking.address || ""}, ${booking.city || ""} ${booking.zip || ""}`} />
            <InfoRow label="Package"      value={booking.package?.name} />
            <InfoRow label="Vehicle"      value={booking.vehicle?.code} />
            {booking.notes && <InfoRow label="Notes" value={booking.notes} />}
          </div>

          {/* Pricing */}
          {booking.quote && (
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
              <h2 className="text-xs font-black text-navy uppercase tracking-wider mb-4 flex items-center gap-2">
                <DollarSign className="w-3.5 h-3.5 text-coral" /> Pricing
              </h2>
              <InfoRow label="Base Price"  value={`$${booking.quote.basePrice?.toFixed(2)}`} />
              {booking.quote.travelFee > 0 && <InfoRow label="Travel Fee" value={`$${booking.quote.travelFee?.toFixed(2)}`} />}
              {booking.quote.additionalServiceFee > 0 && <InfoRow label="Additional Service" value={`$${booking.quote.additionalServiceFee?.toFixed(2)}`} />}
              <div className="pt-3 mt-2 border-t border-gray-100 flex items-center justify-between">
                <span className="text-xs font-black text-gray-400 uppercase tracking-wider">Total</span>
                <span className="text-2xl font-black text-navy">${booking.quote.totalAmount?.toFixed(2)}</span>
              </div>
            </div>
          )}

          {/* Internal Notes */}
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xs font-black text-navy uppercase tracking-wider flex items-center gap-2">
                <MessageSquare className="w-3.5 h-3.5 text-coral" /> Internal Notes
              </h2>
              <button onClick={() => setShowNoteBox(v => !v)} className="text-xs font-bold text-coral">
                {showNoteBox ? "Cancel" : "+ Add Note"}
              </button>
            </div>
            {showNoteBox && (
              <div className="mb-4">
                <textarea value={internalNote} onChange={e => setInternalNote(e.target.value)}
                  placeholder="Add an internal note (not visible to customers)…" rows={3}
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm outline-none focus:border-coral resize-none transition-colors" />
                <button onClick={() => updateStatus(booking.status)}
                  className="mt-2 px-4 py-2 bg-coral text-white rounded-xl text-xs font-bold hover:bg-coral-dark transition-colors">
                  Save Note
                </button>
              </div>
            )}
            {booking.internalNote
              ? <div className="bg-amber-50 border border-amber-100 rounded-xl p-4 text-sm text-gray-700">{booking.internalNote}</div>
              : <p className="text-sm text-gray-400">No internal notes yet.</p>
            }
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-5">
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
            <h2 className="text-xs font-black text-navy uppercase tracking-wider mb-4 flex items-center gap-2">
              <Users className="w-3.5 h-3.5 text-coral" /> Customer
            </h2>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-11 h-11 rounded-full bg-coral/10 border border-coral/20 flex items-center justify-center font-black text-coral text-sm">
                {booking.customer?.firstName?.[0]}{booking.customer?.lastName?.[0]}
              </div>
              <div>
                <div className="font-black text-sm text-navy">{booking.customer?.firstName} {booking.customer?.lastName}</div>
                {booking.customer?.id && (
                  <Link href={`/admin/customers/${booking.customer.id}`} className="text-xs font-bold text-coral hover:underline">View Profile →</Link>
                )}
              </div>
            </div>
            <div className="space-y-2.5">
              <a href={`mailto:${booking.customer?.email}`} className="flex items-center gap-2 text-sm text-gray-600 hover:text-coral transition-colors">
                <Mail className="w-4 h-4 text-gray-400 flex-shrink-0" />
                <span className="truncate">{booking.customer?.email}</span>
              </a>
              <a href={`tel:${booking.customer?.phone}`} className="flex items-center gap-2 text-sm text-gray-600 hover:text-coral transition-colors">
                <Phone className="w-4 h-4 text-gray-400 flex-shrink-0" /> {booking.customer?.phone}
              </a>
              {booking.city && (
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <MapPin className="w-4 h-4 text-gray-400 flex-shrink-0" /> {booking.city}, MA
                </div>
              )}
            </div>
          </div>

          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
            <h2 className="text-xs font-black text-navy uppercase tracking-wider mb-3">Activity</h2>
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 rounded-full bg-coral mt-1.5 flex-shrink-0" />
                <div>
                  <div className="text-xs font-bold text-navy">Booking Created</div>
                  <div className="text-[11px] text-gray-400">{booking.createdAt ? new Date(booking.createdAt).toLocaleString() : "—"}</div>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className={`w-2 h-2 rounded-full mt-1.5 flex-shrink-0 ${booking.status !== "PENDING_REVIEW" ? "bg-emerald-500" : "bg-gray-200"}`} />
                <div>
                  <div className="text-xs font-bold text-navy">Status</div>
                  <span className="inline-flex px-2 py-0.5 rounded-full text-[10px] font-bold border" style={{ background: sc.bg, color: sc.text, borderColor: sc.border }}>{sc.label}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
