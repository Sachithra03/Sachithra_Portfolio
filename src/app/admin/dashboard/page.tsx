import { redirect } from 'next/navigation';
import { getCurrentAdmin } from '@/lib/auth/session';
import { AdminCMS } from '@/components/admin/AdminCMS';

export const dynamic = 'force-dynamic';

export default async function AdminDashboardPage() {
  const admin = await getCurrentAdmin();

  if (!admin) {
    redirect('/admin/login');
  }

  return <AdminCMS initialEmail={admin.email} />;
}
