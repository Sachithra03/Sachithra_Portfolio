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
      className="relative overflow-hidden section-padding"
    >
      {/* Background decoration */}
      <div className="absolute top-0 right-0 rounded-full w-96 h-96 bg-primary/5 blur-3xl"></div>

      <div className="container relative z-10 px-4 mx-auto">
        {/* Section Header */}
        <div className="mb-16 text-center fade-in-up">
          <p className="mb-4 text-lg font-semibold tracking-wider uppercase text-primary">
            About Me
          </p>
          <h2 className="mb-6 text-4xl font-bold md:text-5xl lg:text-6xl font-heading">
            <span className="text-white">EXPERIENCE AND</span>{" "}
            <span className="gradient-text">SOUL</span>
          </h2>
          <p className="max-w-3xl mx-auto text-xl italic text-gray-400">
            "FAILURE IS THE CONDIMENT THAT GIVES SUCCESS"
          </p>
        </div>

        <div className="grid items-center grid-cols-1 gap-16 lg:grid-cols-2">
          {/* Left Side - Stats */}
          <div className="grid grid-cols-2 gap-8 delay-200 fade-in-up">
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
                    <div className="mb-1 text-primary">{stat.icon}</div>
                    <p className="text-3xl font-bold text-white">
                      {stat.percentage}%
                    </p>
                  </div>
                </div>
                <p className="font-medium text-center text-gray-400 transition-colors group-hover:text-primary">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>

          {/* Right Side - Content */}
          <div className="space-y-6 delay-300 fade-in-up">
            <h3 className="mb-6 text-3xl font-bold md:text-4xl font-heading">
              Crafting <span className="gradient-text">Scalable Digital Solutions</span>
            </h3>
            
            <p className="text-lg leading-relaxed text-gray-400">
              I’m a dedicated Software Engineer with a passion for building robust,
               scalable, and user-focused digital solutions. My journey in technology is 
               driven by continuous learning and the desire to create impactful systems that make a difference.
            </p>

            <p className="text-lg leading-relaxed text-gray-400">
              With expertise in modern web technologies, cloud platforms, and application design,
               I bridge creativity with technical precision to deliver secure, high-performance applications.
            </p>

            <div className="grid grid-cols-1 gap-6 pt-6 md:grid-cols-2">
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="flex-shrink-0 w-2 h-2 mt-2 rounded-full bg-primary"></div>
                  <div>
                    <h4 className="mb-1 font-semibold text-white">Full-Stack Development</h4>
                    <p className="text-sm text-gray-500">React, Node.js, TypeScript, .NET</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="flex-shrink-0 w-2 h-2 mt-2 rounded-full bg-primary"></div>
                  <div>
                    <h4 className="mb-1 font-semibold text-white">Cloud & Deployment</h4>
                    <p className="text-sm text-gray-500">AWS, Docker</p>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="flex-shrink-0 w-2 h-2 mt-2 rounded-full bg-primary"></div>
                  <div>
                    <h4 className="mb-1 font-semibold text-white">Mobile Development</h4>
                    <p className="text-sm text-gray-500">React Native, Kotlin</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="flex-shrink-0 w-2 h-2 mt-2 rounded-full bg-primary"></div>
                  <div>
                    <h4 className="mb-1 font-semibold text-white">Database Management</h4>
                    <p className="text-sm text-gray-500">MySQL, MongoDB, PostgreSQL, Room (SQLite)</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="pt-6">
              <a
                href="#contact"
                className="inline-flex items-center gap-2 btn-primary"
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
        <div className="grid grid-cols-1 gap-6 mt-20 md:grid-cols-3 fade-in-up delay-400">
          <div className="text-center card-dark">
            <div className="mb-2 text-4xl font-bold gradient-text">2+</div>
            <p className="text-gray-400">Years of Experience</p>
          </div>
          <div className="text-center card-dark">
            <div className="mb-2 text-4xl font-bold gradient-text">6+</div>
            <p className="text-gray-400">Projects Completed</p>
          </div>
          <div className="text-center card-dark">
            <div className="mb-2 text-4xl font-bold gradient-text">2+</div>
            <p className="text-gray-400">Happy Clients</p>
          </div>
        </div>
      </div>
    </section>
  );
};
