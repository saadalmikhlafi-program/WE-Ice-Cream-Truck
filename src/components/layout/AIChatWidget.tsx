"use client";

import { useState, useEffect, useRef, FormEvent } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { X, Send } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
}

const WELCOME_MESSAGE: Message = {
  id: "welcome",
  role: "assistant",
  content:
    "Hey there! 🍦 I'm WE Assistant — here to help with bookings, packages, pricing, and anything about our ice cream truck services. How can I help you today?",
};

export default function AIChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [messages, setMessages] = useState<Message[]>([WELCOME_MESSAGE]);
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Show button after scrolling down
  useEffect(() => {
    const handleScroll = () => setIsVisible(window.scrollY > 300);
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Allow other components to open the chat via a custom event
  useEffect(() => {
    const handleOpen = () => setIsOpen(true);
    window.addEventListener("open-ai-chat", handleOpen);
    return () => window.removeEventListener("open-ai-chat", handleOpen);
  }, []);

  // Auto-scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isLoading]);

  // Focus input when chat opens
  useEffect(() => {
    if (isOpen) setTimeout(() => inputRef.current?.focus(), 300);
  }, [isOpen]);

  const handleSend = async (e: FormEvent) => {
    e.preventDefault();
    const text = inputValue.trim();
    if (!text || isLoading) return;

    const userMsg: Message = { id: `u-${Date.now()}`, role: "user", content: text };
    setMessages((prev) => [...prev, userMsg]);
    setInputValue("");
    setIsLoading(true);

    try {
      // Build history for context (last 10 messages)
      const history = [...messages, userMsg].slice(-10).map((m) => ({
        role: m.role,
        content: m.content,
      }));

      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: history }),
      });

      if (!res.ok) throw new Error("API error");

      // Handle streaming response
      const reader = res.body?.getReader();
      const decoder = new TextDecoder();
      const aiMsgId = `a-${Date.now()}`;
      setMessages((prev) => [...prev, { id: aiMsgId, role: "assistant", content: "" }]);

      if (reader) {
        while (true) {
          const { done, value } = await reader.read();
          if (done) break;
          const chunk = decoder.decode(value, { stream: true });
          if (chunk) {
            setMessages((prev) =>
              prev.map((m) =>
                m.id === aiMsgId ? { ...m, content: m.content + chunk } : m
              )
            );
          }
        }
      }
    } catch (err) {
      setMessages((prev) => [
        ...prev,
        {
          id: `err-${Date.now()}`,
          role: "assistant",
          content: "Sorry, I'm having trouble connecting. Please try again! 🍦",
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {/* ── Floating Chat Button ──────────────────────────────── */}
      <motion.button
        onClick={() => setIsOpen(true)}
        initial={{ scale: 0, opacity: 0 }}
        animate={
          isVisible && !isOpen
            ? { scale: 1, opacity: 1 }
            : { scale: 0, opacity: 0, pointerEvents: "none" as const }
        }
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        transition={{ type: "spring", stiffness: 260, damping: 20 }}
        className="fixed bottom-8 right-6 md:bottom-10 md:right-10 z-40 group flex items-center gap-3 bg-white p-2 pr-5 rounded-full shadow-[0_10px_40px_-10px_rgba(10,17,40,0.3)] border border-navy/5"
        aria-label="Open AI Chat"
      >
        <div className="relative w-12 h-12 rounded-full overflow-hidden border border-navy/10 shadow-inner">
          <Image src="/images/we-icecream.jpg" alt="WE Assistant" fill className="object-cover" sizes="48px" />
        </div>
        <div className="flex flex-col items-start">
          <span className="text-navy font-black text-sm tracking-tight leading-none">WE Assistant</span>
          <span className="text-coral font-semibold text-[10px] uppercase tracking-widest mt-1">Online Now</span>
        </div>
      </motion.button>

      {/* ── Chat Window ───────────────────────────────────────── */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ type: "spring", stiffness: 350, damping: 30 }}
            className={cn(
              "fixed z-50 flex flex-col overflow-hidden bg-white/95 backdrop-blur-xl",
              "inset-0 md:inset-auto",
              "md:bottom-8 md:right-10",
              "md:w-[400px] md:h-[650px] md:max-h-[85vh]",
              "md:rounded-[2rem] md:shadow-[0_20px_60px_-15px_rgba(10,17,40,0.4)] md:border md:border-white/40"
            )}
          >
            {/* ── Header ── */}
            <div className="relative px-6 py-5 flex items-center gap-4 shrink-0 border-b border-navy/5 bg-white/50">
              <div className="relative w-12 h-12 rounded-full overflow-hidden border border-navy/10 shadow-sm shrink-0">
                <Image src="/images/we-icecream.jpg" alt="WE Assistant" fill className="object-cover" sizes="48px" />
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="font-display font-black text-navy text-lg leading-tight tracking-tight">WE Assistant</h3>
                <p className="text-navy/50 text-xs font-semibold uppercase tracking-widest mt-0.5">AI Event Concierge</p>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="w-10 h-10 rounded-full bg-navy/5 hover:bg-navy/10 flex items-center justify-center transition-colors text-navy/60 hover:text-navy"
                aria-label="Close chat"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* ── Messages ── */}
            <div className="flex-1 overflow-y-auto px-5 py-6 space-y-5 bg-gradient-to-b from-white/30 to-[#F9F7F4]/50">
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={cn("flex gap-3 max-w-[88%]", msg.role === "user" ? "ml-auto flex-row-reverse" : "")}
                >
                  {msg.role === "assistant" && (
                    <div className="relative w-8 h-8 rounded-full overflow-hidden border border-navy/10 shrink-0 mt-auto shadow-sm">
                      <Image src="/images/we-icecream.jpg" alt="WE" fill className="object-cover" sizes="32px" />
                    </div>
                  )}
                  <div
                    className={cn(
                      "px-5 py-3.5 text-[0.925rem] leading-relaxed font-medium shadow-sm whitespace-pre-wrap",
                      msg.role === "user"
                        ? "bg-navy text-white rounded-[1.5rem] rounded-br-sm"
                        : "bg-white text-navy rounded-[1.5rem] rounded-bl-sm border border-navy/5"
                    )}
                  >
                    {msg.content || <span className="opacity-40">…</span>}
                  </div>
                </div>
              ))}

              {/* Typing indicator */}
              {isLoading && messages[messages.length - 1]?.role === "user" && (
                <div className="flex gap-3 max-w-[88%]">
                  <div className="relative w-8 h-8 rounded-full overflow-hidden border border-navy/10 shrink-0 mt-auto shadow-sm">
                    <Image src="/images/we-icecream.jpg" alt="WE" fill className="object-cover" sizes="32px" />
                  </div>
                  <div className="bg-white rounded-[1.5rem] rounded-bl-sm px-5 py-4 shadow-sm border border-navy/5 flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-navy/20 animate-pulse" />
                    <span className="w-2 h-2 rounded-full bg-navy/20 animate-pulse" style={{ animationDelay: "150ms" }} />
                    <span className="w-2 h-2 rounded-full bg-navy/20 animate-pulse" style={{ animationDelay: "300ms" }} />
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* ── Input ── */}
            <div className="shrink-0 px-5 py-5 bg-white border-t border-navy/5">
              <form onSubmit={handleSend} className="relative flex items-center">
                <input
                  ref={inputRef}
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  placeholder="Ask me anything..."
                  disabled={isLoading}
                  className="w-full pl-5 pr-14 py-4 bg-[#F5F3EF] rounded-full text-[0.95rem] text-navy font-semibold placeholder:text-navy/40 outline-none focus:ring-2 focus:ring-navy/10 transition-shadow disabled:opacity-50"
                />
                <button
                  type="submit"
                  disabled={!inputValue.trim() || isLoading}
                  className={cn(
                    "absolute right-1.5 w-11 h-11 rounded-full flex items-center justify-center transition-all duration-200",
                    inputValue.trim() && !isLoading
                      ? "bg-navy text-white hover:scale-105"
                      : "bg-transparent text-navy/30 cursor-not-allowed"
                  )}
                  aria-label="Send message"
                >
                  <Send className="w-5 h-5 -ml-0.5" />
                </button>
              </form>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
