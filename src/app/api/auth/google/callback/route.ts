import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { getOAuth2Client } from "@/lib/google-calendar";
import { prisma } from "@/lib/prisma";

export async function GET(request: Request) {
  const session = await getServerSession(authOptions);
  if (!session || !["ADMIN", "OWNER"].includes((session.user as any)?.role)) {
    return NextResponse.redirect(new URL("/admin/settings?error=unauthorized", request.url));
  }

  const { searchParams } = new URL(request.url);
  const code = searchParams.get("code");
  const error = searchParams.get("error");

  if (error) {
    console.error("Google OAuth error:", error);
    return NextResponse.redirect(new URL("/admin/settings?tab=integrations&error=google_denied", request.url));
  }

  if (!code) {
    return NextResponse.redirect(new URL("/admin/settings?tab=integrations&error=no_code", request.url));
  }

  try {
    const client = getOAuth2Client();
    const { tokens } = await client.getToken(code);

    if (!tokens.refresh_token) {
      // This happens if the user already connected before — revoke and retry
      return NextResponse.redirect(
        new URL("/admin/settings?tab=integrations&error=no_refresh_token&hint=revoke_and_retry", request.url)
      );
    }

    // Save tokens in the database settings
    await prisma.setting.upsert({
      where: { key: "google_calendar_refresh_token" },
      update: { value: tokens.refresh_token },
      create: { key: "google_calendar_refresh_token", value: tokens.refresh_token },
    });

    if (tokens.access_token) {
      await prisma.setting.upsert({
        where: { key: "google_calendar_access_token" },
        update: { value: tokens.access_token },
        create: { key: "google_calendar_access_token", value: tokens.access_token },
      });
    }

    if (tokens.expiry_date) {
      await prisma.setting.upsert({
        where: { key: "google_calendar_token_expiry" },
        update: { value: String(tokens.expiry_date) },
        create: { key: "google_calendar_token_expiry", value: String(tokens.expiry_date) },
      });
    }

    return NextResponse.redirect(new URL("/admin/settings?tab=integrations&success=google_connected", request.url));
  } catch (err) {
    console.error("Google OAuth callback error:", err);
    return NextResponse.redirect(new URL("/admin/settings?tab=integrations&error=token_exchange_failed", request.url));
  }
}
