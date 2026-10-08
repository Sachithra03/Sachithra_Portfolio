import React, { useEffect, useState, createContext, useContext, ReactNode, useRef, useCallback, useMemo } from 'react';

interface ScrollContextType {
  scrollY: number;
  scrollProgress: number;
  sections: Record<string, {
    top: number;
    bottom: number;
  }>;
  currentSection: string;
  registerSection: (id: string, top: number, bottom: number) => void;
}

const ScrollContext = createContext<ScrollContextType>({
  scrollY: 0,
  scrollProgress: 0,
  sections: {},
  currentSection: '',
  registerSection: () => {}
});

export const useScroll = () => useContext(ScrollContext);

export const ScrollProvider = ({
  children
}: {
  children: ReactNode;
}) => {
  const sectionsRef = useRef<Record<string, { top: number; bottom: number }>>({});
  const [currentSection, setCurrentSection] = useState('home');
  const currentSectionRef = useRef('home');

  const registerSection = useCallback((id: string, top: number, bottom: number) => {
    sectionsRef.current[id] = { top, bottom };
  }, []);

  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(() => {
          const scrollPosition = window.scrollY;
          for (const [id, { top, bottom }] of Object.entries(sectionsRef.current)) {
            if (scrollPosition >= top - 250 && scrollPosition < bottom - 250) {
              if (currentSectionRef.current !== id) {
                currentSectionRef.current = id;
                setCurrentSection(id);
              }
              break;
            }
          }
          ticking = false;
        });
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const value = useMemo(() => ({
    scrollY: 0,
    scrollProgress: 0,
    sections: sectionsRef.current,
    currentSection,
    registerSection
  }), [currentSection, registerSection]);

  return (
    <ScrollContext.Provider value={value}>
      {children}
    </ScrollContext.Provider>
  );
};