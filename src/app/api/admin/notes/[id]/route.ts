import { NextRequest, NextResponse } from 'next/server';
import mongoose from 'mongoose';
import { verifyAdminSession } from '@/lib/auth/session';
import { connectToDatabase } from '@/lib/db/mongodb';
import { Note } from '@/models/Note';
import { deleteGridFSFile } from '@/lib/storage/gridfs';

export const dynamic = 'force-dynamic';

export async function PUT(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await verifyAdminSession(req);
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { id } = params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json({ error: 'Invalid ID' }, { status: 400 });
    }

    const body = await req.json();
    await connectToDatabase();

    const existing = await Note.findById(id);
    if (!existing) {
      return NextResponse.json({ error: 'Note not found' }, { status: 404 });
    }

    if (existing.coverImageId && body.coverImageId && existing.coverImageId.toString() !== body.coverImageId) {
      await deleteGridFSFile(existing.coverImageId).catch(() => null);
    }

    Object.assign(existing, body);
    if (body.slug) existing.slug = body.slug.toLowerCase().trim();
    if (body.published && !existing.publishedAt) existing.publishedAt = new Date();

    await existing.save();
    return NextResponse.json({ success: true, note: existing });
  } catch (error: unknown) {
    const errorMsg = error instanceof Error ? error.message : 'Failed to update note';
    return NextResponse.json({ error: errorMsg }, { status: 500 });
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await verifyAdminSession(req);
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { id } = params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json({ error: 'Invalid ID' }, { status: 400 });
    }

    await connectToDatabase();
    const note = await Note.findByIdAndDelete(id);
    if (!note) {
      return NextResponse.json({ error: 'Note not found' }, { status: 404 });
    }

    if (note.coverImageId) {
      await deleteGridFSFile(note.coverImageId).catch(() => null);
    }

    return NextResponse.json({ success: true, message: 'Note deleted' });
  } catch (error: unknown) {
    const errorMsg = error instanceof Error ? error.message : 'Failed to delete note';
    return NextResponse.json({ error: errorMsg }, { status: 500 });
  }
}
