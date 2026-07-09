"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { X, Send } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
}

const WELCOME_MESSAGE: Message = {
  id: "welcome",
  role: "assistant",
  content:
    "Hey there! 🍦 I'm WE Assistant — here to help with bookings, packages, pricing, and anything about our ice cream truck services. How can I help you today?",
  timestamp: new Date(),
};

export default function AIChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [messages, setMessages] = useState<Message[]>([WELCOME_MESSAGE]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Show button after scrolling
  useEffect(() => {
    const handleScroll = () => {
      setIsVisible(window.scrollY > 300);
    };
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
  }, [messages, isTyping]);

  // Focus input when chat opens
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 300);
    }
  }, [isOpen]);

  const handleSend = () => {
    const text = input.trim();
    if (!text) return;

    const userMsg: Message = {
      id: `user-${Date.now()}`,
      role: "user",
      content: text,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setIsTyping(true);

    // Placeholder AI response — will be replaced with real AI later
    setTimeout(() => {
      const aiMsg: Message = {
        id: `ai-${Date.now()}`,
        role: "assistant",
        content: getPlaceholderResponse(text),
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, aiMsg]);
      setIsTyping(false);
    }, 1200);
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
        transition={{ type: "spring", stiffness: 260, damping: 20 }}
        className="fixed bottom-20 md:bottom-8 right-4 md:right-8 z-40 group"
        aria-label="Open AI Chat"
      >
        {/* Animated rotating gradient ring */}
        <div className="relative w-[68px] h-[68px] flex items-center justify-center">
          {/* Outer spinning gradient border */}
          <div
            className="absolute inset-0 rounded-full animate-[spin_4s_linear_infinite] opacity-80 group-hover:opacity-100 transition-opacity duration-500"
            style={{
              background: "conic-gradient(from 0deg, #FF6B6B, #FFD700, #4ECDC4, #6C63FF, #FF6B6B)",
              padding: "3px",
              WebkitMask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
              WebkitMaskComposite: "xor",
              maskComposite: "exclude",
            }}
          />
          {/* Glow behind */}
          <div className="absolute inset-0 rounded-full bg-coral/0 group-hover:bg-coral/20 blur-xl transition-all duration-700 scale-125" />
          {/* Main button body */}
          <div className="relative w-[62px] h-[62px] rounded-full bg-navy flex items-center justify-center overflow-hidden shadow-[0_8px_32px_rgba(10,17,40,0.4)] group-hover:shadow-[0_8px_40px_rgba(255,107,107,0.3)] transition-shadow duration-500">
            {/* Subtle inner shimmer */}
            <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-white/5 pointer-events-none" />
            {/* Logo */}
            <div className="relative w-9 h-9 rounded-full overflow-hidden border-2 border-white/20 group-hover:border-coral/50 transition-colors duration-500 group-hover:scale-110 transform transition-transform">
              <Image
                src="/images/we-icecream.jpg"
                alt="WE Assistant"
                fill
                className="object-cover"
                sizes="36px"
              />
            </div>
          </div>
          {/* Online indicator */}
          <span className="absolute bottom-0.5 right-0.5 w-4 h-4 rounded-full bg-mint border-[2.5px] border-navy shadow-[0_0_8px_rgba(78,205,196,0.6)]" />
        </div>
      </motion.button>

      {/* ── Chat Window ───────────────────────────────────────── */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
            className={cn(
              "fixed z-50",
              // Mobile: full screen. Desktop: bottom-right card
              "inset-0 md:inset-auto",
              "md:bottom-8 md:right-8",
              "md:w-[420px] md:h-[620px] md:max-h-[80vh]",
              "md:rounded-3xl",
              "bg-white md:shadow-2xl md:border md:border-navy/10",
              "flex flex-col overflow-hidden"
            )}
          >
            {/* ── Header ────────────────────────────────────── */}
            <div className="relative bg-navy px-6 py-5 flex items-center gap-4 shrink-0">
              {/* Decorative glow */}
              <div className="absolute top-0 right-0 w-40 h-40 bg-coral/20 rounded-full blur-[60px] pointer-events-none" />

              <div className="relative w-11 h-11 rounded-full overflow-hidden border-2 border-white/20 shadow-lg shrink-0">
                <Image
                  src="/images/we-icecream.jpg"
                  alt="WE Assistant"
                  fill
                  className="object-cover"
                  sizes="44px"
                />
              </div>
              <div className="flex-1 min-w-0 relative z-10">
                <h3 className="font-display font-black text-white text-base leading-tight tracking-tight">
                  WE Assistant
                </h3>
                <div className="flex items-center gap-1.5 mt-0.5">
                  <span className="w-2 h-2 rounded-full bg-mint animate-pulse" />
                  <span className="text-white/50 text-xs font-bold uppercase tracking-widest">
                    Online
                  </span>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="relative z-10 w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors"
                aria-label="Close chat"
              >
                <X className="w-5 h-5 text-white" />
              </button>
            </div>

            {/* ── Messages ──────────────────────────────────── */}
            <div className="flex-1 overflow-y-auto px-5 py-6 space-y-4 bg-[#F9F7F4]">
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={cn(
                    "flex gap-3 max-w-[90%]",
                    msg.role === "user" ? "ml-auto flex-row-reverse" : ""
                  )}
                >
                  {msg.role === "assistant" && (
                    <div className="relative w-8 h-8 rounded-full overflow-hidden border border-navy/10 shrink-0 mt-1 shadow-sm">
                      <Image
                        src="/images/we-icecream.jpg"
                        alt="WE"
                        fill
                        className="object-cover"
                        sizes="32px"
                      />
                    </div>
                  )}
                  <div
                    className={cn(
                      "px-4 py-3 text-sm leading-relaxed font-medium",
                      msg.role === "user"
                        ? "bg-coral text-white rounded-[1.25rem] rounded-br-md shadow-sm"
                        : "bg-white text-navy/80 rounded-[1.25rem] rounded-bl-md shadow-sm border border-navy/5"
                    )}
                  >
                    {msg.content}
                  </div>
                </div>
              ))}

              {/* Typing indicator */}
              {isTyping && (
                <div className="flex gap-3 max-w-[90%]">
                  <div className="relative w-8 h-8 rounded-full overflow-hidden border border-navy/10 shrink-0 mt-1 shadow-sm">
                    <Image
                      src="/images/we-icecream.jpg"
                      alt="WE"
                      fill
                      className="object-cover"
                      sizes="32px"
                    />
                  </div>
                  <div className="bg-white text-navy/40 rounded-[1.25rem] rounded-bl-md px-5 py-3 shadow-sm border border-navy/5 flex items-center gap-1">
                    <span className="w-2 h-2 rounded-full bg-navy/30 animate-bounce" style={{ animationDelay: "0ms" }} />
                    <span className="w-2 h-2 rounded-full bg-navy/30 animate-bounce" style={{ animationDelay: "150ms" }} />
                    <span className="w-2 h-2 rounded-full bg-navy/30 animate-bounce" style={{ animationDelay: "300ms" }} />
                  </div>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* ── Input ─────────────────────────────────────── */}
            <div className="shrink-0 px-4 py-4 bg-white border-t border-navy/5">
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleSend();
                }}
                className="flex items-center gap-2"
              >
                <input
                  ref={inputRef}
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Ask about packages, pricing, events..."
                  className="flex-1 px-4 py-3 bg-[#F5F3EF] rounded-full text-sm text-navy font-medium placeholder:text-navy/40 outline-none focus:ring-2 focus:ring-coral/30 transition-shadow"
                />
                <button
                  type="submit"
                  disabled={!input.trim()}
                  className={cn(
                    "w-11 h-11 rounded-full flex items-center justify-center transition-all duration-200 shrink-0",
                    input.trim()
                      ? "bg-coral text-white shadow-md shadow-coral/20 hover:scale-105 active:scale-95"
                      : "bg-navy/5 text-navy/30 cursor-not-allowed"
                  )}
                  aria-label="Send message"
                >
                  <Send className="w-4 h-4" />
                </button>
              </form>
              <p className="text-center text-[10px] text-navy/30 font-bold mt-2 uppercase tracking-widest">
                Powered by WE Ice Cream Truck AI
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

