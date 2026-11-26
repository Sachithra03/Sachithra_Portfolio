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
    console.error('[Public API] Failed to fetch skills:', error);
    return NextResponse.json({ error: 'Failed to load skills' }, { status: 500 });
  }
}
