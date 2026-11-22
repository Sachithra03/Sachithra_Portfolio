import mongoose, { Schema, Document, Model } from 'mongoose';

export interface IExperience extends Document {
  company: string;
  role: string;
  location: string;
  employmentType: 'full-time' | 'part-time' | 'internship' | 'contract' | 'freelance';
  startDate: Date;
  endDate?: Date;
  current: boolean;
  description: string;
  achievements: string[];
  technologies: string[];
  logoFileId?: mongoose.Types.ObjectId;
  order: number;
  createdAt: Date;
  updatedAt: Date;
}

const ExperienceSchema = new Schema<IExperience>(
  {
    company: {
      type: String,
      required: true,
      trim: true,
    },
    role: {
      type: String,
      required: true,
      trim: true,
    },
    location: {
      type: String,
      required: true,
      trim: true,
    },
    employmentType: {
      type: String,
      enum: ['full-time', 'part-time', 'internship', 'contract', 'freelance'],
      default: 'full-time',
    },
    startDate: {
      type: Date,
      required: true,
    },
    endDate: {
      type: Date,
    },
    current: {
      type: Boolean,
      default: false,
    },
    description: {
      type: String,
      required: true,
      trim: true,
    },
    achievements: [
      {
        type: String,
        trim: true,
      },
    ],
    technologies: [
      {
        type: String,
        trim: true,
      },
    ],
    logoFileId: {
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

export const Experience: Model<IExperience> =
  mongoose.models.Experience || mongoose.model<IExperience>('Experience', ExperienceSchema);
