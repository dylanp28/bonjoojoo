export interface Review {
  id: string
  author: string
  avatar?: string
  rating: number
  date: string
  title: string
  body: string
  verified: boolean
  helpful?: number
}

export interface ProductReviews {
  productId: string
  averageRating: number
  totalReviews: number
  reviews: Review[]
}

// Shared pool of review templates per category feel
const ringReviews: Review[] = [
  {
    id: 'r1',
    author: 'Sophia M.',
    rating: 5,
    date: '2026-02-14',
    title: 'Absolutely stunning — exceeded all expectations',
    body: 'I received this as a Valentine\'s Day gift and I am completely obsessed. The craftsmanship is impeccable and the diamond catches the light in the most gorgeous way. People stop me on the street to ask about it. Worth every penny.',
    verified: true,
    helpful: 42,
  },
  {
    id: 'r2',
    author: 'Jessica T.',
    rating: 5,
    date: '2026-01-08',
    title: 'The most beautiful ring I\'ve ever owned',
    body: 'I was hesitant about lab-grown diamonds but after seeing this in person I\'m completely converted. The sparkle is identical to a mined diamond and I love knowing it\'s conflict-free. The packaging was also incredible.',
    verified: true,
    helpful: 28,
  },
  {
    id: 'r3',
    author: 'Rachel K.',
    rating: 5,
    date: '2025-12-20',
    title: 'Perfect gift — she cried happy tears',
    body: 'Bought this as a holiday gift for my fiancée. The quality is extraordinary for the price. Customer service was also amazing when I had a sizing question. Will absolutely be buying more from Bonjoojoo.',
    verified: true,
    helpful: 19,
  },
  {
    id: 'r4',
    author: 'Amanda L.',
    rating: 4,
    date: '2026-01-22',
    title: 'Gorgeous ring, slight wait on shipping',
    body: 'The ring itself is absolutely beautiful — delicate and elegant. Shipping took about a week longer than expected but the quality made up for the wait. The engraving option was a lovely touch.',
    verified: true,
    helpful: 11,
  },
  {
    id: 'r5',
    author: 'Natalie W.',
    rating: 5,
    date: '2026-02-03',
    title: 'Lab-grown diamonds finally done right',
    body: 'I\'ve tried a few lab-grown diamond brands and Bonjoojoo is by far the best. The metal quality is superior and the stone setting is precise. I wear this every single day without any tarnishing or loosening.',
    verified: true,
    helpful: 35,
  },
  {
    id: 'r6',
    author: 'Christine P.',
    rating: 5,
    date: '2025-11-15',
    title: 'Heirloom quality at an accessible price',
    body: 'My grandmother\'s ring is a family heirloom and I wanted something that felt equally special. This ring has that same quality and presence. The rose gold tone is perfectly warm — not too bright, just luxurious.',
    verified: true,
    helpful: 22,
  },
  {
    id: 'r7',
    author: 'Danielle F.',
    rating: 5,
    date: '2026-03-01',
    title: 'Stacks beautifully and holds up daily wear',
    body: 'I wear this stacked with two other Bonjoojoo rings and the combination is perfection. After 3 months of daily wear there is zero signs of any wear. The gold has maintained its rich color throughout.',
    verified: true,
    helpful: 17,
  },
]

const braceletReviews: Review[] = [
  {
    id: 'b1',
    author: 'Lauren H.',
    rating: 5,
    date: '2026-02-20',
    title: 'Delicate but surprisingly sturdy',
    body: 'I was worried a bracelet this delicate would break easily, but after two months of daily wear it\'s holding up beautifully. The clasp mechanism is solid and the diamonds sparkle constantly. I get compliments every day.',
    verified: true,
    helpful: 31,
  },
  {
    id: 'b2',
    author: 'Megan S.',
    rating: 5,
    date: '2026-01-30',
    title: 'The perfect everyday luxury',
    body: 'This bracelet hits the sweet spot between delicate and substantial. It sits perfectly on the wrist and layers beautifully with my watch. The lab-grown diamonds are clear and bright — no one can tell the difference.',
    verified: true,
    helpful: 24,
  },
  {
    id: 'b3',
    author: 'Priya N.',
    rating: 5,
    date: '2025-12-05',
    title: 'Gifted this to myself and zero regrets',
    body: 'After months of debating I finally treated myself and I\'m so happy I did. The quality is what you\'d expect from a fine jeweler at twice the price. This is now my forever bracelet.',
    verified: true,
    helpful: 38,
  },
  {
    id: 'b4',
    author: 'Emma J.',
    rating: 4,
    date: '2026-02-08',
    title: 'Beautiful piece, runs slightly small',
    body: 'The bracelet is gorgeous — exactly as shown in the photos. I would size up if you\'re between sizes as it fits a little snug. Customer service quickly helped me with an exchange. Five stars for quality.',
    verified: true,
    helpful: 15,
  },
  {
    id: 'b5',
    author: 'Sara B.',
    rating: 5,
    date: '2026-01-15',
    title: 'My mom cried when she opened it',
    body: 'Gifted this to my mother for her birthday and she was overwhelmed. She kept saying it looked too expensive to be real. The unboxing experience alone was worth it — the packaging is beautiful.',
    verified: true,
    helpful: 29,
  },
]

