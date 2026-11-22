import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://sachithra.dev'),
  title: {
    default: 'Sachithra Indrachapa / Full-Stack Software Engineer & DevOps',
    template: '%s | Sachithra Indrachapa',
  },
  description:
    'Sachithra Indrachapa — Full-Stack Software Engineer & DevOps undergraduate at SLIIT, based in Colombo, Sri Lanka. Building high-performance distributed systems, Next.js applications, and MongoDB GridFS streaming platforms.',
  keywords: [
    'Sachithra Indrachapa',
    'Full-Stack Developer',
    'Software Engineer',
    'Next.js 14',
    'MongoDB Atlas GridFS',
    'DevOps',
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
    description: 'Building high-performance web & mobile systems with Next.js & MongoDB GridFS.',
    siteName: 'Sachithra Indrachapa',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Sachithra Indrachapa / Software Engineer',
    description: 'Modern Brutalist Portfolio powered by Next.js and MongoDB GridFS.',
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
