import React, { useEffect, useRef } from 'react';
import { useScroll } from '../../context/ScrollContext';
import { GraduationCapIcon, CalendarIcon, MapPinIcon, AwardIcon } from 'lucide-react';
export const EducationSection = () => {
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
      registerSection('education', offsetTop, offsetTop + offsetHeight);
    }
  }, [registerSection]);
  const education = [{
    degree: 'BSc (Hons) in Software Engineering',
    institution: 'Sri Lanka Institute of Information Technology (SLIIT)',
    period: '2020 - Present',
    description: 'Specializing in DevOps and Cloud Computing with a focus on containerization, CI/CD pipelines, and infrastructure as code.',
    gpa: '3.8/4.0',
    courses: ['Advanced DevOps Practices', 'Cloud Architecture', 'Software Quality Assurance', 'Distributed Systems'],
    icon: '🎓',
    color: 'from-blue-500 to-purple-500'
  }, {
    degree: 'Higher National Diploma in Computing',
    institution: 'SLIIT Academy',
    period: '2018 - 2020',
    description: 'Focused on software development fundamentals, web technologies, and database management systems.',
    gpa: '3.7/4.0',
    courses: ['Web Development', 'Database Systems', 'Object-Oriented Programming', 'System Analysis & Design'],
    icon: '🖥️',
    color: 'from-purple-500 to-pink-500'
  }, {
    degree: 'Advanced Level Certificate',
    institution: 'Royal College',
    period: '2016 - 2018',
    description: 'Studied Physical Science stream with Mathematics, Physics, and Chemistry.',
    gpa: 'AAB',
    courses: ['Mathematics', 'Physics', 'Chemistry', 'General English'],
    icon: '📚',
    color: 'from-green-500 to-teal-500'
  }];
  return <section ref={sectionRef} id="education" className="py-20 px-4 md:px-8 max-w-7xl mx-auto min-h-screen flex flex-col justify-center">
      <h2 className="text-3xl md:text-4xl font-bold mb-4 text-center text-slate-800 dark:text-white">
        Education
      </h2>
      <p className="text-center text-slate-600 dark:text-slate-400 mb-12 max-w-2xl mx-auto">
        My academic journey and qualifications that have shaped my knowledge and
        expertise in software engineering.
      </p>
      <div className="relative">
        {/* Timeline line */}
        <div className="absolute left-0 md:left-1/2 transform md:-translate-x-1/2 h-full w-1 bg-gradient-to-b from-blue-500 via-purple-500 to-pink-500 rounded-full"></div>
        <div className="space-y-12">
          {education.map((item, index) => <div key={index} className={`relative flex flex-col md:flex-row gap-8 items-center md:items-start ${index % 2 === 0 ? 'md:flex-row-reverse' : ''}`}>
              {/* Timeline dot */}
              <div className="absolute left-0 md:left-1/2 transform -translate-x-1/2 w-8 h-8 rounded-full bg-white dark:bg-slate-800 border-4 border-purple-500 z-10 flex items-center justify-center">
                <span className="text-sm">{item.icon}</span>
              </div>
              {/* Content */}
              <div className={`w-full md:w-5/12 bg-white/30 dark:bg-slate-800/30 backdrop-blur-md rounded-xl p-6 border border-white/20 dark:border-slate-700/20 shadow-lg hover:shadow-xl transition-all duration-300 ${index % 2 === 0 ? 'md:mr-auto' : 'md:ml-auto'}`} style={{
            transform: 'perspective(1000px)',
            transformStyle: 'preserve-3d',
            transition: 'transform 0.6s ease',
            boxShadow: '0 0 15px rgba(138, 75, 255, 0.2)'
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
                <div className={`inline-block px-4 py-1 rounded-full text-xs font-semibold text-white bg-gradient-to-r ${item.color} mb-4`}>
                  {item.period}
                </div>
                <h3 className="text-xl font-bold mb-2 text-slate-800 dark:text-white">
                  {item.degree}
                </h3>
                <div className="flex items-center mb-3">
                  <GraduationCapIcon size={16} className="text-blue-500 dark:text-blue-400 mr-2" />
                  <h4 className="text-lg font-medium text-blue-600 dark:text-blue-400">
                    {item.institution}
                  </h4>
                </div>
                <div className="flex items-center mb-3 text-sm text-slate-600 dark:text-slate-400">
                  <CalendarIcon size={14} className="mr-1" />
                  <span>{item.period}</span>
                  <span className="mx-2">•</span>
                  <AwardIcon size={14} className="mr-1" />
                  <span>GPA: {item.gpa}</span>
                </div>
                <p className="text-slate-600 dark:text-slate-300 mb-4">
                  {item.description}
                </p>
                <div className="mt-4">
                  <h5 className="text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">
                    Key Courses:
                  </h5>
                  <div className="flex flex-wrap gap-2">
                    {item.courses.map((course, i) => <span key={i} className="px-2 py-1 text-xs bg-white/50 dark:bg-slate-700/50 rounded-md text-slate-700 dark:text-slate-300">
                        {course}
                      </span>)}
                  </div>
                </div>
              </div>
            </div>)}
        </div>
      </div>
    </section>;
};