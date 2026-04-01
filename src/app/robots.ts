import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/api/', '/admin/', '/_next/', '/checkout/', '/account/']
      },
      {
        userAgent: 'GPTBot',
        allow: '/'
      },
      {
        userAgent: 'Google-Extended', 
        allow: '/'
      },
      {
        userAgent: 'CCBot',
        allow: '/'
      },
      {
        userAgent: 'anthropic-ai',
        allow: '/'
      },
      {
        userAgent: 'Claude-Web',
        allow: '/'
      }
    ],
    sitemap: 'https://bonjoojoo.com/sitemap.xml',
    host: 'https://bonjoojoo.com'
  }
}