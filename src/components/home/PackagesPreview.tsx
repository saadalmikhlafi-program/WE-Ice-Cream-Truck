import Link from "next/link";
import { TRUCK_PACKAGES } from "@/lib/packages-data";
import { formatPrice } from "@/lib/utils";
import { ArrowRight, Check } from "lucide-react";

export default function PackagesPreview() {
  // Only showcase the top 3 curated experiences on the homepage
  const featuredPackages = TRUCK_PACKAGES.slice(0, 3);

  return (
    <section className="bg-cream py-24 md:py-40">
      <div className="container mx-auto px-6 md:px-12 lg:px-24">
        
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-20 md:mb-32">
          <div className="max-w-2xl">
            <h2 className="font-display font-light text-[clamp(3rem,6vw,5.5rem)] leading-tight text-navy mb-6 tracking-tighter">
              Curated <span className="italic text-coral">Experiences</span>
            </h2>
            <p className="font-sans text-navy/70 text-[clamp(1.125rem,1.5vw,1.35rem)] leading-relaxed">
              Transparent pricing. Premium service. No hidden fees. Select the perfect fleet experience for your guest count.
            </p>
          </div>
          <Link 
            href="/packages"
            className="group flex items-center gap-3 font-sans font-bold text-navy uppercase tracking-widest text-[0.75rem] border-b-2 border-navy/20 pb-2 hover:border-coral hover:text-coral transition-colors"
          >
            Explore All Packages 
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>

        {/* High-End Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 xl:gap-12">
          {featuredPackages.map((pkg) => (
            <div 
              key={pkg.id} 
              className={`group flex flex-col bg-white rounded-[2rem] p-8 md:p-12 border transition-all duration-500 hover:shadow-float ${
                pkg.isPopular ? "border-coral/30 shadow-sm relative overflow-hidden" : "border-navy/5"
              }`}
            >
              {/* Subtle top highlight for popular package */}
              {pkg.isPopular && (
                <div className="absolute top-0 left-0 right-0 h-1.5 bg-coral" />
              )}

              <div className="mb-8">
                {pkg.isPopular && (
                  <span className="inline-block px-4 py-1.5 bg-coral/10 text-coral text-[0.65rem] font-bold uppercase tracking-widest rounded-full mb-6">
                    Most Popular
                  </span>
                )}
                <h3 className="font-display font-medium text-3xl text-navy mb-3">{pkg.name}</h3>
                <p className="font-sans text-navy/60 text-lg">{pkg.tagline}</p>
              </div>

              <div className="mb-10 pb-10 border-b border-navy/5 flex-1">
                <div className="flex items-baseline gap-2 mb-2">
                  <span className="font-sans font-light text-[3.5rem] tracking-tighter text-navy">{formatPrice(pkg.price)}</span>
                </div>
                <div className="font-sans text-navy/50 font-bold text-xs uppercase tracking-widest">
                  {pkg.servings} Guests &bull; {pkg.durationMins / 60} Hours
                </div>
              </div>

              <ul className="flex flex-col gap-5 mb-12">
                {pkg.features.slice(0, 4).map((feature, idx) => (
                  <li key={idx} className="flex items-start gap-4">
                    <Check className="w-5 h-5 text-coral shrink-0 mt-0.5" />
                    <span className="font-sans text-navy/80 leading-relaxed font-medium text-[0.95rem]">{feature}</span>
                  </li>
                ))}
              </ul>

              <Link
                href={`/get-a-quote?package=${pkg.slug}`}
                className={`w-full py-5 rounded-full text-center font-sans font-bold text-[0.8rem] tracking-widest uppercase transition-colors ${
                  pkg.isPopular
                    ? "bg-coral text-white hover:bg-navy"
                    : "bg-navy/5 text-navy hover:bg-navy hover:text-white"
                }`}
              >
                Select Package
              </Link>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
