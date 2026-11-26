import { ObjectId, GridFSBucketReadStream } from 'mongodb';
import { getGridFSBucket, getDatabase } from '../db/mongodb';

export interface GridFSMetadata {
  originalName: string;
  mimeType: string;
  size: number;
  uploadedBy?: string;
  isPublic: boolean;
  documentType: string;
  createdAt: string;
}

export interface GridFSFileDocument {
  _id: ObjectId;
  length: number;
  chunkSize: number;
  uploadDate: Date;
  filename: string;
  metadata?: GridFSMetadata;
}

export interface UploadOptions {
  buffer?: Buffer;
  stream?: NodeJS.ReadableStream;
  filename: string;
  mimeType: string;
  size: number;
  isPublic?: boolean;
  documentType?: string;
  uploadedBy?: string;
}

/**
 * Validates actual binary signatures (magic bytes) to prevent disguised malicious file uploads.
 */
export function validateFileSignature(buffer: Buffer, mimeType: string): boolean {
  if (!buffer || buffer.length < 4) return false;

  // JPEG / JPG: FF D8 FF
  if (mimeType === 'image/jpeg' || mimeType === 'image/jpg') {
    return buffer[0] === 0xff && buffer[1] === 0xd8 && buffer[2] === 0xff;
  }

  // PNG: 89 50 4E 47 0D 0A 1A 0A
  if (mimeType === 'image/png') {
    return (
      buffer[0] === 0x89 &&
      buffer[1] === 0x50 &&
      buffer[2] === 0x4e &&
      buffer[3] === 0x47
    );
  }

  // WebP: RIFF .... WEBP
  if (mimeType === 'image/webp') {
    if (buffer.length < 12) return false;
    const isRiff = buffer.toString('ascii', 0, 4) === 'RIFF';
    const isWebp = buffer.toString('ascii', 8, 12) === 'WEBP';
    return isRiff && isWebp;
  }

  // PDF: %PDF (25 50 44 46)
  if (mimeType === 'application/pdf') {
    return buffer.toString('ascii', 0, 4) === '%PDF';
  }

  // SVG: <?xml or <svg
  if (mimeType === 'image/svg+xml') {
    const header = buffer.toString('utf8', 0, Math.min(buffer.length, 100)).trim().toLowerCase();
    return header.startsWith('<?xml') || header.startsWith('<svg') || header.includes('<svg');
  }

  return false;
}

/**
 * Upload a binary file into MongoDB GridFS with metadata.
 */
export async function uploadGridFSFile(options: UploadOptions): Promise<{
  fileId: string;
  filename: string;
  size: number;
  mimeType: string;
}> {
  const bucket = await getGridFSBucket();
  const fileId = new ObjectId();
  const sanitizedFilename = options.filename.replace(/[^a-zA-Z0-9._-]/g, '_');
  const storedFilename = `${Date.now()}_${sanitizedFilename}`;

  const metadata: GridFSMetadata = {
    originalName: options.filename,
    mimeType: options.mimeType,
    size: options.size,
    uploadedBy: options.uploadedBy,
    isPublic: options.isPublic ?? true,
    documentType: options.documentType || 'general',
    createdAt: new Date().toISOString(),
  };

  const uploadStream = bucket.openUploadStreamWithId(fileId, storedFilename, {
    metadata: metadata as unknown as Record<string, unknown>,
  });

  if (options.buffer) {
    await new Promise<void>((resolve, reject) => {
      uploadStream.on('error', reject);
      uploadStream.on('finish', () => resolve());
      uploadStream.end(options.buffer);
    });
  } else if (options.stream) {
    await new Promise<void>((resolve, reject) => {
      options.stream!
        .pipe(uploadStream)
        .on('finish', () => resolve())
        .on('error', (err) => reject(err));
    });
  } else {
    throw new Error('Either buffer or stream must be provided for GridFS upload');
  }

  return {
    fileId: fileId.toHexString(),
    filename: storedFilename,
    size: options.size,
    mimeType: options.mimeType,
  };
}

/**
 * Retrieve metadata for a GridFS file by ID.
 */
export async function getGridFSMetadata(
  fileId: string | ObjectId
): Promise<GridFSFileDocument | null> {
  const db = await getDatabase();
  const objectId = typeof fileId === 'string' ? new ObjectId(fileId) : fileId;
  const doc = await db.collection<GridFSFileDocument>('fs.files').findOne({ _id: objectId });
  return doc;
}

/**
 * Open a readable stream from GridFS for streaming bytes to HTTP responses.
 */
export async function streamGridFSFile(
  fileId: string | ObjectId
): Promise<{
  stream: GridFSBucketReadStream;
  file: GridFSFileDocument;
}> {
  const bucket = await getGridFSBucket();
  const objectId = typeof fileId === 'string' ? new ObjectId(fileId) : fileId;
  const file = await getGridFSMetadata(objectId);

  if (!file) {
    throw new Error('GridFS file not found');
  }

  const stream = bucket.openDownloadStream(objectId);
  return { stream, file };
}

/**
 * Delete a GridFS file and its corresponding chunks.
 */
export async function deleteGridFSFile(fileId: string | ObjectId): Promise<boolean> {
  const bucket = await getGridFSBucket();
  const objectId = typeof fileId === 'string' ? new ObjectId(fileId) : fileId;

  try {
    await bucket.delete(objectId);
    return true;
  } catch (err: unknown) {
    const errorMsg = err instanceof Error ? err.message : String(err);
    if (errorMsg.includes('FileNotFound') || errorMsg.includes('not found')) {
      return false;
    }
    throw err;
  }
}
