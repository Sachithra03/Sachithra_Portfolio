import { Header } from './components/Header';
import { ProjectsSection } from './components/ProjectsSection';
import { SkillsSection } from './components/sections/SkillsSection';
import { EducationSection } from './components/sections/EducationSection';
import { AboutSection } from './components/sections/AboutSection';
import { ContactSection } from './components/sections/ContactSection';
import { CertificationsSection } from './components/sections/CertificationsSection';
import { AnimatedBackground } from './components/AnimatedBackground';
import { Navbar } from './components/Navbar';
import { ThemeProvider } from './context/ThemeContext';
import { ScrollProvider } from './context/ScrollContext';
export function App() {
  return <ThemeProvider>
      <ScrollProvider>
        <div className="relative w-full min-h-screen font-sans transition-colors duration-300 bg-slate-50 dark:bg-slate-900 overflow-x-hidden">
          <AnimatedBackground />
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