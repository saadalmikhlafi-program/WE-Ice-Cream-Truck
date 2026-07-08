"use client";
import { Settings, Save, Bell, Shield, PaintBucket, Loader2 } from "lucide-react";
import { useState } from "react";

export default function SettingsPage() {
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState(false);

  const handleSave = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setToast(true);
      setTimeout(() => setToast(false), 3000);
    }, 800);
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      {toast && (
        <div className="fixed top-6 right-6 z-[200] px-5 py-3 rounded-2xl shadow-xl bg-emerald-500 text-white text-sm font-bold flex items-center gap-2">
          Settings saved successfully!
        </div>
      )}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-black text-navy tracking-tight">System Settings</h1>
          <p className="text-sm font-medium text-gray-400 mt-0.5">Manage global application configurations</p>
        </div>
        <button onClick={handleSave} disabled={loading}
          className="flex items-center gap-2 px-6 py-2.5 bg-coral text-white rounded-xl text-sm font-bold hover:bg-coral-dark transition-colors shadow-sm disabled:opacity-60">
          {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
          Save Changes
        </button>
      </div>

      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="flex">
          {/* Tabs Sidebar */}
          <div className="w-64 border-r border-gray-100 p-4 space-y-1">
            {[
              { id: "general", label: "General Settings", icon: Settings },
              { id: "notifications", label: "Notifications", icon: Bell },
              { id: "security", label: "Security & Access", icon: Shield },
              { id: "appearance", label: "Brand Appearance", icon: PaintBucket },
            ].map(tab => (
              <button key={tab.id} className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold transition-colors ${tab.id === 'general' ? 'bg-navy text-white' : 'text-gray-500 hover:bg-gray-50'}`}>
                <tab.icon className="w-4 h-4" /> {tab.label}
              </button>
            ))}
          </div>

          {/* Tab Content (Static mock for now) */}
          <div className="flex-1 p-8">
            <h2 className="text-lg font-black text-navy mb-6">General Configuration</h2>
            
            <div className="space-y-6">
              <div>
                <label className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-2 block">Company Name</label>
                <input type="text" defaultValue="WE Ice Cream Truck" className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm outline-none focus:border-coral transition-colors" />
              </div>
              
              <div>
                <label className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-2 block">Support Email</label>
                <input type="email" defaultValue="hello@weicecreamtruck.com" className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm outline-none focus:border-coral transition-colors" />
              </div>

              <div>
                <label className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-2 block">Booking Auto-Approve</label>
                <div className="flex items-center gap-3">
                  <div className="w-12 h-6 bg-gray-200 rounded-full relative cursor-pointer">
                    <div className="w-5 h-5 bg-white rounded-full absolute top-0.5 left-0.5 shadow-sm"></div>
                  </div>
                  <span className="text-sm font-medium text-gray-500">Require manual approval for all new bookings</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
