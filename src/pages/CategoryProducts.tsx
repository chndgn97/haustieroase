import { Link, useParams } from "react-router-dom"
import { useMemo, useState } from "react"
import { products } from "../data/products"
import { ArrowRight, Dog, Cat, Rabbit, Bird, Fish, Package, Star } from "lucide-react"

const categoryMeta: Record<
  string,
  { title: string; description: string; image: string; color: string; icon: any }
> = {
  hunde: {
    title: "Hunde",
    description: "Alles für deinen Hund – Futter, Spielzeug, Pflege & Lieblings-Zubehör.",
    image: "/images/category-dogs.jpg",
    color: "from-petal-pink to-rose-300",
    icon: Dog,
  },
  katzen: {
    title: "Katzen",
    description: "Kratzbäume, Futter & Co. – ausgesuchte Empfehlungen für Samtpfoten.",
    image: "/images/category-cats.jpg",
    color: "from-mint-green to-teal-300",
    icon: Cat,
  },
  kleintiere: {
    title: "Kleintiere",
    description: "Für Kaninchen, Hamster & Co. – artgerechtes Zubehör und Futter.",
    image: "/images/category-small.jpg",
    color: "from-peach to-orange-300",
    icon: Rabbit,
  },
  voegel: {
    title: "Vögel",
    description: "Käfige, Futter & Spielzeug – Empfehlungen für gefiederte Freunde.",
    image: "/images/category-birds.jpg",
    color: "from-yellow-400 to-peach",
    icon: Bird,
  },
  aquaristik: {
    title: "Aquaristik",
    description: "Aquarien, Zubehör & Futter – für ein gesundes, schönes Aquarium.",
    image: "/images/category-aqua.jpg",
    color: "from-cyan-400 to-mint-green",
    icon: Fish,
  },
  zubehoer: {
    title: "Zubehör",
    description: "Praktische Must-haves – das gewisse Extra für dein Haustier.",
    image: "/images/product-collar.jpg",
    color: "from-purple-400 to-petal-pink",
    icon: Package,
  },
}

type SortKey = "beliebt" | "preis_auf" | "preis_ab" | "bewertung"
type MinRating = "alle" | "4.5" | "4.7" | "4.8"

function parsePriceEUR(price: string) {
  const n = parseFloat(price.replace("€", "").trim().replace(".", "").replace(",", "."))
  return Number.isFinite(n) ? n : 0
}

// ✅ Auto-Badges (Deal / Bestseller / Top Rated)
function getAutoBadge(p: any) {
  const price = parsePriceEUR(p.price)
  const old = parsePriceEUR(p.oldPrice)

  if (old > price) return { text: "Deal", color: "bg-mint-green" }
  if ((p.reviews ?? 0) >= 200) return { text: "Bestseller", color: "bg-petal-pink" }
  if ((p.rating ?? 0) >= 4.8) return { text: "Top Rated", color: "bg-peach" }
  return null
}

