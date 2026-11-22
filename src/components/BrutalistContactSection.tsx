'use client';

import React, { useState } from 'react';
import { Send, CheckCircle2, AlertCircle, Copy, Check, Loader2 } from 'lucide-react';

export function BrutalistContactSection() {
  const [copied, setCopied] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const copyEmail = () => {
    navigator.clipboard.writeText('sachithrai1003@gmail.com');
    setCopied(true);
    setTimeout(() => setCopied(false), 3000);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('submitting');
    setErrorMessage('');

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed to dispatch message.');

      setStatus('success');
      setFormData({ name: '', email: '', subject: '', message: '' });
    } catch (err: unknown) {
      setStatus('error');
      setErrorMessage(err instanceof Error ? err.message : 'Something went wrong.');
    }
  };

  return (
    <div>
      {/* Click-to-copy giant email banner */}
      <div
        onClick={copyEmail}
        style={{
          border: '1px solid var(--line)',
          backgroundColor: 'var(--secondary)',
          padding: '2rem 1.75rem',
          cursor: 'pointer',
          marginBottom: '2.5rem',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '1.5rem',
          transition: 'all 0.15s ease',
        }}
        className="email-copy-banner"
      >
        <div>
          <span
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '0.72rem',
              textTransform: 'uppercase',
              letterSpacing: '0.1em',
              color: 'var(--muted-foreground)',
              display: 'block',
              marginBottom: '0.35rem',
            }}
          >
            DIRECT INQUIRY — CLICK TO COPY
          </span>
          <span
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(1.6rem, 3.8vw, 2.8rem)',
              fontWeight: 700,
              letterSpacing: '-0.02em',
              color: 'var(--foreground)',
              display: 'block',
              wordBreak: 'break-all',
            }}
          >
            sachithrai1003@gmail.com
          </span>
        </div>

        <div
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.5rem',
            padding: '0.65rem 1.25rem',
            backgroundColor: copied ? '#10B981' : 'var(--accent)',
            color: '#FFFFFF',
            fontFamily: 'var(--font-mono)',
            fontSize: '0.75rem',
            fontWeight: 600,
            textTransform: 'uppercase',
            letterSpacing: '0.05em',
            borderRadius: 'var(--radius)',
            transition: 'background-color 0.15s ease',
          }}
        >
          {copied ? (
            <>
              <Check size={16} /> COPIED TO CLIPBOARD
            </>
          ) : (
            <>
              <Copy size={16} /> COPY EMAIL →
            </>
          )}
        </div>
      </div>

      {/* Two Column Layout: Vitals on Left, Interactive Form on Right */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1.35fr',
          gap: '2.5rem',
        }}
        className="contact-split-grid"
      >
        {/* Left Vitals Card */}
        <div>
          <div style={{ border: '1px solid var(--line)', backgroundColor: 'var(--background)' }}>
            <div
              style={{
                padding: '0.85rem 1.25rem',
                borderBottom: '1px solid var(--line)',
                backgroundColor: 'var(--secondary)',
                fontFamily: 'var(--font-mono)',
                fontSize: '0.72rem',
                textTransform: 'uppercase',
                letterSpacing: '0.08em',
                color: 'var(--foreground)',
                fontWeight: 600,
              }}
            >
              COMMUNICATION CHANNELS
            </div>

            <div style={{ padding: '1.25rem' }}>
              <div style={{ marginBottom: '1.25rem' }}>
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.7rem', color: 'var(--muted-foreground)', textTransform: 'uppercase' }}>
                  Location
                </span>
                <p style={{ fontFamily: 'var(--font-display)', fontSize: '1rem', fontWeight: 700, color: 'var(--foreground)' }}>
                  Colombo, Sri Lanka (UTC+05:30)
                </p>
              </div>

              <div style={{ marginBottom: '1.25rem' }}>
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.7rem', color: 'var(--muted-foreground)', textTransform: 'uppercase' }}>
                  Availability
                </span>
                <p style={{ fontFamily: 'var(--font-display)', fontSize: '1rem', fontWeight: 700, color: '#10B981' }}>
                  ● Available for Full-Time & Freelance
                </p>
              </div>

              <div style={{ marginBottom: '1.25rem' }}>
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.7rem', color: 'var(--muted-foreground)', textTransform: 'uppercase' }}>
                  Phone / WhatsApp
                </span>
                <p style={{ fontFamily: 'var(--font-display)', fontSize: '1rem', fontWeight: 700, color: 'var(--foreground)' }}>
                  +94 71 859 6632
                </p>
              </div>

              <div style={{ borderTop: '1px solid var(--line)', paddingTop: '1rem' }}>
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.7rem', color: 'var(--muted-foreground)', textTransform: 'uppercase', display: 'block', marginBottom: '0.5rem' }}>
                  Developer Networks
                </span>
                <div style={{ display: 'flex', gap: '1rem' }}>
                  <a
                    href="https://github.com/Sachithra03"
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      fontFamily: 'var(--font-mono)',
                      fontSize: '0.78rem',
                      color: 'var(--accent)',
                      textDecoration: 'none',
                      fontWeight: 600,
                    }}
                  >
                    GitHub ↗
                  </a>
                  <a
                    href="https://www.linkedin.com/in/sachithra-indrachapa-9150b8190/"
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      fontFamily: 'var(--font-mono)',
                      fontSize: '0.78rem',
                      color: 'var(--accent)',
                      textDecoration: 'none',
                      fontWeight: 600,
                    }}
                  >
                    LinkedIn ↗
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Form Card */}
        <div style={{ border: '1px solid var(--line)', backgroundColor: 'var(--background)' }}>
          <div
            style={{
              padding: '0.85rem 1.25rem',
              borderBottom: '1px solid var(--line)',
              backgroundColor: 'var(--secondary)',
              fontFamily: 'var(--font-mono)',
              fontSize: '0.72rem',
              textTransform: 'uppercase',
              letterSpacing: '0.08em',
              color: 'var(--foreground)',
              fontWeight: 600,
            }}
          >
            DISPATCH A MESSAGE
          </div>

          <div style={{ padding: '1.5rem' }}>
            {status === 'success' ? (
              <div
                style={{
                  padding: '2rem',
                  textAlign: 'center',
                  backgroundColor: 'rgba(16, 185, 129, 0.08)',
                  border: '1px solid rgba(16, 185, 129, 0.3)',
                }}
              >
                <CheckCircle2 size={32} style={{ color: '#10B981', margin: '0 auto 0.75rem auto' }} />
                <h4 style={{ fontFamily: 'var(--font-display)', fontSize: '1.25rem', fontWeight: 700, color: 'var(--foreground)' }}>
                  MESSAGE TRANSMITTED
                </h4>
                <p style={{ fontSize: '0.85rem', color: 'var(--muted-foreground)', marginTop: '0.35rem', marginBottom: '1.25rem' }}>
                  Thank you for reaching out. I reply within 24 hours.
                </p>
                <button
                  onClick={() => setStatus('idle')}
                  style={{
                    padding: '0.5rem 1rem',
                    border: '1px solid var(--line)',
                    backgroundColor: 'transparent',
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.72rem',
                    textTransform: 'uppercase',
                    cursor: 'pointer',
                  }}
                >
                  Send Another Message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.15rem' }}>
                {status === 'error' && (
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.5rem',
                      padding: '0.75rem',
                      backgroundColor: 'rgba(239, 68, 68, 0.1)',
                      border: '1px solid #EF4444',
                      color: '#EF4444',
                      fontSize: '0.82rem',
                    }}
                  >
                    <AlertCircle size={16} />
                    <span>{errorMessage}</span>
                  </div>
                )}

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }} className="form-double-col">
                  <div>
                    <label style={{ display: 'block', fontFamily: 'var(--font-mono)', fontSize: '0.7rem', textTransform: 'uppercase', color: 'var(--muted-foreground)', marginBottom: '0.35rem' }}>
                      Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="e.g. Jane Doe"
                      style={{
                        width: '100%',
                        border: '1px solid var(--line)',
                        backgroundColor: 'var(--background)',
                        color: 'var(--foreground)',
                        padding: '0.65rem',
                        fontFamily: 'var(--font-sans)',
                        fontSize: '0.88rem',
                        borderRadius: '0px',
                      }}
                    />
                  </div>

                  <div>
                    <label style={{ display: 'block', fontFamily: 'var(--font-mono)', fontSize: '0.7rem', textTransform: 'uppercase', color: 'var(--muted-foreground)', marginBottom: '0.35rem' }}>
                      Email *
                    </label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="e.g. jane@company.com"
                      style={{
                        width: '100%',
                        border: '1px solid var(--line)',
                        backgroundColor: 'var(--background)',
                        color: 'var(--foreground)',
                        padding: '0.65rem',
                        fontFamily: 'var(--font-sans)',
                        fontSize: '0.88rem',
                        borderRadius: '0px',
                      }}
                    />
                  </div>
                </div>

                <div>
                  <label style={{ display: 'block', fontFamily: 'var(--font-mono)', fontSize: '0.7rem', textTransform: 'uppercase', color: 'var(--muted-foreground)', marginBottom: '0.35rem' }}>
                    Subject *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    placeholder="e.g. Full-Stack Engineering Role / Collaboration"
                    style={{
                      width: '100%',
                      border: '1px solid var(--line)',
                      backgroundColor: 'var(--background)',
                      color: 'var(--foreground)',
                      padding: '0.65rem',
                      fontFamily: 'var(--font-sans)',
                      fontSize: '0.88rem',
                      borderRadius: '0px',
                    }}
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontFamily: 'var(--font-mono)', fontSize: '0.7rem', textTransform: 'uppercase', color: 'var(--muted-foreground)', marginBottom: '0.35rem' }}>
                    Message *
                  </label>
                  <textarea
                    rows={4}
                    required
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Describe your project, team, or opportunity..."
                    style={{
                      width: '100%',
                      border: '1px solid var(--line)',
                      backgroundColor: 'var(--background)',
                      color: 'var(--foreground)',
                      padding: '0.65rem',
                      fontFamily: 'var(--font-sans)',
                      fontSize: '0.88rem',
                      borderRadius: '0px',
                      resize: 'vertical',
                    }}
                  />
                </div>

                <button
                  type="submit"
                  disabled={status === 'submitting'}
                  style={{
                    padding: '0.75rem 1.5rem',
                    backgroundColor: 'var(--line)',
                    color: 'var(--background)',
                    border: 'none',
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.78rem',
                    fontWeight: 700,
                    textTransform: 'uppercase',
                    letterSpacing: '0.06em',
                    cursor: 'pointer',
                    display: 'inline-flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '0.5rem',
                    borderRadius: '0px',
                    transition: 'all 0.15s ease',
                  }}
                  className="btn-submit-brutalist"
                >
                  {status === 'submitting' ? (
                    <>
                      <Loader2 size={16} className="animate-spin" /> DISPATCHING...
                    </>
                  ) : (
                    <>
                      <Send size={15} /> TRANSMIT MESSAGE →
                    </>
                  )}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>

      <style jsx>{`
        .email-copy-banner:hover {
          border-color: var(--accent) !important;
        }
        .btn-submit-brutalist:hover {
          background-color: var(--accent) !important;
          color: #ffffff !important;
        }
        @media (max-width: 860px) {
          .contact-split-grid {
            grid-template-columns: 1fr !important;
          }
          .form-double-col {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </div>
  );
}
