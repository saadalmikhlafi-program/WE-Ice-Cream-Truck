import { BUSINESS_CONFIG } from "@/lib/config";

export default function TrustStats() {
  const stats = [
    { value: BUSINESS_CONFIG.stats.eventsServed, suffix: "+", label: "Events Served" },
    { value: BUSINESS_CONFIG.stats.rating, suffix: "★", label: "Average Rating", decimals: 1 },
    { value: BUSINESS_CONFIG.stats.citiesServed, suffix: "+", label: "Cities Served" },
    { value: BUSINESS_CONFIG.stats.satisfactionRate, suffix: "%", label: "Licensed & Insured" },
  ];

  return (
    <section className="w-full relative py-16 md:py-24 border-b border-navy/5">
      <div className="container mx-auto px-6 md:px-12 lg:px-24">
        <div className="grid grid-cols-2 lg:grid-cols-4 divide-y lg:divide-y-0 lg:divide-x divide-navy/10 border-y border-navy/10">
          {stats.map((stat, index) => (
            <div 
              key={index}
              className="py-12 lg:py-16 px-4 md:px-8 text-center flex flex-col justify-center items-center group"
            >
              <div className="text-[clamp(3rem,6vw,4.5rem)] font-sans font-light text-navy mb-2 tracking-tighter group-hover:scale-105 transition-transform duration-500">
                {stat.value}{stat.suffix}
              </div>
              <p className="text-navy/60 font-sans tracking-[0.15em] uppercase text-[0.75rem] font-bold">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
