import { Metadata } from 'next'

interface LabGrownSEOSchemaProps {
  type: 'homepage' | 'product' | 'category' | 'education' | 'comparison'
  data?: {
    product?: {
      id: string
      name: string
      price: number
      originalPrice?: number
      description: string
      images: string[]
      rating: number
      reviewCount: number
      isLabGrown: boolean
      certification?: 'IGI' | 'GIA'
      specifications: Record<string, string>
    }
    category?: {
      name: string
      description: string
      productCount: number
    }
  }
}

export function generateLabGrownMetadata({ type, data }: LabGrownSEOSchemaProps): Metadata {
  const baseUrl = 'https://bonjoojoo.com'
  
  switch (type) {
    case 'homepage':
      return {
        title: 'bonjoojoo - Lab-Grown Diamond Jewelry | Sustainable Luxury in Los Angeles',
        description: 'Discover ethical luxury with lab-grown diamonds. IGI & GIA certified, 95% less environmental impact, 30-40% better value. Premium jewelry crafted in Los Angeles.',
        keywords: [
          'lab grown diamonds',
          'lab grown diamond jewelry',
          'sustainable diamond jewelry',
          'ethical diamonds',
          'lab created diamonds',
          'eco friendly jewelry',
          'conflict free diamonds',
          'Los Angeles jewelry',
          'bonjoojoo',
          'sustainable luxury',
          'ethical engagement rings',
          'lab grown diamond rings'
        ],
        openGraph: {
          title: 'bonjoojoo - Lab-Grown Diamond Jewelry | Sustainable Luxury',
          description: 'Ethical luxury jewelry with lab-grown diamonds. Same beauty as mined diamonds, 95% less environmental impact, better value.',
          type: 'website',
          url: baseUrl,
          images: [
            {
              url: `${baseUrl}/og-image.png`,
              width: 1200,
              height: 630,
              alt: 'bonjoojoo Lab-Grown Diamond Jewelry'
            }
          ],
          locale: 'en_US',
          siteName: 'bonjoojoo'
        },
        twitter: {
          card: 'summary_large_image',
          title: 'bonjoojoo - Lab-Grown Diamond Jewelry | Sustainable Luxury',
          description: 'Ethical luxury jewelry with lab-grown diamonds. Same beauty, better values.',
          images: [`${baseUrl}/og-image.png`]
        },
        alternates: {
          canonical: baseUrl
        },
        other: {
          'geo.region': 'US-CA',
          'geo.placename': 'Los Angeles',
          'geo.position': '34.0522;-118.2437'
        }
      }

    case 'product':
      if (!data?.product) return {}
      
      const product = data.product
      const productUrl = `${baseUrl}/products/${product.id}`
      
      return {
        title: `${product.name} | ${product.isLabGrown ? 'Lab-Grown Diamond' : ''} Jewelry | bonjoojoo`,
        description: `${product.description.slice(0, 150)}... ${product.isLabGrown ? 'Featuring IGI/GIA certified lab-grown diamonds with 95% less environmental impact.' : ''} Free shipping & returns.`,
        keywords: [
          product.name.toLowerCase(),
          product.isLabGrown ? 'lab grown diamond' : 'diamond',
          'sustainable jewelry',
          'ethical jewelry',
          'luxury jewelry',
          'bonjoojoo'
        ],
        openGraph: {
          title: `${product.name} | bonjoojoo`,
          description: product.description,
          type: 'product.item',
          url: productUrl,
          images: product.images.map(image => ({
            url: `${baseUrl}${image}`,
            width: 800,
            height: 800,
            alt: product.name
          })),
          locale: 'en_US',
          siteName: 'bonjoojoo'
        },
        twitter: {
          card: 'summary_large_image',
          title: `${product.name} | bonjoojoo`,
          description: product.description.slice(0, 160),
          images: [`${baseUrl}${product.images[0]}`]
        },
        alternates: {
          canonical: productUrl
        }
      }

    case 'category':
      if (!data?.category) return {}
      
      const category = data.category
      return {
        title: `${category.name} | Lab-Grown Diamond Collection | bonjoojoo`,
        description: `Explore our ${category.name.toLowerCase()} collection featuring lab-grown diamonds. ${category.productCount} ethical luxury pieces with IGI/GIA certification.`,
        keywords: [
          category.name.toLowerCase(),
          'lab grown diamonds',
          'sustainable jewelry',
          'ethical luxury',
          'conflict free',
          'bonjoojoo'
        ],
        openGraph: {
          title: `${category.name} | bonjoojoo Lab-Grown Diamond Collection`,
          description: category.description,
          type: 'website',
          url: `${baseUrl}/category/${category.name.toLowerCase().replace(' ', '-')}`,
          images: [
            {
              url: `${baseUrl}/collections/${category.name.toLowerCase()}-og.png`,
              width: 1200,
              height: 630,
              alt: `${category.name} Collection`
            }
          ]
        }
      }

    case 'education':
      return {
        title: 'Lab-Grown Diamond Education | Complete Guide 2024 | bonjoojoo',
        description: 'Learn everything about lab-grown diamonds: creation process, certification, quality comparison, environmental impact. Expert guide from bonjoojoo.',
        keywords: [
          'lab grown diamond guide',
          'lab grown vs mined diamonds',
          'diamond certification guide',
          'sustainable diamonds education',
          'IGI GIA certification',
          'lab created diamond facts'
        ],
        openGraph: {
          title: 'Lab-Grown Diamond Education | Complete Guide | bonjoojoo',
          description: 'Expert guide to lab-grown diamonds: quality, certification, sustainability & value.',
          type: 'article',
          url: `${baseUrl}/education/lab-grown-diamonds`,
          images: [
            {
              url: `${baseUrl}/education-og.png`,
              width: 1200,
              height: 630,
              alt: 'Lab-Grown Diamond Education Guide'
            }
          ]
        },
        alternates: {
          canonical: `${baseUrl}/education/lab-grown-diamonds`
        }
      }

    case 'comparison':
      return {
        title: 'Lab-Grown vs Mined Diamonds: Complete Comparison 2024 | bonjoojoo',
        description: 'Detailed comparison of lab-grown and mined diamonds: price, quality, ethics, environmental impact. Make an informed choice with expert insights.',
        keywords: [
          'lab grown vs mined diamonds',
          'diamond comparison guide',
          'lab grown diamond benefits',
          'sustainable vs traditional diamonds',
          'diamond price comparison',
          'ethical diamond choice'
        ],
        openGraph: {
          title: 'Lab-Grown vs Mined Diamonds: Complete Comparison | bonjoojoo',
          description: 'Expert comparison of lab-grown and mined diamonds across price, quality, ethics & environment.',
          type: 'article',
          url: `${baseUrl}/education/lab-grown-vs-mined-diamonds`,
          images: [
            {
              url: `${baseUrl}/comparison-og.png`,
              width: 1200,
              height: 630,
              alt: 'Lab-Grown vs Mined Diamond Comparison'
            }
          ]
        },
        alternates: {
          canonical: `${baseUrl}/education/lab-grown-vs-mined-diamonds`
        }
      }

    default:
      return {}
  }
}

