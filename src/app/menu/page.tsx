import { Metadata } from "next";
import { constructMetadata } from "@/lib/seo";
import Image from "next/image";
import Link from "next/link";
import FAQSection from "@/components/shared/FAQSection";
import { menuItems } from "@/data/menu";
import FinalCTA from "@/components/home/FinalCTA";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export const metadata: Metadata = constructMetadata({
  title: "Ice Cream Menu | WE Ice Cream Truck",
  description:
    "Explore our premium selection of nostalgic and modern pre-packaged ice cream novelties. We carry all your favorites from Good Humor, Popsicle, and more.",
  url: "/menu",
});

const faqs = [
  {
    question: "Are these the only items you carry?",
    answer:
      "This is our core menu, but our trucks hold a massive variety of over 40+ different items. If you have a specific childhood favorite, let us know and we'll do our best to stock it for your event!",
  },
  {
    question: "Do you offer scooped ice cream?",
    answer:
      "To ensure the fastest service and maintain the highest level of hygiene, we specialize exclusively in premium, pre-packaged novelties. This allows us to serve large crowds quickly while keeping everyone safe.",
  },
  {
    question: "How do you handle allergies?",
    answer:
      "Because all our items are pre-packaged in FDA-approved facilities, the risk of cross-contamination on the truck is virtually zero. We carry dairy-free, nut-free, and gluten-free options on every truck.",
  },
];

const CATEGORY_COLORS: Record<string, { bg: string; text: string; dot: string }> = {
  "Birthday Parties":   { bg: "bg-pink-50",   text: "text-pink-700",   dot: "bg-pink-400" },
  "Corporate Events":   { bg: "bg-blue-50",   text: "text-blue-700",   dot: "bg-blue-400" },
  "Weddings":           { bg: "bg-purple-50", text: "text-purple-700", dot: "bg-purple-400" },
  "Community Events":   { bg: "bg-green-50",  text: "text-green-700",  dot: "bg-green-400" },
};

function getCategoryStyle(name?: string | null) {
  if (!name) return { bg: "bg-coral/10", text: "text-coral", dot: "bg-coral" };
  return CATEGORY_COLORS[name] || { bg: "bg-coral/10", text: "text-coral", dot: "bg-coral" };
}

