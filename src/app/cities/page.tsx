import { Metadata } from "next";
import Link from "next/link";
import { MASSACHUSETTS_CITIES, CityData } from "@/lib/cities-data";
import SiteHeader from "@/components/layout/SiteHeader";
import SiteFooter from "@/components/layout/SiteFooter";
import { MapPin } from "lucide-react";

export const metadata: Metadata = {
  title: "Service Areas in Massachusetts | WE Ice Cream Truck",
  description: "View our full list of over 500 municipalities and zip codes we serve across Massachusetts for premium ice cream truck catering.",
};

export default function CitiesIndexPage() {
  // Group cities alphabetically
  const groupedCities = MASSACHUSETTS_CITIES.reduce((acc, city) => {
    const firstLetter = city.name.charAt(0).toUpperCase();
    if (!acc[firstLetter]) {
      acc[firstLetter] = [];
    }
    acc[firstLetter].push(city);
    return acc;
  }, {} as Record<string, CityData[]>);

  const alphabet = Object.keys(groupedCities).sort();

  return (
    <main className="min-h-screen bg-cream selection:bg-coral/20">
      <SiteHeader />
      
      {/* Hero Section */}
      <section className="pt-32 pb-16 md:pt-40 md:pb-24 bg-navy relative overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-coral/10 rounded-full blur-[100px] pointer-events-none" />
        
        <div className="container mx-auto px-6 md:px-12 lg:px-24 relative z-10 text-center max-w-4xl">
          <h1 className="font-display font-light text-[clamp(3rem,6vw,5.5rem)] leading-[1.05] text-cream mb-6 tracking-tighter">
            Proudly Serving <br />
            <span className="italic text-coral font-serif">All of Massachusetts</span>
          </h1>
          <p className="font-sans text-cream/70 text-[clamp(1.125rem,1.5vw,1.35rem)] leading-relaxed">
            From the bustling streets of Greater Boston to the scenic routes of the Berkshires. Find your city below to see our local catering options and reserve a premium ice cream truck for your next event.
          </p>
        </div>
      </section>

      {/* Cities Directory Section */}
      <section className="py-20 md:py-32">
        <div className="container mx-auto px-6 md:px-12 lg:px-24">
          
          <div className="mb-12 flex flex-wrap gap-2 justify-center">
            {alphabet.map(letter => (
              <a 
                key={letter} 
                href={`#letter-${letter}`}
                className="w-10 h-10 flex items-center justify-center rounded-full bg-navy/5 text-navy font-bold hover:bg-coral hover:text-white transition-colors"
              >
                {letter}
              </a>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-16">
            {alphabet.map((letter) => (
              <div key={letter} id={`letter-${letter}`} className="scroll-mt-32">
                <h2 className="text-4xl font-display text-navy mb-6 border-b-2 border-navy/10 pb-2">
                  {letter}
                </h2>
                <ul className="flex flex-col gap-3">
                  {groupedCities[letter].sort((a, b) => a.name.localeCompare(b.name)).map(city => (
                    <li key={city.slug}>
                      <Link 
                        href={`/cities/${city.slug}`}
                        className="group flex items-center justify-between p-3 rounded-xl hover:bg-navy/5 transition-colors"
                      >
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-full bg-coral/10 text-coral flex items-center justify-center group-hover:bg-coral group-hover:text-white transition-colors">
                            <MapPin size={14} />
                          </div>
                          <span className="font-sans font-bold text-navy/80 group-hover:text-navy transition-colors">
                            {city.name}
                          </span>
                        </div>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          
        </div>
      </section>

      <SiteFooter />
    </main>
  );
}
