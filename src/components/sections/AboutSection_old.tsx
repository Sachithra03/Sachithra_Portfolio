import React, { useEffect, useRef } from 'react';
import { FileTextIcon, DownloadIcon, CodeIcon, ServerIcon, DatabaseIcon, GlobeIcon } from 'lucide-react';
import { useScroll } from '../../context/ScrollContext';
export const AboutSection = () => {
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
      registerSection('about', offsetTop, offsetTop + offsetHeight);
    }
  }, [registerSection]);
  return <section ref={sectionRef} id="about" className="py-20 px-4 md:px-8 max-w-7xl mx-auto min-h-screen flex flex-col justify-center">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <div className="order-2 lg:order-1">
          <h2 className="text-3xl md:text-4xl font-bold mb-6 text-slate-800 dark:text-white">
            About Me
          </h2>
          <p className="text-slate-600 dark:text-slate-300 mb-6 text-lg">
            Hello! I'm Sachithra, a software engineering student passionate about
            DevOps and full-stack development.
          </p>
          <p className="text-slate-600 dark:text-slate-300 mb-6">
            Currently pursuing my degree in Software Engineering at SLIIT, I'm
            focused on building scalable, cloud-native applications and
            implementing DevOps practices to streamline development workflows.
          </p>
          <p className="text-slate-600 dark:text-slate-300 mb-8">
            When I'm not coding, you can find me exploring new technologies,
            contributing to open-source projects, or participating in
            hackathons. I believe in continuous learning and pushing the
            boundaries of what's possible with modern technologies.
          </p>
          <div className="grid grid-cols-2 gap-4 mb-8">
            <div className="flex items-start">
              <div className="w-10 h-10 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center mr-3 flex-shrink-0">
                <CodeIcon className="w-5 h-5 text-blue-600 dark:text-blue-400" />
              </div>
              <div>
                <h4 className="font-medium text-slate-800 dark:text-white">
                  Frontend
                </h4>
                <p className="text-sm text-slate-600 dark:text-slate-400">
                  React, TypeScript, Next.js
                </p>
              </div>
            </div>
            <div className="flex items-start">
              <div className="w-10 h-10 rounded-full bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center mr-3 flex-shrink-0">
                <ServerIcon className="w-5 h-5 text-purple-600 dark:text-purple-400" />
              </div>
              <div>
                <h4 className="font-medium text-slate-800 dark:text-white">
                  Backend
                </h4>
                <p className="text-sm text-slate-600 dark:text-slate-400">
                  Node.js, Express, Python
                </p>
              </div>
            </div>
            <div className="flex items-start">
              <div className="w-10 h-10 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center mr-3 flex-shrink-0">
                <DatabaseIcon className="w-5 h-5 text-green-600 dark:text-green-400" />
              </div>
              <div>
                <h4 className="font-medium text-slate-800 dark:text-white">
                  DevOps
                </h4>
                <p className="text-sm text-slate-600 dark:text-slate-400">
                  Docker, AWS, CI/CD
                </p>
              </div>
            </div>
            <div className="flex items-start">
              <div className="w-10 h-10 rounded-full bg-yellow-100 dark:bg-yellow-900/30 flex items-center justify-center mr-3 flex-shrink-0">
                <GlobeIcon className="w-5 h-5 text-yellow-600 dark:text-yellow-400" />
              </div>
              <div>
                <h4 className="font-medium text-slate-800 dark:text-white">
                  Cloud
                </h4>
                <p className="text-sm text-slate-600 dark:text-slate-400">
                  AWS, Serverless
                </p>
              </div>
            </div>
          </div>
          <div className="flex flex-wrap gap-4">
            <a href="/CV/Sachithra_Indrachapa_Resume.pdf" target="_blank" rel="noopener noreferrer" className="px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white font-medium rounded-lg transition-all duration-300 flex items-center">
              <FileTextIcon size={18} className="mr-2" /> View Resume
            </a>
            <a
              href="/CV/Sachithra_Indrachapa_Resume.pdf"
              className="py-3 px-6 bg-white/10 backdrop-blur-md border border-white/20 dark:bg-slate-800/20 dark:border-slate-700/20 text-slate-800 dark:text-white font-medium rounded-lg transition-all duration-300 flex items-center justify-center hover:bg-white/20 dark:hover:bg-slate-700/20"
              download="Sachithra_Indrachapa_Resume.pdf">
                <DownloadIcon size={16} className="mr-2" /> Download CV
            </a>
          </div>
        </div>
        <div className="order-1 lg:order-2 flex justify-center">
          <div className="relative w-64 h-64 md:w-80 md:h-80 rounded-full overflow-hidden border-4 border-white/30 dark:border-slate-700/30 shadow-xl" style={{
          transform: 'perspective(1000px)',
          transformStyle: 'preserve-3d',
          transition: 'transform 0.6s ease',
          boxShadow: '0 0 25px rgba(138, 75, 255, 0.3)'
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
            <img src="/Photos/profile.jpg" alt="Sachithra Indrachapa" className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-blue-600/30 to-transparent"></div>
            {/* Tech icons floating around the profile image */}
            <div className="absolute top-5 left-5 w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center animate-float">
              <span className="text-white font-bold text-xs">AWS</span>
            </div>
            <div className="absolute top-10 right-5 w-10 h-10 bg-purple-500 rounded-full flex items-center justify-center" style={{
            animationDelay: '1s',
            animation: 'float 6s ease-in-out infinite'
          }}>
              <span className="text-white font-bold text-xs">Git</span>
            </div>
            <div className="absolute bottom-10 left-10 w-10 h-10 bg-green-500 rounded-full flex items-center justify-center" style={{
            animationDelay: '2s',
            animation: 'float 7s ease-in-out infinite'
          }}>
              <span className="text-white font-bold text-xs">Node</span>
            </div>
            <div className="absolute bottom-5 right-10 w-10 h-10 bg-yellow-500 rounded-full flex items-center justify-center" style={{
            animationDelay: '1.5s',
            animation: 'float 5s ease-in-out infinite'
          }}>
              <span className="text-white font-bold text-xs">React</span>
            </div>
          </div>
        </div>
      </div>
    </section>;
};