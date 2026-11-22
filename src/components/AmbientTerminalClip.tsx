'use client';

import React, { useState, useEffect } from 'react';
import { Terminal, Activity, Database, Cpu } from 'lucide-react';

export function AmbientTerminalClip() {
  const [logs, setLogs] = useState<string[]>([
    'INIT_SYSTEM: mounting MongoDB Atlas cluster @ ap-southeast-1',
    'GRIDFS_BUCKET: initialized chunk_size=261120 bytes',
    'STREAM_PIPE: active zero-copy pipeline connected',
    'SYS_STATUS: optimal throughput 12ms round-trip latency',
  ]);

  useEffect(() => {
    const candidateLines = [
      'STREAM: GET /api/files/avatar [200 OK] 548KB in 14ms',
      'CACHE_HIT: ETag "6b027f0774981" [304 Not Modified]',
      'GC_OPTIMIZER: heap delta +0.4MB within threshold',
      'KERNEL_SYSCTL: TCP BBR congestion control verified',
      'MONITOR: health check pulse verified (200 OK)',
      'MONGODB: Atlas connection pool warm (5/10 active)',
      'DISPATCH: contact form inquiry verified and routed',
    ];

    const timer = setInterval(() => {
      const newLine = candidateLines[Math.floor(Math.random() * candidateLines.length)];
      setLogs((prev) => [...prev.slice(-4), newLine]);
    }, 3800);

    return () => clearInterval(timer);
  }, []);

  return (
    <div
      style={{
        border: '1px solid var(--line)',
        backgroundColor: 'var(--background)',
        overflow: 'hidden',
        boxShadow: '4px 4px 0px var(--line)',
      }}
      className="ambient-clip-card"
    >
      {/* Clip Header Bar */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '0.5rem 0.85rem',
          backgroundColor: 'var(--secondary)',
          borderBottom: '1px solid var(--line)',
          fontFamily: 'var(--font-mono)',
          fontSize: '0.68rem',
          textTransform: 'uppercase',
          letterSpacing: '0.06em',
          color: 'var(--foreground)',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <span style={{ width: '7px', height: '7px', backgroundColor: 'var(--accent)', display: 'inline-block' }} />
          <span>ENGINE_RUNTIME // 2026.07</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', color: 'var(--muted-foreground)' }}>
          <span style={{ color: '#10B981' }}>● LIVE</span>
          <span>SLIIT_NODE_01</span>
        </div>
      </div>

      {/* Terminal Viewport */}
      <div
        style={{
          padding: '1rem',
          fontFamily: 'var(--font-mono)',
          fontSize: '0.74rem',
          lineHeight: 1.7,
          backgroundColor: 'var(--background)',
          color: 'var(--foreground)',
          minHeight: '130px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'flex-end',
        }}
      >
        {logs.map((log, i) => (
          <div key={i} style={{ display: 'flex', gap: '0.5rem', opacity: 0.6 + i * 0.1 }}>
            <span style={{ color: 'var(--accent)' }}>&gt;</span>
            <span style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
              {log}
            </span>
          </div>
        ))}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginTop: '0.25rem' }}>
          <span style={{ color: 'var(--accent)' }}>&gt;</span>
          <span className="cursor-blink" style={{ color: 'var(--accent)', fontWeight: 700 }}>_</span>
        </div>
      </div>

      {/* Footer Metrics */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr 1fr',
          borderTop: '1px solid var(--line)',
          backgroundColor: 'var(--secondary)',
          fontFamily: 'var(--font-mono)',
          fontSize: '0.65rem',
          textTransform: 'uppercase',
          color: 'var(--muted-foreground)',
          textAlign: 'center',
        }}
      >
        <div style={{ padding: '0.45rem', borderRight: '1px solid var(--line)' }}>
          LATENCY: <span style={{ color: 'var(--foreground)', fontWeight: 600 }}>12ms</span>
        </div>
        <div style={{ padding: '0.45rem', borderRight: '1px solid var(--line)' }}>
          STORE: <span style={{ color: 'var(--foreground)', fontWeight: 600 }}>GRIDFS</span>
        </div>
        <div style={{ padding: '0.45rem' }}>
          STACK: <span style={{ color: 'var(--accent)', fontWeight: 600 }}>NEXT 14</span>
        </div>
      </div>
    </div>
  );
}
