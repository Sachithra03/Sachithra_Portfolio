'use client';

import React, { useState } from 'react';
import { Send, CheckCircle2, AlertCircle, Loader2 } from 'lucide-react';

export function ContactForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

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

      if (!res.ok) {
        throw new Error(data.error || 'Failed to dispatch message. Please try direct email.');
      }

      setStatus('success');
      setFormData({ name: '', email: '', subject: '', message: '' });
    } catch (err: unknown) {
      setStatus('error');
      setErrorMessage(err instanceof Error ? err.message : 'Something went wrong. Please email directly.');
    }
  };

  return (
    <div
      style={{
        backgroundColor: 'var(--bg-card)',
        border: '1px solid var(--border-card)',
        borderRadius: 'var(--radius-xs)',
        padding: '2.5rem',
        marginTop: '2.5rem',
        boxShadow: 'var(--shadow-card)',
      }}
    >
      <div style={{ marginBottom: '1.75rem' }}>
        <span className="kicker-wrapper" style={{ fontSize: '0.68rem', marginBottom: '0.35rem' }}>
          Dispatch an Inquiry
        </span>
        <h3 style={{ fontSize: '1.5rem', color: 'var(--text-ink)' }}>Send a Direct Message</h3>
        <p style={{ fontSize: '0.88rem', color: 'var(--text-muted)', marginTop: '0.25rem' }}>
          Leave your details below and I will respond to your inquiry promptly.
        </p>
      </div>

      {status === 'success' ? (
        <div
          style={{
            padding: '2rem',
            textAlign: 'center',
            backgroundColor: 'rgba(16, 185, 129, 0.08)',
            border: '1px solid rgba(16, 185, 129, 0.3)',
            borderRadius: 'var(--radius-xs)',
          }}
        >
          <div style={{ color: '#059669', marginBottom: '0.75rem' }}>
            <CheckCircle2 size={36} style={{ margin: '0 auto' }} />
          </div>
          <h4 style={{ fontSize: '1.25rem', color: 'var(--text-ink)', marginBottom: '0.35rem' }}>
            Message Dispatched Successfully
          </h4>
          <p style={{ fontSize: '0.9rem', color: 'var(--text-body)', marginBottom: '1.25rem' }}>
            Thank you for reaching out. I have received your message and will reply shortly to your email.
          </p>
          <button
            type="button"
            onClick={() => setStatus('idle')}
            className="btn-ink-secondary"
            style={{ fontSize: '0.82rem', padding: '0.5rem 1rem' }}
          >
            Send Another Message
          </button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          {status === 'error' && (
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.6rem',
                padding: '0.85rem 1rem',
                backgroundColor: 'rgba(239, 68, 68, 0.08)',
                border: '1px solid rgba(239, 68, 68, 0.3)',
                borderRadius: 'var(--radius-xs)',
                color: '#B91C1C',
                fontSize: '0.88rem',
              }}
            >
              <AlertCircle size={18} style={{ flexShrink: 0 }} />
              <span>{errorMessage}</span>
            </div>
          )}

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.25rem' }} className="contact-form-grid">
            <div>
              <label
                htmlFor="name"
                style={{
                  display: 'block',
                  fontSize: '0.8rem',
                  fontFamily: 'var(--font-mono)',
                  textTransform: 'uppercase',
                  letterSpacing: '0.05em',
                  color: 'var(--text-body)',
                  marginBottom: '0.4rem',
                }}
              >
                Your Name *
              </label>
              <input
                id="name"
                type="text"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="e.g. Jane Doe"
                style={{ width: '100%' }}
              />
            </div>

            <div>
              <label
                htmlFor="email"
                style={{
                  display: 'block',
                  fontSize: '0.8rem',
                  fontFamily: 'var(--font-mono)',
                  textTransform: 'uppercase',
                  letterSpacing: '0.05em',
                  color: 'var(--text-body)',
                  marginBottom: '0.4rem',
                }}
              >
                Your Email *
              </label>
              <input
                id="email"
                type="email"
                required
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                placeholder="e.g. jane@company.com"
                style={{ width: '100%' }}
              />
            </div>
          </div>

          <div>
            <label
              htmlFor="subject"
              style={{
                display: 'block',
                fontSize: '0.8rem',
                fontFamily: 'var(--font-mono)',
                textTransform: 'uppercase',
                letterSpacing: '0.05em',
                color: 'var(--text-body)',
                marginBottom: '0.4rem',
              }}
            >
              Subject *
            </label>
            <input
              id="subject"
              type="text"
              required
              value={formData.subject}
              onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
              placeholder="e.g. Full-Stack Engineering Role / Collaboration"
              style={{ width: '100%' }}
            />
          </div>

          <div>
            <label
              htmlFor="message"
              style={{
                display: 'block',
                fontSize: '0.8rem',
                fontFamily: 'var(--font-mono)',
                textTransform: 'uppercase',
                letterSpacing: '0.05em',
                color: 'var(--text-body)',
                marginBottom: '0.4rem',
              }}
            >
              Message *
            </label>
            <textarea
              id="message"
              required
              rows={4}
              value={formData.message}
              onChange={(e) => setFormData({ ...formData, message: e.target.value })}
              placeholder="Tell me about your project, timeline, or engineering opportunity..."
              style={{ width: '100%', resize: 'vertical' }}
            />
          </div>

          <div style={{ display: 'flex', justifyContent: 'flex-start' }}>
            <button
              type="submit"
              disabled={status === 'submitting'}
              className="btn-ink-primary"
              style={{ padding: '0.75rem 1.75rem', opacity: status === 'submitting' ? 0.75 : 1 }}
            >
              {status === 'submitting' ? (
                <>
                  <Loader2 size={16} className="animate-spin" /> Transmitting...
                </>
              ) : (
                <>
                  <Send size={15} /> Send Message
                </>
              )}
            </button>
          </div>
        </form>
      )}

      <style jsx>{`
        @media (max-width: 640px) {
          .contact-form-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </div>
  );
}
