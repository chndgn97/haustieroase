// src/sections/Products.tsx
import { Link } from "react-router-dom"
import { useEffect, useRef, useState } from "react"
import { Star, ShoppingCart, Heart, ExternalLink, TrendingUp } from "lucide-react"
import { Button } from "@/components/ui/button"
import { products } from "../data/products"

const Products = () => {
  const [visibleCards, setVisibleCards] = useState<number[]>([])
  const [likedProducts, setLikedProducts] = useState<string[]>([])
  const [hoveredProduct, setHoveredProduct] = useState<string | null>(null)
  const cardRefs = useRef<(HTMLDivElement | null)[]>([])

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = cardRefs.current.indexOf(entry.target as HTMLDivElement)
            if (index !== -1 && !visibleCards.includes(index)) {
              setVisibleCards((prev) => [...prev, index])
            }
          }
        })
      },
      { threshold: 0.15, rootMargin: "0px 0px -50px 0px" }
    )

    cardRefs.current.forEach((ref) => {
      if (ref) observer.observe(ref)
    })

    return () => observer.disconnect()
  }, [visibleCards])

  const toggleLike = (id: string) => {
    setLikedProducts((prev) => (prev.includes(id) ? prev.filter((p) => p !== id) : [...prev, id]))
  }

  return (
    <section id="products" className="py-20 lg:py-32 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-warm-white via-cream to-warm-white" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-petal-pink/10 rounded-full px-4 py-2 mb-6">
            <TrendingUp className="w-4 h-4 text-petal-pink" />
            <span className="text-sm font-nunito font-semibold text-petal-pink">
              Beliebt bei unseren Lesern
            </span>
          </div>
          <h2 className="font-fredoka text-3xl sm:text-4xl lg:text-5xl font-bold text-warm-brown mb-6">
            Beliebte <span className="text-gradient">Produkte</span>
          </h2>
          <p className="font-nunito text-lg text-warm-brown/70 max-w-2xl mx-auto">
            Unsere handverlesenen Empfehlungen – getestet und für gut befunden von der HaustierOase-Community.
          </p>
        </div>

        {/* Products Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {products.map((product, index) => {
            const isVisible = visibleCards.includes(index)
            const isLiked = likedProducts.includes(product.id)
            const isHovered = hoveredProduct === product.id

            return (
              <div
                key={product.id}
                ref={(el) => {
                  cardRefs.current[index] = el
                }}
                className={`group relative bg-white rounded-3xl overflow-hidden shadow-soft hover:shadow-pet-hover transition-all duration-500 ${
                  isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                }`}
                style={{ transitionDelay: `${index * 0.1}s` }}
                onMouseEnter={() => setHoveredProduct(product.id)}
                onMouseLeave={() => setHoveredProduct(null)}
              >
                {/* Image Container */}
                <div className="relative h-56 overflow-hidden bg-cream">
                  <img
                    src={product.image}
                    alt={product.name}
                    className={`w-full h-full object-cover transition-transform duration-700 ${
                      isHovered ? "scale-110" : "scale-100"
                    }`}
                  />

                  {/* Badge */}
                  <div
                    className={`absolute top-3 left-3 ${product.badgeColor} text-white text-xs font-nunito font-bold px-3 py-1 rounded-full`}
                  >
                    {product.badge}
                  </div>

                  {/* Like Button */}
                  <button
                    onClick={() => toggleLike(product.id)}
                    className={`absolute top-3 right-3 w-9 h-9 rounded-full flex items-center justify-center transition-all duration-300 ${
                      isLiked
                        ? "bg-petal-pink text-white"
                        : "bg-white/90 backdrop-blur-sm text-warm-brown hover:bg-white"
                    }`}
                    aria-label="Produkt merken"
                    type="button"
                  >
                    <Heart className={`w-4 h-4 ${isLiked ? "fill-current" : ""}`} />
                  </button>

                  {/* Quick Action Overlay */}
                  <div
                    className={`absolute inset-0 bg-warm-brown/40 flex items-center justify-center transition-opacity duration-300 ${
                      isHovered ? "opacity-100" : "opacity-0"
                    }`}
                  >
                    <Link to={`/produkt/${product.id}`} className="transform translate-y-2 group-hover:translate-y-0">
                      <Button
                        size="sm"
                        className="bg-white text-warm-brown font-fredoka font-medium rounded-full px-4 hover:bg-petal-pink hover:text-white transition-all duration-300"
                      >
                        <ExternalLink className="w-4 h-4 mr-2" />
                        Details
                      </Button>
                    </Link>
                  </div>
                </div>

                {/* Content */}
                <div className="p-5">
                  {/* Rating */}
                  <div className="flex items-center gap-2 mb-2">
                    <div className="flex items-center gap-0.5">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`w-3.5 h-3.5 ${
                            i < Math.floor(product.rating) ? "text-peach fill-peach" : "text-gray-200"
                          }`}
                        />
                      ))}
                    </div>
                    <span className="text-xs font-nunito text-warm-brown/60">
                      {product.rating} ({product.reviews})
                    </span>
                  </div>

                  {/* Name & Description */}
                  <h3 className="font-fredoka text-lg font-semibold text-warm-brown mb-1 group-hover:text-petal-pink transition-colors">
                    {product.name}
                  </h3>
                  <p className="font-nunito text-sm text-warm-brown/60 mb-3">{product.description}</p>

                  {/* Price */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="font-fredoka text-xl font-bold text-petal-pink">{product.price}</span>
                      <span className="font-nunito text-sm text-warm-brown/40 line-through">{product.oldPrice}</span>
                    </div>
                  </div>

                  {/* Affiliate Button (extern) */}
                  <a
                    href={product.affiliateLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-4 flex items-center justify-center gap-2 w-full bg-gradient-to-r from-petal-pink to-peach text-white font-fredoka font-medium py-3 rounded-xl hover:shadow-pet transition-all duration-300 hover:-translate-y-0.5 group/btn"
                  >
                    <ShoppingCart className="w-4 h-4" />
                    Jetzt kaufen
                    <ExternalLink className="w-3.5 h-3.5 opacity-0 group-hover/btn:opacity-100 transition-opacity" />
                  </a>
                </div>

                {/* Savings Badge */}
                <div className="absolute bottom-24 right-4 bg-mint-green text-white text-xs font-nunito font-bold px-2 py-1 rounded-lg">
                  -
                  {Math.round(
                    ((parseFloat(product.oldPrice.replace(",", ".").replace(" €", "")) -
                      parseFloat(product.price.replace(",", ".").replace(" €", ""))) /
                      parseFloat(product.oldPrice.replace(",", ".").replace(" €", ""))) *
                      100
                  )}
                  %
                </div>
              </div>
            )
          })}
        </div>

        {/* Trust Badges */}
        <div className="mt-16 flex flex-wrap justify-center gap-8">
          {[
            { icon: Star, text: "Geprüfte Qualität" },
            { icon: ShoppingCart, text: "Sicherer Kauf" },
            { icon: Heart, text: "Mit Liebe ausgewählt" },
          ].map((badge) => {
            const Icon = badge.icon
            return (
              <div key={badge.text} className="flex items-center gap-3 text-warm-brown/60">
                <div className="w-10 h-10 rounded-full bg-white shadow-soft flex items-center justify-center">
                  <Icon className="w-5 h-5 text-petal-pink" />
                </div>
                <span className="font-nunito font-medium">{badge.text}</span>
              </div>
            )
          })}
        </div>

        {/* Disclaimer */}
        <p className="text-center mt-8 text-xs font-nunito text-warm-brown/50">
          * Affiliate-Links: Bei Kauf über diese Links erhalten wir eine kleine Provision. Für dich entstehen keine
          zusätzlichen Kosten.
        </p>
      </div>
    </section>
  )
}

export default Products
