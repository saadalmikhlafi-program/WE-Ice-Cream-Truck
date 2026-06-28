"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Send, Sparkles, User, Truck } from "lucide-react";
import { cn } from "@/lib/utils";

interface AIConciergeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface Message {
  id: string;
  sender: "ai" | "user";
  text: string;
}

export default function AIConciergeModal({ isOpen, onClose }: AIConciergeModalProps) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);

  // Initialize chat when opened
  useEffect(() => {
    if (isOpen && messages.length === 0) {
      setIsTyping(true);
      setTimeout(() => {
        setMessages([
          {
            id: "1",
            sender: "ai",
            text: "Hi there! I'm the WE Ice Cream Truck Concierge. ✨ Tell me a bit about your upcoming event, and I'll recommend the perfect package for you."
          }
        ]);
        setIsTyping(false);
      }, 1000);
    }
  }, [isOpen, messages.length]);

  // Prevent background scrolling when open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputValue.trim() || isTyping) return;

    const userText = inputValue.trim();
    const userMsg: Message = { id: Date.now().toString(), sender: "user", text: userText };
    const updatedMessages = [...messages, userMsg];

    setMessages(updatedMessages);
    setInputValue("");
    setIsTyping(true);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: updatedMessages.map((m) => ({
            role: m.sender === "user" ? "user" : "assistant",
            content: m.text,
          })),
        }),
      });

      const data = await response.json();
      const aiMsg: Message = {
        id: (Date.now() + 1).toString(),
        sender: "ai",
        text: data.message || "I'm having trouble responding right now. Please call us at 617-999-3803!",
      };
      setMessages((prev) => [...prev, aiMsg]);
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          id: (Date.now() + 1).toString(),
          sender: "ai",
          text: "Sorry, I'm experiencing a connection issue. Please call us at 617-999-3803!",
        },
      ]);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-navy/60 backdrop-blur-sm z-50"
          />

          {/* Modal / Sheet */}
          <motion.div
            initial={{ y: "100%", opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: "100%", opacity: 0 }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed bottom-0 left-0 right-0 md:left-auto md:right-4 md:bottom-4 md:w-[450px] h-[85vh] md:h-[600px] bg-white md:rounded-2xl rounded-t-3xl shadow-2xl z-50 flex flex-col overflow-hidden border border-gray-100"
          >
            {/* Header */}
            <div className="px-6 py-4 bg-gradient-to-r from-coral to-coral-dark text-white flex justify-between items-center shadow-md">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center backdrop-blur-md">
                  <Sparkles size={20} className="text-white" />
                </div>
                <div>
                  <h3 className="font-bold text-lg leading-tight">AI Concierge</h3>
                  <p className="text-white/70 text-xs font-medium">WE Ice Cream Truck</p>
                </div>
              </div>
              <button 
                onClick={onClose}
                className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-white/20 transition-colors"
              >
                <X size={20} />
              </button>
            </div>

            {/* Chat Area */}
            <div className="flex-1 overflow-y-auto p-6 flex flex-col gap-4 bg-sand/30">
              {messages.map((msg) => (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  key={msg.id}
                  className={cn(
                    "flex gap-3 max-w-[85%]",
                    msg.sender === "user" ? "self-end flex-row-reverse" : "self-start"
                  )}
                >
                  <div className={cn(
                    "w-8 h-8 rounded-full flex flex-shrink-0 items-center justify-center shadow-sm",
                    msg.sender === "user" ? "bg-navy text-white" : "bg-coral text-white"
                  )}>
                    {msg.sender === "user" ? <User size={14} /> : <Truck size={14} />}
                  </div>
                  <div className={cn(
                    "p-4 rounded-2xl text-sm shadow-sm",
                    msg.sender === "user" 
                      ? "bg-navy text-white rounded-tr-none" 
                      : "bg-white text-charcoal border border-gray-100 rounded-tl-none"
                  )}>
                    {msg.text}
                  </div>
                </motion.div>
              ))}

              {isTyping && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex gap-3 max-w-[85%] self-start"
                >
                  <div className="w-8 h-8 rounded-full bg-coral text-white flex flex-shrink-0 items-center justify-center shadow-sm">
                    <Sparkles size={14} />
                  </div>
                  <div className="p-4 rounded-2xl bg-white border border-gray-100 rounded-tl-none flex items-center gap-1 shadow-sm">
                    <span className="w-2 h-2 rounded-full bg-coral/50 animate-bounce" />
                    <span className="w-2 h-2 rounded-full bg-coral/50 animate-bounce delay-75" />
                    <span className="w-2 h-2 rounded-full bg-coral/50 animate-bounce delay-150" />
                  </div>
                </motion.div>
              )}
            </div>

            {/* Input Area */}
            <div className="p-4 bg-white border-t border-gray-100">
              <form onSubmit={handleSend} className="relative flex items-center">
                <input
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  placeholder="Type your message..."
                  className="w-full pl-6 pr-14 py-4 bg-sand/50 rounded-full text-sm text-charcoal placeholder:text-charcoal/40 focus:outline-none focus:ring-2 focus:ring-coral/20 transition-all"
                />
                <button
                  type="submit"
                  disabled={!inputValue.trim() || isTyping}
                  className="absolute right-2 w-10 h-10 flex items-center justify-center bg-coral text-white rounded-full hover:bg-coral-dark disabled:opacity-50 disabled:hover:bg-coral transition-colors"
                >
                  <Send size={16} className="translate-x-[-1px] translate-y-[1px]" />
                </button>
              </form>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
