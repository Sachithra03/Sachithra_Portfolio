import Link from 'next/link';
import { connectToDatabase } from '@/lib/db/mongodb';
import {
  Profile,
  Project,
  Certificate,
  Experience,
  Education,
  Skill,
  Note,
  SocialLink,
} from '@/models';
import {
  ArrowDown,
  ArrowRight,
  ExternalLink,
  Download,
  Github,
  Linkedin,
  Mail,
  FileText,
} from 'lucide-react';
import { ContactForm } from '@/components/ContactForm';

export const dynamic = 'force-dynamic';

// Fallback data when database is unavailable (offline mode, sandboxed runners, etc.)
function getFallbackData() {
  return {
    profile: {
      fullName: 'Sachithra Indrachapa',
      title: 'Full-Stack Software Engineer',
      headline: 'SOFTWARE ENGINEER / SRI LANKA',
      bio: 'I am a Software Engineering undergraduate at SLIIT, passionate about building meaningful digital products through modern web technologies, full stack development and DevOps.',
      location: 'Colombo, Sri Lanka',
      email: 'sachithrai1003@gmail.com',
      phone: '+94 71 859 6632',
      avatarImageId: '6b027f0374981c35017dd701',
      resumeFileId: '6b027f0774981c35017dd70c',
      availableForHire: true,
    },
    projects: [
      {
        _id: 'proj_1',
        title: 'Luvi Clothing',
        slug: 'luvi-clothing',
        description: 'Full stack clothing e-commerce platform with product management, shopping cart, checkout, sewing requests, authentication, order management, and secure payments.',
        coverImageId: '6b027f0874981c35017dd714',
        technologies: ['Next.js', 'TypeScript', 'React', 'MongoDB', 'Mongoose', 'Jest', 'PayHere'],
        liveUrl: 'https://luvi-clothing.vercel.app/',
        githubUrl: 'https://github.com/Sachithra03/luvi-clothing.git',
        status: 'completed',
        featured: true,
      },
      {
        _id: 'proj_2',
        title: 'SolarCharge Finder',
        slug: 'solar-charge-finder',
        description: 'Full stack EV charging discovery and marketplace platform featuring geolocation-based station discovery, advanced filtering, JWT and OAuth authentication, RBAC, reviews, and analytics.',
        coverImageId: '6b027f1874981c35017dd71d',
        technologies: ['Node.js', 'Express', 'MongoDB', 'React', 'Vite', 'Docker', 'GitHub Actions', 'Jest', 'Artillery'],
        liveUrl: 'https://solar-charge-finder.vercel.app/',
        githubUrl: 'https://github.com/SolarCharge-Finder/SolarCharge-Finder.git',
        status: 'completed',
        featured: true,
      },
      {
        _id: 'proj_3',
        title: 'Personal Portfolio CMS',
        slug: 'personal-portfolio-cms',
        description: 'Minimal editorial developer portfolio and headless CMS powered by Next.js App Router, MongoDB Atlas, and GridFS binary file streaming.',
        technologies: ['Next.js', 'TypeScript', 'MongoDB', 'GridFS', 'Mongoose', 'Zod', 'Vanilla CSS'],
        liveUrl: 'https://sachithraindrachapa.vercel.app/',
        githubUrl: 'https://github.com/Sachithra03/Sachithra_Portfolio.git',
        status: 'completed',
        featured: true,
      },
      {
        _id: 'proj_4',
        title: 'Xaphora Dress - E-Commerce Platform',
        slug: 'xaphora-dress',
        description: 'MERN-based clothing store with role-based access, JWT auth, user management, admin dashboard, and AI-powered customer support.',
        technologies: ['React', 'Node.js', 'MongoDB', 'Express', 'JWT', 'ChatGPT API'],
        githubUrl: 'https://github.com/TeamITPY2S2/Xaphora-Dress',
        status: 'completed',
        featured: false,
      },
      {
        _id: 'proj_5',
        title: 'EcoTrack – Smart Waste Management System',
        slug: 'eco-track',
        description: 'Web-based waste management platform with role-based dashboards, JWT authentication, ticket handling, payments, and route/location features using OpenStreetMap.',
        technologies: ['React', 'TypeScript', 'Tailwind CSS', 'Node.js', 'Express', 'MongoDB', 'JWT', 'OpenStreetMap'],
        githubUrl: 'https://github.com/OpenshelfTeam/EcoTrack.git',
        status: 'completed',
        featured: false,
      },
      {
        _id: 'proj_6',
        title: 'OpenShelf – University Library Mobile App',
        slug: 'openshelf-library',
        description: 'Mobile library application allowing university students to upload, share, and access study materials with online and offline support, secure authentication, and AI-assisted learning.',
        technologies: ['React Native CLI', 'TypeScript', 'Supabase', 'PostgreSQL', 'AsyncStorage'],
        githubUrl: 'https://github.com/kusal2002/OpenShelf.git',
        status: 'completed',
        featured: false,
      },
    ],
    certificates: [
      {
        _id: 'cert_1',
        title: 'PostgreSQL Essential Training',
        issuer: 'LinkedIn Learning',
        issueDate: new Date('2026-03-01'),
        credentialUrl: 'https://www.linkedin.com/learning/certificates/postgresql-essential-training',
        fileId: '6b027f2174981c35017dd722',
      },
      {
        _id: 'cert_2',
        title: 'Software Development Life Cycle (SDLC)',
        issuer: 'LinkedIn Learning',
        issueDate: new Date('2026-03-01'),
        credentialUrl: 'https://www.linkedin.com/learning/certificates/software-development-life-cycle-sdlc',
        fileId: '6b027f2874981c35017dd724',
      },
      {
        _id: 'cert_3',
        title: 'DevOps with GitHub and Docker',
        issuer: 'LinkedIn Learning',
        issueDate: new Date('2026-03-01'),
        credentialUrl: 'https://www.linkedin.com/learning/certificates/devops-foundations-github-actions-docker',
        fileId: '6b027f2c74981c35017dd726',
      },
      {
        _id: 'cert_4',
        title: 'Web Design for Beginners',
        issuer: 'University of Moratuwa',
        issueDate: new Date('2024-06-01'),
        credentialUrl: '',
        fileId: '6b027f2e74981c35017dd728',
      },
      {
        _id: 'cert_5',
        title: 'Front-End Development: Build an E-Commerce Website',
        issuer: 'LinkedIn Learning',
        issueDate: new Date('2024-05-01'),
        credentialUrl: '',
        fileId: '6b027f3274981c35017dd72a',
      },
    ],
    experiences: [
      {
        _id: 'exp_1',
        company: 'Academic Projects & Independent Engineering',
        role: 'Full-Stack Software Engineer',
        location: 'Colombo, Sri Lanka',
        startDate: new Date('2023-01-01'),
        current: true,
        description: 'Architecting scalable web applications, cross-platform mobile systems, and database streaming pipelines.',
        achievements: [
          'Engineered Luvi Clothing e-commerce platform with Next.js and PayHere checkout',
          'Built SolarCharge Finder EV marketplace with Docker containerization and Artillery benchmark testing',
          'Authored production portfolio with MongoDB GridFS zero-memory chunk streaming',
        ],
      },
    ],
    educations: [
      {
        _id: 'edu_1',
        institution: 'Sri Lanka Institute of Information Technology (SLIIT)',
        degree: 'B.Sc. (Hons) in Information Technology Specialising in Software Engineering',
        fieldOfStudy: 'Software Engineering',
        startDate: new Date('2022-06-01'),
        endDate: new Date('2026-06-01'),
        current: true,
        grade: 'Undergraduate',
        description: 'Comprehensive study of distributed computing, data structures, algorithms, object-oriented design, database architectures, and DevOps.',
      },
    ],
    skills: [],
    notes: [
      {
        _id: 'note_1',
        title: 'Eliminating Multi-Cloud Bloat: Moving to Database-Native Binary Storage',
        slug: 'eliminating-multi-cloud-bloat-mongodb-gridfs',
        summary: 'Why dual-brain architectures with external object stores introduce unnecessary cognitive overhead for personal portfolio CMS platforms, and how GridFS chunk streaming solves it.',
        published: true,
      },
      {
        _id: 'note_2',
        title: 'Building Resilient Microservices with Docker and Automated CI/CD',
        slug: 'building-resilient-microservices-docker-cicd',
        summary: 'Practical lessons learned from building and load testing the SolarCharge Finder EV charging platform with Artillery and GitHub Actions.',
        published: true,
      },
    ],
    socials: [
      {
        _id: 'soc_1',
        platform: 'GitHub',
        url: 'https://github.com/Sachithra03',
        label: 'GitHub',
        isPublic: true,
      },
      {
        _id: 'soc_2',
        platform: 'LinkedIn',
        url: 'https://www.linkedin.com/in/sachithra-indrachapa-9150b8190/',
        label: 'LinkedIn',
        isPublic: true,
      },
    ],
  };
}

