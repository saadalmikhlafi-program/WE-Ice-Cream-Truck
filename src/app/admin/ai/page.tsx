"use client";
import { useState, useEffect, useRef } from "react";
import { Bot, RefreshCw, Loader2, FileText, Activity, Server, Zap, CheckCircle2, Shield } from "lucide-react";
import { useSession } from "next-auth/react";

export default function AiAdminPage() {
  const [logs, setLogs] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const { data: session } = useSession();

  useEffect(() => {
    // Simulated load for AI logs as there is no DB endpoint for this yet
    setTimeout(() => {
      setLogs([
        { id: 1, type: "Customer Support", status: "Success", duration: "1.2s", query: "Do you have dairy-free options?", response: "Yes, we offer sorbets and dairy-free options...", time: new Date().toISOString() },
        { id: 2, type: "Booking Assistant", status: "Success", duration: "2.1s", query: "I want to book a truck for next Saturday", response: "Great! Let's get started with your booking...", time: new Date(Date.now() - 3600000).toISOString() },
        { id: 3, type: "Admin Operations", status: "Success", duration: "0.8s", query: "Summarize this week's revenue", response: "This week's total revenue is $4,250...", time: new Date(Date.now() - 7200000).toISOString() },
      ]);
      setLoading(false);
    }, 1000);
  }, []);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-black text-navy tracking-tight">AI Concierge</h1>
          <p className="text-sm font-medium text-gray-400 mt-0.5">Manage and monitor AI assistant performance</p>
        </div>
        <button onClick={() => window.location.reload()} className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-xl text-sm font-bold text-gray-600 hover:border-gray-300 transition-all shadow-sm">
          <RefreshCw className={`w-4 h-4 ${loading ? "animate-spin" : ""}`} /> Refresh
        </button>
      </div>

      {/* System Status */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {[
          { label: "System Status", value: "Online", icon: Server, color: "text-emerald-500", bg: "bg-emerald-50" },
          { label: "Total Queries (24h)", value: "342", icon: Activity, color: "text-blue-500", bg: "bg-blue-50" },
          { label: "Avg Response Time", value: "1.4s", icon: Zap, color: "text-amber-500", bg: "bg-amber-50" },
          { label: "Accuracy Score", value: "99.2%", icon: Shield, color: "text-purple-500", bg: "bg-purple-50" },
        ].map((s, i) => (
          <div key={i} className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 flex items-center gap-4">
            <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${s.bg}`}>
              <s.icon className={`w-6 h-6 ${s.color}`} />
            </div>
            <div>
              <div className="text-sm font-bold text-gray-500">{s.label}</div>
              <div className="text-xl font-black text-navy">{s.value}</div>
            </div>
          </div>
        ))}
      </div>

      {/* Recent Activity Log */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-100 flex items-center gap-2">
          <Bot className="w-5 h-5 text-coral" />
          <h2 className="font-black text-navy">Recent AI Interactions</h2>
        </div>
        {loading ? (
          <div className="flex items-center justify-center py-20"><Loader2 className="w-7 h-7 animate-spin text-coral" /></div>
        ) : (
          <div className="divide-y divide-gray-50">
            {logs.map(log => (
              <div key={log.id} className="p-5 hover:bg-gray-50 transition-colors">
                <div className="flex justify-between items-start mb-2">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-coral bg-coral/10 px-2 py-0.5 rounded-full">{log.type}</span>
                    <span className="text-[11px] text-gray-400 font-medium">{new Date(log.time).toLocaleTimeString()}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-[11px] font-bold text-gray-400">{log.duration}</span>
                    <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                  </div>
                </div>
                <div className="space-y-2 mt-3">
                  <div className="bg-gray-50 rounded-xl p-3 border border-gray-100">
                    <span className="text-[10px] font-black uppercase text-gray-400 block mb-1">User Query</span>
                    <span className="text-sm font-medium text-navy">{log.query}</span>
                  </div>
                  <div className="bg-coral/5 rounded-xl p-3 border border-coral/10">
                    <span className="text-[10px] font-black uppercase text-coral block mb-1">AI Response</span>
                    <span className="text-sm font-medium text-navy">{log.response}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
