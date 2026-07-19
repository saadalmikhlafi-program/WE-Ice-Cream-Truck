import { prisma } from "./prisma";

export const DEFAULT_SETTINGS = {
  companyName: "WE Ice Cream Truck",
  companyAddress: "38 Woodland Rd, Georgetown, MA 01833",
  companyPhone: "617-999-3803",
  companyEmail: "info@weicecreamtruck.com",
  logoUrl: "/images/we-icecream.jpg",
  faviconUrl: "/favicon.ico",
  businessHours: "Available 24 hours by reservation, 7 days a week",
  serviceRadius: "10",
  travelFeePerMile: "2.50",
  taxRate: "0",
  seoTitle: "WE Ice Cream Truck - Premium Events",
  seoDescription: "Massachusetts' most trusted premium ice cream truck catering service.",
  facebookUrl: "",
  instagramUrl: "",
  bookingAutoApprove: "false",
  aiAssistantName: "WE Ice Cream Truck AI Concierge",
  aiAssistantSystemPrompt: "You are the highly professional AI Concierge for WE Ice Cream Truck. You help customers book packages and answer their questions."
};

/**
 * Get all settings combined with defaults.
 */
export async function getSettings(): Promise<typeof DEFAULT_SETTINGS> {
  try {
    const records = await prisma.setting.findMany();
    const dict = records.reduce((acc, curr) => {
      acc[curr.key] = curr.value;
      return acc;
    }, {} as Record<string, string>);

    return {
      ...DEFAULT_SETTINGS,
      ...dict,
    };
  } catch (error) {
    console.error("Failed to get settings:", error);
    return DEFAULT_SETTINGS;
  }
}

/**
 * Get a specific setting value by key.
 */
export async function getSetting<K extends keyof typeof DEFAULT_SETTINGS>(
  key: K
): Promise<string> {
  try {
    const record = await prisma.setting.findUnique({
      where: { key: key as string },
    });
    return record?.value ?? DEFAULT_SETTINGS[key];
  } catch (error) {
    console.error(`Failed to get setting ${key}:`, error);
    return DEFAULT_SETTINGS[key];
  }
}
