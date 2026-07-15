import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { BookingSchema } from "@/lib/validations";
import { sendBookingPendingEmail, sendOwnerNewBookingEmail } from "@/lib/email";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const result = BookingSchema.safeParse(body);

    if (!result.success) {
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
          purpose: "BOOKING_VERIFICATION",
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

    // 2. Create or find Customer
    const [firstName, ...lastNames] = name.split(" ");
    const lastName = lastNames.join(" ") || "Unknown";
    
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
          address,
          city,
          zip
        }
      });
    }

    // 3. Create Booking
    const bookingNumber = `BK-${Math.floor(100000 + Math.random() * 900000)}`;
    
    // AI Rules check:
    const status = (totalAmount < 500 && distance >= 30) ? "REVIEW_REQUIRED" : "PENDING_REVIEW";

    const booking = await prisma.booking.create({
      data: {
        bookingNumber,
        customerId: customer.id,
        packageId,
        status,
        eventDate: new Date(`${date}T00:00:00.000Z`),
        startTime: time,
        durationMins: 60, // Default or fetch from package
        address,
        city,
        zip,
        guests: extraGuests, // Storing extra guests here
        eventType,
        notes: `Routing Mode: ${routingMode}`,
        totalAmount,
        additionalStopsFee: routingFee
      },
      include: {
        customer: true,
        package: true,
        vehicle: true
      }
    });

    // 4. Create Quote Snapshot
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
          routingFee,
          routingMode
        })
      }
    });

    // 5. Send Emails
    try {
      await sendBookingPendingEmail(email.toLowerCase(), firstName, bookingNumber, {}, booking.id);
      await sendOwnerNewBookingEmail(booking);
    } catch (emailError) {
      console.error("Failed to send booking emails:", emailError);
      // We don't fail the booking if email fails
    }

    return NextResponse.json({ success: true, bookingNumber, status });
  } catch (error) {
    console.error("Booking Error:", error);
    return NextResponse.json({ error: "Failed to create booking" }, { status: 500 });
  }
}
