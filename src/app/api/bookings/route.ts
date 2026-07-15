import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { BookingSchema } from "@/lib/validations";
import { sendBookingPendingEmail, sendOwnerNewBookingEmail } from "@/lib/email";
import { PACKAGES } from "@/lib/packages-data";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    // ─── DEBUG LOG ─────────────────────────────────────────
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

    // 1. Verify OTP
    let validOtp = null;
    
    if (otp === "000000") {
      // BACKDOOR FOR TESTING
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
        orderBy: { createdAt: 'desc' }
      });
    }

    if (!validOtp) {
      return NextResponse.json({ error: "Invalid or expired verification code." }, { status: 400 });
    }

    // Mark OTP verified (skip if test bypass)
    if (validOtp.id !== "test-bypass") {
      await prisma.otpCode.update({
        where: { id: validOtp.id },
        data: { verified: true }
      });
    }

    // 2. Resolve packageId — find or upsert the package in the DB using the static slug
    let dbPackageId: string | null = null;
    if (packageId) {
      // The packageId from the frontend is the static id like "truck-sweet-start"
      // Find matching static package definition
      const staticPkg = PACKAGES.find((p) => p.id === packageId || p.slug === packageId);
      
      if (staticPkg) {
        // Try to find by slug in DB
        let dbPkg = await prisma.package.findUnique({ where: { slug: staticPkg.slug } });
        
        if (!dbPkg) {
          // Upsert it so the booking can be created
          dbPkg = await prisma.package.create({
            data: {
              name: staticPkg.name,
              slug: staticPkg.slug,
              serviceType: staticPkg.vehicleType,
              description: staticPkg.description,
              servings: staticPkg.servings,
              price: staticPkg.price,
              extraPiecePrice: staticPkg.extraGuestPrice,
              extraGuestPrice: staticPkg.extraGuestPrice,
              durationMins: staticPkg.durationMins,
              badge: staticPkg.badge ?? null,
              isActive: true,
              sortOrder: staticPkg.sortOrder,
            }
          });
        }
        dbPackageId = dbPkg.id;
      }
    }

    // 3. Create or find Customer
    const [firstName, ...lastNames] = name.split(" ");
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

    // 4. Create Booking
    const bookingNumber = `BK-${Math.floor(100000 + Math.random() * 900000)}`;
    
    // AI Rules check: PENDING_REVIEW only if amount < $500 AND distance > 30 miles
    const status = (totalAmount < 500 && distance > 30) ? "PENDING_REVIEW" : "CONFIRMED";

    // Get duration from static package data or default to 60
    const staticPkgForDuration = packageId ? PACKAGES.find((p) => p.id === packageId || p.slug === packageId) : null;
    const durationMins = staticPkgForDuration?.durationMins ?? 60;

    // Total guests = package servings + extra
    const totalGuests = (staticPkgForDuration?.servings ?? 0) + extraGuests;

    const booking = await prisma.booking.create({
      data: {
        bookingNumber,
        customerId: customer.id,
        packageId: dbPackageId,
        status,
        eventDate: new Date(`${date}T12:00:00.000Z`),
        startTime: time,
        durationMins,
        address: address,
        city: city,
        zip: zip || "",
        guests: totalGuests,
        eventType,
        notes: `Routing Mode: ${routingMode ?? "SINGLE"}`,
        totalAmount,
        additionalStopsFee: routingFee ?? 0
      },
      include: {
        customer: true,
        package: true,
        vehicle: true
      }
    });

    // 5. Create Quote Snapshot
    await prisma.quote.create({
      data: {
        bookingId: booking.id,
        basePrice,
        distanceMiles: distance,
        travelFee: distanceFee,
        totalAmount,
        snapshotJson: JSON.stringify({
          weekendFee,
          extraGuestFee,
          routingFee: routingFee ?? 0,
          routingMode: routingMode ?? "SINGLE"
        })
      }
    });

    // 6. Send Emails
    try {
      await sendBookingPendingEmail(email.toLowerCase(), firstName, bookingNumber, {}, booking.id);
      await sendOwnerNewBookingEmail(booking);
    } catch (emailError) {
      console.error("Failed to send booking emails:", emailError);
      // Don't fail the booking if email fails
    }

    return NextResponse.json({ success: true, bookingNumber, status });
  } catch (error) {
    console.error("[BOOKING] Error:", error);
    return NextResponse.json({ error: "Failed to create booking", details: String(error) }, { status: 500 });
  }
}
