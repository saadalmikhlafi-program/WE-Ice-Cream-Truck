"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";

export default function FloatingQuoteButton() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Show button after scrolling past the first section (approx 600px)
    const handleScroll = () => {
      if (window.scrollY > 600) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <Link
      href="/get-a-quote"
      className={cn(
        "fixed bottom-20 md:bottom-8 right-4 md:right-8 z-40",
        "px-6 py-3 bg-coral text-white font-bold rounded-full shadow-coral-lg",
        "transition-all duration-500 ease-spring",
        "hover:bg-coral-dark hover:scale-105 active:scale-95",
        // Mobile layout adjustment so it doesn't overlap with bottom nav
        isVisible
          ? "translate-y-0 opacity-100"
          : "translate-y-12 opacity-0 pointer-events-none"
      )}
    >
      Get a Quote &rarr;
    </Link>
  );
}
