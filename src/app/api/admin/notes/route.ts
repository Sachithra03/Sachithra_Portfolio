import { NextRequest, NextResponse } from 'next/server';
import { verifyAdminSession } from '@/lib/auth/session';
import { connectToDatabase } from '@/lib/db/mongodb';
import { Note } from '@/models/Note';
import { z } from 'zod';

export const dynamic = 'force-dynamic';

const NoteSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  slug: z.string().min(1, 'Slug is required'),
  summary: z.string().min(1, 'Summary is required'),
  content: z.string().min(1, 'Content is required'),
  tags: z.array(z.string()).default([]),
  published: z.boolean().default(false),
  coverImageId: z.string().optional().nullable(),
  readTimeMinutes: z.number().default(3),
  publishedAt: z.string().or(z.date()).optional().nullable(),
});

export async function GET(req: NextRequest) {
  try {
    const session = await verifyAdminSession(req);
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    await connectToDatabase();
    const notes = await Note.find().sort({ createdAt: -1 });
    return NextResponse.json({ success: true, notes });
  } catch (error: unknown) {
    const errorMsg = error instanceof Error ? error.message : 'Failed to fetch notes';
    return NextResponse.json({ error: errorMsg }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const session = await verifyAdminSession(req);
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await req.json();
    const parsed = NoteSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json({ error: parsed.error.format() }, { status: 400 });
    }

    await connectToDatabase();

    const existing = await Note.findOne({ slug: parsed.data.slug.toLowerCase().trim() });
    if (existing) {
      return NextResponse.json({ error: 'A note with this slug already exists' }, { status: 409 });
    }

    const note = await Note.create({
      ...parsed.data,
      slug: parsed.data.slug.toLowerCase().trim(),
      publishedAt: parsed.data.published && !parsed.data.publishedAt ? new Date() : parsed.data.publishedAt,
    });

    return NextResponse.json({ success: true, note }, { status: 201 });
  } catch (error: unknown) {
    const errorMsg = error instanceof Error ? error.message : 'Failed to create note';
    return NextResponse.json({ error: errorMsg }, { status: 500 });
  }
}
