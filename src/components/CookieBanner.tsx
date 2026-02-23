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

  // verhindert doppeltes Init durch StrictMode
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

    // iOS: erst nach Paint öffnen
    requestAnimationFrame(() => requestAnimationFrame(() => setOpen(true)))
  }, [])

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

  useEffect(() => {
    if (!open) return
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false)
    }
    window.addEventListener("keydown", onKeyDown)
    return () => window.removeEventListener("keydown", onKeyDown)
  }, [open])

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

  const acceptAll = () => {
    writeConsent({ necessary: true, analytics: true, marketing: true, version: CONSENT_VERSION })
    setOpen(false)
  }

  const acceptNecessaryOnly = () => {
    writeConsent({ necessary: true, analytics: false, marketing: false, version: CONSENT_VERSION })
    setOpen(false)
  }

  const saveSettings = () => {
    writeConsent({ necessary: true, analytics, marketing, version: CONSENT_VERSION })
    setOpen(false)
  }

  return (
    <div
      className="fixed inset-0 z-[9999]"
      style={{ WebkitTapHighlightColor: "transparent" }}
    >
      {/* ✅ BACKDROP (nur visuell, niemals klickbar) */}
      <div className="absolute inset-0 z-0 pointer-events-none bg-warm-brown/40" />
      <div className="absolute inset-0 z-0 pointer-events-none backdrop-blur-sm" />

      {/* ✅ CLICK-CATCHER: nur außerhalb Modal (z-10) */}
      <button
        type="button"
        className="absolute inset-0 z-10 bg-transparent"
        aria-label="Cookie Banner schließen"
        onClick={() => setOpen(false)}
      />

      {/* ✅ MODAL: ganz oben (z-20) */}
      <div className="absolute inset-0 z-20 flex items-end sm:items-center justify-center p-4">
        <div
          role="dialog"
          aria-modal="true"
          className="w-full max-w-2xl bg-white rounded-3xl shadow-pet-hover border border-black/5 overflow-hidden"
          onClick={(e) => e.stopPropagation()}
          // iOS stacking/touch stabilisieren
          style={{ WebkitTransform: "translateZ(0)" }}
        >
          {/* Header */}
          <div className="p-6 flex items-start justify-between gap-4">
            <div>
              <h3 className="font-fredoka text-2xl font-bold text-warm-brown">Cookie-Einstellungen</h3>
              <p className="mt-2 font-nunito text-warm-brown/70">
                Wir verwenden Cookies, um die Website sicher zu betreiben. Mit deiner Zustimmung nutzen wir zusätzlich
                Statistik- oder Marketing-Cookies.
              </p>
            </div>

            <button
              type="button"
              onClick={() => setOpen(false)}
              aria-label="Schließen"
              className="text-warm-brown/60 hover:text-petal-pink transition-colors"
              title="Schließen"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* Body */}
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
              <Button
                type="button"
                variant="outline"
                className="rounded-full font-fredoka"
                onClick={acceptNecessaryOnly}
              >
                Nur notwendige
              </Button>

              <Button
                type="button"
                className="rounded-full font-fredoka bg-gradient-to-r from-petal-pink to-peach text-white"
                onClick={showSettings ? saveSettings : acceptAll}
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