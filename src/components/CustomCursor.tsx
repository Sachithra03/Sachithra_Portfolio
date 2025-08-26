import React, { useEffect, useState } from 'react';
import { useTheme } from '../context/ThemeContext';
export const CustomCursor = () => {
  const [position, setPosition] = useState({
    x: 0,
    y: 0
  });
  const [isVisible, setIsVisible] = useState(false);
  const {
    theme
  } = useTheme();
  useEffect(() => {
    const updateCursorPosition = (e: MouseEvent) => {
      setPosition({
        x: e.clientX,
        y: e.clientY
      });
    };
    const handleMouseEnter = () => setIsVisible(true);
    const handleMouseLeave = () => setIsVisible(false);
    document.addEventListener('mousemove', updateCursorPosition);
    document.addEventListener('mouseenter', handleMouseEnter);
    document.addEventListener('mouseleave', handleMouseLeave);
    return () => {
      document.removeEventListener('mousemove', updateCursorPosition);
      document.removeEventListener('mouseenter', handleMouseEnter);
      document.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);
  const cursorColor = theme === 'dark' ? 'rgba(138, 75, 255, 0.6)' : 'rgba(94, 85, 255, 0.6)';
  const trailColor = theme === 'dark' ? 'rgba(138, 75, 255, 0.2)' : 'rgba(94, 85, 255, 0.2)';
  return <>
      <div className="fixed pointer-events-none z-50 rounded-full mix-blend-difference transition-transform duration-100 ease-out" style={{
      width: '12px',
      height: '12px',
      backgroundColor: cursorColor,
      transform: `translate(${position.x}px, ${position.y}px)`,
      opacity: isVisible ? 1 : 0
    }} />
      <div className="fixed pointer-events-none z-40 rounded-full mix-blend-difference transition-transform duration-300 ease-out" style={{
      width: '40px',
      height: '40px',
      backgroundColor: trailColor,
      transform: `translate(${position.x - 20}px, ${position.y - 20}px)`,
      opacity: isVisible ? 0.5 : 0
    }} />
    </>;
};