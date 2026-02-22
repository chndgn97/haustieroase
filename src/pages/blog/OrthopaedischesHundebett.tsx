import { Link } from "react-router-dom"
import ProductCard from "../../components/ProductCard"
import { ArrowLeft } from "lucide-react"

export default function OrthopaedischesHundebett() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-warm-white via-cream to-warm-white">
      
      {/* Abstand wegen fixed Navigation */}
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
          Orthopädisches Hundebett – Für wen lohnt es sich wirklich?
        </h1>

        {/* Meta */}
        <div className="mt-3 font-nunito text-sm text-warm-brown/60">
          Kategorie: Hunde • 4 min Lesezeit • 22.02.2026
        </div>

        {/* Intro */}
        <p className="font-nunito text-warm-brown/70 mt-6 text-lg leading-relaxed">
          Ein gutes Hundebett kann die Gelenke entlasten – besonders bei
          Senioren, großen Rassen oder sehr aktiven Hunden.
          Doch nicht jedes „orthopädische“ Bett hält, was es verspricht.
        </p>

        <p className="font-nunito text-warm-brown/70 mt-4 leading-relaxed">
          Wichtig sind vor allem die richtige Größe, hochwertiger
          Memory-Schaum und eine einfache Waschbarkeit des Bezugs.
        </p>

        {/* Produktbox */}
        <div className="my-12">
          <ProductCard productId="hundebett-xl" />
        </div>

        {/* Content */}
        <h2 className="font-fredoka text-2xl text-warm-brown mt-10">
          Worauf solltest du achten?
        </h2>

        <p className="font-nunito text-warm-brown/70 mt-4 leading-relaxed">
          Achte auf eine dicke Liegefläche mit echtem Memory-Schaum,
          rutschfeste Unterseite und einen abnehmbaren Bezug.
          Billige Schaumstoffe verlieren schnell ihre Stützkraft.
        </p>

        <p className="font-nunito text-warm-brown/70 mt-4 leading-relaxed">
          Tipp: Miss deinen Hund im Liegen aus und addiere etwas Platz –
          so kann er sich bequem ausstrecken.
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