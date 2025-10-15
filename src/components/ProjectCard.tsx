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
      className="group relative rounded-xl overflow-hidden card-dark hover-glow cursor-pointer"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Image Container */}
      <div className="relative h-64 md:h-72 overflow-hidden">
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
        <div className={`absolute inset-0 flex items-center justify-center gap-4 transition-opacity duration-300 ${
          isHovered ? 'opacity-100' : 'opacity-0'
        }`}>
          {liveUrl && (
            <a
              href={liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-6 py-3 bg-primary text-dark-300 rounded-lg font-semibold hover:bg-primary-400 transition-all transform hover:scale-110"
              onClick={(e) => e.stopPropagation()}
            >
              <ExternalLinkIcon size={18} /> 
              Live Demo
            </a>
          )}
          {githubUrl && (
            <a
              href={githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-6 py-3 bg-white/10 backdrop-blur-sm text-white border border-white/20 rounded-lg font-semibold hover:bg-white/20 transition-all transform hover:scale-110"
              onClick={(e) => e.stopPropagation()}
            >
              <GithubIcon size={18} />
              Code
            </a>
          )}
        </div>
      </div>
      
      {/* Content */}
      <div className="p-6">
        <h3 className="text-2xl font-bold mb-3 text-white group-hover:text-primary transition-colors">
          {title}
        </h3>
        <p className="text-gray-400 mb-4 leading-relaxed line-clamp-2">
          {description}
        </p>
        
        {/* Technologies */}
        <div className="flex flex-wrap gap-2">
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