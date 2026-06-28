import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function POST(request: Request) {
  try {
    const body = await request.json();

    // Basic validation
    if (!body.firstName || !body.email || !body.phone || !body.eventType) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Mocking the database save since Prisma engines failed to download
    // const quote = await prisma.quoteRequest.create({
    //   data: {
    //     eventType: body.eventType,
    //     guestCount: body.guestCount || '',
    //     date: body.date || '',
    //     time: body.time || '',
    //     city: body.city || '',
    //     packageId: body.packageId || '',
    //     firstName: body.firstName,
    //     lastName: body.lastName || '',
    //     email: body.email,
    //     phone: body.phone,
    //     notes: body.notes || '',
    //     status: 'PENDING',
    //   },
    // });

    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 800));

    return NextResponse.json({ success: true, quoteId: 'mock-id-123' });
  } catch (error) {
    console.error('Error processing quote request:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
