import Link from "next/link";
import { ArrowRight } from "lucide-react";

const services = [
  { id: "01", name: "Corporate Events", desc: "Employee appreciation, product launches, and company picnics.", href: "/occasions/corporate-events" },
  { id: "02", name: "Weddings", desc: "Elegant late-night treats for your special day.", href: "/occasions/wedding-receptions" },
  { id: "03", name: "Birthday Parties", desc: "Unforgettable moments for kids and adults alike.", href: "/occasions/birthday-parties" },
  { id: "04", name: "School Events", desc: "Graduations, field days, and campus celebrations.", href: "/occasions/school-occasions" },
  { id: "05", name: "Fundraisers", desc: "Sweet treats that make a real difference for your cause.", href: "/occasions/fundraisers" },
  { id: "06", name: "Marketing Activations", desc: "Custom branding and promo events.", href: "/occasions/marketing-events" },
];

interface ServicesMarqueeProps {
  theme?: "dark" | "light";
}

export default function ServicesMarquee({ theme = "dark" }: ServicesMarqueeProps) {
  const isLight = theme === "light";
  
  const bgClass = isLight ? "bg-transparent text-navy" : "bg-navy text-cream";
  const descClass = isLight ? "text-navy/70" : "text-cream/70";
  const borderClass = isLight ? "border-navy/10" : "border-cream/10";
  const numClass = isLight ? "text-navy/30" : "text-cream/30";
  const itemDescClass = isLight ? "text-navy/60" : "text-cream/60";
  const arrowBorderClass = isLight ? "border-navy/20 text-navy" : "border-cream/20 text-cream";
  const arrowHoverClass = isLight ? "group-hover:bg-coral group-hover:border-coral group-hover:text-white" : "group-hover:bg-coral group-hover:border-coral group-hover:text-cream";

  return (
    <section className={`${bgClass} py-24 md:py-40 transition-colors duration-500`}>
      <div className="container mx-auto px-6 md:px-12 lg:px-24">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-20 md:mb-32">
          <h2 className="font-display font-light text-[clamp(3rem,6vw,5.5rem)] leading-tight mb-8">
            Every Celebration.<br />
            <span className="italic text-coral">Every City.</span>
          </h2>
          <p className={`font-sans text-[clamp(1.125rem,1.5vw,1.35rem)] ${descClass} leading-relaxed max-w-xl`}>
            From intimate backyard gatherings to 2,000-person corporate festivals. 
            If there's a reason to celebrate, there's a reason for premium ice cream.
          </p>
        </div>

        {/* Editorial Services List */}
        <div className={`flex flex-col border-t ${borderClass}`}>
          {services.map((service) => (
            <Link 
              key={service.id}
              href={service.href}
              className={`group flex flex-col md:flex-row md:items-center justify-between py-10 md:py-14 border-b ${borderClass} hover:border-coral transition-colors duration-500`}
            >
              <div className="flex items-start md:items-center gap-8 md:gap-16 lg:gap-24">
                <span className={`font-sans font-light ${numClass} text-2xl md:text-3xl mt-1 md:mt-0 transition-colors group-hover:text-coral`}>
                  {service.id}
                </span>
                <div>
                  <h3 className="font-sans font-medium text-3xl md:text-5xl tracking-tight mb-3 group-hover:translate-x-2 transition-transform duration-500">
                    {service.name}
                  </h3>
                  <p className={`font-sans ${itemDescClass} text-lg max-w-md group-hover:translate-x-2 transition-transform duration-500 delay-75`}>
                    {service.desc}
                  </p>
                </div>
              </div>
              
              <div className="mt-8 md:mt-0 flex justify-end md:opacity-0 md:-translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-500">
                <div className={`w-14 h-14 rounded-full border flex items-center justify-center transition-colors duration-300 ${arrowBorderClass} ${arrowHoverClass}`}>
                  <ArrowRight className="w-6 h-6" />
                </div>
              </div>
            </Link>
          ))}
        </div>

      </div>
    </section>
  );
}
