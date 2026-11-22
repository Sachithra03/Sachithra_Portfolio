import { MetadataRoute } from 'next';
import { connectToDatabase } from '@/lib/db/mongodb';
import { Project, Note } from '@/models';

export const dynamic = 'force-dynamic';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://sachithra.dev';

  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1.0,
    },
  ];

  try {
    await connectToDatabase();

    const [projects, notes] = await Promise.all([
      Project.find().select('slug updatedAt').lean(),
      Note.find({ published: true }).select('slug updatedAt').lean(),
    ]);

    const projectRoutes: MetadataRoute.Sitemap = projects.map((p) => ({
      url: `${baseUrl}/projects/${p.slug}`,
      lastModified: p.updatedAt ? new Date(p.updatedAt) : new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    }));

    const noteRoutes: MetadataRoute.Sitemap = notes.map((n) => ({
      url: `${baseUrl}/notes/${n.slug}`,
      lastModified: n.updatedAt ? new Date(n.updatedAt) : new Date(),
      changeFrequency: 'monthly',
      priority: 0.7,
    }));

    return [...staticRoutes, ...projectRoutes, ...noteRoutes];
  } catch (error) {
    console.warn('[SITEMAP] Pre-render database connection skipped:', error);
    return staticRoutes;
  }
}
