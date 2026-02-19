import { Link, useLocation, useNavigate } from "react-router-dom"
import { useEffect, useRef, useState } from "react"
import { Menu, X, PawPrint, Heart, ShoppingBag, Mail } from "lucide-react"
import { Button } from "@/components/ui/button"

const Navigation = () => {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [cartCount, _setCartCount] = useState(0)

  // Newsletter Modal
  const [isNewsletterOpen, setIsNewsletterOpen] = useState(false)
  const [email, setEmail] = useState("")
  const emailInputRef = useRef<HTMLInputElement | null>(null)

  const location = useLocation()
  const navigate = useNavigate()

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50)
    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const navLinks = [
    { name: "Startseite", href: "#hero", type: "scroll" as const },
    { name: "Kategorien", href: "#categories", type: "scroll" as const },
    { name: "Ratgeber", href: "#blog", type: "scroll" as const },
    { name: "Produkte", href: "#products", type: "scroll" as const },
  ]

  const closeMobile = () => setIsMobileMenuOpen(false)

  const openNewsletter = () => {
    closeMobile()
    setIsNewsletterOpen(true)
    // Fokus nach dem Render setzen
    setTimeout(() => emailInputRef.current?.focus(), 0)
  }

  const closeNewsletter = () => setIsNewsletterOpen(false)

  const scrollToSection = (hash: string) => {
    const el = document.querySelector(hash)
    if (el) el.scrollIntoView({ behavior: "smooth" })
  }

  const goToSection = (hash: string) => {
    if (location.pathname !== "/") {
      navigate("/" + hash)
      closeMobile()
      return
    }
    scrollToSection(hash)
    closeMobile()
  }

  useEffect(() => {
    if (location.pathname !== "/") return
    if (!location.hash) return
    const t = window.setTimeout(() => scrollToSection(location.hash), 50)
    return () => window.clearTimeout(t)
  }, [location.pathname, location.hash])

  const handleNavClick = (e: React.MouseEvent, link: (typeof navLinks)[0]) => {
    e.preventDefault()
    if (link.type === "scroll") {
      goToSection(link.href)
      return
    }
    window.open(link.href, "_blank")
    closeMobile()
  }

  // ESC schließt Modal + Scroll sperren wenn Modal offen
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeNewsletter()
    }
    if (isNewsletterOpen) {
      document.body.style.overflow = "hidden"
      window.addEventListener("keydown", onKeyDown)
    } else {
      document.body.style.overflow = ""
      window.removeEventListener("keydown", onKeyDown)
    }
    return () => {
      document.body.style.overflow = ""
      window.removeEventListener("keydown", onKeyDown)
    }
  }, [isNewsletterOpen])

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    const trimmed = email.trim()
    if (!trimmed || !trimmed.includes("@")) {
      alert("Bitte gib eine gültige E-Mail-Adresse ein 🙂")
      emailInputRef.current?.focus()
      return
    }

    // TODO: Hier später Mailchimp/Brevo/Backend anbinden.
    // Für jetzt: kleine Bestätigung.
    alert("Danke! 🎉 Du bist (demo) für den Newsletter eingetragen.")
    setEmail("")
    closeNewsletter()
  }

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          isScrolled ? "bg-white/90 backdrop-blur-lg shadow-pet py-3" : "bg-transparent py-5"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            {/* Logo -> immer zur Startseite */}
            <Link to="/" onClick={closeMobile} className="flex items-center gap-2 group">
              <div className="relative w-12 h-12 animate-bounce-gentle">
                <img
                  src="/images/logo.png"
                  alt="HaustierOase"
                  className="w-full h-full object-contain drop-shadow-md"
                />
              </div>
              <span className="font-fredoka text-xl font-semibold text-warm-brown group-hover:text-petal-pink transition-colors">
                HaustierOase
              </span>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-8">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link)}
                  className="relative font-nunito font-medium text-warm-brown hover:text-petal-pink transition-colors group"
                >
                  {link.name}
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-petal-pink transition-all duration-300 group-hover:w-full" />
                </a>
              ))}
            </div>

            {/* CTA Buttons */}
            <div className="hidden md:flex items-center gap-3">
              <Button
                variant="ghost"
                size="icon"
                className="text-warm-brown hover:text-petal-pink hover:bg-petal-pink/10"
                aria-label="Favoriten"
              >
                <Heart className="w-5 h-5" />
              </Button>

              <Button
                variant="ghost"
                size="icon"
                className="text-warm-brown hover:text-mint-green hover:bg-mint-green/10 relative"
                onClick={() => alert("Shop kommt bald! 🛒")}
                aria-label="Warenkorb"
              >
                <ShoppingBag className="w-5 h-5" />
                {cartCount > 0 && (
                  <span className="absolute -top-1 -right-1 w-5 h-5 bg-petal-pink text-white text-xs rounded-full flex items-center justify-center font-bold">
                    {cartCount}
                  </span>
                )}
              </Button>

              <Button
                onClick={openNewsletter}
                className="bg-gradient-to-r from-petal-pink to-peach text-white font-fredoka font-medium rounded-full px-6 hover:shadow-pet-hover transition-all duration-300 hover:-translate-y-0.5"
              >
                <PawPrint className="w-4 h-4 mr-2" />
                Newsletter
              </Button>
            </div>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden p-2 text-warm-brown hover:text-petal-pink transition-colors"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label="Menü öffnen/schließen"
              type="button"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      <div
        className={`fixed inset-0 z-40 md:hidden transition-all duration-500 ${
          isMobileMenuOpen ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
      >
        <div className="absolute inset-0 bg-warm-brown/20 backdrop-blur-sm" onClick={closeMobile} />
        <div
          className={`absolute top-20 left-4 right-4 bg-white rounded-3xl shadow-pet-hover p-6 transition-all duration-500 ${
            isMobileMenuOpen ? "translate-y-0 opacity-100" : "-translate-y-10 opacity-0"
          }`}
        >
          <div className="flex flex-col gap-4">
            {navLinks.map((link, index) => (
              <a
                key={link.name}
                href={link.href}
                onClick={(e) => handleNavClick(e, link)}
                className="font-nunito font-medium text-lg text-warm-brown hover:text-petal-pink transition-colors py-2 border-b border-cream last:border-0"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                {link.name}
              </a>
            ))}

            <Button
              onClick={openNewsletter}
              className="mt-4 bg-gradient-to-r from-petal-pink to-peach text-white font-fredoka font-medium rounded-full"
            >
              <PawPrint className="w-4 h-4 mr-2" />
              Newsletter abonnieren
            </Button>
          </div>
        </div>
      </div>

      {/* Newsletter Modal */}
      {isNewsletterOpen && (
        <div className="fixed inset-0 z-[999]">
          {/* Overlay */}
          <div className="absolute inset-0 bg-warm-brown/40 backdrop-blur-sm" onClick={closeNewsletter} />

          {/* Modal Card */}
          <div className="absolute inset-0 flex items-center justify-center p-4">
            <div
              role="dialog"
              aria-modal="true"
              className="w-full max-w-lg bg-white rounded-3xl shadow-pet-hover overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="p-6 sm:p-8">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h3 className="font-fredoka text-2xl font-bold text-warm-brown">
                      Newsletter abonnieren
                    </h3>
                    <p className="mt-2 font-nunito text-warm-brown/70">
                      Erhalte Produkttipps, Deals & Ratgeber – 1–2x pro Monat. Kein Spam.
                    </p>
                  </div>

                  <button
                    type="button"
                    onClick={closeNewsletter}
                    className="text-warm-brown/60 hover:text-petal-pink transition-colors"
                    aria-label="Schließen"
                  >
                    <X className="w-6 h-6" />
                  </button>
                </div>

                <form onSubmit={handleNewsletterSubmit} className="mt-6">
                  <label className="block text-sm font-nunito font-semibold text-warm-brown mb-2">
                    E-Mail Adresse
                  </label>

                  <div className="flex gap-2">
                    <div className="relative flex-1">
                      <Mail className="w-4 h-4 text-warm-brown/40 absolute left-3 top-1/2 -translate-y-1/2" />
                      <input
                        ref={emailInputRef}
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        type="email"
                        placeholder="deinname@email.de"
                        className="w-full pl-10 pr-4 py-3 rounded-xl border border-cream focus:outline-none focus:ring-2 focus:ring-petal-pink/40 font-nunito"
                      />
                    </div>

                    <Button
                      type="submit"
                      className="rounded-xl bg-gradient-to-r from-petal-pink to-peach text-white font-fredoka"
                    >
                      Anmelden
                    </Button>
                  </div>

                  <p className="mt-3 text-xs font-nunito text-warm-brown/50">
                    Mit Klick auf „Anmelden“ stimmst du zu, E-Mails von HaustierOase zu erhalten.
                    Abmelden jederzeit möglich.
                  </p>
                </form>
              </div>

              <div className="px-6 sm:px-8 py-4 bg-cream/60 flex items-center justify-between">
                <span className="text-xs font-nunito text-warm-brown/60">
                  Tipp: Später können wir Mailchimp/Brevo anbinden.
                </span>
                <button
                  type="button"
                  onClick={closeNewsletter}
                  className="text-xs font-nunito font-semibold text-petal-pink hover:underline"
                >
                  Jetzt nicht
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default Navigation
