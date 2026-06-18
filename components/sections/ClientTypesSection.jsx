"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { C, font } from "@/lib/theme"

const CLIENTS = [
  {
    title: "Venture-Backed Companies",
    sub:   "From Seed to IPO",
    body:  "We've advised founders through every funding round, regulatory challenge, and international expansion milestone. We understand what it means when a term sheet is on the table and the structure isn't ready.",
    tags:  ["Fundraising", "M&A", "Cap Table"],
  },
  {
    title: "Global Enterprises",
    sub:   "Entering Asia and the Middle East",
    body:  "International companies setting up in India or the UAE need a partner who understands the regulatory landscape, the pace of business, and how to build an operation that actually works.",
    tags:  ["Market Entry", "Operations", "Compliance"],
  },
  {
    title: "PE & VC Funds",
    sub:   "Portfolio Expansion and Governance",
    body:  "Fund managers and their portfolio companies need integrated due diligence, ongoing compliance, and cross-border structuring across multiple entities without managing a dozen advisors.",
    tags:  ["Due Diligence", "Portfolio", "Governance"],
  },
  {
    title: "Founder-Led Businesses",
    sub:   "Growth Without Operational Complexity",
    body:  "Ambitious founders who want to grow across borders without building an in-house finance, legal, and compliance team in every country. We become that team.",
    tags:  ["Finance", "Legal", "Cross-border"],
  },
]


function ClientCard({ client, index }) {
  const [hovered, setHovered] = useState(false)
  const num = String(index + 1).padStart(2, "0")

  return (
    <motion.div
      initial={{ opacity: 0, y: 48 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.65, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
      style={{ perspective: "1000px", height: "100%" }}
    >
      <div
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        style={{
          position:      "relative",
          height:        "100%",
          minHeight:     300,
          borderRadius:  28,
          background:    "linear-gradient(135deg, #ffffff 0%, #f4f6fa 100%)",
          boxShadow:     hovered
            ? "2px 2px 0 rgba(8,16,32,0.85), 0 32px 56px rgba(0,0,0,0.14), inset 0 1px 0 #fff"
            : "7px 7px 0 rgba(8,16,32,0.75), 0 8px 24px rgba(0,0,0,0.1), inset 0 1px 0 #fff",
          transform:     hovered ? "rotate3d(1, 1, 0, 18deg)" : "rotate3d(0,0,0,0deg)",
          transformStyle:"preserve-3d",
          transition:    "transform 0.5s ease, box-shadow 0.5s ease",
          cursor:        "default",
          overflow:      "hidden",
        }}
      >
        {/* Glass inner layer — floats at z:25 */}
        <div style={{
          position:        "absolute",
          inset:           8,
          borderRadius:    22,
          borderBottom:    "1px solid rgba(12,26,39,0.06)",
          borderLeft:      "1px solid rgba(12,26,39,0.06)",
          background:      "linear-gradient(to bottom, rgba(255,255,255,0.6), rgba(255,255,255,0.2))",
          backdropFilter:  "blur(4px)",
          WebkitBackdropFilter: "blur(4px)",
          transform:       "translate3d(0,0,25px)",
          transformStyle:  "preserve-3d",
          pointerEvents:   "none",
        }} />

        {/* Number watermark */}
        <span style={{
          position:      "absolute",
          top:           "0.5rem",
          right:         "1.25rem",
          fontFamily:    font.num,
          fontSize:      "8rem",
          fontWeight:    800,
          lineHeight:    1,
          color:         "rgba(12,26,39,0.06)",
          userSelect:    "none",
          pointerEvents: "none",
          zIndex:        0,
          transform:     `translate3d(0,0,${hovered ? 30 : 20}px)`,
          transition:    "transform 0.5s ease",
        }}>
          {num}
        </span>

        {/* Content — floats at z:26, just above glass layer */}
        <div style={{
          position:        "relative",
          zIndex:          1,
          transform:       "translate3d(0,0,26px)",
          transformStyle:  "preserve-3d",
          padding:         "2.25rem 1.75rem 1.75rem",
          boxSizing:       "border-box",
        }}>
          {/* Subtitle */}
          <span style={{
            display:       "block",
            fontFamily:    font.sans,
            fontSize:      "0.65rem",
            fontWeight:    700,
            letterSpacing: "0.2em",
            textTransform: "uppercase",
            color:         C.red,
            marginBottom:  "0.65rem",
          }}>
            {client.sub}
          </span>

          {/* Title */}
          <h3 style={{
            fontFamily:   font.sans,
            fontSize:     "clamp(1.3rem, 1.8vw, 1.65rem)",
            fontWeight:   800,
            color:        C.ink,
            lineHeight:   1.2,
            marginBottom: "0.85rem",
          }}>
            {client.title}
          </h3>

          {/* Body */}
          <p style={{
            fontFamily:   font.sans,
            fontSize:     "0.9rem",
            color:        "rgba(12,26,39,0.55)",
            lineHeight:   1.8,
            marginBottom: "1.25rem",
          }}>
            {client.body}
          </p>

          {/* Tags row */}
          <div style={{
            display:  "flex",
            gap:      "0.4rem",
            flexWrap: "wrap",
          }}>
            {client.tags.map(tag => (
              <span key={tag} style={{
                fontFamily:    font.sans,
                fontSize:      "0.65rem",
                fontWeight:    600,
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                color:           "rgba(12,26,39,0.55)",
                border:          "1px solid rgba(12,26,39,0.15)",
                borderRadius:    20,
                padding:         "0.25rem 0.65rem",
                backgroundColor: "rgba(12,26,39,0.04)",
              }}>
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  )
}

export default function ClientTypesSection() {
  return (
    <section style={{ backgroundColor: C.ink, padding: "clamp(4rem, 5vw, 8rem) 7vw" }}>
      <style>{`
        .ct-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 2rem;
          margin-top: 3.5rem;
        }
        @media (max-width: 767px) { .ct-grid { grid-template-columns: 1fr; } }
      `}</style>

      <div style={{ maxWidth: 1280, margin: "0 auto" }}>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          style={{ maxWidth: 560 }}
        >
          <span style={{
            fontFamily:    font.sans,
            fontSize:      "0.58rem",
            fontWeight:    700,
            letterSpacing: "0.22em",
            textTransform: "uppercase",
            color:         "rgba(184,50,40,0.8)",
            display:       "block",
            marginBottom:  "1.1rem",
          }}>
            Who We Work With
          </span>

          <h2 style={{
            fontFamily:          font.sans,
            fontSize:            "clamp(2.2rem, 3.5vw, 3.2rem)",
            fontWeight:          800,
            color:               "#fff",
            lineHeight:          1.12,
            marginBottom:        "1.25rem",
            WebkitFontSmoothing: "antialiased",
          }}>
            Built for companies that mean{" "}
            <em style={{ fontStyle: "normal", color: C.red }}>business.</em>
          </h2>

          <p style={{
            fontFamily: font.sans,
            fontSize:   "0.9rem",
            color:      "rgba(255,255,255,0.45)",
            lineHeight: 1.85,
          }}>
            We work best with ambitious companies where cross-border complexity
            is a strategic challenge, not a back-office inconvenience.
          </p>
        </motion.div>

        <div className="ct-grid">
          {CLIENTS.map((c, i) => (
            <ClientCard key={c.title} client={c} index={i} />
          ))}
        </div>

      </div>
    </section>
  )
}
