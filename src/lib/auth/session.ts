import { SignJWT, jwtVerify } from 'jose';
import { cookies } from 'next/headers';
import { NextRequest } from 'next/server';

const SESSION_COOKIE_NAME = 'sachithra_admin_session';
const SESSION_SECRET =
  process.env.SESSION_SECRET ||
  'sachithra_portfolio_secure_session_secret_key_minimum_32_chars_long';

const secretKey = new TextEncoder().encode(SESSION_SECRET);

export interface AdminSessionPayload {
  adminId: string;
  email: string;
  role: 'superadmin' | 'editor';
}

/**
 * Sign a secure JWT session token valid for 7 days.
 */
export async function signSessionToken(payload: AdminSessionPayload): Promise<string> {
  return await new SignJWT({ ...payload })
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime('7d')
    .sign(secretKey);
}

/**
 * Verify and decode a JWT session token.
 */
export async function verifySessionToken(token: string): Promise<AdminSessionPayload | null> {
  try {
    const { payload } = await jwtVerify(token, secretKey, {
      algorithms: ['HS256'],
    });
    return {
      adminId: payload.adminId as string,
      email: payload.email as string,
      role: payload.role as 'superadmin' | 'editor',
    };
  } catch {
    return null;
  }
}

/**
 * Verify admin session from an incoming NextRequest.
 */
export async function verifyAdminSession(req: NextRequest): Promise<AdminSessionPayload | null> {
  const token = req.cookies.get(SESSION_COOKIE_NAME)?.value;
  if (!token) return null;
  return await verifySessionToken(token);
}

/**
 * Retrieve current admin session in Server Components.
 */
export async function getCurrentAdmin(): Promise<AdminSessionPayload | null> {
  const cookieStore = cookies();
  const token = cookieStore.get(SESSION_COOKIE_NAME)?.value;
  if (!token) return null;
  return await verifySessionToken(token);
}

/**
 * Set the secure session cookie on a NextResponse.
 */
export function setSessionCookie(token: string): string {
  const isProduction = process.env.NODE_ENV === 'production';
  const maxAge = 7 * 24 * 60 * 60; // 7 days in seconds

  return `${SESSION_COOKIE_NAME}=${token}; Path=/; HttpOnly; SameSite=Lax; Max-Age=${maxAge}${
    isProduction ? '; Secure' : ''
  }`;
}

/**
 * Clear the session cookie.
 */
export function clearSessionCookie(): string {
  return `${SESSION_COOKIE_NAME}=; Path=/; HttpOnly; SameSite=Lax; Max-Age=0`;
}
