"use client";

import Image from "next/image";

const brands = [
  { name: "Good Humor", logo: "/images/brands/boston-legend-ice-cream-truck-good-humor.png" },
  { name: "Richie's Italian Ice", logo: "/images/brands/boston-legend-ice-cream-truck-richies-italian-ice.png" },
  { name: "Popsicle", logo: "/images/brands/boston-legend-ice-cream-truck-popsicle.png" },
  { name: "Blue Bunny", logo: "/images/brands/boston-legend-ice-cream-truck-blue-bunny.png" },
  { name: "Hood", logo: "/images/brands/boston-legend-ice-cream-truck-hood.png" },
  { name: "Klondike", logo: "/images/brands/boston-legend-ice-cream-truck-klondike.png" }
];

export default function BrandCarousel() {
  return (
    <section className="py-16 overflow-hidden">
      <div className="container mx-auto px-6 mb-10 text-center">
        <h2 className="font-display font-black text-3xl md:text-4xl text-navy">
          Experience the finest ice cream brands served straight from our trucks!
        </h2>
      </div>

      {/* Marquee Container */}
      <div className="relative flex w-full flex-nowrap items-center overflow-hidden">
        {/* We duplicate the content to ensure seamless infinite scrolling */}
        <div className="flex w-max animate-marquee items-center justify-center gap-16 md:gap-24 px-8">
          {[...brands, ...brands, ...brands].map((brand, idx) => (
            <div key={idx} className="flex-shrink-0 w-32 md:w-48 transition-transform duration-300 hover:scale-105">
              <Image
                src={brand.logo}
                alt={brand.name}
                width={200}
                height={100}
                className="w-full h-auto object-contain drop-shadow-sm"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
