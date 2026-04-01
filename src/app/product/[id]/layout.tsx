import { Metadata } from 'next'
import { productGroups } from '@/data/productGroups'

const BASE_URL = 'https://bonjoojoo.com'

interface LayoutProps {
  children: React.ReactNode
  params: { id: string }
}

export async function generateMetadata({ params }: { params: { id: string } }): Promise<Metadata> {
  const product = productGroups.find(p => p.id === params.id)

  if (!product) {
    return {
      title: 'Product Not Found',
    }
  }

  const ogImage = product.allImages?.[0] || product.variants?.[0]?.images?.[0] || '/images/bonjoojoo-1.png'
  const ogImageUrl = ogImage.startsWith('http') ? ogImage : `${BASE_URL}${ogImage}`
  const pageUrl = `${BASE_URL}/product/${product.id}`
  const priceMin = product.basePrice
  const title = `${product.name} | Lab-Grown Diamond Jewelry`
  const description = product.description.slice(0, 155).replace(/\s+\S*$/, '') + '...'

  return {
    title: product.name,
    description,
    alternates: {
      canonical: pageUrl,
    },
    openGraph: {
      title,
      description,
      url: pageUrl,
      siteName: 'Bonjoojoo',
      type: 'website',
      images: [
        {
          url: ogImageUrl,
          width: 800,
          height: 800,
          alt: product.name,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [ogImageUrl],
    },
  }
}

export default function ProductLayout({ children, params }: LayoutProps) {
  const product = productGroups.find(p => p.id === params.id)

  const jsonLd = product
    ? {
        '@context': 'https://schema.org',
        '@graph': [
          {
            '@type': 'Product',
            name: product.name,
            description: product.description,
            image: (product.allImages || product.variants.flatMap(v => v.images)).map(img =>
              img.startsWith('http') ? img : `${BASE_URL}${img}`
            ),
            brand: {
              '@type': 'Brand',
              name: 'Bonjoojoo',
            },
            offers: {
              '@type': 'Offer',
              url: `${BASE_URL}/product/${product.id}`,
              priceCurrency: 'USD',
              price: product.basePrice,
              availability:
                product.variants.some(v => v.inStock)
                  ? 'https://schema.org/InStock'
                  : 'https://schema.org/OutOfStock',
              seller: {
                '@type': 'Organization',
                name: 'Bonjoojoo',
              },
            },
            aggregateRating: {
              '@type': 'AggregateRating',
              ratingValue: '4.8',
              reviewCount: '127',
              bestRating: '5',
              worstRating: '1',
            },
          },
          {
            '@type': 'BreadcrumbList',
            itemListElement: [
              {
                '@type': 'ListItem',
                position: 1,
                name: 'Home',
                item: BASE_URL,
              },
              {
                '@type': 'ListItem',
                position: 2,
                name: product.category.charAt(0).toUpperCase() + product.category.slice(1),
                item: `${BASE_URL}/category/${product.category}`,
              },
              {
                '@type': 'ListItem',
                position: 3,
                name: product.name,
                item: `${BASE_URL}/product/${product.id}`,
              },
            ],
          },
        ],
      }
    : null

  return (
    <>
      {jsonLd && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      )}
      {children}
    </>
  )
}
