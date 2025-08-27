import React, { useEffect, useRef } from 'react';
import { useScroll } from '../../context/ScrollContext';
import { AwardIcon, CalendarIcon, ExternalLinkIcon } from 'lucide-react';
export const CertificationsSection = () => {
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
      registerSection('certifications', offsetTop, offsetTop + offsetHeight);
    }
  }, [registerSection]);
  const certifications = [{
    title: 'Getting Started with DevOps on AWS',
    issuer: 'AWS Training & Certification',
    date: 'Aug 2025',
    description: 'Introductory certification covering the fundamentals of DevOps practices and how to apply them using AWS services.',
    image: '/src/certifications/DevOpsFundamentals.jpg',
    color: 'from-orange-500 to-amber-500',
    link: '/src/certifications/devops-fundamentals.pdf'
  }, {
    title: 'Build and Deploy APIs with a Serverless CI/CD',
    issuer: 'AWS Training & Certification',
    date: 'Aug 2025',
    description: 'Certification on building and deploying APIs using AWS services with automated CI/CD pipelines.',
    image: '/src/certifications/ServerlessCICD.jpg',
    color: 'from-blue-500 to-cyan-500',
    link: '/src/certifications/ServerlessCICD.pdf'
  } ];
  return <section ref={sectionRef} id="certifications" className="py-20 px-4 md:px-8 max-w-7xl mx-auto min-h-screen flex flex-col justify-center">
      <h2 className="text-3xl md:text-4xl font-bold mb-4 text-center text-slate-800 dark:text-white">
        Professional Certifications
      </h2>
      <p className="text-center text-slate-600 dark:text-slate-400 mb-12 max-w-2xl mx-auto">
        Industry-recognized certifications that validate my expertise in cloud
        technologies, DevOps practices, and software development.
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {certifications.map((cert, index) => <div key={index} className="bg-white/30 dark:bg-slate-800/30 backdrop-blur-md rounded-xl overflow-hidden border border-white/20 dark:border-slate-700/20 shadow-lg hover:shadow-xl transition-all duration-300" style={{
        transform: 'perspective(1000px)',
        transformStyle: 'preserve-3d',
        transition: 'transform 0.6s ease',
        boxShadow: '0 0 15px rgba(138, 75, 255, 0.15)'
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
            <div className={`h-3 bg-gradient-to-r ${cert.color}`}></div>
            <div className="p-6">
              <div className="flex items-start">
                <div className="mr-4 flex-shrink-0">
                  <img src={cert.image} alt={cert.title} className="w-16 h-16 object-contain" />
                </div>
                <div>
                  <h3 className="text-lg font-bold mb-1 text-slate-800 dark:text-white">
                    {cert.title}
                  </h3>
                  <div className="flex items-center mb-2 text-sm text-slate-600 dark:text-slate-400">
                    <AwardIcon size={14} className="mr-1" />
                    <span>{cert.issuer}</span>
                    <span className="mx-2">•</span>
                    <CalendarIcon size={14} className="mr-1" />
                    <span>{cert.date}</span>
                  </div>
                </div>
              </div>
              <p className="mt-3 text-sm text-slate-600 dark:text-slate-400">
                {cert.description}
              </p>
              <a href={cert.link} className="mt-4 inline-flex items-center text-sm font-medium text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 transition-colors">
                View Certificate <ExternalLinkIcon size={14} className="ml-1" />
              </a>
            </div>
          </div>)}
      </div>
    </section>;
};