async function getPortfolioData() {
  try {
    await connectToDatabase();

    const [
      profileDoc,
      projects,
      certificates,
      experiences,
      educations,
      skills,
      notes,
      socials,
    ] = await Promise.all([
      Profile.findOne().lean(),
      Project.find().sort({ order: 1, createdAt: -1 }).lean(),
      Certificate.find().sort({ order: 1, issueDate: -1 }).lean(),
      Experience.find().sort({ order: 1, startDate: -1 }).lean(),
      Education.find().sort({ order: 1, startDate: -1 }).lean(),
      Skill.find().sort({ category: 1, order: 1 }).lean(),
      Note.find({ published: true }).sort({ publishedAt: -1, createdAt: -1 }).lean(),
      SocialLink.find({ isPublic: true }).sort({ order: 1 }).lean(),
    ]);

    // If database returned empty collections (or not seeded), merge with fallback
    const fallback = getFallbackData();

    return {
      profile: profileDoc ? JSON.parse(JSON.stringify(profileDoc)) : fallback.profile,
      projects: projects && projects.length > 0 ? JSON.parse(JSON.stringify(projects)) : fallback.projects,
      certificates: certificates && certificates.length > 0 ? JSON.parse(JSON.stringify(certificates)) : fallback.certificates,
      experiences: experiences && experiences.length > 0 ? JSON.parse(JSON.stringify(experiences)) : fallback.experiences,
      educations: educations && educations.length > 0 ? JSON.parse(JSON.stringify(educations)) : fallback.educations,
      skills: skills && skills.length > 0 ? JSON.parse(JSON.stringify(skills)) : fallback.skills,
      notes: notes && notes.length > 0 ? JSON.parse(JSON.stringify(notes)) : fallback.notes,
      socials: socials && socials.length > 0 ? JSON.parse(JSON.stringify(socials)) : fallback.socials,
    };
  } catch (err) {
    console.warn('[PORTFOLIO] Database connection error, serving static fallback:', err);
    return getFallbackData();
  }
}

