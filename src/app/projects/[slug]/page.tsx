import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { connectToDatabase } from '@/lib/db/mongodb';
import { Project } from '@/models/Project';
import { ArrowLeft, ExternalLink, Github, Layers } from 'lucide-react';

interface ProjectPageProps {
  params: {
    slug: string;
  };
}

export const dynamic = 'force-dynamic';

export async function generateMetadata({ params }: ProjectPageProps): Promise<Metadata> {
  await connectToDatabase();
  const project = await Project.findOne({ slug: params.slug.toLowerCase() });

  if (!project) {
    return {
      title: 'Project Not Found | Sachithra Indrachapa',
    };
  }

  return {
    title: `${project.title} — Engineering Blueprint`,
    description: project.description,
    openGraph: {
      title: `${project.title} | Sachithra Indrachapa`,
      description: project.description,
    },
  };
}

export default async function ProjectDetailPage({ params }: ProjectPageProps) {
  await connectToDatabase();
  const projectDoc = await Project.findOne({ slug: params.slug.toLowerCase() }).lean();

  if (!projectDoc) {
    notFound();
  }

  const project = JSON.parse(JSON.stringify(projectDoc));
  const coverUrl = project.coverImageId
    ? `/api/files/${project.coverImageId}`
    : '/Photos/portfolio-img.png';

  return (
    <div className="section-padding">
      <div className="container-narrow">
        {/* Back Link */}
        <Link
          href="/#projects"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.4rem',
            color: 'var(--text-muted)',
            fontFamily: 'var(--font-mono)',
            fontSize: '0.85rem',
            marginBottom: '2.5rem',
          }}
        >
          <ArrowLeft size={16} />
          Back to all projects
        </Link>

        {/* Header Envelope */}
        <div style={{ marginBottom: '2.5rem' }}>
          <div style={{ display: 'flex', gap: '0.8rem', alignItems: 'center', marginBottom: '1rem' }}>
            <span className="tag-accent" style={{ textTransform: 'uppercase' }}>
              {project.status || 'Completed'}
            </span>
            {project.featured && <span className="tag-editorial">Featured Project</span>}
          </div>

          <h1 style={{ fontSize: 'clamp(2.4rem, 4.5vw, 3.6rem)', marginBottom: '1rem', lineHeight: 1.15 }}>
            {project.title}
          </h1>

          <p style={{ fontSize: '1.2rem', color: 'var(--text-secondary)', lineHeight: 1.7 }}>
            {project.description}
          </p>
        </div>

        {/* Project Links CTA */}
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: '1rem',
            padding: '1.5rem 0',
            borderTop: '1px solid var(--border-subtle)',
            borderBottom: '1px solid var(--border-subtle)',
            marginBottom: '3rem',
          }}
        >
          {project.liveUrl && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-editorial-primary"
            >
              <ExternalLink size={18} />
              View Live Deployment
            </a>
          )}
          {project.githubUrl && (
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-editorial-secondary"
            >
              <Github size={18} />
              Inspect Source Code
            </a>
          )}
        </div>

        {/* Featured Hero Media Frame */}
        <div
          style={{
            position: 'relative',
            aspectRatio: '16 / 9',
            backgroundColor: 'var(--bg-warm)',
            border: '1px solid var(--border-medium)',
            borderRadius: 'var(--radius-sm)',
            overflow: 'hidden',
            marginBottom: '3.5rem',
            boxShadow: 'var(--shadow-md)',
          }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={coverUrl}
            alt={project.title}
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              display: 'block',
            }}
          />
        </div>

        {/* Technology Stack Grid */}
        <div
          style={{
            padding: '2rem',
            backgroundColor: 'var(--bg-surface)',
            border: '1px solid var(--border-subtle)',
            borderRadius: 'var(--radius-sm)',
            marginBottom: '3.5rem',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '1.25rem' }}>
            <Layers size={18} color="var(--accent-burnt)" />
            <h2 style={{ fontSize: '1.2rem', fontFamily: 'var(--font-sans)', fontWeight: 600 }}>
              Architecture & Technology Stack
            </h2>
          </div>

          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
            {project.technologies?.map((tech: string, i: number) => (
              <span key={i} className="tag-editorial" style={{ fontSize: '0.85rem', padding: '0.4rem 0.8rem' }}>
                {tech}
              </span>
            ))}
          </div>
        </div>

        {/* Long Narrative Specification */}
        <div style={{ marginBottom: '4rem' }}>
          <h2 style={{ fontSize: '2rem', marginBottom: '1.5rem' }}>Overview & Architectural Intent</h2>
          <div
            style={{
              fontSize: '1.05rem',
              color: 'var(--text-secondary)',
              lineHeight: 1.85,
              whiteSpace: 'pre-line',
            }}
          >
            {project.longDescription || project.description}
          </div>
        </div>

        {/* Additional Gallery Images */}
        {project.galleryImageIds && project.galleryImageIds.length > 0 && (
          <div style={{ marginTop: '3rem' }}>
            <h3 style={{ fontSize: '1.5rem', marginBottom: '1.5rem' }}>System Gallery & Artifacts</h3>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem' }}>
              {project.galleryImageIds.map((galId: string, idx: number) => (
                <div
                  key={idx}
                  style={{
                    borderRadius: 'var(--radius-sm)',
                    overflow: 'hidden',
                    border: '1px solid var(--border-subtle)',
                  }}
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={`/api/files/${galId}`}
                    alt={`${project.title} screenshot ${idx + 1}`}
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  />
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
