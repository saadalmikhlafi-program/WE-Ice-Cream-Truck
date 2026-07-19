"use client";

import { useState, useEffect, useRef, FormEvent } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { X, Send, CheckCircle2, Loader2, Sparkles } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import TextareaAutosize from "react-textarea-autosize";

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  bookingRequest?: BookingRequest;
}

interface BookingRequest {
  name: string;
  email: string;
  phone: string;
  eventDate: string;
  startTime: string;
  eventType: string;
  packageId: string;
  address: string;
  city: string;
  zip: string;
  guests: number;
}

const WELCOME_MESSAGE: Message = {
  id: "welcome",
  role: "assistant",
  content:
    "Hey there! 🍦 I'm your WE Ice Cream Truck concierge.\n\nI can help you explore our packages, check pricing, and even book an event right here in chat!\n\nHow can I sweeten your day?",
};

const QUICK_REPLIES = [
  "What packages do you offer?",
  "I want to book an event",
  "What are your prices?",
];

export default function AIChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [messages, setMessages] = useState<Message[]>([WELCOME_MESSAGE]);
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [bookingConfirming, setBookingConfirming] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const handleScroll = () => setIsVisible(window.scrollY > 300);
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const handleOpen = () => setIsOpen(true);
    window.addEventListener("open-ai-chat", handleOpen);
    return () => window.removeEventListener("open-ai-chat", handleOpen);
  }, []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isLoading]);

  useEffect(() => {
    if (isOpen) setTimeout(() => inputRef.current?.focus(), 300);
  }, [isOpen]);

  const handleSend = async (e?: FormEvent, overrideText?: string) => {
    e?.preventDefault();
    const text = overrideText || inputValue.trim();
    if (!text || isLoading) return;

    const userMsg: Message = { id: `u-${Date.now()}`, role: "user", content: text };
    setMessages((prev) => [...prev, userMsg]);
    setInputValue("");
    setIsLoading(true);

    try {
      const history = [...messages, userMsg].slice(-12).map((m) => ({
        role: m.role,
        content: m.content,
      }));

      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: history }),
      });

      if (!res.ok) throw new Error(`API error ${res.status}`);
      const data = await res.json();

      const assistantMsg: Message = {
        id: `a-${Date.now()}`,
        role: "assistant",
        content: data.text || "",
        bookingRequest: data.bookingRequest,
      };

      setMessages((prev) => [...prev, assistantMsg]);
    } catch (err: any) {
      console.error("AI Chat Error:", err);
      setMessages((prev) => [
        ...prev,
        {
          id: `a-${Date.now()}`,
          role: "assistant",
          content: "I'm sorry, I'm having trouble connecting right now. Please try again or call us at 617-999-3803! 📞",
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleConfirmBooking = async (bookingData: BookingRequest) => {
    setBookingConfirming(true);
    try {
      const res = await fetch("/api/chat", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ bookingData }),
      });

      const data = await res.json();

      if (res.ok && data.success) {
        setMessages((prev) => [
          ...prev,
          {
            id: `a-${Date.now()}`,
            role: "assistant",
            content: `🎉 **Booking Confirmed!**\n\nYour reference number is **#${data.bookingNumber}**.\n\nOur team will review it and contact you shortly at ${bookingData.email}. You can also call us at 617-999-3803 for any questions!\n\nThank you for choosing WE Ice Cream Truck! 🍦`,
          },
        ]);
      } else {
        setMessages((prev) => [
          ...prev,
          {
            id: `a-${Date.now()}`,
            role: "assistant",
            content: `I'm sorry, there was an issue creating your booking: ${data.error || "Unknown error"}. Please try again or call us directly at 617-999-3803.`,
          },
        ]);
      }
    } catch (err) {
      setMessages((prev) => [
        ...prev,
        {
          id: `a-${Date.now()}`,
          role: "assistant",
          content: "I'm sorry, I couldn't process the booking right now. Please call us at 617-999-3803 and we'll be happy to help! 📞",
        },
      ]);
    } finally {
      setBookingConfirming(false);
    }
  };

  const hasQuickRepliesShown = messages.length <= 1;

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
        className="fixed bottom-20 sm:bottom-8 right-4 sm:right-6 md:bottom-10 md:right-10 z-40 group flex items-center gap-3 bg-white/70 backdrop-blur-xl p-2.5 pr-5 rounded-full shadow-[0_8px_30px_rgb(0,0,0,0.12)] border border-white/50 hover:border-coral/50"
        aria-label="Open AI Chat"
      >
        <div className="relative w-10 h-10 sm:w-11 sm:h-11 rounded-full overflow-hidden shadow-sm">
          <Image src="/images/we-icecream.jpg" alt="WE Assistant" fill className="object-cover" sizes="44px" />
        </div>
        <div className="flex flex-col items-start">
          <span className="text-navy font-black text-xs sm:text-sm tracking-tight leading-none flex items-center gap-1">
            WE Assistant <Sparkles className="w-3 h-3 text-coral" />
          </span>
          <span className="flex items-center gap-1 mt-1">
            <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
            <span className="text-gray-500 font-bold text-[10px] uppercase tracking-widest">Online</span>
          </span>
        </div>
      </motion.button>

      {/* ── Chat Window (Premium Glassmorphism) ────────────────── */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Mobile backdrop overlay - tap to close */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/40 z-40 sm:hidden"
              onClick={() => setIsOpen(false)}
            />
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ type: "spring", stiffness: 350, damping: 30 }}
            className={cn(
              "fixed z-50 flex flex-col",
              "inset-0 sm:inset-auto",
              "sm:bottom-8 sm:right-6 md:right-10",
              "sm:w-[400px] md:w-[440px] sm:h-[650px] md:h-[700px] sm:max-h-[85vh]",
              "sm:rounded-[2.5rem] sm:shadow-[0_30px_80px_-15px_rgba(0,0,0,0.3)] sm:border sm:border-white/50",
              "bg-white/60 backdrop-blur-3xl overflow-hidden"
            )}
          >
            {/* Glowing orbs behind the chat for a premium feel */}
            <div className="absolute top-[-10%] left-[-10%] w-64 h-64 bg-coral/20 rounded-full blur-[80px] pointer-events-none" />
            <div className="absolute bottom-[-10%] right-[-10%] w-64 h-64 bg-blue-400/10 rounded-full blur-[80px] pointer-events-none" />

            {/* ── Header ── */}
            <div className="relative px-5 sm:px-6 py-5 flex items-center gap-4 shrink-0 bg-white/40 backdrop-blur-md border-b border-white/40 z-20 sticky top-0">
              <div className="relative w-12 h-12 rounded-full overflow-hidden shrink-0 shadow-lg border-2 border-white/80">
                <Image src="/images/we-icecream.jpg" alt="WE Assistant" fill className="object-cover" sizes="48px" />
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="font-black text-navy text-base sm:text-lg leading-tight flex items-center gap-1.5">
                  WE Assistant <Sparkles className="w-4 h-4 text-coral" />
                </h3>
                <p className="flex items-center gap-1.5 mt-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                  <span className="text-gray-500 text-[10px] font-bold uppercase tracking-widest">AI Concierge</span>
                </p>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="w-8 h-8 rounded-full bg-white/50 hover:bg-white flex items-center justify-center transition-colors text-gray-500 hover:text-navy shadow-sm"
                aria-label="Close chat"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* ── Messages ── */}
            <div className="flex-1 overflow-y-auto px-5 py-5 space-y-5 z-10 scrollbar-hide">
              {messages.map((msg) => (
                <div key={msg.id} className="relative">
                  <div className={cn("flex gap-3 max-w-[92%]", msg.role === "user" ? "ml-auto flex-row-reverse" : "")}>
                    {msg.role === "assistant" && (
                      <div className="relative w-8 h-8 rounded-full overflow-hidden shrink-0 mt-auto shadow-sm border border-white/60">
                        <Image src="/images/we-icecream.jpg" alt="WE" fill className="object-cover" sizes="32px" />
                      </div>
                    )}
                    <div
                      className={cn(
                        "px-5 py-3.5 text-[0.9rem] leading-relaxed font-medium whitespace-pre-wrap shadow-sm",
                        msg.role === "user"
                          ? "bg-navy text-white rounded-[1.5rem] rounded-br-sm shadow-[0_4px_14px_0_rgba(10,17,40,0.2)]"
                          : "bg-white/80 backdrop-blur-md text-navy rounded-[1.5rem] rounded-bl-sm border border-white/60"
                      )}
                    >
                      {msg.role === "assistant" ? (
                        <div className="prose prose-sm prose-p:leading-relaxed prose-pre:p-0 prose-ul:my-1 prose-ol:my-1 max-w-none prose-li:marker:text-coral text-navy prose-strong:text-navy prose-strong:font-black">
                          <ReactMarkdown remarkPlugins={[remarkGfm]}>{msg.content || "…"}</ReactMarkdown>
                        </div>
                      ) : (
                        msg.content || <span className="opacity-40">…</span>
                      )}
                    </div>
                  </div>

                  {/* Booking Confirmation Card */}
                  {msg.bookingRequest && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="ml-11 mt-3 bg-white/90 backdrop-blur-md rounded-[1.5rem] border border-white shadow-xl overflow-hidden"
                    >
                      <div className="bg-gradient-to-r from-coral/10 to-transparent px-5 py-3.5 border-b border-white/50">
                        <p className="text-coral text-xs font-black uppercase tracking-wider flex items-center gap-1.5">
                          <CheckCircle2 size={14} /> Booking Summary
                        </p>
                      </div>
                      <div className="p-5 space-y-3 text-sm">
                        <div className="flex justify-between items-center border-b border-gray-50 pb-2">
                          <span className="text-gray-400 font-bold text-xs uppercase tracking-wider">Name</span>
                          <span className="text-navy font-black">{msg.bookingRequest.name}</span>
                        </div>
                        <div className="flex justify-between items-center border-b border-gray-50 pb-2">
                          <span className="text-gray-400 font-bold text-xs uppercase tracking-wider">Date</span>
                          <span className="text-navy font-black">{msg.bookingRequest.eventDate}</span>
                        </div>
                        <div className="flex justify-between items-center border-b border-gray-50 pb-2">
                          <span className="text-gray-400 font-bold text-xs uppercase tracking-wider">Time</span>
                          <span className="text-navy font-black">{msg.bookingRequest.startTime}</span>
                        </div>
                        <div className="flex justify-between items-center border-b border-gray-50 pb-2">
                          <span className="text-gray-400 font-bold text-xs uppercase tracking-wider">Event</span>
                          <span className="text-navy font-black">{msg.bookingRequest.eventType}</span>
                        </div>
                        <div className="flex justify-between items-center border-b border-gray-50 pb-2">
                          <span className="text-gray-400 font-bold text-xs uppercase tracking-wider">Guests</span>
                          <span className="text-navy font-black">{msg.bookingRequest.guests}</span>
                        </div>
                        <div className="flex justify-between items-start pt-1">
                          <span className="text-gray-400 font-bold text-xs uppercase tracking-wider mt-0.5">Location</span>
                          <span className="text-navy font-black text-right max-w-[60%]">
                            {msg.bookingRequest.address}<br />
                            {msg.bookingRequest.city}, {msg.bookingRequest.zip}
                          </span>
                        </div>
                        <div className="pt-4 mt-2">
                          <button
                            onClick={() => handleConfirmBooking(msg.bookingRequest!)}
                            disabled={bookingConfirming}
                            className="w-full py-3.5 rounded-xl font-black text-sm bg-coral text-white hover:bg-coral-dark shadow-[0_8px_20px_rgb(255,107,107,0.25)] hover:shadow-[0_8px_25px_rgb(255,107,107,0.4)] transition-all disabled:opacity-50 flex items-center justify-center gap-2"
                          >
                            {bookingConfirming ? (
                              <>
                                <Loader2 className="w-4 h-4 animate-spin" />
                                Processing...
                              </>
                            ) : (
                              <>
                                <CheckCircle2 className="w-5 h-5" />
                                Confirm Booking Now
                              </>
                            )}
                          </button>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </div>
              ))}

              {/* Quick Replies */}
              {hasQuickRepliesShown && !isLoading && (
                <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="flex flex-wrap gap-2 mt-2">
                  {QUICK_REPLIES.map((q) => (
                    <button
                      key={q}
                      onClick={() => handleSend(undefined, q)}
                      className="px-4 py-2.5 text-xs font-bold rounded-full bg-white/60 backdrop-blur-md border border-white text-navy hover:bg-navy hover:text-white transition-all shadow-sm"
                    >
                      {q}
                    </button>
                  ))}
                </motion.div>
              )}

              {/* Typing indicator */}
              {isLoading && messages[messages.length - 1]?.role === "user" && (
                <div className="flex gap-3 max-w-[90%]">
                  <div className="relative w-8 h-8 rounded-full overflow-hidden shrink-0 mt-auto shadow-sm border border-white/60">
                    <Image src="/images/we-icecream.jpg" alt="WE" fill className="object-cover" sizes="32px" />
                  </div>
                  <div className="bg-white/80 backdrop-blur-md rounded-[1.5rem] rounded-bl-sm px-5 py-4 shadow-sm border border-white/60 flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-navy/40 animate-pulse" />
                    <span className="w-1.5 h-1.5 rounded-full bg-navy/40 animate-pulse" style={{ animationDelay: "150ms" }} />
                    <span className="w-1.5 h-1.5 rounded-full bg-navy/40 animate-pulse" style={{ animationDelay: "300ms" }} />
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* ── Input ── */}
            <div className="shrink-0 px-4 py-4 bg-white/40 backdrop-blur-xl border-t border-white/50 z-10">
              <form onSubmit={handleSend} className="relative flex items-end gap-2">
                <TextareaAutosize
                  ref={inputRef as any}
                  minRows={1}
                  maxRows={4}
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" && !e.shiftKey) {
                      e.preventDefault();
                      handleSend(e as any);
                    }
                  }}
                  placeholder="Ask me anything..."
                  disabled={isLoading}
                  className="flex-1 px-5 py-3.5 bg-white/80 backdrop-blur-md rounded-2xl text-sm text-navy font-bold placeholder:text-gray-400 outline-none focus:ring-2 focus:ring-coral/20 focus:bg-white border border-white shadow-sm transition-all disabled:opacity-50 resize-none"
                />
                <button
                  type="submit"
                  disabled={!inputValue.trim() || isLoading}
                  className={cn(
                    "w-12 h-12 rounded-2xl flex items-center justify-center transition-all duration-300 shrink-0",
                    inputValue.trim() && !isLoading
                      ? "bg-navy text-white hover:scale-105 shadow-[0_8px_20px_rgb(10,17,40,0.2)] hover:shadow-[0_8px_25px_rgb(10,17,40,0.3)]"
                      : "bg-white/50 text-gray-400 cursor-not-allowed border border-white"
                  )}
                  aria-label="Send message"
                >
                  <Send className="w-5 h-5 ml-0.5" />
                </button>
              </form>
              <p className="text-center mt-3 text-[10px] text-gray-500 font-black tracking-[0.2em] uppercase">
                WE Ice Cream Truck AI
              </p>
            </div>
          </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