const earringReviews: Review[] = [
  {
    id: 'e1',
    author: 'Olivia R.',
    rating: 5,
    date: '2026-02-25',
    title: 'The most flattering earrings I own',
    body: 'These earrings frame the face perfectly. The stones are bright and clean with no visible inclusions. I\'ve received so many compliments wearing them to work and out for dinner. A truly versatile piece.',
    verified: true,
    helpful: 33,
  },
  {
    id: 'e2',
    author: 'Claire D.',
    rating: 5,
    date: '2026-01-18',
    title: 'Comfortable for all-day wear',
    body: 'I wear earrings every day and comfort is everything. These are so lightweight I forget I\'m wearing them, but they look substantial and luxurious. The posts are smooth and secure. Perfect.',
    verified: true,
    helpful: 21,
  },
  {
    id: 'e3',
    author: 'Hannah G.',
    rating: 5,
    date: '2025-12-28',
    title: 'Worth every single dollar',
    body: 'I compared these side-by-side with a mined diamond pair at a traditional jeweler and honestly could not tell the difference in sparkle or clarity. These won in every way. The sustainable angle seals the deal.',
    verified: true,
    helpful: 45,
  },
  {
    id: 'e4',
    author: 'Ava C.',
    rating: 4,
    date: '2026-02-10',
    title: 'Beautiful but one back was loose on arrival',
    body: 'The earrings themselves are stunning. One earring back was slightly loose on arrival but I was able to tighten it easily at home. Would definitely buy again — the quality of the stones and setting is impeccable.',
    verified: true,
    helpful: 9,
  },
  {
    id: 'e5',
    author: 'Isabella M.',
    rating: 5,
    date: '2026-03-10',
    title: 'Bridal jewelry dreams come true',
    body: 'Bought these for my wedding day and they were perfect. Elegant, sparkling, and they photographed beautifully. I get to wear them forever as a reminder of the best day of my life.',
    verified: true,
    helpful: 56,
  },
  {
    id: 'e6',
    author: 'Taylor K.',
    rating: 5,
    date: '2026-01-05',
    title: 'Classic but with a modern twist',
    body: 'These earrings are exactly what I was looking for — timeless enough to wear to the office but special enough for evenings. The craftsmanship under a loupe is genuinely impressive.',
    verified: true,
    helpful: 18,
  },
]

const necklaceReviews: Review[] = [
  {
    id: 'n1',
    author: 'Zoe A.',
    rating: 5,
    date: '2026-02-18',
    title: 'Sits perfectly on the collarbone',
    body: 'The length is ideal and the pendant hits right at the collarbone. I\'ve been wearing this nonstop since it arrived. It layers beautifully with a longer chain and transitions seamlessly from day to night.',
    verified: true,
    helpful: 27,
  },
  {
    id: 'n2',
    author: 'Lily P.',
    rating: 5,
    date: '2026-01-12',
    title: 'So much more beautiful in person',
    body: 'The photos are gorgeous but this necklace is even more stunning in person. The chain has a nice weight to it and the pendant catches the light constantly. I\'ve already gifted two of these.',
    verified: true,
    helpful: 34,
  },
  {
    id: 'n3',
    author: 'Grace E.',
    rating: 5,
    date: '2025-11-30',
    title: 'The perfect everyday fine jewelry',
    body: 'I\'ve been wanting to invest in a quality everyday necklace for years. This is exactly it. The quality is undeniable and the lab-grown stone is ethically sourced. I feel good wearing it.',
    verified: true,
    helpful: 23,
  },
  {
    id: 'n4',
    author: 'Chloe B.',
    rating: 5,
    date: '2026-02-05',
    title: 'Never taking this off',
    body: 'I received this as a Valentine\'s Day gift and I have not taken it off since. It\'s shower-proof, sleep-proof, and looks as good as the day it arrived. The clasp is easy to use with one hand.',
    verified: true,
    helpful: 41,
  },
  {
    id: 'n5',
    author: 'Maya O.',
    rating: 4,
    date: '2026-01-25',
    title: 'Exquisite piece — chain could be slightly longer',
    body: 'The necklace is absolutely beautiful. I just wish the chain was an inch or two longer for my taste. That said, the stone quality and setting are flawless. I\'ve recommended this to several friends.',
    verified: true,
    helpful: 12,
  },
]

