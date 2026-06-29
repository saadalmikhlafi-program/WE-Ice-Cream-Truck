// ============================================================
// PACKAGE DEFINITIONS — WE ICE CREAM TRUCK
// Based on Boston Legend pricing structure — completely new names & design
// ============================================================

export type VehicleType = "TRUCK" | "VAN" | "CUSTOM";

export type Package = {
  id: string;
  slug: string;
  name: string;
  tagline: string;
  vehicleType: VehicleType;
  vehicleLabel: string;
  servings: number;
  price: number;
  extraGuestPrice: number;
  durationMins: number;
  durationLabel: string;
  badge?: string;
  badgeVariant?: "gold" | "coral" | "mint";
  description: string;
  features: string[];
  isPopular: boolean;
  isCustom: boolean;
  sortOrder: number;
  iconName: string; // Lucide icon name
  illustrationSlug: string; // Custom illustration identifier
};

export const PACKAGES: Package[] = [
  // ─── AMERICANO TRUCK PACKAGES (6 Packages) ─────────────────────────────
  {
    id: "truck-50",
    slug: "truck-50-guests",
    name: "Truck - 50 Guests",
    tagline: "Perfect for intimate celebrations",
    vehicleType: "TRUCK",
    vehicleLabel: "Ice Cream Truck",
    servings: 50,
    price: 275,
    extraGuestPrice: 5,
    durationMins: 60,
    durationLabel: "1 Hour",
    description: "The classic ice cream truck experience with the music playing and the smiles shining. Perfect for birthdays and small gatherings.",
    features: ["Up to 50 premium servings", "1 hour of on-site service", "Classic ice cream bars & popsicles", "Professional uniformed staff", "Extra guests at $5 each", "Classic truck music"],
    badge: "Great for Birthdays",
    badgeVariant: "mint",
    isPopular: false,
    isCustom: false,
    sortOrder: 1,
    iconName: "IceCream",
    illustrationSlug: "truck-50",
  },
  {
    id: "truck-75",
    slug: "truck-75-guests",
    name: "Truck - 75 Guests",
    tagline: "The neighborhood favorite",
    vehicleType: "TRUCK",
    vehicleLabel: "Ice Cream Truck",
    servings: 75,
    price: 375,
    extraGuestPrice: 5,
    durationMins: 60,
    durationLabel: "1 Hour",
    description: "Ideal for block parties and mid-sized family events. Bring the joy of the ice cream truck to your neighborhood.",
    features: ["Up to 75 premium servings", "1 hour of on-site service", "Classic ice cream bars & popsicles", "Professional uniformed staff", "Extra guests at $5 each", "Classic truck music"],
    isPopular: true,
    isCustom: false,
    sortOrder: 2,
    iconName: "Users",
    illustrationSlug: "truck-75",
  },
  {
    id: "truck-100",
    slug: "truck-100-guests",
    name: "Truck - 100 Guests",
    tagline: "For larger gatherings and corporate lunches",
    vehicleType: "TRUCK",
    vehicleLabel: "Ice Cream Truck",
    servings: 100,
    price: 475,
    extraGuestPrice: 5,
    durationMins: 90,
    durationLabel: "1.5 Hours",
    description: "Bring the classic truck to your next big event! With enough servings for 100 people, this is a hit for school events and corporate lunches.",
    features: ["Up to 100 premium servings", "1.5 hours of on-site service", "Classic ice cream bars & popsicles", "Professional uniformed staff", "Extra guests at $5 each", "Classic truck music"],
    badge: "Most Popular",
    badgeVariant: "gold",
    isPopular: true,
    isCustom: false,
    sortOrder: 3,
    iconName: "Star",
    illustrationSlug: "truck-100",
  },
  {
    id: "truck-150",
    slug: "truck-150-guests",
    name: "Truck - 150 Guests",
    tagline: "The event headliner",
    vehicleType: "TRUCK",
    vehicleLabel: "Ice Cream Truck",
    servings: 150,
    price: 650,
    extraGuestPrice: 5,
    durationMins: 90,
    durationLabel: "1.5 Hours",
    description: "A substantial package for substantial fun. Give your guests the ultimate sweet treat they won't forget.",
    features: ["Up to 150 premium servings", "1.5 hours of on-site service", "Classic ice cream bars & popsicles", "Professional uniformed staff", "Extra guests at $5 each", "Classic truck music"],
    isPopular: false,
    isCustom: false,
    sortOrder: 4,
    iconName: "PartyPopper",
    illustrationSlug: "truck-150",
  },
  {
    id: "truck-200",
    slug: "truck-200-guests",
    name: "Truck - 200 Guests",
    tagline: "Large scale celebrations",
    vehicleType: "TRUCK",
    vehicleLabel: "Ice Cream Truck",
    servings: 200,
    price: 850,
    extraGuestPrice: 5,
    durationMins: 120,
    durationLabel: "2 Hours",
    description: "Designed for school fairs, large corporate days, and massive celebrations. We handle the volume, you handle the fun.",
    features: ["Up to 200 premium servings", "2 hours of on-site service", "Classic ice cream bars & popsicles", "Professional uniformed staff", "Extra guests at $5 each", "Classic truck music"],
    isPopular: false,
    isCustom: false,
    sortOrder: 5,
    iconName: "Trophy",
    illustrationSlug: "truck-200",
  },
  {
    id: "truck-250",
    slug: "truck-250-guests",
    name: "Truck - 250 Guests",
    tagline: "The ultimate block party",
    vehicleType: "TRUCK",
    vehicleLabel: "Ice Cream Truck",
    servings: 250,
    price: 1050,
    extraGuestPrice: 5,
    durationMins: 150,
    durationLabel: "2.5 Hours",
    description: "Our largest standard truck package. Perfect for festivals, large communities, and major corporate events.",
    features: ["Up to 250 premium servings", "2.5 hours of on-site service", "Classic ice cream bars & popsicles", "2 Professional staff members", "Extra guests at $5 each", "Classic truck music"],
    badge: "Maximum Value",
    badgeVariant: "coral",
    isPopular: false,
    isCustom: false,
    sortOrder: 6,
    iconName: "Crown",
    illustrationSlug: "truck-250",
  },

  // ─── SPRINTER VAN PACKAGES (6 Packages) ────────────────────────────────
  {
    id: "van-50",
    slug: "van-50-guests",
    name: "Van - 50 Guests",
    tagline: "Modern, sleek, and delicious",
    vehicleType: "VAN",
    vehicleLabel: "Sprinter Van",
    servings: 50,
    price: 325,
    extraGuestPrice: 6,
    durationMins: 60,
    durationLabel: "1 Hour",
    description: "A premium experience delivered from our sleek Sprinter Van. Ideal for intimate weddings, high-end corporate events, and chic celebrations.",
    features: ["Up to 50 premium servings", "1 hour of on-site service", "Premium ice cream selection", "Professional staff", "Extra guests at $6 each", "Modern aesthetic setup"],
    badge: "Premium Experience",
    badgeVariant: "gold",
    isPopular: false,
    isCustom: false,
    sortOrder: 7,
    iconName: "Sparkles",
    illustrationSlug: "van-50",
  },
  {
    id: "van-75",
    slug: "van-75-guests",
    name: "Van - 75 Guests",
    tagline: "Elevated mid-size events",
    vehicleType: "VAN",
    vehicleLabel: "Sprinter Van",
    servings: 75,
    price: 450,
    extraGuestPrice: 6,
    durationMins: 60,
    durationLabel: "1 Hour",
    description: "Perfect for upscale birthday parties and mid-sized corporate gatherings that demand a more refined touch.",
    features: ["Up to 75 premium servings", "1 hour of on-site service", "Premium ice cream selection", "Professional staff", "Extra guests at $6 each", "Modern aesthetic setup"],
    isPopular: true,
    isCustom: false,
    sortOrder: 8,
    iconName: "Users",
    illustrationSlug: "van-75",
  },
  {
    id: "van-100",
    slug: "van-100-guests",
    name: "Van - 100 Guests",
    tagline: "The sophisticated celebration",
    vehicleType: "VAN",
    vehicleLabel: "Sprinter Van",
    servings: 100,
    price: 550,
    extraGuestPrice: 6,
    durationMins: 90,
    durationLabel: "1.5 Hours",
    description: "A grand celebration worth savoring. The smart choice for large weddings and grand corporate events.",
    features: ["Up to 100 premium servings", "1.5 hours of on-site service", "Premium ice cream selection", "Professional staff", "Extra guests at $6 each", "Priority booking support"],
    badge: "Best for Weddings",
    badgeVariant: "coral",
    isPopular: true,
    isCustom: false,
    sortOrder: 9,
    iconName: "PartyPopper",
    illustrationSlug: "van-100",
  },
  {
    id: "van-150",
    slug: "van-150-guests",
    name: "Van - 150 Guests",
    tagline: "For major premium events",
    vehicleType: "VAN",
    vehicleLabel: "Sprinter Van",
    servings: 150,
    price: 750,
    extraGuestPrice: 6,
    durationMins: 90,
    durationLabel: "1.5 Hours",
    description: "Our high-capacity premium van experience. Perfect for very large weddings, premium school events, and major corporate milestones.",
    features: ["Up to 150 premium servings", "1.5 hours of on-site service", "Premium ice cream selection", "Professional staff", "Extra guests at $6 each", "Modern aesthetic setup"],
    isPopular: false,
    isCustom: false,
    sortOrder: 10,
    iconName: "Star",
    illustrationSlug: "van-150",
  },
  {
    id: "van-200",
    slug: "van-200-guests",
    name: "Van - 200 Guests",
    tagline: "Large scale premium service",
    vehicleType: "VAN",
    vehicleLabel: "Sprinter Van",
    servings: 200,
    price: 950,
    extraGuestPrice: 6,
    durationMins: 120,
    durationLabel: "2 Hours",
    description: "Impress a massive crowd with our top-tier Sprinter Van. Flawless execution and premium ice cream for up to 200 guests.",
    features: ["Up to 200 premium servings", "2 hours of on-site service", "Premium ice cream selection", "2 Professional staff members", "Extra guests at $6 each", "Priority booking support"],
    isPopular: false,
    isCustom: false,
    sortOrder: 11,
    iconName: "Trophy",
    illustrationSlug: "van-200",
  },
  {
    id: "van-250",
    slug: "van-250-guests",
    name: "Van - 250 Guests",
    tagline: "The grandest premium experience",
    vehicleType: "VAN",
    vehicleLabel: "Sprinter Van",
    servings: 250,
    price: 1150,
    extraGuestPrice: 6,
    durationMins: 150,
    durationLabel: "2.5 Hours",
    description: "The pinnacle of our Sprinter Van fleet. Maximum capacity, maximum time, and maximum luxury for your biggest events.",
    features: ["Up to 250 premium servings", "2.5 hours of on-site service", "Premium ice cream selection", "2 Professional staff members", "Extra guests at $6 each", "White-glove service"],
    badge: "Maximum Luxury",
    badgeVariant: "gold",
    isPopular: false,
    isCustom: false,
    sortOrder: 12,
    iconName: "Crown",
    illustrationSlug: "van-250",
  },

  // ─── LARGE EVENTS & CUSTOM QUOTE (1 Package) ──────────────────────────────────────
  {
    id: "bespoke",
    slug: "large-events",
    name: "Large Events & Custom Quote",
    tagline: "Your vision. Our expertise.",
    vehicleType: "CUSTOM",
    vehicleLabel: "Custom Event",
    servings: 300,
    price: 0,
    extraGuestPrice: 0,
    durationMins: 0,
    durationLabel: "Custom Duration",
    badge: "300+ Guests",
    badgeVariant: "gold",
    description: "Planning a large-scale event, festival, or something truly unique? Tell us your vision and we'll design a completely custom experience.",
    features: [
      "300+ guests — any scale",
      "Custom duration",
      "Multiple vehicles available",
      "Fully customized menu",
      "Branded experience options",
      "Dedicated planning support",
    ],
    isPopular: false,
    isCustom: true,
    sortOrder: 13,
    iconName: "Map",
    illustrationSlug: "bespoke",
  },
];

export const TRUCK_PACKAGES = PACKAGES.filter((p) => p.vehicleType === "TRUCK");
export const VAN_PACKAGES = PACKAGES.filter((p) => p.vehicleType === "VAN");
export const CUSTOM_PACKAGES = PACKAGES.filter(
  (p) => p.vehicleType === "CUSTOM"
);

export function getPackageBySlug(slug: string): Package | undefined {
  return PACKAGES.find((p) => p.slug === slug);
}

export function formatDuration(mins: number): string {
  if (mins === 0) return "Custom";
  if (mins < 60) return `${mins} Minutes`;
  if (mins === 60) return "1 Hour";
  if (mins % 60 === 0) return `${mins / 60} Hours`;
  return `${Math.floor(mins / 60)}h ${mins % 60}m`;
}
