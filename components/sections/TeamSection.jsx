"use client"

import Image from "next/image"
import { motion } from "framer-motion"
import { C, font } from "@/lib/theme"

const TEAM = [
  {
    name:    "Ashish Jain",
    title:   "Partner",
    img:     "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=480&h=560&fit=crop&crop=faces",
    partner: true,
  },
  {
    name:    "Siddharth Kohli",
    title:   "Partner",
    img:     "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=480&h=560&fit=crop&crop=faces",
    partner: true,
  },
  {
    name:    "Himanshu Aggarwal",
    title:   "Lead, Risk & Assurance",
    img:     "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=480&h=560&fit=crop&crop=faces",
  },
  {
    name:    "Niraj Jain",
    title:   "Practice Lead, MENA",
    img:     "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=480&h=560&fit=crop&crop=faces",
  },
  {
    name:    "Megha Soni",
    title:   "Lead, Startups",
    img:     "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=480&h=560&fit=crop&crop=faces",
  },
  {
    name:    "Rajat Gupta",
    title:   "Lead, Financial Reporting",
    img:     "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=480&h=560&fit=crop&crop=faces",
  },
  {
    name:    "Priya Dubey",
    title:   "Lead, Transaction Advisory",
    img:     "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=480&h=560&fit=crop&crop=faces",
  },
  {
    name:    "Tarundeep Singh",
    title:   "Lead, Legal",
    img:     "https://images.unsplash.com/photo-1566753323558-f4e0952af115?w=480&h=560&fit=crop&crop=faces",
  },
  {
    name:    "Varun Grover",
    title:   "Lead, Risk & Assurance (MENA)",
    img:     "https://images.unsplash.com/photo-1547425260-76bcadfb4f2c?w=480&h=560&fit=crop&crop=faces",
  },
]

function MemberCard({ member }) {
  return (
    <motion.div
      whileHover={{ y: -6, boxShadow: "0 24px 56px rgba(20,18,16,0.16)" }}
      transition={{ type: "spring", stiffness: 280, damping: 22 }}
      style={{
        flexShrink:      0,
        width:           220,
        borderRadius:    18,
        overflow:        "hidden",
        border:          "1px solid rgba(193,127,62,0.3)",
        backgroundColor: C.bg,
        cursor:          "pointer",
        boxShadow:       "0 2px 16px rgba(193,127,62,0.08), 0 8px 32px rgba(20,18,16,0.08)",
      }}
    >
      {/* Photo */}
      <div style={{ position: "relative", height: 280, overflow: "hidden" }}>
        <Image
          src={member.img}
          alt={member.name}
          fill
          sizes="220px"
          style={{ objectFit: "cover", filter: "grayscale(12%) contrast(1.05)" }}
        />
        <div style={{
          position:   "absolute",
          inset:      0,
          background: "linear-gradient(to top, rgba(20,18,16,0.6) 0%, transparent 50%)",
        }} />
        {member.partner && (
          <div style={{
            position:        "absolute",
            top:             "0.75rem",
            right:           "0.75rem",
            backgroundColor: C.copper,
            color:           "#fff",
            fontSize:        "0.55rem",
            fontFamily:      font.sans,
            fontWeight:      700,
            letterSpacing:   "0.14em",
            padding:         "0.2rem 0.55rem",
            borderRadius:    20,
          }}>
            PARTNER
          </div>
        )}
        {/* Name on photo */}
        <div style={{ position: "absolute", bottom: "1rem", left: "1rem", right: "1rem" }}>
          <p style={{ fontFamily: font.serif, fontSize: "1.05rem", fontWeight: 700, color: "#fff", lineHeight: 1.2 }}>
            {member.name}
          </p>
          <p style={{ fontFamily: font.sans, color: "rgba(255,255,255,0.65)", fontSize: "0.72rem", marginTop: 2, letterSpacing: "0.01em" }}>
            {member.title}
          </p>
        </div>
      </div>
    </motion.div>
  )
}

function MarqueeRow({ members, reverse = false, speed = 44 }) {
  const doubled = [...members, ...members]
  return (
    <div style={{ overflow: "hidden" }}>
      <motion.div
        animate={{ x: reverse ? ["-50%", "0%"] : ["0%", "-50%"] }}
        transition={{ duration: speed, ease: "linear", repeat: Infinity, repeatType: "loop" }}
        style={{ display: "flex", gap: "1.25rem", width: "max-content", paddingLeft: "1.25rem" }}
      >
        {doubled.map((m, i) => <MemberCard key={i} member={m} />)}
      </motion.div>
    </div>
  )
}

export default function TeamSection() {
  const reversed = [...TEAM].reverse()

  return (
    <section id="team" style={{ backgroundColor: C.ink, padding: "6rem 0", overflow: "hidden" }}>

      {/* Header */}
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 5vw", marginBottom: "3.5rem" }}>
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55 }}
          style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", flexWrap: "wrap", gap: "1.5rem" }}
        >
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: "0.625rem", marginBottom: "1rem" }}>
              <span style={{ fontFamily: font.sans, color: C.copper, fontSize: "0.68rem", fontWeight: 600, letterSpacing: "0.15em" }}>
                OUR FIRM
              </span>
            </div>
            <h2 style={{ fontFamily: font.serif, fontSize: "clamp(2rem, 3.5vw, 3rem)", fontWeight: 700, color: C.bg, lineHeight: 1.08 }}>
              The people behind<br />
              <em style={{ color: C.copper, fontStyle: "italic" }}>your growth.</em>
            </h2>
          </div>
          <p style={{ fontFamily: font.sans, color: "rgba(247,243,238,0.55)", fontSize: "0.9rem", lineHeight: 1.7, maxWidth: 340 }}>
            50+ domain experts across finance, legal, compliance and technology — operating as one integrated team across four continents.
          </p>
        </motion.div>
      </div>

      {/* Dual marquee rows */}
      <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
        <MarqueeRow members={TEAM}     reverse={false} speed={44} />
        <MarqueeRow members={reversed} reverse={true}  speed={56} />
      </div>

      {/* CTA row */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        style={{ textAlign: "center", marginTop: "3.5rem", padding: "0 1.5rem" }}
      >
        <p style={{ fontFamily: font.sans, color: "rgba(247,243,238,0.45)", fontSize: "0.875rem", marginBottom: "1.25rem" }}>
          Want to know who would handle your account?
        </p>
        <a href="#cta" style={{ textDecoration: "none" }}>
          <button style={{
            backgroundColor: "transparent",
            border:          `1.5px solid rgba(247,243,238,0.3)`,
            color:           C.bg,
            padding:         "0.75rem 2rem",
            borderRadius:    8,
            fontSize:        "0.875rem",
            fontFamily:      font.sans,
            fontWeight:      500,
            cursor:          "pointer",
            letterSpacing:   "-0.01em",
          }}>
            Book a conversation →
          </button>
        </a>
      </motion.div>

    </section>
  )
}
