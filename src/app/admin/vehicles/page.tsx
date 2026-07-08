"use client";
import { useState, useEffect } from "react";
import { Truck, Wrench, CheckCircle2, Loader2, Plus, Edit2, ShieldAlert } from "lucide-react";

export default function VehiclesPage() {
  const [vehicles, setVehicles] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const res = await fetch("/api/admin/vehicles");
        const json = await res.json();
        setVehicles(json.data || json || []);
      } catch {} finally { setLoading(false); }
    })();
  }, []);

  const STATUS_CONFIG: Record<string, { label: string; color: string; bg: string; icon: any }> = {
    AVAILABLE:   { label: "Available", color: "#059669", bg: "#ECFDF5", icon: CheckCircle2 },
    ON_JOB:      { label: "On Job",    color: "#2563EB", bg: "#EFF6FF", icon: Truck },
    MAINTENANCE: { label: "Maintenance",color: "#DC2626", bg: "#FEF2F2", icon: Wrench },
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-black text-navy tracking-tight">Fleet Management</h1>
          <p className="text-sm font-medium text-gray-400 mt-0.5">Manage vehicles, status, and maintenance</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 bg-coral text-white rounded-xl text-sm font-bold hover:bg-coral-dark transition-colors shadow-sm">
          <Plus className="w-4 h-4" /> Add Vehicle
        </button>
      </div>

      {loading ? (
        <div className="flex items-center justify-center py-20"><Loader2 className="w-8 h-8 animate-spin text-coral" /></div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {vehicles.map(v => {
            const sc = STATUS_CONFIG[v.status] ?? STATUS_CONFIG.AVAILABLE;
            const Icon = sc.icon;
            return (
              <div key={v.id} className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden flex flex-col">
                <div className="h-32 bg-gray-50 flex items-center justify-center border-b border-gray-100 relative">
                  <div className="text-6xl">{v.code.startsWith("VAN") ? "🚐" : "🚌"}</div>
                  <div className="absolute top-3 right-3 px-2 py-1 rounded-lg text-[10px] font-black uppercase tracking-wider border flex items-center gap-1"
                    style={{ background: sc.bg, color: sc.color, borderColor: sc.color }}>
                    <Icon className="w-3 h-3" /> {sc.label}
                  </div>
                </div>
                <div className="p-5 flex-1 flex flex-col">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="font-black text-lg text-navy">{v.name}</h3>
                      <p className="text-xs font-bold text-gray-400">{v.code} · {v.type}</p>
                    </div>
                  </div>
                  <div className="space-y-2 mt-auto">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-500 font-medium">License Plate</span>
                      <span className="font-bold text-navy">{v.licensePlate || "N/A"}</span>
                    </div>
                    {v.lastMaintenance && (
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-500 font-medium">Last Maintenance</span>
                        <span className="font-bold text-navy">{new Date(v.lastMaintenance).toLocaleDateString()}</span>
                      </div>
                    )}
                  </div>
                  <div className="grid grid-cols-2 gap-2 mt-5">
                    <button className="flex items-center justify-center gap-1.5 py-2 rounded-xl bg-gray-50 text-gray-600 text-xs font-bold hover:bg-gray-100 transition-colors">
                      <Edit2 className="w-3.5 h-3.5" /> Edit
                    </button>
                    <button className="flex items-center justify-center gap-1.5 py-2 rounded-xl bg-red-50 text-red-600 text-xs font-bold hover:bg-red-100 transition-colors">
                      <ShieldAlert className="w-3.5 h-3.5" /> Maintenance
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
