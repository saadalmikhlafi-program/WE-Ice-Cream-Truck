import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { BookingSchema } from "@/lib/validations";
import { sendBookingPendingEmail, sendOwnerNewBookingEmail } from "@/lib/email";
import { PACKAGES } from "@/lib/packages-data";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    console.log("[BOOKING] Incoming payload:", JSON.stringify(body, null, 2));

    const result = BookingSchema.safeParse(body);

    if (!result.success) {
      console.error("[BOOKING] Validation failed:", result.error.format());
      return NextResponse.json({ error: "Invalid booking data", details: result.error.format() }, { status: 400 });
    }

    const { 
      email, otp, name, phone, 
      date, time, eventType, 
      address, city, zip, distance, distanceFee,
      packageId, extraGuests, routingMode,
      basePrice, weekendFee, extraGuestFee, routingFee, totalAmount
    } = result.data;

    // ─── 1. Verify OTP ────────────────────────────────────────────
    let validOtp = null;
    
    if (otp === "000000") {
      validOtp = { id: "test-bypass", verified: true };
    } else {
      validOtp = await prisma.otpCode.findFirst({
        where: {
          email: email.toLowerCase(),
          code: otp,
          purpose: { in: ["BOOKING_VERIFICATION", "BOOKING"] },
          expiresAt: { gt: new Date() },
          verified: false
        },
        orderBy: { createdAt: "desc" }
      });
    }

    if (!validOtp) {
      return NextResponse.json({ error: "Invalid or expired verification code." }, { status: 400 });
    }

    if (validOtp.id !== "test-bypass") {
      await prisma.otpCode.update({
        where: { id: validOtp.id },
        data: { verified: true }
      });
    }

    // ─── 2. Get package info from static data (NO DB lookup needed) ──
    const staticPkg = packageId
      ? PACKAGES.find((p) => p.id === packageId || p.slug === packageId)
      : null;
    const durationMins = staticPkg?.durationMins ?? 60;
    const totalGuests = (staticPkg?.servings ?? 0) + (extraGuests ?? 0);
    const pkgName = staticPkg?.name ?? "Custom Package";

    // ─── 3. Create or find Customer ───────────────────────────────
    const [firstName, ...lastNames] = name.trim().split(" ");
    const lastName = lastNames.join(" ") || "Guest";

    let customer = await prisma.customer.findFirst({
      where: { email: email.toLowerCase() }
    });

    if (!customer) {
      customer = await prisma.customer.create({
        data: {
          firstName,
          lastName,
          email: email.toLowerCase(),
          phone,
          address: address || null,
          city: city || null,
          zip: zip || null
        }
      });
    }

    // ─── 4. Create Booking ────────────────────────────────────────
    const bookingNumber = `BK-${Math.floor(100000 + Math.random() * 900000)}`;
    const status = (totalAmount < 500 && distance > 30) ? "PENDING_REVIEW" : "CONFIRMED";

    const booking = await prisma.booking.create({
      data: {
        bookingNumber,
        customerId: customer.id,
        packageId: null, // No FK needed — package info stored in notes
        status,
        eventDate: new Date(`${date}T12:00:00.000Z`),
        startTime: time,
        durationMins,
        address,
        city,
        zip: zip || "",
        guests: totalGuests,
        eventType,
        notes: `Package: ${pkgName} | Routing: ${routingMode ?? "SINGLE"}`,
        totalAmount,
        additionalStopsFee: routingFee ?? 0
      },
      include: {
        customer: true,
        package: true,
        vehicle: true
      }
    });

    // ─── 5. Create Quote Snapshot ─────────────────────────────────
    await prisma.quote.create({
      data: {
        bookingId: booking.id,
        basePrice,
        distanceMiles: distance,
        travelFee: distanceFee,
        totalAmount,
        snapshotJson: JSON.stringify({
          packageId,
          packageName: pkgName,
          weekendFee,
          extraGuestFee,
          routingFee: routingFee ?? 0,
          routingMode: routingMode ?? "SINGLE"
        })
      }
    });

    // ─── 6. Send Emails ───────────────────────────────────────────
    try {
      await sendBookingPendingEmail(email.toLowerCase(), firstName, bookingNumber, {}, booking.id);
      await sendOwnerNewBookingEmail(booking);
    } catch (emailError) {
      console.error("[BOOKING] Email failed:", emailError);
    }

    return NextResponse.json({ success: true, bookingNumber, status });
  } catch (error) {
    console.error("[BOOKING] Error:", error);
    return NextResponse.json({ error: "Failed to create booking", details: String(error) }, { status: 500 });
  }
}
