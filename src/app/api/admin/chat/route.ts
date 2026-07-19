import { NextRequest } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { requirePermission } from "@/lib/rbac";

const SYSTEM_PROMPT = `You are the WE Ice Cream Truck Admin AI — a powerful, precise assistant for business operations.
You have access to live business data. Answer concisely and accurately.

SECURITY RULES:
1. You are only assisting authenticated staff/admins.
2. Provide exact data. Do not guess or hallucinate.
3. Format numbers clearly (e.g. $1,000.00).`;

export async function POST(req: NextRequest) {
  try {
    const auth = await requirePermission(req, "dashboard.view");
    if (!auth.success) {
      return Response.json({ reply: "Unauthorized access: You lack the required permissions to use AI." }, { status: 403 });
    }
    const session = await getServerSession(authOptions);

    const { messages, conversationId } = await req.json();
    const lastMessage = messages?.[messages.length - 1]?.content ?? "";

    if (!process.env.OPENAI_API_KEY && !process.env.GROQ_API_KEY && !process.env.OPENROUTER_API_KEY) {
      return Response.json({
        reply: "AI service is not configured. Please add OPENAI_API_KEY or GROQ_API_KEY to your environment variables.",
      });
    }

    // Fetch relevant DB data based on the query to inject as context
    let dbContext = "";
    try {
      const lower = lastMessage.toLowerCase();

      if (lower.includes("booking") || lower.includes("pending") || lower.includes("approved") || lower.includes("حجز") || lower.includes("مواعيد")) {
        const bookings = await prisma.booking.findMany({
          take: 10,
          orderBy: { createdAt: "desc" },
          include: {
            customer: { select: { firstName: true, lastName: true, email: true } },
            package: { select: { name: true } },
            quote: { select: { totalAmount: true } },
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
            totalAmount: b.quote?.totalAmount,
            createdAt: b.createdAt,
          })),
          null,
          2
        )}`;
      }

      if (lower.includes("customer") || lower.includes("عميل") || lower.includes("عملاء") || lower.includes("زبون") || lower.includes("زبائن")) {
        const customers = await prisma.customer.findMany({
          take: 10,
          orderBy: { createdAt: "desc" },
          select: { id: true, firstName: true, lastName: true, email: true, phone: true, createdAt: true },
        });
        dbContext += `\n\nLIVE CUSTOMERS DATA (latest 10):\n${JSON.stringify(customers, null, 2)}`;
      }

      if (lower.includes("package") || lower.includes("بكج") || lower.includes("باقات") || lower.includes("عرض")) {
        const packages = await prisma.package.findMany({
          where: { isActive: true },
          orderBy: { sortOrder: "asc" },
          select: { name: true, price: true, servings: true, durationMins: true, isActive: true },
        });
        dbContext += `\n\nLIVE PACKAGES DATA:\n${JSON.stringify(packages, null, 2)}`;
      }

      if (lower.includes("setting") || lower.includes("config") || lower.includes("business hours") || lower.includes("seo") || lower.includes("اعدادات") || lower.includes("إعدادات") || lower.includes("نظام")) {
        const settings = await prisma.setting.findMany();
        const settingsDict = settings.reduce((acc: any, s) => { acc[s.key] = s.value; return acc; }, {});
        dbContext += `\n\nLIVE APP SETTINGS:\n${JSON.stringify(settingsDict, null, 2)}`;
      }
    } catch (dbErr) {
      console.warn("DB context fetch error:", dbErr);
      dbContext = "\n\n[Note: Could not fetch live DB data at this time]";
    }

    const systemWithContext = SYSTEM_PROMPT + dbContext;

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
      apiModel = "llama-3.3-70b-versatile";
    } else {
      return Response.json({ reply: "No AI service configured." });
    }

    const aiRes = await fetch(apiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: apiModel,
        messages: [
          { role: "system", content: systemWithContext },
          ...messages,
        ],
        temperature: 0.2,
      }),
    });

    if (!aiRes.ok) {
      const errText = await aiRes.text();
      console.error("Admin AI Error:", errText);
      return Response.json({ reply: `AI API Error: ${aiRes.status}` });
    }

    const data = await aiRes.json();
    const reply = data.choices?.[0]?.message?.content ?? "No response.";

    // Persist messages to DB if conversationId provided
    if (conversationId) {
      try {
        const userMsg = messages[messages.length - 1];
        await prisma.message.createMany({
          data: [
            { conversationId, role: "user", content: userMsg.content },
            { conversationId, role: "assistant", content: reply },
          ],
        });
        await prisma.conversation.update({
          where: { id: conversationId },
          data: { updatedAt: new Date() },
        });
      } catch (dbErr) {
        console.warn("Failed to persist messages:", dbErr);
      }
    }

    return Response.json({ reply });
  } catch (error) {
    console.error("Admin AI Chat API Error:", error);
    return new Response("An error occurred processing your request.", { status: 500 });
  }
}
