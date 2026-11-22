import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import bcrypt from 'bcryptjs';
import { connectToDatabase } from '@/lib/db/mongodb';
import { Admin } from '@/models/Admin';
import { signSessionToken, setSessionCookie } from '@/lib/auth/session';
import { checkLoginRateLimit, resetLoginRateLimit } from '@/lib/auth/rate-limit';

const LoginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

export async function POST(req: NextRequest) {
  try {
    const ip = req.headers.get('x-forwarded-for')?.split(',')[0].trim() || '127.0.0.1';
    const rateCheck = checkLoginRateLimit(ip);

    if (!rateCheck.allowed) {
      return NextResponse.json(
        {
          error: `Too many failed login attempts. Please retry after ${rateCheck.retryAfterSeconds} seconds.`,
        },
        { status: 429 }
      );
    }

    const body = await req.json();
    const parsed = LoginSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { error: 'Invalid email or password format' },
        { status: 400 }
      );
    }

    const { email, password } = parsed.data;
    await connectToDatabase();

    let admin = await Admin.findOne({ email: email.toLowerCase() });

    // Auto-bootstrap initial admin if none exists and env credentials match
    if (!admin) {
      const adminCount = await Admin.countDocuments();
      const envEmail = process.env.ADMIN_EMAIL;
      const envPass = process.env.ADMIN_PASSWORD;

      if (adminCount === 0 && envEmail && envPass && email.toLowerCase() === envEmail.toLowerCase() && password === envPass) {
        const passwordHash = await bcrypt.hash(password, 12);
        admin = await Admin.create({
          email: envEmail.toLowerCase(),
          passwordHash,
          role: 'superadmin',
          lastLoginAt: new Date(),
        });
      }
    }

    if (!admin) {
      return NextResponse.json(
        { error: 'Invalid credentials' },
        { status: 401 }
      );
    }

    const isMatch = await bcrypt.compare(password, admin.passwordHash);
    if (!isMatch) {
      return NextResponse.json(
        { error: 'Invalid credentials' },
        { status: 401 }
      );
    }

    // Reset rate limiter on successful authentication
    resetLoginRateLimit(ip);

    admin.lastLoginAt = new Date();
    await admin.save();

    const token = await signSessionToken({
      adminId: String(admin._id),
      email: admin.email,
      role: admin.role,
    });

    const cookieHeader = setSessionCookie(token);

    const response = NextResponse.json(
      {
        success: true,
        admin: {
          id: String(admin._id),
          email: admin.email,
          role: admin.role,
        },
      },
      { status: 200 }
    );

    response.headers.append('Set-Cookie', cookieHeader);
    return response;
  } catch (error: unknown) {
    const errorMsg = error instanceof Error ? error.message : 'Login failed';
    return NextResponse.json({ error: errorMsg }, { status: 500 });
  }
}
