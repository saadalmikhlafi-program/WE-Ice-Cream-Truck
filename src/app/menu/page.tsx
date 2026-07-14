import { Metadata } from "next";
import { constructMetadata } from "@/lib/seo";
import Image from "next/image";
import FAQSection from "@/components/shared/FAQSection";

export const metadata: Metadata = constructMetadata({
  title: "Ice Cream Menu | WE Ice Cream Truck",
  description: "Explore our premium selection of nostalgic and modern pre-packaged ice cream novelties. We carry all your favorites from Good Humor, Popsicle, and more.",
  url: "/menu",
});

const menuCategories = [
  {
    "name": "Character Faces",
    "description": "Kids' favorites featuring iconic characters with gumball eyes.",
    "emoji": "🎭",
    "items": [
      { "name": "Spongebob Ice Cream", "image": "/images/menu/681dce03fd5dc9845c9c371b_popsicle-spongebob-ice-cream-boston-legend-ice-cream-truck.avif" },
      { "name": "Spider-Man Bar", "image": "/images/menu/681dcdd9db2e74e2a333174a_popsicle-marvel-spider-man-bar-ice-cream-frozen-confection-boston-legend-ice-cream-truck.avif" },
      { "name": "Hello Kitty", "image": "/images/menu/681dcdd0fb75a434ff7f4f3c_popsicle-hello-kitty-boston-legend-ice-cream-truck.avif" },
      { "name": "Minions Bar", "image": "/images/menu/681dcdbda36331be91574a14_popsicle-despicable-me-minions-bar-a-case-ice-cream-boston-legend-ice-cream-truck.avif" },
      { "name": "Minion Blue", "image": "/images/menu/681dcda60b5e391465a98599_Minion-Despicable-Me-Blue-boston-legend-ice-cream-truck.avif" },
      { "name": "Looney Tunes Cup", "image": "/images/menu/681dcd961049b2275432a2a4_looney-tunes-ice-pops-cup-boston-legend-ice-cream-truck.avif" },
      { "name": "Ninja Turtle Bar", "image": "/images/menu/681dcb70fa3b03f5c6346e8f_blue-bunny-ninja-turtle-bar-boston-legend-ice-cream-truck.avif" },
      { "name": "Tweety Bird Rainbow", "image": "/images/menu/681dcb5e75363c37d4cd41c1_blue-bunny-looney-tunes-tweety-bird-rainbow-ice-cream-boston-legend-ice-cream-truck.avif" },
      { "name": "Shrek Bar", "image": "/images/menu/681dcb03fa3b03f5c63412db_blue-bunny-dreamworks-shrek-with-gumball-eyes-boston-legend-ice-cream-truck.avif" },
      { "name": "Bratz Bar", "image": "/images/menu/681dca9528fd38a2b1c2be4f_blue-bunny-bratz-ice-cream-bar-boston-legend-ice-cream-truck.avif" },
      { "name": "Sonic Hedgehog Bar", "image": "/images/menu/681dca0ccd05763e5b731823_blue-bunny-sonic-hedgehog-bar-boston-legend-ice-cream-truck.avif" },
      { "name": "Powerpuff Girls Bar", "image": "/images/menu/681dca01eccf382ddb2c0d3c_blue-bunny-powerpuff-girls-bar-boston-legend-ice-cream-truck.avif" },
      { "name": "Bugs Bunny Bar", "image": "/images/menu/681dc9e0cf2c9109e85285be_blue-bunny-bugs-bunny-bar-boston-legend-ice-cream-truck.avif" },
      { "name": "Captain America Bar", "image": "/images/menu/681dc7d5a36331be915367a9_avengers-captain-america-face-ice-cream-bar-boston-legend-ice-cream-truck.avif" },
      { "name": "Angry Bird Bar", "image": "/images/menu/681dc84fcd05763e5b71dd8f_blue-bunny-angry-bird-ice-cream-boston-legend-ice-cream-truck.avif" },
      { "name": "Tweety Gumball Popsicle", "image": "/images/menu/681dc84665388c9dbe483cf8_blue-bunny-tweety-gumball-popsicles-boston-legend-ice-cream-truck.avif" }
    ]
  },
  {
    "name": "Premium Cones",
    "description": "The classic ice cream parlor experience on the go.",
    "emoji": "🍦",
    "items": [
      { "name": "Bubble Gum Snow Cone", "image": "/images/menu/681dcaac4788cab08f6bc390_blue-bunny-bubble-gum-snow-cone-boston-legend-ice-cream-truck.avif" },
      { "name": "Vanilla Cone", "image": "/images/menu/681dca47a36331be9154fea4_blue-bunny-big-dipper-vanilla-cone-ice-cream--boston-legend-ice-cream-truck.avif" },
      { "name": "Chocolate Lovers Cone", "image": "/images/menu/681dca25fa3b03f5c6339fff_blue-bunny-big-dipper-chocolate-lovers-cone-boston-legend-ice-cream-truck.avif" },
      { "name": "Strawberry Burst Cone", "image": "/images/menu/681dca303866726bc8181b4d_blue-bunny-big-dipper-strawberry-burst-cone-boston-legend-ice-cream-truck.avif" }
    ]
  },
  {
    "name": "Fruity & Refreshing",
    "description": "Dairy-free, allergen-friendly options perfect for hot summer days.",
    "emoji": "🍧",
    "items": [
      { "name": "Screamers Cup", "image": "/images/menu/681dceb1770a22f0219b3c54_screamers-ice-cream-cup-boston-legend-ice-cream-truck.avif" },
      { "name": "Hoodsies Cups", "image": "/images/menu/681dcea3ca12604cb4efac68_hoodsies-ice-cream-cups-boston-legend-ice-cream-truck.avif" },
      { "name": "Chocolate Malt Cup", "image": "/images/menu/681dce9171b9adf6ee733de6_blue-bunny-ice-cream-malt-cup-chocolate-boston-legend-ice-cream-truck.avif" },
      { "name": "Sour Wower Bar", "image": "/images/menu/681dce53b747d6cf93b035c2_sour-wower-bar-boston-legend-ice-cream-truck.avif" },
      { "name": "Twix Bar", "image": "/images/menu/681dce5bf8e5c481466fe6f3_twix-ice-cream-bar-boston-legend-ice-cream-truck.avif" },
      { "name": "Snickers Bar", "image": "/images/menu/681dce48d0d9e52f84911285_snickers-ice-cream-bars-boston-legend-ice-cream-truck.avif" },
      { "name": "Cry Baby Watermelon", "image": "/images/menu/681dce3a10bdfea0eecb7cb7_Rosati-CRY-baby-watermelon-Sour-ice-boston-legend-ice-cream-truck.avif" },
      { "name": "Italian Ice", "image": "/images/menu/681dce2eb5f57ea58e9489d1_richie-super-premium-italian-ice-min-boston-legend-ice-cream-truck.avif" },
      { "name": "Pop Shots Lemon & Strawberry", "image": "/images/menu/681dcde940f4dd8798d019d2_popsicle-pop-shots-micro-sized-ice-beads-lemon-strawberry-boston-legend-ice-cream-truck.avif" },
      { "name": "Ice Beads Lemon & Strawberry", "image": "/images/menu/681dce217db51016898e5d8b_popsicle-shots-micro-sized-ice-beads-lemon-strawberry-boston-legend-ice-cream-truck.avif" },
      { "name": "Cyclone Cherry Ice Pop", "image": "/images/menu/681dcdc7ba51b5a096532082_popsicle-cyclone-cherry-lemon-blue-raspberry-ice-pops-boston-legend-ice-cream-truck.avif" },
      { "name": "Vanilla Sandwich", "image": "/images/menu/681dcd81e4efb42760eb5dd7_hood-ice-cream-sandwiches-vanilla-boston-legend-ice-cream-truck.avif" },
      { "name": "Oreo Bar", "image": "/images/menu/681dcd4556b5a714d66f9827_good-humor-oreo-frozen-dessert-bar-cookies-n-ice-cream-bar-boston-legend-ice-cream-truck.avif" },
      { "name": "FrozFruit Mango", "image": "/images/menu/681dcd117db51016898da1e9_frozfruit-mango-min-boston-legend-ice-cream-truck.avif" },
      { "name": "Reese's PB Cups", "image": "/images/menu/681dcd5ef8e5c481466f3f9b_good-humor-reeses-peanut-butter-ice-cream-cups-min-boston-legend-ice-cream-truck.avif" },
      { "name": "Birthday Cake Bar", "image": "/images/menu/681dcd33d4620d268ef1cef9_good-humor-birthday-cake-bar-ice-cream-boston-legend-ice-cream-truck.avif" },
      { "name": "Cotton Candy Bar", "image": "/images/menu/681dcceb50a832b7a27052c8_cotton-candy-bar-boston-legend-ice-cream-truck.avif" },
      { "name": "Bomb Pop Warheads", "image": "/images/menu/681dcce1999cfc750884fd47_bomb-pop-warheads-boston-legend-ice-cream-truck.avif" },
      { "name": "Bomb Pop Original King", "image": "/images/menu/681dccba25b9714855e9692d_bomb-pop-the-original-cherry-lime-blue-raspberry-boston-legend-ice-cream-truck.avif" },
      { "name": "Bomb Pop Jolly Ranchers", "image": "/images/menu/681dcc8f50a832b7a2701cbd_bomb-pop-jolly-ranchers-boston-legend-ice-cream-truck.avif" },
      { "name": "Bomb Pop Banana Fudge", "image": "/images/menu/681dcc7816b1e2e6be16fbe3_bomb-pop-banana-fudge-chocolate-fudge-banana-boston-legend-ice-cream-truck.avif" },
      { "name": "Screwball Blue Raspberry", "image": "/images/menu/681dcb89ca12604cb4ed95b4_blue-bunny-two-ball-screwball-blue-raspberry-boston-legend-ice-cream-truck.avif" },
      { "name": "Jolly Rancher Cool Tubes", "image": "/images/menu/681dcb4d6da9f7df492fc9ec_Blue-Bunny-Jolly-Rancher-Cool-Tubes-ICE-Cream-boston-legend-ice-cream-truck.avif" },
      { "name": "Screwball Cherry", "image": "/images/menu/681dcb94ba704342ad620bb0_blue-bunny-two-ball-screwball-cherry-boston-legend-ice-cream-truck.avif" },
      { "name": "Chunky Strawberry", "image": "/images/menu/681dcb23cd05763e5b73dd80_blue-bunny-frozfruit-chunky-strawberry-boston-legend-ice-cream-truck.avif" },
      { "name": "Coconut Fruit Bar", "image": "/images/menu/681dcb2f574682726cb5e3ac_blue-bunny-frozfruit-gourmet-creamy-coconut-frozen-fruit-bar-boston-legend-ice-cream-truck.avif" },
      { "name": "Chocolate Eclair Bar", "image": "/images/menu/681dcad42b02bfb44d83ab7a_blue-bunny-chocolate-eclair-ice-cream-bar-boston-legend-ice-cream-truck.avif" },
      { "name": "Cookies & Cream Sandwich", "image": "/images/menu/681dcaec740f2ac581eb179f_blue-bunny-cookies-n-cream-ice-cream-sandwich-bar-boston-legend-ice-cream-truck.avif" },
      { "name": "Tear Jerkers", "image": "/images/menu/681dca7fcf27a59d4327544b_Blue-Bunny-Bom-Pop-Tear-Jerkers-boston-legend-ice-cream-truck.avif" },
      { "name": "Bubble Gum Popsicle Bar", "image": "/images/menu/681dcaa55d7431af45110527_blue-bunny-bubble-gum-popsicle-bar-boston-legend-ice-cream-truck.avif" },
      { "name": "Mississippi Mud Sandwich", "image": "/images/menu/681dca62c276da2d63700be3_blue-bunny-big-mississippi-mud-ice-cream-sandwich-boston-legend-ice-cream-truck.avif" },
      { "name": "Neapolitan Sandwich", "image": "/images/menu/681dc9ae760141875810b9fa_blue-bunny-big-neapolitan-ice-cream-sandwiches-boston-legend-ice-cream-truck.avif" },
      { "name": "Batman Pop", "image": "/images/menu/681dc98ce38abea81b7fe21e_blue-bunny-batman-ice-cream-pop-boston-legend-ice-cream-truck.avif" }
    ]
  },
  {
    "name": "The Classics",
    "description": "Nostalgic favorites that never go out of style.",
    "emoji": "⭐",
    "items": [
      { "name": "Toasted Almond Bar", "image": "/images/menu/681dcd700cc412ac7b6df35b_good-humor-toasted-almond-bar-boston-legend-ice-cream-truck.avif" },
      { "name": "Homemade Vanilla Bar", "image": "/images/menu/681dcc5fc8001e5220413dc0_blue-ribbon-vanilla-boston-legend-ice-cream-truck.avif" },
      { "name": "Dove Chocolate Bars", "image": "/images/menu/681dcd03ccaa4ae9485021f5_dove-ice-cream-bars-boston-legend-ice-cream-truck.avif" },
      { "name": "Classic Fudge Bar", "image": "/images/menu/681dcbeb1ca7c29db29b305f_blue-ribbon-classics-fudge-bar-boston-legend-ice-cream-truck.avif" },
      { "name": "Orange Dream Bar", "image": "/images/menu/681dcc697601418758126d0d_blue-ribbon-classics-orange-dream-boston-legend-ice-cream-truck.avif" },
      { "name": "Vanilla Crunch Bar", "image": "/images/menu/681dcba82c8ff9f92b34768f_blue-bunny-vanilla-crunch-bar-boston-legend-ice-cream-truck.avif" },
      { "name": "Root Beer Float Bar", "image": "/images/menu/681dcbdd01debeb53a362395_blue-ribbon-classics-root-beer-float-boston-legend-ice-cream-truck.avif" },
      { "name": "Cookies & Cream Cone", "image": "/images/menu/681dca3d55a1487af4d4cdaf_blue-bunny-big-dipper-cookies-n-cream-cone-boston-legend-ice-cream-truck.avif" }
    ]
  }
];

