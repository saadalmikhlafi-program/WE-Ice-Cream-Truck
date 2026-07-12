"use client";
import { useState, useRef, useEffect, FormEvent } from "react";
import { Bot, Loader2, Activity, Server, Zap, Shield, Send, AlertTriangle } from "lucide-react";
import { useSession } from "next-auth/react";
import { cn } from "@/lib/utils";

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
}

export default function AiAdminPage() {
  const { data: session } = useSession();
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome",
      role: "assistant",
      content: `Hello, ${session?.user?.name || "Admin"}! 👋 I'm your WE Ice Cream Truck AI Operations Assistant. I have live access to your database and can help you with:\n\n• 📋 **Booking queries** — search, filter, status\n• 👥 **Customer lookups** — name, email, history\n• 📦 **Package details** — pricing, availability\n• 📊 **Analytics** — revenue trends, booking stats\n\nWhat would you like to know?`,
    },
  ]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isLoading]);

  const sendMessage = async (text: string) => {
    if (!text.trim() || isLoading) return;
    setError(null);

    const userMsg: Message = { id: `u-${Date.now()}`, role: "user", content: text };
    setMessages((prev) => [...prev, userMsg]);
    setInputValue("");
    setIsLoading(true);

    try {
      const history = [...messages, userMsg].slice(-10).map((m) => ({
        role: m.role,
        content: m.content,
      }));

      const res = await fetch("/api/admin/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: history }),
      });

      if (!res.ok) throw new Error(`API error: ${res.status}`);

      const data = await res.json();
      const reply = data.reply ?? "No response from AI.";

      setMessages((prev) => [
        ...prev,
        { id: `a-${Date.now()}`, role: "assistant", content: reply },
      ]);
    } catch (err: any) {
      setError(err.message || "AI service error");
    } finally {
      setIsLoading(false);
    }
  };

  const handleSend = (e: FormEvent) => {
    e.preventDefault();
    sendMessage(inputValue);
  };

  const QUICK_PROMPTS = [
    "Show me today's pending bookings",
    "How many bookings this month?",
    "List all active packages",
    "Show recent customers",
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-black text-navy tracking-tight">AI Operations Assistant</h1>
          <p className="text-sm font-medium text-gray-400 mt-0.5">Live database access · Secured by NextAuth</p>
        </div>
      </div>

      {/* System Status */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: "AI Model", value: "GPT-4o", icon: Server, color: "text-emerald-500", bg: "bg-emerald-50" },
          { label: "DB Access", value: "Live", icon: Activity, color: "text-blue-500", bg: "bg-blue-50" },
          { label: "Response", value: "Streaming", icon: Zap, color: "text-amber-500", bg: "bg-amber-50" },
          { label: "Auth", value: "NextAuth", icon: Shield, color: "text-purple-500", bg: "bg-purple-50" },
        ].map((s, i) => (
          <div key={i} className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4 flex items-center gap-3">
            <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${s.bg}`}>
              <s.icon className={`w-5 h-5 ${s.color}`} />
            </div>
            <div>
              <div className="text-xs font-bold text-gray-400">{s.label}</div>
              <div className="text-sm font-black text-navy">{s.value}</div>
            </div>
          </div>
        ))}
      </div>

      {/* Chat Interface */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden flex flex-col" style={{ height: "560px" }}>
        {/* Header */}
        <div className="px-6 py-4 border-b border-gray-100 flex items-center gap-3">
          <div className="w-9 h-9 bg-coral/10 rounded-xl flex items-center justify-center">
            <Bot className="w-5 h-5 text-coral" />
          </div>
          <div>
            <h2 className="font-black text-navy text-sm">AI Operations Assistant</h2>
            <p className="text-[11px] text-gray-400 font-medium">Powered by GPT-4o · Live DB access</p>
          </div>
          <div className="ml-auto flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            <span className="text-xs font-bold text-emerald-600">Online</span>
          </div>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-5 space-y-4 bg-gray-50/50">
          {messages.map((msg) => (
            <div key={msg.id} className={cn("flex gap-3 max-w-[88%]", msg.role === "user" ? "ml-auto flex-row-reverse" : "")}>
              {msg.role === "assistant" && (
                <div className="w-8 h-8 rounded-xl bg-navy flex items-center justify-center shrink-0 mt-auto">
                  <Bot className="w-4 h-4 text-white" />
                </div>
              )}
              <div
                className={cn(
                  "px-4 py-3 text-sm leading-relaxed font-medium rounded-2xl shadow-sm whitespace-pre-wrap",
                  msg.role === "user"
                    ? "bg-navy text-white rounded-br-sm"
                    : "bg-white text-navy border border-gray-100 rounded-bl-sm"
                )}
              >
                {msg.content || <span className="opacity-30">…</span>}
              </div>
            </div>
          ))}

          {isLoading && messages[messages.length - 1]?.role === "user" && (
            <div className="flex gap-3">
              <div className="w-8 h-8 rounded-xl bg-navy flex items-center justify-center shrink-0">
                <Bot className="w-4 h-4 text-white" />
              </div>
              <div className="bg-white border border-gray-100 rounded-2xl rounded-bl-sm px-4 py-3 flex items-center gap-1.5 shadow-sm">
                <span className="w-2 h-2 rounded-full bg-navy/30 animate-bounce" style={{ animationDelay: "0ms" }} />
                <span className="w-2 h-2 rounded-full bg-navy/30 animate-bounce" style={{ animationDelay: "150ms" }} />
                <span className="w-2 h-2 rounded-full bg-navy/30 animate-bounce" style={{ animationDelay: "300ms" }} />
              </div>
            </div>
          )}

          {error && (
            <div className="flex items-center gap-2 text-red-600 bg-red-50 border border-red-100 rounded-xl px-4 py-3 text-sm font-medium">
              <AlertTriangle className="w-4 h-4 shrink-0" />
              <span>{error}. Make sure OPENAI_API_KEY is configured in your environment.</span>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Quick Prompts */}
        {messages.length <= 1 && (
          <div className="px-4 py-3 border-t border-gray-100 flex gap-2 overflow-x-auto">
            {QUICK_PROMPTS.map((prompt) => (
              <button
                key={prompt}
                onClick={() => sendMessage(prompt)}
                disabled={isLoading}
                className="shrink-0 text-xs font-bold text-navy bg-navy/5 hover:bg-navy/10 px-3 py-1.5 rounded-full transition-colors border border-navy/10 disabled:opacity-50"
              >
                {prompt}
              </button>
            ))}
          </div>
        )}

        {/* Input */}
        <div className="px-4 py-4 bg-white border-t border-gray-100">
          <form onSubmit={handleSend} className="relative flex items-center">
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="Ask anything about your business data..."
              disabled={isLoading}
              className="w-full pl-4 pr-14 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm text-navy font-medium placeholder:text-gray-400 outline-none focus:ring-2 focus:ring-navy/10 focus:border-navy/20 transition-all disabled:opacity-60"
            />
            <button
              type="submit"
              disabled={!inputValue.trim() || isLoading}
              className={cn(
                "absolute right-1.5 w-9 h-9 rounded-lg flex items-center justify-center transition-all",
                inputValue.trim() && !isLoading
                  ? "bg-navy text-white hover:bg-navy/90"
                  : "bg-gray-100 text-gray-300 cursor-not-allowed"
              )}
            >
              {isLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
