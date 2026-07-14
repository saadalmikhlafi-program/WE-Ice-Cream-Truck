import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { NextRequest } from "next/server";

export async function POST(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const session = await getServerSession(authOptions);
  if (!session || !session.user) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await params;

  const booking = await prisma.booking.findUnique({ where: { id } });

  if (!booking) {
    return Response.json({ error: "Booking not found" }, { status: 404 });
  }

  // Ensure customer owns this booking
  if (booking.customerId !== (session.user as any).id) {
    return Response.json({ error: "Unauthorized" }, { status: 403 });
  }

  // Only PENDING bookings can be cancelled by customer
  if (booking.status !== "PENDING") {
    return Response.json({ error: "Only pending bookings can be cancelled" }, { status: 400 });
  }

  await prisma.booking.update({
    where: { id },
    data: { status: "CANCELLED" },
  });

  return Response.json({ success: true });
}
