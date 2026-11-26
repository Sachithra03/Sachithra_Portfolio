import { NextRequest, NextResponse } from 'next/server';
import { verifyAdminSession } from '@/lib/auth/session';
import { connectToDatabase } from '@/lib/db/mongodb';
import { Admin } from '@/models/Admin';

export async function GET(req: NextRequest) {
  const session = await verifyAdminSession(req);

  if (!session) {
    return NextResponse.json({ authenticated: false }, { status: 401 });
  }

  await connectToDatabase();
  const admin = await Admin.findById(session.adminId).select('-passwordHash');

  if (!admin) {
    return NextResponse.json({ authenticated: false }, { status: 401 });
  }

  return NextResponse.json({
    authenticated: true,
    admin: {
      id: String(admin._id),
      email: admin.email,
      role: admin.role,
      lastLoginAt: admin.lastLoginAt,
    },
  });
}
