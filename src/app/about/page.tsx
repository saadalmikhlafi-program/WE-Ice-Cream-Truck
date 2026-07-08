import { Metadata } from "next";
import { constructMetadata } from "@/lib/seo";
import { BUSINESS_CONFIG } from "@/lib/config";
import Image from "next/image";
import FAQSection from "@/components/shared/FAQSection";
import BrandCarousel from "@/components/shared/BrandCarousel";

export const metadata: Metadata = constructMetadata({
  title: "About Us | WE Ice Cream Truck",
  description: `Learn about the story behind ${BUSINESS_CONFIG.name}. We are Massachusetts' most trusted ice cream truck rental service.`,
  url: "/about",
});

const faqs = [
  {
    question: "Where are you based and how far do you travel?",
    answer: "We are based in Massachusetts and travel across the entire state. Depending on the distance, a small travel fee may apply, but we are happy to bring the joy to your location."
  },
  {
    question: "Are your trucks licensed and insured?",
    answer: "Absolutely. WE Ice Cream Truck is fully licensed, permitted, and carries comprehensive liability insurance. We adhere to the strictest health and safety standards."
  },
  {
    question: "Do you have options for people with allergies?",
    answer: "Yes! We carry a wide variety of pre-packaged treats, including nut-free, dairy-free, and gluten-free options. Because our items are pre-packaged, the risk of cross-contamination is significantly reduced."
  },
  {
    question: "How far in advance should we book?",
    answer: "We recommend booking as early as possible, especially for weekend events in the summer, as our calendar fills up quickly. However, we always try our best to accommodate last-minute requests if we have a truck available."
  }
];

export default function AboutPage() {
  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* Hero Section */}
      <section className="relative py-24 md:py-32 overflow-hidden">
        <div className="absolute inset-0 bg-navy">
          <div className="absolute inset-0 bg-[url('/images/hero-cinematic.jpg')] opacity-20 bg-cover bg-center mix-blend-overlay" />
          <div className="absolute inset-0 bg-gradient-to-t from-navy via-navy/80 to-transparent" />
        </div>
        
        <div className="container mx-auto px-6 md:px-12 lg:px-24 relative z-10 text-center">
          <h1 className="font-display font-black text-[clamp(3rem,6vw,5.5rem)] leading-[1.1] text-white mb-6">
            More Than Just <br />
            <span className="text-coral relative inline-block">
              Ice Cream
              <svg className="absolute -bottom-2 md:-bottom-4 left-0 w-full text-gold" viewBox="0 0 200 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M0 10C50 -10 150 30 200 10" stroke="currentColor" strokeWidth="6" strokeLinecap="round"/>
              </svg>
            </span>
          </h1>
          <p className="font-sans font-medium text-lg md:text-2xl text-white/80 max-w-3xl mx-auto leading-relaxed">
            We are on a mission to deliver joy, nostalgia, and unforgettable memories to every celebration across Massachusetts.
          </p>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-24 md:py-32 relative">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-coral/5 rounded-full blur-3xl -translate-y-1/2 pointer-events-none" />
        
        <div className="container mx-auto px-6 md:px-12 lg:px-24 relative z-10">
          <div className="flex flex-col lg:flex-row gap-16 items-center">
            
            {/* Image Side */}
            <div className="w-full lg:w-1/2 relative">
              <div className="relative aspect-[4/5] rounded-[3rem] overflow-hidden shadow-2xl border-8 border-white rotate-[-2deg] hover:rotate-0 transition-transform duration-500">
                <Image 
                  src="/images/gallery-8.jpg" 
                  alt="Our Story" 
                  fill 
                  className="object-cover"
                />
              </div>
              <div className="absolute -bottom-8 -right-8 bg-coral text-white p-8 rounded-full w-40 h-40 flex flex-col items-center justify-center shadow-xl rotate-[12deg] border-4 border-white">
                <span className="font-display font-black text-4xl leading-none">10+</span>
                <span className="font-sans font-bold text-xs uppercase tracking-widest text-center mt-1">Years of Joy</span>
              </div>
            </div>

            {/* Text Side */}
            <div className="w-full lg:w-1/2">
              <h2 className="font-display font-black text-4xl md:text-5xl text-navy mb-8">
                The Sweet <span className="text-coral">Beginning</span>
              </h2>
              <div className="space-y-6 font-sans text-navy/70 text-lg leading-relaxed font-medium">
                <p>
                  {BUSINESS_CONFIG.name} was born out of a simple idea: the ice cream truck experience shouldn't be left in the past, and it shouldn't be limited to just driving down neighborhood streets.
                </p>
                <p>
                  We wanted to elevate the classic ice cream truck into a premium service that could cater to elegant weddings, massive corporate campuses, and high-end private parties—without losing the nostalgic charm that makes it so magical.
                </p>
                <p>
                  Today, we operate a fleet of fully-restored classic trucks and modern, high-volume Sprinter vans, serving over {BUSINESS_CONFIG.stats.eventsServed} events across the Commonwealth. We are fully licensed, insured, and committed to five-star service.
                </p>
              </div>
            </div>

          </div>
        </div>
      </section>

      <BrandCarousel />

      {/* The Promise Section */}
      <section className="py-24 md:py-32 bg-navy relative overflow-hidden">
        <div className="absolute -top-[300px] -left-[300px] w-[600px] h-[600px] bg-coral/10 rounded-full blur-3xl pointer-events-none" />
        
        <div className="container mx-auto px-6 md:px-12 lg:px-24 relative z-10">
          <div className="text-center mb-20">
            <h2 className="font-display font-black text-4xl md:text-5xl text-white mb-6">
              The {BUSINESS_CONFIG.name} Promise
            </h2>
            <p className="font-sans font-medium text-xl text-white/70 max-w-2xl mx-auto">
              What sets us apart isn't just our ice cream—it's how we serve it.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { num: "01", title: "Punctuality", desc: "We arrive early, set up seamlessly, and are ready to serve exactly when you need us.", color: "text-coral" },
              { num: "02", title: "Premium Quality", desc: "We only serve the most popular, high-quality, pre-packaged ice cream brands everyone loves.", color: "text-gold" },
              { num: "03", title: "Immaculate Cleanliness", desc: "Our vehicles are detailed daily and pass all board of health inspections with flying colors.", color: "text-mint" },
            ].map((item, idx) => (
              <div key={idx} className="bg-white/5 border border-white/10 rounded-[2.5rem] p-10 hover:bg-white/10 transition-colors">
                <div className={`font-display font-black text-5xl mb-6 opacity-80 ${item.color}`}>{item.num}</div>
                <h3 className="font-sans font-bold text-2xl text-white mb-4">{item.title}</h3>
                <p className="font-sans text-white/70 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contextual FAQ */}
      <FAQSection 
        title="About Our Service"
        subtitle="Common questions about how we operate."
        items={faqs}
      />
    </div>
  );
}
