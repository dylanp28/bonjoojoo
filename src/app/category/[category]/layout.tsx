import { Metadata } from 'next'

const BASE_URL = 'https://bonjoojoo.com'

const CATEGORY_META: Record<string, { title: string; description: string; image: string }> = {
  rings: {
    title: 'Lab-Grown Diamond Rings',
    description:
      'Shop our collection of lab-grown diamond rings — engagement rings, stacking rings, statement bands, and more. IGI & GIA certified, handcrafted in Los Angeles.',
    image: '/images/category-banner-rings.svg',
  },
  necklaces: {
    title: 'Lab-Grown Diamond Necklaces',
    description:
      'Discover our lab-grown diamond necklaces — tennis necklaces, pendants, layering chains, and statement pieces. Ethically made, certified, and shipped free.',
    image: '/images/bonjoojoo-1.png',
  },
  earrings: {
    title: 'Lab-Grown Diamond Earrings',
    description:
      'Browse lab-grown diamond earrings — diamond studs, drop earrings, hoops, and more. IGI & GIA certified. Handcrafted in LA with 95% less environmental impact.',
    image: '/images/bonjoojoo-1.png',
  },
  bracelets: {
    title: 'Lab-Grown Diamond Bracelets',
    description:
      'Shop lab-grown diamond bracelets — tennis bracelets, bangles, charm bracelets, and stacking styles. Certified diamonds, free shipping, and 30-day returns.',
    image: '/images/bonjoojoo-1.png',
  },
}

const DEFAULT_META = {
  title: 'Lab-Grown Diamond Jewelry',
  description:
    'Shop our full collection of lab-grown diamond jewelry. IGI & GIA certified, 95% less environmental impact, handcrafted in Los Angeles.',
  image: '/images/bonjoojoo-1.png',
}

interface LayoutProps {
  children: React.ReactNode
  params: { category: string }
}

export async function generateMetadata({ params }: { params: { category: string } }): Promise<Metadata> {
  const cat = params.category.toLowerCase()
  const meta = CATEGORY_META[cat] || DEFAULT_META
  const label = cat.charAt(0).toUpperCase() + cat.slice(1)
  const pageUrl = `${BASE_URL}/category/${cat}`
  const ogImageUrl = meta.image.startsWith('http') ? meta.image : `${BASE_URL}${meta.image}`

  return {
    title: `${label} | Lab-Grown Diamond ${label}`,
    description: meta.description,
    alternates: {
      canonical: pageUrl,
    },
    openGraph: {
      title: `${meta.title} | Bonjoojoo`,
      description: meta.description,
      url: pageUrl,
      siteName: 'Bonjoojoo',
      type: 'website',
      images: [{ url: ogImageUrl, width: 1200, height: 630, alt: meta.title }],
    },
    twitter: {
      card: 'summary_large_image',
      title: `${meta.title} | Bonjoojoo`,
      description: meta.description,
      images: [ogImageUrl],
    },
  }
}

export default function CategoryLayout({ children, params }: LayoutProps) {
  const cat = params.category.toLowerCase()
  const label = cat.charAt(0).toUpperCase() + cat.slice(1)

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: BASE_URL },
      { '@type': 'ListItem', position: 2, name: label, item: `${BASE_URL}/category/${cat}` },
    ],
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      {children}
    </>
  )
}
