// src/lib/affiliate.ts

// Hier trägst du später pro Produkt den Affiliate-Link ein.
// Vorteil: Du musst Links nur an EINER Stelle pflegen.
const affiliateLinks: Record<string, string> = {
  // Beispiel:
  // "premium-hundefutter": "https://example.com/dein-affiliate-link",
}

export function getAffiliateLink(productId: string, fallback: string = "#") {
  return affiliateLinks[productId] ?? fallback
}

// Optional: später Analytics/Tracking.
// Aktuell nur vorbereitet (macht nichts kaputt).
export function trackAffiliateClick(productId: string) {
  // z.B. später Plausible/GA/Event
  // console.log("affiliate_click", productId)
}