export default function CategoryProducts() {
  const { slug } = useParams()
  const category = (slug || "").toLowerCase()

  const meta = categoryMeta[category]
  const Icon = meta?.icon ?? Package

  const [sort, setSort] = useState<SortKey>("beliebt")
  const [minRating, setMinRating] = useState<MinRating>("alle")
  const [onlyDeals, setOnlyDeals] = useState(false)
  const [search, setSearch] = useState("")
  const [minPrice, setMinPrice] = useState<number>(0)
  const [maxPrice, setMaxPrice] = useState<number>(999)

  const base = useMemo(() => {
    return products.filter((p: any) => p.category === category)
  }, [category])

  const filteredSorted = useMemo(() => {
    let list = [...base]

    // Search
    const q = search.trim().toLowerCase()
    if (q) {
      list = list.filter((p: any) => {
        const name = String(p.name ?? "").toLowerCase()
        const desc = String(p.description ?? "").toLowerCase()
        return name.includes(q) || desc.includes(q)
      })
    }

    // Rating
    if (minRating !== "alle") {
      const r = parseFloat(minRating)
      list = list.filter((p: any) => (p.rating ?? 0) >= r)
    }

    // Deals
    if (onlyDeals) {
      list = list.filter((p: any) => parsePriceEUR(p.oldPrice) > parsePriceEUR(p.price))
    }

    // Price range
    list = list.filter((p: any) => {
      const pr = parsePriceEUR(p.price)
      return pr >= minPrice && pr <= maxPrice
    })

    // Sort
    list.sort((a: any, b: any) => {
      if (sort === "preis_auf") return parsePriceEUR(a.price) - parsePriceEUR(b.price)
      if (sort === "preis_ab") return parsePriceEUR(b.price) - parsePriceEUR(a.price)
      if (sort === "bewertung") return (b.rating ?? 0) - (a.rating ?? 0)

      const ar = a.reviews ?? 0
      const br = b.reviews ?? 0
      if (br !== ar) return br - ar
      return (b.rating ?? 0) - (a.rating ?? 0)
    })

    return list
  }, [base, sort, minRating, onlyDeals, search, minPrice, maxPrice])

  const reset = () => {
    setSort("beliebt")
    setMinRating("alle")
    setOnlyDeals(false)
    setSearch("")
    setMinPrice(0)
    setMaxPrice(999)
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-warm-white via-cream to-warm-white">
      {/* HERO */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0">
          <img
            src={meta?.image ?? "/images/category-dogs.jpg"}
            alt={meta?.title ?? "Kategorie"}
            className="w-full h-full object-cover"
          />
          <div
            className={`absolute inset-0 bg-gradient-to-t ${
              meta?.color ?? "from-warm-brown to-peach"
            } opacity-70`}
          />
          <div className="absolute inset-0 bg-warm-brown/20" />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 sm:py-16 lg:py-20">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-white/90 hover:text-white transition-colors"
          >
            ← Zurück zur Startseite
          </Link>

          <div className="mt-8 flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8">
            <div className="max-w-2xl">
              <div className="inline-flex items-center gap-2 bg-white/15 backdrop-blur-sm rounded-full px-4 py-2">
                <Icon className="w-4 h-4 text-white" />
                <span className="text-sm font-nunito font-semibold text-white">
                  Kategorie
                </span>
              </div>

              <h1 className="font-fredoka text-4xl sm:text-5xl lg:text-6xl font-bold text-white mt-4">
                {meta?.title ?? "Produkte"}
              </h1>

              <p className="font-nunito text-white/85 text-lg mt-4">
                {meta?.description ?? "Entdecke passende Produkte in dieser Kategorie."}
              </p>

              <div className="mt-6 flex flex-wrap items-center gap-3">
                <div className="bg-white/15 backdrop-blur-sm rounded-2xl px-4 py-2">
                  <span className="font-nunito text-sm text-white/90">
                    {filteredSorted.length} Produkte gefunden
                  </span>
                </div>

                <button
                  type="button"
                  onClick={() => {
                    const el = document.getElementById("category-products")
                    if (el) el.scrollIntoView({ behavior: "smooth" })
                  }}
                  className="inline-flex items-center gap-2 bg-white text-warm-brown font-fredoka font-medium rounded-full px-5 py-2.5 hover:bg-petal-pink hover:text-white transition-all"
                >
                  Produkte ansehen <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>

            <div className="w-full lg:w-[360px]">
              <div className="bg-white/15 backdrop-blur-sm rounded-3xl p-5 border border-white/15">
                <div className="flex items-center gap-3">
                  <div className="w-11 h-11 rounded-2xl bg-white/20 flex items-center justify-center">
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <p className="font-fredoka text-white text-lg leading-tight">
                      Empfehlungen
                    </p>
                    <p className="font-nunito text-white/80 text-sm">
                      Handverlesen & beliebt
                    </p>
                  </div>
                </div>
                <p className="mt-4 font-nunito text-white/85 text-sm">
                  Nutze Filter für Suche, Preis & Deals.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="h-10 bg-gradient-to-b from-transparent to-warm-white relative" />
      </div>

      {/* FILTER BAR (Sticky + Premium) */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-6 relative z-20">
        <div className="sticky top-20">
          <div className="bg-white rounded-3xl shadow-soft p-4 sm:p-5 flex flex-col gap-4">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-3">
              {/* Search */}
              <div className="lg:col-span-5">
                <input
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Produkte suchen (z.B. Futter)…"
                  className="w-full rounded-2xl border border-cream px-4 py-3 font-nunito text-sm text-warm-brown bg-warm-white focus:outline-none focus:ring-2 focus:ring-petal-pink/30"
                />
              </div>

              {/* Sort */}
              <div className="lg:col-span-3">
                <select
                  value={sort}
                  onChange={(e) => setSort(e.target.value as SortKey)}
                  className="w-full rounded-2xl border border-cream px-4 py-3 font-nunito text-sm text-warm-brown bg-warm-white focus:outline-none focus:ring-2 focus:ring-petal-pink/30"
                >
                  <option value="beliebt">Beliebt</option>
                  <option value="preis_auf">Preis: günstig → teuer</option>
                  <option value="preis_ab">Preis: teuer → günstig</option>
                  <option value="bewertung">Bewertung</option>
                </select>
              </div>

              {/* Rating */}
              <div className="lg:col-span-2">
                <select
                  value={minRating}
                  onChange={(e) => setMinRating(e.target.value as MinRating)}
                  className="w-full rounded-2xl border border-cream px-4 py-3 font-nunito text-sm text-warm-brown bg-warm-white focus:outline-none focus:ring-2 focus:ring-petal-pink/30"
                >
                  <option value="alle">Rating: Alle</option>
                  <option value="4.5">4.5+</option>
                  <option value="4.7">4.7+</option>
                  <option value="4.8">4.8+</option>
                </select>
              </div>

              {/* Reset */}
              <div className="lg:col-span-2">
                <button
                  type="button"
                  onClick={reset}
                  className="w-full rounded-2xl bg-gradient-to-r from-petal-pink to-peach text-white font-fredoka font-medium py-3 hover:shadow-pet transition-all"
                >
                  Reset
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-3 items-center">
              {/* Price range */}
              <div className="lg:col-span-7 flex flex-wrap items-center gap-3">
                <span className="font-nunito text-sm font-semibold text-warm-brown">
                  Preis:
                </span>

                <div className="flex items-center gap-2">
                  <input
                    type="number"
                    value={minPrice}
                    onChange={(e) => setMinPrice(Number(e.target.value))}
                    className="w-24 rounded-xl border border-cream px-3 py-2 font-nunito text-sm bg-warm-white"
                  />
                  <span className="font-nunito text-sm text-warm-brown/60">bis</span>
                  <input
                    type="number"
                    value={maxPrice}
                    onChange={(e) => setMaxPrice(Number(e.target.value))}
                    className="w-24 rounded-xl border border-cream px-3 py-2 font-nunito text-sm bg-warm-white"
                  />
                  <span className="font-nunito text-sm text-warm-brown/60">€</span>
                </div>

                <label className="flex items-center gap-2 px-3 py-2 rounded-xl border border-cream bg-warm-white">
                  <input
                    type="checkbox"
                    checked={onlyDeals}
                    onChange={(e) => setOnlyDeals(e.target.checked)}
                  />
                  <span className="font-nunito text-sm text-warm-brown">Nur Deals</span>
                </label>
              </div>

              {/* Info */}
              <div className="lg:col-span-5 flex items-center gap-2 text-warm-brown/60 font-nunito text-sm">
                <Star className="w-4 h-4 text-peach" />
                <span>
                  Beliebt = viele Reviews + gutes Rating • {filteredSorted.length} Treffer
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* PRODUCTS */}
      <div id="category-products" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        {filteredSorted.length === 0 ? (
          <div className="mt-10 bg-white rounded-3xl p-6 shadow-soft">
            <p className="font-nunito text-warm-brown/70">
              Keine Produkte mit diesen Filtern gefunden.
            </p>
          </div>
        ) : (
          <div className="mt-10 grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {filteredSorted.map((p: any) => {
              const b = getAutoBadge(p)
              return (
                <Link
                  key={p.id}
                  to={`/produkt/${p.id}`}
                  className="group bg-white rounded-3xl overflow-hidden shadow-soft hover:shadow-pet-hover transition-all duration-300"
                  style={{ textDecoration: "none", color: "inherit" }}
                >
                  <div className="h-48 bg-cream overflow-hidden">
                    <img
                      src={p.image}
                      alt={p.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      loading="lazy"
                    />
                  </div>

                  <div className="p-5">
                    {/* ✅ Auto Badge */}
                    {b ? (
                      <div
                        className={`inline-flex ${b.color} text-white text-xs font-nunito font-bold px-3 py-1 rounded-full`}
                      >
                        {b.text}
                      </div>
                    ) : null}

                    <h3 className="font-fredoka text-lg font-semibold text-warm-brown mt-3 group-hover:text-petal-pink transition-colors">
                      {p.name}
                    </h3>

                    <p className="font-nunito text-sm text-warm-brown/60 mt-1">
                      {p.description}
                    </p>

                    <div className="mt-4 flex items-end gap-3">
                      <span className="font-fredoka text-xl font-bold text-petal-pink">
                        {p.price}
                      </span>
                      <span className="font-nunito text-sm text-warm-brown/40 line-through">
                        {p.oldPrice}
                      </span>
                    </div>
                  </div>
                </Link>
              )
            })}
          </div>
        )}

        <div className="mt-12 text-center">
          <Link
            to="/"
            className="inline-flex items-center gap-2 font-nunito font-semibold text-warm-brown hover:text-petal-pink transition-colors group"
          >
            Zurück zur Startseite
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>
    </div>
  )
}