'use client';

import React from 'react';

export function OrangeTickerStrip() {
  const items = [
    'FULL-STACK SYSTEMS',
    'NEXT.JS APP ROUTER',
    'MONGODB ATLAS & GRIDFS',
    'DEVOPS & CI/CD PIPELINES',
    'CLEAN ARCHITECTURE',
    'SLIIT UNDERGRADUATE',
    'TYPESCRIPT & NODE.JS',
    'DOCKER CONTAINERIZATION',
    'PERFORMANCE LOAD TESTING',
  ];

  return (
    <div
      style={{
        backgroundColor: 'var(--accent)',
        color: '#FFFFFF',
        overflow: 'hidden',
        whiteSpace: 'nowrap',
        padding: '0.65rem 0',
        borderTop: '1px solid var(--line)',
        borderBottom: '1px solid var(--line)',
      }}
    >
      <div className="marquee-track">
        <div className="marquee-content">
          {[...items, ...items].map((text, i) => (
            <span
              key={i}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '1rem',
                marginRight: '1.5rem',
                fontFamily: 'var(--font-mono)',
                fontSize: '0.78rem',
                fontWeight: 700,
                letterSpacing: '0.12em',
                textTransform: 'uppercase',
              }}
            >
              <span>{text}</span>
              <span style={{ opacity: 0.6 }}>✦</span>
            </span>
          ))}
        </div>
      </div>

      <style jsx>{`
        .marquee-track {
          display: flex;
          width: 100%;
        }
        .marquee-content {
          display: flex;
          animation: marquee 28s linear infinite;
        }
        @keyframes marquee {
          0% {
            transform: translateX(0%);
          }
          100% {
            transform: translateX(-50%);
          }
        }
      `}</style>
    </div>
  );
}
