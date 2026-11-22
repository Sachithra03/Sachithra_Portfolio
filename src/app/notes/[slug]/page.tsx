import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { connectToDatabase } from '@/lib/db/mongodb';
import { Note } from '@/models/Note';
import { ArrowLeft, Clock, Calendar } from 'lucide-react';

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
          }}
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
              color: 'var(--text-muted)',
              fontFamily: 'var(--font-mono)',
              fontSize: '0.85rem',
              marginBottom: '1rem',
            }}
          >
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.3rem' }}>
              <Clock size={14} />
              {note.readTimeMinutes || 4} MIN READ
            </span>
            <span>•</span>
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.3rem' }}>
              <Calendar size={14} />
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
              color: 'var(--text-primary)',
            }}
          >
            {note.title}
          </h1>

          <p
            style={{
              fontSize: '1.2rem',
              color: 'var(--text-secondary)',
              lineHeight: 1.7,
              fontStyle: 'italic',
              borderLeft: '3px solid var(--accent-burnt)',
              paddingLeft: '1.25rem',
            }}
          >
            {note.summary}
          </p>

          <div style={{ display: 'flex', gap: '0.5rem', marginTop: '1.5rem' }}>
            {note.tags?.map((tag: string, i: number) => (
              <span key={i} className="tag-editorial">
                #{tag}
              </span>
            ))}
          </div>
        </header>

        <div className="editorial-divider" />

        {/* Article Body */}
        <div
          style={{
            fontSize: '1.1rem',
            color: 'var(--text-primary)',
            lineHeight: 1.85,
            whiteSpace: 'pre-line',
          }}
        >
          {note.content}
        </div>

        <div className="editorial-divider" />

        {/* Sign-off */}
        <footer
          style={{
            padding: '2rem',
            backgroundColor: 'var(--bg-surface)',
            border: '1px solid var(--border-subtle)',
            borderRadius: 'var(--radius-sm)',
          }}
        >
          <p style={{ fontWeight: 600, color: 'var(--text-primary)', marginBottom: '0.25rem' }}>
            Authored by Sachithra Indrachapa
          </p>
          <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
            Software Engineering undergraduate at SLIIT exploring distributed systems, modern web architecture, and clean minimalism.
          </p>
        </footer>
      </article>
    </div>
  );
}
