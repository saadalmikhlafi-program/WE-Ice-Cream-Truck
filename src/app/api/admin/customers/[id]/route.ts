import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requirePermission } from "@/lib/rbac";

export const dynamic = "force-dynamic";

export async function GET(req: Request, { params }: { params: { id: string } }) {
  try {
    const auth = await requirePermission(req, "customers.view");
    if (!auth.success) {
      return NextResponse.json({ success: false, error: auth.error }, { status: auth.status });
    }

    const customer = await prisma.customer.findUnique({
      where: { id: params.id },
      include: {
        bookings: {
          include: {
            package: true,
            quote: true,
          },
          orderBy: { eventDate: "desc" }
        }
      }
    });

    if (!customer) {
      return NextResponse.json({ error: "Customer not found" }, { status: 404 });
    }

    return NextResponse.json(customer);
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch customer details" }, { status: 500 });
  }
}
