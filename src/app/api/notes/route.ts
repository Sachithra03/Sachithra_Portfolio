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
    console.error('[Public API] Failed to fetch notes:', error);
    return NextResponse.json({ error: 'Failed to load notes' }, { status: 500 });
  }
}
