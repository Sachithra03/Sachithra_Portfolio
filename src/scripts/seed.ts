import fs from 'fs';
import path from 'path';

// Automatically load .env.local if running standalone script in Node 20+
if (fs.existsSync(path.resolve(process.cwd(), '.env.local'))) {
  process.loadEnvFile(path.resolve(process.cwd(), '.env.local'));
}

import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import { connectToDatabase, getDatabase } from '../lib/db/mongodb';
import { uploadGridFSFile } from '../lib/storage/gridfs';
import {
  Admin,
  Project,
  Certificate,
  Experience,
  Education,
  Skill,
  Profile,
  Note,
  SocialLink,
} from '../models';

const PUBLIC_DIR = path.join(process.cwd(), 'public');

/**
 * Upload a local asset to GridFS if not already uploaded.
 */
async function uploadLocalAssetToGridFS(
  relativeFilePath: string,
  mimeType: string,
  documentType: string
): Promise<mongoose.Types.ObjectId | undefined> {
  const absolutePath = path.join(PUBLIC_DIR, relativeFilePath);
  if (!fs.existsSync(absolutePath)) {
    console.warn(`[SEED] File not found: ${absolutePath}`);
    return undefined;
  }

  const filename = path.basename(absolutePath);
  const db = await getDatabase();

  // Idempotency: check if already exists in GridFS with same originalName and size
  const stat = fs.statSync(absolutePath);
  const existing = await db.collection('fs.files').findOne({
    'metadata.originalName': filename,
    'metadata.size': stat.size,
  });

  if (existing) {
    console.log(`[SEED] GridFS file already exists: ${filename} -> (${existing._id})`);
    return existing._id as unknown as mongoose.Types.ObjectId;
  }

  const buffer = fs.readFileSync(absolutePath);
  const res = await uploadGridFSFile({
    buffer,
    filename,
    mimeType,
    size: buffer.length,
    isPublic: true,
    documentType,
  });

  console.log(`[SEED] Uploaded to GridFS: ${filename} -> (${res.fileId})`);
  return new mongoose.Types.ObjectId(res.fileId);
}

