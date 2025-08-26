import React, { useEffect, useRef } from 'react';
import { GithubIcon, LinkedinIcon, MailIcon, ArrowDownIcon } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { ThemeToggle } from './ThemeToggle';
import { useScroll } from '../context/ScrollContext';
export const Header = () => {
  const {
    theme
  } = useTheme();
  const {
    registerSection
  } = useScroll();
  const sectionRef = useRef<HTMLElement>(null);
  useEffect(() => {
    if (sectionRef.current) {
      const {
        offsetTop,
        offsetHeight
      } = sectionRef.current;
      registerSection('home', offsetTop, offsetTop + offsetHeight);
    }
  }, [registerSection]);
  const scrollToProjects = () => {
    const projectsSection = document.getElementById('projects');
    if (projectsSection) {
      projectsSection.scrollIntoView({
        behavior: 'smooth'
      });
    }
  };
  return <header ref={sectionRef} id="home" className="flex flex-col justify-center items-center w-full min-h-screen px-4 relative">
      <div className="relative max-w-md w-full p-8 rounded-xl backdrop-blur-md bg-white/20 dark:bg-slate-900/30 border border-white/30 dark:border-slate-700/30 shadow-xl" style={{
      transform: 'perspective(1000px)',
      transformStyle: 'preserve-3d',
      transition: 'transform 0.6s ease',
      boxShadow: theme === 'dark' ? '0 0 20px rgba(138, 75, 255, 0.3)' : '0 0 20px rgba(94, 85, 255, 0.2)'
    }} onMouseMove={e => {
      if (window.innerWidth >= 768) {
        const card = e.currentTarget;
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        const rotateX = (y - centerY) / 20;
        const rotateY = (centerX - x) / 20;
        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
      }
    }} onMouseLeave={e => {
      e.currentTarget.style.transform = 'perspective(1000px)';
    }}>
        <div className="absolute -top-20 left-1/2 transform -translate-x-1/2 w-32 h-32">
          <div className="w-full h-full rounded-full border-4 border-purple-500 dark:border-purple-400 p-1 bg-white/20 dark:bg-slate-900/50 backdrop-blur-md">
            <img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" alt="Profile" className="w-full h-full object-cover rounded-full" />
          </div>
          <div className="absolute -bottom-2 -right-2 w-10 h-10 bg-green-500 rounded-full flex items-center justify-center border-2 border-white dark:border-slate-800">
            <span className="text-white text-xs font-bold">DEV</span>
          </div>
        </div>
        <h1 className="text-4xl md:text-5xl font-bold mb-2 text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400 mt-10">
          John Doe
        </h1>
        <h2 className="text-xl md:text-2xl font-medium mb-4 text-slate-700 dark:text-slate-300">
          DevOps Engineer & Full Stack Developer
        </h2>
        <p className="text-slate-600 dark:text-slate-400 mb-6">
          Software engineering student passionate about DevOps and full-stack
          development. Building scalable solutions with modern technologies.
        </p>
        <div className="flex justify-center space-x-4 mb-8">
          <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="transform transition-all duration-300 hover:scale-125 hover:-translate-y-1 bg-blue-100 dark:bg-blue-900/30 p-2 rounded-full" aria-label="LinkedIn Profile">
            <LinkedinIcon size={24} className="text-blue-500 dark:text-blue-400" />
          </a>
          <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="transform transition-all duration-300 hover:scale-125 hover:-translate-y-1 bg-slate-100 dark:bg-slate-800/30 p-2 rounded-full" aria-label="GitHub Profile">
            <GithubIcon size={24} className="text-slate-700 dark:text-slate-300" />
          </a>
          <a href="mailto:john@example.com" className="transform transition-all duration-300 hover:scale-125 hover:-translate-y-1 bg-purple-100 dark:bg-purple-900/30 p-2 rounded-full" aria-label="Email Me">
            <MailIcon size={24} className="text-purple-500 dark:text-purple-400" />
          </a>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <button onClick={scrollToProjects} className="py-3 px-6 bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white font-medium rounded-lg transition-all duration-300 transform hover:scale-105 flex items-center justify-center">
            View Projects <ArrowDownIcon size={16} className="ml-2" />
          </button>
          <a href="#" className="py-3 px-6 bg-white/10 backdrop-blur-md border border-white/20 dark:bg-slate-800/20 dark:border-slate-700/20 text-slate-800 dark:text-white font-medium rounded-lg transition-all duration-300 flex items-center justify-center hover:bg-white/20 dark:hover:bg-slate-700/20">
            Download CV
          </a>
        </div>
      </div>
    </header>;
};