// ── Placeholder responses (will be replaced with real AI) ──────────
function getPlaceholderResponse(input: string): string {
  const lower = input.toLowerCase();

  if (lower.includes("price") || lower.includes("cost") || lower.includes("how much")) {
    return "Our packages start at $250 for 30 guests. We have options for every event size! Visit our Packages page for full details, or I can help you find the right fit. 🍦";
  }
  if (lower.includes("book") || lower.includes("reserve") || lower.includes("schedule")) {
    return "Booking is easy! Head to our Get a Quote page, fill in your event details, and we'll get back to you within 24 hours. Want me to guide you through it? 📅";
  }
  if (lower.includes("wedding")) {
    return "Congratulations! 🎉 We'd love to be part of your special day. Our ice cream trucks add a magical touch to wedding receptions. We offer special wedding packages — would you like more details?";
  }
  if (lower.includes("corporate") || lower.includes("company") || lower.includes("work")) {
    return "Corporate events are one of our specialties! From employee appreciation days to product launches, we handle it all. We can even customize branding on our trucks. 🏢";
  }
  if (lower.includes("area") || lower.includes("city") || lower.includes("location") || lower.includes("serve")) {
    return "We serve all of Massachusetts! From Boston to the Berkshires, we've got you covered. Check our Service Areas page for your specific city. 📍";
  }
  if (lower.includes("menu") || lower.includes("flavor") || lower.includes("ice cream")) {
    return "We carry premium brands like Good Humor, Popsicle, Blue Bunny, Hood, Klondike, and Richie's Italian Ice. Check out our full Menu page for all the delicious options! 🍨";
  }
  if (lower.includes("hello") || lower.includes("hi") || lower.includes("hey")) {
    return "Hello! Welcome to WE Ice Cream Truck! 👋 How can I help make your next event unforgettable?";
  }

  return "Great question! For the best answer, I'd recommend reaching out to our team directly. You can also explore our website for packages, menus, and service areas. Is there anything specific I can help with? 😊";
}
