import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { sendContactMessageNotification } from '@/lib/email';

export async function POST(request: Request) {
  try {
    const body = await request.json();

    if (!body.firstName || !body.email || !body.message) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    const messageData = {
      name: `${body.firstName} ${body.lastName || ''}`.trim(),
      email: body.email,
      message: body.message
    };
    
    await sendContactMessageNotification(messageData);

    return NextResponse.json({ success: true, messageId: 'msg-' + Date.now() });
  } catch (error) {
    console.error('Error processing contact message:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