export default async function HomePage() {
  const {
    profile,
    projects,
    certificates,
    experiences,
    educations,
    skills,
    notes,
    socials,
  } = await getPortfolioData();

  const avatarUrl = profile?.avatarImageId
    ? `/api/files/${profile.avatarImageId}`
    : '/api/files/6b027f0374981c35017dd701';

  const resumeUrl = profile?.resumeFileId
    ? `/api/files/${profile.resumeFileId}?download=true`
    : '/api/files/6b027f0774981c35017dd70c?download=true';

  // Split projects into 2 featured and remaining compact
  const featuredProjects = projects.slice(0, 2);
  const remainingProjects = projects.slice(2);

  return (
    <div>
      {/* ========================================================
          HERO SECTION
      ======================================================== */}
      <section
        style={{
          paddingTop: '6rem',
          paddingBottom: '5.5rem',
          borderBottom: '1px solid var(--border-hairline)',
        }}
      >
        <div className="container">
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: '1.2fr 0.8fr',
              gap: '4rem',
              alignItems: 'center',
            }}
            className="hero-grid"
          >
            {/* Left Narrative */}
            <div>
              <div className="kicker-wrapper">
                <span className="kicker-dot" />
                <span>SOFTWARE ENGINEER / SRI LANKA</span>
              </div>

              <h1
                style={{
                  fontSize: 'clamp(3rem, 6.2vw, 4.8rem)',
                  lineHeight: 1.08,
                  marginBottom: '1.75rem',
                  color: 'var(--text-ink)',
                }}
              >
                Sachithra<br />
                Indrachapa<span className="accent-dot">.</span>
              </h1>

              <div
                style={{
                  fontSize: '1.15rem',
                  color: 'var(--text-body)',
                  lineHeight: 1.75,
                  maxWidth: '540px',
                  marginBottom: '2.5rem',
                }}
              >
                <p>
                  I am a Software Engineering undergraduate at SLIIT, passionate about building meaningful digital products through modern web technologies, full stack development and DevOps.
                </p>
              </div>

              {/* Action Buttons */}
              <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', marginBottom: '2.5rem' }}>
                <a href="#projects" className="btn-ink-primary">
                  Explore Projects <ArrowDown size={15} />
                </a>
                <a href="#about" className="btn-ink-secondary">
                  About Me
                </a>
              </div>

              {/* Quick Links Row */}
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '1.5rem',
                  flexWrap: 'wrap',
                  paddingTop: '1.25rem',
                  borderTop: '1px solid var(--border-hairline)',
                }}
              >
                <a
                  href={resumeUrl}
                  download="Sachithra_Indrachapa_Resume.pdf"
                  className="btn-editorial-text"
                >
                  <FileText size={15} /> Download CV ↗
                </a>
                <a
                  href="https://github.com/Sachithra03"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-editorial-text"
                  style={{ color: 'var(--text-muted)' }}
                >
                  <Github size={15} /> GitHub ↗
                </a>
                <a
                  href="https://www.linkedin.com/in/sachithra-indrachapa-9150b8190/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-editorial-text"
                  style={{ color: 'var(--text-muted)' }}
                >
                  <Linkedin size={15} /> LinkedIn ↗
                </a>
                <a
                  href="mailto:sachithrai1003@gmail.com"
                  className="btn-editorial-text"
                  style={{ color: 'var(--text-muted)' }}
                >
                  <Mail size={15} /> Email ↗
                </a>
              </div>
            </div>

            {/* Right Photo Print Card (Analogue Matte Frame from screenshot) */}
            <div style={{ display: 'flex', justifyContent: 'center' }}>
              <div className="photo-print-card" style={{ maxWidth: '360px', width: '100%' }}>
                <div className="photo-matte-inner">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={avatarUrl}
                    alt={profile?.fullName || 'Sachithra Indrachapa'}
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                      display: 'block',
                      filter: 'contrast(1.03)',
                    }}
                  />
                </div>
                <div className="photo-caption">
                  <div style={{ fontWeight: 600, letterSpacing: '0.12em', color: 'var(--text-ink)', fontSize: '0.78rem' }}>
                    SACHITHRA INDRACHAPA
                  </div>
                  <div style={{ color: 'var(--text-muted)', fontSize: '0.68rem', marginTop: '0.2rem', letterSpacing: '0.15em' }}>
                    SOFTWARE ENGINEERING / SLIIT
                  </div>
                </div>
                <div className="photo-vertical-caption">
                  EST. 2024 • SLIIT
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================
          TICKER STRIP DIVIDER
      ======================================================== */}
      <div className="editorial-ticker-strip">
        <div className="container">
          <div className="ticker-content">
            <span className="ticker-item"><span className="ticker-star">✦</span> FULL-STACK SYSTEMS</span>
            <span className="ticker-item"><span className="ticker-star">✦</span> NEXT.JS APP ROUTER</span>
            <span className="ticker-item"><span className="ticker-star">✦</span> MONGODB ATLAS & GRIDFS</span>
            <span className="ticker-item"><span className="ticker-star">✦</span> DEVOPS & CI/CD</span>
            <span className="ticker-item"><span className="ticker-star">✦</span> CLEAN MINIMAL ARCHITECTURE</span>
            <span className="ticker-item"><span className="ticker-star">✦</span> SLIIT UNDERGRADUATE</span>
          </div>
        </div>
      </div>

      {/* ========================================================
          01 / ABOUT: A SHORT INTRODUCTION
      ======================================================== */}
      <section id="about" className="editorial-section">
        <div className="container">
          <div className="section-header-row">
            <div>
              <div className="kicker-wrapper">
                <span className="kicker-dot" />
                <span>01 / ABOUT</span>
              </div>
              <h2 className="section-header-title">
                A short introduction<span className="accent-dot">.</span>
              </h2>
            </div>
            <span className="section-counter">01</span>
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: '1.25fr 0.75fr',
              gap: '4rem',
              alignItems: 'flex-start',
            }}
            className="intro-grid"
          >
            {/* Left Narrative */}
            <div>
              <p style={{ fontSize: '1.1rem', color: 'var(--text-body)', lineHeight: 1.8, marginBottom: '1.5rem' }}>
                I&apos;m a Software Engineering undergraduate at the Sri Lanka Institute of Information Technology (SLIIT). 
                I focus on crafting elegant, robust web and mobile applications with automated testing, cloud-native deployments, and thoughtful user experiences.
              </p>

              {/* Editorial Pullquote with Dropcap / Accent */}
              <div className="editorial-pullquote">
                &ldquo;Imagination is more important than knowledge. For knowledge is limited, whereas imagination embraces the entire world.&rdquo;
                <span className="editorial-pullquote-author">— Albert Einstein</span>
              </div>

              <p style={{ fontSize: '1.05rem', color: 'var(--text-body)', lineHeight: 1.8 }}>
                I believe software engineering should be treated with craftsmanship. Rather than accumulating bloated dependencies, I build resilient systems where data integrity, low latency, and intuitive editorial ergonomics are prioritized from day one.
              </p>
            </div>

            {/* Right Quick Facts Table */}
            <div className="quick-facts-card">
              <span className="kicker-wrapper" style={{ fontSize: '0.68rem', marginBottom: '1rem' }}>
                Quick Facts
              </span>
              <div className="quick-facts-row">
                <span className="quick-facts-label">Role</span>
                <span className="quick-facts-val">Full-Stack Engineer</span>
              </div>
              <div className="quick-facts-row">
                <span className="quick-facts-label">Education</span>
                <span className="quick-facts-val">SLIIT (BSc Hons IT - SE)</span>
              </div>
              <div className="quick-facts-row">
                <span className="quick-facts-label">Status</span>
                <span className="quick-facts-val" style={{ color: '#059669' }}>● Available for hire</span>
              </div>
              <div className="quick-facts-row">
                <span className="quick-facts-label">Location</span>
                <span className="quick-facts-val">Colombo, Sri Lanka</span>
              </div>
              <div className="quick-facts-row">
                <span className="quick-facts-label">Core Stack</span>
                <span className="quick-facts-val">TypeScript, Next.js, Mongo</span>
              </div>
              <div className="quick-facts-row">
                <span className="quick-facts-label">Storage</span>
                <span className="quick-facts-val">MongoDB Atlas & GridFS</span>
              </div>
              <div className="quick-facts-row">
                <span className="quick-facts-label">Resume</span>
                <span className="quick-facts-val">
                  <a href={resumeUrl} download="Sachithra_Indrachapa_Resume.pdf" className="btn-editorial-text" style={{ fontSize: '0.8rem' }}>
                    Download PDF ↗
                  </a>
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================
          02 / STACK: TOOLS OF THE TRADE
      ======================================================== */}
      <section id="stack" className="editorial-section">
        <div className="container">
          <div className="section-header-row">
            <div>
              <div className="kicker-wrapper">
                <span className="kicker-dot" />
                <span>02 / STACK</span>
              </div>
              <h2 className="section-header-title">
                Tools of the trade<span className="accent-dot">.</span>
              </h2>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginTop: '0.35rem' }}>
                Technologies and frameworks I build with daily.
              </p>
            </div>
            <span className="section-counter">02</span>
          </div>

          <div style={{ backgroundColor: 'var(--bg-card)', border: '1px solid var(--border-card)', borderRadius: 'var(--radius-xs)' }}>
            {[
              {
                num: '01',
                category: 'FRONTEND',
                tools: 'React, Next.js, TypeScript, Tailwind CSS, Vanilla CSS, Redux, State Management',
              },
              {
                num: '02',
                category: 'BACKEND',
                tools: 'Node.js, Express, Mongoose, RESTful APIs, C#, .NET Framework, Clean Architecture',
              },
              {
                num: '03',
                category: 'DATABASES',
                tools: 'MongoDB & GridFS Chunk Streaming, PostgreSQL, MySQL, SQLite, Room DB',
              },
              {
                num: '04',
                category: 'DEVOPS & CLOUD',
                tools: 'AWS Cloud Infrastructure, Docker, GitHub Actions, CI/CD Automated Pipelines, Linux',
              },
              {
                num: '05',
                category: 'MOBILE',
                tools: 'React Native CLI, Kotlin, Android Studio, Cross-Platform Architecture',
              },
              {
                num: '06',
                category: 'TESTING & QA',
                tools: 'Jest, Artillery Load Testing, Unit Testing, Performance Benchmarking, Cypress',
              },
            ].map((row, idx) => (
              <div key={idx} className="editorial-list-row">
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.8rem', color: 'var(--accent-orange)' }}>
                  {row.num}
                </span>
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.82rem', fontWeight: 600, color: 'var(--text-ink)', letterSpacing: '0.04em' }}>
                  {row.category}
                </span>
                <span style={{ fontSize: '0.92rem', color: 'var(--text-body)' }}>
                  {row.tools}
                </span>
                <span style={{ color: 'var(--text-muted)', fontSize: '1rem', textAlign: 'right' }}>
                  →
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ========================================================
          03 / SELECTED WORKS: PROJECTS & BUILDS
      ======================================================== */}
      <section id="projects" className="editorial-section">
        <div className="container">
          <div className="section-header-row">
            <div>
              <div className="kicker-wrapper">
                <span className="kicker-dot" />
                <span>03 / SELECTED WORKS</span>
              </div>
              <h2 className="section-header-title">
                Projects & builds<span className="accent-dot">.</span>
              </h2>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginTop: '0.35rem' }}>
                Selected software and web applications engineered recently.
              </p>
            </div>
            <span className="section-counter">03</span>
          </div>

          {/* FEATURED PROJECT 1: Luvi Clothing (Left Image, Right Content) */}
          {featuredProjects[0] && (
            <div className="project-editorial-card">
              <span className="watermark-number">01</span>

              <div className="project-card-media">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={featuredProjects[0].coverImageId ? `/api/files/${featuredProjects[0].coverImageId}` : '/Photos/luvi-clothing.png'}
                  alt={featuredProjects[0].title}
                  loading="lazy"
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
              </div>

              <div className="project-card-body">
                <span className="kicker-wrapper" style={{ fontSize: '0.68rem', marginBottom: '0.5rem' }}>
                  Featured Production Application
                </span>
                <h3 style={{ fontSize: '2.1rem', marginBottom: '1rem', color: 'var(--text-ink)' }}>
                  {featuredProjects[0].title}
                </h3>
                <p style={{ fontSize: '0.95rem', color: 'var(--text-body)', lineHeight: 1.7, marginBottom: '1.5rem' }}>
                  {featuredProjects[0].description}
                </p>

                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.45rem', marginBottom: '2rem' }}>
                  {featuredProjects[0].technologies?.map((tech: string, i: number) => (
                    <span key={i} className="tag-editorial">
                      {tech}
                    </span>
                  ))}
                </div>

                <div style={{ display: 'flex', gap: '1.25rem', alignItems: 'center' }}>
                  <Link href={`/projects/${featuredProjects[0].slug}`} className="btn-editorial-text">
                    Detailed Blueprint &rarr;
                  </Link>
                  {featuredProjects[0].liveUrl && (
                    <a href={featuredProjects[0].liveUrl} target="_blank" rel="noopener noreferrer" className="btn-editorial-text" style={{ color: 'var(--text-muted)' }}>
                      Live Demo ↗
                    </a>
                  )}
                  {featuredProjects[0].githubUrl && (
                    <a href={featuredProjects[0].githubUrl} target="_blank" rel="noopener noreferrer" className="btn-editorial-text" style={{ color: 'var(--text-muted)' }}>
                      GitHub ↗
                    </a>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* FEATURED PROJECT 2: SolarCharge Finder (Inverted: Left Content, Right Image) */}
          {featuredProjects[1] && (
            <div className="project-editorial-card reverse">
              <span className="watermark-number">02</span>

              <div className="project-card-body">
                <span className="kicker-wrapper" style={{ fontSize: '0.68rem', marginBottom: '0.5rem' }}>
                  Featured Infrastructure Platform
                </span>
                <h3 style={{ fontSize: '2.1rem', marginBottom: '1rem', color: 'var(--text-ink)' }}>
                  {featuredProjects[1].title}
                </h3>
                <p style={{ fontSize: '0.95rem', color: 'var(--text-body)', lineHeight: 1.7, marginBottom: '1.5rem' }}>
                  {featuredProjects[1].description}
                </p>

                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.45rem', marginBottom: '2rem' }}>
                  {featuredProjects[1].technologies?.map((tech: string, i: number) => (
                    <span key={i} className="tag-editorial">
                      {tech}
                    </span>
                  ))}
                </div>

                <div style={{ display: 'flex', gap: '1.25rem', alignItems: 'center' }}>
                  <Link href={`/projects/${featuredProjects[1].slug}`} className="btn-editorial-text">
                    Detailed Blueprint &rarr;
                  </Link>
                  {featuredProjects[1].liveUrl && (
                    <a href={featuredProjects[1].liveUrl} target="_blank" rel="noopener noreferrer" className="btn-editorial-text" style={{ color: 'var(--text-muted)' }}>
                      Live Demo ↗
                    </a>
                  )}
                  {featuredProjects[1].githubUrl && (
                    <a href={featuredProjects[1].githubUrl} target="_blank" rel="noopener noreferrer" className="btn-editorial-text" style={{ color: 'var(--text-muted)' }}>
                      GitHub ↗
                    </a>
                  )}
                </div>
              </div>

              <div className="project-card-media">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={featuredProjects[1].coverImageId ? `/api/files/${featuredProjects[1].coverImageId}` : '/Photos/solar-charge-finder.png'}
                  alt={featuredProjects[1].title}
                  loading="lazy"
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
              </div>
            </div>
          )}

          {/* COMPACT LIST OF MORE PROJECTS (from screenshot) */}
          <div style={{ marginTop: '3.5rem' }}>
            <span className="kicker-wrapper" style={{ fontSize: '0.72rem', marginBottom: '1rem' }}>
              More Engineering Builds
            </span>
            <div style={{ backgroundColor: 'var(--bg-card)', border: '1px solid var(--border-card)', borderRadius: 'var(--radius-xs)' }}>
              {remainingProjects.map((p: any, idx: number) => (
                <Link
                  key={p._id}
                  href={`/projects/${p.slug}`}
                  className="editorial-list-row"
                >
                  <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.8rem', color: 'var(--accent-orange)' }}>
                    0{idx + 3}
                  </span>
                  <span style={{ fontWeight: 600, color: 'var(--text-ink)', fontSize: '0.95rem' }}>
                    {p.title}
                  </span>
                  <span className="hide-mobile" style={{ fontSize: '0.88rem', color: 'var(--text-muted)' }}>
                    {p.technologies?.slice(0, 4).join(', ')}
                  </span>
                  <span style={{ textAlign: 'right', color: 'var(--accent-orange)' }}>
                    ↗
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================
          04 / WRITING: NOTES FROM THE TERMINAL
      ======================================================== */}
      <section id="notes" className="editorial-section">
        <div className="container">
          <div className="section-header-row">
            <div>
              <div className="kicker-wrapper">
                <span className="kicker-dot" />
                <span>04 / WRITING</span>
              </div>
              <h2 className="section-header-title">
                Notes from the terminal<span className="accent-dot">.</span>
              </h2>
            </div>
            <span className="section-counter">04</span>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '3rem' }}>
            {/* TERMINAL NOTE 1 */}
            <div
              style={{
                backgroundColor: 'var(--bg-card)',
                border: '1px solid var(--border-card)',
                borderRadius: 'var(--radius-xs)',
                boxShadow: 'var(--shadow-card)',
                display: 'grid',
                gridTemplateColumns: '1fr 1.25fr',
                gap: '2.5rem',
                padding: '2.5rem',
                alignItems: 'center',
              }}
              className="terminal-card-grid"
            >
              <div>
                <span className="kicker-wrapper" style={{ fontSize: '0.68rem', marginBottom: '0.5rem' }}>
                  Architecture Dispatch
                </span>
                <h3 style={{ fontSize: '1.75rem', marginBottom: '1rem', color: 'var(--text-ink)' }}>
                  {notes[0]?.title || 'Eliminating Multi-Cloud Bloat: Moving to Database-Native Binary Storage'}
                </h3>
                <p style={{ fontSize: '0.95rem', color: 'var(--text-body)', lineHeight: 1.7, marginBottom: '1.5rem' }}>
                  {notes[0]?.summary ||
                    'Why dual-brain architectures with external object stores introduce unnecessary cognitive overhead for personal portfolio CMS platforms, and how GridFS chunk streaming solves it.'}
                </p>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                  <Link href={notes[0]?.slug ? `/notes/${notes[0].slug}` : '/#'} className="btn-editorial-text">
                    Read dispatch &rarr;
                  </Link>
                  <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}>
                    5 MIN READ
                  </span>
                </div>
              </div>

              {/* Terminal Window Mockup */}
              <div className="terminal-window">
                <div className="terminal-header">
                  <span className="terminal-dot red" />
                  <span className="terminal-dot yellow" />
                  <span className="terminal-dot green" />
                  <span className="terminal-title">gridfs-stream.ts</span>
                </div>
                <div className="terminal-content">
                  <span style={{ color: 'var(--code-comment)' }}>// Zero-copy binary chunk streaming from MongoDB Atlas</span>{'\n'}
                  <span style={{ color: 'var(--code-keyword)' }}>export async function</span> <span style={{ color: 'var(--code-fn)' }}>streamGridFSFile</span>(fileId: ObjectId) {'{\n'}
                  {'  '}const bucket = await <span style={{ color: 'var(--code-fn)' }}>getGridFSBucket</span>();{'\n'}
                  {'  '}const nodeStream = bucket.<span style={{ color: 'var(--code-fn)' }}>openDownloadStream</span>(fileId);{'\n'}
                  {'\n'}
                  {'  '}<span style={{ color: 'var(--code-comment)' }}>// Bridge Node stream into Web API ReadableStream</span>{'\n'}
                  {'  '}return new <span style={{ color: 'var(--code-var)' }}>ReadableStream</span>({'{'}{'\n'}
                  {'    '}start(controller) {'{'}{'\n'}
                  {'      '}nodeStream.on(<span style={{ color: 'var(--code-string)' }}>&apos;data&apos;</span>, (chunk) =&gt; controller.enqueue(chunk));{'\n'}
                  {'      '}nodeStream.on(<span style={{ color: 'var(--code-string)' }}>&apos;end&apos;</span>, () =&gt; controller.close());{'\n'}
                  {'    '}{'}'}{'\n'}
                  {'  '}{'}'});{'\n'}
                  {'}'}
                </div>
              </div>
            </div>

            {/* TERMINAL NOTE 2 */}
            <div
              style={{
                backgroundColor: 'var(--bg-card)',
                border: '1px solid var(--border-card)',
                borderRadius: 'var(--radius-xs)',
                boxShadow: 'var(--shadow-card)',
                display: 'grid',
                gridTemplateColumns: '1fr 1.25fr',
                gap: '2.5rem',
                padding: '2.5rem',
                alignItems: 'center',
              }}
              className="terminal-card-grid"
            >
              <div>
                <span className="kicker-wrapper" style={{ fontSize: '0.68rem', marginBottom: '0.5rem' }}>
                  DevOps & Testing
                </span>
                <h3 style={{ fontSize: '1.75rem', marginBottom: '1rem', color: 'var(--text-ink)' }}>
                  {notes[1]?.title || 'Building Resilient Microservices with Docker and Automated CI/CD'}
                </h3>
                <p style={{ fontSize: '0.95rem', color: 'var(--text-body)', lineHeight: 1.7, marginBottom: '1.5rem' }}>
                  {notes[1]?.summary ||
                    'Practical lessons learned from building and load testing the SolarCharge Finder EV charging platform with Artillery and GitHub Actions.'}
                </p>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                  <Link href={notes[1]?.slug ? `/notes/${notes[1].slug}` : '/#'} className="btn-editorial-text">
                    Read dispatch &rarr;
                  </Link>
                  <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}>
                    4 MIN READ
                  </span>
                </div>
              </div>

              {/* Terminal Window Mockup */}
              <div className="terminal-window">
                <div className="terminal-header">
                  <span className="terminal-dot red" />
                  <span className="terminal-dot yellow" />
                  <span className="terminal-dot green" />
                  <span className="terminal-title">docker-ci-pipeline.yml</span>
                </div>
                <div className="terminal-content">
                  <span style={{ color: 'var(--code-keyword)' }}>name:</span> <span style={{ color: 'var(--code-string)' }}>CI/CD Pipeline</span>{'\n'}
                  <span style={{ color: 'var(--code-keyword)' }}>jobs:</span>{'\n'}
                  {'  '}<span style={{ color: 'var(--code-fn)' }}>benchmark:</span>{'\n'}
                  {'    '}runs-on: ubuntu-latest{'\n'}
                  {'    '}steps:{'\n'}
                  {'      '}- uses: actions/checkout@v4{'\n'}
                  {'      '}- run: npm test{'\n'}
                  {'      '}- run: npx artillery run tests/load-test.yml{'\n'}
                  {'      '}- run: docker build -t solarcharge:latest .
                </div>
              </div>
            </div>

            {/* TERMINAL NOTE 3 */}
            <div
              style={{
                backgroundColor: 'var(--bg-card)',
                border: '1px solid var(--border-card)',
                borderRadius: 'var(--radius-xs)',
                boxShadow: 'var(--shadow-card)',
                display: 'grid',
                gridTemplateColumns: '1fr 1.25fr',
                gap: '2.5rem',
                padding: '2.5rem',
                alignItems: 'center',
              }}
              className="terminal-card-grid"
            >
              <div>
                <span className="kicker-wrapper" style={{ fontSize: '0.68rem', marginBottom: '0.5rem' }}>
                  Full-Stack Architecture
                </span>
                <h3 style={{ fontSize: '1.75rem', marginBottom: '1rem', color: 'var(--text-ink)' }}>
                  Optimizing Next.js 14 App Router with Streaming Server Components
                </h3>
                <p style={{ fontSize: '0.95rem', color: 'var(--text-body)', lineHeight: 1.7, marginBottom: '1.5rem' }}>
                  Techniques for achieving instant First Contentful Paint by streaming dynamic database payloads and caching immutable media through native HTTP headers.
                </p>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                  <Link href="#contact" className="btn-editorial-text">
                    Discuss Architecture &rarr;
                  </Link>
                  <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}>
                    6 MIN READ
                  </span>
                </div>
              </div>

              {/* Terminal Window Mockup */}
              <div className="terminal-window">
                <div className="terminal-header">
                  <span className="terminal-dot red" />
                  <span className="terminal-dot yellow" />
                  <span className="terminal-dot green" />
                  <span className="terminal-title">cache-headers.ts</span>
                </div>
                <div className="terminal-content">
                  <span style={{ color: 'var(--code-comment)' }}>// Fast HTTP caching for immutable GridFS assets</span>{'\n'}
                  <span style={{ color: 'var(--code-keyword)' }}>export const</span> headers = {'{\n'}
                  {'  '}<span style={{ color: 'var(--code-string)' }}>&apos;Cache-Control&apos;</span>: <span style={{ color: 'var(--code-string)' }}>&apos;public, max-age=31536000, immutable&apos;</span>,{'\n'}
                  {'  '}<span style={{ color: 'var(--code-string)' }}>&apos;ETag&apos;</span>: `&quot;${'{'}file.md5{'}'}&quot;`,{'\n'}
                  {'  '}<span style={{ color: 'var(--code-string)' }}>&apos;Content-Type&apos;</span>: file.contentType || <span style={{ color: 'var(--code-string)' }}>&apos;application/octet-stream&apos;</span>,{'\n'}
                  {'}'};
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================
          05 / TIMELINE: LEARNING BY SHIPPING
      ======================================================== */}
      <section id="timeline" className="editorial-section">
        <div className="container">
          <div className="section-header-row">
            <div>
              <div className="kicker-wrapper">
                <span className="kicker-dot" />
                <span>05 / TIMELINE</span>
              </div>
              <h2 className="section-header-title">
                Learning by shipping<span className="accent-dot">.</span>
              </h2>
            </div>
            <span className="section-counter">05</span>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
            {/* Experience Items */}
            {experiences.map((exp: any) => (
              <div
                key={exp._id}
                style={{
                  display: 'grid',
                  gridTemplateColumns: '220px 1fr',
                  gap: '2rem',
                  padding: '1.75rem 0',
                  borderBottom: '1px solid var(--border-hairline)',
                }}
                className="timeline-row"
              >
                <div>
                  <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.85rem', color: 'var(--accent-orange)', fontWeight: 600 }}>
                    {new Date(exp.startDate).getFullYear()} — {exp.current ? 'PRESENT' : exp.endDate ? new Date(exp.endDate).getFullYear() : 'PRESENT'}
                  </span>
                  <p style={{ fontSize: '0.78rem', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)', marginTop: '0.2rem' }}>
                    {exp.location}
                  </p>
                </div>
                <div>
                  <h3 style={{ fontSize: '1.4rem', color: 'var(--text-ink)', marginBottom: '0.25rem' }}>
                    {exp.role} — <span style={{ color: 'var(--text-muted)', fontWeight: 400 }}>{exp.company}</span>
                  </h3>
                  <p style={{ fontSize: '0.95rem', color: 'var(--text-body)', lineHeight: 1.7, marginBottom: '0.75rem' }}>
                    {exp.description}
                  </p>
                  {exp.achievements?.length > 0 && (
                    <ul style={{ paddingLeft: '1.25rem', fontSize: '0.9rem', color: 'var(--text-body)', lineHeight: 1.6 }}>
                      {exp.achievements.map((ach: string, i: number) => (
                        <li key={i}>{ach}</li>
                      ))}
                    </ul>
                  )}
                </div>
              </div>
            ))}

            {/* Education Items */}
            {educations.map((edu: any) => (
              <div
                key={edu._id}
                style={{
                  display: 'grid',
                  gridTemplateColumns: '220px 1fr',
                  gap: '2rem',
                  padding: '1.75rem 0',
                  borderBottom: '1px solid var(--border-hairline)',
                }}
                className="timeline-row"
              >
                <div>
                  <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.85rem', color: 'var(--accent-orange)', fontWeight: 600 }}>
                    {new Date(edu.startDate).getFullYear()} — {edu.endDate ? new Date(edu.endDate).getFullYear() : 'PRESENT'}
                  </span>
                  <p style={{ fontSize: '0.78rem', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)', marginTop: '0.2rem' }}>
                    ACADEMICS
                  </p>
                </div>
                <div>
                  <h3 style={{ fontSize: '1.4rem', color: 'var(--text-ink)', marginBottom: '0.25rem' }}>
                    {edu.degree}
                  </h3>
                  <p style={{ fontSize: '0.95rem', color: 'var(--accent-orange)', fontWeight: 500, marginBottom: '0.4rem' }}>
                    {edu.institution}
                  </p>
                  <p style={{ fontSize: '0.9rem', color: 'var(--text-body)', lineHeight: 1.6 }}>
                    {edu.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ========================================================
          06 / CREDENTIALS: THE FORMAL FOUNDATION
      ======================================================== */}
      <section id="credentials" className="editorial-section">
        <div className="container">
          <div className="section-header-row">
            <div>
              <div className="kicker-wrapper">
                <span className="kicker-dot" />
                <span>06 / CREDENTIALS</span>
              </div>
              <h2 className="section-header-title">
                The formal foundation<span className="accent-dot">.</span>
              </h2>
            </div>
            <span className="section-counter">06</span>
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: '0.8fr 1.2fr',
              gap: '3rem',
              alignItems: 'flex-start',
            }}
            className="credentials-grid"
          >
            {/* Left Featured Credential Badge Card */}
            <div
              style={{
                backgroundColor: 'var(--bg-card)',
                border: '1px solid var(--border-card)',
                padding: '2.5rem',
                borderRadius: 'var(--radius-xs)',
                boxShadow: 'var(--shadow-card)',
              }}
            >
              <div
                style={{
                  width: '44px',
                  height: '44px',
                  borderRadius: '50%',
                  backgroundColor: 'var(--accent-orange-soft)',
                  color: 'var(--accent-orange)',
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginBottom: '1.5rem',
                  fontFamily: 'var(--font-serif)',
                  fontSize: '1.3rem',
                  fontWeight: 600,
                }}
              >
                ✦
              </div>

              <h3 style={{ fontSize: '1.6rem', marginBottom: '0.75rem', color: 'var(--text-ink)' }}>
                Industry Accreditations
              </h3>
              <p style={{ fontSize: '0.95rem', color: 'var(--text-body)', lineHeight: 1.7, marginBottom: '1.5rem' }}>
                All certification diplomas and participation records are stored directly in MongoDB GridFS buckets with cryptographic file hashes.
              </p>

              <div style={{ borderTop: '1px solid var(--border-hairline)', paddingTop: '1.25rem' }}>
                <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}>
                  STORAGE: MONGO GRIDFS
                </p>
                <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}>
                  VERIFIED ATTESTATIONS: {certificates.length} CERTIFICATES
                </p>
              </div>
            </div>

            {/* Right Certifications List */}
            <div style={{ backgroundColor: 'var(--bg-card)', border: '1px solid var(--border-card)', borderRadius: 'var(--radius-xs)' }}>
              {certificates.map((cert: any, idx: number) => (
                <div
                  key={cert._id}
                  style={{
                    padding: '1.25rem 1.75rem',
                    borderBottom: idx === certificates.length - 1 ? 'none' : '1px solid var(--border-hairline)',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    flexWrap: 'wrap',
                    gap: '1rem',
                  }}
                >
                  <div>
                    <h4 style={{ fontSize: '1.15rem', color: 'var(--text-ink)' }}>{cert.title}</h4>
                    <p style={{ fontSize: '0.85rem', color: 'var(--accent-orange)', marginTop: '0.2rem' }}>
                      {cert.issuer} • {new Date(cert.issueDate).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}
                    </p>
                  </div>

                  <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
                    {cert.fileId && (
                      <a
                        href={`/api/files/${cert.fileId}?download=true`}
                        download={`${cert.title}.pdf`}
                        className="btn-editorial-text"
                        style={{ fontSize: '0.82rem' }}
                      >
                        PDF Doc ↗
                      </a>
                    )}
                    {cert.credentialUrl && (
                      <a
                        href={cert.credentialUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{ color: 'var(--text-muted)' }}
                      >
                        <ExternalLink size={16} />
                      </a>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================
          07 / CONTACT: LET'S BUILD SOMETHING
      ======================================================== */}
      <section id="contact" className="editorial-section" style={{ borderBottom: 'none' }}>
        <div className="container">
          <div className="section-header-row">
            <div>
              <div className="kicker-wrapper">
                <span className="kicker-dot" />
                <span>07 / CONTACT</span>
              </div>
              <h2 className="section-header-title">
                Let&apos;s build something<span className="accent-dot">.</span>
              </h2>
            </div>
            <span className="section-counter">07</span>
          </div>

          <div style={{ maxWidth: '880px', marginBottom: '3rem' }}>
            <p style={{ fontSize: '1.25rem', color: 'var(--text-body)', lineHeight: 1.7, marginBottom: '2.5rem' }}>
              Have an interesting engineering project, opportunity, or just want to discuss distributed architectures and clean code? Open for full-time software engineering roles, internships, and technical collaborations.
            </p>

            {/* Giant Editorial Email Headline from Screenshot */}
            <div style={{ marginBottom: '3.5rem' }}>
              <a
                href="mailto:sachithrai1003@gmail.com"
                style={{
                  fontFamily: 'var(--font-serif)',
                  fontSize: 'clamp(2.2rem, 5vw, 3.8rem)',
                  color: 'var(--text-ink)',
                  textDecoration: 'underline',
                  textDecorationColor: 'var(--accent-orange)',
                  textUnderlineOffset: '10px',
                  fontWeight: 500,
                  transition: 'color var(--transition-fast)',
                }}
              >
                sachithrai1003@gmail.com
              </a>
            </div>

            {/* Metadata Contact Table */}
            <div style={{ backgroundColor: 'var(--bg-card)', border: '1px solid var(--border-card)', borderRadius: 'var(--radius-xs)' }}>
              <div className="quick-facts-row" style={{ padding: '1.1rem 1.5rem' }}>
                <span className="quick-facts-label">Direct Email</span>
                <span className="quick-facts-val">
                  <a href="mailto:sachithrai1003@gmail.com" className="btn-editorial-text">
                    sachithrai1003@gmail.com ↗
                  </a>
                </span>
              </div>
              <div className="quick-facts-row" style={{ padding: '1.1rem 1.5rem' }}>
                <span className="quick-facts-label">Phone</span>
                <span className="quick-facts-val">+94 71 859 6632</span>
              </div>
              <div className="quick-facts-row" style={{ padding: '1.1rem 1.5rem' }}>
                <span className="quick-facts-label">Location</span>
                <span className="quick-facts-val">Colombo, Sri Lanka (UTC+05:30)</span>
              </div>
              <div className="quick-facts-row" style={{ padding: '1.1rem 1.5rem' }}>
                <span className="quick-facts-label">Social Channels</span>
                <span className="quick-facts-val" style={{ display: 'flex', gap: '1rem', justifyContent: 'flex-end' }}>
                  <a href="https://github.com/Sachithra03" target="_blank" rel="noopener noreferrer" className="btn-editorial-text">
                    GitHub ↗
                  </a>
                  <a href="https://www.linkedin.com/in/sachithra-indrachapa-9150b8190/" target="_blank" rel="noopener noreferrer" className="btn-editorial-text">
                    LinkedIn ↗
                  </a>
                </span>
              </div>
            </div>

            {/* Interactive Contact Form */}
            <ContactForm />
          </div>
        </div>
      </section>
    </div>
  );
}
