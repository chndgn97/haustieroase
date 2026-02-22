import { Link } from "react-router-dom"
import ProductCard from "../../components/ProductCard"
import { ArrowLeft } from "lucide-react"

export default function KatzenfutterZucker() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-warm-white via-cream to-warm-white">
      
      {/* Abstand zur fixed Navigation */}
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
          Katzenfutter & Zucker – warum du genau hinschauen solltest
        </h1>

        {/* Meta */}
        <div className="mt-3 font-nunito text-sm text-warm-brown/60">
          Kategorie: Katzen • 6 min Lesezeit • 22.02.2026
        </div>

        {/* Intro */}
        <p className="font-nunito text-warm-brown/70 mt-6 text-lg leading-relaxed">
          Zucker hat im Katzenfutter nichts zu suchen. Dennoch enthalten viele
          Produkte versteckte Zusätze, die für Katzen keinen ernährungsphysiologischen
          Mehrwert bieten.
        </p>

        <p className="font-nunito text-warm-brown/70 mt-4 leading-relaxed">
          Entscheidend ist eine klare Deklaration, ein hoher Fleischanteil
          und möglichst wenige unnötige Füllstoffe.
        </p>

        {/* Produktbox */}
        <div className="my-12">
          <ProductCard productId="katzenfutter-premium" />
        </div>

        {/* Content */}
        <h2 className="font-fredoka text-2xl text-warm-brown mt-10">
          Worauf solltest du achten?
        </h2>

        <p className="font-nunito text-warm-brown/70 mt-4 leading-relaxed">
          Begriffe wie „pflanzliche Nebenerzeugnisse“ oder „Zuckerzusätze“
          sind oft Hinweise auf minderwertige Inhaltsstoffe.
          Eine hochwertige Rezeptur kommt ohne zugesetzten Zucker aus.
        </p>

        <p className="font-nunito text-warm-brown/70 mt-4 leading-relaxed">
          Tipp: Lies die Zutatenliste genau und wähle Futter mit klar
          ausgewiesenem Fleischanteil.
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