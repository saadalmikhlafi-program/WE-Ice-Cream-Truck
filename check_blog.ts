import { prisma } from './src/lib/prisma';
async function main() {
  const posts = await prisma.post.findMany({ select: { title: true, featuredImage: true, slug: true } });
  console.log(JSON.stringify(posts, null, 2));
}
main();
