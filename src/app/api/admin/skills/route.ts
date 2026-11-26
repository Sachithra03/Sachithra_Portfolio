import { NextRequest, NextResponse } from 'next/server';
import { verifyAdminSession } from '@/lib/auth/session';
import { connectToDatabase } from '@/lib/db/mongodb';
import { Skill } from '@/models/Skill';
import { z } from 'zod';

export const dynamic = 'force-dynamic';

const SkillSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  category: z.enum(['Frontend', 'Backend', 'Mobile', 'Cloud & DevOps', 'Database', 'Tools']),
  proficiency: z.number().min(0).max(100).default(85),
  iconName: z.string().optional(),
  order: z.number().default(0),
});

export async function GET(req: NextRequest) {
  try {
    const session = await verifyAdminSession(req);
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    await connectToDatabase();
    const skills = await Skill.find().sort({ category: 1, order: 1 });
    return NextResponse.json({ success: true, skills });
  } catch (error: unknown) {
    const errorMsg = error instanceof Error ? error.message : 'Failed to fetch skills';
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
    const parsed = SkillSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json({ error: parsed.error.format() }, { status: 400 });
    }

    await connectToDatabase();
    const skill = await Skill.create(parsed.data);
    return NextResponse.json({ success: true, skill }, { status: 201 });
  } catch (error: unknown) {
    const errorMsg = error instanceof Error ? error.message : 'Failed to create skill';
    return NextResponse.json({ error: errorMsg }, { status: 500 });
  }
}
