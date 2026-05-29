"use client"

import { useState, useEffect } from "react"
import { C, font } from "@/lib/theme"

const LINKS = [
  { label: "Global Market Entry", href: "#services" },
  { label: "Deals & Transactions", href: "#services" },
  { label: "Managed Services",     href: "#services" },
  { label: "Our Firm",             href: "#team"     },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [hovered, setHovered] = useState(null)

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 24)
    window.addEventListener("scroll", fn)
    return () => window.removeEventListener("scroll", fn)
  }, [])

  return (
    <nav style={{
      position:        "sticky",
      top:             0,
      zIndex:          50,
      backgroundColor: scrolled ? "rgba(247,243,238,0.96)" : C.bg,
      backdropFilter:  scrolled ? "blur(16px)" : "none",
      transition:      "background-color 0.3s, backdrop-filter 0.3s",
      borderBottom:    `1px solid ${scrolled ? "rgba(193,127,62,0.2)" : "rgba(193,127,62,0.12)"}`,
    }}>
      {/* Thin copper top accent line */}
      <div style={{
        position:        "absolute",
        top:             0,
        left:            0,
        right:           0,
        height:          2,
        background:      "linear-gradient(to right, transparent 0%, rgba(193,127,62,0.6) 20%, #C17F3E 50%, rgba(193,127,62,0.6) 80%, transparent 100%)",
      }} />

      <div style={{
        maxWidth:       1400,
        margin:         "0 auto",
        padding:        "0 5vw",
        height:         72,
        display:        "flex",
        alignItems:     "center",
        justifyContent: "space-between",
      }}>

        {/* Logo */}
        <a href="/" style={{ textDecoration: "none", flexShrink: 0 }}>
          <div style={{ display: "flex", alignItems: "baseline", gap: "0.1em" }}>
            <span style={{
              fontFamily:    font.serif,
              fontWeight:    700,
              fontSize:      "1.4rem",
              color:         C.ink,
              letterSpacing: "-0.02em",
              lineHeight:    1,
            }}>
              10
            </span>
            <span style={{
              fontFamily:    font.serif,
              fontWeight:    700,
              fontSize:      "1.1rem",
              color:         C.copper,
              lineHeight:    1,
            }}>
              ×
            </span>
            <span style={{
              fontFamily:    font.serif,
              fontWeight:    700,
              fontSize:      "1.4rem",
              color:         C.ink,
              letterSpacing: "-0.02em",
              lineHeight:    1,
              marginLeft:    "0.25rem",
            }}>
              Global
            </span>
          </div>
          {/* Thin copper underline on logo */}
          <div style={{ height: 1, background: `linear-gradient(to right, ${C.copper}, transparent)`, marginTop: 2, width: "70%" }} />
        </a>

        {/* Nav links */}
        <div style={{ display: "flex", gap: "2.5rem", alignItems: "center" }}>
          {LINKS.map(({ label, href }) => (
            <a
              key={label}
              href={href}
              onMouseEnter={() => setHovered(label)}
              onMouseLeave={() => setHovered(null)}
              style={{ textDecoration: "none", position: "relative", paddingBottom: 3 }}
            >
              <span style={{
                fontFamily:    font.sans,
                color:         hovered === label ? C.ink : "#5a5350",
                fontSize:      "0.85rem",
                fontWeight:    500,
                letterSpacing: "0.01em",
                transition:    "color 0.2s",
                display:       "block",
              }}>
                {label}
              </span>
              <span style={{
                position:        "absolute",
                bottom:          0,
                left:            0,
                width:           hovered === label ? "100%" : "0%",
                height:          1,
                background:      `linear-gradient(to right, ${C.copper}, rgba(193,127,62,0.3))`,
                transition:      "width 0.25s ease",
                display:         "block",
              }} />
            </a>
          ))}
        </div>

        {/* CTA */}
        <a href="#cta" style={{ textDecoration: "none", flexShrink: 0 }}>
          <button
            onMouseEnter={e => {
              e.currentTarget.style.backgroundColor = "#a86e35"
              e.currentTarget.style.boxShadow = "0 4px 20px rgba(193,127,62,0.35)"
            }}
            onMouseLeave={e => {
              e.currentTarget.style.backgroundColor = C.copper
              e.currentTarget.style.boxShadow = "0 2px 12px rgba(193,127,62,0.25)"
            }}
            style={{
              backgroundColor: C.copper,
              color:           "#fff",
              padding:         "0.6rem 1.5rem",
              borderRadius:    8,
              fontSize:        "0.85rem",
              fontFamily:      font.sans,
              fontWeight:      600,
              border:          "none",
              cursor:          "pointer",
              letterSpacing:   "0.01em",
              boxShadow:       "0 2px 12px rgba(193,127,62,0.25)",
              transition:      "background-color 0.2s, box-shadow 0.2s",
            }}
          >
            Book a call
          </button>
        </a>
      </div>
    </nav>
  )
}
