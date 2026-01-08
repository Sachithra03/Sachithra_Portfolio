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
    title: 'Personal Portfolio Website',
    description: 'Modern, responsive portfolio website to showcase projects, skills, and experience with smooth animations, clean UI, and optimized performance.',
    image: '/Photos/portfolio-img.png',
    technologies: [
  'React',
  'TypeScript',
  'Tailwind CSS',
  'Framer Motion',
  'Vite'
  ],
    liveUrl: 'https://sachithraindrachapa.vercel.app/',
    githubUrl: 'https://github.com/Sachithra03/Sachithra_Portfolio.git'
  },
  
  {
    title: 'Xaphora Dress - E-Commerce Platform',
    description: 'MERN-based clothing store with role-based access, JWT auth, user management, admin dashboard, and AI-powered customer support.',
    image: '/Photos/xaphora-logo.png',
    technologies: ['React', 'Node.js', 'MongoDB', 'Express', 'JWT', 'Chatgpt API'],
    //liveUrl: '#',
    githubUrl: 'https://github.com/TeamITPY2S2/Xaphora-Dress'
  },
  
  {
    title: 'EcoTrack – Smart Waste Management System',
    description: 'Web-based waste management platform with role-based dashboards, JWT authentication, ticket handling, payments, and route/location features using OpenStreetMap.',
    image: '/Photos/eco-track-img.png',
    technologies: [
  'React',
  'TypeScript',
  'Tailwind CSS',
  'Node.js',
  'Express',
  'MongoDB',
  'JWT',
  'OpenStreetMap'
  ],
    //liveUrl: '#',
    githubUrl: 'https://github.com/OpenshelfTeam/EcoTrack.git'
  },

  {
    title: 'OpenShelf – University Library Mobile App',
    description: 'Mobile library application that allows university students to upload, share, and access study materials with online and offline support, secure authentication, and AI-assisted learning features.',
    image: '/Photos/openshelf-img.png',
    technologies: [
  'React Native CLI',
  'TypeScript',
  'Supabase',
  'PostgreSQL',
  'AsyncStorage',
  'OpenRouter API'
  ],
    //liveUrl: '#',
    githubUrl: 'https://github.com/kusal2002/OpenShelf.git'
  },
  
  {
    title: 'BlogSpace – Personal Blog Platform',
    description: 'Modern blog platform where users can create, publish, and interact with posts through likes and comments, featuring authentication, user profiles, and a clean responsive UI.',
    image: '/Photos/blogspace-img.png',
    technologies: [
  'React',
  'TypeScript',
  'Node.js',
  'Express',
  'MongoDB',
  'JWT Authentication',
  'Tailwind CSS'
  ],
    liveUrl: 'https://personal-blog-platform-master.vercel.app/',
    githubUrl: 'https://github.com/Sachithra03/personal-blog-platform.git'
  },
  
  {
    title: 'CashBuddy – Personal Finance Manager',
    description: 'Android app for tracking income & expenses with offline storage, daily logs, balance overview, and spending reports using Room DB and Material Design.',
    image: '/Photos/cashbuddy-img.png',
    technologies: ['Kotlin', 'Android Studio', 'Room', 'SQLite'],
    githubUrl: 'https://github.com/Sachithra03/CashBuddy'
  }, 
  
  {
    title: 'Online Medicine Ordering System',
    description: 'Web-based pharmacy system where customers can order medicines online and admins manage users, orders, and inventory with secure role-based access.',
    image: '/Photos/medorder-img.png',
    technologies: [
  'Java',
  'JSP',
  'Servlets',
  'SQL',
  'HTML',
  'CSS',
  'JavaScript'
  ],
    githubUrl: 'https://github.com/Sachithra03/Online-Medicine-Ordering-System'
  }, 
  
  {
    title: 'BetterHelp Recruitment – Online Recruitment Service ',
    description: 'Recruitment platform with role-based dashboards, secure authentication, session management, input validation, and password recovery, deployed locally with XAMPP.',
    image: '/Photos/betterhelp-img.png',
    technologies: ['HTML', 'CSS', 'PHP', 'MySQL', 'XAMPP'],
   
    githubUrl: 'https://github.com/Sachithra03/BetterHelp-Recruitment-Online-Recruitment-Service'
    
  }];
  return <section ref={sectionRef} id="projects" className="relative overflow-hidden section-padding">
      {/* Background decoration */}
      <div className="absolute right-0 rounded-full top-20 w-96 h-96 bg-primary/5 blur-3xl"></div>
      
      <div className="container relative z-10 px-4 mx-auto">
        {/* Section Header */}
        <div className="mb-16 text-center fade-in-up">
          <p className="mb-4 text-lg font-semibold tracking-wider uppercase text-primary">
            WORK GALLERY
          </p>
          <h2 className="mb-6 text-4xl font-bold md:text-5xl lg:text-6xl font-heading">
            <span className="text-white">LATEST WORKING</span>{" "}
            <span className="gradient-text">PROJECTS</span>
          </h2>
          <p className="max-w-3xl mx-auto text-xl text-gray-400">
            Showcasing my recent work and technical achievements
          </p>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-2">
          {projects.map((project, index) => <ProjectCard key={index} {...project} />)}
        </div>
      </div>
    </section>;
};