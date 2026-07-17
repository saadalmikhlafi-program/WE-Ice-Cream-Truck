/**
 * Blog Seeder — WE Ice Cream Truck
 * Run: node scripts/seed-we-blogs.mjs
 */

// Load .env.local BEFORE any imports that need env vars
import { createRequire } from "module";
const require = createRequire(import.meta.url);
const dotenv = require("dotenv");
const path = require("path");
const { fileURLToPath } = require("url");

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.resolve(__dirname, "../.env.local") });

const { PrismaClient } = require("@prisma/client");
const { Pool } = require("pg");
const { PrismaPg } = require("@prisma/adapter-pg");

const connectionString = process.env.DIRECT_URL || process.env.DATABASE_URL;
if (!connectionString) {
  console.error("❌ No DATABASE_URL or DIRECT_URL found in .env.local");
  process.exit(1);
}

const pool = new Pool({
  connectionString,
  max: 1,
  idleTimeoutMillis: 10000,
  connectionTimeoutMillis: 15000,
  allowExitOnIdle: true,
  ssl: { rejectUnauthorized: false },
});

const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });


const EVENTS = [
  // ─── Birthday Parties ─────────────────────────────────────────────────────
  {
    title: "Bringing Joy to Emily's 7th Birthday",
    excerpt: "See how our premium ice cream truck made this sunny backyard birthday party an unforgettable experience for kids and parents alike.",
    content: `<h2>A Sweet Celebration in Boston</h2>
<p>When Emily's parents reached out to WE Ice Cream Truck for her 7th birthday, they wanted something truly special. Our premium truck pulled up right as the kids were finishing their backyard games—and the reaction was electric.</p>
<p>The joy on their faces was priceless as we served everything from classic cones to gourmet sundaes topped with rainbow sprinkles and fresh strawberries. Parents loved how hassle-free it was—no melting cakes, no messy kitchen, just pure, unforgettable joy.</p>
<h2>Why Ice Cream Beats Every Other Birthday Treat</h2>
<p>Every child is different, but one thing is universal: they all love ice cream! Our truck offers dozens of customizable options so every kid gets exactly what they want. From dairy-free sorbet to classic soft serve, we have something for every taste and dietary need.</p>
<blockquote><em>"WE Ice Cream Truck made Emily's birthday the talk of the neighborhood. Every parent asked for the number!" — Sarah M.</em></blockquote>
<p>Ready to make your child's birthday legendary? <a href="/book">Book your event today</a>.</p>`,
    category: "birthday-parties",
    categoryName: "Birthday Parties",
    author: "Sarah M.",
    date: "2026-08-12",
  },
  {
    title: "60 Kids, One Truck, Zero Stress: Jake's Birthday Win",
    excerpt: "Jake's mom planned the ultimate outdoor birthday bash with 60 kids — and WE Ice Cream Truck handled dessert effortlessly.",
    content: `<h2>When the Guest List Grows</h2>
<p>Jake's 10th birthday started as a small family cookout and somehow turned into the block party of the summer. With 60 kids running around Brookline Park, his mom needed a dessert solution that could scale. That's where we came in.</p>
<p>Our truck arrived 15 minutes early, set up quietly, and when the time came, served every single child in under 30 minutes. Soft serve, dipped cones, ice cream sandwiches — we had it all covered.</p>
<h2>Planning Tips for Large Birthday Parties</h2>
<p>For groups over 30, we recommend booking 4–6 weeks in advance and selecting a package with our "extended service" add-on. This ensures every guest gets their sweet treat without a long wait.</p>
<blockquote><em>"I was worried about feeding 60 kids, but WE Ice Cream made it the smoothest part of the whole day!" — Michelle R.</em></blockquote>`,
    category: "birthday-parties",
    categoryName: "Birthday Parties",
    author: "Michelle R.",
    date: "2026-07-25",
  },
  {
    title: "Surprise! A Birthday They'll Never Forget",
    excerpt: "How a surprise ice cream truck arrival turned a simple backyard gathering into a legendary birthday moment in Cambridge.",
    content: `<h2>The Best Surprise Has Wheels</h2>
<p>Mia's parents had a plan: get her into the backyard under the pretense of a family BBQ, then have the WE Ice Cream Truck roll in with music playing. What happened next was pure magic.</p>
<p>Mia screamed with delight. Her friends scrambled to line up. The parents laughed and grabbed cones themselves. For an hour, the whole neighborhood felt like one big celebration.</p>
<h2>How We Handle Surprise Events</h2>
<p>Our team coordinates silently with the event host via text to time our arrival perfectly. We park discreetly, get the signal, and make a grand entrance. It never gets old.</p>`,
    category: "birthday-parties",
    categoryName: "Birthday Parties",
    author: "WE Ice Cream Team",
    date: "2026-07-10",
  },
  {
    title: "Twins Double the Fun at Their Birthday Party in Newton",
    excerpt: "Double the birthday, double the ice cream! See how we served 80 guests for twins Lily and Luna's milestone celebration.",
    content: `<h2>Two Birthdays, One Epic Party</h2>
<p>Lily and Luna turned 8 on the same day — obviously — and their parents decided to combine the celebrations into one massive Newton backyard party with 80 guests. Choosing WE Ice Cream Truck was, they said, "the easiest decision we made."</p>
<p>We brought our extended menu including custom birthday sundaes in the twins' favorite flavors: strawberry for Lily, mint chocolate chip for Luna. Every guest left with a smile and a sticky hand.</p>`,
    category: "birthday-parties",
    categoryName: "Birthday Parties",
    author: "WE Ice Cream Team",
    date: "2026-06-28",
  },
  // ─── Corporate Events ──────────────────────────────────────────────────────
  {
    title: "A Sweet Touch at the Boston Tech Summit",
    excerpt: "Corporate events don't have to be boring. We served over 500 gourmet cones to executives, bringing a refreshing break to the Boston Tech Summit.",
    content: `<h2>Innovation Tastes Sweeter with Ice Cream</h2>
<p>The Boston Tech Summit brings together the brightest minds in the industry. This year's organizers wanted something different for the afternoon networking break — something that would get people talking and moving away from their laptops.</p>
<p>WE Ice Cream Truck arrived early, positioned strategically in the courtyard, and when the break bell rang, 500 attendees flooded out. The line formed naturally, conversations sparked, and business cards were exchanged — all over ice cream cones.</p>
<h2>What Corporate Clients Love About Us</h2>
<p>We operate silently, clean up completely, and work within your event's schedule. Need branded cups? Custom flavors matching your company colors? We can do that too. Our corporate packages include full-service setup, staff, and cleanup.</p>
<blockquote><em>"It was the highlight of the summit. People talked about it for days." — David L., Event Coordinator</em></blockquote>`,
    category: "corporate-events",
    categoryName: "Corporate Events",
    author: "David L.",
    date: "2026-09-05",
  },
  {
    title: "Employee Appreciation Day Done Right in Cambridge",
    excerpt: "How a Cambridge biotech firm used WE Ice Cream Truck to celebrate 200 employees on a record-breaking quarter.",
    content: `<h2>Rewarding Your Team the Sweet Way</h2>
<p>After a record-breaking quarter, Helix Biotech's leadership wanted to show genuine appreciation for their 200-person team. Instead of the usual catered lunch, they went with something unexpected: an ice cream truck in the parking lot on a sunny Friday afternoon.</p>
<p>The energy was incredible. Engineers, scientists, and executives all stood in line together, laughing and chatting in a way that doesn't happen in conference rooms. It was exactly the morale boost the company needed heading into Q4.</p>
<h2>Team Building Through Simple Joy</h2>
<p>There's something about ice cream that dissolves hierarchy. We've seen CEOs and interns bond over soft serve in ways that no team-building exercise could replicate. Book WE Ice Cream Truck for your next employee appreciation event and watch the magic happen.</p>`,
    category: "corporate-events",
    categoryName: "Corporate Events",
    author: "WE Ice Cream Team",
    date: "2026-08-30",
  },
  {
    title: "Grand Opening in Somerville: A Flavor-Filled Launch",
    excerpt: "A Somerville startup's grand opening became a neighborhood celebration with our ice cream truck parked right at the door.",
    content: `<h2>Make Your Launch Memorable</h2>
<p>Opening a new business is stressful. Making it fun is the secret weapon. Vertex Creative Studio's founders invited neighbors, clients, and media to their Somerville launch and wanted an attraction that would draw foot traffic from the street. The answer? A WE Ice Cream Truck parked right at the entrance.</p>
<p>Passersby stopped out of curiosity, tried the ice cream, and ended up learning about the new studio. It was organic marketing at its sweetest. The event trended locally on social media within an hour.</p>`,
    category: "corporate-events",
    categoryName: "Corporate Events",
    author: "WE Ice Cream Team",
    date: "2026-08-15",
  },
  {
    title: "Product Launch Party at the Boston Seaport",
    excerpt: "Tech giant Aura Labs chose WE Ice Cream Truck as the centerpiece dessert experience for their flagship product reveal.",
    content: `<h2>A Launch Worth Savoring</h2>
<p>Aura Labs' product launch at the Boston Seaport district was a high-stakes, high-profile affair. 300 press, partners, and VIP guests gathered to witness the unveiling of their new platform. For the post-reveal reception, they wanted something that felt premium yet approachable — ice cream fit perfectly.</p>
<p>We served single-scoop gourmet cones with branded napkins in Aura's signature teal color. Press coverage mentioned the "unexpected, delightful" dessert experience in reviews alongside the product itself. That's the WE Ice Cream effect.</p>`,
    category: "corporate-events",
    categoryName: "Corporate Events",
    author: "WE Ice Cream Team",
    date: "2026-07-20",
  },
  {
    title: "End-of-Year Company Picnic in Milton",
    excerpt: "250 employees and their families enjoyed a summer picnic elevated by WE Ice Cream Truck's full-service dessert experience.",
    content: `<h2>Making the Annual Picnic Feel Premium</h2>
<p>Meridian Financial's annual summer picnic in Milton had grown to 250 employees and their families over the years. The HR team wanted to step it up this year and booked WE Ice Cream Truck for the full afternoon. We served 3 continuous hours of ice cream with zero wait times, thanks to our efficient dual-window setup.</p>
<p>Kids played, adults relaxed, and everyone came back for seconds. HR received more positive feedback for this year's picnic than any previous year.</p>`,
    category: "corporate-events",
    categoryName: "Corporate Events",
    author: "WE Ice Cream Team",
    date: "2026-07-05",
  },
  // ─── Weddings ──────────────────────────────────────────────────────────────
  {
    title: "Love and Ice Cream: A Perfect Match",
    excerpt: "Why settle for a traditional cake when you can have a vintage-modern ice cream truck at your wedding reception?",
    content: `<h2>A Wedding Dessert That Steals the Show</h2>
<p>When Mark and Sarah first visited our truck at a friend's party, they looked at each other and said, "This is going to be at our wedding." And it was.</p>
<p>Their outdoor summer wedding in Quincy was picture-perfect. String lights, a live band, wildflowers everywhere — and WE Ice Cream Truck parked elegantly at the edge of the reception garden. Guests lined up twice. Some three times.</p>
<h2>Why Couples Choose Ice Cream Over Cake</h2>
<p>Wedding cake is beautiful, but it's also stressful — cutting schedules, serving logistics, the risk of it sitting in the heat. Our truck eliminates all of that. We arrive, serve, and delight, all on your schedule. You focus on each other.</p>
<blockquote><em>"We cut the cake but the ice cream truck was what everyone remembers." — Jessica & Mark T.</em></blockquote>`,
    category: "weddings",
    categoryName: "Weddings",
    author: "Jessica T.",
    date: "2026-09-18",
  },
  {
    title: "An Autumn Wedding in Salem with a Sweet Twist",
    excerpt: "Fall foliage, historic Salem, and WE Ice Cream Truck — the perfect trio for an unforgettable New England wedding.",
    content: `<h2>Ice Cream in October? Absolutely.</h2>
<p>When you're getting married in Salem in October, you lean into the New England atmosphere. Olivia and James embraced it completely — rustic venue, pumpkin floral arrangements, and warm apple cider as the welcome drink. For dessert, they chose WE Ice Cream Truck serving pumpkin spice soft serve alongside classic fall flavors.</p>
<p>Guests were charmed by the unexpected pairing. The truck's vintage aesthetic fit the Salem backdrop perfectly, and the photos were stunning. Some of the best wedding photos we've ever been a part of.</p>`,
    category: "weddings",
    categoryName: "Weddings",
    author: "WE Ice Cream Team",
    date: "2026-10-05",
  },
  {
    title: "Beachside Bliss: A Revere Beach Wedding Reception",
    excerpt: "Sun, sea, and ice cream — the ultimate summer wedding combination at one of Massachusetts' most iconic beaches.",
    content: `<h2>Summer Weddings Need Summer Treats</h2>
<p>Carlos and Sofia chose Revere Beach for their summer wedding reception — which meant 90-degree heat, a beautiful ocean backdrop, and 120 guests who were absolutely thrilled when WE Ice Cream Truck pulled up at cocktail hour.</p>
<p>We served a custom menu of tropical flavors: coconut sorbet, mango soft serve, and piña colada dipped cones. It was the perfect complement to the beach setting, and guests who were wilting in the heat immediately revived with their first lick.</p>`,
    category: "weddings",
    categoryName: "Weddings",
    author: "WE Ice Cream Team",
    date: "2026-08-20",
  },
  {
    title: "Backyard Wedding in Brookline: Intimate and Delicious",
    excerpt: "An intimate 40-person backyard wedding in Brookline chose WE Ice Cream Truck over a traditional caterer for their dessert.",
    content: `<h2>Small Weddings, Big Memories</h2>
<p>Not every wedding needs a ballroom. Emma and Chris chose a 40-person gathering in her parents' Brookline backyard — twinkling lights, a string quartet, catered dinner, and for dessert, us.</p>
<p>The intimate setting made the truck feel extra special. Guests gathered around it like a community well, sharing stories and laughter between scoops. Chris told us it was the most "them" thing about the whole wedding. We couldn't have been more honored.</p>`,
    category: "weddings",
    categoryName: "Weddings",
    author: "WE Ice Cream Team",
    date: "2026-07-18",
  },
  // ─── More variety ──────────────────────────────────────────────────────────
  {
    title: "School Field Day in Lynn: Keeping 300 Kids Cool",
    excerpt: "Lincoln Elementary's annual field day was elevated with WE Ice Cream Truck serving 300 students on the hottest day of the summer.",
    content: `<h2>The Heroes of Field Day</h2>
<p>When the temperature hit 94°F on Lincoln Elementary's field day, the school's PTA made the best call of the year: emergency booking WE Ice Cream Truck. We showed up with 30 minutes' notice and served every one of the 300 students and their teachers before the end of the school day.</p>
<p>The teachers were as grateful as the kids. There's something about seeing a child's face light up over a cone on a hot summer day that never gets old — for us or for anyone watching.</p>`,
    category: "birthday-parties",
    categoryName: "Birthday Parties",
    author: "WE Ice Cream Team",
    date: "2026-06-20",
  },
  {
    title: "Quincy Community Festival: Serving 1,000 Smiles",
    excerpt: "WE Ice Cream Truck was the most popular stop at the Quincy Summer Community Festival — and we served every single person.",
    content: `<h2>Community Events Are Our Favorite Stage</h2>
<p>The Quincy Summer Community Festival draws thousands every July, and this year we were invited to set up as a featured vendor. From 11am to 7pm, we served continuously — families, seniors, college students, and everyone in between.</p>
<p>By 4pm, we'd created over 1,000 individual smiles. By the end of the night, the festival organizers had already asked us back for next year. That's the kind of review that means everything to us.</p>`,
    category: "corporate-events",
    categoryName: "Corporate Events",
    author: "WE Ice Cream Team",
    date: "2026-07-12",
  },
  {
    title: "Graduation Party in Newton: Celebrating the Class of 2026",
    excerpt: "A Newton family celebrated their daughter's high school graduation with a backyard party and WE Ice Cream Truck as the star attraction.",
    content: `<h2>Graduating Deserves the Sweetest Celebration</h2>
<p>Four years of hard work, late nights, and big dreams — all culminating in a diploma and a backyard party in Newton. Priya's family wanted her graduation to feel epic. Sixty guests, a catered spread, and WE Ice Cream Truck for dessert.</p>
<p>Priya's favorite flavor is pistachio. We made sure we had plenty. When she came outside and saw the truck waiting, she forgot all the cameras and just ran toward us. That reaction is why we do this.</p>`,
    category: "birthday-parties",
    categoryName: "Birthday Parties",
    author: "WE Ice Cream Team",
    date: "2026-06-15",
  },
  {
    title: "Real Estate Open House in Brookline Gets a Sweet Upgrade",
    excerpt: "A luxury property broker used WE Ice Cream Truck to attract buyers to their Brookline open house — and it worked perfectly.",
    content: `<h2>Making Your Open House Unforgettable</h2>
<p>Real estate is competitive. Getting buyers to attend open houses — and to remember yours — requires creativity. One Brookline luxury broker discovered that parking WE Ice Cream Truck outside the property brought foot traffic that no sign or digital ad could match.</p>
<p>Neighbors came to try the ice cream and ended up touring the house. Serious buyers who had planned to "just drive by" came in for a cone and stayed for 45 minutes. Two offers came in by evening.</p>`,
    category: "corporate-events",
    categoryName: "Corporate Events",
    author: "WE Ice Cream Team",
    date: "2026-05-30",
  },
  {
    title: "Nonprofit Fundraiser in Somerville: Sweet Giving",
    excerpt: "The Somerville Community Fund raised over $15,000 at their summer gala, with WE Ice Cream Truck adding a joyful, memorable touch.",
    content: `<h2>Giving Back Tastes Better with Ice Cream</h2>
<p>The Somerville Community Fund's annual summer gala is one of the most beloved fundraising events in the city. This year, the organizing committee invited WE Ice Cream Truck to contribute to the festive atmosphere — and we were honored to participate.</p>
<p>Guests donated generously and lined up enthusiastically. The ice cream became a talking point throughout the evening, and the fund's social media posts featuring our truck were their most shared content of the year.</p>`,
    category: "corporate-events",
    categoryName: "Corporate Events",
    author: "WE Ice Cream Team",
    date: "2026-08-08",
  },
  {
    title: "Anniversary Surprise in Cambridge: 25 Years of Sweetness",
    excerpt: "A family surprised their parents with a 25th anniversary garden party featuring WE Ice Cream Truck for dessert.",
    content: `<h2>25 Years Together Deserves Something Special</h2>
<p>Marcus and Diane have been married 25 years. Their three adult children secretly coordinated a surprise garden party in Cambridge with 40 close friends and family. When Marcus and Diane arrived, they found a decorated backyard — and our truck waiting to serve everyone their favorite flavors.</p>
<p>Diane cried. Marcus immediately got in line for a cone. We call that a success.</p>`,
    category: "weddings",
    categoryName: "Weddings",
    author: "WE Ice Cream Team",
    date: "2026-07-30",
  },
  {
    title: "Little League Champions Celebration in Revere",
    excerpt: "Revere's youth baseball champions got the ultimate victory party: a backyard cookout with WE Ice Cream Truck as the MVP.",
    content: `<h2>Champions Deserve the Best</h2>
<p>After a dominant season and a championship win, the Revere Thunder Little League team was ready to celebrate. Fifteen kids, their families, coaches, and the entire neighborhood showed up for the victory party. And at the center of it all was our truck.</p>
<p>We served custom "trophy cone" sundaes with gold sprinkles for the kids and classic cones for everyone else. Coach Danny said it was the "best victory party in 10 years of coaching." We'll take that trophy anytime.</p>`,
    category: "birthday-parties",
    categoryName: "Birthday Parties",
    author: "WE Ice Cream Team",
    date: "2026-07-22",
  },
  {
    title: "Summer Camp Sendoff in Milton: Making Goodbyes Sweeter",
    excerpt: "A Milton family's summer camp sendoff tradition: WE Ice Cream Truck the night before departure.",
    content: `<h2>A Sweet Tradition Before the Big Adventure</h2>
<p>The Patersons started a tradition two summers ago: the night before their kids head to summer camp, the whole extended family gathers and WE Ice Cream Truck shows up for a sendoff celebration. This year marked their third year in a row.</p>
<p>Grandma now looks forward to it more than the kids do. Last summer she had three cones and we weren't going to be the ones to say anything about it.</p>`,
    category: "birthday-parties",
    categoryName: "Birthday Parties",
    author: "WE Ice Cream Team",
    date: "2026-06-25",
  },
  {
    title: "Retirement Party in Salem: Sweet Endings, New Beginnings",
    excerpt: "After 35 years, Dr. Helen Park's colleagues surprised her with a retirement party featuring WE Ice Cream Truck.",
    content: `<h2>Retiring Deserves a Standing Ovation — and Ice Cream</h2>
<p>Thirty-five years as a beloved pediatrician at Salem Medical Center. Dr. Helen Park had dedicated her career to caring for children — so it was only fitting that her retirement party included one of the most child-like joys of all: an ice cream truck.</p>
<p>Her colleagues organized the surprise lunch in the hospital courtyard, and when the WE Ice Cream Truck rolled in, Dr. Park laughed until she cried. "I've never had a line for ice cream at work before," she said. "I should have retired years ago."</p>`,
    category: "corporate-events",
    categoryName: "Corporate Events",
    author: "WE Ice Cream Team",
    date: "2026-09-01",
  },
  {
    title: "Baby Shower in Newton: Sugar, Spice, and Soft Serve",
    excerpt: "A Newton baby shower with 45 guests chose WE Ice Cream Truck as the centerpiece dessert experience.",
    content: `<h2>The Sweetest Way to Welcome a New Life</h2>
<p>Sophie's baby shower in Newton had a beautiful garden party theme — pastel balloons, a gorgeous floral spread, and WE Ice Cream Truck parked on the lawn. 45 guests were treated to a rotating menu of soft serve, sundaes, and our specialty baby shower special: strawberry sorbet with pink sugar crystals.</p>
<p>Every photo from the shower had the truck in the background. The mom-to-be said it was "the most Instagram-worthy baby shower she'd ever attended." We made sure to be worthy of that claim.</p>`,
    category: "birthday-parties",
    categoryName: "Birthday Parties",
    author: "WE Ice Cream Team",
    date: "2026-08-03",
  },
  {
    title: "Block Party in Lynn: The Whole Street Showed Up",
    excerpt: "WE Ice Cream Truck was the centerpiece of an epic Lynn neighborhood block party that brought the whole street together.",
    content: `<h2>Community Starts With Good Ice Cream</h2>
<p>The Elmwood Street block party has been a Lynn tradition for 20 years. But this year was different — because this year they invited WE Ice Cream Truck. By the time we arrived, nearly every household on the street was represented. Kids ran. Adults laughed. Elderly neighbors who hadn't been outside in weeks made the trip for a cone.</p>
<p>The organizer, Mrs. Thompson, told us afterward: "This was the most attended block party in 20 years. The truck is coming back next summer." We've already marked the date.</p>`,
    category: "corporate-events",
    categoryName: "Corporate Events",
    author: "WE Ice Cream Team",
    date: "2026-08-26",
  },
  {
    title: "Vow Renewal in Quincy: Love, Redefined and Re-sweetened",
    excerpt: "After 20 years of marriage, one Quincy couple renewed their vows and celebrated with WE Ice Cream Truck among 60 family members.",
    content: `<h2>Love Worth Celebrating Twice</h2>
<p>Twenty years, three kids, four cities, and one constant: their love for ice cream. Paul and Linda chose WE Ice Cream Truck for their vow renewal celebration in Quincy, and the symbolism wasn't lost on anyone. "Ice cream was our first date," Paul told us. "It had to be here."</p>
<p>We served 60 family members and created a custom sundae called "The 20-Year Special" — two scoops, two toppings, one perfect combination. Just like them.</p>`,
    category: "weddings",
    categoryName: "Weddings",
    author: "WE Ice Cream Team",
    date: "2026-09-12",
  },
  {
    title: "Church Picnic in Cambridge: Community, Faith, and Ice Cream",
    excerpt: "Emmanuel Community Church's annual summer picnic in Cambridge drew 150 members — and WE Ice Cream Truck served every one.",
    content: `<h2>Serving the Community We Love</h2>
<p>Emmanuel Community Church has served Cambridge for over 60 years. Their summer picnic is a cornerstone of the community calendar — a time for fellowship, food, and fun. This year, the church chose WE Ice Cream Truck to bring something special to the dessert table.</p>
<p>150 members of all ages lined up eagerly. We served 3 solid hours of ice cream, fielded lots of recipe questions, and received a heartfelt prayer of thanks from the pastor at the end. It was one of our most meaningful events of the season.</p>`,
    category: "corporate-events",
    categoryName: "Corporate Events",
    author: "WE Ice Cream Team",
    date: "2026-08-17",
  },
  {
    title: "Housewarming Party in Brookline: New Home, Sweet Start",
    excerpt: "A Brookline couple kicked off life in their new home with a housewarming gathering and WE Ice Cream Truck for dessert.",
    content: `<h2>Your New Home Deserves a Sweet Beginning</h2>
<p>Moving into a new home is one of life's great milestones. Alex and Jordan wanted to celebrate their Brookline housewarming with something fun and memorable for their 50 guests. When the first friends arrived and saw the WE Ice Cream Truck parked out front, the tone for the whole evening was set: this party was going to be different.</p>
<p>Everyone from the new neighbors to college friends bonded over ice cream in the driveway. They already have our number saved for their first anniversary party.</p>`,
    category: "birthday-parties",
    categoryName: "Birthday Parties",
    author: "WE Ice Cream Team",
    date: "2026-05-22",
  },
];

