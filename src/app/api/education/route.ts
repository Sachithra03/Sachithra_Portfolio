import { NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/db/mongodb';
import { Education } from '@/models/Education';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    await connectToDatabase();
    const educations = await Education.find().sort({ order: 1, startDate: -1 });
    return NextResponse.json({ success: true, educations });
  } catch (error: unknown) {
    const errorMsg = error instanceof Error ? error.message : 'Failed to fetch education';
    return NextResponse.json({ error: errorMsg }, { status: 500 });
  }
}
