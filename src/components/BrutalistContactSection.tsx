'use client';

import React, { useState } from 'react';
import emailjs from '@emailjs/browser';
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

    // Fetch live configuration from server (enables instant updates without re-building client chunks)
    let serviceId = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID || 'service_0o4otsc';
    let templateId = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID || 'template_fjv9ivl';
    let publicKey = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY || 'kLqZck-2vG2bSXG9I';
    let recipientEmail = 'sachithrai1003@gmail.com';

    try {
      const cfgRes = await fetch('/api/contact/config');
      if (cfgRes.ok) {
        const cfg = await cfgRes.json();
        if (cfg.serviceId) serviceId = cfg.serviceId;
        if (cfg.templateId) templateId = cfg.templateId;
        if (cfg.publicKey) publicKey = cfg.publicKey;
      }
    } catch {
      // Non-fatal, use defaults
    }

    const templateParams = {
      name: formData.name,
      email: formData.email,
      subject: formData.subject,
      message: formData.message,
      from_name: formData.name,
      from_email: formData.email,
      reply_to: formData.email,
      to_email: recipientEmail,
      to_name: 'Sachithra Indrachapa',
    };

    let emailSent = false;
    let emailErrorMsg = '';

    // 1. Dispatch email directly to Sachithra's Gmail inbox via EmailJS
    try {
      const emailRes = await emailjs.send(serviceId, templateId, templateParams, {
        publicKey: publicKey,
      });
      if (emailRes.status === 200 || emailRes.text === 'OK') {
        emailSent = true;
      } else {
        emailErrorMsg = `EmailJS error (${emailRes.status}): ${emailRes.text}`;
      }
    } catch (emailErr: any) {
      emailErrorMsg = emailErr?.text || emailErr?.message || 'EmailJS rejected transmission';
      console.warn('[EmailJS] Direct inbox transmission warning:', emailErr);
    }

    // 2. Persist to MongoDB through /api/contact as an immutable audit record
    try {
      await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
    } catch (apiErr: unknown) {
      console.warn('[Contact API] Backup record warning:', apiErr);
    }

    if (emailSent) {
      setStatus('success');
      setFormData({ name: '', email: '', subject: '', message: '' });
    } else {
      setStatus('error');
      setErrorMessage(
        emailErrorMsg.includes('template ID not found')
          ? 'EmailJS template ID not found. Please verify your Template ID at https://dashboard.emailjs.com/admin/templates and set NEXT_PUBLIC_EMAILJS_TEMPLATE_ID in your .env.local.'
          : emailErrorMsg || 'Failed to dispatch email directly. Please use the direct mail link below.'
      );
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
                  +94 76 394 7735
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
                      flexDirection: 'column',
                      gap: '0.65rem',
                      padding: '0.85rem 1rem',
                      backgroundColor: 'rgba(239, 68, 68, 0.08)',
                      border: '1px solid #EF4444',
                      color: 'var(--foreground)',
                      fontSize: '0.82rem',
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.5rem', color: '#EF4444' }}>
                      <AlertCircle size={16} style={{ flexShrink: 0, marginTop: '2px' }} />
                      <span style={{ lineHeight: 1.5 }}>{errorMessage}</span>
                    </div>

                    <a
                      href={`mailto:sachithrai1003@gmail.com?subject=${encodeURIComponent(
                        formData.subject || 'Portfolio Inquiry'
                      )}&body=${encodeURIComponent(
                        `Name: ${formData.name}\nEmail: ${formData.email}\n\n${formData.message}`
                      )}`}
                      className="btn-brutalist-primary"
                      style={{
                        alignSelf: 'flex-start',
                        fontSize: '0.72rem',
                        padding: '0.45rem 0.85rem',
                        marginTop: '0.25rem',
                      }}
                    >
                      <Send size={12} />
                      TRANSMIT VIA MAIL CLIENT (GMAIL) ↗
                    </a>
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
