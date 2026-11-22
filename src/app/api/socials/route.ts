import { NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/db/mongodb';
import { SocialLink } from '@/models/SocialLink';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    await connectToDatabase();
    const socials = await SocialLink.find({ isPublic: true }).sort({ order: 1 });
    return NextResponse.json({ success: true, socials });
  } catch (error: unknown) {
    const errorMsg = error instanceof Error ? error.message : 'Failed to fetch social links';
    return NextResponse.json({ error: errorMsg }, { status: 500 });
  }
}
