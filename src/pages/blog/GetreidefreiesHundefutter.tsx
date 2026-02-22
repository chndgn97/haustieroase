import { Link } from "react-router-dom"
import ProductCard from "../../components/ProductCard"
import { ArrowLeft } from "lucide-react"

export default function GetreidefreiesHundefutter() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-warm-white via-cream to-warm-white">
      
      {/* WICHTIG: pt-28 damit nichts unter der fixed Navigation liegt */}
      <div className="max-w-4xl mx-auto px-4 pt-28 pb-16">

        {/* Back Navigation */}
        <Link
          to="/blog"
          className="relative z-20 inline-flex items-center gap-2 font-nunito font-semibold text-petal-pink hover:opacity-80 transition mb-6"
        >
          <ArrowLeft className="w-4 h-4" />
          Zurück zur Übersicht
        </Link>

        {/* Title */}
        <h1 className="font-fredoka text-4xl sm:text-5xl text-warm-brown leading-tight">
          Getreidefreies Hundefutter – Sinnvoll oder Marketing?
        </h1>

        {/* Meta */}
        <div className="mt-3 font-nunito text-sm text-warm-brown/60">
          Kategorie: Hunde • 5 min Lesezeit • 22.02.2026
        </div>

        {/* Intro */}
        <p className="font-nunito text-warm-brown/70 mt-6 text-lg leading-relaxed">
          Viele Hundehalter berichten, dass ihre Tiere getreidefreies Futter besser
          vertragen. Doch ist das wirklich notwendig oder eher ein Marketingtrend?
          Entscheidend sind immer die Inhaltsstoffe und die Qualität der Rohstoffe.
        </p>

        {/* Produktbox */}
        <div className="my-12">
          <ProductCard productId="premium-hundefutter" />
        </div>

        {/* Content */}
        <h2 className="font-fredoka text-2xl text-warm-brown mt-10">
          Worauf solltest du achten?
        </h2>

        <p className="font-nunito text-warm-brown/70 mt-4 leading-relaxed">
          Achte auf einen hohen Fleischanteil, transparente Deklaration und möglichst
          wenig Zusatzstoffe. Begriffe wie „tierische Nebenerzeugnisse“ oder
          „pflanzliche Nebenprodukte“ können ein Hinweis auf minderwertige Zutaten sein.
        </p>

        <p className="font-nunito text-warm-brown/70 mt-4 leading-relaxed">
          Getreide ist nicht grundsätzlich schlecht – manche Hunde vertragen es
          problemlos. Wichtig ist, individuell auf deinen Hund zu achten.
        </p>

        {/* Bottom Navigation */}
        <div className="mt-14 pt-8 border-t border-cream">
          <Link
            to="/blog"
            className="inline-flex items-center gap-2 font-nunito font-semibold text-petal-pink hover:opacity-80 transition"
          >
            <ArrowLeft className="w-4 h-4" />
            Zurück zur Übersicht
          </Link>
        </div>

      </div>
    </div>
  )
}