import { useEffect, useRef, useState } from "react"

type Consent = {
  necessary: true
  analytics: boolean
  marketing: boolean
  timestamp: number
  version: string
}

const STORAGE_KEY = "haustieroase_cookie_consent"
const CONSENT_VERSION = "1.0"

function readConsent(): Consent | null {
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

function writeConsent(consent: Omit<Consent, "timestamp">) {
  const payload: Consent = { ...consent, timestamp: Date.now() }
  localStorage.setItem(STORAGE_KEY, JSON.stringify(payload))
  window.dispatchEvent(new CustomEvent("cookie-consent-changed", { detail: payload }))
}

export default function CookieBanner() {
  const [open, setOpen] = useState(false)
  const [showSettings, setShowSettings] = useState(false)
  const [analytics, setAnalytics] = useState(false)
  const [marketing, setMarketing] = useState(false)

  const didInit = useRef(false)

  useEffect(() => {
    if (didInit.current) return
    didInit.current = true

    const existing = readConsent()
    if (!existing) {
      setOpen(true)
      return
    }
    setAnalytics(existing.analytics)
    setMarketing(existing.marketing)
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
    if (!open) {
      document.body.style.overflow = ""
      return
    }
    document.body.style.overflow = "hidden"
    return () => {
      document.body.style.overflow = ""
    }
  }, [open])

  if (!open) return null

  const close = () => setOpen(false)

  const acceptAll = () => {
    writeConsent({ necessary: true, analytics: true, marketing: true, version: CONSENT_VERSION })
    close()
  }

  const acceptNecessary = () => {
    writeConsent({ necessary: true, analytics: false, marketing: false, version: CONSENT_VERSION })
    close()
  }

  const save = () => {
    writeConsent({ necessary: true, analytics, marketing, version: CONSENT_VERSION })
    close()
  }

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 999999,
      }}
    >
      {/* Backdrop */}
      <div
        onClick={close}
        style={{
          position: "absolute",
          inset: 0,
          background: "rgba(0,0,0,0.55)",
        }}
      />

      {/* Modal */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: 16,
          pointerEvents: "none", // ✅ nur Card bekommt Pointer Events
        }}
      >
        <div
          role="dialog"
          aria-modal="true"
          onClick={(e) => e.stopPropagation()}
          style={{
            width: "100%",
            maxWidth: 720,
            background: "white",
            borderRadius: 24,
            padding: 20,
            boxShadow: "0 20px 80px rgba(0,0,0,0.25)",
            pointerEvents: "auto", // ✅ Klicks nur hier
            fontFamily: "system-ui, -apple-system, Segoe UI, Roboto, Arial",
          }}
        >
          <div style={{ display: "flex", gap: 12, justifyContent: "space-between" }}>
            <div>
              <div style={{ fontSize: 22, fontWeight: 800, color: "#5d4e45" }}>Cookie-Einstellungen</div>
              <div style={{ marginTop: 8, color: "rgba(93,78,69,0.75)", lineHeight: 1.4 }}>
                Wir verwenden Cookies, um die Website sicher zu betreiben. Mit deiner Zustimmung nutzen wir zusätzlich
                Statistik- oder Marketing-Cookies.
              </div>
            </div>

            {/* X */}
            <button
              type="button"
              onClick={close}
              style={{
                border: "none",
                background: "transparent",
                fontSize: 26,
                cursor: "pointer",
                color: "rgba(93,78,69,0.7)",
              }}
              aria-label="Schließen"
              title="Schließen"
            >
              ×
            </button>
          </div>

          <div
            style={{
              marginTop: 16,
              background: "rgba(248,239,232,0.8)",
              borderRadius: 16,
              padding: 14,
              border: "1px solid rgba(0,0,0,0.06)",
              color: "rgba(93,78,69,0.8)",
              fontSize: 14,
            }}
          >
            Details findest du in unserer{" "}
            <a href="/datenschutz" style={{ color: "#f08aa0", fontWeight: 700 }}>
              Datenschutzerklärung
            </a>
            .
          </div>

          <div style={{ marginTop: 14 }}>
            <button
              type="button"
              onClick={() => setShowSettings((v) => !v)}
              style={{
                border: "none",
                background: "transparent",
                padding: 0,
                cursor: "pointer",
                color: "#5d4e45",
                fontWeight: 700,
              }}
            >
              {showSettings ? "Einstellungen ausblenden" : "Einstellungen anzeigen"}
            </button>

            {showSettings && (
              <div style={{ marginTop: 14, display: "grid", gap: 12 }}>
                <div style={{ border: "1px solid rgba(0,0,0,0.06)", borderRadius: 16, padding: 14 }}>
                  <div style={{ fontWeight: 800, color: "#5d4e45" }}>Notwendig</div>
                  <div style={{ color: "rgba(93,78,69,0.7)", fontSize: 14, marginTop: 6 }}>
                    Erforderlich für Grundfunktionen. Immer aktiv.
                  </div>
                </div>

                <label
                  style={{
                    border: "1px solid rgba(0,0,0,0.06)",
                    borderRadius: 16,
                    padding: 14,
                    display: "flex",
                    justifyContent: "space-between",
                    gap: 12,
                    cursor: "pointer",
                  }}
                >
                  <div>
                    <div style={{ fontWeight: 800, color: "#5d4e45" }}>Statistik</div>
                    <div style={{ color: "rgba(93,78,69,0.7)", fontSize: 14, marginTop: 6 }}>
                      Anonyme Auswertung zur Verbesserung der Website.
                    </div>
                  </div>
                  <input
                    type="checkbox"
                    checked={analytics}
                    onChange={(e) => setAnalytics(e.target.checked)}
                  />
                </label>

                <label
                  style={{
                    border: "1px solid rgba(0,0,0,0.06)",
                    borderRadius: 16,
                    padding: 14,
                    display: "flex",
                    justifyContent: "space-between",
                    gap: 12,
                    cursor: "pointer",
                  }}
                >
                  <div>
                    <div style={{ fontWeight: 800, color: "#5d4e45" }}>Marketing</div>
                    <div style={{ color: "rgba(93,78,69,0.7)", fontSize: 14, marginTop: 6 }}>
                      Personalisierte Werbung (nur mit Zustimmung).
                    </div>
                  </div>
                  <input
                    type="checkbox"
                    checked={marketing}
                    onChange={(e) => setMarketing(e.target.checked)}
                  />
                </label>
              </div>
            )}
          </div>

          {/* Buttons */}
          <div
            style={{
              marginTop: 18,
              display: "flex",
              flexWrap: "wrap",
              gap: 10,
              justifyContent: "flex-end",
            }}
          >
            <button
              type="button"
              onClick={acceptNecessary}
              style={{
                padding: "10px 16px",
                borderRadius: 999,
                border: "1px solid rgba(0,0,0,0.12)",
                background: "white",
                cursor: "pointer",
                fontWeight: 800,
                color: "#5d4e45",
              }}
            >
              Nur notwendige
            </button>

            <button
              type="button"
              onClick={showSettings ? save : acceptAll}
              style={{
                padding: "10px 16px",
                borderRadius: 999,
                border: "none",
                background: "linear-gradient(90deg,#f08aa0,#f2b48a)",
                color: "white",
                cursor: "pointer",
                fontWeight: 900,
              }}
            >
              {showSettings ? "Speichern" : "Alle akzeptieren"}
            </button>
          </div>

          <div style={{ marginTop: 12, fontSize: 12, color: "rgba(93,78,69,0.55)" }}>
            Deine Auswahl kannst du jederzeit über „Cookie-Einstellungen“ im Footer ändern.
          </div>
        </div>
      </div>
    </div>
  )
}