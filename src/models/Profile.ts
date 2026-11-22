import mongoose, { Schema, Document, Model } from 'mongoose';

export interface IProfileStat {
  label: string;
  percentage: number;
  color?: string;
}

export interface IProfile extends Document {
  fullName: string;
  title: string;
  headline: string;
  bio: string;
  location: string;
  email: string;
  phone?: string;
  avatarImageId?: mongoose.Types.ObjectId;
  resumeFileId?: mongoose.Types.ObjectId;
  availableForHire: boolean;
  stats: IProfileStat[];
  createdAt: Date;
  updatedAt: Date;
}

const ProfileStatSchema = new Schema<IProfileStat>({
  label: { type: String, required: true },
  percentage: { type: Number, required: true },
  color: { type: String, default: '#C85A17' },
});

const ProfileSchema = new Schema<IProfile>(
  {
    fullName: {
      type: String,
      required: true,
      trim: true,
    },
    title: {
      type: String,
      required: true,
      trim: true,
    },
    headline: {
      type: String,
      required: true,
      trim: true,
    },
    bio: {
      type: String,
      required: true,
    },
    location: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      trim: true,
    },
    phone: {
      type: String,
      trim: true,
    },
    avatarImageId: {
      type: Schema.Types.ObjectId,
      ref: 'fs.files',
    },
    resumeFileId: {
      type: Schema.Types.ObjectId,
      ref: 'fs.files',
    },
    availableForHire: {
      type: Boolean,
      default: true,
    },
    stats: [ProfileStatSchema],
  },
  {
    timestamps: true,
  }
);

export const Profile: Model<IProfile> =
  mongoose.models.Profile || mongoose.model<IProfile>('Profile', ProfileSchema);
