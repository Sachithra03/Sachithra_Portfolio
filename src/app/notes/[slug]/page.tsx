import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { connectToDatabase } from '@/lib/db/mongodb';
import { Note } from '@/models/Note';
import { ArrowLeft, Clock, Calendar } from 'lucide-react';
import { MarkdownRenderer } from '@/components/MarkdownRenderer';

interface NotePageProps {
  params: {
    slug: string;
  };
}

export const dynamic = 'force-dynamic';

export async function generateMetadata({ params }: NotePageProps): Promise<Metadata> {
  await connectToDatabase();
  const note = await Note.findOne({ slug: params.slug.toLowerCase(), published: true });

  if (!note) {
    return {
      title: 'Note Not Found | Sachithra Indrachapa',
    };
  }

  return {
    title: `${note.title} — Notes from the Terminal`,
    description: note.summary,
    openGraph: {
      title: `${note.title} | Sachithra Indrachapa`,
      description: note.summary,
    },
  };
}

export default async function NoteDetailPage({ params }: NotePageProps) {
  await connectToDatabase();
  const noteDoc = await Note.findOne({ slug: params.slug.toLowerCase(), published: true }).lean();

  if (!noteDoc) {
    notFound();
  }

  const note = JSON.parse(JSON.stringify(noteDoc));

  return (
    <div className="section-padding">
      <article className="container-narrow">
        {/* Back Link */}
        <Link
          href="/#writing"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.4rem',
            color: 'var(--muted-foreground)',
            fontFamily: 'var(--font-mono)',
            fontSize: '0.82rem',
            textTransform: 'uppercase',
            letterSpacing: '0.06em',
            marginBottom: '2.5rem',
            transition: 'color 0.15s ease',
          }}
          className="back-nav-link"
        >
          <ArrowLeft size={16} />
          Back to Terminal Notes
        </Link>

        {/* Note Metadata Header */}
        <header style={{ marginBottom: '3rem' }}>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '1rem',
              color: 'var(--muted-foreground)',
              fontFamily: 'var(--font-mono)',
              fontSize: '0.82rem',
              marginBottom: '1.25rem',
              flexWrap: 'wrap',
            }}
          >
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.35rem' }}>
              <Clock size={14} style={{ color: 'var(--accent)' }} />
              {note.readTimeMinutes || 4} MIN READ
            </span>
            <span>•</span>
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.35rem' }}>
              <Calendar size={14} style={{ color: 'var(--accent)' }} />
              {note.publishedAt
                ? new Date(note.publishedAt).toLocaleDateString('en-US', {
                    month: 'long',
                    day: 'numeric',
                    year: 'numeric',
                  })
                : 'Recent'}
            </span>
          </div>

          <h1
            style={{
              fontSize: 'clamp(2.2rem, 4.5vw, 3.4rem)',
              lineHeight: 1.15,
              marginBottom: '1.5rem',
              color: 'var(--foreground)',
              fontFamily: 'var(--font-display)',
              fontWeight: 700,
              textTransform: 'uppercase',
              letterSpacing: '-0.025em',
            }}
          >
            {note.title}
          </h1>

          <p
            style={{
              fontSize: '1.2rem',
              color: 'var(--muted-foreground)',
              lineHeight: 1.7,
              fontStyle: 'italic',
              borderLeft: '3px solid var(--accent)',
              paddingLeft: '1.25rem',
              marginBottom: '1.75rem',
            }}
          >
            {note.summary}
          </p>

          <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
            {note.tags?.map((tag: string, i: number) => (
              <span key={i} className="tag-editorial">
                #{tag}
              </span>
            ))}
          </div>
        </header>

        {/* Optional Cover Image */}
        {note.coverImageId && (
          <div
            style={{
              position: 'relative',
              aspectRatio: '16 / 9',
              backgroundColor: 'var(--secondary)',
              border: '1px solid var(--line)',
              overflow: 'hidden',
              marginBottom: '3rem',
            }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={`/api/files/${note.coverImageId}`}
              alt={note.title}
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                display: 'block',
              }}
            />
          </div>
        )}

        <div className="editorial-divider" />

        {/* Article Body with React Markdown */}
        <MarkdownRenderer content={note.content} />

        <div className="editorial-divider" />

        {/* Author Sign-off Footer */}
        <footer
          style={{
            padding: '2rem',
            backgroundColor: 'var(--card)',
            border: '1px solid var(--line)',
            marginTop: '3.5rem',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '0.85rem' }}>
            <div
              style={{
                width: '40px',
                height: '40px',
                backgroundColor: 'var(--line)',
                color: 'var(--background)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontFamily: 'var(--font-mono)',
                fontWeight: 700,
                fontSize: '0.9rem',
              }}
            >
              SI
            </div>
            <div>
              <p
                style={{
                  fontWeight: 700,
                  fontFamily: 'var(--font-display)',
                  textTransform: 'uppercase',
                  letterSpacing: '0.02em',
                  color: 'var(--foreground)',
                  fontSize: '1.05rem',
                }}
              >
                Authored by Sachithra Indrachapa
              </p>
              <span
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.72rem',
                  color: 'var(--accent)',
                  textTransform: 'uppercase',
                  letterSpacing: '0.06em',
                  fontWeight: 600,
                }}
              >
                SOFTWARE ENGINEER // SLIIT
              </span>
            </div>
          </div>
          <p style={{ fontSize: '0.95rem', color: 'var(--muted-foreground)', lineHeight: 1.65 }}>
            Software Engineering undergraduate at SLIIT exploring distributed systems, modern web architecture, and clean minimalism.
          </p>
        </footer>
      </article>
    </div>
  );
}
