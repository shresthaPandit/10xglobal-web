"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { C, font } from "@/lib/theme"
import ContactModal from "@/components/ContactModal"

const WORDS  = ["Expansion", "Finance", "Compliance", "Operations", "Growth"]
const SUFFIX = " Partner."

function CyclingPhrase({ onWordChange }) {
  const [idx, setIdx]             = useState(0)
  const [displayed, setDisplayed] = useState(WORDS[0] + SUFFIX)
  const [phase, setPhase]         = useState("pause")

  useEffect(() => { onWordChange?.(idx) }, [idx])

  useEffect(() => {
    const full = WORDS[idx] + SUFFIX
    let t
    if (phase === "pause") {
      t = setTimeout(() => setPhase("erasing"), 1800)
    } else if (phase === "erasing") {
      if (displayed.length > 0) {
        t = setTimeout(() => setDisplayed(d => d.slice(0, -1)), 28)
      } else {
        setIdx(i => (i + 1) % WORDS.length)
        setPhase("typing")
      }
    } else {
      if (displayed.length < full.length) {
        t = setTimeout(() => setDisplayed(full.slice(0, displayed.length + 1)), 55)
      } else {
        setPhase("pause")
      }
    }
    return () => clearTimeout(t)
  }, [displayed, phase, idx])

  const keywordDisplayed = displayed.slice(0, Math.min(displayed.length, WORDS[idx].length))
  const suffixDisplayed  = displayed.length > WORDS[idx].length ? displayed.slice(WORDS[idx].length) : ""

  return (
    <>
      <em style={{ fontFamily: font.serif, fontStyle: "italic", fontWeight: 400, color: C.red }}>{keywordDisplayed}</em>
      <span style={{ color: "#fff" }}>{suffixDisplayed}</span>
      <motion.span
        animate={{ opacity: [1, 1, 0, 0] }}
        transition={{ duration: 0.8, repeat: Infinity, ease: "linear", times: [0, 0.45, 0.5, 0.95] }}
        style={{ color: C.red, marginLeft: "2px", fontWeight: 200 }}
      >|</motion.span>
    </>
  )
}

const BULLETS = [
  "Entering a new market",
  "Raising capital or closing a deal",
  "Looking for ongoing managed support",
]

const OFFICES = [
  {
    tag:     "India",
    label:   "INDIA · HEADQUARTERS",
    city:    "New Delhi",
    address: "2/6 Block 2, West Patel Nagar, New Delhi 110008",
    email:   "info@10x.global",
    phone:   "+91 8800565608",
    est:     "Est. September 2012",
    primary: true,
    align:   "left",
  },
  {
    tag:     "UAE",
    label:   "UAE · MENA HUB",
    city:    "Dubai",
    address: "1607 JBC5, Cluster W, Jumeirah Lake Towers, Dubai",
    email:   "info@10x.global",
    phone:   "+971 04 5757988",
    est:     "Est. 2022",
    primary: false,
    align:   "left",
  },
  {
    tag:     "Singapore",
    label:   "SINGAPORE · SE ASIA",
    city:    "Singapore",
    address: "200 Jalan Sultan, #11-01 Textile Centre, Singapore 199018",
    email:   "info@10x.global",
    phone:   null,
    est:     "Est. 2017",
    primary: false,
    align:   "right",
  },
  {
    tag:     "United States",
    label:   "UNITED STATES · AMERICAS",
    city:    "Delaware",
    address: "605 Geddes Street, Wilmington, DE 19805",
    email:   "info@10x.global",
    phone:   null,
    est:     "Est. October 2025",
    primary: false,
    align:   "right",
  },
]

