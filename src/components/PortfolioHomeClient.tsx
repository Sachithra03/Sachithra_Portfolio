'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { FlowFieldCanvas } from './FlowFieldCanvas';
import { HeaderNav } from './HeaderNav';
import { OrangeTickerStrip } from './OrangeTickerStrip';
import { AmbientTerminalClip } from './AmbientTerminalClip';
import { InteractiveProjectsTable } from './InteractiveProjectsTable';
import { InteractiveWritingsTable } from './InteractiveWritingsTable';
import { InteractiveCertificates } from './InteractiveCertificates';
import { BrutalistContactSection } from './BrutalistContactSection';
import { ExternalLink, Download, FileText, ArrowDown, Layers, Terminal } from 'lucide-react';

interface PortfolioHomeClientProps {
  data: {
    profile: any;
    projects: any[];
    certificates: any[];
    experiences: any[];
    educations: any[];
    skills: any[];
    notes: any[];
    socials: any[];
  };
}

const HERO_ROLES = [
  'Software Engineer',
  'Full-Stack Developer',
  'Mobile App Developer',
];

function safeYear(val: any, fallback = ''): string {
  if (!val) return fallback;
  const d = new Date(val);
  if (isNaN(d.getTime())) {
    if (typeof val === 'string' && val.length >= 4) return val.slice(0, 4);
    return fallback;
  }
  return String(d.getFullYear());
}

