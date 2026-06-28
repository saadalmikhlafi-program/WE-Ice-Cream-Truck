"use client";

import { useState } from "react";
import { Sparkles } from "lucide-react";
import AIConciergeModal from "@/components/shared/AIConciergeModal";

export default function AIConciergeTeaser() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <section className="py-24 md:py-40 bg-sand relative overflow-hidden">
      <div className="container mx-auto px-6 md:px-12 lg:px-24">
        
        <div className="max-w-6xl mx-auto bg-navy text-cream rounded-[3rem] p-10 md:p-16 lg:p-24 flex flex-col md:flex-row items-start md:items-center justify-between gap-12 lg:gap-24 relative overflow-hidden group">
          
          {/* Subtle Background Accent */}
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-coral/10 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/3 transition-transform duration-1000 group-hover:scale-150" />

          {/* Content Area */}
          <div className="flex-1 relative z-10">
            <div className="flex items-center gap-3 mb-6">
              <Sparkles className="w-5 h-5 text-coral" />
              <span className="font-sans font-bold tracking-widest uppercase text-coral text-[0.7rem]">
                AI Event Concierge
              </span>
            </div>
            
            <h2 className="text-[clamp(3rem,5vw,4.5rem)] font-display font-light mb-6 tracking-tighter leading-[1.05]">
              Not Sure Which <br />
              <span className="italic font-light">Package to Choose?</span>
            </h2>
            
            <p className="font-sans text-cream/70 text-[clamp(1.125rem,1.5vw,1.35rem)] leading-relaxed max-w-xl mb-10">
              Our AI concierge will analyze your guest count and budget to find your perfect match in 60 seconds — and even fill out your quote form automatically.
            </p>
            
            <div className="flex flex-col sm:flex-row items-center gap-6">
              <button 
                onClick={() => setIsModalOpen(true)}
                className="w-full sm:w-auto px-10 py-5 bg-coral text-white font-sans font-bold text-[0.85rem] tracking-widest uppercase rounded-full hover:bg-white hover:text-navy transition-colors duration-300 shadow-coral"
              >
                Launch Concierge
              </button>
            </div>
          </div>

        </div>
      </div>

      <AIConciergeModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </section>
  );
}
