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
    <section id="cta" style={{ backgroundColor: "#ffffff", borderTop: "1px solid rgba(12,26,39,0.08)", padding: "9rem 7vw" }}>
      <style>{`
        .cta-btn {
          position: relative; overflow: hidden;
          background: ${C.ink}; color: #fff;
          padding: 1rem 2.25rem; border: none; cursor: pointer;
          font-family: ${font.sans}; font-weight: 700; font-size: 0.68rem;
          letter-spacing: 0.2em; text-transform: uppercase;
          display: inline-flex; align-items: center; gap: 0.65rem;
          transition: color 0.3s;
        }
        .cta-btn::before {
          content: ''; position: absolute; inset: 0;
          background: ${C.red};
          transform: translateX(-100%);
          transition: transform 0.35s cubic-bezier(0.22,1,0.36,1);
        }
        .cta-btn:hover::before { transform: translateX(0); }
        .cta-btn span { position: relative; z-index: 1; }
        .cta-btn .arrow { position: relative; z-index: 1; transition: transform 0.3s ease; }
        .cta-btn:hover .arrow { transform: translateX(5px); }
      `}</style>

      <div style={{ maxWidth: 1100, margin: "0 auto" }}>

        {/* Heading — full width above */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          style={{ marginBottom: "2.5rem" }}
        >
          <span style={{ fontFamily: font.sans, fontSize: "0.6rem", fontWeight: 700, letterSpacing: "0.26em", textTransform: "uppercase", color: "rgba(12,26,39,0.35)", display: "block", marginBottom: "0.9rem" }}>
            Get Started
          </span>
          <h2 style={{ fontFamily: font.sans, fontSize: "clamp(2.6rem, 4.2vw, 4.6rem)", fontWeight: 800, color: C.ink, lineHeight: 1.1, margin: 0 }}>
            Where are you going{" "}
            <em style={{ fontStyle: "normal", color: C.red }}>next?</em>
          </h2>
        </motion.div>

        {/* Bottom row — description + bullets + button side by side */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.15 }}
          style={{ display: "flex", flexDirection: "column", gap: "2rem" }}
        >
          <div style={{ display: "flex", alignItems: "flex-start", gap: "3rem", flexWrap: "wrap" }}>
            <p style={{ fontFamily: font.sans, fontSize: "1.05rem", color: "rgba(12,26,39,0.52)", lineHeight: 1.75, margin: 0, flex: "1 1 260px" }}>
              A free 30-minute strategy session with our senior partners. No jargon, no obligation.
            </p>

            <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem", flex: "1 1 200px" }}>
              {BULLETS.map(b => (
                <span key={b} style={{ display: "flex", alignItems: "center", gap: "0.45rem", fontFamily: font.sans, fontSize: "0.95rem", color: "rgba(12,26,39,0.6)" }}>
                  <span style={{ color: C.red, fontSize: "0.55rem" }}>◆</span>
                  {b}
                </span>
              ))}
            </div>
          </div>

          <div>
            <button className="cta-btn" onClick={() => setShowContact(true)}>
              <span>Book a Strategy Session</span>
              <span className="arrow">→</span>
            </button>
          </div>
        </motion.div>

      </div>
    </section>
    </>
  )
}
