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
    const errorMsg = error instanceof Error ? error.message : 'Failed to fetch experience';
    return NextResponse.json({ error: errorMsg }, { status: 500 });
  }
}
