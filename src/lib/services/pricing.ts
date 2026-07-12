import { prisma } from "@/lib/prisma";

export interface CalculatePriceParams {
  packageSlug: string;
  guestCount: number;
  eventZipCode: string;
  extraHours: number;
}

export const PricingService = {
  async calculatePrice(params: CalculatePriceParams) {
    try {
      // 1. Fetch Package
      const pkg = await prisma.package.findUnique({
        where: { slug: params.packageSlug },
      });
      if (!pkg) throw new Error("Package not found");

      // 2. Fetch Company ZIP Code from settings
      let companyZipSetting = await prisma.setting.findUnique({
        where: { key: "COMPANY_ZIP_CODE" },
      });
      
      // Default fallback if not configured yet
      const originZip = companyZipSetting?.value || "02108"; // Boston fallback

      // 3. Calculate Distance using Google Maps Distance Matrix API
      let distanceMiles = 0;
      if (process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY) {
        try {
          const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;
          const url = `https://maps.googleapis.com/maps/api/distancematrix/json?origins=${encodeURIComponent(originZip)}&destinations=${encodeURIComponent(params.eventZipCode)}&units=imperial&key=${apiKey}`;
          const res = await fetch(url);
          const data = await res.json();
          const element = data?.rows?.[0]?.elements?.[0];
          if (element?.status === "OK") {
            distanceMiles = element.distance.value / 1609.34;
          }
        } catch (e) {
          console.error("Google Maps API failed:", e);
        }
      }

      // 4. Calculate Costs
      const basePrice = pkg.price;
      
      // Extra guests cost
      let extraGuestsCost = 0;
      if (params.guestCount > pkg.servings) {
        extraGuestsCost = (params.guestCount - pkg.servings) * pkg.extraGuestPrice;
      }

      // Distance cost: First 20 miles free, then $3/mile
      const FREE_MILES = 20;
      const COST_PER_MILE = 3;
      let travelFee = 0;
      if (distanceMiles > FREE_MILES) {
        travelFee = (distanceMiles - FREE_MILES) * COST_PER_MILE;
      }

      // Overtime cost: $100 per extra hour
      const overtimeFee = params.extraHours * 100;

      const subtotal = basePrice + extraGuestsCost + travelFee + overtimeFee;
      
      return {
        success: true,
        breakdown: {
          basePrice,
          extraGuestsCost,
          travelFee: Math.round(travelFee * 100) / 100,
          overtimeFee,
          subtotal: Math.round(subtotal * 100) / 100,
          distanceMiles: Math.round(distanceMiles * 10) / 10,
        }
      };

    } catch (error: any) {
      console.error("[PricingService] Error:", error);
      return { success: false, error: error.message };
    }
  }
};
