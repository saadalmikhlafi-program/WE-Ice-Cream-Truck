import { Metadata } from "next";
import { constructMetadata } from "@/lib/seo";
import AnimatedSection from "@/components/shared/AnimatedSection";
import FinalCTA from "@/components/home/FinalCTA";

export const metadata: Metadata = constructMetadata({
  title: "Event Gallery | WE Ice Cream Truck",
  description: "See the joy we bring to corporate events, weddings, and birthday parties across Massachusetts. Browse our ice cream truck event gallery.",
  url: "/gallery",
});

const galleryImages = [
  { id: 1, src: "/images/hero-cinematic.jpg", alt: "Cinematic elegant wedding setup", category: "Wedding" },
  { id: 2, src: "/images/classic-truck.jpg", alt: "Classic ice cream truck in neighborhood", category: "Birthday" },
  { id: 3, src: "/images/van-premium.jpg", alt: "Sleek Sprinter van at corporate campus", category: "Corporate" },
  { id: 4, src: "/images/gallery-8.jpg", alt: "Happy children getting ice cream", category: "Festival" },
  { id: 5, src: "/images/hero-cinematic.jpg", alt: "Evening lighting on ice cream truck", category: "Wedding" },
  { id: 6, src: "/images/classic-truck.jpg", alt: "Serving premium ice cream treats", category: "Corporate" },
];

export default function GalleryPage() {
  return (
    <div className="bg-sand min-h-screen pt-[88px]">
      {/* Header */}
      <section className="py-20 bg-navy text-cream text-center px-4">
        <AnimatedSection className="max-w-3xl mx-auto">
          <h1 className="text-5xl md:text-6xl font-display font-bold mb-6">
            Real Events. <span className="text-coral italic font-light">Real Smiles.</span>
          </h1>
          <p className="text-xl text-cream/80">
            A picture is worth a thousand words. See why Massachusetts chooses us for their most important celebrations.
          </p>
        </AnimatedSection>
      </section>

      {/* Masonry Gallery Grid (Simplified CSS Grid for now) */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {galleryImages.map((image, idx) => (
              <AnimatedSection key={image.id} delay={idx * 0.1}>
                <div className="group relative rounded-3xl overflow-hidden aspect-square md:aspect-[4/5] shadow-sm hover:shadow-xl transition-all duration-300">
                  {/* Image Placeholder */}
                  <div 
                    className="absolute inset-0 bg-gray-200 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
                    style={{ backgroundImage: `url('${image.src}')` }}
                  />
                  
                  {/* Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-navy/90 via-navy/20 to-transparent opacity-60 md:opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  
                  {/* Content */}
                  <div className="absolute bottom-0 left-0 right-0 p-8 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
                    <span className="inline-block px-4 py-1.5 bg-white/20 backdrop-blur-md border border-white/30 text-white text-xs font-bold uppercase tracking-wider rounded-full mb-2">
                      {image.category}
                    </span>
                    <p className="text-white font-medium">{image.alt}</p>
                  </div>
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
