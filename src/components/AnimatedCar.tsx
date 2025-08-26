import React, { useEffect, useState, useRef } from 'react';
import { useScroll } from '../context/ScrollContext';
import { useTheme } from '../context/ThemeContext';
import { FloatingCard } from './FloatingCard';
interface AnimatedCarProps {
  isMobile: boolean;
}
export const AnimatedCar: React.FC<AnimatedCarProps> = ({
  isMobile
}) => {
  const {
    scrollProgress,
    currentSection
  } = useScroll();
  const {
    theme
  } = useTheme();
  const pathRef = useRef<SVGPathElement>(null);
  const carRef = useRef<HTMLDivElement>(null);
  const [isAtCheckpoint, setIsAtCheckpoint] = useState(false);
  const [checkpointSection, setCheckpointSection] = useState('');
  // Define checkpoints based on scroll progress
  const checkpoints = {
    home: 0.05,
    about: 0.2,
    projects: 0.4,
    skills: 0.6,
    education: 0.75,
    certifications: 0.85,
    contact: 0.95
  };
  useEffect(() => {
    if (isMobile || !pathRef.current || !carRef.current) return;
    const path = pathRef.current;
    const pathLength = path.getTotalLength();
    // Check if we're near a checkpoint
    let nearCheckpoint = false;
    let activeSection = '';
    Object.entries(checkpoints).forEach(([section, point]) => {
      const distance = Math.abs(scrollProgress - point);
      if (distance < 0.05) {
        nearCheckpoint = true;
        activeSection = section;
      }
    });
    setIsAtCheckpoint(nearCheckpoint);
    setCheckpointSection(activeSection);
    // Calculate position along the path based on scroll progress
    // Apply easing when near checkpoints to slow down the car
    let adjustedProgress = scrollProgress;
    if (nearCheckpoint) {
      const closestCheckpoint = Object.entries(checkpoints).reduce((closest, [section, point]) => {
        return Math.abs(scrollProgress - point) < Math.abs(scrollProgress - closest.point) ? {
          section,
          point
        } : closest;
      }, {
        section: '',
        point: 1
      });
      // Apply easing to slow down near checkpoint
      const distance = Math.abs(scrollProgress - closestCheckpoint.point);
      const easingFactor = Math.max(0.3, distance * 10); // Minimum speed of 30%
      adjustedProgress = scrollProgress * easingFactor + closestCheckpoint.point * (1 - easingFactor);
    }
    const point = path.getPointAtLength(pathLength * adjustedProgress);
    // Calculate the angle for rotation
    const position1 = path.getPointAtLength(pathLength * adjustedProgress);
    const position2 = path.getPointAtLength(Math.min(pathLength * adjustedProgress + 0.01, pathLength));
    const angle = Math.atan2(position2.y - position1.y, position2.x - position1.x) * 180 / Math.PI;
    // Apply position and rotation to car with smoother transition when at checkpoints
    carRef.current.style.transition = isAtCheckpoint ? 'transform 0.5s ease-out' : 'transform 0.2s ease-out';
    carRef.current.style.transform = `translate(${point.x}px, ${point.y}px) rotate(${angle}deg)`;
    // Add pulse effect when at checkpoint
    if (isAtCheckpoint) {
      carRef.current.classList.add('pulse-effect');
    } else {
      carRef.current.classList.remove('pulse-effect');
    }
  }, [scrollProgress, isMobile, isAtCheckpoint, checkpoints]);
  if (isMobile) {
    return <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2 z-30 transition-all duration-300">
        <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full animate-bounce flex items-center justify-center">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 4L10.59 5.41L16.17 11H4V13H16.17L10.59 18.59L12 20L20 12L12 4Z" fill="white" />
          </svg>
        </div>
      </div>;
  }
  return <div className="fixed top-0 left-0 w-full h-full pointer-events-none z-20">
      <svg width="100%" height="100%" viewBox="0 0 1920 5000" preserveAspectRatio="none" className="absolute top-0 left-0">
        {/* Path that the car will follow */}
        <path ref={pathRef} d="M300,800 C500,1000 1400,1000 1600,1200 S500,1400 300,1600 S1400,1800 1600,2000 S500,2200 300,2400 S1400,2600 1600,2800 S500,3000 300,3200 S1400,3400 1600,3600 S900,3800 900,4000" fill="none" stroke={theme === 'dark' ? 'rgba(100, 100, 255, 0.2)' : 'rgba(100, 100, 200, 0.1)'} strokeWidth="10" strokeDasharray="20 20" className="road-path" />
        {/* Checkpoint markers */}
        {Object.entries(checkpoints).map(([section, point]) => {
        const pathPoint = pathRef.current ? pathRef.current.getPointAtLength(pathRef.current.getTotalLength() * point) : {
          x: 0,
          y: 0
        };
        return <circle key={section} cx={pathPoint.x} cy={pathPoint.y} r="15" fill={theme === 'dark' ? 'rgba(138, 75, 255, 0.4)' : 'rgba(94, 85, 255, 0.3)'} className="checkpoint-marker animate-pulse" />;
      })}
      </svg>
      {/* Car element */}
      <div ref={carRef} className="absolute" style={{
      left: 0,
      top: 0,
      width: '60px',
      height: '30px',
      transformOrigin: 'center',
      transition: 'transform 0.2s ease-out'
    }}>
        <div className="w-full h-full relative">
          {/* Car body */}
          <div className="absolute w-full h-full bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg shadow-lg pulse-effect">
            {/* Windshield */}
            <div className="absolute top-1 left-1 right-1 h-2/3 bg-blue-300 dark:bg-blue-900 rounded-t-md"></div>
            {/* Wheels */}
            <div className="absolute -bottom-1 left-2 w-3 h-3 bg-slate-800 rounded-full"></div>
            <div className="absolute -bottom-1 right-2 w-3 h-3 bg-slate-800 rounded-full"></div>
          </div>
          {/* Glow effect */}
          <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-10 h-3 bg-blue-400 dark:bg-blue-500 rounded-full blur-sm opacity-70"></div>
          {/* Headlights */}
          <div className="absolute -right-1 top-1/3 w-2 h-2 bg-yellow-200 rounded-full blur-sm animate-pulse"></div>
          <div className="absolute -right-1 top-2/3 w-2 h-2 bg-yellow-200 rounded-full blur-sm animate-pulse"></div>
        </div>
      </div>
      {/* Floating info card at checkpoint */}
      {isAtCheckpoint && checkpointSection && <FloatingCard section={checkpointSection} />}
    </div>;
};