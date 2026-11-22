import { NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/db/mongodb';
import { Skill } from '@/models/Skill';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    await connectToDatabase();
    const skills = await Skill.find().sort({ category: 1, order: 1 });
    return NextResponse.json({ success: true, skills });
  } catch (error: unknown) {
    const errorMsg = error instanceof Error ? error.message : 'Failed to fetch skills';
    return NextResponse.json({ error: errorMsg }, { status: 500 });
  }
}