function OfficeTag({ office }) {
  const [hovered, setHovered] = useState(false)

  return (
    <div
      style={{ position: "relative", display: "inline-block" }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Tag */}
      <span style={{
        display:       "block",
        fontFamily:    font.sans,
        fontSize:      "0.75rem",
        color:         hovered ? C.ink : "rgba(12,26,39,0.55)",
        border:        `1px solid ${hovered ? "rgba(12,26,39,0.4)" : "rgba(12,26,39,0.15)"}`,
        padding:       "0.35rem 0.85rem",
        cursor:        "default",
        transition:    "color 0.18s, border-color 0.18s",
        userSelect:    "none",
      }}>
        {office.tag}
      </span>

      {/* Popover card */}
      <AnimatePresence>
        {hovered && (
          <motion.div
            initial={{ opacity: 0, y: 8, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.96 }}
            transition={{ duration: 0.18, ease: [0.22, 1, 0.36, 1] }}
            style={{
              position:        "absolute",
              bottom:          "calc(100% + 10px)",
              ...(office.align === "right" ? { right: 0 } : { left: 0 }),
              width:           252,
              backgroundColor: "#fff",
              border:          "1px solid rgba(12,26,39,0.1)",
              boxShadow:       "0 12px 40px rgba(12,26,39,0.13), 0 2px 8px rgba(12,26,39,0.06)",
              padding:         "1.25rem 1.4rem 1.1rem",
              zIndex:          100,
              pointerEvents:   "none",
            }}
          >
            {/* Eyebrow */}
            <span style={{
              display:       "block",
              fontFamily:    font.sans,
              fontSize:      "0.52rem",
              fontWeight:    700,
              letterSpacing: "0.2em",
              textTransform: "uppercase",
              color:         C.red,
              marginBottom:  "0.45rem",
            }}>
              {office.label}
            </span>

            {/* City */}
            <div style={{
              fontFamily:   font.serif,
              fontSize:     "1.45rem",
              fontWeight:   300,
              color:        C.ink,
              lineHeight:   1.1,
              marginBottom: "0.8rem",
            }}>
              {office.city}
            </div>

            {/* Divider */}
            <div style={{ height: 1, backgroundColor: "rgba(12,26,39,0.07)", marginBottom: "0.8rem" }} />

            {/* Address */}
            <div style={{
              fontFamily:   font.sans,
              fontSize:     "0.7rem",
              color:        "rgba(12,26,39,0.52)",
              lineHeight:   1.65,
              marginBottom: "0.4rem",
            }}>
              {office.address}
            </div>

            {/* Email */}
            <div style={{ fontFamily: font.sans, fontSize: "0.7rem", color: "rgba(12,26,39,0.52)", marginBottom: office.phone ? "0.2rem" : "0.75rem" }}>
              {office.email}
            </div>

            {/* Phone */}
            {office.phone && (
              <div style={{ fontFamily: font.sans, fontSize: "0.7rem", color: "rgba(12,26,39,0.52)", marginBottom: "0.75rem" }}>
                {office.phone}
              </div>
            )}

            {/* Est */}
            <div style={{
              fontFamily:    font.sans,
              fontSize:      "0.58rem",
              fontWeight:    700,
              letterSpacing: "0.12em",
              textTransform: "uppercase",
              color:         C.gold,
              marginBottom:  office.primary ? "0.65rem" : 0,
            }}>
              {office.est}
            </div>

            {/* Primary badge */}
            {office.primary && (
              <div style={{
                display:     "inline-flex",
                alignItems:  "center",
                gap:         "0.4rem",
                border:      "1px solid rgba(12,26,39,0.15)",
                borderRadius: 20,
                padding:     "0.22rem 0.6rem",
              }}>
                <span style={{ width: 6, height: 6, borderRadius: "50%", backgroundColor: "#5C9E5C", flexShrink: 0 }} />
                <span style={{ fontFamily: font.sans, fontSize: "0.57rem", fontWeight: 600, color: C.ink }}>
                  Primary operating office
                </span>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default function CTASection() {
  const [showContact, setShowContact]     = useState(false)
  const [activeWordIdx, setActiveWordIdx] = useState(0)
  return (
    <>
    <ContactModal isOpen={showContact} onClose={() => setShowContact(false)} />
    <section id="cta">
      <style>{`
        .cta-grid { display: grid; grid-template-columns: 62fr 38fr; min-height: clamp(520px, 46vw, 800px); }
        @media (max-width: 767px) { .cta-grid { grid-template-columns: 1fr; } }
      `}</style>

      <div className="cta-grid">

        {/* Left — Why Companies (was Right) */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55 }}
          style={{ backgroundColor: C.ink, padding: "clamp(4rem, 5.5vw, 7rem) 5vw", display: "flex", flexDirection: "column", justifyContent: "center", borderTop: "2px solid rgba(255,255,255,0.3)", borderBottom: "2px solid rgba(255,255,255,0.3)" }}
        >
          <span style={{
            display:       "block",
            fontFamily:    font.sans,
            fontSize:      "0.72rem",
            fontWeight:    700,
            letterSpacing: "0.24em",
            textTransform: "uppercase",
            color:         "rgba(255,255,255,0.45)",
            marginBottom:  "1.75rem",
          }}>
            Why Companies Choose 10x Global
          </span>

          <h2 style={{
            fontFamily:          font.sans,
            fontSize:            "clamp(2rem, 3.5vw, 4.5rem)",
            fontWeight:          800,
            color:               "#fff",
            lineHeight:          1.1,
            marginBottom:        "1.75rem",
            WebkitFontSmoothing: "antialiased",
            letterSpacing:       "-0.02em",
          }}>
            Your Global <CyclingPhrase onWordChange={setActiveWordIdx} />
          </h2>

          <p style={{
            fontFamily: font.sans,
            fontSize:   "1rem",
            color:      "rgba(255,255,255,0.48)",
            lineHeight: 1.9,
            maxWidth:   520,
            marginBottom: "2rem",
          }}>
            Every business crossing a border needs to enter it, fund it, and operate it.{" "}
            <strong style={{ color: "rgba(255,255,255,0.82)", fontWeight: 700 }}>Most firms solve one.</strong>{" "}
            We manage all three with a single integrated team across{" "}
            <strong style={{ color: "rgba(255,255,255,0.82)", fontWeight: 700 }}>finance, legal, and compliance.</strong>
          </p>

          {/* Animated word pills */}
          <div style={{ display: "flex", flexWrap: "wrap", gap: "0.6rem" }}>
            {WORDS.map((word, i) => (
              <motion.span
                key={word}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: 0.3 + i * 0.08, ease: [0.22, 1, 0.36, 1] }}
                style={{
                  fontFamily:    font.sans,
                  fontSize:      "0.72rem",
                  fontWeight:    700,
                  letterSpacing: "0.16em",
                  textTransform: "uppercase",
                  color:           i === activeWordIdx ? C.red : "rgba(255,255,255,0.5)",
                  border:          `1px solid ${i === activeWordIdx ? C.red : "rgba(255,255,255,0.12)"}`,
                  padding:         "0.45rem 0.9rem",
                  borderRadius:    "4px",
                  backgroundColor: i === activeWordIdx ? "rgba(184,50,40,0.12)" : "rgba(255,255,255,0.04)",
                  transition:      "color 0.3s, border-color 0.3s, background-color 0.3s",
                }}
              >
                {word}
              </motion.span>
            ))}
          </div>
        </motion.div>

        {/* Right — Get Started (was Left) */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55, delay: 0.15 }}
          style={{ backgroundColor: "#ffffff", padding: "clamp(4rem, 5.5vw, 7rem) 5vw", display: "flex", flexDirection: "column", justifyContent: "center", borderLeft: "1px solid rgba(12,26,39,0.07)" }}
        >
          <span style={{ fontFamily: font.sans, fontSize: "0.62rem", fontWeight: 700, letterSpacing: "0.22em", textTransform: "uppercase", color: "#8C1A2B", display: "block", marginBottom: "1.25rem" }}>
            Get Started
          </span>

          <h2 style={{ fontFamily: font.sans, fontSize: "clamp(2.4rem, 4vw, 3.6rem)", fontWeight: 800, color: C.ink, lineHeight: 1.08, marginBottom: "1.25rem" }}>
            Where are you<br />going{" "}
            <em style={{ fontStyle: "normal", color: C.red }}>next?</em>
          </h2>

          <p style={{ fontFamily: font.sans, fontSize: "0.9rem", color: "rgba(12,26,39,0.58)", lineHeight: 1.8, marginBottom: "1.75rem", maxWidth: 480 }}>
            Let's build the roadmap together. A free 30-minute strategy session with our partners. No jargon, no obligation.
          </p>

          <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: "0.6rem", marginBottom: "2.25rem" }}>
            {BULLETS.map(b => (
              <li key={b} style={{ display: "flex", alignItems: "center", gap: "0.65rem", fontFamily: font.sans, fontSize: "0.875rem", color: "rgba(12,26,39,0.65)" }}>
                <span style={{ color: C.red, fontSize: "0.75rem", flexShrink: 0 }}>→</span>
                {b}
              </li>
            ))}
          </ul>

          <button
            onClick={() => setShowContact(true)}
            onMouseEnter={e => e.currentTarget.style.backgroundColor = "#7e6232"}
            onMouseLeave={e => e.currentTarget.style.backgroundColor = C.gold}
            style={{ backgroundColor: C.gold, color: "#fff", padding: "1.1rem 2rem", border: "none", cursor: "pointer", fontFamily: font.sans, fontWeight: 700, fontSize: "0.65rem", letterSpacing: "0.18em", textTransform: "uppercase", transition: "background-color 0.2s", width: "100%", maxWidth: 480 }}
          >
            Book a Strategy Session
          </button>
        </motion.div>

      </div>
    </section>
    </>
  )
}
