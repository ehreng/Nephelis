import type { MetadataRoute } from 'next';

const base = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.nephelisindustries.com';

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  return [
    { url: `${base}/`, lastModified: now, changeFrequency: 'weekly', priority: 1 },
    { url: `${base}/roadmap`, lastModified: now, changeFrequency: 'weekly', priority: 0.9 },
    { url: `${base}/updates`, lastModified: now, changeFrequency: 'weekly', priority: 0.9 },
    { url: `${base}/mission`, lastModified: now, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${base}/visuals`, lastModified: now, changeFrequency: 'monthly', priority: 0.6 },
  ];
}
