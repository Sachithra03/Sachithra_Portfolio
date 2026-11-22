import mongoose, { Schema, Document, Model } from 'mongoose';

export interface ISkill extends Document {
  name: string;
  category: 'Frontend' | 'Backend' | 'Mobile' | 'Cloud & DevOps' | 'Database' | 'Tools';
  proficiency?: number; // 0 - 100
  iconName?: string;
  order: number;
  createdAt: Date;
  updatedAt: Date;
}

const SkillSchema = new Schema<ISkill>(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    category: {
      type: String,
      enum: ['Frontend', 'Backend', 'Mobile', 'Cloud & DevOps', 'Database', 'Tools'],
      required: true,
      index: true,
    },
    proficiency: {
      type: Number,
      min: 0,
      max: 100,
      default: 85,
    },
    iconName: {
      type: String,
      trim: true,
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

export const Skill: Model<ISkill> =
  mongoose.models.Skill || mongoose.model<ISkill>('Skill', SkillSchema);
