import mongoose, { Schema, Document, Model } from 'mongoose';

export interface INote extends Document {
  title: string;
  slug: string;
  summary: string;
  content: string;
  tags: string[];
  published: boolean;
  coverImageId?: mongoose.Types.ObjectId;
  readTimeMinutes: number;
  publishedAt?: Date;
  createdAt: Date;
  updatedAt: Date;
}

const NoteSchema = new Schema<INote>(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    slug: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      index: true,
    },
    summary: {
      type: String,
      required: true,
      trim: true,
    },
    content: {
      type: String,
      required: true,
    },
    tags: [
      {
        type: String,
        trim: true,
      },
    ],
    published: {
      type: Boolean,
      default: false,
      index: true,
    },
    coverImageId: {
      type: Schema.Types.ObjectId,
      ref: 'fs.files',
    },
    readTimeMinutes: {
      type: Number,
      default: 3,
    },
    publishedAt: {
      type: Date,
    },
  },
  {
    timestamps: true,
  }
);

NoteSchema.index({ published: 1, publishedAt: -1 });

export const Note: Model<INote> =
  mongoose.models.Note || mongoose.model<INote>('Note', NoteSchema);
