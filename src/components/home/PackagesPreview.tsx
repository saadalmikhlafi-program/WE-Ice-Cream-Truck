"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { fadeUp, staggerContainer, cardHover } from "@/lib/animations";
import AnimatedSection from "@/components/shared/AnimatedSection";
import { TRUCK_PACKAGES, VAN_PACKAGES, formatDuration } from "@/lib/packages-data";
import { formatPrice } from "@/lib/utils";
import { Check } from "lucide-react";

export default function PackagesPreview() {
  const [activeTab, setActiveTab] = useState<"TRUCK" | "VAN">("TRUCK");
  
  const currentPackages = activeTab === "TRUCK" ? TRUCK_PACKAGES : VAN_PACKAGES;

  return (
    <section className="py-24 bg-navy-mid text-cream relative overflow-hidden">
      <div className="container mx-auto px-4 relative z-10">
        <AnimatedSection className="text-center max-w-2xl mx-auto mb-12">
          <h2 className="text-4xl md:text-5xl font-display font-bold mb-4">
            Choose Your Experience
          </h2>
          <p className="text-cream/70 text-lg">
            Transparent pricing. Premium service. No hidden fees.
          </p>
        </AnimatedSection>

        {/* Custom Tabs */}
        <AnimatedSection delay={0.2} className="flex justify-center mb-16">
          <div className="inline-flex bg-navy p-1.5 rounded-full border border-white/10">
            <button
              onClick={() => setActiveTab("TRUCK")}
              className={`relative px-8 py-3 rounded-full text-sm font-bold uppercase tracking-wider transition-colors ${
                activeTab === "TRUCK" ? "text-navy" : "text-cream hover:text-white"
              }`}
            >
              {activeTab === "TRUCK" && (
                <motion.div
                  layoutId="activeTab"
                  className="absolute inset-0 bg-white rounded-full"
                  transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                />
              )}
              <span className="relative z-10">🚚 Ice Cream Truck</span>
            </button>
            <button
              onClick={() => setActiveTab("VAN")}
              className={`relative px-8 py-3 rounded-full text-sm font-bold uppercase tracking-wider transition-colors ${
                activeTab === "VAN" ? "text-navy" : "text-cream hover:text-white"
              }`}
            >
              {activeTab === "VAN" && (
                <motion.div
                  layoutId="activeTab"
                  className="absolute inset-0 bg-white rounded-full"
                  transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                />
              )}
              <span className="relative z-10">🚐 Sprinter Van</span>
            </button>
          </div>
        </AnimatedSection>

        {/* Packages Grid */}
        <div className="max-w-7xl mx-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              variants={staggerContainer}
              initial="hidden"
              animate="visible"
              exit={{ opacity: 0, y: -20, transition: { duration: 0.2 } }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            >
              {currentPackages.map((pkg) => (
                <motion.div
                  key={pkg.id}
                  variants={fadeUp}
                  whileHover={cardHover.hover}
                  className={`group relative flex flex-col bg-white rounded-3xl p-8 text-charcoal shadow-lg ${
                    pkg.isPopular ? "ring-4 ring-gold ring-offset-4 ring-offset-navy-mid" : ""
                  }`}
                >
                  <div className="absolute top-4 right-4 bg-white/90 backdrop-blur text-charcoal text-xs font-bold uppercase tracking-wider py-1 px-3 rounded-full shadow-sm z-10">
                    {pkg.vehicleLabel}
                  </div>
                
                  {/* Package Image Preview */}
                  <div className="h-40 -mx-8 -mt-8 mb-6 relative overflow-hidden bg-gray-100 rounded-t-[1.5rem]">
                    <div 
                      className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-105"
                      style={{ backgroundImage: `url('/images/${pkg.vehicleType === 'TRUCK' ? 'classic-truck.jpg' : pkg.vehicleType === 'VAN' ? 'van-premium.jpg' : 'hero-cinematic.jpg'}')` }}
                    />
                  </div>
                
                  <div className="mb-8">
                    <h3 className="text-xl font-display font-bold text-charcoal mb-1">{pkg.name}</h3>
                    <p className="text-gray-500 text-sm">{pkg.tagline}</p>
                  </div>

                  <div className="mb-8">
                    <div className="flex items-baseline gap-1">
                      <span className="text-4xl font-extrabold">{formatPrice(pkg.price)}</span>
                    </div>
                    <div className="flex items-center gap-2 mt-2 text-sm text-gray-500 font-medium">
                      <span>{pkg.servings} Guests</span>
                      <span>&bull;</span>
                      <span>{formatDuration(pkg.durationMins)}</span>
                    </div>
                  </div>

                  <ul className="space-y-4 mb-8 flex-1">
                    {pkg.features.slice(0, 4).map((feature, idx) => (
                      <li key={idx} className="flex items-start gap-3 text-sm text-gray-700">
                        <Check className="w-5 h-5 text-coral shrink-0" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>

                  <Link
                    href={`/get-a-quote?package=${pkg.slug}`}
                    className={`block w-full py-4 rounded-full text-center font-bold transition-all ${
                      pkg.isPopular
                        ? "bg-coral text-white hover:bg-coral-dark shadow-coral"
                        : "bg-navy-mid text-white hover:bg-navy"
                    }`}
                  >
                    Select Package
                  </Link>
                </motion.div>
              ))}
            </motion.div>
          </AnimatePresence>
        </div>

        <AnimatedSection delay={0.4} className="mt-16 text-center">
          <p className="text-cream/70 mb-4">Planning a large-scale event with 200+ guests?</p>
          <Link href="/services/corporate-events" className="text-gold font-bold hover:text-white transition-colors">
            Explore our Bespoke Custom Events &rarr;
          </Link>
        </AnimatedSection>
      </div>
    </section>
  );
}
