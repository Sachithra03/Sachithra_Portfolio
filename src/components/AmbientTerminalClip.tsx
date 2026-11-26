'use client';

export function AmbientTerminalClip() {
  const messages = [
    'SYSTEM: Portfolio console preview',
    'MONITOR: Illustrative UI, not a live health check',
    'CONTENT: Public portfolio content displayed',
    'STATUS: No backend logs or metrics shown',
  ];

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
          <span>PORTFOLIO_STATUS // UI PREVIEW</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', color: 'var(--muted-foreground)' }}>
          <span style={{ color: '#10B981' }}>● LIVE</span>
          <span>PORTFOLIO_NODE_01</span>
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
        {messages.map((message, i) => (
          <div key={message} style={{ display: 'flex', gap: '0.5rem', opacity: 0.6 + i * 0.1 }}>
            <span style={{ color: 'var(--accent)' }}>&gt;</span>
            <span style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
              {message}
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
          FEED: <span style={{ color: 'var(--foreground)', fontWeight: 600 }}>DECORATIVE</span>
        </div>
        <div style={{ padding: '0.45rem', borderRight: '1px solid var(--line)' }}>
          DATA: <span style={{ color: 'var(--foreground)', fontWeight: 600 }}>PUBLIC</span>
        </div>
        <div style={{ padding: '0.45rem' }}>
          MODE: <span style={{ color: 'var(--accent)', fontWeight: 600 }}>UI PREVIEW</span>
        </div>
      </div>
    </div>
  );
}
