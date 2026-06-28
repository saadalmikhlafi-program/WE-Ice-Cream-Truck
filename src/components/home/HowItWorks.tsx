"use client";

import { motion } from "framer-motion";
import AnimatedSection from "@/components/shared/AnimatedSection";
import { fadeUp, staggerContainer } from "@/lib/animations";
import { CheckCircle2, CalendarDays, IceCream } from "lucide-react";

export default function HowItWorks() {
  const steps = [
    {
      title: "Choose Your Package",
      description: "Select the perfect truck or van package for your guest count and budget.",
      icon: IceCream,
      color: "bg-coral",
    },
    {
      title: "Tell Us Your Date",
      description: "Fill out our quick 2-minute quote form to check availability in your city.",
      icon: CalendarDays,
      color: "bg-gold",
    },
    {
      title: "We Handle Everything",
      description: "We arrive on time, serve premium ice cream, and create unforgettable memories.",
      icon: CheckCircle2,
      color: "bg-mint",
    },
  ];

  return (
    <section className="py-24 bg-sand relative overflow-hidden">
      <div className="container mx-auto px-4 relative z-10">
        <AnimatedSection className="text-center max-w-2xl mx-auto mb-16">
          <span className="inline-block px-3 py-1 rounded-full bg-white text-charcoal text-xs font-bold uppercase tracking-wider mb-4 border border-charcoal/10 shadow-sm">
            How It Works
          </span>
          <h2 className="text-4xl md:text-5xl font-display font-bold mb-4 text-charcoal">
            As Easy as 1, 2, 3
          </h2>
          <p className="text-gray-600 text-lg">
            Booking an ice cream truck shouldn't be complicated. We've streamlined the process so you can focus on the celebration.
          </p>
        </AnimatedSection>

        <motion.div 
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="max-w-5xl mx-auto relative"
        >
          {/* Desktop connecting line */}
          <div className="hidden md:block absolute top-12 left-[10%] right-[10%] h-0.5 bg-gray-200 border-t-2 border-dashed border-gray-300 z-0" />
          
          {/* Mobile connecting line */}
          <div className="md:hidden absolute top-[10%] bottom-[10%] left-10 w-0.5 bg-gray-200 border-l-2 border-dashed border-gray-300 z-0" />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8">
            {steps.map((step, index) => (
              <motion.div 
                key={index} 
                variants={fadeUp} 
                className="relative z-10 flex flex-row md:flex-col items-center md:text-center gap-6 md:gap-8"
              >
                {/* Step Circle */}
                <div className={`shrink-0 w-20 h-20 md:w-24 md:h-24 rounded-full ${step.color} text-white flex items-center justify-center shadow-lg transform transition-transform hover:scale-110`}>
                  <step.icon size={36} strokeWidth={2.5} />
                </div>
                
                {/* Step Content */}
                <div>
                  <div className="text-gold font-bold text-sm tracking-widest uppercase mb-2">
                    Step 0{index + 1}
                  </div>
                  <h3 className="text-2xl font-display font-bold text-charcoal mb-3">
                    {step.title}
                  </h3>
                  <p className="text-gray-600">
                    {step.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Decorative background circle */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-white/40 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3 pointer-events-none" />
    </section>
  );
}
