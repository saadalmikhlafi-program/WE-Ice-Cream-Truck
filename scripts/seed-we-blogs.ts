import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const WE_TEXTS = [
  {
    title: "Bringing Joy to Emily's 7th Birthday",
    category: "Birthday Parties",
    author: "Sarah M.",
    summary: "See how our premium ice cream truck made this sunny backyard birthday party an unforgettable experience for kids and parents alike.",
    content: "When Emily's parents reached out to WE Ice Cream Truck for her 7th birthday, they wanted something special. Our premium truck pulled up right as the kids were finishing their backyard games. The joy on their faces was priceless as we served everything from classic cones to gourmet sundaes. The parents loved how hassle-free it was—no melting cakes, no messy kitchen, just pure joy!"
  },
  {
    title: "A Sweet Touch at the Tech Summit",
    category: "Corporate Events",
    author: "David L.",
    summary: "Corporate events don't have to be boring. We served over 500 gourmet cones to executives, bringing a refreshing break to the Boston Tech Summit.",
    content: "The Boston Tech Summit brings together the brightest minds in the industry, and this year, they wanted to offer something different during the afternoon break. WE Ice Cream Truck arrived to serve over 500 attendees. It was a massive hit—executives networking over ice cream cones created a relaxed, engaging atmosphere that traditional coffee breaks just can't match."
  },
  {
    title: "Love and Ice Cream: A Perfect Match",
    category: "Weddings",
    author: "Jessica T.",
    summary: "Why settle for a traditional cake when you can have a vintage-modern ice cream truck at your wedding reception? A beautiful evening in Massachusetts.",
    content: "For their outdoor summer wedding, Mark and Sarah wanted to ditch the traditional wedding cake for something fun and memorable. WE Ice Cream Truck served as the perfect dessert station. Guests loved the nostalgia of getting a fresh scoop from the window under the string lights. It added a magical, sweet touch to a beautiful evening."
  }
];

function generateSlug(title) {
  return title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');
}

async function main() {
  console.log("Clearing old blog posts...");
  await prisma.post.deleteMany();

  console.log("Generating 30 new blog posts for WE Ice Cream Truck...");
  let count = 0;
  
  // Base 3
  for (const template of WE_TEXTS) {
    await prisma.post.create({
      data: {
        title: template.title,
        slug: generateSlug(template.title),
        summary: template.summary,
        content: `<p>${template.content}</p>`,
        author: template.author,
        published: true,
        tags: ["Ice Cream", template.category, "Boston", "Events"],
        imageUrl: "https://ice-cream-truck-jet.vercel.app/images/we-icecream.jpg",
        createdAt: new Date(`2026-08-12T10:00:00Z`),
        updatedAt: new Date(`2026-08-12T10:00:00Z`),
      }
    });
    count++;
  }

  // Generate 27 more based on the themes to reach 30
  const towns = ["Boston", "Cambridge", "Somerville", "Newton", "Brookline", "Revere", "Lynn", "Salem", "Quincy", "Milton"];
  
  for (let i = 1; i <= 27; i++) {
    const template = WE_TEXTS[i % 3];
    const town = towns[i % towns.length];
    const title = `${template.title.split(":")[0]} in ${town} - Volume ${i}`;
    
    await prisma.post.create({
      data: {
        title: title,
        slug: generateSlug(title),
        summary: `Another successful ${template.category.toLowerCase()} event in ${town}. ${template.summary}`,
        content: `<p>We recently took the WE Ice Cream Truck to ${town} for an incredible event.</p><p>${template.content}</p><p>Book us for your next event in ${town}!</p>`,
        author: template.author,
        published: true,
        tags: ["Ice Cream", template.category, town],
        imageUrl: "https://ice-cream-truck-jet.vercel.app/images/we-icecream.jpg",
        createdAt: new Date(Date.now() - i * 86400000), // past dates
      }
    });
    count++;
  }

  console.log(`Successfully generated ${count} blog posts!`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
