import React, { useEffect, useState } from 'react';
import { useTheme } from '../context/ThemeContext';
export const CustomCursor = () => {
  const [position, setPosition] = useState({
    x: 0,
    y: 0
  });
  const [isVisible, setIsVisible] = useState(true);
  const [isMoving, setIsMoving] = useState(false);
  const { theme } = useTheme();

  useEffect(() => {
    let moveTimer: NodeJS.Timeout;

    const updateCursorPosition = (e: MouseEvent) => {
      setIsVisible(true);
      setIsMoving(true);
      setPosition({
        x: e.clientX,
        y: e.clientY
      });

      // Reset the moving state after cursor stops
      clearTimeout(moveTimer);
      moveTimer = setTimeout(() => setIsMoving(false), 100);
    };

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
    document.addEventListener('mouseenter', handleMouseEnter);
    document.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      document.removeEventListener('mousemove', updateCursorPosition);
      document.removeEventListener('mouseenter', handleMouseEnter);
      document.removeEventListener('mouseleave', handleMouseLeave);
      clearTimeout(moveTimer);
    };
  }, []);
  const cursorColor = theme === 'dark' ? 'rgba(138, 75, 255, 0.6)' : 'rgba(94, 85, 255, 0.6)';
  const trailColor = theme === 'dark' ? 'rgba(138, 75, 255, 0.2)' : 'rgba(94, 85, 255, 0.2)';
  return <>
      <div 
        className="fixed pointer-events-none z-50 rounded-full mix-blend-difference transition-all duration-100 ease-out"
        style={{
          width: '12px',
          height: '12px',
          backgroundColor: cursorColor,
          transform: `translate(${position.x}px, ${position.y}px) scale(${isMoving ? 0.8 : 1})`,
          opacity: isVisible ? 1 : 0,
          backdropFilter: 'invert(1)',
          WebkitBackdropFilter: 'invert(1)',
          boxShadow: `0 0 10px ${cursorColor}, 0 0 20px ${cursorColor}`,
          transition: 'transform 0.1s ease-out, opacity 0.2s ease-out'
        }}
      />
      <div 
        className="fixed pointer-events-none z-40 rounded-full mix-blend-difference transition-all duration-300 ease-out"
        style={{
          width: '40px',
          height: '40px',
          backgroundColor: 'transparent',
          border: `2px solid ${trailColor}`,
          transform: `translate(${position.x - 20}px, ${position.y - 20}px) scale(${isMoving ? 1.2 : 1})`,
          opacity: isVisible ? 0.8 : 0,
          backdropFilter: 'invert(0.5)',
          WebkitBackdropFilter: 'invert(0.5)',
          transition: 'transform 0.3s ease-out, opacity 0.3s ease-out'
        }}
      />
    </>;
};