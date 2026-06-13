"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { C, font } from "@/lib/theme"
import ContactModal from "@/components/ContactModal"

const LINKS = [
  { label: "Our Firm",             href: "/our-firm"       },
  { label: "Global Market Entry",  href: "/global-market-entry" },
  { label: "Deals & Transactions", href: "/deals-transactions" },
  { label: "Managed Services",     href: "/managed-services" },
]

export default function Navbar() {
  const [scrolled,     setScrolled]     = useState(false)
  const [hovered,      setHovered]      = useState(null)
  const [menuOpen,     setMenuOpen]     = useState(false)
  const [showContact,  setShowContact]  = useState(false)

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 24)
    window.addEventListener("scroll", fn)
    return () => window.removeEventListener("scroll", fn)
  }, [])

  return (
    <>
      <ContactModal isOpen={showContact} onClose={() => setShowContact(false)} />
      <style>{`
        @media (max-width: 1023px) {
          .nav-desktop-links { display: none !important; }
          .nav-desktop-cta   { display: none !important; }
        }
        @media (min-width: 1024px) {
          .nav-hamburger     { display: none !important; }
          .nav-mobile-drawer { display: none !important; }
        }
      `}</style>

      <nav style={{
        position:        "sticky",
        top:             0,
        zIndex:          50,
        backgroundColor: scrolled ? "rgba(255,255,255,0.97)" : C.bg,
        backdropFilter:  scrolled ? "blur(20px)" : "none",
        transition:      "background-color 0.35s, box-shadow 0.35s",
        boxShadow:       scrolled ? `0 1px 0 rgba(154,123,60,0.18), 0 4px 24px rgba(12,26,39,0.06)` : `0 1px 0 rgba(154,123,60,0.1)`,
      }}>

        {/* Top gold line */}
        <div style={{
          position:   "absolute",
          top:        0, left: 0, right: 0,
          height:     2,
          background: `linear-gradient(to right, transparent 0%, ${C.gold} 35%, rgba(154,123,60,0.6) 65%, transparent 100%)`,
        }} />

        <div style={{
          maxWidth:       1360,
          margin:         "0 auto",
          padding:        "0 5vw",
          height:         72,
          display:        "flex",
          alignItems:     "center",
          justifyContent: "space-between",
        }}>

          {/* Logo */}
          <a href="/" style={{ textDecoration: "none", flexShrink: 0, display: "flex", alignItems: "center", marginLeft: "-0.75rem" }}>
            <Image src="/logo.png" alt="10✕Global" width={140} height={36} style={{ objectFit: "contain" }} priority />
          </a>

          {/* Desktop nav — hidden on mobile via CSS */}
          <div className="nav-desktop-links" style={{ display: "flex", gap: "2.25rem", alignItems: "center" }}>
            {LINKS.map(({ label, href }) => (
              <a
                key={label}
                href={href}
                onMouseEnter={() => setHovered(label)}
                onMouseLeave={() => setHovered(null)}
                style={{ textDecoration: "none", position: "relative", paddingBottom: 4 }}
              >
                <span style={{
                  fontFamily:    font.sans,
                  color:         C.ink,
                  fontSize:      "0.82rem",
                  fontWeight:    hovered === label ? 600 : 500,
                  letterSpacing: "0.015em",
                  transition:    "font-weight 0.1s",
                  display:       "block",
                  whiteSpace:    "nowrap",
                }}>
                  {label}
                </span>
                <span style={{
                  position:   "absolute",
                  bottom:     0, left: 0,
                  width:      hovered === label ? "100%" : "0%",
                  height:     1,
                  background: `linear-gradient(to right, ${C.gold}, rgba(154,123,60,0.2))`,
                  transition: "width 0.28s ease",
                  display:    "block",
                }} />
              </a>
            ))}
          </div>

          {/* Right side */}
          <div style={{ display: "flex", alignItems: "center", gap: "1rem", flexShrink: 0 }}>

            {/* Desktop CTA */}
            <div className="nav-desktop-cta" style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
              <div style={{ width: 1, height: 20, backgroundColor: "rgba(154,123,60,0.25)" }} />
              <a href="/#engagements" style={{ textDecoration: "none" }}>
                <button
                  onMouseEnter={e => { e.currentTarget.style.backgroundColor = "rgba(154,123,60,0.08)"; e.currentTarget.style.transform = "translateY(-1px)" }}
                  onMouseLeave={e => { e.currentTarget.style.backgroundColor = "transparent";            e.currentTarget.style.transform = "translateY(0)" }}
                  style={{
                    backgroundColor: "transparent",
                    color:           C.gold,
                    padding:         "0.65rem 1.25rem",
                    borderRadius:    4,
                    fontSize:        "0.82rem",
                    fontFamily:      font.sans,
                    fontWeight:      600,
                    border:          `1px solid ${C.gold}`,
                    cursor:          "pointer",
                    letterSpacing:   "0.06em",
                    textTransform:   "uppercase",
                    fontSize:        "0.72rem",
                    transition:      "background-color 0.2s, transform 0.15s",
                    whiteSpace:      "nowrap",
                  }}
                >
                  See Our Work
                </button>
              </a>
              <button
                onClick={() => setShowContact(true)}
                onMouseEnter={e => { e.currentTarget.style.backgroundColor = "#7e6232"; e.currentTarget.style.transform = "translateY(-1px)" }}
                onMouseLeave={e => { e.currentTarget.style.backgroundColor = C.gold;    e.currentTarget.style.transform = "translateY(0)" }}
                style={{
                  backgroundColor: C.gold,
                  color:           "#fff",
                  padding:         "0.65rem 1.5rem",
                  borderRadius:    4,
                  fontFamily:      font.sans,
                  fontWeight:      600,
                  fontSize:        "0.82rem",
                  letterSpacing:   "0.02em",
                  boxShadow:       `0 2px 14px rgba(154,123,60,0.3)`,
                  transition:      "background-color 0.2s, transform 0.15s",
                  whiteSpace:      "nowrap",
                  border:          "none",
                  cursor:          "pointer",
                }}
              >
                Book a call
              </button>
            </div>

            {/* Hamburger */}
            <button
              className="nav-hamburger"
              onClick={() => setMenuOpen(o => !o)}
              aria-label="Toggle menu"
              style={{ background: "none", border: "none", cursor: "pointer", padding: "0.4rem", display: "flex", flexDirection: "column", gap: "5px" }}
            >
              <span style={{ width: 24, height: 2, backgroundColor: C.ink, display: "block", transition: "transform 0.22s", transform: menuOpen ? "translateY(7px) rotate(45deg)" : "none" }} />
              <span style={{ width: 24, height: 2, backgroundColor: C.ink, display: "block", transition: "opacity 0.22s", opacity: menuOpen ? 0 : 1 }} />
              <span style={{ width: 24, height: 2, backgroundColor: C.ink, display: "block", transition: "transform 0.22s", transform: menuOpen ? "translateY(-7px) rotate(-45deg)" : "none" }} />
            </button>
          </div>
        </div>

        {/* Mobile drawer */}
        {menuOpen && (
          <div className="nav-mobile-drawer" style={{
            backgroundColor: C.bg,
            borderTop:       `1px solid rgba(154,123,60,0.15)`,
            boxShadow:       "0 8px 32px rgba(12,26,39,0.1)",
            padding:         "0.5rem 5vw 1.25rem",
          }}>
            {LINKS.map(({ label, href }) => (
              <a
                key={label}
                href={href}
                onClick={() => setMenuOpen(false)}
                style={{ display: "block", textDecoration: "none", padding: "0.875rem 0", borderBottom: `1px solid rgba(154,123,60,0.1)`, fontFamily: font.sans, color: C.ink, fontSize: "0.95rem", fontWeight: 500 }}
              >
                {label}
              </a>
            ))}
            <button onClick={() => { setMenuOpen(false); setShowContact(true) }} style={{ width: "100%", backgroundColor: C.gold, color: "#fff", padding: "0.875rem", borderRadius: 4, fontSize: "0.9rem", fontFamily: font.sans, fontWeight: 600, border: "none", cursor: "pointer", marginTop: "1rem" }}>
              Book a call
            </button>
          </div>
        )}
      </nav>
    </>
  )
}
