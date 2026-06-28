"use client";

import { motion } from "framer-motion";
import CountUp from "@/components/shared/CountUp";
import AnimatedSection from "@/components/shared/AnimatedSection";
import { staggerContainer, fadeUp } from "@/lib/animations";
import { BUSINESS_CONFIG } from "@/lib/config";

export default function TrustStats() {
  const stats = [
    { value: BUSINESS_CONFIG.stats.eventsServed, suffix: "+", label: "Events Served" },
    { value: BUSINESS_CONFIG.stats.rating, suffix: "★", label: "Average Rating", decimals: 1 },
    { value: BUSINESS_CONFIG.stats.citiesServed, suffix: "+", label: "Cities Served" },
    { value: BUSINESS_CONFIG.stats.satisfactionRate, suffix: "%", label: "Licensed & Insured" },
  ];

  return (
    <AnimatedSection className="py-20 bg-cream">
      <div className="container mx-auto px-4">
        <motion.div 
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8"
        >
          {stats.map((stat, index) => (
            <motion.div 
              key={index}
              variants={fadeUp}
              className="bg-white rounded-3xl p-6 md:p-8 text-center shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="text-4xl md:text-5xl font-display font-extrabold text-coral mb-2">
                <CountUp 
                  end={stat.value} 
                  suffix={stat.suffix} 
                  decimals={stat.decimals}
                  duration={2.5}
                />
              </div>
              <p className="text-charcoal font-semibold text-sm md:text-base">
                {stat.label}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </AnimatedSection>
  );
}
