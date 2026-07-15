"use client";
import { useState, useEffect, useRef } from "react";
import { ChevronLeft, ChevronRight, Loader2, Plus, X } from "lucide-react";
import Link from "next/link";

type CalEvent = {
  id: string; bookingNumber: string; startTime: string;
  eventDate: string; status: string;
  customer: { firstName: string; lastName: string };
  package: { name: string } | null;
  city: string;
};

const STATUS_COLORS: Record<string, string> = {
  CONFIRMED:       "#059669",
  PENDING_REVIEW:  "#D97706",
  PENDING_PAYMENT: "#2563EB",
  COMPLETED:       "#64748B",
  CANCELLED:       "#DC2626",
};

const STATUS_BG: Record<string, string> = {
  CONFIRMED:       "#ECFDF5",
  PENDING_REVIEW:  "#FFFBEB",
  PENDING_PAYMENT: "#EFF6FF",
  COMPLETED:       "#F8FAFC",
  CANCELLED:       "#FEF2F2",
};

const DAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const MONTHS = ["January","February","March","April","May","June","July","August","September","October","November","December"];

export default function CalendarPage() {
  const [events, setEvents]       = useState<CalEvent[]>([]);
  const [loading, setLoading]     = useState(true);
  const [viewDate, setViewDate]   = useState(new Date());
  const [selected, setSelected]   = useState<CalEvent | null>(null);
  const [dayEvents, setDayEvents] = useState<{ date: Date; events: CalEvent[] } | null>(null);

  useEffect(() => {
    (async () => {
      try {
        const res  = await fetch("/api/admin/bookings");
        const json = await res.json();
        setEvents(json.data || []);
      } catch {} finally { setLoading(false); }
    })();
  }, []);

  const year  = viewDate.getFullYear();
  const month = viewDate.getMonth();
  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  const eventsForDay = (d: number) => events.filter(e => {
    const ev = new Date(e.eventDate);
    return ev.getFullYear() === year && ev.getMonth() === month && ev.getDate() === d;
  });

  const cells = [];
  for (let i = 0; i < firstDay; i++) cells.push(null);
  for (let d = 1; d <= daysInMonth; d++) cells.push(d);

  const today = new Date();
  const isToday = (d: number) =>
    d === today.getDate() && month === today.getMonth() && year === today.getFullYear();

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-black text-navy tracking-tight">Calendar</h1>
          <p className="text-sm font-medium text-gray-400 mt-0.5">{events.length} total bookings</p>
        </div>
        <Link href="/booking" target="_blank"
          className="flex items-center gap-2 px-4 py-2 bg-coral text-white rounded-xl text-sm font-bold hover:bg-coral-dark transition-colors shadow-sm">
          <Plus className="w-4 h-4" /> New Booking
        </Link>
      </div>

      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        {/* Month Nav */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
          <button onClick={() => setViewDate(d => new Date(d.getFullYear(), d.getMonth() - 1, 1))}
            className="w-9 h-9 rounded-xl border border-gray-200 flex items-center justify-center text-gray-500 hover:border-coral hover:text-coral transition-all">
            <ChevronLeft className="w-4 h-4" />
          </button>
          <div className="text-center">
            <h2 className="text-lg font-black text-navy">{MONTHS[month]} {year}</h2>
            <button onClick={() => setViewDate(new Date())} className="text-xs font-bold text-coral hover:underline">
              Today
            </button>
          </div>
          <button onClick={() => setViewDate(d => new Date(d.getFullYear(), d.getMonth() + 1, 1))}
            className="w-9 h-9 rounded-xl border border-gray-200 flex items-center justify-center text-gray-500 hover:border-coral hover:text-coral transition-all">
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        {/* Day Headers */}
        <div className="grid grid-cols-7 border-b border-gray-100">
          {DAYS.map(d => (
            <div key={d} className="py-3 text-center text-[11px] font-black text-gray-400 uppercase tracking-wider">
              {d}
            </div>
          ))}
        </div>

        {/* Grid */}
        {loading ? (
          <div className="flex items-center justify-center py-20">
            <Loader2 className="w-7 h-7 animate-spin text-coral" />
          </div>
        ) : (
          <div className="grid grid-cols-7">
            {cells.map((d, idx) => {
              if (!d) return <div key={`empty-${idx}`} className="border-b border-r border-gray-50 min-h-[100px]" />;
              const dayEvs = eventsForDay(d);
              return (
                <div key={d}
                  onClick={() => dayEvs.length > 0 && setDayEvents({ date: new Date(year, month, d), events: dayEvs })}
                  className={`border-b border-r border-gray-50 min-h-[100px] p-2 transition-colors ${dayEvs.length > 0 ? "cursor-pointer hover:bg-gray-50" : ""}`}>
                  <div className={`w-7 h-7 flex items-center justify-center rounded-full text-sm font-bold mb-1 ${
                    isToday(d) ? "bg-coral text-white" : "text-navy"
                  }`}>{d}</div>
                  <div className="space-y-0.5">
                    {dayEvs.slice(0, 3).map(ev => (
                      <div key={ev.id}
                        onClick={e => { e.stopPropagation(); setSelected(ev); }}
                        className="text-[10px] font-bold px-1.5 py-0.5 rounded truncate cursor-pointer"
                        style={{ background: STATUS_BG[ev.status] ?? "#F8FAFC", color: STATUS_COLORS[ev.status] ?? "#475569" }}>
                        {ev.startTime} {ev.customer.firstName}
                      </div>
                    ))}
                    {dayEvs.length > 3 && (
                      <div className="text-[10px] font-bold text-gray-400 px-1.5">+{dayEvs.length - 3} more</div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Legend */}
      <div className="flex items-center gap-4 flex-wrap">
        {Object.entries(STATUS_COLORS).map(([k, c]) => (
          <div key={k} className="flex items-center gap-1.5">
            <div className="w-2.5 h-2.5 rounded-full" style={{ background: c }} />
            <span className="text-xs font-semibold text-gray-500">{k.replace(/_/g, " ")}</span>
          </div>
        ))}
      </div>

      {/* Day Modal */}
      {dayEvents && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4 backdrop-blur-sm" onClick={() => setDayEvents(null)}>
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-sm overflow-hidden border border-gray-100" onClick={e => e.stopPropagation()}>
            <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100">
              <h3 className="font-black text-navy">
                {dayEvents.date.toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric" })}
              </h3>
              <button onClick={() => setDayEvents(null)} className="text-gray-400 hover:text-gray-600">
                <X className="w-4 h-4" />
              </button>
            </div>
            <div className="divide-y divide-gray-50 max-h-80 overflow-y-auto">
              {dayEvents.events.map(ev => (
                <Link key={ev.id} href={`/admin/bookings/${ev.id}`} onClick={() => setDayEvents(null)}
                  className="flex items-start gap-3 p-4 hover:bg-gray-50 transition-colors">
                  <div className="w-2 h-2 rounded-full mt-1.5 flex-shrink-0" style={{ background: STATUS_COLORS[ev.status] ?? "#475569" }} />
                  <div>
                    <div className="font-bold text-sm text-navy">#{ev.bookingNumber} · {ev.customer.firstName} {ev.customer.lastName}</div>
                    <div className="text-xs text-gray-400 font-medium mt-0.5">{ev.startTime} · {ev.city} · {ev.package?.name}</div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Event Detail Modal */}
      {selected && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4 backdrop-blur-sm" onClick={() => setSelected(null)}>
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-sm border border-gray-100" onClick={e => e.stopPropagation()}>
            <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100">
              <h3 className="font-black text-navy">#{selected.bookingNumber}</h3>
              <button onClick={() => setSelected(null)} className="text-gray-400 hover:text-gray-600">
                <X className="w-4 h-4" />
              </button>
            </div>
            <div className="p-5 space-y-3">
              <div className="text-sm font-bold text-navy">{selected.customer.firstName} {selected.customer.lastName}</div>
              <div className="text-sm text-gray-500">{new Date(selected.eventDate).toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric" })} at {selected.startTime}</div>
              <div className="text-sm text-gray-500">{selected.city} · {selected.package?.name}</div>
              <span className="inline-flex px-2.5 py-1 rounded-full text-[11px] font-bold" style={{ background: STATUS_BG[selected.status], color: STATUS_COLORS[selected.status] }}>
                {selected.status.replace(/_/g, " ")}
              </span>
              <Link href={`/admin/bookings/${selected.id}`}
                className="block w-full text-center mt-3 py-2.5 bg-coral text-white rounded-xl text-sm font-bold hover:bg-coral-dark transition-colors">
                View Full Details
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
