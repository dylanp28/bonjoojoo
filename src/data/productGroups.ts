import { ProductGroup } from '@/types/product'

export const productGroups: ProductGroup[] = [
  // RINGS WITH VARIANTS
  
  // LHBD3782A - Diamond Filigree Wide Band Ring (CRITICAL FIX - Main issue from request)
  {
    id: 'lhbd3782a',
    name: 'Diamond Filigree Wide Band Ring',
    description: 'This exquisite wide-band ring marries old-world romance with modern luxury. Two rows of pavé-set brilliant diamonds frame an intricate openwork center featuring repeating quatrefoil motifs in warm yellow gold. The delicate filigree design creates a lace-like effect, while the substantial width makes a bold, elegant statement.',
    category: 'rings',
    subcategory: 'statement',
    basePrice: 1285,
    originalPrice: 1450,
    defaultVariant: 'lhbd3782a-y',
    variants: [
      {
        id: 'lhbd3782a-y',
        name: 'Yellow Gold',
        metal: '14k Yellow Gold',
        images: ['/images/products/LHBD3782A.jpg'],
        inStock: true,
        sku: 'LHBD3782A'
      },
      {
        id: 'lhbd3782a-r',
        name: 'Rose Gold',
        metal: '14k Rose Gold',
        images: ['/images/products/LHBD3782A-R.jpg'],
        inStock: true,
        sku: 'LHBD3782A-R'
      },
      {
        id: 'lhbd3782a-w',
        name: 'White Gold',
        metal: '14k White Gold',
        images: ['/images/products/LHBD3782A-W.jpg'],
        inStock: true,
        sku: 'LHBD3782A-W'
      }
    ],
    allImages: [
      '/images/products/LHBD3782A.jpg',
      '/images/products/LHBD3782A-R.jpg', 
      '/images/products/LHBD3782A-W.jpg'
    ],
    materials: ['14k Gold', 'Diamond'],
    features: ['Openwork Filigree Design', 'Quatrefoil Motifs', 'Pavé Diamond Setting', 'Wide Band', 'Vintage-Inspired'],
    specifications: {
      'Metal Options': '14k Yellow, Rose, or White Gold',
      'Diamond Count': '24-28 stones',
      'Diamond Weight': '0.45 ct total',
      'Band Width': '8-10mm',
      'Ring Height': '3mm'
    },
    rating: 4.9,
    reviewCount: 127,
    tags: ['bestseller', 'luxury', 'vintage-inspired', 'sale']
  },

  // LHBD3783A - Diamond Eternity Openwork Ring
  {
    id: 'lhbd3783a',
    name: 'Diamond Eternity Openwork Ring',
    description: 'Contemporary elegance meets timeless craftsmanship in this stunning eternity-style ring. Featuring continuous diamond pavé bands separated by an intricate openwork center section with geometric motifs.',
    category: 'rings',
    subcategory: 'eternity',
    basePrice: 1395,
    defaultVariant: 'lhbd3783a-y',
    variants: [
      {
        id: 'lhbd3783a-y',
        name: 'Yellow Gold',
        metal: '14k Yellow Gold',
        images: ['/images/products/LHBD3783A.jpg'],
        inStock: true,
        sku: 'LHBD3783A'
      },
      {
        id: 'lhbd3783a-r',
        name: 'Rose Gold',
        metal: '14k Rose Gold',
        images: ['/images/products/LHBD3783A-R.jpg'],
        inStock: true,
        sku: 'LHBD3783A-R'
      }
    ],
    allImages: [
      '/images/products/LHBD3783A.jpg',
      '/images/products/LHBD3783A-R.jpg'
    ],
    materials: ['14k Gold', 'Diamond'],
    features: ['Eternity Style', 'Openwork Center', 'Continuous Pavé', 'Geometric Design'],
    specifications: {
      'Metal Options': '14k Yellow or Rose Gold',
      'Diamond Weight': '0.52 ct total',
      'Band Width': '7-9mm',
      'Setting Style': 'Pavé and Openwork'
    },
    rating: 4.8,
    reviewCount: 89,
    tags: ['eternity', 'geometric', 'luxury']
  },

  // LHBD3784A - Diamond Lattice Statement Ring
  {
    id: 'lhbd3784a',
    name: 'Diamond Lattice Statement Ring',
    description: 'Bold architectural design featuring diamond-set bands intersecting with an ornate lattice center. This statement piece combines structured geometry with sparkling brilliance.',
    category: 'rings',
    subcategory: 'statement',
    basePrice: 1525,
    defaultVariant: 'lhbd3784a-y',
    variants: [
      {
        id: 'lhbd3784a-y',
        name: 'Yellow Gold',
        metal: '14k Yellow Gold',
        images: ['/images/products/LHBD3784A.jpg'],
        inStock: true,
        sku: 'LHBD3784A'
      },
      {
        id: 'lhbd3784a-r',
        name: 'Rose Gold',
        metal: '14k Rose Gold',
        images: ['/images/products/LHBD3784A-R.jpg'],
        inStock: true,
        sku: 'LHBD3784A-R'
      }
    ],
    allImages: [
      '/images/products/LHBD3784A.jpg',
      '/images/products/LHBD3784A-R.jpg'
    ],
    materials: ['14k Gold', 'Diamond'],
    features: ['Lattice Design', 'Architectural Style', 'Diamond Pavé', 'Statement Width'],
    specifications: {
      'Metal Options': '14k Yellow or Rose Gold',
      'Diamond Weight': '0.58 ct total',
      'Band Width': '10-12mm',
      'Design Style': 'Lattice Openwork'
    },
    rating: 4.7,
    reviewCount: 72,
    tags: ['architectural', 'bold', 'statement']
  },

  // LHBD3785A - Delicate Diamond Filigree Ring
  {
    id: 'lhbd3785a',
    name: 'Delicate Diamond Filigree Ring',
    description: 'Refined elegance in a more delicate scale. This ring features intricate filigree work accented with carefully placed diamonds, perfect for everyday luxury or stacking.',
    category: 'rings',
    subcategory: 'delicate',
    basePrice: 895,
    originalPrice: 1025,
    defaultVariant: 'lhbd3785a-y',
    variants: [
      {
        id: 'lhbd3785a-y',
        name: 'Yellow Gold',
        metal: '14k Yellow Gold',
        images: ['/images/products/LHBD3785A.jpg'],
        inStock: true,
        sku: 'LHBD3785A'
      },
      {
        id: 'lhbd3785a-r',
        name: 'Rose Gold',
        metal: '14k Rose Gold',
        images: ['/images/products/LHBD3785A-R.jpg'],
        inStock: true,
        sku: 'LHBD3785A-R'
      }
    ],
    allImages: [
      '/images/products/LHBD3785A.jpg',
      '/images/products/LHBD3785A-R.jpg'
    ],
    materials: ['14k Gold', 'Diamond'],
    features: ['Delicate Filigree', 'Stackable Design', 'Diamond Accents', 'Everyday Elegance'],
    specifications: {
      'Metal Options': '14k Yellow or Rose Gold',
      'Diamond Weight': '0.18 ct total',
      'Band Width': '5-6mm',
      'Style': 'Delicate Filigree'
    },
    rating: 4.9,
    reviewCount: 156,
    tags: ['delicate', 'stackable', 'everyday', 'sale']
  },

  // LHBD3839A - Art Deco Inspired Diamond Ring
  {
    id: 'lhbd3839a',
    name: 'Art Deco Inspired Diamond Ring',
    description: 'Stunning vintage-inspired ring featuring geometric Art Deco design with pavé diamonds and intricate metalwork. This statement piece captures the glamour of the 1920s with modern craftsmanship.',
    category: 'rings',
    subcategory: 'vintage',
    basePrice: 1895,
    defaultVariant: 'lhbd3839a-y',
    variants: [
      {
        id: 'lhbd3839a-y',
        name: 'Yellow Gold',
        metal: '14k Yellow Gold',
        images: ['/images/products/LHBD3839A.jpg'],
        inStock: true,
        sku: 'LHBD3839A'
      },
      {
        id: 'lhbd3839a-r',
        name: 'Rose Gold',
        metal: '14k Rose Gold',
        images: ['/images/products/LHBD3839A-V2.jpg'],
        inStock: true,
        sku: 'LHBD3839A-R'
      },
      {
        id: 'lhbd3839a-w',
        name: 'White Gold',
        metal: '14k White Gold',
        images: ['/images/products/LHBD3839A-W.jpg'],
        inStock: true,
        sku: 'LHBD3839A-W'
      }
    ],
    allImages: [
      '/images/products/LHBD3839A.jpg',
      '/images/products/LHBD3839A-V2.jpg',
      '/images/products/LHBD3839A-W.jpg'
    ],
    materials: ['14k Gold', 'Diamond'],
    features: ['Art Deco Design', 'Geometric Pattern', 'Pavé Setting', 'Vintage-Inspired', 'Statement Piece'],
    specifications: {
      'Metal Options': '14k Yellow, Rose, or White Gold',
      'Diamond Count': '28-32 stones',
      'Diamond Weight': '0.65 ct total',
      'Band Width': '12-15mm',
      'Ring Height': '4mm'
    },
    rating: 4.7,
    reviewCount: 76,
    tags: ['vintage-inspired', 'statement', 'luxury', 'art-deco']
  },

  // B3406A - Classic Gold Band Bracelet Set
  {
    id: 'b3406a',
    name: 'Classic Gold Band Bracelet',
    description: 'Timeless classic gold band bracelet available in rose, white, and yellow gold. Perfect for stacking or everyday elegant wear.',
    category: 'bracelets',
    subcategory: 'bands',
    basePrice: 485,
    originalPrice: 565,
    defaultVariant: 'b3406a-y',
    variants: [
      {
        id: 'b3406a-y',
        name: 'Yellow Gold',
        metal: '14k Yellow Gold',
        images: ['/images/products/b3406a-yg.jpg'],
        inStock: true,
        sku: 'B3406A-YG'
      },
      {
        id: 'b3406a-r',
        name: 'Rose Gold',
        metal: '14k Rose Gold',
        images: ['/images/products/b3406a-rg.jpg'],
        inStock: true,
        sku: 'B3406A-RG'
      },
      {
        id: 'b3406a-w',
        name: 'White Gold',
        metal: '14k White Gold',
        images: ['/images/products/b3406a-wg.jpg'],
        inStock: true,
        sku: 'B3406A-WG'
      }
    ],
    allImages: [
      '/images/products/b3406a-yg.jpg',
      '/images/products/b3406a-rg.jpg',
      '/images/products/b3406a-wg.jpg'
    ],
    materials: ['14k Gold'],
    features: ['Classic Band Design', 'Three Metal Options', 'Stackable', 'Wedding Band Compatible'],
    specifications: {
      'Metal Options': '14k Rose, White, or Yellow Gold',
      'Band Width': '2-3mm',
      'Profile': 'Comfort fit',
      'Finish': 'High polish'
    },
    rating: 4.7,
    reviewCount: 245,
    tags: ['classic', 'wedding', 'stackable', 'sale']
  },

  // EARRINGS WITH VARIANTS

  // LHE3822A - Diamond Cluster Drop Earrings
  {
    id: 'lhe3822a',
    name: 'Diamond Cluster Drop Earrings',
    description: 'Sophisticated drop earrings featuring clusters of brilliant diamonds in an organic, flower-inspired arrangement. Perfect for special occasions or adding glamour to everyday looks.',
    category: 'earrings',
    subcategory: 'drops',
    basePrice: 1385,
    defaultVariant: 'lhe3822a-y',
    variants: [
      {
        id: 'lhe3822a-y',
        name: 'Yellow Gold',
        metal: '14k Yellow Gold',
        images: ['/images/products/LHE3822A-Y.jpg'],
        inStock: true,
        sku: 'LHE3822A-Y'
      },
      {
        id: 'lhe3822a-r',
        name: 'Rose Gold',
        metal: '14k Rose Gold',
        images: ['/images/products/LHE3822A-R.jpg'],
        inStock: true,
        sku: 'LHE3822A-R'
      }
    ],
    allImages: [
      '/images/products/LHE3822A-Y.jpg',
      '/images/products/LHE3822A-R.jpg'
    ],
    materials: ['14k Gold', 'Diamond'],
    features: ['Cluster Setting', 'Drop Style', 'Organic Design', 'Diamond Brilliance'],
    specifications: {
      'Metal Options': '14k Rose or Yellow Gold',
      'Total Diamond Weight': '1.25 ct',
      'Drop Length': '22mm',
      'Cluster Diameter': '12mm'
    },
    rating: 4.9,
    reviewCount: 67,
    tags: ['elegant', 'occasion', 'cluster']
  },

  // PENDANTS WITH VARIANTS

  // LHP3777A - Diamond Quatrefoil Key Pendant
  {
    id: 'lhp3777a',
    name: 'Diamond Quatrefoil Key Pendant',
    description: 'Unlock elegance with this stunning key pendant featuring interlocking quatrefoil loops adorned with shimmering pavé-set diamonds. Crafted in lustrous gold, this symbolic design makes a meaningful gift representing love, trust, and new beginnings.',
    category: 'necklaces',
    subcategory: 'pendants',
    basePrice: 925,
    defaultVariant: 'lhp3777a-y',
    variants: [
      {
        id: 'lhp3777a-y',
        name: 'Yellow Gold',
        metal: '14k Yellow Gold',
        images: ['/images/products/LHP3777A.jpg'],
        inStock: true,
        sku: 'LHP3777A'
      },
      {
        id: 'lhp3777a-r',
        name: 'Rose Gold',
        metal: '14k Rose Gold',
        images: ['/images/products/LHP3777A-R.jpg'],
        inStock: true,
        sku: 'LHP3777A-R'
      },
      {
        id: 'lhp3777a-w',
        name: 'White Gold',
        metal: '14k White Gold',
        images: ['/images/products/LHP3777A-TWR.jpg'],
        inStock: true,
        sku: 'LHP3777A-W'
      }
    ],
    allImages: [
      '/images/products/LHP3777A.jpg',
      '/images/products/LHP3777A-R.jpg',
      '/images/products/LHP3777A-Y.jpg',
      '/images/products/LHP3777A-TWR.jpg'
    ],
    materials: ['14k Gold', 'Diamond'],
    features: ['Symbolic Key Design', 'Quatrefoil Motif', 'Pavé Diamonds', 'Meaningful Gift'],
    specifications: {
      'Metal Options': '14k Yellow, Rose, or White Gold',
      'Diamond Weight': '0.35 ct',
      'Pendant Size': '25mm x 12mm',
      'Chain Length': '16-18 inches'
    },
    rating: 4.9,
    reviewCount: 203,
    tags: ['bestseller', 'symbolic', 'meaningful', 'gift']
  },

  // LHP3778A - Diamond Cross Pendant
  {
    id: 'lhp3778a',
    name: 'Diamond Cross Pendant',
    description: 'Classic cross pendant elevated with brilliant diamond pavé setting. Available in multiple gold tones, this timeless piece combines spiritual significance with luxurious craftsmanship.',
    category: 'necklaces',
    subcategory: 'pendants',
    basePrice: 795,
    originalPrice: 895,
    defaultVariant: 'lhp3778a-y',
    variants: [
      {
        id: 'lhp3778a-y',
        name: 'Yellow Gold',
        metal: '14k Yellow Gold',
        images: ['/images/products/LHP3778A-Y.jpg'],
        inStock: true,
        sku: 'LHP3778A-Y'
      },
      {
        id: 'lhp3778a-r',
        name: 'Rose Gold',
        metal: '14k Rose Gold',
        images: ['/images/products/LHP3778A-R.jpg'],
        inStock: true,
        sku: 'LHP3778A-R'
      },
      {
        id: 'lhp3778a-w',
        name: 'White Gold',
        metal: '14k White Gold',
        images: ['/images/products/LHP3778A-W.jpg'],
        inStock: true,
        sku: 'LHP3778A-W'
      }
    ],
    allImages: [
      '/images/products/LHP3778A-R.jpg',
      '/images/products/LHP3778A-W.jpg',
      '/images/products/LHP3778A-Y.jpg',
      '/images/products/LHP3778A-YWR.jpg'
    ],
    materials: ['14k Gold', 'Diamond'],
    features: ['Classic Cross Design', 'Pavé Diamond Setting', 'Spiritual Symbolism', 'Multiple Gold Options'],
    specifications: {
      'Metal Options': '14k Yellow, Rose, or White Gold',
      'Diamond Weight': '0.28 ct',
      'Pendant Size': '22mm x 14mm',
      'Chain Style': 'Cable chain included'
    },
    rating: 4.8,
    reviewCount: 178,
    tags: ['classic', 'spiritual', 'timeless', 'sale']
  },

  // LHP3780A - Diamond Cluster Flower Pendant
  {
    id: 'lhp3780a',
    name: 'Diamond Cluster Flower Pendant',
    description: 'Sophisticated flower pendant with clustered diamonds forming organic petals. Each stone is individually set to maximize brilliance and create a garden-fresh appeal.',
    category: 'necklaces',
    subcategory: 'pendants',
    basePrice: 1045,
    defaultVariant: 'lhp3780a-y',
    variants: [
      {
        id: 'lhp3780a-y',
        name: 'Yellow Gold',
        metal: '14k Yellow Gold',
        images: ['/images/products/LHP3780A.jpg'],
        inStock: true,
        sku: 'LHP3780A'
      },
      {
        id: 'lhp3780a-r',
        name: 'Rose Gold',
        metal: '14k Rose Gold',
        images: ['/images/products/LHP3780A-R.jpg'],
        inStock: true,
        sku: 'LHP3780A-R'
      }
    ],
    allImages: [
      '/images/products/LHP3780A.jpg',
      '/images/products/LHP3780A-R.jpg',
      '/images/products/LHP3780A-Y.jpg'
    ],
    materials: ['14k Gold', 'Diamond'],
    features: ['Cluster Setting', 'Organic Flower Design', 'Individual Stone Setting', 'Garden-Inspired'],
    specifications: {
      'Metal Options': '14k Yellow or Rose Gold',
      'Diamond Weight': '0.65 ct',
      'Pendant Size': '20mm diameter',
      'Setting Style': 'Cluster'
    },
    rating: 4.8,
    reviewCount: 112,
    tags: ['sophisticated', 'floral', 'organic']
  },

  // COLORED STONE PENDANTS

  // LHP3845A - Emerald Accent Pendant
  {
    id: 'lhp3845a-em',
    name: 'Emerald Accent Pendant',
    description: 'Striking pendant featuring a vibrant emerald centerpiece surrounded by diamond accents. This sophisticated piece combines the richness of colored gemstones with brilliant diamond sparkle.',
    category: 'necklaces',
    subcategory: 'pendants',
    basePrice: 1125,
    defaultVariant: 'lhp3845a-em-y',
    variants: [
      {
        id: 'lhp3845a-em-y',
        name: 'Yellow Gold',
        metal: '14k Yellow Gold',
        images: ['/images/products/LHP3845A-EM.jpg'],
        inStock: true,
        sku: 'LHP3845A-EM-Y'
      }
    ],
    allImages: ['/images/products/LHP3845A-EM.jpg'],
    materials: ['14k Gold', 'Emerald', 'Diamond'],
    features: ['Emerald Centerstone', 'Diamond Halo', 'Colored Gemstone', 'Luxury Design'],
    specifications: {
      'Metal Type': '14k Yellow Gold',
      'Emerald Weight': '0.75 ct',
      'Diamond Weight': '0.25 ct',
      'Pendant Size': '15mm'
    },
    rating: 4.8,
    reviewCount: 78,
    tags: ['emerald', 'luxury', 'colored-stone']
  },

  // LHP3845A - Ruby Accent Pendant
  {
    id: 'lhp3845a-ru',
    name: 'Ruby Accent Pendant',
    description: 'Stunning pendant showcasing a brilliant ruby centerpiece framed by sparkling diamonds. The rich red ruby symbolizes passion and love, making this an ideal romantic gift.',
    category: 'necklaces',
    subcategory: 'pendants',
    basePrice: 1125,
    defaultVariant: 'lhp3845a-ru-y',
    variants: [
      {
        id: 'lhp3845a-ru-y',
        name: 'Yellow Gold',
        metal: '14k Yellow Gold',
        images: ['/images/products/LHP3845A-RU.jpg'],
        inStock: true,
        sku: 'LHP3845A-RU-Y'
      }
    ],
    allImages: ['/images/products/LHP3845A-RU.jpg'],
    materials: ['14k Gold', 'Ruby', 'Diamond'],
    features: ['Ruby Centerstone', 'Diamond Halo', 'Romantic Symbolism', 'Luxury Design'],
    specifications: {
      'Metal Type': '14k Yellow Gold',
      'Ruby Weight': '0.75 ct',
      'Diamond Weight': '0.25 ct',
      'Pendant Size': '15mm'
    },
    rating: 4.9,
    reviewCount: 89,
    tags: ['ruby', 'romantic', 'luxury', 'colored-stone']
  },

  // BRACELETS WITH VARIANTS

  // LHBD3786A-ET - Emerald Cut Diamond Eternity Bracelet
  {
    id: 'lhbd3786a-et',
    name: 'Emerald Cut Diamond Eternity Bracelet',
    description: 'Sophisticated eternity bracelet featuring emerald-cut diamonds in a continuous setting. The elongated emerald cuts create extraordinary brilliance and a distinctly elegant aesthetic.',
    category: 'bracelets',
    subcategory: 'tennis',
    basePrice: 2485,
    originalPrice: 2850,
    defaultVariant: 'lhbd3786a-et-y',
    variants: [
      {
        id: 'lhbd3786a-et-y',
        name: 'Yellow Gold',
        metal: '14k Yellow Gold',
        images: ['/images/products/LHBD3786A-ET-Y.jpg'],
        inStock: true,
        sku: 'LHBD3786A-ET-Y'
      },
      {
        id: 'lhbd3786a-et-r',
        name: 'Rose Gold',
        metal: '14k Rose Gold',
        images: ['/images/products/LHBD3786A-ET-R.jpg'],
        inStock: true,
        sku: 'LHBD3786A-ET-R'
      }
    ],
    allImages: [
      '/images/products/LHBD3786A-ET-Y.jpg',
      '/images/products/LHBD3786A-ET-R.jpg'
    ],
    materials: ['14k Gold', 'Diamond'],
    features: ['Emerald Cut Diamonds', 'Eternity Style', 'Continuous Setting', 'Elegant Proportions'],
    specifications: {
      'Metal Options': '14k Rose or Yellow Gold',
      'Diamond Shape': 'Emerald Cut',
      'Total Diamond Weight': '5.0 ct',
      'Bracelet Length': '7 inches'
    },
    rating: 4.9,
    reviewCount: 124,
    tags: ['luxury', 'emerald-cut', 'eternity', 'sale']
  },

  // LHBD3787A - Round Diamond Tennis Bracelet
  {
    id: 'lhbd3787a',
    name: 'Round Diamond Tennis Bracelet',
    description: 'Classic tennis bracelet featuring a continuous line of round brilliant-cut diamonds. Timeless elegance that transitions seamlessly from day to evening wear.',
    category: 'bracelets',
    subcategory: 'tennis',
    basePrice: 2185,
    defaultVariant: 'lhbd3787a-y',
    variants: [
      {
        id: 'lhbd3787a-y',
        name: 'Yellow Gold',
        metal: '14k Yellow Gold',
        images: ['/images/products/LHBD3787A.jpg'],
        inStock: true,
        sku: 'LHBD3787A'
      },
      {
        id: 'lhbd3787a-r',
        name: 'Rose Gold',
        metal: '14k Rose Gold',
        images: ['/images/products/LHBD3787A-R.jpg'],
        inStock: true,
        sku: 'LHBD3787A-R'
      }
    ],
    allImages: [
      '/images/products/LHBD3787A.jpg',
      '/images/products/LHBD3787A-R.jpg'
    ],
    materials: ['14k Gold', 'Diamond'],
    features: ['Round Brilliant Diamonds', 'Tennis Style', 'Secure Clasp', 'Classic Design'],
    specifications: {
      'Metal Options': '14k Rose or Yellow Gold',
      'Diamond Count': '28 stones',
      'Total Diamond Weight': '4.2 ct',
      'Bracelet Length': '7 inches'
    },
    rating: 4.8,
    reviewCount: 167,
    tags: ['classic', 'tennis', 'brilliant-cut']
  },

  // LHBD3788A - Multi-Tone Diamond Statement Bracelet
  {
    id: 'lhbd3788a',
    name: 'Multi-Tone Diamond Statement Bracelet',
    description: 'Contemporary bracelet featuring mixed metal tones with diamond accents. This modern design combines rose, yellow, and white gold for a sophisticated tri-color effect.',
    category: 'bracelets',
    subcategory: 'statement',
    basePrice: 1685,
    defaultVariant: 'lhbd3788a-multi',
    variants: [
      {
        id: 'lhbd3788a-multi',
        name: 'Multi-Tone Gold',
        metal: '14k Multi-Tone Gold',
        images: ['/images/products/LHBD3788A-YWR.jpg'],
        inStock: true,
        sku: 'LHBD3788A-YWR'
      },
      {
        id: 'lhbd3788a-y',
        name: 'Yellow Gold',
        metal: '14k Yellow Gold',
        images: ['/images/products/LHBD3788A-Y.jpg'],
        inStock: true,
        sku: 'LHBD3788A-Y'
      },
      {
        id: 'lhbd3788a-r',
        name: 'Rose Gold',
        metal: '14k Rose Gold',
        images: ['/images/products/LHBD3788A-R.jpg'],
        inStock: true,
        sku: 'LHBD3788A-R'
      },
      {
        id: 'lhbd3788a-w',
        name: 'White Gold',
        metal: '14k White Gold',
        images: ['/images/products/LHBD3788A-W.jpg'],
        inStock: true,
        sku: 'LHBD3788A-W'
      }
    ],
    allImages: [
      '/images/products/LHBD3788A-R.jpg',
      '/images/products/LHBD3788A-W.jpg',
      '/images/products/LHBD3788A-Y.jpg',
      '/images/products/LHBD3788A-YWR.jpg'
    ],
    materials: ['14k Multi-Tone Gold', 'Diamond'],
    features: ['Tri-Color Gold', 'Diamond Accents', 'Contemporary Design', 'Statement Piece'],
    specifications: {
      'Metal Composition': 'Rose, Yellow & White Gold',
      'Diamond Weight': '0.85 ct',
      'Bracelet Length': '7.5 inches',
      'Width': '8-12mm graduated'
    },
    rating: 4.7,
    reviewCount: 94,
    tags: ['statement', 'multi-tone', 'contemporary']
  },

  // LHBD3839A - Vintage-Inspired Diamond Bracelet
  {
    id: 'lhbd3839a-bracelet',
    name: 'Vintage-Inspired Diamond Bracelet',
    description: 'Art Deco-inspired diamond bracelet with geometric patterns and milgrain detailing. This vintage-style piece captures the glamour of the 1920s with modern craftsmanship.',
    category: 'bracelets',
    subcategory: 'vintage',
    basePrice: 1385,
    originalPrice: 1585,
    defaultVariant: 'lhbd3839a-bracelet-w',
    variants: [
      {
        id: 'lhbd3839a-bracelet-w',
        name: 'White Gold',
        metal: '14k White Gold',
        images: ['/images/products/LHBD3839A-BRACELET.jpg'],
        inStock: true,
        sku: 'LHBD3839A-BRACELET-W'
      }
    ],
    allImages: [
      '/images/products/LHBD3839A.jpg',
      '/images/products/LHBD3839A-V2.jpg'
    ],
    materials: ['14k White Gold', 'Diamond'],
    features: ['Art Deco Design', 'Milgrain Detail', 'Geometric Patterns', 'Vintage-Inspired'],
    specifications: {
      'Metal Type': '14k White Gold',
      'Diamond Weight': '1.25 ct',
      'Era Style': 'Art Deco',
      'Bracelet Length': '7 inches'
    },
    rating: 4.8,
    reviewCount: 156,
    tags: ['vintage', 'art-deco', 'geometric', 'sale']
  }
]

