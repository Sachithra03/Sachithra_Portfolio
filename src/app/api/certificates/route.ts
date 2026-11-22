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
    const errorMsg = error instanceof Error ? error.message : 'Failed to fetch certificates';
    return NextResponse.json({ error: errorMsg }, { status: 500 });
  }
}
