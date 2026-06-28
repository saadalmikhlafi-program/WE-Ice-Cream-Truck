"use client";

import { useState } from "react";
import { X, Calendar } from "lucide-react";

export default function SeasonalBanner() {
  const [isVisible, setIsVisible] = useState(true);

  if (!isVisible) return null;

  return (
    <div className="bg-coral text-white py-2 px-4 relative z-50">
      <div className="container mx-auto flex items-center justify-center gap-4 text-xs md:text-sm font-semibold text-center">
        <Calendar size={16} className="hidden sm:block" />
        <p>
          <span className="opacity-90">Summer Booking Special:</span> Book your July/August event before Friday and get a free customized digital photo gallery!
        </p>
        <button 
          onClick={() => setIsVisible(false)}
          className="absolute right-4 top-1/2 -translate-y-1/2 p-1 hover:bg-white/20 rounded-full transition-colors"
          aria-label="Close banner"
        >
          <X size={16} />
        </button>
      </div>
    </div>
  );
}
