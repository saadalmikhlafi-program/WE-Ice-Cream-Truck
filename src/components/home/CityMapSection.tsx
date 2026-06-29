"use client";

import { useState } from "react";
import Link from "next/link";
import { getTopCities } from "@/lib/cities-data";
import { MapPin, Navigation } from "lucide-react";
import { cn } from "@/lib/utils";

// Approximate coordinates for MA cities on a 1000x600 grid
const cityCoordinates: Record<string, { x: number; y: number }> = {
  boston: { x: 750, y: 250 },
  cambridge: { x: 730, y: 230 },
  worcester: { x: 500, y: 300 },
  springfield: { x: 200, y: 350 },
  somerville: { x: 740, y: 220 },
  framingham: { x: 650, y: 280 },
  newton: { x: 710, y: 260 },
  lowell: { x: 680, y: 150 },
  quincy: { x: 770, y: 290 },
  lynn: { x: 780, y: 210 },
};

export default function CityMapSection() {
  const [hoveredCity, setHoveredCity] = useState<string | null>(null);
  const topCities = getTopCities().filter(city => cityCoordinates[city.slug]);

  return (
    <section className="py-24 md:py-40 bg-navy text-cream relative overflow-hidden">
      {/* Background glow effects */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-coral/5 rounded-full blur-[100px] pointer-events-none" />
      
      <div className="container mx-auto px-6 md:px-12 lg:px-24 relative z-10">
        
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16 md:mb-24">
          <div className="max-w-2xl">
            <h2 className="font-display font-light text-[clamp(3rem,6vw,5.5rem)] leading-[1.05] text-cream mb-6 tracking-tighter">
              Serving All of<br />
              <span className="italic text-coral">Massachusetts</span>
            </h2>
            <p className="font-sans text-cream/70 text-[clamp(1.125rem,1.5vw,1.35rem)] leading-relaxed">
              From the shores of Boston to the heart of Worcester. We bring the celebration to every corner of the Commonwealth.
            </p>
          </div>
          <Link 
            href="/cities" 
            className="font-sans font-bold text-cream uppercase tracking-widest text-[0.75rem] border-b-2 border-cream/20 pb-2 hover:border-coral hover:text-coral transition-colors"
          >
            View all 500+ Cities
          </Link>
        </div>

        {/* Interactive Map Container */}
        <div className="relative w-full max-w-5xl mx-auto aspect-[4/3] md:aspect-[16/9] bg-[#061021] rounded-[2rem] border border-white/5 overflow-hidden shadow-2xl group">
          
          {/* Top Control Bar */}
          <div className="absolute top-0 left-0 w-full p-4 md:p-8 flex justify-between items-center z-20 pointer-events-none">
            <div className="flex items-center gap-3 text-white/50 text-[0.65rem] font-bold tracking-widest uppercase">
              <Navigation size={14} className="text-coral" />
              Live Route Network
            </div>
            <div className="flex items-center gap-3">
              <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
              <span className="text-white/50 text-[0.65rem] font-bold tracking-widest uppercase">System Online</span>
            </div>
          </div>

          {/* Abstract SVG Map Background */}
          <div className="absolute inset-0 pointer-events-none opacity-30 group-hover:opacity-50 transition-opacity duration-1000">
            <svg viewBox="0 0 1000 600" className="w-full h-full">
              {/* Grid Lines */}
              <defs>
                <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                  <path d="M 40 0 L 0 0 0 40" fill="none" stroke="white" strokeWidth="0.5" strokeOpacity="0.1" />
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#grid)" />
              
              {/* Connection Lines (Network) */}
              {topCities.map((city, i) => {
                if (i === 0) return null; // Connect everything to Boston (index 0)
                const boston = cityCoordinates.boston;
                const current = cityCoordinates[city.slug];
                if (!boston || !current) return null;
                return (
                  <path
                    key={`line-${city.slug}`}
                    d={`M ${boston.x} ${boston.y} Q ${(boston.x + current.x)/2} ${(boston.y + current.y)/2 - 50} ${current.x} ${current.y}`}
                    fill="none"
                    stroke="white"
                    strokeWidth="1"
                    strokeOpacity={hoveredCity === city.slug || hoveredCity === 'boston' ? 0.8 : 0.2}
                    className="transition-all duration-500"
                  />
                );
              })}
            </svg>
          </div>

          {/* Interactive City Pins */}
          <div className="absolute inset-0 z-10">
            {topCities.map((city) => {
              const coords = cityCoordinates[city.slug];
              if (!coords) return null;
              
              const isHovered = hoveredCity === city.slug;
              
              return (
                <div 
                  key={city.slug}
                  className="absolute"
                  style={{
                    left: `${(coords.x / 1000) * 100}%`,
                    top: `${(coords.y / 600) * 100}%`,
                    transform: 'translate(-50%, -50%)'
                  }}
                  onMouseEnter={() => setHoveredCity(city.slug)}
                  onMouseLeave={() => setHoveredCity(null)}
                >
                  <Link href={`/cities/${city.slug}`} className="relative group/pin block">
                    {/* Pulsing ring for major cities */}
                    {city.slug === 'boston' && (
                      <div className="absolute inset-0 w-16 h-16 -translate-x-1/2 -translate-y-1/2 left-1/2 top-1/2 rounded-full bg-coral/40 animate-ping" />
                    )}
                    
                    {/* The Pin - INCREASED VISIBILITY */}
                    <div className={cn(
                      "w-4 h-4 rounded-full border-[2px] shadow-[0_0_20px_rgba(255,255,255,1)] transition-all duration-500 relative z-20",
                      isHovered ? "bg-coral scale-[2.5] border-white" : "bg-white border-coral"
                    )} />
                    
                    {/* Tooltip Label */}
                    <div className={cn(
                      "absolute top-full left-1/2 -translate-x-1/2 mt-4 px-4 py-2 rounded-lg bg-white text-navy text-[0.75rem] uppercase tracking-widest font-bold whitespace-nowrap shadow-xl transition-all duration-300 pointer-events-none z-30",
                      isHovered ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-2"
                    )}>
                      {city.name}
                    </div>
                  </Link>
                </div>
              );
            })}
          </div>

          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 text-white/50 text-[0.65rem] font-bold tracking-widest uppercase flex items-center gap-2 pointer-events-none bg-[#061021]/80 px-6 py-2.5 rounded-full backdrop-blur-md border border-white/10 z-20 shadow-xl">
            <MapPin size={12} className="text-coral" /> Hover points to explore
          </div>
        </div>

      </div>
    </section>
  );
}
