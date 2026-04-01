import { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://bonjoojoo.com'
  
  // Static pages
  const staticPages = [
    '',
    '/about',
    '/about/sustainability',
    '/about/craftsmanship',
    '/education/lab-grown-diamonds',
    '/consultation',
    '/contact',
    '/help/sizing',
    '/help/care',
    '/shipping',
    '/returns',
    '/faq',
    '/blog',
    '/gift-cards',
  ]

  // Category pages
  const categories = [
    '/category/rings',
    '/category/necklaces',
    '/category/earrings',
    '/category/bracelets',
    '/search',
  ]

  // SEO pages (hidden but indexable)
  const seoPages = [
    '/seo/lab-grown-diamond-rings',
    '/seo/sustainable-jewelry',
    '/seo/engagement-rings-los-angeles',
  ]

  // Product pages - we'll add these dynamically
  const productPages = [
    '/product/PENDANT-3777',
    '/product/PENDANT-3778',
    '/product/PENDANT-3779',
    '/product/PENDANT-3780',
    '/product/BRACELET-3782',
    '/product/BRACELET-3783',
    '/product/BRACELET-3784',
    '/product/BRACELET-3785',
    '/product/BRACELET-3786',
    '/product/BRACELET-3787',
    '/product/BRACELET-3788',
    '/product/BRACELET-3798',
    '/product/BRACELET-3799',
    '/product/NECKLACE-3800',
    '/product/PENDANT-3838',
    '/product/BRACELET-3839',
    '/product/PENDANT-3840',
  ]

  const sitemap: MetadataRoute.Sitemap = []

  // Add static pages
  staticPages.forEach(path => {
    sitemap.push({
      url: `${baseUrl}${path}`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: path === '' ? 1.0 : 0.8,
    })
  })

  // Add category pages
  categories.forEach(path => {
    sitemap.push({
      url: `${baseUrl}${path}`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.9,
    })
  })

  // Add SEO pages
  seoPages.forEach(path => {
    sitemap.push({
      url: `${baseUrl}${path}`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.7,
    })
  })

  // Add product pages
  productPages.forEach(path => {
    sitemap.push({
      url: `${baseUrl}${path}`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    })
  })

  return sitemap
}