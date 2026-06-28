import { MetadataRoute } from 'next';
import { BUSINESS_CONFIG } from '@/lib/config';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: '/api/',
    },
    sitemap: `${BUSINESS_CONFIG.url}/sitemap.xml`,
  };
}