async function main() {
  console.log("🗑️  Clearing old blog posts and categories...");
  await prisma.post.deleteMany();
  await prisma.category.deleteMany();

  console.log("📁 Creating categories...");
  const categories = {};
  const categoryDefs = [
    { name: "Birthday Parties", slug: "birthday-parties" },
    { name: "Corporate Events", slug: "corporate-events" },
    { name: "Weddings", slug: "weddings" },
  ];
  for (const cat of categoryDefs) {
    const created = await prisma.category.create({ data: cat });
    categories[cat.slug] = created.id;
  }

  console.log(`✍️  Creating ${EVENTS.length} blog posts...`);

  const images = [
    "/images/blog/celebration-pack.jpg",
    "/images/blog/family-event.jpg",
    "/images/blog/gold-event.jpg",
    "/images/blog/photo_2026-05-31_21-55-12.jpg",
    "/images/blog/signature-event.jpg",
    "/images/blog/silver-event.jpg",
    "/images/blog/starter-event.jpg",
    "/images/blog/van-big-smile-package .jpg",
    "/images/blog/van-celebration-pack.jpg",
    "/images/blog/van-family-event.jpg",
    "/images/blog/van-school-festival-special.jpg",
    "/images/blog/van-silver-special.jpg"
  ];

  for (let i = 0; i < EVENTS.length; i++) {
    const ev = EVENTS[i];
    const slug = ev.title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)+/g, "");
    
    // Pick image somewhat sequentially so we don't have all the same
    const imgUrl = images[i % images.length];

    await prisma.post.create({
      data: {
        title: ev.title,
        slug,
        content: ev.content,
        excerpt: ev.excerpt,
        featuredImage: imgUrl,
        seoTitle: `${ev.title} | WE Ice Cream Truck Boston`,
        seoDesc: ev.excerpt,
        status: "PUBLISHED",
        categoryId: categories[ev.category],
        publishedAt: new Date(ev.date),
        createdAt: new Date(ev.date),
      },
    });
  }

  console.log(`✅  Done! Created ${EVENTS.length} blog posts.`);
}

main()
  .catch((e) => { console.error(e); process.exit(1); })
  .finally(async () => { await prisma.$disconnect(); });
