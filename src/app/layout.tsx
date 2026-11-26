import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://sachithra.dev'),
  title: {
    default: 'Sachithra Indrachapa / Software Engineer & Full-Stack Developer',
    template: '%s | Sachithra Indrachapa',
  },
  description:
    'Sachithra Indrachapa is a Software Engineering undergraduate focused on full-stack web and mobile app development with Next.js, Node.js, and React Native.',
  keywords: [
    'Sachithra Indrachapa',
    'Full-Stack Developer',
    'Software Engineer',
    'Mobile App Developer',
    'Software Engineering',
    'React Native',
    'Next.js',
    'SLIIT',
    'Colombo Sri Lanka',
  ],
  authors: [{ name: 'Sachithra Indrachapa', url: 'https://sachithra.dev' }],
  creator: 'Sachithra Indrachapa',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://sachithra.dev',
    title: 'Sachithra Indrachapa / Full-Stack Software Engineer',
    description: 'Software Engineering undergraduate focused on full-stack web and mobile app development.',
    siteName: 'Sachithra Indrachapa',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Sachithra Indrachapa / Software Engineer',
    description: 'Software Engineering undergraduate focused on full-stack web and mobile app development.',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