const faqs = [
  {
    question: "Are these the only items you carry?",
    answer: "This is our core menu, but our trucks hold a massive variety of over 40+ different items. If you have a specific childhood favorite, let us know and we'll do our best to stock it for your event!"
  },
  {
    question: "Do you offer scooped ice cream?",
    answer: "To ensure the fastest service and maintain the highest level of hygiene, we specialize exclusively in premium, pre-packaged novelties. This allows us to serve large crowds quickly while keeping everyone safe."
  },
  {
    question: "How do you handle allergies?",
    answer: "Because all our items are pre-packaged in FDA-approved facilities, the risk of cross-contamination on the truck is virtually zero. We carry dairy-free, nut-free, and gluten-free options on every truck."
  }
];

export default function MenuPage() {
  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* Hero Section */}
      <section className="relative py-16 sm:py-20 md:py-28 overflow-hidden">
        <div className="absolute top-0 right-0 w-[300px] sm:w-[500px] h-[300px] sm:h-[500px] bg-coral/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3 pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-[250px] sm:w-[400px] h-[250px] sm:h-[400px] bg-mint/10 rounded-full blur-3xl translate-y-1/2 -translate-x-1/3 pointer-events-none" />
        
        <div className="container mx-auto px-4 sm:px-6 md:px-12 lg:px-24 relative z-10 text-center">
          <span className="inline-block py-1.5 px-4 bg-navy/5 text-navy font-bold text-xs sm:text-sm tracking-widest uppercase rounded-full mb-4 sm:mb-6">
            Sweet Selections
          </span>
          <h1 className="font-display font-black text-4xl sm:text-5xl md:text-6xl lg:text-7xl leading-[1.05] text-navy mb-4 sm:mb-6">
            The Ultimate <br className="hidden sm:block" />
            <span className="text-coral">Menu.</span>
          </h1>
          <p className="font-sans font-medium text-base sm:text-lg md:text-xl text-navy/70 max-w-3xl mx-auto leading-relaxed">
            We serve only the highest quality pre-packaged novelties to ensure maximum hygiene, speed of service, and nostalgic joy.
          </p>
        </div>
      </section>

      {/* Menu Categories */}
      <section className="py-10 sm:py-16 md:py-20 relative z-10">
        <div className="container mx-auto px-4 sm:px-6 md:px-8 lg:px-12 max-w-7xl">
          <div className="space-y-16 sm:space-y-20 md:space-y-24">
            {menuCategories.map((category) => (
              <div key={category.name} className="relative">
                {/* Category Header */}
                <div className="mb-8 sm:mb-10 md:mb-12 text-center">
                  <span className="text-4xl sm:text-5xl block mb-3">{category.emoji}</span>
                  <h2 className="font-display font-black text-2xl sm:text-3xl md:text-4xl text-navy mb-2 sm:mb-3">
                    {category.name}
                  </h2>
                  <p className="font-sans font-medium text-sm sm:text-base md:text-lg text-navy/60 max-w-xl mx-auto">
                    {category.description}
                  </p>
                </div>

                {/* Grid */}
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4 md:gap-6">
                  {category.items.map((item, idx) => (
                    <div 
                      key={idx} 
                      className="group bg-white p-3 sm:p-4 md:p-5 rounded-2xl sm:rounded-3xl border border-navy/5 hover:border-coral/40 hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300 flex flex-col"
                    >
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
                      <h3 className="font-sans font-bold text-xs sm:text-sm md:text-base text-navy leading-tight group-hover:text-coral transition-colors">
                        {item.name}
                      </h3>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Dietary Notice */}
      <section className="py-14 sm:py-16 md:py-20 bg-navy relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('/images/hero-cinematic.jpg')] opacity-10 bg-cover bg-center mix-blend-overlay" />
        <div className="container mx-auto px-4 sm:px-6 md:px-12 relative z-10 text-center max-w-4xl">
          <div className="inline-block p-3 sm:p-4 bg-coral rounded-full mb-6 sm:mb-8">
            <svg className="w-6 h-6 sm:w-8 sm:h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" /></svg>
          </div>
          <h2 className="font-display font-black text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-white mb-4 sm:mb-6">
            Allergy-Friendly Options
          </h2>
          <p className="font-sans font-medium text-base sm:text-lg md:text-xl text-white/80 leading-relaxed">
            We stock our trucks based on popularity and seasonal availability. While we always bring a massive variety to every event, if you have specific requests or allergy concerns (dairy-free, nut-free), please let us know when booking!
          </p>
        </div>
      </section>

      <FAQSection 
        title="Menu Questions"
        subtitle="Common questions about our treats."
        items={faqs}
      />
    </div>
  );
}
