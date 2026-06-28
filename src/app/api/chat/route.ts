import { NextRequest, NextResponse } from "next/server";
import { BUSINESS_CONFIG } from "@/lib/config";

const GROQ_API_KEY = process.env.GROQ_API_KEY;
const GROQ_API_URL = "https://api.groq.com/openai/v1/chat/completions";

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
We offer 3 main packages:
1. **Classic Truck Package** — From $190. Our signature soft-serve experience. Includes up to 50 servings, 1 hour of service.
2. **Premium Van Package** — From $290. A premium experience with up to 100 servings, 1.5 hours of service, custom branding available.
3. **Full Festival Package** — From $490. Multiple trucks/vans, ideal for large events 200+ guests, 2+ hours of service.

## Pricing Rules
- **Base Price**: From the package selected above.
- **Travel Fee**: First 10 miles are FREE. Each additional mile is $2.50.
- **Weekend Surcharge**: Events on Saturday or Sunday add $25.
- **Extra Service Time**: $35 per additional 30-minute block beyond the included time.
- **Extra Guests**: Beyond the included servings, each extra guest adds to the cost (varies by package).
- **Additional Stops**: $50 per extra location.
- **Simultaneous Multi-Vehicle**: Additional vehicle setup fee of $200 per extra vehicle.

## Services We Offer
- Birthday Parties 🎂
- Corporate Events 🏢
- Weddings 💍
- School Events 🏫
- Festivals 🎪
- Community Events 🏘️
- Bar/Bat Mitzvahs ✡️
- Quinceañeras 💃
- Sports Events ⚽
- Holiday Parties 🎄

## Booking
- Guide customers to visit /get-a-quote or call ${BUSINESS_CONFIG.contact.phone1} to book.
- All bookings are done by reservation only.

## Tone & Style
- Be warm, enthusiastic, and helpful — like a friendly concierge.
- Keep responses concise and to the point.
- Use emojis sparingly to add personality.
- If you don't know something, be honest and direct customers to call us.
- Always end with a helpful call-to-action when appropriate.
- DO NOT make up information not listed above.`;

export async function POST(req: NextRequest) {
  try {
    if (!GROQ_API_KEY) {
      return NextResponse.json(
        { error: "AI service is not configured." },
        { status: 503 }
      );
    }

    const { messages } = await req.json();

    if (!messages || !Array.isArray(messages)) {
      return NextResponse.json(
        { error: "Invalid request body." },
        { status: 400 }
      );
    }

    const response = await fetch(GROQ_API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${GROQ_API_KEY}`,
      },
      body: JSON.stringify({
        model: "llama-3.3-70b-versatile",
        messages: [
          { role: "system", content: SYSTEM_PROMPT },
          ...messages.slice(-10), // Keep last 10 messages for context
        ],
        max_tokens: 512,
        temperature: 0.7,
      }),
    });

    if (!response.ok) {
      const error = await response.text();
      console.error("Groq API error:", error);
      return NextResponse.json(
        { error: "AI service temporarily unavailable." },
        { status: 502 }
      );
    }

    const data = await response.json();
    const assistantMessage = data.choices?.[0]?.message?.content;

    if (!assistantMessage) {
      return NextResponse.json(
        { error: "No response from AI." },
        { status: 502 }
      );
    }

    return NextResponse.json({ message: assistantMessage });
  } catch (error) {
    console.error("Chat API error:", error);
    return NextResponse.json(
      { error: "Internal server error." },
      { status: 500 }
    );
  }
}
