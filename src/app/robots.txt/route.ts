export async function GET(): Promise<Response> {
  const baseUrl = 'https://bonjoojoo.com'
  
  const robotsTxt = `# Bonjoojoo Lab-Grown Diamond Jewelry - Robots.txt

User-agent: *
Allow: /

# High-priority pages for lab-grown diamond SEO
Allow: /
Allow: /education/
Allow: /category/
Allow: /products/
Allow: /sustainability/
Allow: /certification/

# Block admin and internal pages
Disallow: /admin/
Disallow: /api/
Disallow: /checkout/
Disallow: /account/
Disallow: /_next/
Disallow: /private/

# Block development and testing paths
Disallow: /test/
Disallow: /staging/
Disallow: /dev/

# Allow search engines to access important resources
Allow: /images/
Allow: /fonts/
Allow: /icons/
Allow: /*.css
Allow: /*.js

# Sitemap location
Sitemap: ${baseUrl}/sitemap.xml

# Special instructions for major search engines

# Google - emphasize lab-grown diamond content
User-agent: Googlebot
Allow: /education/lab-grown-diamonds
Allow: /education/lab-grown-vs-mined-diamonds
Allow: /search?tag=lab-grown-*
Crawl-delay: 1

# Bing - focus on sustainability content
User-agent: Bingbot
Allow: /sustainability/
Allow: /certification/
Crawl-delay: 2

# Ensure product images are crawlable for Google Images
User-agent: Googlebot-Image
Allow: /images/products/
Allow: /images/collections/
Allow: /images/education/

# Block AI training crawlers (optional - for content protection)
User-agent: GPTBot
Disallow: /

User-agent: ChatGPT-User
Disallow: /

User-agent: Google-Extended
Disallow: /

User-agent: anthropic-ai
Disallow: /

User-agent: Claude-Web
Disallow: /

# Social media crawlers - allow for rich previews
User-agent: facebookexternalhit
Allow: /

User-agent: Twitterbot
Allow: /

User-agent: LinkedInBot
Allow: /

User-agent: WhatsApp
Allow: /

# E-commerce specific crawlers
User-agent: ShopBot
Allow: /products/
Allow: /category/

User-agent: PriceBot
Allow: /products/

# Block excessive crawling during peak hours (optional)
# Crawl-delay: 10

# Cache directive for robots.txt
# This file should be cached for 24 hours
Cache-Control: public, max-age=86400`

  return new Response(robotsTxt, {
    headers: {
      'Content-Type': 'text/plain',
      'Cache-Control': 'public, max-age=86400'
    },
  })
}