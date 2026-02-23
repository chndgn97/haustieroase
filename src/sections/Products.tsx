// src/sections/Products.tsx
import { Link, useLocation, useSearchParams } from "react-router-dom"
import { useEffect, useMemo, useRef, useState } from "react"
import {
  Star,
  ShoppingCart,
  Heart,
  ExternalLink,
  TrendingUp,
  Search,
  SlidersHorizontal,
  X,
  ChevronDown,
  ChevronUp,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { products } from "../data/products"

type SortOption = "popular" | "rating" | "price_asc" | "price_desc" | "discount"

// ✅ Produkte haben pet + type
type Product = {
  id: string
  pet: string
  type: string
  name: string
  description: string
  image: string
  price: string
  oldPrice: string
  rating: number
  reviews: number
  badge: string
  badgeColor: string
  affiliateLink: string
}

const parseEuro = (value: string) => {
  const cleaned = value.replace("€", "").trim().replace(".", "").replace(",", ".")
  const num = Number.parseFloat(cleaned)
  return Number.isFinite(num) ? num : 0
}

const discountPercent = (oldPrice: string, price: string) => {
  const oldP = parseEuro(oldPrice)
  const newP = parseEuro(price)
  if (!oldP || oldP <= 0) return 0
  const pct = ((oldP - newP) / oldP) * 100
  return Math.max(0, Math.round(pct))
}

const formatEuro = (n: number) =>
  new Intl.NumberFormat("de-DE", { style: "currency", currency: "EUR" }).format(n)

const cap = (s: string) => s.charAt(0).toUpperCase() + s.slice(1)

const labelMap: Record<string, string> = {
  hunde: "Hunde",
  katzen: "Katzen",
  kleintiere: "Kleintiere",
  voegel: "Vögel",
  aquaristik: "Aquaristik",
  alle: "Alle",

  nahrung: "Nahrung",
  spielzeug: "Spielzeug",
  pflege: "Pflege",
  schlafplatz: "Schlafplatz",
  zubehoer: "Zubehör",
}

const typeIcon: Record<string, string> = {
  nahrung: "🍖",
  spielzeug: "🧸",
  pflege: "🧼",
  schlafplatz: "🛏️",
  zubehoer: "🎒",
}

const petIcon: Record<string, string> = {
  hunde: "🐶",
  katzen: "🐱",
  kleintiere: "🐰",
  voegel: "🦜",
  aquaristik: "🐠",
}

const pretty = (v: string) => labelMap[v] ?? cap(v)
const prettyType = (t: string) => `${typeIcon[t] ? `${typeIcon[t]} ` : ""}${pretty(t)}`
const prettyPet = (p: string) => `${petIcon[p] ? `${petIcon[p]} ` : ""}${pretty(p)}`

const LS_LIKED_KEY = "haustieroase_liked_products"

const Products = () => {
  const location = useLocation()
  const isProductsPage = location.pathname === "/produkte"
  const [searchParams, setSearchParams] = useSearchParams()

  const allProducts = products as unknown as Product[]

  const [visibleCards, setVisibleCards] = useState<number[]>([])
  const [likedProducts, setLikedProducts] = useState<string[]>([])
  const [hoveredProduct, setHoveredProduct] = useState<string | null>(null)
  const cardRefs = useRef<(HTMLDivElement | null)[]>([])

  // ✅ Startseite: weniger Produkte (Mobile 4 / Desktop 8), /produkte: alle
  const [limit, setLimit] = useState<number>(() => {
    if (isProductsPage) return allProducts.length
    if (typeof window === "undefined") return 8
    return window.innerWidth < 640 ? 4 : 8
  })

  useEffect(() => {
    if (isProductsPage) {
      setLimit(allProducts.length)
      return
    }
    const updateLimit = () => setLimit(window.innerWidth < 640 ? 4 : 8)
    updateLimit()
    window.addEventListener("resize", updateLimit)
    return () => window.removeEventListener("resize", updateLimit)
  }, [isProductsPage, allProducts.length])

  // -----------------------------
  // ✅ FILTER STATE (nur /produkte)
  // -----------------------------
  const petOptions = useMemo(() => {
    const set = new Set(allProducts.map((p) => p.pet))
    return Array.from(set).filter((p) => p && p !== "alle").sort()
  }, [allProducts])

  const typeOptions = useMemo(() => {
    const set = new Set(allProducts.map((p) => p.type))
    return Array.from(set).filter(Boolean).sort()
  }, [allProducts])

  const priceBounds = useMemo(() => {
    const nums = allProducts.map((p) => parseEuro(p.price))
    return { min: Math.min(...nums), max: Math.max(...nums) }
  }, [allProducts])

  // ✅ (2) Mobile: Filter standardmäßig zu
  const [filtersOpen, setFiltersOpen] = useState<boolean>(() => {
    if (typeof window === "undefined") return true
    return window.innerWidth >= 768 // md+
  })

  const [query, setQuery] = useState("")
  const [selectedPet, setSelectedPet] = useState<string>("all")
  const [selectedType, setSelectedType] = useState<string>("all")
  const [minRating, setMinRating] = useState<number>(0)
  const [minPrice, setMinPrice] = useState<number>(priceBounds.min)
  const [maxPrice, setMaxPrice] = useState<number>(priceBounds.max)
  const [sort, setSort] = useState<SortOption>("popular")

  // "Mehr laden"
  const LOAD_STEP = 12
  const [shownCount, setShownCount] = useState<number>(LOAD_STEP)

  // ✅ (4) Favoriten aus localStorage laden/speichern
  useEffect(() => {
    try {
      const raw = localStorage.getItem(LS_LIKED_KEY)
      if (!raw) return
      const parsed = JSON.parse(raw)
      if (Array.isArray(parsed)) setLikedProducts(parsed.filter((x) => typeof x === "string"))
    } catch {
      // ignore
    }
  }, [])

  useEffect(() => {
    try {
      localStorage.setItem(LS_LIKED_KEY, JSON.stringify(likedProducts))
    } catch {
      // ignore
    }
  }, [likedProducts])

  // ✅ URL → State (einmalig + wenn URL manuell geändert wird)
  useEffect(() => {
    if (!isProductsPage) return

    const spPet = searchParams.get("pet")
    const spType = searchParams.get("type")
    const spQ = searchParams.get("q")
    const spMinRating = searchParams.get("minRating")
    const spMinPrice = searchParams.get("minPrice")
    const spMaxPrice = searchParams.get("maxPrice")
    const spSort = searchParams.get("sort")

    if (spPet && (spPet === "all" || petOptions.includes(spPet))) setSelectedPet(spPet)
    if (spType && (spType === "all" || typeOptions.includes(spType))) setSelectedType(spType)
    if (typeof spQ === "string") setQuery(spQ)

    if (spMinRating) {
      const n = Number(spMinRating)
      if (Number.isFinite(n)) setMinRating(n)
    }

    if (spMinPrice) {
      const n = Number(spMinPrice)
      if (Number.isFinite(n)) setMinPrice(Math.max(0, n))
    } else {
      setMinPrice(priceBounds.min)
    }

    if (spMaxPrice) {
      const n = Number(spMaxPrice)
      if (Number.isFinite(n)) setMaxPrice(Math.max(0, n))
    } else {
      setMaxPrice(priceBounds.max)
    }

    if (spSort) {
      const s = spSort as SortOption
      if (["popular", "rating", "price_asc", "price_desc", "discount"].includes(s)) setSort(s)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isProductsPage, petOptions.join("|"), typeOptions.join("|"), priceBounds.min, priceBounds.max])

  // ✅ State → URL (Deep Link)
  useEffect(() => {
    if (!isProductsPage) return

    const next = new URLSearchParams()

    const q = query.trim()
    if (q) next.set("q", q)
    if (selectedPet !== "all") next.set("pet", selectedPet)
    if (selectedType !== "all") next.set("type", selectedType)
    if (minRating > 0) next.set("minRating", String(minRating))
    if (minPrice !== priceBounds.min) next.set("minPrice", String(minPrice))
    if (maxPrice !== priceBounds.max) next.set("maxPrice", String(maxPrice))
    if (sort !== "popular") next.set("sort", sort)

    // replace: verhindert „Back Button spam“
    setSearchParams(next, { replace: true })
  }, [isProductsPage, query, selectedPet, selectedType, minRating, minPrice, maxPrice, sort, priceBounds.min, priceBounds.max, setSearchParams])

  useEffect(() => {
    setMinPrice(priceBounds.min)
    setMaxPrice(priceBounds.max)
  }, [priceBounds.min, priceBounds.max])

  const resetFilters = () => {
    setQuery("")
    setSelectedPet("all")
    setSelectedType("all")
    setMinRating(0)
    setMinPrice(priceBounds.min)
    setMaxPrice(priceBounds.max)
    setSort("popular")
  }

  const filteredAllProducts = useMemo(() => {
    if (!isProductsPage) return allProducts.slice(0, limit)

    const q = query.trim().toLowerCase()

    let list = allProducts.filter((p) => {
      const pPrice = parseEuro(p.price)

      const matchesQuery =
        !q ||
        p.name.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q) ||
        p.pet.toLowerCase().includes(q) ||
        p.type.toLowerCase().includes(q)

      // ✅ Tierart: pet:"alle" immer dabei
      const matchesPet = selectedPet === "all" ? true : p.pet === selectedPet || p.pet === "alle"
      const matchesType = selectedType === "all" ? true : p.type === selectedType
      const matchesRating = p.rating >= minRating
      const matchesPrice = pPrice >= minPrice && pPrice <= maxPrice

      return matchesQuery && matchesPet && matchesType && matchesRating && matchesPrice
    })

    list = [...list].sort((a, b) => {
      const aPrice = parseEuro(a.price)
      const bPrice = parseEuro(b.price)

      if (sort === "popular") return b.reviews - a.reviews
      if (sort === "rating") return b.rating - a.rating
      if (sort === "price_asc") return aPrice - bPrice
      if (sort === "price_desc") return bPrice - aPrice
      if (sort === "discount")
        return discountPercent(b.oldPrice, b.price) - discountPercent(a.oldPrice, a.price)
      return 0
    })

    return list
  }, [isProductsPage, limit, query, selectedPet, selectedType, minRating, minPrice, maxPrice, sort, allProducts])

  // Wenn Filter ändern -> wieder bei "Mehr laden" von vorne anfangen
  useEffect(() => {
    if (!isProductsPage) return
    setShownCount(LOAD_STEP)
  }, [isProductsPage, query, selectedPet, selectedType, minRating, minPrice, maxPrice, sort])

  const productsToRender = useMemo(() => {
    if (!isProductsPage) return filteredAllProducts
    return filteredAllProducts.slice(0, shownCount)
  }, [isProductsPage, filteredAllProducts, shownCount])

  const hasMore = isProductsPage && productsToRender.length < filteredAllProducts.length

  // ✅ Filter-Chips (aktive Filter anzeigen) + Icons
  const chips = useMemo(() => {
    if (!isProductsPage) return []

    const out: Array<{ key: string; label: string; onRemove: () => void }> = []

    const q = query.trim()
    if (q) out.push({ key: "q", label: `🔎 Suche: "${q}"`, onRemove: () => setQuery("") })

    if (selectedPet !== "all")
      out.push({
        key: "pet",
        label: `🐾 Tierart: ${prettyPet(selectedPet)}`,
        onRemove: () => setSelectedPet("all"),
      })

    if (selectedType !== "all")
      out.push({
        key: "type",
        label: `🏷️ Kategorie: ${prettyType(selectedType)}`,
        onRemove: () => setSelectedType("all"),
      })

    if (minRating > 0)
      out.push({
        key: "rating",
        label: `⭐ Bewertung: ${minRating.toFixed(1)}+`,
        onRemove: () => setMinRating(0),
      })

    if (minPrice !== priceBounds.min || maxPrice !== priceBounds.max)
      out.push({
        key: "price",
        label: `💶 Preis: ${formatEuro(minPrice)} – ${formatEuro(maxPrice)}`,
        onRemove: () => {
          setMinPrice(priceBounds.min)
          setMaxPrice(priceBounds.max)
        },
      })

    if (sort !== "popular")
      out.push({
        key: "sort",
        label:
          sort === "rating"
            ? "↕️ Sortierung: Bewertung"
            : sort === "price_asc"
              ? "↕️ Sortierung: Preis ↑"
              : sort === "price_desc"
                ? "↕️ Sortierung: Preis ↓"
                : "↕️ Sortierung: Rabatt",
        onRemove: () => setSort("popular"),
      })

    return out
  }, [isProductsPage, query, selectedPet, selectedType, minRating, minPrice, maxPrice, sort, priceBounds.min, priceBounds.max])

  const toggleLike = (id: string) => {
    setLikedProducts((prev) => (prev.includes(id) ? prev.filter((p) => p !== id) : [...prev, id]))
  }

  // ✅ Reset refs/visibleCards wenn sich die angezeigte Menge ändert
  useEffect(() => {
    cardRefs.current = []
    setVisibleCards([])
  }, [productsToRender.length])

  // Intersection Observer Animation
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
  }, [visibleCards, productsToRender.length])

  return (
    <section id="products" className="py-20 lg:py-32 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-warm-white via-cream to-warm-white" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Header */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 bg-petal-pink/10 rounded-full px-4 py-2 mb-6">
            <TrendingUp className="w-4 h-4 text-petal-pink" />
            <span className="text-sm font-nunito font-semibold text-petal-pink">
              {isProductsPage ? "Stöbere durch alles" : "Beliebt bei unseren Lesern"}
            </span>
          </div>

          <h2 className="font-fredoka text-3xl sm:text-4xl lg:text-5xl font-bold text-warm-brown mb-4">
            {isProductsPage ? (
              <>
                Alle <span className="text-gradient">Produkte</span>
              </>
            ) : (
              <>
                Beliebte <span className="text-gradient">Produkte</span>
              </>
            )}
          </h2>

          <p className="font-nunito text-lg text-warm-brown/70 max-w-2xl mx-auto">
            {isProductsPage
              ? "Finde schnell das passende Produkt – mit Suche, Filtern und Sortierung."
              : "Unsere handverlesenen Empfehlungen – getestet und für gut befunden von der HaustierOase-Community."}
          </p>
        </div>

        {/* Sticky Filterbar */}
        {isProductsPage && (
          <div className="sticky top-20 z-30 mb-10">
            <div className="bg-white/80 backdrop-blur-sm border border-black/5 rounded-3xl p-4 sm:p-5 shadow-soft">
              {/* Head row */}
              <div className="flex items-center gap-2">
                <SlidersHorizontal className="w-4 h-4 text-warm-brown/70" />
                <p className="font-fredoka text-warm-brown">Filter</p>

                <div className="ml-auto flex items-center gap-2">
                  <span className="text-sm font-nunito text-warm-brown/60">
                    {filteredAllProducts.length} Ergebnis{filteredAllProducts.length === 1 ? "" : "se"}
                  </span>

                  <Button
                    type="button"
                    variant="ghost"
                    className="rounded-full"
                    onClick={() => setFiltersOpen((v) => !v)}
                    title={filtersOpen ? "Filter einklappen" : "Filter ausklappen"}
                  >
                    {filtersOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                  </Button>

                  <Button
                    type="button"
                    variant="ghost"
                    className="rounded-full"
                    onClick={() => setFiltersOpen(false)}
                    title="Filter schließen"
                  >
                    <X className="w-4 h-4" />
                  </Button>
                </div>
              </div>

              {/* Chips */}
              {chips.length > 0 && (
                <div className="mt-3 flex flex-wrap gap-2">
                  {chips.map((c) => (
                    <button
                      key={c.key}
                      type="button"
                      onClick={c.onRemove}
                      className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-cream text-warm-brown/80 border border-black/5 font-nunito text-sm hover:bg-petal-pink/10 transition"
                      title="Filter entfernen"
                    >
                      {c.label}
                      <X className="w-3.5 h-3.5 opacity-70" />
                    </button>
                  ))}

                  <Button type="button" className="rounded-full font-fredoka" variant="outline" onClick={resetFilters}>
                    Zurücksetzen
                  </Button>
                </div>
              )}

              {/* Filter fields */}
              {filtersOpen && (
                <>
                  <div className="mt-4 grid gap-3 md:grid-cols-12">
                    {/* Suche */}
                    <div className="md:col-span-4">
                      <div className="relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-warm-brown/40" />
                        <input
                          value={query}
                          onChange={(e) => setQuery(e.target.value)}
                          placeholder='Suche (z.B. "Halsband", "Heu", "Futter")'
                          className="w-full h-11 pl-10 pr-3 rounded-2xl border border-black/10 bg-white font-nunito text-warm-brown placeholder:text-warm-brown/40 outline-none focus:ring-2 focus:ring-petal-pink/30"
                        />
                      </div>
                    </div>

                    {/* Tierart */}
                    <div className="md:col-span-2">
                      <select
                        value={selectedPet}
                        onChange={(e) => setSelectedPet(e.target.value)}
                        className="w-full h-11 rounded-2xl border border-black/10 bg-white font-nunito text-warm-brown outline-none focus:ring-2 focus:ring-petal-pink/30 px-3"
                      >
                        <option value="all">Alle Tierarten</option>
                        {petOptions.map((p) => (
                          <option key={p} value={p}>
                            {prettyPet(p)}
                          </option>
                        ))}
                      </select>
                    </div>

                    {/* Kategorie */}
                    <div className="md:col-span-2">
                      <select
                        value={selectedType}
                        onChange={(e) => setSelectedType(e.target.value)}
                        className="w-full h-11 rounded-2xl border border-black/10 bg-white font-nunito text-warm-brown outline-none focus:ring-2 focus:ring-petal-pink/30 px-3"
                      >
                        <option value="all">Alle Kategorien</option>
                        {typeOptions.map((t) => (
                          <option key={t} value={t}>
                            {prettyType(t)}
                          </option>
                        ))}
                      </select>
                    </div>

                    {/* Bewertung */}
                    <div className="md:col-span-2">
                      <select
                        value={String(minRating)}
                        onChange={(e) => setMinRating(Number(e.target.value))}
                        className="w-full h-11 rounded-2xl border border-black/10 bg-white font-nunito text-warm-brown outline-none focus:ring-2 focus:ring-petal-pink/30 px-3"
                      >
                        <option value="0">Alle Bewertungen</option>
                        <option value="4.5">4.5+ Sterne</option>
                        <option value="4">4.0+ Sterne</option>
                        <option value="3.5">3.5+ Sterne</option>
                      </select>
                    </div>

                    {/* Sortierung */}
                    <div className="md:col-span-2">
                      <select
                        value={sort}
                        onChange={(e) => setSort(e.target.value as SortOption)}
                        className="w-full h-11 rounded-2xl border border-black/10 bg-white font-nunito text-warm-brown outline-none focus:ring-2 focus:ring-petal-pink/30 px-3"
                      >
                        <option value="popular">Beliebtheit</option>
                        <option value="rating">Bewertung</option>
                        <option value="price_asc">Preis (niedrig → hoch)</option>
                        <option value="price_desc">Preis (hoch → niedrig)</option>
                        <option value="discount">Rabatt (%)</option>
                      </select>
                    </div>
                  </div>

                  {/* Preisbereich */}
                  <div className="mt-4 grid gap-3 md:grid-cols-12 items-end">
                    <div className="md:col-span-5">
                      <label className="block text-xs font-nunito text-warm-brown/60 mb-1">Min. Preis</label>
                      <input
                        type="number"
                        min={0}
                        step={1}
                        value={Number.isFinite(minPrice) ? minPrice : 0}
                        onChange={(e) => setMinPrice(Math.max(0, Number(e.target.value)))}
                        className="w-full h-11 rounded-2xl border border-black/10 bg-white font-nunito text-warm-brown outline-none focus:ring-2 focus:ring-petal-pink/30 px-3"
                      />
                    </div>

                    <div className="md:col-span-5">
                      <label className="block text-xs font-nunito text-warm-brown/60 mb-1">Max. Preis</label>
                      <input
                        type="number"
                        min={0}
                        step={1}
                        value={Number.isFinite(maxPrice) ? maxPrice : 0}
                        onChange={(e) => setMaxPrice(Math.max(0, Number(e.target.value)))}
                        className="w-full h-11 rounded-2xl border border-black/10 bg-white font-nunito text-warm-brown outline-none focus:ring-2 focus:ring-petal-pink/30 px-3"
                      />
                    </div>

                    <div className="md:col-span-2">
                      <div className="text-sm font-nunito text-warm-brown/70">
                        {formatEuro(minPrice)} – {formatEuro(maxPrice)}
                      </div>
                    </div>

                    {chips.length === 0 && (
                      <div className="md:col-span-12 flex justify-end">
                        <Button type="button" variant="outline" className="rounded-full font-fredoka" onClick={resetFilters}>
                          Zurücksetzen
                        </Button>
                      </div>
                    )}
                  </div>
                </>
              )}

              {/* ✅ Mobile extra: klarer Button zum Öffnen */}
              {!filtersOpen && (
                <div className="mt-4 flex justify-center md:hidden">
                  <Button type="button" className="rounded-full px-8 font-fredoka" onClick={() => setFiltersOpen(true)}>
                    Filter öffnen
                  </Button>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Products Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {productsToRender.map((product, index) => {
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
                <div className="relative h-56 overflow-hidden bg-cream">
                  <img
                    src={product.image}
                    alt={product.name}
                    className={`w-full h-full object-cover transition-transform duration-700 ${
                      isHovered ? "scale-110" : "scale-100"
                    }`}
                  />

                  <div
                    className={`absolute top-3 left-3 ${product.badgeColor} text-white text-xs font-nunito font-bold px-3 py-1 rounded-full`}
                  >
                    {product.badge}
                  </div>

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

                <div className="p-5">
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

                  <h3 className="font-fredoka text-lg font-semibold text-warm-brown mb-1 group-hover:text-petal-pink transition-colors">
                    {product.name}
                  </h3>
                  <p className="font-nunito text-sm text-warm-brown/60 mb-3">{product.description}</p>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="font-fredoka text-xl font-bold text-petal-pink">{product.price}</span>
                      <span className="font-nunito text-sm text-warm-brown/40 line-through">{product.oldPrice}</span>
                    </div>
                  </div>

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

                <div className="absolute bottom-24 right-4 bg-mint-green text-white text-xs font-nunito font-bold px-2 py-1 rounded-lg">
                  -{discountPercent(product.oldPrice, product.price)}%
                </div>
              </div>
            )
          })}
        </div>

        {/* Mehr laden */}
        {isProductsPage && (
          <div className="mt-10 flex flex-col items-center gap-3">
            {hasMore ? (
              <Button
                type="button"
                className="rounded-full px-8 py-6 font-fredoka"
                onClick={() => setShownCount((c) => c + LOAD_STEP)}
              >
                Mehr laden
              </Button>
            ) : (
              <p className="text-sm font-nunito text-warm-brown/60">Das waren alle Ergebnisse.</p>
            )}
          </div>
        )}

        {/* Startseiten CTA */}
        {!isProductsPage && (
          <div className="mt-10 flex justify-center">
            <Button asChild className="rounded-full px-8 py-6 font-fredoka">
              <Link to="/produkte">Alle Produkte</Link>
            </Button>
          </div>
        )}

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

        <p className="text-center mt-8 text-xs font-nunito text-warm-brown/50">
          * Affiliate-Links: Bei Kauf über diese Links erhalten wir eine kleine Provision. Für dich entstehen keine
          zusätzlichen Kosten.
        </p>
      </div>
    </section>
  )
}

export default Products