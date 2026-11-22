import { NextRequest, NextResponse } from 'next/server';
import { verifyAdminSession } from '@/lib/auth/session';
import { connectToDatabase } from '@/lib/db/mongodb';
import { Education } from '@/models/Education';
import { z } from 'zod';

export const dynamic = 'force-dynamic';

const EducationSchema = z.object({
  institution: z.string().min(1, 'Institution is required'),
  degree: z.string().min(1, 'Degree is required'),
  fieldOfStudy: z.string().min(1, 'Field of study is required'),
  startDate: z.string().or(z.date()),
  endDate: z.string().or(z.date()).optional().nullable(),
  current: z.boolean().default(false),
  grade: z.string().optional(),
  description: z.string().min(1, 'Description is required'),
  achievements: z.array(z.string()).default([]),
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
    const educations = await Education.find().sort({ order: 1, startDate: -1 });
    return NextResponse.json({ success: true, educations });
  } catch (error: unknown) {
    const errorMsg = error instanceof Error ? error.message : 'Failed to fetch education';
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
    const parsed = EducationSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json({ error: parsed.error.format() }, { status: 400 });
    }

    await connectToDatabase();

    const education = await Education.create({
      ...parsed.data,
      startDate: new Date(parsed.data.startDate),
      endDate: parsed.data.endDate ? new Date(parsed.data.endDate) : undefined,
    });

    return NextResponse.json({ success: true, education }, { status: 201 });
  } catch (error: unknown) {
    const errorMsg = error instanceof Error ? error.message : 'Failed to create education record';
    return NextResponse.json({ error: errorMsg }, { status: 500 });
  }
}
