import { Metadata, ResolvingMetadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { BUSINESS_CONFIG } from "@/lib/config";
import { getCityBySlug, MASSACHUSETTS_CITIES } from "@/lib/cities-data";
import { getLocalBusinessSchema, getCityPageSchema, getFAQSchema } from "@/lib/schema";
import { constructMetadata } from "@/lib/seo";
import AnimatedSection from "@/components/shared/AnimatedSection";
import { MapPin, Star, Calendar, IceCream, Truck } from "lucide-react";
import TrustStats from "@/components/home/TrustStats";
import PackagesPreview from "@/components/home/PackagesPreview";
import FinalCTA from "@/components/home/FinalCTA";

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
  
  const faqSchema = getFAQSchema([
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
    }
  ]);

  return (
    <div className="bg-sand min-h-screen pt-[88px]">
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
      <section className="relative py-24 md:py-32 bg-navy text-cream overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div 
            className="absolute inset-0 bg-cover bg-center opacity-30 mix-blend-overlay"
            style={{ backgroundImage: `url('/images/hero-cinematic.jpg')` }}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-navy/90 to-navy" />
        </div>

        <div className="container mx-auto px-4 relative z-10 text-center max-w-4xl">
          <AnimatedSection>
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gold/10 text-gold text-sm font-bold uppercase tracking-widest border border-gold/20 mb-6">
              <MapPin size={16} /> Now Serving {city.county} County
            </div>
            
            <h1 className="text-4xl md:text-6xl font-display font-bold leading-tight mb-6">
              The Best Ice Cream Truck Rental in <span className="text-coral italic">{city.name}</span>, MA
            </h1>
            
            <p className="text-xl text-cream/80 mb-10 max-w-2xl mx-auto">
              Make your next {city.name} event unforgettable. Premium ice cream, classic nostalgia, and five-star service delivered right to your location.
            </p>
            
            <Link 
              href={`/get-a-quote?city=${city.name}`}
              className="inline-flex items-center justify-center px-8 py-4 bg-coral text-white font-bold text-lg rounded-full shadow-coral-lg hover:bg-coral-dark hover:scale-105 transition-all"
            >
              Book for {city.name} &rarr;
            </Link>
          </AnimatedSection>
        </div>
      </section>

      {/* Trust Stats (Global) */}
      <TrustStats />

      {/* Localized Content Section */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row gap-16 items-center">
            
            <AnimatedSection className="w-full lg:w-1/2">
              <h2 className="text-3xl md:text-4xl font-display font-bold text-charcoal mb-6">
                Bringing Joy to {city.name} Events
              </h2>
              <div className="space-y-6 text-gray-600 text-lg">
                <p>
                  Whether you're hosting a massive corporate gathering or an intimate backyard birthday party in {city.name}, {BUSINESS_CONFIG.name} is the premier choice for frozen treats.
                </p>
                <p>
                  With a population of {city.population?.toLocaleString() ?? "thousands"} in {city.name}, we know exactly what it takes to serve events of any size. Our modern Sprinter vans can serve up to 500 people per hour, while our classic trucks provide that perfect nostalgic touch for neighborhood parties.
                </p>
                
                <ul className="space-y-3 mt-6">
                  <li className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-mint/20 text-mint flex items-center justify-center shrink-0">
                      <Star size={16} />
                    </div>
                    <span className="font-semibold text-charcoal">Top-Rated in {city.county} County</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-coral/20 text-coral flex items-center justify-center shrink-0">
                      <Calendar size={16} />
                    </div>
                    <span className="font-semibold text-charcoal">Flexible Scheduling</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-gold/20 text-gold flex items-center justify-center shrink-0">
                      <IceCream size={16} />
                    </div>
                    <span className="font-semibold text-charcoal">Premium Ice Cream Selection</span>
                  </li>
                </ul>
              </div>
            </AnimatedSection>

            <AnimatedSection className="w-full lg:w-1/2" delay={0.2}>
              {/* Local Event Types Grid */}
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-sand p-6 rounded-3xl border border-gray-100">
                  <Truck className="text-coral w-10 h-10 mb-4" />
                  <h3 className="font-bold text-xl text-charcoal mb-2">Corporate</h3>
                  <p className="text-sm text-gray-600">Employee appreciation and campus events in {city.name}.</p>
                </div>
                <div className="bg-sand p-6 rounded-3xl border border-gray-100">
                  <IceCream className="text-gold w-10 h-10 mb-4" />
                  <h3 className="font-bold text-xl text-charcoal mb-2">Birthdays</h3>
                  <p className="text-sm text-gray-600">Unforgettable parties right in your {city.name} driveway.</p>
                </div>
                <div className="bg-sand p-6 rounded-3xl border border-gray-100 col-span-2">
                  <h3 className="font-bold text-xl text-charcoal mb-2">Weddings &amp; Large Events</h3>
                  <p className="text-sm text-gray-600">The perfect late-night snack for your {city.name} wedding reception.</p>
                </div>
              </div>
            </AnimatedSection>

          </div>
        </div>
      </section>

      {/* Packages Teaser */}
      <PackagesPreview />

      {/* Localized FAQ */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4 max-w-3xl">
          <AnimatedSection className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-display font-bold text-charcoal mb-4">
              Frequently Asked Questions in {city.name}
            </h2>
          </AnimatedSection>

          <AnimatedSection className="space-y-6">
            <div className="bg-sand p-6 rounded-2xl">
              <h3 className="font-bold text-lg text-charcoal mb-2">Do you serve all areas of {city.name}?</h3>
              <p className="text-gray-600">Yes! We provide service to all neighborhoods within {city.name} and across {city.county} County.</p>
            </div>
            <div className="bg-sand p-6 rounded-2xl">
              <h3 className="font-bold text-lg text-charcoal mb-2">How far in advance should I book?</h3>
              <p className="text-gray-600">For weekend events in {city.name} during the summer, we recommend booking at least 3-4 weeks in advance, though we always try to accommodate last-minute requests when possible.</p>
            </div>
            <div className="bg-sand p-6 rounded-2xl">
              <h3 className="font-bold text-lg text-charcoal mb-2">Is there a travel fee to {city.name}?</h3>
              <p className="text-gray-600">Travel fees depend on your exact location and the package selected. When you request a quote for {city.name}, we provide all-inclusive, transparent pricing with zero hidden fees.</p>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Final CTA */}
      <FinalCTA />
    </div>
  );
}
