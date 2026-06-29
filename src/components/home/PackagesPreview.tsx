"use client";

import Link from "next/link";
import Image from "next/image";
import { TRUCK_PACKAGES, VAN_PACKAGES } from "@/lib/packages-data";
import { formatPrice } from "@/lib/utils";
import { ArrowRight, Check } from "lucide-react";
import { motion, Variants } from "framer-motion";

export default function PackagesPreview() {
  const featuredPackages = [
    TRUCK_PACKAGES[0],
    VAN_PACKAGES[0],
  ].filter(Boolean);

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 30 },
    show: { opacity: 1, y: 0, transition: { duration: 0.6, type: "spring" } },
  };

  return (
    <section className="relative bg-cream py-24 md:py-32 overflow-hidden">
      {/* Playful background element */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-coral/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none" />
      
      <div className="container mx-auto px-6 md:px-12 lg:px-24 relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-16 md:mb-24 text-center lg:text-left">
          <div className="max-w-2xl mx-auto lg:mx-0">
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="font-display font-black text-[clamp(2.5rem,5vw,4.5rem)] leading-tight text-navy mb-4"
            >
              Sweet <span className="text-coral underline decoration-wavy decoration-coral/30 underline-offset-8">Packages</span>
            </motion.h2>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="font-sans text-navy/70 text-[clamp(1.125rem,1.5vw,1.25rem)] leading-relaxed font-medium"
            >
              Whether it's the classic truck or the premium van, we have the perfect sweet experience for your event.
            </motion.p>
          </div>
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <Link 
              href="/packages"
              className="group inline-flex items-center gap-3 font-sans font-bold text-navy uppercase tracking-widest text-sm bg-white px-8 py-4 rounded-full border-2 border-navy/10 hover:border-coral hover:text-coral transition-all shadow-sm hover:shadow-md"
            >
              See All Packages 
              <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
            </Link>
          </motion.div>
        </div>

        {/* High-End Playful Cards */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 max-w-5xl mx-auto"
        >
          {featuredPackages.map((pkg) => (
            <motion.div 
              key={pkg.id}
              variants={itemVariants}
              whileHover={{ y: -10 }}
              className={`group flex flex-col bg-white rounded-[2.5rem] overflow-hidden border-4 transition-all duration-300 shadow-xl ${
                pkg.isPopular ? "border-coral shadow-coral/20 relative" : "border-white"
              }`}
            >
              {/* Image Header */}
              <div className="relative h-64 w-full bg-navy/5 overflow-hidden">
                <Image 
                  src={pkg.vehicleType === "TRUCK" ? "/images/classic-truck.jpg" : "/images/van-premium.jpg"}
                  alt={pkg.name}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                />
                {pkg.isPopular && (
                  <div className="absolute top-4 right-4 bg-coral text-white font-bold px-4 py-2 rounded-full text-xs uppercase tracking-widest shadow-lg z-10 animate-bounce">
                    Most Popular
                  </div>
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-navy/80 to-transparent z-0" />
                <h3 className="absolute bottom-6 left-8 font-display font-black text-3xl text-white z-10">{pkg.name}</h3>
              </div>

              <div className="p-8 md:p-10 flex flex-col flex-1">
                <p className="font-sans text-navy/70 text-lg font-medium mb-6 min-h-[56px]">{pkg.tagline}</p>

                <div className="mb-8 pb-8 border-b-2 border-navy/5 flex-1 flex items-end gap-3">
                  <span className="font-sans font-black text-[3.5rem] leading-none tracking-tighter text-coral">{formatPrice(pkg.price)}</span>
                  <div className="flex flex-col text-navy/50 font-bold text-xs uppercase tracking-widest mb-1.5">
                    <span>{pkg.servings} Guests</span>
                    <span>{pkg.durationMins / 60} Hours</span>
                  </div>
                </div>

                <ul className="flex flex-col gap-4 mb-10">
                  {pkg.features.slice(0, 4).map((feature, idx) => (
                    <li key={idx} className="flex items-start gap-4">
                      <div className="bg-coral/10 p-1 rounded-full shrink-0 mt-0.5">
                        <Check className="w-4 h-4 text-coral" />
                      </div>
                      <span className="font-sans text-navy/80 font-bold text-[0.95rem]">{feature}</span>
                    </li>
                  ))}
                </ul>

                <Link
                  href={`/get-a-quote?package=${pkg.slug}`}
                  className={`w-full py-5 rounded-full text-center font-sans font-black text-[0.9rem] tracking-widest uppercase transition-all duration-300 transform active:scale-95 ${
                    pkg.isPopular
                      ? "bg-coral text-white shadow-lg shadow-coral/30 hover:bg-navy"
                      : "bg-navy/5 text-navy hover:bg-navy hover:text-white"
                  }`}
                >
                  Book This Experience
                </Link>
              </div>
            </motion.div>
          ))}
        </motion.div>

      </div>
    </section>
  );
}
