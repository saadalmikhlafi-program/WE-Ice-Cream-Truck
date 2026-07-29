/**
 * Script to create or update the owner/admin account.
 * Run with: npx ts-node --skip-project scripts/create-owner.ts
 * Or via Vercel env: this is run once during setup.
 */
import bcrypt from "bcryptjs";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  const email = "info@weicecreamtruck.com";
  const password = "WE#2026";
  const name = "WE Ice Cream Truck";
  const role = "ADMIN";
  const permissions = JSON.stringify(["*"]); // Full permissions

  const passwordHash = await bcrypt.hash(password, 12);

  const existing = await prisma.user.findUnique({ where: { email } });

  if (existing) {
    await prisma.user.update({
      where: { email },
      data: { passwordHash, role, name, permissions, active: true },
    });
    console.log(`✅ Owner account updated: ${email}`);
  } else {
    await prisma.user.create({
      data: {
        email,
        passwordHash,
        name,
        role,
        permissions,
        active: true,
      },
    });
    console.log(`✅ Owner account created: ${email}`);
  }
}

main()
  .catch((e) => {
    console.error("❌ Error:", e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
