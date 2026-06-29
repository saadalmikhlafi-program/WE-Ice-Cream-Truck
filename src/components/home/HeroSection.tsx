"use client";

import Link from "next/link";
import Image from "next/image";
import { BUSINESS_CONFIG } from "@/lib/config";
import { ArrowRight, Star } from "lucide-react";
import { motion } from "framer-motion";
import confetti from "canvas-confetti";

export default function HeroSection() {
  const handleConfetti = () => {
    confetti({
      particleCount: 150,
      spread: 70,
      origin: { y: 0.6 },
      colors: ["#FF6B6B", "#D4AF37", "#0A192F", "#FDFBF7"],
    });
  };

  return (
    <section className="relative w-full min-h-[95svh] flex flex-col justify-center overflow-hidden bg-cream pt-[120px] pb-10">
      
      <div className="container mx-auto px-6 md:px-12 lg:px-24 relative z-20 flex flex-col lg:flex-row items-center gap-16">
        
        {/* Left Content */}
        <div className="flex-1 flex flex-col justify-center text-center lg:text-left">
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-8 flex items-center justify-center lg:justify-start gap-4"
          >
            <div className="h-[2px] w-12 bg-coral rounded-full" />
            <span className="text-navy/80 font-bold tracking-widest text-sm uppercase">
              Boston's Favorite Ice Cream Truck
            </span>
          </motion.div>

          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="font-display font-black text-navy leading-[1.05] text-[clamp(3.5rem,8vw,7rem)] mb-6"
          >
            Bring the <span className="text-coral">Joy</span> to Your Next Event!
          </motion.h1>

          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-navy/70 font-medium text-[clamp(1.125rem,2vw,1.3rem)] leading-relaxed max-w-xl mx-auto lg:mx-0 mb-10"
          >
            Whether it's a birthday, corporate event, or a wedding, we serve premium ice cream with a smile across all of Massachusetts.
          </motion.p>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-6"
          >
            <Link 
              href="/get-a-quote"
              onMouseEnter={handleConfetti}
              onClick={handleConfetti}
              className="group relative inline-flex items-center justify-center px-10 py-5 bg-coral text-white font-black text-lg rounded-full overflow-hidden transition-all hover:scale-[1.05] active:scale-[0.95] shadow-[0_10px_30px_-10px_rgba(255,107,107,0.6)]"
            >
              <span className="relative z-10 flex items-center gap-2">
                Book Us Now
                <ArrowRight className="w-6 h-6 transition-transform group-hover:translate-x-2" />
              </span>
            </Link>
            
            <Link 
              href="/packages"
              className="inline-flex items-center justify-center px-10 py-5 bg-white text-navy font-bold text-lg rounded-full border-2 border-transparent hover:border-navy/10 shadow-sm transition-all hover:shadow-md"
            >
              See Packages
            </Link>
          </motion.div>
        </div>

        {/* Right Photo Collage */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="flex-1 w-full max-w-2xl relative"
        >
          {/* Main Photo */}
          <div className="relative aspect-square w-full rounded-3xl overflow-hidden border-8 border-white shadow-2xl rotate-2 hover:rotate-0 transition-transform duration-500 z-20">
            <Image 
              src="/images/fundraise.jpg" 
              alt="Happy kids with ice cream" 
              fill
              className="object-cover"
              priority
            />
          </div>
          
          {/* Secondary Photo 1 */}
          <div className="absolute -bottom-10 -left-10 w-2/3 aspect-[4/3] rounded-3xl overflow-hidden border-8 border-white shadow-xl -rotate-6 hover:-rotate-2 transition-transform duration-500 z-30 hidden md:block">
            <Image 
              src="/images/marketing-events.jpg" 
              alt="Ice cream truck event" 
              fill
              className="object-cover"
            />
          </div>

          {/* Secondary Photo 2 */}
          <div className="absolute -top-10 -right-10 w-1/2 aspect-square rounded-full overflow-hidden border-8 border-white shadow-xl rotate-12 hover:rotate-6 transition-transform duration-500 z-10 hidden md:block">
            <Image 
              src="/images/launch-parties.jpg" 
              alt="Delicious ice cream" 
              fill
              className="object-cover"
            />
          </div>
          
          {/* Floating Element */}
          <motion.div 
            animate={{ y: [0, -15, 0] }}
            transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
            className="absolute top-10 -left-5 bg-white py-3 px-6 rounded-full shadow-lg z-40 flex items-center gap-2 border-2 border-gold/20"
          >
            <div className="flex text-gold">
              {[...Array(5)].map((_, i) => <Star key={i} className="w-4 h-4 fill-current" />)}
            </div>
            <span className="font-bold text-navy">500+ Events</span>
          </motion.div>
        </motion.div>
      </div>

      {/* Trust Marquee (Playful) */}
      <div className="w-full bg-navy py-4 mt-20 overflow-hidden shadow-inner">
        <div className="flex whitespace-nowrap animate-marquee">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div key={i} className="flex items-center justify-around min-w-full px-8 gap-8">
              <span className="text-white font-bold tracking-widest uppercase flex items-center gap-4 text-sm">
                🎉 Birthdays
              </span>
              <span className="text-white/30 text-xl">&bull;</span>
              <span className="text-white font-bold tracking-widest uppercase flex items-center gap-4 text-sm">
                🏢 Corporate Events
              </span>
              <span className="text-white/30 text-xl">&bull;</span>
              <span className="text-white font-bold tracking-widest uppercase flex items-center gap-4 text-sm">
                🏫 School Events
              </span>
              <span className="text-white/30 text-xl">&bull;</span>
              <span className="text-white font-bold tracking-widest uppercase flex items-center gap-4 text-sm">
                💍 Weddings
              </span>
              <span className="text-white/30 text-xl">&bull;</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
