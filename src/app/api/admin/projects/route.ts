import { NextRequest, NextResponse } from 'next/server';
import { verifyAdminSession } from '@/lib/auth/session';
import { connectToDatabase } from '@/lib/db/mongodb';
import { Project } from '@/models/Project';
import { z } from 'zod';

export const dynamic = 'force-dynamic';

const ProjectSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  slug: z.string().min(1, 'Slug is required'),
  description: z.string().min(1, 'Description is required'),
  longDescription: z.string().optional(),
  coverImageId: z.string().optional().nullable(),
  galleryImageIds: z.array(z.string()).optional(),
  technologies: z.array(z.string()).default([]),
  githubUrl: z.string().url().or(z.literal('')).optional(),
  liveUrl: z.string().url().or(z.literal('')).optional(),
  status: z.enum(['completed', 'in-progress', 'archived']).default('completed'),
  featured: z.boolean().default(false),
  order: z.number().default(0),
});

export async function GET(req: NextRequest) {
  try {
    const session = await verifyAdminSession(req);
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    await connectToDatabase();
    const projects = await Project.find().sort({ order: 1, createdAt: -1 });
    return NextResponse.json({ success: true, projects });
  } catch (error: unknown) {
    const errorMsg = error instanceof Error ? error.message : 'Failed to fetch projects';
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
    const parsed = ProjectSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json({ error: parsed.error.format() }, { status: 400 });
    }

    await connectToDatabase();

    // Check slug uniqueness
    const existing = await Project.findOne({ slug: parsed.data.slug.toLowerCase() });
    if (existing) {
      return NextResponse.json(
        { error: 'A project with this slug already exists' },
        { status: 409 }
      );
    }

    const project = await Project.create({
      ...parsed.data,
      slug: parsed.data.slug.toLowerCase().trim(),
    });

    return NextResponse.json({ success: true, project }, { status: 201 });
  } catch (error: unknown) {
    const errorMsg = error instanceof Error ? error.message : 'Failed to create project';
    return NextResponse.json({ error: errorMsg }, { status: 500 });
  }
}
