import * as dotenv from 'dotenv';
dotenv.config({ path: '.env.local' });

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SUPABASE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;

const map = {
  'quick-scoop': '/images/van_packages/quick_scoop.jpg',
  'party-favorite': '/images/van_packages/party_favorite.jpg',
  'community-choice': '/images/van_packages/community_choice.jpg',
  'festival-favorite': '/images/van_packages/festival.jpg',
  'big-smile-package': '/images/van_packages/big_smile.jpg',
  'signature-experience': '/images/van_packages/signature_experience.jpg',
  'custom-events': '/images/van_packages/custom_event.jpg',
};

async function updatePackages() {
  const headers = {
    'apikey': SUPABASE_KEY!,
    'Authorization': `Bearer ${SUPABASE_KEY}`,
    'Content-Type': 'application/json',
    'Prefer': 'return=representation'
  };

  for (const [slug, imageUrl] of Object.entries(map)) {
    console.log(`Updating ${slug} with ${imageUrl}...`);
    const res = await fetch(`${SUPABASE_URL}/rest/v1/Package?slug=eq.${slug}`, {
      method: 'PATCH',
      headers,
      body: JSON.stringify({ imageUrl })
    });
    if (!res.ok) {
      console.error(`Failed to update ${slug}:`, await res.text());
    } else {
      console.log(`Updated ${slug} successfully`);
    }
  }
}

updatePackages().catch(console.error);
