import { Metadata } from "next";
import { constructMetadata } from "@/lib/seo";
import AnimatedSection from "@/components/shared/AnimatedSection";
import FinalCTA from "@/components/home/FinalCTA";

export const metadata: Metadata = constructMetadata({
  title: "Ice Cream Menu | WE Ice Cream Truck",
  description: "Explore our premium selection of nostalgic and modern pre-packaged ice cream novelties. We carry all your favorites from Good Humor, Popsicle, and more.",
  url: "/menu",
});

const menuCategories = [
  {
    name: "The Classics",
    description: "Nostalgic favorites that never go out of style.",
    items: [
      { name: "Strawberry Shortcake", desc: "Vanilla ice cream with a strawberry core, coated in cake crunch." },
      { name: "Chocolate Eclair", desc: "Vanilla ice cream with a chocolate core, coated in cake crunch." },
      { name: "Toasted Almond", desc: "Vanilla ice cream coated in toasted almond crunch." },
      { name: "Ice Cream Sandwich", desc: "Classic vanilla ice cream between two chocolate wafers." },
      { name: "Choco Taco", desc: "Vanilla ice cream in a waffle cone taco, coated in chocolate and peanuts." },
      { name: "Klondike Bar", desc: "Square of vanilla ice cream coated in a thick chocolate shell." },
    ]
  },
  {
    name: "Character Faces",
    description: "Kids' favorites featuring iconic characters with gumball eyes.",
    items: [
      { name: "SpongeBob SquarePants", desc: "Cotton candy & fruit punch flavor." },
      { name: "Spider-Man", desc: "Strawberry & lemon flavor." },
      { name: "Minions", desc: "Banana & blue raspberry flavor." },
      { name: "Sonic the Hedgehog", desc: "Cherry & blue raspberry flavor." },
    ]
  },
  {
    name: "Fruity & Refreshing",
    description: "Dairy-free, allergen-friendly options perfect for hot summer days.",
    items: [
      { name: "Bomb Pop (Original)", desc: "Cherry, lime, and blue raspberry." },
      { name: "SpongeBob Pop", desc: "Fruit punch and cotton candy flavor." },
      { name: "Lemon Cooler", desc: "Refreshing lemon ice." },
      { name: "Watermelon Slice", desc: "Watermelon ice with chocolate chip 'seeds'." },
    ]
  },
  {
    name: "Premium Cones",
    description: "The classic ice cream parlor experience on the go.",
    items: [
      { name: "King Cone (Vanilla)", desc: "Vanilla ice cream with chocolate swirl and peanuts." },
      { name: "King Cone (Chocolate)", desc: "Chocolate ice cream with chocolate swirl." },
      { name: "Cookies & Cream Cone", desc: "Cookies and cream ice cream in a chocolate cone." },
    ]
  }
];

export default function MenuPage() {
  return (
    <div className="bg-sand min-h-screen pt-[88px]">
      <section className="py-20 bg-navy text-cream text-center px-4">
        <AnimatedSection className="max-w-3xl mx-auto">
          <h1 className="text-5xl md:text-6xl font-display font-bold mb-6">
            Our <span className="text-coral italic font-light">Menu.</span>
          </h1>
          <p className="text-xl text-cream/80">
            We serve only the highest quality pre-packaged novelties to ensure maximum hygiene, speed of service, and nostalgic joy.
          </p>
        </AnimatedSection>
      </section>

      <section className="py-24 bg-white">
        <div className="container mx-auto px-4 max-w-5xl">
          
          <AnimatedSection className="mb-16 text-center max-w-2xl mx-auto">
            <span className="inline-block px-4 py-2 bg-mint/10 text-mint font-bold uppercase tracking-wider rounded-full mb-6">
              Allergy Friendly Options Available
            </span>
            <p className="text-gray-600">
              We stock our trucks based on popularity and seasonal availability. While we always bring a massive variety to every event, if you have specific requests or allergy concerns (dairy-free, nut-free), please let us know when booking!
            </p>
          </AnimatedSection>

          <div className="space-y-16">
            {menuCategories.map((category, idx) => (
              <AnimatedSection key={category.name} delay={idx * 0.1}>
                <div className="border-b-2 border-navy mb-8 pb-4">
                  <h2 className="text-3xl font-display font-bold text-charcoal">{category.name}</h2>
                  <p className="text-gray-500 mt-2">{category.description}</p>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-8">
                  {category.items.map((item, i) => (
                    <div key={i} className="flex flex-col">
                      <h3 className="font-bold text-lg text-charcoal flex items-center justify-between">
                        {item.name}
                        <span className="hidden md:block flex-1 border-b border-dotted border-gray-300 mx-4 relative top-[4px]"></span>
                      </h3>
                      <p className="text-gray-600 text-sm mt-1">{item.desc}</p>
                    </div>
                  ))}
                </div>
              </AnimatedSection>
            ))}
          </div>

        </div>
      </section>

      <FinalCTA />
    </div>
  );
}
