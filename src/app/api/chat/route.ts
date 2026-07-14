import { NextRequest } from "next/server";
import { BUSINESS_CONFIG } from "@/lib/config";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import zipcodes from "zipcodes";

async function calculateDistance(zip: string): Promise<number> {
  const ORIGIN_ZIP = "02151";
  const ORIGIN_LAT = 42.4084;
  const ORIGIN_LNG = -70.9996;
  
  const lookup = zipcodes.lookup(zip);
  if (!lookup) throw new Error("Invalid ZIP code");

  const googleKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;
  if (googleKey) {
    try {
      const routeRes = await fetch(
        `https://maps.googleapis.com/maps/api/distancematrix/json?origins=${ORIGIN_LAT},${ORIGIN_LNG}&destinations=${lookup.latitude},${lookup.longitude}&units=imperial&key=${googleKey}`
      );
      const routeData = await routeRes.json();
      if (routeData.status === "OK" && routeData.rows[0].elements[0].status === "OK") {
        const distanceMeters = routeData.rows[0].elements[0].distance.value;
        return Math.round((distanceMeters * 0.000621371) * 10) / 10;
      }
    } catch (e) {
      console.warn("Google Maps fallback", e);
    }
  }
  return Math.round(zipcodes.distance(ORIGIN_ZIP, zip) * 10) / 10;
}

const DISTANCE_TOOL = {
  type: "function" as const,
  function: {
    name: "calculateDistance",
    description: "Calculate the exact driving distance in miles from our garage to the event ZIP code. Use this to determine travel fees.",
    parameters: {
      type: "object",
      properties: {
        zip: { type: "string", description: "The 5-digit ZIP code of the event" }
      },
      required: ["zip"],
    },
  },
};

const BOOKING_TOOL = {
  type: "function" as const,
  function: {
    name: "createBookingRequest",
    description: "Create a new booking request when the customer has provided all required details AND they are logged in.",
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
    const session = await getServerSession(authOptions);
    
    let userState = "User Status: LOGGED OUT. The user is currently browsing as a guest.";
    if (session && session.user) {
      userState = `User Status: LOGGED IN. User Name: ${session.user.name}, Email: ${session.user.email}, Role: ${(session.user as any).role}.`;
    }

    const SYSTEM_PROMPT = `You are the WE Ice Cream Truck AI Concierge — a helpful, warm, and professional assistant for ${BUSINESS_CONFIG.name}.

Your role is to help customers learn about our services, packages, and pricing, and to guide them toward booking an ice cream truck.

${userState}

## About Us
- Company: ${BUSINESS_CONFIG.name}
- Tagline: "${BUSINESS_CONFIG.tagline}"
- Location: ${BUSINESS_CONFIG.address.display}
- Contact: ${BUSINESS_CONFIG.contact.phone1}

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

## Complex Pricing Rules
- **Base Price**: From the package selected above.
- **Multiple Stops / Routine**: Sequential stops add $50 fee per extra stop. Simultaneous operations at multiple locations add $200.
- **Multiple Trucks**: If they request multiple vehicles (e.g. 2 trucks) or have >150 guests requiring multiple vehicles, add a $200 setup/dispatch fee per extra vehicle.
- **Travel Fee**: First 10 miles are FREE. Each additional mile is $2.50. You MUST use the calculateDistance tool to get the exact distance using their ZIP code.
- **Weekend Surcharge**: Events on Saturday or Sunday add $25.
- **Extra Service Time**: $35 per additional 30-minute block beyond the included time.
- **Extra Guests**: Each extra guest beyond the package limit is $5.

## Booking via Chat - CRITICAL RULES
1. If the User Status is LOGGED OUT: You CANNOT book for them. You must tell them: "To proceed with booking, please Sign In or Create an Account using the button at the top of the page." Do NOT call the createBookingRequest tool if they are logged out.
2. If the User Status is LOGGED IN: You can proceed to gather booking details. Ask for any missing info:
   - Phone number
   - Event date (YYYY-MM-DD format)
   - Start time (e.g., 2:00 PM)
   - Event type
   - Which package they want
   - Event address, city, and ZIP code
   - Estimated number of guests
3. Once you have ALL the details, calculate the total estimated price (including distance fee if applicable), summarize it for them, and call the createBookingRequest tool.

## Tone & Style
- Be warm, enthusiastic, and helpful. Keep responses concise.`;

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
      apiModel = "openai/gpt-4o-mini";
    } else {
      return new Response("No AI provider configured", { status: 503 });
    }

    const headers = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKey}`,
    };

    let chatMessages = [{ role: "system", content: SYSTEM_PROMPT }, ...messages];

    // Build request body
    const requestBody: any = {
      model: apiModel,
      messages: chatMessages,
      temperature: 0.5,
      tools: [BOOKING_TOOL, DISTANCE_TOOL],
      tool_choice: "auto",
    };

    const aiRes = await fetch(apiUrl, { method: "POST", headers, body: JSON.stringify(requestBody) });

    if (!aiRes.ok) {
      return Response.json({ text: "Sorry, I am having trouble responding right now." });
    }

    const data = await aiRes.json();
    const choice = data.choices?.[0];
    let message = choice?.message;

    if (!message) {
      return Response.json({ text: "I'm sorry, I couldn't generate a response. Please try again!" });
    }

    // Handle Tools Loop (1 depth max for distance)
    if (message.tool_calls && message.tool_calls.length > 0) {
      const toolCall = message.tool_calls[0];
      
      // Handle Distance Calculation Tool
      if (toolCall.function?.name === "calculateDistance") {
        let zip = "";
        try {
          zip = JSON.parse(toolCall.function.arguments).zip;
        } catch { /* ignore */ }

        let distanceMiles = 0;
        if (zip) {
          try {
            distanceMiles = await calculateDistance(zip);
          } catch (e) { console.error("Distance tool error", e); }
        }

        chatMessages.push(message);
        chatMessages.push({
          role: "tool",
          tool_call_id: toolCall.id,
          name: toolCall.function.name,
          content: JSON.stringify({ distanceMiles, freeMiles: 10, additionalMileCost: 2.50 })
        });

        // Call AI again with the distance result
        const aiRes2 = await fetch(apiUrl, {
          method: "POST",
          headers,
          body: JSON.stringify({
            model: apiModel,
            messages: chatMessages,
            temperature: 0.5,
            tools: [BOOKING_TOOL], // Only booking tool allowed on second pass
          }),
        });

        const data2 = await aiRes2.json();
        message = data2.choices?.[0]?.message;
      }

      // Handle Booking Tool
      if (message?.tool_calls && message.tool_calls[0].function?.name === "createBookingRequest") {
        const finalToolCall = message.tool_calls[0];
        let args;
        try {
          args = JSON.parse(finalToolCall.function.arguments);
        } catch {
          return Response.json({ text: "I had trouble processing the booking details. Could you please repeat them?" });
        }

        return Response.json({
          text: message.content || "Great! I've gathered all your booking details. Please review the summary below and confirm to complete your reservation! 🍦",
          bookingRequest: args,
          toolCallId: finalToolCall.id,
        });
      }
    }

    // Regular text response
    const reply = message?.content || "I'm here to help! Could you tell me more about what you're looking for?";
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
