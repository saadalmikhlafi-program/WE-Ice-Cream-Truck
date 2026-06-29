import { Metadata, ResolvingMetadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { BUSINESS_CONFIG } from "@/lib/config";
import { getCityBySlug, MASSACHUSETTS_CITIES } from "@/lib/cities-data";
import { getLocalBusinessSchema, getCityPageSchema, getFAQSchema } from "@/lib/schema";
import { constructMetadata } from "@/lib/seo";
import { MapPin, Star, Calendar, IceCream, Truck } from "lucide-react";
import PackagesPreview from "@/components/home/PackagesPreview";
import FinalCTA from "@/components/home/FinalCTA";
import FAQSection from "@/components/shared/FAQSection";

type Props = {
  params: Promise<{ slug: string }>;
};

// Generate static params for all 100+ cities at build time for instant loading
export async function generateStaticParams() {
  return MASSACHUSETTS_CITIES.map((city) => ({
    slug: city.slug,
  }));
}

// Generate dynamic SEO metadata per city
export async function generateMetadata(
  { params }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const resolvedParams = await params;
  const city = getCityBySlug(resolvedParams.slug);
  
  if (!city) {
    return { title: "City Not Found" };
  }

  const title = `Ice Cream Truck Rental in ${city.name}, MA | ${BUSINESS_CONFIG.name}`;
  const description = `Looking for an ice cream truck for your next event in ${city.name}, Massachusetts? We provide premium ice cream truck rentals for birthdays, weddings, and corporate events in ${city.county} County.`;

  return constructMetadata({
    title,
    description,
    url: `/cities/${city.slug}`,
  });
}

export default async function CityPage({ params }: Props) {
  const resolvedParams = await params;
  const city = getCityBySlug(resolvedParams.slug);

  if (!city) {
    notFound();
  }

  // Inject Schemas for this specific city
  const localBusinessSchema = getLocalBusinessSchema();
  const serviceSchema = getCityPageSchema(city);
  
  const faqs = [
    {
      question: `Do you provide ice cream truck rentals in ${city.name}, MA?`,
      answer: `Yes, we proudly serve ${city.name} and the surrounding areas in ${city.county} County. We cater to birthday parties, corporate events, and weddings across ${city.name}.`
    },
    {
      question: `How much does it cost to rent an ice cream truck in ${city.name}?`,
      answer: `Our packages in ${city.name} start at $299. The final price depends on your guest count and package selection. Visit our packages page or request a quote for exact pricing for your ${city.name} event.`
    },
    {
      question: `Are you licensed and insured to operate in ${city.name}?`,
      answer: `Yes, we are fully licensed and hold a $2M liability insurance policy, meeting all requirements for private and public events in ${city.name}, Massachusetts.`
    },
    {
      question: `How far in advance should I book for a ${city.name} event?`,
      answer: `For weekend events in ${city.name} during the summer, we recommend booking at least 3-4 weeks in advance, though we always try to accommodate last-minute requests when possible.`
    }
  ];
  
  const faqSchema = getFAQSchema(faqs);

  return (
    <div className="bg-cream min-h-screen pt-[88px] overflow-hidden">
      {/* Inject JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      {/* Hero Section */}
      <section className="relative py-24 md:py-32 bg-navy overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div 
            className="absolute inset-0 bg-cover bg-center opacity-20 mix-blend-overlay"
            style={{ backgroundImage: `url('/images/hero-cinematic.jpg')` }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-navy via-navy/80 to-transparent" />
        </div>
        
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-coral/20 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/3 pointer-events-none" />

        <div className="container mx-auto px-6 md:px-12 relative z-10 text-center max-w-4xl">
          <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-gold/10 text-gold text-sm font-bold tracking-widest border border-gold/20 mb-8 backdrop-blur-sm">
            <MapPin size={16} /> Now Serving {city.county} County
          </div>
          
          <h1 className="text-[clamp(2.5rem,5vw,5rem)] font-display font-black leading-[1.1] text-white mb-6">
            Ice Cream Truck Rental in <br/> <span className="text-coral underline decoration-wavy decoration-coral/50 underline-offset-[12px]">{city.name}</span>, MA
          </h1>
          
          <p className="font-sans font-medium text-lg md:text-2xl text-white/80 max-w-2xl mx-auto leading-relaxed mb-10">
            Make your next {city.name} event unforgettable. Premium ice cream, classic nostalgia, and five-star service delivered right to your location.
          </p>
          
          <Link 
            href={`/get-a-quote?city=${city.name}`}
            className="inline-flex items-center justify-center px-10 py-5 bg-coral text-white font-bold text-lg rounded-full shadow-xl shadow-coral/20 hover:bg-white hover:text-navy hover:scale-105 transition-all duration-300"
          >
            Book for {city.name} &rarr;
          </Link>
        </div>
      </section>

      {/* Localized Content Section */}
      <section className="py-24 md:py-32 relative z-10 -mt-12">
        <div className="container mx-auto px-6 md:px-12 max-w-7xl">
          <div className="bg-white p-8 md:p-16 rounded-[3rem] shadow-2xl border border-navy/5">
            <div className="flex flex-col lg:flex-row gap-16 items-center">
              
              <div className="w-full lg:w-1/2">
                <h2 className="text-4xl md:text-5xl font-display font-black text-navy mb-6">
                  Bringing Joy to <span className="text-coral">{city.name}</span> Events
                </h2>
                <div className="space-y-6 font-sans text-navy/70 text-lg leading-relaxed font-medium">
                  <p>
                    Whether you're hosting a massive corporate gathering or an intimate backyard birthday party in {city.name}, {BUSINESS_CONFIG.name} is the premier choice for frozen treats.
                  </p>
                  <p>
                    With a population of {city.population?.toLocaleString() ?? "thousands"} in {city.name}, we know exactly what it takes to serve events of any size. Our modern Sprinter vans can serve up to 500 people per hour, while our classic trucks provide that perfect nostalgic touch for neighborhood parties.
                  </p>
                  
                  <ul className="space-y-4 mt-8 bg-cream/50 p-6 rounded-2xl border-2 border-navy/5">
                    <li className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-xl bg-mint/20 text-mint flex items-center justify-center shrink-0">
                        <Star size={20} strokeWidth={2.5} />
                      </div>
                      <span className="font-bold text-navy">Top-Rated in {city.county} County</span>
                    </li>
                    <li className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-xl bg-coral/20 text-coral flex items-center justify-center shrink-0">
                        <Calendar size={20} strokeWidth={2.5} />
                      </div>
                      <span className="font-bold text-navy">Flexible Scheduling</span>
                    </li>
                    <li className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-xl bg-gold/20 text-gold flex items-center justify-center shrink-0">
                        <IceCream size={20} strokeWidth={2.5} />
                      </div>
                      <span className="font-bold text-navy">Premium Ice Cream Selection</span>
                    </li>
                  </ul>
                </div>
              </div>

              <div className="w-full lg:w-1/2">
                {/* Local Event Types Grid */}
                <div className="grid grid-cols-2 gap-6">
                  <div className="bg-cream p-8 rounded-[2rem] border-2 border-transparent hover:border-coral transition-colors group">
                    <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mb-6 shadow-sm group-hover:scale-110 transition-transform">
                      <Truck className="text-coral w-8 h-8" />
                    </div>
                    <h3 className="font-display font-black text-2xl text-navy mb-2">Corporate</h3>
                    <p className="text-sm font-medium text-navy/60">Employee appreciation and campus events in {city.name}.</p>
                  </div>
                  <div className="bg-cream p-8 rounded-[2rem] border-2 border-transparent hover:border-gold transition-colors group">
                    <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mb-6 shadow-sm group-hover:scale-110 transition-transform">
                      <IceCream className="text-gold w-8 h-8" />
                    </div>
                    <h3 className="font-display font-black text-2xl text-navy mb-2">Birthdays</h3>
                    <p className="text-sm font-medium text-navy/60">Unforgettable parties right in your {city.name} driveway.</p>
                  </div>
                  <div className="bg-navy p-8 rounded-[2rem] border-2 border-transparent col-span-2 relative overflow-hidden group">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-coral/20 rounded-full blur-2xl group-hover:bg-coral/40 transition-colors" />
                    <h3 className="font-display font-black text-3xl text-white mb-2 relative z-10">Weddings &amp; Large Events</h3>
                    <p className="font-medium text-white/70 relative z-10">The perfect late-night snack for your {city.name} wedding reception.</p>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>
      </section>

      {/* Packages Teaser */}
      <PackagesPreview />

      {/* Localized FAQ */}
      <FAQSection 
        title={`Frequently Asked Questions in ${city.name}`}
        subtitle="Here is what people usually ask us about local events."
        items={faqs}
      />

      {/* Final CTA */}
      <FinalCTA />
    </div>
  );
}
