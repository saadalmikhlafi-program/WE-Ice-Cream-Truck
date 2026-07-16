"use client";
import { useState, useEffect, useRef, useCallback } from "react";
import {
  Upload, Image as ImageIcon, Trash2, Copy, CheckCircle2,
  AlertCircle, Loader2, RefreshCw, Box, ExternalLink
} from "lucide-react";

type MediaItem = {
  id: string; url: string; key: string; filename: string;
  mimeType: string; size: number; createdAt: string;
  uploadedBy?: { name: string | null } | null;
};

export default function MediaLibraryPage() {
  const [media, setMedia] = useState<MediaItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [toast, setToast] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);

  const loadMedia = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/admin/upload");
      const json = await res.json();
      if (json.success) {
        setMedia(json.data);
      }
    } catch {} finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { loadMedia(); }, [loadMedia]);

  const showToast = (msg: string) => { setToast(msg); setTimeout(() => setToast(""), 3000); };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) return;
    const file = e.target.files[0];
    
    // Size check
    if (file.size > 5 * 1024 * 1024) {
      alert("File size exceeds 5MB limit.");
      return;
    }

    setUploading(true);
    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await fetch("/api/admin/upload", { method: "POST", body: formData });
      const json = await res.json();
      if (json.success && json.data) {
        setMedia(prev => [json.data, ...prev]);
        showToast("File uploaded successfully.");
      } else {
        alert(json.error || "Upload failed");
      }
    } catch (err: any) {
      alert(err.message || "Upload failed");
    } finally {
      setUploading(false);
      if (fileInputRef.current) fileInputRef.current.value = "";
    }
  };

  const handleDelete = async (item: MediaItem) => {
    if (!confirm(`Delete ${item.filename}? This might break pages where this image is used.`)) return;
    
    try {
      const res = await fetch(`/api/admin/upload/${item.id}`, { method: "DELETE" });
      const json = await res.json();
      if (json.success) {
        setMedia(prev => prev.filter(m => m.id !== item.id));
        showToast("File deleted.");
      } else {
        alert(json.error || "Delete failed");
      }
    } catch (err: any) {
      alert(err.message || "Delete failed");
    }
  };

  const handleCopyUrl = (url: string) => {
    navigator.clipboard.writeText(url);
    showToast("URL copied to clipboard");
  };

  function formatBytes(bytes: number, decimals = 2) {
    if (!+bytes) return '0 Bytes';
    const k = 1024;
    const dm = decimals < 0 ? 0 : decimals;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return `${parseFloat((bytes / Math.pow(k, i)).toFixed(dm))} ${sizes[i]}`;
  }

  return (
    <div className="space-y-6">
      {toast && (
        <div className="fixed top-6 right-6 z-[200] px-5 py-3 rounded-2xl shadow-xl bg-navy text-white text-sm font-bold flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-400" /> {toast}
        </div>
      )}

      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-navy tracking-tight">Media Library</h1>
          <p className="text-sm font-medium text-gray-400 mt-0.5">Manage uploaded images for packages, blog, and galleries</p>
        </div>
        <div className="flex items-center gap-3">
          <button onClick={loadMedia} className="p-2.5 bg-white border border-gray-200 rounded-xl text-gray-500 hover:border-gray-300 shadow-sm transition-all">
            <RefreshCw className={`w-4 h-4 ${loading ? "animate-spin" : ""}`} />
          </button>
          
          <input type="file" accept="image/jpeg,image/png,image/webp" className="hidden" ref={fileInputRef} onChange={handleFileUpload} />
          <button onClick={() => fileInputRef.current?.click()} disabled={uploading}
            className="flex items-center gap-2 px-4 py-2.5 bg-coral text-white rounded-xl text-sm font-bold hover:bg-coral-dark shadow-sm transition-colors disabled:opacity-60">
            {uploading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Upload className="w-4 h-4" />}
            Upload Image
          </button>
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden min-h-[400px]">
        {loading ? (
          <div className="flex items-center justify-center h-64"><Loader2 className="w-8 h-8 animate-spin text-coral" /></div>
        ) : media.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-64 text-center">
            <ImageIcon className="w-12 h-12 text-gray-200 mb-3" />
            <p className="font-bold text-gray-400">No media uploaded yet</p>
          </div>
        ) : (
          <div className="p-6 grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6">
            {media.map(m => (
              <div key={m.id} className="group relative bg-gray-50 rounded-2xl border border-gray-100 overflow-hidden hover:shadow-md transition-all">
                <div className="aspect-square bg-gray-100 relative">
                  <img src={m.url} alt={m.filename} className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-navy/60 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center gap-3">
                    <button onClick={() => handleCopyUrl(m.url)} className="p-2 bg-white text-navy rounded-xl hover:bg-gray-100 transition-colors tooltip" title="Copy URL">
                      <Copy className="w-4 h-4" />
                    </button>
                    <a href={m.url} target="_blank" rel="noreferrer" className="p-2 bg-white text-navy rounded-xl hover:bg-gray-100 transition-colors tooltip" title="Open in new tab">
                      <ExternalLink className="w-4 h-4" />
                    </a>
                    <button onClick={() => handleDelete(m)} className="p-2 bg-red-50 text-red-600 rounded-xl hover:bg-red-100 transition-colors tooltip" title="Delete">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
                <div className="p-3">
                  <div className="text-xs font-bold text-navy truncate" title={m.filename}>{m.filename}</div>
                  <div className="flex items-center justify-between mt-1">
                    <div className="text-[10px] font-medium text-gray-400">{formatBytes(m.size)}</div>
                    <div className="text-[10px] font-bold text-coral bg-coral/10 px-1.5 py-0.5 rounded">{m.mimeType.split("/")[1]?.toUpperCase()}</div>
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
