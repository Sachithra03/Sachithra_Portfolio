import React, { useEffect, useRef } from "react";
import { useScroll } from "../../context/ScrollContext";
import { GraduationCap, Briefcase, Award, Calendar } from "lucide-react";

interface EducationItem {
  id: number;
  type: "education" | "experience";
  title: string;
  institution: string;
  period: string;
  description: string;
  achievements?: string[];
}

export const EducationSection: React.FC = () => {
  const { registerSection } = useScroll();
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (sectionRef.current) {
      const { offsetTop, offsetHeight } = sectionRef.current;
      registerSection("education", offsetTop, offsetTop + offsetHeight);
    }
  }, [registerSection]);

  const timeline: EducationItem[] = [
    {
      id: 1,
      type: "education",
      title: "BSc (Hons) in Information Technology",
      institution: "Sri Lanka Institute of Information Technology (SLIIT)",
      period: "2021 - 2025",
      description:
        "Specialized in Software Engineering with focus on cloud computing, DevOps practices, and modern web technologies.",
      achievements: [
        "Dean's List - Multiple semesters",
        "Completed advanced coursework in Cloud Computing",
        "Led multiple team projects using Agile methodologies",
      ],
    },
    {
      id: 2,
      type: "experience",
      title: "DevOps Engineer Intern",
      institution: "Tech Solutions Inc.",
      period: "2023 - 2024",
      description:
        "Worked on implementing CI/CD pipelines and managing cloud infrastructure for production applications.",
      achievements: [
        "Reduced deployment time by 60% through automation",
        "Implemented monitoring solutions using Prometheus & Grafana",
        "Managed Kubernetes clusters for microservices",
      ],
    },
    {
      id: 3,
      type: "education",
      title: "Advanced Level (A/L)",
      institution: "Richmond College, Galle",
      period: "2018 - 2020",
      description:
        "Physical Science stream with Mathematics, Physics, and Chemistry. Achieved excellent results in national examination.",
    },
    {
      id: 4,
      type: "experience",
      title: "Full-Stack Developer (Freelance)",
      institution: "Self-Employed",
      period: "2022 - Present",
      description:
        "Building custom web applications for clients using MERN stack and modern DevOps practices.",
      achievements: [
        "Delivered 15+ successful projects",
        "Maintained 98% client satisfaction rate",
        "Specialized in e-commerce and business applications",
      ],
    },
  ];

  return (
    <section
      ref={sectionRef}
      id="education"
      className="section-padding relative overflow-hidden bg-dark-100"
    >
      {/* Background decoration */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl"></div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16 fade-in-up">
          <p className="text-primary text-lg font-semibold tracking-wider uppercase mb-4">
            Journey
          </p>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold font-heading mb-6">
            <span className="text-white">EDUCATION &</span>{" "}
            <span className="gradient-text">EXPERIENCE</span>
          </h2>
          <p className="text-gray-400 text-xl max-w-3xl mx-auto">
            My academic background and professional journey
          </p>
        </div>

        {/* Timeline */}
        <div className="max-w-5xl mx-auto">
          <div className="relative">
            {/* Center line */}
            <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-0.5 bg-gradient-to-b from-primary via-primary/50 to-transparent hidden lg:block"></div>

            {timeline.map((item, index) => {
              const isLeft = index % 2 === 0;
              const Icon = item.type === "education" ? GraduationCap : Briefcase;

              return (
                <div
                  key={item.id}
                  className={`relative mb-12 fade-in-up`}
                  style={{ animationDelay: `${index * 150}ms` }}
                >
                  <div
                    className={`lg:flex items-center ${
                      isLeft ? "lg:flex-row-reverse" : ""
                    }`}
                  >
                    {/* Content Card */}
                    <div className={`lg:w-5/12 ${isLeft ? "lg:text-right" : ""}`}>
                      <div className="card-dark group">
                        {/* Icon Badge */}
                        <div
                          className={`inline-flex items-center justify-center w-14 h-14 rounded-full bg-primary/10 text-primary mb-4 group-hover:bg-primary group-hover:text-dark-300 transition-all ${
                            isLeft ? "lg:ml-auto" : ""
                          }`}
                        >
                          <Icon className="w-7 h-7" />
                        </div>

                        {/* Period */}
                        <div
                          className={`flex items-center gap-2 text-primary mb-2 ${
                            isLeft ? "lg:justify-end" : ""
                          }`}
                        >
                          <Calendar className="w-4 h-4" />
                          <span className="text-sm font-semibold">{item.period}</span>
                        </div>

                        {/* Title & Institution */}
                        <h3 className="text-2xl font-bold text-white mb-2 group-hover:text-primary transition-colors">
                          {item.title}
                        </h3>
                        <p className="text-gray-400 font-medium mb-4">
                          {item.institution}
                        </p>

                        {/* Description */}
                        <p className="text-gray-400 leading-relaxed mb-4">
                          {item.description}
                        </p>

                        {/* Achievements */}
                        {item.achievements && (
                          <ul
                            className={`space-y-2 ${isLeft ? "lg:text-right" : ""}`}
                          >
                            {item.achievements.map((achievement, idx) => (
                              <li
                                key={idx}
                                className={`flex items-start gap-2 text-gray-500 text-sm ${
                                  isLeft ? "lg:flex-row-reverse" : ""
                                }`}
                              >
                                <Award className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                                <span>{achievement}</span>
                              </li>
                            ))}
                          </ul>
                        )}
                      </div>
                    </div>

                    {/* Center dot - hidden on mobile */}
                    <div className="hidden lg:flex lg:w-2/12 justify-center items-center">
                      <div className="w-4 h-4 rounded-full bg-primary border-4 border-dark-100 relative z-10 group-hover:scale-125 transition-transform">
                        <div className="absolute inset-0 rounded-full bg-primary animate-pulse-green"></div>
                      </div>
                    </div>

                    {/* Spacer for alternating layout */}
                    <div className="hidden lg:block lg:w-5/12"></div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Certifications Preview */}
        <div className="mt-20 text-center fade-in-up delay-500">
          <div className="card-dark inline-block">
            <Award className="w-12 h-12 text-primary mx-auto mb-4" />
            <h3 className="text-2xl font-bold text-white mb-3">
              Professional Certifications
            </h3>
            <p className="text-gray-400 mb-6 max-w-md">
              Continuously expanding my knowledge through industry-recognized certifications
            </p>
            <a
              href="#certifications"
              className="btn-outline inline-flex items-center gap-2"
            >
              View Certifications
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};
