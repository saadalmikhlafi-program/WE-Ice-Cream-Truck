"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

export default function SplashScreen() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const seen = sessionStorage.getItem("splashSeen");
    if (!seen) {
      setVisible(true);
      sessionStorage.setItem("splashSeen", "true");
      const timer = setTimeout(() => setVisible(false), 2800);
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
          className="fixed inset-0 z-[9999] flex flex-col items-center justify-center"
          style={{ background: "linear-gradient(135deg, #0A1128 0%, #001a4c 50%, #0A1128 100%)" }}
          onClick={() => setVisible(false)}
        >
          {/* Animated background rings — gold themed */}
          <motion.div
            className="absolute w-[600px] h-[600px] rounded-full"
            style={{ border: "1px solid rgba(212,175,55,0.12)" }}
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 1.2, ease: "easeOut" }}
          />
          <motion.div
            className="absolute w-[400px] h-[400px] rounded-full"
            style={{ border: "1px solid rgba(212,175,55,0.18)" }}
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 1, ease: "easeOut", delay: 0.1 }}
          />
          <motion.div
            className="absolute w-[200px] h-[200px] rounded-full"
            style={{ background: "rgba(212,175,55,0.06)" }}
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
            <div className="relative w-48 h-48 md:w-56 md:h-56 rounded-full overflow-hidden shadow-2xl"
              style={{ boxShadow: "0 0 60px rgba(212,175,55,0.25), 0 20px 40px rgba(0,0,0,0.3)", border: "3px solid rgba(212,175,55,0.4)" }}
            >
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
              <p className="font-display font-black text-5xl md:text-6xl text-white tracking-tight">
                WE<span style={{ color: "#D4AF37" }}>.</span>
              </p>
              <p className="font-sans font-bold text-sm tracking-[0.35em] uppercase mt-2"
                style={{ color: "rgba(212,175,55,0.7)" }}
              >
                Ice Cream Truck
              </p>
            </motion.div>

            {/* Animated dots loader — gold */}
            <motion.div
              className="flex gap-2 mt-2"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
            >
              {[0, 1, 2].map((i) => (
                <motion.div
                  key={i}
                  className="w-2 h-2 rounded-full"
                  style={{ backgroundColor: "#D4AF37" }}
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
            className="absolute bottom-10 text-sm font-medium tracking-wider"
            style={{ color: "rgba(255,255,255,0.25)" }}
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
