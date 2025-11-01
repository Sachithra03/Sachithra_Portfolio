import React, { useEffect, useRef, useState } from "react";
import { useScroll } from "../../context/ScrollContext";
import { Award, Code, Rocket, Users } from "lucide-react";

interface Stat {
  id: number;
  percentage: number;
  label: string;
  icon: React.ReactNode;
  color: string;
}

export const AboutSection: React.FC = () => {
  const { registerSection } = useScroll();
  const sectionRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (sectionRef.current) {
      const { offsetTop, offsetHeight } = sectionRef.current;
      registerSection("about", offsetTop, offsetTop + offsetHeight);

      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
          }
        },
        { threshold: 0.2 }
      );

      observer.observe(sectionRef.current);

      return () => observer.disconnect();
    }
  }, [registerSection]);

  const stats: Stat[] = [
    {
      id: 1,
      percentage: 95,
      label: "Code Quality",
      icon: <Code className="w-8 h-8" />,
      color: "#00FF87",
    },
    {
      id: 2,
      percentage: 90,
      label: "Client Satisfaction",
      icon: <Users className="w-8 h-8" />,
      color: "#00CC6C",
    },
    {
      id: 3,
      percentage: 85,
      label: "Project Success",
      icon: <Rocket className="w-8 h-8" />,
      color: "#00FF87",
    },
    {
      id: 4,
      percentage: 92,
      label: "Innovation",
      icon: <Award className="w-8 h-8" />,
      color: "#00CC6C",
    },
  ];

  const CircularProgress: React.FC<{ percentage: number; color: string; isVisible: boolean }> = ({
    percentage,
    color,
    isVisible,
  }) => {
    const radius = 70;
    const circumference = 2 * Math.PI * radius;
    const strokeDashoffset = circumference - (isVisible ? (percentage / 100) * circumference : 0);

    return (
      <svg className="w-40 h-40 transform -rotate-90">
        {/* Background circle */}
        <circle
          cx="80"
          cy="80"
          r={radius}
          stroke="rgba(255, 255, 255, 0.1)"
          strokeWidth="12"
          fill="none"
        />
        {/* Progress circle */}
        <circle
          cx="80"
          cy="80"
          r={radius}
          stroke={color}
          strokeWidth="12"
          fill="none"
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="round"
          style={{
            transition: "stroke-dashoffset 1.5s ease-in-out",
          }}
        />
      </svg>
    );
  };

  return (
    <section
      ref={sectionRef}
      id="about"
      className="section-padding relative overflow-hidden"
    >
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl"></div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16 fade-in-up">
          <p className="text-primary text-lg font-semibold tracking-wider uppercase mb-4">
            About Me
          </p>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold font-heading mb-6">
            <span className="text-white">EXPERIENCE AND</span>{" "}
            <span className="gradient-text">SOUL</span>
          </h2>
          <p className="text-gray-400 text-xl max-w-3xl mx-auto italic">
            "FAILURE IS THE CONDIMENT THAT GIVES SUCCESS"
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left Side - Stats */}
          <div className="grid grid-cols-2 gap-8 fade-in-up delay-200">
            {stats.map((stat) => (
              <div
                key={stat.id}
                className="flex flex-col items-center justify-center group"
              >
                <div className="relative mb-4">
                  <CircularProgress
                    percentage={stat.percentage}
                    color={stat.color}
                    isVisible={isVisible}
                  />
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <div className="text-primary mb-1">{stat.icon}</div>
                    <p className="text-3xl font-bold text-white">
                      {stat.percentage}%
                    </p>
                  </div>
                </div>
                <p className="text-gray-400 font-medium text-center group-hover:text-primary transition-colors">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>

          {/* Right Side - Content */}
          <div className="space-y-6 fade-in-up delay-300">
            <h3 className="text-3xl md:text-4xl font-bold font-heading mb-6">
              Crafting <span className="gradient-text">Scalable Digital Solutions</span>
            </h3>
            
            <p className="text-gray-400 text-lg leading-relaxed">
              I’m a dedicated Software Engineer with a passion for building robust,
               scalable, and user-focused digital solutions. My journey in technology is 
               driven by continuous learning and the desire to create impactful systems that make a difference.
            </p>

            <p className="text-gray-400 text-lg leading-relaxed">
              With expertise in modern web technologies, cloud platforms, and application design,
               I bridge creativity with technical precision to deliver secure, high-performance applications.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-6">
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                  <div>
                    <h4 className="text-white font-semibold mb-1">Full-Stack Development</h4>
                    <p className="text-gray-500 text-sm">React, Node.js, TypeScript, .NET</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                  <div>
                    <h4 className="text-white font-semibold mb-1">Cloud & Deployment</h4>
                    <p className="text-gray-500 text-sm">AWS, Docker</p>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                  <div>
                    <h4 className="text-white font-semibold mb-1">Mobile Development</h4>
                    <p className="text-gray-500 text-sm">React Native, Kotlin</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                  <div>
                    <h4 className="text-white font-semibold mb-1">Database Management</h4>
                    <p className="text-gray-500 text-sm">MySQL, MongoDB, Room (SQLite)</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="pt-6">
              <a
                href="#contact"
                className="btn-primary inline-flex items-center gap-2"
              >
                Let's Work Together
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
                    d="M17 8l4 4m0 0l-4 4m4-4H3"
                  />
                </svg>
              </a>
            </div>
          </div>
        </div>

        {/* Additional Info Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-20 fade-in-up delay-400">
          <div className="card-dark text-center">
            <div className="text-4xl font-bold gradient-text mb-2">2+</div>
            <p className="text-gray-400">Years of Experience</p>
          </div>
          <div className="card-dark text-center">
            <div className="text-4xl font-bold gradient-text mb-2">6+</div>
            <p className="text-gray-400">Projects Completed</p>
          </div>
          <div className="card-dark text-center">
            <div className="text-4xl font-bold gradient-text mb-2">2+</div>
            <p className="text-gray-400">Happy Clients</p>
          </div>
        </div>
      </div>
    </section>
  );
};
