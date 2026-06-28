"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import AnimatedSection from "@/components/shared/AnimatedSection";
import { fadeUp, pulseAnimation } from "@/lib/animations";
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
    <section className="py-24 bg-navy text-cream relative overflow-hidden">
      {/* Background glow effects */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-coral/5 rounded-full blur-[100px] pointer-events-none" />
      
      <div className="container mx-auto px-4 relative z-10">
        <AnimatedSection className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-4xl md:text-5xl font-display font-bold mb-4">
            Serving All of Massachusetts
          </h2>
          <p className="text-cream/70 text-lg mb-8">
            From the shores of Boston to the heart of Worcester. We bring the celebration to every corner of the Commonwealth.
          </p>
          <Link 
            href="/cities" 
            className="inline-block px-8 py-4 bg-white text-navy font-bold rounded-full hover:bg-cream hover:scale-105 transition-all duration-300 shadow-xl"
          >
            View all 140+ Cities &rarr;
          </Link>
        </AnimatedSection>

        {/* Interactive Map Container */}
        <div className="relative w-full max-w-5xl mx-auto aspect-[4/3] md:aspect-[16/9] bg-[#061021] rounded-[2rem] border border-white/10 overflow-hidden shadow-2xl group">
          
          {/* Top Control Bar */}
          <div className="absolute top-0 left-0 w-full p-4 md:p-6 flex justify-between items-center z-20 pointer-events-none">
            <div className="flex items-center gap-2 text-white/50 text-sm font-semibold tracking-widest uppercase">
              <Navigation size={16} className="text-coral" />
              Live Route Network
            </div>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
              <span className="text-white/50 text-xs font-mono">SYSTEM ONLINE</span>
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
              
              {/* Simplified MA State Outline / Abstract Coastline */}
              <path 
                d="M 100 200 L 250 150 L 400 180 L 600 120 L 750 150 L 850 100 L 900 250 L 950 350 L 850 450 L 750 400 L 600 450 L 400 400 L 250 450 L 100 400 Z"
                fill="none"
                stroke="#FF6B6B"
                strokeWidth="2"
                strokeOpacity="0.2"
                strokeDasharray="4 4"
              />
              
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
                    strokeOpacity={hoveredCity === city.slug || hoveredCity === 'boston' ? 0.4 : 0.05}
                    className="transition-all duration-300"
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
                      <motion.div 
                        animate={pulseAnimation}
                        className="absolute inset-0 w-12 h-12 -translate-x-1/2 -translate-y-1/2 left-1/2 top-1/2 rounded-full bg-coral/20"
                      />
                    )}
                    
                    {/* The Pin */}
                    <div className={cn(
                      "w-4 h-4 rounded-full border-2 border-white shadow-[0_0_15px_rgba(255,255,255,0.5)] transition-all duration-300",
                      isHovered ? "bg-coral scale-150" : "bg-navy"
                    )} />
                    
                    {/* Tooltip Label */}
                    <div className={cn(
                      "absolute top-full left-1/2 -translate-x-1/2 mt-3 px-3 py-1.5 rounded-md bg-white text-navy text-sm font-bold whitespace-nowrap shadow-xl transition-all duration-300 pointer-events-none",
                      isHovered ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-2"
                    )}>
                      {city.name}
                      <div className="absolute -top-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-white rotate-45" />
                    </div>
                  </Link>
                </div>
              );
            })}
          </div>

          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-white/30 text-xs tracking-widest uppercase flex items-center gap-2 pointer-events-none bg-navy/50 px-4 py-2 rounded-full backdrop-blur-md">
            <MapPin size={12} /> Hover points to explore
          </div>
        </div>

        {/* Cloud tags for remaining cities */}
        <AnimatedSection variants={fadeUp} className="mt-12 text-center max-w-4xl mx-auto">
          <p className="text-cream/40 text-sm leading-loose">
            Also serving: Brockton &bull; Plymouth &bull; Weymouth &bull; Peabody &bull; Revere &bull; Malden &bull; Brookline &bull; Medford &bull; Waltham &bull; and more...
          </p>
        </AnimatedSection>
      </div>
    </section>
  );
}
