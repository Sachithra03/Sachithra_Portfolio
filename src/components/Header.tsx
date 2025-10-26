import React, { useEffect, useRef } from "react";
import { ArrowRight, Download, Github, Linkedin, Mail } from "lucide-react";
import { useScroll } from "../context/ScrollContext";

export const Header: React.FC = () => {
  const { registerSection } = useScroll();
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (sectionRef.current) {
      const { offsetTop, offsetHeight } = sectionRef.current;
      registerSection("home", offsetTop, offsetTop + offsetHeight);
    }
  }, [registerSection]);

  const scrollToProjects = () => {
    const projectsSection = document.getElementById("projects");
    if (projectsSection) projectsSection.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <header
      ref={sectionRef}
      id="home"
      className="relative flex items-center justify-center min-h-screen pt-20 pb-16 px-4 overflow-hidden grid-pattern"
    >
      {/* Background decorative elements */}
      <div className="absolute top-20 right-10 w-64 h-64 bg-primary/5 rounded-full blur-3xl"></div>
      <div className="absolute bottom-20 left-10 w-96 h-96 bg-primary/5 rounded-full blur-3xl"></div>

      <div className="container mx-auto relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="space-y-8 fade-in-up">
            <div className="space-y-4">
              <p className="text-primary text-lg font-semibold tracking-wider uppercase">
                Welcome to my Portfolio
              </p>
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold font-heading leading-tight">
                <span className="text-white">IMAGINATION IS MORE</span>
                <br />
                <span className="text-white">IMPORTANT THAN</span>
                <br />
                <span className="gradient-text">KNOWLEDGE</span>
              </h1>
              <p className="text-gray-400 text-lg md:text-xl max-w-xl leading-relaxed">
                I'm <span className="text-white font-semibold">Sachithra Indrachapa</span>, 
                a passionate Software Engineer & DevOps Engineer specializing in 
                building scalable, cloud-native applications and implementing DevOps practices.
              </p>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-wrap gap-4">
              <button
                onClick={scrollToProjects}
                className="btn-primary group"
              >
                View My Work
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
              <a
                href="/CV/Sachithra's Resume.pdf"
                download="Sachithra's Resume.pdf"
                className="btn-outline group"
              >
                <Download className="w-5 h-5 group-hover:translate-y-1 transition-transform" />
                Download CV
              </a>
            </div>

            {/* Social Links */}
            <div className="flex items-center gap-4 pt-4">
              <p className="text-gray-400 font-medium">Follow me:</p>
              <div className="flex gap-3">
                <a
                  href="https://github.com/Sachithra03"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-12 h-12 flex items-center justify-center rounded-full bg-dark-100 border border-gray-700 hover:border-primary hover:bg-primary/10 transition-all duration-300"
                  aria-label="GitHub"
                >
                  <Github className="w-5 h-5" />
                </a>
                <a
                  href="https://www.linkedin.com/in/sachithra-indrachapa-9150b8190/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-12 h-12 flex items-center justify-center rounded-full bg-dark-100 border border-gray-700 hover:border-primary hover:bg-primary/10 transition-all duration-300"
                  aria-label="LinkedIn"
                >
                  <Linkedin className="w-5 h-5" />
                </a>
                <a
                  href="mailto:sachithrai1003@gmail.com"
                  className="w-12 h-12 flex items-center justify-center rounded-full bg-dark-100 border border-gray-700 hover:border-primary hover:bg-primary/10 transition-all duration-300"
                  aria-label="Email"
                >
                  <Mail className="w-5 h-5" />
                </a>
              </div>
            </div>
          </div>

          {/* Right Image */}
          <div className="relative lg:pl-12 fade-in-up delay-200">
            <div className="relative">
              {/* Decorative frame */}
              <div className="absolute -top-6 -right-6 w-full h-full border-4 border-primary/30 rounded-2xl"></div>
              
              {/* Image container */}
              <div className="relative rounded-2xl overflow-hidden shadow-2xl">
                <div className="absolute inset-0 bg-gradient-to-t from-dark/80 to-transparent z-10"></div>
                <img
                  src="/Photos/profile.jpg"
                  alt="Sachithra Indrachapa"
                  className="w-full h-auto object-cover"
                  loading="eager"
                />
                
                {/* Floating badge */}
                <div className="absolute bottom-8 left-8 z-20 bg-primary text-dark-300 px-6 py-3 rounded-lg font-bold text-lg shadow-lg animate-pulse-green">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 bg-dark-300 rounded-full animate-bounce"></span>
                    Available for Work
                  </div>
                </div>
              </div>

              {/* Decorative dots */}
              <div className="absolute -bottom-6 -left-6 w-24 h-24 grid grid-cols-4 gap-2">
                {Array.from({ length: 16 }).map((_, i) => (
                  <div key={i} className="w-2 h-2 bg-primary/30 rounded-full"></div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 animate-bounce-slow">
        <div className="w-6 h-10 border-2 border-primary/50 rounded-full flex justify-center pt-2">
          <div className="w-1 h-3 bg-primary rounded-full animate-pulse"></div>
        </div>
        <p className="text-gray-500 text-xs uppercase tracking-wider">Scroll Down</p>
      </div>
    </header>
  );
};
