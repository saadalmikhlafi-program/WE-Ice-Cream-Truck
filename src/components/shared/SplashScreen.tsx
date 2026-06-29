"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

export default function SplashScreen() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    // Only show splash once per session
    const seen = sessionStorage.getItem("splashSeen");
    if (!seen) {
      setVisible(true);
      sessionStorage.setItem("splashSeen", "true");

      // Auto-dismiss after 2.8 seconds
      const timer = setTimeout(() => {
        setVisible(false);
      }, 2800);

      return () => clearTimeout(timer);
    }
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          key="splash"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.05 }}
          transition={{ duration: 0.6, ease: "easeInOut" }}
          className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-cream"
          onClick={() => setVisible(false)}
        >
          {/* Animated background rings */}
          <motion.div
            className="absolute w-[600px] h-[600px] rounded-full border border-coral/10"
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 1.2, ease: "easeOut" }}
          />
          <motion.div
            className="absolute w-[400px] h-[400px] rounded-full border border-coral/15"
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 1, ease: "easeOut", delay: 0.1 }}
          />
          <motion.div
            className="absolute w-[200px] h-[200px] rounded-full bg-coral/5"
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
          />

          {/* Logo */}
          <motion.div
            className="relative z-10 flex flex-col items-center gap-8"
            initial={{ opacity: 0, scale: 0.7, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.34, 1.56, 0.64, 1], delay: 0.15 }}
          >
            {/* Logo Image */}
            <div className="relative w-48 h-48 md:w-56 md:h-56 rounded-full overflow-hidden shadow-2xl ring-4 ring-white ring-offset-4 ring-offset-cream">
              <Image
                src="/images/we-icecream.jpg"
                alt="WE Ice Cream Truck"
                fill
                className="object-cover"
                priority
              />
            </div>

            {/* Brand name */}
            <motion.div
              className="text-center"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.5 }}
            >
              <p className="font-display font-black text-5xl md:text-6xl text-navy tracking-tight">
                WE<span className="text-coral">.</span>
              </p>
              <p className="font-sans font-bold text-sm tracking-[0.35em] uppercase text-navy/40 mt-2">
                Ice Cream Truck
              </p>
            </motion.div>

            {/* Animated dots loader */}
            <motion.div
              className="flex gap-2 mt-2"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
            >
              {[0, 1, 2].map((i) => (
                <motion.div
                  key={i}
                  className="w-2 h-2 rounded-full bg-coral"
                  animate={{ y: [0, -8, 0], opacity: [0.4, 1, 0.4] }}
                  transition={{
                    duration: 0.8,
                    repeat: Infinity,
                    delay: i * 0.15,
                    ease: "easeInOut",
                  }}
                />
              ))}
            </motion.div>
          </motion.div>

          {/* Tap to skip hint */}
          <motion.p
            className="absolute bottom-10 text-navy/30 text-sm font-medium tracking-wider"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2 }}
          >
            Tap anywhere to skip
          </motion.p>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
