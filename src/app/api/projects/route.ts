import { NextRequest, NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/db/mongodb';
import { Project } from '@/models/Project';

export const dynamic = 'force-dynamic';

export async function GET(req: NextRequest) {
  try {
    await connectToDatabase();

    const featuredParam = req.nextUrl.searchParams.get('featured');
    const query: Record<string, unknown> = {};

    if (featuredParam === 'true') {
      query.featured = true;
    }

    const projects = await Project.find(query).sort({ order: 1, createdAt: -1 });

    return NextResponse.json({ success: true, projects });
  } catch (error: unknown) {
    const errorMsg = error instanceof Error ? error.message : 'Failed to fetch public projects';
    return NextResponse.json({ error: errorMsg }, { status: 500 });
  }
}
