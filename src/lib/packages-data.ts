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
    id: "essential",
    slug: "the-essential",
    name: "The Essential",
    tagline: "Perfect for intimate celebrations",
    vehicleType: "TRUCK",
    vehicleLabel: "Ice Cream Truck",
    servings: 30,
    price: 250,
    extraGuestPrice: 5,
    durationMins: 60,
    durationLabel: "1 Hour",
    description:
      "The perfect introduction to a WE Ice Cream Truck experience. Ideal for smaller birthday parties, intimate corporate lunches, and backyard celebrations.",
    features: [
      "Up to 30 premium servings",
      "1 hour of on-site service",
      "Full premium ice cream menu",
      "Professional uniformed staff",
      "Extra guests at $5 each",
      "Same-day quote response",
    ],
    badge: "Great for Small Events",
    badgeVariant: "mint",
    isPopular: false,
    isCustom: false,
    sortOrder: 1,
    iconName: "IceCream",
    illustrationSlug: "essential",
  },
  {
    id: "gathering",
    slug: "the-gathering",
    name: "The Gathering",
    tagline: "Where friends become memories",
    vehicleType: "TRUCK",
    vehicleLabel: "Ice Cream Truck",
    servings: 50,
    price: 340,
    extraGuestPrice: 5,
    durationMins: 90,
    durationLabel: "1.5 Hours",
    description:
      "Our most versatile truck package. Whether it's a neighborhood block party, mid-size birthday bash, or team appreciation event — The Gathering delivers.",
    features: [
      "Up to 50 premium servings",
      "1.5 hours of on-site service",
      "Full premium ice cream menu",
      "Professional uniformed staff",
      "Extra guests at $5 each",
      "Priority booking support",
    ],
    isPopular: false,
    isCustom: false,
    sortOrder: 2,
    iconName: "Users",
    illustrationSlug: "gathering",
  },
  {
    id: "marquee",
    slug: "the-marquee",
    name: "The Marquee",
    tagline: "The experience everyone talks about",
    vehicleType: "TRUCK",
    vehicleLabel: "Ice Cream Truck",
    servings: 75,
    price: 425,
    extraGuestPrice: 5,
    durationMins: 120,
    durationLabel: "2 Hours",
    badge: "Most Popular",
    badgeVariant: "gold",
    description:
      "Our flagship truck experience. Two full hours of premium ice cream service for up to 75 guests. The package that makes events unforgettable.",
    features: [
      "Up to 75 premium servings",
      "2 hours of on-site service",
      "Full premium ice cream menu",
      "Professional uniformed staff",
      "Extra guests at $5 each",
      "Dedicated event coordinator",
      "Branded napkins & accessories",
    ],
    isPopular: true,
    isCustom: false,
    sortOrder: 3,
    iconName: "Star",
    illustrationSlug: "marquee",
  },

  // ─── SPRINTER VAN PACKAGES ────────────────────────────────
  {
    id: "lumiere",
    slug: "the-lumiere",
    name: "The Lumière",
    tagline: "Light, bright, and unforgettable",
    vehicleType: "VAN",
    vehicleLabel: "Sprinter Van",
    servings: 30,
    price: 190,
    extraGuestPrice: 4,
    durationMins: 60,
    durationLabel: "1 Hour",
    description:
      "Our most accessible experience. The Sprinter Van delivers the same premium WE Ice Cream quality at a more flexible price point — perfect for smaller events.",
    features: [
      "Up to 30 premium servings",
      "1 hour of on-site service",
      "Premium ice cream selection",
      "Professional staff",
      "Extra guests at $4 each",
      "Same-day quote response",
    ],
    isPopular: false,
    isCustom: false,
    sortOrder: 4,
    iconName: "Sparkles",
    illustrationSlug: "lumiere",
  },
  {
    id: "fete",
    slug: "the-fete",
    name: "The Fête",
    tagline: "A celebration worth savoring",
    vehicleType: "VAN",
    vehicleLabel: "Sprinter Van",
    servings: 75,
    price: 365,
    extraGuestPrice: 4,
    durationMins: 120,
    durationLabel: "2 Hours",
    badge: "Best Value",
    badgeVariant: "coral",
    description:
      "Two hours of premium ice cream service from our Sprinter Van. The smart choice for mid-to-large events that want maximum value without compromising quality.",
    features: [
      "Up to 75 premium servings",
      "2 hours of on-site service",
      "Premium ice cream selection",
      "Professional staff",
      "Extra guests at $4 each",
      "Priority booking support",
    ],
    isPopular: true,
    isCustom: false,
    sortOrder: 5,
    iconName: "PartyPopper",
    illustrationSlug: "fete",
  },
  {
    id: "grand",
    slug: "the-grand",
    name: "The Grand",
    tagline: "Designed for large-scale celebrations",
    vehicleType: "VAN",
    vehicleLabel: "Sprinter Van",
    servings: 200,
    price: 825,
    extraGuestPrice: 4,
    durationMins: 180,
    durationLabel: "3 Hours",
    badge: "Perfect for Schools & Festivals",
    badgeVariant: "mint",
    description:
      "Our highest-capacity van package. Three hours, 200 servings, and the WE Ice Cream Truck experience at full scale. The go-to for school events, festivals, and large corporate days.",
    features: [
      "Up to 200 premium servings",
      "3 hours of on-site service",
      "Full premium ice cream selection",
      "2 professional staff members",
      "Extra guests at $4 each",
      "Dedicated event coordinator",
      "Branded setup & signage",
      "Post-event summary report",
    ],
    isPopular: false,
    isCustom: false,
    sortOrder: 6,
    iconName: "Trophy",
    illustrationSlug: "grand",
  },

  // ─── CUSTOM / BESPOKE ──────────────────────────────────────
  {
    id: "bespoke",
    slug: "the-bespoke",
    name: "The Bespoke",
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
      "Planning a large-scale event or something truly unique? Tell us your vision and we'll design a completely custom experience around your needs, guest count, and venue.",
    features: [
      "200+ guests — any scale",
      "Custom duration",
      "Multiple vehicles available",
      "Fully customized menu",
      "Branded experience options",
      "Dedicated planning support",
      "Flexible scheduling",
      "White-glove service",
    ],
    isPopular: false,
    isCustom: true,
    sortOrder: 7,
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
