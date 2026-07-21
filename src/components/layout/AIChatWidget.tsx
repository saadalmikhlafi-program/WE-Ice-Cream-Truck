"use client";

import { useState, useEffect, useRef, FormEvent, useMemo } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { X, Send, CheckCircle2, Loader2, Sparkles, ChevronDown } from "lucide-react";
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
  const inputRef = useRef<HTMLTextAreaElement>(null);

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
    // Focus on desktop only to avoid mobile keyboard popups automatically
    if (isOpen && window.innerWidth >= 640) {
      setTimeout(() => inputRef.current?.focus(), 300);
    }
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

  const memoizedMessages = useMemo(() => messages.map((msg) => (
    <motion.div 
      initial={{ opacity: 0, y: 15, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ type: "spring", stiffness: 400, damping: 25 }}
      key={msg.id} 
      className="relative w-full flex flex-col"
    >
      <div className={cn("flex gap-3 max-w-[88%]", msg.role === "user" ? "self-end flex-row-reverse" : "self-start")}>
        {msg.role === "assistant" && (
          <div className="relative w-8 h-8 rounded-full overflow-hidden shrink-0 mt-auto shadow-[0_2px_10px_rgb(0,0,0,0.08)] border border-white">
            <Image src="/images/we-icecream.jpg" alt="WE" fill className="object-cover" sizes="32px" />
          </div>
        )}
        <div
          className={cn(
            "px-4 py-3 text-[15px] sm:text-[14px] leading-relaxed font-medium whitespace-pre-wrap shadow-sm",
            msg.role === "user"
              ? "bg-navy text-white rounded-2xl rounded-br-sm shadow-[0_4px_14px_rgb(10,17,40,0.2)]"
              : "bg-white text-navy rounded-2xl rounded-bl-sm border border-gray-100 shadow-[0_4px_20px_rgb(0,0,0,0.04)]"
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
          className="self-start ml-11 mt-3 w-[280px] sm:w-[320px] bg-white rounded-2xl border border-gray-100 shadow-[0_8px_30px_rgb(0,0,0,0.08)] overflow-hidden"
        >
          <div className="bg-gradient-to-r from-coral/10 to-transparent px-5 py-3.5 border-b border-gray-50">
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
                onClick={() => msg.bookingRequest && handleConfirmBooking(msg.bookingRequest)}
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
    </motion.div>
  )), [messages, bookingConfirming]);

  return (
    <>
      {/* ── Floating Chat Button ──────────────────────────────── */}
      <motion.button
        onClick={() => setIsOpen(true)}
        initial={{ scale: 0, opacity: 0 }}
        animate={
          isVisible && !isOpen
            ? { scale: 1, opacity: 1 }
            : { scale: 0, opacity: 0, pointerEvents: "none" }
        }
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        transition={{ type: "spring", stiffness: 260, damping: 20 }}
        className="fixed bottom-20 sm:bottom-8 right-4 sm:right-6 md:bottom-10 md:right-10 z-40 group flex items-center gap-3 bg-white/90 backdrop-blur-xl p-2 sm:p-2.5 pr-4 sm:pr-5 rounded-full shadow-[0_8px_30px_rgb(0,0,0,0.12)] border border-white/50 hover:border-coral/50 hover:shadow-[0_10px_40px_rgb(255,107,107,0.2)] transition-colors"
        aria-label="Open AI Chat"
      >
        <div className="relative w-10 h-10 sm:w-11 sm:h-11 rounded-full overflow-hidden shadow-sm border-2 border-white">
          <Image src="/images/we-icecream.jpg" alt="WE Assistant" fill className="object-cover" sizes="44px" />
        </div>
        <div className="flex flex-col items-start">
          <span className="text-navy font-black text-xs sm:text-sm tracking-tight leading-none flex items-center gap-1">
            WE Assistant <Sparkles className="w-3 h-3 text-coral" />
          </span>
          <span className="flex items-center gap-1.5 mt-1">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
            </span>
            <span className="text-gray-500 font-bold text-[9px] sm:text-[10px] uppercase tracking-widest">Online</span>
          </span>
        </div>
      </motion.button>

      {/* ── Chat Window (Premium Mobile-First Layout) ────────────────── */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Mobile backdrop overlay - hidden on desktop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/20 backdrop-blur-sm z-[50] sm:hidden"
              onClick={() => setIsOpen(false)}
            />
            <motion.div
              initial={{ opacity: 0, y: 100, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 100, scale: 0.95 }}
              transition={{ type: "spring", stiffness: 350, damping: 30 }}
              className={cn(
                "fixed z-[60] flex flex-col overflow-hidden bg-gray-50 shadow-[0_30px_80px_-15px_rgba(0,0,0,0.3)]",
                // Mobile: Full screen covering everything
                "inset-0 w-full h-[100dvh] rounded-none",
                // Desktop: Floating card at bottom right
                "sm:inset-auto sm:bottom-8 sm:right-6 md:right-10",
                "sm:w-[400px] md:w-[440px] sm:h-[650px] md:h-[700px] sm:max-h-[85vh]",
                "sm:rounded-[2rem] sm:border sm:border-gray-100"
              )}
            >
              {/* Premium Background Mesh Gradient */}
              <div className="absolute inset-0 z-0 opacity-40 pointer-events-none overflow-hidden">
                <div className="absolute top-[-20%] left-[-20%] w-[70%] h-[50%] bg-blue-200/50 rounded-full blur-[100px]" />
                <div className="absolute bottom-[-10%] right-[-10%] w-[60%] h-[60%] bg-coral/10 rounded-full blur-[100px]" />
                <div className="absolute top-[40%] right-[-20%] w-[50%] h-[50%] bg-mint/20 rounded-full blur-[80px]" />
              </div>

              {/* ── Header ── */}
              <div className="relative px-5 sm:px-6 py-4 flex items-center gap-4 shrink-0 bg-white/80 backdrop-blur-xl border-b border-gray-100 shadow-[0_4px_20px_rgb(0,0,0,0.02)] z-20">
                <div className="relative w-12 h-12 rounded-full overflow-hidden shrink-0 shadow-md border-2 border-white">
                  <Image src="/images/we-icecream.jpg" alt="WE Assistant" fill className="object-cover" sizes="48px" />
                  <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white rounded-full"></div>
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-black text-navy text-lg leading-tight flex items-center gap-1.5">
                    WE Assistant <Sparkles className="w-4 h-4 text-coral" />
                  </h3>
                  <p className="flex items-center gap-1.5 mt-0.5">
                    <span className="text-gray-500 text-[11px] font-bold uppercase tracking-widest">AI Concierge</span>
                  </p>
                </div>
                <button
                  onClick={() => setIsOpen(false)}
                  className="w-9 h-9 rounded-full bg-gray-50 hover:bg-gray-100 flex items-center justify-center transition-colors text-gray-500 hover:text-navy shadow-sm border border-gray-100 sm:hidden"
                  aria-label="Close chat"
                >
                  <ChevronDown className="w-5 h-5" />
                </button>
                <button
                  onClick={() => setIsOpen(false)}
                  className="w-9 h-9 rounded-full bg-gray-50 hover:bg-gray-100 items-center justify-center transition-colors text-gray-500 hover:text-navy shadow-sm border border-gray-100 hidden sm:flex"
                  aria-label="Close chat"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* ── Messages Area ── */}
              <div className="flex-1 overflow-y-auto px-4 sm:px-5 py-6 space-y-6 z-10 scrollbar-hide relative pb-10">
                {memoizedMessages}

                {/* Quick Replies (Horizontal Scroll on Mobile) */}
                {hasQuickRepliesShown && !isLoading && (
                  <motion.div 
                    initial={{ opacity: 0, y: 10 }} 
                    animate={{ opacity: 1, y: 0 }} 
                    transition={{ delay: 0.3 }}
                    className="flex flex-nowrap overflow-x-auto pb-4 pt-2 -mx-4 px-4 sm:mx-0 sm:px-0 gap-2 sm:flex-wrap scrollbar-hide"
                  >
                    {QUICK_REPLIES.map((q) => (
                      <button
                        key={q}
                        onClick={() => handleSend(undefined, q)}
                        className="shrink-0 px-4 py-2.5 text-[13px] font-bold rounded-full bg-white border border-coral/20 text-navy hover:bg-coral hover:border-coral hover:text-white transition-all shadow-sm"
                      >
                        {q}
                      </button>
                    ))}
                  </motion.div>
                )}

                {/* Animated Typing Indicator */}
                {isLoading && messages[messages.length - 1]?.role === "user" && (
                  <motion.div 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex gap-3 max-w-[85%]"
                  >
                    <div className="relative w-8 h-8 rounded-full overflow-hidden shrink-0 mt-auto shadow-sm border border-white">
                      <Image src="/images/we-icecream.jpg" alt="WE" fill className="object-cover" sizes="32px" />
                    </div>
                    <div className="bg-white rounded-2xl rounded-bl-sm px-4 py-3.5 shadow-sm border border-gray-100 flex items-center gap-1.5 h-[42px]">
                      <motion.span 
                        animate={{ y: [0, -5, 0] }}
                        transition={{ repeat: Infinity, duration: 0.8, delay: 0 }}
                        className="w-1.5 h-1.5 rounded-full bg-navy/40" 
                      />
                      <motion.span 
                        animate={{ y: [0, -5, 0] }}
                        transition={{ repeat: Infinity, duration: 0.8, delay: 0.2 }}
                        className="w-1.5 h-1.5 rounded-full bg-navy/40" 
                      />
                      <motion.span 
                        animate={{ y: [0, -5, 0] }}
                        transition={{ repeat: Infinity, duration: 0.8, delay: 0.4 }}
                        className="w-1.5 h-1.5 rounded-full bg-navy/40" 
                      />
                    </div>
                  </motion.div>
                )}
                <div ref={messagesEndRef} className="h-2" />
              </div>

              {/* ── Input Area ── */}
              <div className="shrink-0 bg-white/90 backdrop-blur-xl border-t border-gray-100 z-20 pb-[env(safe-area-inset-bottom)]">
                <div className="px-4 py-3 sm:py-4">
                  <form onSubmit={handleSend} className="relative flex items-end gap-2 bg-gray-50 border border-gray-200 rounded-3xl p-1.5 focus-within:bg-white focus-within:ring-2 focus-within:ring-coral/20 focus-within:border-coral/30 transition-all shadow-sm">
                    <TextareaAutosize
                      ref={inputRef}
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
                      placeholder="Type a message..."
                      disabled={isLoading}
                      // text-base on mobile prevents iOS zoom, sm:text-sm for desktop
                      className="flex-1 px-4 py-2.5 sm:py-2 bg-transparent text-base sm:text-sm text-navy font-medium placeholder:text-gray-400 outline-none resize-none disabled:opacity-50"
                    />
                    <button
                      type="submit"
                      disabled={!inputValue.trim() || isLoading}
                      className={cn(
                        "w-10 h-10 sm:w-9 sm:h-9 rounded-full flex items-center justify-center transition-all duration-300 shrink-0",
                        inputValue.trim() && !isLoading
                          ? "bg-coral text-white hover:bg-coral-dark shadow-[0_4px_12px_rgb(255,107,107,0.3)]"
                          : "bg-gray-200 text-gray-400 cursor-not-allowed"
                      )}
                      aria-label="Send message"
                    >
                      <Send className="w-4 h-4 sm:w-3.5 sm:h-3.5 ml-0.5" />
                    </button>
                  </form>
                  <p className="text-center mt-2.5 text-[10px] text-gray-400 font-bold tracking-widest uppercase">
                    ⚡ Powered by AI
                  </p>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
