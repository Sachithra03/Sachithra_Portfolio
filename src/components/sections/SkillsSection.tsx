import React, { useEffect, useRef } from "react";
import { useScroll } from "../../context/ScrollContext";
import {
  Cloud,
  Code2,
  Database,
  GitBranch,
  Layers,
  Server,
  Terminal,
  Wrench,
  Boxes,
  Globe,
  Shield,
  Zap,
} from "lucide-react";

interface Service {
  id: number;
  icon: React.ReactNode;
  title: string;
  description: string;
  skills: string[];
}

export const SkillsSection: React.FC = () => {
  const { registerSection } = useScroll();
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (sectionRef.current) {
      const { offsetTop, offsetHeight } = sectionRef.current;
      registerSection("skills", offsetTop, offsetTop + offsetHeight);
    }
  }, [registerSection]);

  const services: Service[] = [
    {
      id: 1,
      icon: <Code2 className="w-10 h-10" />,
      title: "Full-Stack Development",
      description:
        "Building robust and scalable web applications using modern frameworks and best development practices.",
      skills: ["React", "Node.js", "TypeScript", "Next.js", "Express", "C#", ".NET"],
    },
    {
      id: 2,
      icon: <Cloud className="w-10 h-10" />,
      title: "Mobile App Development",
      description:
        "Developing cross-platform mobile applications with elegant UIs and native performance.",
      skills: ["React Native", "Kotlin"],
    },
    {
      id: 3,
      icon: <Cloud className="w-10 h-10" />,
      title: "Cloud Solutions",
      description:
        "Designing, architecting, and deploying secure cloud-native applications for high availability and performance.",
      skills: ["AWS"],
    },
    {
      id: 4,
      icon: <GitBranch className="w-10 h-10" />,
      title: "DevOps Engineering",
      description:
        "Streamlining software delivery through automated CI/CD pipelines and deployment workflows.",
      skills: ["GitHub Actions"],
    },
    {
      id: 5,
      icon: <Boxes className="w-10 h-10" />,
      title: "Container Orchestration",
      description:
        "Managing containerized applications efficiently with Kubernetes and Docker for scalable environments.",
      skills: ["Docker"],
    },
    {
      id: 6,
      icon: <Database className="w-10 h-10" />,
      title: "Database Management",
      description:
        "Designing and optimizing databases for performance, security, and scalability.",
      skills: ["MySQL", "MongoDB"],
    },
  ];

  return (
    <section
      ref={sectionRef}
      id="skills"
      className="section-padding relative overflow-hidden bg-dark-100"
    >
      {/* Background decoration */}
      <div className="absolute top-20 left-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl"></div>
      <div className="absolute bottom-20 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl"></div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16 fade-in-up">
          <p className="text-primary text-lg font-semibold tracking-wider uppercase mb-4">
            What I Do
          </p>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold font-heading mb-6">
            <span className="text-white">SERVICES AND</span>{" "}
            <span className="gradient-text">SOLUTIONS</span>
          </h2>
          <p className="text-gray-400 text-xl max-w-3xl mx-auto">
            Providing comprehensive technical solutions from development to deployment
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <div
              key={service.id}
              className="card-dark group hover-glow fade-in-up"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              {/* Icon */}
              <div className="mb-6 relative">
                <div className="w-20 h-20 rounded-xl bg-primary/10 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-dark-300 transition-all duration-300">
                  {service.icon}
                </div>
                <div className="absolute -top-2 -right-2 w-8 h-8 rounded-full bg-primary/20 blur-xl group-hover:bg-primary/40 transition-all"></div>
              </div>

              {/* Content */}
              <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-primary transition-colors">
                {service.title}
              </h3>
              <p className="text-gray-400 mb-6 leading-relaxed">
                {service.description}
              </p>

              {/* Skills Tags */}
              <div className="flex flex-wrap gap-2">
                {service.skills.map((skill, idx) => (
                  <span
                    key={idx}
                    className="px-3 py-1 text-sm rounded-full bg-dark-200/50 text-gray-300 border border-gray-700 group-hover:border-primary/50 transition-colors"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Tech Stack Section */}
        <div className="mt-20 fade-in-up delay-500">
          <div className="text-center mb-12">
            <h3 className="text-3xl md:text-4xl font-bold font-heading">
              <span className="text-white">Technologies I</span>{" "}
              <span className="gradient-text">Master</span>
            </h3>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6">
            {[
             // 💻 Core Frontend & Backend
  { name: "React", icon: "⚛️" },
  { name: "Node.js", icon: "🟢" },
  { name: "Express.js", icon: "⚡" },
  { name: "Next.js", icon: "▲" },

  // ☁️ DevOps & Cloud
  { name: "Docker", icon: "🐳" },
  { name: "AWS", icon: "☁️" },
  { name: "CI/CD", icon: "🔄" },
  { name: "GitHub Actions", icon: "⚙️" },
  { name: "Linux", icon: "🐧" },

  // 🧠 Programming Languages
  { name: "JavaScript", icon: "🟨" },
  { name: "TypeScript", icon: "📘" },
  { name: "Python", icon: "🐍" },
  { name: "Java", icon: "☕" },
  { name: "Kotlin", icon: "🟠" },
  { name: "C#", icon: "♯" },
  { name: ".NET", icon: "🔷" },

  // 🗄️ Databases
  { name: "MongoDB", icon: "🍃" },
  { name: "MySQL", icon: "🐬" },
  { name: "Firebase", icon: "🔥" },

  // 🧰 Version Control
  { name: "Git", icon: "📦" },
  { name: "GitHub", icon: "🐙" },
            ].map((tech, idx) => (
              <div
                key={idx}
                className="card-dark text-center py-6 group cursor-pointer"
              >
                <div className="text-4xl mb-3 group-hover:scale-110 transition-transform">
                  {tech.icon}
                </div>
                <p className="text-gray-400 font-medium group-hover:text-primary transition-colors">
                  {tech.name}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Call to Action */}
        <div className="mt-16 text-center fade-in-up delay-600">
          <p className="text-gray-400 text-lg mb-6">
            Ready to bring your project to life?
          </p>
          <a href="#contact" className="btn-primary inline-flex items-center gap-2">
            <Zap className="w-5 h-5" />
            Get Started
          </a>
        </div>
      </div>
    </section>
  );
};
