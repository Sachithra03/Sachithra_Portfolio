import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

export async function GET() {
  return NextResponse.json({
    serviceId:
      process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID ||
      process.env.EMAILJS_SERVICE_ID ||
      'service_0o4otsc',
    templateId:
      process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID ||
      process.env.EMAILJS_TEMPLATE_ID ||
      '',
    publicKey:
      process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY ||
      process.env.EMAILJS_PUBLIC_KEY ||
      'kLqZck-2vG2bSXG9I',
    recipientEmail: process.env.CONTACT_RECIPIENT_EMAIL || 'sachithrai1003@gmail.com',
  });
}
