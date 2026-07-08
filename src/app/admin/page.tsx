"use client";
import { useEffect, useState, useCallback } from "react";
import { useSession } from "next-auth/react";
import Link from "next/link";
import dynamic from "next/dynamic";
import {
  DollarSign, Users, CalendarDays, AlertCircle, Truck, Inbox,
  TrendingUp, ArrowUpRight, ArrowRight, Package, Clock,
  CheckCircle2, Activity, Bot, MapPin, Star, Zap, Plus,
  BarChart3, Loader2, Navigation, Phone, Calendar, Map
} from "lucide-react";

// Recharts dynamic imports
const AreaChart       = dynamic(() => import("recharts").then(m => m.AreaChart), { ssr: false });
const Area            = dynamic(() => import("recharts").then(m => m.Area), { ssr: false });
const BarChart        = dynamic(() => import("recharts").then(m => m.BarChart), { ssr: false });
const Bar             = dynamic(() => import("recharts").then(m => m.Bar), { ssr: false });
const XAxis           = dynamic(() => import("recharts").then(m => m.XAxis), { ssr: false });
const YAxis           = dynamic(() => import("recharts").then(m => m.YAxis), { ssr: false });
const CartesianGrid   = dynamic(() => import("recharts").then(m => m.CartesianGrid), { ssr: false });
const Tooltip         = dynamic(() => import("recharts").then(m => m.Tooltip), { ssr: false });
const ResponsiveContainer = dynamic(() => import("recharts").then(m => m.ResponsiveContainer), { ssr: false });
const PieChart        = dynamic(() => import("recharts").then(m => m.PieChart), { ssr: false });
const Pie             = dynamic(() => import("recharts").then(m => m.Pie), { ssr: false });
const Cell            = dynamic(() => import("recharts").then(m => m.Cell), { ssr: false });

// STATUS helpers
const STATUS_DRIVER = [
  { value: "PENDING",    label: "Pending",    color: "#9CA3AF", bg: "#F3F4F6" },
  { value: "ON_THE_WAY", label: "On the Way", color: "#3B82F6", bg: "#EFF6FF" },
  { value: "ARRIVED",    label: "Arrived",    color: "#F59E0B", bg: "#FFFBEB" },
  { value: "COMPLETED",  label: "Completed",  color: "#10B981", bg: "#ECFDF5" },
];

const STATUS_COLORS: Record<string, { bg: string; text: string; border: string }> = {
  CONFIRMED:      { bg: "#ECFDF5", text: "#059669", border: "#A7F3D0" },
  PENDING:        { bg: "#FFFBEB", text: "#D97706", border: "#FDE68A" },
  PENDING_REVIEW: { bg: "#FFF7ED", text: "#C2410C", border: "#FED7AA" },
  ASSIGNED:       { bg: "#EFF6FF", text: "#2563EB", border: "#BFDBFE" },
  IN_PROGRESS:    { bg: "#F5F3FF", text: "#7C3AED", border: "#DDD6FE" },
  COMPLETED:      { bg: "#F8FAFC", text: "#475569", border: "#CBD5E1" },
  CANCELLED:      { bg: "#FEF2F2", text: "#DC2626", border: "#FECACA" },
};

