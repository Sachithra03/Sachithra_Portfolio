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
    title: 'AWS Certified DevOps Engineer - Professional',
    issuer: 'Amazon Web Services',
    date: 'Dec 2022',
    description: 'Advanced certification validating expertise in implementing and managing continuous delivery systems, implementing security controls, and compliance validation on AWS.',
    image: 'https://images.credly.com/size/340x340/images/bd31ef42-d460-493e-8503-39592aaf0458/image.png',
    color: 'from-orange-500 to-amber-500',
    link: '#'
  }, {
    title: 'AWS Certified Solutions Architect - Associate',
    issuer: 'Amazon Web Services',
    date: 'Aug 2022',
    description: 'Certification validating expertise in designing distributed systems on AWS, including implementation of AWS services according to architectural best practices.',
    image: 'https://images.credly.com/size/340x340/images/0e284c3f-5164-4b21-8660-0d84737941bc/image.png',
    color: 'from-blue-500 to-cyan-500',
    link: '#'
  }, {
    title: 'Certified Kubernetes Administrator (CKA)',
    issuer: 'Cloud Native Computing Foundation',
    date: 'Mar 2022',
    description: 'Certification demonstrating proficiency in Kubernetes installation, configuration, and management in production environments.',
    image: 'https://images.credly.com/size/340x340/images/8b8ed108-e77d-4396-ac59-2504583b9d54/cka_from_cncfsite__281_29.png',
    color: 'from-blue-600 to-indigo-600',
    link: '#'
  }, {
    title: 'Docker Certified Associate',
    issuer: 'Docker, Inc.',
    date: 'Jan 2022',
    description: 'Certification validating expertise in Docker technologies, including installation, configuration, and management of Docker environments.',
    image: 'https://images.credly.com/size/340x340/images/99289602-861e-4929-8277-773e63a2fa6f/image.png',
    color: 'from-sky-500 to-blue-500',
    link: '#'
  }, {
    title: 'Microsoft Certified: Azure DevOps Engineer Expert',
    issuer: 'Microsoft',
    date: 'Oct 2021',
    description: 'Certification validating expertise in designing and implementing strategies for collaboration, code, infrastructure, source control, security, and compliance on Azure.',
    image: 'https://images.credly.com/size/340x340/images/c3ab66f8-5d59-4afa-a6c2-0ba30a1989ca/CERT-Expert-DevOps-Engineer-600x600.png',
    color: 'from-blue-500 to-purple-500',
    link: '#'
  }, {
    title: 'Certified Jenkins Engineer',
    issuer: 'CloudBees',
    date: 'Jul 2021',
    description: 'Certification validating expertise in Jenkins continuous integration and continuous delivery (CI/CD) pipelines.',
    image: 'https://images.credly.com/size/340x340/images/0007fc2b-5c0f-43e4-9e99-c1fb0ba1e048/jenkins-certified-engineer-2020.png',
    color: 'from-red-500 to-orange-500',
    link: '#'
  }];
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