import { connectToDatabase } from '@/lib/db/mongodb';
import {
  Profile,
  Project,
  Certificate,
  Experience,
  Education,
  Skill,
  Note,
  SocialLink,
} from '@/models';
import { PortfolioHomeClient } from '@/components/PortfolioHomeClient';

export const dynamic = 'force-dynamic';

function getFallbackData() {
  return {
    profile: {
      fullName: 'Sachithra Indrachapa',
      title: 'Full-Stack Software Engineer',
      headline: 'SOFTWARE ENGINEER / SRI LANKA',
      bio: 'Software Engineering undergraduate at SLIIT. Building robust full-stack applications, scalable cloud infrastructure, and streaming data architectures with Next.js, Node.js, and MongoDB.',
      location: 'Colombo, Sri Lanka',
      email: 'sachithrai1003@gmail.com',
      phone: '+94 71 859 6632',
      avatarImageId: '6b027f0374981c35017dd701',
      resumeFileId: '6b027f0774981c35017dd70c',
      availableForHire: true,
    },
    projects: [
      {
        _id: 'proj_1',
        title: 'Luvi Clothing',
        slug: 'luvi-clothing',
        description: 'Enterprise-grade clothing e-commerce platform with product management, shopping cart, checkout, custom sewing commissions, authentication, order management, and PayHere secure payments.',
        coverImageId: '6b027f0874981c35017dd714',
        technologies: ['Next.js', 'TypeScript', 'React', 'MongoDB', 'Mongoose', 'Jest', 'PayHere'],
        liveUrl: 'https://luvi-clothing.vercel.app/',
        githubUrl: 'https://github.com/Sachithra03/luvi-clothing.git',
        status: 'completed',
        featured: true,
      },
      {
        _id: 'proj_2',
        title: 'SolarCharge Finder',
        slug: 'solar-charge-finder',
        description: 'Full stack EV charging discovery and marketplace platform featuring geolocation-based station discovery, advanced filtering, JWT and OAuth authentication, RBAC, reviews, and Artillery load benchmarking.',
        coverImageId: '6b027f1874981c35017dd71d',
        technologies: ['Node.js', 'Express', 'MongoDB', 'React', 'Vite', 'Docker', 'GitHub Actions', 'Jest', 'Artillery'],
        liveUrl: 'https://solar-charge-finder.vercel.app/',
        githubUrl: 'https://github.com/SolarCharge-Finder/SolarCharge-Finder.git',
        status: 'completed',
        featured: true,
      },
      {
        _id: 'proj_3',
        title: 'Personal Portfolio CMS',
        slug: 'personal-portfolio-cms',
        description: 'Modern brutalist developer portfolio and headless CMS powered by Next.js App Router, MongoDB Atlas, and native GridFS binary file streaming with zero external object storage dependencies.',
        technologies: ['Next.js 14', 'TypeScript', 'MongoDB Atlas', 'GridFS Streaming', 'Mongoose', 'Zod', 'Vanilla CSS'],
        liveUrl: 'https://sachithraindrachapa.vercel.app/',
        githubUrl: 'https://github.com/Sachithra03/Sachithra_Portfolio.git',
        status: 'completed',
        featured: true,
      },
      {
        _id: 'proj_4',
        title: 'Xaphora Dress - E-Commerce Platform',
        slug: 'xaphora-dress',
        description: 'MERN-based clothing store with role-based access, JWT auth, user management, admin dashboard, and AI-powered customer support.',
        technologies: ['React', 'Node.js', 'MongoDB', 'Express', 'JWT', 'ChatGPT API'],
        githubUrl: 'https://github.com/TeamITPY2S2/Xaphora-Dress',
        status: 'completed',
        featured: false,
      },
      {
        _id: 'proj_5',
        title: 'EcoTrack – Smart Waste Management System',
        slug: 'eco-track',
        description: 'Web-based waste management platform with role-based dashboards, JWT authentication, ticket handling, payments, and route/location features using OpenStreetMap.',
        technologies: ['React', 'TypeScript', 'Tailwind CSS', 'Node.js', 'Express', 'MongoDB', 'JWT', 'OpenStreetMap'],
        githubUrl: 'https://github.com/OpenshelfTeam/EcoTrack.git',
        status: 'completed',
        featured: false,
      },
      {
        _id: 'proj_6',
        title: 'OpenShelf – University Library Mobile App',
        slug: 'openshelf-library',
        description: 'Mobile library application allowing university students to upload, share, and access study materials with online and offline support, secure authentication, and AI-assisted learning.',
        technologies: ['React Native CLI', 'TypeScript', 'Supabase', 'PostgreSQL', 'AsyncStorage'],
        githubUrl: 'https://github.com/kusal2002/OpenShelf.git',
        status: 'completed',
        featured: false,
      },
      {
        _id: 'proj_7',
        title: 'BlogSpace – Personal Blog Platform',
        slug: 'blogspace-platform',
        description: 'Modern blog platform where users can create, publish, and interact with posts through likes and comments, featuring authentication, user profiles, and clean responsive UI.',
        technologies: ['React', 'TypeScript', 'Node.js', 'Express', 'MongoDB', 'JWT'],
        liveUrl: 'https://personal-blog-platform-master.vercel.app/',
        githubUrl: 'https://github.com/Sachithra03/personal-blog-platform.git',
        status: 'completed',
        featured: false,
      },
      {
        _id: 'proj_8',
        title: 'CashBuddy – Personal Finance Manager',
        slug: 'cashbuddy-finance',
        description: 'Android app for tracking income & expenses with offline storage, daily logs, balance overview, and spending reports using Room DB and Material Design.',
        technologies: ['Kotlin', 'Android Studio', 'Room DB', 'SQLite'],
        githubUrl: 'https://github.com/Sachithra03/CashBuddy',
        status: 'completed',
        featured: false,
      },
    ],
    certificates: [
      {
        _id: 'cert_1',
        title: 'PostgreSQL Essential Training',
        issuer: 'LinkedIn Learning',
        issueDate: new Date('2026-03-01'),
        credentialUrl: 'https://www.linkedin.com/learning/certificates/postgresql-essential-training',
        fileId: '6b027f2174981c35017dd722',
      },
      {
        _id: 'cert_2',
        title: 'Software Development Life Cycle (SDLC)',
        issuer: 'LinkedIn Learning',
        issueDate: new Date('2026-03-01'),
        credentialUrl: 'https://www.linkedin.com/learning/certificates/software-development-life-cycle-sdlc',
        fileId: '6b027f2874981c35017dd724',
      },
      {
        _id: 'cert_3',
        title: 'DevOps with GitHub and Docker',
        issuer: 'LinkedIn Learning',
        issueDate: new Date('2026-03-01'),
        credentialUrl: 'https://www.linkedin.com/learning/certificates/devops-foundations-github-actions-docker',
        fileId: '6b027f2c74981c35017dd726',
      },
      {
        _id: 'cert_4',
        title: 'Web Design for Beginners',
        issuer: 'University of Moratuwa',
        issueDate: new Date('2024-06-01'),
        credentialUrl: '',
        fileId: '6b027f2e74981c35017dd728',
      },
      {
        _id: 'cert_5',
        title: 'Front-End Development: Build an E-Commerce Website',
        issuer: 'LinkedIn Learning',
        issueDate: new Date('2024-05-01'),
        credentialUrl: '',
        fileId: '6b027f3274981c35017dd72a',
      },
    ],
    experiences: [
      {
        _id: 'exp_1',
        company: 'SLIIT & Academic Engineering Projects',
        role: 'Full-Stack Software Engineer',
        location: 'Colombo, Sri Lanka',
        startDate: new Date('2023-01-01'),
        current: true,
        description: 'Architecting distributed web applications, cross-platform mobile systems, and database streaming pipelines with rigorous testing.',
        achievements: [
          'Engineered Luvi Clothing e-commerce platform with Next.js and PayHere checkout',
          'Built SolarCharge Finder EV marketplace with Docker containerization and Artillery benchmark testing',
          'Authored production portfolio with MongoDB GridFS zero-memory chunk streaming',
        ],
      },
    ],
    educations: [
      {
        _id: 'edu_1',
        institution: 'Sri Lanka Institute of Information Technology (SLIIT)',
        degree: 'B.Sc. (Hons) in Information Technology Specialising in Software Engineering',
        fieldOfStudy: 'Software Engineering',
        startDate: new Date('2022-06-01'),
        endDate: new Date('2026-06-01'),
        current: true,
        grade: 'Undergraduate',
        description: 'Comprehensive curriculum in distributed computing, algorithms, data structures, software architecture, and cloud deployment pipelines.',
      },
    ],
    skills: [],
    notes: [
      {
        _id: 'note_1',
        title: 'Eliminating Multi-Cloud Bloat: Moving to Database-Native Binary Storage',
        slug: 'eliminating-multi-cloud-bloat-mongodb-gridfs',
        summary: 'Why dual-brain architectures with external object stores introduce unnecessary cognitive overhead for personal portfolio CMS platforms, and how GridFS chunk streaming solves it.',
        published: true,
        tags: ['Architecture', 'Databases', 'GridFS'],
        readTimeMinutes: 5,
      },
      {
        _id: 'note_2',
        title: 'Building Resilient Microservices with Docker and Automated CI/CD',
        slug: 'building-resilient-microservices-docker-cicd',
        summary: 'Practical lessons learned from building and load testing the SolarCharge Finder EV charging platform with Artillery and GitHub Actions.',
        published: true,
        tags: ['DevOps', 'Docker', 'Testing'],
        readTimeMinutes: 4,
      },
      {
        _id: 'note_3',
        title: 'A Brutalist Architecture in Next.js 14 — Notes From the Build',
        slug: 'brutalist-architecture-nextjs-14',
        summary: 'The technical system behind this very portfolio: zero rounded corners, monospace metadata, international vermilion accent, and a generative flow-field background canvas.',
        published: true,
        tags: ['Architecture', 'Design', 'Next.js'],
        readTimeMinutes: 6,
      },
    ],
    socials: [
      {
        _id: 'soc_1',
        platform: 'GitHub',
        url: 'https://github.com/Sachithra03',
        label: 'GitHub',
        isPublic: true,
      },
      {
        _id: 'soc_2',
        platform: 'LinkedIn',
        url: 'https://www.linkedin.com/in/sachithra-indrachapa-9150b8190/',
        label: 'LinkedIn',
        isPublic: true,
      },
    ],
  };
}

