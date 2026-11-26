import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

export async function GET() {
  return NextResponse.json({
    serviceId: process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID || 'service_0o4otsc',
    templateId: process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID || 'template_fjv9ivl',
    publicKey: process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY || 'kLqZck-2vG2bSXG9I',
  });
}
