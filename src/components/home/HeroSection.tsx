"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { BUSINESS_CONFIG } from "@/lib/config";
import { 
  fadeUp, 
  heroReveal, 
  staggerContainerSlow, 
  floatAnimation, 
  buttonHover 
} from "@/lib/animations";

export default function HeroSection() {
  return (
    <section className="relative w-full h-[100dvh] min-h-[700px] flex items-center justify-center overflow-hidden bg-navy">
      {/* Background Image & Gradient */}
      <div className="absolute inset-0 z-0">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-60 mix-blend-overlay"
          style={{ backgroundImage: `url('/images/hero-cinematic.jpg')` }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-navy via-navy/80 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-navy/90 via-navy/40 to-navy/90" />
      </div>

      {/* Decorative 3D/Floating Elements (CSS only for performance) */}
      <div className="absolute inset-0 z-10 pointer-events-none overflow-hidden">
        <motion.div 
          animate={floatAnimation}
          className="absolute top-[15%] right-[10%] w-32 h-32 md:w-48 md:h-48 opacity-80 blur-[2px]"
          style={{ backgroundImage: `url('/images/3d-cone.png')`, backgroundSize: 'contain', backgroundRepeat: 'no-repeat' }}
        />
        <motion.div 
          animate={{ ...floatAnimation, transition: { duration: 5, repeat: Infinity, ease: [0.4, 0, 0.6, 1] as [number, number, number, number], delay: 1 } }}
          className="absolute bottom-[25%] left-[5%] w-24 h-24 md:w-32 md:h-32 opacity-60 blur-[4px]"
          style={{ backgroundImage: `url('/images/3d-popsicle.png')`, backgroundSize: 'contain', backgroundRepeat: 'no-repeat' }}
        />
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 relative z-20 mt-16">
        <motion.div 
          variants={staggerContainerSlow}
          initial="hidden"
          animate="visible"
          className="max-w-4xl mx-auto text-center"
        >
          {/* Trust Badge */}
          <motion.div variants={fadeUp} className="mb-6 inline-flex items-center">
            <div className="px-5 py-2 rounded-full bg-gold/15 border border-gold/30 glass-dark">
              <span className="text-gold font-bold text-sm tracking-wide flex items-center gap-2">
                <span className="text-lg leading-none">&starf;</span>
                Massachusetts&apos; Most Trusted Ice Cream Truck
              </span>
            </div>
          </motion.div>

          {/* Headline */}
          <motion.h1 
            variants={heroReveal}
            className="text-5xl md:text-7xl lg:text-8xl font-display font-extrabold text-cream leading-[1.1] tracking-tight mb-8"
          >
            Every Event <br />
            <span className="text-coral italic font-light">&amp; Celebration</span><br />
            Deserves a Sweet Moment.
          </motion.h1>

          {/* Subheadline */}
          <motion.p 
            variants={fadeUp}
            className="text-lg md:text-xl text-cream/80 max-w-2xl mx-auto mb-10 text-balance"
          >
            Premium ice cream truck catering across all of Massachusetts. 
            Licensed. Insured. Unforgettable.
          </motion.p>

          {/* CTAs */}
          <motion.div 
            variants={fadeUp}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6"
          >
            <motion.div variants={buttonHover} initial="rest" whileHover="hover" whileTap="tap">
              <Link 
                href="/get-a-quote"
                className="inline-flex items-center justify-center px-8 py-4 bg-coral text-white font-bold text-lg rounded-full shadow-coral-lg min-w-[200px]"
              >
                Get a Free Quote &rarr;
              </Link>
            </motion.div>
            
            <motion.div variants={buttonHover} initial="rest" whileHover="hover" whileTap="tap">
              <Link 
                href="/packages"
                className="inline-flex items-center justify-center px-8 py-4 bg-transparent text-cream font-bold text-lg rounded-full border border-cream/30 hover:bg-cream/10 transition-colors min-w-[200px]"
              >
                View Packages
              </Link>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>

      {/* Trust Marquee (Bottom of Hero) */}
      <div className="absolute bottom-0 left-0 right-0 z-20 bg-navy-mid/80 backdrop-blur-md border-t border-white/5 py-4 overflow-hidden">
        <div className="flex whitespace-nowrap animate-[marquee_30s_linear_infinite]">
          {/* We repeat the content 3 times for a continuous loop effect */}
          {[1, 2, 3].map((i) => (
            <div key={i} className="flex items-center justify-around min-w-full px-8 gap-12">
              <span className="text-cream/80 font-medium text-sm md:text-base flex items-center gap-2">
                <span className="text-gold">&starf;</span> 4.9 Average Rating
              </span>
              <span className="text-coral">&bull;</span>
              <span className="text-cream/80 font-medium text-sm md:text-base">
                {BUSINESS_CONFIG.stats.eventsServed}+ Events Served
              </span>
              <span className="text-coral">&bull;</span>
              <span className="text-cream/80 font-medium text-sm md:text-base">
                100% Licensed &amp; Insured
              </span>
              <span className="text-coral">&bull;</span>
              <span className="text-cream/80 font-medium text-sm md:text-base">
                Serving All of Massachusetts
              </span>
              <span className="text-coral">&bull;</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
