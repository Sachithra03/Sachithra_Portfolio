import { NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/db/mongodb';
import { Profile } from '@/models/Profile';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    await connectToDatabase();
    const profile = await Profile.findOne();
    return NextResponse.json({ success: true, profile });
  } catch (error: unknown) {
    const errorMsg = error instanceof Error ? error.message : 'Failed to fetch profile';
    return NextResponse.json({ error: errorMsg }, { status: 500 });
  }
}
