
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
async function main() {
  const users = await prisma.user.findMany({ where: { role: 'ADMIN' } });
  console.log('Admins:', users.map(u => ({ email: u.email, name: u.name, id: u.id })));
}
main().finally(() => prisma.$disconnect());

