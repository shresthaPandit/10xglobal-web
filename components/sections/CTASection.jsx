"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { C, font } from "@/lib/theme"
import ContactModal from "@/components/ContactModal"

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
  const [showContact, setShowContact] = useState(false)
  return (
    <>
    <ContactModal isOpen={showContact} onClose={() => setShowContact(false)} />
    <section id="cta">
      <style>{`
        .cta-grid { display: grid; grid-template-columns: 55fr 45fr; min-height: 640px; }
        @media (max-width: 767px) { .cta-grid { grid-template-columns: 1fr; } }
      `}</style>

      <div className="cta-grid">

        {/* Left */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55 }}
          style={{ backgroundColor: "#EAE4D9", padding: "5.5rem 5vw", display: "flex", flexDirection: "column", justifyContent: "center" }}
        >
          <span style={{ fontFamily: font.sans, fontSize: "0.62rem", fontWeight: 700, letterSpacing: "0.22em", textTransform: "uppercase", color: "#8C1A2B", display: "block", marginBottom: "1.25rem" }}>
            Get Started
          </span>

          <h2 style={{ fontFamily: font.serif, fontSize: "clamp(2.4rem, 4vw, 3.6rem)", fontWeight: 300, color: C.ink, lineHeight: 1.12, marginBottom: "1.25rem" }}>
            Where are you<br />going{" "}
            <em style={{ fontStyle: "italic", color: C.red }}>next?</em>
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

        {/* Right */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55, delay: 0.15 }}
          style={{ backgroundColor: C.surface, padding: "5.5rem 5vw", display: "flex", flexDirection: "column", justifyContent: "center", borderLeft: "1px solid rgba(12,26,39,0.07)" }}
        >
          <div style={{ fontFamily: font.serif, fontSize: "4rem", color: C.red, lineHeight: 0.6, marginBottom: "2.25rem", userSelect: "none", opacity: 0.5 }}>"</div>

          <p style={{ fontFamily: font.serif, fontSize: "clamp(1.6rem, 2.4vw, 2.1rem)", color: C.ink, lineHeight: 1.5, fontStyle: "italic", marginBottom: "3rem" }}>
            One firm that gets you <em style={{ color: C.red, fontStyle: "italic" }}>in,</em><br />
            gets you <em style={{ color: C.red, fontStyle: "italic" }}>funded,</em><br />
            and keeps you <em style={{ color: C.red, fontStyle: "italic" }}>running.</em>
          </p>

          {/* Location tags with hover cards */}
          <div style={{ display: "flex", gap: "0.6rem", flexWrap: "wrap" }}>
            {OFFICES.map(office => (
              <OfficeTag key={office.tag} office={office} />
            ))}
          </div>
        </motion.div>

      </div>
    </section>
    </>
  )
}
