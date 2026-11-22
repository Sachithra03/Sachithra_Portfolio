import { NextRequest, NextResponse } from 'next/server';
import { verifyAdminSession } from '@/lib/auth/session';
import { connectToDatabase } from '@/lib/db/mongodb';
import { Certificate } from '@/models/Certificate';
import { z } from 'zod';

export const dynamic = 'force-dynamic';

const CertificateSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  issuer: z.string().min(1, 'Issuer is required'),
  issueDate: z.string().or(z.date()),
  description: z.string().min(1, 'Description is required'),
  credentialUrl: z.string().url().or(z.literal('')).optional(),
  coverImageId: z.string().optional().nullable(),
  fileId: z.string().optional().nullable(),
  order: z.number().default(0),
});

export async function GET(req: NextRequest) {
  try {
    const session = await verifyAdminSession(req);
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    await connectToDatabase();
    const certificates = await Certificate.find().sort({ order: 1, issueDate: -1 });
    return NextResponse.json({ success: true, certificates });
  } catch (error: unknown) {
    const errorMsg = error instanceof Error ? error.message : 'Failed to fetch certificates';
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
    const parsed = CertificateSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json({ error: parsed.error.format() }, { status: 400 });
    }

    await connectToDatabase();

    const certificate = await Certificate.create({
      ...parsed.data,
      issueDate: new Date(parsed.data.issueDate),
    });

    return NextResponse.json({ success: true, certificate }, { status: 201 });
  } catch (error: unknown) {
    const errorMsg = error instanceof Error ? error.message : 'Failed to create certificate';
    return NextResponse.json({ error: errorMsg }, { status: 500 });
  }
}
