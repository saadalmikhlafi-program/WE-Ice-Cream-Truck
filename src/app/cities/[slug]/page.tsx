import { Metadata, ResolvingMetadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { BUSINESS_CONFIG } from "@/lib/config";
import { getCityBySlug, MASSACHUSETTS_CITIES, getNearbyAreas } from "@/lib/cities-data";
import { getLocalBusinessSchema, getCityPageSchema, getFAQSchema } from "@/lib/schema";
import { constructMetadata } from "@/lib/seo";
import { MapPin, Star, Calendar, IceCream, Truck, Phone, ArrowRight, ChevronRight } from "lucide-react";
import PackagesPreview from "@/components/home/PackagesPreview";
import FinalCTA from "@/components/home/FinalCTA";
import FAQSection from "@/components/shared/FAQSection";

type Props = {
  params: Promise<{ slug: string }>;
};

// Generate static params for all cities at build time
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

  return constructMetadata({
    title: city.metaTitle,
    description: city.metaDescription,
    url: `/cities/${city.slug}`,
  });
}

const EVENT_TYPES = [
  { icon: "🎂", label: "Birthday Parties" },
  { icon: "🏢", label: "Corporate Events" },
  { icon: "💒", label: "Weddings" },
  { icon: "🎒", label: "School Events" },
  { icon: "🎪", label: "Block Parties" },
  { icon: "📸", label: "Photo Sessions" },
  { icon: "🚀", label: "Launch Parties" },
  { icon: "🎗️", label: "Fundraisers" },
];

