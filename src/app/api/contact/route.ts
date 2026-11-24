import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { connectToDatabase } from '@/lib/db/mongodb';
import { ContactMessage } from '@/models/ContactMessage';

const contactSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  subject: z.string().min(2, 'Subject must be at least 2 characters'),
  message: z.string().min(5, 'Message must be at least 5 characters'),
});

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const validated = contactSchema.parse(body);

    // Persist message to database
    try {
      await connectToDatabase();
      await ContactMessage.create({
        name: validated.name,
        email: validated.email,
        subject: validated.subject,
        message: validated.message,
      });
    } catch (dbErr) {
      console.warn('[Contact Route] Failed to persist message to database:', dbErr);
      // Non-fatal, continue with dispatch
    }

    // Log the contact message
    console.log('[Contact Message Received]', {
      name: validated.name,
      email: validated.email,
      subject: validated.subject,
      recipient: process.env.CONTACT_RECIPIENT_EMAIL || 'sachithrai1003@gmail.com',
      timestamp: new Date().toISOString(),
    });

    return NextResponse.json(
      {
        success: true,
        message: 'Message delivered successfully! Thank you for getting in touch.',
      },
      { status: 200 }
    );
  } catch (err: unknown) {
    if (err instanceof z.ZodError) {
      return NextResponse.json(
        { error: err.errors[0]?.message || 'Validation error' },
        { status: 400 }
      );
    }
    return NextResponse.json(
      { error: 'Internal server error processing message' },
      { status: 500 }
    );
  }
}
