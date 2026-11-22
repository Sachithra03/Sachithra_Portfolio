'use client';

import React, { useState } from 'react';
import Link from 'next/link';

interface NoteItem {
  _id: string;
  title: string;
  slug: string;
  summary: string;
  publishedAt?: string;
  tags?: string[];
  readTimeMinutes?: number;
}

interface InteractiveWritingsTableProps {
  notes: NoteItem[];
}

export function InteractiveWritingsTable({ notes }: InteractiveWritingsTableProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>('ALL');
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  const categories = ['ALL', 'ARCHITECTURE', 'DEVOPS', 'FULL-STACK', 'DATABASES'];

  const filteredNotes = notes.filter((note) => {
    if (selectedCategory === 'ALL') return true;
    return note.tags?.some((t) => t.toUpperCase().includes(selectedCategory));
  });

  return (
    <div>
      {/* Category Filter Buttons */}
      <div
        style={{
          display: 'flex',
          gap: '0.5rem',
          flexWrap: 'wrap',
          marginBottom: '1.5rem',
        }}
      >
        {categories.map((cat) => {
          const isActive = selectedCategory === cat;
          return (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              style={{
                padding: '0.4rem 0.85rem',
                border: '1px solid var(--line)',
                backgroundColor: isActive ? 'var(--accent)' : 'transparent',
                color: isActive ? '#FFFFFF' : 'var(--foreground)',
                fontFamily: 'var(--font-mono)',
                fontSize: '0.72rem',
                textTransform: 'uppercase',
                letterSpacing: '0.06em',
                cursor: 'pointer',
                borderRadius: 'var(--radius)',
                transition: 'all 0.15s ease',
              }}
            >
              {cat}
            </button>
          );
        })}
      </div>

      {/* Writings Table */}
      <div style={{ border: '1px solid var(--line)', backgroundColor: 'var(--background)' }}>
        {filteredNotes.map((note, idx) => {
          const numStr = String(idx + 1).padStart(2, '0');
          const isHovered = hoveredId === note._id;

          return (
            <Link
              key={note._id}
              href={`/notes/${note.slug}`}
              onMouseEnter={() => setHoveredId(note._id)}
              onMouseLeave={() => setHoveredId(null)}
              style={{
                display: 'block',
                borderBottom: idx === filteredNotes.length - 1 ? 'none' : '1px solid var(--line)',
                backgroundColor: isHovered ? 'var(--secondary)' : 'transparent',
                padding: '1.5rem 1.25rem',
                textDecoration: 'none',
                color: 'inherit',
                transition: 'background-color 0.15s ease',
              }}
              className="writing-row"
            >
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: '60px 1fr 140px 140px 80px',
                  alignItems: 'center',
                }}
                className="writing-grid-row"
              >
                <span
                  style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.8rem',
                    color: 'var(--accent)',
                    fontWeight: 600,
                  }}
                >
                  {numStr}
                </span>

                <div style={{ paddingRight: '1.5rem' }}>
                  <h4
                    style={{
                      fontFamily: 'var(--font-display)',
                      fontSize: '1.2rem',
                      fontWeight: 700,
                      textTransform: 'uppercase',
                      letterSpacing: '-0.01em',
                      color: isHovered ? 'var(--accent)' : 'var(--foreground)',
                      transition: 'color 0.15s ease',
                    }}
                  >
                    {note.title}
                  </h4>
                </div>

                <span
                  className="hide-mobile-col"
                  style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.78rem',
                    color: 'var(--muted-foreground)',
                  }}
                >
                  2026.04.10
                </span>

                <div className="hide-mobile-col">
                  <span
                    style={{
                      fontFamily: 'var(--font-mono)',
                      fontSize: '0.68rem',
                      textTransform: 'uppercase',
                      padding: '0.2rem 0.5rem',
                      border: '1px solid var(--line)',
                      color: 'var(--foreground)',
                    }}
                  >
                    {note.tags?.[0]?.toUpperCase() || 'ENGINEERING'}
                  </span>
                </div>

                <span
                  className="hide-mobile-col"
                  style={{
                    textAlign: 'right',
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.75rem',
                    color: 'var(--muted-foreground)',
                  }}
                >
                  {note.readTimeMinutes || 5} MIN
                </span>
              </div>

              {/* Accordion Excerpt Preview */}
              <div
                style={{
                  marginTop: '0.75rem',
                  paddingLeft: '60px',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  gap: '1.5rem',
                }}
                className="writing-excerpt-row"
              >
                <p
                  style={{
                    fontSize: '0.9rem',
                    color: 'var(--muted-foreground)',
                    lineHeight: 1.6,
                    maxWidth: '850px',
                  }}
                >
                  {note.summary}
                </p>

                <span
                  style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.72rem',
                    color: 'var(--accent)',
                    fontWeight: 600,
                    textTransform: 'uppercase',
                    letterSpacing: '0.05em',
                    whiteSpace: 'nowrap',
                  }}
                >
                  Read Entry →
                </span>
              </div>
            </Link>
          );
        })}
      </div>

      <style jsx>{`
        @media (max-width: 860px) {
          .writing-grid-row {
            grid-template-columns: 45px 1fr !important;
          }
          .hide-mobile-col {
            display: none !important;
          }
          .writing-excerpt-row {
            padding-left: 45px !important;
            flex-direction: column !important;
            align-items: flex-start !important;
            gap: 0.5rem !important;
          }
        }
      `}</style>
    </div>
  );
}
