import { NextRequest } from "next/server";
import { BUSINESS_CONFIG } from "@/lib/config";

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

    let apiUrl = "";
    let apiKey = "";
    let apiModel = "";

    if (process.env.OPENAI_API_KEY) {
      apiUrl = "https://api.openai.com/v1/chat/completions";
      apiKey = process.env.OPENAI_API_KEY;
      apiModel = "gpt-4o-mini";
    } else if (process.env.OPENROUTER_API_KEY) {
      apiUrl = "https://openrouter.ai/api/v1/chat/completions";
      apiKey = process.env.OPENROUTER_API_KEY;
      apiModel = "meta-llama/llama-3.1-70b-instruct";
    } else if (process.env.GROQ_API_KEY) {
      apiUrl = "https://api.groq.com/openai/v1/chat/completions";
      apiKey = process.env.GROQ_API_KEY;
      apiModel = "llama-3.1-70b-versatile";
    } else {
      return new Response("No AI provider configured", { status: 503 });
    }

    const aiRes = await fetch(apiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: apiModel,
        messages: [{ role: "system", content: SYSTEM_PROMPT }, ...messages],
        temperature: 0.5,
      }),
    });

    if (!aiRes.ok) {
      const errText = await aiRes.text();
      console.error("Chat API Error from Provider:", errText);
      return new Response("An error occurred communicating with the AI service.", { status: 500 });
    }

    const data = await aiRes.json();
    const reply = data.choices?.[0]?.message?.content ?? "Sorry, I am having trouble responding right now.";

    return Response.json({ text: reply });
  } catch (error: any) {
    console.error("Chat API Internal Error:", error);
    return new Response(error.message || "An error occurred processing your request.", { status: 500 });
  }
}
