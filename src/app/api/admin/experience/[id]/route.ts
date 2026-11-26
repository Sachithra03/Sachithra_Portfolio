import { NextRequest, NextResponse } from 'next/server';
import mongoose from 'mongoose';
import { verifyAdminSession } from '@/lib/auth/session';
import { connectToDatabase } from '@/lib/db/mongodb';
import { Experience } from '@/models/Experience';
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

    const existing = await Experience.findById(id);
    if (!existing) {
      return NextResponse.json({ error: 'Experience not found' }, { status: 404 });
    }

    if (existing.logoFileId && body.logoFileId && existing.logoFileId.toString() !== body.logoFileId) {
      await deleteGridFSFile(existing.logoFileId).catch(() => null);
    }

    Object.assign(existing, body);
    if (body.startDate) existing.startDate = new Date(body.startDate);
    if (body.endDate) existing.endDate = new Date(body.endDate);
    if (body.isVisible !== undefined) existing.isVisible = Boolean(body.isVisible);

    await existing.save();
    return NextResponse.json({ success: true, experience: existing });
  } catch (error: unknown) {
    const errorMsg = error instanceof Error ? error.message : 'Failed to update experience';
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
    const experience = await Experience.findByIdAndDelete(id);
    if (!experience) {
      return NextResponse.json({ error: 'Experience not found' }, { status: 404 });
    }

    if (experience.logoFileId) {
      await deleteGridFSFile(experience.logoFileId).catch(() => null);
    }

    return NextResponse.json({ success: true, message: 'Experience record deleted' });
  } catch (error: unknown) {
    const errorMsg = error instanceof Error ? error.message : 'Failed to delete experience';
    return NextResponse.json({ error: errorMsg }, { status: 500 });
  }
}
