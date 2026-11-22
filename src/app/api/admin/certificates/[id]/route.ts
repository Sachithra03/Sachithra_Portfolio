import { NextRequest, NextResponse } from 'next/server';
import mongoose from 'mongoose';
import { verifyAdminSession } from '@/lib/auth/session';
import { connectToDatabase } from '@/lib/db/mongodb';
import { Certificate } from '@/models/Certificate';
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

    const existing = await Certificate.findById(id);
    if (!existing) {
      return NextResponse.json({ error: 'Certificate not found' }, { status: 404 });
    }

    // Clean up replaced images/PDFs
    if (existing.coverImageId && body.coverImageId && existing.coverImageId.toString() !== body.coverImageId) {
      await deleteGridFSFile(existing.coverImageId).catch(() => null);
    }
    if (existing.fileId && body.fileId && existing.fileId.toString() !== body.fileId) {
      await deleteGridFSFile(existing.fileId).catch(() => null);
    }

    Object.assign(existing, body);
    if (body.issueDate) {
      existing.issueDate = new Date(body.issueDate);
    }

    await existing.save();
    return NextResponse.json({ success: true, certificate: existing });
  } catch (error: unknown) {
    const errorMsg = error instanceof Error ? error.message : 'Failed to update certificate';
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
    const certificate = await Certificate.findByIdAndDelete(id);
    if (!certificate) {
      return NextResponse.json({ error: 'Certificate not found' }, { status: 404 });
    }

    if (certificate.coverImageId) {
      await deleteGridFSFile(certificate.coverImageId).catch(() => null);
    }
    if (certificate.fileId) {
      await deleteGridFSFile(certificate.fileId).catch(() => null);
    }

    return NextResponse.json({ success: true, message: 'Certificate and files deleted' });
  } catch (error: unknown) {
    const errorMsg = error instanceof Error ? error.message : 'Failed to delete certificate';
    return NextResponse.json({ error: errorMsg }, { status: 500 });
  }
}