export default async function MenuPage() {
  let recentPosts: any[] = [];
  try {
    recentPosts = await prisma.post.findMany({
      where: { status: "PUBLISHED", deletedAt: null },
      orderBy: { publishedAt: "desc" },
      take: 3,
      include: { category: true },
    });
  } catch (err) {
    console.error("[Menu] Failed to fetch blog posts:", err);
  }

  return (
    <div className="relative min-h-screen overflow-hidden bg-cream text-navy">
      {/* Hero Section */}
      <section className="relative py-16 sm:py-20 md:py-28 overflow-hidden">
        <div className="absolute top-0 right-0 w-[300px] sm:w-[500px] h-[300px] sm:h-[500px] bg-coral/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3 pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-[250px] sm:w-[400px] h-[250px] sm:h-[400px] bg-mint/10 rounded-full blur-3xl translate-y-1/2 -translate-x-1/3 pointer-events-none" />

        <div className="container mx-auto px-4 sm:px-6 md:px-12 lg:px-24 relative z-10 text-center">
          <span className="inline-block py-1.5 px-4 bg-navy/5 text-navy font-bold text-xs sm:text-sm tracking-widest uppercase rounded-full mb-4 sm:mb-6">
            🌟 Premium Menu
          </span>
          <h1 className="font-display font-black text-4xl sm:text-5xl md:text-6xl lg:text-7xl leading-[1.05] text-navy mb-4 sm:mb-6">
            Sweet Selections & <br className="hidden sm:block" />
            <span className="text-coral">Nostalgic Joy.</span>
          </h1>
          <p className="font-sans font-medium text-base sm:text-lg md:text-xl text-navy/70 max-w-3xl mx-auto leading-relaxed">
            Experience our carefully curated selection of premium ice cream
            novelties, nostalgic favorites, and refreshing treats designed to
            delight every palate at your event. We serve only the highest
            quality pre-packaged items to ensure maximum hygiene and speed of
            service.
          </p>
        </div>
      </section>

      {/* Menu Categories */}
      <section className="py-10 sm:py-16 md:py-20 relative z-10">
        <div className="container mx-auto px-4 sm:px-6 md:px-8 lg:px-12 max-w-7xl">
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4 md:gap-6">
            {menuItems.map((item) => (
              <Link href={`/menu/${item.slug}`} key={item.id}>
                <div className="group bg-white p-3 sm:p-4 md:p-5 rounded-2xl sm:rounded-3xl border border-navy/5 hover:border-coral/40 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 flex flex-col h-full cursor-pointer">
                  {item.image && (
                    <div className="aspect-square relative mb-3 sm:mb-4 rounded-xl overflow-hidden bg-gray-50 flex items-center justify-center p-2 sm:p-3">
                      <Image
                        src={item.image}
                        alt={item.name}
                        fill
                        className="object-contain mix-blend-multiply group-hover:scale-105 transition-transform duration-500"
                        sizes="(max-width: 640px) 45vw, (max-width: 768px) 30vw, 25vw"
                      />
                    </div>
                  )}
                  <h3 className="font-sans font-bold text-xs sm:text-sm md:text-base text-navy leading-tight group-hover:text-coral transition-colors flex-grow">
                    {item.name}
                  </h3>
                  
                  {/* Tags */}
                  <div className="mt-3 flex flex-wrap gap-1">
                    {item.dietary.map((diet, i) => (
                      <span key={i} className="text-[10px] font-bold px-2 py-0.5 bg-mint/10 text-mint-dark rounded-full">
                        {diet}
                      </span>
                    ))}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Brands Showcase */}
      <section className="py-16 bg-navy/5 border-y border-navy/10 relative overflow-hidden">
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[url('/patterns/topography.svg')] bg-repeat" />
        <div className="container mx-auto px-4 text-center relative z-10">
          <p className="text-sm md:text-base font-bold text-navy/60 uppercase tracking-[0.2em] mb-10">
            Experience the finest ice cream brands served straight from our trucks!
          </p>
          <div className="flex flex-wrap justify-center gap-6 md:gap-12 opacity-70">
            {['Blue Bunny', 'Good Humor', 'Popsicle', 'Blue Ribbon', 'Dove', 'Bomb Pop', 'Snickers', 'Twix', "Reese's"].map(brand => (
              <span key={brand} className="text-xl md:text-2xl font-black text-navy hover:text-coral transition-colors cursor-default hover:scale-105 transform">
                {brand}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Blog Posts Section */}
      {recentPosts.length > 0 && (
        <section className="py-20 bg-cream">
          <div className="container mx-auto px-6 max-w-7xl">
            <div className="flex justify-between items-end mb-12">
              <div>
                <span className="inline-block py-1 px-3 bg-navy/5 text-navy font-bold text-xs tracking-widest uppercase rounded-full mb-3">
                  Latest Events
                </span>
                <h2 className="text-3xl md:text-4xl font-black text-navy">
                  Sweet <span className="text-coral">Stories</span>
                </h2>
              </div>
              <Link href="/blog" className="hidden sm:inline-flex items-center gap-2 text-navy font-bold hover:text-coral transition-colors">
                View All Events &rarr;
              </Link>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {recentPosts.map((post) => {
                const style = getCategoryStyle(post.category?.name);
                return (
                  <Link key={post.id} href={`/blog/${post.slug}`} className="group block bg-white rounded-[2rem] border border-navy/5 overflow-hidden hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
                    <div className="relative aspect-[4/3] bg-navy/5 overflow-hidden">
                      {post.featuredImage ? (
                        <Image src={post.featuredImage} alt={post.title} fill className="object-cover transition-transform duration-500 group-hover:scale-105" />
                      ) : (
                        <div className="absolute inset-0 flex items-center justify-center text-navy/20">
                          <svg className="w-12 h-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                          </svg>
                        </div>
                      )}
                      <div className="absolute top-4 left-4">
                        <div className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full ${style.bg} ${style.text} backdrop-blur-md text-xs font-bold uppercase tracking-wider`}>
                          <span className={`w-1.5 h-1.5 rounded-full ${style.dot}`} />
                          {post.category?.name || "Event"}
                        </div>
                      </div>
                    </div>
                    <div className="p-8">
                      <h3 className="text-xl font-bold text-navy mb-3 line-clamp-2 group-hover:text-coral transition-colors">
                        {post.title}
                      </h3>
                      <p className="text-navy/60 text-sm line-clamp-2 leading-relaxed">
                        {post.excerpt}
                      </p>
                    </div>
                  </Link>
                );
              })}
            </div>
            
            <div className="mt-8 text-center sm:hidden">
              <Link href="/blog" className="inline-flex items-center justify-center w-full py-4 bg-navy/5 text-navy font-bold rounded-2xl hover:bg-navy/10 transition-colors">
                View All Events
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* Dietary Notice */}
      <section className="py-14 sm:py-16 md:py-20 bg-navy relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('/images/hero-cinematic.jpg')] opacity-10 bg-cover bg-center mix-blend-overlay" />
        <div className="container mx-auto px-4 sm:px-6 md:px-12 relative z-10 text-center max-w-4xl">
          <div className="inline-block p-3 sm:p-4 bg-coral rounded-full mb-6 sm:mb-8">
            <svg
              className="w-6 h-6 sm:w-8 sm:h-8 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
              />
            </svg>
          </div>
          <h2 className="font-display font-black text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-white mb-4 sm:mb-6">
            Allergy-Friendly Options
          </h2>
          <p className="font-sans font-medium text-base sm:text-lg md:text-xl text-white/80 leading-relaxed">
            We stock our trucks based on popularity and seasonal availability.
            While we always bring a massive variety to every event, if you have
            specific requests or allergy concerns (dairy-free, nut-free), please
            let us know when booking!
          </p>
        </div>
      </section>

      <FAQSection
        title="Menu Questions"
        subtitle="Common questions about our treats."
        items={faqs}
      />
      
      {/* Final CTA */}
      <div className="border-t border-navy/5 bg-cream">
        <FinalCTA />
      </div>
    </div>
  );
}
