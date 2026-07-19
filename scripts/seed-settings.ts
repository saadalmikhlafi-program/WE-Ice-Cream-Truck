/**
 * Seed the Settings table with real WE Ice Cream Truck business data.
 * Run with: npx tsx scripts/seed-settings.ts
 */

import * as dotenv from "dotenv";
dotenv.config({ path: ".env.local" });

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const SUPABASE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY!;

if (!SUPABASE_URL || !SUPABASE_KEY) {
  console.error("❌ Missing SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY");
  process.exit(1);
}

// ─── Real Business Settings ───────────────────────────────────────────────────
const SETTINGS: Record<string, string> = {
  // Company Info
  companyName: "WE Ice Cream Truck",
  businessHours: "Available 24 hours by reservation, 7 days a week",
  companyPhone: "617-999-3803",
  companyEmail: "info@weicecreamtruck.com",
  companyAddress: "38 Woodland Rd, Georgetown, MA 01833",

  // Pricing Rules
  serviceRadius: "10",         // First 10 miles are FREE
  travelFeePerMile: "2.50",   // $2.50 per mile after the free radius
  taxRate: "0",                // No tax applied

  // Booking
  bookingAutoApprove: "false",
  COMPANY_ZIP_CODE: "01833",   // Georgetown, MA (base of operations)

  // Brand
  logoUrl: "/images/we-icecream.jpg",
  faviconUrl: "/favicon.ico",

  // SEO
  seoTitle: "WE Ice Cream Truck - Premium Ice Cream Catering in Massachusetts",
  seoDescription: "Massachusetts' most trusted premium ice cream truck catering service. Available for birthdays, corporate events, weddings, and every celebration across all of Massachusetts.",

  // Social Media (to be filled by owner)
  facebookUrl: "",
  instagramUrl: "",

  // AI Concierge
  aiAssistantName: "WE Ice Cream Truck AI Concierge",
  aiAssistantSystemPrompt: `You are the WE Ice Cream Truck AI Concierge — a helpful, warm, and professional assistant. Your role is to help customers learn about our services, packages, and pricing, and to guide them toward booking an ice cream truck for their event. Always be enthusiastic, warm, and professional. Company: WE Ice Cream Truck. Phone: 617-999-3803. Email: info@weicecreamtruck.com. Location: Georgetown, MA. Travel fee: First 10 miles FREE, then $2.50/mile.`,
};

async function seedSettings() {
  console.log("🍦 Seeding WE Ice Cream Truck Settings...\n");

  let upserted = 0;
  let failed = 0;

  for (const [key, value] of Object.entries(SETTINGS)) {
    try {
      const res = await fetch(`${SUPABASE_URL}/rest/v1/Setting`, {
        method: "POST",
        headers: {
          "apikey": SUPABASE_KEY,
          "Authorization": `Bearer ${SUPABASE_KEY}`,
          "Content-Type": "application/json",
          "Prefer": "resolution=merge-duplicates",
        },
        body: JSON.stringify({ key, value }),
      });

      if (res.ok || res.status === 200 || res.status === 201) {
        console.log(`  ✅ ${key}`);
        upserted++;
      } else {
        const err = await res.text();
        console.error(`  ❌ ${key}: ${err}`);
        failed++;
      }
    } catch (e: any) {
      console.error(`  ❌ ${key}: ${e.message}`);
      failed++;
    }
  }

  console.log(`\n📊 Done! ${upserted} settings saved, ${failed} failed.`);
}

seedSettings();
