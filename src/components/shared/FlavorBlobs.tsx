"use client";

import { useEffect, useState } from "react";

export default function FlavorBlobs() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden bg-cream">
      {/* Strawberry Scoop Blob */}
      <div 
        className="absolute top-[-5%] left-[-5%] w-[40vw] h-[40vw] min-w-[250px] min-h-[250px] bg-coral/20 rounded-full blur-[60px] md:blur-[80px] animate-blob transform-gpu" 
        style={{ animationDuration: '20s' }}
      />
      
      {/* Mint Scoop Blob */}
      <div 
        className="absolute top-[20%] right-[-10%] w-[35vw] h-[35vw] min-w-[200px] min-h-[200px] bg-mint/20 rounded-full blur-[70px] md:blur-[100px] animate-blob animation-delay-2000 transform-gpu" 
        style={{ animationDuration: '25s' }}
      />
      
      {/* Blueberry Scoop Blob */}
      <div 
        className="absolute bottom-[5%] left-[5%] w-[45vw] h-[45vw] min-w-[250px] min-h-[250px] bg-blue-400/20 rounded-full blur-[80px] md:blur-[120px] animate-blob animation-delay-4000 transform-gpu" 
        style={{ animationDuration: '22s' }}
      />

      {/* Vanilla Scoop Blob */}
      <div 
        className="absolute bottom-[20%] right-[10%] w-[30vw] h-[30vw] min-w-[150px] min-h-[150px] bg-gold/20 rounded-full blur-[60px] md:blur-[90px] animate-blob animation-delay-6000 transform-gpu" 
        style={{ animationDuration: '18s' }}
      />

      {/* Melting Drip 1 */}
      <svg 
        className="absolute top-0 left-[15%] w-64 h-64 text-coral/10 drop-shadow-xl" 
        viewBox="0 0 200 200" 
        xmlns="http://www.w3.org/2000/svg"
      >
        <path fill="currentColor" d="M0,-100 C30,-100 50,20 100,50 C150,80 180,-100 200,-100 Z" />
      </svg>

      {/* Melting Drip 2 */}
      <svg 
        className="absolute top-0 right-[25%] w-96 h-96 text-mint/10 drop-shadow-xl" 
        viewBox="0 0 200 200" 
        xmlns="http://www.w3.org/2000/svg"
      >
        <path fill="currentColor" d="M0,-100 C40,-100 60,40 100,60 C140,80 160,-100 200,-100 Z" />
      </svg>
      
      {/* Melting Drip 3 */}
      <svg 
        className="absolute top-0 right-[5%] w-48 h-48 text-blue-400/10 drop-shadow-xl" 
        viewBox="0 0 200 200" 
        xmlns="http://www.w3.org/2000/svg"
      >
        <path fill="currentColor" d="M0,-100 C20,-100 40,10 100,30 C160,50 180,-100 200,-100 Z" />
      </svg>
    </div>
  );
}
