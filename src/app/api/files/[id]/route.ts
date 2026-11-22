import { NextRequest, NextResponse } from 'next/server';
import mongoose from 'mongoose';
import { streamGridFSFile } from '@/lib/storage/gridfs';
import { verifyAdminSession } from '@/lib/auth/session';

export const dynamic = 'force-dynamic';

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json({ error: 'Invalid file ID format' }, { status: 400 });
    }

    const { stream, file } = await streamGridFSFile(id);

    // Private file access gate
    if (file.metadata?.isPublic === false) {
      const session = await verifyAdminSession(req);
      if (!session) {
        return NextResponse.json({ error: 'Unauthorized access to private document' }, { status: 401 });
      }
    }

    const etag = `"${file._id.toString()}"`;
    const clientEtag = req.headers.get('if-none-match');

    if (clientEtag === etag) {
      return new NextResponse(null, { status: 304 });
    }

    const isDownload = req.nextUrl.searchParams.get('download') === 'true';
    const originalName = file.metadata?.originalName || file.filename;
    const disposition = isDownload
      ? `attachment; filename="${encodeURIComponent(originalName)}"`
      : 'inline';

    const contentType = file.metadata?.mimeType || 'application/octet-stream';
    const isPublic = file.metadata?.isPublic !== false;

    // Convert Node.js readable stream into a Web ReadableStream
    const webStream = new ReadableStream({
      start(controller) {
        stream.on('data', (chunk) => controller.enqueue(chunk));
        stream.on('end', () => controller.close());
        stream.on('error', (err) => controller.error(err));
      },
      cancel() {
        stream.destroy();
      },
    });

    const headers: Record<string, string> = {
      'Content-Type': contentType,
      'Content-Length': file.length.toString(),
      'Content-Disposition': disposition,
      'ETag': etag,
      'Cache-Control': isPublic
        ? 'public, max-age=31536000, immutable'
        : 'private, no-cache, no-store, must-revalidate',
    };

    return new NextResponse(webStream, {
      status: 200,
      headers,
    });
  } catch (error: unknown) {
    const errorMsg = error instanceof Error ? error.message : 'File retrieval failed';
    if (errorMsg.includes('not found')) {
      return NextResponse.json({ error: 'File not found' }, { status: 404 });
    }
    return NextResponse.json({ error: errorMsg }, { status: 500 });
  }
}
