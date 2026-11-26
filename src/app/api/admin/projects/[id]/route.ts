import { NextRequest, NextResponse } from 'next/server';
import mongoose from 'mongoose';
import { verifyAdminSession } from '@/lib/auth/session';
import { connectToDatabase } from '@/lib/db/mongodb';
import { Project } from '@/models/Project';
import { deleteGridFSFile } from '@/lib/storage/gridfs';

export const dynamic = 'force-dynamic';

export async function GET(
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
    const project = await Project.findById(id);
    if (!project) {
      return NextResponse.json({ error: 'Project not found' }, { status: 404 });
    }

    return NextResponse.json({ success: true, project });
  } catch (error: unknown) {
    const errorMsg = error instanceof Error ? error.message : 'Error retrieving project';
    return NextResponse.json({ error: errorMsg }, { status: 500 });
  }
}

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

    const existing = await Project.findById(id);
    if (!existing) {
      return NextResponse.json({ error: 'Project not found' }, { status: 404 });
    }

    // If coverImageId changed, purge previous orphaned GridFS file
    if (
      existing.coverImageId &&
      body.coverImageId &&
      existing.coverImageId.toString() !== body.coverImageId
    ) {
      await deleteGridFSFile(existing.coverImageId).catch(() => null);
    }

    Object.assign(existing, body);
    if (body.slug) {
      existing.slug = body.slug.toLowerCase().trim();
    }

    await existing.save();

    return NextResponse.json({ success: true, project: existing });
  } catch (error: unknown) {
    const errorMsg = error instanceof Error ? error.message : 'Failed to update project';
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
    const project = await Project.findByIdAndDelete(id);
    if (!project) {
      return NextResponse.json({ error: 'Project not found' }, { status: 404 });
    }

    // Cascading deletion of associated GridFS files
    if (project.coverImageId) {
      await deleteGridFSFile(project.coverImageId).catch(() => null);
    }
    if (project.galleryImageIds && project.galleryImageIds.length > 0) {
      for (const galleryId of project.galleryImageIds) {
        await deleteGridFSFile(galleryId).catch(() => null);
      }
    }

    return NextResponse.json({ success: true, message: 'Project and media deleted' });
  } catch (error: unknown) {
    const errorMsg = error instanceof Error ? error.message : 'Failed to delete project';
    return NextResponse.json({ error: errorMsg }, { status: 500 });
  }
}
