import { NextRequest, NextResponse } from 'next/server';
import mongoose from 'mongoose';
import { verifyAdminSession } from '@/lib/auth/session';
import { connectToDatabase } from '@/lib/db/mongodb';
import { Education } from '@/models/Education';
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

    const existing = await Education.findById(id);
    if (!existing) {
      return NextResponse.json({ error: 'Education not found' }, { status: 404 });
    }

    if (existing.logoFileId && body.logoFileId && existing.logoFileId.toString() !== body.logoFileId) {
      await deleteGridFSFile(existing.logoFileId).catch(() => null);
    }

    Object.assign(existing, body);
    if (body.startDate) existing.startDate = new Date(body.startDate);
    if (body.endDate) existing.endDate = new Date(body.endDate);

    await existing.save();
    return NextResponse.json({ success: true, education: existing });
  } catch (error: unknown) {
    const errorMsg = error instanceof Error ? error.message : 'Failed to update education';
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
    const education = await Education.findByIdAndDelete(id);
    if (!education) {
      return NextResponse.json({ error: 'Education not found' }, { status: 404 });
    }

    if (education.logoFileId) {
      await deleteGridFSFile(education.logoFileId).catch(() => null);
    }

    return NextResponse.json({ success: true, message: 'Education record deleted' });
  } catch (error: unknown) {
    const errorMsg = error instanceof Error ? error.message : 'Failed to delete education';
    return NextResponse.json({ error: errorMsg }, { status: 500 });
  }
}
