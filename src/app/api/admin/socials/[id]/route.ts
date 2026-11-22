import { NextRequest, NextResponse } from 'next/server';
import mongoose from 'mongoose';
import { verifyAdminSession } from '@/lib/auth/session';
import { connectToDatabase } from '@/lib/db/mongodb';
import { SocialLink } from '@/models/SocialLink';

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

    const social = await SocialLink.findByIdAndUpdate(id, body, { new: true });
    if (!social) {
      return NextResponse.json({ error: 'Social link not found' }, { status: 404 });
    }

    return NextResponse.json({ success: true, social });
  } catch (error: unknown) {
    const errorMsg = error instanceof Error ? error.message : 'Failed to update social link';
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
    const social = await SocialLink.findByIdAndDelete(id);
    if (!social) {
      return NextResponse.json({ error: 'Social link not found' }, { status: 404 });
    }

    return NextResponse.json({ success: true, message: 'Social link deleted' });
  } catch (error: unknown) {
    const errorMsg = error instanceof Error ? error.message : 'Failed to delete social link';
    return NextResponse.json({ error: errorMsg }, { status: 500 });
  }
}
