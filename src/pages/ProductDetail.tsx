import { useParams, Link } from "react-router-dom"
import { products } from "../data/products"
import { Button } from "@/components/ui/button"
import { ExternalLink } from "lucide-react"

export default function ProductDetail() {
  const { id } = useParams()

  const product = products.find((p) => p.id === id)

  if (!product) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-16">
        <h1 className="font-fredoka text-3xl text-warm-brown mb-4">Produkt nicht gefunden</h1>
        <p className="font-nunito text-warm-brown/70 mb-6">
          Tipp: Prüfe, ob die ID in <code>src/data/products.ts</code> exakt stimmt.
        </p>
        <Link to="/" className="text-petal-pink underline">Zurück zur Startseite</Link>
      </div>
    )
  }

  return (
    <div className="max-w-5xl mx-auto px-4 py-12">
      <Link to="/" className="text-sm text-warm-brown/60 hover:text-petal-pink">
        ← Zurück
      </Link>

      <div className="mt-6 grid lg:grid-cols-2 gap-10">
        <div className="bg-cream rounded-3xl overflow-hidden">
          <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
        </div>

        <div>
          <div className={`inline-flex ${product.badgeColor} text-white text-xs font-nunito font-bold px-3 py-1 rounded-full`}>
            {product.badge}
          </div>

          <h1 className="font-fredoka text-3xl lg:text-4xl font-bold text-warm-brown mt-4">
            {product.name}
          </h1>

          <p className="font-nunito text-warm-brown/70 mt-4">
            {product.description}
          </p>

          <div className="mt-6 flex items-end gap-3">
            <span className="font-fredoka text-3xl font-bold text-petal-pink">{product.price}</span>
            <span className="font-nunito text-warm-brown/40 line-through">{product.oldPrice}</span>
          </div>

          <a href={product.affiliateLink} target="_blank" rel="noopener noreferrer" className="inline-block mt-8">
            <Button className="rounded-xl bg-gradient-to-r from-petal-pink to-peach text-white font-fredoka">
              Jetzt kaufen <ExternalLink className="w-4 h-4 ml-2" />
            </Button>
          </a>

          <p className="mt-6 text-xs font-nunito text-warm-brown/50">
            * Affiliate-Link: Bei Kauf über diesen Link erhalten wir eine kleine Provision. Keine Mehrkosten für dich.
          </p>
        </div>
      </div>
    </div>
  )
}
