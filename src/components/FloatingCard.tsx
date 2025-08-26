import React from 'react';
import { CodeIcon, BookOpenIcon, UserIcon, MailIcon, AwardIcon, DatabaseIcon } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
interface FloatingCardProps {
  section: string;
}
export const FloatingCard: React.FC<FloatingCardProps> = ({
  section
}) => {
  const {
    theme
  } = useTheme();
  const getCardContent = () => {
    switch (section) {
      case 'home':
        return {
          title: 'Welcome',
          icon: <UserIcon size={24} className="text-blue-400" />,
          content: 'Full-Stack Developer & DevOps Engineer',
          color: 'from-blue-500 to-purple-500'
        };
      case 'about':
        return {
          title: 'About Me',
          icon: <UserIcon size={24} className="text-green-400" />,
          content: 'Software engineering student passionate about DevOps and full-stack development',
          color: 'from-green-500 to-teal-500'
        };
      case 'projects':
        return {
          title: 'Projects',
          icon: <CodeIcon size={24} className="text-purple-400" />,
          content: 'Check out my latest work and applications',
          color: 'from-purple-500 to-pink-500'
        };
      case 'skills':
        return {
          title: 'Skills',
          icon: <div size={24} className="text-blue-400" />,
          content: 'Languages, Tools, DevOps & Databases',
          color: 'from-blue-500 to-cyan-500'
        };
      case 'education':
        return {
          title: 'Education',
          icon: <BookOpenIcon size={24} className="text-yellow-400" />,
          content: 'My academic background and qualifications',
          color: 'from-yellow-500 to-orange-500'
        };
      case 'certifications':
        return {
          title: 'Certifications',
          icon: <AwardIcon size={24} className="text-emerald-400" />,
          content: 'Professional certifications and achievements',
          color: 'from-emerald-500 to-green-500'
        };
      case 'contact':
        return {
          title: 'Contact',
          icon: <MailIcon size={24} className="text-blue-400" />,
          content: 'Get in touch for opportunities and collaborations',
          color: 'from-blue-500 to-indigo-500'
        };
      default:
        return {
          title: 'Exploring',
          icon: <UserIcon size={24} className="text-blue-400" />,
          content: 'Scroll to discover more',
          color: 'from-gray-500 to-slate-500'
        };
    }
  };
  const content = getCardContent();
  return <div className="fixed top-1/3 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-30 animate-float">
      <div className={`w-64 p-4 rounded-xl backdrop-blur-xl bg-white/10 dark:bg-slate-900/30 border border-white/20 dark:border-slate-700/30 shadow-xl`} style={{
      boxShadow: theme === 'dark' ? `0 0 20px 2px rgba(138, 75, 255, 0.3)` : `0 0 20px 2px rgba(94, 85, 255, 0.2)`
    }}>
        <div className={`flex items-center mb-2 p-2 rounded-lg bg-gradient-to-r ${content.color} bg-opacity-20`}>
          {content.icon}
          <h3 className="ml-2 text-lg font-bold text-white">{content.title}</h3>
        </div>
        <p className="text-slate-200">{content.content}</p>
      </div>
    </div>;
};