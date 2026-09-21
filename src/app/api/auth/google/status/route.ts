import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

// GET: Check if Google Calendar is connected
export async function GET() {
  const session = await getServerSession(authOptions);
  if (!session || !["ADMIN", "OWNER"].includes((session.user as any)?.role)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const token = await prisma.setting.findUnique({
    where: { key: "google_calendar_refresh_token" },
  });

  return NextResponse.json({ connected: !!token?.value });
}

// DELETE: Disconnect Google Calendar
export async function DELETE() {
  const session = await getServerSession(authOptions);
  if (!session || !["ADMIN", "OWNER"].includes((session.user as any)?.role)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  await prisma.setting.deleteMany({
    where: {
      key: {
        in: [
          "google_calendar_refresh_token",
          "google_calendar_access_token",
          "google_calendar_token_expiry",
        ],
      },
    },
  });

  return NextResponse.json({ success: true, message: "Google Calendar disconnected" });
}
