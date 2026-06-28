import { Metadata } from "next";
import { constructMetadata } from "@/lib/seo";
import AnimatedSection from "@/components/shared/AnimatedSection";
import TrustStats from "@/components/home/TrustStats";
import FinalCTA from "@/components/home/FinalCTA";
import { BUSINESS_CONFIG } from "@/lib/config";

export const metadata: Metadata = constructMetadata({
  title: "About Us | WE Ice Cream Truck",
  description: `Learn about the story behind ${BUSINESS_CONFIG.name}. We are Massachusetts' most trusted ice cream truck rental service.`,
  url: "/about",
});

export default function AboutPage() {
  return (
    <div className="bg-sand min-h-screen pt-[88px]">
      {/* Hero Section */}
      <section className="py-24 bg-navy text-cream relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('/images/hero-cinematic.jpg')] opacity-20 bg-cover bg-center mix-blend-overlay" />
        <div className="container mx-auto px-4 relative z-10">
          <AnimatedSection className="max-w-4xl mx-auto text-center">
            <h1 className="text-5xl md:text-6xl font-display font-bold mb-6">
              More Than Just <br className="hidden md:block"/>
              <span className="text-coral italic font-light">Ice Cream.</span>
            </h1>
            <p className="text-xl text-cream/80 max-w-2xl mx-auto">
              We are on a mission to deliver joy, nostalgia, and unforgettable memories to every celebration across Massachusetts.
            </p>
          </AnimatedSection>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row gap-16 items-center">
            <AnimatedSection className="w-full lg:w-1/2">
              <div className="aspect-[4/3] rounded-[2rem] bg-gray-200 overflow-hidden relative shadow-xl">
                {/* Placeholder Image */}
                <div 
                  className="absolute inset-0 bg-cover bg-center"
                  style={{ backgroundImage: `url('/images/gallery-8.jpg')` }}
                />
              </div>
            </AnimatedSection>

            <AnimatedSection className="w-full lg:w-1/2" delay={0.2}>
              <h2 className="text-3xl md:text-4xl font-display font-bold text-charcoal mb-6">
                Our Story
              </h2>
              <div className="space-y-6 text-gray-600 text-lg">
                <p>
                  {BUSINESS_CONFIG.name} was born out of a simple idea: the ice cream truck experience shouldn't be left in the past, and it shouldn't be limited to just driving down neighborhood streets.
                </p>
                <p>
                  We wanted to elevate the classic ice cream truck into a premium service that could cater to elegant weddings, massive corporate campuses, and high-end private parties—without losing the nostalgic charm that makes it so magical.
                </p>
                <p>
                  Today, we operate a fleet of fully-restored classic trucks and modern, high-volume Sprinter vans, serving {BUSINESS_CONFIG.stats.eventsServed}+ events across the Commonwealth. We are fully licensed, insured, and committed to five-star service.
                </p>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Trust Stats */}
      <TrustStats />

      {/* Mission Section */}
      <section className="py-24 bg-navy-mid text-cream text-center">
        <div className="container mx-auto px-4">
          <AnimatedSection className="max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-display font-bold mb-6">
              The {BUSINESS_CONFIG.name} Promise
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
              <div className="p-6 bg-navy rounded-3xl border border-white/5">
                <div className="w-12 h-12 bg-coral text-white rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold">1</div>
                <h3 className="text-xl font-bold mb-2">Punctuality</h3>
                <p className="text-cream/70 text-sm">We arrive early, set up seamlessly, and are ready to serve exactly when you need us.</p>
              </div>
              <div className="p-6 bg-navy rounded-3xl border border-white/5">
                <div className="w-12 h-12 bg-gold text-white rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold">2</div>
                <h3 className="text-xl font-bold mb-2">Premium Quality</h3>
                <p className="text-cream/70 text-sm">We only serve the most popular, high-quality, pre-packaged ice cream brands everyone loves.</p>
              </div>
              <div className="p-6 bg-navy rounded-3xl border border-white/5">
                <div className="w-12 h-12 bg-mint text-white rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold">3</div>
                <h3 className="text-xl font-bold mb-2">Immaculate Cleanliness</h3>
                <p className="text-cream/70 text-sm">Our vehicles are detailed daily and pass all board of health inspections with flying colors.</p>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>

      <FinalCTA />
    </div>
  );
}
