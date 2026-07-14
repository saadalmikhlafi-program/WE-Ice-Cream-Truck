import { NextRequest } from "next/server";
import { BUSINESS_CONFIG } from "@/lib/config";
import { prisma } from "@/lib/prisma";

const SYSTEM_PROMPT = `You are the WE Ice Cream Truck AI Concierge — a helpful, warm, and professional assistant for ${BUSINESS_CONFIG.name}.

Your role is to help customers learn about our services, packages, and pricing, and to guide them toward booking an ice cream truck for their event. You can also help them book directly through this chat!

## About Us
- Company: ${BUSINESS_CONFIG.name} (${BUSINESS_CONFIG.legalName})
- Tagline: "${BUSINESS_CONFIG.tagline}"
- Location: ${BUSINESS_CONFIG.address.display}
- Contact: ${BUSINESS_CONFIG.contact.phone1} (Main) | ${BUSINESS_CONFIG.contact.phone2} (Reservations)
- Email: ${BUSINESS_CONFIG.contact.email}
- We serve all of Massachusetts — over 140 cities and towns.
- We speak English, Spanish, and Arabic.

## Our Packages (use these exact IDs when booking)
1. **Classic Scoop Truck** (ID: classic-scoop-truck) — $190. Up to 50 guests, 60 min service.
2. **Deluxe Scoop Truck** (ID: deluxe-scoop-truck) — $250. Up to 75 guests, 75 min service.
3. **Premium Scoop Truck** (ID: premium-scoop-truck) — $350. Up to 100 guests, 90 min service.
4. **Classic Van** (ID: classic-van) — $225. Up to 50 guests, 60 min service.
5. **Deluxe Van** (ID: deluxe-van) — $300. Up to 75 guests, 75 min service.
6. **Premium Van** (ID: premium-van) — $400. Up to 100 guests, 90 min service.
7. **Classic Combo** (ID: classic-combo) — $375. Up to 100 guests, 60 min, Truck + Van.
8. **Deluxe Combo** (ID: deluxe-combo) — $500. Up to 150 guests, 75 min, Truck + Van.
9. **Premium Combo** (ID: premium-combo) — $700. Up to 200 guests, 90 min, Truck + Van.
10. **Festival Truck** (ID: festival-truck) — $500. Up to 150 guests, 120 min.
11. **Festival Van** (ID: festival-van) — $550. Up to 150 guests, 120 min.
12. **Festival Combo** (ID: festival-combo) — $900. Up to 300 guests, 120 min, Truck + Van.
13. **Custom Event Package** (ID: custom-event-package) — Custom pricing for 200+ guests.

## Pricing Rules
- **Base Price**: From the package selected above.
- **Travel Fee**: First 10 miles are FREE. Each additional mile is $2.50.
- **Weekend Surcharge**: Events on Saturday or Sunday add $25.
- **Extra Service Time**: $35 per additional 30-minute block beyond the included time.
- **Extra Guests**: Each extra guest beyond the package limit is $5.

## Booking via Chat
When a customer wants to book through chat, ask for:
1. Full name
2. Email address
3. Phone number
4. Event date (YYYY-MM-DD format)
5. Start time (e.g., 2:00 PM)
6. Event type (Birthday Party, Corporate Event, Wedding, Festival, School Event, Community Event, Other)
7. Which package they want
8. Event address, city, and ZIP code
9. Estimated number of guests

Once you have ALL the details, summarize the booking and call the createBookingRequest tool. Do NOT call the tool until you have gathered all required information.

## Tone & Style
- Be warm, enthusiastic, and helpful — like a friendly concierge.
- Keep responses concise and to the point.
- Use emojis sparingly to add personality.
- If you don't know something, be honest and direct customers to call us.
- DO NOT make up information not listed above.`;

// Tool definition for booking
const BOOKING_TOOL = {
  type: "function" as const,
  function: {
    name: "createBookingRequest",
    description: "Create a new booking request when the customer has provided all required details.",
    parameters: {
      type: "object",
      properties: {
        name: { type: "string", description: "Customer's full name" },
        email: { type: "string", description: "Customer's email address" },
        phone: { type: "string", description: "Customer's phone number" },
        eventDate: { type: "string", description: "Event date in YYYY-MM-DD format" },
        startTime: { type: "string", description: "Event start time, e.g. '2:00 PM'" },
        eventType: { type: "string", description: "Type of event" },
        packageId: { type: "string", description: "Package ID from the list" },
        address: { type: "string", description: "Event street address" },
        city: { type: "string", description: "Event city" },
        zip: { type: "string", description: "Event ZIP code" },
        guests: { type: "number", description: "Estimated number of guests" },
      },
      required: ["name", "email", "phone", "eventDate", "startTime", "eventType", "packageId", "address", "city", "zip", "guests"],
    },
  },
};

