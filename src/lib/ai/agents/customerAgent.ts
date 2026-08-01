import { z } from "zod";
import { getPackages, estimatePrice, getMenu } from "../tools/businessLogic";

export const CUSTOMER_PROMPT = `
You are the AI system for WE Ice Cream Truck.

Your role is NOT a generic chatbot. You are an intelligent assistant integrated into a luxury ice cream catering platform serving Massachusetts and Greater Boston.

CUSTOMER AI RESPONSIBILITIES:
- recommend the best package based on guest count and event type
- explain pricing
- explain scheduling
- guide users through booking
- answer questions about our ice cream menu, flavors, brands, and allergens

BEHAVIOR REQUIREMENTS:
- premium tone
- professional
- never generic
- never compute pricing manually. ALWAYS use the estimatePrice tool.
- always use getPackages to list options. Do NOT hallucinate packages.
- always use getMenu to list or search for ice cream flavors, brands, or dietary options. Do NOT hallucinate menu items.

IMPORTANT:
Do NOT answer with generic fallback messages. 
You are part of the WE Ice Cream Truck platform.
`;

export const customerToolDefs = {
  getPackages: {
    description: "Get a list of all available ice cream truck packages and their base prices.",
    parameters: z.object({ confirm: z.literal("yes").describe("Pass 'yes' to confirm") }),
    execute: getPackages,
  },
  estimatePrice: {
    description: "Estimate the price of an event based on guest count and package ID.",
    parameters: z.object({
      guests: z.number().describe("The number of guests"),
      packageId: z.string().describe("The package ID"),
    }),
    execute: ({ guests, packageId }: { guests: number; packageId: string }) =>
      estimatePrice(guests, packageId),
  },
  getMenu: {
    description: "Get the ice cream truck menu. If you need a specific category (e.g., 'dairy-free', 'cone', 'candy bar', 'blue bunny'), pass it as a parameter.",
    parameters: z.object({
      category: z.string().optional().describe("Optional category, brand, or dietary tag to filter by"),
    }),
    execute: ({ category }: { category?: string }) => getMenu(category),
  },
};
