import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function GalleryStrip() {
  const images = [
    { src: "/images/gallery-1.jpg", alt: "Corporate event serving", type: "Corporate" },
    { src: "/images/gallery-2.jpg", alt: "Kids birthday party", type: "Birthday" },
    { src: "/images/gallery-3.jpg", alt: "Wedding reception ice cream", type: "Wedding" },
  ];

  return (
    <section className="relative py-24 md:py-40">
      <div className="container mx-auto px-6 md:px-12 lg:px-24">
        
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-16 md:mb-24">
          <div className="max-w-2xl">
            <h2 className="font-display font-light text-[clamp(3rem,6vw,5.5rem)] leading-[1.05] text-navy mb-6 tracking-tighter">
              Real Events.<br />
              <span className="italic text-coral">Real Smiles.</span>
            </h2>
            <p className="font-sans text-navy/70 text-[clamp(1.125rem,1.5vw,1.35rem)] leading-relaxed">
              Don't just take our word for it. See the joy we bring to celebrations across Massachusetts.
            </p>
          </div>
          <Link 
            href="/gallery"
            className="group flex items-center gap-3 font-sans font-bold text-navy uppercase tracking-widest text-[0.75rem] border-b-2 border-navy/20 pb-2 hover:border-coral hover:text-coral transition-colors"
          >
            View Full Gallery 
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>

        {/* Asymmetric Gallery Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-8">
          
          <div className="md:col-span-8 group relative rounded-[2rem] overflow-hidden aspect-[4/3] md:aspect-auto md:h-[650px] bg-navy/5">
            <div 
              className="absolute inset-0 bg-cover bg-center transition-transform duration-[1.5s] group-hover:scale-105"
              style={{ backgroundImage: `url('${images[0].src}')` }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-navy/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <div className="absolute bottom-8 left-8 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
              <span className="inline-block px-4 py-2 bg-white/20 backdrop-blur-md text-white font-sans text-[0.65rem] font-bold uppercase tracking-widest rounded-full border border-white/20">
                {images[0].type}
              </span>
            </div>
          </div>

          <div className="md:col-span-4 flex flex-col gap-6 md:gap-8 md:h-[650px]">
            <div className="flex-1 group relative rounded-[2rem] overflow-hidden bg-navy/5 aspect-[4/3] md:aspect-auto">
              <div 
                className="absolute inset-0 bg-cover bg-center transition-transform duration-[1.5s] group-hover:scale-105"
                style={{ backgroundImage: `url('${images[1].src}')` }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-navy/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="absolute bottom-6 left-6 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
                <span className="inline-block px-4 py-2 bg-white/20 backdrop-blur-md text-white font-sans text-[0.65rem] font-bold uppercase tracking-widest rounded-full border border-white/20">
                  {images[1].type}
                </span>
              </div>
            </div>
            <div className="flex-1 group relative rounded-[2rem] overflow-hidden bg-navy/5 aspect-[4/3] md:aspect-auto">
              <div 
                className="absolute inset-0 bg-cover bg-center transition-transform duration-[1.5s] group-hover:scale-105"
                style={{ backgroundImage: `url('${images[2].src}')` }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-navy/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="absolute bottom-6 left-6 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
                <span className="inline-block px-4 py-2 bg-white/20 backdrop-blur-md text-white font-sans text-[0.65rem] font-bold uppercase tracking-widest rounded-full border border-white/20">
                  {images[2].type}
                </span>
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
