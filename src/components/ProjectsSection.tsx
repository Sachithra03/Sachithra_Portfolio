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
    image: '/Photos/xaphora-logo.png',
    technologies: ['React', 'Node.js', 'MongoDB', 'Express', 'JWT', 'Chatgpt API'],
    liveUrl: '#',
    githubUrl: 'https://github.com/TeamITPY2S2/Xaphora-Dress'
  }, {
    title: 'CashBuddy – Personal Finance Manager',
    description: 'Android app for tracking income & expenses with offline storage, daily logs, balance overview, and spending reports using Room DB and Material Design.',
    image: '/Photos/cashbuddy.png',
    technologies: ['Kotlin', 'Android Studio', 'Room', 'SQLite'],
    liveUrl: '#',
    githubUrl: 'https://github.com/Sachithra03/CashBuddy'
  }, {
    title: 'Online Medicine Ordering System',
    description: 'Pharmacy system where customers can order medicines and admins manage users and orders with secure role-based access.',
    image: '/Photos/online_medicine.png',
    technologies: ['React', 'Redux', 'CoinGecko API', 'Chart.js'],
    liveUrl: '#',
    githubUrl: 'https://github.com/Sachithra03/Online-Medicine-Ordering-System'
  }, {
    title: 'BetterHelp Recruitment – Online Recruitment Service ',
    description: 'Recruitment platform with role-based dashboards, secure authentication, session management, input validation, and password recovery, deployed locally with XAMPP.',
    image: '/Photos/betterHelp_recruitment.png',
    technologies: ['HTML', 'CSS', 'PHP', 'MySQL', 'XAMPP'],
    liveUrl: '#',
    githubUrl: 'https://github.com/Sachithra03/BetterHelp-Recruitment-Online-Recruitment-Service'
    
  }];
  return <section ref={sectionRef} id="projects" className="section-padding relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-20 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16 fade-in-up">
          <p className="text-primary text-lg font-semibold tracking-wider uppercase mb-4">
            Portfolio
          </p>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold font-heading mb-6">
            <span className="text-white">LATEST WORKING</span>{" "}
            <span className="gradient-text">PROJECTS</span>
          </h2>
          <p className="text-gray-400 text-xl max-w-3xl mx-auto">
            Showcasing my recent work and technical achievements
          </p>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
          {projects.map((project, index) => <ProjectCard key={index} {...project} />)}
        </div>
      </div>
    </section>;
};