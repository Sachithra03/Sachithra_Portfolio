'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Lock, Menu, X, ArrowUpRight } from 'lucide-react';

export function Navigation({ resumeUrl }: { resumeUrl?: string }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header
      style={{
        position: 'sticky',
        top: 0,
        zIndex: 50,
        backgroundColor: 'rgba(245, 241, 232, 0.94)',
        backdropFilter: 'blur(10px)',
        borderBottom: '1px solid var(--border)',
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
        {/* Left: Brand name */}
        <Link
          href="/"
          style={{
            fontFamily: 'var(--font-serif)',
            fontSize: '1.35rem',
            fontWeight: 600,
            letterSpacing: '-0.015em',
            color: 'var(--text-primary)',
            display: 'inline-flex',
            alignItems: 'baseline',
          }}
        >
          Sachithra Indrachapa<span className="accent-dot">.</span>
        </Link>

        {/* Desktop Navigation */}
        <nav
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '1.75rem',
          }}
          className="desktop-nav"
        >
          <Link href="/#about" style={{ fontSize: '0.88rem', color: 'var(--text-primary)', fontWeight: 500 }}>
            About
          </Link>
          <Link href="/#stack" style={{ fontSize: '0.88rem', color: 'var(--text-primary)', fontWeight: 500 }}>
            Stack
          </Link>
          <Link href="/#projects" style={{ fontSize: '0.88rem', color: 'var(--text-primary)', fontWeight: 500 }}>
            Projects
          </Link>
          <Link href="/#notes" style={{ fontSize: '0.88rem', color: 'var(--text-primary)', fontWeight: 500 }}>
            Writing
          </Link>
          <Link href="/#experience" style={{ fontSize: '0.88rem', color: 'var(--text-primary)', fontWeight: 500 }}>
            Experience
          </Link>
          <Link href="/#education" style={{ fontSize: '0.88rem', color: 'var(--text-primary)', fontWeight: 500 }}>
            Education
          </Link>
          <Link href="/#contact" style={{ fontSize: '0.88rem', color: 'var(--text-primary)', fontWeight: 500 }}>
            Contact
          </Link>

          <a
            href={resumeUrl || '/api/files/6b027f0774981c35017dd70c?download=true'}
            download="Sachithra_Indrachapa_Resume.pdf"
            className="btn-ink-primary"
            style={{ padding: '0.45rem 1.1rem', fontSize: '0.8rem' }}
          >
            Resume ↗
          </a>

          <Link
            href="/admin/dashboard"
            title="Admin Login"
            style={{
              color: 'var(--text-secondary)',
              display: 'flex',
              alignItems: 'center',
              padding: '6px',
              borderRadius: '4px',
              transition: 'color var(--transition-fast)',
            }}
          >
            <Lock size={15} />
          </Link>
        </nav>

        {/* Mobile Hamburger Toggle Button */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="mobile-toggle"
          aria-label="Toggle navigation menu"
          style={{
            display: 'none',
            color: 'var(--text-primary)',
            padding: '6px',
            border: 'none',
            background: 'none',
            cursor: 'pointer',
          }}
        >
          {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div
          style={{
            borderTop: '1px solid var(--border)',
            backgroundColor: 'var(--bg-main)',
            padding: '1.5rem',
            display: 'flex',
            flexDirection: 'column',
            gap: '1.25rem',
          }}
          className="mobile-menu"
        >
          <Link
            href="/#about"
            onClick={() => setMobileMenuOpen(false)}
            style={{ fontSize: '1rem', color: 'var(--text-primary)', fontWeight: 500 }}
          >
            About
          </Link>
          <Link
            href="/#stack"
            onClick={() => setMobileMenuOpen(false)}
            style={{ fontSize: '1rem', color: 'var(--text-primary)', fontWeight: 500 }}
          >
            Stack
          </Link>
          <Link
            href="/#projects"
            onClick={() => setMobileMenuOpen(false)}
            style={{ fontSize: '1rem', color: 'var(--text-primary)', fontWeight: 500 }}
          >
            Projects
          </Link>
          <Link
            href="/#notes"
            onClick={() => setMobileMenuOpen(false)}
            style={{ fontSize: '1rem', color: 'var(--text-primary)', fontWeight: 500 }}
          >
            Writing
          </Link>
          <Link
            href="/#experience"
            onClick={() => setMobileMenuOpen(false)}
            style={{ fontSize: '1rem', color: 'var(--text-primary)', fontWeight: 500 }}
          >
            Experience
          </Link>
          <Link
            href="/#education"
            onClick={() => setMobileMenuOpen(false)}
            style={{ fontSize: '1rem', color: 'var(--text-primary)', fontWeight: 500 }}
          >
            Education
          </Link>
          <Link
            href="/#contact"
            onClick={() => setMobileMenuOpen(false)}
            style={{ fontSize: '1rem', color: 'var(--text-primary)', fontWeight: 500 }}
          >
            Contact
          </Link>
          <div style={{ display: 'flex', gap: '1rem', alignItems: 'center', paddingTop: '0.5rem', borderTop: '1px solid var(--border)' }}>
            <a
              href={resumeUrl || '/api/files/6b027f0774981c35017dd70c?download=true'}
              download
              className="btn-ink-primary"
              style={{ width: '100%', textAlign: 'center', padding: '0.6rem' }}
            >
              Resume PDF ↗
            </a>
            <Link
              href="/admin/dashboard"
              onClick={() => setMobileMenuOpen(false)}
              style={{
                padding: '0.6rem',
                border: '1px solid var(--border)',
                borderRadius: 'var(--radius-pill)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'var(--text-secondary)',
              }}
            >
              <Lock size={16} />
            </Link>
          </div>
        </div>
      )}

      <style jsx>{`
        @media (max-width: 860px) {
          .desktop-nav {
            display: none !important;
          }
          .mobile-toggle {
            display: block !important;
          }
        }
      `}</style>
    </header>
  );
}
