import React from "react";
import { cn } from "@/lib/utils";

interface LogoProps {
  className?: string;
  variant?: "dark" | "light"; // Semantic meaning: dark means "dark text for light bg", light means "light text for dark bg"
  forceColor?: string; // If you need absolute control (e.g. over a photo)
}

export default function Logo({ className, variant = "dark", forceColor }: LogoProps) {
  // If forceColor is provided, use it. Otherwise, rely on the variant.
  // variant="dark" -> we want dark text (Navy)
  // variant="light" -> we want light text (Cream/White)
  const isDarkText = variant === "dark";
  const primaryColor = forceColor || (isDarkText ? "#0A192F" : "#FDFBF7");
  
  // The accent colors remain the same, though you could adapt them if needed.
  const accentColor = "#FF6B6B"; // Coral
  const goldColor = "#D4AF37"; // Gold

  return (
    <div className={cn("flex items-center gap-3", className)}>
      {/* Premium Emblem */}
      <svg
        width="40"
        height="40"
        viewBox="0 0 100 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="shrink-0"
      >
        {/* Background Hexagon Shield */}
        <path
          d="M50 4L90 27V73L50 96L10 73V27L50 4Z"
          fill={primaryColor}
          fillOpacity="0.05"
          stroke={goldColor}
          strokeWidth="3"
        />
        <path
          d="M50 10L84 29.5V70.5L50 90L16 70.5V29.5L50 10Z"
          stroke={primaryColor}
          strokeWidth="1.5"
          strokeOpacity="0.3"
        />
        
        {/* Abstract Waffle Cone */}
        <path
          d="M30 45L50 80L70 45"
          stroke={goldColor}
          strokeWidth="4"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M40 45L50 63L60 45"
          stroke={goldColor}
          strokeWidth="2"
          strokeOpacity="0.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        {/* Ice Cream Scoops */}
        <circle cx="50" cy="35" r="14" fill={accentColor} />
        <circle cx="58" cy="40" r="10" fill={goldColor} />
        <circle cx="42" cy="40" r="10" fill={primaryColor} />

        {/* Sparkle */}
        <path
          d="M75 20L78 27L85 30L78 33L75 40L72 33L65 30L72 27L75 20Z"
          fill={goldColor}
        />
      </svg>

      {/* Typography */}
      <div className="flex flex-col justify-center">
        <span
          className="font-display font-black leading-none tracking-tight text-xl md:text-2xl"
          style={{ color: primaryColor }}
        >
          WE<span style={{ color: accentColor }}>.</span>
        </span>
        <span
          className="font-sans text-[0.6rem] md:text-[0.65rem] font-bold tracking-[0.2em] uppercase leading-none mt-1"
          style={{ color: goldColor }}
        >
          Ice Cream Truck
        </span>
      </div>
    </div>
  );
}
