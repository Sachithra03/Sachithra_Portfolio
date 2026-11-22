import { NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/db/mongodb';
import { Note } from '@/models/Note';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    await connectToDatabase();
    const notes = await Note.find({ published: true }).sort({ publishedAt: -1, createdAt: -1 });
    return NextResponse.json({ success: true, notes });
  } catch (error: unknown) {
    const errorMsg = error instanceof Error ? error.message : 'Failed to fetch notes';
    return NextResponse.json({ error: errorMsg }, { status: 500 });
  }
}
