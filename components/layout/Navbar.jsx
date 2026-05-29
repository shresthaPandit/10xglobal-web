"use client"

import { useState, useEffect } from "react"
import { C, font } from "@/lib/theme"
import { useIsMobile } from "@/lib/useIsMobile"

const LINKS = [
  { label: "Global Market Entry", href: "#services" },
  { label: "Deals & Transactions", href: "#services" },
  { label: "Managed Services",     href: "#services" },
  { label: "Our Firm",             href: "#team"     },
]

export default function Navbar() {
  const [scrolled,  setScrolled]  = useState(false)
  const [hovered,   setHovered]   = useState(null)
  const [menuOpen,  setMenuOpen]  = useState(false)
  const isMobile = useIsMobile()

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 24)
    window.addEventListener("scroll", fn)
    return () => window.removeEventListener("scroll", fn)
  }, [])

  // Close menu on resize to desktop
  useEffect(() => { if (!isMobile) setMenuOpen(false) }, [isMobile])

  return (
    <nav style={{
      position:        "sticky",
      top:             0,
      zIndex:          50,
      backgroundColor: scrolled ? "rgba(247,243,238,0.97)" : C.bg,
      backdropFilter:  scrolled ? "blur(20px)" : "none",
      transition:      "background-color 0.35s, box-shadow 0.35s",
      boxShadow:       scrolled ? "0 1px 0 rgba(193,127,62,0.18), 0 4px 24px rgba(20,18,16,0.06)" : "0 1px 0 rgba(193,127,62,0.1)",
    }}>

      {/* Top copper line */}
      <div style={{
        position:   "absolute",
        top:        0, left: 0, right: 0,
        height:     2,
        background: `linear-gradient(to right, transparent 0%, ${C.copper} 35%, rgba(193,127,62,0.7) 65%, transparent 100%)`,
      }} />

      <div style={{
        maxWidth:       1360,
        margin:         "0 auto",
        padding:        "0 5vw",
        height:         isMobile ? 64 : 80,
        display:        "flex",
        alignItems:     "center",
        justifyContent: "space-between",
      }}>

        {/* Logo */}
        <a href="/" style={{ textDecoration: "none", flexShrink: 0 }}>
          <div style={{ display: "flex", alignItems: "baseline", gap: "0.08em", marginBottom: 3 }}>
            <span style={{ fontFamily: font.serif, fontWeight: 700, fontSize: isMobile ? "1.2rem" : "1.5rem", color: C.ink, letterSpacing: "-0.03em", lineHeight: 1 }}>
              10
            </span>
            <span style={{ fontFamily: font.serif, fontWeight: 400, fontSize: isMobile ? "0.9rem" : "1.1rem", color: C.copper, lineHeight: 1, fontStyle: "italic", margin: "0 0.05em" }}>
              ×
            </span>
            <span style={{ fontFamily: font.serif, fontWeight: 700, fontSize: isMobile ? "1.2rem" : "1.5rem", color: C.ink, letterSpacing: "-0.03em", lineHeight: 1 }}>
              Global
            </span>
          </div>
          <div style={{ height: "1px", background: `linear-gradient(to right, ${C.copper}, rgba(193,127,62,0.15))`, width: "68%" }} />
        </a>

        {/* Desktop nav links */}
        {!isMobile && (
          <div style={{ display: "flex", gap: "2.75rem", alignItems: "center" }}>
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
                  color:         hovered === label ? C.ink : C.ink,
                  fontSize:      "0.83rem",
                  fontWeight:    hovered === label ? 700 : 500,
                  letterSpacing: "0.02em",
                  transition:    "color 0.2s, font-weight 0.1s",
                  display:       "block",
                  whiteSpace:    "nowrap",
                }}>
                  {label}
                </span>
                <span style={{
                  position:   "absolute",
                  bottom:     0,
                  left:       0,
                  width:      hovered === label ? "100%" : "0%",
                  height:     1,
                  background: `linear-gradient(to right, ${C.copper}, rgba(193,127,62,0.25))`,
                  transition: "width 0.28s ease",
                  display:    "block",
                }} />
              </a>
            ))}
          </div>
        )}

        {/* Right side */}
        <div style={{ display: "flex", alignItems: "center", gap: "1rem", flexShrink: 0 }}>
          {!isMobile && (
            <>
              <div style={{ width: 1, height: 20, backgroundColor: "rgba(193,127,62,0.25)" }} />
              <a href="#cta" style={{ textDecoration: "none" }}>
                <button
                  onMouseEnter={e => { e.currentTarget.style.backgroundColor = "#a86e35"; e.currentTarget.style.transform = "translateY(-1px)" }}
                  onMouseLeave={e => { e.currentTarget.style.backgroundColor = C.copper;   e.currentTarget.style.transform = "translateY(0)" }}
                  style={{
                    backgroundColor: C.copper,
                    color:           "#fff",
                    padding:         "0.65rem 1.6rem",
                    borderRadius:    6,
                    fontSize:        "0.83rem",
                    fontFamily:      font.sans,
                    fontWeight:      600,
                    border:          "none",
                    cursor:          "pointer",
                    letterSpacing:   "0.02em",
                    boxShadow:       "0 2px 14px rgba(193,127,62,0.3)",
                    transition:      "background-color 0.2s, transform 0.15s",
                  }}
                >
                  Book a call
                </button>
              </a>
            </>
          )}

          {/* Hamburger */}
          {isMobile && (
            <button
              onClick={() => setMenuOpen(o => !o)}
              aria-label="Toggle menu"
              style={{ background: "none", border: "none", cursor: "pointer", padding: "0.4rem", display: "flex", flexDirection: "column", gap: "5px" }}
            >
              <span style={{ width: 24, height: 2, backgroundColor: C.ink, display: "block", transition: "transform 0.22s", transform: menuOpen ? "translateY(7px) rotate(45deg)" : "none" }} />
              <span style={{ width: 24, height: 2, backgroundColor: C.ink, display: "block", transition: "opacity 0.22s", opacity: menuOpen ? 0 : 1 }} />
              <span style={{ width: 24, height: 2, backgroundColor: C.ink, display: "block", transition: "transform 0.22s", transform: menuOpen ? "translateY(-7px) rotate(-45deg)" : "none" }} />
            </button>
          )}
        </div>
      </div>

      {/* Mobile drawer */}
      {isMobile && menuOpen && (
        <div style={{
          backgroundColor: C.bg,
          borderTop:       `1px solid rgba(193,127,62,0.15)`,
          boxShadow:       "0 8px 32px rgba(20,18,16,0.1)",
          padding:         "0.5rem 5vw 1.25rem",
        }}>
          {LINKS.map(({ label, href }) => (
            <a
              key={label}
              href={href}
              onClick={() => setMenuOpen(false)}
              style={{
                display:       "block",
                textDecoration:"none",
                padding:       "0.875rem 0",
                borderBottom:  `1px solid rgba(193,127,62,0.1)`,
                fontFamily:    font.sans,
                color:         C.ink,
                fontSize:      "0.95rem",
                fontWeight:    500,
              }}
            >
              {label}
            </a>
          ))}
          <a href="#cta" style={{ textDecoration: "none", display: "block", marginTop: "1rem" }} onClick={() => setMenuOpen(false)}>
            <button style={{
              width:           "100%",
              backgroundColor: C.copper,
              color:           "#fff",
              padding:         "0.875rem",
              borderRadius:    8,
              fontSize:        "0.9rem",
              fontFamily:      font.sans,
              fontWeight:      600,
              border:          "none",
              cursor:          "pointer",
            }}>
              Book a call
            </button>
          </a>
        </div>
      )}
    </nav>
  )
}
