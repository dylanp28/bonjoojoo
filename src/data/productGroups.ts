import { ProductGroup } from '@/types/product'
import { ringProducts } from './products/rings'
import { braceletProducts } from './products/bracelets'
import { earringProducts } from './products/earrings'
import { necklaceProducts } from './products/necklaces'
import { pendantProducts } from './products/pendants'

export const productGroups: ProductGroup[] = [
  ...ringProducts,
  ...braceletProducts,
  ...earringProducts,
  ...necklaceProducts,
  ...pendantProducts,
]
