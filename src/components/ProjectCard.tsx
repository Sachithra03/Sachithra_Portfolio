import React, { useState } from 'react';
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
  const [isHovered, setIsHovered] = useState(false);
  
  return (
    <div 
      className="group relative rounded-xl overflow-hidden card-dark hover-glow cursor-pointer flex flex-col h-full"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Image Container */}
      <div className="relative h-56 sm:h-60 md:h-64 overflow-hidden">
        <img 
          src={image} 
          alt={`${title} project screenshot`} 
          className="w-full h-full object-cover object-center transform transition-transform duration-700 group-hover:scale-110" 
        />
        
        {/* Overlay with gradient */}
        <div className={`absolute inset-0 bg-gradient-to-t from-dark via-dark/80 to-transparent transition-opacity duration-300 ${
          isHovered ? 'opacity-90' : 'opacity-60'
        }`}></div>
        
        {/* Hover Overlay with Links */}
        <div className={`absolute inset-0 flex items-center justify-center gap-3 sm:gap-4 p-4 transition-opacity duration-300 ${
          isHovered ? 'opacity-100' : 'opacity-0'
        }`}>
          {liveUrl && (
            <a
              href={liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 sm:gap-2 px-4 py-2.5 sm:px-5 bg-primary text-dark-300 rounded-lg text-sm sm:text-base font-semibold hover:bg-primary-400 transition-all transform hover:scale-105"
              onClick={(e) => e.stopPropagation()}
            >
              <ExternalLinkIcon size={16} /> 
              Live Demo
            </a>
          )}
          {githubUrl && (
            <a
              href={githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 sm:gap-2 px-4 py-2.5 sm:px-5 bg-white/10 backdrop-blur-sm text-white border border-white/20 rounded-lg text-sm sm:text-base font-semibold hover:bg-white/20 transition-all transform hover:scale-105"
              onClick={(e) => e.stopPropagation()}
            >
              <GithubIcon size={16} />
              Code
            </a>
          )}
        </div>
      </div>
      
      {/* Content */}
      <div className="p-6 flex flex-col flex-1">
        <h3 className="text-xl md:text-2xl font-bold mb-3 text-white group-hover:text-primary transition-colors">
          {title}
        </h3>
        <p className="text-gray-400 mb-4 leading-relaxed">
          {description}
        </p>
        
        {/* Technologies */}
        <div className="flex flex-wrap gap-2 mt-auto pt-2">
          {technologies.map((tech, index) => (
            <span 
              key={index} 
              className="px-3 py-1 text-sm rounded-full bg-primary/10 text-primary border border-primary/20 font-medium"
            >
              {tech}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};