export interface ServiceData {
  slug: string;
  name: string;
  shortDescription: string;
  longDescription: string;
  icon: string;
  features: string[];
  ctaText: string;
  imagePath: string;
}

export const servicesData: Record<string, ServiceData> = {
  "birthday-parties": {
    slug: "birthday-parties",
    name: "Birthday Parties",
    shortDescription: "Make their special day unforgettable with a surprise ice cream truck visit.",
    longDescription: "Imagine the look on their face when a premium WE Ice Cream Truck pulls up playing their favorite tune! We specialize in turning ordinary birthdays into magical memories. From classic soft serve to artisan waffle cones, we have treats for kids and adults alike. Our friendly staff handles all the serving and cleanup, so you can focus on celebrating.",
    icon: "Gift",
    features: ["Customized music playlist", "Premium artisan ice cream options", "Photo opportunities inside the truck", "Allergen-friendly options available"],
    ctaText: "Book Your Birthday Surprise",
    imagePath: "/images/birthday-parties.jpg",
  },
  "corporate-events": {
    slug: "corporate-events",
    name: "Corporate Events & Employee Appreciation",
    shortDescription: "Boost morale and show appreciation with premium ice cream catering at your office.",
    longDescription: "Nothing says 'Thank You' to your team quite like a surprise ice cream break. Whether it's a product launch, a summer outing, or just a Tuesday afternoon pick-me-up, WE Ice Cream Truck delivers a premium corporate catering experience. We can serve hundreds of employees quickly and efficiently, ensuring everyone gets back to their day refreshed and smiling.",
    icon: "Building",
    features: ["Rapid serving for large groups (up to 500/hr)", "Corporate branding options available", "Flexible billing and invoicing", "Professional, uniformed staff"],
    ctaText: "Plan Your Corporate Event",
    imagePath: "/images/corporate-parties.jpg",
  },
  "weddings": {
    slug: "weddings",
    name: "Weddings & Receptions",
    shortDescription: "A sweet and elegant touch to end your perfect day.",
    longDescription: "Add a touch of nostalgic charm to your luxury wedding with a late-night ice cream truck appearance. As the dancing winds down, treat your guests to premium artisan ice cream served from our beautifully illuminated, classic vintage truck. It's the perfect photo opportunity and a dessert experience your guests will talk about for years.",
    icon: "Heart",
    features: ["Elegant vintage truck aesthetics", "Custom 'Just Married' signage", "Premium late-night dessert catering", "Beautiful golden hour/night illumination"],
    ctaText: "Reserve for Your Wedding",
    imagePath: "/images/sweeter-together.jpg",
  },
  "school-events": {
    slug: "school-events",
    name: "School Events & Festivals",
    shortDescription: "The ultimate reward for students, teachers, and faculty.",
    longDescription: "From end-of-year celebrations and field days to teacher appreciation week, WE Ice Cream Truck is the highlight of any school event. We bring joy to the playground with a massive selection of classic novelties and premium scooped ice cream. We handle large crowds with ease and always bring the fun.",
    icon: "GraduationCap",
    features: ["Nut-free and allergy-safe options", "Fast serving for large student bodies", "Teacher appreciation specials", "Fun, upbeat atmosphere"],
    ctaText: "Book for Your School",
    imagePath: "/images/photo-sessions.jpg",
  },
  "fundraisers": {
    slug: "fundraisers",
    name: "Fundraisers & Charity Events",
    shortDescription: "Raise money for your cause with the sweetest attraction in town.",
    longDescription: "Looking for a unique way to draw a crowd and raise funds? WE Ice Cream Truck loves supporting local Massachusetts communities. We partner with schools, sports teams, and non-profits to host 'Giveback Nights' or provide a percentage of sales directly to your organization. It's a win-win: your supporters get premium ice cream, and you hit your fundraising goals.",
    icon: "HeartHandshake",
    features: ["Percentage-of-sales giveback programs", "High community draw and engagement", "Marketing materials provided", "Zero hassle for organizers"],
    ctaText: "Start Fundraising",
    imagePath: "/images/fundraise.jpg",
  },
  "festivals": {
    slug: "festivals",
    name: "Festivals & Public Events",
    shortDescription: "The focal point of any local festival, fair, or community gathering.",
    longDescription: "WE Ice Cream Truck is fully equipped to handle high-volume public events. From local town fairs to massive music festivals across Massachusetts, our truck is a beacon of joy. We bring a diverse menu, high-speed service, and a beautiful aesthetic that elevates the overall atmosphere of your event.",
    icon: "Tent",
    features: ["High-volume capacity", "Self-contained power and water", "Diverse menu for all tastes", "Eye-catching premium truck design"],
    ctaText: "Book Us for Your Festival",
    imagePath: "/images/gallery-4.jpg",
  },
  "block-parties": {
    slug: "block-parties",
    name: "Neighborhood Block Parties",
    shortDescription: "Bring the neighborhood together with the classic sound of the ice cream truck.",
    longDescription: "Nothing screams summer like an ice cream truck rolling down your street. Make your neighborhood block party legendary by booking WE Ice Cream Truck exclusively for your street. We'll park right in the center of the action and serve up smiles to neighbors of all ages.",
    icon: "Home",
    features: ["Nostalgic neighborhood experience", "Options for pre-paid or cash-bar", "Classic ice cream truck music", "Perfect for summer evenings"],
    ctaText: "Schedule a Block Party",
    imagePath: "/images/block-parties.jpg",
  },
  "graduations": {
    slug: "graduations",
    name: "Graduation Parties",
    shortDescription: "Celebrate their monumental achievement with a premium treat.",
    longDescription: "They've worked hard, now it's time to celebrate! Whether it's kindergarten, high school, or college, WE Ice Cream Truck adds a fun, memorable element to any graduation party. Skip the boring sheet cake and treat your guests to made-to-order sundaes and premium ice cream cones right in your driveway.",
    icon: "Award",
    features: ["Driveway/Backyard service", "Custom congratulations signage", "Perfect alternative to standard desserts", "Memorable photo backdrop"],
    ctaText: "Book a Graduation Party",
    imagePath: "/images/gallery-1.jpg",
  },
  "launch-parties": {
    slug: "launch-parties",
    name: "Product Launch Parties",
    shortDescription: "Make a statement at your next product launch or brand activation.",
    longDescription: "First impressions matter. When you are launching a new product, opening a new retail location, or hosting a VIP event, you need vendors that match your brand's quality. WE Ice Cream Truck offers a sleek, premium aesthetic that enhances your brand activation and keeps attendees engaged and talking.",
    icon: "Rocket",
    features: ["Sleek, modern truck aesthetic", "Custom brand integration available", "High social media engagement", "Premium VIP experience"],
    ctaText: "Elevate Your Launch",
    imagePath: "/images/launch-parties.jpg",
  },
  "marketing-events": {
    slug: "marketing-events",
    name: "Marketing & Promo Events",
    shortDescription: "Attract crowds and capture leads with an irresistible incentive.",
    longDescription: "Ice cream is the ultimate lead magnet. Use WE Ice Cream Truck as the centerpiece of your next marketing activation, real estate open house, or promotional tour. We attract the crowds so your sales team can work their magic. We can even serve custom-colored treats to match your brand.",
    icon: "Megaphone",
    features: ["Unmatched crowd attraction", "Extended engagement time with prospects", "Customized treats", "High ROI for marketing activations"],
    ctaText: "Attract Your Crowd",
    imagePath: "/images/marketing-events.jpg",
  }
};

export const getAllServices = () => Object.values(servicesData);
export const getServiceBySlug = (slug: string) => servicesData[slug];
