import * as dotenv from 'dotenv';
dotenv.config({ path: '.env.local' });

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SUPABASE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;

async function listPrices() {
  const headers = {
    'apikey': SUPABASE_KEY!,
    'Authorization': `Bearer ${SUPABASE_KEY}`,
  };

  const res = await fetch(
    `${SUPABASE_URL}/rest/v1/Package?select=name,slug,serviceType,price,servings,durationMins,extraGuestPrice,extraPiecePrice,sortOrder&order=sortOrder.asc`,
    { headers }
  );
  const packages = await res.json();

  console.log("Current Package Prices in Database:\n");
  packages.forEach((p: any) => {
    console.log(`${p.name} (${p.serviceType})`);
    console.log(`  slug: ${p.slug}`);
    console.log(`  price: $${p.price}`);
    console.log(`  servings: ${p.servings}`);
    console.log(`  duration: ${p.durationMins} min`);
    console.log(`  extraGuestPrice: $${p.extraGuestPrice}`);
    console.log(`  extraPiecePrice: $${p.extraPiecePrice}`);
    console.log('');
  });
}

listPrices().catch(console.error);
