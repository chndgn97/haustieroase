// src/pages/Datenschutz.tsx

export default function Datenschutz() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-warm-white via-cream to-warm-white py-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="font-fredoka text-4xl font-bold text-warm-brown mb-8">
          Datenschutzerklärung
        </h1>

        <div className="space-y-6 font-nunito text-warm-brown/80 leading-relaxed">

          <section>
            <h2 className="font-fredoka text-xl text-warm-brown mb-2">
              1. Allgemeine Hinweise
            </h2>
            <p>
              Der Schutz Ihrer persönlichen Daten ist uns wichtig. Nachfolgend
              informieren wir Sie darüber, welche Daten beim Besuch dieser
              Website erfasst werden und wie diese genutzt werden.
            </p>
          </section>

          <section>
            <h2 className="font-fredoka text-xl text-warm-brown mb-2">
              2. Verantwortlicher
            </h2>
            <p>
              Max Mustermann <br />
              Musterstraße 1 <br />
              12345 Musterstadt <br />
              E-Mail: hello@haustieroase.de
            </p>
          </section>

          <section>
            <h2 className="font-fredoka text-xl text-warm-brown mb-2">
              3. Hosting
            </h2>
            <p>
              Diese Website wird bei einem externen Dienstleister (z.B.
              Cloudflare Pages) gehostet. Dabei werden automatisch Server-Logdaten
              gespeichert (IP-Adresse, Browser, Uhrzeit).
            </p>
          </section>

          <section>
            <h2 className="font-fredoka text-xl text-warm-brown mb-2">
              4. Affiliate-Links
            </h2>
            <p>
              Unsere Website enthält Affiliate-Links. Wenn Sie auf einen solchen
              Link klicken und über diesen einkaufen, erhalten wir ggf. eine
              Provision vom Anbieter. Dabei können Cookies gesetzt werden.
            </p>
          </section>

          <section>
            <h2 className="font-fredoka text-xl text-warm-brown mb-2">
              5. Newsletter
            </h2>
            <p>
              Wenn Sie sich für unseren Newsletter anmelden, wird Ihre
              E-Mail-Adresse gespeichert, um Ihnen Informationen zuzusenden.
              Eine Abmeldung ist jederzeit möglich.
            </p>
          </section>

          <section>
            <h2 className="font-fredoka text-xl text-warm-brown mb-2">
              6. Ihre Rechte
            </h2>
            <p>
              Sie haben jederzeit das Recht auf Auskunft, Berichtigung,
              Löschung oder Einschränkung der Verarbeitung Ihrer Daten.
              Außerdem steht Ihnen ein Beschwerderecht bei der zuständigen
              Aufsichtsbehörde zu.
            </p>
          </section>

        </div>
      </div>
    </main>
  )
}