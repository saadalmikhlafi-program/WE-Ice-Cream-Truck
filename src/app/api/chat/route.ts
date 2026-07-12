import { NextRequest } from "next/server";
import { createOpenAI } from "@ai-sdk/openai";
import { streamText } from "ai";
import { BUSINESS_CONFIG } from "@/lib/config";

// Initialize providers
const groq = createOpenAI({
  baseURL: "https://api.groq.com/openai/v1",
  apiKey: process.env.GROQ_API_KEY || "",
});

const openRouter = createOpenAI({
  baseURL: "https://openrouter.ai/api/v1",
  apiKey: process.env.OPENROUTER_API_KEY || "",
});

const openai = createOpenAI({
  apiKey: process.env.OPENAI_API_KEY || "",
});

const SYSTEM_PROMPT = `You are the WE Ice Cream Truck AI Concierge — a helpful, warm, and professional assistant for ${BUSINESS_CONFIG.name}.

Your role is to help customers learn about our services, packages, and pricing, and to guide them toward booking an ice cream truck for their event.

## About Us
- Company: ${BUSINESS_CONFIG.name} (${BUSINESS_CONFIG.legalName})
- Tagline: "${BUSINESS_CONFIG.tagline}"
- Location: ${BUSINESS_CONFIG.address.display}
- Contact: ${BUSINESS_CONFIG.contact.phone1} (Main) | ${BUSINESS_CONFIG.contact.phone2} (Reservations)
- Email: ${BUSINESS_CONFIG.contact.email}
- We serve all of Massachusetts — over 140 cities and towns.
- We speak English, Spanish, and Arabic.

## Our Packages
1. **Classic Truck Package** — From $190. Our signature soft-serve experience. Includes up to 50 servings, 1 hour of service.
2. **Premium Van Package** — From $290. A premium experience with up to 100 servings, 1.5 hours of service, custom branding available.
3. **Full Festival Package** — From $490. Multiple trucks/vans, ideal for large events 200+ guests, 2+ hours of service.

## Pricing Rules
- **Base Price**: From the package selected above.
- **Travel Fee**: First 10 miles are FREE. Each additional mile is $2.50.
- **Weekend Surcharge**: Events on Saturday or Sunday add $25.
- **Extra Service Time**: $35 per additional 30-minute block beyond the included time.

## Booking
- Guide customers to visit /get-a-quote or call ${BUSINESS_CONFIG.contact.phone1} to book.
- All bookings are done by reservation only.

## Tone & Style
- Be warm, enthusiastic, and helpful — like a friendly concierge.
- Keep responses concise and to the point.
- Use emojis sparingly to add personality.
- If you don't know something, be honest and direct customers to call us.
- DO NOT make up information not listed above.`;

export async function POST(req: NextRequest) {
  try {
    const { messages } = await req.json();

    // Provider Fallback Logic
    // 1. Try Groq (Fastest)
    // 2. Fallback to OpenRouter (Flexible)
    // 3. Fallback to OpenAI (Most reliable)

    let model;
    if (process.env.GROQ_API_KEY) {
      model = groq("llama-3.3-70b-versatile");
    } else if (process.env.OPENROUTER_API_KEY) {
      model = openRouter("meta-llama/llama-3.3-70b-instruct");
    } else if (process.env.OPENAI_API_KEY) {
      model = openai("gpt-4o-mini");
    } else {
      return new Response("No AI provider configured", { status: 503 });
    }

    const result = await streamText({
      model,
      system: SYSTEM_PROMPT,
      messages,
    });

    return result.toTextStreamResponse();
  } catch (error) {
    console.error("Chat API Error:", error);
    return new Response("An error occurred processing your request.", { status: 500 });
  }
}