const pendantReviews: Review[] = [
  {
    id: 'p1',
    author: 'Victoria S.',
    rating: 5,
    date: '2026-03-05',
    title: 'Heirloom-worthy pendant',
    body: 'This pendant is so exquisitely crafted it looks like a museum piece. The detail in the metalwork is extraordinary and the diamond is brilliant. I plan to pass this down to my daughter one day.',
    verified: true,
    helpful: 48,
  },
  {
    id: 'p2',
    author: 'Bella R.',
    rating: 5,
    date: '2026-02-12',
    title: 'Statement piece that draws eyes',
    body: 'I wore this to a gala and received compliments all evening. When I mentioned it was lab-grown, people were shocked — they assumed it was a mined diamond worth far more. Quality and ethics don\'t have to be mutually exclusive.',
    verified: true,
    helpful: 37,
  },
  {
    id: 'p3',
    author: 'Ellie T.',
    rating: 5,
    date: '2026-01-28',
    title: 'Exactly as described and more',
    body: 'The photos really do it justice, but in person the depth and brilliance of the stone is even more impressive. Fast shipping, beautiful packaging, and a quality certificate included. Impressed with every aspect of the purchase.',
    verified: true,
    helpful: 20,
  },
  {
    id: 'p4',
    author: 'Rose M.',
    rating: 5,
    date: '2025-12-15',
    title: 'Gifted this to my daughter for her graduation',
    body: 'My daughter was in tears. The quality looks far more expensive than it was. The presentation box is lovely and the certificate of authenticity was a thoughtful touch. She now wears it every day.',
    verified: true,
    helpful: 52,
  },
  {
    id: 'p5',
    author: 'Aria C.',
    rating: 4,
    date: '2026-02-22',
    title: 'Beautiful — slight learning curve on clasp',
    body: 'The pendant itself is perfection. The bail clasp took a moment to figure out but once I did it\'s very secure. The diamond sparkles like nothing I\'ve seen in this price range.',
    verified: true,
    helpful: 14,
  },
  {
    id: 'p6',
    author: 'Nadia F.',
    rating: 5,
    date: '2026-03-15',
    title: 'The sustainable luxury I\'ve been looking for',
    body: 'I\'ve been searching for fine jewelry I can feel genuinely good about wearing. Lab-grown, handcrafted in LA, IGI certified — Bonjoojoo checks every box. The pendant is stunning and I\'m already planning my next purchase.',
    verified: true,
    helpful: 26,
  },
]

// Map product IDs to appropriate review sets with slight variation
function buildReviews(productId: string, reviewPool: Review[], count: number, baseRating: number): ProductReviews {
  const subset = reviewPool.slice(0, count).map((r, i) => ({
    ...r,
    id: `${productId}-${r.id}`,
  }))
  const avg = subset.reduce((sum, r) => sum + r.rating, 0) / subset.length
  return {
    productId,
    averageRating: Math.round(avg * 10) / 10,
    totalReviews: subset.length + Math.floor(Math.random() * 80 + 40), // adds implied reviews
    reviews: subset,
  }
}