// Helper function to get all individual products from groups (for backward compatibility)
export const getProductsFromGroups = () => {
  const products = []
  
  for (const group of productGroups) {
    // Create products for each variant
    for (const variant of group.variants) {
      products.push({
        id: variant.id,
        name: `${group.name} - ${variant.name}`,
        price: variant.price || group.basePrice,
        originalPrice: variant.originalPrice || group.originalPrice,
        description: group.description,
        category: group.category,
        subcategory: group.subcategory,
        images: variant.images,
        materials: [...group.materials, variant.metal],
        features: group.features,
        specifications: group.specifications,
        inStock: variant.inStock,
        rating: group.rating,
        reviewCount: group.reviewCount,
        tags: group.tags,
        sku: variant.sku,
        metal: variant.metal,
        // Additional fields for variant support
        parentId: group.id,
        variants: group.variants,
        isGrouped: true
      })
    }
    
    // Also create a main product entry with default variant
    const defaultVariant = group.variants.find(v => v.id === group.defaultVariant) || group.variants[0]
    products.push({
      id: group.id,
      name: group.name,
      price: defaultVariant.price || group.basePrice,
      originalPrice: defaultVariant.originalPrice || group.originalPrice,
      description: group.description,
      category: group.category,
      subcategory: group.subcategory,
      images: group.allImages,
      materials: group.materials,
      features: group.features,
      specifications: group.specifications,
      inStock: defaultVariant.inStock,
      rating: group.rating,
      reviewCount: group.reviewCount,
      tags: group.tags,
      sku: defaultVariant.sku,
      metal: defaultVariant.metal,
      variants: group.variants,
      isGrouped: true
    })
  }
  
  return products
}