export function PortfolioHomeClient({ data }: PortfolioHomeClientProps) {
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  const [typedRole, setTypedRole] = useState(HERO_ROLES[0]);
  const [githubRepoCount, setGithubRepoCount] = useState<number | null>(null);
  const [githubRepoCountError, setGithubRepoCountError] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem('sachithra_theme') as 'light' | 'dark' | null;
    if (saved) {
      setTheme(saved);
      if (saved === 'dark') {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
    }
  }, []);

  useEffect(() => {
    const controller = new AbortController();

    fetch('/api/github/repositories', {
      cache: 'no-store',
      signal: controller.signal,
    })
      .then(async (response) => {
        const result: { count?: unknown } = await response.json();
        if (!response.ok || typeof result.count !== 'number' || !Number.isInteger(result.count)) {
          throw new Error('Public GitHub repository count is unavailable');
        }
        setGithubRepoCount(result.count);
      })
      .catch((error: unknown) => {
        if (controller.signal.aborted) return;
        console.error('[GitHub repositories] Failed to load public repository count:', error);
        setGithubRepoCountError(true);
      });

    return () => controller.abort();
  }, []);

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    let roleIndex = 0;
    let characterIndex = HERO_ROLES[0].length;
    let deleting = true;
    let timeout: ReturnType<typeof setTimeout>;

    const step = () => {
      const currentRole = HERO_ROLES[roleIndex];

      if (deleting) {
        characterIndex -= 1;
        setTypedRole(currentRole.slice(0, characterIndex));

        if (characterIndex === 0) {
          deleting = false;
          roleIndex = (roleIndex + 1) % HERO_ROLES.length;
          timeout = setTimeout(step, 250);
        } else {
          timeout = setTimeout(step, 45);
        }
        return;
      }

      const nextRole = HERO_ROLES[roleIndex];
      characterIndex += 1;
      setTypedRole(nextRole.slice(0, characterIndex));

      if (characterIndex === nextRole.length) {
        deleting = true;
        timeout = setTimeout(step, 1200);
      } else {
        timeout = setTimeout(step, 80);
      }
    };

    timeout = setTimeout(step, 1200);
    return () => clearTimeout(timeout);
  }, []);

  const toggleTheme = () => {
    const nextTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(nextTheme);
    localStorage.setItem('sachithra_theme', nextTheme);
    if (nextTheme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  };

  const {
    profile,
    projects,
    certificates,
    experiences,
    educations,
    skills,
    notes,
  } = data;

  const resumeUrl = profile?.resumeFileId
    ? `/api/files/${profile.resumeFileId}?download=true`
    : '/api/files/6b027f0774981c35017dd70c?download=true';

  return (
    <div style={{ position: 'relative', minHeight: '100vh', backgroundColor: 'var(--background)' }}>
      {/* 1. Generative Flow-Field Background Canvas from Kusal's site */}
      <FlowFieldCanvas theme={theme} />

      {/* 2. Fractal Noise Overlay */}
      <div className="noise-overlay" aria-hidden="true" />

      {/* 3. Header Navigation */}
      <HeaderNav currentTheme={theme} onToggleTheme={toggleTheme} resumeUrl={resumeUrl} />

      {/* Main Content Area */}
      <div style={{ position: 'relative', zIndex: 10, paddingTop: '3.25rem' }}>
        {/* ========================================================
            HERO SECTION (Inspired by Kusal Salpura)
        ======================================================== */}
        <section
          id="top"
          style={{
            maxWidth: '1600px',
            margin: '0 auto',
            minHeight: 'calc(100vh - 3.25rem)',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            padding: '2.5rem 1.5rem 3rem 1.5rem',
          }}
        >
          {/* Sub-bar with Coordinates */}
          <div
            style={{
              display: 'flex',
              alignItems: 'flex-start',
              justifyContent: 'space-between',
              borderBottom: '1px solid var(--line)',
              paddingBottom: '1rem',
              fontFamily: 'var(--font-mono)',
              fontSize: '0.72rem',
              textTransform: 'uppercase',
              letterSpacing: '0.08em',
              color: 'var(--muted-foreground)',
            }}
          >
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
              <span style={{ color: 'var(--accent)', fontWeight: 700 }}>[ 001 / PORTFOLIO ]</span>
              <span>VERSION 2026.07 // PRODUCTION</span>
            </div>
            <div style={{ textAlign: 'right', display: 'flex', flexDirection: 'column', gap: '0.25rem' }} className="hide-mobile-clock">
              <span>LAT 6.9271° N</span>
              <span>LON 79.8612° E / COLOMBO, LK</span>
            </div>
          </div>

          {/* Huge Display Heading */}
          <div style={{ padding: '3.5rem 0 2.5rem 0' }}>
            <h1
              style={{
                fontFamily: 'var(--font-display)',
                fontWeight: 700,
                textTransform: 'uppercase',
                lineHeight: 0.85,
                letterSpacing: '-0.04em',
                color: 'var(--foreground)',
              }}
            >
              <span
                style={{
                  display: 'block',
                  fontSize: 'clamp(3.8rem, 13vw, 9.5rem)',
                }}
              >
                SACHITHRA
              </span>
              <span
                style={{
                  display: 'block',
                  fontSize: 'clamp(3.8rem, 13vw, 9.5rem)',
                  color: 'var(--accent)',
                }}
              >
                INDRACHAPA
              </span>
            </h1>

            {/* Subtitle & Terminal cursor */}
            <div
              style={{
                marginTop: '1.75rem',
                display: 'flex',
                flexDirection: 'column',
                gap: '1rem',
                borderTop: '1px solid var(--line)',
                paddingTop: '1.25rem',
              }}
              className="hero-bio-row"
            >
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.95rem',
                  color: 'var(--foreground)',
                }}
              >
                <span style={{ color: 'var(--muted-foreground)' }}>&gt;</span>
                <span className="visually-hidden">
                  Software Engineer, Full-Stack Developer, Mobile App Developer
                </span>
                <span aria-hidden="true">{typedRole}</span>
                <span aria-hidden="true" className="cursor-blink" style={{ color: 'var(--accent)', fontWeight: 700 }}>_</span>
              </div>

              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: '1.5fr 1fr',
                  gap: '2.5rem',
                  alignItems: 'flex-start',
                }}
                className="hero-split-grid"
              >
                <p
                  style={{
                    fontSize: '1.05rem',
                    lineHeight: 1.7,
                    color: 'var(--muted-foreground)',
                    maxWidth: '680px',
                  }}
                >
                  Software Engineering undergraduate focused on full-stack web and mobile app development. I build responsive applications with Next.js, Node.js, and React Native. Available for opportunities.
                </p>

                {/* Ambient Terminal Clip */}
                <AmbientTerminalClip />
              </div>
            </div>
          </div>

          {/* 4 Brutalist Quick-Action Grid Boxes */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(4, 1fr)',
              gap: '1px',
              backgroundColor: 'var(--line)',
              border: '1px solid var(--line)',
            }}
            className="hero-action-grid"
          >
            <a
              href="#work"
              style={{
                backgroundColor: 'var(--background)',
                padding: '1.25rem 1.5rem',
                textDecoration: 'none',
                color: 'var(--foreground)',
                transition: 'background-color 0.15s ease, color 0.15s ease',
              }}
              className="quick-box"
            >
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.7rem', color: 'var(--muted-foreground)', textTransform: 'uppercase' }}>
                01
              </div>
              <div style={{ fontFamily: 'var(--font-display)', fontSize: '1.15rem', fontWeight: 700, textTransform: 'uppercase', marginTop: '0.25rem' }}>
                View Work →
              </div>
            </a>

            <a
              href="#about"
              style={{
                backgroundColor: 'var(--background)',
                padding: '1.25rem 1.5rem',
                textDecoration: 'none',
                color: 'var(--foreground)',
                transition: 'background-color 0.15s ease, color 0.15s ease',
              }}
              className="quick-box"
            >
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.7rem', color: 'var(--muted-foreground)', textTransform: 'uppercase' }}>
                02
              </div>
              <div style={{ fontFamily: 'var(--font-display)', fontSize: '1.15rem', fontWeight: 700, textTransform: 'uppercase', marginTop: '0.25rem' }}>
                About Me
              </div>
            </a>

            <a
              href="#contact"
              style={{
                backgroundColor: 'var(--background)',
                padding: '1.25rem 1.5rem',
                textDecoration: 'none',
                color: 'var(--foreground)',
                transition: 'background-color 0.15s ease, color 0.15s ease',
              }}
              className="quick-box"
            >
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.7rem', color: 'var(--muted-foreground)', textTransform: 'uppercase' }}>
                03
              </div>
              <div style={{ fontFamily: 'var(--font-display)', fontSize: '1.15rem', fontWeight: 700, textTransform: 'uppercase', marginTop: '0.25rem' }}>
                Get in Touch
              </div>
            </a>

            <a
              href="#stack"
              style={{
                backgroundColor: 'var(--background)',
                padding: '1.25rem 1.5rem',
                textDecoration: 'none',
                color: 'var(--foreground)',
                transition: 'background-color 0.15s ease, color 0.15s ease',
              }}
              className="quick-box"
            >
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.7rem', color: 'var(--muted-foreground)', textTransform: 'uppercase' }}>
                04
              </div>
              <div style={{ fontFamily: 'var(--font-display)', fontSize: '1.15rem', fontWeight: 700, textTransform: 'uppercase', marginTop: '0.25rem' }}>
                Tech Stack
              </div>
            </a>
          </div>
        </section>

        {/* Orange Ticker Strip */}
        <OrangeTickerStrip />

        {/* ========================================================
            SEC.01 / ABOUT: I CRAFT HIGH-PERFORMANCE WEB & MOBILE APPLICATIONS
        ======================================================== */}
        <section id="about" className="brutalist-section">
          <div className="container-wide">
            <div className="section-label-header">
              <span className="section-label-mono">SEC.01 / ABOUT</span>
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.72rem', color: 'var(--muted-foreground)' }}>
                CORE PHILOSOPHY
              </span>
            </div>

            <h2 className="section-headline-display" style={{ marginBottom: '3rem', maxWidth: '1100px' }}>
              I craft <span style={{ color: 'var(--accent)' }}>high-performance</span> web &amp; mobile applications.
            </h2>

            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'minmax(0, 1fr)',
                gap: '0',
                alignItems: 'start',
                marginBottom: '4rem',
                maxWidth: '900px',
              }}
              className="about-grid"
            >
              {/* Left Bio Narrative */}
              <div>
                <p style={{ fontSize: '1.15rem', color: 'var(--foreground)', lineHeight: 1.8, marginBottom: '1.5rem' }}>
                  I&apos;m <strong>Sachithra Indrachapa</strong> — a Full-Stack Software Engineer undergraduate based in Colombo, Sri Lanka. I specialize in architecting distributed web platforms, high-throughput backend services, and clean, resilient digital products.
                </p>
                <p style={{ fontSize: '1.05rem', color: 'var(--muted-foreground)', lineHeight: 1.8, marginBottom: '1.5rem' }}>
                  At SLIIT, I lead technical design across modern web architectures, containerized microservices, and database streaming systems. I treat software development with discipline: prioritizing clean API boundaries, low latency, and zero unnecessary dependencies.
                </p>
                <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
                  <a href={resumeUrl} download="Sachithra_Indrachapa_Resume.pdf" className="btn-brutalist-primary">
                    <FileText size={15} /> Download Complete CV ↗
                  </a>
                  <a href="#contact" className="btn-brutalist-secondary">
                    Discuss Collaboration
                  </a>
                </div>
              </div>
            </div>

            {/* 4 Metric Counter Cards (from Kusal's site) */}
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(4, 1fr)',
                border: '1px solid var(--line)',
                backgroundColor: 'var(--background)',
              }}
              className="metrics-grid"
            >
              {[
                { num: '2+', label: 'YEARS DEV EXPERIENCE' },
                { num: '8+', label: 'PRODUCTION BUILDS SHIPPED' },
                { num: '100%', label: 'CODE INTEGRITY & COMMITS' },
                {
                  num: githubRepoCountError ? 'N/A' : githubRepoCount === null ? '...' : String(githubRepoCount),
                  label: githubRepoCountError
                    ? 'GITHUB COUNT UNAVAILABLE'
                    : githubRepoCount === null
                      ? 'LOADING GITHUB COUNT'
                      : 'PUBLIC GITHUB REPOSITORIES',
                },
              ].map((m, idx) => (
                <div
                  key={idx}
                  style={{
                    padding: '2rem 1.5rem',
                    borderRight: idx === 3 ? 'none' : '1px solid var(--line)',
                  }}
                  className="metric-box"
                >
                  <div
                    style={{
                      fontFamily: 'var(--font-display)',
                      fontSize: 'clamp(2.5rem, 5vw, 4rem)',
                      fontWeight: 700,
                      color: 'var(--accent)',
                      lineHeight: 1,
                    }}
                  >
                    {m.num}
                  </div>
                  <div
                    style={{
                      fontFamily: 'var(--font-mono)',
                      fontSize: '0.72rem',
                      color: 'var(--muted-foreground)',
                      textTransform: 'uppercase',
                      letterSpacing: '0.06em',
                      marginTop: '0.5rem',
                    }}
                  >
                    {m.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ========================================================
            SEC.02 / FEATURED PROJECTS: THINGS I'VE SHIPPED
        ======================================================== */}
        <section id="work" className="brutalist-section">
          <div className="container-wide">
            <div className="section-label-header">
              <span className="section-label-mono">SEC.02 / FEATURED PROJECTS</span>
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.72rem', color: 'var(--muted-foreground)' }}>
                {projects.length} ENTRIES — HOVER / CLICK TO INSPECT
              </span>
            </div>

            <h2 className="section-headline-display" style={{ marginBottom: '2.5rem' }}>
              Things I&apos;ve shipped<span style={{ color: 'var(--accent)' }}>.</span>
            </h2>

            <InteractiveProjectsTable projects={projects} />
          </div>
        </section>

        {/* ========================================================
            SEC.03 / CAPABILITIES: STACK & TRAJECTORY
        ======================================================== */}
        <section id="stack" className="brutalist-section">
          <div className="container-wide">
            <div className="section-label-header">
              <span className="section-label-mono">SEC.03 / CAPABILITIES</span>
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.72rem', color: 'var(--muted-foreground)' }}>
                ENGINEERING COMPETENCY
              </span>
            </div>

            <h2 className="section-headline-display" style={{ marginBottom: '2.5rem' }}>
              Stack &amp; trajectory<span style={{ color: 'var(--accent)' }}>.</span>
            </h2>

            {/* Categorized Stack Grid */}
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(3, 1fr)',
                border: '1px solid var(--line)',
                backgroundColor: 'var(--background)',
                marginBottom: '3.5rem',
              }}
              className="stack-categories-grid"
            >
              {[
                {
                  title: 'FRONTEND',
                  skills: ['React', 'Next.js 14', 'TypeScript', 'Tailwind CSS', 'Redux', 'Vanilla CSS'],
                },
                {
                  title: 'BACKEND',
                  skills: ['Node.js', 'Express', 'Mongoose', 'REST APIs', 'C# / .NET', 'Clean Architecture'],
                },
                {
                  title: 'DATABASES',
                  skills: ['MongoDB Atlas', 'GridFS Streaming', 'PostgreSQL', 'MySQL', 'SQLite / Room DB'],
                },
                {
                  title: 'DEVOPS & CLOUD',
                  skills: ['AWS EC2/S3', 'Docker', 'GitHub Actions', 'CI/CD Pipelines', 'Linux Kernel / Bash'],
                },
                {
                  title: 'MOBILE APPS',
                  skills: ['React Native CLI', 'Kotlin', 'Android Studio', 'Cross-Platform Architecture'],
                },
                {
                  title: 'TESTING & BENCHMARK',
                  skills: ['Jest', 'Artillery Load Testing', 'Unit Testing', 'Performance Profiling'],
                },
              ].map((cat, i) => (
                <div
                  key={i}
                  style={{
                    padding: '2rem 1.75rem',
                    borderRight: (i + 1) % 3 === 0 ? 'none' : '1px solid var(--line)',
                    borderBottom: i < 3 ? '1px solid var(--line)' : 'none',
                  }}
                  className="stack-cat-box"
                >
                  <span
                    style={{
                      fontFamily: 'var(--font-mono)',
                      fontSize: '0.72rem',
                      color: 'var(--accent)',
                      fontWeight: 700,
                      textTransform: 'uppercase',
                      letterSpacing: '0.08em',
                      display: 'block',
                      marginBottom: '1rem',
                    }}
                  >
                    {cat.title}
                  </span>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.45rem' }}>
                    {cat.skills.map((s, idx) => (
                      <span
                        key={idx}
                        style={{
                          fontFamily: 'var(--font-display)',
                          fontSize: '1.05rem',
                          fontWeight: 700,
                          color: 'var(--foreground)',
                          textTransform: 'uppercase',
                        }}
                      >
                        {s}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            {/* Experience & Academic Timeline */}
            <div style={{ border: '1px solid var(--line)', backgroundColor: 'var(--background)' }}>
              <div
                style={{
                  padding: '1rem 1.5rem',
                  borderBottom: '1px solid var(--line)',
                  backgroundColor: 'var(--secondary)',
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.75rem',
                  fontWeight: 700,
                  textTransform: 'uppercase',
                  color: 'var(--foreground)',
                }}
              >
                EXPERIENCE &amp; ACADEMIC TIMELINE
              </div>

              {experiences.map((exp: any, idx: number) => (
                <div
                  key={exp._id}
                  style={{
                    padding: '1.75rem 1.5rem',
                    borderBottom: '1px solid var(--line)',
                    display: 'grid',
                    gridTemplateColumns: '220px 1fr',
                    gap: '2rem',
                  }}
                  className="timeline-row"
                >
                  <div>
                    <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.85rem', color: 'var(--accent)', fontWeight: 700 }}>
                      {safeYear(exp.startDate, '2023')} — {exp.current ? 'PRESENT' : safeYear(exp.endDate, '2025')}
                    </span>
                    <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: 'var(--muted-foreground)', marginTop: '0.2rem' }}>
                      {exp.location}
                    </p>
                  </div>
                  <div>
                    <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.35rem', fontWeight: 700, color: 'var(--foreground)' }}>
                      {exp.role} <span style={{ color: 'var(--muted-foreground)', fontWeight: 400 }}>// {exp.company}</span>
                    </h3>
                    <p style={{ fontSize: '0.95rem', color: 'var(--muted-foreground)', lineHeight: 1.7, marginTop: '0.5rem', marginBottom: '0.75rem' }}>
                      {exp.description}
                    </p>
                    {exp.achievements?.length > 0 && (
                      <ul style={{ paddingLeft: '1.25rem', fontSize: '0.9rem', color: 'var(--foreground)', lineHeight: 1.6 }}>
                        {exp.achievements.map((ach: string, i: number) => (
                          <li key={i}>{ach}</li>
                        ))}
                      </ul>
                    )}
                  </div>
                </div>
              ))}

              {educations.map((edu: any, idx: number) => (
                <div
                  key={edu._id}
                  style={{
                    padding: '1.75rem 1.5rem',
                    display: 'grid',
                    gridTemplateColumns: '220px 1fr',
                    gap: '2rem',
                  }}
                  className="timeline-row"
                >
                  <div>
                    <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.85rem', color: 'var(--accent)', fontWeight: 700 }}>
                      {safeYear(edu.startDate, '2022')} — {edu.endDate ? safeYear(edu.endDate, '2026') : '2026'}
                    </span>
                    <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: 'var(--muted-foreground)', marginTop: '0.2rem' }}>
                      ACADEMIC DEGREE
                    </p>
                  </div>
                  <div>
                    <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.35rem', fontWeight: 700, color: 'var(--foreground)' }}>
                      {edu.degree}
                    </h3>
                    <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.82rem', color: 'var(--accent)', marginTop: '0.25rem', fontWeight: 600 }}>
                      {edu.institution}
                    </p>
                    <p style={{ fontSize: '0.9rem', color: 'var(--muted-foreground)', lineHeight: 1.6, marginTop: '0.5rem' }}>
                      {edu.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ========================================================
            SEC.04 / WRITINGS: NOTES & FIELD LOGS
        ======================================================== */}
        <section id="writing" className="brutalist-section">
          <div className="container-wide">
            <div className="section-label-header">
              <span className="section-label-mono">SEC.04 / WRITINGS</span>
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.72rem', color: 'var(--muted-foreground)' }}>
                WHAT I LEARN, I DOCUMENT
              </span>
            </div>

            <h2 className="section-headline-display" style={{ marginBottom: '2.5rem' }}>
              Notes &amp; field logs<span style={{ color: 'var(--accent)' }}>.</span>
            </h2>

            <InteractiveWritingsTable notes={notes} />
          </div>
        </section>

        {/* ========================================================
            SEC.05 / CREDENTIALS: THE FORMAL FOUNDATION
        ======================================================== */}
        <section id="credentials" className="brutalist-section">
          <div className="container-wide">
            <div className="section-label-header">
              <span className="section-label-mono">SEC.05 / CREDENTIALS</span>
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.72rem', color: 'var(--muted-foreground)' }}>
                VERIFIED ATTESTATIONS ({certificates.length})
              </span>
            </div>

            <h2 className="section-headline-display" style={{ marginBottom: '2.5rem' }}>
              Formal foundation<span style={{ color: 'var(--accent)' }}>.</span>
            </h2>

            <InteractiveCertificates certificates={certificates} />
          </div>
        </section>

        {/* ========================================================
            SEC.06 / CONTACT: LET'S BUILD SOMETHING
        ======================================================== */}
        <section id="contact" className="brutalist-section" style={{ borderBottom: 'none' }}>
          <div className="container-wide">
            <div className="section-label-header">
              <span className="section-label-mono">SEC.06 / CONTACT</span>
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.72rem', color: 'var(--muted-foreground)' }}>
                DISPATCH INQUIRY
              </span>
            </div>

            <h2 className="section-headline-display" style={{ marginBottom: '1.5rem' }}>
              Let&apos;s build <span style={{ color: 'var(--accent)' }}>something.</span>
            </h2>

            <p style={{ fontSize: '1.15rem', color: 'var(--muted-foreground)', maxWidth: '750px', marginBottom: '3rem', lineHeight: 1.7 }}>
              Have an engineering challenge, full-stack opening, or distributed system in mind? I reply to every legitimate inquiry within 24 hours.
            </p>

            <BrutalistContactSection />
          </div>
        </section>

        {/* ========================================================
            BRUTALIST FOOTER (from Kusal Salpura)
        ======================================================== */}
        <footer
          style={{
            borderTop: '1px solid var(--line)',
            backgroundColor: 'var(--background)',
            padding: '2.5rem 1.5rem',
          }}
        >
          <div
            style={{
              maxWidth: '1600px',
              margin: '0 auto',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              flexWrap: 'wrap',
              gap: '1.5rem',
              fontFamily: 'var(--font-mono)',
              fontSize: '0.75rem',
              textTransform: 'uppercase',
              letterSpacing: '0.06em',
              color: 'var(--muted-foreground)',
            }}
            className="footer-row"
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <span style={{ color: 'var(--accent)' }}>●</span>
              <span style={{ color: 'var(--foreground)', fontWeight: 600 }}>STATUS — AVAILABLE FOR HIRE</span>
            </div>

            <div>
              © {new Date().getFullYear()} SACHITHRA INDRACHAPA // ALL RIGHTS RESERVED
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
              <span>BUILT WITH NEXT.JS &amp; GRIDFS</span>
              <span style={{ color: 'var(--accent)' }}>/</span>
              <span>NO TRACKERS</span>
            </div>
          </div>
        </footer>
      </div>

      <style jsx>{`
        .quick-box:hover {
          background-color: var(--accent) !important;
          color: #ffffff !important;
        }
        .quick-box:hover div {
          color: #ffffff !important;
        }
        .cert-row:hover {
          background-color: var(--secondary) !important;
        }
        @media (max-width: 900px) {
          .hero-action-grid {
            grid-template-columns: 1fr 1fr !important;
          }
          .timeline-row {
            grid-template-columns: minmax(0, 1fr) !important;
            gap: 0.75rem !important;
          }
          .timeline-row > div {
            min-width: 0;
          }
          .about-grid {
            grid-template-columns: 1fr !important;
          }
          .metrics-grid {
            grid-template-columns: 1fr 1fr !important;
          }
          .stack-categories-grid {
            grid-template-columns: 1fr !important;
          }
          .stack-cat-box {
            border-right: none !important;
            border-bottom: 1px solid var(--line) !important;
          }
          .hero-split-grid {
            grid-template-columns: 1fr !important;
          }
          .footer-row {
            flex-direction: column !important;
            align-items: flex-start !important;
          }
        }
      `}</style>
    </div>
  );
}
