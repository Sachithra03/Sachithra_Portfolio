import React, { useEffect, useState } from 'react';

export const CustomCursor = () => {
  const [position, setPosition] = useState({
    x: 0,
    y: 0
  });
  const [isVisible, setIsVisible] = useState(true);
  const [isPointer, setIsPointer] = useState(false);
  const [isClicking, setIsClicking] = useState(false);

  useEffect(() => {
    const updateCursorPosition = (e: MouseEvent) => {
      setIsVisible(true);
      setPosition({
        x: e.clientX,
        y: e.clientY
      });

      // Check if hovering over clickable element
      const target = e.target as HTMLElement;
      const isClickable = 
        target.tagName === 'A' || 
        target.tagName === 'BUTTON' || 
        target.closest('a') !== null || 
        target.closest('button') !== null ||
        target.classList.contains('clickable') ||
        window.getComputedStyle(target).cursor === 'pointer';
      
      setIsPointer(isClickable);
    };

    const handleMouseDown = () => setIsClicking(true);
    const handleMouseUp = () => setIsClicking(false);
    const handleMouseEnter = () => setIsVisible(true);
    const handleMouseLeave = () => setIsVisible(false);

    // Initialize cursor position
    const initCursor = () => {
      const centerX = window.innerWidth / 2;
      const centerY = window.innerHeight / 2;
      setPosition({ x: centerX, y: centerY });
    };

    initCursor();
    document.addEventListener('mousemove', updateCursorPosition);
    document.addEventListener('mousedown', handleMouseDown);
    document.addEventListener('mouseup', handleMouseUp);
    document.addEventListener('mouseenter', handleMouseEnter);
    document.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      document.removeEventListener('mousemove', updateCursorPosition);
      document.removeEventListener('mousedown', handleMouseDown);
      document.removeEventListener('mouseup', handleMouseUp);
      document.removeEventListener('mouseenter', handleMouseEnter);
      document.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  return <>
      {/* Main cursor dot */}
      <div 
        className="fixed pointer-events-none z-50 rounded-full transition-all duration-100 ease-out"
        style={{
          width: isPointer ? '16px' : '8px',
          height: isPointer ? '16px' : '8px',
          backgroundColor: '#00FF87',
          transform: `translate(${position.x - (isPointer ? 8 : 4)}px, ${position.y - (isPointer ? 8 : 4)}px) scale(${isClicking ? 0.5 : 1})`,
          opacity: isVisible ? 1 : 0,
          boxShadow: '0 0 10px rgba(0, 255, 135, 0.8), 0 0 20px rgba(0, 255, 135, 0.4)',
          transition: 'all 0.15s ease-out'
        }}
      />
      
      {/* Cursor ring/outline */}
      <div 
        className="fixed pointer-events-none z-40 rounded-full transition-all duration-200 ease-out"
        style={{
          width: isPointer ? '48px' : '32px',
          height: isPointer ? '48px' : '32px',
          backgroundColor: 'transparent',
          border: `2px solid rgba(0, 255, 135, ${isPointer ? 0.6 : 0.3})`,
          transform: `translate(${position.x - (isPointer ? 24 : 16)}px, ${position.y - (isPointer ? 24 : 16)}px)`,
          opacity: isVisible ? 1 : 0,
          transition: 'all 0.2s ease-out'
        }}
      />
    </>;
};