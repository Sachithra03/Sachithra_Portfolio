'use client';

import React, { useState, useEffect, useCallback } from 'react';
import {
  Download,
  ExternalLink,
  Eye,
  Maximize2,
  X,
  ChevronDown,
  ChevronUp,
  ChevronLeft,
  ChevronRight,
  FileText,
  Image as ImageIcon,
} from 'lucide-react';

interface CertificateItem {
  _id: string;
  title: string;
  issuer: string;
  issueDate: string;
  description: string;
  credentialUrl?: string;
  coverImageId?: string;
  fileId?: string;
  order?: number;
}

interface InteractiveCertificatesProps {
  certificates: CertificateItem[];
}

export function InteractiveCertificates({ certificates }: InteractiveCertificatesProps) {
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [modalIndex, setModalIndex] = useState<number | null>(null);
  const [modalView, setModalView] = useState<'image' | 'pdf'>('image');

  const activeModalCert = modalIndex !== null && certificates[modalIndex] ? certificates[modalIndex] : null;

  const handleNextCert = useCallback(() => {
    if (modalIndex === null) return;
    setModalIndex((modalIndex + 1) % certificates.length);
    setModalView('image');
  }, [modalIndex, certificates.length]);

  const handlePrevCert = useCallback(() => {
    if (modalIndex === null) return;
    setModalIndex((modalIndex - 1 + certificates.length) % certificates.length);
    setModalView('image');
  }, [modalIndex, certificates.length]);

  const handleCloseModal = useCallback(() => {
    setModalIndex(null);
    setModalView('image');
  }, []);

  // Keyboard navigation for modal
  useEffect(() => {
    if (modalIndex === null) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') handleCloseModal();
      if (e.key === 'ArrowRight') handleNextCert();
      if (e.key === 'ArrowLeft') handlePrevCert();
    };

    window.addEventListener('keydown', handleKeyDown);
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = originalOverflow;
    };
  }, [modalIndex, handleCloseModal, handleNextCert, handlePrevCert]);

  const toggleRow = (id: string) => {
    setExpandedId((prev) => (prev === id ? null : id));
  };

  return (
    <div>
      {/* Table Container */}
      <div style={{ border: '1px solid var(--line)', backgroundColor: 'var(--background)' }}>
        {certificates.map((cert, idx) => {
          const numStr = String(idx + 1).padStart(2, '0');
          const isExpanded = expandedId === cert._id;
          const formattedDate = cert.issueDate
            ? new Date(cert.issueDate).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })
            : 'Recent';

          const previewImageUrl = cert.coverImageId
            ? `/api/files/${cert.coverImageId}`
            : cert.fileId
              ? `/api/files/${cert.fileId}`
              : null;

          return (
            <div
              key={cert._id}
              style={{
                borderBottom: idx === certificates.length - 1 && !isExpanded ? 'none' : '1px solid var(--line)',
                transition: 'background-color 0.15s ease',
              }}
            >
              {/* Clickable Header Row */}
              <div
                onClick={() => toggleRow(cert._id)}
                className="cert-interactive-row"
                style={{
                  padding: '1.35rem 1.5rem',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  flexWrap: 'wrap',
                  gap: '1rem',
                  cursor: 'pointer',
                  backgroundColor: isExpanded ? 'var(--secondary)' : 'transparent',
                  userSelect: 'none',
                }}
              >
                {/* Left: Number and Title/Issuer */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '1.25rem', flex: '1 1 300px' }}>
                  <span
                    style={{
                      fontFamily: 'var(--font-mono)',
                      fontSize: '0.8rem',
                      color: 'var(--accent)',
                      fontWeight: 700,
                    }}
                  >
                    {numStr}
                  </span>
                  <div>
                    <h4
                      style={{
                        fontFamily: 'var(--font-display)',
                        fontSize: '1.15rem',
                        fontWeight: 700,
                        color: 'var(--foreground)',
                        textTransform: 'uppercase',
                        letterSpacing: '-0.01em',
                      }}
                    >
                      {cert.title}
                    </h4>
                    <p
                      style={{
                        fontFamily: 'var(--font-mono)',
                        fontSize: '0.75rem',
                        color: 'var(--muted-foreground)',
                        marginTop: '0.2rem',
                      }}
                    >
                      {cert.issuer} • {formattedDate}
                    </p>
                  </div>
                </div>

                {/* Right: Actions and Expand Indicator */}
                <div
                  style={{ display: 'flex', gap: '0.65rem', alignItems: 'center', flexWrap: 'wrap' }}
                  onClick={(e) => e.stopPropagation()}
                >
                  {/* Preview Button */}
                  <button
                    type="button"
                    onClick={() => {
                      setModalIndex(idx);
                      setModalView('image');
                    }}
                    className="btn-brutalist-secondary"
                    style={{
                      fontSize: '0.72rem',
                      padding: '0.45rem 0.85rem',
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '0.35rem',
                    }}
                    title="View Certificate Lightbox"
                  >
                    <Eye size={13} />
                    <span>PREVIEW</span>
                  </button>

                  {/* PDF Download Link */}
                  {cert.fileId && (
                    <a
                      href={`/api/files/${cert.fileId}?download=true`}
                      download={`${cert.title}.pdf`}
                      className="btn-brutalist-primary"
                      style={{
                        fontSize: '0.72rem',
                        padding: '0.45rem 0.85rem',
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '0.35rem',
                      }}
                      title="Download PDF Certificate"
                    >
                      <Download size={13} />
                      <span>PDF CERT ↗</span>
                    </a>
                  )}

                  {/* External Verify Link */}
                  {cert.credentialUrl && (
                    <a
                      href={cert.credentialUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn-brutalist-secondary"
                      style={{
                        fontSize: '0.72rem',
                        padding: '0.45rem 0.75rem',
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '0.35rem',
                      }}
                      title="Verify Credential on Issuer Site"
                    >
                      <span>VERIFY</span>
                      <ExternalLink size={12} />
                    </a>
                  )}

                  {/* Expand / Collapse Chevron */}
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleRow(cert._id);
                    }}
                    style={{
                      background: 'transparent',
                      border: '1px solid var(--line)',
                      color: 'var(--foreground)',
                      width: '28px',
                      height: '28px',
                      display: 'inline-flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      cursor: 'pointer',
                      borderRadius: 'var(--radius)',
                      marginLeft: '0.25rem',
                    }}
                    aria-label={isExpanded ? 'Collapse certificate preview' : 'Expand certificate preview'}
                  >
                    {isExpanded ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
                  </button>
                </div>
              </div>

              {/* Inline Expandable Drawer */}
              {isExpanded && (
                <div
                  style={{
                    padding: '1.75rem',
                    backgroundColor: 'var(--card)',
                    borderTop: '1px solid var(--line)',
                    borderBottom: idx === certificates.length - 1 ? 'none' : '1px solid var(--line)',
                    display: 'grid',
                    gridTemplateColumns: 'minmax(300px, 460px) 1fr',
                    gap: '2rem',
                    alignItems: 'start',
                  }}
                  className="cert-drawer-grid"
                >
                  {/* Left: Certificate Preview Frame */}
                  <div>
                    {previewImageUrl ? (
                      <div
                        onClick={() => {
                          setModalIndex(idx);
                          setModalView('image');
                        }}
                        style={{
                          position: 'relative',
                          border: '1px solid var(--line)',
                          backgroundColor: 'var(--background)',
                          cursor: 'zoom-in',
                          overflow: 'hidden',
                          boxShadow: '0 4px 14px rgba(0,0,0,0.08)',
                          aspectRatio: '4 / 3',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                        }}
                        className="cert-img-container"
                        title="Click to view full screen"
                      >
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={previewImageUrl}
                          alt={cert.title}
                          style={{
                            width: '100%',
                            height: '100%',
                            objectFit: 'contain',
                            display: 'block',
                            backgroundColor: '#FFFFFF',
                          }}
                        />

                        {/* Hover Overlay Hint */}
                        <div
                          style={{
                            position: 'absolute',
                            bottom: '0.75rem',
                            right: '0.75rem',
                            backgroundColor: 'rgba(10, 10, 10, 0.88)',
                            color: '#FFFFFF',
                            fontFamily: 'var(--font-mono)',
                            fontSize: '0.68rem',
                            padding: '0.3rem 0.55rem',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '0.35rem',
                            textTransform: 'uppercase',
                            letterSpacing: '0.04em',
                          }}
                        >
                          <Maximize2 size={12} />
                          <span>ENLARGE</span>
                        </div>
                      </div>
                    ) : (
                      <div
                        style={{
                          aspectRatio: '4 / 3',
                          border: '1px dashed var(--line)',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          flexDirection: 'column',
                          gap: '0.5rem',
                          color: 'var(--muted-foreground)',
                          fontFamily: 'var(--font-mono)',
                          fontSize: '0.8rem',
                        }}
                      >
                        <FileText size={24} />
                        <span>PDF DOCUMENT ATTACHED</span>
                      </div>
                    )}
                  </div>

                  {/* Right: Description & Meta */}
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                    <div>
                      <span
                        style={{
                          fontFamily: 'var(--font-mono)',
                          fontSize: '0.7rem',
                          color: 'var(--accent)',
                          fontWeight: 700,
                          textTransform: 'uppercase',
                          letterSpacing: '0.08em',
                        }}
                      >
                        CREDENTIAL // {cert.issuer}
                      </span>
                      <h3
                        style={{
                          fontFamily: 'var(--font-display)',
                          fontSize: '1.35rem',
                          fontWeight: 700,
                          color: 'var(--foreground)',
                          textTransform: 'uppercase',
                          marginTop: '0.35rem',
                          lineHeight: 1.25,
                        }}
                      >
                        {cert.title}
                      </h3>
                      <p
                        style={{
                          fontFamily: 'var(--font-mono)',
                          fontSize: '0.78rem',
                          color: 'var(--muted-foreground)',
                          marginTop: '0.25rem',
                        }}
                      >
                        Attestation Date: {formattedDate}
                      </p>
                    </div>

                    <p
                      style={{
                        fontSize: '0.95rem',
                        lineHeight: 1.7,
                        color: 'var(--foreground)',
                        borderLeft: '2px solid var(--accent)',
                        paddingLeft: '1rem',
                        backgroundColor: 'var(--secondary)',
                        padding: '0.85rem 1rem',
                      }}
                    >
                      {cert.description}
                    </p>

                    {/* Action Bar */}
                    <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap', marginTop: '0.5rem' }}>
                      <button
                        type="button"
                        onClick={() => {
                          setModalIndex(idx);
                          setModalView('image');
                        }}
                        className="btn-brutalist-primary"
                        style={{ fontSize: '0.74rem', padding: '0.55rem 1rem' }}
                      >
                        <Maximize2 size={13} />
                        <span>FULLSCREEN VIEWER</span>
                      </button>

                      {cert.fileId && (
                        <a
                          href={`/api/files/${cert.fileId}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="btn-brutalist-secondary"
                          style={{ fontSize: '0.74rem', padding: '0.55rem 1rem' }}
                        >
                          <FileText size={13} />
                          <span>OPEN PDF TAB</span>
                        </a>
                      )}

                      {cert.fileId && (
                        <a
                          href={`/api/files/${cert.fileId}?download=true`}
                          download={`${cert.title}.pdf`}
                          className="btn-brutalist-secondary"
                          style={{ fontSize: '0.74rem', padding: '0.55rem 1rem' }}
                        >
                          <Download size={13} />
                          <span>DOWNLOAD PDF</span>
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* ========================================================
          FULL-SCREEN MODAL LIGHTBOX VIEWER
      ======================================================== */}
      {activeModalCert && (
        <div
          role="dialog"
          aria-modal="true"
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 100,
            backgroundColor: 'rgba(10, 10, 10, 0.88)',
            backdropFilter: 'blur(8px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '1.5rem',
            animation: 'fadeIn 0.15s ease',
          }}
          onClick={handleCloseModal}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              width: '100%',
              maxWidth: '1080px',
              maxHeight: '92vh',
              backgroundColor: 'var(--background)',
              border: '1px solid var(--line)',
              borderRadius: 'var(--radius)',
              display: 'flex',
              flexDirection: 'column',
              overflow: 'hidden',
              boxShadow: '0 24px 64px rgba(0, 0, 0, 0.5)',
            }}
          >
            {/* Modal Header */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '0.85rem 1.25rem',
                borderBottom: '1px solid var(--line)',
                backgroundColor: 'var(--card)',
                gap: '1rem',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem', overflow: 'hidden' }}>
                <span
                  style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.72rem',
                    color: 'var(--accent)',
                    fontWeight: 700,
                    whiteSpace: 'nowrap',
                  }}
                >
                  SEC.05 // CREDENTIAL
                </span>
                <span style={{ color: 'var(--border)' }}>|</span>
                <h3
                  style={{
                    fontFamily: 'var(--font-display)',
                    fontSize: '1rem',
                    fontWeight: 700,
                    textTransform: 'uppercase',
                    color: 'var(--foreground)',
                    whiteSpace: 'nowrap',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                  }}
                >
                  {activeModalCert.title}
                </h3>
              </div>

              {/* Controls: Prev/Next, Mode Toggle, Close */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', flexShrink: 0 }}>
                {/* View Mode Toggle (Image vs PDF) if both available */}
                {activeModalCert.fileId && activeModalCert.coverImageId && (
                  <div
                    style={{
                      display: 'flex',
                      border: '1px solid var(--line)',
                      borderRadius: 'var(--radius)',
                      overflow: 'hidden',
                      marginRight: '0.5rem',
                    }}
                  >
                    <button
                      type="button"
                      onClick={() => setModalView('image')}
                      style={{
                        padding: '0.3rem 0.6rem',
                        fontSize: '0.7rem',
                        fontFamily: 'var(--font-mono)',
                        border: 'none',
                        cursor: 'pointer',
                        backgroundColor: modalView === 'image' ? 'var(--line)' : 'transparent',
                        color: modalView === 'image' ? 'var(--background)' : 'var(--foreground)',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.3rem',
                      }}
                    >
                      <ImageIcon size={12} />
                      IMAGE
                    </button>
                    <button
                      type="button"
                      onClick={() => setModalView('pdf')}
                      style={{
                        padding: '0.3rem 0.6rem',
                        fontSize: '0.7rem',
                        fontFamily: 'var(--font-mono)',
                        border: 'none',
                        cursor: 'pointer',
                        backgroundColor: modalView === 'pdf' ? 'var(--line)' : 'transparent',
                        color: modalView === 'pdf' ? 'var(--background)' : 'var(--foreground)',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.3rem',
                      }}
                    >
                      <FileText size={12} />
                      PDF
                    </button>
                  </div>
                )}

                {/* Prev / Next buttons */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                  <button
                    type="button"
                    onClick={handlePrevCert}
                    style={{
                      width: '28px',
                      height: '28px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      background: 'transparent',
                      border: '1px solid var(--line)',
                      color: 'var(--foreground)',
                      cursor: 'pointer',
                      borderRadius: 'var(--radius)',
                    }}
                    title="Previous certificate (Left Arrow)"
                  >
                    <ChevronLeft size={16} />
                  </button>
                  <span
                    style={{
                      fontFamily: 'var(--font-mono)',
                      fontSize: '0.72rem',
                      color: 'var(--muted-foreground)',
                      padding: '0 0.35rem',
                    }}
                  >
                    {(modalIndex ?? 0) + 1}/{certificates.length}
                  </span>
                  <button
                    type="button"
                    onClick={handleNextCert}
                    style={{
                      width: '28px',
                      height: '28px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      background: 'transparent',
                      border: '1px solid var(--line)',
                      color: 'var(--foreground)',
                      cursor: 'pointer',
                      borderRadius: 'var(--radius)',
                    }}
                    title="Next certificate (Right Arrow)"
                  >
                    <ChevronRight size={16} />
                  </button>
                </div>

                {/* Close Button */}
                <button
                  type="button"
                  onClick={handleCloseModal}
                  style={{
                    width: '30px',
                    height: '30px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    backgroundColor: 'var(--line)',
                    color: 'var(--background)',
                    border: '1px solid var(--line)',
                    cursor: 'pointer',
                    borderRadius: 'var(--radius)',
                    marginLeft: '0.5rem',
                  }}
                  title="Close modal (Escape)"
                >
                  <X size={16} />
                </button>
              </div>
            </div>

            {/* Modal Body: High Resolution Viewer */}
            <div
              style={{
                flex: 1,
                overflow: 'auto',
                padding: '1.25rem',
                backgroundColor: '#111111',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                minHeight: '380px',
                maxHeight: '68vh',
              }}
            >
              {modalView === 'image' ? (
                activeModalCert.coverImageId || activeModalCert.fileId ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={`/api/files/${activeModalCert.coverImageId || activeModalCert.fileId}`}
                    alt={activeModalCert.title}
                    style={{
                      maxWidth: '100%',
                      maxHeight: '65vh',
                      objectFit: 'contain',
                      display: 'block',
                      boxShadow: '0 10px 30px rgba(0,0,0,0.4)',
                      backgroundColor: '#FFFFFF',
                    }}
                  />
                ) : (
                  <div style={{ color: '#888888', fontFamily: 'var(--font-mono)' }}>No preview available</div>
                )
              ) : activeModalCert.fileId ? (
                <iframe
                  src={`/api/files/${activeModalCert.fileId}#toolbar=0`}
                  title={activeModalCert.title}
                  style={{
                    width: '100%',
                    height: '65vh',
                    border: 'none',
                    backgroundColor: '#FFFFFF',
                  }}
                />
              ) : (
                <div style={{ color: '#888888', fontFamily: 'var(--font-mono)' }}>PDF document not available</div>
              )}
            </div>

            {/* Modal Footer: Metadata & Actions */}
            <div
              style={{
                padding: '1.1rem 1.5rem',
                backgroundColor: 'var(--card)',
                borderTop: '1px solid var(--line)',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                flexWrap: 'wrap',
                gap: '1rem',
              }}
            >
              <div>
                <p
                  style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.78rem',
                    color: 'var(--muted-foreground)',
                  }}
                >
                  Issued by <strong style={{ color: 'var(--foreground)' }}>{activeModalCert.issuer}</strong> •{' '}
                  {activeModalCert.issueDate
                    ? new Date(activeModalCert.issueDate).toLocaleDateString('en-US', {
                        month: 'long',
                        year: 'numeric',
                      })
                    : 'Verified'}
                </p>
                <p
                  style={{
                    fontSize: '0.85rem',
                    color: 'var(--muted-foreground)',
                    marginTop: '0.2rem',
                    maxWidth: '650px',
                  }}
                >
                  {activeModalCert.description}
                </p>
              </div>

              <div style={{ display: 'flex', gap: '0.65rem', alignItems: 'center' }}>
                {activeModalCert.fileId && (
                  <a
                    href={`/api/files/${activeModalCert.fileId}?download=true`}
                    download={`${activeModalCert.title}.pdf`}
                    className="btn-brutalist-primary"
                    style={{ fontSize: '0.72rem', padding: '0.45rem 0.85rem' }}
                  >
                    <Download size={13} />
                    <span>DOWNLOAD PDF</span>
                  </a>
                )}
                {activeModalCert.credentialUrl && (
                  <a
                    href={activeModalCert.credentialUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-brutalist-secondary"
                    style={{ fontSize: '0.72rem', padding: '0.45rem 0.85rem' }}
                  >
                    <span>VERIFY CREDENTIAL</span>
                    <ExternalLink size={12} />
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Responsive Styles */}
      <style jsx>{`
        .cert-interactive-row:hover {
          background-color: var(--secondary) !important;
        }
        @media (max-width: 768px) {
          .cert-drawer-grid {
            grid-template-columns: 1fr !important;
            gap: 1.25rem !important;
            padding: 1.25rem !important;
          }
        }
        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }
      `}</style>
    </div>
  );
}
