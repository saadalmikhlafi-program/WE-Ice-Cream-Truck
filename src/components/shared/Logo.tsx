import React from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";

interface LogoProps {
  className?: string;
  variant?: "dark" | "light"; 
  forceColor?: string; 
}

export default function Logo({ className }: LogoProps) {
  return (
    <div className={cn("flex items-center gap-3", className)}>
      <div className="relative w-12 h-12 md:w-16 md:h-16 rounded-full overflow-hidden border-2 border-cream shadow-sm">
        <Image
          src="/images/we-icecream.jpg"
          alt="WE Ice Cream Truck Logo"
          fill
          className="object-cover"
          sizes="(max-width: 768px) 48px, 64px"
          priority
        />
      </div>
      <div className="flex flex-col justify-center">
        <span className="font-display font-black leading-none tracking-tight text-xl md:text-2xl text-navy">
          WE<span className="text-coral">.</span>
        </span>
        <span className="font-sans text-[0.6rem] md:text-[0.65rem] font-bold tracking-[0.2em] uppercase leading-none mt-1 text-gold">
          Ice Cream Truck
        </span>
      </div>
    </div>
  );
}
