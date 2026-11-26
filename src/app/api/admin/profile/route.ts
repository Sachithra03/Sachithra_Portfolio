import { NextRequest, NextResponse } from 'next/server';
import { verifyAdminSession } from '@/lib/auth/session';
import { connectToDatabase } from '@/lib/db/mongodb';
import { Profile } from '@/models/Profile';
import { deleteGridFSFile } from '@/lib/storage/gridfs';

export const dynamic = 'force-dynamic';

export async function GET(req: NextRequest) {
  try {
    const session = await verifyAdminSession(req);
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    await connectToDatabase();
    let profile = await Profile.findOne();
    if (!profile) {
      profile = await Profile.create({
        fullName: 'Sachithra Indrachapa',
        title: 'Software Engineer',
        headline: 'Passionate about turning ideas into impactful web & mobile experiences.',
        bio: "I'm a creative Software Engineer with expertise in full-stack development, cloud computing, and responsive UI/UX.",
        location: 'Sri Lanka',
        email: 'sachithrai1003@gmail.com',
        phone: '+94 71 859 6632',
        availableForHire: true,
        stats: [
          { label: 'Code Quality', percentage: 95, color: '#C85A17' },
          { label: 'Client Satisfaction', percentage: 90, color: '#1A1A1A' },
          { label: 'Project Success', percentage: 85, color: '#C85A17' },
          { label: 'Innovation', percentage: 92, color: '#1A1A1A' },
        ],
      });
    }

    return NextResponse.json({ success: true, profile });
  } catch (error: unknown) {
    const errorMsg = error instanceof Error ? error.message : 'Failed to fetch profile';
    return NextResponse.json({ error: errorMsg }, { status: 500 });
  }
}

export async function PUT(req: NextRequest) {
  try {
    const session = await verifyAdminSession(req);
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await req.json();
    await connectToDatabase();

    let profile = await Profile.findOne();
    if (!profile) {
      profile = new Profile(body);
    } else {
      if (profile.avatarImageId && body.avatarImageId && profile.avatarImageId.toString() !== body.avatarImageId) {
        await deleteGridFSFile(profile.avatarImageId).catch(() => null);
      }
      if (profile.resumeFileId && body.resumeFileId && profile.resumeFileId.toString() !== body.resumeFileId) {
        await deleteGridFSFile(profile.resumeFileId).catch(() => null);
      }
      Object.assign(profile, body);
    }

    await profile.save();
    return NextResponse.json({ success: true, profile });
  } catch (error: unknown) {
    const errorMsg = error instanceof Error ? error.message : 'Failed to update profile';
    return NextResponse.json({ error: errorMsg }, { status: 500 });
  }
}
