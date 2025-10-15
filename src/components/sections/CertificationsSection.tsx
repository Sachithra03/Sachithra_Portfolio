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
    image: '/certifications/DevOpsFundamentals.jpg',
    color: 'from-orange-500 to-amber-500',
    link: '/certifications/devops-fundamentals.pdf'
  }, {
    title: 'Build and Deploy APIs with a Serverless CI/CD',
    issuer: 'AWS Training & Certification',
    date: 'Aug 2025',
    description: 'Certification on building and deploying APIs using AWS services with automated CI/CD pipelines.',
    image: '/certifications/ServerlessCICD.jpg',
    color: 'from-blue-500 to-cyan-500',
    link: '/certifications/ServerlessCICD.pdf'
  } ];
  return <section ref={sectionRef} id="certifications" className="section-padding relative overflow-hidden bg-dark-100">
      {/* Background decoration */}
      <div className="absolute top-20 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16 fade-in-up">
          <p className="text-primary text-lg font-semibold tracking-wider uppercase mb-4">
            Achievements
          </p>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold font-heading mb-6">
            <span className="text-white">PROFESSIONAL</span>{" "}
            <span className="gradient-text">CERTIFICATIONS</span>
          </h2>
          <p className="text-gray-400 text-xl max-w-3xl mx-auto">
            Industry-recognized certifications validating my expertise in cloud technologies
          </p>
        </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
        {certifications.map((cert, index) => (
          <div 
            key={index} 
            className="card-dark hover-glow group fade-in-up"
            style={{ animationDelay: `${index * 100}ms` }}
          >
            <div className={`h-2 bg-gradient-to-r ${cert.color} rounded-t-lg`}></div>
            <div className="p-6">
              <div className="flex items-start gap-4 mb-4">
                <div className="w-16 h-16 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0 p-2">
                  <img src={cert.image} alt={cert.title} className="w-full h-full object-contain" />
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-bold mb-2 text-white group-hover:text-primary transition-colors">
                    {cert.title}
                  </h3>
                  <div className="flex flex-wrap items-center gap-2 text-sm text-gray-400">
                    <div className="flex items-center gap-1">
                      <AwardIcon size={14} />
                      <span>{cert.issuer}</span>
                    </div>
                    <span>•</span>
                    <div className="flex items-center gap-1">
                      <CalendarIcon size={14} />
                      <span>{cert.date}</span>
                    </div>
                  </div>
                </div>
              </div>
              
              <p className="text-gray-400 leading-relaxed mb-4">
                {cert.description}
              </p>
              
              <a 
                href={cert.link} 
                className="inline-flex items-center gap-2 text-primary font-semibold hover:text-primary-400 transition-colors group"
              >
                View Certificate 
                <ExternalLinkIcon size={16} className="group-hover:translate-x-1 transition-transform" />
              </a>
            </div>
          </div>
        ))}
      </div>
      </div>
    </section>;
};