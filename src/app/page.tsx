import { Metadata } from "next";
import { BUSINESS_CONFIG } from "@/lib/config";
import { constructMetadata } from "@/lib/seo";

import HeroSection from "@/components/home/HeroSection";
import TrustStats from "@/components/home/TrustStats";
import ServicesMarquee from "@/components/home/ServicesMarquee";
import BrandCarousel from "@/components/shared/BrandCarousel";
import HowItWorks from "@/components/home/HowItWorks";
import GalleryStrip from "@/components/home/GalleryStrip";
import PackagesPreview from "@/components/home/PackagesPreview";
import TestimonialsCarousel from "@/components/home/TestimonialsCarousel";
import CityMapSection from "@/components/home/CityMapSection";
import AIConciergeTeaser from "@/components/home/AIConciergeTeaser";
import FinalCTA from "@/components/home/FinalCTA";

export const metadata: Metadata = constructMetadata({
  title: "Premium Ice Cream Truck Rental in Massachusetts",
  description: "Massachusetts' most trusted premium ice cream truck catering. Serving weddings, corporate events, and parties across all of MA. Book your unforgettable sweet moment today.",
});

export default function HomePage() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* 
        Phase 4 Roadmap:
        1. Cinematic Hero
        2. Trust Stats Grid
        3. Dark Services Marquee
        4. How It Works Steps
        5. Image Gallery Strip
        6. Packages Preview (Dark)
        7. Testimonials Carousel
        8. Interactive MA Map
        9. AI Concierge Teaser
        10. Cinematic Final CTA
      */}
      
      <HeroSection />
      <TrustStats />
      <ServicesMarquee />
      <BrandCarousel />
      <HowItWorks />
      <GalleryStrip />
      <PackagesPreview />
      <TestimonialsCarousel />
      <CityMapSection />
      <AIConciergeTeaser />
      <FinalCTA />
    </div>
  );
}
