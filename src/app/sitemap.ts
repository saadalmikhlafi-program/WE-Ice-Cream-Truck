import { MetadataRoute } from 'next';
import { BUSINESS_CONFIG } from '@/lib/config';
import { getAllServices } from '@/lib/services-data';
import { getTopCities } from '@/lib/cities-data';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = BUSINESS_CONFIG.domain;

  // Static routes
  const routes = [
    '',
    '/about',
    '/contact',
    '/gallery',
    '/menu',
    '/packages',
    '/get-a-quote',
    '/faq',
    '/cities',
    '/services',
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: route === '' ? 1 : 0.8,
  }));

  // Dynamic Service routes
  const services = getAllServices().map((service) => ({
    url: `${baseUrl}/services/${service.slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.8,
  }));

  // Dynamic City routes
  const cities = getTopCities().map((city) => ({
    url: `${baseUrl}/cities/${city.slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }));

  return [...routes, ...services, ...cities];
}
