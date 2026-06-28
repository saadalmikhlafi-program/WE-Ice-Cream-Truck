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
  // ─── ICE CREAM TRUCK PACKAGES ─────────────────────────────
  {
    id: "classic-truck-small",
    slug: "classic-truck-small",
    name: "Classic Truck Package",
    tagline: "The nostalgic ice cream truck experience",
    vehicleType: "TRUCK",
    vehicleLabel: "Ice Cream Truck",
    servings: 50,
    price: 250,
    extraGuestPrice: 5,
    durationMins: 60,
    durationLabel: "1 Hour",
    description:
      "The classic ice cream truck experience with the music playing and the smiles shining. Perfect for birthdays and small gatherings.",
    features: [
      "Up to 50 premium servings",
      "1 hour of on-site service",
      "Classic ice cream bars & popsicles",
      "Professional uniformed staff",
      "Extra guests at $5 each",
      "Classic truck music",
    ],
    badge: "Great for Birthdays",
    badgeVariant: "mint",
    isPopular: true,
    isCustom: false,
    sortOrder: 1,
    iconName: "IceCream",
    illustrationSlug: "essential",
  },
  {
    id: "classic-truck-large",
    slug: "classic-truck-large",
    name: "Classic Truck Event",
    tagline: "For larger gatherings and corporate events",
    vehicleType: "TRUCK",
    vehicleLabel: "Ice Cream Truck",
    servings: 100,
    price: 450,
    extraGuestPrice: 5,
    durationMins: 120,
    durationLabel: "2 Hours",
    description:
      "Bring the classic truck to your next big event! With enough servings for 100 people, this is a hit for school events and corporate lunches.",
    features: [
      "Up to 100 premium servings",
      "2 hours of on-site service",
      "Classic ice cream bars & popsicles",
      "Professional uniformed staff",
      "Extra guests at $5 each",
      "Classic truck music",
    ],
    isPopular: false,
    isCustom: false,
    sortOrder: 2,
    iconName: "Users",
    illustrationSlug: "gathering",
  },

  // ─── SPRINTER VAN PACKAGES ────────────────────────────────
  {
    id: "van-premium",
    slug: "van-premium",
    name: "Van Premium Package",
    tagline: "Modern, sleek, and delicious",
    vehicleType: "VAN",
    vehicleLabel: "Sprinter Van",
    servings: 50,
    price: 300,
    extraGuestPrice: 6,
    durationMins: 60,
    durationLabel: "1 Hour",
    description:
      "A premium experience delivered from our sleek Sprinter Van. Ideal for weddings, high-end corporate events, and chic celebrations.",
    features: [
      "Up to 50 premium servings",
      "1 hour of on-site service",
      "Premium ice cream selection",
      "Professional staff",
      "Extra guests at $6 each",
      "Modern aesthetic setup",
    ],
    badge: "Premium Experience",
    badgeVariant: "gold",
    isPopular: true,
    isCustom: false,
    sortOrder: 3,
    iconName: "Sparkles",
    illustrationSlug: "lumiere",
  },
  {
    id: "van-premium-event",
    slug: "van-premium-event",
    name: "Van Premium Event",
    tagline: "A grand celebration worth savoring",
    vehicleType: "VAN",
    vehicleLabel: "Sprinter Van",
    servings: 150,
    price: 800,
    extraGuestPrice: 6,
    durationMins: 180,
    durationLabel: "3 Hours",
    badge: "Best for Weddings",
    badgeVariant: "coral",
    description:
      "Three hours of premium ice cream service from our Sprinter Van. The smart choice for large weddings and grand events.",
    features: [
      "Up to 150 premium servings",
      "3 hours of on-site service",
      "Premium ice cream selection",
      "Professional staff",
      "Extra guests at $6 each",
      "Priority booking support",
    ],
    isPopular: false,
    isCustom: false,
    sortOrder: 4,
    iconName: "PartyPopper",
    illustrationSlug: "fete",
  },

  // ─── CUSTOM / BESPOKE ──────────────────────────────────────
  {
    id: "bespoke",
    slug: "the-bespoke",
    name: "Custom / 200+ Guests",
    tagline: "Your vision. Our expertise.",
    vehicleType: "CUSTOM",
    vehicleLabel: "Custom Event",
    servings: 201,
    price: 0,
    extraGuestPrice: 0,
    durationMins: 0,
    durationLabel: "Custom Duration",
    badge: "200+ Guests",
    badgeVariant: "gold",
    description:
      "Planning a large-scale event or something truly unique? Tell us your vision and we'll design a completely custom experience.",
    features: [
      "200+ guests — any scale",
      "Custom duration",
      "Multiple vehicles available",
      "Fully customized menu",
      "Branded experience options",
      "Dedicated planning support",
    ],
    isPopular: false,
    isCustom: true,
    sortOrder: 5,
    iconName: "Crown",
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