export function LabGrownSEOSchema({ type, data }: LabGrownSEOSchemaProps) {
  const generateStructuredData = () => {
    const baseUrl = 'https://bonjoojoo.com'
    
    switch (type) {
      case 'homepage':
        return {
          '@context': 'https://schema.org',
          '@type': 'Organization',
          name: 'bonjoojoo',
          url: baseUrl,
          logo: `${baseUrl}/logo.png`,
          description: 'Sustainable luxury jewelry featuring lab-grown diamonds with IGI & GIA certification',
          address: {
            '@type': 'PostalAddress',
            addressLocality: 'Los Angeles',
            addressRegion: 'CA',
            addressCountry: 'US'
          },
          contactPoint: {
            '@type': 'ContactPoint',
            telephone: '+1-555-BONJOOJOO',
            contactType: 'Customer Service'
          },
          sameAs: [
            'https://instagram.com/bonjoojoo',
            'https://facebook.com/bonjoojoo',
            'https://pinterest.com/bonjoojoo'
          ],
          hasOfferCatalog: {
            '@type': 'OfferCatalog',
            name: 'Lab-Grown Diamond Jewelry',
            itemListElement: [
              {
                '@type': 'OfferCategory',
                name: 'Lab-Grown Diamond Rings'
              },
              {
                '@type': 'OfferCategory', 
                name: 'Lab-Grown Diamond Necklaces'
              },
              {
                '@type': 'OfferCategory',
                name: 'Lab-Grown Diamond Earrings'
              }
            ]
          }
        }

      case 'product':
        if (!data?.product) return null
        
        const product = data.product
        return {
          '@context': 'https://schema.org',
          '@type': 'Product',
          name: product.name,
          description: product.description,
          image: product.images.map(img => `${baseUrl}${img}`),
          brand: {
            '@type': 'Brand',
            name: 'bonjoojoo'
          },
          manufacturer: {
            '@type': 'Organization',
            name: 'bonjoojoo'
          },
          material: product.isLabGrown ? 'Lab-Grown Diamond' : 'Diamond',
          category: 'Jewelry',
          additionalProperty: [
            {
              '@type': 'PropertyValue',
              name: 'Diamond Type',
              value: product.isLabGrown ? 'Lab-Grown' : 'Mined'
            },
            {
              '@type': 'PropertyValue',
              name: 'Certification',
              value: product.certification || 'IGI/GIA'
            },
            ...Object.entries(product.specifications).map(([name, value]) => ({
              '@type': 'PropertyValue',
              name,
              value
            }))
          ],
          offers: {
            '@type': 'Offer',
            price: product.price,
            priceCurrency: 'USD',
            availability: 'https://schema.org/InStock',
            seller: {
              '@type': 'Organization',
              name: 'bonjoojoo'
            },
            priceValidUntil: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
            shippingDetails: {
              '@type': 'OfferShippingDetails',
              shippingRate: {
                '@type': 'MonetaryAmount',
                value: product.price > 500 ? '0' : '25',
                currency: 'USD'
              },
              deliveryTime: {
                '@type': 'ShippingDeliveryTime',
                handlingTime: {
                  '@type': 'QuantitativeValue',
                  minValue: 1,
                  maxValue: 3,
                  unitCode: 'DAY'
                },
                transitTime: {
                  '@type': 'QuantitativeValue', 
                  minValue: 5,
                  maxValue: 7,
                  unitCode: 'DAY'
                }
              }
            }
          },
          aggregateRating: {
            '@type': 'AggregateRating',
            ratingValue: product.rating,
            reviewCount: product.reviewCount,
            bestRating: 5,
            worstRating: 1
          }
        }

      case 'education':
        return {
          '@context': 'https://schema.org',
          '@type': 'Article',
          headline: 'Complete Guide to Lab-Grown Diamonds',
          author: {
            '@type': 'Organization',
            name: 'bonjoojoo'
          },
          publisher: {
            '@type': 'Organization',
            name: 'bonjoojoo',
            logo: {
              '@type': 'ImageObject',
              url: `${baseUrl}/logo.png`
            }
          },
          datePublished: '2024-01-01',
          dateModified: new Date().toISOString(),
          articleSection: 'Diamond Education',
          about: 'Lab-Grown Diamonds',
          mainEntityOfPage: `${baseUrl}/education/lab-grown-diamonds`,
          image: `${baseUrl}/education-hero.png`
        }

      default:
        return null
    }
  }

  const structuredData = generateStructuredData()
  
  if (!structuredData) return null

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(structuredData)
      }}
    />
  )
}

// Utility function to generate FAQ schema for education pages
export function generateFAQSchema(faqs: Array<{ question: string; answer: string }>) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'FAQPage',
          mainEntity: faqs.map(faq => ({
            '@type': 'Question',
            name: faq.question,
            acceptedAnswer: {
              '@type': 'Answer',
              text: faq.answer
            }
          }))
        })
      }}
    />
  )
}

// Utility for breadcrumb schema
export function generateBreadcrumbSchema(breadcrumbs: Array<{ name: string; url: string }>) {
  const baseUrl = 'https://bonjoojoo.com'
  
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'BreadcrumbList',
          itemListElement: breadcrumbs.map((crumb, index) => ({
            '@type': 'ListItem',
            position: index + 1,
            name: crumb.name,
            item: `${baseUrl}${crumb.url}`
          }))
        })
      }}
    />
  )
}