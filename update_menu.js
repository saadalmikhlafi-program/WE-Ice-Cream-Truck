const fs = require('fs');
const categories = JSON.parse(fs.readFileSync('d:/project_weicecreamtruck/menu_grouped.json', 'utf8'));
const categoriesJson = JSON.stringify(categories, null, 2);

const newCode = `import { Metadata } from "next";
import { constructMetadata } from "@/lib/seo";
import Image from "next/image";
import FAQSection from "@/components/shared/FAQSection";

export const metadata: Metadata = constructMetadata({
  title: "Ice Cream Menu | WE Ice Cream Truck",
  description: "Explore our premium selection of nostalgic and modern pre-packaged ice cream novelties. We carry all your favorites from Good Humor, Popsicle, and more.",
  url: "/menu",
});

const menuCategories = ${categoriesJson};

const faqs = [
  {
    question: "Are these the only items you carry?",
    answer: "This is our core menu, but our trucks hold a massive variety of over 40+ different items. If you have a specific childhood favorite, let us know and we'll do our best to stock it for your event!"
  },
  {
    question: "Do you offer scooped ice cream?",
    answer: "To ensure the fastest service and maintain the highest level of hygiene, we specialize exclusively in premium, pre-packaged novelties. This allows us to serve large crowds quickly while keeping everyone safe."
  },
  {
    question: "How do you handle allergies?",
    answer: "Because all our items are pre-packaged in FDA-approved facilities, the risk of cross-contamination on the truck is virtually zero. We carry dairy-free, nut-free, and gluten-free options on every truck."
  }
];

export default function MenuPage() {
  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* Hero Section */}
      <section className="relative py-24 md:py-32 overflow-hidden">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-coral/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3 pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-mint/10 rounded-full blur-3xl translate-y-1/2 -translate-x-1/3 pointer-events-none" />
        
        <div className="container mx-auto px-6 md:px-12 lg:px-24 relative z-10 text-center">
          <span className="inline-block py-1.5 px-4 bg-navy/5 text-navy font-bold text-sm tracking-widest uppercase rounded-full mb-6">
            Sweet Selections
          </span>
          <h1 className="font-display font-black text-[clamp(3.5rem,7vw,6rem)] leading-[1.05] text-navy mb-6">
            The Ultimate <br />
            <span className="text-coral underline decoration-wavy decoration-coral/30 underline-offset-[12px]">Menu.</span>
          </h1>
          <p className="font-sans font-medium text-lg md:text-2xl text-navy/70 max-w-3xl mx-auto leading-relaxed">
            We serve only the highest quality pre-packaged novelties to ensure maximum hygiene, speed of service, and nostalgic joy.
          </p>
        </div>
      </section>

      {/* Menu Categories */}
      <section className="py-16 md:py-24 relative z-10">
        <div className="container mx-auto px-6 md:px-12 lg:px-24 max-w-7xl">
          <div className="space-y-24">
            {menuCategories.map((category) => (
              <div key={category.name} className="relative">
                {/* Category Header */}
                <div className="mb-12 text-center md:text-left">
                  <h2 className="font-display font-black text-4xl md:text-5xl text-navy mb-4">
                    {category.name}
                  </h2>
                  <p className="font-sans font-medium text-xl text-navy/60">
                    {category.description}
                  </p>
                </div>

                {/* Grid */}
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 md:gap-8">
                  {category.items.map((item, idx) => (
                    <div 
                      key={idx} 
                      className="group bg-white p-6 rounded-[2rem] border-2 border-navy/5 hover:border-coral hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col">
                      {item.image && (
                        <div className="aspect-square relative mb-6 rounded-xl overflow-hidden bg-gray-50 flex items-center justify-center p-4">
                          <Image
                            src={item.image}
                            alt={item.name}
                            fill
                            className="object-contain mix-blend-multiply group-hover:scale-105 transition-transform duration-500"
                            sizes="(max-width: 768px) 50vw, 25vw"
                          />
                        </div>
                      )}
                      <h3 className="font-display font-black text-xl text-navy mb-2 group-hover:text-coral transition-colors">
                        {item.name}
                      </h3>
                      {item.desc && (
                        <p className="font-sans font-medium text-sm text-navy/70 leading-relaxed mt-auto">
                          {item.desc}
                        </p>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Dietary Notice */}
      <section className="py-20 bg-navy relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('/images/hero-cinematic.jpg')] opacity-10 bg-cover bg-center mix-blend-overlay" />
        <div className="container mx-auto px-6 md:px-12 relative z-10 text-center max-w-4xl">
          <div className="inline-block p-4 bg-coral rounded-full mb-8">
            <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" /></svg>
          </div>
          <h2 className="font-display font-black text-4xl md:text-5xl text-white mb-6">
            Allergy-Friendly Options
          </h2>
          <p className="font-sans font-medium text-xl text-white/80 leading-relaxed">
            We stock our trucks based on popularity and seasonal availability. While we always bring a massive variety to every event, if you have specific requests or allergy concerns (dairy-free, nut-free), please let us know when booking!
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
`;

fs.writeFileSync('d:/project_weicecreamtruck/src/app/menu/page.tsx', newCode, 'utf8');
console.log('Done!');
