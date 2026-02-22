// src/lib/affiliate.ts

const affiliateLinks: Record<string, string> = {
// "premium-hundefutter": "https://example.com/dein-affiliate-link",
}

export function getAffiliateLink(productId: string, fallback: string = "#") {
return affiliateLinks[productId] ?? fallback
}

// Optional: später Tracking.
// Damit TypeScript nicht meckert, nutzen wir productId einmal.
export function trackAffiliateClick(productId: string) {
void productId
}