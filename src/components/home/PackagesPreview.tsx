"use client";

import Link from "next/link";
import Image from "next/image";
import { formatPrice } from "@/lib/utils";
import { ArrowRight, Check } from "lucide-react";
import { motion, Variants } from "framer-motion";

export default function PackagesPreview({ featuredPackages }: { featuredPackages: any[] }) {

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
    <section className="relative py-24 md:py-32 overflow-hidden">
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

        {/* High-End Clean Cards (No fake images) */}
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
              className={`group flex flex-col bg-white rounded-[2.5rem] overflow-hidden border transition-all duration-300 shadow-xl ${
                pkg.isPopular ? "border-coral shadow-coral/20 relative" : "border-gray-100 shadow-gray-100/80"
              }`}
            >
              {pkg.isPopular && (
                <div className="absolute top-0 right-8 bg-coral text-white text-[10px] font-black uppercase tracking-widest px-4 py-2 rounded-b-xl shadow-lg z-10">
                  Most Popular
                </div>
              )}

              {/* Card Image */}
              {pkg.imageUrl && (
                <div className="relative w-full aspect-[4/3] shrink-0 overflow-hidden">
                  <div className="absolute inset-0 bg-navy/10 z-10 group-hover:bg-transparent transition-colors duration-500 pointer-events-none" />
                  <Image 
                    src={pkg.imageUrl} 
                    alt={pkg.name} 
                    fill 
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                  {/* Smooth gradient blending into the header */}
                  <div className={`absolute bottom-0 left-0 w-full h-2/3 z-10 bg-gradient-to-t ${pkg.isPopular ? "from-navy" : "from-white"} via-${pkg.isPopular ? "navy/50" : "white/50"} to-transparent pointer-events-none`} />
                </div>
              )}

              {/* Card Header */}
              <div className={`relative z-20 px-8 md:px-10 pb-8 md:pb-10 pt-4 -mt-16 border-b ${pkg.isPopular ? "bg-transparent border-navy/10" : "bg-transparent border-gray-100"}`}>
                <div className={`text-xs font-black uppercase tracking-widest mb-3 ${pkg.isPopular ? "text-coral" : "text-coral"}`}>
                  {pkg.durationLabel} · {pkg.servings} Servings
                </div>
                <h3 className={`font-display font-black text-3xl md:text-4xl mb-2 ${pkg.isPopular ? "text-white drop-shadow-sm" : "text-navy"}`}>
                  {pkg.name}
                </h3>
                <p className={`text-sm md:text-base font-medium mb-8 min-h-[48px] ${pkg.isPopular ? "text-white/70" : "text-gray-500"}`}>
                  {pkg.tagline}
                </p>
                <div className="flex items-baseline gap-2">
                  <span className={`text-6xl font-black tracking-tighter ${pkg.isPopular ? "text-white" : "text-navy"}`}>
                    ${pkg.price}
                  </span>
                  <span className={`font-bold text-sm ${pkg.isPopular ? "text-white/40" : "text-gray-400"}`}>
                    base price
                  </span>
                </div>
              </div>

              {/* Card Body */}
              <div className="p-8 md:p-10 flex flex-col flex-1 bg-white">
                <ul className="flex flex-col gap-4 mb-10 flex-1">
                  {pkg.features.slice(0, 4).map((feature, idx) => (
                    <li key={idx} className="flex items-start gap-4">
                      <div className="bg-coral/10 p-1.5 rounded-full shrink-0 mt-0.5">
                        <Check className="w-4 h-4 text-coral" strokeWidth={3} />
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
                      : "bg-navy text-white hover:bg-[#1a2a4a] shadow-navy/20"
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
