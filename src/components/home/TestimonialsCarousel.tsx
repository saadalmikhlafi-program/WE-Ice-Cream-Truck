"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import AnimatedSection from "@/components/shared/AnimatedSection";
import { fadeUp } from "@/lib/animations";
import { Star, ChevronLeft, ChevronRight } from "lucide-react";
import { BUSINESS_CONFIG } from "@/lib/config";

const testimonials = [
  {
    id: 1,
    name: "Sarah M.",
    city: "Boston, MA",
    event: "Wedding Reception",
    rating: 5,
    text: "Having the WE Ice Cream Truck at our wedding was the highlight of the night! The guests were completely surprised, the ice cream was premium, and the staff was so professional. It made our special day truly unforgettable.",
    avatar: "S",
  },
  {
    id: 2,
    name: "David T.",
    city: "Cambridge, MA",
    event: "Corporate Event",
    rating: 5,
    text: "We booked the Sprinter Van for our employee appreciation day. They served 150 people flawlessly in under 90 minutes. The branding was spot on and the team couldn't stop talking about it. Highly recommend for any corporate gathering.",
    avatar: "D",
  },
  {
    id: 3,
    name: "Jessica & Tom",
    city: "Newton, MA",
    event: "Kids Birthday Party",
    rating: 5,
    text: "The look on my son's face when the truck pulled up was priceless! The driver was so sweet with the kids, and the ordering process was completely stress-free. Best birthday party idea we've ever had.",
    avatar: "J",
  },
];

export default function TestimonialsCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const nextSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev === testimonials.length - 1 ? 0 : prev + 1));
  }, []);

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev === 0 ? testimonials.length - 1 : prev - 1));
  };

  useEffect(() => {
    if (isPaused) return;
    
    const timer = setInterval(() => {
      nextSlide();
    }, 6000);

    return () => clearInterval(timer);
  }, [isPaused, nextSlide]);

  return (
    <section className="py-24 bg-sand relative overflow-hidden">
      <div className="container mx-auto px-4">
        <AnimatedSection className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-4xl md:text-5xl font-display font-bold text-charcoal mb-4">
            What Our Customers Say
          </h2>
          <div className="flex items-center justify-center gap-2 text-gold mb-4">
            {[1, 2, 3, 4, 5].map((i) => (
              <Star key={i} size={24} fill="currentColor" />
            ))}
          </div>
          <p className="text-gray-600 font-medium">
            Based on {BUSINESS_CONFIG.stats.reviewCount} reviews across Massachusetts.
          </p>
        </AnimatedSection>

        <AnimatedSection variants={fadeUp} className="max-w-4xl mx-auto relative">
          {/* Carousel Container */}
          <div 
            className="relative bg-white rounded-[2rem] p-8 md:p-16 shadow-lg min-h-[320px] md:min-h-[400px] flex items-center justify-center"
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
          >
            {/* Quote Marks */}
            <div className="absolute top-8 left-8 text-8xl font-display text-sand leading-none opacity-50 select-none">
              &ldquo;
            </div>

            <AnimatePresence mode="wait">
              <motion.div
                key={currentIndex}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.4 }}
                className="relative z-10 text-center"
              >
                <p className="text-xl md:text-3xl font-display italic text-charcoal mb-8 leading-relaxed text-balance">
                  "{testimonials[currentIndex].text}"
                </p>
                <div className="flex flex-col items-center justify-center gap-3">
                  <div className="w-14 h-14 rounded-full bg-navy text-cream flex items-center justify-center text-xl font-bold">
                    {testimonials[currentIndex].avatar}
                  </div>
                  <div>
                    <h4 className="font-bold text-charcoal">{testimonials[currentIndex].name}</h4>
                    <p className="text-sm text-gray-500">{testimonials[currentIndex].event} &bull; {testimonials[currentIndex].city}</p>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Controls */}
          <div className="flex items-center justify-center gap-4 mt-8">
            <button 
              onClick={prevSlide}
              className="p-3 rounded-full bg-white text-navy hover:bg-coral hover:text-white transition-colors shadow-sm"
              aria-label="Previous testimonial"
            >
              <ChevronLeft size={24} />
            </button>
            <div className="flex gap-2">
              {testimonials.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentIndex(idx)}
                  className={`w-2.5 h-2.5 rounded-full transition-all ${
                    idx === currentIndex ? "bg-coral w-8" : "bg-gray-300 hover:bg-gray-400"
                  }`}
                  aria-label={`Go to slide ${idx + 1}`}
                />
              ))}
            </div>
            <button 
              onClick={nextSlide}
              className="p-3 rounded-full bg-white text-navy hover:bg-coral hover:text-white transition-colors shadow-sm"
              aria-label="Next testimonial"
            >
              <ChevronRight size={24} />
            </button>
          </div>
        </AnimatedSection>

        <div className="mt-12 text-center">
          <a 
            href="#" 
            className="inline-flex items-center text-navy font-bold hover:text-coral transition-colors"
          >
            See all {BUSINESS_CONFIG.stats.reviewCount} reviews on Google &rarr;
          </a>
        </div>
      </div>
    </section>
  );
}
