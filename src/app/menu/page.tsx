import { Metadata } from "next";
import { constructMetadata } from "@/lib/seo";
import Image from "next/image";
import Link from "next/link";
import FAQSection from "@/components/shared/FAQSection";
import BrandCarousel from "@/components/shared/BrandCarousel";
import { menuItems } from "@/data/menu";

export const metadata: Metadata = constructMetadata({
  title: "Ice Cream Menu | WE Ice Cream Truck",
  description:
    "Explore our premium selection of nostalgic and modern pre-packaged ice cream novelties. We carry all your favorites from Good Humor, Popsicle, and more.",
  url: "/menu",
});

const faqs = [
  {
    question: "Are these the only items you carry?",
    answer:
      "This is our core menu, but our trucks hold a massive variety of over 40+ different items. If you have a specific childhood favorite, let us know and we'll do our best to stock it for your event!",
  },
  {
    question: "Do you offer scooped ice cream?",
    answer:
      "To ensure the fastest service and maintain the highest level of hygiene, we specialize exclusively in premium, pre-packaged novelties. This allows us to serve large crowds quickly while keeping everyone safe.",
  },
  {
    question: "How do you handle allergies?",
    answer:
      "Because all our items are pre-packaged in FDA-approved facilities, the risk of cross-contamination on the truck is virtually zero. We carry dairy-free, nut-free, and gluten-free options on every truck.",
  },
];

export default function MenuPage() {
  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* Hero Section */}
      <section className="relative py-16 sm:py-20 md:py-28 overflow-hidden">
        <div className="absolute top-0 right-0 w-[300px] sm:w-[500px] h-[300px] sm:h-[500px] bg-coral/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3 pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-[250px] sm:w-[400px] h-[250px] sm:h-[400px] bg-mint/10 rounded-full blur-3xl translate-y-1/2 -translate-x-1/3 pointer-events-none" />

        <div className="container mx-auto px-4 sm:px-6 md:px-12 lg:px-24 relative z-10 text-center">
          <span className="inline-block py-1.5 px-4 bg-navy/5 text-navy font-bold text-xs sm:text-sm tracking-widest uppercase rounded-full mb-4 sm:mb-6">
            🌟 Premium Menu
          </span>
          <h1 className="font-display font-black text-4xl sm:text-5xl md:text-6xl lg:text-7xl leading-[1.05] text-navy mb-4 sm:mb-6">
            Sweet Selections & <br className="hidden sm:block" />
            <span className="text-coral">Nostalgic Joy.</span>
          </h1>
          <p className="font-sans font-medium text-base sm:text-lg md:text-xl text-navy/70 max-w-3xl mx-auto leading-relaxed">
            Experience our carefully curated selection of premium ice cream
            novelties, nostalgic favorites, and refreshing treats designed to
            delight every palate at your event. We serve only the highest
            quality pre-packaged items to ensure maximum hygiene and speed of
            service.
          </p>
        </div>
      </section>

      {/* Menu Categories */}
      <section className="py-10 sm:py-16 md:py-20 relative z-10">
        <div className="container mx-auto px-4 sm:px-6 md:px-8 lg:px-12 max-w-7xl">
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4 md:gap-6">
            {menuItems.map((item) => (
              <Link href={`/menu/${item.slug}`} key={item.id}>
                <div className="group bg-white p-3 sm:p-4 md:p-5 rounded-2xl sm:rounded-3xl border border-navy/5 hover:border-coral/40 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 flex flex-col h-full cursor-pointer">
                  {item.image && (
                    <div className="aspect-square relative mb-3 sm:mb-4 rounded-xl overflow-hidden bg-gray-50 flex items-center justify-center p-2 sm:p-3">
                      <Image
                        src={item.image}
                        alt={item.name}
                        fill
                        className="object-contain mix-blend-multiply group-hover:scale-105 transition-transform duration-500"
                        sizes="(max-width: 640px) 45vw, (max-width: 768px) 30vw, 25vw"
                      />
                    </div>
                  )}
                  <h3 className="font-sans font-bold text-xs sm:text-sm md:text-base text-navy leading-tight group-hover:text-coral transition-colors flex-grow">
                    {item.name}
                  </h3>
                  
                  {/* Tags */}
                  <div className="mt-3 flex flex-wrap gap-1">
                    {item.dietary.map((diet, i) => (
                      <span key={i} className="text-[10px] font-bold px-2 py-0.5 bg-mint/10 text-mint-dark rounded-full">
                        {diet}
                      </span>
                    ))}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <BrandCarousel />

      {/* Dietary Notice */}
      <section className="py-14 sm:py-16 md:py-20 bg-navy relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('/images/hero-cinematic.jpg')] opacity-10 bg-cover bg-center mix-blend-overlay" />
        <div className="container mx-auto px-4 sm:px-6 md:px-12 relative z-10 text-center max-w-4xl">
          <div className="inline-block p-3 sm:p-4 bg-coral rounded-full mb-6 sm:mb-8">
            <svg
              className="w-6 h-6 sm:w-8 sm:h-8 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
              />
            </svg>
          </div>
          <h2 className="font-display font-black text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-white mb-4 sm:mb-6">
            Allergy-Friendly Options
          </h2>
          <p className="font-sans font-medium text-base sm:text-lg md:text-xl text-white/80 leading-relaxed">
            We stock our trucks based on popularity and seasonal availability.
            While we always bring a massive variety to every event, if you have
            specific requests or allergy concerns (dairy-free, nut-free), please
            let us know when booking!
          </p>
        </div>
      </section>

      <FAQSection
        title="Menu Questions"
        subtitle="Common questions about our treats."
        items={faqs}
      />
    </div>
  );
}
