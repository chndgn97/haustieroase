// src/pages/Impressum.tsx

export default function Impressum() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-warm-white via-cream to-warm-white py-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="font-fredoka text-4xl font-bold text-warm-brown mb-8">
          Impressum
        </h1>

        <div className="space-y-6 font-nunito text-warm-brown/80 leading-relaxed">

          <section>
            <h2 className="font-fredoka text-xl text-warm-brown mb-2">
              Angaben gemäß § 5 TMG
            </h2>
            <p>
              Max Mustermann <br />
              Musterstraße 1 <br />
              12345 Musterstadt <br />
              Deutschland
            </p>
          </section>

          <section>
            <h2 className="font-fredoka text-xl text-warm-brown mb-2">
              Kontakt
            </h2>
            <p>
              E-Mail: hello@haustieroase.de <br />
              Telefon: +49 123 456789 (optional)
            </p>
          </section>

          <section>
            <h2 className="font-fredoka text-xl text-warm-brown mb-2">
              Umsatzsteuer
            </h2>
            <p>
              Umsatzsteuer-Identifikationsnummer gemäß §27 a Umsatzsteuergesetz:
              DE123456789
            </p>
          </section>

          <section>
            <h2 className="font-fredoka text-xl text-warm-brown mb-2">
              Verantwortlich für den Inhalt nach § 55 Abs. 2 RStV
            </h2>
            <p>
              Max Mustermann <br />
              Anschrift wie oben
            </p>
          </section>

          <section>
            <h2 className="font-fredoka text-xl text-warm-brown mb-2">
              Haftung für Inhalte
            </h2>
            <p>
              Als Diensteanbieter sind wir gemäß § 7 Abs.1 TMG für eigene Inhalte
              auf diesen Seiten nach den allgemeinen Gesetzen verantwortlich.
              Nach §§ 8 bis 10 TMG sind wir als Diensteanbieter jedoch nicht
              verpflichtet, übermittelte oder gespeicherte fremde Informationen
              zu überwachen oder nach Umständen zu forschen, die auf eine
              rechtswidrige Tätigkeit hinweisen.
            </p>
          </section>

          <section>
            <h2 className="font-fredoka text-xl text-warm-brown mb-2">
              Haftung für Links
            </h2>
            <p>
              Unser Angebot enthält Links zu externen Websites Dritter, auf
              deren Inhalte wir keinen Einfluss haben. Deshalb können wir für
              diese fremden Inhalte auch keine Gewähr übernehmen.
            </p>
          </section>

          <section>
            <h2 className="font-fredoka text-xl text-warm-brown mb-2">
              Urheberrecht
            </h2>
            <p>
              Die durch die Seitenbetreiber erstellten Inhalte und Werke auf
              diesen Seiten unterliegen dem deutschen Urheberrecht.
            </p>
          </section>

        </div>
      </div>
    </main>
  )
}