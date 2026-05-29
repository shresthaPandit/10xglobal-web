"use client"

import Image from "next/image"
import { motion } from "framer-motion"
import { C, font } from "@/lib/theme"
import CountUp from "@/components/ui/CountUp"
import { useIsMobile } from "@/lib/useIsMobile"

const PILLARS = [
  {
    num: "01",
    title: "Relevant expertise",
    desc: "13+ years across finance, legal, and compliance. Our team doesn't just advise — they've lived the complexity you're navigating.",
  },
  {
    num: "02",
    title: "We invest in your success",
    desc: "We take time to understand your business, your goals, and your constraints. The work we do is shaped around what actually matters to you.",
  },
  {
    num: "03",
    title: "Tangible results",
    desc: "Every engagement is measured in real outcomes: productivity gains, cost savings, compliance wins. No vague consulting deliverables.",
  },
]

export default function WhyUsSection() {
  const isMobile = useIsMobile()

  return (
    <section style={{ backgroundColor: C.surface, padding: isMobile ? "3rem 1.25rem" : "6rem 1.5rem" }}>
      <div style={{
        maxWidth:            1200,
        margin:              "0 auto",
        display:             "grid",
        gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr",
        gap:                 isMobile ? "2.5rem" : "5rem",
        alignItems:          "center",
      }}>

        {/* Image */}
        <motion.div
          initial={{ opacity: 0, x: isMobile ? 0 : -32, y: isMobile ? 16 : 0 }}
          whileInView={{ opacity: 1, x: 0, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
          style={{
            position:     "relative",
            borderRadius: 20,
            overflow:     "hidden",
            aspectRatio:  isMobile ? "16/9" : "4/5",
            border:       "1px solid rgba(193,127,62,0.3)",
            boxShadow:    "0 0 0 1px rgba(193,127,62,0.1), 0 8px 48px rgba(193,127,62,0.1), 0 20px 60px rgba(20,18,16,0.1)",
          }}
        >
          <Image
            src="https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=1200&q=90"
            alt="10x Global advisory team"
            fill
            style={{ objectFit: "cover" }}
          />
          <div style={{ position: "absolute", bottom: "1.5rem", left: "1.5rem", backgroundColor: C.copper, color: "#fff", padding: "0.875rem 1.25rem", borderRadius: 12, fontFamily: font.sans }}>
            <CountUp value="450+" style={{ fontSize: "1.6rem", fontWeight: 700, lineHeight: 1, display: "block" }} />
            <p style={{ fontSize: "0.7rem", fontWeight: 500, letterSpacing: "0.1em", marginTop: 4, opacity: 0.9 }}>CLIENTS SERVED</p>
          </div>
        </motion.div>

        {/* Pillars */}
        <motion.div
          initial={{ opacity: 0, x: isMobile ? 0 : 32, y: isMobile ? 16 : 0 }}
          whileInView={{ opacity: 1, x: 0, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "0.625rem", marginBottom: "1.25rem" }}>
            <div style={{ width: 28, height: 2, backgroundColor: C.copper }} />
            <span style={{ fontFamily: font.sans, color: C.copper, fontSize: "0.68rem", fontWeight: 600, letterSpacing: "0.15em" }}>WHY 10X GLOBAL</span>
          </div>

          <h2 style={{ fontFamily: font.serif, fontSize: "clamp(1.8rem, 3vw, 2.6rem)", fontWeight: 700, color: C.ink, lineHeight: 1.1, marginBottom: "2.5rem" }}>
            A partner that moves<br />
            <em style={{ color: C.copper, fontStyle: "italic" }}>at your speed.</em>
          </h2>

          <div style={{ display: "flex", flexDirection: "column", gap: "2rem" }}>
            {PILLARS.map((p, i) => (
              <motion.div
                key={p.num}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.45, delay: i * 0.1 }}
                style={{ display: "flex", gap: "1.25rem" }}
              >
                <span style={{ fontFamily: font.serif, fontSize: "1.1rem", fontWeight: 700, color: C.copper, flexShrink: 0, paddingTop: 2 }}>{p.num}</span>
                <div>
                  <h3 style={{ fontFamily: font.serif, fontSize: "1.2rem", fontWeight: 700, color: C.ink, marginBottom: "0.4rem" }}>{p.title}</h3>
                  <p style={{ fontFamily: font.sans, color: C.muted, fontSize: "0.9rem", lineHeight: 1.7 }}>{p.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>

          <a href="#cta" style={{ textDecoration: "none" }}>
            <button style={{
              marginTop:       "2.5rem",
              backgroundColor: C.ink,
              color:           C.bg,
              padding:         "0.875rem 2rem",
              borderRadius:    10,
              fontSize:        "0.925rem",
              fontFamily:      font.sans,
              fontWeight:      500,
              border:          "none",
              cursor:          "pointer",
              width:           isMobile ? "100%" : "auto",
            }}>
              Book a free consultation
            </button>
          </a>
        </motion.div>
      </div>
    </section>
  )
}
