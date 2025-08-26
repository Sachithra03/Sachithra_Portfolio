import React, { useEffect, useRef } from 'react';
import { useTheme } from '../context/ThemeContext';
export const AnimatedBackground = () => {
  const {
    theme
  } = useTheme();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    const particles: Particle[] = [];
    const particleCount = 100;
    class Particle {
      x: number;
      y: number;
      size: number;
      speedX: number;
      speedY: number;
      color: string;
      constructor(canvasWidth: number, canvasHeight: number) {
        this.x = Math.random() * canvasWidth;
        this.y = Math.random() * canvasHeight;
        this.size = Math.random() * 3 + 1;
        this.speedX = (Math.random() - 0.5) * 0.5;
        this.speedY = (Math.random() - 0.5) * 0.5;
        this.color = theme === 'dark' ? `rgba(${100 + Math.random() * 155}, ${100 + Math.random() * 155}, 255, ${0.3 + Math.random() * 0.4})` : `rgba(100, 100, ${200 + Math.random() * 55}, ${0.2 + Math.random() * 0.3})`;
      }
      update(canvasWidth: number, canvasHeight: number) {
        this.x += this.speedX;
        this.y += this.speedY;
        if (this.x > canvasWidth) this.x = 0;else if (this.x < 0) this.x = canvasWidth;
        if (this.y > canvasHeight) this.y = 0;else if (this.y < 0) this.y = canvasHeight;
      }
      draw() {
        if (!ctx) return;
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
      }
    }
    const init = () => {
      for (let i = 0; i < particleCount; i++) {
        particles.push(new Particle(canvas.width, canvas.height));
      }
    };
    const connect = () => {
      for (let a = 0; a < particles.length; a++) {
        for (let b = a; b < particles.length; b++) {
          const dx = particles[a].x - particles[b].x;
          const dy = particles[a].y - particles[b].y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          if (distance < 100) {
            const opacity = 1 - distance / 100;
            ctx.strokeStyle = theme === 'dark' ? `rgba(150, 150, 255, ${opacity * 0.3})` : `rgba(100, 100, 200, ${opacity * 0.2})`;
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(particles[a].x, particles[a].y);
            ctx.lineTo(particles[b].x, particles[b].y);
            ctx.stroke();
          }
        }
      }
    };
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      for (const particle of particles) {
        particle.update(canvas.width, canvas.height);
        particle.draw();
      }
      connect();
      requestAnimationFrame(animate);
    };
    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      particles.length = 0;
      init();
    };
    window.addEventListener('resize', handleResize);
    init();
    animate();
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [theme]);
  return <canvas ref={canvasRef} className="fixed top-0 left-0 w-full h-full pointer-events-none z-0" />;
};