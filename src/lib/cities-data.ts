// ============================================================
// MASSACHUSETTS CITIES DATA — 100+ CITIES
// Full dataset for programmatic SEO city pages
// ============================================================

export type CityTier = 1 | 2 | 3;

export type CityData = {
  slug: string;
  name: string;
  county: string;
  region: string;
  population?: number;
  lat: number;
  lng: number;

  // SEO
  metaTitle: string;
  metaDescription: string;
  heroHeadline: string;
  heroSubline: string;
  localIntro: string;
  localKeywords?: string[];

  // Content
  neighborhoods?: string[];
  nearbyAreas: string[];
  landmarkMentions?: string[];
  localFAQs: { question: string; answer: string }[];

  // Visual
  heroImageQuery: string; // AI image generation prompt

  // Tier system
  tier: CityTier;
  isTopCity: boolean;
  priorityScore: number;
};

export const MASSACHUSETTS_CITIES: CityData[] = [
  // ─── TIER 1 — FLAGSHIP CITIES ──────────────────────────────
  {
    slug: "boston",
    name: "Boston",
    county: "Suffolk County",
    region: "Greater Boston",
    population: 675647,
    lat: 42.3601,
    lng: -71.0589,
    metaTitle:
      "Ice Cream Truck Rental in Boston, MA | WE Ice Cream Truck | Book Now",
    metaDescription:
      "Premium ice cream truck catering in Boston, MA. Serving all Boston neighborhoods for birthdays, corporate events, weddings & more. Call 617-999-3803 for a free quote.",
    heroHeadline: "Boston's Favorite Ice Cream Truck",
    heroSubline:
      "Serving every Boston neighborhood — from Back Bay to Dorchester. Premium ice cream catering for birthdays, corporate events, weddings, and every celebration.",
    localIntro:
      "WE Ice Cream Truck is Boston's premier mobile ice cream catering service, proudly serving the entire city and its surrounding neighborhoods. Whether you're planning a birthday party in Beacon Hill, a corporate employee appreciation day in the Financial District, a wedding reception near the Charles River, or a school event in Dorchester — we bring premium, freshly-served ice cream directly to your event. Our professional team arrives on time, sets up quickly, and delivers an unforgettable experience for every guest. Boston deserves the best, and that's exactly what we deliver.",
    neighborhoods: [
      "Back Bay",
      "South End",
      "Beacon Hill",
      "Fenway",
      "Dorchester",
      "Jamaica Plain",
      "Roxbury",
      "Charlestown",
      "East Boston",
      "South Boston",
      "Allston",
      "Brighton",
      "Hyde Park",
      "Mattapan",
      "Roslindale",
      "West Roxbury",
    ],
    nearbyAreas: ["Cambridge", "Somerville", "Brookline", "Newton", "Quincy"],
    landmarkMentions: [
      "Fenway Park",
      "Boston Common",
      "Charles River",
      "Faneuil Hall",
    ],
    localFAQs: [
      {
        question:
          "Do you serve ice cream trucks in all Boston neighborhoods?",
        answer:
          "Yes! WE Ice Cream Truck serves all Boston neighborhoods including Back Bay, South End, Beacon Hill, Fenway, Dorchester, Jamaica Plain, Charlestown, South Boston, Allston, Brighton, Hyde Park, Mattapan, Roslindale, and West Roxbury.",
      },
      {
        question:
          "How much does an ice cream truck rental cost in Boston?",
        answer:
          "Our Boston packages start at $190 for the Lumière (Sprinter Van, up to 30 guests) and go up to $825 for The Grand (200 guests, 3 hours). Custom quotes are available for larger events. Call 617-999-3803 or request a free quote online.",
      },
      {
        question:
          "Can you park an ice cream truck at a Boston venue or park?",
        answer:
          "We handle all logistics including parking coordination for your Boston event. We're experienced with Boston's streets and can work with your venue to find the best setup location.",
      },
      {
        question:
          "How far in advance should I book for a Boston event?",
        answer:
          "We recommend booking 2–4 weeks in advance for Boston events, especially during peak summer months (June–August). Boston weekends in July and August fill up quickly. Contact us early for the best date selection.",
      },
    ],
    heroImageQuery:
      "cinematic ice cream truck Boston Massachusetts golden hour skyline Charles River event celebration",
    tier: 1,
    isTopCity: true,
    priorityScore: 100,
  },
  {
    slug: "cambridge",
    name: "Cambridge",
    county: "Middlesex County",
    region: "Greater Boston",
    population: 118977,
    lat: 42.3736,
    lng: -71.1097,
    metaTitle:
      "Ice Cream Truck Rental in Cambridge, MA | WE Ice Cream Truck",
    metaDescription:
      "Premium ice cream truck catering in Cambridge, MA. Serving Harvard Square, MIT, and all Cambridge neighborhoods. Free quotes available — call 617-999-3803.",
    heroHeadline: "Cambridge's Premier Ice Cream Truck",
    heroSubline:
      "From Harvard Square to MIT — serving Cambridge's vibrant neighborhoods with premium ice cream catering for every celebration.",
    localIntro:
      "WE Ice Cream Truck brings premium mobile ice cream catering to Cambridge, MA — home to Harvard University, MIT, and some of the most vibrant neighborhoods in New England. Whether you're planning a corporate event for a Cambridge tech company, a birthday celebration near Harvard Square, a school festival for Cambridge public schools, or a community block party in Inman Square — our professional team delivers an unforgettable experience. Cambridge's unique energy deserves a premium catering partner, and WE Ice Cream Truck is proud to serve every corner of this incredible city.",
    neighborhoods: [
      "Harvard Square",
      "Central Square",
      "Inman Square",
      "Kendall Square",
      "Porter Square",
      "East Cambridge",
      "Mid-Cambridge",
      "Cambridgeport",
      "Area IV",
    ],
    nearbyAreas: ["Boston", "Somerville", "Watertown", "Belmont", "Arlington"],
    landmarkMentions: ["Harvard University", "MIT", "Charles River", "Harvard Square"],
    localFAQs: [
      {
        question: "Do you serve corporate events near Kendall Square in Cambridge?",
        answer:
          "Absolutely! Kendall Square is one of our most popular corporate event locations. We regularly serve tech companies, biotech firms, and startups in the Cambridge innovation district.",
      },
      {
        question:
          "Can you serve a Harvard or MIT event in Cambridge?",
        answer:
          "Yes! We frequently serve university events, student celebrations, faculty appreciation days, and orientation events at both Harvard and MIT. We're experienced working with university venues and their specific requirements.",
      },
      {
        question: "How much does an ice cream truck cost in Cambridge, MA?",
        answer:
          "Cambridge packages start at $190 for The Lumière (up to 30 guests) and scale up based on guest count and duration. Request a free quote online or call 617-999-3803.",
      },
      {
        question: "Do you serve all Cambridge neighborhoods?",
        answer:
          "Yes — we serve all Cambridge neighborhoods including Harvard Square, Central Square, Inman Square, Kendall Square, Porter Square, East Cambridge, and more.",
      },
    ],
    heroImageQuery:
      "cinematic ice cream truck Cambridge Massachusetts Harvard MIT golden hour celebration event",
    tier: 1,
    isTopCity: true,
    priorityScore: 95,
  },
  {
    slug: "worcester",
    name: "Worcester",
    county: "Worcester County",
    region: "Central Massachusetts",
    population: 206518,
    lat: 42.2626,
    lng: -71.8023,
    metaTitle:
      "Ice Cream Truck Rental in Worcester, MA | WE Ice Cream Truck",
    metaDescription:
      "Premium ice cream truck catering in Worcester, MA. Serving all Worcester neighborhoods for birthdays, corporate events & more. Call 617-999-3803.",
    heroHeadline: "Worcester's Favorite Ice Cream Experience",
    heroSubline:
      "Central Massachusetts' premier ice cream truck catering service — serving all of Worcester for birthdays, corporate events, school festivals, and every celebration.",
    localIntro:
      "WE Ice Cream Truck is proud to serve Worcester, Massachusetts — the heart of Central Massachusetts and New England's second-largest city. From birthday parties in Shrewsbury Street to corporate events downtown, school festivals in the city's vibrant neighborhoods, and community gatherings at Elm Park — our premium mobile ice cream service brings joy to every occasion. Worcester's diverse, energetic community deserves a premium experience, and that's exactly what WE Ice Cream Truck delivers.",
    neighborhoods: [
      "Downtown Worcester",
      "Shrewsbury Street",
      "Elm Park",
      "Burncoat",
      "Greendale",
      "Main South",
      "Bell Hill",
    ],
    nearbyAreas: ["Shrewsbury", "Millbury", "Auburn", "Northborough", "Grafton"],
    landmarkMentions: ["Elm Park", "Shrewsbury Street", "Hanover Theatre"],
    localFAQs: [
      {
        question: "Do you serve ice cream trucks in Worcester, MA?",
        answer:
          "Yes! WE Ice Cream Truck proudly serves all of Worcester, including downtown, Shrewsbury Street, Elm Park, and all surrounding neighborhoods.",
      },
      {
        question: "How much does an ice cream truck cost in Worcester?",
        answer:
          "Worcester packages start at $190 for The Lumière (up to 30 guests). Request a free quote online or call 617-999-3803 for personalized pricing.",
      },
      {
        question: "Can you serve large school events in Worcester?",
        answer:
          "Absolutely. Our Grand package serves up to 200 guests over 3 hours, making it perfect for Worcester school festivals, field days, and graduation celebrations.",
      },
      {
        question: "Do you travel to Worcester from Greater Boston?",
        answer:
          "Yes — we regularly serve Worcester and Central Massachusetts. A travel fee may apply depending on your event location. Contact us for a custom quote.",
      },
    ],
    heroImageQuery:
      "cinematic ice cream truck Worcester Massachusetts central MA golden hour celebration event community",
    tier: 1,
    isTopCity: true,
    priorityScore: 88,
  },

  // ─── TIER 2 — PRIORITY CITIES (sample — full list continues) ──
  {
    slug: "somerville",
    name: "Somerville",
    county: "Middlesex County",
    region: "Greater Boston",
    lat: 42.3876,
    lng: -71.0995,
    metaTitle: "Ice Cream Truck Rental in Somerville, MA | WE Ice Cream Truck",
    metaDescription:
      "Premium ice cream truck catering in Somerville, MA. Serving Davis Square, Union Square & all Somerville neighborhoods. Call 617-999-3803.",
    heroHeadline: "Somerville's Sweet Spot",
    heroSubline:
      "From Davis Square to Union Square — bringing premium ice cream catering to every Somerville celebration.",
    localIntro:
      "WE Ice Cream Truck serves Somerville, MA — one of Greater Boston's most vibrant and community-focused cities. Perfect for Davis Square birthday parties, Union Square block parties, corporate events near Assembly Row, and school events throughout the city.",
    neighborhoods: ["Davis Square", "Union Square", "Assembly Row", "Ball Square", "Teele Square", "Winter Hill"],
    nearbyAreas: ["Cambridge", "Medford", "Arlington", "Boston"],
    localFAQs: [
      { question: "Do you serve Davis Square in Somerville?", answer: "Yes! We serve all Somerville neighborhoods including Davis Square, Union Square, Assembly Row, and more. Call 617-999-3803 for availability." },
      { question: "How much does an ice cream truck cost in Somerville?", answer: "Packages start at $190. Request a free quote online or call 617-999-3803." },
      { question: "Can you serve Assembly Row events in Somerville?", answer: "Absolutely — Assembly Row corporate events are one of our specialties in the Somerville area." },
      { question: "How far in advance should I book in Somerville?", answer: "2–4 weeks in advance is recommended for summer events. Somerville weekend dates fill quickly." },
    ],
    heroImageQuery: "cinematic ice cream truck Somerville Massachusetts Davis Square golden hour",
    tier: 2,
    isTopCity: true,
    priorityScore: 82,
  },
  {
    slug: "newton",
    name: "Newton",
    county: "Middlesex County",
    region: "Greater Boston",
    lat: 42.337,
    lng: -71.2092,
    metaTitle: "Ice Cream Truck Rental in Newton, MA | WE Ice Cream Truck",
    metaDescription: "Premium ice cream truck catering in Newton, MA for birthdays, corporate events & more. Free quote — call 617-999-3803.",
    heroHeadline: "Newton's Premier Ice Cream Experience",
    heroSubline: "Serving Newton's villages with premium ice cream catering for every occasion.",
    localIntro: "WE Ice Cream Truck serves Newton, MA — home to beautiful neighborhoods, top schools, and vibrant community events. From Newtonville birthday parties to corporate events in Newton Upper Falls and school celebrations throughout the city, we deliver premium ice cream catering with professional service.",
    neighborhoods: ["Newtonville", "Newton Centre", "Newton Highlands", "West Newton", "Newton Corner", "Newton Upper Falls", "Waban", "Chestnut Hill"],
    nearbyAreas: ["Brookline", "Waltham", "Needham", "Wellesley", "Boston"],
    localFAQs: [
      { question: "Do you serve all Newton villages?", answer: "Yes — we serve all of Newton's villages including Newtonville, Newton Centre, Newton Highlands, West Newton, and more." },
      { question: "How much does ice cream truck catering cost in Newton?", answer: "Packages start at $190. Request a free quote online or call 617-999-3803." },
      { question: "Do you serve school events in Newton?", answer: "Absolutely — Newton public and private school events are a specialty. Our Grand package handles up to 200 guests." },
      { question: "Do you serve Newton for corporate events?", answer: "Yes — we regularly serve Newton corporate events, employee appreciation days, and company picnics." },
    ],
    heroImageQuery: "cinematic ice cream truck Newton Massachusetts suburban golden hour birthday celebration",
    tier: 2,
    isTopCity: true,
    priorityScore: 79,
  },
  {
    slug: "quincy",
    name: "Quincy",
    county: "Norfolk County",
    region: "Greater Boston",
    lat: 42.2529,
    lng: -71.0023,
    metaTitle: "Ice Cream Truck Rental in Quincy, MA | WE Ice Cream Truck",
    metaDescription: "Premium ice cream truck catering in Quincy, MA. Serving all Quincy neighborhoods for birthdays, corporate events & more. Call 617-999-3803.",
    heroHeadline: "Quincy's Favorite Ice Cream Truck",
    heroSubline: "South Shore's premium ice cream truck catering — serving all of Quincy for every celebration.",
    localIntro: "WE Ice Cream Truck serves Quincy, MA — the City of Presidents and one of Greater Boston's most dynamic South Shore communities. Whether it's a Quincy Center birthday party, a North Quincy corporate event, or a community celebration near Wollaston Beach, we deliver premium ice cream catering with professional service.",
    neighborhoods: ["Quincy Center", "North Quincy", "Wollaston", "Quincy Point", "Merrymount", "Germantown", "Adams Shore", "Marina Bay"],
    nearbyAreas: ["Braintree", "Milton", "Weymouth", "Brockton", "Boston"],
    localFAQs: [
      { question: "Do you serve Quincy for ice cream truck rentals?", answer: "Yes! We serve all of Quincy including Quincy Center, North Quincy, Wollaston, and Marina Bay." },
      { question: "Can you set up near Wollaston Beach in Quincy?", answer: "We can coordinate with outdoor venue locations. Contact us to discuss your Wollaston Beach event." },
      { question: "How much does an ice cream truck cost in Quincy, MA?", answer: "Packages start at $190. Request a free quote online or call 617-999-3803." },
      { question: "How far in advance should I book for a Quincy event?", answer: "2–4 weeks in advance is recommended, especially for summer weekend events." },
    ],
    heroImageQuery: "cinematic ice cream truck Quincy Massachusetts South Shore golden hour",
    tier: 2,
    isTopCity: true,
    priorityScore: 76,
  },
  {
    slug: "brookline",
    name: "Brookline",
    county: "Norfolk County",
    region: "Greater Boston",
    lat: 42.3318,
    lng: -71.1212,
    metaTitle: "Ice Cream Truck Rental in Brookline, MA | WE Ice Cream Truck",
    metaDescription: "Premium ice cream truck catering in Brookline, MA. Serving Coolidge Corner and all Brookline for birthdays, corporate events & more. Call 617-999-3803.",
    heroHeadline: "Brookline's Premium Ice Cream Experience",
    heroSubline: "Serving Coolidge Corner, Brookline Village, and beyond with world-class ice cream catering.",
    localIntro: "WE Ice Cream Truck proudly serves Brookline, MA — one of Greater Boston's most sought-after communities. From elegant birthday parties near Coolidge Corner to corporate events downtown and school celebrations throughout Brookline, our premium service matches the high standards this community expects.",
    neighborhoods: ["Coolidge Corner", "Brookline Village", "Chestnut Hill", "Washington Square", "Longwood", "South Brookline"],
    nearbyAreas: ["Boston", "Newton", "Cambridge", "Chestnut Hill"],
    localFAQs: [
      { question: "Do you serve Coolidge Corner events in Brookline?", answer: "Yes! Coolidge Corner and all Brookline neighborhoods are fully covered by WE Ice Cream Truck." },
      { question: "How much does ice cream truck catering cost in Brookline?", answer: "Packages start at $190. Request a free quote online or call 617-999-3803." },
      { question: "Do you serve Brookline school events?", answer: "Absolutely. We serve Brookline public and private school events including field days, fundraisers, and graduation celebrations." },
      { question: "Can you serve Longwood Medical Area events in Brookline?", answer: "Yes — we serve medical campus events, hospital appreciation days, and healthcare corporate events in the Longwood area." },
    ],
    heroImageQuery: "cinematic ice cream truck Brookline Massachusetts Coolidge Corner golden hour premium",
    tier: 2,
    isTopCity: true,
    priorityScore: 75,
  },
  {
    slug: "salem",
    name: "Salem",
    county: "Essex County",
    region: "North Shore",
    lat: 42.5195,
    lng: -70.8967,
    metaTitle: "Ice Cream Truck Rental in Salem, MA | WE Ice Cream Truck",
    metaDescription: "Premium ice cream truck catering in Salem, MA. Serving all Salem events — birthdays, corporate, festivals & more. Call 617-999-3803.",
    heroHeadline: "Salem's Sweetest Celebration Upgrade",
    heroSubline: "From historic downtown to Pickering Wharf — premium ice cream catering for every Salem celebration.",
    localIntro: "WE Ice Cream Truck serves Salem, MA — the Witch City and one of Massachusetts' most historically rich and vibrant communities. Whether it's a summer birthday celebration near Pickering Wharf, a corporate event downtown, a school festival, or a Halloween season event, we bring premium ice cream service to every corner of Salem.",
    neighborhoods: ["Downtown Salem", "Pickering Wharf", "Derby Wharf", "South Salem", "North Salem", "Point Neighborhood"],
    nearbyAreas: ["Beverly", "Peabody", "Marblehead", "Swampscott", "Danvers"],
    landmarkMentions: ["Salem Common", "Pickering Wharf", "Derby Wharf", "Peabody Essex Museum"],
    localFAQs: [
      { question: "Do you serve Salem events during Halloween season?", answer: "Yes! Salem's Halloween season is one of our busiest periods. Book early — October dates fill up extremely fast for Salem events." },
      { question: "How much does an ice cream truck cost in Salem, MA?", answer: "Packages start at $190. Request a free quote or call 617-999-3803." },
      { question: "Can you serve outdoor events near Salem Common?", answer: "Yes — we regularly serve outdoor events near Salem Common and other Salem outdoor venues. Contact us to coordinate logistics." },
      { question: "Do you serve corporate events in Salem?", answer: "Absolutely — Salem's growing business community is well-served by our corporate event packages." },
    ],
    heroImageQuery: "cinematic ice cream truck Salem Massachusetts historic downtown North Shore golden hour",
    tier: 2,
    isTopCity: false,
    priorityScore: 72,
  },

  // ─── TIER 3 — STANDARD COVERAGE (sample entries) ────────────
  {
    slug: "medford",
    name: "Medford",
    county: "Middlesex County",
    region: "Greater Boston",
    lat: 42.4184,
    lng: -71.1062,
    metaTitle: "Ice Cream Truck Rental in Medford, MA | WE Ice Cream Truck",
    metaDescription: "Premium ice cream truck catering in Medford, MA. Birthdays, corporate events & more. Call 617-999-3803.",
    heroHeadline: "Premium Ice Cream Catering in Medford, MA",
    heroSubline: "Serving all of Medford with professional ice cream truck catering.",
    localIntro: "WE Ice Cream Truck serves Medford, MA with premium mobile ice cream catering. Whether it's a birthday party, corporate event, or school celebration, we deliver an unforgettable experience to every Medford neighborhood.",
    nearbyAreas: ["Somerville", "Arlington", "Malden", "Cambridge", "Woburn"],
    localFAQs: [
      { question: "Do you serve Medford for ice cream truck rentals?", answer: "Yes! We serve all of Medford, MA. Call 617-999-3803 or request a free quote online." },
      { question: "How much does an ice cream truck cost in Medford?", answer: "Packages start at $190 for up to 30 guests. Get a free quote online." },
      { question: "What events do you serve in Medford?", answer: "We serve birthdays, corporate events, school events, block parties, weddings, and all celebrations in Medford." },
      { question: "How far in advance should I book?", answer: "2–4 weeks in advance is recommended for Medford events during peak season." },
    ],
    heroImageQuery: "cinematic ice cream truck Medford Massachusetts golden hour celebration",
    tier: 3,
    isTopCity: false,
    priorityScore: 65,
  },
  {
    slug: "waltham",
    name: "Waltham",
    county: "Middlesex County",
    region: "Greater Boston",
    lat: 42.3765,
    lng: -71.2356,
    metaTitle: "Ice Cream Truck Rental in Waltham, MA | WE Ice Cream Truck",
    metaDescription: "Premium ice cream truck catering in Waltham, MA. Birthdays, corporate events & more. Call 617-999-3803.",
    heroHeadline: "Ice Cream Truck Catering in Waltham, MA",
    heroSubline: "Serving all of Waltham with premium ice cream truck catering.",
    localIntro: "WE Ice Cream Truck serves Waltham, MA with premium mobile ice cream catering for every occasion. From birthday parties to corporate employee appreciation days near Route 128 — we deliver.",
    nearbyAreas: ["Watertown", "Newton", "Belmont", "Lexington", "Burlington"],
    localFAQs: [
      { question: "Do you serve Waltham for ice cream truck rentals?", answer: "Yes! We serve all of Waltham. Call 617-999-3803 or request a free quote online." },
      { question: "Do you serve corporate events near Route 128 in Waltham?", answer: "Absolutely — Route 128 corporate campuses are a specialty for our Waltham events." },
      { question: "How much does an ice cream truck cost in Waltham?", answer: "Packages start at $190. Get a free quote online or call us." },
      { question: "How far in advance should I book in Waltham?", answer: "2–4 weeks is recommended for summer events." },
    ],
    heroImageQuery: "cinematic ice cream truck Waltham Massachusetts corporate celebration golden hour",
    tier: 3,
    isTopCity: false,
    priorityScore: 62,
  },
  {
    slug: "lynn",
    name: "Lynn",
    county: "Essex County",
    region: "North Shore",
    lat: 42.4668,
    lng: -70.9495,
    metaTitle: "Ice Cream Truck Rental in Lynn, MA | WE Ice Cream Truck",
    metaDescription: "Premium ice cream truck catering in Lynn, MA. Birthdays, corporate events & more. Call 617-999-3803.",
    heroHeadline: "Ice Cream Truck Catering in Lynn, MA",
    heroSubline: "Serving all of Lynn with premium ice cream truck catering.",
    localIntro: "WE Ice Cream Truck serves Lynn, MA with professional, premium mobile ice cream catering for birthdays, corporate events, school events, and community celebrations.",
    nearbyAreas: ["Revere", "Saugus", "Swampscott", "Salem", "Peabody"],
    localFAQs: [
      { question: "Do you serve Lynn, MA for ice cream truck rentals?", answer: "Yes! We serve all of Lynn. Call 617-999-3803 or get a free quote online." },
      { question: "How much does ice cream truck catering cost in Lynn?", answer: "Packages start at $190 for up to 30 guests. Request a free quote." },
      { question: "What events do you serve in Lynn?", answer: "Birthdays, corporate events, school events, block parties, and all celebrations in Lynn, MA." },
      { question: "How far in advance should I book?", answer: "2–4 weeks is recommended for peak summer dates." },
    ],
    heroImageQuery: "cinematic ice cream truck Lynn Massachusetts North Shore golden hour",
    tier: 3,
    isTopCity: false,
    priorityScore: 60,
  },
  {
    slug: "lowell",
    name: "Lowell",
    county: "Middlesex County",
    region: "Merrimack Valley",
    lat: 42.6334,
    lng: -71.3162,
    metaTitle: "Ice Cream Truck Rental in Lowell, MA | WE Ice Cream Truck",
    metaDescription: "Premium ice cream truck catering in Lowell, MA. Birthdays, corporate events & more. Call 617-999-3803.",
    heroHeadline: "Ice Cream Truck Catering in Lowell, MA",
    heroSubline: "Serving Lowell and the Merrimack Valley with premium ice cream catering.",
    localIntro: "WE Ice Cream Truck serves Lowell, MA with premium mobile ice cream catering. From downtown Lowell corporate events to school celebrations and birthday parties throughout the city.",
    nearbyAreas: ["Chelmsford", "Tewksbury", "Billerica", "Dracut", "Haverhill"],
    localFAQs: [
      { question: "Do you serve Lowell, MA?", answer: "Yes! We serve Lowell and the surrounding Merrimack Valley area. Call 617-999-3803." },
      { question: "How much does ice cream truck catering cost in Lowell?", answer: "Packages start at $190. Travel fees may apply — request a free custom quote." },
      { question: "What events do you serve in Lowell?", answer: "Birthdays, corporate events, school events, festivals, and community celebrations." },
      { question: "Do you serve events at Boarding House Park in Lowell?", answer: "Yes — we can coordinate service at outdoor venues including Lowell's parks and public spaces." },
    ],
    heroImageQuery: "cinematic ice cream truck Lowell Massachusetts Merrimack Valley golden hour",
    tier: 3,
    isTopCity: false,
    priorityScore: 58,
  },
  {
    slug: "springfield",
    name: "Springfield",
    county: "Hampden County",
    region: "Pioneer Valley",
    lat: 42.1015,
    lng: -72.5898,
    metaTitle: "Ice Cream Truck Rental in Springfield, MA | WE Ice Cream Truck",
    metaDescription: "Premium ice cream truck catering in Springfield, MA. Birthdays, corporate events & more. Call 617-999-3803.",
    heroHeadline: "Ice Cream Truck Catering in Springfield, MA",
    heroSubline: "Bringing premium ice cream catering to Western Massachusetts.",
    localIntro: "WE Ice Cream Truck serves Springfield, MA and the Pioneer Valley with premium mobile ice cream catering. From birthday celebrations to large corporate events in Western Massachusetts, we travel the distance.",
    nearbyAreas: ["Chicopee", "Holyoke", "West Springfield", "Agawam", "Longmeadow"],
    localFAQs: [
      { question: "Do you travel to Springfield, MA?", answer: "Yes! We serve Springfield and the Pioneer Valley. A travel fee applies — request a custom quote online." },
      { question: "How much does ice cream truck catering cost in Springfield?", answer: "Packages start at $190 plus travel fee. Request a free quote online or call 617-999-3803." },
      { question: "What events do you serve in Springfield?", answer: "Birthdays, corporate events, school events, festivals, and community celebrations in Western MA." },
      { question: "Can you serve Basketball Hall of Fame area events?", answer: "Yes — we can coordinate service at Springfield venues and event spaces." },
    ],
    heroImageQuery: "cinematic ice cream truck Springfield Massachusetts Pioneer Valley Western MA golden hour",
    tier: 3,
    isTopCity: false,
    priorityScore: 55,
  },
  {
    slug: "framingham",
    name: "Framingham",
    county: "Middlesex County",
    region: "MetroWest",
    lat: 42.2793,
    lng: -71.4162,
    metaTitle: "Ice Cream Truck Rental in Framingham, MA | WE Ice Cream Truck",
    metaDescription: "Premium ice cream truck catering in Framingham, MA. Birthdays, corporate events & more. Call 617-999-3803.",
    heroHeadline: "Ice Cream Truck Catering in Framingham, MA",
    heroSubline: "Serving MetroWest Massachusetts with premium ice cream catering.",
    localIntro: "WE Ice Cream Truck serves Framingham, MA and the MetroWest region with premium mobile ice cream catering for birthdays, corporate events, school events, and community celebrations.",
    nearbyAreas: ["Natick", "Ashland", "Southborough", "Hopkinton", "Marlborough"],
    localFAQs: [
      { question: "Do you serve Framingham for ice cream truck rentals?", answer: "Yes! We serve Framingham and all of MetroWest. Call 617-999-3803." },
      { question: "How much does ice cream truck catering cost in Framingham?", answer: "Packages start at $190. Request a free quote online." },
      { question: "Do you serve corporate events in Framingham?", answer: "Yes — MetroWest corporate events including Framingham office parks are well-served by our packages." },
      { question: "How far is Framingham from your base?", answer: "We regularly travel to Framingham and the MetroWest area. A small travel fee may apply depending on event details." },
    ],
    heroImageQuery: "cinematic ice cream truck Framingham Massachusetts MetroWest golden hour celebration",
    tier: 3,
    isTopCity: false,
    priorityScore: 58,
  },
  {
    slug: "brockton",
    name: "Brockton",
    county: "Plymouth County",
    region: "South Shore",
    lat: 42.0834,
    lng: -71.0184,
    metaTitle: "Ice Cream Truck Rental in Brockton, MA | WE Ice Cream Truck",
    metaDescription: "Premium ice cream truck catering in Brockton, MA. Birthdays, corporate events & more. Call 617-999-3803.",
    heroHeadline: "Ice Cream Truck Catering in Brockton, MA",
    heroSubline: "Serving Brockton and Plymouth County with premium ice cream catering.",
    localIntro: "WE Ice Cream Truck serves Brockton, MA with premium mobile ice cream catering for birthdays, corporate events, school events, and community celebrations throughout Plymouth County.",
    nearbyAreas: ["Stoughton", "Avon", "Abington", "Whitman", "Randolph"],
    localFAQs: [
      { question: "Do you serve Brockton for ice cream truck rentals?", answer: "Yes! We serve Brockton and all of Plymouth County. Call 617-999-3803." },
      { question: "How much does ice cream truck catering cost in Brockton?", answer: "Packages start at $190. Request a free quote online." },
      { question: "What events do you serve in Brockton?", answer: "Birthdays, corporate events, school events, block parties, and community celebrations." },
      { question: "How far in advance should I book?", answer: "2–4 weeks in advance is recommended for summer events in Brockton." },
    ],
    heroImageQuery: "cinematic ice cream truck Brockton Massachusetts South Shore golden hour community celebration",
    tier: 3,
    isTopCity: false,
    priorityScore: 55,
  },
  {
    slug: "plymouth",
    name: "Plymouth",
    county: "Plymouth County",
    region: "South Shore",
    lat: 41.9584,
    lng: -70.6673,
    metaTitle: "Ice Cream Truck Rental in Plymouth, MA | WE Ice Cream Truck",
    metaDescription: "Premium ice cream truck catering in Plymouth, MA. Serving America's Hometown for birthdays, events & more. Call 617-999-3803.",
    heroHeadline: "Plymouth's Favorite Ice Cream Experience",
    heroSubline: "Serving America's Hometown with premium ice cream catering for every celebration.",
    localIntro: "WE Ice Cream Truck serves Plymouth, MA — America's Hometown. From birthday parties near Plymouth Harbor to corporate events and school celebrations throughout this historic coastal city, we deliver premium ice cream service with a smile.",
    nearbyAreas: ["Kingston", "Duxbury", "Marshfield", "Carver", "Bourne"],
    landmarkMentions: ["Plymouth Rock", "Plymouth Harbor", "Plimoth Patuxent"],
    localFAQs: [
      { question: "Do you serve Plymouth, MA?", answer: "Yes! We serve Plymouth and the surrounding South Shore area. Call 617-999-3803." },
      { question: "How much does ice cream truck catering cost in Plymouth?", answer: "Packages start at $190. Travel fees may apply — request a free custom quote." },
      { question: "Can you serve outdoor events near Plymouth Harbor?", answer: "Yes — we coordinate outdoor venue events including waterfront locations in Plymouth." },
      { question: "Do you serve Plymouth school events?", answer: "Yes — school field days, graduation celebrations, and festivals in Plymouth are a specialty." },
    ],
    heroImageQuery: "cinematic ice cream truck Plymouth Massachusetts coastal harbor golden hour summer celebration",
    tier: 3,
    isTopCity: false,
    priorityScore: 52,
  },
  {
    slug: "revere",
    name: "Revere",
    county: "Suffolk County",
    region: "Greater Boston",
    lat: 42.4084,
    lng: -71.012,
    metaTitle: "Ice Cream Truck Rental in Revere, MA | WE Ice Cream Truck",
    metaDescription: "Premium ice cream truck catering in Revere, MA. Serving Revere Beach and all neighborhoods. Call 617-999-3803.",
    heroHeadline: "Ice Cream Truck Catering in Revere, MA",
    heroSubline: "Serving Revere Beach and all neighborhoods with premium ice cream catering.",
    localIntro: "WE Ice Cream Truck is based in Revere, MA — giving us unparalleled access to serve the city and surrounding communities. From Revere Beach events to birthday parties and corporate celebrations throughout the city, we deliver premium ice cream with hometown pride.",
    neighborhoods: ["Revere Beach", "Point of Pines", "Beachmont", "Wonderland", "North Revere"],
    nearbyAreas: ["Lynn", "Winthrop", "Chelsea", "Boston", "Saugus"],
    landmarkMentions: ["Revere Beach", "Wonderland Station"],
    localFAQs: [
      { question: "Is WE Ice Cream Truck based in Revere?", answer: "Yes! Our base of operations is in Revere, MA — meaning we can serve Revere events with the fastest response time." },
      { question: "Do you serve Revere Beach events?", answer: "Yes — Revere Beach outdoor events and celebrations are a specialty. Contact us to coordinate logistics for beachside events." },
      { question: "How much does ice cream truck catering cost in Revere?", answer: "Packages start at $190 with no travel fee for Revere events. Request a free quote." },
      { question: "What events do you serve in Revere?", answer: "Birthdays, corporate events, school events, block parties, beach events, and all celebrations in Revere." },
    ],
    heroImageQuery: "cinematic ice cream truck Revere Massachusetts Revere Beach golden hour summer",
    tier: 2,
    isTopCity: true,
    priorityScore: 70,
  },
  // NOTE: Additional cities follow the same pattern
  // Full 100+ city dataset continued in content/cities/*.json
];

// Helper functions
export function getCityBySlug(slug: string): CityData | undefined {
  return MASSACHUSETTS_CITIES.find((c) => c.slug === slug);
}

export function getTopCities(): CityData[] {
  return MASSACHUSETTS_CITIES.filter((c) => c.isTopCity).sort(
    (a, b) => b.priorityScore - a.priorityScore
  );
}

export function getTier1Cities(): CityData[] {
  return MASSACHUSETTS_CITIES.filter((c) => c.tier === 1);
}

export function getNearbyAreas(slug: string): CityData[] {
  const city = getCityBySlug(slug);
  if (!city) return [];
  return city.nearbyAreas
    .map((name) =>
      MASSACHUSETTS_CITIES.find(
        (c) => c.name.toLowerCase() === name.toLowerCase()
      )
    )
    .filter(Boolean) as CityData[];
}

export function getAllCitySlugs(): string[] {
  return MASSACHUSETTS_CITIES.map((c) => c.slug);
}
