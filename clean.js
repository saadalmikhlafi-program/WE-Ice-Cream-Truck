const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  const result = await prisma.booking.deleteMany({
    where: { bookingNumber: { startsWith: 'TEST-' } }
  });
  console.log('Deleted', result.count, 'bookings');
}

main().finally(() => prisma.$disconnect());
