import { Link } from "react-router-dom"
import { Heart, Instagram, Facebook, Youtube, Mail, MapPin } from "lucide-react"

const Footer = () => {
  const categories = [
    { name: "Hunde", slug: "hunde" },
    { name: "Katzen", slug: "katzen" },
    { name: "Kleintiere", slug: "kleintiere" },
    { name: "Vögel", slug: "voegel" },
    { name: "Aquaristik", slug: "aquaristik" },
  ]

  const company = [
    { name: "Über uns", href: "/ueber-uns" },
    { name: "Kontakt", href: "/kontakt" }, // optional später erstellen
  ]

  const legal = [
    { name: "Impressum", href: "/impressum" },
    { name: "Datenschutz", href: "/datenschutz" },
  ]

  const socialLinks = [
    { icon: Instagram, href: "#", label: "Instagram" },
    { icon: Facebook, href: "#", label: "Facebook" },
    { icon: Youtube, href: "#", label: "YouTube" },
  ]

  const openCookieSettings = () => {
    window.dispatchEvent(new Event("open-cookie-settings"))
  }

  return (
    <footer className="relative overflow-hidden">
      {/* Top Wave */}
      <div className="absolute top-0 left-0 right-0 -translate-y-full">
        <svg viewBox="0 0 1440 80" fill="none" className="w-full">
          <path
            d="M0 80L60 70C120 60 240 40 360 30C480 20 600 20 720 25C840 30 960 40 1080 45C1200 50 1320 50 1380 50L1440 50V80H1380C1320 80 1200 80 1080 80C960 80 840 80 720 80C600 80 480 80 360 80C240 80 120 80 60 80H0Z"
            fill="#5d4e45"
          />
        </svg>
      </div>

      {/* Main Footer */}
      <div className="bg-warm-brown text-white pt-16 pb-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 mb-12">
            {/* Brand Column */}
            <div className="lg:col-span-2">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-14 h-14 flex items-center justify-center">
                  <img
                    src="/images/logo.png"
                    alt="HaustierOase"
                    className="w-full h-full object-contain drop-shadow-lg"
                  />
                </div>
                <span className="font-fredoka text-2xl font-semibold">HaustierOase</span>
              </div>

              <p className="font-nunito text-white/70 mb-6 max-w-sm">
                Dein vertrauenswürdiger Partner für alles rund um dein Haustier. Ehrliche Empfehlungen, Vergleiche und
                Ratgeber.
              </p>

              <div className="space-y-3">
                <a
                  href="mailto:hello@haustieroase.de"
                  className="flex items-center gap-3 text-white/70 hover:text-petal-pink transition-colors"
                >
                  <Mail className="w-5 h-5" />
                  <span className="font-nunito">hello@haustieroase.de</span>
                </a>

                <div className="flex items-center gap-3 text-white/70">
                  <MapPin className="w-5 h-5" />
                  <span className="font-nunito">Deutschland</span>
                </div>
              </div>
            </div>

            {/* Kategorien */}
            <div>
              <h3 className="font-fredoka text-lg font-semibold mb-6">Kategorien</h3>
              <ul className="space-y-3">
                {categories.map((cat) => (
                  <li key={cat.slug}>
                    <Link
                      to={`/produkte?pet=${cat.slug}`}
                      className="font-nunito text-white/70 hover:text-petal-pink transition-colors"
                    >
                      {cat.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Unternehmen */}
            <div>
              <h3 className="font-fredoka text-lg font-semibold mb-6">Unternehmen</h3>
              <ul className="space-y-3">
                {company.map((link) => (
                  <li key={link.name}>
                    <Link to={link.href} className="font-nunito text-white/70 hover:text-petal-pink transition-colors">
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Rechtliches */}
            <div>
              <h3 className="font-fredoka text-lg font-semibold mb-6">Rechtliches</h3>
              <ul className="space-y-3">
                {legal.map((link) => (
                  <li key={link.name}>
                    <Link to={link.href} className="font-nunito text-white/70 hover:text-petal-pink transition-colors">
                      {link.name}
                    </Link>
                  </li>
                ))}

                {/* ✅ Cookie Einstellungen */}
                <li>
                  <button
                    type="button"
                    onClick={openCookieSettings}
                    className="font-nunito text-white/70 hover:text-petal-pink transition-colors text-left"
                  >
                    Cookie-Einstellungen
                  </button>
                </li>
              </ul>
            </div>
          </div>

          {/* Divider */}
          <div className="border-t border-white/10 pt-8">
            <div className="flex flex-col md:flex-row items-center justify-between gap-6">
              <p className="font-nunito text-sm text-white/50 text-center md:text-left">
                © 2026 HaustierOase. Alle Rechte vorbehalten.
              </p>

              <div className="flex items-center gap-4">
                {socialLinks.map((social) => {
                  const Icon = social.icon
                  return (
                    <a
                      key={social.label}
                      href={social.href}
                      aria-label={social.label}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-petal-pink transition-colors"
                    >
                      <Icon className="w-5 h-5" />
                    </a>
                  )
                })}
              </div>

              <p className="font-nunito text-sm text-white/50 flex items-center gap-2">
                Made with <Heart className="w-4 h-4 text-petal-pink fill-petal-pink" /> für Tierliebhaber
              </p>
            </div>
          </div>

          {/* Affiliate Hinweis */}
          <div className="mt-8 pt-6 border-t border-white/5">
            <p className="font-nunito text-xs text-white/40 text-center max-w-3xl mx-auto">
              * Diese Website enthält Affiliate-Links. Wenn du über diese Links einkaufst, erhalten wir eine kleine
              Provision. Für dich entstehen keine zusätzlichen Kosten. Unsere Empfehlungen basieren auf eigener
              Recherche und Bewertung.
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer