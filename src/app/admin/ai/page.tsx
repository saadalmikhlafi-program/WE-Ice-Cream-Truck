"use client";
import { useState, useRef, useEffect, FormEvent, useCallback } from "react";
import {
  Bot, Loader2, Send, AlertTriangle, Plus, Trash2, Edit2,
  MessageSquare, Search, X, Check, ChevronRight, Sparkles
} from "lucide-react";
import { useSession } from "next-auth/react";
import ReactMarkdown from "react-markdown";

type Message = { id: string; role: "user" | "assistant"; content: string };
type Conversation = { id: string; title: string | null; updatedAt: string; _count?: { messages: number } };

function timeAgo(dateStr: string) {
  const diff = Date.now() - new Date(dateStr).getTime();
  const mins = Math.floor(diff / 60000);
  if (mins < 1) return "just now";
  if (mins < 60) return `${mins}m ago`;
  const hrs = Math.floor(mins / 60);
  if (hrs < 24) return `${hrs}h ago`;
  return `${Math.floor(hrs / 24)}d ago`;
}

export default function AiAdminPage() {
  const { data: session } = useSession();
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [activeConvId, setActiveConvId]   = useState<string | null>(null);
  const [messages, setMessages]           = useState<Message[]>([]);
  const [inputValue, setInputValue]       = useState("");
  const [isLoading, setIsLoading]         = useState(false);
  const [error, setError]                 = useState<string | null>(null);
  const [convSearch, setConvSearch]       = useState("");
  const [renamingId, setRenamingId]       = useState<string | null>(null);
  const [renameVal, setRenameVal]         = useState("");
  const [sidebarOpen, setSidebarOpen]     = useState(true);

  const loadConversations = useCallback(async () => {
    try {
      const res  = await fetch("/api/admin/conversations");
      const json = await res.json();
      setConversations(json.data || []);
    } catch {}
  }, []);

  useEffect(() => { loadConversations(); }, [loadConversations]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isLoading]);

  const openConversation = async (conv: Conversation) => {
    setActiveConvId(conv.id);
    setMessages([]);
    setError(null);
    try {
      const res  = await fetch(`/api/admin/conversations/${conv.id}`);
      const json = await res.json();
      const msgs = (json.data?.messages || []).map((m: any) => ({
        id: m.id, role: m.role, content: m.content,
      }));
      if (msgs.length === 0) {
        setMessages([{
          id: "welcome",
          role: "assistant",
          content: `Hello, ${session?.user?.name?.split(" ")[0] || "Admin"}! 👋 What would you like to know?`,
        }]);
      } else {
        setMessages(msgs);
      }
    } catch {}
  };

  const startNewConversation = async () => {
    try {
      const res  = await fetch("/api/admin/conversations", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title: "New Conversation" }),
      });
      const json = await res.json();
      const conv = json.data;
      setConversations(prev => [conv, ...prev]);
      setActiveConvId(conv.id);
      setMessages([{
        id: "welcome",
        role: "assistant",
        content: `Hello, ${session?.user?.name?.split(" ")[0] || "Admin"}! 👋 I'm your WE Ice Cream Truck AI Operations Assistant. I have live access to your database and can help you with:\n\n• 📋 **Booking queries** — search, filter, status\n• 👥 **Customer lookups** — name, email, history\n• 📦 **Package details** — pricing, availability\n• 📊 **Analytics** — revenue trends, booking stats\n\nWhat would you like to know?`,
      }]);
      setError(null);
    } catch {}
  };

  const deleteConversation = async (conv: Conversation) => {
    if (!confirm("Delete this conversation?")) return;
    await fetch(`/api/admin/conversations/${conv.id}`, { method: "DELETE" });
    setConversations(prev => prev.filter(c => c.id !== conv.id));
    if (activeConvId === conv.id) { setActiveConvId(null); setMessages([]); }
  };

  const renameConversation = async (conv: Conversation) => {
    if (!renameVal.trim()) { setRenamingId(null); return; }
    await fetch(`/api/admin/conversations/${conv.id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title: renameVal }),
    });
    setConversations(prev => prev.map(c => c.id === conv.id ? { ...c, title: renameVal } : c));
    setRenamingId(null);
  };

  const sendMessage = async (text: string) => {
    if (!text.trim() || isLoading) return;
    if (!activeConvId) { await startNewConversation(); return; }
    setError(null);

    const userMsg: Message = { id: `u-${Date.now()}`, role: "user", content: text };
    const updatedMessages = [...messages, userMsg];
    setMessages(updatedMessages);
    setInputValue("");
    setIsLoading(true);

    try {
      const history = updatedMessages.slice(-12).map(m => ({ role: m.role, content: m.content }));
      const res = await fetch("/api/admin/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: history, conversationId: activeConvId }),
      });

      if (!res.ok) throw new Error(`API error: ${res.status}`);
      const data = await res.json();
      const reply = data.reply ?? "No response from AI.";

      setMessages(prev => [...prev, { id: `a-${Date.now()}`, role: "assistant", content: reply }]);

      // Auto-title: if this is the first message, use it as title
      if (updatedMessages.filter(m => m.role === "user").length === 1) {
        const autoTitle = text.length > 40 ? text.substring(0, 40) + "…" : text;
        await fetch(`/api/admin/conversations/${activeConvId}`, {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ title: autoTitle }),
        });
        setConversations(prev => prev.map(c => c.id === activeConvId ? { ...c, title: autoTitle, updatedAt: new Date().toISOString() } : c));
      }
    } catch (err: any) {
      setError(err.message || "Something went wrong.");
    } finally { setIsLoading(false); }
  };

  const handleSubmit = (e: FormEvent) => { e.preventDefault(); sendMessage(inputValue); };

  const filteredConvs = conversations.filter(c =>
    !convSearch || (c.title || "New Conversation").toLowerCase().includes(convSearch.toLowerCase())
  );

  return (
    <div className="flex h-[calc(100vh-7rem)] bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">

      {/* ─── Sidebar ─────────────────────────────────────────────── */}
      {sidebarOpen && (
        <div className="w-72 border-r border-gray-100 flex flex-col bg-gray-50/50">
          <div className="p-4 border-b border-gray-100">
            <button onClick={startNewConversation}
              className="w-full flex items-center justify-center gap-2 px-4 py-2.5 bg-coral text-white rounded-xl text-sm font-bold hover:bg-coral-dark transition-colors shadow-sm">
              <Plus className="w-4 h-4" /> New Chat
            </button>
            <div className="relative mt-3">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-400 pointer-events-none" />
              <input value={convSearch} onChange={e => setConvSearch(e.target.value)}
                placeholder="Search conversations…"
                className="w-full pl-8 pr-3 py-2 border border-gray-200 rounded-xl text-xs outline-none focus:border-coral bg-white" />
            </div>
          </div>
          <div className="flex-1 overflow-y-auto py-2">
            {filteredConvs.length === 0 ? (
              <div className="text-center py-8 text-xs text-gray-400 font-medium">No conversations yet</div>
            ) : filteredConvs.map(conv => (
              <div key={conv.id}
                className={`group relative mx-2 mb-1 rounded-xl transition-colors cursor-pointer ${activeConvId === conv.id ? "bg-navy/5 border border-navy/10" : "hover:bg-gray-100"}`}
                onClick={() => openConversation(conv)}>
                <div className="p-3 pr-16">
                  {renamingId === conv.id ? (
                    <input autoFocus value={renameVal} onChange={e => setRenameVal(e.target.value)}
                      onKeyDown={e => { if (e.key === "Enter") renameConversation(conv); if (e.key === "Escape") setRenamingId(null); }}
                      className="w-full text-xs font-bold text-navy bg-transparent outline-none border-b border-coral"
                      onClick={e => e.stopPropagation()} />
                  ) : (
                    <div className="text-xs font-bold text-navy truncate">{conv.title || "New Conversation"}</div>
                  )}
                  <div className="text-[10px] text-gray-400 font-medium mt-0.5">{timeAgo(conv.updatedAt)}</div>
                </div>
                <div className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center gap-0.5 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button onClick={e => { e.stopPropagation(); setRenamingId(conv.id); setRenameVal(conv.title || ""); }}
                    className="p-1 rounded-lg text-gray-400 hover:text-navy hover:bg-white">
                    <Edit2 className="w-3 h-3" />
                  </button>
                  <button onClick={e => { e.stopPropagation(); deleteConversation(conv); }}
                    className="p-1 rounded-lg text-gray-400 hover:text-red-500 hover:bg-white">
                    <Trash2 className="w-3 h-3" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ─── Main Chat Area ───────────────────────────────────────── */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100 bg-white">
          <div className="flex items-center gap-3">
            <button onClick={() => setSidebarOpen(v => !v)} className="p-2 rounded-xl hover:bg-gray-100 text-gray-400">
              <MessageSquare className="w-4 h-4" />
            </button>
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-coral to-orange-400 flex items-center justify-center shadow-sm">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            <div>
              <div className="text-sm font-black text-navy">WE AI Operations Assistant</div>
              <div className="text-xs text-emerald-500 font-bold flex items-center gap-1.5">
                <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" /> Live Database Access
              </div>
            </div>
          </div>
          {!activeConvId && (
            <button onClick={startNewConversation}
              className="flex items-center gap-2 px-4 py-2 bg-coral text-white rounded-xl text-sm font-bold hover:bg-coral-dark">
              <Plus className="w-4 h-4" /> Start Chat
            </button>
          )}
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto px-6 py-6 space-y-6">
          {!activeConvId ? (
            <div className="flex flex-col items-center justify-center h-full text-center py-20">
              <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-coral/20 to-orange-100 flex items-center justify-center mb-6">
                <Bot className="w-10 h-10 text-coral" />
              </div>
              <h2 className="text-2xl font-black text-navy mb-2">AI Operations Assistant</h2>
              <p className="text-gray-400 text-sm max-w-xs mb-6">Start a new conversation to query your live business data.</p>
              <button onClick={startNewConversation}
                className="flex items-center gap-2 px-6 py-3 bg-coral text-white rounded-xl font-bold hover:bg-coral-dark shadow-md">
                <Plus className="w-4 h-4" /> Start New Chat
              </button>
            </div>
          ) : messages.map((msg) => (
            <div key={msg.id} className={`flex gap-3 ${msg.role === "user" ? "flex-row-reverse" : ""}`}>
              <div className={`flex-shrink-0 w-8 h-8 rounded-xl flex items-center justify-center text-sm font-black ${
                msg.role === "user" ? "bg-navy text-white" : "bg-gradient-to-br from-coral to-orange-400 text-white"
              }`}>
                {msg.role === "user" ? (session?.user?.name?.[0] || "U") : <Bot className="w-4 h-4" />}
              </div>
              <div className={`max-w-[80%] ${msg.role === "user" ? "items-end" : "items-start"} flex flex-col gap-1`}>
                <div className={`px-4 py-3 rounded-2xl text-sm leading-relaxed shadow-sm ${
                  msg.role === "user"
                    ? "bg-navy text-white rounded-tr-none"
                    : "bg-gray-50 border border-gray-100 text-navy rounded-tl-none"
                }`}>
                  {msg.role === "assistant" ? (
                    <div className="prose prose-sm max-w-none prose-headings:font-black prose-headings:text-navy prose-code:text-coral prose-code:bg-coral/10 prose-code:px-1 prose-code:rounded">
                      <ReactMarkdown>{msg.content}</ReactMarkdown>
                    </div>
                  ) : msg.content}
                </div>
              </div>
            </div>
          ))}
          {isLoading && (
            <div className="flex gap-3">
              <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-coral to-orange-400 flex items-center justify-center">
                <Bot className="w-4 h-4 text-white" />
              </div>
              <div className="bg-gray-50 border border-gray-100 rounded-2xl rounded-tl-none px-4 py-3 flex items-center gap-2">
                <div className="flex gap-1">
                  {[0,1,2].map(i => (
                    <div key={i} className="w-2 h-2 rounded-full bg-coral/60 animate-bounce" style={{ animationDelay: `${i * 0.15}s` }} />
                  ))}
                </div>
              </div>
            </div>
          )}
          {error && (
            <div className="flex items-center gap-3 p-4 bg-red-50 border border-red-100 rounded-2xl text-sm text-red-700">
              <AlertTriangle className="w-4 h-4 flex-shrink-0" />
              <span className="font-medium">{error}</span>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input */}
        <div className="px-6 py-4 border-t border-gray-100 bg-white">
          <form onSubmit={handleSubmit} className="flex gap-3 items-end">
            <div className="flex-1 relative">
              <textarea
                value={inputValue}
                onChange={e => setInputValue(e.target.value)}
                onKeyDown={e => { if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); sendMessage(inputValue); } }}
                placeholder={activeConvId ? "Ask about bookings, customers, revenue…" : "Start a new chat first"}
                disabled={!activeConvId || isLoading}
                rows={1}
                className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm outline-none focus:border-coral transition-colors resize-none disabled:opacity-60 disabled:bg-gray-50 max-h-32"
                style={{ height: "auto" }}
              />
            </div>
            <button type="submit" disabled={!inputValue.trim() || isLoading || !activeConvId}
              className="flex-shrink-0 w-11 h-11 bg-coral text-white rounded-xl flex items-center justify-center hover:bg-coral-dark transition-colors disabled:opacity-50 shadow-sm">
              {isLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
            </button>
          </form>
          <p className="text-center text-[10px] text-gray-300 font-medium mt-2">
            AI responses may occasionally be imprecise. Always verify critical data in the dashboard.
          </p>
        </div>
      </div>
    </div>
  );
}