export default async function CityPage({ params }: Props) {
  const resolvedParams = await params;
  const city = getCityBySlug(resolvedParams.slug);

  if (!city) {
    notFound();
  }

  const nearbyAreas = getNearbyAreas(city.slug);

  // Inject Schemas for this specific city
  const localBusinessSchema = getLocalBusinessSchema();
  const serviceSchema = getCityPageSchema(city);

  const faqs = city.localFAQs.length > 0
    ? city.localFAQs
    : [
        {
          question: `Do you provide ice cream truck rentals in ${city.name}, MA?`,
          answer: `Yes, we proudly serve ${city.name} and the surrounding areas in ${city.county}. We cater to birthday parties, corporate events, and weddings across ${city.name}.`,
        },
        {
          question: `How much does it cost to rent an ice cream truck in ${city.name}?`,
          answer: `Our packages in ${city.name} start at $190. The final price depends on your guest count and package selection. Request a quote for exact pricing.`,
        },
        {
          question: `Are you licensed and insured to operate in ${city.name}?`,
          answer: `Yes, we are fully licensed and hold a $2M liability insurance policy, meeting all requirements for private and public events in ${city.name}, Massachusetts.`,
        },
        {
          question: `How far in advance should I book for a ${city.name} event?`,
          answer: `For weekend events in ${city.name} during the summer, we recommend booking at least 2–4 weeks in advance, though we always try to accommodate last-minute requests when possible.`,
        },
      ];

  const faqSchema = getFAQSchema(faqs);

  return (
    <div className="bg-cream min-h-screen overflow-hidden">
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

      {/* ── HERO ──────────────────────────────────────────────────── */}
      <section className="relative pt-24 pb-32 md:pt-32 md:pb-48 bg-navy overflow-hidden">
        {/* Background effects */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 right-0 w-[700px] h-[700px] bg-coral/20 rounded-full blur-[150px] -translate-y-1/3 translate-x-1/4" />
          <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-gold/10 rounded-full blur-[100px] translate-y-1/2 -translate-x-1/4" />
          <svg className="absolute inset-0 w-full h-full opacity-[0.03]">
            <defs>
              <pattern id="hero-grid" width="50" height="50" patternUnits="userSpaceOnUse">
                <path d="M 50 0 L 0 0 0 50" fill="none" stroke="white" strokeWidth="0.5" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#hero-grid)" />
          </svg>
        </div>

        <div className="container mx-auto px-6 md:px-12 relative z-10 text-center max-w-5xl">
          {/* Breadcrumb */}
          <nav className="flex items-center justify-center gap-2 text-cream/40 text-xs font-bold uppercase tracking-widest mb-8">
            <Link href="/" className="hover:text-coral transition-colors">Home</Link>
            <ChevronRight size={12} />
            <Link href="/cities" className="hover:text-coral transition-colors">Service Areas</Link>
            <ChevronRight size={12} />
            <span className="text-coral">{city.name}</span>
          </nav>

          <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-coral/20 border border-coral/30 text-coral text-xs font-bold tracking-widest uppercase mb-8">
            <MapPin size={12} />
            {city.county}
          </div>

          <h1 className="font-display font-light text-[clamp(2.5rem,5.5vw,5.5rem)] leading-[1.05] text-cream mb-6 tracking-tighter">
            Ice Cream Truck Rental<br />
            in <span className="italic text-coral">{city.name}</span>, MA
          </h1>

          <p className="font-sans text-cream/70 text-lg md:text-xl leading-relaxed mb-12 max-w-2xl mx-auto">
            {city.heroSubline}
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href={`/get-a-quote?city=${encodeURIComponent(city.name)}`}
              className="inline-flex items-center gap-3 px-10 py-5 bg-coral text-white font-bold text-base rounded-full shadow-xl shadow-coral/30 hover:bg-white hover:text-navy transition-all duration-300 hover:scale-105"
            >
              Get a Free Quote for {city.name} <ArrowRight size={18} />
            </Link>
            <a
              href={`tel:${BUSINESS_CONFIG.contact.phone1Formatted}`}
              className="inline-flex items-center gap-3 px-8 py-5 border-2 border-white/20 text-cream font-bold text-base rounded-full hover:border-cream hover:bg-white/10 transition-all duration-300"
            >
              <Phone size={18} /> {BUSINESS_CONFIG.contact.phone1}
            </a>
          </div>
        </div>
      </section>

      {/* ── LOCAL INTRO ──────────────────────────────────────────── */}
      <section className="py-24 md:py-32 relative -mt-16 z-10">
        <div className="container mx-auto px-6 md:px-12 max-w-6xl">
          <div className="bg-white rounded-[3rem] shadow-2xl border border-navy/5 p-8 md:p-16">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
              {/* Text */}
              <div>
                <h2 className="font-display font-light text-[clamp(2rem,4vw,3.5rem)] text-navy tracking-tighter mb-6 leading-tight">
                  Bringing Joy to<br />
                  <span className="text-coral italic">{city.name}</span> Events
                </h2>
                <p className="font-sans text-navy/70 text-lg leading-relaxed mb-8">
                  {city.localIntro}
                </p>
                <div className="flex flex-col gap-3">
                  {[
                    { icon: <Star size={18} />, text: `Top-Rated in ${city.county}`, color: "text-gold bg-gold/10" },
                    { icon: <Calendar size={18} />, text: "Flexible Scheduling — Weekdays & Weekends", color: "text-coral bg-coral/10" },
                    { icon: <Truck size={18} />, text: "Professional Setup & On-Time Arrival", color: "text-navy bg-navy/10" },
                    { icon: <IceCream size={18} />, text: "Premium Ice Cream Selection for All Ages", color: "text-mint bg-mint/10" },
                  ].map((item) => (
                    <div key={item.text} className="flex items-center gap-4 p-4 rounded-2xl bg-cream">
                      <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${item.color}`}>
                        {item.icon}
                      </div>
                      <span className="font-sans font-bold text-navy text-sm">{item.text}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Event Types Grid */}
              <div>
                <h3 className="font-display text-2xl text-navy font-bold mb-6">
                  Events We Serve in {city.name}
                </h3>
                <div className="grid grid-cols-2 gap-3">
                  {EVENT_TYPES.map((event) => (
                    <div
                      key={event.label}
                      className="flex items-center gap-3 p-4 rounded-2xl bg-cream hover:bg-navy hover:text-cream transition-all duration-300 group cursor-default"
                    >
                      <span className="text-2xl">{event.icon}</span>
                      <span className="font-sans font-bold text-navy/80 text-sm group-hover:text-cream transition-colors">
                        {event.label}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Neighborhoods */}
                {city.neighborhoods && city.neighborhoods.length > 0 && (
                  <div className="mt-8 p-6 bg-navy rounded-3xl">
                    <h4 className="font-display text-cream font-bold text-lg mb-4">
                      Neighborhoods We Serve
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {city.neighborhoods.map((n) => (
                        <span
                          key={n}
                          className="px-3 py-1.5 rounded-full bg-white/10 text-cream/80 text-xs font-bold"
                        >
                          {n}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── PACKAGES ─────────────────────────────────────────────── */}
      <PackagesPreview />

      {/* ── NEARBY AREAS ─────────────────────────────────────────── */}
      {nearbyAreas.length > 0 && (
        <section className="py-20 bg-cream">
          <div className="container mx-auto px-6 md:px-12 max-w-6xl">
            <h2 className="font-display font-light text-[clamp(2rem,3.5vw,3rem)] text-navy tracking-tighter mb-10">
              Also Serving <span className="italic text-coral">Nearby Areas</span>
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
              {nearbyAreas.map((nearby) => (
                <Link
                  key={nearby.slug}
                  href={`/cities/${nearby.slug}`}
                  className="group flex items-center gap-2 p-4 bg-white rounded-2xl border border-navy/5 hover:border-coral hover:shadow-md transition-all duration-200"
                >
                  <MapPin size={14} className="text-coral shrink-0" />
                  <span className="font-sans font-bold text-sm text-navy/80 group-hover:text-navy">
                    {nearby.name}
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── FAQ ──────────────────────────────────────────────────── */}
      <FAQSection
        title={`FAQ — ${city.name}, MA`}
        subtitle={`Common questions about our ice cream truck service in ${city.name}.`}
        items={faqs}
      />

      {/* ── FINAL CTA ────────────────────────────────────────────── */}
      <FinalCTA />
    </div>
  );
}
