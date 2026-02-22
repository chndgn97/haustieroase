import ProductCard from "../components/ProductCard"

export default function Blog() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-16">
      <h1 className="font-fredoka text-4xl text-warm-brown mb-6">
        Getreidefreies Hundefutter – Sinnvoll oder Marketing?
      </h1>

      <p className="font-nunito text-warm-brown/70 mb-6">
        Viele Hundehalter berichten, dass ihre Tiere getreidefreies Futter
        besser vertragen. Ein beliebtes Beispiel ist Premium Hundefutter.
      </p>

      {/* 🔥 DAS IST DER TEST */}
      <div className="my-10">
        <ProductCard productId="premium-hundefutter" />
      </div>

      <p className="font-nunito text-warm-brown/70">
        Wichtig ist immer, die Inhaltsstoffe genau zu prüfen und auf Qualität
        zu achten.
      </p>
    </div>
  )
}