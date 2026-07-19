import { prisma } from "@/lib/prisma";
import { DEFAULT_SETTINGS } from "@/lib/settings";

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

      // 2. Fetch pricing settings from DB (with fallbacks to DEFAULT_SETTINGS)
      const settingRecords = await prisma.setting.findMany({
        where: { key: { in: ["serviceRadius", "travelFeePerMile"] } },
      });
      const settingsMap = settingRecords.reduce((acc, r) => {
        acc[r.key] = r.value;
        return acc;
      }, {} as Record<string, string>);

      const FREE_MILES = parseFloat(settingsMap["serviceRadius"] ?? DEFAULT_SETTINGS.serviceRadius);
      const COST_PER_MILE = parseFloat(settingsMap["travelFeePerMile"] ?? DEFAULT_SETTINGS.travelFeePerMile);

      // 3. Fetch Company ZIP Code from settings
      const companyZipSetting = await prisma.setting.findUnique({
        where: { key: "COMPANY_ZIP_CODE" },
      });
      // Default to Georgetown, MA ZIP
      const originZip = companyZipSetting?.value || "01833";

      // 4. Calculate Distance using Google Maps Distance Matrix API
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

      // 5. Calculate Costs
      const basePrice = pkg.price;
      
      // Extra guests cost
      let extraGuestsCost = 0;
      if (params.guestCount > pkg.servings) {
        extraGuestsCost = (params.guestCount - pkg.servings) * pkg.extraGuestPrice;
      }

      // Distance cost: First FREE_MILES are free, then COST_PER_MILE per mile
      let travelFee = 0;
      if (distanceMiles > FREE_MILES) {
        travelFee = (distanceMiles - FREE_MILES) * COST_PER_MILE;
      }

      // Overtime cost: $100 per extra hour
      const overtimeFee = params.extraHours * 100;

      // No tax applied (taxRate = 0)
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
          freeMiles: FREE_MILES,
          costPerMile: COST_PER_MILE,
        }
      };

    } catch (error: any) {
      console.error("[PricingService] Error:", error);
      return { success: false, error: error.message };
    }
  }
};
