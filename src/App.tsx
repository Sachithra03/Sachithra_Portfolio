import React, { useEffect, useState } from 'react';
import { Header } from './components/Header';
import { ProjectsSection } from './components/ProjectsSection';
import { SkillsSection } from './components/sections/SkillsSection';
import { EducationSection } from './components/sections/EducationSection';
import { AboutSection } from './components/sections/AboutSection';
import { ContactSection } from './components/sections/ContactSection';
import { CertificationsSection } from './components/sections/CertificationsSection';
import { CustomCursor } from './components/CustomCursor';
import { AnimatedBackground } from './components/AnimatedBackground';
import { Navbar } from './components/Navbar';
import { AnimatedCar } from './components/AnimatedCar';
import { ThemeProvider } from './context/ThemeContext';
import { ScrollProvider } from './context/ScrollContext';
export function App() {
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => {
      window.removeEventListener('resize', checkMobile);
    };
  }, []);
  return <ThemeProvider>
      <ScrollProvider>
        <div className="relative w-full min-h-screen font-sans transition-colors duration-300 bg-slate-50 dark:bg-slate-900 overflow-x-hidden">
          <AnimatedBackground />
          {!isMobile && <CustomCursor />}
          <Navbar />
          <main className="relative z-10 w-full">
            <Header />
            <div className="relative">
              <AnimatedCar isMobile={isMobile} />
              <AboutSection />
              <ProjectsSection />
              <SkillsSection />
              <EducationSection />
              <CertificationsSection />
              <ContactSection />
            </div>
          </main>
        </div>
      </ScrollProvider>
    </ThemeProvider>;
}