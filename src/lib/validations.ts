import { z } from "zod";

export const BookingSchema = z.object({
  email: z.string().email("Invalid email address"),
  otp: z.string().length(6, "OTP must be 6 digits"),
  name: z.string().min(2, "Name is required"),
  phone: z.string().min(10, "Valid phone number is required"),
  date: z.string().refine((val) => !isNaN(Date.parse(val)), "Invalid date"),
  time: z.string().min(1, "Time is required"),
  eventType: z.string().min(1, "Event type is required"),
  address: z.string().min(5, "Address is required"),
  city: z.string().min(2, "City is required"),
  zip: z.string().length(5, "Valid 5-digit ZIP is required"),
  distance: z.number().min(0),
  distanceFee: z.number().min(0),
  packageId: z.string().optional(),
  extraGuests: z.number().min(0),
  routingMode: z.string().optional(),
  basePrice: z.number().min(0),
  weekendFee: z.number().min(0),
  extraGuestFee: z.number().min(0),
  routingFee: z.number().min(0),
  totalAmount: z.number().min(0),
});

export const OtpSchema = z.object({
  email: z.string().email("Invalid email address"),
});