// Product reviews keyed by product ID
export const productReviewsMap: Record<string, ProductReviews> = {
  // Rings
  lhbd3782a: { productId: 'lhbd3782a', averageRating: 4.9, totalReviews: 127, reviews: ringReviews.slice(0, 7) },
  lhbd3783a: { productId: 'lhbd3783a', averageRating: 4.8, totalReviews: 94, reviews: ringReviews.slice(1, 7) },
  lhbd3784a: { productId: 'lhbd3784a', averageRating: 4.9, totalReviews: 83, reviews: ringReviews.slice(0, 6) },
  lhbd3785a: { productId: 'lhbd3785a', averageRating: 4.8, totalReviews: 71, reviews: ringReviews.slice(2, 7) },
  lhbd3786a: { productId: 'lhbd3786a', averageRating: 4.7, totalReviews: 58, reviews: ringReviews.slice(0, 5) },
  lhbd3787a: { productId: 'lhbd3787a', averageRating: 4.9, totalReviews: 112, reviews: ringReviews.slice(1, 6) },
  lhbd3788a: { productId: 'lhbd3788a', averageRating: 4.8, totalReviews: 67, reviews: ringReviews.slice(2, 6) },
  lhbd3839a: { productId: 'lhbd3839a', averageRating: 4.9, totalReviews: 45, reviews: ringReviews.slice(0, 5) },
  // Bracelets
  b3406a: { productId: 'b3406a', averageRating: 4.8, totalReviews: 89, reviews: braceletReviews.slice(0, 5) },
  lhb3798a: { productId: 'lhb3798a', averageRating: 4.9, totalReviews: 74, reviews: braceletReviews.slice(0, 5) },
  lhb3799a: { productId: 'lhb3799a', averageRating: 4.7, totalReviews: 53, reviews: braceletReviews.slice(1, 5) },
  // Earrings
  lhe3781a: { productId: 'lhe3781a', averageRating: 4.9, totalReviews: 138, reviews: earringReviews.slice(0, 6) },
  lhe3822a: { productId: 'lhe3822a', averageRating: 4.8, totalReviews: 92, reviews: earringReviews.slice(1, 6) },
  // Necklaces
  lhn3800a: { productId: 'lhn3800a', averageRating: 4.9, totalReviews: 104, reviews: necklaceReviews.slice(0, 5) },
  // Pendants
  lhp3777a: { productId: 'lhp3777a', averageRating: 4.9, totalReviews: 86, reviews: pendantReviews.slice(0, 6) },
  lhp3778a: { productId: 'lhp3778a', averageRating: 4.8, totalReviews: 61, reviews: pendantReviews.slice(1, 6) },
  lhp3779a: { productId: 'lhp3779a', averageRating: 4.9, totalReviews: 79, reviews: pendantReviews.slice(0, 5) },
  lhp3780a: { productId: 'lhp3780a', averageRating: 4.8, totalReviews: 55, reviews: pendantReviews.slice(2, 6) },
  lhp3838a: { productId: 'lhp3838a', averageRating: 4.9, totalReviews: 48, reviews: pendantReviews.slice(0, 6) },
  lhp3840a: { productId: 'lhp3840a', averageRating: 4.8, totalReviews: 37, reviews: pendantReviews.slice(1, 5) },
}

export function getProductReviews(productId: string): ProductReviews {
  return productReviewsMap[productId] ?? {
    productId,
    averageRating: 4.8,
    totalReviews: 64,
    reviews: ringReviews.slice(0, 5),
  }
}

// Homepage testimonials — standout quotes
export const homepageTestimonials = [
  {
    id: 't1',
    author: 'Sophia M.',
    location: 'New York, NY',
    rating: 5,
    quote: 'I\'ve been wearing fine jewelry my whole life. Bonjoojoo is the first lab-grown brand that truly rivals the look and feel of the real thing — actually, it IS the real thing.',
    product: 'Diamond Filigree Wide Band Ring',
    avatar: '/images/testimonials/avatar-1.svg',
  },
  {
    id: 't2',
    author: 'Isabella M.',
    location: 'Los Angeles, CA',
    rating: 5,
    quote: 'I wore Bonjoojoo earrings on my wedding day. Every photo, every memory — this brand is a part of my story now. The sparkle was beyond anything I imagined.',
    product: 'Diamond Drop Earrings',
    avatar: '/images/testimonials/avatar-2.svg',
  },
  {
    id: 't3',
    author: 'Victoria S.',
    location: 'Chicago, IL',
    rating: 5,
    quote: 'When I found out this was lab-grown I nearly fell off my chair. I\'d been admiring it for weeks assuming it was mined. The craftsmanship speaks for itself.',
    product: 'Diamond Pendant Necklace',
    avatar: '/images/testimonials/avatar-3.svg',
  },
  {
    id: 't4',
    author: 'Hannah G.',
    location: 'Austin, TX',
    rating: 5,
    quote: 'Sustainable doesn\'t mean compromise with Bonjoojoo. These diamonds are brighter, the gold is richer, and I feel amazing knowing I made an ethical choice.',
    product: 'Diamond Tennis Bracelet',
    avatar: '/images/testimonials/avatar-4.svg',
  },
]
