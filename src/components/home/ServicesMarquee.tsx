"use client";

import { useRef } from "react";
import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import { fadeUp, staggerContainer } from "@/lib/animations";
import AnimatedSection from "@/components/shared/AnimatedSection";
import { 
  PartyPopper, 
  Briefcase, 
  Heart, 
  GraduationCap, 
  Music, 
  Store 
} from "lucide-react";

const services = [
  { name: "Birthdays", icon: PartyPopper, href: "/services/birthday-parties", color: "text-coral" },
  { name: "Corporate", icon: Briefcase, href: "/services/corporate-events", color: "text-gold" },
  { name: "Weddings", icon: Heart, href: "/services/weddings", color: "text-coral" },
  { name: "Schools", icon: GraduationCap, href: "/services/school-events", color: "text-mint" },
  { name: "Festivals", icon: Music, href: "/services/festivals", color: "text-gold" },
  { name: "Promotions", icon: Store, href: "/services/marketing-events", color: "text-coral" },
];

export default function ServicesMarquee() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  // Parallax for the featured image
  const y = useTransform(scrollYProgress, [0, 1], ["-10%", "10%"]);

  return (
    <section ref={containerRef} className="py-24 bg-navy text-cream overflow-hidden">
      <div className="container mx-auto px-4 mb-16">
        <AnimatedSection className="text-center max-w-2xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-display font-bold mb-4">
            Every Celebration. Every City.
          </h2>
          <p className="text-cream/70 text-lg">
            From intimate backyard birthdays to 2,000-person corporate festivals. 
            If there's a reason to celebrate, there's a reason for ice cream.
          </p>
        </AnimatedSection>
      </div>

      {/* Horizontal Scroll Strip (CSS scroll snap on mobile, grid on desktop) */}
      <AnimatedSection 
        variants={staggerContainer}
        className="w-full flex overflow-x-auto pb-8 snap-x snap-mandatory hide-scrollbar md:grid md:grid-cols-3 lg:grid-cols-6 gap-4 md:gap-6 px-4 md:px-8 max-w-[1600px] mx-auto"
      >
        {services.map((service, index) => (
          <motion.div key={index} variants={fadeUp} className="snap-center shrink-0 w-[240px] md:w-auto">
            <Link 
              href={service.href}
              className="block bg-navy-mid border border-white/5 p-8 rounded-3xl hover:bg-white/5 transition-all group h-full flex flex-col justify-between aspect-square md:aspect-auto md:min-h-[220px]"
            >
              <service.icon className={`w-10 h-10 ${service.color} mb-6`} />
              <div>
                <h3 className="text-xl font-bold mb-2 group-hover:text-coral transition-colors">
                  {service.name}
                </h3>
                <div className="flex items-center text-sm font-semibold text-cream/50 group-hover:text-coral transition-colors">
                  Learn more <span className="ml-2 group-hover:translate-x-1 transition-transform">&rarr;</span>
                </div>
              </div>
            </Link>
          </motion.div>
        ))}
      </AnimatedSection>

      {/* Featured Spotlight Card */}
      <div className="container mx-auto px-4 mt-8 md:mt-16">
        <AnimatedSection delay={0.2}>
          <div className="relative rounded-[2rem] overflow-hidden aspect-[4/3] md:aspect-[21/9] group">
            {/* Parallax Image */}
            <motion.div 
              style={{ backgroundImage: `url('/images/corporate-event.jpg')`, y, backgroundSize: 'cover', backgroundPosition: 'center' }} 
              className="absolute -inset-[10%]"
            />
            
            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-navy/90 via-navy/40 to-transparent" />
            
            {/* Content */}
            <div className="absolute bottom-0 left-0 right-0 p-8 md:p-12 md:w-2/3">
              <span className="inline-block px-3 py-1 rounded-full bg-gold/20 text-gold text-xs font-bold uppercase tracking-wider mb-4 border border-gold/30">
                Featured Case Study
              </span>
              <h3 className="text-3xl md:text-5xl font-display font-bold mb-4">
                Employee Appreciation Day
              </h3>
              <p className="text-cream/80 text-lg mb-6 max-w-xl">
                See how we served 500+ employees in under two hours with multiple trucks and custom-branded experiences.
              </p>
              <Link 
                href="/services/corporate-events" 
                className="inline-block px-6 py-3 bg-white text-navy font-bold rounded-full hover:bg-cream hover:scale-105 transition-all"
              >
                Explore Corporate Events
              </Link>
            </div>
          </div>
        </AnimatedSection>
      </div>

    </section>
  );
}
