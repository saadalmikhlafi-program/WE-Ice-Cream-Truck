import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { getOAuth2Client } from "@/lib/google-calendar";

export async function GET() {
  const session = await getServerSession(authOptions);
  if (!session || !["ADMIN", "OWNER"].includes((session.user as any)?.role)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const client = getOAuth2Client();

  const url = client.generateAuthUrl({
    access_type: "offline",
    scope: ["https://www.googleapis.com/auth/calendar"],
    prompt: "consent", // Force re-consent to always get refresh_token
  });

  return NextResponse.redirect(url);
}
