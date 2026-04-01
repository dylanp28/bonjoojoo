export interface Bundle {
  id: string
  name: string
  description: string
  productIds: string[]
  discountPercent: number
  featured: boolean
  tag: string
}

export const bundles: Bundle[] = [
  {
    id: 'bundle-bridal-classic',
    name: 'The Classic Bridal Set',
    description: 'The perfect trio for your most important day — a brilliant tennis necklace, a refined diamond bracelet, and a luxurious diamond pendant that shimmer with every step down the aisle.',
    productIds: ['NECKLACE-3800', 'BRACELET-3798', 'PENDANT-3777'],
    discountPercent: 15,
    featured: true,
    tag: 'bridal',
  },
  {
    id: 'bundle-everyday-elegance',
    name: 'Everyday Elegance',
    description: 'Effortless luxury for every day. A delicate pendant necklace, a classic gold band bracelet, and a sleek diamond bracelet — the trio you\'ll reach for again and again.',
    productIds: ['PENDANT-3778', 'BRACELET-3406', 'BRACELET-3788'],
    discountPercent: 10,
    featured: true,
    tag: 'everyday',
  },
  {
    id: 'bundle-anniversary-diamond',
    name: 'Diamond Anniversary',
    description: 'Mark a milestone in style. A stunning luxury diamond pendant paired with a statement premium diamond bracelet — two pieces that speak the language of forever.',
    productIds: ['PENDANT-3777', 'BRACELET-3782'],
    discountPercent: 12,
    featured: true,
    tag: 'anniversary',
  },
  {
    id: 'bundle-gift-her-everything',
    name: 'Gift Her Everything',
    description: 'The complete gift set she\'ll never forget. A modern diamond pendant, a designer spiral bracelet, and a premium flower pendant — wrapped in one unforgettable package.',
    productIds: ['PENDANT-3780', 'BRACELET-3799', 'PENDANT-3838'],
    discountPercent: 10,
    featured: false,
    tag: 'gift',
  },
  {
    id: 'bundle-vintage-romance',
    name: 'Vintage Romance',
    description: 'Old-world glamour for modern life. A sophisticated teardrop pendant, a classic gold band bracelet, and a luxurious diamond necklace — curated for those who appreciate timeless beauty.',
    productIds: ['PENDANT-3840', 'BRACELET-3406', 'NECKLACE-3881'],
    discountPercent: 10,
    featured: false,
    tag: 'vintage',
  },
]

/** Returns all bundles that contain the given product ID */
export function getBundlesForProduct(productId: string): Bundle[] {
  return bundles.filter((b) => b.productIds.includes(productId))
}

/** Returns featured bundles */
export function getFeaturedBundles(): Bundle[] {
  return bundles.filter((b) => b.featured)
}
