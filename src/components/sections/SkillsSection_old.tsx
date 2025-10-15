import React, { useEffect, useRef } from 'react';
import { useScroll } from '../../context/ScrollContext';
export const SkillsSection = () => {
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
      registerSection('skills', offsetTop, offsetTop + offsetHeight);
    }
  }, [registerSection]);
  const languageSkills = [{
    name: 'JavaScript',
    level: 90,
    icon: '🟨'
  }, {
    name: 'TypeScript',
    level: 75,
    icon: '🔷'
  }, {
    name: 'Python',
    level: 85,
    icon: '🐍'
  }, {
    name: 'Java',
    level: 85,
    icon: '☕'
  }, {
    name: 'Kotlin', 
    level: 80, 
    icon: '🟠'
   }, { 
    name: 'R',
    level: 70, 
    icon: '📈' 
  },{
    name: 'HTML/CSS',
    level: 90,
    icon: '🎨'
  }, {
    name: 'C++',
    level: 80,
    icon: '🎨'
  },{
    name: 'C',
    level: 80,
    icon: '🔣'
  }];
  const devopsSkills = [{
    name: 'Docker',
    level: 50,
    icon: '🐳'
  }, {
    name: 'AWS',
    level: 80,
    icon: '☁️'
  }, {
    name: 'CI/CD',
    level: 75,
    icon: '🔄'
  }];
  const databaseSkills = [{
    name: 'MongoDB',
    level: 85,
    icon: '🍃'
  },  {
    name: 'MySQL',
    level: 85,
    icon: '🐬'
  },{
    name: 'Firebase',
    level: 80,
    icon: '🔥'
  }];
  const mernSkills = [{
    name: 'MongoDB',
    level: 85,
    icon: '🍃'
  }, {
    name: 'Express.js',
    level: 85,
    icon: '⚡'
  }, {
    name: 'React',
    level: 90,
    icon: '⚛️'
  }, {
    name: 'Node.js',
    level: 85,
    icon: '💚'
  }, {
    name: 'Redux',
    level: 80,
    icon: '💫'
  }, {
    name: 'Next.js',
    level: 75,
    icon: '▲'
  }];

  const toolsSkills = [{
    name: 'React',
    level: 90,
    icon: '⚛️'
  }, {
    name: 'Node.js',
    level: 85,
    icon: '�'
  }, {
    name: 'Express.js',
    level: 85,
    icon: '⚡'
  }, {
    name: 'MongoDB',
    level: 85,
    icon: '🍃'
  }, {
    name: 'Git',
    level: 90,
    icon: '�'
  }, {
    name: 'VS Code',
    level: 95,
    icon: '💻'
  }, {
    name: 'Postman',
    level: 90,
    icon: '📬'
  }, {
    name: 'npm/yarn',
    level: 90,
    icon: '📦'
  }];
  return <section ref={sectionRef} id="skills" className="py-20 px-4 md:px-8 max-w-7xl mx-auto min-h-screen flex flex-col justify-center">
      <h2 className="text-3xl md:text-4xl font-bold mb-4 text-center text-slate-800 dark:text-white">
        Technical Skills
      </h2>
      <p className="text-center text-slate-600 dark:text-slate-400 mb-12 max-w-2xl mx-auto">
        My technical expertise spans across various technologies, tools, and
        platforms that I've used in professional projects and personal
        development.
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Languages */}
        <div className="bg-white/30 dark:bg-slate-800/30 backdrop-blur-md rounded-xl p-6 border border-white/20 dark:border-slate-700/20 shadow-lg hover:shadow-xl transition-all duration-300 reveal" style={{
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
          <div className="flex items-center mb-4">
            <div className="w-10 h-10 rounded-full bg-blue-100 dark:bg-blue-900/50 flex items-center justify-center mr-3">
              <span className="text-xl">💻</span>
            </div>
            <h3 className="text-xl font-bold text-blue-600 dark:text-blue-400">
              Programming Languages
            </h3>
          </div>
          <div className="space-y-4">
            {languageSkills.map((skill, index) => <div key={index} className="space-y-2">
                <div className="flex justify-between items-center">
                  <div className="flex items-center">
                    <span className="text-lg mr-2">{skill.icon}</span>
                    <span className="font-medium text-slate-700 dark:text-slate-300">
                      {skill.name}
                    </span>
                  </div>
                  <span className="text-sm text-slate-600 dark:text-slate-400">
                    {skill.level}%
                  </span>
                </div>
                <div className="w-full h-2 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
                  <div className="h-full bg-gradient-to-r from-blue-500 to-purple-500 rounded-full" style={{
                width: `${skill.level}%`,
                transition: 'width 1s ease-in-out'
              }}></div>
                </div>
              </div>)}
          </div>
        </div>
        {/* Tools */}
        <div className="bg-white/30 dark:bg-slate-800/30 backdrop-blur-md rounded-xl p-6 border border-white/20 dark:border-slate-700/20 shadow-lg hover:shadow-xl transition-all duration-300 reveal reveal-delay-4" style={{
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
          <div className="flex items-center mb-4">
            <div className="w-10 h-10 rounded-full bg-orange-100 dark:bg-orange-900/50 flex items-center justify-center mr-3">
              <span className="text-xl">🛠️</span>
            </div>
            <h3 className="text-xl font-bold text-orange-600 dark:text-orange-400">
              Tools & Platforms
            </h3>
          </div>
          <div className="space-y-4">
            {toolsSkills.map((skill, index) => <div key={index} className="space-y-2">
                <div className="flex justify-between items-center">
                  <div className="flex items-center">
                    <span className="text-lg mr-2">{skill.icon}</span>
                    <span className="font-medium text-slate-700 dark:text-slate-300">
                      {skill.name}
                    </span>
                  </div>
                  <span className="text-sm text-slate-600 dark:text-slate-400">
                    {skill.level}%
                  </span>
                </div>
                <div className="w-full h-2 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
                  <div className="h-full bg-gradient-to-r from-orange-500 to-yellow-500 rounded-full" style={{
                width: `${skill.level}%`,
                transition: 'width 1s ease-in-out'
              }}></div>
                </div>
              </div>)}
          </div>
        </div>
        {/* DevOps */}
        <div className="bg-white/30 dark:bg-slate-800/30 backdrop-blur-md rounded-xl p-6 border border-white/20 dark:border-slate-700/20 shadow-lg hover:shadow-xl transition-all duration-300 reveal reveal-delay-1" style={{
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
          <div className="flex items-center mb-4">
            <div className="w-10 h-10 rounded-full bg-green-100 dark:bg-green-900/50 flex items-center justify-center mr-3">
              <span className="text-xl">🚀</span>
            </div>
            <h3 className="text-xl font-bold text-green-600 dark:text-green-400">
              DevOps & Cloud
            </h3>
          </div>
          <div className="space-y-4">
            {devopsSkills.map((skill, index) => <div key={index} className="space-y-2">
                <div className="flex justify-between items-center">
                  <div className="flex items-center">
                    <span className="text-lg mr-2">{skill.icon}</span>
                    <span className="font-medium text-slate-700 dark:text-slate-300">
                      {skill.name}
                    </span>
                  </div>
                  <span className="text-sm text-slate-600 dark:text-slate-400">
                    {skill.level}%
                  </span>
                </div>
                <div className="w-full h-2 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
                  <div className="h-full bg-gradient-to-r from-green-500 to-teal-500 rounded-full" style={{
                width: `${skill.level}%`,
                transition: 'width 1s ease-in-out'
              }}></div>
                </div>
              </div>)}
          </div>
        </div>
        {/* Databases */}
        <div className="bg-white/30 dark:bg-slate-800/30 backdrop-blur-md rounded-xl p-6 border border-white/20 dark:border-slate-700/20 shadow-lg hover:shadow-xl transition-all duration-300 reveal reveal-delay-2" style={{
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
          <div className="flex items-center mb-4">
            <div className="w-10 h-10 rounded-full bg-purple-100 dark:bg-purple-900/50 flex items-center justify-center mr-3">
              <span className="text-xl">🗄️</span>
            </div>
            <h3 className="text-xl font-bold text-purple-600 dark:text-purple-400">
              Databases
            </h3>
          </div>
          <div className="space-y-4">
            {databaseSkills.map((skill, index) => <div key={index} className="space-y-2">
                <div className="flex justify-between items-center">
                  <div className="flex items-center">
                    <span className="text-lg mr-2">{skill.icon}</span>
                    <span className="font-medium text-slate-700 dark:text-slate-300">
                      {skill.name}
                    </span>
                  </div>
                  <span className="text-sm text-slate-600 dark:text-slate-400">
                    {skill.level}%
                  </span>
                </div>
                <div className="w-full h-2 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
                  <div className="h-full bg-gradient-to-r from-purple-500 to-pink-500 rounded-full" style={{
                width: `${skill.level}%`,
                transition: 'width 1s ease-in-out'
              }}></div>
                </div>
              </div>)}
          </div>
        </div>
       
        
      </div>
    </section>;
};