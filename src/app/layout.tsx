import type { Metadata } from 'next';
import './globals.css';
import Link from 'next/link';
import { Lock } from 'lucide-react';

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://sachithra.dev'),
  title: {
    default: 'Sachithra Indrachapa — Full-Stack Software Engineer',
    template: '%s | Sachithra Indrachapa',
  },
  description:
    'Software Engineering undergraduate at SLIIT specializing in scalable full-stack web and mobile systems, distributed architectures, and minimalist design.',
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
    description: 'Portfolio & Headless CMS powered by Next.js App Router and MongoDB GridFS.',
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
        {/* Editorial Top Navigation */}
        <header
          style={{
            position: 'sticky',
            top: 0,
            zIndex: 40,
            backgroundColor: 'rgba(247, 244, 238, 0.94)',
            backdropFilter: 'blur(10px)',
            borderBottom: '1px solid var(--border-hairline)',
          }}
        >
          <div
            className="container"
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              height: '4.25rem',
            }}
          >
            <Link
              href="/"
              style={{
                fontFamily: 'var(--font-serif)',
                fontSize: '1.35rem',
                fontWeight: 600,
                letterSpacing: '-0.02em',
                color: 'var(--text-ink)',
                display: 'inline-flex',
                alignItems: 'baseline',
              }}
            >
              Sachithra<span className="accent-dot">.</span>
            </Link>

            <nav
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '2rem',
              }}
              className="desktop-nav"
            >
              <Link href="/#about" style={{ fontSize: '0.88rem', color: 'var(--text-body)' }}>
                About
              </Link>
              <Link href="/#stack" style={{ fontSize: '0.88rem', color: 'var(--text-body)' }}>
                Stack
              </Link>
              <Link href="/#projects" style={{ fontSize: '0.88rem', color: 'var(--text-body)' }}>
                Projects
              </Link>
              <Link href="/#notes" style={{ fontSize: '0.88rem', color: 'var(--text-body)' }}>
                Writing
              </Link>
              <Link href="/#timeline" style={{ fontSize: '0.88rem', color: 'var(--text-body)' }}>
                Timeline
              </Link>
              <Link href="/#credentials" style={{ fontSize: '0.88rem', color: 'var(--text-body)' }}>
                Credentials
              </Link>
              <Link href="/#contact" style={{ fontSize: '0.88rem', color: 'var(--text-body)' }}>
                Contact
              </Link>

              <a
                href="/api/files/6b027f0774981c35017dd70c?download=true"
                download="Sachithra_Indrachapa_Resume.pdf"
                className="btn-ink-primary"
                style={{ padding: '0.45rem 1.1rem', fontSize: '0.8rem' }}
              >
                Resume ↗
              </a>

              <Link
                href="/admin/dashboard"
                title="Admin Control Center"
                style={{
                  color: 'var(--text-muted)',
                  display: 'flex',
                  alignItems: 'center',
                  padding: '4px',
                }}
              >
                <Lock size={15} />
              </Link>
            </nav>
          </div>
        </header>

        {/* Main Content */}
        <main>{children}</main>

        {/* Editorial Minimal Footer */}
        <footer
          style={{
            borderTop: '1px solid var(--border-hairline)',
            backgroundColor: 'var(--bg-canvas)',
            padding: '4rem 0 3rem 0',
            marginTop: '4rem',
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
                    fontSize: '1.4rem',
                    fontWeight: 600,
                    marginBottom: '0.4rem',
                  }}
                >
                  Sachithra Indrachapa<span className="accent-dot">.</span>
                </p>
                <p style={{ fontSize: '0.88rem', color: 'var(--text-muted)', maxWidth: '320px' }}>
                  Software Engineering undergraduate at SLIIT crafting high-integrity web & mobile systems.
                </p>
              </div>

              <div style={{ display: 'flex', gap: '3rem', flexWrap: 'wrap' }}>
                <div>
                  <span className="kicker-wrapper" style={{ fontSize: '0.68rem', marginBottom: '0.5rem' }}>Index</span>
                  <ul style={{ listStyle: 'none', lineHeight: 2, fontSize: '0.88rem', color: 'var(--text-body)' }}>
                    <li><Link href="/#about">About</Link></li>
                    <li><Link href="/#projects">Projects</Link></li>
                    <li><Link href="/#notes">Writing</Link></li>
                    <li><Link href="/#timeline">Timeline</Link></li>
                  </ul>
                </div>

                <div>
                  <span className="kicker-wrapper" style={{ fontSize: '0.68rem', marginBottom: '0.5rem' }}>Location</span>
                  <p style={{ fontSize: '0.88rem', color: 'var(--text-body)' }}>Colombo, Sri Lanka</p>
                  <p style={{ fontSize: '0.78rem', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}>UTC+05:30 (IST)</p>
                </div>
              </div>
            </div>

            <div
              style={{
                borderTop: '1px solid var(--border-hairline)',
                paddingTop: '2rem',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                flexWrap: 'wrap',
                gap: '1rem',
                fontSize: '0.8rem',
                color: 'var(--text-muted)',
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
