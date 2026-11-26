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
    console.error('[Public API] Failed to fetch social links:', error);
    return NextResponse.json({ error: 'Failed to load social links' }, { status: 500 });
  }
}
