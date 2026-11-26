'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { ExternalLink, Github, ChevronDown, ChevronUp } from 'lucide-react';

interface ProjectItem {
  _id: string;
  title: string;
  slug: string;
  description: string;
  coverImageId?: string;
  technologies?: string[];
  liveUrl?: string;
  githubUrl?: string;
  featured?: boolean;
  status?: string;
}

interface InteractiveProjectsTableProps {
  projects: ProjectItem[];
}

export function InteractiveProjectsTable({ projects }: InteractiveProjectsTableProps) {
  const [expandedId, setExpandedId] = useState<string | null>(projects[0]?._id || null);

  const toggleExpand = (id: string) => {
    setExpandedId(expandedId === id ? null : id);
  };

  return (
    <div style={{ border: '1px solid var(--line)', backgroundColor: 'var(--background)' }}>
      {/* Table Header Bar */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '60px 2.2fr 100px 140px 2fr 60px',
          alignItems: 'center',
          padding: '0.85rem 1.25rem',
          borderBottom: '1px solid var(--line)',
          backgroundColor: 'var(--secondary)',
          fontFamily: 'var(--font-mono)',
          fontSize: '0.72rem',
          textTransform: 'uppercase',
          letterSpacing: '0.08em',
          color: 'var(--muted-foreground)',
        }}
        className="projects-table-header"
      >
        <span>#</span>
        <span>PROJECT</span>
        <span className="hide-mobile-col">YEAR</span>
        <span className="hide-mobile-col">ROLE</span>
        <span className="hide-mobile-col">STACK</span>
        <span style={{ textAlign: 'right' }}>VIEW</span>
      </div>

      {/* Project Rows */}
      {projects.map((project, idx) => {
        const isExpanded = expandedId === project._id;
        const numStr = String(idx + 1).padStart(2, '0');

        return (
          <div
            key={project._id}
            style={{
              borderBottom: idx === projects.length - 1 ? 'none' : '1px solid var(--line)',
              backgroundColor: isExpanded ? 'var(--secondary)' : 'transparent',
              transition: 'background-color 0.15s ease',
            }}
            className="project-table-row-group"
          >
            {/* Clickable Row Header */}
            <div
              onClick={() => toggleExpand(project._id)}
              style={{
                display: 'grid',
                gridTemplateColumns: '60px 2.2fr 100px 140px 2fr 60px',
                alignItems: 'center',
                padding: '1.25rem 1.25rem',
                cursor: 'pointer',
              }}
              className="projects-row-header"
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

              <div style={{ paddingRight: '1rem' }}>
                <span
                  style={{
                    fontFamily: 'var(--font-display)',
                    fontSize: '1.15rem',
                    fontWeight: 700,
                    textTransform: 'uppercase',
                    letterSpacing: '-0.01em',
                    color: isExpanded ? 'var(--accent)' : 'var(--foreground)',
                    display: 'block',
                  }}
                  className="project-row-title"
                >
                  {project.title}
                </span>
                <span className="show-mobile-stack" style={{ display: 'none', fontSize: '0.75rem', color: 'var(--muted-foreground)', fontFamily: 'var(--font-mono)' }}>
                  {project.technologies?.slice(0, 3).join(' • ')}
                </span>
              </div>

              <span
                className="hide-mobile-col"
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.8rem',
                  color: 'var(--muted-foreground)',
                }}
              >
                2024
              </span>

              <span
                className="hide-mobile-col"
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.78rem',
                  color: 'var(--foreground)',
                  fontWeight: 500,
                }}
              >
                Full-Stack
              </span>

              <span
                className="hide-mobile-col"
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.75rem',
                  color: 'var(--muted-foreground)',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  whiteSpace: 'nowrap',
                  paddingRight: '1rem',
                }}
              >
                {project.technologies?.slice(0, 4).join(', ')}
              </span>

              <span
                style={{
                  textAlign: 'right',
                  color: isExpanded ? 'var(--accent)' : 'var(--muted-foreground)',
                  display: 'flex',
                  justifyContent: 'flex-end',
                }}
              >
                {isExpanded ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
              </span>
            </div>

            {/* Expanded Accordion Panel */}
            {isExpanded && (
              <div
                style={{
                  padding: '0 1.25rem 1.75rem 1.25rem',
                  borderTop: '1px solid var(--border)',
                  backgroundColor: 'var(--background)',
                  display: 'grid',
                  gridTemplateColumns: project.coverImageId ? '1.4fr 1fr' : '1fr',
                  gap: '2rem',
                  alignItems: 'center',
                }}
                className="project-expanded-panel"
              >
                <div style={{ paddingTop: '1.25rem' }}>
                  <p
                    style={{
                      fontSize: '0.95rem',
                      lineHeight: 1.7,
                      color: 'var(--foreground)',
                      marginBottom: '1.25rem',
                    }}
                  >
                    {project.description}
                  </p>

                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem', marginBottom: '1.5rem' }}>
                    {project.technologies?.map((tech, i) => (
                      <span
                        key={i}
                        style={{
                          fontFamily: 'var(--font-mono)',
                          fontSize: '0.7rem',
                          padding: '0.2rem 0.55rem',
                          border: '1px solid var(--line)',
                          textTransform: 'uppercase',
                          color: 'var(--foreground)',
                          backgroundColor: 'var(--secondary)',
                          letterSpacing: '0.04em',
                        }}
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', alignItems: 'center' }}>
                    <Link
                      href={`/projects/${project.slug}`}
                      style={{
                        padding: '0.55rem 1.1rem',
                        backgroundColor: 'var(--line)',
                        color: 'var(--background)',
                        fontFamily: 'var(--font-mono)',
                        fontSize: '0.75rem',
                        fontWeight: 600,
                        textTransform: 'uppercase',
                        textDecoration: 'none',
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '0.35rem',
                      }}
                    >
                      Inspect Blueprint →
                    </Link>

                    {project.liveUrl && (
                      <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{
                          padding: '0.55rem 1.1rem',
                          border: '1px solid var(--line)',
                          color: 'var(--foreground)',
                          fontFamily: 'var(--font-mono)',
                          fontSize: '0.75rem',
                          fontWeight: 600,
                          textTransform: 'uppercase',
                          textDecoration: 'none',
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: '0.35rem',
                          backgroundColor: 'transparent',
                        }}
                        className="btn-hvr-accent"
                      >
                        <ExternalLink size={14} /> Live Demo ↗
                      </a>
                    )}

                    {project.githubUrl && (
                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{
                          padding: '0.55rem 1.1rem',
                          border: '1px solid var(--line)',
                          color: 'var(--foreground)',
                          fontFamily: 'var(--font-mono)',
                          fontSize: '0.75rem',
                          fontWeight: 600,
                          textTransform: 'uppercase',
                          textDecoration: 'none',
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: '0.35rem',
                          backgroundColor: 'transparent',
                        }}
                        className="btn-hvr-accent"
                      >
                        <Github size={14} /> Source Code ↗
                      </a>
                    )}
                  </div>
                </div>

                {project.coverImageId && (
                  <div style={{ paddingTop: '1.25rem' }}>
                    <div
                      style={{
                        border: '1px solid var(--line)',
                        aspectRatio: '16/10',
                        overflow: 'hidden',
                        backgroundColor: 'var(--secondary)',
                      }}
                    >
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={`/api/files/${project.coverImageId}`}
                        alt={project.title}
                        loading="lazy"
                        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                      />
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        );
      })}

      <style jsx>{`
        .projects-row-header:hover .project-row-title {
          color: var(--accent) !important;
        }
        .btn-hvr-accent:hover {
          background-color: var(--accent) !important;
          color: #ffffff !important;
          border-color: var(--accent) !important;
        }
        @media (max-width: 860px) {
          .projects-table-header {
            grid-template-columns: 45px 1fr 40px !important;
          }
          .projects-row-header {
            grid-template-columns: 45px 1fr 40px !important;
          }
          .hide-mobile-col {
            display: none !important;
          }
          .show-mobile-stack {
            display: block !important;
          }
          .project-expanded-panel {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </div>
  );
}
