// src/pages/About.tsx
import { Heart, ShieldCheck, Sparkles } from "lucide-react"

export default function About() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-warm-white via-cream to-warm-white">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-20">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-petal-pink/10 rounded-full px-4 py-2 mb-6">
            <Sparkles className="w-4 h-4 text-petal-pink" />
            <span className="text-sm font-nunito font-semibold text-petal-pink">HaustierOase</span>
          </div>

          <h1 className="font-fredoka text-3xl sm:text-4xl lg:text-5xl font-bold text-warm-brown mb-4">
            Über <span className="text-gradient">uns</span>
          </h1>

          <p className="font-nunito text-lg text-warm-brown/70 max-w-2xl mx-auto">
            Wir helfen dir, bessere Kaufentscheidungen für dein Haustier zu treffen – mit ehrlichen Empfehlungen,
            Vergleichen und praxisnahen Tipps.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          <div className="bg-white rounded-3xl p-6 shadow-soft border border-black/5">
            <div className="w-12 h-12 rounded-2xl bg-petal-pink/10 flex items-center justify-center mb-4">
              <Heart className="w-6 h-6 text-petal-pink" />
            </div>
            <h2 className="font-fredoka text-xl text-warm-brown mb-2">Mit Liebe ausgewählt</h2>
            <p className="font-nunito text-warm-brown/70">
              Wir sammeln Produkte, die in der Praxis überzeugen – und achten dabei auf Qualität, Nutzen und Preis-Leistung.
            </p>
          </div>

          <div className="bg-white rounded-3xl p-6 shadow-soft border border-black/5">
            <div className="w-12 h-12 rounded-2xl bg-mint-green/10 flex items-center justify-center mb-4">
              <ShieldCheck className="w-6 h-6 text-mint-green" />
            </div>
            <h2 className="font-fredoka text-xl text-warm-brown mb-2">Transparent & fair</h2>
            <p className="font-nunito text-warm-brown/70">
              Einige Links sind Affiliate-Links. Wenn du darüber kaufst, erhalten wir ggf. eine kleine Provision – ohne Mehrkosten für dich.
            </p>
          </div>

          <div className="bg-white rounded-3xl p-6 shadow-soft border border-black/5">
            <div className="w-12 h-12 rounded-2xl bg-peach/10 flex items-center justify-center mb-4">
              <Sparkles className="w-6 h-6 text-peach" />
            </div>
            <h2 className="font-fredoka text-xl text-warm-brown mb-2">Unsere Mission</h2>
            <p className="font-nunito text-warm-brown/70">
              Weniger Fehlkäufe, mehr Wohlbefinden für Tiere – durch klare Infos, Filter und übersichtliche Empfehlungen.
            </p>
          </div>
        </div>

        <div className="mt-10 bg-white rounded-3xl p-6 shadow-soft border border-black/5">
          <h3 className="font-fredoka text-2xl text-warm-brown mb-3">Wie wir Produkte auswählen</h3>
          <ul className="list-disc pl-5 space-y-2 font-nunito text-warm-brown/70">
            <li>Bewertungen, Preis-Leistung und praktische Kriterien (Material, Haltbarkeit, Nutzen)</li>
            <li>Passend zur Tierart und zum Einsatzzweck (Nahrung, Spielzeug, Pflege, Schlafplatz, Zubehör)</li>
            <li>Transparenz: Affiliate-Hinweis klar gekennzeichnet</li>
          </ul>
        </div>
      </div>
    </main>
  )
}