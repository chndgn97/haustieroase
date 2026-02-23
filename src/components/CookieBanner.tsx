import { useEffect, useMemo, useRef, useState } from "react"
import { X } from "lucide-react"
import { Button } from "@/components/ui/button"

type Consent = {
  necessary: true
  analytics: boolean
  marketing: boolean
  timestamp: number
  version: string
}

const STORAGE_KEY = "haustieroase_cookie_consent"
const CONSENT_VERSION = "1.0"

const readConsent = (): Consent | null => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return null
    const parsed = JSON.parse(raw) as Consent
    if (!parsed || typeof parsed !== "object") return null
    if (parsed.version !== CONSENT_VERSION) return null
    if (typeof parsed.analytics !== "boolean") return null
    if (typeof parsed.marketing !== "boolean") return null
    return parsed
  } catch {
    return null
  }
}

const writeConsent = (consent: Omit<Consent, "timestamp">) => {
  const payload: Consent = { ...consent, timestamp: Date.now() }
  localStorage.setItem(STORAGE_KEY, JSON.stringify(payload))
  window.dispatchEvent(new CustomEvent("cookie-consent-changed", { detail: payload }))
}

export default function CookieBanner() {
  const [mounted, setMounted] = useState(false)
  const [open, setOpen] = useState(false)
  const [showSettings, setShowSettings] = useState(false)

  const [analytics, setAnalytics] = useState(false)
  const [marketing, setMarketing] = useState(false)

  const didInit = useRef(false)

  useEffect(() => {
    if (didInit.current) return
    didInit.current = true

    setMounted(true)

    const existing = readConsent()
    if (existing) {
      setAnalytics(existing.analytics)
      setMarketing(existing.marketing)
      setOpen(false)
      return
    }

    // iOS: minimal verzögert öffnen (ohne RAF-Kaskade-Overlays)
    setTimeout(() => setOpen(true), 50)
  }, [])

  // Footer -> Cookie Einstellungen öffnen
  useEffect(() => {
    const openHandler = () => {
      const existing = readConsent()
      if (existing) {
        setAnalytics(existing.analytics)
        setMarketing(existing.marketing)
      }
      setShowSettings(true)
      setOpen(true)
    }
    window.addEventListener("open-cookie-settings", openHandler as EventListener)
    return () => window.removeEventListener("open-cookie-settings", openHandler as EventListener)
  }, [])

  // ESC close
  useEffect(() => {
    if (!open) return
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false)
    }
    window.addEventListener("keydown", onKeyDown)
    return () => window.removeEventListener("keydown", onKeyDown)
  }, [open])

  // Scroll lock
  useEffect(() => {
    if (!open) {
      document.body.style.overflow = ""
      return
    }
    document.body.style.overflow = "hidden"
    return () => {
      document.body.style.overflow = ""
    }
  }, [open])

  const hasConsent = useMemo(() => {
    if (!mounted) return true
    return Boolean(readConsent())
  }, [mounted])

  if (!mounted || (!open && hasConsent)) return null

  const close = () => setOpen(false)

  const acceptAll = () => {
    writeConsent({ necessary: true, analytics: true, marketing: true, version: CONSENT_VERSION })
    close()
  }

  const acceptNecessaryOnly = () => {
    writeConsent({ necessary: true, analytics: false, marketing: false, version: CONSENT_VERSION })
    close()
  }

  const saveSettings = () => {
    writeConsent({ necessary: true, analytics, marketing, version: CONSENT_VERSION })
    close()
  }

  // ✅ iOS: sichere “Tap”-Handler
  const tap = (fn: () => void) => ({
    onPointerUp: (e: React.PointerEvent) => {
      e.preventDefault()
      e.stopPropagation()
      fn()
    },
    onTouchEnd: (e: React.TouchEvent) => {
      e.preventDefault()
      e.stopPropagation()
      fn()
    },
    onClick: (e: React.MouseEvent) => {
      // Desktop fallback
      e.preventDefault()
      e.stopPropagation()
      fn()
    },
  })

  return (
    <div
      className="fixed inset-0 z-[9999]"
      style={{
        WebkitTapHighlightColor: "transparent",
        touchAction: "manipulation",
      }}
    >
      {/* ✅ Backdrop (klickbar) */}
      <div
        className="absolute inset-0 z-0 bg-black/50"
        {...tap(close)}
        role="presentation"
      />

      {/* ✅ Modal */}
      <div className="absolute inset-0 z-10 flex items-end sm:items-center justify-center p-4">
        <div
          className="w-full max-w-2xl bg-white rounded-3xl shadow-pet-hover border border-black/5 overflow-hidden"
          // wichtig: kein transform, kein blur, kein fancy stacking
          onClick={(e) => e.stopPropagation()}
          onPointerDown={(e) => e.stopPropagation()}
          onTouchStart={(e) => e.stopPropagation()}
          role="dialog"
          aria-modal="true"
        >
          <div className="p-6 flex items-start justify-between gap-4">
            <div>
              <h3 className="font-fredoka text-2xl font-bold text-warm-brown">Cookie-Einstellungen</h3>
              <p className="mt-2 font-nunito text-warm-brown/70">
                Wir verwenden Cookies, um die Website sicher zu betreiben. Mit deiner Zustimmung nutzen wir zusätzlich
                Statistik- oder Marketing-Cookies.
              </p>
            </div>

            {/* ✅ X (jetzt garantiert tappbar) */}
            <button
              type="button"
              className="text-warm-brown/60 hover:text-petal-pink transition-colors"
              aria-label="Schließen"
              title="Schließen"
              {...tap(close)}
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          <div className="px-6 pb-6">
            <div className="bg-cream/60 border border-black/5 rounded-2xl p-4">
              <p className="font-nunito text-sm text-warm-brown/75">
                Details findest du in unserer{" "}
                <a href="/datenschutz" className="text-petal-pink font-semibold hover:underline">
                  Datenschutzerklärung
                </a>
                .
              </p>
            </div>

            <div className="mt-4">
              <button
                type="button"
                onClick={() => setShowSettings((v) => !v)}
                className="font-nunito font-semibold text-warm-brown hover:text-petal-pink transition-colors"
              >
                {showSettings ? "Einstellungen ausblenden" : "Einstellungen anzeigen"}
              </button>

              {showSettings && (
                <div className="mt-4 space-y-4">
                  <div className="p-4 rounded-2xl border border-black/5 bg-white">
                    <p className="font-fredoka text-warm-brown">Notwendig</p>
                    <p className="font-nunito text-sm text-warm-brown/70">Erforderlich für Grundfunktionen.</p>
                    <span className="text-xs font-bold text-mint-green">Immer aktiv</span>
                  </div>

                  <div className="p-4 rounded-2xl border border-black/5 bg-white flex items-start justify-between gap-4">
                    <div>
                      <p className="font-fredoka text-warm-brown">Statistik</p>
                      <p className="font-nunito text-sm text-warm-brown/70">
                        Anonyme Auswertung zur Verbesserung der Website.
                      </p>
                    </div>
                    <input
                      type="checkbox"
                      checked={analytics}
                      onChange={(e) => setAnalytics(e.target.checked)}
                      className="h-4 w-4 accent-petal-pink mt-1"
                    />
                  </div>

                  <div className="p-4 rounded-2xl border border-black/5 bg-white flex items-start justify-between gap-4">
                    <div>
                      <p className="font-fredoka text-warm-brown">Marketing</p>
                      <p className="font-nunito text-sm text-warm-brown/70">Personalisierte Werbung.</p>
                    </div>
                    <input
                      type="checkbox"
                      checked={marketing}
                      onChange={(e) => setMarketing(e.target.checked)}
                      className="h-4 w-4 accent-petal-pink mt-1"
                    />
                  </div>
                </div>
              )}
            </div>

            <div className="mt-6 flex flex-col sm:flex-row gap-3 sm:justify-end">
              {/* ✅ Buttons: Tap über Pointer/Touch */}
              <Button
                type="button"
                variant="outline"
                className="rounded-full font-fredoka"
                {...tap(acceptNecessaryOnly)}
              >
                Nur notwendige
              </Button>

              <Button
                type="button"
                className="rounded-full font-fredoka bg-gradient-to-r from-petal-pink to-peach text-white"
                {...tap(showSettings ? saveSettings : acceptAll)}
              >
                {showSettings ? "Speichern" : "Alle akzeptieren"}
              </Button>
            </div>

            <p className="mt-4 text-xs font-nunito text-warm-brown/50">
              Deine Auswahl kannst du jederzeit über „Cookie-Einstellungen“ im Footer ändern.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}