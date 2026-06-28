// ============================================================
// BUSINESS CONFIGURATION — SINGLE SOURCE OF TRUTH
// Change anything here and it updates across the entire site:
// footer, schema markup, contact page, SEO, click-to-call links
// ============================================================

export const BUSINESS_CONFIG = {
  name: "WE Ice Cream Truck",
  legalName: "WE Ice Cream Truck LLC",
  tagline: "We Bring the Sweet.",
  description:
    "Massachusetts' most trusted premium ice cream truck catering service. Available for birthdays, corporate events, weddings, school events, festivals, and every celebration across all of Massachusetts.",
  domain: "https://weicecreamtruck.com",

  contact: {
    phone1: "617-999-3803",
    phone1Formatted: "+16179993803",
    phone1Label: "Main Line",
    phone2: "617-866-2727",
    phone2Formatted: "+16178662727",
    phone2Label: "Reservations",
    email: "info@weicecreamtruck.com",
  },

  // Change this once to update ALL schema markup, footer, contact page
  address: {
    street: "84 Fernwood Ave",
    city: "Revere",
    state: "MA",
    zip: "02151",
    country: "US",
    countryFull: "United States",
    display: "Revere, MA 02151",
  },

  geo: {
    lat: 42.4084,
    lng: -71.012,
  },

  hours: {
    description: "Available 24 hours by reservation, 7 days a week",
    opens: "08:00",
    closes: "22:00",
    days: [
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
      "Sunday",
    ],
  },

  // Update when social accounts are created
  social: {
    instagram: "https://instagram.com/weicecreamtruck",
    facebook: "https://facebook.com/weicecreamtruck",
    tiktok: "https://tiktok.com/@weicecreamtruck",
    youtube: "",
  },

  // Live stats — update periodically
  stats: {
    eventsServed: 500,
    rating: 4.9,
    reviewCount: 127,
    citiesServed: 140,
    yearsInBusiness: 5,
    satisfactionRate: 100,
  },

  // SEO
  keywords: [
    "ice cream truck rental Massachusetts",
    "ice cream truck catering MA",
    "ice cream truck birthday party Massachusetts",
    "corporate ice cream truck catering Boston",
    "wedding ice cream truck Massachusetts",
    "ice cream truck school event MA",
    "premium ice cream truck rental",
    "ice cream catering near me Massachusetts",
    "WE Ice Cream Truck",
    "best ice cream truck Massachusetts",
    "ice cream truck for hire MA",
    "mobile ice cream catering Massachusetts",
  ],

  // Languages supported
  languages: ["English", "Spanish", "Arabic"],

  // Payment methods
  paymentMethods: [
    "Cash",
    "Credit Card",
    "Debit Card",
    "Check",
    "Online Payment",
  ],

  // Cuisine types (for schema)
  cuisine: ["Ice Cream", "Frozen Desserts", "Soft Serve", "Novelties"],

  // Price range
  priceRange: "$$",
  startingPrice: 190,
  currency: "USD",
} as const;

export type BusinessConfig = typeof BUSINESS_CONFIG;
