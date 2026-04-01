'use client'

interface SEOSchemaProps {
  type: 'organization' | 'product' | 'jewelry-store' | 'local-business'
  data?: any
}

export default function SEOSchemaMarkup({ type, data }: SEOSchemaProps) {
  const getSchema = () => {
    switch (type) {
      case 'organization':
        return {
          "@context": "https://schema.org",
          "@type": "Organization",
          "name": "Bonjoojoo",
          "description": "Lab-grown diamond jewelry brand specializing in sustainable, ethical fine jewelry. IGI certified diamonds, handcrafted in Los Angeles.",
          "url": "https://bonjoojoo.com",
          "logo": "https://bonjoojoo.com/logos/bonjoojoo-logo-primary.svg",
          "foundingDate": "2024",
          "foundingLocation": {
            "@type": "Place",
            "name": "Los Angeles, California"
          },
          "sameAs": [
            "https://www.instagram.com/bonjoojoo",
            "https://www.tiktok.com/@bonjoojoo",
            "https://www.pinterest.com/bonjoojoo"
          ],
          "contactPoint": {
            "@type": "ContactPoint",
            "contactType": "Customer Service",
            "email": "hello@bonjoojoo.com",
            "url": "https://bonjoojoo.com/contact"
          },
          "areaServed": ["United States", "Canada"],
          "knowsAbout": [
            "Lab-grown diamonds",
            "Sustainable jewelry",
            "Ethical diamonds",
            "IGI certification",
            "Custom jewelry design",
            "Engagement rings",
            "Wedding jewelry"
          ]
        }

      case 'jewelry-store':
        return {
          "@context": "https://schema.org",
          "@type": "JewelryStore",
          "name": "Bonjoojoo",
          "description": "Premium lab-grown diamond jewelry store offering sustainable, ethical fine jewelry with IGI certification.",
          "url": "https://bonjoojoo.com",
          "address": {
            "@type": "PostalAddress",
            "addressLocality": "Los Angeles",
            "addressRegion": "California",
            "addressCountry": "US"
          },
          "openingHoursSpecification": [
            {
              "@type": "OpeningHoursSpecification",
              "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
              "opens": "09:00",
              "closes": "18:00"
            }
          ],
          "priceRange": "$$",
          "paymentAccepted": ["Credit Card", "Debit Card", "PayPal", "Afterpay"],
          "currenciesAccepted": "USD",
          "hasOfferCatalog": {
            "@type": "OfferCatalog",
            "name": "Bonjoojoo Jewelry Catalog",
            "itemListElement": [
              {
                "@type": "Offer",
                "itemOffered": {
                  "@type": "Product",
                  "name": "Lab-Grown Diamond Rings",
                  "category": "Jewelry > Rings"
                }
              },
              {
                "@type": "Offer", 
                "itemOffered": {
                  "@type": "Product",
                  "name": "Lab-Grown Diamond Necklaces",
                  "category": "Jewelry > Necklaces"
                }
              },
              {
                "@type": "Offer",
                "itemOffered": {
                  "@type": "Product", 
                  "name": "Lab-Grown Diamond Earrings",
                  "category": "Jewelry > Earrings"
                }
              },
              {
                "@type": "Offer",
                "itemOffered": {
                  "@type": "Product",
                  "name": "Lab-Grown Diamond Bracelets", 
                  "category": "Jewelry > Bracelets"
                }
              }
            ]
          }
        }

      case 'product':
        return data ? {
          "@context": "https://schema.org",
          "@type": "Product",
          "name": data.name,
          "description": data.description,
          "brand": {
            "@type": "Brand",
            "name": "Bonjoojoo"
          },
          "category": "Jewelry",
          "material": ["Lab-grown diamond", "14k Gold"],
          "offers": {
            "@type": "Offer",
            "price": data.price,
            "priceCurrency": "USD",
            "availability": "https://schema.org/InStock",
            "seller": {
              "@type": "Organization",
              "name": "Bonjoojoo"
            },
            "shippingDetails": {
              "@type": "OfferShippingDetails",
              "shippingRate": {
                "@type": "MonetaryAmount",
                "value": "0",
                "currency": "USD"
              },
              "deliveryTime": {
                "@type": "ShippingDeliveryTime",
                "businessDays": {
                  "@type": "OpeningHoursSpecification",
                  "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"]
                },
                "handlingTime": {
                  "@type": "QuantitativeValue",
                  "minValue": 1,
                  "maxValue": 3,
                  "unitCode": "DAY"
                },
                "transitTime": {
                  "@type": "QuantitativeValue", 
                  "minValue": 3,
                  "maxValue": 7,
                  "unitCode": "DAY"
                }
              }
            }
          },
          "review": {
            "@type": "Review",
            "reviewRating": {
              "@type": "Rating",
              "ratingValue": "4.8",
              "bestRating": "5"
            },
            "author": {
              "@type": "Person",
              "name": "Verified Customer"
            }
          },
          "aggregateRating": {
            "@type": "AggregateRating",
            "ratingValue": "4.8",
            "reviewCount": "127"
          }
        } : null

      case 'local-business':
        return {
          "@context": "https://schema.org",
          "@type": "LocalBusiness",
          "name": "Bonjoojoo Jewelry",
          "description": "Los Angeles based lab-grown diamond jewelry studio specializing in sustainable, ethical fine jewelry and custom engagement rings.",
          "address": {
            "@type": "PostalAddress",
            "addressLocality": "Los Angeles", 
            "addressRegion": "California",
            "addressCountry": "US"
          },
          "geo": {
            "@type": "GeoCoordinates",
            "latitude": 34.0522,
            "longitude": -118.2437
          },
          "url": "https://bonjoojoo.com",
          "telephone": "+1-555-BJOOJOO",
          "email": "hello@bonjoojoo.com",
          "openingHoursSpecification": [
            {
              "@type": "OpeningHoursSpecification",
              "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
              "opens": "09:00",
              "closes": "18:00"
            }
          ],
          "paymentAccepted": ["Credit Card", "Cash", "Check"],
          "priceRange": "$$"
        }

      default:
        return null
    }
  }

  const schema = getSchema()
  
  if (!schema) return null

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}