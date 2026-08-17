import { BUSINESS_CONFIG } from '@/lib/config';

const BASE_URL = BUSINESS_CONFIG.domain;

// All site images with professional promotional captions
// Google reads the <image:caption> tag and shows it under the image in search results
const IMAGES = [
  // ── Hero & Brand ───────────────────────────────────────────────
  {
    loc: `${BASE_URL}/images/hero-cinematic.jpg`,
    title: 'WE Ice Cream Truck — Premium Event Catering in Massachusetts',
    caption: 'Massachusetts\' most trusted premium ice cream truck catering service, bringing sweet smiles to birthdays, corporate events, weddings, and every celebration.',
    pages: ['/', '/about'],
  },
  {
    loc: `${BASE_URL}/images/classic-truck.jpg`,
    title: 'WE Ice Cream Truck — Classic Ice Cream Truck for Events',
    caption: 'Our iconic, well-maintained ice cream truck ready to make your event unforgettable. Available for private bookings across all of Massachusetts.',
    pages: ['/', '/about', '/packages'],
  },
  {
    loc: `${BASE_URL}/images/we-icecream.jpg`,
    title: 'WE Ice Cream Truck — Professional Catering Service',
    caption: 'Professional, licensed ice cream truck catering for any event size. Serving Greater Boston and all Massachusetts communities.',
    pages: ['/'],
  },

  // ── Occasions / Services ────────────────────────────────────────
  {
    loc: `${BASE_URL}/images/birthday-parties.jpg`,
    title: 'Ice Cream Truck for Birthday Parties in Massachusetts',
    caption: 'Turn any birthday into a magical memory with a WE Ice Cream Truck! Premium ice cream catering for kids and adult birthday parties across Massachusetts.',
    pages: ['/occasions/birthday-parties', '/services/birthday-parties'],
  },
  {
    loc: `${BASE_URL}/images/corporate-parties.jpg`,
    title: 'Corporate Ice Cream Truck Catering — Boston & Massachusetts',
    caption: 'Elevate your corporate event, company picnic, or team-building day with WE Ice Cream Truck. Professional catering for businesses of all sizes across Massachusetts.',
    pages: ['/occasions/corporate-events', '/services/corporate-events'],
  },
  {
    loc: `${BASE_URL}/images/corporate-event.jpg`,
    title: 'Premium Corporate Event Ice Cream Catering',
    caption: 'Our ice cream truck has served hundreds of corporate events across Greater Boston — a guaranteed hit that every employee will love.',
    pages: ['/occasions/corporate-events'],
  },
  {
    loc: `${BASE_URL}/images/block-parties.jpg`,
    title: 'Ice Cream Truck for Block Parties in Massachusetts',
    caption: 'Make your neighborhood block party legendary! WE Ice Cream Truck brings premium frozen treats and fun for the whole community.',
    pages: ['/occasions/block-parties', '/services/block-parties'],
  },
  {
    loc: `${BASE_URL}/images/fundraise.jpg`,
    title: 'Ice Cream Truck Fundraiser Events — Massachusetts Schools & Nonprofits',
    caption: 'Partner with WE Ice Cream Truck for your next school fundraiser, charity event, or community cause. Delicious ice cream that helps raise funds and smiles.',
    pages: ['/occasions/fundraisers', '/services/fundraisers'],
  },
  {
    loc: `${BASE_URL}/images/launch-parties.jpg`,
    title: 'Grand Opening & Launch Party Ice Cream Catering',
    caption: 'Make your grand opening or product launch unforgettable with WE Ice Cream Truck. Premium ice cream catering that creates buzz and draws a crowd.',
    pages: ['/occasions/launch-parties', '/services/launch-parties'],
  },
  {
    loc: `${BASE_URL}/images/marketing-events.jpg`,
    title: 'Marketing Event Ice Cream Truck Activation — Massachusetts',
    caption: 'Ice cream truck activations are the ultimate marketing tool. WE Ice Cream Truck creates memorable brand experiences at trade shows, pop-ups, and marketing events.',
    pages: ['/occasions/marketing-events', '/services/marketing-events'],
  },
  {
    loc: `${BASE_URL}/images/photo-sessions.jpg`,
    title: 'Ice Cream Truck Photo & Video Shoot Rental — Massachusetts',
    caption: 'Rent our photogenic classic ice cream truck for your next photo shoot, commercial, or video production. The perfect nostalgic backdrop for any creative project.',
    pages: ['/occasions/photo-sessions', '/services/photo-sessions'],
  },
  {
    loc: `${BASE_URL}/images/sweeter-together.jpg`,
    title: 'WE Ice Cream Truck — Sweeter Together Events',
    caption: 'Every celebration is sweeter with WE Ice Cream Truck. From intimate gatherings to large festivals, we bring premium ice cream and joy to every event.',
    pages: ['/', '/occasions'],
  },

  // ── Packages ────────────────────────────────────────────────────
  {
    loc: `${BASE_URL}/images/packages_truck/sweet_star.jpg`,
    title: 'Sweet Star Ice Cream Catering Package — WE Ice Cream Truck',
    caption: 'Our Sweet Star package — the perfect introduction to premium ice cream truck catering for smaller, intimate celebrations in Massachusetts.',
    pages: ['/packages'],
  },
  {
    loc: `${BASE_URL}/images/packages_truck/classic_celebiation.jpg`,
    title: 'Classic Celebration Package — WE Ice Cream Truck Massachusetts',
    caption: 'The Classic Celebration package offers premium ice cream catering for mid-sized events. Perfect for birthday parties, family reunions, and community gatherings.',
    pages: ['/packages'],
  },
  {
    loc: `${BASE_URL}/images/packages_truck/signature_celebration.jpg`,
    title: 'Signature Celebration Package — Premium Ice Cream Catering',
    caption: 'Our Signature Celebration package delivers a full premium catering experience for large events. Professional service, extended service time, and more servings.',
    pages: ['/packages'],
  },
  {
    loc: `${BASE_URL}/images/packages_truck/grand_celebiation.jpg`,
    title: 'Grand Celebration Package — WE Ice Cream Truck',
    caption: 'The Grand Celebration package is designed for large-scale events across Massachusetts. Premium ice cream catering for corporate events, festivals, and big celebrations.',
    pages: ['/packages'],
  },
  {
    loc: `${BASE_URL}/images/packages_truck/elite_celebration.jpg`,
    title: 'Elite Celebration Package — Luxury Ice Cream Truck Catering',
    caption: 'Experience the ultimate in ice cream truck luxury with our Elite Celebration package. Premium servings, extended hours, and VIP treatment for your guests.',
    pages: ['/packages'],
  },
  {
    loc: `${BASE_URL}/images/packages_truck/platinum_celebiation.jpg`,
    title: 'Platinum Celebration Package — WE Ice Cream Truck',
    caption: 'Our flagship Platinum Celebration package is the gold standard of ice cream catering in Massachusetts — ideal for large corporate events, major fundraisers, and grand celebrations.',
    pages: ['/packages'],
  },

  // ── Gallery ──────────────────────────────────────────────────────
  {
    loc: `${BASE_URL}/images/gallery-1.jpg`,
    title: 'WE Ice Cream Truck at a Private Event — Massachusetts',
    caption: 'WE Ice Cream Truck in action at a private event in Massachusetts. Our professional setup creates an inviting atmosphere that guests love.',
    pages: ['/about', '/'],
  },
  {
    loc: `${BASE_URL}/images/gallery-2.jpg`,
    title: 'Premium Ice Cream Service at Massachusetts Event',
    caption: 'Our team delivers premium ice cream service at events across Massachusetts. Every serving is an experience to remember.',
    pages: ['/about', '/'],
  },
  {
    loc: `${BASE_URL}/images/gallery-3.jpg`,
    title: 'Ice Cream Truck Event Setup — Greater Boston',
    caption: 'WE Ice Cream Truck brings the magic to events across Greater Boston and Massachusetts. Professional setup, premium products, and unforgettable service.',
    pages: ['/about'],
  },
  {
    loc: `${BASE_URL}/images/gallery-4.jpg`,
    title: 'Corporate Ice Cream Catering Event — Massachusetts',
    caption: 'A corporate event served by WE Ice Cream Truck. We have catered to hundreds of companies across Massachusetts, creating memorable employee experiences.',
    pages: ['/about'],
  },
  {
    loc: `${BASE_URL}/images/gallery-5.jpg`,
    title: 'WE Ice Cream Truck — Happy Guests at Massachusetts Event',
    caption: 'Happy guests enjoying premium ice cream at a WE Ice Cream Truck event. This is why we do what we do — spreading joy, one scoop at a time.',
    pages: ['/about'],
  },
  {
    loc: `${BASE_URL}/images/gallery-8.jpg`,
    title: 'Premium Ice Cream Truck Catering — Massachusetts',
    caption: 'WE Ice Cream Truck offers premium catering that elevates any event. Our professional team and top-quality ice cream create moments guests talk about for years.',
    pages: ['/about'],
  },
];

function escapeXml(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

export async function GET() {
  // Build a map of page → images
  const pageImageMap: Record<string, typeof IMAGES> = {};

  for (const img of IMAGES) {
    for (const page of img.pages) {
      if (!pageImageMap[page]) pageImageMap[page] = [];
      pageImageMap[page].push(img);
    }
  }

  const urls = Object.entries(pageImageMap).map(([page, imgs]) => {
    const imageTags = imgs.map((img) => `
    <image:image>
      <image:loc>${escapeXml(img.loc)}</image:loc>
      <image:title>${escapeXml(img.title)}</image:title>
      <image:caption>${escapeXml(img.caption)}</image:caption>
    </image:image>`).join('');

    return `
  <url>
    <loc>${escapeXml(`${BASE_URL}${page}`)}</loc>${imageTags}
  </url>`;
  });

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset
  xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
  xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">
${urls.join('\n')}
</urlset>`;

  return new Response(xml, {
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
      'Cache-Control': 'public, max-age=86400, s-maxage=86400',
    },
  });
}
