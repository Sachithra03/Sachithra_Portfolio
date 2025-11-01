import React, { useEffect, useState, createContext, useContext, ReactNode } from 'react';
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
  const [scrollY, setScrollY] = useState(0);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [sections, setSections] = useState<Record<string, {
    top: number;
    bottom: number;
  }>>({});
  const [currentSection, setCurrentSection] = useState('');
  const registerSection = (id: string, top: number, bottom: number) => {
    setSections(prev => ({
      ...prev,
      [id]: {
        top,
        bottom
      }
    }));
  };
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      setScrollY(scrollPosition);
      const documentHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = Math.min(scrollPosition / documentHeight, 1);
      setScrollProgress(progress);
      // Determine current section
      for (const [id, {
        top,
        bottom
      }] of Object.entries(sections)) {
        if (scrollPosition >= top - 200 && scrollPosition < bottom - 200) {
          setCurrentSection(id);
          break;
        }
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [sections]);
  return <ScrollContext.Provider value={{
    scrollY,
    scrollProgress,
    sections,
    currentSection,
    registerSection
  }}>
      {children}
    </ScrollContext.Provider>;
};