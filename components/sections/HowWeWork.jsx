"use client"

import { motion } from "framer-motion"
import { C, font } from "@/lib/theme"

const FEATURES = [
  { title: "Finance + Legal Under One Roof", body: "No handoffs between your CA and your lawyer. One team, one brief, one integrated view of every decision." },
  { title: "Technology-Led Delivery", body: "We build and use proprietary systems to deliver advisory and compliance faster, with full client transparency." },
  { title: "Genuinely Cross-Border", body: "Own offices in Delhi and Dubai. Associates in Singapore. Growing US practice. Four jurisdictions, one team." },
  { title: "Founder-Speed Execution", body: "We work alongside venture-backed companies. We know what it means when a deal needs to close over the weekend." },
]

export default function HowWeWork() {
  return (
    <section style={{ backgroundColor: "#fff", padding: "6rem 5vw" }}>
      <div className="howwework-layout" style={{ maxWidth: 1280, margin: "0 auto" }}>

        {/* Sticky left */}
        <div className="howwework-sticky" style={{ flex: "0 0 340px", position: "sticky", top: "5.5rem", alignSelf: "flex-start" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "1rem" }}>
            <span style={{ fontFamily: font.sans, fontSize: "0.68rem", fontWeight: 700, letterSpacing: "0.2em", textTransform: "uppercase", color: "#8C1A2B" }}>HOW WE WORK</span>
          </div>
          <h2 style={{ fontFamily: font.serif, fontSize: "clamp(1.6rem, 2.5vw, 2.2rem)", color: C.ink, lineHeight: 1.2, marginBottom: "1.25rem" }}>
            Advisory built for the Modern Business.
          </h2>
          <p style={{ fontFamily: font.sans, fontSize: "0.875rem", color: `rgba(12,26,39,0.5)`, lineHeight: 1.75 }}>
            Most professional services firms were designed for a world where businesses operated in one country, one currency, and one regulatory environment. That world no longer exists.
          </p>
        </div>

        {/* Feature cards */}
        <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: "1.25rem" }}>
          {FEATURES.map((f, i) => (
            <motion.div
              key={f.title}
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45, delay: i * 0.07 }}
              style={{
                border:     `1px solid rgba(154,123,60,0.3)`,
                padding:    "1.75rem 2rem",
                transition: "border-color 0.2s",
                cursor:     "default",
              }}
              whileHover={{ borderColor: C.gold }}
            >
              <h3 style={{ fontFamily: font.serif, fontSize: "1.15rem", fontWeight: 400, color: C.ink, marginBottom: "0.6rem" }}>{f.title}</h3>
              <p style={{ fontFamily: font.sans, fontSize: "0.875rem", color: `rgba(12,26,39,0.55)`, lineHeight: 1.7 }}>{f.body}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
