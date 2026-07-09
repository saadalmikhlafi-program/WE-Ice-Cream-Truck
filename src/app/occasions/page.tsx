import { Metadata } from "next";
import { constructMetadata } from "@/lib/seo";
import AnimatedSection from "@/components/shared/AnimatedSection";
import ServicesMarquee from "@/components/home/ServicesMarquee";
import FinalCTA from "@/components/home/FinalCTA";
import BrandCarousel from "@/components/shared/BrandCarousel";

export const metadata: Metadata = constructMetadata({
  title: "Ice Cream Truck Services | WE Ice Cream Truck",
  description: "From corporate events and weddings to birthday parties and school festivals. Discover how WE Ice Cream Truck can elevate your next Massachusetts event.",
  url: "/occasions",
});

export default function ServicesHubPage() {
  return (
    <div className="min-h-screen">
      <section className="pt-36 pb-20 text-center px-4">
        <AnimatedSection className="max-w-3xl mx-auto">
          <h1 className="text-5xl md:text-6xl font-display font-bold text-navy mb-6">
            Services for <span className="text-coral italic font-light">Every</span> Occasion.
          </h1>
          <p className="text-xl text-charcoal/70 mb-8">
            Whether it's an intimate backyard birthday or a 2,000-person corporate campus event, we have the fleet, the experience, and the premium ice cream to make it perfect.
          </p>
        </AnimatedSection>
      </section>

      {/* We reuse the ServicesMarquee from the homepage as the visual core of this hub */}
      <ServicesMarquee theme="light" />

      <BrandCarousel />

      <FinalCTA />
    </div>
  );
}
