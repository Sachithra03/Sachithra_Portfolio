import React from 'react';
import { ExternalLinkIcon, GithubIcon } from 'lucide-react';
interface ProjectCardProps {
  title: string;
  description: string;
  image: string;
  technologies: string[];
  liveUrl?: string;
  githubUrl?: string;
}
export const ProjectCard: React.FC<ProjectCardProps> = ({
  title,
  description,
  image,
  technologies,
  liveUrl,
  githubUrl
}) => {
  return <div className="bg-white/40 dark:bg-slate-800/40 backdrop-blur-md rounded-xl overflow-hidden border border-white/20 dark:border-slate-700/20 shadow-lg transition-all duration-300 hover:shadow-xl" style={{
    transform: 'perspective(1000px)',
    transformStyle: 'preserve-3d',
    transition: 'transform 0.6s ease'
  }} onMouseMove={e => {
    if (window.innerWidth >= 768) {
      const card = e.currentTarget;
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      const rotateX = (y - centerY) / 30;
      const rotateY = (centerX - x) / 30;
      card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
    }
  }} onMouseLeave={e => {
    e.currentTarget.style.transform = 'perspective(1000px)';
  }}>
      <div className="h-48 md:h-56 overflow-hidden">
        <img src={image} alt={`${title} project screenshot`} className="w-full h-full object-cover object-center transform transition-transform duration-500 hover:scale-110" />
      </div>
      <div className="p-6">
        <h3 className="text-xl font-bold mb-2 text-slate-800 dark:text-white">
          {title}
        </h3>
        <p className="text-slate-600 dark:text-slate-300 mb-4">{description}</p>
        <div className="flex flex-wrap gap-2 mb-6">
          {technologies.map((tech, index) => <span key={index} className="px-2 py-1 text-xs font-medium bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 rounded">
              {tech}
            </span>)}
        </div>
        <div className="flex space-x-3">
          {liveUrl && <a href={liveUrl} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-lg transition-transform duration-300 hover:scale-105 flex-1">
              <ExternalLinkIcon size={16} className="mr-2" /> Live Demo
            </a>}
          {githubUrl && <a href={githubUrl} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center px-4 py-2 bg-slate-700 dark:bg-slate-600 text-white rounded-lg transition-transform duration-300 hover:scale-105 flex-1">
              <GithubIcon size={16} className="mr-2" /> Code
            </a>}
        </div>
      </div>
    </div>;
};