export async function runMigrationAndSeed() {
  console.log('\n======================================================');
  console.log('🚀 Starting Sachithra Portfolio Data & GridFS Migration');
  console.log('======================================================\n');

  await connectToDatabase();

  // 1. Admin Account
  const adminEmail = (process.env.ADMIN_EMAIL || 'sachithrai1003@gmail.com').toLowerCase();
  const adminPassword = process.env.ADMIN_PASSWORD || 'sachithraAdmin2026!';
  let admin = await Admin.findOne({ email: adminEmail });
  if (!admin) {
    const passwordHash = await bcrypt.hash(adminPassword, 12);
    admin = await Admin.create({
      email: adminEmail,
      passwordHash,
      role: 'superadmin',
      lastLoginAt: new Date(),
    });
    console.log(`✅ [ADMIN] Created initial admin: ${adminEmail}`);
  } else {
    console.log(`ℹ️ [ADMIN] Admin already exists: ${adminEmail}`);
  }

  // 2. Profile Media & Document
  console.log('\n--- Ingesting Profile & Resume ---');
  const avatarId = await uploadLocalAssetToGridFS('Photos/profile.jpg', 'image/jpeg', 'profile-avatar')
    || await uploadLocalAssetToGridFS('Photos/sachithra.png', 'image/png', 'profile-avatar');
  const resumeId = await uploadLocalAssetToGridFS("CV/Sachithra Indrachapa's Resume.pdf", 'application/pdf', 'cv-pdf');

  let profile = await Profile.findOne();
  const profileData = {
    fullName: 'Sachithra Indrachapa',
    title: 'Software Engineer & Full-Stack Architect',
    headline: 'IMAGINATION IS MORE IMPORTANT THAN KNOWLEDGE',
    bio: "I'm a creative Software Engineer specializing in building scalable web and mobile applications, high-performance distributed systems, and clean editorial UI/UX.",
    location: 'Sri Lanka',
    email: 'sachithrai1003@gmail.com',
    phone: '+94 71 859 6632',
    avatarImageId: avatarId,
    resumeFileId: resumeId,
    availableForHire: true,
    stats: [
      { label: 'Code Quality', percentage: 95, color: '#C85A17' },
      { label: 'Client Satisfaction', percentage: 90, color: '#1A1A1A' },
      { label: 'Project Success', percentage: 85, color: '#C85A17' },
      { label: 'Innovation', percentage: 92, color: '#1A1A1A' },
    ],
  };

  if (!profile) {
    profile = await Profile.create(profileData);
    console.log('✅ [PROFILE] Created profile document');
  } else {
    Object.assign(profile, profileData);
    await profile.save();
    console.log('ℹ️ [PROFILE] Updated profile document');
  }

  // 3. Projects
  console.log('\n--- Ingesting Projects & Gallery Assets ---');
  const projectsData = [
    {
      title: 'Luvi Clothing',
      slug: 'luvi-clothing',
      description: 'Full stack clothing e-commerce platform with product management, shopping cart, checkout, sewing requests, authentication, order management, and secure payments.',
      longDescription: 'Luvi Clothing is an enterprise-grade e-commerce application engineered with Next.js, TypeScript, MongoDB, and Mongoose. It incorporates automated order workflows, PayHere payment gateway integration, real-time inventory management, custom sewing request commissions, and an intuitive customer checkout experience.',
      imagePath: 'Photos/luvi-clothing.png',
      imageMime: 'image/png',
      technologies: ['Next.js', 'TypeScript', 'React', 'MongoDB', 'Mongoose', 'Jest', 'PayHere'],
      liveUrl: 'https://luvi-clothing.vercel.app/',
      githubUrl: 'https://github.com/Sachithra03/luvi-clothing.git',
      status: 'completed' as const,
      featured: true,
      order: 1,
    },
    {
      title: 'SolarCharge Finder',
      slug: 'solar-charge-finder',
      description: 'Full stack EV charging discovery and marketplace platform featuring geolocation-based station discovery, advanced filtering, JWT and OAuth authentication, RBAC, reviews, and analytics.',
      longDescription: 'A modern mobility solution connecting electric vehicle owners with available solar-powered and commercial charging stations. Includes real-time location radius searches, Docker containerization, comprehensive Artillery load tests, and CI/CD pipelines via GitHub Actions.',
      imagePath: 'Photos/solar-charge-finder.png',
      imageMime: 'image/png',
      technologies: ['Node.js', 'Express', 'MongoDB', 'React', 'Vite', 'Docker', 'GitHub Actions', 'Jest', 'Artillery', 'Vercel'],
      liveUrl: 'https://solar-charge-finder.vercel.app/',
      githubUrl: 'https://github.com/SolarCharge-Finder/SolarCharge-Finder.git',
      status: 'completed' as const,
      featured: true,
      order: 2,
    },
    {
      title: 'Personal Portfolio CMS',
      slug: 'personal-portfolio-cms',
      description: 'Minimal editorial developer portfolio and headless CMS powered by Next.js App Router, MongoDB Atlas, and GridFS binary file streaming.',
      longDescription: 'A production-grade portfolio architecture built with zero external object storage dependencies. All project assets, high-res photos, and credential PDFs are streamed natively from MongoDB GridFS chunks with zero memory buffering and strict ETag caching.',
      imagePath: 'Photos/portfolio-img.png',
      imageMime: 'image/png',
      technologies: ['Next.js', 'TypeScript', 'MongoDB', 'GridFS', 'Mongoose', 'Zod', 'Vanilla CSS'],
      liveUrl: 'https://sachithraindrachapa.vercel.app/',
      githubUrl: 'https://github.com/Sachithra03/Sachithra_Portfolio.git',
      status: 'completed' as const,
      featured: true,
      order: 3,
    },
    {
      title: 'Xaphora Dress - E-Commerce Platform',
      slug: 'xaphora-dress',
      description: 'MERN-based clothing store with role-based access, JWT auth, user management, admin dashboard, and AI-powered customer support.',
      longDescription: 'Full-featured digital retail storefront featuring intelligent conversational assistance via ChatGPT API, administrative stock management, and granular user authorization.',
      imagePath: 'Photos/xaphora-logo.png',
      imageMime: 'image/png',
      technologies: ['React', 'Node.js', 'MongoDB', 'Express', 'JWT', 'ChatGPT API'],
      liveUrl: '',
      githubUrl: 'https://github.com/TeamITPY2S2/Xaphora-Dress',
      status: 'completed' as const,
      featured: false,
      order: 4,
    },
    {
      title: 'EcoTrack – Smart Waste Management System',
      slug: 'eco-track',
      description: 'Web-based waste management platform with role-based dashboards, JWT authentication, ticket handling, payments, and route/location features using OpenStreetMap.',
      longDescription: 'Civic environmental platform designed to optimize municipal waste collection dispatch, citizen incident reporting, and geographic routing over OpenStreetMap geospatial interfaces.',
      imagePath: 'Photos/eco-track-img.png',
      imageMime: 'image/png',
      technologies: ['React', 'TypeScript', 'Tailwind CSS', 'Node.js', 'Express', 'MongoDB', 'JWT', 'OpenStreetMap'],
      liveUrl: '',
      githubUrl: 'https://github.com/OpenshelfTeam/EcoTrack.git',
      status: 'completed' as const,
      featured: false,
      order: 5,
    },
    {
      title: 'OpenShelf – University Library Mobile App',
      slug: 'openshelf-library',
      description: 'Mobile library application allowing university students to upload, share, and access study materials with online and offline support, secure authentication, and AI-assisted learning.',
      longDescription: 'Cross-platform React Native application engineered for higher education students. Integrates Supabase storage and offline AsyncStorage caches with OpenRouter LLM embeddings for fast query retrieval.',
      imagePath: 'Photos/openshelf-img.png',
      imageMime: 'image/png',
      technologies: ['React Native CLI', 'TypeScript', 'Supabase', 'PostgreSQL', 'AsyncStorage', 'OpenRouter API'],
      liveUrl: '',
      githubUrl: 'https://github.com/kusal2002/OpenShelf.git',
      status: 'completed' as const,
      featured: false,
      order: 6,
    },
    {
      title: 'BlogSpace – Personal Blog Platform',
      slug: 'blogspace-platform',
      description: 'Modern blog platform where users can create, publish, and interact with posts through likes and comments, featuring authentication, user profiles, and clean responsive UI.',
      longDescription: 'Editorial publication platform featuring JWT session management, markdown authoring, commenting threads, and social interaction metrics.',
      imagePath: 'Photos/blogspace-img.png',
      imageMime: 'image/png',
      technologies: ['React', 'TypeScript', 'Node.js', 'Express', 'MongoDB', 'JWT Authentication'],
      liveUrl: 'https://personal-blog-platform-master.vercel.app/',
      githubUrl: 'https://github.com/Sachithra03/personal-blog-platform.git',
      status: 'completed' as const,
      featured: false,
      order: 7,
    },
    {
      title: 'CashBuddy – Personal Finance Manager',
      slug: 'cashbuddy-finance',
      description: 'Android app for tracking income & expenses with offline storage, daily logs, balance overview, and spending reports using Room DB and Material Design.',
      longDescription: 'Native mobile finance tracker with local transactional persistence via Android Room SQLite database and detailed category spending breakdowns.',
      imagePath: 'Photos/cashbuddy-img.png',
      imageMime: 'image/png',
      technologies: ['Kotlin', 'Android Studio', 'Room', 'SQLite'],
      liveUrl: '',
      githubUrl: 'https://github.com/Sachithra03/CashBuddy',
      status: 'completed' as const,
      featured: false,
      order: 8,
    },
  ];

  for (const p of projectsData) {
    const coverImageId = await uploadLocalAssetToGridFS(p.imagePath, p.imageMime, 'project-cover');
    const projectDoc = await Project.findOneAndUpdate(
      { slug: p.slug },
      {
        title: p.title,
        slug: p.slug,
        description: p.description,
        longDescription: p.longDescription,
        coverImageId,
        technologies: p.technologies,
        liveUrl: p.liveUrl,
        githubUrl: p.githubUrl,
        status: p.status,
        featured: p.featured,
        order: p.order,
      },
      { upsert: true, new: true }
    );
    console.log(`✅ [PROJECT] Synced: ${projectDoc.title} (${projectDoc.slug})`);
  }

  // 4. Certifications
  console.log('\n--- Ingesting Certifications & Credential Documents ---');
  const certsData = [
    {
      title: 'PostgreSQL Essential Training',
      issuer: 'LinkedIn Learning',
      issueDate: new Date('2026-03-01'),
      description: 'Completed hands-on training covering PostgreSQL fundamentals including database creation, SQL queries, data modeling, indexing, and performance optimization for relational database systems.',
      imagePath: 'certifications/PostgreSQLEssentialTraining.png',
      imageMime: 'image/png',
      pdfPath: 'certifications/postgresql-essential-training.pdf',
      order: 1,
    },
    {
      title: 'MongoDB Node.js Developer Path',
      issuer: 'MongoDB University',
      issueDate: new Date('2025-10-01'),
      description: 'Completed hands-on learning path focused on building and managing data-driven applications using Node.js and MongoDB, including aggregation pipelines, CRUD operations, indexing, and performance optimization.',
      imagePath: 'certifications/MongoDBNodeJSDeveloper.jpg',
      imageMime: 'image/jpeg',
      pdfPath: 'certifications/mongodb-nodejs-developer.pdf',
      order: 2,
    },
    {
      title: 'Getting Started with DevOps on AWS',
      issuer: 'AWS Training & Certification',
      issueDate: new Date('2025-08-01'),
      description: 'Introductory certification covering the fundamentals of DevOps practices and how to apply them using AWS cloud infrastructure services.',
      imagePath: 'certifications/DevOpsFundamentals.jpg',
      imageMime: 'image/jpeg',
      pdfPath: 'certifications/devops-fundamentals.pdf',
      order: 3,
    },
    {
      title: 'Build and Deploy APIs with a Serverless CI/CD',
      issuer: 'AWS Training & Certification',
      issueDate: new Date('2025-08-15'),
      description: 'Certification on building and deploying APIs using AWS serverless technologies with automated continuous integration and delivery pipelines.',
      imagePath: 'certifications/ServerlessCICD.jpg',
      imageMime: 'image/jpeg',
      pdfPath: 'certifications/ServerlessCICD.pdf',
      order: 4,
    },
    {
      title: 'DevOps Workshop',
      issuer: 'SLIIT Software Engineering Student Community (SESC)',
      issueDate: new Date('2025-10-03'),
      description: 'Certificate of participation for actively attending the DevOps Workshop organized by the SLIIT Software Engineering Student Community on 3rd October 2025.',
      imagePath: 'certifications/DevOpsWorkshopSLIIT.png',
      imageMime: 'image/png',
      pdfPath: 'certifications/DevOpsWorkshopSLIIT.pdf',
      order: 5,
    },
  ];

  for (const c of certsData) {
    const coverImageId = await uploadLocalAssetToGridFS(c.imagePath, c.imageMime, 'certificate-image');
    const fileId = await uploadLocalAssetToGridFS(c.pdfPath, 'application/pdf', 'certificate-pdf');

    const certDoc = await Certificate.findOneAndUpdate(
      { title: c.title },
      {
        title: c.title,
        issuer: c.issuer,
        issueDate: c.issueDate,
        description: c.description,
        coverImageId,
        fileId,
        order: c.order,
      },
      { upsert: true, new: true }
    );
    console.log(`✅ [CERTIFICATE] Synced: ${certDoc.title}`);
  }

  // 5. Education
  console.log('\n--- Ingesting Education Records ---');
  const eduData = [
    {
      institution: 'Sri Lanka Institute of Information Technology (SLIIT)',
      degree: 'BSc (Hons) in Information Technology',
      fieldOfStudy: 'Software Engineering',
      startDate: new Date('2021-01-01'),
      endDate: new Date('2025-12-31'),
      current: false,
      grade: 'Undergraduate',
      description: 'Specialized in Software Engineering with rigorous focus on cloud computing, DevOps pipelines, distributed system architecture, and modern full-stack web technologies.',
      achievements: [
        'Led multiple software engineering capstone teams utilizing Agile Scrum methodologies',
        'Built full-stack production prototypes evaluated for high maintainability and security',
      ],
      order: 1,
    },
    {
      institution: 'Aquinas College of Higher Studies',
      degree: 'Diploma in English Language and Literature',
      fieldOfStudy: 'English & Professional Communication',
      startDate: new Date('2023-06-01'),
      endDate: new Date('2025-01-31'),
      current: false,
      grade: 'Distinction',
      description: 'Completed a comprehensive diploma program focused on advanced English language proficiency, technical documentation, and professional communication.',
      achievements: [
        'Enhanced technical writing and international documentation standards',
        'Developed executive presentation and interpersonal client engagement skills',
      ],
      order: 2,
    },
    {
      institution: 'C W W Kannangara National College, Hunumulla',
      degree: 'G.C.E. Advanced Level (A/L)',
      fieldOfStudy: 'Technology Stream',
      startDate: new Date('2019-01-01'),
      endDate: new Date('2021-08-31'),
      current: false,
      description: 'Technology stream focused on Science for Technology (SFT), Engineering Technology (ET), and Information and Communication Technology (ICT).',
      achievements: [],
      order: 3,
    },
  ];

  for (const e of eduData) {
    const doc = await Education.findOneAndUpdate(
      { institution: e.institution, degree: e.degree },
      e,
      { upsert: true, new: true }
    );
    console.log(`✅ [EDUCATION] Synced: ${doc.degree} at ${doc.institution}`);
  }

  // 6. Experience
  console.log('\n--- Ingesting Experience Records ---');
  const expData = [
    {
      company: 'Independent Software Engineering & Freelance',
      role: 'Full Stack Software Engineer',
      location: 'Colombo, Sri Lanka',
      employmentType: 'freelance' as const,
      startDate: new Date('2023-01-01'),
      current: true,
      description: 'Designing, architecting, and deploying full-stack web and mobile applications with MongoDB Atlas, Next.js, and Node.js for clients and university communities.',
      achievements: [
        'Built Luvi Clothing e-commerce platform with automated payment workflows and inventory sync',
        'Architected EV charging marketplace platform SolarCharge Finder with Dockerized infrastructure',
        'Designed headless portfolio CMS with native MongoDB GridFS chunked streaming',
      ],
      technologies: ['Next.js', 'React', 'Node.js', 'MongoDB', 'TypeScript', 'Docker', 'AWS'],
      order: 1,
    },
  ];

  for (const x of expData) {
    const doc = await Experience.findOneAndUpdate(
      { company: x.company, role: x.role },
      x,
      { upsert: true, new: true }
    );
    console.log(`✅ [EXPERIENCE] Synced: ${doc.role} at ${doc.company}`);
  }

  // 7. Skills
  console.log('\n--- Ingesting Skills Hierarchy ---');
  const skillsData = [
    // Frontend
    { name: 'React', category: 'Frontend' as const, proficiency: 95, iconName: 'Code', order: 1 },
    { name: 'Next.js', category: 'Frontend' as const, proficiency: 92, iconName: 'Globe', order: 2 },
    { name: 'TypeScript', category: 'Frontend' as const, proficiency: 90, iconName: 'FileCode', order: 3 },
    { name: 'Tailwind CSS', category: 'Frontend' as const, proficiency: 92, iconName: 'Palette', order: 4 },
    { name: 'Vanilla CSS & CSS Modules', category: 'Frontend' as const, proficiency: 94, iconName: 'Layout', order: 5 },

    // Backend
    { name: 'Node.js', category: 'Backend' as const, proficiency: 90, iconName: 'Server', order: 1 },
    { name: 'Express', category: 'Backend' as const, proficiency: 88, iconName: 'Cpu', order: 2 },
    { name: 'Mongoose', category: 'Backend' as const, proficiency: 92, iconName: 'Database', order: 3 },
    { name: 'C# & .NET', category: 'Backend' as const, proficiency: 80, iconName: 'Terminal', order: 4 },

    // Mobile
    { name: 'React Native', category: 'Mobile' as const, proficiency: 85, iconName: 'Smartphone', order: 1 },
    { name: 'Kotlin & Android', category: 'Mobile' as const, proficiency: 82, iconName: 'Smartphone', order: 2 },

    // Cloud & DevOps
    { name: 'AWS (Cloud & Serverless)', category: 'Cloud & DevOps' as const, proficiency: 84, iconName: 'Cloud', order: 1 },
    { name: 'Docker', category: 'Cloud & DevOps' as const, proficiency: 85, iconName: 'Box', order: 2 },
    { name: 'GitHub Actions & CI/CD', category: 'Cloud & DevOps' as const, proficiency: 88, iconName: 'GitBranch', order: 3 },

    // Database
    { name: 'MongoDB & GridFS', category: 'Database' as const, proficiency: 94, iconName: 'Database', order: 1 },
    { name: 'PostgreSQL', category: 'Database' as const, proficiency: 86, iconName: 'Database', order: 2 },
    { name: 'MySQL', category: 'Database' as const, proficiency: 85, iconName: 'Database', order: 3 },
    { name: 'SQLite & Room DB', category: 'Database' as const, proficiency: 82, iconName: 'Database', order: 4 },

    // Tools
    { name: 'Git & GitHub', category: 'Tools' as const, proficiency: 95, iconName: 'GitPullRequest', order: 1 },
    { name: 'Jest & Unit Testing', category: 'Tools' as const, proficiency: 85, iconName: 'CheckCircle', order: 2 },
    { name: 'Artillery Load Testing', category: 'Tools' as const, proficiency: 80, iconName: 'Zap', order: 3 },
  ];

  for (const s of skillsData) {
    await Skill.findOneAndUpdate(
      { name: s.name, category: s.category },
      s,
      { upsert: true, new: true }
    );
  }
  console.log(`✅ [SKILLS] Synced ${skillsData.length} skill records across 6 categories`);

  // 8. Social Links
  console.log('\n--- Ingesting Social Links ---');
  const socialsData = [
    { platform: 'GitHub', url: 'https://github.com/Sachithra03', icon: 'Github', order: 1, isPublic: true },
    { platform: 'LinkedIn', url: 'https://www.linkedin.com/in/sachithra-indrachapa-9150b8190/', icon: 'Linkedin', order: 2, isPublic: true },
    { platform: 'Email', url: 'mailto:sachithrai1003@gmail.com', icon: 'Mail', order: 3, isPublic: true },
  ];

  for (const sl of socialsData) {
    await SocialLink.findOneAndUpdate(
      { platform: sl.platform },
      sl,
      { upsert: true, new: true }
    );
  }
  console.log(`✅ [SOCIALS] Synced ${socialsData.length} social link channels`);

  // 9. Editorial Notes ("Notes from the Terminal")
  console.log('\n--- Ingesting Editorial Notes ---');
  const notesData = [
    {
      title: 'Eliminating Multi-Cloud Bloat: Moving to Database-Native Binary Storage',
      slug: 'eliminating-multicloud-bloat-mongodb-gridfs',
      summary: 'Why dual-brain architectures with external object stores introduce unnecessary cognitive overhead for personal portfolio CMS platforms, and how GridFS chunk streaming solves it.',
      content: `### The Dual-Brain Problem in Modern Web Stacks

For years, the standard advice for web developers has been: *“Never store binary blobs in your operational database. Always pipe them to Amazon S3, Cloudflare R2, or Google Cloud Storage.”*

While that advice remains sound for applications handling millions of user-uploaded videos or terabytes of daily images, it often introduces massive friction and fragile failure modes for personal portfolios and specialized CMS platforms:

1. **Transactional Desynchronization**: When a Project document updates but the external R2 bucket upload fails or hangs, you get broken image links or orphaned blobs.
2. **Credential Sprawl**: Managing IAM users, bucket policies, R2 access key IDs, secret keys, endpoint URLs, and custom domain SSL certs adds unnecessary operational surface area.
3. **Egress Boundaries**: Caching rules across disparate services lead to stale media states and CORS headaches.

### The Physics of GridFS Chunk Streaming

MongoDB GridFS avoids the 16MB BSON document limitation by splitting files into sequential 255KB chunks inside \`fs.chunks\`, indexed by \`{ files_id: 1, n: 1 }\`. By bridging MongoDB's native Node.js \`GridFSBucketReadStream\` to Next.js App Router Web API \`ReadableStream\`, we stream media chunks straight to the browser socket with:
- Zero full-memory RAM buffering in serverless functions.
- Immutability guarantees with HTTP \`ETag\` and \`Cache-Control: public, max-age=31536000, immutable\`.
- Atomic cascading garbage collection when project documents are updated or removed.

The result is a clean, monolithic, self-contained architecture where MongoDB Atlas is the single source of truth.`,
      tags: ['Architecture', 'MongoDB', 'Next.js', 'GridFS'],
      published: true,
      readTimeMinutes: 5,
      publishedAt: new Date(),
    },
    {
      title: 'Building Resilient Microservices with Docker and Automated CI/CD',
      slug: 'building-resilient-microservices-docker-cicd',
      summary: 'Practical lessons learned from building and load testing the SolarCharge Finder EV charging platform with Artillery and GitHub Actions.',
      content: `### Reliability Under Load

When designing full-stack applications with Node.js and Express, ensuring responsiveness during high traffic bursts is paramount. During the development of **SolarCharge Finder**, our EV charging discovery platform, we integrated automated performance benchmarking:

- **Artillery Load Scripts**: Simulating hundreds of concurrent geospatial searches per second across MongoDB geospatial indexes.
- **Dockerized Deployments**: Packaging backend microservices in Alpine Node containers for reproducible local and cloud runtimes.
- **GitHub Actions Verification**: Automatically executing Jest test suites and linting checks on every pull request before merging to staging.

Automated pipelines eliminate fear from deployments, allowing developers to ship with confidence.`,
      tags: ['DevOps', 'Docker', 'Testing', 'CI/CD'],
      published: true,
      readTimeMinutes: 4,
      publishedAt: new Date(),
    },
  ];

  for (const n of notesData) {
    await Note.findOneAndUpdate(
      { slug: n.slug },
      n,
      { upsert: true, new: true }
    );
  }
  console.log(`✅ [NOTES] Synced ${notesData.length} editorial notes`);

  console.log('\n======================================================');
  console.log('🎉 Migration and Seeding Complete!');
  console.log('======================================================\n');
}

// Allow direct execution via CLI
if (process.argv[1] && process.argv[1].endsWith('seed.ts')) {
  runMigrationAndSeed()
    .then(() => {
      process.exit(0);
    })
    .catch((err) => {
      console.error('❌ Migration failed:', err);
      process.exit(1);
    });
}
