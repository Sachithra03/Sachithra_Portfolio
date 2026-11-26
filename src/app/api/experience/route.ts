import { NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/db/mongodb';
import { Experience } from '@/models/Experience';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    await connectToDatabase();
    const experiences = await Experience.find({ isVisible: { $ne: false } }).sort({ order: 1, startDate: -1 });
    return NextResponse.json({ success: true, experiences });
  } catch (error: unknown) {
    console.error('[Public API] Failed to fetch experience:', error);
    return NextResponse.json({ error: 'Failed to load experience' }, { status: 500 });
  }
}
