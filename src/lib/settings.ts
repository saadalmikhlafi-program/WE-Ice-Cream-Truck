import { prisma } from "./prisma";

export const DEFAULT_SETTINGS = {
  companyName: "WE Ice Cream Truck",
  companyAddress: "123 Main St, Boston, MA 02151",
  companyPhone: "(555) 123-4567",
  companyEmail: "hello@weicecreamtruck.com",
  logoUrl: "/logo.png",
  faviconUrl: "/favicon.ico",
  businessHours: "Mon-Sun 10AM - 8PM",
  serviceRadius: "30",
  travelFeePerMile: "1.50",
  taxRate: "6.25",
  seoTitle: "WE Ice Cream Truck - Premium Events",
  seoDescription: "Book the best ice cream truck in Massachusetts.",
  facebookUrl: "",
  instagramUrl: "",
  bookingAutoApprove: "false",
  aiAssistantName: "Ice Cream Bot",
  aiAssistantSystemPrompt: "You are a helpful assistant for an ice cream truck company."
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
