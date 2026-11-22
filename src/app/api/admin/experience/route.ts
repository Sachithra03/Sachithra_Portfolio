import { NextRequest, NextResponse } from 'next/server';
import { verifyAdminSession } from '@/lib/auth/session';
import { connectToDatabase } from '@/lib/db/mongodb';
import { Experience } from '@/models/Experience';
import { z } from 'zod';

export const dynamic = 'force-dynamic';

const ExperienceSchema = z.object({
  company: z.string().min(1, 'Company is required'),
  role: z.string().min(1, 'Role is required'),
  location: z.string().min(1, 'Location is required'),
  employmentType: z.enum(['full-time', 'part-time', 'internship', 'contract', 'freelance']).default('full-time'),
  startDate: z.string().or(z.date()),
  endDate: z.string().or(z.date()).optional().nullable(),
  current: z.boolean().default(false),
  description: z.string().min(1, 'Description is required'),
  achievements: z.array(z.string()).default([]),
  technologies: z.array(z.string()).default([]),
  logoFileId: z.string().optional().nullable(),
  order: z.number().default(0),
});

export async function GET(req: NextRequest) {
  try {
    const session = await verifyAdminSession(req);
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    await connectToDatabase();
    const experiences = await Experience.find().sort({ order: 1, startDate: -1 });
    return NextResponse.json({ success: true, experiences });
  } catch (error: unknown) {
    const errorMsg = error instanceof Error ? error.message : 'Failed to fetch experience';
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
    const parsed = ExperienceSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json({ error: parsed.error.format() }, { status: 400 });
    }

    await connectToDatabase();

    const experience = await Experience.create({
      ...parsed.data,
      startDate: new Date(parsed.data.startDate),
      endDate: parsed.data.endDate ? new Date(parsed.data.endDate) : undefined,
    });

    return NextResponse.json({ success: true, experience }, { status: 201 });
  } catch (error: unknown) {
    const errorMsg = error instanceof Error ? error.message : 'Failed to create experience';
    return NextResponse.json({ error: errorMsg }, { status: 500 });
  }
}
