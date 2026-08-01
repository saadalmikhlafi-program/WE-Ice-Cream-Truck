import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { Metadata } from "next";
import { constructMetadata } from "@/lib/seo";
import { menuItems } from "@/data/menu";

interface PageProps {
  params: Promise<{
    slug: string;
  }>;
}

export function generateStaticParams() {
  return menuItems.map((item) => ({
    slug: item.slug,
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const item = menuItems.find((i) => i.slug === slug);

  if (!item) {
    return constructMetadata({
      title: "Not Found",
      description: "The requested ice cream item could not be found.",
    });
  }

  return constructMetadata({
    title: `${item.name} | WE Ice Cream Truck Menu`,
    description: item.description,
    url: `/menu/${item.slug}`,
    image: item.image,
  });
}

export default async function MenuItemPage({ params }: PageProps) {
  const { slug } = await params;
  const item = menuItems.find((i) => i.slug === slug);

  if (!item) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-gray-50 pt-24 pb-16 sm:pt-32 sm:pb-24">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
        {/* Breadcrumb / Back Link */}
        <Link
          href="/menu"
          className="inline-flex items-center text-sm font-bold text-navy/60 hover:text-coral transition-colors mb-8 sm:mb-12"
        >
          <svg
            className="w-4 h-4 mr-2"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M10 19l-7-7m0 0l7-7m-7 7h18"
            />
          </svg>
          Back to Menu
        </Link>

        <div className="bg-white rounded-[2rem] sm:rounded-[3rem] shadow-xl shadow-navy/5 overflow-hidden flex flex-col md:flex-row">
          {/* Image Section */}
          <div className="md:w-1/2 p-8 sm:p-12 md:p-16 flex items-center justify-center bg-gradient-to-br from-mint/10 to-blue/5">
            <div className="relative w-full aspect-square max-w-md">
              <Image
                src={item.image}
                alt={item.name}
                fill
                className="object-contain mix-blend-multiply drop-shadow-2xl hover:scale-105 transition-transform duration-500"
                sizes="(max-width: 768px) 100vw, 50vw"
                priority
              />
            </div>
          </div>

          {/* Details Section */}
          <div className="md:w-1/2 p-8 sm:p-12 md:p-16 flex flex-col justify-center">
            <div className="inline-flex items-center gap-2 mb-4">
              <span className="px-3 py-1 bg-coral/10 text-coral text-xs font-bold uppercase tracking-wider rounded-full">
                {item.category}
              </span>
              <span className="text-navy/40 text-sm font-semibold">
                By {item.brand}
              </span>
            </div>

            <h1 className="font-display font-black text-3xl sm:text-4xl md:text-5xl text-navy leading-tight mb-6">
              {item.name}
            </h1>

            <p className="font-sans text-lg text-navy/70 leading-relaxed mb-8">
              {item.description}
            </p>

            <div className="space-y-6 sm:space-y-8">
              {/* Dietary Information */}
              {item.dietary.length > 0 && (
                <div>
                  <h3 className="font-sans font-bold text-navy mb-3 flex items-center">
                    <svg
                      className="w-5 h-5 mr-2 text-mint"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                    Dietary Badges
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {item.dietary.map((diet, i) => (
                      <span
                        key={i}
                        className="px-3 py-1 bg-mint/10 text-mint-dark text-xs font-bold rounded-full border border-mint/20"
                      >
                        {diet}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Allergen Information */}
              {item.allergens.length > 0 && (
                <div>
                  <h3 className="font-sans font-bold text-navy mb-3 flex items-center">
                    <svg
                      className="w-5 h-5 mr-2 text-coral"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                      />
                    </svg>
                    Allergen Notice
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {item.allergens.map((allergen, i) => (
                      <span
                        key={i}
                        className="px-3 py-1 bg-gray-100 text-gray-600 text-xs font-semibold rounded-md border border-gray-200"
                      >
                        {allergen.includes("None") ? "Allergy-Friendly" : `Contains: ${allergen}`}
                      </span>
                    ))}
                  </div>
                  {!item.allergens.includes("None (Dairy Free)") && (
                    <p className="text-xs text-navy/40 mt-2">
                      Processed in a facility that may handle other common allergens.
                    </p>
                  )}
                </div>
              )}
            </div>

            <div className="mt-10 pt-8 border-t border-navy/5">
              <Link
                href="/book"
                className="inline-block bg-coral hover:bg-coral-dark text-white font-bold py-4 px-8 rounded-full transition-all hover:scale-105 hover:shadow-lg hover:shadow-coral/30"
              >
                Book Us For Your Event
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
