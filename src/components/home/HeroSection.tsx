import Link from "next/link";
import { BUSINESS_CONFIG } from "@/lib/config";
import { ArrowRight } from "lucide-react";

export default function HeroSection() {
  return (
    <section className="relative w-full min-h-[90svh] flex flex-col justify-end overflow-hidden bg-cream pt-[120px]">
      
      {/* Editorial Content Layout */}
      <div className="container mx-auto px-6 md:px-12 lg:px-24 flex-1 flex flex-col justify-center relative z-20 pb-20 md:pb-32">
        
        {/* Top Minimalist Trust Badge */}
        <div className="mb-8 md:mb-12 flex items-center gap-4">
          <div className="h-[1px] w-12 bg-navy/20" />
          <span className="text-navy/60 font-semibold tracking-widest text-xs uppercase">
            Est. {new Date().getFullYear() - BUSINESS_CONFIG.stats.yearsInBusiness} — Massachusetts
          </span>
        </div>

        {/* Massive Fluid Typography Headline */}
        <h1 className="font-sans text-navy font-semibold tracking-tighter leading-[0.95] text-[clamp(3.5rem,10vw,8.5rem)] max-w-6xl mb-8">
          Every Event <br />
          <span className="font-display italic font-light text-coral tracking-normal">&amp; Celebration</span><br />
          Deserves a Sweet Moment.
        </h1>

        {/* Grid for Subheadline & CTAs */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12 items-end mt-4">
          
          <div className="md:col-span-6 lg:col-span-5">
            <p className="text-navy/70 text-[clamp(1.125rem,2vw,1.5rem)] leading-relaxed max-w-md">
              {BUSINESS_CONFIG.description}
            </p>
          </div>

          <div className="md:col-span-6 lg:col-span-7 flex flex-col sm:flex-row items-start md:items-end md:justify-end gap-6">
            <Link 
              href="/get-a-quote"
              className="group relative inline-flex items-center justify-center px-10 py-5 bg-coral text-white font-bold text-lg rounded-full overflow-hidden transition-transform hover:scale-[1.02] active:scale-[0.98] shadow-coral"
            >
              <span className="relative z-10 flex items-center gap-2">
                Get a Free Quote
                <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
              </span>
            </Link>
            
            <Link 
              href="/packages"
              className="inline-flex items-center justify-center px-10 py-5 bg-transparent text-navy font-bold text-lg rounded-full border-2 border-navy/10 hover:border-navy/30 transition-colors"
            >
              Explore Packages
            </Link>
          </div>

        </div>
      </div>

      {/* Trust Marquee (Minimalist) */}
      <div className="w-full border-t border-navy/5 bg-cream py-5 overflow-hidden">
        <div className="flex whitespace-nowrap animate-[marquee_40s_linear_infinite]">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="flex items-center justify-around min-w-full px-12 gap-16">
              <span className="text-navy/80 font-medium tracking-wide flex items-center gap-3">
                <span className="text-gold text-lg">&starf;</span> 4.9 Average Rating
              </span>
              <span className="text-navy/20">&bull;</span>
              <span className="text-navy/80 font-medium tracking-wide">
                {BUSINESS_CONFIG.stats.eventsServed}+ Events Served
              </span>
              <span className="text-navy/20">&bull;</span>
              <span className="text-navy/80 font-medium tracking-wide">
                100% Licensed &amp; Insured
              </span>
              <span className="text-navy/20">&bull;</span>
              <span className="text-navy/80 font-medium tracking-wide">
                Serving All of Massachusetts
              </span>
              <span className="text-navy/20">&bull;</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
