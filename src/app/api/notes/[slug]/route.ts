import { NextRequest, NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/db/mongodb';
import { Note } from '@/models/Note';

export const dynamic = 'force-dynamic';

export async function GET(
  req: NextRequest,
  { params }: { params: { slug: string } }
) {
  try {
    const { slug } = params;
    await connectToDatabase();

    const note = await Note.findOne({ slug: slug.toLowerCase(), published: true });
    if (!note) {
      return NextResponse.json({ error: 'Note not found' }, { status: 404 });
    }

    return NextResponse.json({ success: true, note });
  } catch (error: unknown) {
    console.error('[Public API] Failed to fetch note:', error);
    return NextResponse.json({ error: 'Failed to load note' }, { status: 500 });
  }
}
