'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Lock, Menu, X, ArrowUpRight } from 'lucide-react';

interface HeaderNavProps {
  currentTheme: 'light' | 'dark';
  onToggleTheme: () => void;
  resumeUrl?: string;
}

export function HeaderNav({ currentTheme, onToggleTheme, resumeUrl }: HeaderNavProps) {
  const [timeStr, setTimeStr] = useState('');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const updateTime = () => {
      try {
        const now = new Date();
        const options: Intl.DateTimeFormatOptions = {
          timeZone: 'Asia/Colombo',
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
          hour12: true,
        };
        setTimeStr(new Intl.DateTimeFormat('en-US', options).format(now));
      } catch {
        setTimeStr('');
      }
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <header
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 50,
        borderBottom: '1px solid var(--line)',
        backgroundColor: currentTheme === 'dark' ? 'rgba(10, 10, 10, 0.88)' : 'rgba(245, 245, 240, 0.88)',
        backdropFilter: 'blur(8px)',
        transition: 'background-color 0.2s ease, border-color 0.2s ease',
      }}
    >
      <div
        style={{
          maxWidth: '1600px',
          margin: '0 auto',
          height: '3.25rem',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '0 1.5rem',
        }}
      >
        {/* Brand */}
        <Link
          href="#top"
          style={{
            fontFamily: 'var(--font-display)',
            fontSize: '0.95rem',
            fontWeight: 700,
            letterSpacing: '-0.02em',
            color: 'var(--foreground)',
            textTransform: 'uppercase',
          }}
          className="brand-link"
        >
          SACHITHRA_INDRACHAPA<span style={{ color: 'var(--accent)' }}>.DEV</span>
        </Link>

        {/* Center Desktop Navigation */}
        <nav
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '1.75rem',
          }}
          className="desktop-nav-links"
        >
          {[
            { href: '#about', label: 'ABOUT' },
            { href: '#work', label: 'WORK' },
            { href: '#stack', label: 'STACK' },
            { href: '#writing', label: 'WRITING' },
            { href: '#credentials', label: 'CREDENTIALS' },
            { href: '#contact', label: 'CONTACT' },
          ].map((item) => (
            <Link
              key={item.href}
              href={item.href}
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '0.75rem',
                textTransform: 'uppercase',
                letterSpacing: '0.08em',
                color: 'var(--muted-foreground)',
                transition: 'color 0.15s ease',
              }}
              className="nav-item"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        {/* Right Controls */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          {/* Live Colombo Time Clock */}
          {timeStr && (
            <span
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '0.72rem',
                color: 'var(--muted-foreground)',
                letterSpacing: '0.05em',
              }}
              className="hide-mobile-clock"
            >
              CMB — <span style={{ color: 'var(--foreground)', fontWeight: 600 }}>{timeStr}</span>
            </span>
          )}

          {/* Theme Switcher Button */}
          <button
            type="button"
            onClick={onToggleTheme}
            aria-label="Toggle visual theme"
            className="theme-toggle-btn"
            style={{
              height: '2rem',
              display: 'flex',
              alignItems: 'center',
              gap: '0.4rem',
              padding: '0 0.65rem',
              border: '1px solid var(--line)',
              backgroundColor: 'transparent',
              fontFamily: 'var(--font-mono)',
              fontSize: '0.68rem',
              textTransform: 'uppercase',
              letterSpacing: '0.08em',
              color: 'var(--foreground)',
              cursor: 'pointer',
              borderRadius: 'var(--radius)',
              transition: 'all 0.15s ease',
            }}
          >
            <span>[{currentTheme === 'dark' ? 'DARK' : 'LIGHT'}]</span>
          </button>

          {/* CV Download */}
          <a
            href={resumeUrl || '/api/files/6b027f0774981c35017dd70c?download=true'}
            download="Sachithra_Indrachapa_Resume.pdf"
            className="cv-btn hide-mobile-clock"
            style={{
              height: '2rem',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.35rem',
              padding: '0 0.75rem',
              backgroundColor: 'var(--accent)',
              color: '#FFFFFF',
              fontFamily: 'var(--font-mono)',
              fontSize: '0.68rem',
              fontWeight: 600,
              letterSpacing: '0.06em',
              textTransform: 'uppercase',
              textDecoration: 'none',
              borderRadius: 'var(--radius)',
              transition: 'background-color 0.15s ease',
            }}
          >
            CV ↗
          </a>

          {/* Admin Lock */}
          <Link
            href="/admin/dashboard"
            title="Admin CMS"
            style={{
              color: 'var(--muted-foreground)',
              display: 'flex',
              alignItems: 'center',
              padding: '4px',
              borderRadius: 'var(--radius)',
              transition: 'color 0.15s ease',
            }}
          >
            <Lock size={15} />
          </Link>

          {/* Mobile Hamburger Toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="mobile-hamburger-btn"
            aria-label="Toggle navigation drawer"
            style={{
              display: 'none',
              background: 'none',
              border: 'none',
              color: 'var(--foreground)',
              padding: '4px',
              cursor: 'pointer',
            }}
          >
            {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div
          style={{
            borderTop: '1px solid var(--line)',
            backgroundColor: 'var(--background)',
            padding: '1.5rem',
            display: 'flex',
            flexDirection: 'column',
            gap: '1rem',
          }}
        >
          {[
            { href: '#about', label: '01 ABOUT' },
            { href: '#work', label: '02 WORK' },
            { href: '#stack', label: '03 STACK' },
            { href: '#writing', label: '04 WRITING' },
            { href: '#credentials', label: '05 CREDENTIALS' },
            { href: '#contact', label: '06 CONTACT' },
          ].map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setMobileMenuOpen(false)}
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: '1.25rem',
                fontWeight: 700,
                textTransform: 'uppercase',
                color: 'var(--foreground)',
                padding: '0.5rem 0',
                borderBottom: '1px solid var(--border)',
              }}
            >
              {item.label}
            </Link>
          ))}
          <div style={{ display: 'flex', gap: '0.75rem', marginTop: '0.5rem' }}>
            <a
              href={resumeUrl || '/api/files/6b027f0774981c35017dd70c?download=true'}
              download
              style={{
                flex: 1,
                textAlign: 'center',
                padding: '0.75rem',
                backgroundColor: 'var(--accent)',
                color: '#FFFFFF',
                fontFamily: 'var(--font-mono)',
                fontSize: '0.75rem',
                fontWeight: 600,
                textTransform: 'uppercase',
                borderRadius: 'var(--radius)',
              }}
            >
              Download CV PDF ↗
            </a>
          </div>
        </div>
      )}

      <style jsx>{`
        .nav-item:hover {
          color: var(--foreground) !important;
        }
        .theme-toggle-btn:hover {
          background-color: var(--accent) !important;
          color: #ffffff !important;
          border-color: var(--accent) !important;
        }
        @media (max-width: 900px) {
          .desktop-nav-links {
            display: none !important;
          }
          .hide-mobile-clock {
            display: none !important;
          }
          .mobile-hamburger-btn {
            display: block !important;
          }
        }
      `}</style>
    </header>
  );
}
