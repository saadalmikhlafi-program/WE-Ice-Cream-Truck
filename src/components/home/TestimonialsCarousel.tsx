import { BUSINESS_CONFIG } from "@/lib/config";
import { Star } from "lucide-react";

const testimonials = [
  {
    id: 1,
    name: "Sarah M.",
    city: "Boston, MA",
    event: "Wedding Reception",
    text: "Having the WE Ice Cream Truck at our wedding was the highlight of the night! The guests were completely surprised, the ice cream was premium, and the staff was so professional.",
  },
  {
    id: 2,
    name: "David T.",
    city: "Cambridge, MA",
    event: "Corporate Event",
    text: "We booked the Sprinter Van for our employee appreciation day. They served 150 people flawlessly in under 90 minutes. The branding was spot on.",
  },
  {
    id: 3,
    name: "Jessica P.",
    city: "Newton, MA",
    event: "Kids Birthday Party",
    text: "The look on my son's face when the truck pulled up was priceless! The driver was so sweet with the kids, and the ordering process was completely stress-free.",
  },
];

export default function TestimonialsCarousel() {
  return (
    <section className="relative py-24 md:py-40 border-t border-navy/5 overflow-hidden">
      <div className="container mx-auto px-6 md:px-12 lg:px-24 mb-20 md:mb-32">
        
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
          <div className="max-w-2xl">
            <h2 className="font-display font-light text-[clamp(3rem,6vw,5.5rem)] leading-tight text-navy mb-6 tracking-tighter">
              Words From <br />
              <span className="italic text-coral">Our Clients</span>
            </h2>
            <div className="flex items-center gap-3">
              <div className="flex text-gold">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-current" />
                ))}
              </div>
              <p className="font-sans text-navy/70 text-lg font-medium">
                {BUSINESS_CONFIG.stats.rating} / 5.0 Average
              </p>
            </div>
          </div>
          <div className="font-sans font-bold text-navy uppercase tracking-widest text-[0.75rem] border-b-2 border-navy/20 pb-2">
            Read {BUSINESS_CONFIG.stats.reviewCount} Reviews
          </div>
        </div>

      </div>

      {/* Marquee Container */}
      <div className="relative flex w-full flex-nowrap items-center overflow-hidden">
        <div className="flex w-max animate-marquee items-stretch justify-center gap-12 lg:gap-16 px-6 hover:[animation-play-state:paused]">
          {[...testimonials, ...testimonials, ...testimonials, ...testimonials].map((t, idx) => (
            <div key={`${t.id}-${idx}`} className="flex-shrink-0 w-[300px] md:w-[350px] lg:w-[400px] flex flex-col group">
              <div className="text-coral text-[4rem] leading-none font-display mb-4 opacity-20 group-hover:opacity-100 transition-opacity duration-500">
                &ldquo;
              </div>
              <p className="font-display italic text-2xl lg:text-[1.75rem] leading-relaxed text-navy mb-10 flex-1 text-pretty">
                {t.text}
              </p>
              <div className="border-t border-navy/10 pt-6">
                <h4 className="font-sans font-medium text-navy text-lg mb-1 tracking-tight">
                  {t.name}
                </h4>
                <p className="font-sans text-navy/50 text-[0.7rem] font-bold tracking-widest uppercase">
                  {t.event} &bull; {t.city}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

    </section>
  );
}
