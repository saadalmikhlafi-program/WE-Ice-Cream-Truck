"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { fadeUp, staggerContainer } from "@/lib/animations";
import AnimatedSection from "@/components/shared/AnimatedSection";

export default function GalleryStrip() {
  const images = [
    { src: "/images/gallery-1.jpg", alt: "Corporate event serving", type: "Corporate" },
    { src: "/images/gallery-2.jpg", alt: "Kids birthday party", type: "Birthday" },
    { src: "/images/gallery-3.jpg", alt: "Wedding reception ice cream", type: "Wedding" },
    { src: "/images/gallery-4.jpg", alt: "School festival", type: "School" },
    { src: "/images/gallery-5.jpg", alt: "Ice cream truck at sunset", type: "Festival" },
  ];

  return (
    <section className="py-24 bg-white overflow-hidden">
      <div className="container mx-auto px-4 mb-12">
        <AnimatedSection className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="max-w-xl">
            <h2 className="text-4xl md:text-5xl font-display font-bold text-charcoal mb-4">
              Real Events. <span className="text-coral italic font-light">Real Smiles.</span>
            </h2>
            <p className="text-gray-600 text-lg">
              Don't just take our word for it. See the joy we bring to celebrations across Massachusetts.
            </p>
          </div>
          <Link 
            href="/gallery" 
            className="inline-flex items-center text-navy font-bold hover:text-coral transition-colors group"
          >
            View Full Gallery 
            <span className="ml-2 group-hover:translate-x-1 transition-transform">&rarr;</span>
          </Link>
        </AnimatedSection>
      </div>

      <AnimatedSection 
        variants={staggerContainer}
        className="flex gap-4 md:gap-6 px-4 md:px-8 overflow-x-auto snap-x snap-mandatory hide-scrollbar pb-8 max-w-[2000px] mx-auto"
      >
        {images.map((img, idx) => (
          <motion.div 
            key={idx} 
            variants={fadeUp}
            className="snap-center shrink-0 w-[280px] md:w-[400px] aspect-[4/5] md:aspect-square relative rounded-[2rem] overflow-hidden group cursor-pointer shadow-md"
          >
            {/* Image Placeholder */}
            <div 
              className="absolute inset-0 bg-gray-200 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
              style={{ backgroundImage: `url('${img.src}')` }}
            />
            
            {/* Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-navy/80 via-transparent to-transparent opacity-60 md:opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            
            {/* Content */}
            <div className="absolute bottom-0 left-0 right-0 p-6 md:translate-y-4 md:opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
              <span className="inline-block px-3 py-1 bg-white/20 backdrop-blur-md border border-white/30 text-white text-xs font-bold uppercase tracking-wider rounded-full">
                {img.type}
              </span>
            </div>
          </motion.div>
        ))}
      </AnimatedSection>

      <style jsx global>{`
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .hide-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </section>
  );
}
