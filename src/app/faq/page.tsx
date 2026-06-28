import { Metadata } from "next";
import { constructMetadata } from "@/lib/seo";
import { getFAQSchema } from "@/lib/schema";
import AnimatedSection from "@/components/shared/AnimatedSection";
import FinalCTA from "@/components/home/FinalCTA";
import { BUSINESS_CONFIG } from "@/lib/config";
import { ChevronDown } from "lucide-react";

export const metadata: Metadata = constructMetadata({
  title: "Frequently Asked Questions | WE Ice Cream Truck",
  description: "Have questions about renting an ice cream truck in Massachusetts? Find answers about pricing, packages, booking, and more.",
  url: "/faq",
});

const faqs = [
  {
    category: "Booking & Pricing",
    questions: [
      {
        q: "How much does it cost to rent an ice cream truck?",
        a: "Our classic truck packages start at $299. The final cost depends on the number of guests, duration of service, and the package you choose. We pride ourselves on transparent pricing with absolutely no hidden fees."
      },
      {
        q: "How far in advance should I book?",
        a: "For summer weekend events (May-September), we recommend booking at least 3-4 weeks in advance. However, if you have a last-minute request, please reach out! We have a large fleet and can often accommodate short-notice events."
      },
      {
        q: "Do you require a deposit?",
        a: "Yes, a 50% deposit is required to secure your date and time on our calendar. The remaining balance is due 48 hours before the event."
      }
    ]
  },
  {
    category: "Service Details",
    questions: [
      {
        q: "Where do you travel?",
        a: "We are proudly based in Revere, MA, and serve all of Massachusetts. Travel fees may apply for locations outside of our standard 25-mile radius."
      },
      {
        q: "What is the difference between the Classic Truck and the Sprinter Van?",
        a: "Our Classic Trucks are beautifully restored vintage vehicles that bring incredible nostalgia and play the iconic ice cream music—perfect for birthdays and outdoor parties. Our Sprinter Vans are sleek, modern, and designed for extreme high-volume service (up to 500 people per hour), making them ideal for massive corporate events or tight spaces."
      },
      {
        q: "Are you licensed and insured?",
        a: "Absolutely. We hold a comprehensive $2M liability insurance policy and carry all necessary health department and hawker/peddler licenses required to operate in Massachusetts."
      }
    ]
  },
  {
    category: "The Ice Cream",
    questions: [
      {
        q: "What kind of ice cream do you serve?",
        a: "We serve premium, pre-packaged novelty ice cream from the most beloved brands (Good Humor, Popsicle, Blue Bunny, etc.). This ensures the highest standards of hygiene and provides everyone with their classic favorites, from Choco Tacos to Strawberry Shortcake bars."
      },
      {
        q: "Do you have dairy-free or allergy-friendly options?",
        a: "Yes! Every package includes dairy-free, nut-free, and gluten-free fruit popsicle options to ensure that all your guests can enjoy a sweet treat safely."
      }
    ]
  }
];

export default function FAQPage() {
  // Generate structured data for Google
  const flatFaqs = faqs.flatMap(category => 
    category.questions.map(q => ({ question: q.q, answer: q.a }))
  );

  return (
    <div className="bg-sand min-h-screen pt-[88px]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(getFAQSchema(flatFaqs)) }}
      />

      <section className="py-20 bg-navy text-cream text-center px-4">
        <AnimatedSection className="max-w-3xl mx-auto">
          <h1 className="text-5xl md:text-6xl font-display font-bold mb-6">
            Frequently Asked <span className="text-coral italic font-light">Questions</span>
          </h1>
          <p className="text-xl text-cream/80">
            Everything you need to know about booking {BUSINESS_CONFIG.name}.
          </p>
        </AnimatedSection>
      </section>

      <section className="py-24 bg-white">
        <div className="container mx-auto px-4 max-w-4xl">
          {faqs.map((category, idx) => (
            <AnimatedSection key={category.category} delay={idx * 0.1} className="mb-16">
              <h2 className="text-3xl font-display font-bold text-charcoal mb-8 border-b-2 border-gray-100 pb-4">
                {category.category}
              </h2>
              <div className="space-y-6">
                {category.questions.map((faq, index) => (
                  <div key={index} className="bg-sand rounded-3xl p-8 border border-gray-100">
                    <h3 className="text-xl font-bold text-charcoal mb-4 flex items-start gap-4">
                      <span className="text-coral font-black text-2xl leading-none">Q.</span>
                      {faq.q}
                    </h3>
                    <p className="text-gray-600 pl-9 leading-relaxed">
                      {faq.a}
                    </p>
                  </div>
                ))}
              </div>
            </AnimatedSection>
          ))}

          <AnimatedSection className="mt-16 text-center p-12 bg-navy-mid rounded-3xl text-cream">
            <h3 className="text-2xl font-display font-bold mb-4">Still have questions?</h3>
            <p className="text-cream/80 mb-8">
              Our team is ready to help you plan the perfect event.
            </p>
            <a 
              href={`mailto:${BUSINESS_CONFIG.contact.email}`}
              className="inline-flex items-center px-8 py-4 bg-coral text-white font-bold rounded-full hover:bg-coral-dark hover:scale-105 transition-all"
            >
              Contact Us Directly &rarr;
            </a>
          </AnimatedSection>
        </div>
      </section>

      <FinalCTA />
    </div>
  );
}
