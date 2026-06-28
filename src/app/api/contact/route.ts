import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function POST(request: Request) {
  try {
    const body = await request.json();

    if (!body.firstName || !body.email || !body.message) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Mocking the database save since Prisma engines failed to download
    // const message = await prisma.contactMessage.create({
    //   data: {
    //     firstName: body.firstName,
    //     lastName: body.lastName || '',
    //     email: body.email,
    //     message: body.message,
    //     status: 'UNREAD',
    //   },
    // });

    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 800));

    return NextResponse.json({ success: true, messageId: 'mock-msg-123' });
  } catch (error) {
    console.error('Error processing contact message:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
