import { Metadata } from "next";
import { constructMetadata } from "@/lib/seo";
import { TRUCK_PACKAGES, VAN_PACKAGES, formatDuration } from "@/lib/packages-data";
import { formatPrice } from "@/lib/utils";
import { Check, Truck, Sparkles } from "lucide-react";
import Link from "next/link";
import AnimatedSection from "@/components/shared/AnimatedSection";
import { BUSINESS_CONFIG } from "@/lib/config";

export const metadata: Metadata = constructMetadata({
  title: "Ice Cream Truck & Van Packages | WE Ice Cream Truck",
  description: "View our transparent pricing and packages for ice cream truck and Sprinter van rentals in Massachusetts. Perfect for birthdays, weddings, and corporate events.",
  url: "/packages",
});

export default function PackagesPage() {
  return (
    <div className="bg-sand min-h-screen pt-[88px]">
      {/* Header */}
      <section className="py-20 bg-navy/80 backdrop-blur-2xl text-cream relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('/images/hero-cinematic.jpg')] opacity-20 bg-cover bg-center mix-blend-overlay" />
        <div className="container mx-auto px-4 relative z-10 text-center">
          <AnimatedSection className="max-w-3xl mx-auto">
            <h1 className="text-5xl md:text-6xl font-display font-bold mb-6">
              Transparent <span className="text-coral italic font-light">Pricing</span>. <br/>
              Premium Experience.
            </h1>
            <p className="text-xl text-cream/80 max-w-2xl mx-auto">
              Choose between our classic nostalgic ice cream truck or our modern Sprinter van. No hidden fees, just sweet memories.
            </p>
          </AnimatedSection>
        </div>
      </section>

      {/* Classic Truck Packages */}
      <section className="py-24">
        <div className="container mx-auto px-4">
          <AnimatedSection className="text-center mb-16">
            <div className="inline-flex items-center gap-3 px-4 py-2 bg-navy/5 rounded-full text-navy font-bold mb-6">
              <Truck size={24} className="text-coral" />
              Classic Ice Cream Truck
            </div>
            <h2 className="text-4xl font-display font-bold text-charcoal mb-4">Nostalgia on Wheels</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Our beautifully restored classic trucks bring the iconic music and aesthetic to your event. Perfect for outdoor celebrations.
            </p>
          </AnimatedSection>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
            {TRUCK_PACKAGES.map((pkg, idx) => (
              <AnimatedSection key={pkg.id} delay={idx * 0.1}>
                <div className={`h-full flex flex-col bg-white rounded-3xl p-8 shadow-sm hover:shadow-xl transition-all border ${pkg.isPopular ? 'border-coral ring-1 ring-coral' : 'border-gray-100'}`}>
                  {pkg.isPopular && (
                    <div className="absolute top-4 left-4 z-10 bg-coral text-white text-xs font-bold uppercase tracking-wider py-1 px-4 rounded-full">
                      Most Popular
                    </div>
                  )}
                  
                  {/* Package Image */}
                  <div className="h-48 -mx-8 -mt-8 mb-6 relative overflow-hidden bg-gray-100 rounded-t-3xl">
                    <div 
                      className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-105"
                      style={{ backgroundImage: "url('/images/classic-truck.jpg')" }}
                    />
                  </div>
                  
                  <h3 className="text-2xl font-display font-bold text-charcoal mb-2">{pkg.name}</h3>
                  <p className="text-gray-500 text-sm mb-6 h-10">{pkg.tagline}</p>
                  
                  <div className="mb-8">
                    <span className="text-4xl font-extrabold text-charcoal">{formatPrice(pkg.price)}</span>
                    <div className="flex gap-2 text-sm text-gray-500 font-semibold mt-2">
                      <span>{pkg.servings} Guests</span> &bull; <span>{formatDuration(pkg.durationMins)}</span>
                    </div>
                  </div>

                  <div className="flex-1">
                    <ul className="space-y-4 mb-8">
                      {pkg.features.map((feature, i) => (
                        <li key={i} className="flex items-start gap-3 text-gray-600 text-sm">
                          <Check className="text-coral w-5 h-5 shrink-0" />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <Link 
                    href={`/get-a-quote?package=${pkg.slug}`}
                    className={`block w-full py-4 text-center font-bold rounded-full transition-colors ${
                      pkg.isPopular ? 'bg-coral text-white hover:bg-coral-dark shadow-coral' : 'bg-navy-mid text-white hover:bg-navy'
                    }`}
                  >
                    Select Package
                  </Link>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Sprinter Van Packages */}
      <section className="relative py-24">
        <div className="container mx-auto px-4">
          <AnimatedSection className="text-center mb-16">
            <div className="inline-flex items-center gap-3 px-4 py-2 bg-navy/5 rounded-full text-navy font-bold mb-6">
              <Sparkles size={24} className="text-gold" />
              Modern Sprinter Van
            </div>
            <h2 className="text-4xl font-display font-bold text-charcoal mb-4">Sleek &amp; Professional</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Our high-capacity Sprinter vans are designed for massive output and tight spaces. The choice for corporate campuses and high-volume festivals.
            </p>
          </AnimatedSection>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
            {VAN_PACKAGES.map((pkg, idx) => (
              <AnimatedSection key={pkg.id} delay={idx * 0.1}>
                <div className={`h-full flex flex-col bg-sand rounded-3xl p-8 shadow-sm hover:shadow-xl transition-all border ${pkg.isPopular ? 'border-gold ring-1 ring-gold' : 'border-gray-100'}`}>
                  {pkg.isPopular && (
                    <div className="absolute top-4 left-4 z-10 bg-gold text-white text-xs font-bold uppercase tracking-wider py-1 px-4 rounded-full">
                      Corporate Favorite
                    </div>
                  )}

                  {/* Package Image */}
                  <div className="h-48 -mx-8 -mt-8 mb-6 relative overflow-hidden bg-gray-100 rounded-t-3xl">
                    <div 
                      className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-105"
                      style={{ backgroundImage: "url('/images/van-premium.jpg')" }}
                    />
                  </div>
                  
                  <h3 className="text-2xl font-display font-bold text-charcoal mb-2">{pkg.name}</h3>
                  <p className="text-gray-500 text-sm mb-6 h-10">{pkg.tagline}</p>
                  
                  <div className="mb-8">
                    <span className="text-4xl font-extrabold text-charcoal">{formatPrice(pkg.price)}</span>
                    <div className="flex gap-2 text-sm text-gray-500 font-semibold mt-2">
                      <span>{pkg.servings} Guests</span> &bull; <span>{formatDuration(pkg.durationMins)}</span>
                    </div>
                  </div>

                  <div className="flex-1">
                    <ul className="space-y-4 mb-8">
                      {pkg.features.map((feature, i) => (
                        <li key={i} className="flex items-start gap-3 text-gray-600 text-sm">
                          <Check className="text-gold w-5 h-5 shrink-0" />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <Link 
                    href={`/get-a-quote?package=${pkg.slug}`}
                    className={`block w-full py-4 text-center font-bold rounded-full transition-colors ${
                      pkg.isPopular ? 'bg-gold text-white hover:bg-yellow-500 shadow-gold' : 'bg-navy-mid text-white hover:bg-navy'
                    }`}
                  >
                    Select Package
                  </Link>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Add-ons & Custom Quote CTA */}
      <section className="py-24 bg-navy/80 backdrop-blur-2xl text-cream relative">
        <div className="container mx-auto px-4 max-w-4xl text-center">
          <AnimatedSection>
            <h2 className="text-3xl md:text-4xl font-display font-bold mb-6">Need Something Bigger?</h2>
            <p className="text-lg text-cream/80 mb-10">
              For events exceeding 500 guests, multi-day festivals, or custom branding requirements, our Bespoke Events team will build a custom proposal.
            </p>
            <Link 
              href="/get-a-quote?package=custom"
              className="inline-flex items-center px-8 py-4 bg-coral text-white font-bold rounded-full hover:bg-coral-dark hover:scale-105 transition-all shadow-coral-lg"
            >
              Request a Custom Quote &rarr;
            </Link>
            
            <p className="mt-8 text-sm text-cream/40">
              Prefer to talk to a human? Call us at <a href={`tel:${BUSINESS_CONFIG.contact.phone1Formatted}`} className="text-cream hover:text-white transition-colors">{BUSINESS_CONFIG.contact.phone1}</a>
            </p>
          </AnimatedSection>
        </div>
      </section>
    </div>
  );
}
