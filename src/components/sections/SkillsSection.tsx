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
        "Experienced in working with relational and NoSQL databases for data storage, querying, schema design, and efficient application development.",
      skills: ["MySQL", "MongoDB", "Firebase", "PostgreSQL"],
    },
  ];

  return (
    <section
      ref={sectionRef}
      id="skills"
      className="relative overflow-hidden section-padding bg-dark-100"
    >
      {/* Background decoration */}
      <div className="absolute left-0 rounded-full top-20 w-96 h-96 bg-primary/5 blur-3xl"></div>
      <div className="absolute right-0 rounded-full bottom-20 w-96 h-96 bg-primary/5 blur-3xl"></div>

      <div className="container relative z-10 px-4 mx-auto">
        {/* Section Header */}
        <div className="mb-16 text-center fade-in-up">
          <p className="mb-4 text-lg font-semibold tracking-wider uppercase text-primary">
            What I Do
          </p>
          <h2 className="mb-6 text-4xl font-bold md:text-5xl lg:text-6xl font-heading">
            <span className="text-white">SERVICES AND</span>{" "}
            <span className="gradient-text">SOLUTIONS</span>
          </h2>
          <p className="max-w-3xl mx-auto text-xl text-gray-400">
            Providing comprehensive technical solutions from development to deployment
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {services.map((service, index) => (
            <div
              key={service.id}
              className="card-dark group hover-glow fade-in-up"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              {/* Icon */}
              <div className="relative mb-6">
                <div className="flex items-center justify-center w-20 h-20 transition-all duration-300 rounded-xl bg-primary/10 text-primary group-hover:bg-primary group-hover:text-dark-300">
                  {service.icon}
                </div>
                <div className="absolute w-8 h-8 transition-all rounded-full -top-2 -right-2 bg-primary/20 blur-xl group-hover:bg-primary/40"></div>
              </div>

              {/* Content */}
              <h3 className="mb-3 text-2xl font-bold text-white transition-colors group-hover:text-primary">
                {service.title}
              </h3>
              <p className="mb-6 leading-relaxed text-gray-400">
                {service.description}
              </p>

              {/* Skills Tags */}
              <div className="flex flex-wrap gap-2">
                {service.skills.map((skill, idx) => (
                  <span
                    key={idx}
                    className="px-3 py-1 text-sm text-gray-300 transition-colors border border-gray-700 rounded-full bg-dark-200/50 group-hover:border-primary/50"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Tech Stack Section */}
        <div className="mt-20 delay-500 fade-in-up">
          <div className="mb-12 text-center">
            <h3 className="text-3xl font-bold md:text-4xl font-heading">
              <span className="text-white">Technologies I</span>{" "}
              <span className="gradient-text">Master</span>
            </h3>
          </div>

          <div className="grid grid-cols-2 gap-6 md:grid-cols-4 lg:grid-cols-6">
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
              { name: "PostgreSQL", icon: "🐘" },

              // 🧰 Version Control
              { name: "Git", icon: "📦" },
              { name: "GitHub", icon: "🐙" },
            ].map((tech, idx) => (
              <div
                key={idx}
                className="py-6 text-center cursor-pointer card-dark group"
              >
                <div className="mb-3 text-4xl transition-transform group-hover:scale-110">
                  {tech.icon}
                </div>
                <p className="font-medium text-gray-400 transition-colors group-hover:text-primary">
                  {tech.name}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Call to Action */}
        <div className="mt-16 text-center fade-in-up delay-600">
          <p className="mb-6 text-lg text-gray-400">
            Ready to bring your project to life?
          </p>
          <a href="#contact" className="inline-flex items-center gap-2 btn-primary">
            <Zap className="w-5 h-5" />
            Get Started
          </a>
        </div>
      </div>
    </section>
  );
};
