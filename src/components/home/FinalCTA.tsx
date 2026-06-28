"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import AnimatedSection from "@/components/shared/AnimatedSection";
import { fadeUp } from "@/lib/animations";
import { BUSINESS_CONFIG } from "@/lib/config";
import { Calendar, Phone } from "lucide-react";

export default function FinalCTA() {
  return (
    <section className="relative py-32 bg-navy flex items-center justify-center overflow-hidden">
      {/* Background Image & Overlay */}
      <div className="absolute inset-0 z-0">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-40 mix-blend-overlay"
          // Placeholder image - replace with actual Cloudinary asset
          style={{ backgroundImage: `url('/images/final-cta-bg.jpg')` }}
        />
        <div className="absolute inset-0 bg-navy/70 backdrop-blur-sm" />
      </div>

      <div className="container mx-auto px-4 relative z-10 text-center">
        <AnimatedSection className="max-w-3xl mx-auto">
          <h2 className="text-5xl md:text-6xl font-display font-bold text-cream leading-tight mb-6">
            Ready to Make It <span className="text-coral italic font-light">Unforgettable?</span>
          </h2>
          
          <p className="text-xl text-cream/80 mb-8 max-w-2xl mx-auto">
            Join {BUSINESS_CONFIG.stats.eventsServed}+ families who trusted {BUSINESS_CONFIG.name} for their most special moments.
          </p>

          <motion.div 
            variants={fadeUp}
            className="flex items-center justify-center gap-2 mb-10 text-gold font-bold bg-navy-mid/50 border border-gold/20 inline-flex px-6 py-3 rounded-full backdrop-blur-md"
          >
            <Calendar size={20} />
            Summer dates are filling up fast.
          </motion.div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6">
            <Link 
              href="/get-a-quote"
              className="w-full sm:w-auto inline-flex items-center justify-center px-8 py-4 bg-coral text-white font-bold text-lg rounded-full shadow-coral-lg hover:bg-coral-dark hover:scale-105 transition-all min-w-[220px]"
            >
              Get a Free Quote &rarr;
            </Link>
            
            <a 
              href={`tel:${BUSINESS_CONFIG.contact.phone1Formatted}`}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-3 px-8 py-4 bg-white/10 text-cream font-bold text-lg rounded-full backdrop-blur-md border border-white/20 hover:bg-white/20 transition-all min-w-[220px]"
            >
              <Phone size={20} />
              {BUSINESS_CONFIG.contact.phone1}
            </a>
          </div>
        </AnimatedSection>
      </div>

      {/* Confetti / Particle effect container (placeholder for 3D/canvas implementation) */}
      <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden opacity-30" />
    </section>
  );
}
