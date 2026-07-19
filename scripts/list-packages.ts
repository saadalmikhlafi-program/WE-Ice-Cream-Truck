import * as dotenv from 'dotenv';
dotenv.config({ path: '.env.local' });
process.env.DATABASE_URL = process.env.DIRECT_URL;
import { prisma } from '../src/lib/prisma';

async function main() {
  const packages = await prisma.package.findMany({
    where: {
      OR: [
        { slug: { contains: '-van' } },
        { slug: { contains: 'custom' } }
      ]
    },
    select: { slug: true, name: true }
  });
  console.log(packages);
}
main().catch(console.error).finally(() => process.exit(0));
