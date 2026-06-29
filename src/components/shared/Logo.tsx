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
    <div className={cn("flex items-center", className)}>
      <div className="relative w-14 h-14 md:w-16 md:h-16 rounded-full overflow-hidden shadow-md">
        <Image
          src="/images/we-icecream.jpg"
          alt="WE Ice Cream Truck Logo"
          fill
          className="object-cover"
          sizes="(max-width: 768px) 56px, 64px"
          priority
        />
      </div>
    </div>
  );
}

