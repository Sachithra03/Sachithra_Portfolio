import { NextRequest, NextResponse } from 'next/server';
import { verifyAdminSession } from '@/lib/auth/session';
import { uploadGridFSFile, validateFileSignature } from '@/lib/storage/gridfs';

export const dynamic = 'force-dynamic';

const ALLOWED_MIME_TYPES = [
  'image/jpeg',
  'image/jpg',
  'image/png',
  'image/webp',
  'image/svg+xml',
  'application/pdf',
];

const MAX_IMAGE_SIZE = 4 * 1024 * 1024; // 4 MB (Vercel serverless request body compliant)
const MAX_PDF_SIZE = 10 * 1024 * 1024;  // 10 MB for documents

export async function POST(req: NextRequest) {
  try {
    const session = await verifyAdminSession(req);
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const formData = await req.formData();
    const file = formData.get('file') as File | null;
    const documentType = (formData.get('documentType') as string) || 'general';
    const isPublic = formData.get('isPublic') !== 'false';

    if (!file) {
      return NextResponse.json({ error: 'No file uploaded' }, { status: 400 });
    }

    if (!ALLOWED_MIME_TYPES.includes(file.type)) {
      return NextResponse.json(
        { error: `File type '${file.type}' is not supported. Supported: JPG, PNG, WebP, SVG, PDF.` },
        { status: 415 }
      );
    }

    const maxSize = file.type === 'application/pdf' ? MAX_PDF_SIZE : MAX_IMAGE_SIZE;
    if (file.size > maxSize) {
      return NextResponse.json(
        { error: `File size (${(file.size / (1024 * 1024)).toFixed(2)} MB) exceeds allowed limit of ${maxSize / (1024 * 1024)} MB.` },
        { status: 413 }
      );
    }

    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    // Validate binary signatures (magic bytes)
    const isSignatureValid = validateFileSignature(buffer, file.type);
    if (!isSignatureValid) {
      return NextResponse.json(
        { error: 'File signature does not match its declared MIME type.' },
        { status: 400 }
      );
    }

    const uploadResult = await uploadGridFSFile({
      buffer,
      filename: file.name,
      mimeType: file.type,
      size: file.size,
      isPublic,
      documentType,
      uploadedBy: session.adminId,
    });

    return NextResponse.json(
      {
        success: true,
        fileId: uploadResult.fileId,
        url: `/api/files/${uploadResult.fileId}`,
        filename: uploadResult.filename,
        originalName: file.name,
        size: uploadResult.size,
        mimeType: uploadResult.mimeType,
      },
      { status: 201 }
    );
  } catch (error: unknown) {
    const errorMsg = error instanceof Error ? error.message : 'File upload failed';
    return NextResponse.json({ error: errorMsg }, { status: 500 });
  }
}
