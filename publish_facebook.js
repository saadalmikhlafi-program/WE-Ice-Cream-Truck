// Upload photo first (unpublished), then attach it to feed post
const USER_TOKEN = 'EAAih8bWsRQQBSO7CNsfh1yxSLyG95neHEKWnncMr3KtmmZA7381KDOOkWNCyAZCzWOjOsVmBMNbUQJSb9ZAs0rYo9jyVJksueUGT2t5FM87weqpBzQkmA9OnP04jVQhZBOQcZAX52OERC79SD5dK6dbm4TcndZCr28Uv8G71CAyX65t5qjiQZB9XqCAv0UdArjzpVZCraprqEaE3ZAnTjRPWcI8jsSWCanfGkwq6i5bUfiWG8IyDFt7ek8b6ZAWZBE1e73gSpV9ZBlzAFbuzVl8wHZCQO';

// IDs of the 8 text-only posts we published — will be deleted
const OLD_TEXT_POST_IDS = [
  '1292552100605870_122101694757424832',
  '1292552100605870_122101694841424832',
  '1292552100605870_122101694907424832',
  '1292552100605870_122101694943424832',
  '1292552100605870_122101694973424832',
  '1292552100605870_122101694997424832',
  '1292552100605870_122101695051424832',
  '1292552100605870_122101695135424832',
];

const ALL_POSTS = [
  {
    message: `🎂 Make Their Birthday Absolutely Unforgettable!\n\nImagine the look on their face when a premium WE Ice Cream Truck pulls up playing their favorite tune! 🍦🎵 We specialize in turning ordinary birthdays into magical memories across Massachusetts.\n\nCustom music playlist, premium artisan ice cream, photo opportunities inside the truck, and allergen-friendly options — all in one sweet package!\n\n📅 Book before your date fills up:\n🌐 weicecreamtruck.com\n📞 617-999-3803\n\n#BirthdayParty #IceCreamTruck #Massachusetts #Boston #KidsBirthday #BirthdayIdeas #WeIceCreamTruck #BostonEvents #PremiumIceCream #BirthdayTreats #PartyPlanning`,
    imageUrl: 'https://weicecreamtruck.com/images/birthday-parties.jpg'
  },
  {
    message: `🏘️ Bring the Whole Neighborhood Together!\n\nNothing screams summer like an ice cream truck rolling down your street! 🍦☀️ Make your neighborhood block party legendary by booking WE Ice Cream Truck exclusively for your street.\n\nClassic music, endless smiles, and premium scoops for neighbors of all ages. Book your street's sweetest summer tradition today!\n\n📅 Schedule your block party:\n🌐 weicecreamtruck.com\n📞 617-999-3803\n\n#BlockParty #Neighborhood #Massachusetts #SummerFun #IceCreamTruck #WeIceCreamTruck #Boston #CommunityEvents #SummerVibes #BackyardParty`,
    imageUrl: 'https://weicecreamtruck.com/images/block-parties.jpg'
  },
  {
    message: `💼 Boost Team Morale — Treat Your Crew to Something Sweet!\n\nSurprise your employees with the ultimate mid-day pick-me-up! 🍦 WE Ice Cream Truck specializes in corporate catering across Massachusetts — from employee appreciation days to product launches and company picnics.\n\nWe serve hundreds of people quickly and professionally, with custom branding options available!\n\n📅 Let's plan your corporate event:\n🌐 weicecreamtruck.com\n📞 617-999-3803\n\n#CorporateEvents #EmployeeAppreciation #BostonCorporate #IceCreamTruckMA #WeIceCreamTruck #CompanyPicnic #OfficeParty #TeamMorale #BostonBusiness #CorporateCatering`,
    imageUrl: 'https://weicecreamtruck.com/images/corporate-parties.jpg'
  },
  {
    message: `🙌 Raise Funds. Make Memories. Scoop by Scoop!\n\nLooking for a unique way to draw a crowd and hit your fundraising goals? 🍦❤️ WE Ice Cream Truck loves supporting Massachusetts communities! We partner with schools, sports teams, and non-profits with our "Giveback" programs.\n\nYour supporters get premium ice cream — you hit your fundraising goals. Win-win!\n\n📅 Plan your fundraiser today:\n🌐 weicecreamtruck.com\n📞 617-999-3803\n\n#Fundraiser #Community #Massachusetts #SchoolFundraiser #NonProfit #IceCreamTruck #WeIceCreamTruck #Boston #GiveBack #SupportLocal`,
    imageUrl: 'https://weicecreamtruck.com/images/fundraise.jpg'
  },
  {
    message: `🚀 Launch Bigger. Stand Out Bolder.\n\nFirst impressions matter — so make yours unforgettable! 🍦✨ When you're launching a new product, opening a retail location, or hosting a VIP event, WE Ice Cream Truck delivers a premium brand activation experience that gets people talking.\n\nSleek truck aesthetic, custom brand integration, high social media engagement. Your launch, elevated!\n\n📅 Elevate your next launch:\n🌐 weicecreamtruck.com\n📞 617-999-3803\n\n#LaunchParty #BrandActivation #ProductLaunch #BostonEvents #IceCreamTruck #WeIceCreamTruck #Marketing #EventMarketing #Massachusetts #GrandOpening`,
    imageUrl: 'https://weicecreamtruck.com/images/launch-parties.jpg'
  },
  {
    message: `📣 Ice Cream is the Ultimate Lead Magnet!\n\nDraw the crowds your sales team needs! 🍦💡 WE Ice Cream Truck is the centerpiece of your next marketing activation, real estate open house, or promotional tour across Massachusetts.\n\nWe attract the crowds, you work your magic. Custom-colored treats to match your brand available!\n\n📅 Attract your crowd today:\n🌐 weicecreamtruck.com\n📞 617-999-3803\n\n#MarketingEvents #BrandActivation #IceCreamTruck #WeIceCreamTruck #Massachusetts #Boston #EventMarketing #RealEstate #Promotions #MarketingStrategy`,
    imageUrl: 'https://weicecreamtruck.com/images/marketing-events.jpg'
  },
  {
    message: `🎓 Make Graduation Day Unforgettable!\n\nThey worked hard — now it's time to celebrate in style! 🍦✨ WE Ice Cream Truck is the perfect sweet surprise for graduation parties, school year-end events, and every milestone worth celebrating across Massachusetts.\n\nFrom creamy soft serve to premium artisan scoops, we bring the smiles right to your doorstep!\n\n📅 Book your graduation celebration:\n🌐 weicecreamtruck.com\n📞 617-999-3803\n\n#IceCreamTruck #GraduationParty #Massachusetts #Boston #SchoolEvents #WeIceCreamTruck #GradParty #ClassOf2025 #SummerCelebration #PremiumIceCream`,
    imageUrl: 'https://weicecreamtruck.com/images/photo-sessions.jpg'
  },
  {
    message: `💍 The Sweetest End to Your Perfect Wedding Day!\n\nImagine your guests' faces when a gorgeous, classic ice cream truck rolls up at the end of the night! 🍦✨ WE Ice Cream Truck adds a touch of whimsy and nostalgia your guests will be talking about for years.\n\nPremium artisan flavors, golden-hour lighting, custom "Just Married" signage — all included!\n\n📅 Reserve your wedding date:\n🌐 weicecreamtruck.com\n📞 617-999-3803\n\n#WeddingInspiration #BostonWeddings #MassachusettsWeddings #WeddingCatering #IceCreamTruckWedding #WeIceCreamTruck #WeddingDay #WeddingReception #SweetMemories #NewEnglandWeddings`,
    imageUrl: 'https://weicecreamtruck.com/images/sweeter-together.jpg'
  }
];

