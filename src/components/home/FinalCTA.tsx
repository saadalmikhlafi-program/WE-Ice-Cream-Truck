import Link from "next/link";
import { BUSINESS_CONFIG } from "@/lib/config";
import { ArrowRight, Phone } from "lucide-react";

export default function FinalCTA() {
  return (
    <section className="relative w-full py-32 md:py-48 bg-navy/80 backdrop-blur-2xl flex items-center justify-center overflow-hidden border-t border-white/5">
      {/* Background Image & Overlay */}
      <div className="absolute inset-0 z-0">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-30 mix-blend-overlay"
          style={{ backgroundImage: `url('/images/final-cta-bg.jpg')` }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-navy via-navy/80 to-navy" />
      </div>

      <div className="container mx-auto px-6 md:px-12 lg:px-24 relative z-10 text-center">
        <div className="max-w-4xl mx-auto flex flex-col items-center">
          
          <span className="font-sans font-bold tracking-[0.2em] uppercase text-coral text-[0.75rem] mb-8 block">
            Limited Summer Availability
          </span>
          
          <h2 className="text-[clamp(3.5rem,8vw,7rem)] font-display font-light text-cream leading-[0.95] tracking-tighter mb-10">
            Ready to Make It <br />
            <span className="italic text-coral">Unforgettable?</span>
          </h2>
          
          <p className="font-sans text-[clamp(1.125rem,1.5vw,1.35rem)] text-cream/70 mb-12 max-w-2xl leading-relaxed">
            Join {BUSINESS_CONFIG.stats.eventsServed}+ families and organizations who trusted {BUSINESS_CONFIG.name} for their most special moments.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-6 w-full sm:w-auto">
            <Link 
              href="/get-a-quote"
              className="group relative w-full sm:w-auto inline-flex items-center justify-center px-12 py-5 bg-coral text-white font-sans font-bold text-[0.85rem] tracking-widest uppercase rounded-full overflow-hidden transition-transform hover:scale-[1.02] active:scale-[0.98] shadow-coral"
            >
              <span className="relative z-10 flex items-center gap-3">
                Get a Free Quote
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </span>
            </Link>
            
            <a 
              href={`tel:${BUSINESS_CONFIG.contact.phone1Formatted}`}
              className="group w-full sm:w-auto inline-flex items-center justify-center gap-3 px-10 py-5 bg-transparent text-cream font-sans font-bold text-[0.85rem] tracking-widest uppercase rounded-full border border-white/10 hover:border-white/30 transition-colors"
            >
              <Phone className="w-4 h-4 text-cream/50 group-hover:text-coral transition-colors" />
              {BUSINESS_CONFIG.contact.phone1}
            </a>
          </div>

        </div>
      </div>
    </section>
  );
}
