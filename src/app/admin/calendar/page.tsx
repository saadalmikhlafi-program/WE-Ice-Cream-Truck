"use client";

import { useEffect, useState, useCallback } from "react";
import { Calendar as CalendarIcon, MapPin, Phone, Mail, User, X, ChevronLeft, ChevronRight } from "lucide-react";
import Link from "next/link";

interface CalEvent {
  id: string;
  title: string;
  start: string;
  end?: string;
  backgroundColor?: string;
  extendedProps?: {
    status?: string;
    address?: string;
    customerName?: string;
    phone?: string;
    email?: string;
  };
}

const DAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const MONTHS = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

export default function AdminCalendarPage() {
  const [today] = useState(new Date());
  const [current, setCurrent] = useState(new Date(today.getFullYear(), today.getMonth(), 1));
  const [events, setEvents] = useState<CalEvent[]>([]);
  const [selectedEvent, setSelectedEvent] = useState<CalEvent | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchEvents = useCallback(async () => {
    setLoading(true);
    try {
      const start = new Date(current.getFullYear(), current.getMonth(), 1).toISOString();
      const end = new Date(current.getFullYear(), current.getMonth() + 1, 0).toISOString();
      const res = await fetch(`/api/admin/calendar?start=${encodeURIComponent(start)}&end=${encodeURIComponent(end)}&t=${Date.now()}`, { cache: "no-store" });
      const json = await res.json();
      if (res.ok && json.success) setEvents(json.data || []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, [current]);

  useEffect(() => { fetchEvents(); }, [fetchEvents]);

  const prevMonth = () => setCurrent(new Date(current.getFullYear(), current.getMonth() - 1, 1));
  const nextMonth = () => setCurrent(new Date(current.getFullYear(), current.getMonth() + 1, 1));

  const daysInMonth = new Date(current.getFullYear(), current.getMonth() + 1, 0).getDate();
  const firstDayOfWeek = new Date(current.getFullYear(), current.getMonth(), 1).getDay();

  const getEventsForDay = (day: number) => {
    return events.filter(ev => {
      const evDate = new Date(ev.start);
      return evDate.getFullYear() === current.getFullYear() &&
             evDate.getMonth() === current.getMonth() &&
             evDate.getDate() === day;
    });
  };

  return (
    <div className="p-4 sm:p-8 space-y-8 bg-slate-50 min-h-screen">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-black text-slate-900 tracking-tight flex items-center gap-3">
            <CalendarIcon className="w-8 h-8 text-coral" />
            Business Calendar
          </h1>
          <p className="text-slate-500 mt-2 font-medium">View all confirmed and pending events.</p>
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
        {/* Calendar Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100">
          <button onClick={prevMonth} className="p-2 hover:bg-slate-100 rounded-lg transition-colors">
            <ChevronLeft className="w-5 h-5 text-slate-600" />
          </button>
          <h2 className="text-xl font-black text-slate-900">
            {MONTHS[current.getMonth()]} {current.getFullYear()}
          </h2>
          <button onClick={nextMonth} className="p-2 hover:bg-slate-100 rounded-lg transition-colors">
            <ChevronRight className="w-5 h-5 text-slate-600" />
          </button>
        </div>

        {/* Day Headers */}
        <div className="grid grid-cols-7 border-b border-slate-100">
          {DAYS.map(d => (
            <div key={d} className="py-3 text-center text-xs font-black text-slate-400 uppercase tracking-wider">
              {d}
            </div>
          ))}
        </div>

        {/* Calendar Grid */}
        {loading ? (
          <div className="py-20 flex items-center justify-center">
            <div className="w-8 h-8 border-4 border-coral border-t-transparent rounded-full animate-spin" />
          </div>
        ) : (
          <div className="grid grid-cols-7">
            {/* Empty cells before first day */}
            {Array.from({ length: firstDayOfWeek }).map((_, i) => (
              <div key={`empty-${i}`} className="min-h-[80px] border-b border-r border-slate-100 bg-slate-50/50" />
            ))}

            {/* Day cells */}
            {Array.from({ length: daysInMonth }).map((_, i) => {
              const day = i + 1;
              const dayEvents = getEventsForDay(day);
              const isToday = today.getFullYear() === current.getFullYear() &&
                              today.getMonth() === current.getMonth() &&
                              today.getDate() === day;

              return (
                <div key={day} className={`min-h-[80px] border-b border-r border-slate-100 p-1.5 ${isToday ? "bg-coral/5" : ""}`}>
                  <div className={`w-7 h-7 flex items-center justify-center rounded-full text-sm font-bold mb-1 ${isToday ? "bg-coral text-white" : "text-slate-700"}`}>
                    {day}
                  </div>
                  <div className="space-y-0.5">
                    {dayEvents.slice(0, 2).map(ev => (
                      <button
                        key={ev.id}
                        onClick={() => setSelectedEvent(ev)}
                        className="w-full text-left px-1.5 py-0.5 rounded text-[10px] font-bold truncate text-white"
                        style={{ backgroundColor: ev.backgroundColor || "#FF6B6B" }}
                      >
                        {ev.title}
                      </button>
                    ))}
                    {dayEvents.length > 2 && (
                      <p className="text-[10px] text-slate-500 font-bold pl-1">+{dayEvents.length - 2} more</p>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Event Details Modal */}
      {selectedEvent && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm">
          <div className="bg-white rounded-2xl shadow-xl max-w-md w-full overflow-hidden">
            <div className="p-6 border-b border-slate-100 flex justify-between items-start">
              <div>
                <h3 className="text-xl font-black text-slate-900 leading-tight">{selectedEvent.title}</h3>
                <span className="inline-block mt-2 px-2.5 py-1 bg-slate-100 text-slate-700 text-xs font-bold rounded-md">
                  {selectedEvent.extendedProps?.status}
                </span>
              </div>
              <button onClick={() => setSelectedEvent(null)} className="text-slate-400 hover:text-slate-600 hover:bg-slate-100 p-1.5 rounded-full transition-colors">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 space-y-4">
              {[
                { icon: CalendarIcon, label: "Event Time", value: new Date(selectedEvent.start).toLocaleString([], { dateStyle: "medium", timeStyle: "short" }) },
                { icon: MapPin, label: "Location", value: selectedEvent.extendedProps?.address },
                { icon: User, label: "Customer", value: selectedEvent.extendedProps?.customerName },
                { icon: Phone, label: "Phone", value: selectedEvent.extendedProps?.phone },
                { icon: Mail, label: "Email", value: selectedEvent.extendedProps?.email },
              ].map(({ icon: Icon, label, value }) => value && (
                <div key={label} className="flex items-start gap-3">
                  <Icon className="w-5 h-5 text-coral shrink-0 mt-0.5" />
                  <div>
                    <p className="text-sm font-bold text-slate-900">{label}</p>
                    <p className="text-sm text-slate-600">{value}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="p-6 border-t border-slate-100 bg-slate-50 flex justify-end gap-3">
              <button onClick={() => setSelectedEvent(null)} className="px-4 py-2.5 text-sm font-bold text-slate-600 hover:bg-slate-200 bg-slate-100 rounded-xl transition-colors">
                Close
              </button>
              <Link href={`/admin/bookings/${selectedEvent.id}`} className="px-4 py-2.5 text-sm font-bold text-white bg-coral hover:bg-coral/90 rounded-xl transition-colors shadow-sm">
                View Full Booking
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
