import { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { ProjectsSection } from './components/ProjectsSection';
import { SkillsSection } from './components/sections/SkillsSection';
import { EducationSection } from './components/sections/EducationSection';
import { AboutSection } from './components/sections/AboutSection';
import { ContactSection } from './components/sections/ContactSection';
import { CertificationsSection } from './components/sections/CertificationsSection';
import { Navbar } from './components/Navbar';
import { LoadingScreen } from './components/LoadingScreen';
import { ThemeProvider } from './context/ThemeContext';
import { ScrollProvider } from './context/ScrollContext';

export function App() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate loading time
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 3500); // 3.5 seconds loading time

    return () => clearTimeout(timer);
  }, []);

  return <ThemeProvider>
      <ScrollProvider>
        {isLoading && <LoadingScreen />}
        <div 
          className={`relative w-full min-h-screen font-sans bg-black text-white overflow-x-hidden transition-opacity duration-500 ${
            isLoading ? 'opacity-0' : 'opacity-100'
          }`}
        >
          <Navbar />
          <main className="relative z-10 w-full">
            <Header />
            <div className="relative">
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