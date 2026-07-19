import { prisma } from "../src/lib/prisma";

async function main() {
  const birthdayPost = await prisma.post.findFirst({
    where: { title: { contains: "Birthday" } }
  });

  const sportsPost = await prisma.post.findFirst({
    where: { title: { contains: "Sporting Events" } }
  });

  if (birthdayPost) {
    await prisma.post.update({
      where: { id: birthdayPost.id },
      data: { publishedAt: new Date() }
    });
    console.log("Updated Birthday post publishedAt to now()");
  }

  if (sportsPost) {
    const oldDate = new Date();
    oldDate.setFullYear(oldDate.getFullYear() - 5);
    await prisma.post.update({
      where: { id: sportsPost.id },
      data: { publishedAt: oldDate }
    });
    console.log("Updated Sporting Events post to older date");
  }
}

main().catch(e => { console.error(e); process.exit(1); }).finally(async () => { await prisma.$disconnect(); });
