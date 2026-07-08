import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import crypto from "crypto";
import { OtpSchema } from "@/lib/validations";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const result = OtpSchema.safeParse(body);

    if (!result.success) {
      return NextResponse.json({ error: "Invalid input data", details: result.error.format() }, { status: 400 });
    }

    const { email } = result.data;

    // Generate a 6-digit OTP
    const otp = crypto.randomInt(100000, 999999).toString();

    // Expire in 10 minutes
    const expiresAt = new Date(Date.now() + 10 * 60 * 1000);

    // Save to DB
    await prisma.otpCode.create({
      data: {
        email: email.toLowerCase(),
        code: otp,
        expiresAt,
        purpose: "BOOKING_VERIFICATION",
      },
    });

    // In a real app, send this via Resend, SendGrid, NodeMailer etc.
    // For now, we log it so we can see it in the server console during dev
    console.log(`\n\n================================`);
    console.log(`🔐 OTP CODE FOR ${email}: ${otp}`);
    console.log(`================================\n\n`);

    return NextResponse.json({ success: true, message: "OTP Sent" });
  } catch (error) {
    console.error("OTP Error:", error);
    return NextResponse.json({ error: "Failed to generate OTP" }, { status: 500 });
  }
}
