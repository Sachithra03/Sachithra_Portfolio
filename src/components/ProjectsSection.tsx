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
    title: 'E-Commerce Platform',
    description: 'A fully functional online store with cart, checkout, and payment processing.',
    image: 'https://images.unsplash.com/photo-1563013544-824ae1b704d3?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80',
    technologies: ['React', 'Node.js', 'MongoDB', 'Stripe API'],
    liveUrl: 'https://example.com',
    githubUrl: 'https://github.com'
  }, {
    title: 'Task Management App',
    description: 'A Kanban-style project management tool with drag-and-drop functionality.',
    image: 'https://images.unsplash.com/photo-1611224885990-ab7363d7f2a9?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80',
    technologies: ['React', 'TypeScript', 'Firebase', 'Tailwind CSS'],
    liveUrl: 'https://example.com',
    githubUrl: 'https://github.com'
  }, {
    title: 'AI Image Generator',
    description: 'Web app that uses machine learning to generate unique images from text prompts.',
    image: 'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80',
    technologies: ['Next.js', 'OpenAI API', 'Vercel', 'Chakra UI'],
    liveUrl: 'https://example.com',
    githubUrl: 'https://github.com'
  }, {
    title: 'Crypto Dashboard',
    description: 'Real-time cryptocurrency tracking with price alerts and portfolio management.',
    image: 'https://images.unsplash.com/photo-1621761191319-c6fb62004040?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80',
    technologies: ['React', 'Redux', 'CoinGecko API', 'Chart.js'],
    liveUrl: 'https://example.com',
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