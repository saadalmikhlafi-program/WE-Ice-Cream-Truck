"use client";

import { useRef, ReactNode } from "react";
import { motion, useInView, Variants } from "framer-motion";
import { fadeUp, scrollViewport } from "@/lib/animations";
import { cn } from "@/lib/utils";

interface AnimatedSectionProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  variants?: Variants;
  id?: string;
}

export default function AnimatedSection({
  children,
  className,
  delay = 0,
  variants = fadeUp,
  id,
}: AnimatedSectionProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, scrollViewport);

  return (
    <motion.section
      id={id}
      ref={ref}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={variants}
      transition={{ delay }}
      className={cn("w-full", className)}
    >
      {children}
    </motion.section>
  );
}
