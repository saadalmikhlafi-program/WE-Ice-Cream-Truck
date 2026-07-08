import { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { constructMetadata } from "@/lib/seo";
import { getServiceBySlug, getAllServices } from "@/lib/services-data";
import AnimatedSection from "@/components/shared/AnimatedSection";
import { fadeUp } from "@/lib/animations";
import { CheckCircle2, ArrowRight } from "lucide-react";
import BrandCarousel from "@/components/shared/BrandCarousel";

interface ServicePageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateStaticParams() {
  const services = getAllServices();
  return services.map((service) => ({
    slug: service.slug,
  }));
}

export async function generateMetadata({ params }: ServicePageProps): Promise<Metadata> {
  const resolvedParams = await params;
  const service = getServiceBySlug(resolvedParams.slug);

  if (!service) {
    return constructMetadata({ title: "Service Not Found" });
  }

  return constructMetadata({
    title: `${service.name} Ice Cream Catering MA | WE Ice Cream Truck`,
    description: service.shortDescription,
    url: `/occasions/${service.slug}`,
  });
}

export default async function ServicePage({ params }: ServicePageProps) {
  const resolvedParams = await params;
  const service = getServiceBySlug(resolvedParams.slug);

  if (!service) {
    notFound();
  }

  return (
    <div className="min-h-screen pt-12 pb-24">
      <div className="container mx-auto px-4">
        {/* Breadcrumb */}
        <nav className="mb-8 text-sm text-charcoal/60">
          <Link href="/" className="hover:text-coral transition-colors">Home</Link>
          <span className="mx-2">/</span>
          <Link href="/occasions" className="hover:text-coral transition-colors">Services</Link>
          <span className="mx-2">/</span>
          <span className="text-charcoal font-medium">{service.name}</span>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-center">
          {/* Content */}
          <AnimatedSection variants={fadeUp} className="max-w-2xl">
            <h1 className="text-4xl md:text-6xl font-display font-bold text-navy mb-6 leading-tight">
              {service.name}
            </h1>
            <p className="text-xl text-coral font-medium mb-6">
              {service.shortDescription}
            </p>
            <p className="text-lg text-charcoal/80 mb-8 leading-relaxed">
              {service.longDescription}
            </p>

            <ul className="space-y-4 mb-10">
              {service.features.map((feature, idx) => (
                <li key={idx} className="flex items-start gap-3">
                  <CheckCircle2 className="text-coral shrink-0 mt-1" size={20} />
                  <span className="text-charcoal font-medium">{feature}</span>
                </li>
              ))}
            </ul>

            <Link 
              href="/get-a-quote" 
              className="inline-flex items-center gap-2 px-8 py-4 bg-coral text-white font-bold rounded-full hover:bg-navy transition-colors duration-300 shadow-lg hover:shadow-xl hover:-translate-y-1"
            >
              {service.ctaText}
              <ArrowRight size={20} />
            </Link>
          </AnimatedSection>

          {/* Image */}
          <AnimatedSection variants={fadeUp} className="relative aspect-square md:aspect-[4/3] lg:aspect-square w-full rounded-3xl overflow-hidden shadow-2xl">
            <Image 
              src={service.imagePath} 
              alt={`${service.name} catering by WE Ice Cream Truck`}
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
              priority
            />
          </AnimatedSection>
        </div>
      </div>
      <div className="mt-24">
        <BrandCarousel />
      </div>
    </div>
  );
}
