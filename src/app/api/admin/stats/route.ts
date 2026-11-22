import { NextRequest, NextResponse } from 'next/server';
import { verifyAdminSession } from '@/lib/auth/session';
import { connectToDatabase } from '@/lib/db/mongodb';
import { Project, Certificate, Experience, Education, Skill, Note } from '@/models';

export const dynamic = 'force-dynamic';

export async function GET(req: NextRequest) {
  try {
    const session = await verifyAdminSession(req);
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    await connectToDatabase();

    const [
      totalProjects,
      totalCertificates,
      totalExperiences,
      totalEducation,
      totalSkills,
      totalNotes,
      publishedNotes,
    ] = await Promise.all([
      Project.countDocuments(),
      Certificate.countDocuments(),
      Experience.countDocuments(),
      Education.countDocuments(),
      Skill.countDocuments(),
      Note.countDocuments(),
      Note.countDocuments({ published: true }),
    ]);

    // Fetch recent 5 project or note activities
    const recentProjects = await Project.find()
      .sort({ updatedAt: -1 })
      .limit(3)
      .select('title updatedAt status');

    const recentNotes = await Note.find()
      .sort({ updatedAt: -1 })
      .limit(3)
      .select('title updatedAt published');

    return NextResponse.json({
      success: true,
      stats: {
        totalProjects,
        totalCertificates,
        totalExperiences,
        totalEducation,
        totalSkills,
        totalNotes,
        publishedNotes,
      },
      recentActivity: {
        projects: recentProjects,
        notes: recentNotes,
      },
    });
  } catch (error: unknown) {
    const errorMsg = error instanceof Error ? error.message : 'Failed to fetch dashboard stats';
    return NextResponse.json({ error: errorMsg }, { status: 500 });
  }
}
