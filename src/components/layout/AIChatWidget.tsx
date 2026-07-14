"use client";

import { useState, useEffect, useRef, FormEvent, KeyboardEvent } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { X, Send, CheckCircle2, Loader2, MessageCircle } from "lucide-react";
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
        className="fixed bottom-20 sm:bottom-8 right-4 sm:right-6 md:bottom-10 md:right-10 z-40 group flex items-center gap-3 bg-white/80 backdrop-blur-md p-2.5 pr-5 rounded-full shadow-[0_8px_30px_rgb(0,0,0,0.12)] border border-navy/10 hover:border-coral/50"
        aria-label="Open AI Chat"
      >
        <div className="relative w-10 h-10 sm:w-11 sm:h-11 rounded-full overflow-hidden border border-gray-200 shadow-sm">
          <Image src="/images/we-icecream.jpg" alt="WE Assistant" fill className="object-cover" sizes="44px" />
        </div>
        <div className="flex flex-col items-start">
          <span className="text-navy font-bold text-xs sm:text-sm tracking-tight leading-none">WE Assistant</span>
          <span className="flex items-center gap-1 mt-1">
            <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
            <span className="text-coral font-bold text-[10px] uppercase tracking-widest">Online</span>
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
              "sm:rounded-[2rem] sm:shadow-[0_20px_60px_-15px_rgba(0,0,0,0.2)] sm:border sm:border-white/40",
              "bg-white/85 backdrop-blur-xl"
            )}
          >
            {/* ── Header ── */}
            <div className="relative px-4 sm:px-5 py-4 flex items-center gap-3 shrink-0 bg-navy/95 backdrop-blur-md border-b border-navy/10 rounded-t-[2rem]">
              <div className="relative w-10 h-10 rounded-full overflow-hidden border-2 border-coral/50 shrink-0 bg-white">
                <Image src="/images/we-icecream.jpg" alt="WE Assistant" fill className="object-cover" sizes="40px" />
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="font-bold text-white text-sm sm:text-base leading-tight">WE Assistant</h3>
                <p className="flex items-center gap-1.5 mt-0.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
                  <span className="text-coral-light text-[10px] font-bold uppercase tracking-widest text-coral">AI Concierge</span>
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
                      <div className="relative w-7 h-7 rounded-full overflow-hidden border border-gray-200 shrink-0 mt-auto bg-white">
                        <Image src="/images/we-icecream.jpg" alt="WE" fill className="object-cover" sizes="28px" />
                      </div>
                    )}
                    <div
                      className={cn(
                        "px-4 py-3 text-[0.875rem] leading-relaxed font-medium whitespace-pre-wrap shadow-sm",
                        msg.role === "user"
                          ? "bg-coral text-white rounded-[1.25rem] rounded-br-sm"
                          : "bg-white/90 backdrop-blur-sm text-navy rounded-[1.25rem] rounded-bl-sm border border-white/50"
                      )}
                    >
                      {msg.role === "assistant" ? (
                        <div className="prose prose-sm prose-p:leading-relaxed prose-pre:p-0 prose-ul:my-1 prose-ol:my-1 max-w-none prose-li:marker:text-navy/50 text-navy">
                          <ReactMarkdown remarkPlugins={[remarkGfm]}>
                            {msg.content || "…"}
                          </ReactMarkdown>
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
                      className="ml-9 mt-3 bg-white/95 backdrop-blur-md rounded-[1.25rem] border border-coral/20 shadow-lg overflow-hidden"
                    >
                      <div className="bg-coral/10 px-4 py-3 border-b border-coral/10">
                        <p className="text-coral text-xs font-black uppercase tracking-wider flex items-center gap-1.5"><CheckCircle2 size={14}/> Booking Summary</p>
                      </div>
                      <div className="p-4 space-y-2.5 text-xs">
                        <div className="flex justify-between">
                          <span className="text-gray-500 font-medium">Name</span>
                          <span className="text-navy font-bold">{msg.bookingRequest.name}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-500 font-medium">Date</span>
                          <span className="text-navy font-bold">{msg.bookingRequest.eventDate}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-500 font-medium">Time</span>
                          <span className="text-navy font-bold">{msg.bookingRequest.startTime}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-500 font-medium">Event</span>
                          <span className="text-navy font-bold">{msg.bookingRequest.eventType}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-500 font-medium">Guests</span>
                          <span className="text-navy font-bold">{msg.bookingRequest.guests}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-500 font-medium">Location</span>
                          <span className="text-navy font-bold text-right max-w-[60%]">{msg.bookingRequest.city}, {msg.bookingRequest.zip}</span>
                        </div>
                        <div className="pt-3 mt-1 border-t border-gray-100">
                          <button
                            onClick={() => handleConfirmBooking(msg.bookingRequest!)}
                            disabled={bookingConfirming}
                            className="w-full py-2.5 rounded-xl font-bold text-sm bg-coral text-white hover:bg-coral/90 shadow-md transition-all disabled:opacity-50 flex items-center justify-center gap-2"
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
                      className="px-3 py-1.5 text-xs font-bold rounded-full bg-white/70 backdrop-blur-sm border border-coral/20 text-navy hover:bg-coral hover:text-white transition-all shadow-sm"
                    >
                      {q}
                    </button>
                  ))}
                </div>
              )}

              {/* Typing indicator */}
              {isLoading && messages[messages.length - 1]?.role === "user" && (
                <div className="flex gap-2.5 max-w-[90%]">
                  <div className="relative w-7 h-7 rounded-full overflow-hidden border border-gray-200 shrink-0 mt-auto bg-white">
                    <Image src="/images/we-icecream.jpg" alt="WE" fill className="object-cover" sizes="28px" />
                  </div>
                  <div className="bg-white/90 backdrop-blur-sm rounded-[1.25rem] rounded-bl-sm px-4 py-4 shadow-sm border border-white/50 flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-coral/50 animate-pulse" />
                    <span className="w-1.5 h-1.5 rounded-full bg-coral/50 animate-pulse" style={{ animationDelay: "150ms" }} />
                    <span className="w-1.5 h-1.5 rounded-full bg-coral/50 animate-pulse" style={{ animationDelay: "300ms" }} />
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* ── Input ── */}
            <div className="shrink-0 px-4 py-3 bg-white/80 backdrop-blur-lg border-t border-white/40">
              <form onSubmit={handleSend} className="relative flex items-center gap-2">
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
                  placeholder="Type your message..."
                  disabled={isLoading}
                  className="flex-1 px-4 py-3 bg-white rounded-xl text-sm text-navy font-medium placeholder:text-gray-400 outline-none focus:ring-2 focus:ring-coral/20 border border-gray-200 transition-all disabled:opacity-50 resize-none shadow-sm"
                />
                <button
                  type="submit"
                  disabled={!inputValue.trim() || isLoading}
                  className={cn(
                    "w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-200 shrink-0",
                    inputValue.trim() && !isLoading
                      ? "bg-coral text-white hover:scale-105 shadow-md hover:shadow-lg"
                      : "bg-gray-100 text-gray-400 cursor-not-allowed"
                  )}
                  aria-label="Send message"
                >
                  <Send className="w-4 h-4" />
                </button>
              </form>
              <p className="text-center mt-2 text-[10px] text-gray-400 font-bold tracking-wide uppercase">
                Powered by WE Ice Cream Truck AI
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