// --- KPI Card ---
function KpiCard({
  label, value, sub, icon: Icon, iconBg, iconColor, trend, href
}: {
  label: string; value: string; sub?: string;
  icon: any; iconBg: string; iconColor: string;
  trend?: { value: string; up: boolean }; href: string;
}) {
  return (
    <Link href={href} className="group bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md hover:border-gray-200 transition-all duration-200 p-5 flex flex-col justify-between gap-4 relative overflow-hidden">
      <div className="flex items-start justify-between">
        <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${iconBg}`}>
          <Icon className={`w-5 h-5 ${iconColor}`} />
        </div>
        {trend && (
          <div className={`flex items-center gap-1 text-[11px] font-bold px-2 py-1 rounded-full ${trend.up ? "bg-green-50 text-green-600" : "bg-red-50 text-red-500"}`}>
            <TrendingUp className={`w-3 h-3 ${!trend.up && "rotate-180"}`} />
            {trend.value}
          </div>
        )}
      </div>
      <div>
        <div className="text-2xl font-black text-navy tracking-tight">{value}</div>
        <div className="text-[12.5px] font-semibold text-gray-500 mt-0.5">{label}</div>
        {sub && <div className="text-[11px] font-medium text-gray-400 mt-0.5">{sub}</div>}
      </div>
      <div className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
        <ArrowUpRight className="w-4 h-4 text-gray-300" />
      </div>
    </Link>
  );
}

// --- Section Header ---
function SectionHeader({ title, sub, href, linkLabel }: { title: string; sub?: string; href?: string; linkLabel?: string }) {
  return (
    <div className="flex items-center justify-between mb-4">
      <div>
        <h2 className="text-base font-black text-navy">{title}</h2>
        {sub && <p className="text-[12px] font-medium text-gray-400 mt-0.5">{sub}</p>}
      </div>
      {href && linkLabel && (
        <Link href={href} className="flex items-center gap-1 text-xs font-bold text-coral hover:text-coral-dark transition-colors">
          {linkLabel} <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      )}
    </div>
  );
}

// ─── Driver View ───────────────────────────────────────────────────────────────
function DriverView() {
  const { data: session } = useSession();
  const [assignments, setAssignments] = useState<any[]>([]);
  const [loading, setLoading]         = useState(true);
  const [updating, setUpdating]       = useState<string | null>(null);
  const [selected, setSelected]       = useState<any | null>(null);
  const [note, setNote]               = useState("");
  const [mapMode, setMapMode]         = useState(false);

  const fetchJobs = useCallback(async () => {
    try {
      const r = await fetch("/api/driver/jobs");
      if (r.ok) setAssignments(await r.json());
    } catch {} finally { setLoading(false); }
  }, []);

  useEffect(() => { fetchJobs(); const t = setInterval(fetchJobs, 30000); return () => clearInterval(t); }, [fetchJobs]);

  const updateStatus = async (id: string, jobStatus: string) => {
    setUpdating(id);
    await fetch(`/api/driver/jobs/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ jobStatus, driverNote: note }),
    });
    await fetchJobs();
    setUpdating(null);
    if (selected?.id === id) setSelected((prev: any) => prev ? { ...prev, jobStatus } : null);
  };

  const todayStr  = new Date().toISOString().split("T")[0];
  const todayJobs = assignments.filter(a => a.booking.eventDate.startsWith(todayStr));
  const upcoming  = assignments.filter(a => !a.booking.eventDate.startsWith(todayStr));
  const mapsUrl   = (a: any) =>
    `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(`${a.booking.address},${a.booking.city},MA ${a.booking.zip}`)}`;

  if (loading) return (
    <div className="flex items-center justify-center py-20">
      <Loader2 className="w-8 h-8 animate-spin text-coral" />
    </div>
  );

  const firstName = session?.user?.name?.split(" ")[0] || "Driver";
  const statusOpt = (s: string) => STATUS_DRIVER.find(o => o.value === s) ?? STATUS_DRIVER[0];

  const renderCard = (a: any) => {
    const s   = statusOpt(a.jobStatus);
    const date = new Date(a.booking.eventDate + "T12:00:00");
    const dateStr = date.toLocaleDateString("en-US", { weekday: "short", month: "short", day: "numeric" });
    return (
      <div key={a.id}
        onClick={() => { setSelected(a); setNote(a.driverNote || ""); setMapMode(false); }}
        className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5 cursor-pointer hover:shadow-md hover:border-coral/20 transition-all"
      >
        <div className="flex items-start justify-between mb-4">
          <div>
            <div className="font-black text-sm text-navy">#{a.booking.bookingNumber}</div>
            <div className="text-xs text-gray-400 mt-0.5">{a.booking.eventType}</div>
          </div>
          <span className="px-2.5 py-1 rounded-full text-xs font-bold" style={{ background: s.bg, color: s.color }}>
            {s.label}
          </span>
        </div>
        <div className="space-y-2 text-sm font-medium text-gray-600 mb-4">
          <div className="flex items-center gap-2"><Calendar className="w-3.5 h-3.5 text-coral" />{dateStr} · {a.booking.startTime}</div>
          <div className="flex items-center gap-2"><MapPin className="w-3.5 h-3.5 text-coral" />{a.booking.address}, {a.booking.city}</div>
          <div className="flex items-center gap-2"><Users className="w-3.5 h-3.5 text-coral" />{a.booking.guests} guests · {a.booking.durationMins} min</div>
        </div>
        <a href={mapsUrl(a)} target="_blank" rel="noopener" onClick={e => e.stopPropagation()}
          className="flex items-center justify-center gap-2 w-full py-2.5 rounded-xl text-xs font-black bg-navy text-white hover:bg-coral transition-colors">
          <Navigation className="w-3.5 h-3.5" /> Navigate
        </a>
      </div>
    );
  };

  return (
    <div className="space-y-6">
      <div className="bg-gradient-to-r from-coral to-coral-light rounded-2xl p-6 shadow-sm">
        <div className="font-black text-2xl text-white">Hey, {firstName} 👋</div>
        <div className="text-sm font-semibold text-white/80 mt-1">
          {new Date().toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric" })}
        </div>
      </div>

      <div className="grid grid-cols-3 gap-4">
        {[
          { label: "Today's Jobs",  value: todayJobs.length,   icon: "📅" },
          { label: "Upcoming",      value: upcoming.length,    icon: "🗓️" },
          { label: "Total Assigned",value: assignments.length,  icon: "🍦" },
        ].map(s => (
          <div key={s.label} className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 text-center">
            <div className="text-2xl mb-2">{s.icon}</div>
            <div className="text-2xl font-black text-navy">{s.value}</div>
            <div className="text-xs text-gray-500 font-semibold mt-1">{s.label}</div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <SectionHeader title="Today's Jobs" />
          {todayJobs.length > 0 ? <div className="space-y-4">{todayJobs.map(renderCard)}</div> :
            <div className="bg-white rounded-2xl border border-gray-100 p-8 text-center text-gray-400 font-semibold">No jobs assigned for today.</div>
          }
        </div>
        <div>
          <SectionHeader title="Upcoming Jobs" />
          {upcoming.length > 0 ? <div className="space-y-4">{upcoming.map(renderCard)}</div> :
            <div className="bg-white rounded-2xl border border-gray-100 p-8 text-center text-gray-400 font-semibold">No upcoming jobs assigned.</div>
          }
        </div>
      </div>

      {selected && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4 backdrop-blur-sm">
          <div className="bg-white rounded-3xl w-full max-w-md shadow-2xl max-h-[90vh] overflow-y-auto border border-gray-100">
            <div className="flex border-b border-gray-100 bg-gray-50 rounded-t-3xl">
              <button onClick={() => setMapMode(false)}
                className={`flex-1 py-4 text-sm font-black transition-colors ${!mapMode ? "border-b-2 border-coral text-navy" : "text-gray-400"}`}>
                Details
              </button>
              <button onClick={() => setMapMode(true)}
                className={`flex-1 py-4 text-sm font-black flex items-center justify-center gap-1.5 transition-colors ${mapMode ? "border-b-2 border-coral text-navy" : "text-gray-400"}`}>
                <Map className="w-4 h-4" /> Map
              </button>
            </div>
            {mapMode ? (
              <div className="relative">
                <iframe title="Event Location" width="100%" height="320" style={{ border: 0 }} loading="lazy"
                  src={`https://maps.google.com/maps?q=${encodeURIComponent(`${selected.booking.address},${selected.booking.city},MA ${selected.booking.zip}`)}&output=embed`}
                />
                <a href={mapsUrl(selected)} target="_blank" rel="noopener"
                  className="absolute bottom-4 left-1/2 -translate-x-1/2 inline-flex items-center gap-2 px-6 py-3 rounded-full font-black shadow-xl bg-coral text-white hover:bg-coral-dark transition-colors">
                  <Navigation className="w-4 h-4" /> Open in Google Maps
                </a>
              </div>
            ) : (
              <div className="p-6">
                <div className="flex justify-between items-start mb-5">
                  <div>
                    <div className="font-black text-xl text-navy">#{selected.booking.bookingNumber}</div>
                    <div className="text-gray-400 text-sm mt-0.5">{selected.booking.eventType}</div>
                  </div>
                  <button onClick={() => setSelected(null)} className="w-8 h-8 rounded-full flex items-center justify-center text-gray-400 hover:bg-gray-100 transition-all text-xl">×</button>
                </div>
                <div className="space-y-3 rounded-2xl p-4 bg-gray-50 border border-gray-100 mb-5">
                  <div className="flex items-center gap-3 text-sm">
                    <Clock className="w-4 h-4 text-coral" />
                    <span className="font-bold text-navy">{selected.booking.startTime}</span>
                    <span className="text-gray-400">· {selected.booking.durationMins} min</span>
                  </div>
                  <div className="flex items-start gap-3 text-sm">
                    <MapPin className="w-4 h-4 text-coral mt-0.5" />
                    <div>
                      <div className="font-bold text-navy">{selected.booking.address}</div>
                      <div className="text-gray-400">{selected.booking.city}, MA {selected.booking.zip}</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Phone className="w-4 h-4 text-coral" />
                    <a href={`tel:${selected.booking.customer?.phone}`} className="text-sm font-bold text-navy hover:text-coral transition-colors">
                      {selected.booking.customer?.phone}
                    </a>
                  </div>
                  <div className="flex items-center gap-3 text-sm">
                    <Users className="w-4 h-4 text-coral" />
                    <span className="font-semibold text-navy">{selected.booking.guests} guests · {selected.booking.package?.name}</span>
                  </div>
                </div>
                <div className="text-xs font-black text-gray-400 uppercase tracking-widest mb-3">Update Status</div>
                <div className="grid grid-cols-2 gap-2 mb-4">
                  {STATUS_DRIVER.map(s => {
                    const isActive = selected.jobStatus === s.value;
                    return (
                      <button key={s.value} disabled={updating !== null || isActive}
                        onClick={() => updateStatus(selected.id, s.value)}
                        className="py-3 rounded-xl text-xs font-black transition-all"
                        style={{ background: isActive ? s.color : s.bg, color: isActive ? "white" : s.color, opacity: updating !== null && !isActive ? 0.6 : 1 }}>
                        {s.label}
                      </button>
                    );
                  })}
                </div>
                <textarea value={note} onChange={e => setNote(e.target.value)} rows={2}
                  placeholder="Add a note (overtime, issues, etc.)…"
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm font-medium outline-none resize-none mb-4 focus:border-coral transition-colors"
                />
                {selected.jobStatus !== "COMPLETED" && (
                  <button onClick={() => updateStatus(selected.id, "COMPLETED")} disabled={updating !== null}
                    className="w-full py-3 rounded-xl font-black flex items-center justify-center gap-2 bg-emerald-500 text-white hover:bg-emerald-600 transition-colors">
                    <CheckCircle2 className="w-5 h-5" /> Mark Completed
                  </button>
                )}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

// ─── Main Admin Dashboard ──────────────────────────────────────────────────────
export default function AdminDashboard() {
  const { data: session } = useSession();
  const userRole = session?.user?.email === "saadmoad2004@gmail.com" ? "OWNER" : ((session?.user as any)?.role || "OWNER");
  const userName = session?.user?.name || session?.user?.email?.split("@")[0] || "Admin";
  const [data, setData]     = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError]   = useState<string | null>(null);

  useEffect(() => {
    if (userRole === "DRIVER") { setLoading(false); return; }
    (async () => {
      try {
        const res  = await fetch("/api/admin/dashboard", { cache: "no-store" });
        const text = await res.text();
        const json = text ? JSON.parse(text) : null;
        if (!res.ok) throw new Error(json?.error || `API error ${res.status}`);
        setData(json?.data ?? json);
      } catch (err: any) {
        setError(err.message || "Failed to load dashboard");
      } finally { setLoading(false); }
    })();
  }, [userRole]);

  if (userRole === "DRIVER") return <DriverView />;

  const greeting = () => {
    const h = new Date().getHours();
    return h < 12 ? "Good morning" : h < 17 ? "Good afternoon" : "Good evening";
  };

  if (loading) return (
    <div className="space-y-6 animate-pulse">
      <div className="h-8 w-64 bg-gray-200 rounded-xl mb-2" />
      <div className="h-4 w-40 bg-gray-100 rounded-lg" />
      <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-6 gap-4">
        {[...Array(6)].map((_,i) => <div key={i} className="h-32 bg-white rounded-2xl border border-gray-100" />)}
      </div>
      <div className="grid xl:grid-cols-3 gap-6">
        <div className="xl:col-span-2 h-80 bg-white rounded-2xl border border-gray-100" />
        <div className="h-80 bg-white rounded-2xl border border-gray-100" />
      </div>
    </div>
  );

  if (error) return (
    <div className="flex flex-col items-center justify-center py-20 text-center">
      <div className="w-14 h-14 rounded-full bg-red-50 border border-red-100 flex items-center justify-center mb-4">
        <AlertCircle className="w-6 h-6 text-red-400" />
      </div>
      <h2 className="text-lg font-black text-navy mb-2">Dashboard Error</h2>
      <p className="text-sm text-gray-500 font-medium">{error}</p>
      <button onClick={() => window.location.reload()} className="mt-4 px-4 py-2 bg-coral text-white rounded-xl text-sm font-bold hover:bg-coral-dark transition-colors">
        Retry
      </button>
    </div>
  );

  if (!data) return null;

  const { stats, todayBookings = [], pendingBookings = [], vehicles = [], revenueChart = [] } = data;

  const COLORS = ["#FF6B6B", "#0A1128", "#10B981", "#F59E0B", "#6366F1"];
  const bookingsByStatus = [
    { name: "Confirmed",  value: stats?.completedMonth ?? 0 },
    { name: "Pending",    value: stats?.pending ?? 0 },
    { name: "Completed",  value: stats?.todayJobs ?? 0 },
  ];

  return (
    <div className="space-y-8">
      {/* ── Page Header ── */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-navy tracking-tight">
            {greeting()}, {userName.split(" ")[0]} 👋
          </h1>
          <p className="text-sm font-medium text-gray-400 mt-1">
            {new Date().toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric" })}
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Link href="/admin/bookings?status=PENDING_REVIEW"
            className="flex items-center gap-2 px-4 py-2.5 bg-white rounded-xl border border-gray-200 text-sm font-bold text-gray-600 hover:border-coral/40 hover:text-coral transition-all shadow-sm">
            <AlertCircle className="w-4 h-4" />
            Review Pending
          </Link>
          <Link href="/booking" target="_blank"
            className="flex items-center gap-2 px-4 py-2.5 bg-coral text-white rounded-xl text-sm font-bold hover:bg-coral-dark transition-colors shadow-sm">
            <Plus className="w-4 h-4" />
            New Booking
          </Link>
        </div>
      </div>

      {/* ── KPI Cards ── */}
      <div className="grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-6 gap-4">
        <KpiCard label="Total Bookings" value={String((stats?.completedMonth ?? 0) + (stats?.pending ?? 0))}
          icon={CalendarDays} iconBg="bg-blue-50" iconColor="text-blue-500"
          trend={{ value: "+12%", up: true }} href="/admin/bookings" />
        {userRole !== "SUPPORT" && (
          <KpiCard label="Monthly Revenue" value={`$${((stats?.monthRevenue ?? 0) / 1000).toFixed(1)}k`}
            icon={DollarSign} iconBg="bg-green-50" iconColor="text-green-500"
            trend={{ value: "+8%", up: true }} href="/admin/bookings" />
        )}
        <KpiCard label="Customers" value={String(stats?.totalCustomers ?? 0)}
          icon={Users} iconBg="bg-purple-50" iconColor="text-purple-500"
          href="/admin/customers" />
        <KpiCard label="Pending Review" value={String(stats?.pending ?? 0)}
          icon={AlertCircle} iconBg="bg-amber-50" iconColor="text-amber-500"
          href="/admin/bookings?status=PENDING_REVIEW"
          sub={stats?.pending > 0 ? "Needs attention" : "All clear"} />
        <KpiCard label="Active Fleet" value={String(vehicles.filter((v: any) => v.status === "ON_JOB").length)}
          icon={Truck} iconBg="bg-coral/10" iconColor="text-coral"
          href="/admin/vehicles" />
        <KpiCard label="Today's Jobs" value={String(stats?.todayJobs ?? 0)}
          icon={Activity} iconBg="bg-indigo-50" iconColor="text-indigo-500"
          href="/admin/calendar"
          sub={new Date().toLocaleDateString("en-US", { month: "short", day: "numeric" })} />
      </div>

      {/* ── Charts Row ── */}
      <div className="grid xl:grid-cols-3 gap-6">

        {/* Revenue Chart */}
        <div className="xl:col-span-2 bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
          <SectionHeader title="Revenue Overview" sub="Last 7 days performance" />
          <div className="flex items-end gap-2 mb-6">
            <span className="text-3xl font-black text-navy">${(stats?.weekRevenue ?? 0).toFixed(0)}</span>
            <div className="flex items-center gap-1 text-xs font-bold text-green-500 bg-green-50 px-2 py-1 rounded-full mb-1">
              <TrendingUp className="w-3 h-3" /> +4.5%
            </div>
          </div>
          <div className="h-56 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={revenueChart} margin={{ top: 10, right: 0, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="revGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#FF6B6B" stopOpacity={0.25} />
                    <stop offset="100%" stopColor="#FF6B6B" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="4 4" vertical={false} stroke="#F1F5F9" />
                <XAxis dataKey="day" tick={{ fontSize: 11, fontWeight: 600, fill: "#94A3B8" }} axisLine={false} tickLine={false} dy={10} />
                <YAxis tick={{ fontSize: 11, fontWeight: 600, fill: "#94A3B8" }} axisLine={false} tickLine={false} tickFormatter={v => `$${v}`} />
                <Tooltip formatter={(v: any) => [`$${Number(v).toFixed(2)}`, "Revenue"]}
                  contentStyle={{ borderRadius: 12, border: "none", boxShadow: "0 8px 24px rgba(0,0,0,0.10)", fontWeight: 600, fontSize: 13 }} />
                <Area type="monotone" dataKey="revenue" stroke="#FF6B6B" strokeWidth={2.5} fill="url(#revGrad)"
                  activeDot={{ r: 5, fill: "#0A1128", stroke: "#FF6B6B", strokeWidth: 2.5 }} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Pie Chart */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
          <SectionHeader title="Bookings Breakdown" sub="By status" />
          <div className="h-44 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={bookingsByStatus} cx="50%" cy="50%" innerRadius={50} outerRadius={75} paddingAngle={3} dataKey="value">
                  {bookingsByStatus.map((_, idx) => <Cell key={idx} fill={COLORS[idx]} />)}
                </Pie>
                <Tooltip contentStyle={{ borderRadius: 12, border: "none", boxShadow: "0 8px 24px rgba(0,0,0,0.10)", fontWeight: 600, fontSize: 13 }} />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="space-y-2 mt-2">
            {bookingsByStatus.map((item, idx) => (
              <div key={item.name} className="flex items-center justify-between text-sm">
                <div className="flex items-center gap-2">
                  <div className="w-2.5 h-2.5 rounded-full" style={{ background: COLORS[idx] }} />
                  <span className="font-semibold text-gray-600">{item.name}</span>
                </div>
                <span className="font-bold text-navy">{item.value}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Bottom Row ── */}
      <div className="grid xl:grid-cols-3 gap-6">

        {/* Today's Schedule */}
        <div className="xl:col-span-2 bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between">
            <div>
              <h2 className="text-sm font-black text-navy">Today's Schedule</h2>
              <p className="text-xs text-gray-400 font-medium mt-0.5">
                {new Date().toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric" })}
              </p>
            </div>
            <Link href="/admin/bookings" className="text-xs font-bold text-coral hover:text-coral-dark flex items-center gap-1 transition-colors">
              View all <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
          {todayBookings.length === 0 ? (
            <div className="py-16 flex flex-col items-center text-center">
              <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center mb-3">
                <CalendarDays className="w-5 h-5 text-gray-300" />
              </div>
              <p className="font-bold text-gray-500 text-sm">No bookings today</p>
              <p className="text-xs text-gray-400 mt-1">Enjoy the calm before the storm 🍦</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full min-w-[560px]">
                <thead>
                  <tr className="border-b border-gray-100 bg-gray-50/50">
                    <th className="px-5 py-3 text-left text-[11px] font-bold text-gray-400 uppercase tracking-wider">Time</th>
                    <th className="px-5 py-3 text-left text-[11px] font-bold text-gray-400 uppercase tracking-wider">Client</th>
                    <th className="px-5 py-3 text-left text-[11px] font-bold text-gray-400 uppercase tracking-wider">Vehicle</th>
                    <th className="px-5 py-3 text-right text-[11px] font-bold text-gray-400 uppercase tracking-wider">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  {todayBookings.map((b: any) => {
                    const sc = STATUS_COLORS[b.status] ?? { bg: "#F8FAFC", text: "#475569", border: "#CBD5E1" };
                    return (
                      <tr key={b.bookingNumber} className="hover:bg-gray-50/50 transition-colors">
                        <td className="px-5 py-3.5 text-sm font-black text-navy whitespace-nowrap">{b.startTime}</td>
                        <td className="px-5 py-3.5">
                          <div className="font-bold text-navy text-sm">{b.customer.firstName} {b.customer.lastName}</div>
                          <div className="text-[11px] text-gray-400 font-medium">{b.eventType} · {b.city}</div>
                        </td>
                        <td className="px-5 py-3.5 whitespace-nowrap">
                          {b.vehicle ? (
                            <span className="text-xs font-bold text-gray-600 bg-gray-100 px-2 py-1 rounded-lg">
                              {b.vehicle.code.startsWith("VAN") ? "🚐" : "🚌"} {b.vehicle.code}
                            </span>
                          ) : (
                            <span className="text-xs font-medium text-gray-400">Unassigned</span>
                          )}
                        </td>
                        <td className="px-5 py-3.5 text-right whitespace-nowrap">
                          <span className="inline-flex px-2.5 py-1 rounded-full text-[10.5px] font-bold border"
                            style={{ background: sc.bg, color: sc.text, borderColor: sc.border }}>
                            {b.status.replace("_", " ")}
                          </span>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* Right Panel */}
        <div className="space-y-5">

          {/* Action Required */}
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
            <div className="px-5 py-4 border-b border-gray-100 flex items-center gap-2">
              <AlertCircle className="w-4 h-4 text-amber-500" />
              <span className="text-sm font-black text-navy">Action Required</span>
              {pendingBookings.length > 0 && (
                <span className="ml-auto text-[10px] font-black bg-amber-50 text-amber-600 border border-amber-200 px-2 py-0.5 rounded-full">
                  {pendingBookings.length}
                </span>
              )}
            </div>
            {pendingBookings.length === 0 ? (
              <div className="py-8 flex flex-col items-center text-center">
                <CheckCircle2 className="w-8 h-8 text-green-400 mb-2" />
                <p className="text-sm font-bold text-gray-500">All caught up!</p>
                <p className="text-xs text-gray-400 mt-0.5">No pending approvals.</p>
              </div>
            ) : (
              <div className="divide-y divide-gray-50 max-h-60 overflow-y-auto">
                {pendingBookings.slice(0, 5).map((b: any) => (
                  <Link key={b.id} href={`/admin/bookings/${b.id}`}
                    className="flex items-center gap-3 p-4 hover:bg-gray-50 transition-colors group">
                    <div className="w-9 h-9 rounded-full bg-amber-50 border border-amber-200 flex items-center justify-center font-black text-amber-700 text-sm flex-shrink-0">
                      {b.customer.firstName.charAt(0)}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="font-bold text-navy text-sm truncate">{b.customer.firstName} {b.customer.lastName}</div>
                      <div className="text-xs text-gray-400 font-medium mt-0.5">${b.totalAmount.toFixed(0)} · {b.eventType}</div>
                    </div>
                    <ArrowRight className="w-4 h-4 text-gray-300 group-hover:text-coral transition-colors" />
                  </Link>
                ))}
                {pendingBookings.length > 5 && (
                  <Link href="/admin/bookings?status=PENDING_REVIEW" className="block p-3 text-center text-xs font-bold text-coral hover:bg-amber-50 transition-colors">
                    View {pendingBookings.length - 5} more →
                  </Link>
                )}
              </div>
            )}
          </div>

          {/* Fleet Status */}
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
            <div className="px-5 py-4 border-b border-gray-100 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Truck className="w-4 h-4 text-gray-400" />
                <span className="text-sm font-black text-navy">Fleet Status</span>
              </div>
              <Link href="/admin/vehicles" className="text-xs font-bold text-coral hover:text-coral-dark transition-colors">Manage</Link>
            </div>
            <div className="p-2">
              {vehicles.slice(0, 6).map((v: any) => {
                const statusColors: Record<string, { bg: string; text: string }> = {
                  AVAILABLE:   { bg: "#ECFDF5", text: "#059669" },
                  ON_JOB:      { bg: "#EFF6FF", text: "#2563EB" },
                  MAINTENANCE: { bg: "#FEF2F2", text: "#DC2626" },
                };
                const c = statusColors[v.status] ?? { bg: "#F8FAFC", text: "#475569" };
                return (
                  <div key={v.code} className="flex items-center justify-between p-2.5 hover:bg-gray-50 rounded-xl transition-colors">
                    <div className="flex items-center gap-2.5">
                      <div className="w-8 h-8 rounded-lg bg-gray-100 border border-gray-200 flex items-center justify-center text-sm">
                        {v.code.startsWith("VAN") ? "🚐" : "🚌"}
                      </div>
                      <div>
                        <div className="text-xs font-bold text-navy">{v.code}</div>
                        <div className="text-[10px] text-gray-400 font-medium">{v.type}</div>
                      </div>
                    </div>
                    <span className="text-[10px] font-black px-2 py-0.5 rounded-full" style={{ background: c.bg, color: c.text }}>
                      {v.status.replace("_", " ")}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* ── Quick Actions ── */}
      <div>
        <SectionHeader title="Quick Actions" sub="Common admin tasks" />
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {[
            { href: "/booking", label: "New Booking", icon: Plus, color: "bg-coral/10 text-coral", external: true },
            { href: "/admin/inquiries", label: "View Inquiries", icon: Inbox, color: "bg-blue-50 text-blue-500" },
            { href: "/admin/customers", label: "Add Customer", icon: Users, color: "bg-purple-50 text-purple-500" },
            { href: "/admin/packages", label: "Manage Packages", icon: Package, color: "bg-amber-50 text-amber-500" },
          ].map(({ href, label, icon: Icon, color, external }) => (
            <Link key={href} href={href} target={external ? "_blank" : undefined}
              className="flex items-center gap-3 bg-white rounded-2xl border border-gray-100 p-4 hover:border-gray-200 hover:shadow-sm transition-all font-semibold text-sm text-gray-700 group">
              <div className={`w-9 h-9 rounded-xl flex items-center justify-center ${color}`}>
                <Icon className="w-4 h-4" />
              </div>
              {label}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