async function getPortfolioData() {
  try {
    await connectToDatabase();

    const [
      profileDoc,
      projects,
      certificates,
      experiences,
      educations,
      skills,
      notes,
      socials,
    ] = await Promise.all([
      Profile.findOne().lean(),
      Project.find().sort({ order: 1, createdAt: -1 }).lean(),
      Certificate.find().sort({ order: 1, issueDate: -1 }).lean(),
      Experience.find({ isVisible: { $ne: false } }).sort({ order: 1, startDate: -1 }).lean(),
      Education.find().sort({ order: 1, startDate: -1 }).lean(),
      Skill.find().sort({ category: 1, order: 1 }).lean(),
      Note.find({ published: true }).sort({ publishedAt: -1, createdAt: -1 }).lean(),
      SocialLink.find({ isPublic: true }).sort({ order: 1 }).lean(),
    ]);

    const fallback = getFallbackData();

    return {
      profile: profileDoc ? JSON.parse(JSON.stringify(profileDoc)) : fallback.profile,
      projects: projects && projects.length > 0 ? JSON.parse(JSON.stringify(projects)) : fallback.projects,
      certificates: certificates && certificates.length > 0 ? JSON.parse(JSON.stringify(certificates)) : fallback.certificates,
      experiences: Array.isArray(experiences) ? JSON.parse(JSON.stringify(experiences)) : fallback.experiences,
      educations: educations && educations.length > 0 ? JSON.parse(JSON.stringify(educations)) : fallback.educations,
      skills: skills && skills.length > 0 ? JSON.parse(JSON.stringify(skills)) : fallback.skills,
      notes: notes && notes.length > 0 ? JSON.parse(JSON.stringify(notes)) : fallback.notes,
      socials: socials && socials.length > 0 ? JSON.parse(JSON.stringify(socials)) : fallback.socials,
    };
  } catch (err) {
    console.warn('[PORTFOLIO] Database connection error, serving static fallback:', err);
    return getFallbackData();
  }
}

export default async function HomePage() {
  const data = await getPortfolioData();
  return <PortfolioHomeClient data={data} />;
}