async function run() {
  // Get Page Token
  console.log('Fetching fresh Page Access Token...');
  const pagesRes = await fetch(`https://graph.facebook.com/v19.0/me/accounts?access_token=${USER_TOKEN}`);
  const pagesData = await pagesRes.json();
  const page = pagesData.data[0];
  const PAGE_TOKEN = page.access_token;
  const PAGE_ID = page.id;
  console.log(`✅ Page: "${page.name}" (ID: ${PAGE_ID})\n`);

  // Step 1: Delete old text-only posts
  console.log('--- Deleting 8 old text-only posts ---');
  for (const postId of OLD_TEXT_POST_IDS) {
    try {
      const res = await fetch(`https://graph.facebook.com/v19.0/${postId}`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ access_token: PAGE_TOKEN })
      });
      const data = await res.json();
      console.log(data.success ? `✅ Deleted ${postId}` : `⚠️  Could not delete ${postId}: ${JSON.stringify(data.error?.message)}`);
    } catch (err) {
      console.error(`❌ Error deleting ${postId}:`, err.message);
    }
    await new Promise(r => setTimeout(r, 500));
  }

  // Step 2: For each post, upload photo (unpublished) then publish to feed with photo
  console.log(`\n--- Publishing ${ALL_POSTS.length} posts WITH PHOTOS ---\n`);

  for (let i = 0; i < ALL_POSTS.length; i++) {
    const post = ALL_POSTS[i];
    console.log(`\n[${i + 1}/${ALL_POSTS.length}] Processing: ${post.imageUrl.split('/').pop()}`);

    try {
      // Upload photo silently (unpublished)
      const photoRes = await fetch(`https://graph.facebook.com/v19.0/${PAGE_ID}/photos`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          url: post.imageUrl,
          published: false,
          access_token: PAGE_TOKEN
        })
      });
      const photoData = await photoRes.json();

      if (!photoData.id) {
        console.error(`  ❌ Photo upload failed:`, JSON.stringify(photoData.error?.message));
        continue;
      }
      console.log(`  📸 Photo uploaded (ID: ${photoData.id})`);

      // Publish feed post with attached photo
      const feedRes = await fetch(`https://graph.facebook.com/v19.0/${PAGE_ID}/feed`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: post.message,
          attached_media: [{ media_fbid: photoData.id }],
          access_token: PAGE_TOKEN
        })
      });
      const feedData = await feedRes.json();

      if (feedData.id) {
        console.log(`  ✅ Post published! ID: ${feedData.id}`);
      } else {
        console.error(`  ❌ Feed post failed:`, JSON.stringify(feedData.error?.message));
      }
    } catch (err) {
      console.error(`  ❌ Error:`, err.message);
    }

    if (i < ALL_POSTS.length - 1) {
      console.log('  ⏳ Waiting 5s...');
      await new Promise(r => setTimeout(r, 5000));
    }
  }

  console.log('\n🎉 All done! Check your Facebook page now.');
}

run();
