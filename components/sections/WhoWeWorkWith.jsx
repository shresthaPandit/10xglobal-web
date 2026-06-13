"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { C, font } from "@/lib/theme"

const RED = "#8C1A2B"

const CARDS = [
  {
    title: "Finance + Legal Under One Roof",
    body: (
      <>
        No handoffs between your accountant, your lawyer, and your compliance team.{" "}
        <strong style={{ color: C.ink }}>One team. One brief. One outcome.</strong>{" "}
        CA, CS, and legal professionals working as a single integrated unit.
      </>
    ),
  },
  {
    title: "Founder Speed",
    body: (
      <>
        We work at venture speed.{" "}
        <strong style={{ color: C.ink }}>Deadlines don't move because it's a weekend.</strong>{" "}
        We've been in the room when deals nearly fell apart — and held them together.
      </>
    ),
  },
  {
    title: "Cross-Border by Design",
    body: (
      <>
        Own offices in <strong style={{ color: C.ink }}>India</strong> and{" "}
        <strong style={{ color: C.ink }}>UAE</strong>. Associates in{" "}
        <strong style={{ color: C.ink }}>Singapore.</strong> Growing practice in the{" "}
        <strong style={{ color: C.ink }}>US.</strong> Four jurisdictions as one integrated
        delivery — not flag-planting.
      </>
    ),
  },
  {
    title: "Technology Powered",
    body: (
      <>
        We build and operate{" "}
        <strong style={{ color: C.ink }}>proprietary systems</strong> for compliance
        tracking, client reporting, and document management. Real-time visibility.
        Transparent execution.
      </>
    ),
  },
]

function Card({ card, index }) {
  const [hovered, setHovered] = useState(false)
  const num = String(index + 1).padStart(2, "0")

  return (
    <motion.div
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      animate={{
        y:               hovered ? -10 : 0,
        backgroundColor: hovered ? "#FDF5F5" : "#ffffff",
        boxShadow:       hovered
          ? "0 28px 72px rgba(140,26,43,0.12), 0 4px 16px rgba(0,0,0,0.06)"
          : "0 2px 16px rgba(12,26,39,0.05)",
      }}
      transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
      style={{
        border:       "1px solid rgba(12,26,39,0.08)",
        padding:      "2.25rem 2.25rem 2.75rem",
        position:     "relative",
        overflow:     "hidden",
        cursor:       "default",
      }}
    >
      {/* Animated red accent bar */}
      <motion.div
        animate={{ width: hovered ? 60 : 28 }}
        transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
        style={{ height: 2.5, backgroundColor: RED, marginBottom: "1.75rem" }}
      />

      {/* Title */}
      <h3 style={{
        fontFamily:   font.serif,
        fontSize:     "clamp(1.1rem, 1.4vw, 1.3rem)",
        fontWeight:   500,
        color:        C.ink,
        lineHeight:   1.3,
        marginBottom: "0.9rem",
      }}>
        {card.title}
      </h3>

      {/* Body */}
      <p style={{
        fontFamily: font.sans,
        fontSize:   "0.85rem",
        color:      "rgba(12,26,39,0.55)",
        lineHeight: 1.85,
      }}>
        {card.body}
      </p>

      {/* Number watermark */}
      <motion.span
        animate={{ opacity: hovered ? 0.12 : 0.06 }}
        transition={{ duration: 0.28 }}
        style={{
          position:      "absolute",
          bottom:        "-0.5rem",
          right:         "1.25rem",
          fontFamily:    font.num,
          fontSize:      "7.5rem",
          fontWeight:    700,
          color:         RED,
          lineHeight:    1,
          userSelect:    "none",
          pointerEvents: "none",
        }}
      >
        {num}
      </motion.span>
    </motion.div>
  )
}

export default function WhoWeWorkWith() {
  return (
    <section id="who-we-work" style={{ backgroundColor: C.bg, padding: "5.5rem 7vw" }}>
      <style>{`
        .hwwd-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 1.25rem;
          margin-top: 3.5rem;
        }
        @media (max-width: 767px) {
          .hwwd-grid { grid-template-columns: 1fr; }
        }
      `}</style>

      <div style={{ maxWidth: 1280, margin: "0 auto" }}>

        {/* Header */}
        <div style={{ maxWidth: 560 }}>
          <span style={{
            fontFamily:    font.sans,
            fontSize:      "0.6rem",
            fontWeight:    700,
            letterSpacing: "0.22em",
            textTransform: "uppercase",
            color:         RED,
            display:       "block",
            marginBottom:  "1.1rem",
          }}>
            How We Work Differently
          </span>
          <h2 style={{
            fontFamily:   font.serif,
            fontSize:     "clamp(2.2rem, 3.5vw, 3.2rem)",
            fontWeight:   300,
            color:        C.ink,
            lineHeight:   1.18,
            marginBottom: "1.25rem",
          }}>
            Advisory built for the{" "}
            <em style={{ fontStyle: "italic", color: RED }}>modern business.</em>
          </h2>
          <p style={{
            fontFamily: font.sans,
            fontSize:   "0.9rem",
            lineHeight: 1.85,
            color:      "rgba(12,26,39,0.55)",
          }}>
            Most professional services firms were designed for a world where businesses
            operated in one country, one currency, one regulatory environment.{" "}
            <strong style={{ color: C.ink }}>That world no longer exists.</strong>
          </p>
        </div>

        {/* Cards */}
        <div className="hwwd-grid">
          {CARDS.map((card, i) => (
            <motion.div
              key={card.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
            >
              <Card card={card} index={i} />
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  )
}
