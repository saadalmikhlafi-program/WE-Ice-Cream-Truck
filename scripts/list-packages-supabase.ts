import * as dotenv from 'dotenv';
dotenv.config({ path: '.env.local' });

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SUPABASE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;

async function updatePackages() {
  const headers = {
    'apikey': SUPABASE_KEY!,
    'Authorization': `Bearer ${SUPABASE_KEY}`,
    'Content-Type': 'application/json',
    'Prefer': 'return=representation'
  };

  const res = await fetch(`${SUPABASE_URL}/rest/v1/Package?select=slug,name`, { headers });
  const packages = await res.json();
  
  console.log("All packages:", packages.map((p: any) => p.slug));
}

updatePackages().catch(console.error);
