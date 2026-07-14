"use client";

import { useState, useEffect, useRef, FormEvent } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { X, Send, CheckCircle2, Loader2, MessageCircle } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

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
    "Hey there! 🍦 I'm your WE Ice Cream Truck concierge — I can help you with packages, pricing, and even book an event right here in chat!\n\nWhat can I help you with today?",
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
        className="fixed bottom-20 sm:bottom-8 right-4 sm:right-6 md:bottom-10 md:right-10 z-40 group flex items-center gap-3 bg-[#0A1128] p-2.5 pr-5 rounded-full shadow-[0_10px_40px_-10px_rgba(10,17,40,0.5)] border border-[#D4AF37]/20"
        aria-label="Open AI Chat"
      >
        <div className="relative w-10 h-10 sm:w-11 sm:h-11 rounded-full overflow-hidden border-2 border-[#D4AF37]/40 shadow-inner">
          <Image src="/images/we-icecream.jpg" alt="WE Assistant" fill className="object-cover" sizes="44px" />
        </div>
        <div className="flex flex-col items-start">
          <span className="text-white font-bold text-xs sm:text-sm tracking-tight leading-none">WE Assistant</span>
          <span className="flex items-center gap-1 mt-1">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-[#D4AF37] font-semibold text-[10px] uppercase tracking-widest">Online</span>
          </span>
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
              "fixed z-50 flex flex-col overflow-hidden",
              "inset-0 sm:inset-auto",
              "sm:bottom-8 sm:right-6 md:right-10",
              "sm:w-[380px] md:w-[420px] sm:h-[600px] md:h-[650px] sm:max-h-[85vh]",
              "sm:rounded-2xl sm:shadow-[0_20px_60px_-15px_rgba(10,17,40,0.5)] sm:border sm:border-white/10",
              "bg-[#FAFAF8]"
            )}
          >
            {/* ── Header ── */}
            <div className="relative px-4 sm:px-5 py-4 flex items-center gap-3 shrink-0 bg-[#0A1128]">
              <div className="relative w-10 h-10 rounded-full overflow-hidden border-2 border-[#D4AF37]/40 shrink-0">
                <Image src="/images/we-icecream.jpg" alt="WE Assistant" fill className="object-cover" sizes="40px" />
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="font-bold text-white text-sm sm:text-base leading-tight">WE Assistant</h3>
                <p className="flex items-center gap-1.5 mt-0.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  <span className="text-[#D4AF37]/80 text-[10px] font-semibold uppercase tracking-widest">AI Concierge</span>
                </p>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors text-white/70 hover:text-white"
                aria-label="Close chat"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* ── Messages ── */}
            <div className="flex-1 overflow-y-auto px-4 py-4 space-y-4">
              {messages.map((msg) => (
                <div key={msg.id}>
                  <div
                    className={cn("flex gap-2.5 max-w-[90%]", msg.role === "user" ? "ml-auto flex-row-reverse" : "")}
                  >
                    {msg.role === "assistant" && (
                      <div className="relative w-7 h-7 rounded-full overflow-hidden border border-[#0A1128]/10 shrink-0 mt-auto">
                        <Image src="/images/we-icecream.jpg" alt="WE" fill className="object-cover" sizes="28px" />
                      </div>
                    )}
                    <div
                      className={cn(
                        "px-4 py-3 text-[0.875rem] leading-relaxed font-medium whitespace-pre-wrap",
                        msg.role === "user"
                          ? "bg-[#0A1128] text-white rounded-2xl rounded-br-md"
                          : "bg-white text-[#1a1a2e] rounded-2xl rounded-bl-md shadow-sm border border-black/[0.04]"
                      )}
                    >
                      {msg.content || <span className="opacity-40">…</span>}
                    </div>
                  </div>

                  {/* Booking Confirmation Card */}
                  {msg.bookingRequest && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="ml-9 mt-3 bg-white rounded-xl border border-[#D4AF37]/30 shadow-sm overflow-hidden"
                    >
                      <div className="bg-[#0A1128] px-4 py-2.5">
                        <p className="text-[#D4AF37] text-xs font-bold uppercase tracking-wider">📋 Booking Summary</p>
                      </div>
                      <div className="p-4 space-y-2 text-xs">
                        <div className="flex justify-between">
                          <span className="text-gray-500 font-medium">Name</span>
                          <span className="text-[#0A1128] font-bold">{msg.bookingRequest.name}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-500 font-medium">Date</span>
                          <span className="text-[#0A1128] font-bold">{msg.bookingRequest.eventDate}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-500 font-medium">Time</span>
                          <span className="text-[#0A1128] font-bold">{msg.bookingRequest.startTime}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-500 font-medium">Event</span>
                          <span className="text-[#0A1128] font-bold">{msg.bookingRequest.eventType}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-500 font-medium">Guests</span>
                          <span className="text-[#0A1128] font-bold">{msg.bookingRequest.guests}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-500 font-medium">Location</span>
                          <span className="text-[#0A1128] font-bold text-right max-w-[60%]">{msg.bookingRequest.city}, {msg.bookingRequest.zip}</span>
                        </div>
                        <div className="pt-3 border-t border-gray-100">
                          <button
                            onClick={() => handleConfirmBooking(msg.bookingRequest!)}
                            disabled={bookingConfirming}
                            className="w-full py-2.5 rounded-lg font-bold text-sm bg-[#0A1128] text-[#D4AF37] hover:bg-[#0A1128]/90 transition-all disabled:opacity-50 flex items-center justify-center gap-2"
                          >
                            {bookingConfirming ? (
                              <>
                                <Loader2 className="w-4 h-4 animate-spin" />
                                Processing...
                              </>
                            ) : (
                              <>
                                <CheckCircle2 className="w-4 h-4" />
                                Confirm Booking
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
                <div className="flex flex-wrap gap-2 mt-2">
                  {QUICK_REPLIES.map((q) => (
                    <button
                      key={q}
                      onClick={() => handleSend(undefined, q)}
                      className="px-3 py-1.5 text-xs font-semibold rounded-full bg-white border border-[#0A1128]/10 text-[#0A1128] hover:bg-[#0A1128] hover:text-white transition-all shadow-sm"
                    >
                      {q}
                    </button>
                  ))}
                </div>
              )}

              {/* Typing indicator */}
              {isLoading && messages[messages.length - 1]?.role === "user" && (
                <div className="flex gap-2.5 max-w-[90%]">
                  <div className="relative w-7 h-7 rounded-full overflow-hidden border border-[#0A1128]/10 shrink-0 mt-auto">
                    <Image src="/images/we-icecream.jpg" alt="WE" fill className="object-cover" sizes="28px" />
                  </div>
                  <div className="bg-white rounded-2xl rounded-bl-md px-4 py-3 shadow-sm border border-black/[0.04] flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#0A1128]/20 animate-pulse" />
                    <span className="w-1.5 h-1.5 rounded-full bg-[#0A1128]/20 animate-pulse" style={{ animationDelay: "150ms" }} />
                    <span className="w-1.5 h-1.5 rounded-full bg-[#0A1128]/20 animate-pulse" style={{ animationDelay: "300ms" }} />
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* ── Input ── */}
            <div className="shrink-0 px-4 py-3 bg-white border-t border-black/[0.04]">
              <form onSubmit={handleSend} className="relative flex items-center gap-2">
                <input
                  ref={inputRef}
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  placeholder="Type your message..."
                  disabled={isLoading}
                  className="flex-1 px-4 py-3 bg-[#F5F4F0] rounded-xl text-sm text-[#0A1128] font-medium placeholder:text-[#0A1128]/35 outline-none focus:ring-2 focus:ring-[#0A1128]/10 transition-shadow disabled:opacity-50"
                />
                <button
                  type="submit"
                  disabled={!inputValue.trim() || isLoading}
                  className={cn(
                    "w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-200 shrink-0",
                    inputValue.trim() && !isLoading
                      ? "bg-[#0A1128] text-[#D4AF37] hover:scale-105 shadow-sm"
                      : "bg-[#F5F4F0] text-[#0A1128]/25 cursor-not-allowed"
                  )}
                  aria-label="Send message"
                >
                  <Send className="w-4 h-4" />
                </button>
              </form>
              <p className="text-center mt-2 text-[10px] text-gray-400 font-medium">
                Powered by WE Ice Cream Truck AI
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
