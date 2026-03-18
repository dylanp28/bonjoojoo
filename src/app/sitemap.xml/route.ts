import { MetadataRoute } from 'next'
import { products } from '@/data/products'
import { labGrownEducationData } from '@/data/labGrownEducation'

export async function GET(): Promise<Response> {
  const baseUrl = 'https://bonjoojoo.com'
  const currentDate = new Date().toISOString()

  // Static pages
  const staticPages = [
    {
      url: baseUrl,
      lastModified: currentDate,
      changeFrequency: 'weekly' as const,
      priority: 1.0,
    },
    {
      url: `${baseUrl}/education/lab-grown-diamonds`,
      lastModified: currentDate,
      changeFrequency: 'monthly' as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/education/lab-grown-vs-mined-diamonds`,
      lastModified: currentDate,
      changeFrequency: 'monthly' as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/category/rings`,
      lastModified: currentDate,
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/category/necklaces`,
      lastModified: currentDate,
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/category/earrings`,
      lastModified: currentDate,
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/sustainability`,
      lastModified: currentDate,
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    },
    {
      url: `${baseUrl}/certification`,
      lastModified: currentDate,
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: currentDate,
      changeFrequency: 'monthly' as const,
      priority: 0.6,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: currentDate,
      changeFrequency: 'monthly' as const,
      priority: 0.5,
    }
  ]

  // Product pages
  const productPages = products.map(product => ({
    url: `${baseUrl}/products/${product.id}`,
    lastModified: currentDate,
    changeFrequency: 'weekly' as const,
    priority: product.tags?.includes('bestseller') ? 0.8 : 0.7,
  }))

  // Education pages for each FAQ topic
  const educationPages = labGrownEducationData.faq.questions.slice(0, 10).map((faq, index) => ({
    url: `${baseUrl}/education/faq/${faq.question.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '')}`,
    lastModified: currentDate,
    changeFrequency: 'monthly' as const,
    priority: 0.6,
  }))

  // Category pages
  const categoryPages = [
    'rings',
    'necklaces', 
    'earrings',
    'bracelets'
  ].map(category => ({
    url: `${baseUrl}/category/${category}`,
    lastModified: currentDate,
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  }))

  // Lab-grown specific category pages
  const labGrownCategoryPages = [
    'lab-grown-engagement-rings',
    'lab-grown-wedding-bands',
    'lab-grown-diamond-studs',
    'lab-grown-tennis-necklaces'
  ].map(category => ({
    url: `${baseUrl}/search?tag=${category}`,
    lastModified: currentDate,
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  }))

  const allPages = [
    ...staticPages,
    ...productPages,
    ...educationPages,
    ...categoryPages,
    ...labGrownCategoryPages
  ]

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${allPages.map(page => `  <url>
    <loc>${page.url}</loc>
    <lastmod>${page.lastModified}</lastmod>
    <changefreq>${page.changeFrequency}</changefreq>
    <priority>${page.priority}</priority>
  </url>`).join('\n')}
</urlset>`

  return new Response(sitemap, {
    headers: {
      'Content-Type': 'application/xml',
      'Cache-Control': 'public, s-maxage=86400, stale-while-revalidate'
    },
  })
}