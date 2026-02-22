import { ExternalLink, ShoppingCart, Star } from "lucide-react"
import { products } from "../data/products"
import { getAffiliateLink, trackAffiliateClick } from "../lib/affiliate"

type Props = {
  productId: string
}

function parsePriceEUR(price: string) {
  const n = parseFloat(price.replace("€", "").trim().replace(".", "").replace(",", "."))
  return Number.isFinite(n) ? n : 0
}

export default function ProductCard({ productId }: Props) {
  const p: any = products.find((x: any) => x.id === productId)

  if (!p) {
    return (
      <div className="bg-white rounded-3xl p-5 shadow-soft border border-cream">
        <p className="font-nunito text-sm text-warm-brown/70">
          Produkt nicht gefunden: <span className="font-semibold">{productId}</span>
        </p>
      </div>
    )
  }

  const affiliate = getAffiliateLink(p.id, p.affiliateLink ?? "#")
  const isDeal = parsePriceEUR(p.oldPrice) > parsePriceEUR(p.price)

  return (
    <div className="bg-white rounded-3xl overflow-hidden shadow-soft border border-cream">
      <div className="grid md:grid-cols-[140px_1fr] gap-0">
        {/* Image */}
        <div className="h-44 md:h-full bg-cream overflow-hidden">
          <img src={p.image} alt={p.name} className="w-full h-full object-cover" loading="lazy" />
        </div>

        {/* Content */}
        <div className="p-5">
          <div className="flex items-start justify-between gap-3">
            <div>
              <h3 className="font-fredoka text-lg font-semibold text-warm-brown">
                {p.name}
              </h3>
              <p className="font-nunito text-sm text-warm-brown/60 mt-1">
                {p.description}
              </p>

              {/* Rating */}
              <div className="flex items-center gap-2 mt-3">
                <Star className="w-4 h-4 text-peach" />
                <span className="font-nunito text-sm text-warm-brown/70">
                  {p.rating} ({p.reviews})
                </span>

                {isDeal ? (
                  <span className="ml-2 inline-flex bg-mint-green text-white text-xs font-nunito font-bold px-2 py-1 rounded-lg">
                    Deal
                  </span>
                ) : null}
              </div>
            </div>

            {/* Price */}
            <div className="text-right shrink-0">
              <div className="font-fredoka text-xl font-bold text-petal-pink">
                {p.price}
              </div>
              <div className="font-nunito text-sm text-warm-brown/40 line-through">
                {p.oldPrice}
              </div>
            </div>
          </div>

          {/* CTA */}
          <a
            href={affiliate}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => trackAffiliateClick(p.id)}
            className="mt-4 inline-flex items-center justify-center gap-2 w-full bg-gradient-to-r from-petal-pink to-peach text-white font-fredoka font-medium py-3 rounded-xl hover:shadow-pet transition-all duration-300 hover:-translate-y-0.5"
          >
            <ShoppingCart className="w-4 h-4" />
            Preis ansehen
            <ExternalLink className="w-4 h-4" />
          </a>

          {/* Disclosure */}
          <p className="mt-3 text-xs font-nunito text-warm-brown/50">
            * Affiliate-Link: Bei Kauf über diesen Link erhalten wir eine kleine Provision. Für dich entstehen keine Mehrkosten.
          </p>
        </div>
      </div>
    </div>
  )
}