/**
 * Mock inventory utilities — deterministic so the same product always shows
 * the same stock count across page loads, without needing a database.
 */

function hashId(id: string, seed: number): number {
  let h = seed
  for (let i = 0; i < id.length; i++) {
    h = Math.imul(h ^ id.charCodeAt(i), 0x9e3779b9) >>> 0
  }
  return h
}

/** Returns a mock stock count (1–12) seeded from the product/variant ID. */
export function getMockStockCount(productId: string): number {
  return (hashId(productId, 0x12345678) % 12) + 1
}

/**
 * Returns a mock "sold in last 24h" count for popular products,
 * or null if the product shouldn't show this badge (~40% show it).
 */
export function getMockSoldYesterday(productId: string): number | null {
  const h = hashId(productId, 0xdeadbeef)
  if (h % 10 < 4) return null // ~40% no badge
  return (h % 80) + 20 // 20–99
}
