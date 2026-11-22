import mongoose, { Schema, Document, Model } from 'mongoose';

export interface ICertificate extends Document {
  title: string;
  issuer: string;
  issueDate: Date;
  description: string;
  credentialUrl?: string;
  coverImageId?: mongoose.Types.ObjectId; // Preview image
  fileId?: mongoose.Types.ObjectId;       // PDF certificate document
  order: number;
  createdAt: Date;
  updatedAt: Date;
}

const CertificateSchema = new Schema<ICertificate>(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    issuer: {
      type: String,
      required: true,
      trim: true,
    },
    issueDate: {
      type: Date,
      required: true,
    },
    description: {
      type: String,
      required: true,
      trim: true,
    },
    credentialUrl: {
      type: String,
      trim: true,
    },
    coverImageId: {
      type: Schema.Types.ObjectId,
      ref: 'fs.files',
    },
    fileId: {
      type: Schema.Types.ObjectId,
      ref: 'fs.files',
    },
    order: {
      type: Number,
      default: 0,
      index: true,
    },
  },
  {
    timestamps: true,
  }
);

export const Certificate: Model<ICertificate> =
  mongoose.models.Certificate || mongoose.model<ICertificate>('Certificate', CertificateSchema);
