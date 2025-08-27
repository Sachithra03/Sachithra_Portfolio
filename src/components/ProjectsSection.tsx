import React, { useEffect, useRef } from 'react';
import { ProjectCard } from './ProjectCard';
import { useScroll } from '../context/ScrollContext';
export const ProjectsSection = () => {
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
      registerSection('projects', offsetTop, offsetTop + offsetHeight);
    }
  }, [registerSection]);
  const projects = [{
    title: 'Xaphora Dress - E-Commerce Platform',
    description: 'MERN-based clothing store with role-based access, JWT auth, user management, admin dashboard, and AI-powered customer support.',
    image: '/src/Photos/xaphora-logo.png',
    technologies: ['React', 'Node.js', 'MongoDB', 'Express', 'JWT', 'Chatgpt API'],
    liveUrl: '#',
    githubUrl: 'https://github.com/TeamITPY2S2/Xaphora-Dress'
  }, {
    title: 'CashBuddy – Personal Finance Manager',
    description: 'Android app for tracking income & expenses with offline storage, daily logs, balance overview, and spending reports using Room DB and Material Design.',
    image: '/src/Photos/cashbuddy.png',
    technologies: ['Kotlin', 'Android Studio', 'Room', 'SQLite'],
    liveUrl: '#',
    githubUrl: 'https://github.com/Sachithra03/CashBuddy'
  }, {
    title: 'Online Medicine Ordering System',
    description: 'Pharmacy system where customers can order medicines and admins manage users and orders with secure role-based access.',
    image: '/src/Photos/online_medicine.png',
    technologies: ['React', 'Redux', 'CoinGecko API', 'Chart.js'],
    liveUrl: '#',
    githubUrl: 'https://github.com'
  }, {
    title: 'BetterHelp Recruitment – Online Recruitment Service ',
    description: 'Recruitment platform with role-based dashboards, secure authentication, session management, input validation, and password recovery, deployed locally with XAMPP.',
    image: '/src/Photos/betterHelp_recruitment.png',
    technologies: ['HTML', 'CSS', 'PHP', 'MySQL', 'XAMPP'],
    liveUrl: '#',
    githubUrl: 'https://github.com'
    
  }];
  return <section ref={sectionRef} id="projects" className="py-20 px-4 md:px-8 max-w-7xl mx-auto min-h-screen flex flex-col justify-center">
      <h2 className="text-3xl md:text-4xl font-bold mb-4 text-center text-slate-800 dark:text-white">
        My Projects
      </h2>
      <p className="text-center text-slate-600 dark:text-slate-400 mb-12 max-w-2xl mx-auto">
        Here are some of my recent projects showcasing my skills and expertise
        in web development and design.
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
        {projects.map((project, index) => <ProjectCard key={index} {...project} />)}
      </div>
    </section>;
};