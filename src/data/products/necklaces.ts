import { ProductGroup } from '@/types/product'
import { createProduct, createSimpleProduct } from '@/utils/productManager'

export const necklaceProducts: ProductGroup[] = [
  createProduct({
    id: 'lhn3800a',
    name: 'Diamond Tennis Necklace',
    description: 'Luxurious tennis necklace featuring a continuous strand of brilliant lab-grown diamonds. This timeless piece showcases perfectly matched diamonds in a classic setting that creates uninterrupted sparkle around the neckline. The epitome of elegant sophistication for special occasions or elevated everyday wear.',
    category: 'necklaces',
    subcategory: 'tennis',
    basePrice: 2485,
    originalPrice: 2850,
    variants: [
      { name: 'Yellow Gold', metal: '14k Yellow Gold', image: 'LHN3800A.jpg', sku: 'LHN3800A' }
    ],
    tags: ['diamond', 'tennis', 'luxury', 'classic', 'sale'],
    featured: true,
    bestseller: false
  }),

  createProduct({
    id: 'lhp3777a',
    name: 'Diamond Heart Pendant Necklace',
    description: 'Romantic heart pendant necklace featuring brilliant lab-grown diamonds in an elegant heart-shaped design. This timeless symbol of love combines classic sentiment with modern luxury, creating a piece that speaks to the heart. Perfect for expressing love or treating yourself to something special.',
    category: 'necklaces',
    subcategory: 'pendants',
    basePrice: 1285,
    originalPrice: 1485,
    variants: [
      { name: 'Yellow Gold', metal: '14k Yellow Gold', image: 'LHP3777A.jpg', sku: 'LHP3777A' },
      { name: 'Rose Gold', metal: '14k Rose Gold', image: 'LHP3777A-R.jpg', sku: 'LHP3777A-R' },
      { name: 'Yellow Gold Alt', metal: '14k Yellow Gold', image: 'LHP3777A-Y.jpg', sku: 'LHP3777A-Y' }
    ],
    tags: ['diamond', 'heart', 'pendant', 'romantic', 'sale'],
    featured: false,
    bestseller: true
  }),

  createProduct({
    id: 'lhp3778a',
    name: 'Diamond Circle Pendant Necklace',
    description: 'Elegant circle pendant necklace featuring brilliant lab-grown diamonds in a timeless circular design. This versatile piece symbolizes eternal beauty and completeness, with sparkling diamonds that create continuous light and movement. Perfect for layering or wearing as a sophisticated statement piece.',
    category: 'necklaces',
    subcategory: 'pendants',
    basePrice: 985,
    originalPrice: 1150,
    variants: [
      { name: 'Yellow Gold', metal: '14k Yellow Gold', image: 'LHP3778A-Y.jpg', sku: 'LHP3778A-Y' },
      { name: 'Rose Gold', metal: '14k Rose Gold', image: 'LHP3778A-R.jpg', sku: 'LHP3778A-R' },
      { name: 'White Gold', metal: '14k White Gold', image: 'LHP3778A-W.jpg', sku: 'LHP3778A-W' }
    ],
    tags: ['diamond', 'circle', 'pendant', 'versatile', 'sale'],
    featured: true,
    bestseller: false
  }),

  createProduct({
    id: 'lhp3779a',
    name: 'Diamond Star Pendant Necklace',
    description: 'Celestial-inspired star pendant necklace featuring brilliant lab-grown diamonds arranged in an elegant star formation. This enchanting piece captures the magic of the night sky with sparkling diamonds that twinkle like distant stars. Perfect for dreamers and those who reach for the stars.',
    category: 'necklaces',
    subcategory: 'pendants',
    basePrice: 1085,
    originalPrice: 1250,
    variants: [
      { name: 'Yellow Gold', metal: '14k Yellow Gold', image: 'LHP3779A.jpg', sku: 'LHP3779A' }
    ],
    tags: ['diamond', 'star', 'pendant', 'celestial', 'sale'],
    featured: false,
    bestseller: false
  }),

  createProduct({
    id: 'lhp3780a',
    name: 'Diamond Infinity Pendant Necklace',
    description: 'Romantic infinity pendant necklace featuring brilliant lab-grown diamonds in a timeless infinity symbol design. This meaningful piece represents eternal love and endless possibilities, with sparkling diamonds that create beautiful movement and light. Perfect for expressing everlasting devotion or celebrating life\'s infinite moments.',
    category: 'necklaces',
    subcategory: 'pendants',
    basePrice: 1185,
    originalPrice: 1385,
    variants: [
      { name: 'Yellow Gold', metal: '14k Yellow Gold', image: 'LHP3780A.jpg', sku: 'LHP3780A' },
      { name: 'Rose Gold', metal: '14k Rose Gold', image: 'LHP3780A-R.jpg', sku: 'LHP3780A-R' },
      { name: 'Yellow Gold Alt', metal: '14k Yellow Gold', image: 'LHP3780A-Y.jpg', sku: 'LHP3780A-Y' }
    ],
    tags: ['diamond', 'infinity', 'pendant', 'romantic', 'sale'],
    featured: true,
    bestseller: true
  }),

  createProduct({
    id: 'lhp3838a',
    name: 'Diamond Flower Pendant Necklace',
    description: 'Delicate flower pendant necklace featuring brilliant lab-grown diamonds arranged in a beautiful floral design. This nature-inspired piece captures the elegance of blooming flowers with sparkling diamonds that bring the design to life. Perfect for those who appreciate botanical beauty and feminine grace.',
    category: 'necklaces',
    subcategory: 'pendants',
    basePrice: 1085,
    originalPrice: 1250,
    variants: [
      { name: 'Yellow Gold', metal: '14k Yellow Gold', image: 'LHP3838A.jpg', sku: 'LHP3838A' }
    ],
    tags: ['diamond', 'flower', 'pendant', 'nature', 'sale'],
    featured: false,
    bestseller: true
  }),

  createProduct({
    id: 'lhp3840a',
    name: 'Diamond Teardrop Pendant Necklace',
    description: 'Elegant teardrop pendant necklace featuring brilliant lab-grown diamonds in a classic pear-shaped design. This timeless silhouette creates beautiful movement and captures light from every angle. The sophisticated teardrop shape offers versatile elegance for both day and evening wear.',
    category: 'necklaces',
    subcategory: 'pendants',
    basePrice: 1285,
    originalPrice: 1485,
    variants: [
      { name: 'Yellow Gold', metal: '14k Yellow Gold', image: 'LHP3840A.jpg', sku: 'LHP3840A' }
    ],
    tags: ['diamond', 'teardrop', 'pendant', 'classic', 'sale'],
    featured: true,
    bestseller: false
  }),
]
