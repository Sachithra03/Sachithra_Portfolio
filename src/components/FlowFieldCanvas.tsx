'use client';

import React, { useEffect, useRef } from 'react';

interface FlowFieldCanvasProps {
  theme?: 'light' | 'dark';
}

export function FlowFieldCanvas({ theme = 'light' }: FlowFieldCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const mouseRef = useRef<{ x: number; y: number; active: boolean }>({
    x: 0,
    y: 0,
    active: false,
  });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const isDark = theme === 'dark';
    const bgFill = isDark ? 'rgba(10, 10, 10, 0.08)' : 'rgba(245, 245, 240, 0.09)';
    const particleBase = isDark ? 'rgba(245, 245, 240, ' : 'rgba(10, 10, 10, ';
    const accentColor = 'rgba(255, 77, 28, '; // #ff4d1c Kusal orange

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);
    let dpr = Math.min(window.devicePixelRatio || 1, 2);

    const resize = () => {
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.fillStyle = isDark ? '#0a0a0a' : '#f5f5f0';
      ctx.fillRect(0, 0, width, height);
    };

    resize();

    // Create particles based on viewport density
    const count = Math.min(130, Math.floor((width * height) / 14000));
    interface Particle {
      x: number;
      y: number;
      vx: number;
      vy: number;
      life: number;
      maxLife: number;
    }

    const resetParticle = (): Particle => {
      const maxLife = 220 + 400 * Math.random();
      return {
        x: Math.random() * width,
        y: Math.random() * height,
        vx: 0,
        vy: 0,
        life: Math.random() * maxLife,
        maxLife,
      };
    };

    const particles: Particle[] = [];
    for (let i = 0; i < count; i++) {
      particles.push(resetParticle());
    }

    const seed = 1000 * Math.random();

    const onMouseMove = (e: MouseEvent) => {
      mouseRef.current.x = e.clientX;
      mouseRef.current.y = e.clientY;
      mouseRef.current.active = true;
    };

    const onMouseLeave = () => {
      mouseRef.current.active = false;
    };

    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseleave', onMouseLeave);

    let animationFrameId = 0;
    let ticks = 0;

    const render = () => {
      ticks += 1;
      ctx.fillStyle = bgFill;
      ctx.fillRect(0, 0, width, height);

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        // Mathematical flow-field vector computation
        const angle =
          ((Math.sin(0.0025 * p.x + 0.0004 * ticks + seed) +
            Math.sin(0.0025 * p.y - 0.0003 * ticks) +
            Math.sin((p.x + p.y) * 0.0018 + 0.0002 * ticks)) /
            3) *
          Math.PI *
          2;

        let forceX = 0.55 * Math.cos(angle);
        let forceY = 0.55 * Math.sin(angle);

        // Gentle interactive mouse repulsion
        if (mouseRef.current.active) {
          const dx = mouseRef.current.x - p.x;
          const dy = mouseRef.current.y - p.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 200) {
            const factor = (1 - dist / 200) * 0.35;
            forceX += (dx / dist) * factor;
            forceY += (dy / dist) * factor;
          }
        }

        p.vx = 0.92 * p.vx + forceX;
        p.vy = 0.92 * p.vy + forceY;
        p.x += p.vx;
        p.y += p.vy;
        p.life += 1;

        // Wrap around boundaries
        if (p.x < -10) p.x = width + 10;
        if (p.x > width + 10) p.x = -10;
        if (p.y < -10) p.y = height + 10;
        if (p.y > height + 10) p.y = -10;

        // Life fade envelope
        const lifeRatio = p.life / p.maxLife;
        const opacity =
          lifeRatio < 0.1
            ? 10 * lifeRatio
            : lifeRatio > 0.9
            ? (1 - lifeRatio) * 10
            : 1;

        // 18% of particles pop in vibrant electric orange #ff4d1c
        if ((37 * i) % 100 < 18) {
          ctx.fillStyle = `${accentColor}${0.6 * opacity})`;
        } else {
          ctx.fillStyle = `${particleBase}${0.35 * opacity})`;
        }

        ctx.fillRect(p.x, p.y, 1.5, 1.5);

        if (p.life > p.maxLife) {
          particles[i] = resetParticle();
        }
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    window.addEventListener('resize', resize);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseleave', onMouseLeave);
      window.removeEventListener('resize', resize);
    };
  }, [theme]);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      style={{
        position: 'fixed',
        inset: 0,
        width: '100vw',
        height: '100vh',
        zIndex: 0,
        pointerEvents: 'none',
        background: 'var(--background)',
      }}
    />
  );
}
