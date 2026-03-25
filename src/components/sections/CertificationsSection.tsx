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
    title: 'PostgreSQL Essential Training',
    issuer: 'LinkedIn Learning',
    date: 'Mar 2026',
    description: 'Completed hands-on training covering PostgreSQL fundamentals including database creation, SQL queries, data modeling, indexing, and performance optimization for relational database systems.',
    image: '/certifications/PostgreSQLEssentialTraining.png',
    color: 'from-blue-500 to-blue-100',
    link: '/certifications/postgresql-essential-training.pdf'
  }, {
    title: 'MongoDB Node.js Developer Path',
    issuer: 'MongoDB University',
    date: 'Oct 2025',
    description: 'Completed a hands-on learning path focused on building and managing data-driven applications using Node.js and MongoDB, including aggregation pipelines, CRUD operations, indexing, and performance optimization.',
    image: '/certifications/MongoDBNodeJSDeveloper.jpg',
    color: 'from-emerald-500 to-emerald-100',
    link: '/certifications/mongodb-nodejs-developer.pdf'
  }, {
    title: 'Getting Started with DevOps on AWS',
    issuer: 'AWS Training & Certification',
    date: 'Aug 2025',
    description: 'Introductory certification covering the fundamentals of DevOps practices and how to apply them using AWS services.',
    image: '/certifications/DevOpsFundamentals.jpg',
    color: 'from-green-500 to-green-100',
    link: '/certifications/devops-fundamentals.pdf'
  }, {
    title: 'Build and Deploy APIs with a Serverless CI/CD',
    issuer: 'AWS Training & Certification',
    date: 'Aug 2025',
    description: 'Certification on building and deploying APIs using AWS services with automated CI/CD pipelines.',
    image: '/certifications/ServerlessCICD.jpg',
    color: 'from-green-500 to-green-100',
    link: '/certifications/ServerlessCICD.pdf'
  },
  {
    title: 'DevOps Workshop',
    issuer: 'SLIIT Software Engineering Student Community (SESC)',
    date: 'October 2025',
    description: 'Certificate of participation for actively attending the DevOps Workshop organized by the SLIIT Software Engineering Student Community on 3rd October 2025.',
    image: '/certifications/DevOpsWorkshopSLIIT.png',
    color: 'from-green-500 to-green-100',
    link: '/certifications/DevOpsWorkshopSLIIT.pdf'
  },

  ];
  return <section ref={sectionRef} id="certifications" className="relative overflow-hidden section-padding bg-dark-100">
    {/* Background decoration */}
    <div className="absolute right-0 rounded-full top-20 w-96 h-96 bg-primary/5 blur-3xl"></div>

    <div className="container relative z-10 px-4 mx-auto">
      {/* Section Header */}
      <div className="mb-16 text-center fade-in-up">
        <p className="mb-4 text-lg font-semibold tracking-wider uppercase text-primary">
          Achievements
        </p>
        <h2 className="mb-6 text-4xl font-bold md:text-5xl lg:text-6xl font-heading">
          <span className="text-white">PROFESSIONAL</span>{" "}
          <span className="gradient-text">CERTIFICATIONS</span>
        </h2>
        <p className="max-w-3xl mx-auto text-xl text-gray-400">
          Industry-recognized certifications validating my expertise in cloud technologies
        </p>
      </div>

      <div className="grid grid-cols-1 gap-8 mx-auto md:grid-cols-2 lg:grid-cols-3 max-w-7xl">
        {certifications.map((cert, index) => (
          <div
            key={index}
            className="card-dark hover-glow group fade-in-up"
            style={{ animationDelay: `${index * 100}ms` }}
          >
            <div className={`h-2 bg-gradient-to-r ${cert.color} rounded-t-lg`}></div>
            <div className="p-6">
              <div className="flex items-start gap-4 mb-4">
                <div className="flex items-center justify-center flex-shrink-0 w-16 h-16 p-2 rounded-lg bg-primary/10">
                  <img src={cert.image} alt={cert.title} className="object-contain w-full h-full" />
                </div>
                <div className="flex-1">
                  <h3 className="mb-2 text-xl font-bold text-white transition-colors group-hover:text-primary">
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

              <p className="mb-4 leading-relaxed text-gray-400">
                {cert.description}
              </p>

              <a
                href={cert.link}
                className="inline-flex items-center gap-2 font-semibold transition-colors text-primary hover:text-primary-400 group"
              >
                View Certificate
                <ExternalLinkIcon size={16} className="transition-transform group-hover:translate-x-1" />
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  </section>;
};