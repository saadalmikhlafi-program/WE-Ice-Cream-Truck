"use client";
import { useState, useEffect, useCallback } from "react";
import {
  FileText, Plus, Search, RefreshCw, AlertCircle, Edit2, Trash2, Tag, 
  Folder, CheckCircle2, ChevronDown, Check, Loader2, X, Image as ImageIcon, Save
} from "lucide-react";

type Category = { id: string; name: string; slug: string; _count: { posts: number } };
type Post = {
  id: string; title: string; slug: string; status: "DRAFT" | "PUBLISHED";
  createdAt: string; publishedAt: string | null;
  category: { id: string; name: string } | null;
  author: { id: string; name: string };
};

// ─── POST MODAL ─────────────────────────────────────────────────────────────
function PostModal({ post, categories, onClose, onSaved }: { post?: Post, categories: Category[], onClose: () => void, onSaved: () => void }) {
  const isEdit = !!post;
  const [form, setForm] = useState({
    title: "", content: "", excerpt: "", featuredImage: "",
    categoryId: "", status: "DRAFT" as "DRAFT" | "PUBLISHED"
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (isEdit) {
      setLoading(true);
      fetch(`/api/admin/blog/${post.id}`).then(r => r.json()).then(j => {
        if (j.success) {
          const d = j.data;
          setForm({
            title: d.title || "", content: d.content || "", excerpt: d.excerpt || "",
            featuredImage: d.featuredImage || "", categoryId: d.categoryId || "", status: d.status
          });
        }
        setLoading(false);
      });
    }
  }, [isEdit, post]);

  const save = async () => {
    if (!form.title.trim() || !form.content.trim()) { setError("Title and content are required."); return; }
    setLoading(true); setError("");
    try {
      const url = isEdit ? `/api/admin/blog/${post.id}` : "/api/admin/blog";
      const method = isEdit ? "PATCH" : "POST";
      const res = await fetch(url, { method, headers: { "Content-Type": "application/json" }, body: JSON.stringify(form) });
      const json = await res.json();
      if (!res.ok || !json.success) throw new Error(json.error || "Failed to save");
      onSaved();
    } catch (e: any) {
      setError(e.message);
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm flex items-center justify-center p-4 py-10" onClick={onClose}>
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-4xl max-h-full flex flex-col" onClick={e => e.stopPropagation()}>
        <div className="flex items-center justify-between p-6 border-b border-gray-100 flex-shrink-0">
          <h2 className="text-xl font-black text-navy">{isEdit ? "Edit Post" : "Write New Post"}</h2>
          <button onClick={onClose} className="p-2 rounded-xl hover:bg-gray-100"><X className="w-5 h-5 text-gray-400" /></button>
        </div>
        
        <div className="p-6 overflow-y-auto flex-1 space-y-6">
          {error && <div className="p-3 bg-red-50 border border-red-100 text-red-700 text-sm font-medium rounded-xl">{error}</div>}
          
          <div className="grid grid-cols-3 gap-6">
            <div className="col-span-2 space-y-6">
              <div>
                <label className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-2 block">Post Title</label>
                <input value={form.title} onChange={e => setForm(p => ({ ...p, title: e.target.value }))}
                  placeholder="e.g. 5 Reasons to Hire an Ice Cream Truck..."
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl text-lg font-bold outline-none focus:border-coral" />
              </div>
              <div>
                <label className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-2 block">Content (Markdown)</label>
                <textarea value={form.content} onChange={e => setForm(p => ({ ...p, content: e.target.value }))}
                  rows={15}
                  placeholder="Write your post content here using Markdown..."
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm font-mono outline-none focus:border-coral resize-y" />
              </div>
            </div>

            <div className="col-span-1 space-y-6">
              <div>
                <label className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-2 block">Publish Status</label>
                <select value={form.status} onChange={e => setForm(p => ({ ...p, status: e.target.value as any }))}
                  className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm outline-none focus:border-coral bg-white font-bold">
                  <option value="DRAFT">Draft</option>
                  <option value="PUBLISHED">Published</option>
                </select>
              </div>
              <div>
                <label className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-2 block">Category</label>
                <select value={form.categoryId} onChange={e => setForm(p => ({ ...p, categoryId: e.target.value }))}
                  className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm outline-none focus:border-coral bg-white">
                  <option value="">— Uncategorized —</option>
                  {categories.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
                </select>
              </div>
              <div>
                <label className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-2 block">Featured Image URL</label>
                <input value={form.featuredImage} onChange={e => setForm(p => ({ ...p, featuredImage: e.target.value }))}
                  placeholder="https://..."
                  className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm outline-none focus:border-coral" />
                {form.featuredImage && (
                  <div className="mt-2 rounded-xl overflow-hidden border border-gray-100 aspect-video bg-gray-50 relative">
                    <img src={form.featuredImage} alt="Preview" className="w-full h-full object-cover" onError={(e) => (e.currentTarget.style.display='none')} />
                  </div>
                )}
              </div>
              <div>
                <label className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-2 block">Excerpt (SEO)</label>
                <textarea value={form.excerpt} onChange={e => setForm(p => ({ ...p, excerpt: e.target.value }))}
                  rows={4}
                  placeholder="Short description for SEO and previews..."
                  className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm outline-none focus:border-coral resize-none" />
              </div>
            </div>
          </div>
        </div>

        <div className="p-6 border-t border-gray-100 flex justify-end gap-3 flex-shrink-0">
          <button onClick={onClose} className="px-5 py-2.5 rounded-xl text-sm font-bold text-gray-600 hover:bg-gray-100 transition-colors">Cancel</button>
          <button onClick={save} disabled={loading}
            className="flex items-center gap-2 px-5 py-2.5 bg-coral text-white rounded-xl text-sm font-bold hover:bg-coral-dark transition-colors disabled:opacity-60">
            {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
            {isEdit ? "Save Changes" : "Publish Post"}
          </button>
        </div>
      </div>
    </div>
  );
}

// ─── CATEGORY MODAL ─────────────────────────────────────────────────────────
function CategoryModal({ category, onClose, onSaved }: { category?: Category, onClose: () => void, onSaved: () => void }) {
  const isEdit = !!category;
  const [form, setForm] = useState({ name: category?.name || "", description: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const save = async () => {
    if (!form.name.trim()) { setError("Name is required."); return; }
    setLoading(true); setError("");
    try {
      const url = isEdit ? `/api/admin/blog/categories/${category.id}` : "/api/admin/blog/categories";
      const method = isEdit ? "PATCH" : "POST";
      const res = await fetch(url, { method, headers: { "Content-Type": "application/json" }, body: JSON.stringify(form) });
      const json = await res.json();
      if (!res.ok || !json.success) throw new Error(json.error || "Failed to save");
      onSaved();
    } catch (e: any) {
      setError(e.message);
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[60] bg-black/40 backdrop-blur-sm flex items-center justify-center p-4" onClick={onClose}>
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-sm" onClick={e => e.stopPropagation()}>
        <div className="p-6 border-b border-gray-100 flex items-center justify-between">
          <h2 className="text-lg font-black text-navy">{isEdit ? "Edit Category" : "Add Category"}</h2>
          <button onClick={onClose} className="p-1.5 rounded-xl hover:bg-gray-100"><X className="w-4 h-4 text-gray-400" /></button>
        </div>
        <div className="p-6 space-y-4">
          {error && <div className="text-sm text-red-600 font-bold">{error}</div>}
          <div>
            <label className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-2 block">Category Name</label>
            <input value={form.name} onChange={e => setForm(p => ({ ...p, name: e.target.value }))}
              placeholder="e.g. Tips & Tricks" autoFocus
              className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm outline-none focus:border-coral" />
          </div>
        </div>
        <div className="p-6 border-t border-gray-100 flex justify-end gap-3">
          <button onClick={onClose} className="px-5 py-2 text-sm font-bold text-gray-600 hover:bg-gray-100 rounded-xl">Cancel</button>
          <button onClick={save} disabled={loading} className="px-5 py-2 text-sm font-bold bg-navy text-white rounded-xl hover:bg-navy/90 flex items-center gap-2">
            {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />} Save
          </button>
        </div>
      </div>
    </div>
  );
}


// ─── MAIN PAGE ──────────────────────────────────────────────────────────────
export default function BlogAdminPage() {
  const [activeTab, setActiveTab] = useState<"POSTS" | "CATEGORIES">("POSTS");
  const [posts, setPosts] = useState<Post[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  
  // Modals
  const [editPost, setEditPost] = useState<Post | "NEW" | null>(null);
  const [editCat, setEditCat]   = useState<Category | "NEW" | null>(null);

  const loadData = useCallback(async () => {
    setLoading(true);
    try {
      const [pRes, cRes] = await Promise.all([
        fetch("/api/admin/blog"),
        fetch("/api/admin/blog/categories")
      ]);
      const pJson = await pRes.json();
      const cJson = await cRes.json();
      setPosts(pJson.data || []);
      setCategories(cJson.data || []);
    } catch {} finally { setLoading(false); }
  }, []);

  useEffect(() => { loadData(); }, [loadData]);

  const deletePost = async (p: Post) => {
    if (!confirm(`Move "${p.title}" to trash?`)) return;
    await fetch(`/api/admin/blog/${p.id}`, { method: "DELETE" });
    setPosts(prev => prev.filter(x => x.id !== p.id));
  };

  const deleteCat = async (c: Category) => {
    if (c._count.posts > 0) { alert("Cannot delete category with active posts."); return; }
    if (!confirm(`Delete category "${c.name}"?`)) return;
    await fetch(`/api/admin/blog/categories/${c.id}`, { method: "DELETE" });
    setCategories(prev => prev.filter(x => x.id !== c.id));
  };

  return (
    <div className="space-y-6">
      {editPost && (
        <PostModal 
          post={editPost === "NEW" ? undefined : editPost} 
          categories={categories}
          onClose={() => setEditPost(null)} 
          onSaved={() => { setEditPost(null); loadData(); }} 
        />
      )}
      {editCat && (
        <CategoryModal 
          category={editCat === "NEW" ? undefined : editCat}
          onClose={() => setEditCat(null)}
          onSaved={() => { setEditCat(null); loadData(); }}
        />
      )}

      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-navy tracking-tight">Blog System</h1>
          <p className="text-sm font-medium text-gray-400 mt-0.5">Manage articles, SEO, and categories</p>
        </div>
        <div className="flex items-center gap-3">
          <button onClick={loadData} className="p-2.5 bg-white border border-gray-200 rounded-xl text-gray-500 hover:border-gray-300 transition-all shadow-sm">
            <RefreshCw className={`w-4 h-4 ${loading ? "animate-spin" : ""}`} />
          </button>
          <button onClick={() => activeTab === "POSTS" ? setEditPost("NEW") : setEditCat("NEW")}
            className="flex items-center gap-2 px-4 py-2.5 bg-coral text-white rounded-xl text-sm font-bold hover:bg-coral-dark transition-colors shadow-sm">
            <Plus className="w-4 h-4" /> {activeTab === "POSTS" ? "Write Post" : "Add Category"}
          </button>
        </div>
      </div>

      <div className="flex items-center gap-4 border-b border-gray-200">
        <button onClick={() => setActiveTab("POSTS")}
          className={`pb-3 text-sm font-bold border-b-2 transition-colors ${activeTab === "POSTS" ? "border-coral text-coral" : "border-transparent text-gray-400 hover:text-gray-600"}`}>
          Published & Drafts
        </button>
        <button onClick={() => setActiveTab("CATEGORIES")}
          className={`pb-3 text-sm font-bold border-b-2 transition-colors ${activeTab === "CATEGORIES" ? "border-coral text-coral" : "border-transparent text-gray-400 hover:text-gray-600"}`}>
          Categories
        </button>
      </div>

      {loading ? (
        <div className="py-20 flex justify-center"><Loader2 className="w-8 h-8 animate-spin text-coral" /></div>
      ) : activeTab === "POSTS" ? (
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
          {posts.length === 0 ? (
            <div className="py-20 text-center">
              <FileText className="w-12 h-12 text-gray-200 mx-auto mb-4" />
              <p className="font-bold text-gray-400">No posts yet</p>
            </div>
          ) : (
            <table className="w-full min-w-[640px] text-left">
              <thead>
                <tr className="bg-gray-50/60 border-b border-gray-100 text-[11px] font-black uppercase tracking-wider text-gray-400">
                  <th className="px-6 py-4">Title</th>
                  <th className="px-6 py-4">Status</th>
                  <th className="px-6 py-4">Category</th>
                  <th className="px-6 py-4">Date</th>
                  <th className="px-6 py-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {posts.map(p => (
                  <tr key={p.id} className="hover:bg-gray-50/50 transition-colors group">
                    <td className="px-6 py-4">
                      <div className="font-bold text-navy text-sm">{p.title}</div>
                      <div className="text-xs text-gray-400 font-medium">/{p.slug}</div>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-black tracking-wider border ${
                        p.status === "PUBLISHED" ? "bg-emerald-50 text-emerald-600 border-emerald-200" : "bg-gray-100 text-gray-500 border-gray-200"
                      }`}>
                        {p.status}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      {p.category ? (
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-blue-50 text-blue-700 text-xs font-bold">
                          <Tag className="w-3 h-3" /> {p.category.name}
                        </span>
                      ) : (
                        <span className="text-xs text-gray-400 font-medium">—</span>
                      )}
                    </td>
                    <td className="px-6 py-4 text-xs text-gray-500 font-medium">
                      {new Date(p.createdAt).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button onClick={() => setEditPost(p)} className="p-2 rounded-lg text-blue-500 hover:bg-blue-50"><Edit2 className="w-4 h-4" /></button>
                        <button onClick={() => deletePost(p)} className="p-2 rounded-lg text-red-400 hover:bg-red-50"><Trash2 className="w-4 h-4" /></button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {categories.map(c => (
            <div key={c.id} className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 flex items-center justify-between group hover:shadow-md transition-all">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-500 flex items-center justify-center">
                  <Folder className="w-6 h-6" />
                </div>
                <div>
                  <div className="font-black text-navy text-sm">{c.name}</div>
                  <div className="text-xs text-gray-400 font-medium mt-0.5">{c._count.posts} posts</div>
                </div>
              </div>
              <div className="flex flex-col gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                <button onClick={() => setEditCat(c)} className="p-1.5 rounded-lg text-blue-500 hover:bg-blue-50"><Edit2 className="w-3.5 h-3.5" /></button>
                {c._count.posts === 0 && (
                  <button onClick={() => deleteCat(c)} className="p-1.5 rounded-lg text-red-400 hover:bg-red-50"><Trash2 className="w-3.5 h-3.5" /></button>
                )}
              </div>
            </div>
          ))}
          {categories.length === 0 && (
            <div className="col-span-full py-10 text-center text-gray-400 font-medium text-sm">
              No categories created yet.
            </div>
          )}
        </div>
      )}
    </div>
  );
}
