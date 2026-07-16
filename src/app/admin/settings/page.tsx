"use client";
import { Settings, Save, Bell, Shield, PaintBucket, Loader2, MapPin, DollarSign, Bot, Globe } from "lucide-react";
import { useState, useEffect } from "react";

const TABS = [
  { id: "general", label: "General Information", icon: Settings },
  { id: "contact", label: "Contact & Location", icon: MapPin },
  { id: "business", label: "Business Rules", icon: DollarSign },
  { id: "seo", label: "SEO & Social", icon: Globe },
  { id: "ai", label: "AI Assistant", icon: Bot },
  { id: "appearance", label: "Brand Appearance", icon: PaintBucket },
];

export default function SettingsPage() {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [toast, setToast] = useState(false);
  const [activeTab, setActiveTab] = useState("general");
  
  const [settings, setSettings] = useState<Record<string, string>>({});

  useEffect(() => {
    fetch("/api/admin/settings")
      .then(r => r.json())
      .then(data => {
        setSettings(data);
        setLoading(false);
      })
      .catch(e => {
        console.error(e);
        setLoading(false);
      });
  }, []);

  const handleSave = async () => {
    setSaving(true);
    try {
      const res = await fetch("/api/admin/settings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(settings),
      });
      if (!res.ok) throw new Error("Failed to save");
      
      setToast(true);
      setTimeout(() => setToast(false), 3000);
    } catch (err) {
      console.error(err);
      alert("Failed to save settings");
    } finally {
      setSaving(false);
    }
  };

  const handleChange = (key: string, value: string) => {
    setSettings(prev => ({ ...prev, [key]: value }));
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <Loader2 className="w-8 h-8 animate-spin text-coral" />
      </div>
    );
  }

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
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
        <button onClick={handleSave} disabled={saving}
          className="flex items-center gap-2 px-6 py-2.5 bg-coral text-white rounded-xl text-sm font-bold hover:bg-coral-dark transition-colors shadow-sm disabled:opacity-60">
          {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
          Save Changes
        </button>
      </div>

      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden flex flex-col md:flex-row min-h-[600px]">
        {/* Tabs Sidebar */}
        <div className="w-full md:w-64 border-b md:border-b-0 md:border-r border-gray-100 p-4 space-y-1 bg-gray-50/50">
          {TABS.map(tab => (
            <button 
              key={tab.id} 
              onClick={() => setActiveTab(tab.id)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold transition-colors ${activeTab === tab.id ? 'bg-navy text-white shadow-md' : 'text-gray-500 hover:bg-gray-100'}`}
            >
              <tab.icon className="w-4 h-4" /> {tab.label}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        <div className="flex-1 p-6 md:p-8">
          
          {activeTab === "general" && (
            <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-300">
              <h2 className="text-lg font-black text-navy border-b border-gray-100 pb-4">General Information</h2>
              <div className="grid gap-6 max-w-2xl">
                <div>
                  <label className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-2 block">Company Name</label>
                  <input type="text" value={settings.companyName || ""} onChange={e => handleChange("companyName", e.target.value)} className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm outline-none focus:border-coral transition-colors" />
                </div>
                <div>
                  <label className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-2 block">Business Hours</label>
                  <input type="text" value={settings.businessHours || ""} onChange={e => handleChange("businessHours", e.target.value)} className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm outline-none focus:border-coral transition-colors" placeholder="e.g. Mon-Sun 10AM - 8PM" />
                </div>
              </div>
            </div>
          )}

          {activeTab === "contact" && (
            <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-300">
              <h2 className="text-lg font-black text-navy border-b border-gray-100 pb-4">Contact & Location</h2>
              <div className="grid gap-6 max-w-2xl">
                <div>
                  <label className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-2 block">Company Email</label>
                  <input type="email" value={settings.companyEmail || ""} onChange={e => handleChange("companyEmail", e.target.value)} className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm outline-none focus:border-coral transition-colors" />
                </div>
                <div>
                  <label className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-2 block">Phone Number</label>
                  <input type="text" value={settings.companyPhone || ""} onChange={e => handleChange("companyPhone", e.target.value)} className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm outline-none focus:border-coral transition-colors" />
                </div>
                <div>
                  <label className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-2 block">Physical Address</label>
                  <textarea rows={3} value={settings.companyAddress || ""} onChange={e => handleChange("companyAddress", e.target.value)} className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm outline-none focus:border-coral transition-colors resize-none" />
                </div>
              </div>
            </div>
          )}

          {activeTab === "business" && (
            <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-300">
              <h2 className="text-lg font-black text-navy border-b border-gray-100 pb-4">Business Rules & Pricing</h2>
              <div className="grid gap-6 max-w-2xl">
                <div>
                  <label className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-2 block">Base Service Radius (Miles)</label>
                  <input type="number" value={settings.serviceRadius || ""} onChange={e => handleChange("serviceRadius", e.target.value)} className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm outline-none focus:border-coral transition-colors" />
                </div>
                <div>
                  <label className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-2 block">Travel Fee Per Extra Mile ($)</label>
                  <input type="number" step="0.01" value={settings.travelFeePerMile || ""} onChange={e => handleChange("travelFeePerMile", e.target.value)} className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm outline-none focus:border-coral transition-colors" />
                </div>
                <div>
                  <label className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-2 block">Tax Rate (%)</label>
                  <input type="number" step="0.01" value={settings.taxRate || ""} onChange={e => handleChange("taxRate", e.target.value)} className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm outline-none focus:border-coral transition-colors" />
                </div>
                <div>
                  <label className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-2 block">Auto-Approve Bookings</label>
                  <select value={settings.bookingAutoApprove || "false"} onChange={e => handleChange("bookingAutoApprove", e.target.value)} className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm outline-none focus:border-coral transition-colors bg-white">
                    <option value="false">Require Manual Approval (Pending Review)</option>
                    <option value="true">Auto-Approve New Bookings</option>
                  </select>
                </div>
              </div>
            </div>
          )}

          {activeTab === "seo" && (
            <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-300">
              <h2 className="text-lg font-black text-navy border-b border-gray-100 pb-4">SEO & Social Media</h2>
              <div className="grid gap-6 max-w-2xl">
                <div>
                  <label className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-2 block">Default SEO Title</label>
                  <input type="text" value={settings.seoTitle || ""} onChange={e => handleChange("seoTitle", e.target.value)} className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm outline-none focus:border-coral transition-colors" />
                </div>
                <div>
                  <label className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-2 block">Default SEO Description</label>
                  <textarea rows={3} value={settings.seoDescription || ""} onChange={e => handleChange("seoDescription", e.target.value)} className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm outline-none focus:border-coral transition-colors resize-none" />
                </div>
                <div>
                  <label className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-2 block">Facebook URL</label>
                  <input type="url" value={settings.facebookUrl || ""} onChange={e => handleChange("facebookUrl", e.target.value)} className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm outline-none focus:border-coral transition-colors" placeholder="https://facebook.com/..." />
                </div>
                <div>
                  <label className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-2 block">Instagram URL</label>
                  <input type="url" value={settings.instagramUrl || ""} onChange={e => handleChange("instagramUrl", e.target.value)} className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm outline-none focus:border-coral transition-colors" placeholder="https://instagram.com/..." />
                </div>
              </div>
            </div>
          )}

          {activeTab === "ai" && (
            <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-300">
              <h2 className="text-lg font-black text-navy border-b border-gray-100 pb-4">AI Assistant Config</h2>
              <div className="grid gap-6 max-w-2xl">
                <div>
                  <label className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-2 block">Assistant Name</label>
                  <input type="text" value={settings.aiAssistantName || ""} onChange={e => handleChange("aiAssistantName", e.target.value)} className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm outline-none focus:border-coral transition-colors" />
                </div>
                <div>
                  <label className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-2 block">System Prompt</label>
                  <textarea rows={8} value={settings.aiAssistantSystemPrompt || ""} onChange={e => handleChange("aiAssistantSystemPrompt", e.target.value)} className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm outline-none focus:border-coral transition-colors resize-none" placeholder="Instructions for the AI assistant..." />
                </div>
              </div>
            </div>
          )}

          {activeTab === "appearance" && (
            <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-300">
              <h2 className="text-lg font-black text-navy border-b border-gray-100 pb-4">Brand Appearance</h2>
              <div className="grid gap-6 max-w-2xl">
                <div className="p-4 rounded-xl border border-blue-100 bg-blue-50/50">
                  <p className="text-sm text-blue-800 font-medium flex items-center gap-2">
                    <PaintBucket className="w-4 h-4" />
                    Media Library integration for Logo and Favicon uploads will be available in Phase 3.
                  </p>
                </div>
                <div>
                  <label className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-2 block">Logo URL</label>
                  <input type="text" value={settings.logoUrl || ""} onChange={e => handleChange("logoUrl", e.target.value)} className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm outline-none focus:border-coral transition-colors" />
                </div>
                <div>
                  <label className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-2 block">Favicon URL</label>
                  <input type="text" value={settings.faviconUrl || ""} onChange={e => handleChange("faviconUrl", e.target.value)} className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm outline-none focus:border-coral transition-colors" />
                </div>
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}
