import { NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/db/mongodb';
import { Certificate } from '@/models/Certificate';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    await connectToDatabase();
    const certificates = await Certificate.find().sort({ order: 1, issueDate: -1 });
    return NextResponse.json({ success: true, certificates });
  } catch (error: unknown) {
    console.error('[Public API] Failed to fetch certificates:', error);
    return NextResponse.json({ error: 'Failed to load certificates' }, { status: 500 });
  }
}
