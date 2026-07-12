import { prisma } from "@/lib/prisma";
import { AuditService } from "./audit";

export interface BookingDecisionParams {
  customerId: string;
  packageId?: string;
  totalAmount: number;
  distanceMiles: number;
  eventDate: Date;
  startTime: string;
  durationMins: number;
  address: string;
  city: string;
  zip: string;
  guests: number;
  eventType: string;
  notes?: string;
  aiType: "CUSTOMER_AI" | "ADMIN_AI" | "NONE";
  aiProvider?: string;
  aiModel?: string;
}

export const BookingService = {
  async createBookingWithDecision(params: BookingDecisionParams) {
    try {
      // 1. Decision Engine Rules
      let status = "PENDING";
      let requiresAdminReview = false;

      if (params.totalAmount >= 500) {
        status = "APPROVED";
      } else if (params.totalAmount < 500 && params.distanceMiles > 30) {
        status = "PENDING_REVIEW";
        requiresAdminReview = true;
      } else if (params.totalAmount < 500 && params.distanceMiles <= 30) {
        status = "APPROVED";
      }

      // 2. Prevent Duplicates
      const existing = await prisma.booking.findFirst({
        where: {
          customerId: params.customerId,
          eventDate: params.eventDate,
          startTime: params.startTime,
          status: { in: ["APPROVED", "PENDING", "PENDING_REVIEW"] }
        }
      });

      if (existing) {
        throw new Error("A booking already exists for this customer at the requested time.");
      }

      // 3. Generate Booking Number
      const count = await prisma.booking.count();
      const bookingNumber = `BKG-${new Date().getFullYear()}-${String(count + 1000).padStart(4, '0')}`;

      // 4. Create Booking
      const booking = await prisma.booking.create({
        data: {
          bookingNumber,
          customerId: params.customerId,
          packageId: params.packageId,
          status,
          eventDate: params.eventDate,
          startTime: params.startTime,
          durationMins: params.durationMins,
          address: params.address,
          city: params.city,
          zip: params.zip,
          guests: params.guests,
          eventType: params.eventType,
          notes: params.notes,
          totalAmount: params.totalAmount,
        }
      });

      // 5. Audit Log
      await AuditService.log({
        entityType: "BOOKING",
        entityId: booking.id,
        action: "CREATE_BOOKING_AI",
        aiType: params.aiType,
        aiProvider: params.aiProvider,
        aiModel: params.aiModel,
        newValue: booking,
        result: "SUCCESS",
        bookingId: booking.id,
      });

      return {
        success: true,
        booking,
        requiresAdminReview
      };

    } catch (error: any) {
      console.error("[BookingService] Failed to create booking:", error);
      
      // Log Failure
      await AuditService.log({
        entityType: "BOOKING",
        entityId: "UNKNOWN",
        action: "CREATE_BOOKING_AI_FAILED",
        aiType: params.aiType,
        aiProvider: params.aiProvider,
        aiModel: params.aiModel,
        errors: error.message,
        result: "FAILED",
      });

      return { success: false, error: error.message };
    }
  }
};
