import type { Metadata } from 'next';
import './globals.css';
import Link from 'next/link';
import { Navigation } from '@/components/Navigation';

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://sachithra.dev'),
  title: {
    default: 'Sachithra Indrachapa — Full-Stack Software Engineer',
    template: '%s | Sachithra Indrachapa',
  },
  description:
    'Software Engineering undergraduate at SLIIT specializing in modern web technologies, full stack development and DevOps with clean minimalist architecture.',
  keywords: [
    'Sachithra Indrachapa',
    'Software Engineer',
    'Full Stack Developer',
    'Next.js Portfolio',
    'MongoDB GridFS',
    'TypeScript',
    'SLIIT',
  ],
  authors: [{ name: 'Sachithra Indrachapa', url: 'https://sachithra.dev' }],
  creator: 'Sachithra Indrachapa',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://sachithra.dev',
    title: 'Sachithra Indrachapa — Full-Stack Software Engineer',
    description: 'Passionate about turning ideas into high-impact software. Built with Next.js & MongoDB GridFS.',
    siteName: 'Sachithra Indrachapa',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Sachithra Indrachapa — Software Engineer',
    description: 'Minimal Editorial Portfolio & Headless CMS powered by Next.js and MongoDB GridFS.',
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
    <html lang="en">
      <body>
        <Navigation />

        {/* Main Editorial Content */}
        <main>{children}</main>

        {/* Minimal Editorial Footer */}
        <footer
          style={{
            borderTop: '1px solid var(--border)',
            backgroundColor: 'var(--bg-main)',
            padding: '4rem 0 3rem 0',
            marginTop: '5rem',
          }}
        >
          <div className="container">
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'flex-start',
                flexWrap: 'wrap',
                gap: '2.5rem',
                marginBottom: '3rem',
              }}
            >
              <div>
                <p
                  style={{
                    fontFamily: 'var(--font-serif)',
                    fontSize: '1.45rem',
                    fontWeight: 600,
                    marginBottom: '0.4rem',
                    color: 'var(--text-primary)',
                  }}
                >
                  Sachithra Indrachapa<span className="accent-dot">.</span>
                </p>
                <p style={{ fontSize: '0.88rem', color: 'var(--text-secondary)', maxWidth: '340px', lineHeight: 1.6 }}>
                  Software Engineering undergraduate at SLIIT crafting high-integrity web & mobile systems.
                </p>
              </div>

              <div style={{ display: 'flex', gap: '3.5rem', flexWrap: 'wrap' }}>
                <div>
                  <span className="kicker-wrapper" style={{ fontSize: '0.68rem', marginBottom: '0.5rem' }}>Index</span>
                  <ul style={{ listStyle: 'none', lineHeight: 2, fontSize: '0.88rem', color: 'var(--text-primary)' }}>
                    <li><Link href="/#about">About</Link></li>
                    <li><Link href="/#stack">Stack</Link></li>
                    <li><Link href="/#projects">Projects</Link></li>
                    <li><Link href="/#notes">Writing</Link></li>
                    <li><Link href="/#experience">Experience</Link></li>
                    <li><Link href="/#education">Education</Link></li>
                  </ul>
                </div>

                <div>
                  <span className="kicker-wrapper" style={{ fontSize: '0.68rem', marginBottom: '0.5rem' }}>Location</span>
                  <p style={{ fontSize: '0.88rem', color: 'var(--text-primary)', fontWeight: 500 }}>Colombo, Sri Lanka</p>
                  <p style={{ fontSize: '0.78rem', color: 'var(--text-secondary)', fontFamily: 'var(--font-mono)' }}>UTC+05:30 (IST)</p>
                </div>
              </div>
            </div>

            <div
              style={{
                borderTop: '1px solid var(--border)',
                paddingTop: '2rem',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                flexWrap: 'wrap',
                gap: '1rem',
                fontSize: '0.8rem',
                color: 'var(--text-secondary)',
              }}
            >
              <p>© {new Date().getFullYear()} Sachithra Indrachapa. All rights reserved.</p>
              <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem' }}>
                Engineered with Next.js & MongoDB GridFS • sachithra.dev
              </p>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
