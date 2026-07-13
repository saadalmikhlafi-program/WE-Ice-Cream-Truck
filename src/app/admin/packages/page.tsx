"use client";
import { useState, useEffect } from "react";
import { Package, Plus, Loader2, DollarSign, Users, Clock, Edit2 } from "lucide-react";

export default function PackagesPage() {
  const [packages, setPackages] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const res = await fetch("/api/admin/packages");
        const json = await res.json();
        setPackages(Array.isArray(json.data) ? json.data : Array.isArray(json) ? json : []);
      } catch {} finally { setLoading(false); }
    })();
  }, []);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-black text-navy tracking-tight">Packages</h1>
          <p className="text-sm font-medium text-gray-400 mt-0.5">Manage event packages and pricing tiers</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 bg-coral text-white rounded-xl text-sm font-bold hover:bg-coral-dark transition-colors shadow-sm">
          <Plus className="w-4 h-4" /> Add Package
        </button>
      </div>

      {loading ? (
        <div className="flex items-center justify-center py-20"><Loader2 className="w-8 h-8 animate-spin text-coral" /></div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {packages.map(p => (
            <div key={p.id} className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 relative group overflow-hidden flex flex-col">
              <div className="absolute top-0 right-0 p-4">
                <span className={`px-2.5 py-1 rounded-lg text-[10px] font-black uppercase tracking-wider ${p.isActive ? 'bg-emerald-50 text-emerald-600 border border-emerald-200' : 'bg-gray-100 text-gray-500'}`}>
                  {p.isActive ? 'Active' : 'Inactive'}
                </span>
              </div>
              <div className="w-12 h-12 rounded-xl bg-coral/10 flex items-center justify-center mb-4">
                <Package className="w-6 h-6 text-coral" />
              </div>
              <h3 className="font-black text-lg text-navy mb-1">{p.name}</h3>
              <p className="text-xs text-gray-500 font-medium leading-relaxed mb-6 flex-1">{p.description}</p>
              
              <div className="space-y-3 mb-6 bg-gray-50 rounded-xl p-4 border border-gray-100">
                <div className="flex items-center justify-between text-sm">
                  <span className="flex items-center gap-1.5 text-gray-500"><DollarSign className="w-4 h-4"/> Base Price</span>
                  <span className="font-black text-navy">${p.price}</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="flex items-center gap-1.5 text-gray-500"><Users className="w-4 h-4"/> Base Guests</span>
                  <span className="font-bold text-navy">{p.servings}</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="flex items-center gap-1.5 text-gray-500"><Clock className="w-4 h-4"/> Duration</span>
                  <span className="font-bold text-navy">{p.durationMins} min</span>
                </div>
              </div>

              <button className="w-full flex items-center justify-center gap-2 py-2.5 bg-gray-50 text-gray-600 rounded-xl text-sm font-bold hover:bg-coral hover:text-white transition-colors border border-gray-200 hover:border-coral">
                <Edit2 className="w-4 h-4" /> Edit Package
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
