"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import AnimatedSection from "@/components/shared/AnimatedSection";
import { Sparkles } from "lucide-react";
import AIConciergeModal from "@/components/shared/AIConciergeModal";

export default function AIConciergeTeaser() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <section className="py-24 bg-gradient-to-br from-coral to-coral-dark text-white relative overflow-hidden">
      {/* Decorative background patterns */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-white rounded-full blur-3xl -translate-y-1/2 translate-x-1/3" />
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-white rounded-full blur-3xl translate-y-1/2 -translate-x-1/3" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <AnimatedSection className="max-w-4xl mx-auto bg-white/10 backdrop-blur-md border border-white/20 rounded-[2rem] p-8 md:p-12 flex flex-col md:flex-row items-center gap-8 md:gap-12 shadow-2xl">
          
          {/* Icon Area */}
          <motion.div 
            initial={{ scale: 0.8, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ type: "spring", bounce: 0.5, duration: 0.8 }}
            className="w-24 h-24 md:w-32 md:h-32 shrink-0 rounded-full bg-white text-coral flex items-center justify-center shadow-lg"
          >
            <Sparkles size={48} strokeWidth={1.5} />
          </motion.div>

          {/* Content Area */}
          <div className="flex-1 text-center md:text-left">
            <h2 className="text-3xl md:text-4xl font-display font-bold mb-4">
              Not Sure Which Package?
            </h2>
            <p className="text-white/90 text-lg mb-8 max-w-lg mx-auto md:mx-0">
              Our AI Event Concierge will find your perfect match in 60 seconds — and even fill out your quote form automatically.
            </p>
            
            <div className="flex flex-col sm:flex-row items-center gap-4">
              <button 
                onClick={() => setIsModalOpen(true)}
                className="w-full sm:w-auto px-8 py-4 bg-white text-coral font-bold rounded-full hover:bg-cream hover:scale-105 transition-all shadow-md"
              >
                Try the AI Concierge &rarr;
              </button>
              <span className="text-white/70 text-sm font-medium">
                No sign-up required. Instant results.
              </span>
            </div>
          </div>

        </AnimatedSection>
      </div>

      <AIConciergeModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </section>
  );
}