async function handleBookingTool(args: any): Promise<{ success: boolean; bookingNumber?: string; error?: string }> {
  try {
    const [firstName, ...lastNames] = args.name.split(" ");
    const lastName = lastNames.join(" ") || "Unknown";

    // Find or create customer
    let customer = await prisma.customer.findFirst({
      where: { email: args.email.toLowerCase() },
    });

    if (!customer) {
      customer = await prisma.customer.create({
        data: {
          firstName,
          lastName,
          email: args.email.toLowerCase(),
          phone: args.phone,
          address: args.address,
          city: args.city,
          zip: args.zip,
        },
      });
    }

    const bookingNumber = `BK-${Math.floor(100000 + Math.random() * 900000)}`;

    // Check if packageId exists in DB
    let resolvedPackageId: string | null = null;
    if (args.packageId && args.packageId !== "custom-event-package") {
      const pkg = await prisma.package.findFirst({
        where: { OR: [{ id: args.packageId }, { slug: args.packageId }] },
      });
      if (pkg) resolvedPackageId = pkg.id;
    }

    const booking = await prisma.booking.create({
      data: {
        bookingNumber,
        customerId: customer.id,
        packageId: resolvedPackageId,
        status: "PENDING",
        eventDate: new Date(`${args.eventDate}T00:00:00.000Z`),
        startTime: args.startTime,
        durationMins: 60,
        address: args.address,
        city: args.city,
        zip: args.zip,
        guests: args.guests,
        eventType: args.eventType,
        notes: "Booked via AI Chat Assistant",
        totalAmount: 0, // Will be set by admin review
      },
    });

    return { success: true, bookingNumber };
  } catch (error: any) {
    console.error("AI Booking Error:", error);
    return { success: false, error: error.message };
  }
}

export async function POST(req: NextRequest) {
  try {
    const { messages } = await req.json();

    let apiUrl = "";
    let apiKey = "";
    let apiModel = "";
    let supportsTools = true;

    if (process.env.OPENAI_API_KEY) {
      apiUrl = "https://api.openai.com/v1/chat/completions";
      apiKey = process.env.OPENAI_API_KEY;
      apiModel = "gpt-4o-mini";
    } else if (process.env.OPENROUTER_API_KEY) {
      apiUrl = "https://openrouter.ai/api/v1/chat/completions";
      apiKey = process.env.OPENROUTER_API_KEY;
      // Use gpt-4o-mini through OpenRouter for reliable tool calling
      apiModel = "openai/gpt-4o-mini";
    } else if (process.env.GROQ_API_KEY) {
      apiUrl = "https://api.groq.com/openai/v1/chat/completions";
      apiKey = process.env.GROQ_API_KEY;
      apiModel = "llama-3.1-70b-versatile";
      supportsTools = false; // Groq Llama doesn't reliably support tools
    } else {
      return new Response("No AI provider configured", { status: 503 });
    }

    const headers = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKey}`,
    };

    // Build request body
    const requestBody: any = {
      model: apiModel,
      messages: [{ role: "system", content: SYSTEM_PROMPT }, ...messages],
      temperature: 0.5,
    };

    if (supportsTools) {
      requestBody.tools = [BOOKING_TOOL];
      requestBody.tool_choice = "auto";
    }

    const aiRes = await fetch(apiUrl, {
      method: "POST",
      headers,
      body: JSON.stringify(requestBody),
    });

    if (!aiRes.ok) {
      const errText = await aiRes.text();
      console.error("Chat API Error from Provider:", errText);
      
      // Fallback: try without tools
      const fallbackRes = await fetch(apiUrl, {
        method: "POST",
        headers,
        body: JSON.stringify({
          model: apiModel,
          messages: [{ role: "system", content: SYSTEM_PROMPT }, ...messages],
          temperature: 0.5,
        }),
      });

      if (!fallbackRes.ok) {
        return new Response("An error occurred communicating with the AI service.", { status: 500 });
      }

      const fallbackData = await fallbackRes.json();
      const reply = fallbackData.choices?.[0]?.message?.content ?? "Sorry, I am having trouble responding right now.";
      return Response.json({ text: reply });
    }

    const data = await aiRes.json();
    const choice = data.choices?.[0];
    const message = choice?.message;

    if (!message) {
      return Response.json({ text: "I'm sorry, I couldn't generate a response. Please try again!" });
    }

    // Check if AI wants to call a tool
    if (message.tool_calls && message.tool_calls.length > 0) {
      const toolCall = message.tool_calls[0];
      
      if (toolCall.function?.name === "createBookingRequest") {
        let args;
        try {
          args = JSON.parse(toolCall.function.arguments);
        } catch {
          return Response.json({ text: "I had trouble processing the booking details. Could you please repeat them?" });
        }

        // Return the booking data to the frontend for user confirmation
        return Response.json({
          text: message.content || "Great! I've gathered all your booking details. Please review the summary below and confirm to complete your reservation! 🍦",
          bookingRequest: args,
          toolCallId: toolCall.id,
        });
      }
    }

    // Regular text response — handle empty content
    const reply = message.content || "I'm here to help! Could you tell me more about what you're looking for?";
    return Response.json({ text: reply });
  } catch (error: any) {
    console.error("Chat API Internal Error:", error);
    return new Response(error.message || "An error occurred processing your request.", { status: 500 });
  }
}

// Endpoint for confirming a booking from the chat
export async function PUT(req: NextRequest) {
  try {
    const { bookingData } = await req.json();
    
    if (!bookingData || !bookingData.name || !bookingData.email) {
      return Response.json({ error: "Missing booking data" }, { status: 400 });
    }

    const result = await handleBookingTool(bookingData);
    
    if (result.success) {
      return Response.json({ 
        success: true, 
        bookingNumber: result.bookingNumber,
        message: `Booking #${result.bookingNumber} has been created! Our team will review it and get back to you shortly.`
      });
    } else {
      return Response.json({ error: result.error || "Failed to create booking" }, { status: 500 });
    }
  } catch (error: any) {
    console.error("Booking Confirmation Error:", error);
    return Response.json({ error: "Failed to process booking confirmation" }, { status: 500 });
  }
}
