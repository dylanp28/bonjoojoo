import { productGroups } from '@/data/productGroups'

/**
 * Google Merchant Center product feed
 * Served at /feed.xml — RSS 2.0 with Google Base namespace
 * Covers all 46 SKUs (one entry per variant) from productGroups.
 */
export async function GET(): Promise<Response> {
  const baseUrl = 'https://bonjoojoo.com'

  const items = productGroups.flatMap(product =>
    product.variants.map(variant => {
      const price = variant.price ?? product.basePrice
      const imageUrl = variant.images[0]
        ? variant.images[0].startsWith('http')
          ? variant.images[0]
          : `${baseUrl}${variant.images[0]}`
        : `${baseUrl}/images/products/placeholder.jpg`
      const availability = variant.inStock ? 'in stock' : 'out of stock'
      const title = `${product.name} — ${variant.name}`
      const link = `${baseUrl}/product/${product.id}`
      const id = variant.sku ?? `${product.id}-${variant.id}`

      return `    <item>
      <g:id>${escapeXml(id)}</g:id>
      <g:title>${escapeXml(title)}</g:title>
      <g:description>${escapeXml(product.description)}</g:description>
      <g:link>${escapeXml(link)}</g:link>
      <g:image_link>${escapeXml(imageUrl)}</g:image_link>
      <g:price>${price.toFixed(2)} USD</g:price>
      <g:availability>${availability}</g:availability>
      <g:brand>Bonjoojoo</g:brand>
      <g:condition>new</g:condition>
      <g:google_product_category>Apparel &amp; Accessories &gt; Jewelry</g:google_product_category>
      <g:item_group_id>${escapeXml(product.id)}</g:item_group_id>
      <g:mpn>${escapeXml(id)}</g:mpn>
      <g:material>${escapeXml(variant.metal)}</g:material>
      <g:shipping>
        <g:country>US</g:country>
        <g:service>Standard</g:service>
        <g:price>0.00 USD</g:price>
      </g:shipping>
    </item>`
    })
  )

  const feed = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:g="http://base.google.com/ns/1.0">
  <channel>
    <title>Bonjoojoo — Lab-Grown Diamond Jewelry</title>
    <link>${baseUrl}</link>
    <description>Lab-grown diamond jewelry: rings, necklaces, earrings, and bracelets.</description>
${items.join('\n')}
  </channel>
</rss>`

  return new Response(feed, {
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
      'Cache-Control': 'public, s-maxage=86400, stale-while-revalidate',
    },
  })
}

function escapeXml(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;')
}
