import { NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";
import { prisma } from "@/lib/prisma";

const SYSTEM_PROMPT = `You are the WE Ice Cream Truck Admin AI — a powerful, precise assistant for business operations.
You have access to live business data. Answer concisely and accurately.

SECURITY RULES:
1. You are only assisting authenticated staff/admins.
2. Provide exact data. Do not guess or hallucinate.
3. Format numbers clearly (e.g. $1,000.00).`;

export async function POST(req: NextRequest) {
  try {
    const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
    if (!token || !token.id) {
      return new Response("Unauthorized", { status: 401 });
    }

    const { messages } = await req.json();
    const lastMessage = messages?.[messages.length - 1]?.content ?? "";

    if (!process.env.OPENAI_API_KEY && !process.env.GROQ_API_KEY) {
      return Response.json({
        reply: "AI service is not configured. Please add OPENAI_API_KEY or GROQ_API_KEY to your environment variables.",
      });
    }

    // Fetch relevant DB data based on the query to inject as context
    let dbContext = "";
    try {
      const lower = lastMessage.toLowerCase();

      if (lower.includes("booking") || lower.includes("pending") || lower.includes("approved")) {
        const bookings = await prisma.booking.findMany({
          take: 10,
          orderBy: { createdAt: "desc" },
          include: {
            customer: { select: { firstName: true, lastName: true, email: true } },
            package: { select: { name: true } },
          },
        });
        dbContext = `\n\nLIVE BOOKINGS DATA (latest 10):\n${JSON.stringify(
          bookings.map((b) => ({
            id: b.id.slice(0, 8),
            customer: b.customer ? `${b.customer.firstName} ${b.customer.lastName}` : null,
            email: b.customer?.email,
            package: b.package?.name,
            status: b.status,
            eventDate: b.eventDate,
            guests: b.guests,
            totalAmount: b.totalAmount,
            createdAt: b.createdAt,
          })),
          null,
          2
        )}`;
      }

      if (lower.includes("customer")) {
        const customers = await prisma.customer.findMany({
          take: 10,
          orderBy: { createdAt: "desc" },
          select: { id: true, firstName: true, lastName: true, email: true, phone: true, createdAt: true },
        });
        dbContext += `\n\nLIVE CUSTOMERS DATA (latest 10):\n${JSON.stringify(customers, null, 2)}`;
      }

      if (lower.includes("package")) {
        const packages = await prisma.package.findMany({
          where: { isActive: true },
          orderBy: { sortOrder: "asc" },
          select: { name: true, price: true, servings: true, durationMins: true, isActive: true },
        });
        dbContext += `\n\nLIVE PACKAGES DATA:\n${JSON.stringify(packages, null, 2)}`;
      }
    } catch (dbErr) {
      console.warn("DB context fetch error:", dbErr);
      dbContext = "\n\n[Note: Could not fetch live DB data at this time]";
    }

    // Build system prompt with injected DB context
    const systemWithContext = SYSTEM_PROMPT + dbContext;

    // Use Groq (free) as AI provider for admin chat
    const groqKey = process.env.GROQ_API_KEY;
    if (!groqKey) {
      return Response.json({ reply: "GROQ_API_KEY not set. Cannot run Admin AI." });
    }

    const groqRes = await fetch("https://api.groq.com/openai/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${groqKey}`,
      },
      body: JSON.stringify({
        model: "llama-3.1-70b-versatile",
        messages: [
          { role: "system", content: systemWithContext },
          ...messages.slice(-6), // last 6 messages for context
        ],
        max_tokens: 1024,
        temperature: 0.2,
        stream: false,
      }),
    });

    if (!groqRes.ok) {
      const errText = await groqRes.text();
      console.error("Groq API error:", errText);
      throw new Error(`Groq API error: ${groqRes.status}`);
    }

    const groqData = await groqRes.json();
    const reply = groqData.choices?.[0]?.message?.content ?? "No response from AI.";

    return Response.json({ reply });
  } catch (error) {
    console.error("Admin AI Chat API Error:", error);
    return new Response("An error occurred processing your request.", { status: 500 });
  }
}
