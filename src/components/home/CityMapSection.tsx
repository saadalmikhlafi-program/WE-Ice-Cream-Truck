"use client";

import { useState } from "react";
import Link from "next/link";
import { getTopCities, MASSACHUSETTS_CITIES } from "@/lib/cities-data";
import { MapPin, Navigation } from "lucide-react";
import { cn } from "@/lib/utils";

// Bounding box for Massachusetts
const MA_BOUNDS = {
  minLng: -73.5,
  maxLng: -69.9,
  minLat: 41.2,
  maxLat: 42.9,
};

function getMapCoords(lat: number, lng: number) {
  const x = ((lng - MA_BOUNDS.minLng) / (MA_BOUNDS.maxLng - MA_BOUNDS.minLng)) * 100;
  const y = 100 - ((lat - MA_BOUNDS.minLat) / (MA_BOUNDS.maxLat - MA_BOUNDS.minLat)) * 100;
  return { x, y };
}

export default function CityMapSection() {
  const [hoveredCity, setHoveredCity] = useState<string | null>(null);
  
  // All cities for the dots
  const allCities = MASSACHUSETTS_CITIES;
  // Top cities for the network lines
  const topCities = getTopCities();
  const boston = allCities.find(c => c.slug === "boston");

  return (
    <section className="py-24 md:py-40 bg-navy/80 backdrop-blur-2xl text-cream relative overflow-hidden">
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

          {/* Connection Lines (Network) */}
          <div className="absolute inset-0 pointer-events-none opacity-40 group-hover:opacity-70 transition-opacity duration-1000">
            <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="w-full h-full">
              {/* Grid Lines */}
              <defs>
                <pattern id="grid" width="4" height="4" patternUnits="userSpaceOnUse">
                  <path d="M 4 0 L 0 0 0 4" fill="none" stroke="white" strokeWidth="0.05" strokeOpacity="0.1" />
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#grid)" />
              
              {/* Lines from Boston to top cities */}
              {boston && topCities.map((city) => {
                if (city.slug === "boston") return null;
                const bCoords = getMapCoords(boston.lat, boston.lng);
                const cCoords = getMapCoords(city.lat, city.lng);
                
                return (
                  <path
                    key={`line-${city.slug}`}
                    d={`M ${bCoords.x} ${bCoords.y} Q ${(bCoords.x + cCoords.x)/2} ${(bCoords.y + cCoords.y)/2 - 5} ${cCoords.x} ${cCoords.y}`}
                    fill="none"
                    stroke="white"
                    strokeWidth="0.1"
                    strokeOpacity={hoveredCity === city.slug || hoveredCity === 'boston' ? 0.8 : 0.2}
                    className="transition-all duration-500"
                  />
                );
              })}
            </svg>
          </div>

          {/* Interactive City Pins */}
          <div className="absolute inset-0 z-10">
            {allCities.map((city) => {
              const coords = getMapCoords(city.lat, city.lng);
              const isHovered = hoveredCity === city.slug;
              const isBoston = city.slug === "boston";
              const isTop = city.isTopCity;
              
              return (
                <div 
                  key={city.slug}
                  className="absolute"
                  style={{
                    left: `${coords.x}%`,
                    top: `${coords.y}%`,
                    transform: 'translate(-50%, -50%)',
                    zIndex: isHovered ? 50 : isBoston ? 40 : isTop ? 30 : 10
                  }}
                  onMouseEnter={() => setHoveredCity(city.slug)}
                  onMouseLeave={() => setHoveredCity(null)}
                >
                  <Link href={`/cities/${city.slug}`} className="relative group/pin block">
                    {/* HQ Marker for Boston */}
                    {isBoston && (
                      <div className="absolute inset-0 w-12 h-12 -translate-x-1/2 -translate-y-1/2 left-1/2 top-1/2 rounded-full bg-coral/40 animate-ping" />
                    )}
                    
                    {/* The Pin */}
                    <div className={cn(
                      "rounded-full transition-all duration-500 relative z-20",
                      isBoston 
                        ? "w-4 h-4 bg-coral border-2 border-white shadow-[0_0_20px_rgba(255,255,255,1)] scale-[1.5]" 
                        : isHovered
                          ? "w-4 h-4 bg-coral scale-[2] border-2 border-white shadow-[0_0_15px_rgba(255,255,255,0.8)]"
                          : isTop
                            ? "w-2.5 h-2.5 bg-white border border-coral/50"
                            : "w-1 h-1 bg-white/30" // Tiny dots for the remaining hundreds of cities
                    )} />
                    
                    {/* Tooltip Label */}
                    <div className={cn(
                      "absolute top-full left-1/2 -translate-x-1/2 mt-2 px-3 py-1.5 rounded-md bg-white text-navy text-[0.65rem] uppercase tracking-widest font-bold whitespace-nowrap shadow-xl transition-all duration-200 pointer-events-none z-30",
                      isHovered ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-2",
                      isBoston && !hoveredCity && "opacity-100 translate-y-0 bg-transparent text-white shadow-none text-[0.5rem] -mt-1" // Always show "BOSTON HQ" faintly
                    )}>
                      {isBoston && !hoveredCity ? "Boston HQ" : city.name}
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
