"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { C, font } from "@/lib/theme"

const CLIENTS = [
  {
    title:    "Venture-Backed Companies",
    sub:      "From Seed to IPO",
    body:     "We've advised founders through every funding round, regulatory challenge, and international expansion milestone. We understand what it means when a term sheet is on the table and the structure isn't ready.",
  },
  {
    title:    "Global Enterprises",
    sub:      "Entering Asia and the Middle East",
    body:     "International companies setting up in India or the UAE need a partner who understands the regulatory landscape, the pace of business, and how to build an operation that actually works.",
  },
  {
    title:    "PE & VC Funds",
    sub:      "Portfolio Expansion and Governance",
    body:     "Fund managers and their portfolio companies need integrated due diligence, ongoing compliance, and cross-border structuring across multiple entities without managing a dozen advisors.",
  },
  {
    title:    "Founder-Led Businesses",
    sub:      "Growth Without Operational Complexity",
    body:     "Ambitious founders who want to grow across borders without building an in-house finance, legal, and compliance team in every country. We become that team.",
  },
]

function ClientCard({ client, index }) {
  const [hovered, setHovered] = useState(false)
  const num = String(index + 1).padStart(2, "0")

  return (
    <motion.div
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.55, delay: (index % 2) * 0.12, ease: [0.22, 1, 0.36, 1] }}
    >
      <motion.div
        onHoverStart={() => setHovered(true)}
        onHoverEnd={()  => setHovered(false)}
        animate={{
          y:         hovered ? -6 : 0,
          boxShadow: hovered ? "0 28px 64px rgba(0,0,0,0.28)" : "0 2px 16px rgba(0,0,0,0.12)",
        }}
        transition={{ duration: 0.26, ease: [0.22, 1, 0.36, 1] }}
        style={{
          backgroundColor: "#ffffff",
          display:         "flex",
          cursor:          "default",
          height:          "100%",
          overflow:        "hidden",
          position:        "relative",
        }}
      >
        {/* Animated left border */}
        <motion.div
          animate={{ scaleY: hovered ? 1 : 0, backgroundColor: C.red }}
          transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
          style={{
            width:           4,
            flexShrink:      0,
            transformOrigin: "top",
            backgroundColor: C.red,
          }}
        />

        {/* Card content */}
        <div style={{ padding: "2.25rem 2rem 2.25rem 2rem", flex: 1, position: "relative" }}>

          {/* Number watermark */}
          <span style={{
            position:      "absolute",
            top:           "1.25rem",
            right:         "1.75rem",
            fontFamily:    font.num,
            fontSize:      "5rem",
            fontWeight:    700,
            color:         "rgba(12,26,39,0.05)",
            lineHeight:    1,
            userSelect:    "none",
            pointerEvents: "none",
          }}>
            {num}
          </span>

          {/* Subtitle tag */}
          <motion.span
            animate={{ color: hovered ? C.red : "rgba(184,50,40,0.7)" }}
            transition={{ duration: 0.22 }}
            style={{
              display:       "block",
              fontFamily:    font.sans,
              fontSize:      "0.56rem",
              fontWeight:    700,
              letterSpacing: "0.22em",
              textTransform: "uppercase",
              marginBottom:  "0.75rem",
            }}
          >
            {client.sub}
          </motion.span>

          {/* Title */}
          <h3 style={{
            fontFamily:   font.sans,
            fontSize:     "clamp(1.25rem, 1.6vw, 1.5rem)",
            fontWeight:   700,
            color:        C.ink,
            lineHeight:   1.2,
            marginBottom: "1rem",
          }}>
            {client.title}
          </h3>

          {/* Divider */}
          <motion.div
            animate={{ width: hovered ? "100%" : "2rem", backgroundColor: hovered ? C.red : "rgba(12,26,39,0.12)" }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            style={{ height: 1, marginBottom: "1rem" }}
          />

          {/* Body */}
          <p style={{
            fontFamily: font.sans,
            fontSize:   "0.83rem",
            color:      "rgba(12,26,39,0.52)",
            lineHeight: 1.85,
          }}>
            {client.body}
          </p>
        </div>
      </motion.div>
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
          gap: 1.25rem;
          margin-top: 3.5rem;
        }
        @media (max-width: 767px) { .ct-grid { grid-template-columns: 1fr; } }
      `}</style>

      <div style={{ maxWidth: 1280, margin: "0 auto" }}>

        {/* Header */}
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
            fontFamily:            font.sans,
            fontSize:              "clamp(2.2rem, 3.5vw, 3.2rem)",
            fontWeight:            800,
            color:                 "#fff",
            lineHeight:            1.12,
            marginBottom:          "1.25rem",
            WebkitFontSmoothing:   "antialiased",
            MozOsxFontSmoothing:   "grayscale",
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

        {/* Cards */}
        <div className="ct-grid">
          {CLIENTS.map((c, i) => (
            <ClientCard key={c.title} client={c} index={i} />
          ))}
        </div>

      </div>
    </section>
  )
}
