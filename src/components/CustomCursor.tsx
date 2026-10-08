import React, { useEffect, useRef, useState } from 'react';

export const CustomCursor: React.FC = () => {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const [isTouchDevice, setIsTouchDevice] = useState(false);

  useEffect(() => {
    // Disable on touch devices to conserve battery and CPU
    if (window.matchMedia('(pointer: coarse)').matches) {
      setIsTouchDevice(true);
      return;
    }

    const dot = dotRef.current;
    const ring = ringRef.current;
    if (!dot || !ring) return;

    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;
    let ringX = mouseX;
    let ringY = mouseY;
    let isClicking = false;
    let isHovering = false;
    let isVisible = false;
    let rafId: number;

    const onMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;

      if (!isVisible) {
        isVisible = true;
        dot.style.opacity = '1';
        ring.style.opacity = '1';
      }

      // Fast selector match without getComputedStyle forced reflow
      const target = e.target as HTMLElement | null;
      const clickable = Boolean(
        target && (
          target.tagName === 'A' ||
          target.tagName === 'BUTTON' ||
          target.closest('a, button, [role="button"], input, textarea, select, .clickable, .cursor-pointer')
        )
      );

      if (clickable !== isHovering) {
        isHovering = clickable;
        if (isHovering) {
          dot.style.width = '14px';
          dot.style.height = '14px';
          ring.style.width = '48px';
          ring.style.height = '48px';
          ring.style.borderColor = 'rgba(0, 255, 135, 0.6)';
        } else {
          dot.style.width = '8px';
          dot.style.height = '8px';
          ring.style.width = '32px';
          ring.style.height = '32px';
          ring.style.borderColor = 'rgba(0, 255, 135, 0.3)';
        }
      }
    };

    const onMouseDown = () => {
      isClicking = true;
    };

    const onMouseUp = () => {
      isClicking = false;
    };

    const onMouseEnter = () => {
      isVisible = true;
      dot.style.opacity = '1';
      ring.style.opacity = '1';
    };

    const onMouseLeave = () => {
      isVisible = false;
      dot.style.opacity = '0';
      ring.style.opacity = '0';
    };

    // Smooth RAF loop for hardware-accelerated transform without React re-renders
    const loop = () => {
      const scale = isClicking ? 0.6 : 1;
      dot.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0) translate(-50%, -50%) scale(${scale})`;

      // Lerp ring towards mouse position
      ringX += (mouseX - ringX) * 0.22;
      ringY += (mouseY - ringY) * 0.22;
      ring.style.transform = `translate3d(${ringX}px, ${ringY}px, 0) translate(-50%, -50%)`;

      rafId = requestAnimationFrame(loop);
    };

    window.addEventListener('mousemove', onMouseMove, { passive: true });
    window.addEventListener('mousedown', onMouseDown, { passive: true });
    window.addEventListener('mouseup', onMouseUp, { passive: true });
    document.addEventListener('mouseenter', onMouseEnter);
    document.addEventListener('mouseleave', onMouseLeave);

    rafId = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mousedown', onMouseDown);
      window.removeEventListener('mouseup', onMouseUp);
      document.removeEventListener('mouseenter', onMouseEnter);
      document.removeEventListener('mouseleave', onMouseLeave);
    };
  }, []);

  if (isTouchDevice) return null;

  return (
    <>
      {/* Main cursor dot */}
      <div
        ref={dotRef}
        className="fixed top-0 left-0 pointer-events-none z-50 rounded-full bg-primary opacity-0 transition-[width,height,opacity] duration-150 ease-out will-change-transform"
        style={{
          width: '8px',
          height: '8px',
          boxShadow: '0 0 10px rgba(0, 255, 135, 0.8)',
        }}
      />

      {/* Trailing cursor ring */}
      <div
        ref={ringRef}
        className="fixed top-0 left-0 pointer-events-none z-40 rounded-full border border-primary/30 opacity-0 transition-[width,height,border-color,opacity] duration-200 ease-out will-change-transform"
        style={{
          width: '32px',
          height: '32px',
        }}
      />
    </>
  );
};