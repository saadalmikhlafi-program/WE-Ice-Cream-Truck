import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { prisma } from "@/lib/prisma";

/**
 * POST /api/setup/owner
 * Creates or resets the primary owner account.
 * Protected by a setup secret to prevent unauthorized use.
 */
export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { setupSecret } = body;

    // Verify setup secret
    const expectedSecret = process.env.SETUP_SECRET || "WE-SETUP-2026";
    if (setupSecret !== expectedSecret) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const email = "info@weicecreamtruck.com";
    const password = "WE#2026";
    const name = "WE Ice Cream Truck";
    const role = "ADMIN";
    const permissions = JSON.stringify(["*"]);

    const passwordHash = await bcrypt.hash(password, 12);

    const existing = await prisma.user.findUnique({ where: { email } });

    if (existing) {
      await prisma.user.update({
        where: { email },
        data: { passwordHash, role, name, permissions, active: true },
      });
      return NextResponse.json({ success: true, message: "Owner account updated", email });
    } else {
      await prisma.user.create({
        data: { email, passwordHash, name, role, permissions, active: true },
      });
      return NextResponse.json({ success: true, message: "Owner account created", email });
    }
  } catch (error) {
    console.error("[SETUP_OWNER] Error:", error);
    return NextResponse.json({ error: "Failed to create owner account", details: String(error) }, { status: 500 });
  }
}
